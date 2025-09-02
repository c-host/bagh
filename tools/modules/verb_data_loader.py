"""
Verb data loading and validation module for verb-website build process.
Handles JSON data loading, validation, and preprocessing for Georgian verb data.
"""

import json
from pathlib import Path
from typing import Dict, List, Tuple, Optional
import logging
from .config_manager import ConfigManager

logger = logging.getLogger(__name__)


class VerbDataLoader:
    """Handles loading and validation of Georgian verb data from JSON files."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.config = ConfigManager(project_root)
        # Use ConfigManager for path management
        self.data_dir = self.config.get_path("src_dir") / "data"
        self.verbs_file = self.config.get_path("verbs_json")

        # Simplified caching - only cache the main data
        self._cached_data = None
        self._last_modified = None

    def load_json_data(self) -> Tuple[List[Dict], Dict]:
        """
        Load verb data from JSON file and return processed data.
        Uses simple caching for improved performance.

        Returns:
            Tuple of (verbs_list, duplicate_primary_verbs_dict)
        """
        try:
            if not self.verbs_file.exists():
                logger.error(f"Verbs file not found: {self.verbs_file}")
                return [], {}

            # Simple cache check
            current_modified = self.verbs_file.stat().st_mtime
            if self._cached_data and self._last_modified == current_modified:
                logger.info("Using cached verb data (file unchanged)")
                return self._cached_data

            # Load fresh data
            logger.info("Loading fresh verb data from file")
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

            # Cache the results
            self._cached_data = (verbs, duplicate_primary_verbs)
            self._last_modified = current_modified

            logger.info(f"Successfully loaded {len(verbs)} verbs (cached)")
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

    def validate_verb_data(self, verbs: List[Dict]) -> bool:
        """
        Validate verb data for uniqueness and consistency.

        Args:
            verbs: List of verb dictionaries

        Returns:
            True if validation passes, False otherwise
        """
        semantic_keys = set()
        warnings = []

        for verb in verbs:
            semantic_key = verb.get("semantic_key", "")
            if semantic_key in semantic_keys:
                warnings.append(f"Warning: Duplicate semantic key: {semantic_key}")
                logger.warning(
                    f"Duplicate semantic key '{semantic_key}' found for verb: {verb.get('georgian', 'N/A')}"
                )
            semantic_keys.add(semantic_key)

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
