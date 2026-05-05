#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate morphology candidate JSON files from dictionary-style corpus text files.

This script is intentionally conservative. It extracts entries, assigns heuristic
relation labels and confidence scores, and outputs review-ready candidate files.
"""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Iterable, Optional
from urllib.parse import parse_qs, urlencode, urljoin, urlparse

import requests
from bs4 import BeautifulSoup

from verb_website_workspace import resolve_verb_website_workspace_root


@dataclass(frozen=True)
class RootConfig:
    root_id: str
    root_ka: str
    root_en: str
    output_stem: str
    include_substrings: tuple[str, ...]
    exclude_substrings: tuple[str, ...]


DERIVATIONAL_SIGNALS = (
    "ზმნის მოქმედებისა",
    "სახელი",
    "მიმღ.",
    "კაუზატ.",
)

SUFFIX_TO_POS = {
    "ება": "verbal noun",
    "ობა": "abstract noun",
    "ებული": "past participle",
    "ავი": "adjective/participle",
    "ელი": "participle/adjective",
    "ური": "adjective",
    "იანი": "adjective",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate morphology candidate files from corpus text."
    )
    parser.add_argument(
        "--workspace-root",
        default=".",
        help=(
            "verb-website project root (contains tools/ and morphology-chart/). "
            "Use '.' from that directory, or pass a monorepo root that contains websites/verb-website/."
        ),
    )
    parser.add_argument(
        "--output-dir",
        default="src/data/morphology/work/candidates",
        help="Output directory for candidate JSON files (relative to workspace root).",
    )
    parser.add_argument(
        "--charts-json",
        default="morphology-chart/data/charts.json",
        help="Path to existing chart JSON used for overlap signal (relative to workspace root).",
    )
    parser.add_argument(
        "--review-min-confidence",
        type=float,
        default=0.55,
        help="Minimum confidence for review queue output (default: 0.55).",
    )
    parser.add_argument(
        "--ena-records-jsonl",
        default="",
        help=(
            "Optional scraped ena.ge records JSONL path. "
            "If provided, candidates are generated from this file instead of corp-txt files."
        ),
    )
    parser.add_argument(
        "--root-token",
        action="append",
        default=[],
        help=(
            "Repeatable root token (e.g. --root-token შეცვლ). "
            "When provided, candidate/review files are generated per token."
        ),
    )
    parser.add_argument(
        "--use-gnc",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Enable GNC parsing enrichment for each candidate lemma.",
    )
    parser.add_argument(
        "--drop-not-found-on-gnc",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="When GNC is enabled, drop lemmas that return no GNC analysis.",
    )
    parser.add_argument(
        "--review-require-gnc-deriv",
        action=argparse.BooleanOptionalAction,
        default=False,
        help=(
            "When building review queue, require GNC derivational signals "
            "(VN/PresPart/FutPart/PastPart/NegPart/Part)."
        ),
    )
    parser.add_argument(
        "--use-nplg",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="Enable NPLG Georgian-English dictionary enrichment per candidate lemma.",
    )
    parser.add_argument(
        "--drop-not-found-on-nplg",
        action=argparse.BooleanOptionalAction,
        default=False,
        help="When NPLG is enabled, drop lemmas with no dictionary d=46 matches.",
    )
    parser.add_argument(
        "--nplg-cache-json",
        default="src/data/morphology/work/raw/nplg-cache.json",
        help="Persistent cache file for NPLG lookups.",
    )
    return parser.parse_args()


def normalize_whitespace(text: str) -> str:
    return " ".join(str(text or "").replace("\xa0", " ").split())


def extract_entries(corpus_file: Path) -> list[tuple[str, str]]:
    entries: list[tuple[str, str]] = []
    with corpus_file.open("r", encoding="utf-8") as handle:
        for raw_line in handle:
            line = raw_line.strip()
            if not line or "\t" not in line:
                continue
            lemma, definition = line.split("\t", 1)
            lemma = lemma.strip()
            definition = definition.strip()
            if lemma:
                entries.append((lemma, definition))
    return entries


def extract_entries_from_ena_jsonl(records_jsonl: Path) -> list[tuple[str, str]]:
    entries: list[tuple[str, str]] = []
    with records_jsonl.open("r", encoding="utf-8") as handle:
        for raw_line in handle:
            line = raw_line.strip()
            if not line:
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            if not isinstance(row, dict):
                continue
            entry = row.get("entry", {})
            if not isinstance(entry, dict):
                continue
            lemma = str(entry.get("lemma", "")).strip()
            definition = str(entry.get("definitionText", "")).strip()
            if lemma:
                entries.append((lemma, definition))
    return entries


def extract_root_tokens_from_ena_jsonl(records_jsonl: Path) -> list[str]:
    tokens: list[str] = []
    seen: set[str] = set()
    with records_jsonl.open("r", encoding="utf-8") as handle:
        for raw_line in handle:
            line = raw_line.strip()
            if not line:
                continue
            try:
                row = json.loads(line)
            except json.JSONDecodeError:
                continue
            if not isinstance(row, dict):
                continue
            source = row.get("source", {})
            if not isinstance(source, dict):
                continue
            query = source.get("query", {})
            if not isinstance(query, dict):
                continue
            raw_headword = str(query.get("word_metauri", "")).strip()
            normalized = normalize_root_token(raw_headword)
            if not normalized or normalized in seen:
                continue
            seen.add(normalized)
            tokens.append(normalized)
    return tokens


def load_chart_lemmas(charts_path: Path) -> set[str]:
    if not charts_path.exists():
        return set()
    payload = json.loads(charts_path.read_text(encoding="utf-8"))
    lemmas: set[str] = set()

    def walk(node: dict) -> None:
        lemma = node.get("ka")
        if lemma:
            lemmas.add(str(lemma))
        for child in node.get("children", []):
            walk(child)

    for chart in payload.get("charts", []):
        root = chart.get("root")
        if isinstance(root, dict):
            walk(root)
    return lemmas


def guess_pos(lemma: str) -> str:
    for suffix, pos in SUFFIX_TO_POS.items():
        if lemma.endswith(suffix):
            return pos
    return "unspecified"


def classify_pos_from_gnc_features(features: str) -> tuple[str, bool]:
    tokens = set(str(features or "").split())
    if "VN" in tokens:
        return "verbal noun", True
    if "PastPart" in tokens:
        return "past participle", True
    if "FutPart" in tokens:
        return "future participle", True
    if "PresPart" in tokens:
        return "present participle", True
    if "NegPart" in tokens:
        return "negative participle", True
    if "Part" in tokens:
        return "participle", True
    if "V" in tokens:
        return "verb", False
    if "N" in tokens:
        return "noun", False
    if "A" in tokens:
        return "adjective", False
    return "unspecified", False


def maybe_init_gnc_parser(workspace_root: Path):
    sys.path.insert(0, str(workspace_root.resolve()))
    try:
        from tools.gnc.gnc_parser_utility import GNCParserUtility  # type: ignore
    except Exception as error:  # pragma: no cover - best effort import
        raise RuntimeError(
            "Failed to import GNCParserUtility. Check tools/gnc module availability."
        ) from error
    return GNCParserUtility()


class NPLGDictionaryClient:
    def __init__(self, dictionary_id: str = "46", initial_cache: Optional[dict] = None):
        self.dictionary_id = dictionary_id
        self.base_url = "http://www.nplg.gov.ge/gwdict/index.php"
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/124.0 Safari/537.36"
                ),
            }
        )
        self.cache: dict[str, dict] = initial_cache if isinstance(initial_cache, dict) else {}
        self.term_cache: dict[str, tuple[str, str]] = {}

    @staticmethod
    def _norm_head(term: str) -> str:
        return str(term or "").split("(", 1)[0].strip().lower()

    @staticmethod
    def _clean_gloss(text: str) -> str:
        raw = " ".join(str(text or "").split())
        if "წყარო:" in raw:
            raw = raw.split("წყარო:", 1)[0].strip()
        if "Source:" in raw:
            raw = raw.split("Source:", 1)[0].strip()
        if "=წყარო:" in raw:
            raw = raw.split("=წყარო:", 1)[0].strip()
        if "=დიდი ქართულ-ინგლისური ლექსიკონი" in raw:
            raw = raw.split("=დიდი ქართულ-ინგლისური ლექსიკონი", 1)[0].strip()
        return raw

    def _parse_term_page(self, soup: BeautifulSoup) -> tuple[str, str]:
        term = normalize_whitespace(soup.find("h1").get_text(" ", strip=True)) if soup.find("h1") else ""
        defn = soup.select_one("div.defn")
        gloss = self._clean_gloss(defn.get_text(" ", strip=True) if defn else "")
        return term, gloss

    def _fetch_term_gloss(self, term_url: str) -> tuple[str, str]:
        clean_url = str(term_url or "").strip()
        if not clean_url:
            return "", ""
        if clean_url in self.term_cache:
            return self.term_cache[clean_url]
        try:
            response = self.session.get(clean_url, timeout=12)
            response.raise_for_status()
        except requests.RequestException:
            self.term_cache[clean_url] = ("", "")
            return "", ""
        soup = BeautifulSoup(response.text, "html.parser")
        parsed = self._parse_term_page(soup)
        self.term_cache[clean_url] = parsed
        return parsed

    def lookup(self, lemma: str) -> dict:
        key = str(lemma or "").strip()
        if not key:
            return {
                "found": False,
                "matchCount": 0,
                "bestTerm": "",
                "enGloss": "",
                "searchUrl": "",
                "termUrl": "",
            }
        if key in self.cache:
            return self.cache[key]

        params = {
            "a": "srch",
            "d": self.dictionary_id,
            "q": key,
            "srch[adv]": "all",
            "srch[by]": "d",
            "srch[in]": "-1",
        }
        search_url = f"{self.base_url}?{urlencode(params)}"
        try:
            response = self.session.get(self.base_url, params=params, timeout=12)
            response.raise_for_status()
        except requests.RequestException:
            result = {
                "found": False,
                "matchCount": 0,
                "bestTerm": "",
                "enGloss": "",
                "searchUrl": search_url,
                "termUrl": "",
            }
            self.cache[key] = result
            return result

        soup = BeautifulSoup(response.text, "html.parser")
        final_url = str(response.url or "").strip()
        final_qs = parse_qs(urlparse(final_url).query)
        if str(final_qs.get("a", [""])[0]).strip() == "term":
            best_term, gloss = self._parse_term_page(soup)
            result = {
                "found": bool(best_term or gloss),
                "matchCount": 1 if (best_term or gloss) else 0,
                "bestTerm": best_term,
                "enGloss": gloss,
                "searchUrl": search_url,
                "termUrl": final_url,
            }
            self.cache[key] = result
            return result

        pairs: list[dict] = []
        for dl in soup.find_all("dl"):
            dts = dl.find_all("dt", recursive=False)
            dds = dl.find_all("dd", recursive=False)
            for i, dt in enumerate(dts):
                term_text = dt.get_text(" ", strip=True)
                if not term_text:
                    continue
                dd_text = dds[i].get_text(" ", strip=True) if i < len(dds) else ""
                term_link = dt.find("a", href=True)
                term_url = urljoin(self.base_url, term_link["href"]) if term_link else ""
                pairs.append(
                    {
                        "term": term_text,
                        "gloss": self._clean_gloss(dd_text),
                        "url": term_url,
                    }
                )

        if not pairs:
            result = {
                "found": False,
                "matchCount": 0,
                "bestTerm": "",
                "enGloss": "",
                "searchUrl": search_url,
                "termUrl": "",
            }
            self.cache[key] = result
            return result

        target = key.lower()
        exact = [p for p in pairs if self._norm_head(p["term"]) == target]
        if exact:
            best = exact[0]
        else:
            contains = [p for p in pairs if target in self._norm_head(p["term"])]
            best = contains[0] if contains else pairs[0]

        best_gloss = best["gloss"]
        if not best_gloss and best["url"]:
            _, term_gloss = self._fetch_term_gloss(best["url"])
            best_gloss = term_gloss

        result = {
            "found": bool(best["term"] or best_gloss or best["url"]),
            "matchCount": len(pairs),
            "bestTerm": best["term"],
            "enGloss": best_gloss,
            "searchUrl": search_url,
            "termUrl": best["url"],
        }
        self.cache[key] = result
        return result


def analyze_candidate_with_gnc(gnc_parser, lemma: str) -> dict:
    analysis = gnc_parser.parse_word(lemma)
    def _empty_result() -> dict:
        return {
            "found": False,
            "lemma": "",
            "features": "",
            "posGuess": "unspecified",
            "isDerivationalType": False,
            "analysisCount": 0,
            "recognized": False,
        }

    if not analysis:
        return _empty_result()

    features = str(analysis.features or "").strip()
    lemma_out = str(analysis.lemma or "").strip()
    analysis_count = int(getattr(analysis, "analysis_count", 0) or 0)

    # GNC sometimes returns placeholder/unrecognized analyses; treat those as not found.
    is_recognized = bool(
        features
        and "Unrecognized" not in features
        and lemma_out
        and lemma_out not in {"??", "?"}
    )
    if not is_recognized:
        empty = _empty_result()
        empty["analysisCount"] = analysis_count
        return empty

    gnc_pos_guess, is_deriv_type = classify_pos_from_gnc_features(features)
    return {
        "found": True,
        "lemma": lemma_out,
        "features": features,
        "posGuess": gnc_pos_guess,
        "isDerivationalType": is_deriv_type,
        "analysisCount": analysis_count,
        "recognized": True,
    }


def infer_relation(lemma: str, cfg: RootConfig) -> str:
    if any(ex in lemma for ex in cfg.exclude_substrings):
        return "orthographic_neighbor"
    if "-" in lemma:
        return "compound_with"
    if any(token in lemma for token in cfg.include_substrings):
        return "derived_from"
    return "semantic_neighbor"


def score_candidate(
    lemma: str,
    definition: str,
    relation: str,
    chart_lemmas: set[str],
    root_lemmas: set[str],
    cfg: RootConfig,
) -> tuple[float, list[dict[str, str]]]:
    score = 0.0
    evidence: list[dict[str, str]] = []

    if any(signal in definition for signal in DERIVATIONAL_SIGNALS):
        score += 0.35
        evidence.append({"type": "definition_signal", "text": "derivational marker"})

    matched_suffix = next((s for s in SUFFIX_TO_POS if lemma.endswith(s)), None)
    if matched_suffix:
        score += 0.20
        evidence.append({"type": "suffix_match", "text": f"matched -{matched_suffix}"})

    # Parent hint: a shorter lemma in same family that is a suffix-stripped candidate.
    if matched_suffix:
        base = lemma[: -len(matched_suffix)]
        parent = next((candidate for candidate in root_lemmas if candidate.startswith(base) and candidate != lemma), "")
        if parent:
            score += 0.15
            evidence.append({"type": "parent_hint", "text": parent})

    if matched_suffix and guess_pos(lemma) != "unspecified":
        score += 0.10
        evidence.append({"type": "pos_coherence", "text": guess_pos(lemma)})

    if lemma in chart_lemmas:
        score += 0.10
        evidence.append({"type": "chart_overlap", "text": "already in charts.json"})

    if relation == "orthographic_neighbor":
        score -= 0.30
        evidence.append({"type": "penalty", "text": "likely orthographic neighbor"})
    elif relation == "semantic_neighbor":
        score -= 0.20
        evidence.append({"type": "penalty", "text": "weak morphological signal"})

    if any(ex in lemma for ex in cfg.exclude_substrings):
        score -= 0.20
        evidence.append({"type": "penalty", "text": "contains excluded substring"})

    score = max(0.0, min(1.0, score))
    return round(score, 2), evidence


def confidence_bucket(score: float) -> str:
    if score >= 0.80:
        return "high"
    if score >= 0.55:
        return "medium"
    return "low"


def to_repo_relative(path: Path, workspace_root: Path) -> str:
    try:
        return path.resolve().relative_to(workspace_root.resolve()).as_posix()
    except ValueError:
        # Fallback for paths outside workspace_root.
        return path.name


def load_nplg_cache(cache_path: Path) -> dict:
    if not cache_path.exists():
        return {}
    try:
        payload = json.loads(cache_path.read_text(encoding="utf-8"))
    except Exception:
        return {}
    if not isinstance(payload, dict):
        return {}
    cache = payload.get("cache", payload)
    return cache if isinstance(cache, dict) else {}


def save_nplg_cache(cache_path: Path, cache: dict) -> None:
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "updatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "cache": cache,
    }
    cache_path.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def sanitize_stem(value: str) -> str:
    raw = str(value or "").strip()
    if not raw:
        return "root"
    cleaned = "".join(ch if (ch.isalnum() or ch in "-_") else "_" for ch in raw)
    while "__" in cleaned:
        cleaned = cleaned.replace("__", "_")
    cleaned = cleaned.strip("_")
    return cleaned or "root"


def normalize_root_token(token: str) -> str:
    value = str(token or "").strip()
    return value.replace("*", "").strip()


def build_root_configs_from_tokens(tokens: list[str]) -> list[RootConfig]:
    configs: list[RootConfig] = []
    seen: set[str] = set()
    for index, token in enumerate(tokens, 1):
        normalized = normalize_root_token(token)
        if not normalized or normalized in seen:
            continue
        seen.add(normalized)
        stem = sanitize_stem(normalized)
        configs.append(
            RootConfig(
                root_id=f"query-root-{stem}",
                root_ka=f"{normalized}-",
                root_en=f"derived from query token: {normalized}",
                output_stem=stem,
                include_substrings=(normalized,),
                exclude_substrings=(),
            )
        )
    return configs


def generate_for_root(
    cfg: RootConfig,
    chart_lemmas: set[str],
    source_files: Iterable[str],
    entries: list[tuple[str, str]],
    gnc_parser=None,
    drop_not_found_on_gnc: bool = False,
    nplg_client: Optional[NPLGDictionaryClient] = None,
    drop_not_found_on_nplg: bool = False,
) -> dict:
    root_entries = [
        (lemma, definition)
        for lemma, definition in entries
        if any(token in lemma for token in cfg.include_substrings)
    ]

    # Keep first-seen definition per lemma to reduce duplicate dictionary rows.
    lemma_to_definition: dict[str, str] = {}
    for lemma, definition in root_entries:
        lemma_to_definition.setdefault(lemma, definition)

    root_lemmas = set(lemma_to_definition.keys())
    candidates = []
    buckets = Counter({"high": 0, "medium": 0, "low": 0})
    gnc_not_found = 0
    nplg_not_found = 0

    for lemma in sorted(root_lemmas):
        definition = lemma_to_definition[lemma]
        gnc_info = (
            analyze_candidate_with_gnc(gnc_parser, lemma)
            if gnc_parser is not None
            else None
        )
        if gnc_info and not gnc_info["found"] and drop_not_found_on_gnc:
            gnc_not_found += 1
            continue
        nplg_info = nplg_client.lookup(lemma) if nplg_client is not None else None
        if nplg_info and not nplg_info["found"] and drop_not_found_on_nplg:
            nplg_not_found += 1
            continue

        relation = infer_relation(lemma, cfg)
        score, evidence = score_candidate(
            lemma=lemma,
            definition=definition,
            relation=relation,
            chart_lemmas=chart_lemmas,
            root_lemmas=root_lemmas,
            cfg=cfg,
        )
        bucket = confidence_bucket(score)
        buckets[bucket] += 1

        candidates.append(
            {
                "lemma": lemma,
                "normalizedLemma": lemma,
                "definitionSnippet": definition[:260],
                "posGuess": (
                    gnc_info["posGuess"]
                    if gnc_info and gnc_info.get("found") and gnc_info.get("posGuess")
                    else guess_pos(lemma)
                ),
                "relation": relation,
                "parentLemma": "",
                "pattern": "substring+suffix heuristics",
                "confidence": score,
                "evidence": evidence,
                "gnc": gnc_info
                if gnc_info
                else {
                    "found": False,
                    "lemma": "",
                    "features": "",
                    "posGuess": "",
                    "isDerivationalType": False,
                    "analysisCount": 0,
                    "recognized": False,
                },
                "nplg": nplg_info
                if nplg_info
                else {
                    "found": False,
                    "matchCount": 0,
                    "bestTerm": "",
                    "enGloss": "",
                    "searchUrl": "",
                    "termUrl": "",
                },
                "status": "candidate",
                "review": {
                    "decision": "pending",
                    "reviewer": "",
                    "notes": "",
                },
            }
        )

    return {
        "root": {
            "id": cfg.root_id,
            "ka": cfg.root_ka,
            "en": cfg.root_en,
        },
        "generatedAt": datetime.now().astimezone().isoformat(timespec="seconds"),
        "source": {
            "provider": "ena.ge",
            "sourceFiles": list(source_files),
        },
        "summary": {
            "totalCandidates": len(candidates),
            "highConfidence": buckets["high"],
            "mediumConfidence": buckets["medium"],
            "lowConfidence": buckets["low"],
            "gncNotFoundDropped": gnc_not_found,
            "nplgNotFoundDropped": nplg_not_found,
        },
        "candidates": candidates,
    }


def is_review_pos_allowed_with_gnc(candidate: dict) -> bool:
    gnc = candidate.get("gnc", {}) if isinstance(candidate, dict) else {}
    if not isinstance(gnc, dict):
        return False
    if not gnc.get("found"):
        return False
    pos = str(gnc.get("posGuess", "")).strip().lower()
    allowed = {
        "noun",
        "verbal noun",
        "adjective",
        "participle",
        "past participle",
        "future participle",
        "present participle",
        "negative participle",
    }
    return pos in allowed


def main() -> None:
    args = parse_args()
    workspace_root = resolve_verb_website_workspace_root(args.workspace_root, Path(__file__))
    output_dir = (workspace_root / args.output_dir).resolve()
    charts_path = (workspace_root / args.charts_json).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    ena_records_jsonl = (workspace_root / args.ena_records_jsonl).resolve() if args.ena_records_jsonl else None
    entries: list[tuple[str, str]]
    source_files: list[Path]

    if not ena_records_jsonl:
        raise ValueError(
            "--ena-records-jsonl is required. "
            "This generator now operates only from scraped ena records."
        )
    if not ena_records_jsonl.exists():
        raise FileNotFoundError(f"Missing ena records JSONL file: {ena_records_jsonl}")
    entries = extract_entries_from_ena_jsonl(ena_records_jsonl)
    source_files = [ena_records_jsonl]
    gnc_parser = maybe_init_gnc_parser(workspace_root) if args.use_gnc else None
    nplg_cache_path = (workspace_root / args.nplg_cache_json).resolve()
    nplg_client = (
        NPLGDictionaryClient(initial_cache=load_nplg_cache(nplg_cache_path))
        if args.use_nplg
        else None
    )

    relative_source_files = [to_repo_relative(path, workspace_root) for path in source_files]

    chart_lemmas = load_chart_lemmas(charts_path)

    root_tokens = list(args.root_token)
    if not root_tokens:
        root_tokens = extract_root_tokens_from_ena_jsonl(ena_records_jsonl)
    roots = build_root_configs_from_tokens(root_tokens)
    if not roots:
        raise ValueError(
            "No root tokens found. Provide --root-token values or ensure "
            "records contain source.query.word_metauri."
        )

    for cfg in roots:
        payload = generate_for_root(
            cfg,
            chart_lemmas,
            relative_source_files,
            entries,
            gnc_parser=gnc_parser,
            drop_not_found_on_gnc=args.drop_not_found_on_gnc,
            nplg_client=nplg_client,
            drop_not_found_on_nplg=args.drop_not_found_on_nplg,
        )
        output_path = output_dir / f"{cfg.output_stem}-candidates.json"
        output_path.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )
        review_queue = {
            "root": payload["root"],
            "generatedAt": payload["generatedAt"],
            "source": payload["source"],
            "criteria": {
                "minConfidence": args.review_min_confidence,
                "allowedRelations": ["derived_from", "compound_with"],
            },
            "summary": {
                "totalReviewItems": 0,
            },
            "candidates": [],
        }
        review_items = [
            candidate
            for candidate in payload["candidates"]
            if (
                (
                    # GNC mode: include POS-allowed words found in GNC (ignore confidence).
                    args.use_gnc and is_review_pos_allowed_with_gnc(candidate)
                )
                or (
                    # Non-GNC mode: previous heuristic behavior.
                    (not args.use_gnc)
                    and candidate["confidence"] >= args.review_min_confidence
                    and candidate["relation"] in {"derived_from", "compound_with"}
                )
            )
            and (
                not args.review_require_gnc_deriv
                or bool(candidate.get("gnc", {}).get("isDerivationalType"))
            )
        ]
        review_queue["candidates"] = review_items
        review_queue["summary"]["totalReviewItems"] = len(review_items)
        review_path = output_dir / f"{cfg.output_stem}-review-queue.json"
        review_path.write_text(
            json.dumps(review_queue, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

        print(
            f"Saved {output_path} ({payload['summary']['totalCandidates']} candidates); "
            f"review queue: {review_path.name} ({len(review_items)} items)"
        )

    if nplg_client is not None:
        save_nplg_cache(nplg_cache_path, nplg_client.cache)


if __name__ == "__main__":
    main()
