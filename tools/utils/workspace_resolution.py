#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Resolve verb-website project root for monorepo (bagh/websites/verb-website) or flat repo."""

from __future__ import annotations

from pathlib import Path


def resolve_verb_website_workspace_root(raw_workspace_root: str, script_path: Path) -> Path:
    """
    Return the directory that contains tools/, apps/, etc.

    - If raw_workspace_root is already the verb-website root (contains tools/morphology/...),
      return it as-is.
    - If raw_workspace_root points at a monorepo root containing websites/verb-website/
      with tools/morphology/generate_root_candidates.py, return that inner verb-website directory.
    - If raw_workspace_root is empty, infer from script_path: expect
      .../<verb-website>/tools/morphology/<this>.py -> parents[2].
    """
    raw = str(raw_workspace_root or "").strip()
    if raw:
        p = Path(raw).expanduser().resolve()
        marker_here = p / "tools" / "morphology" / "generate_root_candidates.py"
        if marker_here.is_file():
            return p.resolve()
        inner = p / "websites" / "verb-website"
        marker = inner / "tools" / "morphology" / "generate_root_candidates.py"
        # Marker must be a file; using .is_dir() on the .py path always fails and breaks monorepo roots.
        if inner.is_dir() and marker.is_file():
            return inner.resolve()
        return p
    return script_path.resolve().parents[2]


def candidate_workspace_bases(workspace_root: Path) -> list[Path]:
    """
    Ordered roots to try when resolving repo-relative paths like tools/morphology/...

    If the API was started with a monorepo root (…/bagh) but outputs live under
    …/bagh/websites/verb-website/, we must check the inner project first.
    """
    return workspace_search_bases(workspace_root, Path(__file__))


def workspace_search_bases(workspace_root: Path, script_path: Path) -> list[Path]:
    """
    Roots used to resolve repo-relative paths. Tries, in order:
    1) Project inferred from script_path (…/verb-website when script is under tools/morphology/)
    2) websites/verb-website under workspace_root when that layout exists
    3) workspace_root itself
    """
    seen: set[str] = set()
    out: list[Path] = []

    def add(p: Path) -> None:
        try:
            r = p.expanduser().resolve()
        except OSError:
            return
        k = str(r)
        if k in seen:
            return
        seen.add(k)
        out.append(r)

    try:
        sp = script_path.resolve()
        inferred = sp.parents[2]
        marker = inferred / "tools" / "morphology" / "generate_root_candidates.py"
        if marker.is_file():
            add(inferred)
    except (IndexError, OSError):
        pass

    root = workspace_root.expanduser().resolve()
    inner = (root / "websites" / "verb-website").resolve()
    marker_inner = inner / "tools" / "morphology" / "generate_root_candidates.py"
    if marker_inner.is_file():
        add(inner)
    add(root)
    return out
