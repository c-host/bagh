"""
Gloss Processor for Website Display

This module provides structured gloss processing for the build pipeline.
It creates clean, structured data for the processed_verbs.json file
and website display with proper color coding and metadata.

Used by: verb_data_processor.py for build pipeline output
"""

import logging
import json
from typing import Dict, List, Optional

from .shared_gloss_utils import BaseGlossParser, GlossComponent, GlossData
from tools.modules.config_manager import ConfigManager

logger = logging.getLogger(__name__)


class RobustGlossProcessor(BaseGlossParser):
    """Processes raw gloss strings into structured data for consistent HTML generation."""

    def __init__(self):
        """Initialize the processor with configuration and gloss reference"""
        super().__init__()

        # Initialize config manager
        self.config = ConfigManager()

        # Load gloss reference for proper expanded definitions
        self.gloss_reference = self._load_gloss_reference()

    def _load_gloss_reference(self) -> Dict[str, str]:
        """Load the gloss reference data for proper expanded definitions."""
        try:
            # Use config manager to get the gloss reference path
            gloss_ref_path = self.config.get_path("gloss_reference")

            with open(gloss_ref_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            logger.warning(f"Failed to load gloss reference: {e}")
            return {}

    def parse_raw_gloss(self, raw_gloss: str, preverb: str = None) -> GlossData:
        """
        Parse a raw gloss string into structured GlossData.

        Args:
            raw_gloss: Raw gloss string (e.g., "V Act Pres <S-DO> <S:Nom>")
            preverb: Optional preverb value

        Returns:
            GlossData object with structured components
        """
        if not raw_gloss:
            return GlossData(raw_components=[], expanded_components=[])

        # Use shared component splitting
        components = self._split_components(raw_gloss)
        raw_components = []
        expanded_components = []

        # Track argument pattern and case specs
        argument_pattern = None
        case_specs = []

        for component in components:
            # Use shared component classification
            component_type = self._classify_component(component)
            color_class = self.color_mapping.get(component_type, "gloss-default")

            # Get description
            description = self._get_component_description(
                component, component_type, preverb
            )

            # Create raw component
            raw_comp = GlossComponent(
                text=component,
                component_type=component_type,
                color_class=color_class,
                description=description,
            )
            raw_components.append(raw_comp)

            # Handle special cases for expanded components
            if component.startswith("<") and component.endswith(">"):
                if self._is_case_specification(component):
                    # Case specification like <S:Nom>
                    case_specs.append(component)
                    expanded_comp = GlossComponent(
                        text=component,
                        component_type="case_spec",
                        color_class=self._get_case_color(component),
                        description=description,
                    )
                elif self._is_argument_pattern(component):
                    # Argument pattern like <S-DO>
                    argument_pattern = component
                    expanded_comp = GlossComponent(
                        text=component,
                        component_type="argument_pattern",
                        color_class="gloss-argument",
                        description=description,
                    )
                else:
                    # Other special components (auxiliary, modifiers)
                    expanded_comp = GlossComponent(
                        text=component,
                        component_type=component_type,
                        color_class=color_class,
                        description=description,
                    )
                expanded_components.append(expanded_comp)
            else:
                # Regular component
                expanded_comp = GlossComponent(
                    text=component,
                    component_type=component_type,
                    color_class=color_class,
                    description=description,
                )
                expanded_components.append(expanded_comp)

        return GlossData(
            raw_components=raw_components,
            expanded_components=expanded_components,
            argument_pattern=argument_pattern,
            case_specifications=case_specs,
        )

    def _get_component_description(
        self, component: str, component_type: str, preverb: str = None
    ) -> str:
        """Get human-readable description for a component."""
        # Check if there is a direct match in the gloss reference
        if component in self.gloss_reference:
            return self.gloss_reference[component]

        # Fallback descriptions for basic components
        descriptions = {
            "V": "Verb",
            "Act": "Active",
            "Med": "Medial",
            "Pass": "Passive",
            "MedAct": "Medial Active",
            "MedPass": "Medial Passive",
            "Pres": "Present",
            "Impf": "Imperfect",
            "Fut": "Future",
            "Aor": "Aorist",
            "Opt": "Optative",
            "Impv": "Imperative",
            "Inv": "Inverted",
            "Pv": f"Preverb ({preverb})" if preverb else "Preverb",
            "AuxIntr": "Auxiliary Intransitive",
            "AuxTrans": "Auxiliary Transitive",
            "AuxTransHum": "Auxiliary Transitive Human",
        }

        if component in descriptions:
            return descriptions[component]

        # Handle argument patterns and case specifications that might not be in gloss reference
        if component.startswith("<") and component.endswith(">"):
            if self._is_case_specification(component):
                # Case specification like <S:Nom> - try to construct a reasonable description
                role, case = component[1:-1].split(":", 1)
                case_desc = f"{case}inative" if case == "Nom" else f"{case}ative"
                role_desc = f"{role.title()} {case_desc.lower()}"
                return role_desc
            elif self._is_argument_pattern(component):
                # Argument pattern like <S-DO> - try to construct a reasonable description
                pattern_descriptions = {
                    "<S>": "Intransitive absolute",
                    "<S-DO>": "Transitive absolute",
                    "<S-IO>": "Ditransitive (Subject-Indirect Object)",
                    "<S-DO-IO>": "Ditransitive (Subject-Direct Object-Indirect Object)",
                }
                return pattern_descriptions.get(component, "Argument pattern")

        return component


def create_gloss_data_structure(raw_gloss: str, preverb: str = None) -> Dict:
    """
    Create a clean data structure for gloss information.

    Args:
        raw_gloss: Raw gloss string
        preverb: Optional preverb value

    Returns:
        Dictionary with structured gloss data
    """
    processor = RobustGlossProcessor()
    gloss_data = processor.parse_raw_gloss(raw_gloss, preverb)

    # Convert to serializable format
    return {
        "raw_components": [
            {
                "text": comp.text,
                "component_type": comp.component_type,
                "color_class": comp.color_class,
                "description": comp.description,
            }
            for comp in gloss_data.raw_components
        ],
        "expanded_components": [
            {
                "text": comp.text,
                "component_type": comp.component_type,
                "color_class": comp.color_class,
                "description": comp.description,
            }
            for comp in gloss_data.expanded_components
        ],
        "argument_pattern": gloss_data.argument_pattern,
        "case_specifications": gloss_data.case_specifications or [],
    }
