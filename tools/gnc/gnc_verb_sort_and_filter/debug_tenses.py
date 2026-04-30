#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Debug script to test tense selection for specific tenses.
"""

import json
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from populate_verbs_json import select_forms_for_tense

def debug_tense_selection(json_file, tense):
    """Debug tense selection for a specific tense."""
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    print(f"=== Testing {tense} tense ===")
    forms = select_forms_for_tense(data, tense, "Non-Version", ["SV", "LV", "OV", "Non-Version"])
    
    if forms:
        print(f"Found {len(forms)} forms for {tense}:")
        for form in forms:
            print(f"  - {form['match']} (person: {form.get('person_number', 'N/A')}, version: {form.get('version', 'N/A')})")
    else:
        print(f"No forms found for {tense}")
    
    return forms

if __name__ == "__main__":
    # Test all 6 tenses
    tenses = ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv"]
    
    for tense in tenses:
        debug_tense_selection("gnc_verb_data_filtered/წერა-raw_comprehensive_data.json", tense)
        print()
