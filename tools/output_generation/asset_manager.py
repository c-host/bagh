"""
Asset management module for verb-website build process.
Handles copying of CSS, JS, fonts, and other static assets to the dist directory.

This module:
1. Copies CSS and JS files to dist/styles and dist/scripts
2. Copies font and other assets to dist/assets
3. Copies 404 page to dist/
4. Manages directory creation and cleanup
5. Handles the modular JavaScript system
"""

import shutil
import logging
from pathlib import Path
from typing import List, Tuple

logger = logging.getLogger(__name__)


class AssetManager:
    """Handles copying and management of static assets for the website."""

    def __init__(self, project_root: Path, config_manager=None):
        if config_manager is None:
            # Import here to avoid circular imports
            from tools.utils.config_manager import ConfigManager

            self.config_manager = ConfigManager(project_root)
        else:
            self.config_manager = config_manager

        # Get all paths from config manager
        self.dist_dir = self.config_manager.get_path("dist_dir")
        self.src_dir = self.config_manager.get_path("src_dir")

    def copy_assets(self) -> bool:
        """
        Copy all static assets to the dist directory.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("📋 Starting asset copy process...")

            # Create main dist directory
            self.dist_dir.mkdir(exist_ok=True)

            # Copy CSS and JS files
            css_success = self._copy_css_files()
            js_success = self._copy_js_files()

            # Copy assets folder (fonts, etc.)
            assets_success = self._copy_assets_folder()

            # Copy 404 page
            error_page_success = self._copy_error_page()

            # Check if all operations were successful
            all_successful = all(
                [css_success, js_success, assets_success, error_page_success]
            )

            if all_successful:
                logger.info("📋 All assets copied successfully")
            else:
                logger.warning("⚠️ Some assets failed to copy")

            return all_successful

        except Exception as e:
            logger.error(f"❌ Error during asset copy process: {e}")
            return False

    def _copy_css_files(self) -> bool:
        """
        Copy CSS files to dist/styles directory.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Use config manager paths instead of manual construction
            css_source = self.config_manager.get_path("css_file")
            css_dest = self.config_manager.get_path("css_output")

            # Create directory if needed
            css_dest.parent.mkdir(parents=True, exist_ok=True)

            if css_source.exists():
                shutil.copy2(css_source, css_dest)
                logger.info("  ✅ CSS files copied")
                return True
            else:
                logger.warning(f"  ⚠️ CSS source file not found: {css_source}")
                return False

        except Exception as e:
            logger.error(f"  ❌ Error copying CSS files: {e}")
            return False

    def _copy_js_files(self) -> bool:
        """
        Copy JavaScript files to dist/scripts directory.
        Handles the modular system with shared/ and modules/ directories.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Use config manager paths
            scripts_dir = self.config_manager.get_path("dist_scripts_dir")
            scripts_dir.mkdir(exist_ok=True)

            # Copy main orchestrator file
            main_source = self.config_manager.get_path("js_file")
            main_dest = self.config_manager.get_path("js_output")

            if main_source.exists():
                shutil.copy2(main_source, main_dest)
                logger.info("  ✅ Main JavaScript orchestrator copied")
            else:
                logger.warning(f"  ⚠️ Main JavaScript source not found: {main_source}")
                return False

            # Copy shared utilities directory
            shared_source = self.src_dir / "scripts" / "shared"
            shared_dest = scripts_dir / "shared"

            if shared_source.exists():
                if shared_dest.exists():
                    shutil.rmtree(shared_dest)
                shutil.copytree(shared_source, shared_dest)
                logger.info("  ✅ Shared utilities copied")
            else:
                logger.warning(
                    f"  ⚠️ Shared utilities directory not found: {shared_source}"
                )
                return False

            # Copy feature modules directory
            modules_source = self.src_dir / "scripts" / "modules"
            modules_dest = scripts_dir / "modules"

            if modules_source.exists():
                if modules_dest.exists():
                    shutil.rmtree(modules_dest)
                shutil.copytree(modules_source, modules_dest)
                logger.info("  ✅ Feature modules copied")
            else:
                logger.warning(
                    f"  ⚠️ Feature modules directory not found: {modules_source}"
                )
                return False

            logger.info("  ✅ All JavaScript files copied successfully")
            return True

        except Exception as e:
            logger.error(f"  ❌ Error copying JavaScript files: {e}")
            return False

    def _copy_assets_folder(self) -> bool:
        """
        Copy assets folder (fonts, images, etc.) to dist/assets.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Use config manager paths
            assets_source = self.config_manager.get_path("assets_dir")
            assets_dest = self.config_manager.get_path("dist_assets_dir")

            if assets_source.exists():
                # Remove existing assets directory if it exists
                if assets_dest.exists():
                    shutil.rmtree(assets_dest)

                # Copy the entire assets directory
                shutil.copytree(assets_source, assets_dest)
                logger.info("  ✅ Assets folder copied")
                return True
            else:
                logger.info("  ℹ️ No assets folder found (this is optional)")
                return True  # Not an error if assets folder doesn't exist

        except Exception as e:
            logger.error(f"  ❌ Error copying assets folder: {e}")
            return False

    def _copy_error_page(self) -> bool:
        """
        Copy 404 error page to dist directory.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Use config manager paths
            error_page_source = self.config_manager.get_path("error_page")
            error_page_dest = self.config_manager.get_path("error_page_output")

            if error_page_source.exists():
                shutil.copy2(error_page_source, error_page_dest)
                logger.info("  ✅ 404 page copied")
                return True
            else:
                logger.info("  ℹ️ No 404 page found (this is optional)")
                return True  # Not an error if 404 page doesn't exist

        except Exception as e:
            logger.error(f"  ❌ Error copying 404 page: {e}")
            return False

    def get_asset_paths(self) -> dict:
        """
        Get the paths of all asset directories and files.

        Returns:
            dict: Dictionary containing asset paths
        """
        return {
            "dist_dir": self.dist_dir,
            "styles_dir": self.config_manager.get_path("dist_styles_dir"),
            "scripts_dir": self.config_manager.get_path("dist_scripts_dir"),
            "assets_dir": self.config_manager.get_path("dist_assets_dir"),
            "css_file": self.config_manager.get_path("css_output"),
            "js_file": self.config_manager.get_path("js_output"),
            "error_page": self.config_manager.get_path("error_page_output"),
            # Modular structure paths
            "shared_dir": self.config_manager.get_path("dist_scripts_dir") / "shared",
            "modules_dir": self.config_manager.get_path("dist_scripts_dir") / "modules",
            "test_config": self.config_manager.get_path("dist_scripts_dir")
            / "test-config.js",
            "build_production": self.config_manager.get_path("dist_scripts_dir")
            / "build-production.js",
        }

    def validate_assets(self) -> Tuple[bool, List[str]]:
        """
        Validate that all required assets exist in the dist directory.
        Validates modular JavaScript system.

        Returns:
            Tuple[bool, List[str]]: (success, list of missing files)
        """
        missing_files = []
        paths = self.get_asset_paths()

        # Check required files
        required_files = [
            ("CSS file", paths["css_file"]),
            ("JavaScript file", paths["js_file"]),
            ("Shared utilities directory", paths["shared_dir"]),
            ("Feature modules directory", paths["modules_dir"]),
        ]

        for name, path in required_files:
            if not path.exists():
                missing_files.append(f"{name}: {path}")

        # Check required shared utility files using config
        shared_files = self.config_manager.get_setting(
            "asset_config", "required_shared_files"
        )
        for shared_file in shared_files:
            shared_path = paths["shared_dir"] / shared_file
            if not shared_path.exists():
                missing_files.append(f"Shared utility {shared_file}: {shared_path}")

        # Check required feature module files using config
        feature_modules = self.config_manager.get_setting(
            "asset_config", "required_feature_modules"
        )
        for module_file in feature_modules:
            module_path = paths["modules_dir"] / module_file
            if not module_path.exists():
                missing_files.append(f"Feature module {module_file}: {module_path}")

        # Optional files (just log if missing)
        optional_files = [
            ("Assets directory", paths["assets_dir"]),
            ("404 page", paths["error_page"]),
            ("Test configuration", paths["test_config"]),
            ("Production builder", paths["build_production"]),
        ]

        for name, path in optional_files:
            if not path.exists():
                logger.info(f"  ℹ️ Optional {name} not found: {path}")

        success = len(missing_files) == 0

        if success:
            logger.info("  ✅ All required assets validated")
        else:
            logger.warning(f"  ⚠️ Missing required assets: {missing_files}")

        return success, missing_files

    def validate_modular_structure(self) -> Tuple[bool, List[str]]:
        """
        Validate the modular JavaScript structure specifically.
        This method now delegates to validate_assets() to avoid duplication.

        Returns:
            Tuple[bool, List[str]]: (success, list of validation issues)
        """
        # Delegate to the main validation method to avoid duplication
        return self.validate_assets()
