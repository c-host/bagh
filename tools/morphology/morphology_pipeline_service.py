#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Small local HTTP service to run the morphology pipeline in the background
and expose status/output JSON to the morphology chart editor UI.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import unicodedata
import threading
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Optional
from urllib.parse import parse_qs, urlparse

from verb_website_workspace import (
    candidate_workspace_bases,
    resolve_verb_website_workspace_root,
)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


# Bump when changing snapshot/health shape so clients can confirm the running process
# reloaded this module (not an older copy on PYTHONPATH or another checkout).
SERVICE_BUILD_ID = "morphology-pipeline-service:2026-05-04-snapshot-v3"


def infer_workspace_root(raw_workspace_root: str) -> Path:
    return resolve_verb_website_workspace_root(raw_workspace_root, Path(__file__))


def prefer_candidates_dir(outputs: dict, value: str) -> None:
    """Set outputs['candidatesDir']: absolute paths win; never replace absolute with relative."""
    v = (value or "").strip()
    if not v:
        return
    cur = str(outputs.get("candidatesDir", "")).strip()

    def is_abs_path(s: str) -> bool:
        if not s:
            return False
        try:
            return Path(s).is_absolute()
        except OSError:
            return False

    if is_abs_path(v):
        outputs["candidatesDir"] = v
        return
    if is_abs_path(cur):
        return
    outputs["candidatesDir"] = v


# generate_root_candidates: "Saved <path> (<n> candidates); ..."
# Match the *last* "(<n> candidates)" so paths containing "(" (e.g. "Program Files (x86)")
# are not truncated by a non-greedy prefix match.
# Allow ASCII or fullwidth parentheses (some Windows consoles alter punctuation).
RE_SAVED_CANDIDATES_COUNT = re.compile(
    r"[\(（]\s*\d+\s+candidates\s*[\)）]",
    re.IGNORECASE,
)


def _normalize_filename_hyphens(name: str) -> str:
    for ch in ("\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2212"):
        name = name.replace(ch, "-")
    return name


def _looks_like_generator_candidates_json_name(name: str) -> bool:
    n = _normalize_filename_hyphens(name).casefold()
    return n.endswith("-candidates.json") and "review-queue" not in n


def parse_saved_candidates_parent_line(line: str) -> Optional[Path]:
    clean = str(line or "").replace("\ufeff", "").strip()
    if not clean.startswith("Saved "):
        return None
    marks = list(RE_SAVED_CANDIDATES_COUNT.finditer(clean))
    if not marks:
        return None
    m = marks[-1]
    path_str = clean[len("Saved ") : m.start()].strip()
    if not path_str:
        return None
    try:
        pth = Path(path_str).expanduser().resolve()
        if _looks_like_generator_candidates_json_name(pth.name):
            return pth.parent.resolve()
    except OSError:
        return None
    return None


def to_repo_path_for_read_json(path: Path, workspace_root: Path) -> str:
    """
    Path string suitable for /read-json when workspace_root may be a monorepo root
    but files live under websites/verb-website/.
    """
    pr = path.resolve()
    wr = workspace_root.resolve()
    try:
        return pr.relative_to(wr).as_posix()
    except ValueError:
        inner = (wr / "websites" / "verb-website").resolve()
        try:
            rel_inner = pr.relative_to(inner)
            return (Path("websites") / "verb-website" / rel_inner).as_posix()
        except ValueError:
            return pr.as_posix()


@dataclass
class PipelineJob:
    job_id: str
    command: list[str]
    cwd: Path
    started_at: str = field(default_factory=now_iso)
    finished_at: str = ""
    status: str = "running"
    exit_code: Optional[int] = None
    output_lines: list[str] = field(default_factory=list)
    outputs: dict = field(default_factory=dict)
    error: str = ""
    process: Optional[subprocess.Popen] = None
    lock: threading.Lock = field(default_factory=threading.Lock)

    def append_line(self, line: str) -> None:
        clean = str(line or "").replace("\ufeff", "").rstrip("\r\n")
        with self.lock:
            self.output_lines.append(clean)
            if len(self.output_lines) > 800:
                self.output_lines = self.output_lines[-800:]
            if clean.startswith("Records: "):
                self.outputs["records"] = clean.split("Records: ", 1)[1].strip()
            elif clean.startswith("Summary: "):
                self.outputs["summary"] = clean.split("Summary: ", 1)[1].strip()
            elif clean.startswith("Candidates/review queues: "):
                prefer_candidates_dir(
                    self.outputs,
                    clean.split("Candidates/review queues: ", 1)[1].strip(),
                )
            elif clean.startswith("Run tag: "):
                self.outputs["runTag"] = clean.split("Run tag: ", 1)[1].strip()
            elif clean.startswith("Saved "):
                parent = parse_saved_candidates_parent_line(clean)
                if parent is not None:
                    prefer_candidates_dir(self.outputs, str(parent))
            elif clean.startswith("PIPELINE_CANDIDATES_DIR_REL="):
                prefer_candidates_dir(
                    self.outputs,
                    clean[len("PIPELINE_CANDIDATES_DIR_REL=") :].strip(),
                )

    def snapshot(self, workspace_root: Path) -> dict:
        with self.lock:
            outputs = dict(self.outputs)
            # Prefer absolute dir from generator "Saved …-candidates.json (N candidates)"
            # over PIPELINE_CANDIDATES_DIR_REL=… (repo-relative). The latter joined to a
            # monorepo root (…/bagh) misses …/bagh/websites/verb-website/… on disk.
            saved_parent = None
            for line in reversed(self.output_lines):
                saved_parent = parse_saved_candidates_parent_line(line)
                if saved_parent is not None:
                    break
            if saved_parent is not None:
                prefer_candidates_dir(outputs, str(saved_parent))
            else:
                pipe_prefix = "PIPELINE_CANDIDATES_DIR_REL="
                for line in reversed(self.output_lines):
                    clean = str(line or "").replace("\ufeff", "").strip()
                    if clean.startswith(pipe_prefix):
                        prefer_candidates_dir(
                            outputs,
                            clean[len(pipe_prefix) :].strip(),
                        )
                        break
            for line in reversed(self.output_lines):
                clean = str(line or "").replace("\ufeff", "").strip()
                if clean.startswith("Run tag: "):
                    outputs["runTag"] = clean.split("Run tag: ", 1)[1].strip()
                    break

            raw_candidates_dir = str(outputs.get("candidatesDir", "")).strip()
            run_tag = str(outputs.get("runTag", "")).strip()
            bases = candidate_workspace_bases(workspace_root)

            def resolve_tagged_candidates_dir(tag: str) -> Optional[Path]:
                t = (tag or "").strip()
                if not t:
                    return None
                want = unicodedata.normalize("NFC", t)
                for base in bases:
                    candidate_parents = [
                        (base / "src" / "data" / "morphology" / "work" / "candidates").resolve(),
                    ]
                    for candidates_parent in candidate_parents:
                        if not candidates_parent.is_dir():
                            continue
                        direct = (candidates_parent / t).resolve()
                        if direct.is_dir():
                            return direct
                        for child in candidates_parent.iterdir():
                            if not child.is_dir():
                                continue
                            if unicodedata.normalize("NFC", child.name) == want:
                                return child.resolve()
                return None

            def collect_from_dir(candidate_dir: Path) -> tuple[list[str], list[str]]:
                if not candidate_dir.exists() or not candidate_dir.is_dir():
                    return [], []
                candidates_list: list[str] = []
                reviews_list: list[str] = []
                try:
                    # glob("*.json") is more reliable than iterdir()+is_file() on Windows
                    # with non-ASCII filenames.
                    json_paths = sorted(
                        candidate_dir.glob("*.json"),
                        key=lambda p: _normalize_filename_hyphens(p.name).casefold(),
                    )
                    for path in json_paths:
                        name = path.name
                        try:
                            if _looks_like_generator_candidates_json_name(name):
                                candidates_list.append(
                                    to_repo_path_for_read_json(path, workspace_root)
                                )
                            elif _normalize_filename_hyphens(name).casefold().endswith(
                                "-review-queue.json"
                            ):
                                reviews_list.append(
                                    to_repo_path_for_read_json(path, workspace_root)
                                )
                        except (OSError, ValueError):
                            continue
                except OSError:
                    return [], []
                return sorted(candidates_list), sorted(reviews_list)

            dirs_to_try: list[Path] = []
            if saved_parent is not None:
                dirs_to_try.append(saved_parent.resolve())
            if raw_candidates_dir:
                primary = Path(raw_candidates_dir).expanduser()
                if primary.is_absolute():
                    dirs_to_try.append(primary.resolve())
                else:
                    for base in bases:
                        dirs_to_try.append((base / primary).resolve())
            if run_tag:
                tagged = resolve_tagged_candidates_dir(run_tag)
                if tagged is not None:
                    dirs_to_try.append(tagged)

            file_discovery: dict = {
                "version": 2,
                "workspaceRoot": str(workspace_root.resolve()),
                "bases": [str(b.resolve()) for b in bases],
                "savedParentFromScan": str(saved_parent.resolve()) if saved_parent else None,
                "rawCandidatesDir": raw_candidates_dir,
                "runTag": run_tag,
                "dirsToTry": [str(p.resolve()) for p in dirs_to_try],
                "savedLineDiagnostics": [],
                "attempts": [],
            }
            for i, line in enumerate(self.output_lines):
                if "Saved " not in line or "candidates" not in line.casefold():
                    continue
                marks = list(RE_SAVED_CANDIDATES_COUNT.finditer(line))
                parsed = parse_saved_candidates_parent_line(line)
                file_discovery["savedLineDiagnostics"].append(
                    {
                        "lineIndex": i,
                        "markCount": len(marks),
                        "parsedParent": str(parsed) if parsed else None,
                        "preview": line[:240],
                    }
                )

            seen: set[str] = set()
            candidate_files: list[str] = []
            review_files: list[str] = []
            for candidate_dir in dirs_to_try:
                key = str(candidate_dir)
                probe: dict = {"dir": str(candidate_dir.resolve())}
                if key in seen:
                    probe["skippedDuplicate"] = True
                    file_discovery["attempts"].append(probe)
                    continue
                seen.add(key)
                probe["exists"] = candidate_dir.exists()
                probe["isDir"] = candidate_dir.is_dir() if candidate_dir.exists() else False
                json_names: list[str] = []
                if probe["isDir"]:
                    try:
                        json_names = [p.name for p in candidate_dir.glob("*.json")]
                        probe["jsonGlobCount"] = len(json_names)
                        probe["jsonNames"] = json_names
                    except OSError as err:
                        probe["globError"] = repr(err)
                cf, rf = collect_from_dir(candidate_dir)
                probe["candidateFilesFound"] = len(cf)
                probe["reviewFilesFound"] = len(rf)
                if json_names:
                    probe["nameChecks"] = [
                        {
                            "name": n,
                            "looksCandidate": _looks_like_generator_candidates_json_name(n),
                            "looksReview": _normalize_filename_hyphens(n)
                            .casefold()
                            .endswith("-review-queue.json"),
                        }
                        for n in json_names[:12]
                    ]
                file_discovery["attempts"].append(probe)
                if cf or rf:
                    candidate_files = cf
                    review_files = rf
                    outputs["candidatesDir"] = str(candidate_dir.resolve())
                    break

            outputs["candidateFiles"] = candidate_files
            outputs["reviewQueueFiles"] = review_files
            return {
                "jobId": self.job_id,
                "serviceBuildId": SERVICE_BUILD_ID,
                "status": self.status,
                "startedAt": self.started_at,
                "finishedAt": self.finished_at,
                "exitCode": self.exit_code,
                "command": self.command,
                "error": self.error,
                "outputs": outputs,
                # Top-level (not nested under outputs) so it is obvious in DevTools and
                # so older clients that only logged outputs still see diagnostics here.
                "fileDiscovery": file_discovery,
                "tail": self.output_lines[-40:],
            }


class PipelineService:
    def __init__(self, workspace_root: Path):
        self.workspace_root = workspace_root
        self.jobs: dict[str, PipelineJob] = {}
        self.jobs_lock = threading.Lock()

    def _build_command(self, payload: dict) -> list[str]:
        run_script = (
            self.workspace_root
            / "tools"
            / "morphology"
            / "run_ena_morphology_pipeline.py"
        )
        headwords_raw = payload.get("headwords", [])
        if isinstance(headwords_raw, str):
            headwords = [item for item in headwords_raw.split() if item.strip()]
        elif isinstance(headwords_raw, list):
            headwords = [str(item).strip() for item in headwords_raw if str(item).strip()]
        else:
            headwords = []
        if not headwords:
            raise ValueError("Provide at least one headword.")

        headword_mode = str(payload.get("headwordMode", "contains")).strip() or "contains"
        delay_ms = int(payload.get("delayMs", 400) or 400)
        max_pages = int(payload.get("maxPagesPerQuery", 0) or 0)

        use_gnc = bool(payload.get("useGnc", True))
        drop_not_found_on_gnc = bool(payload.get("dropNotFoundOnGnc", True))
        review_require_gnc_deriv = bool(payload.get("reviewRequireGncDeriv", False))
        use_nplg = bool(payload.get("useNplg", True))
        drop_not_found_on_nplg = bool(payload.get("dropNotFoundOnNplg", False))

        command = [
            sys.executable,
            str(run_script),
            "--workspace-root",
            str(self.workspace_root),
            "--headword-mode",
            headword_mode,
            "--delay-ms",
            str(max(0, delay_ms)),
            "--max-pages-per-query",
            str(max(0, max_pages)),
        ]
        command.extend(headwords)

        if use_gnc:
            command.append("--use-gnc")
        if drop_not_found_on_gnc:
            command.append("--drop-not-found-on-gnc")
        if review_require_gnc_deriv:
            command.append("--review-require-gnc-deriv")
        if use_nplg:
            command.append("--use-nplg")
        else:
            command.append("--no-use-nplg")
        if drop_not_found_on_nplg:
            command.append("--drop-not-found-on-nplg")
        return command

    def _run_job(self, job: PipelineJob) -> None:
        try:
            child_env = {**os.environ, "PYTHONUNBUFFERED": "1"}
            child_env.setdefault("PYTHONIOENCODING", "utf-8")
            process = subprocess.Popen(
                job.command,
                cwd=str(job.cwd),
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace",
                bufsize=1,
                env=child_env,
            )
            job.process = process
            if process.stdout is not None:
                for line in process.stdout:
                    job.append_line(line)
            exit_code = process.wait()
            with job.lock:
                job.exit_code = exit_code
                job.finished_at = now_iso()
                job.status = "completed" if exit_code == 0 else "failed"
                if exit_code != 0:
                    job.error = f"Pipeline exited with code {exit_code}."
        except Exception as error:  # pragma: no cover - defensive
            with job.lock:
                job.finished_at = now_iso()
                job.status = "failed"
                job.error = str(error)

    def start_job(self, payload: dict) -> PipelineJob:
        command = self._build_command(payload)
        job = PipelineJob(
            job_id=f"job-{uuid.uuid4().hex[:12]}",
            command=command,
            cwd=self.workspace_root,
        )
        with self.jobs_lock:
            self.jobs[job.job_id] = job
        thread = threading.Thread(target=self._run_job, args=(job,), daemon=True)
        thread.start()
        return job

    def get_job(self, job_id: str) -> Optional[PipelineJob]:
        with self.jobs_lock:
            return self.jobs.get(job_id)

    def read_json_file(self, repo_relative_path: str) -> dict:
        rel = str(repo_relative_path or "").strip().replace("\\", "/")
        requested = Path(rel)
        if requested.is_absolute():
            target = requested.resolve()
        else:
            wr = self.workspace_root.resolve()
            primary = (wr / requested).resolve()
            inner = (wr / "websites" / "verb-website").resolve()
            secondary = (inner / requested).resolve()
            if primary.is_file():
                target = primary
            elif secondary.is_file():
                target = secondary
            else:
                target = primary
        workspace_resolved = self.workspace_root.resolve()
        if workspace_resolved not in target.parents and target != workspace_resolved:
            raise ValueError("File path is outside workspace root.")
        if target.suffix.lower() != ".json":
            raise ValueError("Only .json files can be loaded.")
        if not target.exists():
            raise FileNotFoundError(f"File not found: {target}")
        payload = json.loads(target.read_text(encoding="utf-8"))
        return {
            "path": to_repo_path_for_read_json(target, self.workspace_root),
            "payload": payload,
        }


def build_handler(service: PipelineService):
    class Handler(BaseHTTPRequestHandler):
        def _send_json(self, status: int, payload: dict) -> None:
            body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Content-Type")
            # Chrome "Private Network Access": allow pages on localhost to call this loopback API.
            self.send_header("Access-Control-Allow-Private-Network", "true")
            self.end_headers()
            self.wfile.write(body)

        def do_OPTIONS(self):  # noqa: N802
            self._send_json(200, {"ok": True})

        def do_GET(self):  # noqa: N802
            parsed = urlparse(self.path)
            query = parse_qs(parsed.query)
            if parsed.path == "/api/morphology/pipeline/health":
                self._send_json(
                    200,
                    {
                        "ok": True,
                        "serviceBuildId": SERVICE_BUILD_ID,
                        "workspaceRoot": str(service.workspace_root),
                        "time": now_iso(),
                    },
                )
                return
            if parsed.path == "/api/morphology/pipeline/status":
                job_id = str(query.get("jobId", [""])[0]).strip()
                if not job_id:
                    self._send_json(400, {"ok": False, "error": "jobId is required."})
                    return
                job = service.get_job(job_id)
                if not job:
                    self._send_json(404, {"ok": False, "error": "Job not found."})
                    return
                self._send_json(200, {"ok": True, "job": job.snapshot(service.workspace_root)})
                return
            if parsed.path == "/api/morphology/pipeline/read-json":
                raw_path = str(query.get("path", [""])[0]).strip()
                if not raw_path:
                    self._send_json(400, {"ok": False, "error": "path is required."})
                    return
                try:
                    result = service.read_json_file(raw_path)
                except Exception as error:
                    self._send_json(400, {"ok": False, "error": str(error)})
                    return
                self._send_json(200, {"ok": True, **result})
                return
            self._send_json(404, {"ok": False, "error": "Unknown endpoint."})

        def do_POST(self):  # noqa: N802
            parsed = urlparse(self.path)
            if parsed.path != "/api/morphology/pipeline/run":
                self._send_json(404, {"ok": False, "error": "Unknown endpoint."})
                return
            try:
                content_len = int(self.headers.get("Content-Length", "0"))
                raw_body = self.rfile.read(content_len) if content_len > 0 else b"{}"
                payload = json.loads(raw_body.decode("utf-8"))
                if not isinstance(payload, dict):
                    raise ValueError("Payload must be a JSON object.")
                job = service.start_job(payload)
            except Exception as error:
                self._send_json(400, {"ok": False, "error": str(error)})
                return
            self._send_json(
                200,
                {
                    "ok": True,
                    "jobId": job.job_id,
                    "job": job.snapshot(service.workspace_root),
                },
            )

        def log_message(self, format: str, *args):  # noqa: A003
            return

    return Handler


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run local service for morphology pipeline background jobs."
    )
    parser.add_argument(
        "--host",
        default="",
        help="Bind host (default: all interfaces — avoids localhost IPv4/IPv6 mismatch). "
        "Use 127.0.0.1 to listen on IPv4 loopback only.",
    )
    parser.add_argument("--port", type=int, default=8765, help="Bind port.")
    parser.add_argument(
        "--workspace-root",
        default="",
        help="Workspace root (default: infer from script location).",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    workspace_root = infer_workspace_root(args.workspace_root)
    service = PipelineService(workspace_root=workspace_root)
    handler = build_handler(service)
    bind_host = (args.host or "").strip()
    try:
        server = ThreadingHTTPServer((bind_host, args.port), handler)
    except OSError as err:
        print(
            f"Could not bind to port {args.port} ({err}). "
            "Another process may already be using it — check:\n"
            f"  netstat -ano | findstr :{args.port}\n"
            "Then stop that PID (e.g. taskkill /PID <pid> /F) or use --port.",
            file=sys.stderr,
        )
        raise SystemExit(1) from err
    if bind_host:
        listen_hint = f"http://{bind_host}:{args.port}"
    else:
        listen_hint = f"http://127.0.0.1:{args.port} (and [::1] if dual-stack)"
    pid = os.getpid()
    print(
        f"Morphology pipeline service running at {listen_hint} "
        f"(pid={pid}, build={SERVICE_BUILD_ID}, workspace: {workspace_root})"
    )
    server.serve_forever()


if __name__ == "__main__":
    main()
