#!/usr/bin/env python3
"""
Argument Resolver for Georgian Verb Example System

This module provides a simple way to resolve nouns and adjectives from explicit
definitions in the verb database, replacing the complex selection engine.

Features:
- Reads explicit noun/adjective definitions from verb data
- Gets case forms from databases
- Handles "none" adjective exclusion
- Provides English translations
- Comprehensive error handling with fallbacks
"""

import logging
from typing import Dict, List, Optional, Tuple, Any
from pathlib import Path

from tools.utils import DatabaseLoader

# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)


class ArgumentResolutionError(Exception):
    """Raised when argument resolution fails"""

    pass


class CaseFormMissingError(Exception):
    """Raised when required case form is missing from database"""

    pass


class ArgumentResolver:
    def __init__(self):
        """Initialize the resolver with databases"""
        self.databases = self._load_databases()

    def _load_databases(self) -> Dict:
        """Load the four databases using shared utility"""
        loader = DatabaseLoader()
        return loader.load_all_databases()

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

        except ArgumentResolutionError:
            # Re-raise our specific errors
            raise
        except Exception as e:
            logger.error(f"Failed to get argument pair: {e}")
            raise ArgumentResolutionError(f"Argument resolution failed: {e}")

    def get_case_form(self, noun_key: str, case: str, number: str = "singular") -> str:
        """
        Get correct noun form from appropriate database

        Args:
            noun_key: Noun key in database
            case: Case required (nom, erg, dat, gen, inst, adv)
            number: Number (singular, plural)

        Returns:
            Noun form in specified case and number

        Raises:
            CaseFormMissingError: If case form is missing
        """
        # Try to find the noun in any database
        for database_type in ["subjects", "direct_objects", "indirect_objects"]:
            try:
                return self._get_noun_form(noun_key, database_type, case, number)
            except CaseFormMissingError:
                continue

        # If not found in any database, raise error
        raise CaseFormMissingError(f"Noun '{noun_key}' not found in any database")

    def _get_noun_form(
        self, noun_key: str, database_type: str, case: str, number: str = "singular"
    ) -> str:
        """
        Get correct noun form from specific database

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
    """Main function for the argument resolver"""
    pass


if __name__ == "__main__":
    main()
