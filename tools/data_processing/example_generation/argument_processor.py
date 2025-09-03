#!/usr/bin/env python3
"""
Merged Argument Processor for Georgian Verb Example System

This module combines is a unified interface for parsing and resolving
arguments during example generation.

Features:
- Parses standardized gnc.ge format raw_gloss specifications
- Resolves nouns and adjectives from explicit definitions in verb data
- Gets case forms from databases
- Provides English translations
- Comprehensive error handling with fallbacks
"""

from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path
from dataclasses import dataclass

from tools.utils.shared_gloss_utils import BaseGlossParser
from tools.utils.unicode_console import safe_log
from tools.data_extraction.database_loader import DatabaseLoader

# Configure logging
import logging

logger = logging.getLogger(__name__)


@dataclass
class ParsedGloss:
    """Represents a parsed raw gloss with structured components."""

    voice: str
    tense: str
    preverb: Optional[str]
    argument_pattern: str
    arguments: Dict[str, Dict]


@dataclass
class ResolvedArgument:
    """Represents a fully resolved argument with all necessary data."""

    noun_key: str
    adjective_key: str
    noun_form: str
    adjective_form: str
    noun_english: str
    adjective_english: str
    case: str


# Custom exception classes removed - using standard Python exceptions instead
# ValueError for invalid data, RuntimeError for runtime issues


class ArgumentProcessor(BaseGlossParser):
    """
    Unified argument processor that combines parsing and resolution functionality.

    This class merges StandardizedRawGlossParser and ArgumentResolver into a single
    interface for parsing raw gloss strings and resolving arguments for example generation.
    """

    def __init__(self, config: Optional[Dict] = None):
        """Initialize the processor with configuration and supported patterns, cases, and databases"""
        super().__init__()

        # Configuration with sensible defaults
        self.config = config or {}

        # Default argument mappings
        self.argument_mappings = self.config.get(
            "argument_mappings",
            {"S": "subject", "DO": "direct_object", "IO": "indirect_object"},
        )

        # Note: default_cases removed - all cases must be explicitly specified

        self.database_names = self.config.get(
            "database_names", ["subjects", "direct_objects", "indirect_objects"]
        )

        # Default voice and tense configurations
        self.valid_voices = self.config.get(
            "valid_voices", ["Act", "Med", "Pass", "MedAct", "MedPass"]
        )

        self.valid_tenses = self.config.get(
            "valid_tenses", ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv", "Inv"]
        )

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

    def parse_raw_gloss(self, raw_gloss: str) -> ParsedGloss:
        """
        Parse standardized gnc.ge format raw_gloss

        Args:
            raw_gloss: String in gnc.ge format

        Returns:
            ParsedGloss object with structured components

        Raises:
            ValueError: If required components are missing
        """
        try:
            # Use shared validation
            if not self._validate_basic_format(raw_gloss):
                raise ValueError(
                    f"Raw gloss '{raw_gloss}' has invalid basic format. "
                    "Expected format: V [Voice] [Tense] [Pv] <ArgumentPattern> [CaseSpecifications...]"
                )

            raw_gloss = raw_gloss.strip()
            parts = self._split_components(raw_gloss)

            # If only "V" is present, fail - this is incomplete
            if len(parts) == 1 and parts[0] == "V":
                raise ValueError(
                    f"Raw gloss '{raw_gloss}' is incomplete. "
                    "Must include: voice, tense, argument pattern, and case specifications. "
                    "Example: 'V Act Pres <S-DO> <S:Nom> <DO:Dat>'"
                )

            # Parse components
            voice = None
            tense = None
            preverb = None
            argument_pattern = None
            arguments = {}

            # Parse each component
            for part in parts:
                if part == "V":
                    continue  # Skip verb marker
                elif part in self.valid_voices:
                    voice = part
                elif part in self.valid_tenses:
                    tense = part
                elif part == "Pv":
                    preverb = "Pv"
                elif part.startswith("<") and part.endswith(">"):
                    if ":" in part:
                        # Case specification like <S:Nom> or <DO:Dat>
                        self._parse_case_specification(part, arguments)
                    else:
                        # Argument pattern like <S-DO>
                        argument_pattern = part
                        self._parse_argument_pattern(part, arguments)

            # Validate all required components are present
            missing_components = []
            if not voice:
                missing_components.append("voice")
            if not tense:
                missing_components.append("tense")
            if not argument_pattern:
                missing_components.append("argument pattern")
            if not arguments:
                missing_components.append("case specifications")

            if missing_components:
                raise ValueError(
                    f"Raw gloss '{raw_gloss}' is missing required components: {', '.join(missing_components)}. "
                    f"Expected format: V [Voice] [Tense] [Pv> <ArgumentPattern> [CaseSpecifications...] "
                    f"Example: 'V Act Pres <S-DO> <S:Nom> <DO:Dat>'"
                )

            # Validate that all arguments have explicit case specifications
            arguments_without_cases = []
            for arg_name, arg_info in arguments.items():
                if arg_info.get("case") is None:
                    arguments_without_cases.append(arg_name)

            if arguments_without_cases:
                raise ValueError(
                    f"Raw gloss '{raw_gloss}' has arguments without case specifications: {', '.join(arguments_without_cases)}. "
                    f"All arguments must have explicit case specifications like <S:Nom> or <DO:Dat>. "
                    f"Example: 'V Act Pres <S-DO> <S:Nom> <DO:Dat>'"
                )

            return ParsedGloss(
                voice=voice,
                tense=tense,
                preverb=preverb,
                argument_pattern=argument_pattern,
                arguments=arguments,
            )

        except Exception as e:
            safe_log(logger, "error", f"Error parsing raw_gloss '{raw_gloss}': {e}")
            raise ValueError(f"Failed to parse raw_gloss: {e}")

    def _parse_case_specification(self, case_spec: str, result: Dict) -> None:
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
                result[arg_name] = {"type": arg_type, "case": case}

        except Exception as e:
            safe_log(
                logger,
                "warning",
                f"Failed to parse case specification '{case_spec}': {e}",
            )

    def _parse_argument_pattern(self, pattern: str, result: Dict) -> None:
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
                if arg_name and arg_name not in result:
                    # Don't set default case - case must be explicitly specified
                    # The case will be set when the case specification is parsed
                    result[arg_name] = {
                        "type": arg_type,
                        "case": None,  # Will be set by case specification
                    }

        except Exception as e:
            safe_log(
                logger, "warning", f"Failed to parse argument pattern '{pattern}': {e}"
            )

    def _map_argument_type_to_name(self, arg_type: str) -> Optional[str]:
        """Map argument type abbreviation to full name"""
        return self.argument_mappings.get(arg_type)

    # Note: _get_default_case_for_argument method removed - all cases must be explicitly specified

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
            ValueError: If argument definition is missing or invalid
        """
        try:
            # Get arguments from verb data
            arguments = verb_data.get("syntax", {}).get("arguments", {})
            if not arguments:
                raise ValueError(
                    f"No syntax.arguments found in verb data for {argument_type}"
                )

            # Get argument type data
            arg_data = arguments.get(argument_type, {})
            if not arg_data:
                raise ValueError(
                    f"No {argument_type} definition found in verb arguments"
                )

            # Get person-specific data
            person_data = arg_data.get(person, {})
            if not person_data:
                raise ValueError(f"No {person} definition found for {argument_type}")

            # Extract noun and adjective
            noun = person_data.get("noun", "")
            adjective = person_data.get("adjective", "")

            # Validate noun is present
            if not noun or not noun.strip():
                raise ValueError(
                    f"Noun is missing or empty for {argument_type} {person}"
                )

            # Validate adjective is present
            if not adjective or not adjective.strip():
                raise ValueError(
                    f"Adjective is missing or empty for {argument_type} {person}"
                )

            # Handle "none" adjective case - but this should not be allowed anymore
            if adjective.strip().lower() == "none":
                raise ValueError(
                    f"Adjective cannot be 'none' for {argument_type} {person}. Adjectives are now mandatory."
                )

            return noun.strip(), adjective.strip()

        except Exception as e:
            safe_log(
                logger,
                "error",
                f"Error getting argument pair for {argument_type} {person}: {e}",
            )
            raise ValueError(f"Failed to get argument pair: {e}")

    def get_case_form(
        self, noun_key: str, case: str, databases: Dict, number: str = "singular"
    ) -> str:
        """
        Get the case form for a noun from the database

        Args:
            noun_key: Key to look up in the nouns database
            case: Case to get (Nom, Erg, Dat, Gen, Inst, Adv)
            databases: Loaded database dictionary
            number: Number to get ('singular' or 'plural')

        Returns:
            Case form string

        Raises:
            ValueError: If case form is not found
        """
        try:
            # Find noun in any of the noun databases
            noun_data = self._find_noun_in_databases(noun_key, databases)
            if not noun_data:
                # Log available databases and keys for debugging
                available_keys = {}
                for db_name in self.database_names:
                    db = databases.get(db_name, {})
                    available_keys[db_name] = list(db.keys())[
                        :5
                    ]  # First 5 keys for debugging

                safe_log(
                    logger,
                    "debug",
                    f"Noun '{noun_key}' not found in any database. Available keys: {available_keys}",
                )
                raise ValueError(f"Noun '{noun_key}' not found in any database")

            # Normalize case to lowercase for database lookup
            case_lower = case.lower()

            # Log the noun data structure for debugging
            safe_log(
                logger,
                "debug",
                f"Found noun '{noun_key}' with data structure: {list(noun_data.keys())}",
            )

            # Check the specified number first
            if number == "plural":
                # Check plural cases first for 3pl
                plural_forms = noun_data.get("plural", {})
                safe_log(
                    logger,
                    "debug",
                    f"Available plural cases for '{noun_key}': {list(plural_forms.keys()) if plural_forms else 'None'}",
                )
                case_form = plural_forms.get(case_lower)
                if case_form:
                    return case_form

                # Fallback to singular if plural not found
                case_forms = noun_data.get("cases", {})
                safe_log(
                    logger,
                    "debug",
                    f"Plural not found, checking singular cases for '{noun_key}': {list(case_forms.keys()) if case_forms else 'None'}",
                )
                case_form = case_forms.get(case_lower)
                if case_form:
                    return case_form
            else:
                # Check singular cases first for 1sg, 2sg, 3sg, 1pl, 2pl
                case_forms = noun_data.get("cases", {})
                safe_log(
                    logger,
                    "debug",
                    f"Available cases for '{noun_key}': {list(case_forms.keys()) if case_forms else 'None'}",
                )
                case_form = case_forms.get(case_lower)
                if case_form:
                    return case_form

                # Check plural cases if singular not found
                plural_forms = noun_data.get("plural", {})
                safe_log(
                    logger,
                    "debug",
                    f"Singular not found, checking plural cases for '{noun_key}': {list(plural_forms.keys()) if plural_forms else 'None'}",
                )
                case_form = plural_forms.get(case_lower)
                if case_form:
                    return case_form

            # If we get here, the case wasn't found
            raise ValueError(f"Case '{case}' not found for noun '{noun_key}'")

        except Exception as e:
            safe_log(
                logger, "error", f"Error getting case form for {noun_key} {case}: {e}"
            )
            raise ValueError(f"Failed to get case form: {e}")

    def _find_noun_in_databases(
        self, noun_key: str, databases: Dict
    ) -> Optional[Dict[str, Any]]:
        """Find a noun in any of the noun databases."""
        for db_name in self.database_names:
            db = databases.get(db_name, {})
            if noun_key in db:
                return db[noun_key]
        return None

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
            ValueError: If adjective case form is not found
        """
        try:
            if not adjective_key:
                raise ValueError("Adjective key is required but was empty")

            adjectives_db = databases.get("adjectives", {})
            if not adjectives_db:
                raise ValueError("Adjectives database not loaded")

            # Log available adjective keys for debugging
            safe_log(
                logger,
                "debug",
                f"Available adjective keys: {list(adjectives_db.keys())[:5]}",
            )

            adjective_data = adjectives_db.get(adjective_key, {})
            if not adjective_data:
                raise ValueError(f"Adjective '{adjective_key}' not found in database")

            # Log the adjective data structure for debugging
            safe_log(
                logger,
                "debug",
                f"Found adjective '{adjective_key}' with data structure: {list(adjective_data.keys())}",
            )

            # Normalize case to lowercase for database lookup
            case_lower = case.lower()

            # Adjectives always use singular forms in Georgian
            case_forms = adjective_data.get("cases", {})
            safe_log(
                logger,
                "debug",
                f"Available cases for adjective '{adjective_key}': {list(case_forms.keys()) if case_forms else 'None'}",
            )
            case_form = case_forms.get(case_lower)
            if case_form:
                return case_form

            # If we get here, the case was not found
            raise ValueError(f"Case '{case}' not found for adjective '{adjective_key}'")

        except Exception as e:
            safe_log(
                "error",
                f"Error getting adjective case form for {adjective_key} {case}: {e}",
            )
            raise ValueError(f"Failed to get adjective case form: {e}")

    def get_english_translation(
        self,
        key: str,
        databases: Dict,
        key_type: str = "noun",
        number: str = "singular",
    ) -> str:
        """
        Get English translation for a noun or adjective

        Args:
            key: Key to look up
            databases: Loaded database dictionary
            key_type: Type of key ('noun' or 'adjective')
            number: Number to get ('singular' or 'plural')

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
                            # Return the specified number form, fallback to singular
                            if number == "plural" and "plural" in english_data:
                                return english_data.get(
                                    "plural", english_data.get("singular", key)
                                )
                            else:
                                return english_data.get("singular", key)
                        else:
                            return english_data if english_data else key
            else:
                # For adjectives - always use singular
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
            safe_log(
                logger, "warning", f"Error getting English translation for {key}: {e}"
            )
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
            for arg_name, arg_info in parsed_gloss.arguments.items():
                try:
                    noun_key, adjective_key = self.get_argument_pair(
                        verb_data, arg_name, person
                    )
                    # Get case forms - normalize case to lowercase for database lookup
                    case = arg_info.get("case", "Nom")
                    case_lower = case.lower()

                    noun_form = self.get_case_form(noun_key, case_lower, self.databases)
                    adjective_form = self.get_adjective_form(
                        adjective_key, case_lower, self.databases
                    )

                    # Get English translations
                    noun_english = self.get_english_translation(
                        noun_key, self.databases, "noun"
                    )
                    adjective_english = self.get_english_translation(
                        adjective_key, self.databases, "adjective"
                    )

                    resolved_arguments[arg_name] = ResolvedArgument(
                        noun_key=noun_key,
                        adjective_key=adjective_key,
                        noun_form=noun_form,
                        adjective_form=adjective_form,
                        noun_english=noun_english,
                        adjective_english=adjective_english,
                        case=case,
                    )

                except Exception as e:
                    safe_log(logger, "warning", f"Failed to resolve {arg_name}: {e}")
                    # Continue with other arguments

            # Add resolved arguments to result
            result = {
                "voice": parsed_gloss.voice,
                "tense": parsed_gloss.tense,
                "preverb": parsed_gloss.preverb,
                "argument_pattern": parsed_gloss.argument_pattern,
                "arguments": parsed_gloss.arguments,
                "resolved_arguments": resolved_arguments,
            }

            return result

        except Exception as e:
            safe_log(logger, "error", f"Error in parse_and_resolve: {e}")
            raise ValueError(f"Failed to parse and resolve: {e}")
