#!/usr/bin/env python3
"""
Verb Conjugation Module - Handles verb conjugation and preverb form calculations

This module provides conjugation processing with proper fallback
handling for tenses that legitimately have no forms (e.g., verb 2's future tense).
"""

from typing import Dict, List, Optional, Any
from dataclasses import dataclass

# Import Unicode-safe logging utilities
from tools.utils.unicode_console import safe_log


@dataclass
class VerbStructure:
    """Represents the structure type of a verb."""

    has_multiple_preverbs: bool
    has_forms_structure: bool
    default_preverb: str = ""


@dataclass
class ConjugationRequest:
    """Represents a conjugation request with all necessary parameters."""

    verb: Dict
    tense: str
    person: str
    preverb: Optional[str] = None


class VerbConjugationProcessor:
    """
    Verb conjugation processor.

    Handles both single and multi-preverb verbs with proper fallback logic
    for tenses that legitimately have no forms.
    """

    def __init__(self, config: Optional[Dict] = None):
        """Initialize with optional configuration."""
        self.config = config or {}
        self.enable_debug_logging = self.config.get("enable_debug_logging", False)

        # Extract Georgian preverbs to configuration
        self.georgian_preverbs = self.config.get(
            "georgian_preverbs",
            ["მო", "წა", "მი", "გა", "და", "შე", "შემო", "გადა", "მიმო", "გამო"],
        )

    def get_conjugation_form(
        self, verb: Dict, tense: str, person: str, preverb: Optional[str] = None
    ) -> str:
        """
        Get verb form with preverb handling - main entry point.

        Args:
            verb: Verb dictionary
            tense: Tense name (e.g., "present", "future")
            person: Person form (e.g., "1sg", "3pl")
            preverb: Optional preverb to use (defaults to verb's default preverb)

        Returns:
            Verb form string (or "-" if no form exists for this tense/person)
        """
        request = ConjugationRequest(verb, tense, person, preverb)

        try:
            # Stage 1: Detect verb structure
            structure = self._detect_verb_structure(request.verb)

            # Stage 2: Extract base forms
            base_forms = self._extract_base_forms(
                request.verb, request.tense, structure
            )

            # Stage 3: Calculate final form
            return self._calculate_final_form(
                base_forms, request.person, request.preverb, request.verb, structure
            )

        except Exception as e:
            safe_log(
                "error",
                f"Conjugation failed for {request.verb.get('id', 'unknown')}/{request.tense}/{request.person}: {e}",
            )
            return "-"  # Fallback for unexpected errors

    def _detect_verb_structure(self, verb: Dict) -> VerbStructure:
        """Detect the structure type of a verb."""
        preverb_config = verb.get("preverb_config", {})
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)
        default_preverb = preverb_config.get("default_preverb", "")

        # Assume structure - fail fast if data is malformed
        conjugations = verb.get("conjugations", {})
        if not isinstance(conjugations, dict):
            raise ValueError(
                f"Invalid conjugations structure for verb {verb.get('id', 'unknown')}"
            )

        return VerbStructure(
            has_multiple_preverbs=has_multiple_preverbs,
            has_forms_structure=True,  # Assume structure
            default_preverb=default_preverb,
        )

    def _extract_base_forms(
        self, verb: Dict, tense: str, structure: VerbStructure
    ) -> Dict[str, str]:
        """Extract base forms for a specific tense."""
        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})

        # Assume new structure - fail fast if malformed
        if not isinstance(tense_data, dict):
            raise ValueError(
                f"Invalid tense data structure for {tense} in verb {verb.get('id', 'unknown')}"
            )

        # Get forms directly - assume they exist
        forms = tense_data.get("forms", {})

        if self.enable_debug_logging:
            if forms:
                safe_log("debug", f"Found forms for {tense}: {forms}")
            else:
                safe_log(
                    "debug",
                    f"No forms found for {tense} - this may be legitimate",
                )

        return forms

    def _calculate_final_form(
        self,
        base_forms: Dict[str, str],
        person: str,
        preverb: Optional[str],
        verb: Dict,
        structure: VerbStructure,
    ) -> str:
        """Calculate the final form for a specific person and preverb."""

        # If no forms exist for this tense, return "-" (legitimate case)
        if not base_forms:
            return "-"

        # Get the base form for this person
        base_form = base_forms.get(person, "-")

        # If no form for this person, return "-" (legitimate case)
        if base_form == "-" or base_form == "":
            return "-"

        # For single preverb verbs, return the base form directly
        if not structure.has_multiple_preverbs:
            return base_form

        # For multi-preverb verbs, apply preverb transformation
        if preverb is None:
            preverb = structure.default_preverb

        if preverb == structure.default_preverb:
            return base_form  # No transformation needed

        # Apply preverb transformation
        return self._apply_preverb_transformation(
            base_form, preverb, structure.default_preverb, verb
        )

    def _apply_preverb_transformation(
        self, base_form: str, target_preverb: str, default_preverb: str, verb: Dict
    ) -> str:
        """Apply preverb transformation to a base form."""
        preverb_rules = verb.get("preverb_rules", {})
        replacements = preverb_rules.get("replacements", {})

        # Get the actual replacement for this preverb
        replacement = replacements.get(target_preverb, target_preverb)

        # Normalize preverb values by removing hyphens for comparison
        normalized_target = target_preverb.replace("-", "")
        normalized_default = default_preverb.replace("-", "")

        # If the target preverb is the same as the default preverb, return the original form
        if normalized_target == normalized_default:
            return base_form

        # Extract the stem (remove the default preverb) and apply the target preverb
        if base_form.startswith(normalized_default):
            stem = base_form[len(normalized_default) :]
            return replacement + stem

        # Handle irregular forms that don't follow prefix pattern
        return base_form

    def has_preverb_in_tense(self, verb: Dict, tense: str) -> bool:
        """
                Check if a verb has preverbs in a specific tense using instance configuration.

        Args:
                    verb: Verb dictionary
                    tense: Tense name (e.g., "present", "future")

        Returns:
                    True if the verb has preverbs in this tense, False otherwise
        """
        return has_preverb_in_tense(verb, tense, self.georgian_preverbs)


def calculate_preverb_forms(
    forms: Dict[str, str], preverb_rules: Dict, target_preverb: str
) -> Dict[str, str]:
    """
    Calculate preverb forms based on preverb rules.

    This function is kept for backward compatibility but delegates to the processor. [LEGACY]

    Args:
        forms: Dictionary of conjugation forms with default preverb
        preverb_rules: Dictionary containing preverb replacement rules
        target_preverb: The target preverb to apply

    Returns:
        Dictionary of forms with the target preverb applied
    """
    # Create a minimal verb structure for the processor
    verb_structure = {
        "preverb_config": {
            "has_multiple_preverbs": True,
            "default_preverb": preverb_rules.get("default", ""),
        },
        "preverb_rules": preverb_rules,
    }

    processor = VerbConjugationProcessor()
    result = {}

    for person, form in forms.items():
        if form == "-" or form == "":
            result[person] = form
        else:
            result[person] = processor._apply_preverb_transformation(
                form, target_preverb, preverb_rules.get("default", ""), verb_structure
            )

    return result


def get_conjugation_form(
    verb: Dict, tense: str, person: str, preverb: Optional[str] = None
) -> str:
    """
    Get verb form with preverb handling - backward compatibility wrapper.

    This function is kept for backward compatibility but delegates to the processor. [LEGACY]
    """
    processor = VerbConjugationProcessor()
    return processor.get_conjugation_form(verb, tense, person, preverb)


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
    # Get the raw gloss for this tense
    conjugations = verb.get("conjugations", {})
    tense_data = conjugations.get(tense, {})

    if not isinstance(tense_data, dict):
        return ""

    # Check for raw_gloss in the structure
    if "raw_gloss" in tense_data:
        raw_gloss = tense_data["raw_gloss"]
        if raw_gloss:
            # Extract the base translation from the raw gloss
            # Simplified approach for extracting translation
            return raw_gloss

    return ""


def get_direct_object_preposition(verb: Dict) -> str:
    """
    Get the appropriate preposition for direct objects with this verb.

    Args:
        verb: Verb dictionary

    Returns:
        Preposition string (e.g., "to", "for") or empty string if not specified
    """
    prepositions = verb.get("prepositions", {})
    return prepositions.get("direct_object", "")


def has_preverb_in_tense(
    verb: Dict, tense: str, georgian_preverbs: Optional[List[str]] = None
) -> bool:
    """
    Check if a verb has preverbs in a specific tense.

    Args:
        verb: Verb dictionary
        tense: Tense name (e.g., "present", "future")
        georgian_preverbs: Optional list of Georgian preverbs to check against

    Returns:
        True if the verb has preverbs in this tense, False otherwise
    """
    # Default preverbs if none provided
    if georgian_preverbs is None:
        georgian_preverbs = [
            "მო",
            "წა",
            "მი",
            "გა",
            "და",
            "შე",
            "შემო",
            "გადა",
            "მიმო",
            "გამო",
        ]

    conjugations = verb.get("conjugations", {})
    tense_data = conjugations.get(tense, {})

    if not isinstance(tense_data, dict):
        return False

    # Check if there's a gloss with preverb information
    if "raw_gloss" in tense_data:
        raw_gloss = tense_data["raw_gloss"]
        if raw_gloss and "V" in raw_gloss:
            # Simple check for verb forms in raw_gloss
            return True

    # Check if there are forms with preverbs
    if "forms" in tense_data:
        forms = tense_data["forms"]
        # Check if any form contains a preverb (starts with a preverb)
        for form in forms.values():
            if form and form != "-":
                if any(form.startswith(preverb) for preverb in georgian_preverbs):
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

    # Structure with raw_gloss
    if isinstance(tense_data, dict) and "raw_gloss" in tense_data:
        raw_gloss = tense_data["raw_gloss"]
        if raw_gloss:
            return {"raw_gloss": raw_gloss}

    return None


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

    # Structure with examples in conjugations
    if isinstance(tense_data, dict) and "examples" in tense_data:
        return tense_data["examples"]

    return []


def get_indirect_object_preposition(verb: Dict) -> str:
    """
    Get the appropriate preposition for indirect objects with this verb.

    Args:
        verb: Verb dictionary

    Returns:
        Preposition string (e.g., "to", "for") or empty string if not specified
    """
    prepositions = verb.get("prepositions", {})
    return prepositions.get("indirect_object", "")


def add_should_prefix_for_optative(verb: Dict, tense: str) -> str:
    """
    Add "should" prefix for optative tense English translations.

    Args:
        verb: Verb dictionary
        tense: Tense name

    Returns:
        English translation with "should" prefix if applicable
    """
    if tense != "optative":
        return ""

    # Get the base translation
    base_translation = get_english_translation(verb, tense)
    if base_translation:
        return f"should {base_translation}"

    return ""
