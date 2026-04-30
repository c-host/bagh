#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to understand why the populate_verbs_json.py script is not finding all tenses.
"""

import json

def debug_comprehensive_data(json_file):
    """Debug the comprehensive data structure."""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    print("=== METADATA ===")
    print(f"Available preverbs: {data['metadata']['available_preverbs']}")
    print(f"Has multiple preverbs: {data['metadata']['has_multiple_preverbs']}")
    
    print("\n=== SLEMMA CATEGORIES ===")
    for category, slemma_data in data["slemma_categories"].items():
        print(f"\nCategory: {category}")
        print(f"Preverb: {slemma_data['preverb']}")
        print(f"Base form: {slemma_data['base_form']}")
        
        for do_io_type, patterns in slemma_data["do_io_types"].items():
            print(f"  {do_io_type}:")
            for pattern, pattern_data in patterns.items():
                print(f"    {pattern}: {pattern_data['count']} forms")
                
                # Check what tenses are available
                tenses = set()
                for form in pattern_data["forms"]:
                    tense = form.get("parsed_features", {}).get("tense")
                    if tense:
                        tenses.add(tense)
                print(f"      Available tenses: {sorted(tenses)}")
    
    print("\n=== COMPREHENSIVE CONJUGATIONS ===")
    for category, conjugations in data["comprehensive_conjugations"].items():
        print(f"\nCategory: {category}")
        for do_io_type, patterns in conjugations.items():
            print(f"  {do_io_type}:")
            for pattern, tenses in patterns.items():
                print(f"    {pattern}: {list(tenses.keys())}")

if __name__ == "__main__":
    debug_comprehensive_data("gnc_verb_data_filtered/წერა-raw_comprehensive_data.json")
