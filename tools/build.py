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
import sys
import os
from pathlib import Path

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
    parser = argparse.ArgumentParser(description="Build script for verb website")
    parser.add_argument(
        "--reference", action="store_true", help="Build reference version with 2 verbs"
    )
    parser.add_argument(
        "--production",
        action="store_true",
        help="Build production version with all verbs",
    )
    return parser.parse_args()


def setup_logging(config_manager):
    """Set up logging with proper Unicode handling and reduced verbosity."""
    # Set console encoding for Windows first
    if os.name == "nt":  # Windows
        try:
            # Try to set console to UTF-8
            os.system("chcp 65001 > nul 2>&1")
            # Also set environment variables
            os.environ["PYTHONIOENCODING"] = "utf-8"
            # Set stdout and stderr to UTF-8
            import sys

            if hasattr(sys.stdout, "reconfigure"):
                sys.stdout.reconfigure(encoding="utf-8")
            if hasattr(sys.stderr, "reconfigure"):
                sys.stderr.reconfigure(encoding="utf-8")
        except:
            pass

    # Create a custom handler that handles Unicode properly
    class UnicodeStreamHandler(logging.StreamHandler):
        def emit(self, record):
            try:
                msg = self.format(record)
                stream = self.stream

                # Try multiple encoding strategies
                try:
                    # First try: direct UTF-8 write to buffer
                    if hasattr(stream, "buffer"):
                        stream.buffer.write(msg.encode("utf-8"))
                        stream.buffer.write(b"\n")
                        stream.buffer.flush()
                        return
                except:
                    pass

                try:
                    # Second try: encode as UTF-8 and decode as ASCII with replacement
                    safe_msg = msg.encode("utf-8", errors="replace").decode(
                        "ascii", errors="replace"
                    )
                    stream.write(safe_msg + "\n")
                    return
                except:
                    pass

                try:
                    # Third try: remove non-ASCII characters
                    safe_msg = "".join(char for char in msg if ord(char) < 128)
                    stream.write(safe_msg + "\n")
                    return
                except:
                    pass

                # Final fallback: write raw message and hope for the best
                stream.write(msg + "\n")

            except Exception:
                # If all else fails, try the parent's emit method
                try:
                    super().emit(record)
                except:
                    # Last resort: write a simple error message
                    try:
                        stream.write(
                            f"Logging error for {record.levelname}: {record.getMessage()}\n"
                        )
                    except:
                        pass

    # Create logs directory
    log_dir = Path("logs")
    log_dir.mkdir(exist_ok=True)

    # Create log filename with timestamp
    from datetime import datetime

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    log_file = log_dir / f"build_{timestamp}.log"

    # Set up logging configuration
    log_level = getattr(logging, config_manager.build_config.get("log_level", "INFO"))
    log_format = config_manager.build_config.get(
        "log_format", "%(levelname)s - %(message)s"
    )

    # Create formatters
    console_formatter = logging.Formatter("%(levelname)s - %(message)s")
    file_formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    # Set up root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)

    # Clear existing handlers
    root_logger.handlers.clear()

    # Console handler (clean output)
    console_handler = UnicodeStreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(console_formatter)
    # Don't add Unicode filter to console handler - it corrupts the actual data
    root_logger.addHandler(console_handler)

    # File handler (detailed output)
    file_handler = logging.FileHandler(log_file, encoding="utf-8")
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(file_formatter)
    # Don't add Unicode filter to file handler - it corrupts the actual data
    root_logger.addHandler(file_handler)

    # Reduce verbosity for verbose modules
    logging.getLogger("tools.core.example_generator").setLevel(logging.WARNING)
    logging.getLogger("tools.core.verb_conjugation").setLevel(logging.WARNING)

    # Add debug logging for preverb issues
    preverb_logger = logging.getLogger("tools.preverb_debug")
    preverb_logger.setLevel(logging.INFO)

    logger.info(f"Logging set up - console: INFO, file: DEBUG ({log_file})")
    logger.info("Debug logging enabled for preverb display issues")


def main():
    """Main function to build the HTML file."""
    # Parse command line arguments
    args = parse_arguments()

    # Determine build mode
    build_mode = "reference" if args.reference else "production"

    logger.info(f"🚀 Starting {build_mode} build process...")

    # Initialize configuration manager with build mode
    config_manager = ConfigManager(build_mode=build_mode)

    # Set up logging using configuration
    setup_logging(config_manager)

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
    if build_mode == "reference":
        reference_config = config_manager.get_setting(
            "reference_config", "reference_verbs"
        )
        verbs, duplicate_primary_verbs = data_loader.load_reference_verbs(
            reference_config
        )
        logger.info(f"🔧 Reference mode: Loaded {len(verbs)} verbs for reference build")
    else:
        verbs, duplicate_primary_verbs = data_loader.load_json_data()
        logger.info(
            f"🏭 Production mode: Loaded {len(verbs)} verbs for production build"
        )

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
