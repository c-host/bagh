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

from noun_adjective_selection_engine import (
    NounAdjectiveSelectionEngine,
    NounSelectionError,
    CaseFormMissingError,
)
from gloss_parser import StandardizedRawGlossParser, RawGlossParseError
from verb_conjugation import (
    get_conjugation_form,
    get_verb_gloss,
    get_english_translation,
    get_indirect_object_preposition,
    get_direct_object_preposition,
    has_preverb_in_tense,
)

# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)


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
            # We need to extract the keys from the selection engine data
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
            }

        except Exception as e:
            logger.error(f"Failed to generate example: {e}")
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

            # Use the new preverb translation system if available
            if "effective_preverb" in verb_data and verb_data.get(
                "preverb_translations"
            ):
                # Use the effective preverb for translations (handles fallbacks)
                effective_preverb = verb_data["effective_preverb"]
                preverb_translations = verb_data.get("preverb_translations", {})

                # Get the person for this example
                person_for_translation = person
                if person == "1st":
                    person_for_translation = "1sg"
                elif person == "2nd":
                    person_for_translation = "2sg"
                elif person == "3rd":
                    person_for_translation = "3sg"

                # Use the new preverb translation system directly
                normalized_preverb = effective_preverb.replace("-", "")

                # Navigate the translation structure
                if (
                    normalized_preverb in preverb_translations
                    and original_tense in preverb_translations[normalized_preverb]
                    and person_for_translation
                    in preverb_translations[normalized_preverb][original_tense]
                ):
                    verb_translation = preverb_translations[normalized_preverb][
                        original_tense
                    ][person_for_translation]
                else:
                    # Fallback to default
                    verb_translation = "go"
            else:
                # Fallback to old system
                preverb = None
                if tense_data := verb_data.get("conjugations", {}).get(
                    original_tense, {}
                ):
                    if gloss := tense_data.get("gloss", {}):
                        preverb = gloss.get("preverb", "")

                verb_translation = get_english_translation(
                    verb_data, original_tense, preverb
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

        # Present tense 3rd person singular: handle "am" specially
        if tense == "Pres" and person == "3sg":
            if "am" in verb_translation:
                # Use word boundary replacement to avoid affecting words like "familiar"
                return re.sub(r"\bam\b", "is", verb_translation)
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
        # For now, we'll keep the current SVO order since the English translation
        # is already built in SVO order (Subject → Verb → Object)
        return parts


def generate_pedagogical_examples(verb_data: Dict, tense: str) -> Dict[str, Any]:
    """
    Generate pedagogical examples for a verb and tense using the standardized format

    Args:
        verb_data: Verb data from verbs.json (standardized format)
        tense: Tense name (present, imperfect, etc.)

    Returns:
        Dictionary with examples data compatible with existing build.py
    """
    try:
        # Get tense data from the standardized conjugations structure
        conjugations = verb_data.get("conjugations", {})
        tense_conjugation = conjugations.get(tense, {})

        if not isinstance(tense_conjugation, dict):
            return {"examples": [], "raw_gloss": "", "preverb": "", "enhanced": False}

        # Extract data from standardized structure
        raw_gloss = tense_conjugation.get("gloss", {}).get("raw_gloss", "")
        preverb = tense_conjugation.get("gloss", {}).get("preverb", "")
        verb_semantics = verb_data.get("semantic_key", "to do")
        verb_id = verb_data.get("id", 0)

        # Generate examples for different persons
        examples = []
        # For imperative tense, use 2sg and 2pl instead of 1sg, 3sg, 3pl
        if tense == "imperative":
            persons = ["2sg", "2pl"]  # Order: 2sg, 2pl
        else:
            persons = ["1sg", "3sg", "3pl"]  # Order: 1sg, 3sg, 3pl

        generator = PedagogicalExampleGenerator()

        for person in persons:
            # Get the Georgian verb form from the standardized forms structure
            georgian_form = tense_conjugation.get("forms", {}).get(person, "")

            if not georgian_form or georgian_form == "-":
                continue

            # Check if this verb has preverbs in this tense
            has_preverb = has_preverb_in_tense(verb_data, tense)

            # Only skip generation if verb explicitly requires multiple preverbs but doesn't have them
            # This allows verbs without preverbs to still generate examples
            preverb_config = verb_data.get("preverb_config", {})
            if (
                not has_preverb
                and preverb_config.get("has_multiple_preverbs", False)
                and preverb_config.get("available_preverbs", [])
            ):
                logger.warning(
                    f"Verb {verb_id} missing preverbs in {tense} tense, skipping example generation"
                )
                continue

            # Generate the example using the mapped tense for English translations
            example = generator.generate_example(
                verb_id=verb_id,
                tense=generator.tense_mapping.get(
                    tense, tense
                ),  # Use mapped tense for English translations
                person=person,  # Pass original person value for subject-verb agreement
                raw_gloss=raw_gloss,
                verb_semantics=verb_semantics,
                georgian_verb_form=georgian_form,
                verb_data=verb_data,
            )

            examples.append(example)

        return {
            "examples": examples,
            "raw_gloss": raw_gloss,
            "preverb": preverb,
            "enhanced": True,  # Flag to indicate this uses the new system
        }

    except Exception as e:
        logger.error(f"Failed to generate pedagogical examples: {e}")
        return {"examples": [], "raw_gloss": "", "preverb": "", "enhanced": False}


# Convenience function for backward compatibility
def create_pedagogical_example_generator() -> PedagogicalExampleGenerator:
    """Create a pedagogical example generator instance"""
    return PedagogicalExampleGenerator()
