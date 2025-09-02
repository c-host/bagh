#!/usr/bin/env python3
"""
Merged Argument Processor for Georgian Verb Example System

This module combines the functionality of argument_parser.py and argument_resolver.py
into a single unified interface for parsing and resolving arguments during example generation.

Features:
- Parses standardized gnc.ge format raw_gloss specifications
- Resolves nouns and adjectives from explicit definitions in verb data
- Gets case forms from databases
- Handles "none" adjective exclusion
- Provides English translations
- Comprehensive error handling with fallbacks
"""

import logging
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path

from tools.utils.shared_gloss_utils import BaseGlossParser
from tools.data_extraction.database_loader import DatabaseLoader

# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)


class ArgumentResolutionError(Exception):
    """Raised when argument resolution fails"""

    pass


class RawGlossParseError(Exception):
    """Raised when raw_gloss format is invalid"""

    pass


class CaseFormMissingError(Exception):
    """Raised when required case form is missing from database"""

    pass


class ArgumentProcessor(BaseGlossParser):
    """
    Unified argument processor that combines parsing and resolution functionality.

    This class merges StandardizedRawGlossParser and ArgumentResolver into a single
    interface for parsing raw gloss strings and resolving arguments for example generation.
    """

    def __init__(self):
        """Initialize the processor with supported patterns, cases, and databases"""
        super().__init__()

        # Initialize databases as None - will be loaded lazily when needed
        self._databases = None

    def _load_databases(self) -> Dict:
        """Load the four databases for validation and resolution using shared utility"""
        loader = DatabaseLoader()
        return loader.load_all_databases()

    @property
    def databases(self) -> Dict:
        """Lazy-load databases when first accessed"""
        if self._databases is None:
            self._databases = self._load_databases()
        return self._databases

    def parse_raw_gloss(self, raw_gloss: str) -> Dict[str, Dict]:
        """
        Parse standardized gnc.ge format raw_gloss

        Args:
            raw_gloss: String in gnc.ge format

        Returns:
            Dictionary with parsed information:
            {
                "voice": "Act",
                "tense": "Pres",
                "preverb": None,
                "argument_pattern": "<S-DO>",
                "arguments": {
                    "subject": {"type": "S", "case": "Nom"},
                    "direct_object": {"type": "DO", "case": "Dat"}
                }
            }

        Raises:
            RawGlossParseError: If format is invalid
        """
        try:
            # Use shared validation
            if not self._validate_basic_format(raw_gloss):
                # Return a minimal valid structure for empty glosses
                return {
                    "voice": "Act",
                    "tense": "Pres",
                    "preverb": None,
                    "argument_pattern": "<S>",
                    "arguments": {"subject": {"type": "S", "case": "Nom"}},
                }

            raw_gloss = raw_gloss.strip()
            parts = self._split_components(raw_gloss)

            # If only "V" is present, provide a default structure
            if len(parts) == 1 and parts[0] == "V":
                return {
                    "voice": "Act",
                    "tense": "Pres",
                    "preverb": None,
                    "argument_pattern": "<S>",
                    "arguments": {"subject": {"type": "S", "case": "Nom"}},
                }

            # Parse components
            result = {
                "voice": None,
                "tense": None,
                "preverb": None,
                "argument_pattern": None,
                "arguments": {},
            }

            # Parse each component
            for part in parts:
                if part == "V":
                    continue  # Skip verb marker
                elif part in ["Act", "Med", "Pass", "MedAct", "MedPass"]:
                    result["voice"] = part
                elif part in ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv", "Inv"]:
                    result["tense"] = part
                elif part == "Pv":
                    result["preverb"] = "Pv"
                elif part.startswith("<") and part.endswith(">"):
                    if ":" in part:
                        # Case specification like <S:Nom> or <DO:Dat>
                        self._parse_case_specification(part, result)
                    else:
                        # Argument pattern like <S-DO>
                        result["argument_pattern"] = part
                        self._parse_argument_pattern(part, result)

            # Set defaults for missing components
            if not result["voice"]:
                result["voice"] = "Act"
            if not result["tense"]:
                result["tense"] = "Pres"

            return result

        except Exception as e:
            logger.error(f"Error parsing raw_gloss '{raw_gloss}': {e}")
            raise RawGlossParseError(f"Failed to parse raw_gloss: {e}")

    def _parse_case_specification(self, case_spec: str, result: Dict):
        """Parse case specification like <S:Nom> or <DO:Dat>"""
        try:
            # Remove < > brackets
            content = case_spec[1:-1]
            if ":" not in content:
                return

            arg_type, case = content.split(":", 1)

            # Map argument type to argument name
            arg_name = self._map_argument_type_to_name(arg_type)
            if arg_name:
                result["arguments"][arg_name] = {"type": arg_type, "case": case}

        except Exception as e:
            logger.warning(f"Failed to parse case specification '{case_spec}': {e}")

    def _parse_argument_pattern(self, pattern: str, result: Dict):
        """Parse argument pattern like <S-DO> and set up argument structure"""
        try:
            # Remove < > brackets
            content = pattern[1:-1]
            if not content:
                return

            # Split by dash to get individual argument types
            arg_types = content.split("-")

            for arg_type in arg_types:
                arg_name = self._map_argument_type_to_name(arg_type)
                if arg_name and arg_name not in result["arguments"]:
                    # Set default case based on argument type
                    default_case = self._get_default_case_for_argument(arg_type)
                    result["arguments"][arg_name] = {
                        "type": arg_type,
                        "case": default_case,
                    }

        except Exception as e:
            logger.warning(f"Failed to parse argument pattern '{pattern}': {e}")

    def _map_argument_type_to_name(self, arg_type: str) -> Optional[str]:
        """Map argument type abbreviation to full name"""
        mapping = {"S": "subject", "DO": "direct_object", "IO": "indirect_object"}
        return mapping.get(arg_type)

    def _get_default_case_for_argument(self, arg_type: str) -> str:
        """Get default case for argument type"""
        defaults = {"S": "Nom", "DO": "Dat", "IO": "Dat"}
        return defaults.get(arg_type, "Nom")

    def get_argument_pair(
        self, verb_data: Dict, argument_type: str, person: str
    ) -> Tuple[str, str]:
        """
        Get noun and adjective from explicit definition in verb data

        Args:
            verb_data: Verb data dictionary from verbs.json
            argument_type: Type of argument ('subject', 'direct_object', 'indirect_object')
            person: Verb person (1sg, 2sg, 3sg, 1pl, 2pl, 3pl)

        Returns:
            Tuple of (noun_key, adjective_key) - adjective_key may be empty string

        Raises:
            ArgumentResolutionError: If argument definition is missing or invalid
        """
        try:
            # Get arguments from verb data
            arguments = verb_data.get("syntax", {}).get("arguments", {})
            if not arguments:
                raise ArgumentResolutionError(
                    f"No syntax.arguments found in verb data for {argument_type}"
                )

            # Get argument type data
            arg_data = arguments.get(argument_type, {})
            if not arg_data:
                raise ArgumentResolutionError(
                    f"No {argument_type} definition found in verb arguments"
                )

            # Get person-specific data
            person_data = arg_data.get(person, {})
            if not person_data:
                raise ArgumentResolutionError(
                    f"No {person} definition found for {argument_type}"
                )

            # Extract noun and adjective
            noun = person_data.get("noun", "")
            adjective = person_data.get("adjective", "")

            # Validate noun is present
            if not noun or not noun.strip():
                raise ArgumentResolutionError(
                    f"Noun is missing or empty for {argument_type} {person}"
                )

            # Handle "none" adjective case
            if adjective and adjective.strip().lower() == "none":
                adjective = ""

            return noun.strip(), adjective.strip()

        except Exception as e:
            logger.error(
                f"Error getting argument pair for {argument_type} {person}: {e}"
            )
            raise ArgumentResolutionError(f"Failed to get argument pair: {e}")

    def get_case_form(self, noun_key: str, case: str, databases: Dict) -> str:
        """
        Get the case form for a noun from the database

        Args:
            noun_key: Key to look up in the nouns database
            case: Case to get (Nom, Erg, Dat, Gen, Inst, Adv)
            databases: Loaded database dictionary

        Returns:
            Case form string

        Raises:
            CaseFormMissingError: If case form is not found
        """
        try:
            # Try to get from subjects database first (for subject nouns)
            subjects_db = databases.get("subjects", {})
            if subjects_db and noun_key in subjects_db:
                noun_data = subjects_db[noun_key]
                # Check singular cases first
                case_forms = noun_data.get("cases", {})
                case_form = case_forms.get(case.lower())
                if case_form:
                    return case_form

                # Check plural cases if singular not found
                plural_forms = noun_data.get("plural", {})
                case_form = plural_forms.get(case.lower())
                if case_form:
                    return case_form

            # Try direct objects database
            direct_objects_db = databases.get("direct_objects", {})
            if direct_objects_db and noun_key in direct_objects_db:
                noun_data = direct_objects_db[noun_key]
                case_forms = noun_data.get("cases", {})
                case_form = case_forms.get(case.lower())
                if case_form:
                    return case_form

                plural_forms = noun_data.get("plural", {})
                case_form = plural_forms.get(case.lower())
                if case_form:
                    return case_form

            # Try indirect objects database
            indirect_objects_db = databases.get("indirect_objects", {})
            if indirect_objects_db and noun_key in indirect_objects_db:
                noun_data = indirect_objects_db[noun_key]
                case_forms = noun_data.get("cases", {})
                case_form = case_forms.get(case.lower())
                if case_form:
                    return case_form

                plural_forms = noun_data.get("plural", {})
                case_form = plural_forms.get(case.lower())
                if case_form:
                    return case_form

            # If we get here, the noun wasn't found in any database
            raise CaseFormMissingError(f"Noun '{noun_key}' not found in any database")

        except Exception as e:
            logger.error(f"Error getting case form for {noun_key} {case}: {e}")
            raise CaseFormMissingError(f"Failed to get case form: {e}")

    def get_adjective_form(self, adjective_key: str, case: str, databases: Dict) -> str:
        """
        Get the case form for an adjective from the database

        Args:
            adjective_key: Key to look up in the adjectives database
            case: Case to get (Nom, Erg, Dat, Gen, Inst, Adv)
            databases: Loaded database dictionary

        Returns:
            Adjective case form string

        Raises:
            CaseFormMissingError: If adjective case form is not found
        """
        try:
            if not adjective_key:
                return ""

            adjectives_db = databases.get("adjectives", {})
            if not adjectives_db:
                raise CaseFormMissingError("Adjectives database not loaded")

            adjective_data = adjectives_db.get(adjective_key, {})
            if not adjective_data:
                raise CaseFormMissingError(
                    f"Adjective '{adjective_key}' not found in database"
                )

            # Check singular cases first
            case_forms = adjective_data.get("cases", {})
            case_form = case_forms.get(case.lower())
            if case_form:
                return case_form

            # Check plural cases if singular not found
            plural_forms = adjective_data.get("plural", {})
            case_form = plural_forms.get(case.lower())
            if case_form:
                return case_form

            # If we get here, the case wasn't found
            raise CaseFormMissingError(
                f"Case '{case}' not found for adjective '{adjective_key}'"
            )

        except Exception as e:
            logger.error(
                f"Error getting adjective case form for {adjective_key} {case}: {e}"
            )
            raise CaseFormMissingError(f"Failed to get adjective case form: {e}")

    def get_english_translation(
        self, key: str, databases: Dict, key_type: str = "noun"
    ) -> str:
        """
        Get English translation for a noun or adjective

        Args:
            key: Key to look up
            databases: Loaded database dictionary
            key_type: Type of key ('noun' or 'adjective')

        Returns:
            English translation string
        """
        try:
            if key_type == "noun":
                # Try to find the noun in any of the noun databases
                for db_name in ["subjects", "direct_objects", "indirect_objects"]:
                    db = databases.get(db_name, {})
                    if key in db:
                        item_data = db[key]
                        english_data = item_data.get("english", {})
                        if isinstance(english_data, dict):
                            # Return singular form as default
                            return english_data.get("singular", key)
                        else:
                            return english_data if english_data else key
            else:
                # For adjectives
                db = databases.get("adjectives", {})
                if key in db:
                    item_data = db[key]
                    english_data = item_data.get("english", {})
                    if isinstance(english_data, dict):
                        # Return singular form as default
                        return english_data.get("singular", key)
                    else:
                        return english_data if english_data else key

            # If we get here, the key wasn't found
            return key  # Fallback to key if not found

        except Exception as e:
            logger.warning(f"Error getting English translation for {key}: {e}")
            return key  # Fallback to key on error

    def parse_and_resolve(self, raw_gloss: str, verb_data: Dict, person: str) -> Dict:
        """
        Unified method to parse raw gloss and resolve arguments

        Args:
            raw_gloss: Raw gloss string to parse
            verb_data: Verb data dictionary
            person: Verb person

        Returns:
            Dictionary with parsed gloss and resolved arguments
        """
        try:
            # Parse the raw gloss
            parsed_gloss = self.parse_raw_gloss(raw_gloss)

            # Resolve arguments for each argument type found
            resolved_arguments = {}
            for arg_name, arg_info in parsed_gloss.get("arguments", {}).items():
                try:
                    noun_key, adjective_key = self.get_argument_pair(
                        verb_data, arg_name, person
                    )
                    case = arg_info.get("case", "Nom")

                    # Get case forms
                    noun_form = self.get_case_form(noun_key, case, self.databases)
                    adjective_form = self.get_adjective_form(
                        adjective_key, case, self.databases
                    )

                    # Get English translations
                    noun_english = self.get_english_translation(
                        noun_key, self.databases, "noun"
                    )
                    adjective_english = self.get_english_translation(
                        adjective_key, self.databases, "adjective"
                    )

                    resolved_arguments[arg_name] = {
                        "noun_key": noun_key,
                        "adjective_key": adjective_key,
                        "noun_form": noun_form,
                        "adjective_form": adjective_form,
                        "noun_english": noun_english,
                        "adjective_english": adjective_english,
                        "case": case,
                    }

                except Exception as e:
                    logger.warning(f"Failed to resolve {arg_name}: {e}")
                    # Continue with other arguments

            # Add resolved arguments to result
            result = parsed_gloss.copy()
            result["resolved_arguments"] = resolved_arguments

            return result

        except Exception as e:
            logger.error(f"Error in parse_and_resolve: {e}")
            raise ArgumentResolutionError(f"Failed to parse and resolve: {e}")
