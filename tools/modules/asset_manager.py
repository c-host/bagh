"""
Asset management module for verb-website build process.
Handles copying of CSS, JS, fonts, and other static assets to the dist directory.

This module:
1. Copies CSS and JS files to dist/styles and dist/scripts
2. Copies font and other assets to dist/assets
3. Copies 404 page to dist/
4. Manages directory creation and cleanup
5. Handles the new modular JavaScript system
"""

import shutil
import logging
from pathlib import Path
from typing import List, Tuple

logger = logging.getLogger(__name__)


class AssetManager:
    """Handles copying and management of static assets for the website."""

    def __init__(self, project_root: Path, config_manager=None):
        self.project_root = project_root
        if config_manager is None:
            # Import here to avoid circular imports
            from tools.modules.config_manager import ConfigManager

            self.config_manager = ConfigManager(project_root)
        else:
            self.config_manager = config_manager
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
            styles_dir = self.dist_dir / "styles"
            styles_dir.mkdir(exist_ok=True)

            css_source = self.src_dir / "styles" / "main.css"
            css_dest = styles_dir / "main.css"

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
        Handles the new modular system with shared/ and modules/ directories.

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            scripts_dir = self.dist_dir / "scripts"
            scripts_dir.mkdir(exist_ok=True)

            # Copy main orchestrator file
            main_source = self.src_dir / "scripts" / "main.js"
            main_dest = scripts_dir / "main.js"  # Deploy as main.js

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
            assets_source = self.src_dir / "assets"
            assets_dest = self.dist_dir / "assets"

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
            error_page_source = self.src_dir / "404.html"
            error_page_dest = self.dist_dir / "404.html"

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
            "styles_dir": self.dist_dir / "styles",
            "scripts_dir": self.dist_dir / "scripts",
            "assets_dir": self.dist_dir / "assets",
            "css_file": self.dist_dir / "styles" / "main.css",
            "js_file": self.dist_dir / "scripts" / "main.js",
            "error_page": self.dist_dir / "404.html",
            # New modular structure paths
            "shared_dir": self.dist_dir / "scripts" / "shared",
            "modules_dir": self.dist_dir / "scripts" / "modules",
            "test_config": self.dist_dir / "scripts" / "test-config.js",
            "build_production": self.dist_dir / "scripts" / "build-production.js",
        }

    def validate_assets(self) -> Tuple[bool, List[str]]:
        """
        Validate that all required assets exist in the dist directory.
        Updated for modular JavaScript system.

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

        # Check required shared utility files
        shared_files = ["utils.js", "constants.js", "types.js", "dom-manager.js"]

        for shared_file in shared_files:
            shared_path = paths["shared_dir"] / shared_file
            if not shared_path.exists():
                missing_files.append(f"Shared utility {shared_file}: {shared_path}")

        # Check required feature module files
        feature_modules = [
            "theme-manager.js",
            "font-manager.js",
            "notepad-manager.js",
            "filter-manager.js",
            "sidebar-manager.js",
            "verb-data-manager.js",
            "preverb-manager.js",
            "event-manager.js",
        ]

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

        Returns:
            Tuple[bool, List[str]]: (success, list of validation issues)
        """
        issues = []
        paths = self.get_asset_paths()

        # Check main orchestrator
        if not paths["js_file"].exists():
            issues.append("Main JavaScript orchestrator missing")

        # Check shared utilities
        if not paths["shared_dir"].exists():
            issues.append("Shared utilities directory missing")
        else:
            shared_files = ["utils.js", "constants.js", "types.js", "dom-manager.js"]
            for shared_file in shared_files:
                shared_path = paths["shared_dir"] / shared_file
                if not shared_path.exists():
                    issues.append(f"Shared utility missing: {shared_file}")

        # Check feature modules
        if not paths["modules_dir"].exists():
            issues.append("Feature modules directory missing")
        else:
            module_files = [
                "theme-manager.js",
                "font-manager.js",
                "notepad-manager.js",
                "filter-manager.js",
                "sidebar-manager.js",
                "verb-data-manager.js",
                "preverb-manager.js",
                "event-manager.js",
            ]
            for module_file in module_files:
                module_path = paths["modules_dir"] / module_file
                if not module_path.exists():
                    issues.append(f"Feature module missing: {module_file}")

        success = len(issues) == 0

        if success:
            logger.info("  ✅ Modular JavaScript structure validated")
        else:
            logger.warning(f"  ⚠️ Modular structure issues: {issues}")

        return success, issues
