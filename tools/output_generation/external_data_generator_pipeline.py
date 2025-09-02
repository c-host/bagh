"""
External Data Generator for Pipeline Architecture - Reads from processed data instead of calling example generation methods.
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)


class ExternalDataGeneratorPipeline:
    """External Data Generator that uses processed data from the pipeline instead of calling example generation methods."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        # Use ConfigManager for path management
        from tools.utils.config_manager import ConfigManager

        self.config = ConfigManager(project_root)
        self.dist_data_dir = self.config.get_path("dist_data_dir")
        self.dist_data_dir.mkdir(parents=True, exist_ok=True)

    def generate_external_data_from_processed_data(self, processed_verbs: Dict) -> bool:
        """
        Generate external data files from processed verb data instead of calling example generation methods.

        Args:
            processed_verbs: Dictionary of processed verb data from the pipeline

        Returns:
            bool: True if successful, False otherwise
        """
        if not processed_verbs:
            logger.warning("No processed verbs provided for external data generation")
            return False

        logger.info(
            f"Generating external data from {len(processed_verbs)} processed verbs"
        )

        try:
            # Generate data for each verb
            for verb_id, processed_verb in processed_verbs.items():
                try:
                    self._generate_verb_external_data(verb_id, processed_verb)
                    logger.debug(f"Generated external data for verb {verb_id}")
                except Exception as e:
                    logger.error(
                        f"Failed to generate external data for verb {verb_id}: {e}"
                    )
                    # Continue with other verbs instead of failing completely
                    continue

            # Generate the main verbs index file
            self._generate_verbs_index(processed_verbs)

            logger.info("✅ External data generation completed successfully")
            return True

        except Exception as e:
            logger.error(f"❌ External data generation failed: {e}")
            return False

    def _generate_verb_external_data(self, verb_id: str, processed_verb: Dict):
        """Generate external data for a single verb using processed data."""
        base_data = processed_verb["base_data"]
        generated_data = processed_verb["generated_data"]
        preverb_config = base_data.get("preverb_config", {})
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

        if has_multiple_preverbs:
            # Multi-preverb verb - generate data for each preverb
            self._generate_multi_preverb_external_data(
                verb_id, base_data, generated_data
            )
        else:
            # Single-preverb verb - generate simple data
            self._generate_single_preverb_external_data(
                verb_id, base_data, generated_data
            )

    def _generate_single_preverb_external_data(
        self, verb_id: str, base_data: Dict, generated_data: Dict
    ):
        """Generate external data for single-preverb verbs."""
        # Create the external data structure
        external_data = {
            "id": base_data.get("id"),
            "georgian": base_data.get("georgian"),
            "description": base_data.get("description"),
            "category": base_data.get("category"),
            "class": base_data.get("class"),
            "semantic_key": base_data.get("semantic_key"),
            "notes": base_data.get("notes"),
            "url": base_data.get("url"),
            "global_argument_pattern": base_data.get("global_argument_pattern"),
            "valency": base_data.get("valency", {}),
            "syntax": base_data.get("syntax", {}),
            "english_translations": base_data.get("english_translations", {}),
            "conjugations": base_data.get("conjugations", {}),
            "preverb_config": base_data.get("preverb_config", {}),
            "preverb_rules": base_data.get("preverb_rules", {}),
            "examples": generated_data.get("examples", {}),
            "gloss_analysis": generated_data.get("gloss_analysis", {}),
            "preverb_forms": generated_data.get("preverb_forms", {}),
        }

        # Write to file
        output_file = self.dist_data_dir / f"verb_{verb_id}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(external_data, f, ensure_ascii=False, indent=2)

        logger.debug(
            f"Generated external data for single-preverb verb {verb_id}: {output_file}"
        )

    def _generate_multi_preverb_external_data(
        self, verb_id: str, base_data: Dict, generated_data: Dict
    ):
        """Generate external data for multi-preverb verbs."""
        # Create the external data structure
        external_data = {
            "id": base_data.get("id"),
            "georgian": base_data.get("georgian"),
            "description": base_data.get("description"),
            "category": base_data.get("category"),
            "class": base_data.get("class"),
            "semantic_key": base_data.get("semantic_key"),
            "notes": base_data.get("notes"),
            "url": base_data.get("url"),
            "global_argument_pattern": base_data.get("global_argument_pattern"),
            "valency": base_data.get("valency", {}),
            "syntax": base_data.get("syntax", {}),
            "english_translations": base_data.get("english_translations", {}),
            "conjugations": base_data.get("conjugations", {}),
            "preverb_config": base_data.get("preverb_config", {}),
            "preverb_rules": base_data.get("preverb_rules", {}),
            "examples": generated_data.get("examples", {}),
            "gloss_analysis": generated_data.get("gloss_analysis", {}),
            "preverb_forms": generated_data.get("preverb_forms", {}),
        }

        # Write to file
        output_file = self.dist_data_dir / f"verb_{verb_id}.json"
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(external_data, f, ensure_ascii=False, indent=2)

        logger.debug(
            f"Generated external data for multi-preverb verb {verb_id}: {output_file}"
        )

    def _generate_verbs_index(self, processed_verbs: Dict):
        """Generate the main verbs index file."""
        index_data = {"total_verbs": len(processed_verbs), "verbs": {}}

        for verb_id, processed_verb in processed_verbs.items():
            base_data = processed_verb["base_data"]
            preverb_config = base_data.get("preverb_config", {})
            has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

            # Create index entry
            index_entry = {
                "id": base_data.get("id"),
                "georgian": base_data.get("georgian"),
                "description": base_data.get("description"),
                "category": base_data.get("category"),
                "class": base_data.get("class"),
                "semantic_key": base_data.get("semantic_key"),
                "has_multiple_preverbs": has_multiple_preverbs,
                "available_preverbs": preverb_config.get("available_preverbs", []),
                "default_preverb": preverb_config.get("default_preverb", ""),
                "global_argument_pattern": base_data.get("global_argument_pattern", ""),
                "url": base_data.get("url", ""),
                "data_file": f"verb_{verb_id}.json",
            }

            index_data["verbs"][verb_id] = index_entry

        # Write index file
        index_file = self.dist_data_dir / "verbs_index.json"
        with open(index_file, "w", encoding="utf-8") as f:
            json.dump(index_data, f, ensure_ascii=False, indent=2)

        logger.info(f"Generated verbs index: {index_file}")

    def get_generated_files_info(self) -> Dict:
        """Get information about generated external data files."""
        if not self.dist_data_dir.exists():
            return {"exists": False, "count": 0, "files": []}

        try:
            json_files = list(self.dist_data_dir.glob("*.json"))
            files_info = []

            for json_file in json_files:
                try:
                    size = json_file.stat().st_size
                    files_info.append(
                        {
                            "filename": json_file.name,
                            "size": size,
                            "path": str(json_file),
                        }
                    )
                except Exception as e:
                    logger.warning(f"Could not get info for {json_file}: {e}")

            return {
                "exists": True,
                "count": len(files_info),
                "files": files_info,
                "directory": str(self.dist_data_dir),
            }

        except Exception as e:
            return {"exists": True, "error": str(e)}
