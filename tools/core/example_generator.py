#!/usr/bin/env python3
"""
Pedagogical Example Generator for Georgian Verb Example System

This module provides pedagogical example generation for Georgian verbs with:
- Complete example generation for all argument patterns
- Case marking in HTML with data attributes
- English translations with case highlighting
- Deterministic generation for consistency
- A1-A2 vocabulary level focus
"""

import logging
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path
import json

from tools.core.noun_adjective_selection_engine import (
    NounAdjectiveSelectionEngine,
    NounSelectionError,
    CaseFormMissingError,
)
from tools.core.gloss_parser import StandardizedRawGlossParser, RawGlossParseError
from tools.core.verb_conjugation import (
    get_conjugation_form,
    get_verb_gloss,
    get_english_translation,
    get_indirect_object_preposition,
    get_direct_object_preposition,
    has_preverb_in_tense,
)

# Configure logging
import os
from pathlib import Path

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

# Get the logger for this module
logger = logging.getLogger(__name__)

# Only configure logging if it hasn't been configured yet
if not logger.handlers:
    # Create file handler
    file_handler = logging.FileHandler(logs_dir / "example_generator.log")
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


class ExampleGenerationError(Exception):
    """Raised when example generation fails"""

    pass


class PedagogicalExampleGenerator:
    def __init__(self):
        """Initialize the example generator with selection engine and parser"""
        self.selection_engine = NounAdjectiveSelectionEngine()
        self.raw_gloss_parser = StandardizedRawGlossParser()

        # Case name mappings for English translations
        self.case_names = {
            "nom": "Nominative",
            "erg": "Ergative",
            "dat": "Dative",
            "gen": "Genitive",
            "inst": "Instrumental",
            "adv": "Adverbial",
        }

        # Role descriptions for English translations
        self.role_descriptions = {
            "subject": "Subject",
            "direct_object": "Direct Object",
            "indirect_object": "Indirect Object",
        }

        # Tense mapping for English translations
        self.tense_mapping = {
            "present": "Pres",
            "imperfect": "Impf",
            "future": "Fut",
            "aorist": "Aor",
            "optative": "Opt",
            "imperative": "Impv",
        }

        # Reverse mapping for English translations
        self.reverse_tense_mapping = {v: k for k, v in self.tense_mapping.items()}

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

    def generate_example(
        self,
        verb_id: int,
        tense: str,
        person: str,
        raw_gloss: str,
        verb_semantics: str,
        georgian_verb_form: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """
        Generate a complete pedagogical example

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense
            person: Verb person
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            georgian_verb_form: The Georgian verb form to use

        Returns:
            Dictionary with complete example data:
            {
                "georgian": "სტუდენტი წიგნს კითხულობს",
                "english": "The student (Nominative) reads the book (Dative)",
                "html": "<span data-case='nom'>სტუდენტი</span> <span data-case='dat'>წიგნს</span> კითხულობს",
                "case_marking": {
                    "subject": {"case": "nom", "word": "სტუდენტი"},
                    "direct_object": {"case": "dat", "word": "წიგნს"}
                }
            }

        Raises:
            ExampleGenerationError: If generation fails
        """
        try:
            # Parse the raw gloss to understand argument structure
            if not raw_gloss or not raw_gloss.strip():
                # Handle empty raw gloss - use default structure
                arguments = {"subject": {"type": "S", "case": "Nom"}}
            else:
                try:
                    parsed_gloss = self.raw_gloss_parser.parse_raw_gloss(raw_gloss)
                    arguments = parsed_gloss.get("arguments", {})
                except Exception as e:
                    logger.warning(
                        f"Failed to parse raw gloss '{raw_gloss}': {e}, using default structure"
                    )
                    arguments = {"subject": {"type": "S", "case": "Nom"}}

            # Build the example components
            georgian_parts = []
            english_parts = []
            html_parts = []
            case_marking = {}

            # Add subject if needed and available
            if "subject" in arguments and self._should_include_subject(person):
                subject_data = self._generate_subject_component(
                    verb_id,
                    tense,
                    person,
                    arguments["subject"],
                    raw_gloss,
                    verb_semantics,
                    verb_data,
                )
                georgian_parts.append(subject_data["georgian"])
                english_parts.append(subject_data["english"])
                html_parts.append(subject_data["html"])
                case_marking["subject"] = subject_data["case_marking"]

            # Add direct object if available
            if "direct_object" in arguments:
                do_data = self._generate_direct_object_component(
                    verb_id,
                    tense,
                    person,
                    arguments["direct_object"],
                    raw_gloss,
                    verb_semantics,
                    verb_data,
                )
                georgian_parts.append(do_data["georgian"])
                english_parts.append(do_data["english"])
                html_parts.append(do_data["html"])
                case_marking["direct_object"] = do_data["case_marking"]

            # Add indirect object if available
            if "indirect_object" in arguments:
                io_data = self._generate_indirect_object_component(
                    verb_id,
                    tense,
                    person,
                    arguments["indirect_object"],
                    raw_gloss,
                    verb_semantics,
                    verb_data,
                )
                georgian_parts.append(io_data["georgian"])
                english_parts.append(io_data["english"])
                html_parts.append(io_data["html"])
                case_marking["indirect_object"] = io_data["case_marking"]

            # Add the verb form (with "უნდა" for optative tense)
            if tense == "Opt" and georgian_verb_form != "-":
                georgian_parts.append(f"უნდა {georgian_verb_form}")
            else:
                georgian_parts.append(georgian_verb_form)

            # Generate complete English translation using the new function
            # Extract the keys from the selection engine data
            subject_key = None
            subject_adj_key = None
            do_key = None
            do_adj_key = None
            io_key = None
            io_adj_key = None

            if "subject" in arguments and self._should_include_subject(person):
                # Extract keys from subject selection
                subject_key, subject_adj_key = (
                    self.selection_engine.select_subject_with_adjective(
                        verb_id, tense, person, raw_gloss, verb_semantics, verb_data
                    )
                )

            if "direct_object" in arguments:
                # Extract keys from direct object selection
                do_key, do_adj_key = (
                    self.selection_engine.select_direct_object_with_adjective(
                        verb_id, tense, person, raw_gloss, verb_semantics, verb_data
                    )
                )

            if "indirect_object" in arguments:
                # Extract keys from indirect object selection
                io_key, io_adj_key = (
                    self.selection_engine.select_indirect_object_with_adjective(
                        verb_id, tense, person, raw_gloss, verb_semantics, verb_data
                    )
                )

            english_translation = self._generate_english_translation(
                "complete",
                subject_key,
                subject_adj_key,
                do_key,
                do_adj_key,
                io_key,
                io_adj_key,
                verb_semantics,
                tense,
                person,
                verb_data,
            )

            # Combine all parts
            georgian_sentence = " ".join(georgian_parts)
            # Add verb to HTML with "უნდა" for optative tense
            if tense == "Opt" and georgian_verb_form != "-":
                html_sentence = (
                    " ".join(html_parts)
                    + f' <span data-role="verb">უნდა {georgian_verb_form}</span>'
                )
            else:
                html_sentence = (
                    " ".join(html_parts)
                    + f' <span data-role="verb">{georgian_verb_form}</span>'
                )

            # Create plain text version of English translation (without HTML tags)
            import re

            english_plain = re.sub(r"<[^>]+>", "", english_translation)

            return {
                "georgian": georgian_sentence,
                "english": english_translation,
                "english_plain": english_plain,
                "html": html_sentence,
                "case_marking": case_marking,
                "georgian_verb_form": georgian_verb_form,
            }

        except Exception as e:
            logger.error(f"Failed to generate example: {e}")
            raise ExampleGenerationError(f"Example generation failed: {e}")

    def generate_example_with_new_structure(
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
        Generate a complete pedagogical example using the new JSON structure

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense
            person: Verb person
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            georgian_verb_form: The Georgian verb form to use
            verb_data: Verb data from new structure
            effective_preverb: Effective preverb being used (after fallbacks)

        Returns:
            Dictionary with complete example data
        """
        try:
            # Parse the raw gloss to understand argument structure
            if not raw_gloss or not raw_gloss.strip():
                # Handle empty raw gloss - use default structure
                arguments = {"subject": {"type": "S", "case": "Nom"}}
            else:
                try:
                    parsed_gloss = self.raw_gloss_parser.parse_raw_gloss(raw_gloss)
                    arguments = parsed_gloss.get("arguments", {})
                except Exception as e:
                    logger.warning(
                        f"Failed to parse raw gloss '{raw_gloss}': {e}, using default structure"
                    )
                    arguments = {"subject": {"type": "S", "case": "Nom"}}

            # Build the example components
            georgian_parts = []
            english_parts = []
            html_parts = []
            case_marking = {}

            # Add subject if needed and available
            if "subject" in arguments and self._should_include_subject(person):
                subject_data = self._generate_subject_component_new_structure(
                    verb_id,
                    tense,
                    person,
                    arguments["subject"],
                    raw_gloss,
                    verb_semantics,
                    verb_data,
                )
                georgian_parts.append(subject_data["georgian"])
                english_parts.append(subject_data["english"])
                html_parts.append(subject_data["html"])
                case_marking["subject"] = subject_data["case_marking"]

            # Add direct object if available
            if "direct_object" in arguments:
                do_data = self._generate_direct_object_component_new_structure(
                    verb_id,
                    tense,
                    person,
                    arguments["direct_object"],
                    raw_gloss,
                    verb_semantics,
                    verb_data,
                )
                georgian_parts.append(do_data["georgian"])
                english_parts.append(do_data["english"])
                html_parts.append(do_data["html"])
                case_marking["direct_object"] = do_data["case_marking"]

            # Add indirect object if available
            if "indirect_object" in arguments:
                io_data = self._generate_indirect_object_component_new_structure(
                    verb_id,
                    tense,
                    person,
                    arguments["indirect_object"],
                    raw_gloss,
                    verb_semantics,
                    verb_data,
                )
                georgian_parts.append(io_data["georgian"])
                english_parts.append(io_data["english"])
                html_parts.append(io_data["html"])
                case_marking["indirect_object"] = io_data["case_marking"]

            # Add the verb form (with "უნდა" for optative tense)
            if tense == "Opt" and georgian_verb_form != "-":
                georgian_parts.append(f"უნდა {georgian_verb_form}")
            else:
                georgian_parts.append(georgian_verb_form)

            # Generate complete English translation using the new structure
            english_translation = self._generate_english_translation_new_structure(
                verb_data,
                tense,
                person,
                effective_preverb,
            )

            # Combine all parts
            georgian_sentence = " ".join(georgian_parts)
            # Add verb to HTML with "უნდა" for optative tense
            if tense == "Opt" and georgian_verb_form != "-":
                html_sentence = (
                    " ".join(html_parts)
                    + f' <span data-role="verb">უნდა {georgian_verb_form}</span>'
                )
            else:
                html_sentence = (
                    " ".join(html_parts)
                    + f' <span data-role="verb">{georgian_verb_form}</span>'
                )

            # Create plain text version of English translation (without HTML tags)
            import re

            english_plain = re.sub(r"<[^>]+>", "", english_translation)

            return {
                "georgian": georgian_sentence,
                "english": english_translation,
                "english_plain": english_plain,
                "html": html_sentence,
                "case_marking": case_marking,
                "georgian_verb_form": georgian_verb_form,
            }

        except Exception as e:
            logger.error(f"Failed to generate example with new structure: {e}")
            raise ExampleGenerationError(f"Example generation failed: {e}")

    def _generate_subject_component(
        self,
        verb_id: int,
        tense: str,
        person: str,
        subject_arg: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Generate subject component with case marking"""
        try:
            # Select subject and adjective deterministically
            selected_subject, selected_adjective = (
                self.selection_engine.select_subject_with_adjective(
                    verb_id, tense, person, raw_gloss, verb_semantics, verb_data
                )
            )

            # Get case form - use plural for 3pl
            case = subject_arg.get("case", "nom").lower()
            number = "plural" if person == "3pl" else "singular"

            # Get case form from selected subject
            case_form = self.selection_engine.get_case_form(
                selected_subject, case, number
            )

            # Get adjective form if present
            if selected_adjective:
                adj_case_form = self.selection_engine.get_adjective_form(
                    selected_adjective, case, number
                )
                georgian_text = f"{adj_case_form} {case_form}"
            else:
                georgian_text = case_form

            # Create HTML with case marking and role
            html = (
                f'<span data-case="{case}" data-role="subject">{georgian_text}</span>'
            )

            return {
                "georgian": georgian_text,
                "english": f"{georgian_text} ({self.case_names.get(case, case.title())})",
                "html": html,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            logger.error(f"Failed to generate subject component: {e}")
            # Fallback to basic form
            return {
                "georgian": "სტუდენტი",
                "english": "student (Nominative)",
                "html": '<span data-case="nom" data-role="subject">სტუდენტი</span>',
                "case_marking": {"case": "nom", "word": "სტუდენტი"},
            }

    def _generate_direct_object_component(
        self,
        verb_id: int,
        tense: str,
        person: str,
        do_arg: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Generate direct object component with case marking"""
        try:
            # Select direct object and adjective
            selected_object, selected_adjective = (
                self.selection_engine.select_direct_object_with_adjective(
                    verb_id, tense, person, raw_gloss, verb_semantics, verb_data
                )
            )

            # Get case form
            case = do_arg.get("case", "dat").lower()

            # Get case form from selected object
            case_form = self.selection_engine.get_case_form(selected_object, case)

            # Get adjective form if present
            if selected_adjective:
                adj_case_form = self.selection_engine.get_adjective_form(
                    selected_adjective, case
                )
                georgian_text = f"{adj_case_form} {case_form}"
            else:
                georgian_text = case_form

            english_text = (
                f"{georgian_text} ({self.case_names.get(case, case.title())})"
            )
            html_text = f'<span data-case="{case}" data-role="direct-object">{georgian_text}</span>'

            return {
                "georgian": georgian_text,
                "english": english_text,
                "html": html_text,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            logger.error(f"Failed to generate direct object component: {e}")
            # Fallback to basic form
            return {
                "georgian": "წიგნს",
                "english": "book (Dative)",
                "html": '<span data-case="dat" data-role="direct-object">წიგნს</span>',
                "case_marking": {"case": "dat", "word": "წიგნს"},
            }

    def _generate_indirect_object_component(
        self,
        verb_id: int,
        tense: str,
        person: str,
        io_arg: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Generate indirect object component with case marking"""
        try:
            # Select indirect object and adjective
            selected_object, selected_adjective = (
                self.selection_engine.select_indirect_object_with_adjective(
                    verb_id, tense, person, raw_gloss, verb_semantics, verb_data
                )
            )

            # Get case form
            case = io_arg.get("case", "dat").lower()

            # Get case form from selected object
            case_form = self.selection_engine.get_case_form(selected_object, case)

            # Get adjective form if present
            if selected_adjective:
                adj_case_form = self.selection_engine.get_adjective_form(
                    selected_adjective, case
                )
                georgian_text = f"{adj_case_form} {case_form}"
            else:
                georgian_text = case_form

            english_text = (
                f"{georgian_text} ({self.case_names.get(case, case.title())})"
            )
            html_text = f'<span data-case="{case}" data-role="indirect-object">{georgian_text}</span>'

            return {
                "georgian": georgian_text,
                "english": english_text,
                "html": html_text,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            logger.error(f"Failed to generate indirect object component: {e}")
            # Fallback to basic form
            return {
                "georgian": "მეგობარს",
                "english": "friend (Dative)",
                "html": '<span data-case="dat" data-role="indirect-object">მეგობარს</span>',
                "case_marking": {"case": "dat", "word": "მეგობარს"},
            }

    def _generate_english_translation(
        self,
        pattern: str,
        subject_key: str,
        subject_adj_key: str,
        do_key: str,
        do_adj_key: str,
        io_key: str,
        io_adj_key: str,
        verb_semantics: str,
        tense: str = None,
        person: str = None,
        verb_data: Optional[Dict] = None,
    ) -> str:
        """Generate English translation with case highlighting"""
        # Get English base forms from databases
        # For subjects, use plural English translation for 3pl
        subject_number = "plural" if person == "3pl" else "singular"
        subject_english = (
            self._get_english_base_form(subject_key, "subjects", subject_number)
            if subject_key
            else None
        )
        do_english = (
            self._get_english_base_form(do_key, "direct_objects") if do_key else None
        )
        io_english = (
            self._get_english_base_form(io_key, "indirect_objects") if io_key else None
        )

        subject_adj_english = (
            self._get_english_base_form(subject_adj_key, "adjectives")
            if subject_adj_key
            else None
        )
        do_adj_english = (
            self._get_english_base_form(do_adj_key, "adjectives")
            if do_adj_key
            else None
        )
        io_adj_english = (
            self._get_english_base_form(io_adj_key, "adjectives")
            if io_adj_key
            else None
        )

        # Get the correct verb translation based on tense and preverb
        if verb_data:
            # Convert mapped tense back to original tense name for English translation
            original_tense = self.reverse_tense_mapping.get(tense, tense)

            # Get the effective preverb for this example
            effective_preverb = verb_data.get("effective_preverb", "")

            # Debug logging
            logger.info(f"Verb data keys: {list(verb_data.keys())}")
            logger.info(f"Effective preverb: '{effective_preverb}'")
            logger.info(f"Original tense: '{original_tense}'")
            logger.info(
                f"English translations in verb_data: {verb_data.get('english_translations', {})}"
            )

            # Use the get_english_translation function with the effective preverb
            verb_translation = get_english_translation(
                verb_data, original_tense, effective_preverb
            )

            # Log the translation lookup for debugging
            logger.info(
                f"English translation lookup: preverb='{effective_preverb}', tense='{original_tense}', result='{verb_translation}'"
            )
        else:
            verb_translation = verb_semantics

        # Apply subject-verb agreement rules
        if person and verb_translation:
            verb_translation = self._apply_subject_verb_agreement(
                verb_translation, tense, person
            )

        # Build English translation parts in SVO order
        english_parts = []

        # Add subject (if present)
        if subject_key:
            if subject_adj_english:
                subject_text = f"{subject_adj_english} {subject_english}"
                # Only add "the" for 3sg and 3pl
                if person in ["3sg", "3pl"]:
                    subject_text = self._add_definite_article(subject_text)
                english_parts.append(
                    f'<strong data-role="subject">{subject_text}</strong>'
                )
            else:
                subject_text = subject_english
                # Only add "the" for 3sg and 3pl
                if person in ["3sg", "3pl"]:
                    subject_text = self._add_definite_article(subject_text)
                english_parts.append(
                    f'<strong data-role="subject">{subject_text}</strong>'
                )

        # Add verb (with "should" for optative forms and "I" for 1sg)
        if tense == "Opt":
            # Check if verb_translation already contains "should" to avoid duplication
            if "should" in verb_translation.lower():
                # Verb translation already includes "should", don't add it again
                if person == "1sg":
                    english_parts.append(
                        f'<strong data-role="subject" data-person="1sg">I</strong> <strong data-role="verb">{verb_translation}</strong>'
                    )
                else:
                    english_parts.append(
                        f'<strong data-role="verb">{verb_translation}</strong>'
                    )
            else:
                # Add "should" for optative tense
                if person == "1sg":
                    english_parts.append(
                        f'<strong data-role="subject" data-person="1sg">I</strong> <strong data-role="verb">should</strong> <strong data-role="verb">{verb_translation}</strong>'
                    )
                else:
                    english_parts.append(
                        f'<strong data-role="verb">should</strong> <strong data-role="verb">{verb_translation}</strong>'
                    )
        else:
            if person == "1sg":
                english_parts.append(
                    f'<strong data-role="subject" data-person="1sg">I</strong> <strong data-role="verb">{verb_translation}</strong>'
                )
            else:
                english_parts.append(
                    f'<strong data-role="verb">{verb_translation}</strong>'
                )

        # Add direct object if present
        if do_key:
            # Get the appropriate preposition for direct object with this verb
            do_preposition = (
                get_direct_object_preposition(verb_data) if verb_data else ""
            )

            if do_adj_english:
                do_text = f"{do_adj_english} {do_english}"
                if do_preposition:
                    english_parts.append(
                        f'<strong data-role="direct-object">{do_preposition} {do_text}</strong>'
                    )
                else:
                    english_parts.append(
                        f'<strong data-role="direct-object">{do_text}</strong>'
                    )
            else:
                do_text = do_english
                if do_preposition:
                    english_parts.append(
                        f'<strong data-role="direct-object">{do_preposition} {do_text}</strong>'
                    )
                else:
                    english_parts.append(
                        f'<strong data-role="direct-object">{do_text}</strong>'
                    )

        # Add indirect object if present
        if io_key:
            # Get the appropriate preposition for this verb
            preposition = (
                get_indirect_object_preposition(verb_data) if verb_data else ""
            )

            if io_adj_english:
                io_text = f"{io_adj_english} {io_english}"
                if preposition:
                    english_parts.append(
                        f'<strong data-role="indirect-object">{preposition} {io_text}</strong>'
                    )
                else:
                    english_parts.append(
                        f'<strong data-role="indirect-object">{io_text}</strong>'
                    )
            else:
                io_text = io_english
                if preposition:
                    english_parts.append(
                        f'<strong data-role="indirect-object">{preposition} {io_text}</strong>'
                    )
                else:
                    english_parts.append(
                        f'<strong data-role="indirect-object">{io_text}</strong>'
                    )

        # Apply SOV → SVO mapping (currently the parts are already in SVO order)
        english_parts = self._sov_to_svo_mapping(english_parts)

        return " ".join(english_parts)

    def _get_english_base_form(
        self, key: str, database_type: str, number: str = "singular"
    ) -> str:
        """Get English base form from database"""
        try:
            return self.selection_engine.get_english_base_form(
                key, database_type, number
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

    def _sov_to_svo_mapping(self, parts: List[str]) -> List[str]:
        """Convert SOV order to SVO order (currently already in SVO order)"""
        # Keep the current SVO order since the English translation
        # is already built in SVO order (Subject → Verb → Object)
        return parts

    def _generate_subject_component_new_structure(
        self,
        verb_id: int,
        tense: str,
        person: str,
        subject_arg: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Generate subject component using new JSON structure"""
        try:
            # Get argument data from new structure
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            subject_args = arguments.get("subject", {})

            # Get noun and adjective for this person
            person_data = subject_args.get(person, {})
            noun_key = person_data.get("noun", "")
            adjective_key = person_data.get("adjective", "")

            # Get case form - use plural for 3pl
            case = subject_arg.get("case", "nom").lower()
            number = "plural" if person == "3pl" else "singular"

            # Get case form from selected subject
            case_form = self.selection_engine.get_case_form(noun_key, case, number)

            # Get adjective form if present
            if adjective_key:
                adj_case_form = self.selection_engine.get_adjective_form(
                    adjective_key, case, number
                )
                georgian_text = f"{adj_case_form} {case_form}"
            else:
                georgian_text = case_form

            # Create HTML with case marking and role
            html = (
                f'<span data-case="{case}" data-role="subject">{georgian_text}</span>'
            )

            return {
                "georgian": georgian_text,
                "english": f"{georgian_text} ({self.case_names.get(case, case.title())})",
                "html": html,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            logger.error(
                f"Failed to generate subject component with new structure: {e}"
            )
            # Fallback to basic form
            return {
                "georgian": "სტუდენტი",
                "english": "student (Nominative)",
                "html": '<span data-case="nom" data-role="subject">სტუდენტი</span>',
                "case_marking": {"case": "nom", "word": "სტუდენტი"},
            }

    def _generate_direct_object_component_new_structure(
        self,
        verb_id: int,
        tense: str,
        person: str,
        do_arg: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Generate direct object component using new JSON structure"""
        try:
            # Get argument data from new structure
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            do_args = arguments.get("direct_object", {})

            # Get noun and adjective for this person
            person_data = do_args.get(person, {})
            noun_key = person_data.get("noun", "")
            adjective_key = person_data.get("adjective", "")

            # Get case form
            case = do_arg.get("case", "dat").lower()

            # Get case form from selected object
            case_form = self.selection_engine.get_case_form(noun_key, case)

            # Get adjective form if present
            if adjective_key:
                adj_case_form = self.selection_engine.get_adjective_form(
                    adjective_key, case
                )
                georgian_text = f"{adj_case_form} {case_form}"
            else:
                georgian_text = case_form

            english_text = (
                f"{georgian_text} ({self.case_names.get(case, case.title())})"
            )
            html_text = f'<span data-case="{case}" data-role="direct-object">{georgian_text}</span>'

            return {
                "georgian": georgian_text,
                "english": english_text,
                "html": html_text,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            logger.error(
                f"Failed to generate direct object component with new structure: {e}"
            )
            # Fallback to basic form
            return {
                "georgian": "წიგნს",
                "english": "book (Dative)",
                "html": '<span data-case="dat" data-role="direct-object">წიგნს</span>',
                "case_marking": {"case": "dat", "word": "წიგნს"},
            }

    def _generate_indirect_object_component_new_structure(
        self,
        verb_id: int,
        tense: str,
        person: str,
        io_arg: Dict,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Dict[str, Any]:
        """Generate indirect object component using new JSON structure"""
        try:
            # Get argument data from new structure
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            io_args = arguments.get("indirect_object", {})

            # Get noun and adjective for this person
            person_data = io_args.get(person, {})
            noun_key = person_data.get("noun", "")
            adjective_key = person_data.get("adjective", "")

            # Get case form
            case = io_arg.get("case", "dat").lower()

            # Get case form from selected object
            case_form = self.selection_engine.get_case_form(noun_key, case)

            # Get adjective form if present
            if adjective_key:
                adj_case_form = self.selection_engine.get_adjective_form(
                    adjective_key, case
                )
                georgian_text = f"{adj_case_form} {case_form}"
            else:
                georgian_text = case_form

            english_text = (
                f"{georgian_text} ({self.case_names.get(case, case.title())})"
            )
            html_text = f'<span data-case="{case}" data-role="indirect-object">{georgian_text}</span>'

            return {
                "georgian": georgian_text,
                "english": english_text,
                "html": html_text,
                "case_marking": {"case": case, "word": case_form},
            }

        except Exception as e:
            logger.error(
                f"Failed to generate indirect object component with new structure: {e}"
            )
            # Fallback to basic form
            return {
                "georgian": "მეგობარს",
                "english": "friend (Dative)",
                "html": '<span data-case="dat" data-role="indirect-object">მეგობარს</span>',
                "case_marking": {"case": "dat", "word": "მეგობარს"},
            }

    def _generate_english_translation_new_structure(
        self,
        verb_data: Optional[Dict] = None,
        tense: str = None,
        person: str = None,
        effective_preverb: str = "",
    ) -> str:
        """Generate English translation using new JSON structure"""
        try:
            # Get English translations from new structure
            english_translations = (
                verb_data.get("english_translations", {}) if verb_data else {}
            )

            # Convert mapped tense back to original tense name for English translation lookup
            original_tense = self.reverse_tense_mapping.get(tense, tense)

            # Debug logging
            logger.info(
                f"[ENGLISH_TRANSLATION] Effective preverb: '{effective_preverb}'"
            )
            logger.info(f"[ENGLISH_TRANSLATION] Original tense: '{original_tense}'")
            logger.info(
                f"[ENGLISH_TRANSLATION] Available preverbs in english_translations: {list(english_translations.keys())}"
            )
            logger.info(
                f"[ENGLISH_TRANSLATION] English translations structure: {english_translations}"
            )

            # Get the correct verb translation based on preverb
            if effective_preverb and effective_preverb in english_translations:
                # Use preverb-specific translation
                preverb_translations = english_translations[effective_preverb]
                logger.info(
                    f"[ENGLISH_TRANSLATION] Found preverb translations for '{effective_preverb}': {preverb_translations}"
                )
                verb_translation = preverb_translations.get(original_tense, "")
                logger.info(
                    f"[ENGLISH_TRANSLATION] Using preverb-specific translation: '{verb_translation}'"
                )
            else:
                # Use default translation
                default_translations = english_translations.get("default", {})
                logger.info(
                    f"[ENGLISH_TRANSLATION] Using default translations: {default_translations}"
                )
                verb_translation = default_translations.get(original_tense, "")
                logger.info(
                    f"[ENGLISH_TRANSLATION] Using default translation: '{verb_translation}'"
                )

            if not verb_translation:
                verb_translation = "go"  # Fallback
                logger.info(
                    f"[ENGLISH_TRANSLATION] Using fallback translation: '{verb_translation}'"
                )

            # Apply subject-verb agreement
            if person and verb_translation:
                verb_translation = self._apply_subject_verb_agreement(
                    verb_translation, tense, person
                )

            # Build English translation parts
            english_parts = []

            # Add subject (if present) - for now, use basic structure
            # This will be enhanced to use actual argument data
            if person == "1sg":
                english_parts.append(
                    f'<strong data-role="subject" data-person="1sg">I</strong>'
                )
            elif person in ["3sg", "3pl"]:
                # Get subject data from arguments
                syntax = verb_data.get("syntax", {}) if verb_data else {}
                arguments = syntax.get("arguments", {})
                subject_args = arguments.get("subject", {})
                person_data = subject_args.get(person, {})
                noun_key = person_data.get("noun", "")
                adjective_key = person_data.get("adjective", "")

                if noun_key:
                    # Get English form
                    noun_english = self._get_english_base_form(
                        noun_key,
                        "subjects",
                        "plural" if person == "3pl" else "singular",
                    )
                    if adjective_key:
                        adj_english = self._get_english_base_form(
                            adjective_key, "adjectives"
                        )
                        subject_text = f"{adj_english} {noun_english}"
                    else:
                        subject_text = noun_english

                    # Add definite article for 3rd person
                    subject_text = self._add_definite_article(subject_text)
                    english_parts.append(
                        f'<strong data-role="subject">{subject_text}</strong>'
                    )

            # Add verb
            english_parts.append(
                f'<strong data-role="verb">{verb_translation}</strong>'
            )

            # Add direct object if present
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            do_args = arguments.get("direct_object", {})

            if do_args:
                person_data = do_args.get(person, {})
                noun_key = person_data.get("noun", "")
                adjective_key = person_data.get("adjective", "")

                if noun_key:
                    # Get English form of direct object
                    noun_english = self._get_english_base_form(
                        noun_key, "direct_objects"
                    )

                    if adjective_key:
                        adj_english = self._get_english_base_form(
                            adjective_key, "adjectives"
                        )
                        do_text = f"{adj_english} {noun_english}"
                    else:
                        do_text = noun_english

                    english_parts.append(
                        f'<strong data-role="direct-object">{do_text}</strong>'
                    )

            # Add indirect object if present
            io_args = arguments.get("indirect_object", {})

            if io_args:
                person_data = io_args.get(person, {})
                noun_key = person_data.get("noun", "")
                adjective_key = person_data.get("adjective", "")

                if noun_key:
                    # Get English form of indirect object
                    noun_english = self._get_english_base_form(
                        noun_key, "indirect_objects"
                    )

                    if adjective_key:
                        adj_english = self._get_english_base_form(
                            adjective_key, "adjectives"
                        )
                        io_text = f"{adj_english} {noun_english}"
                    else:
                        io_text = noun_english

                    # Add appropriate preposition for indirect object
                    # This could be enhanced to use verb-specific prepositions
                    io_text = f"to {io_text}"

                    english_parts.append(
                        f'<strong data-role="indirect-object">{io_text}</strong>'
                    )

            return " ".join(english_parts)

        except Exception as e:
            logger.error(
                f"Failed to generate English translation with new structure: {e}"
            )
            return "go"  # Fallback


def generate_pedagogical_examples(
    verb_data: Dict, tense: str, selected_preverbs: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Generate pedagogical examples for a verb and tense using the new JSON structure

    Args:
        verb_data: Verb data from verb editor (new structure)
        tense: Tense name (present, imperfect, etc.)
        selected_preverbs: List of preverbs to generate examples for (for multi-preverb verbs)

    Returns:
        Dictionary with examples data organized by preverb
    """
    logger.info(
        f"[EXAMPLES] Starting example generation for tense: {tense}, selected_preverbs: {selected_preverbs}"
    )

    try:
        # Get tense data from the new conjugations structure
        conjugations = verb_data.get("conjugations", {})
        tense_conjugation = conjugations.get(tense, {})

        if not isinstance(tense_conjugation, dict):
            logger.warning(f"[EXAMPLES] No valid tense conjugation data for {tense}")
            return {"examples": [], "raw_gloss": "", "enhanced": False}

        # Extract data from new structure
        raw_gloss = tense_conjugation.get("raw_gloss", "")
        verb_semantics = verb_data.get("semantic_key", "to do")
        verb_id = verb_data.get("id", 0)

        # Determine which preverbs to generate examples for
        preverb_config = verb_data.get("preverb_config", {})
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

        logger.info(f"[EXAMPLES] Verb has multiple preverbs: {has_multiple_preverbs}")
        logger.info(f"[EXAMPLES] Preverb config: {preverb_config}")

        if has_multiple_preverbs and selected_preverbs:
            # Multi-preverb verb with selected preverbs
            preverbs_to_generate = selected_preverbs
            logger.info(f"[EXAMPLES] Using selected preverbs: {selected_preverbs}")
        elif has_multiple_preverbs:
            # Multi-preverb verb, use all available preverbs
            preverbs_to_generate = preverb_config.get("available_preverbs", [])
            logger.info(
                f"[EXAMPLES] Using all available preverbs: {preverbs_to_generate}"
            )
        else:
            # Single preverb verb, use default
            preverbs_to_generate = [preverb_config.get("default_preverb", "")]
            logger.info(f"[EXAMPLES] Using default preverb: {preverbs_to_generate}")

        # Generate examples for each preverb
        all_examples = []
        fallback_warnings = []

        # For imperative tense, use 2sg and 2pl instead of 1sg, 3sg, 3pl
        if tense == "imperative":
            persons = ["2sg", "2pl"]  # Order: 2sg, 2pl
        else:
            persons = ["1sg", "3sg", "3pl"]  # Order: 1sg, 3sg, 3pl

        generator = PedagogicalExampleGenerator()

        # Generate examples for each person across all preverbs
        for person in persons:
            for preverb in preverbs_to_generate:
                logger.info(
                    f"[EXAMPLES] Generating example for person: {person}, preverb: {preverb}"
                )

                # Handle preverb fallbacks (even for empty preverbs)
                effective_preverb = get_effective_preverb(verb_data, preverb, tense)
                logger.info(
                    f"[EXAMPLES] Effective preverb for {preverb}: {effective_preverb}"
                )

                # Check if preverb fallback occurred
                if effective_preverb != preverb:
                    logger.warning(
                        f"[EXAMPLES] Preverb fallback: {preverb} -> {effective_preverb}"
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
                logger.info(
                    f"[EXAMPLES] Georgian form for {person} with preverb {effective_preverb}: {georgian_form}"
                )

                if not georgian_form or georgian_form == "-":
                    logger.warning(
                        f"[EXAMPLES] No valid form for {person} with preverb {effective_preverb}"
                    )
                    continue

                # Generate the example using the new structure
                example = generator.generate_example_with_new_structure(
                    verb_id=verb_id,
                    tense=generator.tense_mapping.get(tense, tense),
                    person=person,
                    raw_gloss=raw_gloss,
                    verb_semantics=verb_semantics,
                    georgian_verb_form=georgian_form,
                    verb_data=verb_data,
                    effective_preverb=effective_preverb,
                )
                logger.info(
                    f"[EXAMPLES] Generated example: {example.get('georgian', 'N/A')} -> {example.get('english', 'N/A')}"
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
                    logger.info(f"[EXAMPLES] Created new preverb group for: {preverb}")

                preverb_group["examples"].append(example)

        return {
            "examples": all_examples,
            "raw_gloss": raw_gloss,
            "enhanced": True,  # Flag to indicate this uses the new system
            "fallback_warnings": fallback_warnings if fallback_warnings else None,
        }

    except Exception as e:
        logger.error(f"Failed to generate pedagogical examples: {e}")

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
            "enhanced": False,
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
        verb_data: Verb data from new structure
        preverb: Requested preverb
        tense: Tense name

    Returns:
        Effective preverb to use (may be different due to fallbacks)
    """
    logger.info(f"[PREVERB] Getting effective preverb for: {preverb} in tense: {tense}")

    preverb_rules = verb_data.get("preverb_rules", {})
    logger.info(f"[PREVERB] Preverb rules: {preverb_rules}")

    # Check for tense-specific fallbacks
    tense_fallbacks = preverb_rules.get("tense_specific_fallbacks", {})
    if preverb in tense_fallbacks and tense in tense_fallbacks[preverb]:
        effective = tense_fallbacks[preverb][tense]
        logger.info(
            f"[PREVERB] Found tense-specific fallback: {preverb} -> {effective}"
        )
        return effective

    # Check for English fallbacks (same logic as tense fallbacks)
    english_fallbacks = preverb_rules.get("english_fallbacks", {})
    if preverb in english_fallbacks and tense in english_fallbacks[preverb]:
        effective = english_fallbacks[preverb][tense]
        logger.info(f"[PREVERB] Found English fallback: {preverb} -> {effective}")
        return effective

    # No fallback, use original preverb
    logger.info(f"[PREVERB] No fallback found, using original preverb: {preverb}")
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
    Get conjugation form for a specific preverb, handling the new structure

    Args:
        verb_data: Verb data from new structure
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
    from tools.core.verb_conjugation import get_conjugation_form

    form = get_conjugation_form(verb_data, tense, person, preverb)
    logger.info(f"[CONJUGATION] Retrieved form: {form}")

    return form
