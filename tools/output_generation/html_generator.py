"""

HTML Generator - Generates HTML structure with processed data

HTML generation for Georgian verb website with preverb support

"""

import html

import re

from pathlib import Path

from typing import Dict, List, Optional

import logging


from tools.data_processing.processed_data_manager import ProcessedDataManager


logger = logging.getLogger(__name__)


class ProcessedDataAccessor:
    """Helper class to handle data access patterns and reduce coupling to data structure."""

    @staticmethod
    def is_multi_preverb_structure(data_dict: Dict) -> bool:
        """Determine if data follows multi-preverb structure."""

        if not data_dict:

            return False

        first_key = list(data_dict.keys())[0]

        # For examples: "default" indicates single-preverb

        if "default" in data_dict:

            return False

        # For gloss_analysis: tense names indicate single-preverb

        tense_names = [
            "present",
            "imperfect",
            "future",
            "aorist",
            "optative",
            "imperative",
        ]

        if first_key in tense_names:

            return False

        return True

    @staticmethod
    def get_examples_data(processed_verb: Dict, tense: str) -> List[Dict]:
        """Get examples data for a specific tense, handling both single and multi-preverb structures."""

        try:

            examples = processed_verb.get("generated_data", {}).get("examples", {})

            if not examples:

                return []

            if ProcessedDataAccessor.is_multi_preverb_structure(examples):

                # Multi-preverb: use first preverb for static generation

                first_preverb = list(examples.keys())[0]

                return examples[first_preverb].get(tense, [])

            else:

                # Single-preverb: examples["default"][tense]

                return examples["default"].get(tense, [])

        except Exception as e:

            logger.error(f"Error getting examples data: {e}")

            return []

    @staticmethod
    def get_gloss_data(processed_verb: Dict, tense: str) -> Dict:
        """Get gloss data for a specific tense, handling both single and multi-preverb structures."""

        try:

            gloss_analysis = processed_verb.get("generated_data", {}).get(
                "gloss_analysis", {}
            )

            if not gloss_analysis:

                return {}

            if ProcessedDataAccessor.is_multi_preverb_structure(gloss_analysis):

                # Multi-preverb: use first preverb for static generation

                first_preverb = list(gloss_analysis.keys())[0]

                return gloss_analysis[first_preverb].get(tense, {})

            else:

                # Single-preverb: gloss_analysis[tense]

                return gloss_analysis.get(tense, {})

        except Exception as e:

            logger.error(f"Error getting gloss data: {e}")

            return {}


class HTMLGenerator:
    """

    Refactored HTML Generator that combines:

    - Rich HTML structure and UI features from html_generator.py

    - Data reading from processed pipeline data instead of calling generation functions

    - Unified preverb handling for both single and multi-preverb verbs

    """

    def __init__(self, project_root: Path):
        """

        Initialize the HTML generator.



        Args:

            project_root: Path to the project root directory

        """

        self.project_root = project_root

        self.processed_data_manager = ProcessedDataManager(project_root)
        self.gloss_reference = self._load_gloss_reference()

    def _load_gloss_reference(self) -> Dict:
        """Load gloss reference data for argument pattern mapping."""
        try:
            import json

            gloss_ref_path = (
                self.project_root
                / "src"
                / "data"
                / "references"
                / "gloss_reference.json"
            )
            if gloss_ref_path.exists():
                with open(gloss_ref_path, "r", encoding="utf-8") as f:
                    return json.load(f)
            else:
                logger.warning(f"Gloss reference file not found at {gloss_ref_path}")
                return {}
        except Exception as e:
            logger.error(f"Error loading gloss reference: {e}")
            return {}

    def create_safe_anchor_id(
        self,
        georgian_text: str,
        semantic_key: str = "",
        verb_id: str = "",
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """Create a safe anchor ID with smart disambiguation."""

        from tools.utils import create_safe_anchor_id as utils_create_safe_anchor_id

        return utils_create_safe_anchor_id(
            georgian_text, semantic_key, verb_id, duplicate_primary_verbs
        )

    def create_preverb_selector(self, verb_data: Dict, verb_id: str) -> str:
        """

        Create preverb toggle selector for verb section.

        # Generate anchor ID for verb navigation

        """

        preverb_config = verb_data.get("preverb_config", {})

        if not preverb_config.get("has_multiple_preverbs", False):

            return ""

        available_preverbs = preverb_config.get("available_preverbs", [])

        default_preverb = preverb_config.get("default_preverb", "")

        if not available_preverbs or len(available_preverbs) <= 1:

            return ""

        selector_html = '<div class="preverb-selector">'

        selector_html += '<label for="preverb-select">Preverb:</label>'

        selector_html += f'<select id="preverb-select" class="preverb-toggle" data-verb-id="{verb_id}">'

        for preverb in available_preverbs:

            selected = "selected" if preverb == default_preverb else ""

            selector_html += f'<option value="{preverb}" {selected}>{preverb}</option>'

        selector_html += "</select></div>"

        return selector_html

    def create_toc(
        self, verbs: List[Dict], duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """

        Create a table of contents with clickable links.

        # Generate anchor ID for verb navigation

        """

        toc_html = """

            <div class="toc-container" id="toc">

                <h2>Table of Contents</h2>

                <div class="toc-list">

        """

        for i, verb in enumerate(verbs, 1):

            georgian = verb.get("georgian", "N/A")

            description = verb.get("description", "N/A")

            semantic_key = verb.get("semantic_key", "")

            verb_id = verb.get("id", "")

            # Create anchor ID for this verb

            anchor_id = self.create_safe_anchor_id(
                georgian, semantic_key, verb_id, duplicate_primary_verbs
            )

            toc_html += f"""

                <div class="toc-item">

                            <span class="toc-number">{i}</span>

                    <a href="#{anchor_id}" class="toc-link">

                        <span class="georgian-text">{georgian}</span> - {description}

                        </a>

                    </div>

            """

        toc_html += """

                </div>

            </div>

        """

        return toc_html

    def generate_html(
        self, processed_verbs: Dict, duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """

        Generate the complete HTML file using processed data and template.

        # Generate complete HTML using template orchestrator



        Args:

            processed_verbs: Dictionary of processed verb data from the pipeline

            duplicate_primary_verbs: Dictionary of duplicate primary verbs



        Returns:

            Complete HTML content string

        """

        from tools.output_generation.template_orchestrator import TemplateOrchestrator

        # Initialize template orchestrator

        template_orchestrator = TemplateOrchestrator(self.project_root)

        # Generate TOC content

        try:

            processed_verbs_data = self.processed_data_manager.load_processed_verbs()

            base_verbs = []

            for verb_id, processed_verb in processed_verbs_data.items():

                base_verb = processed_verb.get("base_data", {})

                if base_verb:

                    base_verbs.append(base_verb)

            toc_content = self.generate_toc_html(base_verbs, duplicate_primary_verbs)

        except Exception as e:

            logger.error(f"Error generating TOC: {e}")

            toc_content = "<div class='error'>Error generating table of contents</div>"

        # Generate verb sections content

        verb_sections_html = self.generate_verb_sections_html(
            processed_verbs, duplicate_primary_verbs
        )

        # Generate critical CSS for above-the-fold content
        critical_css = self._generate_critical_css()

        # Combine template with generated content
        complete_html = template_orchestrator.generate_complete_page(
            toc_content=toc_content,
            verb_sections_html=verb_sections_html,
            critical_css=critical_css,
        )

        return complete_html

    def create_static_verb_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """

        Create a complete static verb section using processed data instead of calling generation functions.

        # Create static verb section from processed data



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            index: Page number index

            duplicate_primary_verbs: Dictionary of duplicate primary verbs



        Returns:

            HTML string for complete static verb section

        """

        # Check if verb has multiple preverbs

        has_multiple_preverbs = verb.get("preverb_config", {}).get(
            "has_multiple_preverbs", False
        )

        if has_multiple_preverbs:

            # Generate static content with default preverb using processed data

            return self._create_multi_preverb_static_section_from_processed_data(
                verb, processed_verb, index, duplicate_primary_verbs
            )

        else:

            # Generate complete static content using processed data

            return self._create_single_preverb_static_section_from_processed_data(
                verb, processed_verb, index, duplicate_primary_verbs
            )

    def _create_single_preverb_static_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """

        Create complete static content for single-preverb verbs using flat layout structure.

        # Create single-preverb verb section with flat layout



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            index: Page number index

            duplicate_primary_verbs: Dictionary of duplicate primary verbs



        Returns:

            HTML string for complete static verb section in flat layout

        """

        verb_id = verb.get("id", "N/A")

        georgian = verb.get("georgian", "N/A")

        description = verb.get("description", "N/A")

        semantic_key = verb.get("semantic_key", "")

        category = verb.get("category", "Unknown")

        verb_class = verb.get("class", "Unknown")

        # Get preverb configuration for single-preverb verbs

        preverb_config = verb.get("preverb_config", {})

        default_preverb = preverb_config.get("default_preverb", "")

        has_multiple_preverbs = verb.get("preverb_config", {}).get(
            "has_multiple_preverbs", False
        )

        preverb_to_use = default_preverb if has_multiple_preverbs else None

        # Generate flat layout content

        flat_overview = self._generate_flat_overview_from_processed_data(
            verb, processed_verb, preverb_to_use
        )

        flat_tenses = self._generate_flat_tenses_from_processed_data(
            verb, processed_verb, preverb_to_use
        )

        # Create complete static verb section with flat layout

        section_html = f"""

            <div class="verb-section" id="verb-{verb_id}" data-semantic-key="{semantic_key}" data-category="{category}">

                <div class="verb-header">

                    <h2 class="verb-title">

                        <span class="verb-georgian georgian-text">{georgian}</span>

                        <span class="verb-description">{description}</span>

                    </h2>


                    {f'<div class="verb-external-link"><a href="{verb.get("url", "")}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View on Lingua.ge</a></div>' if verb.get("url", "").strip() else ''}

                </div>
                
                <div class="verb-content">

                    <div class="verb-content-container">

                        {flat_overview}

                        {flat_tenses}

                    </div>

                </div>

            </div>

        """

        return section_html

    def _create_multi_preverb_static_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """

        Create static content for multi-preverb verbs using flat layout structure.

        # Create single-preverb verb section with flat layout



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            index: Page number index

            duplicate_primary_verbs: Dictionary of duplicate primary verbs



        Returns:

            HTML string for multi-preverb static verb section in flat layout

        """

        verb_id = verb.get("id", "N/A")

        georgian = verb.get("georgian", "N/A")

        description = verb.get("description", "N/A")

        semantic_key = verb.get("semantic_key", "")

        category = verb.get("category", "Unknown")

        verb_class = verb.get("class", "Unknown")

        # Get preverb configuration

        preverb_config = verb.get("preverb_config", {})

        default_preverb = preverb_config.get("default_preverb", "")

        # Add preverb selector for multi-preverb verbs

        preverb_selector = self.create_preverb_selector(verb, verb_id)

        # Generate flat layout content using default preverb

        flat_overview = self._generate_flat_overview_from_processed_data(
            verb, processed_verb, default_preverb
        )

        flat_tenses = self._generate_flat_tenses_from_processed_data(
            verb, processed_verb, default_preverb
        )

        # Create multi-preverb static verb section with flat layout

        section_html = f"""

            <div class="verb-section" id="verb-{verb_id}" data-semantic-key="{semantic_key}" data-category="{category}" data-has-multiple-preverbs="true" data-default-preverb="{default_preverb}">

                {preverb_selector}

                <div class="verb-header">

                    <h2 class="verb-title">

                        <span class="verb-georgian georgian-text">{georgian}</span>

                        <span class="verb-description">{description}</span>

                    </h2>


                    {f'<div class="verb-external-link"><a href="{verb.get("url", "")}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View on Lingua.ge</a></div>' if verb.get("url", "").strip() else ''}

                </div>
                
                <div class="verb-content">

                    <div class="verb-content-container">

                        {flat_overview}

                        {flat_tenses}

                    </div>

                </div>

            </div>

        """

        return section_html

    def _generate_overview_table_from_processed_data(
        self, verb: Dict, processed_verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """

        Generate overview table HTML using processed data instead of calling generation functions.

        # Generate overview table from processed data



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            preverb: Optional preverb for multi-preverb verbs



        Returns:

            HTML string for overview table

        """

        try:

            # Define tenses and their display names

            tenses = [
                ("present", "PRES"),
                ("imperfect", "IMPF"),
                ("future", "FUT"),
                ("aorist", "AOR"),
                ("optative", "OPT"),
                ("imperative", "IMPR"),
            ]

            # Define persons

            persons = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]

            # Check if verb has multiple preverbs

            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            # Generate table rows using processed data

            table_rows = ""

            for tense_name, tense_display in tenses:

                row_class = f"tense-{tense_name}"

                cells = f"<td>{tense_display}</td>"

                for person in persons:

                    if has_multiple_preverbs and preverb:

                        # Use processed preverb forms for multi-preverb verbs

                        form = self._get_processed_conjugation_form(
                            processed_verb, tense_name, person, preverb
                        )

                    else:

                        # Use base conjugations for single-preverb verbs

                        form = self._get_base_conjugation_form(verb, tense_name, person)

                    cells += f'<td class="georgian-text">{form}</td>'

                table_rows += f'<tr class="{row_class}">{cells}</tr>'

            overview_table = f"""

                <h3>Overview Table (Main Screves)</h3>

                <div class="table-container">

                    <table class="meta-table">

                        <thead>

                            <tr>

                                <th>Screve</th>

                                <th>1sg</th>

                                <th>2sg</th>

                                <th>3sg</th>

                                <th>1pl</th>

                                <th>2pl</th>

                                <th>3pl</th>

                            </tr>

                        </thead>

                        <tbody>

                            {table_rows}

                        </tbody>

                    </table>

                </div>

            """

            return overview_table

        except Exception as e:

            logger.warning(
                f"Failed to generate overview table for verb {verb.get('id', 'unknown')}: {e}"
            )

            return ""

    def _generate_tense_tables_from_processed_data(
        self, verb: Dict, processed_verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """

        Generate individual tense tables HTML using processed data.

        # Generate overview table from processed data



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            preverb: Optional preverb to use



        Returns:

            HTML string for all tense tables

        """

        try:

            # Define tense pairs for layout

            tense_pairs = [
                [("present", "Present Indicative"), ("imperfect", "Imperfect")],
                [("aorist", "Aorist"), ("optative", "Optative")],
                [("future", "Future"), ("imperative", "Imperative")],
            ]

            tense_tables_html = ""

            for pair_index, (tense1, tense2) in enumerate(tense_pairs, 1):

                table1 = self._generate_single_tense_table_from_processed_data(
                    verb, processed_verb, tense1[0], tense1[1], preverb
                )

                table2 = self._generate_single_tense_table_from_processed_data(
                    verb, processed_verb, tense2[0], tense2[1], preverb
                )

                tense_tables_html += f"""

                    <div class="tense-pair">

                        <div class="tense-column" data-tense="{tense1[0]}">

                            {table1}

                        </div>

                        <div class="tense-column" data-tense="{tense2[0]}">

                            {table2}

                        </div>

                    </div>

                """

            return tense_tables_html

        except Exception as e:

            logger.warning(
                f"Failed to generate tense tables for verb {verb.get('id', 'unknown')}: {e}"
            )

            return ""

    def _generate_single_tense_table_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        tense_display: str,
        preverb: Optional[str] = None,
    ) -> str:
        """

        Generate a single tense table with examples and gloss analysis using processed data.

        # Generate overview table from processed data



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            tense: Tense name

            tense_display: Display name for the tense

            preverb: Optional preverb to use



        Returns:

            HTML string for single tense table

        """

        try:

            # Get conjugation data for this tense

            conjugations = processed_verb.get("base_data", {}).get("conjugations", {})

            if tense not in conjugations:

                return ""

            # Generate conjugation table

            conjugation_table = self._generate_conjugation_table_from_processed_data(
                verb, processed_verb, tense, preverb
            )

            # Generate examples section

            examples_section = self._generate_examples_section_from_processed_data(
                verb, processed_verb, tense, preverb
            )

            # Generate gloss analysis section

            gloss_analysis = self._generate_gloss_analysis_from_processed_data(
                verb, processed_verb, tense, preverb
            )

            return f"""

                <h3>{tense_display}</h3>

                {conjugation_table}

                {examples_section}

                {gloss_analysis}

            """

        except Exception as e:

            logger.warning(
                f"Failed to generate tense table for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )

            return ""

    def _generate_conjugation_table_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        preverb: Optional[str] = None,
    ) -> str:
        """

        Generate conjugation table HTML for a specific tense using processed data.

        # Generate conjugation table from processed data



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            tense: Tense name

            preverb: Optional preverb to use



        Returns:

            HTML string for conjugation table

        """

        try:

            # Get conjugation data for this tense

            conjugations = processed_verb.get("base_data", {}).get("conjugations", {})

            if tense not in conjugations:

                return ""

            # Define persons

            persons = [
                ("1st", "1sg", "1pl"),
                ("2nd", "2sg", "2pl"),
                ("3rd", "3sg", "3pl"),
            ]

            # Check if verb has multiple preverbs

            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            # Generate table rows using processed data

            table_rows = ""

            for person_display, sg_person, pl_person in persons:

                if has_multiple_preverbs and preverb:

                    # Use processed preverb forms for multi-preverb verbs

                    sg_form = self._get_processed_conjugation_form(
                        processed_verb, tense, sg_person, preverb
                    )

                    pl_form = self._get_processed_conjugation_form(
                        processed_verb, tense, pl_person, preverb
                    )

                else:

                    # Use base conjugations for single-preverb verbs

                    sg_form = self._get_base_conjugation_form(verb, tense, sg_person)

                    pl_form = self._get_base_conjugation_form(verb, tense, pl_person)

                table_rows += f"""

                    <tr>

                        <td>{person_display}</td>

                        <td class="georgian-text">{sg_form}</td>

                        <td class="georgian-text">{pl_form}</td>

                    </tr>

                """

            return f"""

                <div class="table-container regular-table-container">

                    <table class="regular-table">

                        <thead>

                            <tr>

                                <th>Person</th>

                                <th>Singular</th>

                                <th>Plural</th>

                            </tr>

                        </thead>

                        <tbody>

                            {table_rows}

                        </tbody>

                    </table>

                </div>

            """

        except Exception as e:

            logger.warning(
                f"Failed to generate conjugation table for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )

            return ""

    def _generate_examples_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        preverb: Optional[str] = None,
    ) -> str:
        """

        Generate examples section HTML using processed data instead of calling example generation methods.



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            tense: Tense name

            preverb: Optional preverb to use



        Returns:

            HTML string for examples section

        """

        try:

            logger.info(
                f"Generating examples from processed data for verb {verb.get('id', 'unknown')}, tense {tense}, preverb {preverb}"
            )

            # Check if this is a multi-preverb verb

            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            examples = None

            if has_multiple_preverbs:

                # Generate examples for the default preverb only (static)

                default_preverb = verb.get("preverb_config", {}).get(
                    "default_preverb", ""
                )

                examples_html = ""

                logger.info(
                    f"Multi-preverb verb, generating examples for default preverb: {default_preverb}"
                )

                # Get examples from processed data for the default preverb

                examples = self._get_processed_examples(
                    processed_verb, tense, default_preverb
                )

                if examples:

                    examples_html = self._format_examples_from_processed_data(
                        examples, default_preverb
                    )

                logger.info(f"Final examples HTML length: {len(examples_html)}")

                return examples_html

            else:

                # Single preverb - get examples from processed data

                logger.info(
                    f"Single preverb verb, getting examples from processed data"
                )

                examples = self._get_processed_examples(processed_verb, tense, preverb)

                logger.info(
                    f"Retrieved examples: {len(examples) if examples else 0} examples"
                )

                if examples:

                    result = self._format_examples_from_processed_data(examples)

                    logger.info(f"Formatted examples HTML length: {len(result)}")

                    logger.info(f"Formatted examples HTML preview: {result[:200]}...")

                    return result

                else:

                    logger.warning(
                        f"No examples found in processed data for verb {verb.get('id', 'unknown')}, tense {tense}"
                    )

                    return ""

        except Exception as e:

            logger.warning(
                f"Failed to generate examples from processed data for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )

            return ""

    def _generate_gloss_analysis_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        preverb: Optional[str] = None,
    ) -> str:
        """

        Generate gloss analysis HTML using processed data instead of calling gloss parser functions.

        # Generate gloss analysis from processed data



        Args:

            verb: Base verb data dictionary

            processed_verb: Processed verb data from the pipeline

            tense: Tense name

            preverb: Optional preverb to use



        Returns:

            HTML string for gloss analysis

        """

        try:

            verb_id = verb.get("id", "unknown")

            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            logger.info(
                f"[GLOSS] Generating gloss from processed data for verb {verb_id}, tense {tense}, preverb {preverb}, multi-preverb: {has_multiple_preverbs}"
            )

            # Get gloss data from processed data

            gloss_data = self._get_processed_gloss_data(processed_verb, tense, preverb)

            if not gloss_data:

                logger.info(
                    f"[GLOSS] No gloss data found in processed data for verb {verb_id}, tense {tense}"
                )

                return ""

                # Format the gloss analysis using processed data

            gloss_html = self._format_gloss_analysis_from_processed_data(
                gloss_data, verb_id, tense, preverb
            )

            logger.info(
                f"[GLOSS] Generated gloss HTML from processed data for verb {verb_id}, tense {tense}, length: {len(gloss_html)}"
            )

            return gloss_html

        except Exception as e:

            logger.warning(
                f"Failed to generate gloss analysis from processed data for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )

            return ""

    def _get_processed_conjugation_form(
        self, processed_verb: Dict, tense: str, person: str, preverb: str
    ) -> str:
        """Get conjugation form from processed data."""

        try:

            # For static builds, use base_data.conjugations which contains the default forms

            conjugations = processed_verb.get("base_data", {}).get("conjugations", {})

            if tense in conjugations:

                forms = conjugations[tense].get("forms", {})

                return forms.get(person, "-")

            return "-"

        except Exception as e:

            logger.error(f"Error getting conjugation form: {e}")

            return "-"

    def _get_base_conjugation_form(self, verb: Dict, tense: str, person: str) -> str:
        """Get base conjugation form from verb data."""

        try:

            conjugations = verb.get("conjugations", {})

            if tense in conjugations:

                forms = conjugations[tense].get("forms", {})

                return forms.get(person, "-")

            return "-"

        except Exception as e:

            logger.error(f"Error getting base conjugation form: {e}")

            return "-"

    def _get_processed_examples(
        self, processed_verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> List[Dict]:
        """Get examples from processed data."""

        return ProcessedDataAccessor.get_examples_data(processed_verb, tense)

    def _get_processed_gloss_data(
        self, processed_verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> Dict:
        """Get gloss data from processed data."""

        return ProcessedDataAccessor.get_gloss_data(processed_verb, tense)

    def _format_examples_from_processed_data(
        self, examples: List[Dict], preverb: Optional[str] = None
    ) -> str:
        """Format examples from processed data into HTML with color coding."""

        try:

            if not examples:

                return ""

            examples_html = ""

            for example in examples:

                # Generate color-coded HTML from components

                georgian_components = example.get("georgian_components", {})

                english_components = example.get("english_components", {})

                if georgian_components:

                    georgian_html = self._format_georgian_components(
                        georgian_components
                    )

                else:

                    georgian_html = example.get("georgian", "")

                if english_components:

                    english_html = self._format_english_components(english_components)

                else:

                    english_html = example.get("english", "")

                # Get copy text (plain text for copying)

                copy_text = example.get("english", "")

                plain_copy_text = re.sub(r"<[^>]+>", "", copy_text)

                examples_html += f"""

                    <li class="example-item">

                        <div class="georgian georgian-text">

                            {georgian_html}

                        </div>

                        <div class="translation english-text" data-copy-text="{plain_copy_text}">

                            {english_html}

                        </div>

                    </li>

                """

            preverb_suffix = f" ({preverb})" if preverb else ""

            return f"""

                <div class="examples">

                    <h4>Examples{preverb_suffix}:</h4>

                    <ul>

                        {examples_html}

                    </ul>

                </div>

            """

        except Exception as e:

            logger.warning(f"Failed to format examples from processed data: {e}")

            return ""

    def _format_georgian_components(self, components: Dict) -> str:
        """Format Georgian text with rich component highlighting using buildStyledText approach from demo."""

        try:

            if not components:

                return ""

            # Use the buildStyledText approach from the demo
            # Build text from components without separators
            formatted_parts = []

            # Process components in order: verb, subject, direct_object, indirect_object
            component_order = ["verb", "subject", "direct_object", "indirect_object"]

            for role in component_order:
                if role in components:
                    component = components[role]
                    formatted_parts.append(
                        self._format_component_with_data_attributes(
                            component, role, "georgian"
                        )
                    )

            # Join with spaces for proper Georgian text flow
            return " ".join(formatted_parts)

        except Exception as e:

            logger.error(f"Error formatting Georgian components: {e}")

            return ""

    def _format_component_with_data_attributes(
        self, component: Dict, role: str, language: str
    ) -> str:
        """Format a component with proper data attributes and CSS classes, following the demo approach."""

        try:
            component_text = component.get("text", "")
            component_role = component.get("role", role)
            component_case = component.get("case", "")
            component_person = component.get("person", "")

            # Get CSS class name for component styling
            css_class = self._get_component_css_class(role, language)

            # Build data attributes
            data_attributes = f'data-role="{component_role}"'
            if component_person:
                data_attributes += f' data-person="{component_person}"'
            if component_case:
                data_attributes += f' data-case="{component_case}"'

            # Add case-specific CSS class
            case_class = f" case-{component_case}" if component_case else ""

            return f'<span class="{css_class}{case_class}" {data_attributes}>{component_text}</span>'

        except Exception as e:
            logger.error(f"Error formatting component with data attributes: {e}")
            return component.get("text", "")

    def _get_component_css_class(self, role: str, language: str) -> str:
        """Get CSS class name for component styling, matching the demo approach."""
        class_map = {
            "verb": "gloss-verb",
            "subject": "gloss-subject",
            "direct_object": "gloss-direct-object",
            "indirect_object": "gloss-indirect-object",
        }
        return class_map.get(role, "gloss-default")

    def _format_verb_component(self, verb_data: Dict) -> str:
        """Format verb component."""

        verb_text = verb_data.get("text", "")

        verb_role = verb_data.get("role", "verb")

        return f'<span class="gloss-verb" data-role="{verb_role}">{verb_text}</span>'

    def _format_subject_component(self, subject_data: Dict) -> str:
        """Format subject component."""

        subject_text = subject_data.get("text", "")

        subject_role = subject_data.get("role", "subject")

        subject_case = subject_data.get("case", "")

        subject_person = subject_data.get("person", "")

        case_class = f" case-{subject_case}" if subject_case else ""

        person_attr = f' data-person="{subject_person}"' if subject_person else ""

        return f'<span class="gloss-subject{case_class}" data-role="{subject_role}"{person_attr}>{subject_text}</span>'

    def _format_direct_object_component(self, do_data: Dict) -> str:
        """Format direct object component."""

        do_text = do_data.get("text", "")

        do_role = do_data.get("role", "direct_object")

        do_case = do_data.get("case", "")

        case_class = f" case-{do_case}" if do_case else ""

        return f'<span class="gloss-direct-object{case_class}" data-role="{do_role}">{do_text}</span>'

    def _format_indirect_object_component(self, io_data: Dict) -> str:
        """Format indirect object component."""

        io_text = io_data.get("text", "")

        io_role = io_data.get("role", "indirect_object")

        io_case = io_data.get("case", "")

        case_class = f" case-{io_case}" if io_case else ""

        return f'<span class="gloss-indirect-object{case_class}" data-role="{io_role}">{io_text}</span>'

    def _format_english_components(self, components: Dict) -> str:
        """Format English text with rich component highlighting using buildStyledText approach from demo."""

        try:

            if not components:

                return ""

            # Use the buildStyledText approach from the demo
            # Build styled text by processing each component and applying proper data attributes
            formatted_parts = []

            # Process components in order: subject, verb, direct_object, indirect_object
            component_order = ["subject", "verb", "direct_object", "indirect_object"]

            for role in component_order:
                if role in components:
                    component = components[role]
                    formatted_parts.append(
                        self._format_component_with_data_attributes(
                            component, role, "english"
                        )
                    )

            # Join with spaces for proper English text flow
            return " ".join(formatted_parts)

        except Exception as e:

            logger.error(f"Error formatting English components: {e}")

            return ""

    def _format_gloss_analysis_from_processed_data(
        self, gloss_data: Dict, verb_id: str, tense: str, preverb: Optional[str] = None
    ) -> str:
        """Format gloss analysis from processed data into HTML."""

        try:

            # Check for structured gloss data format

            if "raw_components" in gloss_data:

                # Direct structure from robust gloss processor

                raw_components = gloss_data.get("raw_components", [])

                expanded_components = gloss_data.get("expanded_components", [])

            else:

                # Handle nested structure format [LEGACY]

                structured_gloss = gloss_data.get("structured_gloss", {})

                if not structured_gloss:

                    return ""

                raw_components = structured_gloss.get("raw_components", [])

                expanded_components = structured_gloss.get("expanded_components", [])

            # Generate raw gloss section with monospaced font

            raw_html = self._generate_raw_gloss_section(raw_components)

            # Generate expanded gloss section

            expanded_html = self._generate_expanded_gloss_section(expanded_components)

            # Wrap in case-gloss div

            preverb_attr = f' data-preverb="{preverb}"' if preverb else ""

            result = f"""

            <div class="case-gloss" data-verb-id="{verb_id}" data-tense="{tense}"{preverb_attr}>

                <div class="gloss-header">

                    <strong>Verb Gloss Analysis</strong>

                </div>

                <div class="gloss-content">

                    {raw_html}

                    {expanded_html}

                </div>

            </div>

            """

            return result

        except Exception as e:

            logger.warning(f"Failed to format gloss analysis from processed data: {e}")

            return ""

    def _generate_raw_gloss_section(self, raw_components: List[Dict]) -> str:
        """Generate the raw gloss section with monospaced font and color coding."""

        if not raw_components:

            return ""

        # Build color-coded raw gloss

        colored_parts = []

        for component in raw_components:

            # Check if this is a grouped argument pattern component

            if (
                isinstance(component, dict)
                and component.get("type") == "argument_pattern_group"
            ):

                # Handle grouped argument pattern without spaces

                group_components = component.get("components", [])

                group_parts = []

                for group_comp in group_components:

                    if hasattr(group_comp, "text"):

                        text = group_comp.text

                        color_class = group_comp.color_class

                    else:

                        text = group_comp.get("text", "")

                        color_class = group_comp.get("color_class", "gloss-default")

                    # Escape angle brackets so they display as literal text

                    escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")

                    group_parts.append(
                        f'<span class="{color_class}">{escaped_text}</span>'
                    )

                # Join group components without spaces

                grouped_html = "".join(group_parts)

                colored_parts.append(grouped_html)

            else:

                # Handle regular components

                if hasattr(component, "text"):

                    text = component.text

                    color_class = component.color_class

                else:

                    text = component.get("text", "")

                    color_class = component.get("color_class", "gloss-default")

                    # Escape angle brackets so they display as literal text

                    escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")

                    colored_parts.append(
                        f'<span class="{color_class}">{escaped_text}</span>'
                    )

        # Join components with spaces for proper formatting

        colored_raw_gloss = " ".join(colored_parts)

        return f"""

        <div class="raw-gloss">

            <strong>Raw:</strong> 

            <span class="gloss-text" style="font-family: 'Courier New', monospace;">{colored_raw_gloss}</span>

        </div>

        """

    def _generate_expanded_gloss_section(self, expanded_components: List[Dict]) -> str:
        """Generate the expanded gloss section with proper formatting."""

        if not expanded_components:

            return ""

        # Build expanded gloss

        expanded_parts = []

        for component in expanded_components:

            # Check if this is a grouped argument pattern component

            if (
                isinstance(component, dict)
                and component.get("type") == "argument_pattern_group"
            ):

                # Handle grouped argument pattern without spaces

                group_components = component.get("components", [])

                colored_parts = []

                for group_comp in group_components:

                    if hasattr(group_comp, "text"):

                        text = group_comp.text

                        color_class = group_comp.color_class

                    else:

                        text = group_comp.get("text", "")

                        color_class = group_comp.get("color_class", "gloss-default")

                    # Escape angle brackets so they display as literal text

                    escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")

                    colored_parts.append(
                        f'<span class="{color_class}">{escaped_text}</span>'
                    )

                colored_text = "".join(colored_parts)

                description = component.get("description", "")

                # Add description for the grouped component

                if description and description.strip():

                    expanded_parts.append(f"{colored_text}: {description}")

                else:

                    expanded_parts.append(colored_text)

            else:

                # Handle regular components

                if hasattr(component, "text"):

                    text = component.text

                    color_class = component.color_class

                    description = component.description

                else:

                    text = component.get("text", "")

                    color_class = component.get("color_class", "gloss-default")

                    description = component.get("description", "")

                    escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")

                    colored_text = f'<span class="{color_class}">{escaped_text}</span>'

            # Only add description for components that have meaningful descriptions

            if description and description.strip():

                expanded_parts.append(f"{colored_text}: {description}")

            else:

                expanded_parts.append(colored_text)

        expanded_gloss = "<br>".join(expanded_parts)

        return f"""

        <div class="expanded-gloss">

            <strong>Expanded:</strong> 

            <div class="gloss-text">{expanded_gloss}</div>

        </div>

        """

    def generate_toc_html(
        self, verbs: List[Dict], duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """

        Generate table of contents HTML content.

        Focuses only on TOC generation, not page structure.

        """

        return self.create_toc(verbs, duplicate_primary_verbs)

    def generate_verb_sections_html(
        self, processed_verbs: Dict, duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """

        Generate welcome content instead of static verb sections.

        Focuses on providing minimal instructions for using the application.

        """

        logger.info("Generating welcome content for index page")

        return self._generate_welcome_content()

    def _generate_welcome_content(self) -> str:
        """Generate minimal welcome content for the index page."""

        return """
            <div class="welcome-content">
                <div class="welcome-header">
                    <h1>Georgian Verb Conjugations</h1>
                    <p>Select a verb from the sidebar to view conjugations, examples, and gloss analysis.</p>
                </div>
            </div>
        """

    def _generate_flat_overview_from_processed_data(
        self, verb: Dict, processed_verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """
        Generate flat overview grid HTML using processed data.

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            preverb: Optional preverb to use

        Returns:
            HTML string for flat overview grid
        """
        try:
            # For multi-preverb verbs, use processed data with preverb-specific conjugations
            # For single-preverb verbs, use base conjugations
            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            if has_multiple_preverbs and preverb:
                # Use processed preverb forms for multi-preverb verbs
                conjugations = processed_verb.get("generated_data", {}).get(
                    "conjugations", {}
                )
                if preverb in conjugations:
                    conjugations = conjugations[preverb]
                else:
                    # Fallback to base conjugations if preverb not found
                    conjugations = verb.get("conjugations", {})
            else:
                # Use base conjugations for single-preverb verbs
                conjugations = verb.get("conjugations", {})

            tenses = [
                "present",
                "imperfect",
                "future",
                "aorist",
                "optative",
                "imperative",
            ]

            grid_html = """
                <div class="flat-overview">
                    <div class="flat-overview-header">Screve</div>
                    <div class="flat-overview-header">1sg</div>
                    <div class="flat-overview-header">2sg</div>
                    <div class="flat-overview-header">3sg</div>
                    <div class="flat-overview-header">1pl</div>
                    <div class="flat-overview-header">2pl</div>
                    <div class="flat-overview-header">3pl</div>
            """

            for tense in tenses:
                tense_data = conjugations.get(tense, {})
                if not tense_data or not tense_data.get("forms"):
                    continue

                tense_label = tense.upper()[:4]
                grid_html += f'<div class="flat-overview-cell flat-overview-tense flat-overview-screev">{tense_label}</div>'

                for person in ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]:
                    form = tense_data["forms"].get(person, "-")
                    grid_html += (
                        f'<div class="flat-overview-cell georgian-text">{form}</div>'
                    )

            grid_html += """
                </div>"""
            return grid_html

        except Exception as e:
            logger.warning(
                f"Failed to generate flat overview for verb {verb.get('id', 'unknown')}: {e}"
            )
            return ""

    def _generate_flat_tenses_from_processed_data(
        self, verb: Dict, processed_verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """
        Generate flat tenses HTML using processed data.

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            preverb: Optional preverb to use

        Returns:
            HTML string for flat tenses
        """
        try:
            tenses = [
                {"name": "present", "title": "Present Indicative"},
                {"name": "imperfect", "title": "Imperfect"},
                {"name": "aorist", "title": "Aorist"},
                {"name": "optative", "title": "Optative"},
                {"name": "future", "title": "Future"},
                {"name": "imperative", "title": "Imperative"},
            ]

            flat_tenses_html = '<div class="flat-tenses">'

            for tense in tenses:
                flat_tense = self._generate_single_flat_tense_from_processed_data(
                    tense, verb, processed_verb, preverb
                )
                flat_tenses_html += flat_tense

            flat_tenses_html += "</div>"
            return flat_tenses_html

        except Exception as e:
            logger.warning(
                f"Failed to generate flat tenses for verb {verb.get('id', 'unknown')}: {e}"
            )
            return ""

    def _generate_single_flat_tense_from_processed_data(
        self,
        tense: Dict,
        verb: Dict,
        processed_verb: Dict,
        preverb: Optional[str] = None,
    ) -> str:
        """
        Generate single flat tense HTML using processed data.

        Args:
            tense: Tense dictionary with name and title
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            preverb: Optional preverb to use

        Returns:
            HTML string for single flat tense
        """
        try:
            # For multi-preverb verbs, use processed data with preverb-specific conjugations
            # For single-preverb verbs, use base conjugations
            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            if has_multiple_preverbs and preverb:
                # Use processed preverb forms for multi-preverb verbs
                processed_conjugations = processed_verb.get("generated_data", {}).get(
                    "conjugations", {}
                )
                if preverb in processed_conjugations:
                    conjugations = processed_conjugations[preverb].get(
                        tense["name"], {}
                    )
                else:
                    # Fallback to base conjugations if preverb not found
                    conjugations = verb.get("conjugations", {}).get(tense["name"], {})
            else:
                # Use base conjugations for single-preverb verbs
                conjugations = verb.get("conjugations", {}).get(tense["name"], {})

            examples = self._get_processed_examples(
                processed_verb, tense["name"], preverb
            )

            flat_conjugation = self._generate_flat_conjugation_from_processed_data(
                conjugations
            )
            flat_examples = self._generate_flat_examples_from_processed_data(
                examples, preverb, tense["name"]
            )
            flat_gloss = self._generate_flat_gloss_from_processed_data(
                conjugations, verb.get("id", ""), tense["name"], preverb, processed_verb
            )

            return f"""
                <div class="flat-tense">
                    <div class="flat-tense-header">{tense["title"]}</div>
                    {flat_conjugation}
                    {flat_examples}
                    {flat_gloss}
                </div>
            """

        except Exception as e:
            logger.warning(
                f"Failed to generate flat tense {tense['name']} for verb {verb.get('id', 'unknown')}: {e}"
            )
            return ""

    def _generate_flat_conjugation_from_processed_data(self, conjugations: Dict) -> str:
        """Generate flat conjugation HTML from conjugations data with responsive layout."""
        if not conjugations or not conjugations.get("forms"):
            return ""

        # Use 3x2 layout (1sg 2sg 3sg / 1pl 2pl 3pl) for wider screens
        persons_3x2 = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]

        # Use 2x3 layout (1sg 1pl / 2sg 2pl / 3sg 3pl) for narrower screens
        persons_2x3 = ["1sg", "1pl", "2sg", "2pl", "3sg", "3pl"]

        # Generate both layouts - CSS will show the appropriate one based on screen size
        conjugation_html = f"""
            <div class="flat-conjugation">
                {self._generate_conjugation_items(conjugations, persons_3x2)}
            </div>
            <div class="flat-conjugation-2x3">
                {self._generate_conjugation_items(conjugations, persons_2x3)}
            </div>
        """
        return conjugation_html

    def _generate_conjugation_items(
        self, conjugations: Dict, persons: List[str]
    ) -> str:
        """Generate conjugation items for a specific person order."""
        items_html = ""
        for person in persons:
            form = conjugations["forms"].get(person, "-")
            items_html += f"""
                <div class="flat-conjugation-item">
                    <span class="flat-conjugation-person">{person}</span>
                    <span class="flat-conjugation-form georgian-text">{form}</span>
                </div>
            """
        return items_html

    def _generate_flat_examples_from_processed_data(
        self, examples: List[Dict], preverb: Optional[str], tense: str
    ) -> str:
        """Generate flat examples HTML from examples data using structured component data."""
        if not examples or len(examples) == 0:
            return ""

        examples_html = """
            <div class="flat-examples">
                <div class="flat-examples-header">Examples</div>
        """

        for example in examples[:3]:  # Limit to 3 examples
            # Use structured component data for color coding
            georgian_components = example.get("georgian_components", {})
            english_components = example.get("english_components", {})

            if georgian_components:
                georgian_html = self._format_georgian_components(georgian_components)
            else:
                georgian_html = example.get("georgian", "")

            if english_components:
                english_html = self._format_english_components(english_components)
            else:
                english_html = example.get("english", "")

            examples_html += f"""
                <div class="flat-example">
                    <div class="flat-example-georgian georgian-text">{georgian_html}</div>
                    <div class="flat-example-english">{english_html}</div>
                </div>
            """

        examples_html += "</div>"
        return examples_html

    def _generate_flat_gloss_from_processed_data(
        self,
        conjugations: Dict,
        verb_id: str,
        tense: str,
        preverb: Optional[str],
        processed_verb: Dict,
    ) -> str:
        """Generate flat gloss HTML from conjugations and processed data using structured gloss data."""
        if not conjugations or not conjugations.get("raw_gloss"):
            return ""

        # Try to get structured gloss data from processed_verb
        gloss_data = self._get_processed_gloss_data(processed_verb, tense, preverb)

        if gloss_data and "structured_gloss" in gloss_data:
            # Use structured gloss data for proper color coding
            structured_gloss = gloss_data["structured_gloss"]
            raw_components = structured_gloss.get("raw_components", [])
            expanded_components = structured_gloss.get("expanded_components", [])

            # Generate color-coded raw gloss
            styled_raw_gloss = self._generate_styled_raw_gloss(raw_components)

            # Generate structured expanded gloss
            structured_expanded_gloss = self._generate_structured_expanded_gloss(
                expanded_components
            )
        else:
            # Fallback to simple text rendering
            raw_gloss = conjugations["raw_gloss"]
            styled_raw_gloss = raw_gloss
            structured_expanded_gloss = self._build_structured_gloss(raw_gloss)

        return f"""
            <div class="flat-gloss">
                <div class="flat-gloss-header">
                    <span>Gloss Analysis</span>
                    <button class="flat-gloss-toggle" onclick="toggleGlossExpansion(this)">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="flat-gloss-content">
                    <div class="flat-gloss-raw">
                        <strong>Gloss:</strong> {styled_raw_gloss}
                    </div>
                    <div class="flat-gloss-expanded" style="display: none;">
                        {structured_expanded_gloss}
                    </div>
                </div>
            </div>
        """

    def _build_structured_gloss(self, raw_gloss: str) -> str:
        """Build structured gloss from raw gloss text."""
        elements = raw_gloss.split(" ")
        categories = {
            "Verb Properties": [],
            "Tense & Aspect": [],
            "Argument Structure": [],
            "Case Marking": [],
        }

        for element in elements:
            if any(keyword in element for keyword in ["V", "Act", "Impf", "Perf"]):
                categories["Verb Properties"].append(element)
            elif "<" in element and ">" in element:
                if ":" in element:
                    categories["Case Marking"].append(element)
                else:
                    categories["Argument Structure"].append(element)
            else:
                categories["Tense & Aspect"].append(element)

        structured_html = ""
        for category, items in categories.items():
            if items:
                structured_html += f"""
                    <div class="gloss-category">
                        <div class="gloss-category-title">{category}</div>
                        <div class="gloss-category-items">
                            {''.join([f'<div class="gloss-element"><span class="gloss-brackets">{item}</span></div>' for item in items])}
                        </div>
                    </div>
                """

        return structured_html

    def _generate_styled_raw_gloss(self, raw_components: List[Dict]) -> str:
        """Generate styled raw gloss from structured components, following the demo approach."""
        if not raw_components:
            return ""

        styled_parts = []

        for component in raw_components:
            # Check if this is a grouped argument pattern component
            if (
                isinstance(component, dict)
                and component.get("type") == "argument_pattern_group"
            ):
                # Handle grouped argument pattern without spaces
                group_components = component.get("components", [])
                group_parts = []

                for group_comp in group_components:
                    text = group_comp.get("text", "")
                    color_class = group_comp.get("color_class", "gloss-default")

                    # Escape angle brackets so they display as literal text
                    escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")
                    group_parts.append(
                        f'<span class="{color_class}">{escaped_text}</span>'
                    )

                # Join group components without spaces
                grouped_html = "".join(group_parts)
                styled_parts.append(grouped_html)
            else:
                # Handle regular components
                text = component.get("text", "")
                color_class = component.get("color_class", "gloss-default")

                # Escape angle brackets so they display as literal text
                escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")
                styled_parts.append(
                    f'<span class="{color_class}">{escaped_text}</span>'
                )

        # Join components with spaces for proper formatting
        return " ".join(styled_parts)

    def _generate_structured_expanded_gloss(
        self, expanded_components: List[Dict]
    ) -> str:
        """Generate structured expanded gloss from components, following the demo approach."""
        if not expanded_components:
            return ""

        # Build expanded gloss with proper categorization
        categories = {
            "Verb Properties": [],
            "Screve": [],  # Changed from "Tense & Aspect" to "Screve"
            "Argument Structure": [],
            "Case Marking": [],
        }

        for component in expanded_components:
            component_type = component.get("component_type", "")
            text = component.get("text", "")
            color_class = component.get("color_class", "gloss-default")
            description = component.get("description", "")

            # Handle argument pattern components specially
            if (
                component_type == "argument"
                and text.startswith("<")
                and text.endswith(">")
            ):
                # Look up description from gloss reference
                description = self.gloss_reference.get(text, "")
                if not description:
                    # Fallback to common patterns
                    if text == "<S-DO>":
                        description = "Transitive absolute"
                    elif text == "<S-DO-IO>":
                        description = "Transitive relative"
                    elif text == "<S-IO>":
                        description = "Intransitive relative"

            # Categorize components
            if component_type in ["verb", "voice"]:
                categories["Verb Properties"].append((text, color_class, description))
            elif component_type in ["tense", "aspect"]:
                categories["Screve"].append(
                    (text, color_class, description)
                )  # Use "Screve"
            elif component_type == "argument":
                categories["Argument Structure"].append(
                    (text, color_class, description)
                )
            elif component_type == "case_spec":
                categories["Case Marking"].append((text, color_class, description))
            else:
                # Default to Verb Properties for unknown types
                categories["Verb Properties"].append((text, color_class, description))

        # Generate HTML for each category with consistent font styling
        structured_html = ""
        for category_name, items in categories.items():
            if items:
                items_html = ""
                for text, color_class, description in items:
                    # Don't escape argument patterns - they should display as literal text
                    if text.startswith("<") and text.endswith(">"):
                        display_text = text
                    else:
                        display_text = text.replace("<", "&lt;").replace(">", "&gt;")

                    if description and description.strip():
                        items_html += f'<div class="gloss-element"><span class="gloss-brackets {color_class}" style="font-family: \'Courier New\', monospace;">{display_text}</span>: <span style="font-family: \'Courier New\', monospace;">{description}</span></div>'
                    else:
                        items_html += f'<div class="gloss-element"><span class="gloss-brackets {color_class}" style="font-family: \'Courier New\', monospace;">{display_text}</span></div>'

                structured_html += f"""
                    <div class="gloss-category">
                        <div class="gloss-category-title" style="font-family: \'Courier New\', monospace;">{category_name}</div>
                        <div class="gloss-category-items">
                            {items_html}
                        </div>
                    </div>
                """

        return structured_html

    def _generate_critical_css(self) -> str:
        """
        Generate minimal critical CSS to prevent flash of unstyled content (FOUC).
        Only includes essential styles that won't conflict with main CSS.

        Returns:
            HTML string containing minimal critical CSS styles
        """
        return """
    <style>
        /* Minimal critical styles to prevent FOUC - don't override main CSS */
        
        /* Basic reset */
        * {
            box-sizing: border-box;
        }
        
        html {
            font-size: 16px;
            -webkit-text-size-adjust: 100%;
        }
        
        body {
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>"""
