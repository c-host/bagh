#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to filter and organize Georgian verb conjugations from GNC data.
Filters out: Encl, PP, NonStand, VN, matches with hyphens, and compound slemmas with "¦".
Organizes by: slemma -> DO/IO type -> argument pattern -> tense -> person/number

Usage: python filter_and_organize_gnc_verbs.py <input_file>
Example: python filter_and_organize_gnc_verbs.py წერა.txt
"""

import re
import sys
import os
import json
from collections import defaultdict
from datetime import datetime


def parse_features(features_str):
    """Parse the features string to extract relevant information."""
    features = features_str.split()

    # Extract argument pattern
    arg_pattern = None
    for feature in features:
        if feature.startswith("<S") and ">" in feature:
            arg_pattern = feature
            break

    # Extract tense
    tense = None
    tense_mapping = {
        "Aor": "Aor",
        "Pres": "Pres",
        "Fut": "Fut",
        "Opt": "Opt",
        "Impf": "Impf",
        "Impv": "Impv",
        "PluPerf": "PluPerf",
        "Perf": "Perf",
        "ConjPres": "ConjPres",
        "ConjFut": "ConjFut",
        "Cond": "Cond",
        "Iter": "Iter",
        "IterPerf": "IterPerf",
    }
    for feature in features:
        if feature in tense_mapping:
            tense = tense_mapping[feature]
            break

    # Extract person and number
    person_number = None
    for feature in features:
        if feature.startswith("S:"):
            person_number = feature
            break

    # Extract DO and IO values
    do_value = None
    io_value = None
    for feature in features:
        if feature.startswith("DO:"):
            do_value = feature
        elif feature.startswith("IO:"):
            io_value = feature

    return arg_pattern, tense, person_number, do_value, io_value


def get_slemma_category(slemma, slemma_categories):
    """Categorize slemma forms based on slemma."""
    return slemma_categories.get(slemma, "Other Slemma")


def extract_slemma_categories(data):
    """Extract and categorize slemmas from the data."""
    slemma_categories = {}
    slemma_counts = defaultdict(int)
    slemma_to_lemma = {}  # Map slemma to its lemma for preverb extraction

    # Count slemmas and map to lemmas
    for match, slemma, lemma, features in data:
        slemma_counts[slemma] += 1
        slemma_to_lemma[slemma] = lemma

    # Categorize slemmas based on patterns
    for slemma in slemma_counts.keys():
        if slemma.startswith("*"):
            slemma_categories[slemma] = f"Non-Preverb ({slemma})"
        elif "¦" in slemma:
            # Handle compound slemmas - use the first part
            base_slemma = slemma.split("¦")[0].strip()
            if base_slemma.startswith("*"):
                slemma_categories[slemma] = f"Non-Preverb ({base_slemma})"
            else:
                # Extract preverb if present using the lemma
                lemma = slemma_to_lemma.get(slemma, "")
                preverb = extract_preverb(base_slemma, lemma)
                if preverb:
                    slemma_categories[slemma] = f"{preverb} ({base_slemma})"
                else:
                    slemma_categories[slemma] = f"Base ({base_slemma})"
        else:
            # Extract preverb if present using the lemma
            lemma = slemma_to_lemma.get(slemma, "")
            preverb = extract_preverb(slemma, lemma)
            if preverb:
                slemma_categories[slemma] = f"{preverb} ({slemma})"
            else:
                slemma_categories[slemma] = f"Base ({slemma})"

    return slemma_categories


def extract_preverb(slemma, lemma):
    """Extract preverb from lemma column which contains preverb-verb format."""
    if slemma.startswith("*"):
        return None  # Non-preverb forms

    # Check if lemma contains a dash (indicating preverb-verb format)
    if "-" in lemma:
        # Split on the first dash to get preverb
        preverb = lemma.split("-")[0].strip()
        # Only return if preverb is not empty and not the full lemma
        if preverb and len(preverb) < len(lemma):
            return f"{preverb}-"

    return None


def create_slemma_order(slemma_categories):
    """Create ordering for slemmas based on categories."""
    # Define priority order for different category types
    category_priority = {
        "Non-Preverb": 1,
        "Base": 2,
        # All preverb categories get priority 3+ (sorted alphabetically)
    }

    slemma_order = {}
    priority = 1

    # Sort categories by priority
    sorted_categories = sorted(
        slemma_categories.values(),
        key=lambda x: (
            category_priority.get(x.split()[0], 3),  # Preverbs get priority 3
            x.split()[0],  # Then sort alphabetically within same priority
            x,  # Then by full category name
        ),
    )

    for category in sorted_categories:
        slemma_order[category] = priority
        priority += 1

    return slemma_order


def has_non_standard_do_io(do_value, io_value):
    """Check if a verb has non-standard DO or IO values."""
    non_standard_values = [
        "DO:1",
        "DO:1Sg",
        "DO:1Pl",
        "DO:2",
        "DO:2Sg",
        "DO:2Pl",
        "DO:3Pl",
        "DO:3Sg",
        "IO:1",
        "IO:1Sg",
        "IO:1Pl",
        "IO:2",
        "IO:2Sg",
        "IO:2Pl",
        "IO:3Pl",
        "IO:3Sg",
    ]

    if do_value and do_value in non_standard_values:
        return True
    if io_value and io_value in non_standard_values:
        return True
    return False


def should_filter_out(match, slemma, features):
    """Check if a line should be filtered out based on the criteria."""
    # Filter out matches with quotation marks
    if '"' in match:
        return True

    # Filter out matches with hyphens
    if "-" in match:
        return True

    # Filter out matches with ellipsis
    if "…" in match:
        return True

    # Filter out matches with parentheses
    if "(" in match and ")" in match:
        return True

    # Filter out matches with punctuation
    import string

    punctuation_chars = string.punctuation + ".,;:!?()[]{}'\"`~@#$%^&*+=|\\<>/"
    if any(char in match for char in punctuation_chars):
        return True

    # Filter out slemmas with compound forms (containing "¦")
    if "¦" in slemma:
        return True

    # Filter out based on features
    filter_terms = [
        "Encl",
        "PP",
        "NonStand",
        "VN",
        "LevGuess",
        "Dialect",
        "Guess",
        "[Incl]",
        "[Excl]",
    ]
    for term in filter_terms:
        if term in features:
            return True

    return False


def get_sort_key(item, slemma_categories, slemma_order):
    """Generate sort key for organizing the data."""
    match, slemma, lemma, features = item
    arg_pattern, tense, person_number, do_value, io_value = parse_features(features)

    # Slemma ordering (highest priority)
    slemma_category = get_slemma_category(slemma, slemma_categories)
    slemma_priority = slemma_order.get(slemma_category, 999)

    # Argument pattern ordering
    arg_order = {"<S>": 1, "<S-DO>": 2, "<S-IO>": 3, "<S-DO-IO>": 4}
    arg_priority = arg_order.get(arg_pattern, 999)

    # Tense ordering
    tense_order = {"Aor": 1, "Pres": 2, "Fut": 3, "Opt": 4, "Impf": 5, "Impv": 6}
    tense_priority = tense_order.get(tense, 999)

    # Conditional ordering based on DO/IO type
    if has_non_standard_do_io(do_value, io_value):
        # For non-standard forms: IO-based ordering
        io_order = {
            "IO:1Sg": 1,
            "IO:1Pl": 2,
            "IO:1": 3,
            "IO:2Sg": 4,
            "IO:2Pl": 5,
            "IO:2": 6,
            "IO:3": 7,
            "IO:3Sg": 8,
            "IO:3Pl": 9,
            "DO:1Sg": 10,
            "DO:1Pl": 11,
            "DO:1": 12,
            "DO:2Sg": 13,
            "DO:2Pl": 14,
            "DO:2": 15,
            "DO:3": 16,
            "DO:3Sg": 17,
            "DO:3Pl": 18,
        }

        # Use IO value if available, otherwise DO value
        primary_value = io_value if io_value else do_value
        primary_priority = io_order.get(primary_value, 999)

        # Subject as secondary ordering
        person_order = {
            "S:1Sg": 1,
            "S:2Sg": 2,
            "S:3Sg": 3,
            "S:1Pl": 4,
            "S:2Pl": 5,
            "S:3Pl": 6,
        }
        person_priority = person_order.get(person_number, 999)

        return (
            slemma_priority,
            arg_priority,
            tense_priority,
            primary_priority,
            person_priority,
            match,
        )
    else:
        # For standard forms: Subject-based ordering
        person_order = {
            "S:1Sg": 1,
            "S:2Sg": 2,
            "S:3Sg": 3,
            "S:1Pl": 4,
            "S:2Pl": 5,
            "S:3Pl": 6,
        }
        person_priority = person_order.get(person_number, 999)

        return (
            slemma_priority,
            arg_priority,
            tense_priority,
            0,
            person_priority,
            match,
        )


def create_comprehensive_json(
    verb_name, data_groups, slemma_order, total_forms, filtered_forms, unique_forms
):
    """Create comprehensive JSON structure from organized data."""

    # Determine if verb has multiple preverbs
    preverb_count = 0
    preverbs = []
    for slemma_category in data_groups.keys():
        if not slemma_category.startswith("Non-Preverb"):
            preverb_count += 1
            # Extract preverb from category name like "ა- (აწერა)"
            if "(" in slemma_category and ")" in slemma_category:
                preverb = slemma_category.split("(")[0].strip()
                preverbs.append(preverb)

    has_multiple_preverbs = preverb_count > 2

    # Create metadata
    metadata = {
        "verb_name": verb_name,
        "total_original_forms": total_forms,
        "total_filtered_forms": filtered_forms,
        "total_unique_forms": unique_forms,
        "has_multiple_preverbs": has_multiple_preverbs,
        "preverb_count": preverb_count,
        "available_preverbs": preverbs,
        "analysis_date": datetime.now().isoformat(),
        "gnc_source": "Georgian National Corpus",
    }

    # Create slemma categories structure
    slemma_categories = {}
    for slemma_category in sorted(
        data_groups.keys(), key=lambda x: slemma_order.get(x, 999)
    ):
        slemma_data = data_groups[slemma_category]

        # Determine preverb and base form
        preverb = None
        base_form = None
        if slemma_category.startswith("Non-Preverb"):
            preverb = None
            base_form = (
                slemma_category.split("(")[1].rstrip(")")
                if "(" in slemma_category
                else slemma_category
            )
        else:
            # Extract preverb and base form from "ა- (აწერა)" format
            if "(" in slemma_category and ")" in slemma_category:
                parts = slemma_category.split("(")
                preverb = parts[0].strip()
                base_form = parts[1].rstrip(")")
            else:
                preverb = slemma_category
                base_form = slemma_category

        # Organize by DO/IO type and argument pattern
        do_io_types = {}
        for do_io_type in ["Standard", "Non-Standard"]:
            if do_io_type in slemma_data:
                argument_patterns = {}
                for arg_pattern in ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]:
                    if arg_pattern in slemma_data[do_io_type]:
                        forms = slemma_data[do_io_type][arg_pattern]
                        argument_patterns[arg_pattern] = {
                            "count": len(forms),
                            "forms": create_forms_structure(forms),
                        }
                if argument_patterns:
                    do_io_types[do_io_type] = argument_patterns

        slemma_categories[slemma_category] = {
            "preverb": preverb,
            "base_form": base_form,
            "do_io_types": do_io_types,
        }

    # Create comprehensive conjugations structure
    comprehensive_conjugations = create_comprehensive_conjugations(data_groups)

    return {
        "metadata": metadata,
        "slemma_categories": slemma_categories,
        "comprehensive_conjugations": comprehensive_conjugations,
    }


def create_forms_structure(forms):
    """Create structured forms data from raw forms list."""
    forms_data = []
    for match, slemma, lemma, features in forms:
        arg_pattern, tense, person_number, do_value, io_value = parse_features(features)

        # Extract additional features
        voice = "Act"  # Default
        version = "Non-Version"  # Default
        is_preverb = "Pv" in features

        if "PassState" in features:
            voice = "PassState"
        elif "MedPass" in features:
            voice = "MedPass"
        elif "Pass" in features and "MedPass" not in features:
            voice = "Pass"
        elif "Act" in features:
            voice = "Act"

        if "SV" in features:
            version = "SV"
        elif "LV" in features:
            version = "LV"
        elif "OV" in features:
            version = "OV"

        form_data = {
            "match": match,
            "slemma": slemma,
            "lemma": lemma,
            "features": features,
            "parsed_features": {
                "argument_pattern": arg_pattern,
                "tense": tense,
                "person_number": person_number,
                "do_value": do_value,
                "io_value": io_value,
                "voice": voice,
                "version": version,
                "is_preverb": is_preverb,
            },
        }
        forms_data.append(form_data)

    return forms_data


def create_comprehensive_conjugations(data_groups):
    """Create comprehensive conjugations structure organized by all dimensions."""
    conjugations = {}

    # Define all possible tenses from GNC data
    all_tenses = [
        "Pres",
        "Impf",
        "ConjPres",
        "Fut",
        "Cond",
        "ConjFut",
        "Aor",
        "Opt",
        "Perf",
        "PluPerf",
        "Iter",
        "IterPerf",
        "Impv",
    ]

    # Define all argument patterns
    all_arg_patterns = ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]

    # Define all voice types
    all_voices = ["Act", "Pass", "MedPass", "PassState", "Other"]

    # Define all version types
    all_versions = ["SV", "LV", "OV", "Non-Version"]

    # Define all person/number combinations
    all_persons = ["S:1Sg", "S:2Sg", "S:3Sg", "S:1Pl", "S:2Pl", "S:3Pl"]

    for slemma_category, slemma_data in data_groups.items():
        conjugations[slemma_category] = {}

        for do_io_type in ["Standard", "Non-Standard"]:
            if do_io_type in slemma_data:
                conjugations[slemma_category][do_io_type] = {}

                for arg_pattern in all_arg_patterns:
                    if arg_pattern in slemma_data[do_io_type]:
                        conjugations[slemma_category][do_io_type][arg_pattern] = {}

                        # Group by tense
                        tense_groups = defaultdict(list)
                        for match, slemma, lemma, features in slemma_data[do_io_type][
                            arg_pattern
                        ]:
                            _, parsed_tense, _, _, _ = parse_features(features)
                            tense_groups[parsed_tense].append(
                                (match, slemma, lemma, features)
                            )

                        for tense in all_tenses:
                            if tense in tense_groups:
                                conjugations[slemma_category][do_io_type][arg_pattern][
                                    tense
                                ] = {
                                    "count": len(tense_groups[tense]),
                                    "forms": create_forms_structure(
                                        tense_groups[tense]
                                    ),
                                }

    return conjugations


def write_detailed_verb_analysis(f, data_groups, slemma_order, section_prefix=""):
    """Write detailed verb analysis to file with proper organization."""
    # Sort slemma categories by their order
    sorted_slemma_categories = sorted(
        data_groups.keys(), key=lambda x: slemma_order.get(x, 999)
    )

    for slemma_category in sorted_slemma_categories:
        slemma_data = data_groups[slemma_category]
        f.write(f"{section_prefix}# Slemma Category: {slemma_category}\n")
        f.write("=" * 60 + "\n\n")

        for do_io_type in ["Standard", "Non-Standard"]:
            f.write(f"{section_prefix}## DO/IO Type: {do_io_type}\n")
            f.write("-" * 40 + "\n\n")

            for arg_pattern in ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]:
                if arg_pattern in slemma_data[do_io_type]:
                    f.write(f"{section_prefix}### Argument Pattern: {arg_pattern}\n")
                    f.write(f"# Count: {len(slemma_data[do_io_type][arg_pattern])}\n\n")

                    # Group by tense within this argument pattern
                    tense_groups = defaultdict(list)
                    for match, slemma, lemma, features in slemma_data[do_io_type][
                        arg_pattern
                    ]:
                        arg_pat, tense, person_number, _, _ = parse_features(features)
                        tense_groups[tense].append((match, slemma, lemma, features))

                    # Sort tenses in the desired order
                    tense_order = [
                        "Pres",
                        "Impf",
                        "ConjPres",
                        "Fut",
                        "Cond",
                        "ConjFut",
                        "Aor",
                        "Opt",
                        "Perf",
                        "PluPerf",
                        "Iter",
                        "IterPerf",
                        "Impv",
                    ]

                    for tense in tense_order:
                        if tense in tense_groups and tense_groups[tense]:
                            f.write(f"{section_prefix}#### Tense: {tense}\n")
                            f.write(f"# Count: {len(tense_groups[tense])}\n\n")

                            # Group by Preverb within tense
                            preverb_groups = {"Preverb": [], "Non-Preverb": []}
                            for match, slemma, lemma, features in tense_groups[tense]:
                                if "Pv" in features:
                                    preverb_groups["Preverb"].append(
                                        (match, slemma, lemma, features)
                                    )
                                else:
                                    preverb_groups["Non-Preverb"].append(
                                        (match, slemma, lemma, features)
                                    )

                            # Process Preverb and Non-Preverb groups
                            for preverb_type in ["Preverb", "Non-Preverb"]:
                                if preverb_groups[preverb_type]:
                                    f.write(f"{section_prefix}##### {preverb_type}\n")
                                    f.write(
                                        f"# Count: {len(preverb_groups[preverb_type])}\n\n"
                                    )

                                    # Group by Version types within Preverb group
                                    version_groups = {
                                        "SV": [],
                                        "LV": [],
                                        "OV": [],
                                        "Non-Version": [],
                                    }
                                    for (
                                        match,
                                        slemma,
                                        lemma,
                                        features,
                                    ) in preverb_groups[preverb_type]:
                                        if "SV" in features:
                                            version_groups["SV"].append(
                                                (match, slemma, lemma, features)
                                            )
                                        elif "LV" in features:
                                            version_groups["LV"].append(
                                                (match, slemma, lemma, features)
                                            )
                                        elif "OV" in features:
                                            version_groups["OV"].append(
                                                (match, slemma, lemma, features)
                                            )
                                        else:
                                            version_groups["Non-Version"].append(
                                                (match, slemma, lemma, features)
                                            )

                                    # Process Version groups
                                    for version_type in [
                                        "SV",
                                        "LV",
                                        "OV",
                                        "Non-Version",
                                    ]:
                                        if version_groups[version_type]:
                                            f.write(
                                                f"{section_prefix}###### {version_type}\n"
                                            )
                                            f.write(
                                                f"# Count: {len(version_groups[version_type])}\n\n"
                                            )

                                            # Group by Voice type within Version group
                                            voice_groups = {
                                                "PassState": [],
                                                "Pass": [],
                                                "MedPass": [],
                                                "Act": [],
                                                "Other": [],
                                            }
                                            for (
                                                match,
                                                slemma,
                                                lemma,
                                                features,
                                            ) in version_groups[version_type]:
                                                if "PassState" in features:
                                                    voice_groups["PassState"].append(
                                                        (match, slemma, lemma, features)
                                                    )
                                                elif "MedPass" in features:
                                                    voice_groups["MedPass"].append(
                                                        (match, slemma, lemma, features)
                                                    )
                                                elif (
                                                    "Pass" in features
                                                    and "MedPass" not in features
                                                ):
                                                    voice_groups["Pass"].append(
                                                        (match, slemma, lemma, features)
                                                    )
                                                elif "Act" in features:
                                                    voice_groups["Act"].append(
                                                        (match, slemma, lemma, features)
                                                    )
                                                else:
                                                    voice_groups["Other"].append(
                                                        (match, slemma, lemma, features)
                                                    )

                                            # Process Voice groups
                                            for voice_type in [
                                                "PassState",
                                                "Pass",
                                                "MedPass",
                                                "Act",
                                                "Other",
                                            ]:
                                                if voice_groups[voice_type]:
                                                    f.write(
                                                        f"{section_prefix}####### {voice_type}\n"
                                                    )
                                                    f.write(
                                                        f"# Count: {len(voice_groups[voice_type])}\n\n"
                                                    )

                                                    # Sort by person/number within Voice group
                                                    sorted_by_person = []
                                                    do_io_values = set()
                                                    for (
                                                        match,
                                                        slemma,
                                                        lemma,
                                                        features,
                                                    ) in voice_groups[voice_type]:
                                                        _, _, _, do_value, io_value = (
                                                            parse_features(features)
                                                        )
                                                        if do_value:
                                                            do_io_values.add(do_value)
                                                        if io_value:
                                                            do_io_values.add(io_value)

                                                    # Check if this group has non-standard DO/IO
                                                    has_non_standard = any(
                                                        has_non_standard_do_io(
                                                            do_val, io_val
                                                        )
                                                        for do_val in do_io_values
                                                        for io_val in do_io_values
                                                    )

                                                    if has_non_standard:
                                                        # IO-based ordering for non-standard forms
                                                        io_order = [
                                                            "IO:1Sg",
                                                            "IO:1Pl",
                                                            "IO:1",
                                                            "IO:2Sg",
                                                            "IO:2Pl",
                                                            "IO:2",
                                                            "IO:3",
                                                            "IO:3Sg",
                                                            "IO:3Pl",
                                                            "DO:1Sg",
                                                            "DO:1Pl",
                                                            "DO:1",
                                                            "DO:2Sg",
                                                            "DO:2Pl",
                                                            "DO:2",
                                                            "DO:3",
                                                            "DO:3Sg",
                                                            "DO:3Pl",
                                                        ]

                                                        # Group by primary DO/IO value first
                                                        grouped_by_do_io = {}
                                                        for (
                                                            match,
                                                            slemma,
                                                            lemma,
                                                            features,
                                                        ) in voice_groups[voice_type]:
                                                            (
                                                                _,
                                                                _,
                                                                person_number,
                                                                do_value,
                                                                io_value,
                                                            ) = parse_features(features)
                                                            primary_value = (
                                                                io_value
                                                                if io_value
                                                                else do_value
                                                            )
                                                            if (
                                                                primary_value
                                                                not in grouped_by_do_io
                                                            ):
                                                                grouped_by_do_io[
                                                                    primary_value
                                                                ] = []
                                                            grouped_by_do_io[
                                                                primary_value
                                                            ].append(
                                                                (
                                                                    match,
                                                                    slemma,
                                                                    lemma,
                                                                    features,
                                                                )
                                                            )

                                                        # Sort by IO order, then by subject within each group
                                                        current_io_group = None
                                                        for primary_val in io_order:
                                                            if (
                                                                primary_val
                                                                in grouped_by_do_io
                                                            ):
                                                                if (
                                                                    current_io_group
                                                                    is not None
                                                                ):
                                                                    sorted_by_person.append(
                                                                        (
                                                                            "---",
                                                                            "",
                                                                            "",
                                                                            f"IO/DO Group Separator: {current_io_group} → {primary_val}",
                                                                        )
                                                                    )
                                                                current_io_group = (
                                                                    primary_val
                                                                )

                                                                person_order = [
                                                                    "S:1Sg",
                                                                    "S:2Sg",
                                                                    "S:3Sg",
                                                                    "S:1Pl",
                                                                    "S:2Pl",
                                                                    "S:3Pl",
                                                                ]
                                                                for (
                                                                    person
                                                                ) in person_order:
                                                                    for (
                                                                        match,
                                                                        slemma,
                                                                        lemma,
                                                                        features,
                                                                    ) in grouped_by_do_io[
                                                                        primary_val
                                                                    ]:
                                                                        (
                                                                            _,
                                                                            _,
                                                                            person_number,
                                                                            _,
                                                                            _,
                                                                        ) = parse_features(
                                                                            features
                                                                        )
                                                                        if (
                                                                            person_number
                                                                            == person
                                                                        ):
                                                                            sorted_by_person.append(
                                                                                (
                                                                                    match,
                                                                                    slemma,
                                                                                    lemma,
                                                                                    features,
                                                                                )
                                                                            )

                                                                # Add remaining items for this primary value
                                                                for (
                                                                    match,
                                                                    slemma,
                                                                    lemma,
                                                                    features,
                                                                ) in grouped_by_do_io[
                                                                    primary_val
                                                                ]:
                                                                    if (
                                                                        (
                                                                            match,
                                                                            slemma,
                                                                            lemma,
                                                                            features,
                                                                        )
                                                                        not in sorted_by_person
                                                                    ):
                                                                        sorted_by_person.append(
                                                                            (
                                                                                match,
                                                                                slemma,
                                                                                lemma,
                                                                                features,
                                                                            )
                                                                        )
                                                    else:
                                                        # Subject-based ordering for standard forms
                                                        person_order = [
                                                            "S:1Sg",
                                                            "S:2Sg",
                                                            "S:3Sg",
                                                            "S:1Pl",
                                                            "S:2Pl",
                                                            "S:3Pl",
                                                        ]
                                                        for person in person_order:
                                                            for (
                                                                match,
                                                                slemma,
                                                                lemma,
                                                                features,
                                                            ) in voice_groups[
                                                                voice_type
                                                            ]:
                                                                (
                                                                    _,
                                                                    _,
                                                                    person_number,
                                                                    _,
                                                                    _,
                                                                ) = parse_features(
                                                                    features
                                                                )
                                                                if (
                                                                    person_number
                                                                    == person
                                                                ):
                                                                    sorted_by_person.append(
                                                                        (
                                                                            match,
                                                                            slemma,
                                                                            lemma,
                                                                            features,
                                                                        )
                                                                    )

                                                        # Add any remaining items
                                                        for (
                                                            match,
                                                            slemma,
                                                            lemma,
                                                            features,
                                                        ) in voice_groups[voice_type]:
                                                            if (
                                                                (
                                                                    match,
                                                                    slemma,
                                                                    lemma,
                                                                    features,
                                                                )
                                                                not in sorted_by_person
                                                            ):
                                                                sorted_by_person.append(
                                                                    (
                                                                        match,
                                                                        slemma,
                                                                        lemma,
                                                                        features,
                                                                    )
                                                                )

                                                    for (
                                                        match,
                                                        slemma,
                                                        lemma,
                                                        features,
                                                    ) in sorted_by_person:
                                                        if match == "---":
                                                            f.write(f"\n# {features}\n")
                                                        else:
                                                            # Format with consistent spacing
                                                            match_padded = match.ljust(
                                                                20
                                                            )
                                                            slemma_padded = (
                                                                slemma.ljust(15)
                                                            )
                                                            f.write(
                                                                f"{match_padded}{slemma_padded}{features}\n"
                                                            )
                                                    f.write("\n")
                            f.write("\n")
                    f.write("\n")


def main():
    # Parse command line arguments
    if len(sys.argv) != 2:
        print("Usage: python filter_and_organize_gnc_verbs.py <input_file>")
        print("Example: python filter_and_organize_gnc_verbs.py წერა.txt")
        sys.exit(1)

    input_file = sys.argv[1]

    # Construct input path
    input_path = os.path.join("gnc_verb_data_raw", input_file)

    if not os.path.exists(input_path):
        print(f"Error: File '{input_path}' not found.")
        sys.exit(1)

    # Extract verb name from filename for output naming
    verb_name = os.path.splitext(os.path.basename(input_file))[0]

    print(f"Loading data from {input_path}...")

    # Read the file, skipping header lines
    data = []
    with open(input_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
        # Skip first 12 lines (header)
        for line in lines[12:]:
            line = line.strip()
            if line and not line.startswith("#"):
                parts = line.split("\t")
                if len(parts) >= 3:
                    match = parts[0]
                    slemma = parts[1]
                    # Handle both 3-column and 4-column formats
                    if len(parts) >= 4:
                        lemma = parts[2]
                        features = parts[3]
                    else:
                        lemma = ""  # Empty lemma for 3-column format
                        features = parts[2]
                    data.append((match, slemma, lemma, features))

    print(f"Total lines loaded: {len(data)}")

    # Apply filters and split compound features
    print("Applying filters and splitting compound features...")
    filtered_data = []

    for match, slemma, lemma, features in data:
        if not should_filter_out(match, slemma, features):
            # Split on "¦" to handle multiple morphological analyses
            feature_parts = features.split(" ¦ ")
            for feature_part in feature_parts:
                feature_part = feature_part.strip()
                if feature_part:  # Only add non-empty parts
                    filtered_data.append((match, slemma, lemma, feature_part))

    print(f"Lines after filtering and splitting: {len(filtered_data)}")

    # Remove duplicates while preserving all unique feature combinations
    print("Removing duplicates...")
    unique_combinations = set()
    unique_data = []
    for match, slemma, lemma, features in filtered_data:
        combination = (match, slemma, lemma, features)
        if combination not in unique_combinations:
            unique_combinations.add(combination)
            unique_data.append((match, slemma, lemma, features))

    print(f"Unique match-feature combinations: {len(unique_data)}")

    # Extract slemma categories and create ordering
    print("Extracting slemma categories...")
    slemma_categories = extract_slemma_categories(unique_data)
    slemma_order = create_slemma_order(slemma_categories)

    print(f"Found {len(slemma_categories)} slemma categories:")
    for slemma, category in slemma_categories.items():
        print(f"  {slemma} -> {category}")

    # Sort the data
    print("Sorting data...")
    sorted_data = sorted(
        unique_data, key=lambda x: get_sort_key(x, slemma_categories, slemma_order)
    )

    # Group by slemma first, then by DO/IO type, then by argument pattern
    print("Organizing by slemma, DO/IO type and argument patterns...")
    slemma_groups = defaultdict(
        lambda: {"Standard": defaultdict(list), "Non-Standard": defaultdict(list)}
    )
    for match, slemma, lemma, features in sorted_data:
        slemma_category = get_slemma_category(slemma, slemma_categories)
        arg_pattern, _, _, do_value, io_value = parse_features(features)
        if has_non_standard_do_io(do_value, io_value):
            slemma_groups[slemma_category]["Non-Standard"][arg_pattern].append(
                (match, slemma, lemma, features)
            )
        else:
            slemma_groups[slemma_category]["Standard"][arg_pattern].append(
                (match, slemma, lemma, features)
            )

    # Create output directory if it doesn't exist
    output_dir = "gnc_verb_data_filtered"
    os.makedirs(output_dir, exist_ok=True)

    # Create comprehensive JSON data
    print("Creating comprehensive JSON data...")
    json_data = create_comprehensive_json(
        verb_name,
        slemma_groups,
        slemma_order,
        len(data),
        len(filtered_data),
        len(unique_data),
    )

    # Write JSON file
    print("Writing JSON file...")
    json_file = os.path.join(output_dir, f"{verb_name}_comprehensive_data.json")
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

    # Write the summary file
    print("Writing analysis summary...")
    summary_file = os.path.join(output_dir, f"{verb_name}_analysis_summary.txt")
    with open(summary_file, "w", encoding="utf-8") as f:
        f.write(f"Georgian Verb Conjugation Analysis Summary - {verb_name}\n")
        f.write("=" * 50 + "\n\n")

        f.write(f"Total original matches: {len(data)}\n")
        f.write(f"After filtering and splitting: {len(filtered_data)}\n")
        f.write(f"Unique match-feature combinations: {len(unique_data)}\n\n")

        f.write("Breakdown by slemma, DO/IO type and argument pattern:\n")
        for slemma_category in sorted(
            slemma_groups.keys(), key=lambda x: slemma_order.get(x, 999)
        ):
            f.write(f"  {slemma_category}:\n")
            for do_io_type in ["Standard", "Non-Standard"]:
                f.write(f"    {do_io_type} DO/IO:\n")
                for arg_pattern in ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]:
                    if arg_pattern in slemma_groups[slemma_category][do_io_type]:
                        count = len(
                            slemma_groups[slemma_category][do_io_type][arg_pattern]
                        )
                        f.write(f"      {arg_pattern}: {count} forms\n")

        f.write("\nFiltering criteria applied:\n")
        f.write("  - Removed slemmas with compound forms (containing '¦')\n")
        f.write("  - Removed matches with hyphens\n")
        f.write("  - Removed matches with ellipsis (…)\n")
        f.write("  - Removed matches with parentheses ()\n")
        f.write("  - Removed matches with punctuation marks (.,;:!? etc.)\n")
        f.write("  - Removed lines with 'Encl' in features\n")
        f.write("  - Removed lines with 'PP' in features\n")
        f.write("  - Removed lines with 'NonStand' in features\n")
        f.write("  - Removed lines with 'VN' in features\n")
        f.write("  - Removed lines with 'LevGuess' in features\n")
        f.write("  - Removed lines with 'Dialect' in features\n")

        f.write("\n" + "=" * 50 + "\n")
        f.write("DETAILED RESULTS: MATCHES AND FEATURES\n")
        f.write("=" * 50 + "\n\n")

        # Add detailed results using the same function
        write_detailed_verb_analysis(f, slemma_groups, slemma_order)

    print("Analysis complete!")
    print("Files created:")
    print(f"  - {json_file} (comprehensive JSON data)")
    print(f"  - {summary_file} (analysis summary)")


if __name__ == "__main__":
    main()
