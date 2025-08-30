#!/usr/bin/env python3
"""
Verb Conjugation Management Module

This module handles all verb conjugation logic, preverb management, and form generation.
It replaces the confusing verb_form_generator.py with a clean, focused implementation.

Features:
- Get verb forms with preverb handling
- Calculate preverb variations
- Generate preverb mappings
- Check for multiple preverbs
- Get English translations
- Get appropriate prepositions
- Data structure detection for preverb handling approach
"""

from typing import Dict, List, Optional, Any


def get_conjugation_form(
    verb: Dict, tense: str, person: str, preverb: Optional[str] = None
) -> str:
    """
    Get verb form with preverb handling using data structure detection.

    Args:
        verb: Verb dictionary
        tense: Tense name (e.g., "present", "future")
        person: Person form (e.g., "1sg", "3pl")
        preverb: Optional preverb to use (defaults to verb's default preverb)

    Returns:
        Verb form string
    """
    import logging

    logger = logging.getLogger(__name__)

    logger.info(
        f"[CONJUGATION] Getting form for verb: {verb.get('georgian', 'unknown')}, tense: {tense}, person: {person}, preverb: {preverb}"
    )

    preverb_config = verb.get("preverb_config", {})
    has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

    logger.info(f"[CONJUGATION] Has multiple preverbs: {has_multiple_preverbs}")

    # Get the base verb form
    base_form = ""

    # Single preverb verb (old format)
    if not has_multiple_preverbs:
        logger.info("[CONJUGATION] Single preverb verb")
        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})

        # New structure with forms
        if isinstance(tense_data, dict) and "forms" in tense_data:
            base_form = tense_data["forms"].get(person, "-")
            logger.info(f"[CONJUGATION] Using new structure, form: {base_form}")
        else:
            base_form = "-"
            logger.warning(f"[CONJUGATION] No forms found in tense data")

    else:
        # Multi-preverb verb
        logger.info("[CONJUGATION] Multi-preverb verb")
        if preverb is None:
            preverb = preverb_config.get("default_preverb", "")
            logger.info(f"[CONJUGATION] Using default preverb: {preverb}")

        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})

        if "forms" in tense_data:
            # Get the base forms (which already have the default preverb)
            base_forms = tense_data["forms"]
            logger.info(f"[CONJUGATION] Base forms: {base_forms}")

            # Get preverb rules for replacement
            preverb_rules = verb.get("preverb_rules", {})
            logger.info(f"[CONJUGATION] Preverb rules: {preverb_rules}")

            # Calculate the forms with the target preverb
            preverb_forms = calculate_preverb_forms(base_forms, preverb_rules, preverb)
            logger.info(f"[CONJUGATION] Calculated preverb forms: {preverb_forms}")

            # Get the specific person form
            base_form = preverb_forms.get(person, "-")
            logger.info(f"[CONJUGATION] Final form for {person}: {base_form}")
        else:
            base_form = "-"
            logger.warning(f"[CONJUGATION] No forms found in tense data")

    logger.info(f"[CONJUGATION] Returning form: {base_form}")
    return base_form


def _is_stem_based_approach(preverb_config: Dict) -> bool:
    """
    Detect if verb uses stem-based approach by checking for available_preverbs array.

    Args:
        preverb_config: Preverb configuration dictionary

    Returns:
        True if stem-based approach, False if pre-defined forms approach
    """
    return "available_preverbs" in preverb_config and isinstance(
        preverb_config["available_preverbs"], list
    )


def calculate_preverb_forms(
    forms: Dict[str, str], preverb_rules: Dict, target_preverb: str
) -> Dict[str, str]:
    """
    Calculate preverb forms based on preverb rules.

    Args:
        forms: Dictionary of conjugation forms with default preverb
        preverb_rules: Dictionary containing preverb replacement rules
        target_preverb: The target preverb to apply

    Returns:
        Dictionary of forms with the target preverb applied
    """
    import logging

    logger = logging.getLogger(__name__)

    logger.info(
        f"[PREVERB_CALC] Calculating preverb forms for target: {target_preverb}"
    )
    logger.info(f"[PREVERB_CALC] Input forms: {forms}")
    logger.info(f"[PREVERB_CALC] Preverb rules: {preverb_rules}")

    if not preverb_rules:
        logger.info("[PREVERB_CALC] No preverb rules, returning original forms")
        return forms

    default_preverb = preverb_rules.get("default", "")
    replacements = preverb_rules.get("replacements", {})
    tense_specific_fallbacks = preverb_rules.get("tense_specific_fallbacks", {})

    logger.info(f"[PREVERB_CALC] Default preverb: {default_preverb}")
    logger.info(f"[PREVERB_CALC] Replacements: {replacements}")

    # Get the actual replacement for this preverb
    replacement = replacements.get(target_preverb, target_preverb)
    logger.info(f"[PREVERB_CALC] Replacement for {target_preverb}: {replacement}")

    # Check for tense-specific fallbacks
    if target_preverb in tense_specific_fallbacks:
        # Handle this in the calling function
        # This is a placeholder for future tense-specific logic
        logger.info(
            f"[PREVERB_CALC] Found tense-specific fallback for {target_preverb}"
        )
        pass

    # Normalize preverb values by removing hyphens for comparison
    normalized_target = target_preverb.replace("-", "")
    normalized_default = default_preverb.replace("-", "")

    logger.info(
        f"[PREVERB_CALC] Normalized target: {normalized_target}, normalized default: {normalized_default}"
    )

    # If the target preverb is the same as the default preverb, return the original forms
    if normalized_target == normalized_default:
        logger.info("[PREVERB_CALC] Target same as default, returning original forms")
        return forms

    result = {}
    for person, form in forms.items():
        logger.info(f"[PREVERB_CALC] Processing {person}: {form}")
        if form == "-" or form == "":
            result[person] = form
            logger.info(f"[PREVERB_CALC] Empty form for {person}: {form}")
        elif form.startswith(normalized_default):
            # Extract the stem (remove the default preverb) and apply the new preverb
            stem = form[len(normalized_default) :]
            result[person] = replacement + stem
            logger.info(
                f"[PREVERB_CALC] Replaced preverb for {person}: {form} -> {result[person]} (stem: {stem})"
            )
        else:
            # Handle irregular forms that don't follow prefix pattern
            result[person] = form
            logger.info(f"[PREVERB_CALC] Irregular form for {person}: {form}")

    logger.info(f"[PREVERB_CALC] Final result: {result}")
    return result


def get_preverb_mappings(
    verb_data: Dict, preverb_rules: Dict
) -> Dict[str, Dict[str, Dict[str, str]]]:
    """
    Generate all preverb mappings for a verb.

    Args:
        verb_data: Verb data dictionary
        preverb_rules: Preverb rules dictionary

    Returns:
        Dictionary of all preverb mappings for all tenses
    """
    if not preverb_rules:
        return {}

    available_preverbs = preverb_rules.get("replacements", {}).keys()
    conjugations = verb_data.get("conjugations", {})

    all_mappings = {}

    for tense, tense_data in conjugations.items():
        if "forms" not in tense_data:
            continue

        forms = tense_data["forms"]
        tense_mappings = {}

        for preverb in available_preverbs:
            tense_mappings[preverb] = calculate_preverb_forms(
                forms, preverb_rules, preverb
            )

        all_mappings[tense] = tense_mappings

    return all_mappings


def has_multiple_preverbs(verb: Dict) -> bool:
    """
    Check if a verb supports multiple preverbs.

    Args:
        verb: Verb dictionary

    Returns:
        True if verb supports multiple preverbs, False otherwise
    """
    preverb_config = verb.get("preverb_config", {})
    return preverb_config.get("has_multiple_preverbs", False)


def get_english_translation(
    verb: Dict, tense: str, preverb: Optional[str] = None
) -> str:
    """
    Get the correct English translation for a verb form based on tense and preverb.

    Args:
        verb: Verb dictionary
        tense: Tense name (e.g., "present", "future")
        preverb: Optional preverb to use

    Returns:
        English translation string
    """
    import logging
    from pathlib import Path

    # Get logger for this module
    logger = logging.getLogger(__name__)

    # Configure logging for this module if not already configured
    if not logger.handlers:
        # Create logs directory if it doesn't exist
        logs_dir = (
            Path(__file__).parent.parent.parent
            / "src"
            / "data"
            / "verb_editor"
            / "servers"
            / "logs"
        )
        logs_dir.mkdir(exist_ok=True)

        # Create file handler
        file_handler = logging.FileHandler(logs_dir / "verb_conjugation.log")
        file_handler.setLevel(logging.INFO)

        # Create console handler
        console_handler = logging.StreamHandler()
        console_handler.setLevel(logging.INFO)

        # Create formatter
        formatter = logging.Formatter(
            "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        )
        file_handler.setFormatter(formatter)
        console_handler.setFormatter(formatter)

        # Add handlers to logger
        logger.addHandler(file_handler)
        logger.addHandler(console_handler)
        logger.setLevel(logging.INFO)

    # Get English translations from the new structure
    english_translations = verb.get("english_translations", {})

    logger.info(f"Looking up English translation: preverb='{preverb}', tense='{tense}'")
    logger.info(
        f"Available preverbs in english_translations: {list(english_translations.keys())}"
    )

    # Check for preverb-specific translations first
    if preverb and preverb in english_translations:
        logger.info(
            f"Found preverb translations for '{preverb}': {english_translations[preverb]}"
        )
        if (
            isinstance(english_translations[preverb], dict)
            and tense in english_translations[preverb]
        ):
            result = english_translations[preverb][tense]
            logger.info(f"Using preverb-specific translation: '{result}'")
            return result

    # Check for default translations
    default_translations = english_translations.get("default", {})
    logger.info(f"Default translations: {default_translations}")
    if isinstance(default_translations, dict) and tense in default_translations:
        result = default_translations[tense]
        logger.info(f"Using default translation: '{result}'")
        return result

    # Fall back to semantic key
    fallback = verb.get("semantic_key", "to do")
    logger.info(f"Using fallback translation: '{fallback}'")
    return fallback


def add_should_prefix_for_optative(translation: str, tense: str) -> str:
    """
    Add "should" prefix to optative translations if not already present.

    Args:
        translation: The translation string
        tense: The tense name

    Returns:
        Translation with "should" prefix added for optative tense if needed
    """
    if not translation or not translation.strip():
        return ""

    if tense != "optative":
        return translation

    trimmed = translation.strip()

    # If it already starts with "should", return as is
    if trimmed.lower().startswith("should "):
        return trimmed

    # Add "should" prefix for optative tense
    return f"should {trimmed}"


def get_indirect_object_preposition(verb: Dict) -> str:
    """
    Get the appropriate preposition for indirect objects with this verb.

    Args:
        verb: Verb dictionary

    Returns:
        Preposition string (e.g., "to", "for") or empty string if not specified
    """
    # Check new prepositions object structure first
    prepositions = verb.get("prepositions", {})
    if "indirect_object" in prepositions:
        return prepositions["indirect_object"]


def get_direct_object_preposition(verb: Dict) -> str:
    """
    Get the appropriate preposition for direct objects with this verb.

    Args:
        verb: Verb dictionary

    Returns:
        Preposition string (e.g., "to", "for") or empty string if not specified
    """
    # Check new prepositions object structure
    prepositions = verb.get("prepositions", {})
    return prepositions.get("direct_object", "")


def has_preverb_in_tense(verb: Dict, tense: str) -> bool:
    """
    Check if a verb has preverbs in a specific tense.

    Args:
        verb: Verb dictionary
        tense: Tense name (e.g., "present", "future")

    Returns:
        True if the verb has preverbs in this tense, False otherwise
    """
    conjugations = verb.get("conjugations", {})
    tense_data = conjugations.get(tense, {})

    if not isinstance(tense_data, dict):
        return False

    # Check if there's a gloss with preverb information
    if "gloss" in tense_data:
        gloss = tense_data["gloss"]
        preverb = gloss.get("preverb", "")
        return bool(preverb and preverb.strip())

    # Check if there are forms with preverbs
    if "forms" in tense_data:
        forms = tense_data["forms"]
        # Check if any form contains a preverb (starts with a preverb)
        for form in forms.values():
            if form and form != "-":
                # Common Georgian preverbs
                preverbs = [
                    "მო-",
                    "წა-",
                    "მი-",
                    "გა-",
                    "და-",
                    "შე-",
                    "შემო-",
                    "გადა-",
                    "მიმო-",
                    "გამო-",
                ]
                if any(form.startswith(p.replace("-", "")) for p in preverbs):
                    return True

    return False


def get_verb_gloss(verb: Dict, tense: str) -> Optional[Dict[str, str]]:
    """
    Get gloss information for a verb and tense.

    Args:
        verb: Verb dictionary
        tense: Tense name

    Returns:
        Dictionary with raw_gloss and preverb, or None if not found
    """
    conjugations = verb.get("conjugations", {})
    tense_data = conjugations.get(tense, {})

    # New structure with gloss
    if isinstance(tense_data, dict) and "gloss" in tense_data:
        return tense_data["gloss"]


def get_verb_examples(verb: Dict, tense: str) -> List[Dict[str, Any]]:
    """
    Get examples for a verb and tense.

    Args:
        verb: Verb dictionary
        tense: Tense name

    Returns:
        List of examples or empty list
    """
    conjugations = verb.get("conjugations", {})
    tense_data = conjugations.get(tense, {})

    # New structure with examples in conjugations
    if isinstance(tense_data, dict) and "examples" in tense_data:
        return tense_data["examples"]
