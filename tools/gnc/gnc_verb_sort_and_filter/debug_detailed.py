#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Detailed debug script to understand why Fut and Impv tenses are not found.
"""

import json
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from populate_verbs_json import select_forms_for_tense, get_forms_for_slemma, find_best_do_io_type

def debug_detailed_tense_selection(json_file, tense):
    """Debug tense selection with detailed output."""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    print(f"=== Testing {tense} tense ===")
    
    slemma_categories = data["slemma_categories"]
    available_preverbs = data["metadata"]["available_preverbs"]
    
    print(f"Available preverbs: {available_preverbs}")
    
    # First try Non-Preverb forms
    non_preverb_category = None
    for category in slemma_categories.keys():
        if category.startswith("Non-Preverb") or category.startswith("Base"):
            non_preverb_category = category
            break
    
    print(f"Non-Preverb category: {non_preverb_category}")
    
    if non_preverb_category:
        slemma_data = slemma_categories[non_preverb_category]
        most_common_arg_pattern, most_common_do_io_type = find_best_do_io_type(
            slemma_data, prefer_standard=True
        )
        print(f"Best argument pattern: {most_common_arg_pattern}, DO/IO type: {most_common_do_io_type}")
        
        if most_common_arg_pattern and most_common_do_io_type:
            forms = get_forms_for_slemma(
                data,
                non_preverb_category,
                most_common_do_io_type,
                most_common_arg_pattern,
                tense,
                "Non-Version",
                ["SV", "LV", "OV", "Non-Version"],
            )
            if forms:
                print(f"Found {len(forms)} Non-Preverb forms for {tense}")
                return forms
            else:
                print(f"No Non-Preverb forms found for {tense}")
    
    # Fallback: Try preverb forms
    target_preverb = None
    if "მი-" in available_preverbs:
        target_preverb = "მი-"
    else:
        if available_preverbs:
            target_preverb = sorted(available_preverbs)[0]
    
    print(f"Target preverb: {target_preverb}")
    
    if target_preverb:
        target_category = None
        for category in slemma_categories.keys():
            if category.startswith(target_preverb):
                target_category = category
                break
        
        print(f"Target category: {target_category}")
        
        if target_category:
            slemma_data = slemma_categories[target_category]
            most_common_arg_pattern, most_common_do_io_type = find_best_do_io_type(
                slemma_data, prefer_standard=True
            )
            print(f"Best argument pattern: {most_common_arg_pattern}, DO/IO type: {most_common_do_io_type}")
            
            if most_common_arg_pattern and most_common_do_io_type:
                forms = get_forms_for_slemma(
                    data,
                    target_category,
                    most_common_do_io_type,
                    most_common_arg_pattern,
                    tense,
                    "Non-Version",
                    ["SV", "LV", "OV", "Non-Version"],
                )
                if forms:
                    print(f"Found {len(forms)} preverb forms for {tense}")
                    return forms
                else:
                    print(f"No preverb forms found for {tense}")
    
    print(f"No forms found for {tense}")
    return []

if __name__ == "__main__":
    # Test Fut and Impv tenses specifically
    tenses = ["Fut", "Impv"]
    
    for tense in tenses:
        debug_detailed_tense_selection("gnc_verb_data_filtered/წერა-raw_comprehensive_data.json", tense)
        print()
