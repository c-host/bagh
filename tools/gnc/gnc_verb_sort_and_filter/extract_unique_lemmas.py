#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract unique lemmas from a GNC concordance .txt file.

Expected input format:
- UTF-8 text
- Tab-separated columns
- Comment/header lines start with '#'
- Lemma is in the 3rd column (index 2)

Usage:
  python extract_unique_lemmas.py <input_file>
  python extract_unique_lemmas.py <input_file> -o <output_file>
"""

import argparse
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Extract every unique lemma from a GNC concordance text file."
    )
    parser.add_argument("input_file", help="Path to the input .txt concordance file")
    parser.add_argument(
        "-o",
        "--output",
        help=(
            "Optional output path. Defaults to '<input_stem>-unique-lemmas.txt' "
            "in the same directory as the input file."
        ),
    )
    return parser.parse_args()


def default_output_path(input_path: Path) -> Path:
    return input_path.with_name(f"{input_path.stem}-unique-lemmas.txt")


def extract_unique_lemmas(input_path: Path) -> list[str]:
    lemmas = set()

    with input_path.open("r", encoding="utf-8") as infile:
        for raw_line in infile:
            line = raw_line.rstrip("\n")
            if not line or line.startswith("#"):
                continue

            parts = line.split("\t")
            if len(parts) < 3:
                continue

            lemma = parts[2].strip()
            if lemma:
                lemmas.add(lemma)

    return sorted(lemmas)


def main() -> None:
    args = parse_args()
    input_path = Path(args.input_file)

    if not input_path.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    output_path = Path(args.output) if args.output else default_output_path(input_path)
    unique_lemmas = extract_unique_lemmas(input_path)

    with output_path.open("w", encoding="utf-8") as outfile:
        outfile.write("\n".join(unique_lemmas))
        outfile.write("\n")

    print(f"Unique lemmas: {len(unique_lemmas)}")
    print(f"Saved to: {output_path}")


if __name__ == "__main__":
    main()
