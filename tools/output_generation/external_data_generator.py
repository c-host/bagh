"""
External Data Generator that uses processed data from the pipeline.
Generates JSON for multi-preverb verbs.
"""

import json
import logging
from pathlib import Path
from typing import Dict, List, Optional

logger = logging.getLogger(__name__)


class ExternalDataGenerator:
    """External Data Generator that uses processed data from the pipeline."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        # Use ConfigManager for path management
        from tools.utils.config_manager import ConfigManager

        self.config = ConfigManager(project_root)
        self.dist_data_dir = self.config.get_path("dist_data_dir")
        self.dist_data_dir.mkdir(parents=True, exist_ok=True)
        self.generated_files = []

        # Import HTML generator to reuse its formatting functions
        from tools.output_generation.html_generator import HTMLGenerator

        self.html_generator = HTMLGenerator(project_root)

    def generate_external_data_from_processed_data(self, processed_verbs: Dict) -> bool:
        """
        Generate external data only for multi-preverb verbs.

        Args:
            processed_verbs: Dictionary of processed verb data

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info(
                "🔄 Starting external data generation for multi-preverb verbs..."
            )

            # Filter to only multi-preverb verbs
            multi_preverb_verbs = {
                verb_id: verb_data
                for verb_id, verb_data in processed_verbs.items()
                if verb_data.get("base_data", {})
                .get("preverb_config", {})
                .get("has_multiple_preverbs", False)
            }

            logger.info(
                f"📊 Found {len(multi_preverb_verbs)} multi-preverb verbs requiring external data"
            )

            if not multi_preverb_verbs:
                logger.info("ℹ️ No multi-preverb verbs found - no external data needed")
                return True

            # Generate external data for each multi-preverb verb
            for verb_id, processed_verb in multi_preverb_verbs.items():
                self._generate_verb_external_data(verb_id, processed_verb)

            logger.info(
                f"✅ External data generation completed for {len(multi_preverb_verbs)} verbs"
            )
            return True

        except Exception as e:
            logger.error(f"❌ Error during external data generation: {e}")
            return False

    def _generate_verb_external_data(self, verb_id: str, processed_verb: Dict):
        """
        Generate external data for a single multi-preverb verb.

        Args:
            verb_id: The verb ID
            processed_verb: The processed verb data
        """
        try:
            logger.info(f"  📝 Generating external data for verb {verb_id}")

            # Extract base verb data
            base_data = processed_verb.get("base_data", {})
            generated_data = processed_verb.get("generated_data", {})

            # Generate optimized external data structure
            external_data = self._generate_optimized_external_data(
                base_data, generated_data
            )

            # Write to file
            output_file = self.dist_data_dir / f"verb_{verb_id}.json"
            with open(output_file, "w", encoding="utf-8") as f:
                json.dump(external_data, f, ensure_ascii=False, indent=2)

            self.generated_files.append(output_file)
            logger.info(f"    ✅ Generated {output_file.name}")

        except Exception as e:
            logger.error(
                f"    ❌ Error generating external data for verb {verb_id}: {e}"
            )

    def _generate_optimized_external_data(
        self, base_data: Dict, generated_data: Dict
    ) -> Dict:
        """
        Generate optimized external data structure with only essential information.

        Args:
            base_data: Base verb data
            generated_data: Generated verb data

        Returns:
            Dict: Optimized external data structure
        """
        # Only include essential data for runtime preverb switching
        external_data = {
            "id": base_data.get("id"),
            "semantic_key": base_data.get("semantic_key"),
            "preverb_config": base_data.get("preverb_config", {}),
            # Pre-generated HTML for gloss and examples (conjugations stay as-is)
            "preverb_content": {},
        }

        # Generate HTML for each preverb variant
        available_preverbs = base_data.get("preverb_config", {}).get(
            "available_preverbs", []
        )

        for preverb in available_preverbs:
            # Get conjugations from generated_data.preverb_forms (where the data is stored)
            conjugations = generated_data.get("preverb_forms", {}).get(preverb, {})

            if not conjugations:
                logger.warning(
                    f"No conjugations found for preverb '{preverb}' in verb {base_data.get('id')}"
                )

            external_data["preverb_content"][preverb] = {
                "conjugations": conjugations,
                # Generate HTML for gloss analysis
                "gloss_analysis": self._generate_gloss_html(generated_data, preverb),
                # Generate HTML for examples
                "examples": self._generate_examples_html(generated_data, preverb),
            }

        return external_data

    def _generate_gloss_html(self, generated_data: Dict, preverb: str) -> Dict:
        """
        Generate HTML for gloss analysis with proper markup.

        Args:
            generated_data: Generated verb data
            preverb: The preverb variant

        Returns:
            Dict: HTML for gloss analysis per tense
        """
        gloss_html = {}

        # Get gloss data for this preverb
        gloss_data = generated_data.get("gloss_analysis", {}).get(preverb, {})

        for tense, tense_data in gloss_data.items():
            if not tense_data:
                continue

            # Generate HTML for this tense's gloss analysis
            gloss_html[tense] = self._format_gloss_analysis_html(tense_data)

        return gloss_html

    def _generate_examples_html(self, generated_data: Dict, preverb: str) -> Dict:
        """
        Generate HTML for examples with proper markup.

        Args:
            generated_data: Generated verb data
            preverb: The preverb variant

        Returns:
            Dict: Dictionary mapping tenses to lists of example HTML strings
        """
        examples_html = {}

        # Get examples data for this preverb
        examples_data = generated_data.get("examples", {}).get(preverb, {})

        # Handle case where examples might be nested differently
        if not examples_data and generated_data.get("examples", {}).get("default"):
            examples_data = generated_data.get("examples", {}).get("default", {})

        for tense, tense_examples in examples_data.items():
            if not tense_examples:
                continue

            # Generate HTML for this tense's examples (now returns a list)
            examples_html[tense] = self._format_examples_html(tense_examples)

        return examples_html

    def _format_gloss_analysis_html(self, gloss_data: Dict) -> Dict:
        """
        Format gloss analysis data into HTML using the same method as html_generator.
        This ensures consistent styling between static and external data.

        Args:
            gloss_data: Gloss analysis data for a specific tense

        Returns:
            Dict: Structured gloss analysis object with type, raw_gloss, and html fields
        """
        try:
            if not gloss_data:
                return ""

            # Use the same HTML generation method as html_generator
            # We need to pass verb_id and tense, but we don't have them here
            # So we'll use placeholder values
            gloss_html = self.html_generator._format_gloss_analysis_from_processed_data(
                gloss_data, "external", "external"
            )

            # Create structured gloss analysis object with metadata
            gloss_obj = {
                "type": "gloss_analysis",
                "raw_gloss": gloss_data.get("raw_gloss", ""),
                "html": gloss_html,
            }

            return gloss_obj

        except Exception as e:
            logger.error(f"Error formatting gloss analysis: {e}")
            return f'<div class="error">Error formatting gloss analysis: {e}</div>'

    def _format_examples_html(self, examples: List[Dict]) -> List[Dict]:
        """
        Format examples data into HTML using the same method as html_generator.
        This ensures consistent styling between static and external data.

        Args:
            examples: List of examples for a specific tense

        Returns:
            List[Dict]: List of structured example objects with type, person, and html fields
        """
        try:
            if not examples:
                return []

            # Use the same HTML generation method as html_generator
            examples_html = self.html_generator._format_examples_from_processed_data(
                examples
            )

            # Parse the HTML to extract individual examples
            # The HTML format is: <div class="examples"><h4>Examples:</h4><ul><li class="example-item">...</li>...</ul></div>
            import re

            # Extract the content between <ul> and </ul>
            ul_match = re.search(r"<ul>(.*?)</ul>", examples_html, re.DOTALL)
            if not ul_match:
                return []

            li_content = ul_match.group(1)

            # Split by <li class="example-item"> to get individual examples
            li_parts = re.split(r'<li class="example-item">', li_content)
            li_parts = [part for part in li_parts if part.strip()]  # Remove empty parts

            example_html_list = []
            for i, li_part in enumerate(li_parts, 1):
                # Keep the full <li class="example-item"> structure
                clean_html = f'<li class="example-item">{li_part.replace("</li>", "").strip()}</li>'

                # Extract person from the example data
                person = (
                    examples[i - 1].get("person", "") if i - 1 < len(examples) else ""
                )

                # Create structured example object with metadata
                example_obj = {
                    "type": self._get_example_type(
                        i,
                        person,
                        (
                            examples[i - 1].get("georgian", "")
                            if i - 1 < len(examples)
                            else ""
                        ),
                    ),
                    "person": person,
                    "html": clean_html,
                }

                example_html_list.append(example_obj)

            return example_html_list

        except Exception as e:
            logger.error(f"Error formatting examples: {e}")
            return [f'<div class="error">Error formatting examples: {e}</div>']

    def get_generated_files_info(self) -> Dict:
        """
        Get information about generated external data files.

        Returns:
            Dict: Information about generated files
        """
        return {
            "total_files": len(self.generated_files),
            "files": [str(f) for f in self.generated_files],
            "dist_data_dir": str(self.dist_data_dir),
        }

    def _get_example_type(self, index: int, person: str, georgian_text: str) -> str:
        """
        Generate a meaningful type name for an example.

        Args:
            index: Example index (1-based)
            person: Person/grammatical person
            georgian_text: Georgian text for context

        Returns:
            str: Descriptive type name
        """
        # Base types based on person
        person_types = {
            "1sg": "first_person_singular",
            "1pl": "first_person_plural",
            "2sg": "second_person_singular",
            "2pl": "second_person_plural",
            "3sg": "third_person_singular",
            "3pl": "third_person_plural",
        }

        base_type = person_types.get(person, "unknown_person")

        # Add context if available
        if georgian_text:
            # Simple heuristic: if it contains certain words, add context
            if "მივ" in georgian_text or "ვი" in georgian_text:
                return f"{base_type}_with_preverb"
            elif "იწვევ" in georgian_text:
                return f"{base_type}_basic_form"
            else:
                return f"{base_type}_standard"

        return base_type
