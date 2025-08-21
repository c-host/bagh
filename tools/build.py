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

Usage: 
    python tools/build.py --production  # Build production version (default)
    python tools/build.py --reference   # Build reference version with 2 verbs
"""

import argparse
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

logger = logging.getLogger(__name__)


def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Build script for verb website')
    parser.add_argument('--reference', action='store_true', help='Build reference version with 2 verbs')
    parser.add_argument('--production', action='store_true', help='Build production version with all verbs')
    return parser.parse_args()


def main():
    """Main function to build the HTML file."""
    # Parse command line arguments
    args = parse_arguments()
    
    # Determine build mode
    build_mode = 'reference' if args.reference else 'production'
    
    logger.info(f"🚀 Starting {build_mode} build process...")

    # Initialize configuration manager with build mode
    config_manager = ConfigManager(build_mode=build_mode)

    # Set up logging using configuration
    logging.basicConfig(
        level=getattr(logging, config_manager.get_setting("build_config", "log_level")),
        format=config_manager.get_setting("build_config", "log_format"),
        force=True,  # Force reconfiguration
    )

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
    external_data_generator = ExternalDataGenerator(project_root, config_manager)
    asset_manager = AssetManager(project_root, config_manager)
    file_writer = FileWriter(project_root, config_manager)

    # Load and validate verb data based on build mode
    logger.info("📖 Loading verb data...")
    if build_mode == 'reference':
        reference_config = config_manager.get_setting("reference_config", "reference_verbs")
        verbs, duplicate_primary_verbs = data_loader.load_reference_verbs(reference_config)
        logger.info(f"🔧 Reference mode: Loaded {len(verbs)} verbs for reference build")
    else:
        verbs, duplicate_primary_verbs = data_loader.load_json_data()
        logger.info(f"🏭 Production mode: Loaded {len(verbs)} verbs for production build")

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
