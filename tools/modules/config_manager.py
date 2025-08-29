"""
Configuration management module for verb-website build process.
Handles centralized configuration for paths, settings, and build parameters.

This module:
1. Manages project paths and directory structure
2. Handles build configuration settings
3. Provides environment-specific configurations
4. Centralizes all configurable parameters
"""

import logging
from pathlib import Path
from typing import Dict, Any, Optional
import os

logger = logging.getLogger(__name__)


class ConfigManager:
    """Manages configuration for the build process."""

    def __init__(
        self, project_root: Optional[Path] = None, build_mode: str = "production"
    ):
        """
        Initialize configuration manager.

        Args:
            project_root: Path to project root. If None, auto-detects from current directory.
            build_mode: Build mode ('reference' or 'production')
        """
        self.project_root = project_root or self._detect_project_root()
        self.build_mode = build_mode
        self._load_configuration()

    def _detect_project_root(self) -> Path:
        """Auto-detect project root directory."""
        current_dir = Path.cwd()

        # Look for common project indicators
        indicators = ["src", "tools", "dist"]

        # Start from current directory and work up
        for path in [current_dir] + list(current_dir.parents):
            if all((path / indicator).exists() for indicator in indicators):
                logger.info(f"📁 Detected project root: {path}")
                return path

        # Fallback to current directory
        logger.warning(
            f"⚠️ Could not detect project root, using current directory: {current_dir}"
        )
        return current_dir

    def _load_configuration(self):
        """Load and set up configuration."""
        # Core project paths
        self.paths = {
            "project_root": self.project_root,
            "src_dir": self.project_root / "src",
            "dist_dir": self.project_root
            / ("ref" if self.build_mode == "reference" else "dist"),
            "tools_dir": self.project_root / "tools",
            "modules_dir": self.project_root / "tools" / "modules",
        }

        # Data paths
        self.data_paths = {
            "verbs_json": self.paths["src_dir"] / "data" / "verbs.json",
            "dist_data_dir": self.paths["dist_dir"] / "data",
            "dist_styles_dir": self.paths["dist_dir"] / "styles",
            "dist_scripts_dir": self.paths["dist_dir"] / "scripts",
            "dist_assets_dir": self.paths["dist_dir"] / "assets",
        }

        # Source asset paths
        self.source_paths = {
            "css_file": self.paths["src_dir"] / "styles" / "main.css",
            "js_file": self.paths["src_dir"] / "scripts" / "main.js",
            "assets_dir": self.paths["src_dir"] / "assets",
            "error_page": self.paths["src_dir"] / "404.html",
        }

        # Output paths
        self.output_paths = {
            "index_html": self.paths["dist_dir"] / "index.html",
            "css_output": self.data_paths["dist_styles_dir"] / "main.css",
            "js_output": self.data_paths["dist_scripts_dir"] / "main.js",
            "error_page_output": self.paths["dist_dir"] / "404.html",
        }

        # Build configuration
        self.build_config = {
            "encoding": "utf-8",
            "json_indent": 2,
            "ensure_ascii": False,
            "backup_suffix": ".backup",
            "log_level": "INFO",
            "log_format": (
                "%(levelname)s - %(message)s"
                if self.build_mode == "production"
                else "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
            ),
        }

        # Validation settings
        self.validation_config = {
            "allow_duplicate_primary_verbs": True,
            "strict_mode": False,
            "warn_on_missing_assets": True,
            "fail_on_validation_errors": False,
        }

        # External data configuration
        self.external_data_config = {
            "generate_verbs_data": True,
            "generate_conjugations_data": True,
            "generate_examples_data": True,
            "generate_gloss_data": True,
            "generate_preverb_config": True,
        }

        # Asset configuration
        self.asset_config = {
            "copy_css": True,
            "copy_js": True,
            "copy_assets": True,
            "copy_error_page": True,
            "clean_existing_assets": True,
        }

        # Reference build configuration
        self.reference_config = {
            "reference_verbs": [
                {
                    "georgian": "ჩვენება",
                    "semantic_key": "show",
                    "reason": "stative_verb_no_preverbs",
                },
                {
                    "georgian": "მიტანა",
                    "semantic_key": "bring",
                    "reason": "multi_preverb_verb",
                },
            ],
            "reference_output_dir": "ref",
            "reference_verb_limit": 2,
        }

    def get_path(self, path_key: str) -> Path:
        """
        Get a specific path from configuration.

        Args:
            path_key: Key for the path to retrieve

        Returns:
            Path: The requested path

        Raises:
            KeyError: If path_key doesn't exist
        """
        # Check all path dictionaries
        for path_dict in [
            self.paths,
            self.data_paths,
            self.source_paths,
            self.output_paths,
        ]:
            if path_key in path_dict:
                return path_dict[path_key]

        raise KeyError(f"Path key '{path_key}' not found in configuration")

    def get_setting(self, category: str, key: str) -> Any:
        """
        Get a specific setting from configuration.

        Args:
            category: Configuration category (build_config, validation_config, etc.)
            key: Setting key

        Returns:
            Any: The requested setting

        Raises:
            KeyError: If category or key doesn't exist
        """
        config_dict = getattr(self, category, None)
        if config_dict is None:
            raise KeyError(f"Configuration category '{category}' not found")

        if key not in config_dict:
            raise KeyError(f"Setting '{key}' not found in category '{category}'")

        return config_dict[key]

    def set_setting(self, category: str, key: str, value: Any) -> bool:
        """
        Set a specific setting in configuration.

        Args:
            category: Configuration category
            key: Setting key
            value: New value

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            config_dict = getattr(self, category, None)
            if config_dict is None:
                logger.error(f"❌ Configuration category '{category}' not found")
                return False

            config_dict[key] = value
            logger.info(f"✅ Updated setting: {category}.{key} = {value}")
            return True

        except Exception as e:
            logger.error(f"❌ Error setting configuration: {e}")
            return False

    def validate_paths(self) -> Dict[str, bool]:
        """
        Validate that all required paths exist.

        Returns:
            Dict[str, bool]: Dictionary of path validation results
        """
        validation_results = {}

        # Check required source paths
        required_source_paths = ["css_file", "js_file"]
        for path_key in required_source_paths:
            path = self.get_path(path_key)
            validation_results[f"source_{path_key}"] = path.exists()
            if not path.exists():
                logger.warning(f"⚠️ Required source path missing: {path}")

        # Check optional source paths
        optional_source_paths = ["assets_dir", "error_page"]
        for path_key in optional_source_paths:
            path = self.get_path(path_key)
            validation_results[f"source_{path_key}"] = path.exists()
            if not path.exists():
                logger.info(f"ℹ️ Optional source path missing: {path}")

        # Check data paths
        data_path = self.get_path("verbs_json")
        validation_results["data_verbs_json"] = data_path.exists()
        if not data_path.exists():
            logger.error(f"❌ Required data file missing: {data_path}")

        return validation_results

    def get_all_paths(self) -> Dict[str, Path]:
        """
        Get all configured paths.

        Returns:
            Dict[str, Path]: Dictionary of all paths
        """
        all_paths = {}
        all_paths.update(self.paths)
        all_paths.update(self.data_paths)
        all_paths.update(self.source_paths)
        all_paths.update(self.output_paths)
        return all_paths

    def get_all_settings(self) -> Dict[str, Dict[str, Any]]:
        """
        Get all configuration settings.

        Returns:
            Dict[str, Dict[str, Any]]: Dictionary of all settings
        """
        return {
            "build_config": self.build_config,
            "validation_config": self.validation_config,
            "external_data_config": self.external_data_config,
            "asset_config": self.asset_config,
            "reference_config": self.reference_config,
        }

    def create_directories(self) -> bool:
        """
        Create all necessary directories.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            directories_to_create = [
                self.paths["dist_dir"],
                self.data_paths["dist_data_dir"],
                self.data_paths["dist_styles_dir"],
                self.data_paths["dist_scripts_dir"],
                self.data_paths["dist_assets_dir"],
            ]

            for directory in directories_to_create:
                directory.mkdir(parents=True, exist_ok=True)
                logger.info(f"📁 Created directory: {directory}")

            return True

        except Exception as e:
            logger.error(f"❌ Error creating directories: {e}")
            return False

    def load_from_file(self, config_file: Path) -> bool:
        """
        Load configuration from a JSON file.

        Args:
            config_file: Path to configuration file

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            import json

            with open(config_file, "r", encoding="utf-8") as f:
                config_data = json.load(f)

            # Update configuration with file data
            for category, settings in config_data.items():
                if hasattr(self, category):
                    config_dict = getattr(self, category)
                    config_dict.update(settings)
                    logger.info(f"✅ Loaded configuration from {config_file}")

            return True

        except Exception as e:
            logger.error(f"❌ Error loading configuration from file: {e}")
            return False

    def save_to_file(self, config_file: Path) -> bool:
        """
        Save current configuration to a JSON file.

        Args:
            config_file: Path to save configuration file

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            import json

            config_data = self.get_all_settings()

            with open(config_file, "w", encoding="utf-8") as f:
                json.dump(config_data, f, indent=2, ensure_ascii=False)

            logger.info(f"✅ Configuration saved to {config_file}")
            return True

        except Exception as e:
            logger.error(f"❌ Error saving configuration to file: {e}")
            return False
