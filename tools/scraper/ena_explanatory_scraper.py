#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Scrape ena.ge explanatory dictionary search results via the site's JSON endpoint.

The explanatory search page posts to /explanatory-online with:
  - word_metauri (headword query)
  - word_statia (definition query)
  - nextstep (pagination cursor, starts from "0")

This script paginates using nextstep and exports normalized JSONL records.
"""

from __future__ import annotations

import argparse
import json
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests
from bs4 import BeautifulSoup

SEARCH_URL = "https://ena.ge/explanatory-online"


@dataclass
class SearchRequest:
    headword: str
    definition: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Scrape explanatory dictionary results from ena.ge into JSONL."
    )
    parser.add_argument(
        "--headword",
        action="append",
        default=[],
        help="Headword query (word_metauri). Repeatable.",
    )
    parser.add_argument(
        "--definition",
        action="append",
        default=[],
        help="Definition query (word_statia). Repeatable.",
    )
    parser.add_argument(
        "--query-file",
        help=(
            "Optional JSON file with an array of objects: "
            '[{"headword":"ძლ","definition":""}, ...].'
        ),
    )
    parser.add_argument(
        "--output-jsonl",
        default="src/data/morphology/work/raw/ena-explanatory-records.jsonl",
        help="Output JSONL path (relative to workspace root unless absolute).",
    )
    parser.add_argument(
        "--output-summary",
        default="src/data/morphology/work/raw/ena-explanatory-summary.json",
        help="Output summary JSON path.",
    )
    parser.add_argument(
        "--delay-ms",
        type=int,
        default=400,
        help="Delay between paginated requests in milliseconds (default: 400).",
    )
    parser.add_argument(
        "--max-pages-per-query",
        type=int,
        default=0,
        help="Optional hard page cap per query (0 = unlimited).",
    )
    parser.add_argument(
        "--timeout-sec",
        type=int,
        default=25,
        help="HTTP timeout seconds (default: 25).",
    )
    parser.add_argument(
        "--geo",
        default="1",
        help='Value for "geo" parameter used by the site (default: "1").',
    )
    parser.add_argument(
        "--headword-mode",
        choices=("raw", "startswith", "endswith", "contains"),
        default="raw",
        help=(
            "How to transform headword queries: "
            "raw=as-is, startswith=headword*, endswith=*headword, contains=*headword*."
        ),
    )
    parser.add_argument(
        "--workspace-root",
        default=".",
        help="Workspace root (verb-website project root) for resolving output paths.",
    )
    return parser.parse_args()


def normalize_whitespace(text: str) -> str:
    return " ".join(str(text or "").replace("\xa0", " ").split())


def strip_html(html_text: str) -> str:
    if not html_text:
        return ""
    soup = BeautifulSoup(html_text, "html.parser")
    return normalize_whitespace(soup.get_text(" ", strip=True))


def strip_html_compact(html_text: str) -> str:
    if not html_text:
        return ""
    soup = BeautifulSoup(html_text, "html.parser")
    return normalize_whitespace(soup.get_text("", strip=True))


def parse_queries(args: argparse.Namespace) -> list[SearchRequest]:
    requests_list: list[SearchRequest] = []

    for headword in args.headword:
        requests_list.append(SearchRequest(headword=headword, definition=""))
    for definition in args.definition:
        requests_list.append(SearchRequest(headword="", definition=definition))

    if args.query_file:
        query_path = Path(args.query_file)
        payload = json.loads(query_path.read_text(encoding="utf-8"))
        if not isinstance(payload, list):
            raise ValueError("query-file must contain an array.")
        for item in payload:
            if not isinstance(item, dict):
                continue
            requests_list.append(
                SearchRequest(
                    headword=str(item.get("headword", "")).strip(),
                    definition=str(item.get("definition", "")).strip(),
                )
            )

    if not requests_list:
        raise ValueError(
            "No queries provided. Use --headword/--definition or --query-file."
        )

    cleaned: list[SearchRequest] = []
    seen: set[tuple[str, str]] = set()
    for request_item in requests_list:
        key = (request_item.headword, request_item.definition)
        if key in seen:
            continue
        seen.add(key)
        cleaned.append(request_item)
    return cleaned


def apply_headword_mode(headword: str, mode: str) -> str:
    value = str(headword or "").strip()
    if not value:
        return value
    # Respect explicit wildcard patterns supplied by the caller.
    if "*" in value:
        return value
    if mode == "startswith":
        return f"{value}*"
    if mode == "endswith":
        return f"*{value}"
    if mode == "contains":
        return f"*{value}*"
    return value


def fetch_page(
    session: requests.Session,
    request_item: SearchRequest,
    nextstep: str,
    timeout_sec: int,
    geo: str,
) -> dict[str, Any]:
    payload = {
        "geo": geo,
        "word_metauri": request_item.headword,
        "word_statia": request_item.definition,
        "nextstep": nextstep,
    }
    response = session.post(SEARCH_URL, data=payload, timeout=timeout_sec)
    response.raise_for_status()
    try:
        data = response.json()
    except ValueError as exc:
        raise ValueError("Expected JSON response from ena.ge search endpoint.") from exc
    if not isinstance(data, dict):
        raise ValueError("Unexpected response format (not JSON object).")
    return data


def records_from_page(
    response_json: dict[str, Any],
    request_item: SearchRequest,
    page_index: int,
) -> list[dict[str, Any]]:
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")
    raw_rows = response_json.get("data", [])
    if isinstance(raw_rows, dict):
        data_rows = [value for value in raw_rows.values() if isinstance(value, dict)]
    elif isinstance(raw_rows, list):
        data_rows = [value for value in raw_rows if isinstance(value, dict)]
    else:
        return []

    records: list[dict[str, Any]] = []
    for row in data_rows:
        if not isinstance(row, dict):
            continue
        row_id = row.get("Id")
        lemma_html = str(row.get("word", "") or "")
        lemma = strip_html_compact(lemma_html)
        definition_html = str(row.get("definition", "") or "")
        definition_text = strip_html(definition_html)
        if not lemma and not definition_text:
            continue
        records.append(
            {
                "source": {
                    "provider": "ena.ge",
                    "endpoint": SEARCH_URL,
                    "fetchedAt": now,
                    "query": {
                        "word_metauri": request_item.headword,
                        "word_statia": request_item.definition,
                    },
                    "pageIndex": page_index,
                    "entryId": row_id,
                },
                "entry": {
                    "lemma": lemma,
                    "lemmaHtml": lemma_html,
                    "definitionText": definition_text,
                },
            }
        )
    return records


def resolve_output_path(workspace_root: Path, raw_path: str) -> Path:
    candidate = Path(raw_path)
    if candidate.is_absolute():
        return candidate
    return (workspace_root / candidate).resolve()


def to_repo_relative(path: Path, workspace_root: Path) -> str:
    try:
        return path.resolve().relative_to(workspace_root.resolve()).as_posix()
    except ValueError:
        return path.name


def main() -> None:
    args = parse_args()
    workspace_root = Path(args.workspace_root).resolve()
    queries = parse_queries(args)

    out_jsonl = resolve_output_path(workspace_root, args.output_jsonl)
    out_summary = resolve_output_path(workspace_root, args.output_summary)
    out_jsonl.parent.mkdir(parents=True, exist_ok=True)
    out_summary.parent.mkdir(parents=True, exist_ok=True)

    delay_sec = max(0, args.delay_ms) / 1000.0
    unique_keys: set[str] = set()
    all_records: list[dict[str, Any]] = []
    query_stats: list[dict[str, Any]] = []

    session = requests.Session()
    session.headers.update(
        {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/124.0 Safari/537.36"
            ),
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Origin": "https://ena.ge",
            "Referer": "https://ena.ge/explanatory-online",
        }
    )

    for request_item in queries:
        effective_request = SearchRequest(
            headword=apply_headword_mode(request_item.headword, args.headword_mode),
            definition=request_item.definition,
        )
        nextstep = "0"
        page_index = 0
        per_query_records = 0
        seen_nextsteps: set[str] = set()
        while True:
            if nextstep in seen_nextsteps:
                query_stats.append(
                    {
                        "query": {
                            "word_metauri": effective_request.headword,
                            "word_statia": effective_request.definition,
                        },
                        "pagesFetched": page_index,
                        "recordsCollected": per_query_records,
                        "reportedSumSearch": "stopped: repeated nextstep cursor",
                    }
                )
                break
            seen_nextsteps.add(nextstep)

            page_index += 1
            payload = fetch_page(
                session=session,
                request_item=effective_request,
                nextstep=nextstep,
                timeout_sec=args.timeout_sec,
                geo=str(args.geo),
            )
            page_records = records_from_page(payload, effective_request, page_index)
            for record in page_records:
                key = json.dumps(
                    {
                        "lemma": record["entry"]["lemma"],
                        "definitionText": record["entry"]["definitionText"],
                        "entryId": record["source"]["entryId"],
                    },
                    ensure_ascii=False,
                    sort_keys=True,
                )
                if key in unique_keys:
                    continue
                unique_keys.add(key)
                all_records.append(record)
                per_query_records += 1

            info = payload.get("info", {}) if isinstance(payload, dict) else {}
            nextstep_value = str(info.get("nextstep", "")).strip()
            has_more = bool(nextstep_value and nextstep_value != "0")

            # ena.ge uses negative values (for example "-1") as terminal cursor.
            try:
                if int(nextstep_value) < 0:
                    has_more = False
            except ValueError:
                pass

            if args.max_pages_per_query > 0 and page_index >= args.max_pages_per_query:
                has_more = False

            if not has_more:
                query_stats.append(
                    {
                        "query": {
                            "word_metauri": effective_request.headword,
                            "word_statia": effective_request.definition,
                        },
                        "pagesFetched": page_index,
                        "recordsCollected": per_query_records,
                        "reportedSumSearch": str(info.get("sumSearch", "")).strip(),
                    }
                )
                break

            nextstep = nextstep_value
            time.sleep(delay_sec)

    with out_jsonl.open("w", encoding="utf-8") as handle:
        for record in all_records:
            handle.write(json.dumps(record, ensure_ascii=False) + "\n")

    summary_payload = {
        "source": {"provider": "ena.ge", "endpoint": SEARCH_URL},
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "queryCount": len(queries),
        "recordCount": len(all_records),
        "queries": query_stats,
        "outputs": {
            "jsonl": to_repo_relative(out_jsonl, workspace_root),
        },
    }
    out_summary.write_text(
        json.dumps(summary_payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Saved records: {len(all_records)} -> {out_jsonl}")
    print(f"Saved summary -> {out_summary}")


if __name__ == "__main__":
    main()
