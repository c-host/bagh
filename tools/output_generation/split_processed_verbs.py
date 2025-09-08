#!/usr/bin/env python3
"""
Split processed_verbs.json into individual verb files for dynamic loading.

This script takes the large processed_verbs.json file and splits it into:
1. A lightweight verbs-index.json with metadata for all verbs
2. Individual verb files in /data/verbs/ directory

Usage:
    python tools/output_generation/split_processed_verbs.py
"""

import json
import logging
import os
from pathlib import Path
from typing import Dict, List

logger = logging.getLogger(__name__)


class VerbDataSplitter:
    """Splits processed verbs into individual files for dynamic loading."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.generated_files = []

    def split_processed_verbs(self, processed_verbs: Dict) -> bool:
        """
        Split the large processed_verbs dictionary into individual files.

        Args:
            processed_verbs: Dictionary of processed verb data

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("🔄 Starting verb data splitting...")

            # Paths
            output_dir = self.project_root / "dist" / "data"
            verbs_dir = output_dir / "verbs"

            # Create output directories
            verbs_dir.mkdir(parents=True, exist_ok=True)

            logger.info(f"📊 Found {len(processed_verbs)} verbs to split")

            # Create verb index
            verb_index = {"verbs": []}

            # Split each verb
            for verb_id, verb_data in processed_verbs.items():
                logger.info(f"  📝 Processing verb {verb_id}...")

                # Extract metadata for index
                base_data = verb_data.get("base_data", {})
                preverb_config = base_data.get("preverb_config", {})

                verb_metadata = {
                    "id": int(verb_id),
                    "semantic_key": base_data.get("semantic_key", ""),
                    "georgian": base_data.get("georgian", ""),
                    "description": base_data.get("description", ""),
                    "category": base_data.get("category", ""),
                    "class": base_data.get("class", ""),
                    "has_multiple_preverbs": preverb_config.get(
                        "has_multiple_preverbs", False
                    ),
                    "default_preverb": preverb_config.get("default_preverb", ""),
                    "available_preverbs": preverb_config.get("available_preverbs", []),
                    "file_size": "0KB",  # Updated after file creation
                }

                # Create individual verb file
                verb_file = verbs_dir / f"{verb_id}.json"
                with open(verb_file, "w", encoding="utf-8") as f:
                    json.dump(verb_data, f, ensure_ascii=False, indent=2)

                # Get file size
                file_size = verb_file.stat().st_size
                verb_metadata["file_size"] = f"{file_size // 1024}KB"

                verb_index["verbs"].append(verb_metadata)
                self.generated_files.append(verb_file)

                logger.info(
                    f"    ✅ Created {verb_file.name} ({verb_metadata['file_size']})"
                )

            # Save verb index
            index_file = output_dir / "verbs-index.json"
            with open(index_file, "w", encoding="utf-8") as f:
                json.dump(verb_index, f, ensure_ascii=False, indent=2)

            self.generated_files.append(index_file)

            logger.info(f"📋 Created verb index: {index_file.name}")
            logger.info(f"📊 Total verbs: {len(verb_index['verbs'])}")
            logger.info(
                f"📁 Individual verb files: {len(list(verbs_dir.glob('*.json')))}"
            )

            # Calculate total size
            total_size = sum(f.stat().st_size for f in verbs_dir.glob("*.json"))
            index_size = index_file.stat().st_size
            logger.info(f"💾 Total size: {(total_size + index_size) // 1024}KB")

            if len(processed_verbs) > 0:
                logger.info(
                    f"📊 Average verb size: {total_size // len(processed_verbs) // 1024}KB"
                )

            logger.info("✅ Verb data splitting completed successfully")
            return True

        except Exception as e:
            logger.error(f"❌ Error during verb data splitting: {e}")
            return False

    def get_generated_files_info(self) -> Dict:
        """
        Get information about generated files.

        Returns:
            Dict: Information about generated files
        """
        return {
            "total_files": len(self.generated_files),
            "files": [str(f) for f in self.generated_files],
        }


def split_processed_verbs():
    """Split the large processed_verbs.json into individual files."""

    # Paths
    input_file = Path("src/data/processed_data/processed_verbs.json")
    output_dir = Path("dist/data")
    verbs_dir = output_dir / "verbs"

    # Create output directories
    verbs_dir.mkdir(parents=True, exist_ok=True)

    print(f"Loading {input_file}...")
    with open(input_file, "r", encoding="utf-8") as f:
        all_verbs = json.load(f)

    print(f"Found {len(all_verbs)} verbs")

    # Create verb index
    verb_index = {"verbs": []}

    # Split each verb
    for verb_id, verb_data in all_verbs.items():
        print(f"Processing verb {verb_id}...")

        # Extract metadata for index
        base_data = verb_data.get("base_data", {})
        preverb_config = base_data.get("preverb_config", {})

        verb_metadata = {
            "id": int(verb_id),
            "semantic_key": base_data.get("semantic_key", ""),
            "georgian": base_data.get("georgian", ""),
            "description": base_data.get("description", ""),
            "category": base_data.get("category", ""),
            "class": base_data.get("class", ""),
            "has_multiple_preverbs": preverb_config.get("has_multiple_preverbs", False),
            "default_preverb": preverb_config.get("default_preverb", ""),
            "available_preverbs": preverb_config.get("available_preverbs", []),
            "file_size": "0KB",  # Will be updated after file creation
        }

        # Create individual verb file
        verb_file = verbs_dir / f"{verb_id}.json"
        with open(verb_file, "w", encoding="utf-8") as f:
            json.dump(verb_data, f, ensure_ascii=False, indent=2)

        # Get file size
        file_size = verb_file.stat().st_size
        verb_metadata["file_size"] = f"{file_size // 1024}KB"

        verb_index["verbs"].append(verb_metadata)

        print(f"  Created {verb_file} ({verb_metadata['file_size']})")

    # Save verb index
    index_file = output_dir / "verbs-index.json"
    with open(index_file, "w", encoding="utf-8") as f:
        json.dump(verb_index, f, ensure_ascii=False, indent=2)

    print(f"\nCreated verb index: {index_file}")
    print(f"Total verbs: {len(verb_index['verbs'])}")
    print(f"Individual verb files: {len(list(verbs_dir.glob('*.json')))}")

    # Calculate total size
    total_size = sum(f.stat().st_size for f in verbs_dir.glob("*.json"))
    index_size = index_file.stat().st_size
    print(f"Total size: {(total_size + index_size) // 1024}KB")
    print(f"Index size: {index_size // 1024}KB")
    print(f"Average verb size: {total_size // len(all_verbs) // 1024}KB")


if __name__ == "__main__":
    split_processed_verbs()
