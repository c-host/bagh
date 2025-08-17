#!/usr/bin/env python3
"""
Noun-Adjective Selection Engine for Georgian Verb Example System

This engine selects appropriate nouns and adjectives from the databases based on:
- Verb semantics and compatibility
- Deterministic selection with tense-based variety
- Semantic compatibility filtering
- Case form requirements
- Developer overrides (takes precedence over semantic mapping)

Features:
- Deterministic selection for consistent examples
- Tense-based variety to avoid monotony
- Semantic compatibility checking
- Developer override system for hard-coded selections
- Comprehensive error handling with resolution instructions
"""

import hashlib
import logging
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path
import json

from gloss_parser import (
    StandardizedRawGlossParser,
    RawGlossParseError,
)

# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)


class NounSelectionError(Exception):
    """Raised when no compatible nouns/adjectives found"""

    pass


class CaseFormMissingError(Exception):
    """Raised when required case form is missing from database"""

    pass


class NounAdjectiveSelectionEngine:
    def __init__(self):
        """Initialize the selection engine with parser and databases"""
        self.raw_gloss_parser = StandardizedRawGlossParser()
        self.databases = self._load_databases()

        # Tense priority for variety
        self.tense_priority = {
            "Pres": 1,
            "Impf": 2,
            "Fut": 3,
            "Aor": 4,
            "Opt": 5,
            "Impv": 6,
        }

    def _load_databases(self) -> Dict:
        """Load the four databases"""
        data_dir = Path(__file__).parent.parent / "src" / "data"
        databases = {}

        db_files = [
            ("subjects", "subject_database.json"),
            ("direct_objects", "direct_object_database.json"),
            ("indirect_objects", "indirect_object_database.json"),
            ("adjectives", "adjective_database.json"),
        ]

        for db_type, filename in db_files:
            filepath = data_dir / filename
            if filepath.exists():
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        # Extract the actual database content
                        if db_type in data:
                            databases[db_type] = data[db_type]
                        else:
                            databases[db_type] = {}
                except Exception as e:
                    logger.error(f"Could not load {filename}: {e}")
                    databases[db_type] = {}
            else:
                logger.error(f"Database file not found: {filepath}")
                databases[db_type] = {}

        return databases

    def _check_override(
        self, verb_data: Dict, component_type: str, case: str
    ) -> Optional[Dict]:
        """
        Check if there's a developer override for the specified component

        Args:
            verb_data: Verb data dictionary from verbs.json
            component_type: Type of component ('subject', 'direct_object', 'indirect_object', 'adjective')
            case: Case form needed (e.g., 'nom', 'dat', 'erg')

        Returns:
            Override dictionary with 'noun' and 'adjective' keys if found, None otherwise
        """
        # Check for overrides in verb data
        overrides = verb_data.get("overrides", {})

        # Check for component-specific override
        component_override = overrides.get(component_type, {})

        # Handle new DRY structure (no case-specific objects)
        if isinstance(component_override, dict) and "noun" in component_override:
            # This is the new DRY structure
            noun = component_override.get("noun", "")
            adjective = component_override.get("adjective", "")

            # Check if noun is blank - if so, skip override (regardless of adjective)
            if not noun.strip():
                return None

            # If adjective is explicitly "none", mark it as excluded
            if adjective.strip().lower() == "none":
                return component_override

            # If adjective is blank, allow default adjective selection
            if not adjective.strip():
                return component_override

            return component_override

        # Handle legacy case-specific structure (for backward compatibility)
        if case in component_override:
            override_value = component_override[case]
            noun = override_value.get("noun", "")
            adjective = override_value.get("adjective", "")

            # Check if noun is blank - if so, skip override (regardless of adjective)
            if not noun.strip():
                return None

            # If adjective is explicitly "none", mark it as excluded
            if adjective.strip().lower() == "none":
                return override_value

            # If adjective is blank, allow default adjective selection
            if not adjective.strip():
                return override_value

            return override_value

        # Check for general override (no case specified) - legacy structure
        if "default" in component_override:
            override_value = component_override["default"]
            noun = override_value.get("noun", "")
            adjective = override_value.get("adjective", "")

            # Check if noun is blank - if so, skip override (regardless of adjective)
            if not noun.strip():
                return None

            # If adjective is explicitly "none", mark it as excluded
            if adjective.strip().lower() == "none":
                return override_value

            # If adjective is blank, allow default adjective selection
            if not adjective.strip():
                return override_value

            return override_value

        return None

    def select_subject_with_adjective(
        self,
        verb_id: int,
        tense: str,
        person: str,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Tuple[str, str]:
        """
        Select appropriate subject noun and adjective

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense for variety
            person: Verb person
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            verb_data: Verb data dictionary for override checking

        Returns:
            Tuple of (subject_noun, subject_adjective)

        Raises:
            NounSelectionError: If no compatible subjects found
        """
        try:
            # Parse raw gloss to get subject case
            parsed_gloss = self.raw_gloss_parser.parse_raw_gloss(raw_gloss)
            subject_arg = parsed_gloss.get("arguments", {}).get("subject", {})
            subject_case = subject_arg.get("case", "nom").lower()

            # Check for developer override first
            if verb_data:
                subject_override = self._check_override(
                    verb_data, "subject", subject_case
                )
                if subject_override:
                    # For subject override, return the noun and adjective separately
                    # Convert "none" adjective to empty string to exclude it
                    noun = subject_override.get("noun", "")
                    adjective = subject_override.get("adjective", "")
                    if adjective.lower() == "none":
                        adjective = ""
                    return noun, adjective

            # Fall back to normal selection logic
            return self._deterministic_selection(
                verb_id, person, "subjects", verb_semantics
            )

        except Exception as e:
            logger.error(f"Failed to select subject: {e}")
            raise NounSelectionError(f"Subject selection failed: {e}")

    def select_direct_object_with_adjective(
        self,
        verb_id: int,
        tense: str,
        person: str,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Tuple[str, str]:
        """
        Select appropriate direct object noun and adjective

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense for variety
            person: Verb person
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            verb_data: Verb data dictionary for override checking

        Returns:
            Tuple of (direct_object_noun, direct_object_adjective)

        Raises:
            NounSelectionError: If no compatible direct objects found
        """
        try:
            # Parse raw gloss to get direct object case
            parsed_gloss = self.raw_gloss_parser.parse_raw_gloss(raw_gloss)
            do_arg = parsed_gloss.get("arguments", {}).get("direct_object", {})
            do_case = do_arg.get("case", "dat").lower()

            # Check for developer override first
            if verb_data:
                do_override = self._check_override(verb_data, "direct_object", do_case)
                if do_override:
                    # For direct object override, return the noun and adjective separately
                    # Convert "none" adjective to empty string to exclude it
                    noun = do_override.get("noun", "")
                    adjective = do_override.get("adjective", "")
                    if adjective.lower() == "none":
                        adjective = ""
                    return noun, adjective

                # Check if there's an override with empty noun but "none" adjective
                overrides = verb_data.get("overrides", {})
                component_override = overrides.get("direct_object", {})
                if (
                    isinstance(component_override, dict)
                    and "adjective" in component_override
                ):
                    adjective_override = component_override.get("adjective", "")
                    if adjective_override.lower() == "none":
                        # Use deterministic selection but exclude adjective
                        selected_noun, _ = self._deterministic_selection(
                            verb_id, person, "direct_objects", verb_semantics
                        )
                        return selected_noun, ""

            # Fall back to normal selection logic
            return self._deterministic_selection(
                verb_id, person, "direct_objects", verb_semantics
            )

        except Exception as e:
            logger.error(f"Failed to select direct object: {e}")
            # Provide more helpful error message with resolution instructions
            compatible_nouns = self._get_compatible_nouns(
                "direct_objects", verb_semantics
            )
            error_msg = f"Direct object selection failed: {e}"
            if compatible_nouns:
                error_msg += f"\nCompatible direct objects found: {compatible_nouns}"
            else:
                error_msg += f"\nNo compatible direct objects found for verb semantics: {verb_semantics}"
                error_msg += f"\nAvailable direct objects: {list(self.databases.get('direct_objects', {}).keys())}"
            raise NounSelectionError(error_msg)

    def select_indirect_object_with_adjective(
        self,
        verb_id: int,
        tense: str,
        person: str,
        raw_gloss: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> Tuple[str, str]:
        """
        Select appropriate indirect object noun and adjective

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense for variety
            person: Verb person
            raw_gloss: Raw gloss specification
            verb_semantics: Verb semantic information
            verb_data: Verb data dictionary for override checking

        Returns:
            Tuple of (indirect_object_noun, indirect_object_adjective)

        Raises:
            NounSelectionError: If no compatible indirect objects found
        """
        try:
            # Parse raw gloss to get indirect object case
            parsed_gloss = self.raw_gloss_parser.parse_raw_gloss(raw_gloss)
            io_arg = parsed_gloss.get("arguments", {}).get("indirect_object", {})
            io_case = io_arg.get("case", "dat").lower()

            # Check for developer override first
            if verb_data:
                io_override = self._check_override(
                    verb_data, "indirect_object", io_case
                )
                if io_override:
                    # For indirect object override, return the noun and adjective separately
                    # Convert "none" adjective to empty string to exclude it
                    noun = io_override.get("noun", "")
                    adjective = io_override.get("adjective", "")
                    if adjective.lower() == "none":
                        adjective = ""
                    return noun, adjective

                # Check if there's an override with empty noun but "none" adjective
                overrides = verb_data.get("overrides", {})
                component_override = overrides.get("indirect_object", {})
                if (
                    isinstance(component_override, dict)
                    and "adjective" in component_override
                ):
                    adjective_override = component_override.get("adjective", "")
                    if adjective_override.lower() == "none":
                        # Use deterministic selection but exclude adjective
                        selected_noun, _ = self._deterministic_selection(
                            verb_id, person, "indirect_objects", verb_semantics
                        )
                        return selected_noun, ""

            # Fall back to normal selection logic
            return self._deterministic_selection(
                verb_id, person, "indirect_objects", verb_semantics
            )

        except Exception as e:
            logger.error(f"Failed to select indirect object: {e}")
            raise NounSelectionError(f"Indirect object selection failed: {e}")

    def _deterministic_selection(
        self,
        verb_id: int,
        person: str,
        database_type: str,
        verb_semantics: str,
    ) -> Tuple[str, str]:
        """
        Deterministic selection with person-based consistency

        Args:
            verb_id: Verb identifier
            person: Verb person
            database_type: Type of database for logging
            verb_semantics: Verb semantic information

        Returns:
            Tuple of (noun_key, adjective_key)
        """
        # Create selection seed with person-based consistency
        # This ensures consistent S/DO/IO relations across tenses for each person
        selection_seed = f"{verb_id}_{person}_{database_type}"

        # Get compatible nouns
        compatible_nouns = self._get_compatible_nouns(database_type, verb_semantics)
        if not compatible_nouns:
            self._log_selection_error(database_type, verb_id, "unknown", verb_semantics)
            raise NounSelectionError(
                f"No compatible {database_type} found for verb semantics: {verb_semantics}"
            )

        # Select noun deterministically
        noun_hash = int(hashlib.md5(selection_seed.encode()).hexdigest(), 16)
        noun_index = noun_hash % len(compatible_nouns)
        selected_noun = compatible_nouns[noun_index]

        # Get compatible adjectives
        adjective_category = (
            "person" if database_type in ["subjects", "indirect_objects"] else "object"
        )
        compatible_adjectives = self._get_compatible_adjectives(adjective_category)
        if not compatible_adjectives:
            logger.warning(f"No compatible adjectives found for {database_type}")
            return selected_noun, ""

        # Select adjective deterministically
        adj_seed = f"{selection_seed}_adj"
        adj_hash = int(hashlib.md5(adj_seed.encode()).hexdigest(), 16)
        adj_index = adj_hash % len(compatible_adjectives)
        selected_adjective = compatible_adjectives[adj_index]

        logger.debug(
            f"Selected '{selected_noun}' with adjective '{selected_adjective}' from {database_type} using seed '{selection_seed}'"
        )

        return selected_noun, selected_adjective

    def select_subject(
        self,
        verb_id: int,
        tense: str,
        person: str,
        verb_semantics: str,
        verb_data: Optional[Dict] = None,
    ) -> str:
        """
        Select appropriate subject noun (without adjective)

        Args:
            verb_id: Verb identifier for deterministic selection
            tense: Verb tense for variety
            person: Verb person
            verb_semantics: Verb semantic information
            verb_data: Verb data dictionary for override checking

        Returns:
            Selected subject noun key

        Raises:
            NounSelectionError: If no compatible subjects found
        """
        try:
            # Check for developer override first
            if verb_data:
                subject_override = self._check_override(verb_data, "subject", "nom")
                if subject_override:
                    # Return just the noun part if there's an adjective
                    parts = subject_override.split()
                    return parts[0]

            # Fall back to normal selection logic
            selected_noun, _ = self._deterministic_selection(
                verb_id, person, "subjects", verb_semantics
            )
            return selected_noun

        except Exception as e:
            logger.error(f"Failed to select subject: {e}")
            # Provide more helpful error message with resolution instructions
            compatible_nouns = self._get_compatible_nouns("subjects", verb_semantics)
            error_msg = f"Subject selection failed: {e}"
            if compatible_nouns:
                error_msg += f"\nCompatible subjects found: {compatible_nouns}"
            else:
                error_msg += f"\nNo compatible subjects found for verb semantics: {verb_semantics}"
                error_msg += f"\nAvailable subjects: {list(self.databases.get('subjects', {}).keys())}"
            raise NounSelectionError(error_msg)

    def _get_compatible_nouns(
        self, database_type: str, verb_semantics: str
    ) -> List[str]:
        """
        Get compatible nouns from database based on verb semantics

        Args:
            database_type: Type of database (subjects, direct_objects, indirect_objects)
            verb_semantics: Verb semantic information

        Returns:
            List of compatible noun keys
        """
        if database_type not in self.databases:
            logger.error(f"Database type '{database_type}' not found")
            return []

        database = self.databases[database_type]
        compatible_nouns = []

        for noun_key, noun_data in database.items():
            if "verb_compatibility" in noun_data:
                # Check if verb semantics match any compatible verbs
                verb_compatibility = noun_data["verb_compatibility"]
                if self._semantic_compatibility_check(
                    verb_semantics, verb_compatibility
                ):
                    compatible_nouns.append(noun_key)

        return compatible_nouns

    def _get_compatible_adjectives(self, target_type: str) -> List[str]:
        """
        Get compatible adjectives for target type

        Args:
            target_type: Type of target (person, object)

        Returns:
            List of compatible adjective keys
        """
        if "adjectives" not in self.databases:
            logger.error("Adjectives database not found")
            return []

        database = self.databases["adjectives"]
        compatible_adjectives = []

        for adj_key, adj_data in database.items():
            if "compatibility" in adj_data:
                compatibility = adj_data["compatibility"]
                if target_type in compatibility:
                    compatible_adjectives.append(adj_key)

        return compatible_adjectives

    def _semantic_compatibility_check(
        self, verb_semantics: str, verb_compatibility: List[str]
    ) -> bool:
        """
        Check if verb semantics are compatible with noun's verb compatibility

        Args:
            verb_semantics: Verb semantic information
            verb_compatibility: List of compatible verbs for noun

        Returns:
            True if compatible, False otherwise
        """
        # Simple string matching for now
        # Could be enhanced with more sophisticated semantic matching
        verb_semantics_lower = verb_semantics.lower()

        for compatible_verb in verb_compatibility:
            if verb_semantics_lower == compatible_verb.lower():
                return True

        return False

    def get_noun_form(
        self, noun_key: str, database_type: str, case: str, number: str = "singular"
    ) -> str:
        """
        Get correct noun form from appropriate database

        Args:
            noun_key: Noun key in database
            database_type: Type of database
            case: Case required (nom, erg, dat, gen, inst, adv)
            number: Number (singular, plural)

        Returns:
            Noun form in specified case and number

        Raises:
            CaseFormMissingError: If case form is missing
        """
        if database_type not in self.databases:
            raise CaseFormMissingError(f"Database type '{database_type}' not found")

        database = self.databases[database_type]
        if noun_key not in database:
            raise CaseFormMissingError(
                f"Noun '{noun_key}' not found in {database_type} database"
            )

        noun_data = database[noun_key]

        # Get the appropriate case forms
        if number == "singular":
            case_forms = noun_data.get("cases", {})
        elif number == "plural":
            case_forms = noun_data.get("plural", {})
        else:
            raise CaseFormMissingError(f"Invalid number: {number}")

        if case not in case_forms:
            raise CaseFormMissingError(
                f"Case '{case}' not found for noun '{noun_key}' in {database_type}"
            )

        return case_forms[case]

    def get_adjective_form(
        self, adjective_key: str, case: str, number: str = "singular"
    ) -> str:
        """
        Get correct adjective form matching noun case

        Args:
            adjective_key: Adjective key in database
            case: Case required (nom, erg, dat, gen, inst, adv)
            number: Number (singular, plural) - ignored, always uses singular

        Returns:
            Adjective form in specified case (always singular)

        Raises:
            CaseFormMissingError: If case form is missing
        """
        if "adjectives" not in self.databases:
            raise CaseFormMissingError("Adjectives database not found")

        database = self.databases["adjectives"]
        if adjective_key not in database:
            raise CaseFormMissingError(
                f"Adjective '{adjective_key}' not found in adjectives database"
            )

        adj_data = database[adjective_key]

        # Always use singular case forms (Georgian doesn't use plural adjectives in this context)
        case_forms = adj_data.get("cases", {})

        if case not in case_forms:
            raise CaseFormMissingError(
                f"Case '{case}' not found for adjective '{adjective_key}'"
            )

        return case_forms[case]

    def get_english_base_form(
        self, key: str, database_type: str, number: str = "singular"
    ) -> str:
        """
        Get English base form from database

        Args:
            key: Noun/adjective key in database
            database_type: Type of database (subjects, direct_objects, indirect_objects, adjectives)
            number: Number (singular, plural) - for subjects, this affects the English translation

        Returns:
            English base form
        """
        if database_type not in self.databases:
            return key

        database = self.databases[database_type]
        if key not in database:
            return key

        item_data = database[key]

        # For subjects, handle singular vs plural English translations
        if database_type == "subjects" and "english" in item_data:
            english_data = item_data["english"]
            if isinstance(english_data, dict):
                # If english is a dict with singular/plural keys
                return english_data.get(number, english_data.get("singular", key))
            else:
                # If english is just a string, return it
                return english_data

        # For other database types, look for english field
        if "english" in item_data:
            english_data = item_data["english"]
            if isinstance(english_data, dict):
                return english_data.get(number, english_data.get("singular", key))
            else:
                return english_data

        # Fallback to key if no english translation found
        return key

    def _log_selection_error(
        self, database_type: str, verb_id: int, tense: str, verb_semantics: str
    ):
        """Log detailed error information with resolution instructions"""
        available_items = list(self.databases.get(database_type, {}).keys())

        error_msg = f"""
        ERROR: No compatible {database_type} found for verb_id={verb_id}, tense={tense}
        Verb semantics: {verb_semantics}
        Available items: {available_items}
        
        RESOLUTION: Add noun to {database_type}_database.json with:
        - verb_compatibility: {verb_semantics}
        - All case forms (nom, erg, dat, gen, inst, adv)
        - Singular and plural forms
        """
        logger.error(error_msg)

    def get_case_form(self, noun_key: str, case: str, number: str = "singular") -> str:
        """
        Get case form for a noun (convenience method)

        Args:
            noun_key: Noun key in database
            case: Case required (nom, erg, dat, gen, inst, adv)
            number: Number (singular, plural)

        Returns:
            Noun form in specified case and number
        """
        # Try to find the noun in any database
        for database_type in ["subjects", "direct_objects", "indirect_objects"]:
            try:
                return self.get_noun_form(noun_key, database_type, case, number)
            except CaseFormMissingError:
                continue

        # If not found in any database, raise error
        raise CaseFormMissingError(f"Noun '{noun_key}' not found in any database")

    def validate_database_completeness(self):
        """Validate that all databases have required case forms"""
        required_cases = ["nom", "erg", "dat", "gen", "inst", "adv"]

        for database_name, database in self.databases.items():
            for noun_key, noun_data in database.items():
                # Check singular forms
                if "cases" in noun_data:
                    for case in required_cases:
                        if case not in noun_data["cases"]:
                            raise CaseFormMissingError(
                                f"Missing {case} case for {noun_key} in {database_name}"
                            )

                # Check plural forms
                if "plural" in noun_data:
                    for case in required_cases:
                        if case not in noun_data["plural"]:
                            raise CaseFormMissingError(
                                f"Missing {case} case in plural for {noun_key} in {database_name}"
                            )


def main():
    """Main function for the noun-adjective selection engine"""
    pass


if __name__ == "__main__":
    main()
