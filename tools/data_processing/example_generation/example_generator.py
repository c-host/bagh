#!/usr/bin/env python3
"""
Example Generator for Georgian Verb Example System

This module generates examples for Georgian verbs with:
- Complete example generation for all argument patterns
- Deterministic generation for consistency
- Produces structure data for easy consumption by html_generator.py and external_data_generator.py
- A1-A2 vocabulary level focus
"""

import logging
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path
import json

from tools.data_processing.example_generation.argument_processor import (
    ArgumentProcessor,
)
from tools.data_processing.verb_conjugation import (
    get_conjugation_form,
)
from tools.utils.shared_gloss_utils import (
    TENSE_MAPPING,
    REVERSE_TENSE_MAPPING,
    CASE_NAMES,
    ROLE_DESCRIPTIONS,
)

# Import Unicode-safe logging utilities
from tools.utils.unicode_console import safe_log

# Get the logger for this module
logger = logging.getLogger(__name__)


class ExampleGenerationError(Exception):
    """Raised when example generation fails"""

    pass


class ExampleGenerator:
    def __init__(self):
        """Initialize the example generator with unified argument processor"""
        self.argument_processor = ArgumentProcessor()

        # Use shared constants from shared_gloss_utils
        self.case_names = CASE_NAMES
        self.role_descriptions = ROLE_DESCRIPTIONS
        self.tense_mapping = TENSE_MAPPING
        self.reverse_tense_mapping = REVERSE_TENSE_MAPPING

        # Person lists for different tense types
        self.IMPERATIVE_PERSONS = ["2sg", "2pl"]  # Order: 2sg, 2pl
        self.STANDARD_PERSONS = ["1sg", "3sg", "3pl"]  # Order: 1sg, 3sg, 3pl

        # Database type mappings
        self.DATABASE_TYPE_MAPPING = {
            "subject": "subjects",
            "direct_object": "direct_objects",
            "indirect_object": "indirect_objects",
        }

    def _should_include_subject(self, person: str) -> bool:
        """
        Determine if subject should be included based on person.

        Args:
            person: Person form (1sg, 2sg, 3sg, 1pl, 2pl, 3pl)

        Returns:
            True if subject should be included, False otherwise
        """
        # Hardcoded logic: only include subjects for 3rd person (3sg, 3pl)
        # Exclude subjects for 1st and 2nd person (1sg, 1pl, 2sg, 2pl)
        return person in ["3sg", "3pl"]

    def _build_component(
        self,
        verb_id: int,
        tense: str,
        person: str,
        arg_type: str,
        arg_data: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
        include_preposition: bool = False,
        capitalize_preposition: bool = False,
    ) -> Tuple[str, Dict, Dict]:
        """
        Generic method to build any argument component (subject, direct_object, indirect_object).

        Args:
            verb_id: Verb identifier
            tense: Verb tense
            person: Verb person
            arg_type: Type of argument
            arg_data: Argument data
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            verb_data: Verb data dictionary
            include_preposition: Whether to include preposition
            capitalize_preposition: Whether to capitalize preposition

        Returns:
            Tuple of (georgian_text, georgian_component, english_component)
        """
        # Generate the argument component
        component_data = self._generate_argument_component(
            verb_id,
            tense,
            person,
            arg_type,
            arg_data,
            raw_gloss,
            verb_semantics,
            verb_data,
        )

        # Build Georgian component
        georgian_component = {
            "text": component_data["georgian"],
            "case": component_data["case_marking"]["case"],
            "role": arg_type,
        }

        # Build English component
        if verb_data:
            english_text = self._build_argument_english_text(
                verb_data, person, arg_type, include_preposition, capitalize_preposition
            )
        else:
            raise ValueError(
                f"Verb data is required for {arg_type} argument generation"
            )

        english_component = {
            "text": english_text,
            "role": arg_type,
        }

        # Add person info for subjects
        if arg_type == "subject":
            english_component["person"] = person

        return component_data["georgian"], georgian_component, english_component

    def _build_verb_component(
        self,
        tense: str,
        person: str,
        georgian_verb_form: str,
        verb_data: Optional[Dict] = None,
        effective_preverb: str = "",
    ) -> Tuple[str, Dict, Dict]:
        """
        Build verb component for both Georgian and English.

        Args:
            tense: Verb tense
            person: Verb person
            georgian_verb_form: Georgian verb form
            verb_data: Verb data dictionary
            effective_preverb: Effective preverb being used

        Returns:
            Tuple of (georgian_text, georgian_component, english_component)
        """
        if tense == "Opt" and georgian_verb_form != "-":
            # Optative tense: add "უნდა" prefix
            georgian_text = f"უნდა {georgian_verb_form}"
            georgian_component = {
                "text": georgian_text,
                "role": "verb",
            }
            english_component = {
                "text": f"should {self._get_verb_translation(verb_data, self.tense_mapping.get(tense, tense), effective_preverb)}",
                "role": "verb",
            }
        else:
            # Regular tense
            georgian_text = georgian_verb_form
            georgian_component = {
                "text": georgian_text,
                "role": "verb",
            }
            english_component = {
                "text": self._get_verb_translation(
                    verb_data,
                    self.tense_mapping.get(tense, tense),
                    effective_preverb,
                ),
                "role": "verb",
            }

        # Apply subject-verb agreement if verb_data is available
        if verb_data:
            mapped_tense = self.tense_mapping.get(tense, tense)
            english_component["text"] = self._apply_subject_verb_agreement(
                english_component["text"], mapped_tense, person
            )

        return georgian_text, georgian_component, english_component

    def generate_example_structured(
        self,
        verb_id: int,
        tense: str,
        person: str,
        raw_gloss: str,
        verb_semantics: str,
        georgian_verb_form: str,
        verb_data: Optional[Dict] = None,
        effective_preverb: str = "",
    ) -> Dict[str, Any]:
        """
        Generate a complete example with structured data.

        Returns structured data optimized for consumption by html_generator.py and other consumers.

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense
            person: Verb person
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            georgian_verb_form: The Georgian verb form to use
            verb_data: Verb data dictionary
            effective_preverb: Effective preverb being used (after fallbacks)

        Returns:
            Dictionary with structured example data
        """
        try:
            # Parse the raw gloss to understand argument structure
            if not raw_gloss or not raw_gloss.strip():
                # No raw gloss provided - generation should fail
                raise ValueError(
                    "Raw gloss is required for example generation - no defaults allowed"
                )

            try:
                parsed_gloss = self.argument_processor.parse_raw_gloss(raw_gloss)
                arguments = parsed_gloss.arguments
            except Exception as e:
                # Parsing failed - generation should fail, not use defaults
                raise ValueError(
                    f"Failed to parse raw gloss '{raw_gloss}': {e}. Raw gloss must be valid."
                )

            # Build the example components
            georgian_parts = []
            georgian_components = {}
            english_components = {}

            # Add subject if needed and available (SOV order: Subject first)
            if "subject" in arguments and self._should_include_subject(person):
                georgian_text, georgian_component, english_component = (
                    self._build_component(
                        verb_id,
                        tense,
                        person,
                        "subject",
                        arguments["subject"],
                        raw_gloss,
                        verb_semantics,
                        verb_data,
                        include_preposition=True,
                        capitalize_preposition=True,
                    )
                )
                georgian_parts.append(georgian_text)
                georgian_components["subject"] = georgian_component
                english_components["subject"] = english_component

            elif person in ["1sg", "2sg", "1pl", "2pl"]:
                # For 1st and 2nd person, include subject pronouns
                # Georgian doesn't need explicit subjects for these persons, so don't add to georgian_components

                # Add English subject
                english_components["subject"] = {
                    "text": self._get_person_text(person),
                    "role": "subject",
                    "person": person,
                }

            # Add direct object if available (SOV order: Direct Object second)
            if "direct_object" in arguments:
                georgian_text, georgian_component, english_component = (
                    self._build_component(
                        verb_id,
                        tense,
                        person,
                        "direct_object",
                        arguments["direct_object"],
                        raw_gloss,
                        verb_semantics,
                        verb_data,
                        include_preposition=True,
                    )
                )
                georgian_parts.append(georgian_text)
                georgian_components["direct_object"] = georgian_component
                english_components["direct_object"] = english_component

            # Add indirect object if available (SOV order: Indirect Object third)
            if "indirect_object" in arguments:
                georgian_text, georgian_component, english_component = (
                    self._build_component(
                        verb_id,
                        tense,
                        person,
                        "indirect_object",
                        arguments["indirect_object"],
                        raw_gloss,
                        verb_semantics,
                        verb_data,
                        include_preposition=True,
                    )
                )
                georgian_parts.append(georgian_text)
                georgian_components["indirect_object"] = georgian_component
                english_components["indirect_object"] = english_component

            # Add the verb form (SOV order: Verb last)
            georgian_text, georgian_component, english_component = (
                self._build_verb_component(
                    tense, person, georgian_verb_form, verb_data, effective_preverb
                )
            )
            georgian_parts.append(georgian_text)
            georgian_components["verb"] = georgian_component
            english_components["verb"] = english_component

            # Combine all parts
            georgian_sentence = " ".join(georgian_parts)

            # Build English sentence
            english_parts = []
            if "subject" in english_components:
                english_parts.append(english_components["subject"]["text"])
            if "verb" in english_components:
                english_parts.append(english_components["verb"]["text"])
            if "direct_object" in english_components:
                english_parts.append(english_components["direct_object"]["text"])
            if "indirect_object" in english_components:
                english_parts.append(english_components["indirect_object"]["text"])

            english_sentence = " ".join(english_parts)

            return {
                "georgian": georgian_sentence,
                "georgian_components": georgian_components,
                "english": english_sentence,
                "english_components": english_components,
                "georgian_verb_form": georgian_verb_form,
                "person": person,
                "effective_preverb": effective_preverb,
            }

        except Exception as e:
            safe_log(logger, "error", f"Failed to generate structured example: {e}")
            raise ExampleGenerationError(f"Structured example generation failed: {e}")

    def _get_english_base_form(self, key: str, number: str, database_type: str) -> str:
        """Get English base form from database"""
        try:
            return self.argument_processor.get_english_translation(
                key, self.argument_processor.databases, "noun", number
            )
        except Exception:
            return key

    def _add_definite_article(self, text: str) -> str:
        """Add definite article 'The' to the first noun in text"""
        words = text.split()
        stop_words = {
            "the",
            "a",
            "an",
            "and",
            "or",
            "but",
            "in",
            "on",
            "at",
            "to",
            "for",
            "of",
            "with",
            "by",
        }

        for i, word in enumerate(words):
            clean_word = word.lower().strip(".,!?;:")
            if clean_word not in stop_words and len(clean_word) > 2:
                words[i] = f"The {word}"
                break

        return " ".join(words)

    def _apply_subject_verb_agreement(
        self, verb_translation: str, tense: str, person: str
    ) -> str:
        """
        Apply subject-verb agreement rules to the verb translation.

        Args:
            verb_translation: Base verb translation
            tense: Tense name (Pres, Impf, etc.)
            person: Person (1sg, 2sg, 3sg, 1pl, 2pl, 3pl)

        Returns:
            Verb translation with proper subject-verb agreement
        """
        import re

        # Present tense 3rd person singular: handle special cases
        if tense == "Pres" and person == "3sg":
            # Handle "am" → "is"
            if "am" in verb_translation:
                return re.sub(r"\bam\b", "is", verb_translation)

            # Handle special verb endings for 3rd person singular
            # Verbs ending in -o, -s, -x, -z, -ch, -sh get "es" ending
            if verb_translation.endswith(("o", "s", "x", "z", "ch", "sh")):
                return verb_translation + "es"

            # Verbs ending in consonant + y change y to ies
            if verb_translation.endswith("y") and len(verb_translation) > 1:
                # Check if the character before 'y' is a consonant
                consonants = "bcdfghjklmnpqrstvwxz"
                if verb_translation[-2].lower() in consonants:
                    return verb_translation[:-1] + "ies"

            # Check if the verb already ends with "s" (like "was", "is", etc.)
            if not verb_translation.endswith("s"):
                return verb_translation + "s"

        # Present tense 3rd person plural: handle "am" specially
        if tense == "Pres" and person == "3pl":
            if "am" in verb_translation:
                # Use word boundary replacement to avoid affecting words like "familiar"
                return re.sub(r"\bam\b", "are", verb_translation)

        # Imperfect tense 3rd person plural: change "was" to "were"
        if tense == "Impf" and person == "3pl":
            if "was" in verb_translation:
                # Use word boundary replacement to avoid affecting other words
                return re.sub(r"\bwas\b", "were", verb_translation)

        # Aorist tense 3rd person plural: change "was" to "were"
        if tense == "Aor" and person == "3pl":
            if "was" in verb_translation:
                # Use word boundary replacement to avoid affecting other words
                return re.sub(r"\bwas\b", "were", verb_translation)

        return verb_translation

    def _generate_argument_component(
        self,
        verb_id: int,
        tense: str,
        person: str,
        arg_type: str,  # 'subject', 'direct_object', 'indirect_object'
        arg_data: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Unified method to generate any argument component"""
        try:
            # Get argument data
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            arg_args = arguments.get(arg_type, {})

            # Get noun and adjective for this person
            person_data = arg_args.get(person, {})
            noun_key = person_data.get("noun", "")
            adjective_key = person_data.get("adjective", "")

            # Get case form - fail if not specified
            case = arg_data.get("case")

            # Validate all required data using centralized validation
            self._validate_argument_data(
                verb_id, person, arg_type, noun_key, adjective_key, case
            )

            # Convert case to lowercase
            case = case.lower()

            # Handle number for subjects (plural for 3pl)
            number = (
                "plural" if person == "3pl" and arg_type == "subject" else "singular"
            )

            # Get case form from selected argument - pass number parameter for 3pl subjects
            case_form = self.argument_processor.get_case_form(
                noun_key, case, self.argument_processor.databases, number
            )

            # Get adjective form (now mandatory)
            adj_case_form = self.argument_processor.get_adjective_form(
                adjective_key, case, self.argument_processor.databases
            )
            georgian_text = f"{adj_case_form} {case_form}"

            # Create HTML with case marking and role
            html = f'<span data-case="{case}" data-role="{arg_type.replace("_", "-")}">{georgian_text}</span>'

            return {
                "georgian": georgian_text,
                "english": f"{georgian_text} ({self.case_names.get(case, case.title())})",
                "html": html,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            error_msg = f"Failed to generate {arg_type} component for verb {verb_id}, person {person}: {e}"
            guidance = "Please check the verb configuration and ensure all required argument data is properly configured."
            logger.error(f"{error_msg}. {guidance}")
            raise ValueError(f"{error_msg}. {guidance}")

    def _validate_argument_data(
        self,
        verb_id: int,
        person: str,
        arg_type: str,
        noun_key: str,
        adjective_key: str,
        case: str,
    ) -> None:
        """Validate that required argument data is present"""
        # Handle empty noun key
        if not noun_key:
            error_msg = f"Missing noun key for {arg_type} argument in person {person} for verb {verb_id}"
            guidance = f"Please configure the {arg_type} noun in the Arguments section of the verb editor before generating examples."
            logger.error(f"{error_msg}. {guidance}")
            raise ValueError(f"{error_msg}. {guidance}")

        # Handle empty adjective key
        if not adjective_key:
            error_msg = f"Missing adjective key for {arg_type} argument in person {person} for verb {verb_id}"
            guidance = f"Please configure the {arg_type} adjective in the Arguments section of the verb editor before generating examples."
            logger.error(f"{error_msg}. {guidance}")
            raise ValueError(f"{error_msg}. {guidance}")

        # Handle missing case
        if not case:
            error_msg = f"Case not specified for {arg_type} argument in person {person} for verb {verb_id}"
            guidance = f"Please configure the case for {arg_type} argument in the Arguments section of the verb editor before generating examples."
            logger.error(f"{error_msg}. {guidance}")
            raise ValueError(f"{error_msg}. {guidance}")

    def _get_verb_translation(
        self,
        verb_data: Optional[Dict] = None,
        tense: str = None,
        effective_preverb: str = "",
    ) -> str:
        """
        Extract and return verb translation from verb data.

        Args:
            verb_data: Verb data dictionary
            tense: Verb tense
            effective_preverb: Effective preverb being used

        Returns:
            Verb translation string

        Raises:
            ValueError: If no translation is available
        """
        try:
            # Get English translations
            english_translations = (
                verb_data.get("english_translations", {}) if verb_data else {}
            )

            # Convert mapped tense back to original tense name for English translation lookup
            original_tense = self.reverse_tense_mapping.get(tense, tense)

            # Debug logging
            safe_log(
                logger,
                "info",
                f"[ENGLISH_TRANSLATION] Effective preverb: '{effective_preverb}', Original tense: '{original_tense}'",
            )

            # Get the correct verb translation based on preverb
            if effective_preverb and effective_preverb in english_translations:
                # Use preverb-specific translation directly from english_translations
                verb_translation = english_translations[effective_preverb].get(
                    original_tense, ""
                )
                safe_log(
                    logger,
                    "info",
                    f"[ENGLISH_TRANSLATION] Using preverb-specific translation: '{verb_translation}'",
                )
            else:
                # Use default translation
                default_translations = english_translations.get("default", {})
                verb_translation = default_translations.get(original_tense, "")
                safe_log(
                    logger,
                    "info",
                    f"[ENGLISH_TRANSLATION] Using default translation: '{verb_translation}'",
                )

            if not verb_translation:
                safe_log(
                    logger,
                    "error",
                    f"[ENGLISH_TRANSLATION] No translation found for tense '{tense}'",
                )
                raise ValueError(f"No translation found for tense '{tense}'")

            return verb_translation

        except Exception as e:
            safe_log(logger, "error", f"Failed to get verb translation: {e}")
            raise ValueError(f"Failed to get verb translation: {e}")

    def _build_argument_english_text(
        self,
        verb_data: Optional[Dict] = None,
        person: str = None,
        argument_type: str = "subject",
        include_preposition: bool = False,
        capitalize_preposition: bool = False,
    ) -> str:
        """
        Build the English text for a specific argument (subject, direct object, indirect object)
        using the JSON structure.
        """
        try:
            # Get argument data
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            argument_args = arguments.get(argument_type, {})

            # Get noun and adjective for this person
            person_data = argument_args.get(person, {})
            noun_key = person_data.get("noun", "")
            adjective_key = person_data.get("adjective", "")

            # Handle empty noun key
            if not noun_key:
                error_msg = f"Missing noun key for {argument_type} argument in person {person} for verb {verb_data.get('id', 'N/A')}"
                guidance = f"Please configure the {argument_type} noun in the Arguments section of the verb editor before generating examples."
                logger.error(f"{error_msg}. {guidance}")
                raise ValueError(f"{error_msg}. {guidance}")

            # Handle empty adjective key
            if not adjective_key:
                error_msg = f"Missing adjective key for {argument_type} argument in person {person} for verb {verb_data.get('id', 'N/A')}"
                guidance = f"Please configure the {argument_type} adjective in the Arguments section of the verb editor before generating examples."
                logger.error(f"{error_msg}. {guidance}")
                raise ValueError(f"{error_msg}. {guidance}")

            # Get case form
            case = person_data.get("case", "nom").lower()
            number = "plural" if person == "3pl" else "singular"

            # Get case form from selected object - pass number parameter for 3pl subjects
            case_form = self.argument_processor.get_case_form(
                noun_key, case, self.argument_processor.databases, number
            )

            # Get adjective form (now mandatory)
            adj_case_form = self.argument_processor.get_adjective_form(
                adjective_key, case, self.argument_processor.databases
            )
            georgian_text = f"{adj_case_form} {case_form}"

            # Add definite article if case is Nom or Acc
            if case in ["nom", "acc"]:
                georgian_text = self._add_definite_article(georgian_text)

            # Get English form - pass number parameter for 3pl subjects
            noun_english = self._get_english_base_form(
                noun_key,
                (
                    "plural"
                    if person == "3pl" and argument_type == "subject"
                    else "singular"
                ),
                self.DATABASE_TYPE_MAPPING.get(argument_type, "subjects"),
            )
            adj_english = self._get_english_base_form(
                adjective_key, "singular", "adjectives"
            )

            # Combine adjective and noun
            english_text = f"{adj_english} {noun_english}"

            # Add preposition if specified
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            prepositions = syntax.get("prepositions", {})
            argument_preposition = prepositions.get(argument_type, "")

            if include_preposition and argument_preposition:
                # Capitalize "the" to "The" for subjects
                if argument_type == "subject" and argument_preposition.lower() == "the":
                    argument_preposition = "The"
                english_text = f"{argument_preposition} {english_text}"

            return english_text

        except Exception as e:
            error_msg = f"Failed to build English text for {argument_type} argument in person {person}: {e}"
            guidance = "Please check the verb configuration and ensure all required argument data is properly configured."
            logger.error(f"{error_msg}. {guidance}")
            raise ValueError(f"{error_msg}. {guidance}")

    def _get_person_text(self, person: str) -> str:
        """Get the English text for a person"""
        person_mapping = {
            "1sg": "I",
            "2sg": "You,",
            "1pl": "We",
            "2pl": "You all (you formal),",
        }
        return person_mapping.get(person, "subject")

    def _get_database_type(self, argument_type: str) -> str:
        """
        Get the database type for an argument type.

        Args:
            argument_type: Type of argument

        Returns:
            Database type string
        """
        return self.DATABASE_TYPE_MAPPING.get(argument_type, "subjects")


def generate_examples(
    verb_data: Dict, tense: str, selected_preverbs: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Generate examples for a verb and tense using the JSON structure

    Args:
        verb_data: Verb data from verb editor
        tense: Tense name (present, imperfect, etc.)
        selected_preverbs: List of preverbs to generate examples for (for multi-preverb verbs)

    Returns:
        Dictionary with examples data organized by preverb
    """
    logger.info(
        f"[EXAMPLES] Starting example generation for tense: {tense}, selected_preverbs: {selected_preverbs}"
    )

    try:
        # Get tense data from conjugations structure
        conjugations = verb_data.get("conjugations", {})
        tense_conjugation = conjugations.get(tense, {})

        if not isinstance(tense_conjugation, dict):
            safe_log(
                logger,
                "warning",
                f"[EXAMPLES] Verb {verb_data.get('id', 'unknown')} ({verb_data.get('georgian', 'unknown')}): No valid tense conjugation data for {tense}",
            )
            return {"examples": [], "raw_gloss": ""}

        # Extract data from structure
        raw_gloss = tense_conjugation.get("raw_gloss", "")
        verb_semantics = verb_data.get("semantic_key", "to do")
        verb_id = verb_data.get("id", 0)

        # Determine which preverbs to generate examples for
        preverb_config = verb_data.get("preverb_config", {})
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

        safe_log(
            logger,
            "info",
            f"[EXAMPLES] Verb has multiple preverbs: {has_multiple_preverbs}",
        )
        safe_log(logger, "info", f"[EXAMPLES] Preverb config: {preverb_config}")

        if has_multiple_preverbs and selected_preverbs:
            # Multi-preverb verb with selected preverbs
            preverbs_to_generate = selected_preverbs
            safe_log(
                logger,
                "info",
                f"[EXAMPLES] Using selected preverbs: {selected_preverbs}",
            )
        elif has_multiple_preverbs:
            # Multi-preverb verb, use all available preverbs
            preverbs_to_generate = preverb_config.get("available_preverbs", [])
            safe_log(
                logger,
                "info",
                f"[EXAMPLES] Using all available preverbs: {preverbs_to_generate}",
            )
        else:
            # Single preverb verb, use default
            preverbs_to_generate = [preverb_config.get("default_preverb", "")]
            safe_log(
                logger,
                "info",
                f"[EXAMPLES] Using default preverb: {preverbs_to_generate}",
            )

        # Generate examples for each preverb
        all_examples = []
        fallback_warnings = []

        generator = ExampleGenerator()

        # For imperative tense, use 2sg and 2pl instead of 1sg, 3sg, 3pl
        if tense == "imperative":
            persons = generator.IMPERATIVE_PERSONS
        else:
            persons = generator.STANDARD_PERSONS

        # Generate examples for each person across all preverbs
        for person in persons:
            for preverb in preverbs_to_generate:
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Generating example for person: {person}, preverb: {preverb}",
                )

                # Handle preverb fallbacks (even for empty preverbs)
                effective_preverb = get_effective_preverb(verb_data, preverb, tense)
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Effective preverb for {preverb}: {effective_preverb}",
                )

                # Check if preverb fallback occurred
                if effective_preverb != preverb:
                    safe_log(
                        logger,
                        "warning",
                        f"[EXAMPLES] Verb {verb_id} ({verb_data.get('georgian', 'unknown')}): Preverb fallback '{preverb}' -> '{effective_preverb}' in {tense} tense",
                    )
                    fallback_warnings.append(
                        {
                            "original_preverb": preverb,
                            "effective_preverb": effective_preverb,
                            "tense": tense,
                            "message": f"Preverb '{preverb}' falls back to '{effective_preverb}' in {tense} tense",
                        }
                    )

                # Get the correct verb form for this preverb and tense
                georgian_form = get_conjugation_form_for_preverb(
                    verb_data, tense, person, effective_preverb
                )
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Georgian form for {person} with preverb {effective_preverb}: {georgian_form}",
                )

                if not georgian_form or georgian_form == "-":
                    safe_log(
                        logger,
                        "warning",
                        f"[EXAMPLES] Verb {verb_id} ({verb_data.get('georgian', 'unknown')}): No valid form for {person} with preverb '{effective_preverb}' in {tense} tense",
                    )
                    continue

                # Generate the example
                mapped_tense = generator.tense_mapping.get(tense, tense)
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Original tense: '{tense}', mapped tense: '{mapped_tense}'",
                )
                # Use the structured method
                example = generator.generate_example_structured(
                    verb_id=verb_id,
                    tense=mapped_tense,
                    person=person,
                    raw_gloss=raw_gloss,
                    verb_semantics=verb_semantics,
                    georgian_verb_form=georgian_form,
                    verb_data=verb_data,
                    effective_preverb=effective_preverb,
                )
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Generated structured example: {example.get('georgian', 'N/A')} -> {example.get('english_components', 'N/A')}",
                )

                # Find or create the preverb group in all_examples
                preverb_group = None
                for group in all_examples:
                    if group["preverb"] == preverb:
                        preverb_group = group
                        break

                if not preverb_group:
                    preverb_group = {
                        "preverb": preverb,
                        "effective_preverb": effective_preverb,
                        "examples": [],
                    }
                    all_examples.append(preverb_group)
                    safe_log(
                        logger,
                        "info",
                        f"[EXAMPLES] Created preverb group for: {preverb}",
                    )

                preverb_group["examples"].append(example)

        return {
            "examples": all_examples,
            "raw_gloss": raw_gloss,
            "fallback_warnings": fallback_warnings if fallback_warnings else None,
        }

    except Exception as e:
        safe_log(logger, "error", f"Failed to generate examples: {e}")

        # Provide more specific error information
        error_details = str(e)
        error_type = "unknown"

        if "arguments" in error_details.lower() or "syntax" in error_details.lower():
            error_type = "missing_arguments"
        elif "raw_gloss" in error_details.lower() or "gloss" in error_details.lower():
            error_type = "invalid_raw_gloss"
        elif "preverb" in error_details.lower():
            error_type = "preverb_config"
        elif "noun" in error_details.lower() or "adjective" in error_details.lower():
            error_type = "missing_lexical_data"

        return {
            "examples": [],
            "raw_gloss": "",
            "error": {
                "type": error_type,
                "message": error_details,
                "guidance": get_error_guidance(error_type),
            },
        }


def get_effective_preverb(verb_data: Dict, preverb: str, tense: str) -> str:
    """
    Get the effective preverb for a given preverb and tense, handling fallbacks

    Args:
        verb_data: Verb data dictionary
        preverb: Requested preverb
        tense: Tense name

    Returns:
        Effective preverb to use (may be different due to fallbacks)
    """
    safe_log(
        logger,
        "info",
        f"[PREVERB] Getting effective preverb for: {preverb} in tense: {tense}",
    )

    preverb_rules = verb_data.get("preverb_rules", {})
    safe_log(logger, "info", f"[PREVERB] Preverb rules: {preverb_rules}")

    # Check for tense-specific fallbacks
    tense_fallbacks = preverb_rules.get("tense_specific_fallbacks", {})
    if preverb in tense_fallbacks and tense in tense_fallbacks[preverb]:
        effective = tense_fallbacks[preverb][tense]
        safe_log(
            logger,
            "info",
            f"[PREVERB] Found tense-specific fallback: {preverb} -> {effective}",
        )
        return effective

    # English fallbacks are now handled automatically by the verb data processor
    # when form fallbacks are applied, so no manual checking is needed here

    # No fallback, use original preverb
    safe_log(
        logger,
        "info",
        f"[PREVERB] No fallback found, using original preverb: {preverb}",
    )
    return preverb


def get_error_guidance(error_type: str) -> str:
    """
    Get user-friendly guidance for different error types

    Args:
        error_type: Type of error that occurred

    Returns:
        User-friendly guidance message
    """
    guidance_messages = {
        "missing_arguments": "Please configure arguments in the Arguments section before generating examples.",
        "invalid_raw_gloss": "Please enter a valid raw gloss pattern (e.g., '<S-DO>') in the Raw Gloss field.",
        "preverb_config": "Please check your preverb configuration in the Preverb Configuration section.",
        "missing_lexical_data": "Please ensure noun and adjective data is available for the selected arguments.",
        "unknown": "Please check your configuration and try again.",
    }

    return guidance_messages.get(error_type, guidance_messages["unknown"])


def get_conjugation_form_for_preverb(
    verb_data: Dict, tense: str, person: str, preverb: str
) -> str:
    """
    Get conjugation form for a specific preverb

    Args:
        verb_data: Verb data dictionary
        tense: Tense name
        person: Person form
        preverb: Preverb to use

    Returns:
        Georgian verb form
    """
    logger.info(
        f"[CONJUGATION] Getting form for tense: {tense}, person: {person}, preverb: {preverb}"
    )

    # Use the verb_conjugation module to get the proper form with preverb handling
    form = get_conjugation_form(verb_data, tense, person, preverb)
    logger.info(f"[CONJUGATION] Retrieved form: {form}")

    return form
