"""
Data loading and validation module for verb-website build process.
Handles JSON data loading, validation, and preprocessing.
"""

import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import logging

logger = logging.getLogger(__name__)


class VerbDataLoader:
    """Handles loading and validation of verb data from JSON files."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.data_dir = project_root / "src" / "data"
        self.verbs_file = self.data_dir / "verbs.json"

    def load_json_data(self) -> Tuple[List[Dict], Dict]:
        """
        Load verb data from JSON file and return processed data.

        Returns:
            Tuple of (verbs_list, duplicate_primary_verbs_dict)
        """
        try:
            if not self.verbs_file.exists():
                logger.error(f"Verbs file not found: {self.verbs_file}")
                return [], {}

            with open(self.verbs_file, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Get verbs data
            verbs_data = data.get("verbs", {})

            # Convert verbs_data to list of verbs
            verbs = list(verbs_data.values())

            # Validate verb data
            if not self.validate_verb_data(verbs):
                logger.warning("Verb data validation failed")

            # Identify duplicate primary verbs for smart disambiguation
            duplicate_primary_verbs = self.get_duplicate_primary_verbs(verbs)

            logger.info(f"Successfully loaded {len(verbs)} verbs")
            return verbs, duplicate_primary_verbs

        except FileNotFoundError:
            logger.error(f"Verbs file not found: {self.verbs_file}")
            return [], {}
        except json.JSONDecodeError as e:
            logger.error(f"Invalid JSON in verbs file: {e}")
            return [], {}
        except Exception as e:
            logger.error(f"Unexpected error loading verbs data: {e}")
            return [], {}

    def load_dev_verbs(self, dev_config: List[Dict]) -> Tuple[List[Dict], Dict]:
        """
        Load only the specified verbs for development build.
        
        Args:
            dev_config: Development configuration with verb specifications
            
        Returns:
            Tuple of (filtered_verbs_list, duplicate_primary_verbs_dict)
        """
        all_verbs, all_duplicates = self.load_json_data()
        
        # Filter verbs based on dev configuration
        dev_verbs = []
        for dev_verb_spec in dev_config:
            matching_verb = self.find_verb_by_spec(all_verbs, dev_verb_spec)
            if matching_verb:
                dev_verbs.append(matching_verb)
                logger.info(f"✅ Found dev verb: {matching_verb.get('georgian', 'N/A')} ({dev_verb_spec.get('reason', 'N/A')})")
            else:
                logger.warning(f"⚠️ Dev verb not found: {dev_verb_spec}")
        
        # Get duplicates for filtered verbs only
        dev_duplicates = self.get_duplicate_primary_verbs(dev_verbs)
        
        logger.info(f"🔧 Dev mode: Filtered to {len(dev_verbs)} verbs")
        return dev_verbs, dev_duplicates

    def find_verb_by_spec(self, verbs: List[Dict], spec: Dict) -> Optional[Dict]:
        """Find verb by Georgian text or semantic key."""
        georgian = spec.get("georgian")
        semantic_key = spec.get("semantic_key")
        
        for verb in verbs:
            if (verb.get("georgian") == georgian or 
                verb.get("semantic_key") == semantic_key):
                return verb
        
        return None

    def validate_verb_data(self, verbs: List[Dict]) -> bool:
        """
        Validate verb data for uniqueness and consistency.

        Args:
            verbs: List of verb dictionaries

        Returns:
            True if validation passes, False otherwise
        """
        semantic_keys = set()
        primary_verbs = set()
        warnings = []

        for verb in verbs:
            semantic_key = verb.get("semantic_key", "")
            primary_verb = self.get_primary_verb(verb.get("georgian", ""))

            if semantic_key in semantic_keys:
                warnings.append(f"Warning: Duplicate semantic key: {semantic_key}")
                logger.warning(
                    f"Duplicate semantic key '{semantic_key}' found for verb: {verb.get('georgian', 'N/A')}"
                )
            # Note: Duplicate primary verbs are permissible in Georgian verb data
            # so they are not added to warnings, but are still tracked for disambiguation

            semantic_keys.add(semantic_key)
            primary_verbs.add(primary_verb)

        for warning in warnings:
            logger.warning(warning)

        validation_passed = len(warnings) == 0
        if not validation_passed:
            logger.warning(
                f"⚠️ Verb data validation failed with {len(warnings)} warnings"
            )
        else:
            logger.info("✅ Verb data validation passed")

        return validation_passed

    def validate_verb_data_structure(self, verbs: List[Dict]) -> bool:
        """
        Validate verb data structure and required fields.

        Args:
            verbs: List of verb dictionaries

        Returns:
            True if structure is valid, False otherwise
        """
        validation_errors = []

        for verb in verbs:
            verb_id = verb.get("id")
            georgian = verb.get("georgian", "")
            description = verb.get("description", "")

            # Check required fields
            if not verb_id:
                validation_errors.append(f"Verb missing ID: {georgian} ({description})")
                continue

            if not georgian:
                validation_errors.append(f"Verb ID {verb_id} missing Georgian form")

            # Check conjugation data
            conjugations = verb.get("conjugations", {})
            if not conjugations:
                validation_errors.append(f"Verb ID {verb_id} missing conjugation data")
            else:
                # Check for required tenses
                required_tenses = [
                    "present",
                    "imperfect",
                    "future",
                    "aorist",
                    "optative",
                    "imperative",
                ]
                missing_tenses = []
                for tense in required_tenses:
                    if tense not in conjugations:
                        missing_tenses.append(tense)
                if missing_tenses:
                    validation_errors.append(
                        f"Verb ID {verb_id} missing tenses: {', '.join(missing_tenses)}."
                    )

            # Check preverb configuration
            preverb_config = verb.get("preverb_config", {})
            if preverb_config:
                # Validate preverb config structure
                if preverb_config.get("has_multiple_preverbs", False):
                    # Check for stem-based approach (available_preverbs array)
                    available_preverbs = preverb_config.get("available_preverbs", [])
                    # Check for pre-defined forms approach (preverbs object)
                    preverbs = preverb_config.get("preverbs", {})

                    if not available_preverbs and not preverbs:
                        validation_errors.append(
                            f"Verb ID {verb_id} has has_multiple_preverbs=True but no available_preverbs or preverbs"
                        )

        for error in validation_errors:
            logger.error(error)

        validation_passed = len(validation_errors) == 0
        if not validation_passed:
            logger.error(
                f"Verb data structure validation failed with {len(validation_errors)} errors"
            )
        else:
            logger.info("Verb data structure validation passed")

        return validation_passed

    def get_duplicate_primary_verbs(self, verbs: List[Dict]) -> Dict:
        """
        Identify primary verbs that appear multiple times (need disambiguation).

        Args:
            verbs: List of verb dictionaries

        Returns:
            Dictionary of duplicate primary verbs and their counts
        """
        primary_verb_counts = {}

        for verb in verbs:
            georgian = verb.get("georgian", "")
            primary_verb = self.get_primary_verb(georgian)
            primary_verb_counts[primary_verb] = (
                primary_verb_counts.get(primary_verb, 0) + 1
            )

        # Return only the verbs that appear more than once
        return {verb: count for verb, count in primary_verb_counts.items() if count > 1}

    def get_primary_verb(self, georgian_text: str) -> str:
        """
        Extract the first verb form from Georgian text.

        Args:
            georgian_text: Georgian verb text

        Returns:
            Primary verb form
        """
        from tools.utils import get_primary_verb as utils_get_primary_verb

        return utils_get_primary_verb(georgian_text)

    def validate_database_files(self) -> bool:
        """
        Validate that all required database files exist and are valid JSON.

        Returns:
            True if all database files are valid, False otherwise
        """
        validation_errors = []
        required_databases = [
            "subject_database.json",
            "direct_object_database.json",
            "indirect_object_database.json",
            "adjective_database.json",
        ]

        for db_file in required_databases:
            db_path = self.data_dir / db_file
            if not db_path.exists():
                validation_errors.append(f"Database file missing: {db_file}")
            else:
                try:
                    with open(db_path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                except json.JSONDecodeError as e:
                    validation_errors.append(
                        f"Database file {db_file} has invalid JSON: {e}"
                    )
                except Exception as e:
                    validation_errors.append(
                        f"Error reading database file {db_file}: {e}"
                    )
        for error in validation_errors:
            logger.error(error)

        validation_passed = len(validation_errors) == 0
        if not validation_passed:
            logger.error(
                f"Database files validation failed with {len(validation_errors)} errors"
            )
        else:
            logger.info("Database files validation passed")

        return validation_passed

    def run_comprehensive_validation(self, verbs: List[Dict]) -> bool:
        """
        Run all validation checks and return overall status.

        Args:
            verbs: List of verb dictionaries

        Returns:
            True if all validations pass, False otherwise
        """
        validation_results = []

        # Run all validation checks
        validation_results.append(
            ("Verb Data Structure", self.validate_verb_data_structure(verbs))
        )
        validation_results.append(("Database Files", self.validate_database_files()))

        # Calculate overall status
        passed_checks = sum(1 for _, passed in validation_results if passed)
        total_checks = len(validation_results)

        logger.info(f"Validation results: {passed_checks}/{total_checks} checks passed")

        return passed_checks == total_checks
