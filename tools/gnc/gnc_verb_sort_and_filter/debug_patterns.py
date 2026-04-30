#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to check what argument patterns are available in the ა- category.
"""

import json


def debug_patterns(json_file):
    """Debug argument patterns in the ა- category."""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    print("=== ა- (აწერა) Category Patterns ===")

    slemma_data = data["slemma_categories"]["ა- (აწერა)"]

    for do_io_type, patterns in slemma_data["do_io_types"].items():
        print(f"\n{do_io_type}:")
        for pattern, pattern_data in patterns.items():
            print(f"  {pattern}: {pattern_data['count']} forms")

            # Check what tenses are available
            tenses = set()
            for form in pattern_data["forms"]:
                tense = form.get("parsed_features", {}).get("tense")
                if tense:
                    tenses.add(tense)
            print(f"    Available tenses: {sorted(tenses)}")

            # Check specifically for Fut and Impv
            if "Fut" in tenses:
                print(f"    *** HAS FUT TENSE ***")
            if "Impv" in tenses:
                print(f"    *** HAS IMPV TENSE ***")


if __name__ == "__main__":
    debug_patterns("gnc_verb_data_filtered/წერა-raw_comprehensive_data.json")
