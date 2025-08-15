#!/usr/bin/env python3
"""
Utility module for generating verb forms from different data structures.
Handles both old format and new stem-based format.
"""


def get_verb_form(verb, tense, person, preverb=None):
    """
    Get verb form with preverb handling for both old and new structures.

    Args:
        verb: Verb dictionary
        tense: Tense name (e.g., "present", "future")
        person: Person form (e.g., "1sg", "3pl")
        preverb: Optional preverb to use (defaults to verb's default preverb)

    Returns:
        Verb form string
    """
    preverb_config = verb.get("preverb_config", {})
    has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

    # Get the base verb form
    base_form = ""

    # Single preverb verb (old format)
    if not has_multiple_preverbs:
        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})

        # Check if this is the new structure with forms/gloss
        if isinstance(tense_data, dict) and "forms" in tense_data:
            base_form = tense_data["forms"].get(person, "-")
        else:
            # Old structure - direct forms
            base_form = tense_data.get(person, "-")

    else:
        # Multi-preverb verb
        if preverb is None:
            preverb = preverb_config.get("default_preverb", "")

        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})

        # New stem-based structure
        if preverb_config.get("stem_based", False) and "forms" in tense_data:
            stem = tense_data["forms"].get(person, "-")
            if stem == "-":
                base_form = "-"
            else:
                # Remove hyphen from preverb before combining with stem
                clean_preverb = preverb.replace("-", "")
                base_form = clean_preverb + stem
        else:
            # Old multi-preverb structure
            if isinstance(tense_data, dict) and preverb in tense_data:
                base_form = tense_data[preverb].get(person, "-")
            else:
                base_form = "-"

    return base_form


def get_english_translation(verb, tense, preverb=None):
    """
    Get the correct English translation for a verb form based on tense and preverb.

    Args:
        verb: Verb dictionary
        tense: Tense name (e.g., "present", "future")
        preverb: Optional preverb to use

    Returns:
        English translation string
    """
    # Get tense-specific translations
    english_translations = verb.get("english_translations", {})
    tense_translation = english_translations.get(tense, "")

    # If no tense-specific translation, fall back to semantic key
    if not tense_translation:
        return verb.get("semantic_key", "to do")

    # For multi-preverb verbs, check if there's a preverb-specific translation
    if preverb:
        preverb_translations = verb.get("preverb_translations", {})
        preverb_translation = preverb_translations.get(preverb, "")

        # If there's a preverb-specific translation, use it
        if preverb_translation:
            return preverb_translation

    return tense_translation


def get_indirect_object_preposition(verb):
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

    # Fall back to old structure
    return verb.get("indirect_object_preposition", "")


def get_direct_object_preposition(verb):
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


def has_preverb_in_tense(verb, tense):
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


def get_verb_gloss(verb, tense):
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

    # Old structure with examples
    examples = verb.get("examples", {})
    tense_examples = examples.get(tense, {})

    if isinstance(tense_examples, dict):
        return {
            "raw_gloss": tense_examples.get("raw_gloss", ""),
            "preverb": tense_examples.get("preverb", ""),
        }

    return None


def get_verb_examples(verb, tense):
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

    # Old structure with examples in separate examples section
    examples = verb.get("examples", {})
    tense_examples = examples.get(tense, {})

    if isinstance(tense_examples, dict) and "examples" in tense_examples:
        return tense_examples["examples"]

    return []


def is_new_structure(verb):
    """
    Check if a verb uses the new structure.

    Args:
        verb: Verb dictionary

    Returns:
        True if verb uses new structure, False otherwise
    """
    conjugations = verb.get("conjugations", {})

    # Check if any tense has the new structure
    for tense_data in conjugations.values():
        if isinstance(tense_data, dict) and "forms" in tense_data:
            return True

    return False


def get_available_preverbs(verb):
    """
    Get available preverbs for a verb.

    Args:
        verb: Verb dictionary

    Returns:
        List of available preverbs or empty list
    """
    preverb_config = verb.get("preverb_config", {})
    return preverb_config.get("available_preverbs", [])


def get_default_preverb(verb):
    """
    Get default preverb for a verb.

    Args:
        verb: Verb dictionary

    Returns:
        Default preverb string or empty string
    """
    preverb_config = verb.get("preverb_config", {})
    return preverb_config.get("default_preverb", "")
