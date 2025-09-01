"""
Shared database loading utility for Georgian verb tools.

This module provides centralized database loading functionality to eliminate
code duplication across different tools that need access to the four main
databases: subjects, direct_objects, indirect_objects, and adjectives.
"""

import json
import logging
from pathlib import Path
from typing import Dict, Optional
from tools.modules.config_manager import ConfigManager

logger = logging.getLogger(__name__)


class DatabaseLoader:
    """Centralized database loading utility."""

    def __init__(self, data_dir: Optional[Path] = None):
        """
        Initialize the database loader.

        Args:
            data_dir: Path to data directory. If None, auto-detects from project structure.
        """
        if data_dir is None:
            # Auto-detect data directory from current file location
            current_file = Path(__file__)
            project_root = current_file.parent.parent.parent
            self.config = ConfigManager(project_root)
            self.data_dir = project_root / "src" / "data"
        else:
            self.config = ConfigManager(
                data_dir.parent
                if data_dir.parent.name == "src"
                else data_dir.parent.parent
            )
            self.data_dir = data_dir

        self._databases = {}
        self._loaded = False

    def load_all_databases(self) -> Dict[str, Dict]:
        """
        Load all four databases.

        Returns:
            Dictionary containing all databases:
            {
                "subjects": {...},
                "direct_objects": {...},
                "indirect_objects": {...},
                "adjectives": {...}
            }
        """
        if self._loaded:
            return self._databases.copy()

        db_files = [
            ("subjects", self.config.get_path("subject_database")),
            ("direct_objects", self.config.get_path("direct_object_database")),
            ("indirect_objects", self.config.get_path("indirect_object_database")),
            ("adjectives", self.config.get_path("adjective_database")),
        ]

        for db_type, filepath in db_files:
            if filepath.exists():
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        # Extract the actual database content
                        if db_type in data:
                            self._databases[db_type] = data[db_type]
                        else:
                            self._databases[db_type] = {}
                            logger.warning(
                                f"No '{db_type}' key found in {filepath.name}"
                            )
                except Exception as e:
                    logger.error(f"Could not load {filepath.name}: {e}")
                    self._databases[db_type] = {}
            else:
                logger.error(f"Database file not found: {filepath}")
                self._databases[db_type] = {}

        self._loaded = True
        return self._databases.copy()

    def get_database(self, db_type: str) -> Dict:
        """
        Get a specific database.

        Args:
            db_type: Type of database ('subjects', 'direct_objects', 'indirect_objects', 'adjectives')

        Returns:
            Database dictionary
        """
        if not self._loaded:
            self.load_all_databases()

        return self._databases.get(db_type, {})

    def reload_databases(self) -> Dict[str, Dict]:
        """
        Force reload of all databases.

        Returns:
            Dictionary containing all databases
        """
        self._loaded = False
        self._databases = {}
        return self.load_all_databases()

    def validate_database_files_exist(self) -> bool:
        """
        Check if all required database files exist.

        Returns:
            True if all files exist, False otherwise
        """
        db_files = [
            self.config.get_path("subject_database"),
            self.config.get_path("direct_object_database"),
            self.config.get_path("indirect_object_database"),
            self.config.get_path("adjective_database"),
        ]

        missing_files = []
        for filepath in db_files:
            if not filepath.exists():
                missing_files.append(filepath.name)

        if missing_files:
            logger.error(f"Missing database files: {missing_files}")
            return False

        return True

    def get_database_info(self) -> Dict[str, Dict]:
        """
        Get information about all databases.

        Returns:
            Dictionary with database information:
            {
                "subjects": {"count": 10, "file": "subject_database.json"},
                "direct_objects": {"count": 15, "file": "direct_object_database.json"},
                "indirect_objects": {"count": 12, "file": "indirect_object_database.json"},
                "adjectives": {"count": 8, "file": "adjective_database.json"}
            }
        """
        if not self._loaded:
            self.load_all_databases()

        info = {}
        db_file_mapping = {
            "subjects": self.config.get_path("subject_database"),
            "direct_objects": self.config.get_path("direct_object_database"),
            "indirect_objects": self.config.get_path("indirect_object_database"),
            "adjectives": self.config.get_path("adjective_database"),
        }

        for db_type, database in self._databases.items():
            info[db_type] = {
                "count": len(database),
                "file": db_file_mapping[db_type].name,
            }

        return info


# Convenience functions for backward compatibility
def load_all_databases(data_dir: Optional[Path] = None) -> Dict[str, Dict]:
    """Convenience function to load all databases."""
    loader = DatabaseLoader(data_dir)
    return loader.load_all_databases()


def get_database(db_type: str, data_dir: Optional[Path] = None) -> Dict:
    """Convenience function to get a specific database."""
    loader = DatabaseLoader(data_dir)
    return loader.get_database(db_type)
