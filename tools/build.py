#!/usr/bin/env python3
"""
Build script for Bagh - Modular Architecture Version
Orchestrates the build process using modular components.

This script:
1. Loads verb data using VerbDataLoader module
2. Generates HTML using HTMLGenerator module
3. Generates external data files using ExternalDataGenerator module
4. Copies CSS, JS, and font assets to dist/ folder
5. Creates a production-ready static website

Usage: python tools/build.py
"""

import json
import logging
from pathlib import Path
import sys

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Import modules
from tools.modules.data_loader import VerbDataLoader
from tools.modules.html_generator import HTMLGenerator
from tools.modules.external_data_generator import ExternalDataGenerator
from tools.modules.asset_manager import AssetManager
from tools.modules.file_writer import FileWriter
from tools.modules.config_manager import ConfigManager

# Initialize configuration manager first
config_manager = ConfigManager()

# Set up logging using configuration
logging.basicConfig(
    level=getattr(logging, config_manager.get_setting("build_config", "log_level")),
    format=config_manager.get_setting("build_config", "log_format"),
    force=True,  # Force reconfiguration
)
logger = logging.getLogger(__name__)


def main():
    """Main function to build the HTML file."""
    logger.info("🚀 Starting build process...")

    # Get project root from configuration
    project_root = config_manager.get_path("project_root")

    # Validate paths before proceeding
    logger.info("🔍 Validating project paths...")
    path_validation = config_manager.validate_paths()
    if not all(path_validation.values()):
        logger.warning("⚠️ Some required paths are missing, but continuing...")

    # Create necessary directories
    config_manager.create_directories()

    # Initialize modules with configuration
    data_loader = VerbDataLoader(project_root)
    html_generator = HTMLGenerator(project_root, data_loader)
    external_data_generator = ExternalDataGenerator(project_root)
    asset_manager = AssetManager(project_root)
    file_writer = FileWriter(project_root)

    # Load and validate verb data
    logger.info("📖 Loading verb data...")
    verbs, duplicate_primary_verbs = data_loader.load_json_data()

    if not verbs:
        logger.error("❌ No verbs loaded. Exiting.")
        return

    # Run comprehensive validation
    logger.info("🔍 Running validation...")
    validation_success = data_loader.run_comprehensive_validation(verbs)
    if not validation_success:
        logger.warning("⚠️ Validation failed, but continuing with build...")

    # Generate external data files
    logger.info("📁 Generating external data files...")
    external_data_success = external_data_generator.generate_external_data_files(verbs)
    if external_data_success:
        logger.info("✅ External data files generated successfully")
    else:
        logger.error("❌ Failed to generate external data files")

    # Generate HTML
    logger.info("🌐 Generating HTML...")
    html_content = html_generator.generate_html(verbs, duplicate_primary_verbs)

    # Copy assets
    asset_success = asset_manager.copy_assets()
    if not asset_success:
        logger.warning("⚠️ Asset copying had issues, but continuing with build...")

    # Write HTML file
    write_success = file_writer.write_html_file(html_content)
    if write_success:
        logger.info("🎉 Build completed successfully!")
        logger.info(f"📄 Output: {file_writer.get_output_path()}")
    else:
        logger.error("❌ Failed to write HTML file")
        return


if __name__ == "__main__":
    main()
