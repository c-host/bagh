#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
One-command pipeline:
1) scrape ena.ge explanatory results
2) generate candidate JSON files
3) generate review queue JSON files
"""

from __future__ import annotations

import argparse
import os
import re
import subprocess
import sys
from datetime import datetime
from pathlib import Path

from verb_website_workspace import resolve_verb_website_workspace_root


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run scrape + candidate + review generation in one go."
    )
    parser.add_argument(
        "--workspace-root",
        default="",
        help="Workspace root: verb-website project directory, or a monorepo root containing websites/verb-website/ (default: auto-detect from script location).",
    )
    parser.add_argument(
        "positional_headwords",
        nargs="*",
        help="Headwords as positional values (example: ძლ ძალ სძლ).",
    )
    parser.add_argument(
        "--headword",
        action="append",
        default=[],
        help="Headword query for ena.ge scrape. Repeatable.",
    )
    parser.add_argument(
        "--headwords",
        dest="headwords_csv",
        default="",
        help='Comma/space separated headwords (example: "ძლ,ძალ,სძლ").',
    )
    parser.add_argument(
        "--definition",
        action="append",
        default=[],
        help="Definition query for ena.ge scrape. Repeatable.",
    )
    parser.add_argument(
        "--query-file",
        default="",
        help="Optional JSON query file for scraper.",
    )
    parser.add_argument(
        "--records-jsonl",
        default="src/data/morphology/work/raw/ena-explanatory-records.jsonl",
        help="Scraped records output JSONL path (relative to verb-website root).",
    )
    parser.add_argument(
        "--summary-json",
        default="src/data/morphology/work/raw/ena-explanatory-summary.json",
        help="Scrape summary output JSON path (relative to verb-website root).",
    )
    parser.add_argument(
        "--candidates-output-dir",
        default="src/data/morphology/work/candidates",
        help="Output directory for candidates/review queues (relative to verb-website root).",
    )
    parser.add_argument(
        "--charts-json",
        default="morphology-chart/data/charts.json",
        help="Path to morphology chart JSON for overlap scoring (relative to verb-website root).",
    )
    parser.add_argument(
        "--review-min-confidence",
        type=float,
        default=0.55,
        help="Minimum confidence for review queue output.",
    )
    parser.add_argument(
        "--delay-ms",
        type=int,
        default=400,
        help="Delay between scraper requests in milliseconds.",
    )
    parser.add_argument(
        "--max-pages-per-query",
        type=int,
        default=0,
        help="Optional page cap per query for scraper (0 = unlimited).",
    )
    parser.add_argument(
        "--timeout-sec",
        type=int,
        default=25,
        help="Scraper request timeout in seconds.",
    )
    parser.add_argument(
        "--geo",
        default="1",
        help='Value for ena.ge "geo" parameter (default: "1").',
    )
    parser.add_argument(
        "--headword-mode",
        choices=("raw", "startswith", "endswith", "contains"),
        default="raw",
        help=(
            "How to transform headword queries before scraping: "
            "raw, startswith, endswith, contains."
        ),
    )
    parser.add_argument(
        "--use-gnc",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Enable GNC enrichment during candidate generation.",
    )
    parser.add_argument(
        "--drop-not-found-on-gnc",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Drop candidate lemmas not recognized by GNC.",
    )
    parser.add_argument(
        "--review-require-gnc-deriv",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Only include candidates with GNC derivational tags in review queue.",
    )
    parser.add_argument(
        "--use-nplg",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="Enable NPLG Georgian-English enrichment during candidate generation.",
    )
    parser.add_argument(
        "--drop-not-found-on-nplg",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Drop candidate lemmas that do not match NPLG dictionary d=46.",
    )
    parser.add_argument(
        "--auto-tag-outputs",
        action=argparse.BooleanOptionalAction,
        default=True,
        help=(
            "Auto-tag output files/dirs with query metadata and timestamp "
            "(default: enabled). Use --no-auto-tag-outputs to disable."
        ),
    )
    return parser.parse_args()


def configure_stdio_utf8() -> None:
    """Avoid UnicodeEncodeError on Windows (cp1252) when logging Georgian, etc."""
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, OSError, ValueError, TypeError):
            pass


def run_cmd(command: list[str], cwd: Path) -> None:
    print("Running:", " ".join(command))
    child_env = {**os.environ, "PYTHONUNBUFFERED": "1"}
    child_env.setdefault("PYTHONIOENCODING", "utf-8")
    subprocess.run(command, cwd=str(cwd), check=True, env=child_env)


def infer_workspace_root(raw_workspace_root: str) -> Path:
    return resolve_verb_website_workspace_root(raw_workspace_root, Path(__file__))


def split_headwords(raw: str) -> list[str]:
    if not raw:
        return []
    parts = re.split(r"[\s,]+", raw.strip())
    return [item for item in parts if item]


def collect_headwords(args: argparse.Namespace) -> list[str]:
    candidates: list[str] = []
    candidates.extend(args.positional_headwords or [])
    candidates.extend(args.headword or [])
    candidates.extend(split_headwords(args.headwords_csv or ""))

    seen: set[str] = set()
    normalized: list[str] = []
    for raw_item in candidates:
        item = str(raw_item).strip()
        if not item:
            continue
        if item in seen:
            continue
        seen.add(item)
        normalized.append(item)
    return normalized


def sanitize_tag_component(value: str) -> str:
    raw = str(value or "").strip()
    if not raw:
        return "none"
    # Keep letters/numbers (including Georgian), dash, underscore. Collapse everything else.
    sanitized = "".join(ch if (ch.isalnum() or ch in "-_") else "_" for ch in raw)
    sanitized = re.sub(r"_+", "_", sanitized).strip("_")
    return sanitized or "none"


def build_run_tag(headwords: list[str], mode: str, query_file: str, definitions: list[str]) -> str:
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    mode_tag = sanitize_tag_component(mode)
    if headwords:
        query_tag = "-".join(sanitize_tag_component(word) for word in headwords)
    elif definitions:
        query_tag = "definition-search"
    elif query_file:
        query_tag = f"queryfile-{sanitize_tag_component(Path(query_file).stem)}"
    else:
        query_tag = "default"
    return f"{mode_tag}__{query_tag}__{timestamp}"


def add_tag_to_file_path(path_str: str, tag: str) -> str:
    path = Path(path_str)
    tagged_name = f"{path.stem}__{tag}{path.suffix}"
    return str(path.with_name(tagged_name).as_posix())


def add_tag_to_directory_path(path_str: str, tag: str) -> str:
    path = Path(path_str)
    return str((path / tag).as_posix())


def force_ena_subdir_for_raw(path_str: str) -> str:
    path = Path(path_str)
    if path.parent.name == "ena":
        return str(path.as_posix())
    return str((path.parent / "ena" / path.name).as_posix())


def main() -> None:
    configure_stdio_utf8()
    args = parse_args()
    workspace_root = infer_workspace_root(args.workspace_root)
    python = sys.executable

    default_headwords = ["ძლ", "ძალ"]
    headwords = collect_headwords(args)
    if not headwords and not args.definition and not args.query_file:
        headwords = default_headwords

    records_jsonl = args.records_jsonl
    summary_json = args.summary_json
    candidates_output_dir = args.candidates_output_dir
    run_tag = ""
    if args.auto_tag_outputs:
        run_tag = build_run_tag(
            headwords=headwords,
            mode=args.headword_mode,
            query_file=args.query_file,
            definitions=args.definition or [],
        )
        records_jsonl = force_ena_subdir_for_raw(records_jsonl)
        summary_json = force_ena_subdir_for_raw(summary_json)
        records_jsonl = add_tag_to_file_path(records_jsonl, run_tag)
        summary_json = add_tag_to_file_path(summary_json, run_tag)
        candidates_output_dir = add_tag_to_directory_path(candidates_output_dir, run_tag)

    scraper_script = workspace_root / "tools" / "scraper" / "ena_explanatory_scraper.py"
    generator_script = workspace_root / "tools" / "morphology" / "generate_root_candidates.py"

    scrape_cmd = [
        python,
        str(scraper_script),
        "--workspace-root",
        str(workspace_root),
        "--output-jsonl",
        records_jsonl,
        "--output-summary",
        summary_json,
        "--delay-ms",
        str(args.delay_ms),
        "--max-pages-per-query",
        str(args.max_pages_per_query),
        "--timeout-sec",
        str(args.timeout_sec),
        "--geo",
        str(args.geo),
        "--headword-mode",
        str(args.headword_mode),
    ]
    for headword in headwords:
        scrape_cmd.extend(["--headword", headword])
    for definition in args.definition:
        scrape_cmd.extend(["--definition", definition])
    if args.query_file:
        scrape_cmd.extend(["--query-file", args.query_file])

    generate_cmd = [
        python,
        str(generator_script),
        "--workspace-root",
        str(workspace_root),
        "--ena-records-jsonl",
        records_jsonl,
        "--output-dir",
        candidates_output_dir,
        "--charts-json",
        args.charts_json,
        "--review-min-confidence",
        str(args.review_min_confidence),
    ]
    for headword in headwords:
        generate_cmd.extend(["--root-token", headword])
    if args.use_gnc:
        generate_cmd.append("--use-gnc")
    if args.drop_not_found_on_gnc:
        generate_cmd.append("--drop-not-found-on-gnc")
    if args.review_require_gnc_deriv:
        generate_cmd.append("--review-require-gnc-deriv")
    if args.use_nplg:
        generate_cmd.append("--use-nplg")
    if args.drop_not_found_on_nplg:
        generate_cmd.append("--drop-not-found-on-nplg")

    run_cmd(scrape_cmd, workspace_root)
    run_cmd(generate_cmd, workspace_root)

    print("Pipeline complete.")
    print(f"Headwords: {', '.join(headwords) if headwords else '(none)'}")
    if run_tag:
        print(f"Run tag: {run_tag}")
    print(f"Records: {records_jsonl}")
    print(f"Summary: {summary_json}")
    print(f"Candidates/review queues: {candidates_output_dir}")
    # Machine-readable for morphology_pipeline_service (avoids fragile log parsing).
    print(f"PIPELINE_CANDIDATES_DIR_REL={candidates_output_dir}")


if __name__ == "__main__":
    main()
