#!/usr/bin/env python3
"""
Two-Stage Pipeline Build Process for Georgian Verb Website
"""

import argparse
import logging
import shutil
import sys
import time
from pathlib import Path

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Import and setup Unicode console utilities BEFORE any logging
from tools.utils.unicode_console import (
    setup_unicode_console,
    force_utf8_environment,
    configure_logging_unicode,
    force_utf8_on_all_loggers,
)

# Setup Unicode console first
setup_unicode_console()
force_utf8_environment()

from tools.data_processing.verb_data_processor import VerbDataProcessor
from tools.data_processing.processed_data_manager import ProcessedDataManager
from tools.output_generation.html_generator import HTMLGenerator
from tools.output_generation.split_processed_verbs import (
    VerbDataSplitter,
)
from tools.data_extraction.verb_data_loader import VerbDataLoader
from tools.output_generation.asset_manager import AssetManager
from tools.output_generation.html_index_file_writer import HTMLIndexFileWriter
from tools.utils.config_manager import ConfigManager

logger = logging.getLogger(__name__)


def main():
    """Main build function with two-stage pipeline support"""
    print("🔧 Main function starting...")
    print("🔧 Setting up argument parser...")
    parser = argparse.ArgumentParser(description="Georgian Verb Pipeline Build")
    parser.add_argument(
        "--stage",
        choices=["data-processing", "output-generation", "full"],
        default="full",
        help="Build stage to run",
    )
    parser.add_argument(
        "--validate-only",
        action="store_true",
        help="Only validate data, don't generate outputs",
    )
    parser.add_argument(
        "--force-regenerate",
        action="store_true",
        help="Force regeneration even if processed data exists",
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Enable verbose logging"
    )
    parser.add_argument("--debug", action="store_true", help="Enable debug logging")
    parser.add_argument(
        "--reference", action="store_true", help="Build reference version with 2 verbs"
    )
    parser.add_argument(
        "--production",
        action="store_true",
        help="Build production version with all verbs",
    )

    args = parser.parse_args()

    print(f"🔧 Parsed arguments: {args}")
    print(f"🔧 Stage: {args.stage}")
    print(f"🔧 Reference: {args.reference}")
    print(f"🔧 Verbose: {args.verbose}")

    # Configure logging with Unicode support
    log_level = (
        logging.DEBUG
        if args.debug
        else (logging.INFO if args.verbose else logging.WARNING)
    )
    logging.basicConfig(
        level=log_level, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    # Configure all loggers for Unicode support
    configure_logging_unicode()
    force_utf8_on_all_loggers()

    # Determine build mode
    build_mode = "reference" if args.reference else "production"

    # Initialize configuration manager first
    config_manager = ConfigManager(build_mode=build_mode)
    project_root = config_manager.get_path("project_root")

    try:
        print(f"🔧 About to route to stage: {args.stage}")
        if args.stage == "data-processing":
            print("🔧 Routing to data-processing pipeline...")
            run_data_processing_pipeline(config_manager, build_mode)
        elif args.stage == "output-generation":
            print("🔧 Routing to output-generation pipeline...")
            run_output_generation_pipeline(config_manager, build_mode)
        elif args.stage == "full":
            print("🔧 Routing to full pipeline...")
            run_full_pipeline(config_manager, build_mode)
        else:
            print(f"⚠️ Unknown stage: {args.stage}")

    except Exception as e:
        logger.error(f"💥 Build failed: {e}")
        sys.exit(1)


def run_data_processing_pipeline(config_manager: ConfigManager, build_mode: str):
    """Stage 1: Process raw verb data into structured format"""
    logger.info("🔄 Starting Data Processing Pipeline...")
    start_time = time.time()

    try:
        # Get project root from config manager
        project_root = config_manager.get_path("project_root")

        # Load and validate raw data
        data_loader = VerbDataLoader(project_root)

        if build_mode == "reference":
            # For reference mode - load only first 2 verbs
            all_verbs, duplicate_primary_verbs = data_loader.load_json_data()
            # Take only first 2 verbs for reference build
            verbs = all_verbs[:2] if len(all_verbs) >= 2 else all_verbs
            logger.info(
                f"🔧 Reference mode: Loaded {len(verbs)} verbs for reference build"
            )
        else:
            verbs, duplicate_primary_verbs = data_loader.load_json_data()
            logger.info(
                f"🏭 Production mode: Loaded {len(verbs)} verbs for production build"
            )

        if not verbs:
            raise ValueError("No verbs found in data")

        logger.info(f"Loaded {len(verbs)} verbs for processing")

        # Process all verbs
        processor = VerbDataProcessor()
        processed_verbs = {}

        for i, verb in enumerate(verbs, 1):
            logger.info(
                f"Processing verb {i}/{len(verbs)}: {verb.get('georgian', 'unknown')}"
            )

            try:
                processed_verb = processor.process_verb(verb)
                processed_verbs[verb["id"]] = processed_verb
                logger.debug(f"✅ Successfully processed verb {verb['id']}")

            except Exception as e:
                logger.error(f"❌ Failed to process verb {verb.get('id')}: {e}")
                raise

        # Store processed data
        store = ProcessedDataManager(project_root)
        store.store_processed_verbs(processed_verbs)

        # Validate processed data
        validate_processed_data(processed_verbs)

        processing_time = time.time() - start_time
        logger.info("✅ Data Processing Pipeline completed successfully")
        logger.info(f"Processed {len(processed_verbs)} verbs in {processing_time:.2f}s")

    except Exception as e:
        logger.error(f"❌ Data Processing Pipeline failed: {e}")
        raise


def run_output_generation_pipeline(config_manager: ConfigManager, build_mode: str):
    """Stage 2: Generate HTML and external data from processed data"""
    print("🔧 Inside run_output_generation_pipeline function")
    print(f"🔧 Project root: {config_manager.get_path('project_root')}")
    print(f"🔧 Build mode: {build_mode}")

    logger.info("🔄 Starting Output Generation Pipeline...")
    start_time = time.time()

    try:
        print("🔧 Entering try block...")
        # Get project root from config manager
        project_root = config_manager.get_path("project_root")
        print("🔧 Project root obtained from config manager")

        # Load processed data
        print("🔧 About to initialize ProcessedDataManager...")
        try:
            store = ProcessedDataManager(project_root)
            print("🔧 ProcessedDataManager initialized successfully")
        except Exception as e:
            print(f"💥 Failed to initialize ProcessedDataManager: {e}")
            import traceback

            traceback.print_exc()
            raise

        print("🔧 About to load processed verbs...")
        try:
            processed_verbs = store.load_processed_verbs()
            print(
                f"🔧 Loaded {len(processed_verbs) if processed_verbs else 0} processed verbs"
            )
        except Exception as e:
            print(f"💥 Failed to load processed verbs: {e}")
            import traceback

            traceback.print_exc()
            raise

        if not processed_verbs:
            raise ValueError("No processed data found. Run Stage 1 first.")

        logger.info(f"Loaded {len(processed_verbs)} processed verbs")
        print(f"🔧 About to validate processed data...")

        # Validate processed data exists
        try:
            validate_processed_data_exists(processed_verbs)
            print("🔧 Processed data validation passed")
        except Exception as e:
            print(f"💥 Processed data validation failed: {e}")
            import traceback

            traceback.print_exc()
            raise

        # Generate HTML
        print("🔧 About to generate HTML...")
        logger.info("Generating HTML...")
        try:
            print("🔧 About to initialize VerbDataLoader...")
            data_loader = VerbDataLoader(project_root)
            print("🔧 VerbDataLoader initialized successfully")

            print("🔧 About to initialize HTMLGenerator...")
            html_generator = HTMLGenerator(project_root)
            print("🔧 HTMLGenerator initialized successfully")

            print("🔧 About to generate HTML content...")
            html_content = html_generator.generate_html(processed_verbs)
            print(f"🔧 HTML content generated: {len(html_content)} characters")

            print("🔧 About to write HTML output...")
            write_html_output(config_manager, html_content)
            print("🔧 HTML output written successfully")
        except Exception as e:
            print(f"💥 HTML generation failed: {e}")
            import traceback

            traceback.print_exc()
            raise

        # Split processed verbs into individual files
        print("🔧 About to split processed verbs...")
        logger.info("Splitting processed verbs into individual files...")
        try:
            print("🔧 About to initialize VerbDataSplitter...")
            verb_splitter = VerbDataSplitter(project_root)
            print("🔧 VerbDataSplitter initialized successfully")

            print("🔧 About to split processed verbs into individual files...")
            split_success = verb_splitter.split_processed_verbs(processed_verbs)
            print(f"🔧 Verb data splitting result: {split_success}")

            if not split_success:
                raise Exception("Verb data splitting failed")

        except Exception as e:
            print(f"💥 Verb data splitting failed: {e}")
            import traceback

            traceback.print_exc()
            raise

        # Copy assets
        print("🔧 About to copy assets...")
        try:
            print("🔧 About to initialize AssetManager...")
            asset_manager = AssetManager(project_root, config_manager)
            print("🔧 AssetManager initialized successfully")

            print("🔧 About to copy assets...")
            asset_success = asset_manager.copy_assets()
            print(f"🔧 Asset copying result: {asset_success}")
            if not asset_success:
                logger.warning("⚠️ Asset copying had issues, but continuing...")
        except Exception as e:
            print(f"💥 Asset copying failed: {e}")
            import traceback

            traceback.print_exc()
            raise

        # Sync morphology chart data into verb-website data paths
        print("🔧 About to sync morphology chart data...")
        try:
            sync_morphology_chart_data(config_manager)
            print("🔧 Morphology chart data sync completed")
        except Exception as e:
            print(f"💥 Morphology chart data sync failed: {e}")
            import traceback

            traceback.print_exc()
            raise

        generation_time = time.time() - start_time
        print(f"🔧 Pipeline completed in {generation_time:.2f}s")
        logger.info("✅ Output Generation Pipeline completed successfully")
        logger.info(f"Generated outputs in {generation_time:.2f}s")
        print("🔧 About to exit run_output_generation_pipeline function")

    except Exception as e:
        logger.error(f"❌ Output Generation Pipeline failed: {e}")
        raise


def run_full_pipeline(config_manager: ConfigManager, build_mode: str):
    """Run both stages in sequence"""
    logger.info("🚀 Starting Full Pipeline...")

    try:
        # Stage 1
        run_data_processing_pipeline(config_manager, build_mode)

        # Stage 2
        run_output_generation_pipeline(config_manager, build_mode)

        logger.info("🎉 Full Pipeline completed successfully!")

    except Exception as e:
        logger.error(f"💥 Full Pipeline failed: {e}")
        raise


def validate_processed_data(processed_verbs: dict):
    """Validate processed data structure and content"""
    logger.info("Validating processed data...")

    for verb_id, verb_data in processed_verbs.items():
        # Check required structure
        if "base_data" not in verb_data:
            raise ValueError(f"Verb {verb_id} missing base_data")
        if "generated_data" not in verb_data:
            raise ValueError(f"Verb {verb_id} missing generated_data")

        generated_data = verb_data["generated_data"]

        # Check examples
        if "examples" not in generated_data:
            raise ValueError(f"Verb {verb_id} missing examples")

        # Check gloss analysis
        if "gloss_analysis" not in generated_data:
            raise ValueError(f"Verb {verb_id} missing gloss_analysis")

        # Check preverb forms (may be empty for single-preverb verbs)
        if "preverb_forms" not in generated_data:
            raise ValueError(f"Verb {verb_id} missing preverb_forms")

    logger.info("✅ Processed data validation passed")


def validate_processed_data_exists(processed_verbs: dict):
    """Validate that processed data has required content"""
    if not processed_verbs:
        raise ValueError("No processed verbs found")

    # Check that at least one verb has examples
    has_examples = False
    for verb_data in processed_verbs.values():
        if verb_data.get("generated_data", {}).get("examples"):
            has_examples = True
            break

    if not has_examples:
        raise ValueError("No examples found in processed data")


def write_html_output(config_manager: ConfigManager, html_content: str):
    """Write HTML content to dist/index.html"""
    file_writer = HTMLIndexFileWriter(
        config_manager.get_path("project_root"), config_manager
    )
    write_success = file_writer.write_html_file(html_content)

    if write_success:
        logger.info(f"HTML written to {file_writer.get_output_path()}")
    else:
        raise RuntimeError("Failed to write HTML file")


def sync_morphology_chart_data(config_manager: ConfigManager):
    """
    Copy morphology chart data into src/dist data directories so runtime loading
    at data/morphology/charts.json always has current content.
    """
    project_root = config_manager.get_path("project_root")
    morphology_root = project_root / "morphology-chart"
    source_file = morphology_root / "data" / "charts.json"

    if not source_file.exists():
        fallback_source = project_root / "src" / "data" / "morphology" / "charts.json"
        if fallback_source.exists():
            source_file = fallback_source
            logger.warning(
                "⚠️ Using fallback morphology charts source at src/data/morphology/charts.json"
            )

    if not source_file.exists():
        logger.warning(f"⚠️ Morphology source charts file not found: {source_file}")
        return

    src_target_dir = project_root / "src" / "data" / "morphology"
    dist_target_dir = config_manager.get_path("dist_data_dir") / "morphology"
    src_target_dir.mkdir(parents=True, exist_ok=True)
    dist_target_dir.mkdir(parents=True, exist_ok=True)

    src_target_file = src_target_dir / "charts.json"
    dist_target_file = dist_target_dir / "charts.json"

    shutil.copy2(source_file, src_target_file)
    shutil.copy2(source_file, dist_target_file)
    logger.info(f"✅ Synced morphology charts to {src_target_file}")
    logger.info(f"✅ Synced morphology charts to {dist_target_file}")

    # Also copy the morphology-chart viewer app itself so verb-website can embed
    # the exact same draggable canvas implementation in iframes.
    dist_morphology_app_dir = config_manager.get_path("dist_dir") / "morphology-chart"
    dist_morphology_data_dir = dist_morphology_app_dir / "data"
    dist_morphology_app_dir.mkdir(parents=True, exist_ok=True)
    dist_morphology_data_dir.mkdir(parents=True, exist_ok=True)

    for app_file_name in ["index.html", "styles.css", "app.js"]:
        app_source = morphology_root / app_file_name
        if not app_source.exists():
            logger.warning(f"⚠️ Missing morphology app file: {app_source}")
            continue
        app_target = dist_morphology_app_dir / app_file_name
        shutil.copy2(app_source, app_target)
        logger.info(f"✅ Synced morphology app file to {app_target}")

    dist_morphology_charts = dist_morphology_data_dir / "charts.json"
    shutil.copy2(source_file, dist_morphology_charts)
    logger.info(f"✅ Synced morphology app data to {dist_morphology_charts}")


if __name__ == "__main__":
    # Set UTF-8 encoding for Windows compatibility
    import sys
    import os

    if sys.platform == "win32":
        os.environ["PYTHONIOENCODING"] = "utf-8"
        try:
            sys.stdout.reconfigure(encoding="utf-8")
            sys.stderr.reconfigure(encoding="utf-8")
        except:
            pass  # Fallback if reconfiguration fails

    print("🚀 Script starting...")
    try:
        main()
        print("✅ Script completed successfully")
    except Exception as e:
        print(f"💥 Script failed with error: {e}")
        import traceback

        traceback.print_exc()
