#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to test the find_best_do_io_type function.
"""

import json
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from populate_verbs_json import find_best_do_io_type


def debug_find_best(json_file, tense):
    """Debug the find_best_do_io_type function."""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"=== Testing find_best_do_io_type for {tense} tense ===")

    slemma_data = data["slemma_categories"]["ა- (აწერა)"]

    # Test with required_tense parameter
    arg_pattern, do_io_type = find_best_do_io_type(
        slemma_data, prefer_standard=True, required_tense=tense
    )

    print(f"Result: {arg_pattern}, {do_io_type}")

    # Test without required_tense parameter
    arg_pattern2, do_io_type2 = find_best_do_io_type(
        slemma_data, prefer_standard=True, required_tense=None
    )

    print(f"Without required_tense: {arg_pattern2}, {do_io_type2}")


if __name__ == "__main__":
    # Test Fut and Impv tenses
    tenses = ["Fut", "Impv"]

    for tense in tenses:
        debug_find_best(
            "gnc_verb_data_filtered/წერა-raw_comprehensive_data.json", tense
        )
        print()
