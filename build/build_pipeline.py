#!/usr/bin/env python3
"""
Two-Stage Pipeline Build Process for Georgian Verb Website
"""

import argparse
import logging
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

# Add the project root to the Python path
sys.path.insert(0, str(Path(__file__).parent.parent))

# Import and setup Unicode console utilities BEFORE any logging
from build.utils.unicode_console import (
    setup_unicode_console,
    force_utf8_environment,
    configure_logging_unicode,
    force_utf8_on_all_loggers,
)

# Setup Unicode console first
setup_unicode_console()
force_utf8_environment()

from build.data_processing.verb_data_processor import VerbDataProcessor
from build.data_processing.processed_data_manager import ProcessedDataManager
from build.output_generation.html_generator import HTMLGenerator
from build.output_generation.split_processed_verbs import (
    VerbDataSplitter,
)
from build.data_extraction.verb_data_loader import VerbDataLoader
from build.output_generation.asset_manager import AssetManager
from build.output_generation.html_index_file_writer import HTMLIndexFileWriter
from build.utils.config_manager import ConfigManager

logger = logging.getLogger(__name__)

APP_DIRS = {
    "bagh": Path("apps") / "bagh",
    "morphology_chart": Path("apps") / "morphology-chart",
    "preverb_cube": Path("apps") / "preverb-cube",
}

DIST_ASSEMBLY_RULES = {
    "morphology_chart": {
        "app_files": ["index.html", "styles.css", "app.js"],
        "charts_file": Path("data") / "charts.json",
    },
    "preverb_cube": {
        "app_dist_subdir": Path("dist"),
        "lib_dist_subdir": Path("dist-lib"),
        "profile_map": Path("data") / "verb-profile-map.json",
    },
}


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

        # Build and sync preverb-cube assets for full-page and embeds.
        print("🔧 About to sync preverb cube assets...")
        try:
            sync_preverb_cube_assets(config_manager)
            print("🔧 Preverb cube assets sync completed")
        except Exception as e:
            print(f"💥 Preverb cube asset sync failed: {e}")
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


def apply_public_dist_marker_to_morphology_index(dist_index_path: Path) -> None:
    """
    Tag dist morphology-chart/index.html so bundled CSS hides maintainer-only
    panels (review queue, ENA/NPLG pipeline) and shows the maintainer hint.
    """
    text = dist_index_path.read_text(encoding="utf-8")
    if 'data-verb-website-dist="1"' in text:
        return
    needle = '<html lang="en">'
    replacement = '<html lang="en" data-verb-website-dist="1">'
    if needle not in text:
        logger.warning(
            "Expected %r in morphology index.html; public-dist marker not applied (%s).",
            needle,
            dist_index_path,
        )
        return
    dist_index_path.write_text(text.replace(needle, replacement, 1), encoding="utf-8")
    logger.info("✅ Marked morphology dist index as public bundle (%s)", dist_index_path)


def sync_morphology_chart_data(config_manager: ConfigManager):
    """
    Copy morphology chart app and canonical chart data into dist.
    """
    project_root = config_manager.get_path("project_root")
    morphology_root = project_root / APP_DIRS["morphology_chart"]
    source_file = morphology_root / DIST_ASSEMBLY_RULES["morphology_chart"]["charts_file"]

    if not source_file.exists():
        logger.warning(f"⚠️ Morphology source charts file not found: {source_file}")
        return

    dist_target_dir = config_manager.get_path("dist_data_dir") / "morphology"
    dist_target_dir.mkdir(parents=True, exist_ok=True)

    dist_target_file = dist_target_dir / "charts.json"

    shutil.copy2(source_file, dist_target_file)
    logger.info(f"✅ Synced morphology charts to {dist_target_file}")

    # Also copy the morphology-chart viewer app itself so verb-website can embed
    # the exact same draggable canvas implementation in iframes.
    dist_morphology_app_dir = config_manager.get_path("dist_dir") / "morphology-chart"
    dist_morphology_data_dir = dist_morphology_app_dir / "data"
    dist_morphology_app_dir.mkdir(parents=True, exist_ok=True)
    dist_morphology_data_dir.mkdir(parents=True, exist_ok=True)

    app_files = DIST_ASSEMBLY_RULES["morphology_chart"]["app_files"]
    for app_file_name in app_files:
        app_source = morphology_root / app_file_name
        if not app_source.exists():
            logger.warning(f"⚠️ Missing morphology app file: {app_source}")
            continue
        app_target = dist_morphology_app_dir / app_file_name
        shutil.copy2(app_source, app_target)
        logger.info(f"✅ Synced morphology app file to {app_target}")

    dist_index = dist_morphology_app_dir / "index.html"
    if dist_index.is_file():
        apply_public_dist_marker_to_morphology_index(dist_index)

    dist_morphology_charts = dist_morphology_data_dir / "charts.json"
    shutil.copy2(source_file, dist_morphology_charts)
    logger.info(f"✅ Synced morphology app data to {dist_morphology_charts}")

    # Safety: never publish pipeline working data in dist bundles.
    dist_work_dirs = [
        config_manager.get_path("dist_data_dir") / "morphology" / "work",
        dist_morphology_data_dir / "work",
    ]
    for work_dir in dist_work_dirs:
        if work_dir.exists():
            shutil.rmtree(work_dir)
            logger.info(f"🧹 Removed non-public morphology work data: {work_dir}")


def sync_preverb_cube_assets(config_manager: ConfigManager):
    """
    Build preverb-cube and copy both standalone app and library assets into dist.
    """
    project_root = config_manager.get_path("project_root")
    preverb_root = project_root / APP_DIRS["preverb_cube"]
    if not preverb_root.exists():
        logger.warning(f"⚠️ Preverb cube directory not found: {preverb_root}")
        return

    env = os.environ.copy()
    # Use relative asset paths so preverb-cube works from any deployment base path.
    env["VITE_BASE"] = "./"
    npm_executable = "npm.cmd" if os.name == "nt" else "npm"
    try:
        subprocess.run(
            [npm_executable, "run", "build:all"], cwd=preverb_root, env=env, check=True
        )
    except Exception as build_error:
        logger.warning(
            f"⚠️ Could not build preverb-cube assets automatically: {build_error}"
        )
        logger.warning(
            "⚠️ Falling back to existing preverb-cube dist artifacts if available."
        )

    dist_dir = config_manager.get_path("dist_dir")
    preverb_app_source = preverb_root / DIST_ASSEMBLY_RULES["preverb_cube"]["app_dist_subdir"]
    preverb_lib_source = preverb_root / DIST_ASSEMBLY_RULES["preverb_cube"]["lib_dist_subdir"]
    preverb_app_target = dist_dir / "preverb-cube"
    preverb_lib_target = dist_dir / "preverb-cube-lib"

    if not preverb_app_source.exists() or not preverb_lib_source.exists():
        logger.warning(
            "⚠️ Missing preverb-cube build outputs (dist and/or dist-lib); skipping sync."
        )
        return

    if preverb_app_target.exists():
        shutil.rmtree(preverb_app_target)
    if preverb_lib_target.exists():
        shutil.rmtree(preverb_lib_target)

    shutil.copytree(preverb_app_source, preverb_app_target)
    shutil.copytree(preverb_lib_source, preverb_lib_target)
    logger.info(f"✅ Synced preverb cube app to {preverb_app_target}")
    logger.info(f"✅ Synced preverb cube lib to {preverb_lib_target}")

    map_source = preverb_root / DIST_ASSEMBLY_RULES["preverb_cube"]["profile_map"]
    if map_source.exists():
        map_target_dir = config_manager.get_path("dist_data_dir") / "preverb-cube"
        map_target_dir.mkdir(parents=True, exist_ok=True)
        map_target = map_target_dir / "verb-profile-map.json"
        shutil.copy2(map_source, map_target)
        logger.info(f"✅ Synced preverb profile map to {map_target}")
    else:
        logger.warning(f"⚠️ Missing preverb profile map: {map_source}")


if __name__ == "__main__":
    # Set UTF-8 encoding for Windows compatibility
    import sys

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
