"""
External data generation module for verb-website build process.
Handles creation of external JSON data files for frontend consumption.

This module:
1. Extracts core verb data for external JSON files
2. Creates conjugation data files
3. Generates examples data files
4. Creates gloss analysis data files
5. Generates preverb configuration data files
"""

import json
import logging
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional

logger = logging.getLogger(__name__)


class ExternalDataGenerator:
    """Handles generation of external data files for frontend consumption."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.dist_dir = project_root / "dist"
        self.data_dir = self.dist_dir / "data"

        # Cache for frequently accessed data
        self._verb_cache = {}
        self._gloss_parser = None

    def _get_gloss_parser(self):
        """Lazy load gloss parser to avoid import overhead."""
        if self._gloss_parser is None:
            from tools.core.gloss_parser import GlossParser

            self._gloss_parser = GlossParser()
        return self._gloss_parser

    def _get_verb_metadata(self, verb: Dict) -> Dict:
        """Extract commonly accessed verb metadata to avoid repeated dictionary access."""
        if verb.get("id") in self._verb_cache:
            return self._verb_cache[verb.get("id")]

        preverb_config = verb.get("preverb_config", {})
        metadata = {
            "id": verb.get("id"),
            "has_multiple_preverbs": preverb_config.get("has_multiple_preverbs", False),
            "preverb_rules": verb.get("preverb_rules", {}),
            "conjugations": verb.get("conjugations", {}),
            "english_translations": verb.get("english_translations", {}),
            "preverb_translations": verb.get("preverb_translations", {}),
            "prepositions": verb.get("prepositions", {}),
            "overrides": verb.get("overrides", {}),
        }

        self._verb_cache[verb.get("id")] = metadata
        return metadata

    def _create_modified_verb_data(
        self, verb: Dict, tense: str, tense_data: Dict, effective_preverb: str = None
    ) -> Dict:
        """Create modified verb data for example generation with consistent structure."""
        metadata = self._get_verb_metadata(verb)

        return {
            "id": metadata["id"],
            "semantic_key": verb.get("semantic_key", "[]"),
            "english_translations": metadata["english_translations"],
            "conjugations": {
                tense: {
                    "forms": tense_data["forms"],
                    "examples": tense_data.get("examples", []),
                    "gloss": tense_data.get("gloss", {}),
                    "raw_gloss": tense_data.get("gloss", {}).get("raw_gloss", ""),
                    "preverb": effective_preverb
                    or tense_data.get("gloss", {}).get("preverb", ""),
                }
            },
            "preverb_translations": metadata["preverb_translations"],
            "preverb_config": verb.get("preverb_config", {}),
            "prepositions": metadata["prepositions"],
            "overrides": metadata["overrides"],
        }

    def create_core_verb_data(self, verbs: List[Dict]) -> Dict:
        """
        Extract core verb information for external JSON file.

        Args:
            verbs: List of verb dictionaries from load_json_data()

        Returns:
            dict: Core verb data organized by verb ID
        """
        core_data = {}

        for verb in verbs:
            verb_id = verb.get("id", "")
            if not verb_id:
                continue

            metadata = self._get_verb_metadata(verb)
            core_data[verb_id] = {
                "id": metadata["id"],
                "georgian": verb.get("georgian", ""),
                "description": verb.get("description", ""),
                "category": verb.get("category", ""),
                "class": verb.get("class", ""),
                "semantic_key": verb.get("semantic_key", ""),
                "notes": verb.get("notes", ""),
                "url": verb.get("url", ""),
                "has_multiple_preverbs": metadata["has_multiple_preverbs"],
                "default_preverb": verb.get("preverb_config", {}).get(
                    "default_preverb", ""
                ),
                "english_translations": metadata["english_translations"],
            }

        return {"verbs": core_data}

    def create_conjugations_data(self, verbs: List[Dict]) -> Dict:
        """
        Extract conjugation data for external JSON file.

        Args:
            verbs: List of verb dictionaries from load_json_data()

        Returns:
            dict: Conjugation data organized by verb ID
        """
        conjugations_data = {}

        for verb in verbs:
            verb_id = verb.get("id", "")
            if not verb_id:
                continue

            metadata = self._get_verb_metadata(verb)
            conjugations_data[verb_id] = metadata["conjugations"]

        return {"conjugations": conjugations_data}

    def create_examples_data(self, verbs: List[Dict]) -> Dict:
        """
        Extract examples data for external JSON file.
        For multi-preverb verbs, generates examples for each preverb.
        For single-preverb verbs, uses existing examples data.

        Args:
            verbs: List of verb dictionaries from load_json_data()

        Returns:
            dict: Examples data organized by verb ID and preverb
        """
        examples_data = {}

        for verb in verbs:
            verb_id = verb.get("id", "")
            if not verb_id:
                continue

            metadata = self._get_verb_metadata(verb)

            if metadata["has_multiple_preverbs"]:
                # Generate examples for each preverb using existing logic
                examples_by_preverb, _ = self._create_preverb_aware_examples(
                    verb, metadata["preverb_rules"]
                )
                examples_data[verb_id] = examples_by_preverb
            else:
                # Single-preverb verbs: generate examples for each tense
                examples_by_tense = {}

                for tense, tense_data in metadata["conjugations"].items():
                    if "forms" in tense_data:
                        modified_verb = self._create_modified_verb_data(
                            verb, tense, tense_data
                        )
                        examples_html = self._create_examples_without_gloss(
                            modified_verb, tense
                        )
                        if examples_html:
                            examples_by_tense[tense] = examples_html

                examples_data[verb_id] = examples_by_tense

        return {"examples": examples_data}

    def create_gloss_data(self, verbs: List[Dict]) -> Dict:
        """
        Extract gloss analysis data for external JSON file.
        For multi-preverb verbs, generates gloss analyses for each preverb.

        Args:
            verbs: List of verb dictionaries from load_json_data()

        Returns:
            dict: Gloss analysis data organized by verb ID and preverb
        """
        gloss_data = {}

        for verb in verbs:
            verb_id = verb.get("id", "")
            if not verb_id:
                continue

            metadata = self._get_verb_metadata(verb)

            if metadata["has_multiple_preverbs"]:
                # Generate gloss analyses for each preverb using existing logic
                _, gloss_analyses_by_preverb = self._create_preverb_aware_examples(
                    verb, metadata["preverb_rules"]
                )
                gloss_data[verb_id] = gloss_analyses_by_preverb
            else:
                # Single-preverb verbs: generate gloss analyses for each tense
                gloss_analyses_by_tense = {}

                for tense, tense_data in metadata["conjugations"].items():
                    if "forms" in tense_data:
                        preverb = tense_data.get("gloss", {}).get("preverb", "")
                        gloss_html = self._create_gloss_analysis_for_preverb(
                            tense_data, preverb, tense
                        )
                        if gloss_html:
                            gloss_analyses_by_tense[tense] = gloss_html

                gloss_data[verb_id] = gloss_analyses_by_tense

        return {"gloss_analyses": gloss_data}

    def create_preverb_config_data(self, verbs: List[Dict]) -> Dict:
        """
        Extract preverb configuration data for external JSON file.

        Args:
            verbs: List of verb dictionaries from load_json_data()

        Returns:
            dict: Preverb configuration data organized by verb ID
        """
        preverb_config_data = {}

        for verb in verbs:
            verb_id = verb.get("id", "")
            if not verb_id:
                continue

            metadata = self._get_verb_metadata(verb)
            preverb_config_data[verb_id] = {
                "preverb_config": verb.get("preverb_config", {}),
                "preverb_rules": metadata["preverb_rules"],
                "preverb_translations": metadata["preverb_translations"],
            }

        return {"preverb_configs": preverb_config_data}

    def _create_preverb_aware_examples(
        self, verb_data: Dict, preverb_rules: Dict
    ) -> Tuple[Dict, Dict]:
        """
        Generate examples for all preverbs, applying fallback rules for both
        Georgian forms and English translations.
        """
        examples_by_preverb = {}
        gloss_analyses_by_preverb = {}

        # Get all available preverbs
        available_preverbs = list(preverb_rules.get("replacements", {}).keys())

        for preverb in available_preverbs:
            examples_by_tense = {}
            gloss_analyses_by_tense = {}

            # Process each tense
            for tense, tense_data in verb_data.get("conjugations", {}).items():
                if "forms" in tense_data:
                    # Determine effective preverb for both forms and English translations
                    effective_preverb = preverb
                    english_fallbacks = preverb_rules.get("english_fallbacks", {})
                    if (
                        preverb in english_fallbacks
                        and tense in english_fallbacks[preverb]
                    ):
                        # Use fallback preverb for both forms and English translations
                        effective_preverb = english_fallbacks[preverb][tense]

                    # Calculate forms using the effective preverb
                    from tools.core.verb_conjugation import calculate_preverb_forms

                    calculated_forms = calculate_preverb_forms(
                        tense_data["forms"], preverb_rules, effective_preverb
                    )

                    # Create modified verb data for example generation
                    modified_verb = self._create_modified_verb_data(
                        verb_data, tense, tense_data, effective_preverb
                    )
                    modified_verb["effective_preverb"] = effective_preverb

                    # Generate examples for this tense (without gloss analysis)
                    examples_html = self._create_examples_without_gloss(
                        modified_verb, tense
                    )
                    if examples_html:
                        examples_by_tense[tense] = examples_html

                    # Generate gloss analysis for this preverb and tense
                    gloss_html = self._create_gloss_analysis_for_preverb(
                        tense_data, effective_preverb, tense
                    )
                    if gloss_html:
                        gloss_analyses_by_tense[tense] = gloss_html

            examples_by_preverb[preverb] = examples_by_tense
            gloss_analyses_by_preverb[preverb] = gloss_analyses_by_tense

        return examples_by_preverb, gloss_analyses_by_preverb

    def _create_examples_without_gloss(self, verb: Dict, tense: str) -> str:
        """Create examples HTML for a verb and tense without the gloss analysis section."""
        # Generate pedagogical examples
        try:
            from tools.core.example_generator import generate_pedagogical_examples

            enhanced_examples = generate_pedagogical_examples(verb, tense)

            # If pedagogical examples were generated successfully
            if enhanced_examples.get("enhanced", False) and enhanced_examples.get(
                "examples"
            ):
                return self._format_pedagogical_examples(enhanced_examples["examples"])

        except Exception as e:
            # Pedagogical example generation failed
            logger.warning(
                f"Pedagogical example generation failed for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )

        # Return empty string if no examples could be generated
        return ""

    def _format_pedagogical_examples(self, examples: List[Dict]) -> str:
        """Format pedagogical examples into HTML."""
        if not examples:
            return ""

        html_parts = ['<div class="examples">', "<h4>Examples:</h4>", "<ul>"]

        for example in examples:
            georgian_html = example.get("html", example.get("georgian", ""))
            english_text = example.get("english", "")
            english_plain = example.get("english_plain", "")

            if not english_plain:
                english_plain = re.sub(r"<[^>]+>", "", english_text)

            html_parts.extend(
                [
                    '<li class="example-item">',
                    f'<div class="georgian georgian-text">{georgian_html}</div>',
                    f'<div class="translation english-text" data-copy-text="{english_plain}">{english_text}</div>',
                    "</li>",
                ]
            )

        html_parts.extend(["</ul>", "</div>"])
        return "\n".join(html_parts)

    def _create_gloss_analysis_for_preverb(
        self, tense_data: Dict, preverb: str, tense: str
    ) -> str:
        """Create gloss analysis HTML for a specific preverb and tense."""
        if not isinstance(tense_data, dict):
            return ""

        # Get the raw gloss and update it with the correct preverb
        raw_gloss = tense_data.get("gloss", {}).get("raw_gloss", "")
        if not raw_gloss:
            return ""

        # Update the raw gloss to use the correct preverb
        updated_raw_gloss = re.sub(r"Pv \([^)]+\)", f"Pv ({preverb})", raw_gloss)

        # Process raw gloss to verbose format
        case_gloss = self._process_raw_gloss(updated_raw_gloss, preverb)

        if not case_gloss:
            return ""

        # Format the gloss display
        return f"""
        <div class="case-gloss">
            <div class="gloss-header">
                <strong>Verb Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="raw-gloss">
                    <strong>Raw:</strong> <code>{self._format_raw_gloss_with_colors(updated_raw_gloss)}</code>
                </div>
                <div class="expanded-gloss">
                    <strong>Expanded:</strong>
                    <div class="gloss-definitions">
                        {self._format_gloss_for_html(case_gloss)}
                    </div>
                </div>
            </div>
        </div>
    """

    def _process_raw_gloss(self, raw_gloss: str, preverb: str = None) -> str:
        """
        Process raw gloss and convert to verbose format.

        Args:
            raw_gloss: Raw gloss in GNC format
            preverb: Preverb value when Pv appears in gloss

        Returns:
            Formatted verbose gloss
        """
        if not raw_gloss:
            return ""

        parser = self._get_gloss_parser()

        # Validate preverb requirement
        if parser.validate_preverb_requirement(raw_gloss, preverb):
            # Preverb is required but not provided or empty
            if not preverb or not preverb.strip():
                logger.warning(
                    f"Preverb required for gloss containing 'Pv': {raw_gloss}"
                )
                return raw_gloss

        return parser.parse_raw_gloss(raw_gloss, preverb)

    def _format_raw_gloss_with_colors(self, raw_gloss: str) -> str:
        """
        Format raw gloss with color coding for V, S, DO, IO elements and case-marked patterns.

        Args:
            raw_gloss: Raw gloss string (e.g., "V Act Pres <S-DO> <S:Nom> <DO:Dat>")

        Returns:
            HTML-formatted raw gloss with color-coded elements
        """
        # Define color classes for different elements (order matters - longer patterns first)
        color_mapping = {
            "S:Nom": "gloss-subject",
            "S:Erg": "gloss-subject",
            "S:Dat": "gloss-subject",
            "DO:Nom": "gloss-direct-object",
            "DO:Dat": "gloss-direct-object",
            "IO:Nom": "gloss-indirect-object",
            "IO:Dat": "gloss-indirect-object",
            "V": "gloss-verb",
            "S": "gloss-subject",
            "DO": "gloss-direct-object",
            "IO": "gloss-indirect-object",
        }

        # Split the raw gloss into components
        components = raw_gloss.split()
        formatted_components = []

        for component in components:
            # Check if component contains case frame elements
            if "<" in component and ">" in component:
                # Handle case frame components like <S-DO>, <S:Nom>, etc.
                formatted_component = component
                for element, color_class in color_mapping.items():
                    if element in component:
                        # Replace the element with color-coded version
                        formatted_component = formatted_component.replace(
                            element, f'<span class="{color_class}">{element}</span>'
                        )
                formatted_components.append(formatted_component)
            elif component in color_mapping:
                # Handle standalone elements like V
                formatted_components.append(
                    f'<span class="{color_mapping[component]}">{component}</span>'
                )
            else:
                # Keep other components as-is
                formatted_components.append(component)

        return " ".join(formatted_components)

    def _format_gloss_for_html(self, case_gloss: str) -> str:
        """
        Format case gloss for HTML display with CSS classes and color coding.

        Args:
            case_gloss: Raw case gloss string

        Returns:
            HTML-formatted gloss with CSS classes and color coding
        """
        import html

        # Split into lines
        lines = case_gloss.split("\n")

        # Process each line
        formatted_lines = []
        for line in lines:
            if ":" in line:
                # Handle case frame components specially
                if line.startswith("<") and ">" in line:
                    # Case frame component like "<S-DO>: Subject, Direct Object"
                    # Find the closing > and the colon after it
                    gt_pos = line.find(">")
                    if gt_pos != -1:
                        colon_pos = line.find(":", gt_pos)
                        if colon_pos != -1:
                            # Extract the full component including angle brackets, but not the colon
                            component = line[:colon_pos]  # Don't include the colon
                            definition = line[colon_pos + 1 :].strip()

                            # Special handling for auxiliary markers
                            if component in [
                                "<AuxIntr>",
                                "<AuxTrans>",
                                "<AuxTransHum>",
                            ]:
                                # For auxiliary markers, preserve them as-is without color coding
                                color_coded_component = component
                            else:
                                # Color code the component elements (order matters - longer patterns first)
                                color_coded_component = component

                                # Handle compound patterns like S-IO, S-DO, S-DO-IO by processing individual elements
                                if "-" in component and (
                                    "S" in component
                                    or "DO" in component
                                    or "IO" in component
                                ):
                                    # Handle compound patterns with angle brackets like <S-DO-IO>
                                    if component.startswith("<") and component.endswith(
                                        ">"
                                    ):
                                        # Extract content between angle brackets
                                        inner_content = component[
                                            1:-1
                                        ]  # Remove < and >
                                        parts = inner_content.split("-")
                                        color_coded_parts = []
                                        for part in parts:
                                            if part == "S":
                                                color_coded_parts.append(
                                                    '<span class="gloss-subject">S</span>'
                                                )
                                            elif part == "DO":
                                                color_coded_parts.append(
                                                    '<span class="gloss-direct-object">DO</span>'
                                                )
                                            elif part == "IO":
                                                color_coded_parts.append(
                                                    '<span class="gloss-indirect-object">IO</span>'
                                                )
                                            else:
                                                color_coded_parts.append(part)
                                        # Reconstruct with angle brackets
                                        color_coded_component = (
                                            "<" + "-".join(color_coded_parts) + ">"
                                        )
                                    else:
                                        # Handle patterns without angle brackets
                                        parts = component.split("-")
                                        color_coded_parts = []
                                        for part in parts:
                                            if part == "S":
                                                color_coded_parts.append(
                                                    '<span class="gloss-subject">S</span>'
                                                )
                                            elif part == "DO":
                                                color_coded_parts.append(
                                                    '<span class="gloss-direct-object">DO</span>'
                                                )
                                            elif part == "IO":
                                                color_coded_parts.append(
                                                    '<span class="gloss-indirect-object">IO</span>'
                                                )
                                            else:
                                                color_coded_parts.append(part)
                                        color_coded_component = "-".join(
                                            color_coded_parts
                                        )
                                # Case-marked patterns first (longer patterns)
                                elif "S:Nom" in component:
                                    color_coded_component = (
                                        color_coded_component.replace(
                                            "S:Nom",
                                            '<span class="gloss-subject">S:Nom</span>',
                                        )
                                    )
                                elif "S:Erg" in component:
                                    color_coded_component = (
                                        color_coded_component.replace(
                                            "S:Erg",
                                            '<span class="gloss-subject">S:Erg</span>',
                                        )
                                    )
                                elif "S:Dat" in component:
                                    color_coded_component = (
                                        color_coded_component.replace(
                                            "S:Dat",
                                            '<span class="gloss-subject">S:Dat</span>',
                                        )
                                    )
                                elif "DO:Nom" in component:
                                    color_coded_component = color_coded_component.replace(
                                        "DO:Nom",
                                        '<span class="gloss-direct-object">DO:Nom</span>',
                                    )
                                elif "DO:Dat" in component:
                                    color_coded_component = color_coded_component.replace(
                                        "DO:Dat",
                                        '<span class="gloss-direct-object">DO:Dat</span>',
                                    )
                                elif "IO:Nom" in component:
                                    color_coded_component = color_coded_component.replace(
                                        "IO:Nom",
                                        '<span class="gloss-indirect-object">IO:Nom</span>',
                                    )
                                elif "IO:Dat" in component:
                                    color_coded_component = color_coded_component.replace(
                                        "IO:Dat",
                                        '<span class="gloss-indirect-object">IO:Dat</span>',
                                    )
                                # Basic patterns after case-marked patterns
                                elif "S" in component:
                                    color_coded_component = (
                                        color_coded_component.replace(
                                            "S", '<span class="gloss-subject">S</span>'
                                        )
                                    )
                                elif "DO" in component:
                                    color_coded_component = color_coded_component.replace(
                                        "DO",
                                        '<span class="gloss-direct-object">DO</span>',
                                    )
                                elif "IO" in component:
                                    color_coded_component = color_coded_component.replace(
                                        "IO",
                                        '<span class="gloss-indirect-object">IO</span>',
                                    )

                            # Don't escape the color-coded component since it contains HTML
                            formatted_line = f'<span class="gloss-component">{color_coded_component}</span><span class="gloss-definition">{definition}</span>'
                            formatted_lines.append(formatted_line)
                        else:
                            formatted_lines.append(line)
                    else:
                        formatted_lines.append(line)
                else:
                    # Regular component like "V: Verb"
                    parts = line.split(":", 1)
                    if len(parts) == 2:
                        component, definition = parts

                        # Color code the component if it's V
                        color_coded_component = component
                        if component == "V":
                            color_coded_component = '<span class="gloss-verb">V</span>'
                        else:
                            # For non-V components, escape normally
                            color_coded_component = html.escape(component)

                        # Use appropriate escaping based on whether it contains HTML
                        if component == "V":
                            formatted_line = f'<span class="gloss-component">{color_coded_component}:</span><span class="gloss-definition">{definition}</span>'
                        else:
                            formatted_line = f'<span class="gloss-component">{color_coded_component}:</span><span class="gloss-definition">{definition}</span>'
                        formatted_lines.append(formatted_line)
                    else:
                        formatted_lines.append(line)
            else:
                formatted_lines.append(line)

        # Join with single line breaks
        result = "<br>".join(formatted_lines)

        # Add visual separator before case frame components (double line break)
        # Look for the first case frame component (which will be HTML-escaped as &lt;)
        if "&lt;" in result:
            # Find the first occurrence of &lt; and add a line break before it
            # The pattern will be <br><span class="gloss-component">&lt;
            result = result.replace(
                '<br><span class="gloss-component">&lt;',
                '<br><br><span class="gloss-component">&lt;',
                1,
            )

        return result

    def generate_external_data_files(self, verbs: List[Dict]) -> bool:
        """
        Generate all external data files for verb data externalization.

        Args:
            verbs: List of verb dictionaries from load_json_data()

        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Create dist/data directory
            self.data_dir.mkdir(exist_ok=True)

            logger.info(f"Generating external data files in: {self.data_dir}")

            # Generate each data file
            data_files = [
                ("verbs-data.json", self.create_core_verb_data(verbs)),
                ("conjugations-data.json", self.create_conjugations_data(verbs)),
                ("examples-data.json", self.create_examples_data(verbs)),
                ("gloss-data.json", self.create_gloss_data(verbs)),
                ("preverb-config.json", self.create_preverb_config_data(verbs)),
            ]

            for filename, data in data_files:
                file_path = self.data_dir / filename
                with open(file_path, "w", encoding="utf-8") as f:
                    json.dump(data, f, ensure_ascii=False, indent=2)
                logger.info(f"  Generated: {filename}")

            return True

        except Exception as e:
            logger.error(f"Error generating external data files: {e}")
            return False
