#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple debug script to test the find_best_do_io_type function step by step.
"""

import json


def debug_simple(json_file, tense):
    """Debug the find_best_do_io_type function step by step."""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"=== Testing {tense} tense step by step ===")

    slemma_data = data["slemma_categories"]["ა- (აწერა)"]

    # Define priority order
    do_io_types = ["Standard", "Non-Standard"]
    arg_pattern_priority = ["<S-DO>", "<S-IO>", "<S>", "<S-DO-IO>"]

    best_arg_pattern = None
    best_do_io_type = None
    max_count = 0

    for do_io_type in do_io_types:
        print(f"\nChecking {do_io_type}:")
        if do_io_type in slemma_data["do_io_types"]:
            for preferred_pattern in arg_pattern_priority:
                if preferred_pattern in slemma_data["do_io_types"][do_io_type]:
                    pattern_data = slemma_data["do_io_types"][do_io_type][
                        preferred_pattern
                    ]

                    # Check if it has the required tense
                    available_tenses = set()
                    for form in pattern_data.get("forms", []):
                        tense_val = form.get("parsed_features", {}).get("tense")
                        if tense_val:
                            available_tenses.add(tense_val)

                    print(
                        f"  {preferred_pattern}: {pattern_data['count']} forms, tenses: {sorted(available_tenses)}"
                    )

                    if tense in available_tenses:
                        print(f"    *** HAS {tense} TENSE ***")
                        if pattern_data["count"] > max_count:
                            max_count = pattern_data["count"]
                            best_arg_pattern = preferred_pattern
                            best_do_io_type = do_io_type
                            print(
                                f"    *** NEW BEST: {best_arg_pattern}, {best_do_io_type}, count: {max_count} ***"
                            )
                    else:
                        print(f"    *** NO {tense} TENSE ***")

    print(f"\nFinal result: {best_arg_pattern}, {best_do_io_type}")


if __name__ == "__main__":
    # Test Fut and Impv tenses
    tenses = ["Fut", "Impv"]

    for tense in tenses:
        debug_simple("gnc_verb_data_filtered/წერა-raw_comprehensive_data.json", tense)
        print()
