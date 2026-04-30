#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Intermediary script to populate verbs.json from comprehensive GNC data.
Extracts only the currently supported tenses (present, imperfect, future, aorist, optative, imperative)
and maps them to the verbs.json structure following the pattern from verb ID 1.

Usage: python populate_verbs_json.py [OPTIONS] <comprehensive_json_file> <verbs_json_file> <verb_name>

Options:
  --version {SV,LV,OV,Non-Version}    Version to prioritize (default: Non-Version)
  --version-priority ORDER            Comma-separated version priority list
  --update                            Update existing verb entry
  --append                            Add new verb entry (default)
  --help                              Show help message

Example: python populate_verbs_json.py --version Non-Version --update წერა-raw_comprehensive_data.json ../../src/data/verbs.json წერა
"""

import json
import sys
import os
import argparse
import re
from collections import defaultdict
from typing import Dict, List, Optional, Any


class TenseConfig:
    """Configuration class for tense-specific form selection rules."""

    def __init__(self, config_data: Optional[Dict[str, Any]] = None):
        self.voice_preference = None
        self.voice_priority = ["MedPass", "Pass", "Act", "PassState"]
        self.version_preference = "Non-Version"
        self.version_priority = ["SV", "LV", "OV", "Non-Version"]
        self.tense_specific_rules = {}
        self.fallback_rules = {
            "version_priority": ["OV", "Non-Version", "SV", "LV"],
            "voice_priority": ["MedPass", "Pass", "Act", "PassState"],
        }
        self.preverb_config = {"default_preverb": None, "tense_preverb_rules": {}}

        if config_data:
            self.load_from_dict(config_data)

    def load_from_dict(self, config_data: Dict[str, Any]):
        """Load configuration from dictionary."""
        self.voice_preference = config_data.get("voice_preference")
        self.voice_priority = config_data.get("voice_priority", self.voice_priority)
        self.version_preference = config_data.get(
            "version_preference", self.version_preference
        )
        self.version_priority = config_data.get(
            "version_priority", self.version_priority
        )
        self.tense_specific_rules = config_data.get("tense_specific_rules", {})
        self.fallback_rules = config_data.get("fallback_rules", self.fallback_rules)
        self.preverb_config = config_data.get("preverb_config", self.preverb_config)

    def get_tense_rules(self, tense: str) -> Dict[str, Any]:
        """Get rules for a specific tense."""
        # Map GNC tense names to config tense names
        tense_mapping = {
            "Pres": "present",
            "Impf": "imperfect",
            "Fut": "future",
            "Aor": "aorist",
            "Opt": "optative",
            "Impv": "imperative",
        }

        config_tense = tense_mapping.get(tense, tense.lower())
        return self.tense_specific_rules.get(config_tense, {})

    def get_voice_for_tense(self, tense: str) -> Optional[str]:
        """Get voice preference for a specific tense."""
        tense_rules = self.get_tense_rules(tense)
        return tense_rules.get("voice", self.voice_preference)

    def get_version_for_tense(self, tense: str) -> Optional[str]:
        """Get version preference for a specific tense."""
        tense_rules = self.get_tense_rules(tense)
        return tense_rules.get("version", self.version_preference)

    def get_voice_priority_for_tense(self, tense: str) -> List[str]:
        """Get voice priority list for a specific tense."""
        tense_rules = self.get_tense_rules(tense)
        return tense_rules.get("voice_priority", self.voice_priority)

    def get_version_priority_for_tense(self, tense: str) -> List[str]:
        """Get version priority list for a specific tense."""
        tense_rules = self.get_tense_rules(tense)
        return tense_rules.get("version_priority", self.version_priority)

    def get_preverb_for_tense(self, tense: str) -> Optional[str]:
        """Get preverb preference for a specific tense."""
        tense_rules = self.get_tense_rules(tense)
        return tense_rules.get("preverb", self.preverb_config.get("default_preverb"))


def load_config_file(config_file: str) -> Dict[str, Any]:
    """Load configuration from JSON file."""
    with open(config_file, "r", encoding="utf-8") as f:
        return json.load(f)


def parse_tense_config(tense_config_str: str) -> Dict[str, Any]:
    """Parse tense configuration from JSON string."""
    try:
        return json.loads(tense_config_str)
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in tense-config: {e}")


def create_config_from_args(args) -> TenseConfig:
    """Create TenseConfig from command line arguments."""
    config_data = {}

    # Load from config file if provided
    if args.config:
        if not os.path.exists(args.config):
            raise FileNotFoundError(f"Configuration file '{args.config}' not found.")
        config_data = load_config_file(args.config)

    # Override with command line arguments
    if args.voice:
        config_data["voice_preference"] = args.voice
    if args.voice_priority:
        config_data["voice_priority"] = [
            v.strip() for v in args.voice_priority.split(",")
        ]
    if args.version:
        config_data["version_preference"] = args.version
    if args.version_priority:
        config_data["version_priority"] = [
            v.strip() for v in args.version_priority.split(",")
        ]
    if args.default_preverb:
        if "preverb_config" not in config_data:
            config_data["preverb_config"] = {}
        config_data["preverb_config"]["default_preverb"] = args.default_preverb

    # Parse tense-specific config if provided
    if args.tense_config:
        if os.path.exists(args.tense_config):
            # It's a file path
            with open(args.tense_config, "r", encoding="utf-8") as f:
                tense_config = json.load(f)
        else:
            # It's a JSON string
            tense_config = parse_tense_config(args.tense_config)

        config_data["tense_specific_rules"] = tense_config

    return TenseConfig(config_data)


def load_comprehensive_data(json_file):
    """Load the comprehensive JSON data from GNC analysis."""
    with open(json_file, "r", encoding="utf-8") as f:
        return json.load(f)


def load_verbs_json(verbs_file):
    """Load the existing verbs.json file."""
    with open(verbs_file, "r", encoding="utf-8") as f:
        return json.load(f)


def save_verbs_json(verbs_data, verbs_file):
    """Save the updated verbs.json file."""
    with open(verbs_file, "w", encoding="utf-8") as f:
        json.dump(verbs_data, f, ensure_ascii=False, indent=2)


def clean_raw_gloss(raw_gloss):
    """Clean raw_gloss by removing person/number data after case markers."""
    if not raw_gloss:
        return raw_gloss

    # Remove person/number data after case markers
    # Keep: V Act Pres <S-DO> <S:Nom> <DO:Dat>
    # Remove: S:1Sg DO:3 IO:3

    # Split by spaces and filter out person/number patterns
    parts = raw_gloss.split()
    cleaned_parts = []

    for part in parts:
        # Skip parts that match person/number patterns
        # Pattern matches S:1Sg, S:2Pl, DO:3, IO:1Sg, etc.
        if not re.match(r"^(?:S:\d+(?:Sg|Pl)?|DO:\d+|IO:\d+(?:Sg|Pl)?)$", part):
            cleaned_parts.append(part)

    return " ".join(cleaned_parts)


def clean_version_markers(raw_gloss):
    """Clean raw_gloss by removing version markers (SV, LV, OV)."""
    if not raw_gloss:
        return raw_gloss

    # Split by spaces and filter out version markers
    parts = raw_gloss.split()
    cleaned_parts = []

    for part in parts:
        # Skip version markers
        if part not in ["SV", "LV", "OV"]:
            cleaned_parts.append(part)

    return " ".join(cleaned_parts)


def select_voice_forms(forms_data, voice_preference, voice_priority):
    """Select forms based on voice preference and priority."""
    if not forms_data:
        return []

    # Try preferred voice first
    if voice_preference:
        preferred_forms = [
            f
            for f in forms_data
            if f.get("parsed_features", {}).get("voice") == voice_preference
        ]
        if preferred_forms:
            return preferred_forms

    # Try voice priority order
    for voice in voice_priority:
        voice_forms = [
            f for f in forms_data if f.get("parsed_features", {}).get("voice") == voice
        ]
        if voice_forms:
            return voice_forms

    # Default to all forms if no voice matches
    return forms_data


def select_version_forms(forms_data, version_preference, version_priority):
    """Select forms based on version preference and priority."""
    if not forms_data:
        return []

    # If Non-Version is preferred or in priority, filter to Non-Version only
    if version_preference == "Non-Version" or "Non-Version" in version_priority:
        # Only return forms that are actually Non-Version
        non_version_forms = [
            f
            for f in forms_data
            if f.get("parsed_features", {}).get("version") == "Non-Version"
        ]
        if non_version_forms:
            return non_version_forms
        # If no Non-Version forms found, return empty list
        return []

    # Try preferred version first
    preferred_forms = [
        f
        for f in forms_data
        if f.get("parsed_features", {}).get("version") == version_preference
    ]
    if preferred_forms:
        return preferred_forms

    # Try version priority order
    for version in version_priority:
        version_forms = [
            f
            for f in forms_data
            if f.get("parsed_features", {}).get("version") == version
        ]
        if version_forms:
            return version_forms

    # Default to all forms if no version matches
    return forms_data


def get_forms_for_slemma(
    comprehensive_data,
    slemma_category,
    do_io_type,
    arg_pattern,
    gnc_tense,
    config: TenseConfig,
):
    """Get forms for a specific slemma category with voice and version filtering."""
    try:
        # First try comprehensive_conjugations
        conjugations = comprehensive_data["comprehensive_conjugations"][
            slemma_category
        ][do_io_type][arg_pattern]
        if gnc_tense in conjugations:
            forms_data = conjugations[gnc_tense]["forms"]
            # Apply person/number filtering first, then voice and version filtering
            filtered_forms = filter_forms_by_person_number(forms_data)

            # Apply voice filtering
            voice_preference = config.get_voice_for_tense(gnc_tense)
            voice_priority = config.get_voice_priority_for_tense(gnc_tense)
            voice_filtered = select_voice_forms(
                filtered_forms, voice_preference, voice_priority
            )

            # Apply version filtering
            version_preference = config.get_version_for_tense(gnc_tense)
            version_priority = config.get_version_priority_for_tense(gnc_tense)
            return select_version_forms(
                voice_filtered, version_preference, version_priority
            )
    except KeyError:
        pass

    # Fallback: search in slemma_categories
    try:
        slemma_data = comprehensive_data["slemma_categories"][slemma_category]
        if do_io_type in slemma_data["do_io_types"]:
            if arg_pattern in slemma_data["do_io_types"][do_io_type]:
                all_forms = slemma_data["do_io_types"][do_io_type][arg_pattern]["forms"]
                # Filter forms by tense
                tense_forms = [
                    f
                    for f in all_forms
                    if f.get("parsed_features", {}).get("tense") == gnc_tense
                ]
                if tense_forms:
                    # Apply person/number filtering first, then voice and version filtering
                    filtered_forms = filter_forms_by_person_number(tense_forms)

                    # Apply voice filtering
                    voice_preference = config.get_voice_for_tense(gnc_tense)
                    voice_priority = config.get_voice_priority_for_tense(gnc_tense)
                    voice_filtered = select_voice_forms(
                        filtered_forms, voice_preference, voice_priority
                    )

                    # Apply version filtering
                    version_preference = config.get_version_for_tense(gnc_tense)
                    version_priority = config.get_version_priority_for_tense(gnc_tense)
                    return select_version_forms(
                        voice_filtered, version_preference, version_priority
                    )
    except KeyError:
        pass

    return []


def filter_forms_by_person_number(forms_data, prefer_io3_do3=True):
    """Filter forms to prefer IO:3 and DO:3 over other person/number combinations."""
    if not prefer_io3_do3 or not forms_data:
        return forms_data

    # Priority order: IO:3, DO:3, then others
    priority_forms = []
    other_forms = []

    for form in forms_data:
        features = form.get("features", "")
        if "IO:3" in features or "DO:3" in features:
            priority_forms.append(form)
        else:
            other_forms.append(form)

    # Return priority forms if available, otherwise all forms
    return priority_forms if priority_forms else forms_data


def find_best_do_io_type(slemma_data, prefer_standard=True, required_tense=None):
    """Find the best DO/IO type, preferring Standard over Non-Standard and simpler argument patterns."""
    best_arg_pattern = None
    best_do_io_type = None
    max_count = 0

    # Define priority order based on preference
    do_io_types = (
        ["Standard", "Non-Standard"]
        if prefer_standard
        else ["Non-Standard", "Standard"]
    )

    # Define argument pattern priority (simpler patterns first)
    arg_pattern_priority = ["<S-DO>", "<S-IO>", "<S>", "<S-DO-IO>"]

    for do_io_type in do_io_types:
        if do_io_type in slemma_data["do_io_types"]:
            # Check patterns in priority order
            for preferred_pattern in arg_pattern_priority:
                if preferred_pattern in slemma_data["do_io_types"][do_io_type]:
                    pattern_data = slemma_data["do_io_types"][do_io_type][
                        preferred_pattern
                    ]

                    # If a specific tense is required, check if it's available
                    if required_tense:
                        available_tenses = set()
                        for form in pattern_data.get("forms", []):
                            tense = form.get("parsed_features", {}).get("tense")
                            if tense:
                                available_tenses.add(tense)

                        # Skip this pattern if it doesn't have the required tense
                        if required_tense not in available_tenses:
                            continue

                    # Filter forms by person/number before counting
                    filtered_forms = filter_forms_by_person_number(
                        pattern_data.get("forms", [])
                    )
                    filtered_count = len(filtered_forms)

                    # If we haven't found any pattern yet, or if this is a better pattern
                    if (
                        best_arg_pattern is None
                        or (
                            do_io_type == "Standard"
                            and best_do_io_type == "Non-Standard"
                        )
                        or (
                            do_io_type == best_do_io_type and filtered_count > max_count
                        )
                    ):
                        max_count = filtered_count
                        best_arg_pattern = preferred_pattern
                        best_do_io_type = do_io_type
                        # If we found a good pattern, use it (don't check others)
                        break

    return best_arg_pattern, best_do_io_type


def select_forms_for_tense(
    comprehensive_data,
    gnc_tense,
    config: TenseConfig,
):
    """Select forms for a specific tense based on the new logic."""
    slemma_categories = comprehensive_data["slemma_categories"]
    available_preverbs = comprehensive_data["metadata"]["available_preverbs"]

    # Find Non-Preverb category
    non_preverb_category = None
    for category in slemma_categories.keys():
        if category.startswith("Non-Preverb") or category.startswith("Base"):
            non_preverb_category = category
            break

    # Get preverb preference for this tense
    tense_preverb = config.get_preverb_for_tense(gnc_tense)

    if gnc_tense in ["Pres", "Impf"]:
        # Present and Imperfect: Always use Non-Preverb/Base data
        if non_preverb_category:
            slemma_data = slemma_categories[non_preverb_category]
            most_common_arg_pattern, most_common_do_io_type = find_best_do_io_type(
                slemma_data, prefer_standard=True, required_tense=gnc_tense
            )

            if most_common_arg_pattern and most_common_do_io_type:
                return get_forms_for_slemma(
                    comprehensive_data,
                    non_preverb_category,
                    most_common_do_io_type,
                    most_common_arg_pattern,
                    gnc_tense,
                    config,
                )
    else:
        # Future, Aorist, Optative, Imperative: Try preverb data first
        target_preverb = None

        # 1. Use tense-specific preverb if configured
        if tense_preverb and tense_preverb in available_preverbs:
            target_preverb = tense_preverb
        # 2. Use user-specified preverb if provided and available
        elif (
            config.preverb_config.get("default_preverb")
            and config.preverb_config["default_preverb"] in available_preverbs
        ):
            target_preverb = config.preverb_config["default_preverb"]
        # 3. Try მი- preverb first
        elif "მი-" in available_preverbs:
            target_preverb = "მი-"
        else:
            # 4. Use alphabetical first available preverb
            if available_preverbs:
                target_preverb = sorted(available_preverbs)[0]

        if target_preverb:
            # Find the slemma category for this preverb
            target_category = None
            for category in slemma_categories.keys():
                if category.startswith(target_preverb):
                    target_category = category
                    break

            if target_category:
                # Find the best argument pattern for this preverb, preferring Standard
                slemma_data = slemma_categories[target_category]
                most_common_arg_pattern, most_common_do_io_type = find_best_do_io_type(
                    slemma_data, prefer_standard=True, required_tense=gnc_tense
                )

                if most_common_arg_pattern and most_common_do_io_type:
                    forms = get_forms_for_slemma(
                        comprehensive_data,
                        target_category,
                        most_common_do_io_type,
                        most_common_arg_pattern,
                        gnc_tense,
                        config,
                    )
                    if forms:  # If preverb forms found, use them
                        return forms

        # Fallback: Use Non-Preverb/Base data if no preverb forms found
        if non_preverb_category:
            slemma_data = slemma_categories[non_preverb_category]
            most_common_arg_pattern, most_common_do_io_type = find_best_do_io_type(
                slemma_data, prefer_standard=True, required_tense=gnc_tense
            )

            if most_common_arg_pattern and most_common_do_io_type:
                return get_forms_for_slemma(
                    comprehensive_data,
                    non_preverb_category,
                    most_common_do_io_type,
                    most_common_arg_pattern,
                    gnc_tense,
                    config,
                )

    return []


def determine_default_preverb(comprehensive_data, user_preverb=None):
    """Determine the default preverb based on the form selection logic."""
    available_preverbs = comprehensive_data["metadata"]["available_preverbs"]

    # If user specified a preverb, validate and use it
    if user_preverb:
        if user_preverb in available_preverbs:
            return user_preverb
        else:
            print(
                f"Warning: Specified preverb '{user_preverb}' not found in available preverbs: {available_preverbs}"
            )
            print("Falling back to automatic selection...")

    # For Future/Aorist/Optative/Imperative: Try მი- first, then alphabetical
    if "მი-" in available_preverbs:
        return "მი-"
    elif available_preverbs:
        return sorted(available_preverbs)[0]
    else:
        return ""


def extract_forms_for_tense(
    comprehensive_data,
    target_tense,
    config: TenseConfig,
):
    """Extract forms for a specific tense using the new selection logic."""
    forms_data = select_forms_for_tense(
        comprehensive_data,
        target_tense,
        config,
    )

    forms = []
    for form_data in forms_data:
        parsed = form_data["parsed_features"]
        forms.append(
            {
                "match": form_data["match"],
                "person_number": parsed["person_number"],
                "voice": parsed["voice"],
                "version": parsed["version"],
                "is_preverb": parsed["is_preverb"],
            }
        )

    return forms


def map_tense_name(gnc_tense):
    """Map GNC tense names to verbs.json tense names."""
    tense_mapping = {
        "Pres": "present",
        "Impf": "imperfect",
        "Fut": "future",
        "Aor": "aorist",
        "Opt": "optative",
        "Impv": "imperative",
    }
    return tense_mapping.get(gnc_tense, gnc_tense)


def create_conjugation_entry(
    comprehensive_data,
    gnc_tense,
    config: TenseConfig,
):
    """Create a conjugation entry for a specific tense using new selection logic."""
    forms = extract_forms_for_tense(
        comprehensive_data,
        gnc_tense,
        config,
    )

    if not forms:
        return None

    # Group forms by person/number
    person_forms = {}
    raw_gloss = None

    for form in forms:
        person = form["person_number"]
        match = form["match"]

        # Map person/number to verbs.json format
        person_key = person.replace("S:", "").lower()
        if person_key == "1sg":
            person_key = "1sg"
        elif person_key == "2sg":
            person_key = "2sg"
        elif person_key == "3sg":
            person_key = "3sg"
        elif person_key == "1pl":
            person_key = "1pl"
        elif person_key == "2pl":
            person_key = "2pl"
        elif person_key == "3pl":
            person_key = "3pl"

        person_forms[person_key] = match

        # Get raw_gloss from the first form's features
        if raw_gloss is None:
            # Find the original form data to get features
            forms_data = select_forms_for_tense(
                comprehensive_data,
                gnc_tense,
                config,
            )
            for form_data in forms_data:
                if form_data["match"] == match:
                    raw_gloss = form_data["features"]
                    break

    # Only include forms that exist
    if not person_forms:
        return None

    # Clean the raw_gloss
    cleaned_raw_gloss = clean_raw_gloss(raw_gloss) if raw_gloss else f"V {gnc_tense}"

    return {
        "raw_gloss": cleaned_raw_gloss,
        "forms": person_forms,
        "examples": [],
    }


def create_english_translations(comprehensive_data, slemma_category):
    """Create English translations for each preverb."""
    translations = {}

    # Get preverb info
    preverb = comprehensive_data["slemma_categories"][slemma_category]["preverb"]
    base_form = comprehensive_data["slemma_categories"][slemma_category]["base_form"]

    if preverb is None:
        # Non-preverb form
        translations["default"] = {
            "present": "write",
            "imperfect": "was writing",
            "future": "will write",
            "aorist": "wrote",
            "optative": "write",
            "imperative": "write",
        }
    else:
        # Preverb form - create specific translations
        preverb_key = preverb.rstrip("-")  # Remove trailing dash
        translations[preverb_key] = {
            "present": f"{preverb_key}write",
            "imperfect": f"was {preverb_key}writing",
            "future": f"will {preverb_key}write",
            "aorist": f"{preverb_key}wrote",
            "optative": f"{preverb_key}write",
            "imperative": f"{preverb_key}write",
        }

    return translations


def create_verb_entry(
    comprehensive_data,
    verb_name,
    config: TenseConfig,
):
    """Create a complete verb entry for verbs.json using new selection logic."""
    metadata = comprehensive_data["metadata"]

    # Determine default preverb using new logic
    default_preverb = determine_default_preverb(
        comprehensive_data, config.preverb_config.get("default_preverb")
    )
    available_preverbs = metadata["available_preverbs"]

    # Create preverb config
    preverb_config = {
        "has_multiple_preverbs": metadata["has_multiple_preverbs"],
        "default_preverb": default_preverb,
        "available_preverbs": available_preverbs,
    }

    # Create preverb rules
    preverb_rules = {
        "default": default_preverb,
        "replacements": {pv: pv for pv in available_preverbs},
        "tense_specific_fallbacks": {},
    }

    # Create conjugations for the 6 supported tenses
    conjugations = {}
    english_translations = {}

    for gnc_tense in ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv"]:
        tense_name = map_tense_name(gnc_tense)
        conjugation = create_conjugation_entry(
            comprehensive_data,
            gnc_tense,
            config,
        )

        if conjugation:
            conjugations[tense_name] = conjugation

    # Create English translations for all preverbs
    for slemma_category in comprehensive_data["slemma_categories"].keys():
        slemma_translations = create_english_translations(
            comprehensive_data, slemma_category
        )
        english_translations.update(slemma_translations)

    # Determine global argument pattern from actual data
    most_common_arg_pattern = None
    max_count = 0

    for slemma_category in comprehensive_data["slemma_categories"].keys():
        slemma_data = comprehensive_data["slemma_categories"][slemma_category]
        # Check Standard first, then Non-Standard
        for do_io_type in ["Standard", "Non-Standard"]:
            if do_io_type in slemma_data["do_io_types"]:
                for arg_pattern, pattern_data in slemma_data["do_io_types"][
                    do_io_type
                ].items():
                    # Prefer Standard patterns, but use any pattern if no Standard found
                    if pattern_data["count"] > max_count and (
                        most_common_arg_pattern is None
                        or do_io_type == "Standard"
                        or (
                            do_io_type == "Non-Standard"
                            and most_common_arg_pattern
                            not in [
                                p
                                for p in slemma_data["do_io_types"]
                                .get("Standard", {})
                                .keys()
                            ]
                        )
                    ):
                        max_count = pattern_data["count"]
                        most_common_arg_pattern = arg_pattern

    # Fallback to <S> if no pattern found
    if most_common_arg_pattern is None:
        most_common_arg_pattern = "<S>"

    # Create the verb entry
    verb_entry = {
        "georgian": verb_name,
        "description": f"To {verb_name}",
        "category": "Communication & Language",
        "class": "Class-I",
        "semantic_key": verb_name.lower(),
        "notes": "",
        "url": f"https://lingua.ge/verbs/{verb_name}/",
        "global_argument_pattern": most_common_arg_pattern,
        "valency": {"default": most_common_arg_pattern, "alternatives": []},
        "syntax": {
            "arguments": {
                "subject": {
                    "3sg": {"noun": "author", "adjective": "famous"},
                    "3pl": {"noun": "journalist", "adjective": "experienced"},
                },
                "direct_object": {
                    "1sg": {"noun": "letter", "adjective": "long"},
                    "2sg": {"noun": "email", "adjective": "important"},
                    "3sg": {"noun": "novel", "adjective": "interesting"},
                    "1pl": {"noun": "article", "adjective": "short"},
                    "2pl": {"noun": "message", "adjective": "quick"},
                    "3pl": {"noun": "report", "adjective": "detailed"},
                },
            },
            "prepositions": {
                "subject": "the",
                "direct_object": "the",
                "indirect_object": "",
            },
            "preverb_overrides": {},
        },
        "english_translations": english_translations,
        "conjugations": conjugations,
        "preverb_config": preverb_config,
        "preverb_rules": preverb_rules,
    }

    return verb_entry


def parse_command_line_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Populate verbs.json from comprehensive GNC data",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python populate_verbs_json.py --version Non-Version --update data.json verbs.json წერა
  python populate_verbs_json.py --version-priority SV,LV,OV,Non-Version --append data.json verbs.json ნდომა
        """,
    )

    parser.add_argument("comprehensive_file", help="Path to comprehensive JSON file")
    parser.add_argument("verbs_file", help="Path to verbs.json file")
    parser.add_argument("verb_name", help="Name of the verb to process")

    parser.add_argument(
        "--version",
        choices=["SV", "LV", "OV", "Non-Version"],
        default="Non-Version",
        help="Version to prioritize (default: Non-Version)",
    )

    parser.add_argument(
        "--version-priority",
        default="SV,LV,OV,Non-Version",
        help="Comma-separated version priority list (default: SV,LV,OV,Non-Version)",
    )

    parser.add_argument(
        "--default-preverb",
        help="Default preverb to use when multiple preverbs are available (e.g., 'ა-', 'მი-', 'და-')",
    )

    parser.add_argument(
        "--voice",
        choices=["Act", "MedPass", "Pass", "PassState"],
        help="Voice to prioritize (e.g., 'MedPass', 'Pass', 'Act')",
    )

    parser.add_argument(
        "--voice-priority",
        default="MedPass,Pass,Act,PassState",
        help="Comma-separated voice priority list (default: MedPass,Pass,Act,PassState)",
    )

    parser.add_argument(
        "--tense-config",
        help="JSON string or file path for tense-specific voice/version rules",
    )

    parser.add_argument(
        "--config",
        help="Path to JSON configuration file for complex form selection rules",
    )

    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--update", action="store_true", help="Update existing verb entry"
    )
    group.add_argument(
        "--append",
        action="store_true",
        default=True,
        help="Add new verb entry (default)",
    )

    return parser.parse_args()


def handle_verb_entry(verbs_data, verb_name, new_entry, update_mode):
    """Handle verb entry addition or update."""
    if update_mode and verb_name in verbs_data:
        print(f"Updating existing entry for '{verb_name}'...")
        # Update existing entry
        verbs_data[verb_name].update(new_entry)
    else:
        print(f"Adding new entry for '{verb_name}'...")
        # Add new entry
        verbs_data[verb_name] = new_entry


def main():
    args = parse_command_line_args()

    # Check if files exist
    if not os.path.exists(args.comprehensive_file):
        print(f"Error: Comprehensive JSON file '{args.comprehensive_file}' not found.")
        sys.exit(1)

    if not os.path.exists(args.verbs_file):
        print(f"Error: Verbs JSON file '{args.verbs_file}' not found.")
        sys.exit(1)

    print(f"Loading comprehensive data from {args.comprehensive_file}...")
    comprehensive_data = load_comprehensive_data(args.comprehensive_file)

    print(f"Loading verbs.json from {args.verbs_file}...")
    verbs_data = load_verbs_json(args.verbs_file)

    # Create configuration from command line arguments
    try:
        config = create_config_from_args(args)
    except Exception as e:
        print(f"Error creating configuration: {e}")
        sys.exit(1)

    print(f"Creating verb entry for '{args.verb_name}'...")
    print(f"  - Voice preference: {config.voice_preference}")
    print(f"  - Voice priority: {config.voice_priority}")
    print(f"  - Version preference: {config.version_preference}")
    print(f"  - Version priority: {config.version_priority}")
    print(f"  - Mode: {'Update' if args.update else 'Append'}")

    verb_entry = create_verb_entry(
        comprehensive_data,
        args.verb_name,
        config,
    )

    # Handle verb entry addition or update
    handle_verb_entry(verbs_data, args.verb_name, verb_entry, args.update)

    print(f"Saving updated verbs.json...")
    save_verbs_json(verbs_data, args.verbs_file)

    print("Success!")
    print(f"Updated verbs.json with entry for '{args.verb_name}'")
    print(
        f"  - Has multiple preverbs: {verb_entry['preverb_config']['has_multiple_preverbs']}"
    )
    print(f"  - Default preverb: {verb_entry['preverb_config']['default_preverb']}")
    print(
        f"  - Available preverbs: {verb_entry['preverb_config']['available_preverbs']}"
    )
    print(f"  - Conjugations: {list(verb_entry['conjugations'].keys())}")


if __name__ == "__main__":
    main()
