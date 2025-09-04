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

from tools.utils.shared_gloss_utils import BaseGlossParser, GlossComponent, GlossData
from tools.utils.config_manager import ConfigManager
from tools.utils.unicode_console import setup_unicode_console, safe_log

# Set up unicode console for proper output
setup_unicode_console()

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

            # Fix preverb color to match voice color (same as "Act")
            if component_type == "preverb":
                color_class = "gloss-default"  # Same as "Act"

            # Get description
            description = self._get_component_description(
                component, component_type, preverb
            )

            # Handle special cases for components that need splitting
            if self._is_argument_pattern(component):
                # Split compound argument pattern into multiple components for raw section
                split_components = self._split_argument_pattern(component)

                # Create a grouped component for the argument pattern
                grouped_component = {
                    "type": "argument_pattern_group",
                    "original_text": component,
                    "description": description,
                    "components": split_components,
                }
                raw_components.append(grouped_component)

                # For expanded section, also create a grouped component for consistency
                expanded_grouped_component = {
                    "type": "argument_pattern_group",
                    "original_text": component,
                    "description": description,
                    "components": split_components,
                }
                expanded_components.append(expanded_grouped_component)

                # Track the argument pattern
                argument_pattern = component
            else:
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
                        # Case specification like <S:Nom> - use semantic colors in both raw and expanded
                        case_specs.append(component)
                        semantic_color = self._get_case_color(component)

                        # Update raw component to use semantic color
                        raw_comp.color_class = semantic_color

                        expanded_comp = GlossComponent(
                            text=component,
                            component_type="case_spec",
                            color_class=semantic_color,
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
        # Special handling for Pv component - use dynamic preverb value instead of static reference
        if component == "Pv" and preverb and preverb.strip():
            return preverb
        elif component in self.gloss_reference:
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
            "Pv": preverb if preverb else "Preverb",
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

    def _split_argument_pattern(self, component: str) -> List[GlossComponent]:
        """
        Split compound argument patterns like <S-DO-IO> into multiple components
        with mixed colors: brackets and dashes use voice color, letters use semantic colors.

        This method dynamically parses any argument pattern format.

        Args:
            component: The compound argument pattern (e.g., "<S-DO-IO>", "<S-DO>", "<S>")

        Returns:
            List of GlossComponent objects with appropriate colors
        """
        if not (component.startswith("<") and component.endswith(">")):
            # Not an argument pattern - return as single component
            return [
                GlossComponent(
                    component, "argument_pattern", "gloss-argument", "Argument pattern"
                )
            ]

        # Remove the outer brackets
        inner_content = component[1:-1]  # Remove < and >

        # Split by dashes to get individual argument types
        argument_types = inner_content.split("-")

        components = []

        # Add opening bracket
        components.append(GlossComponent("<", "punctuation", "gloss-default", ""))

        # Process each argument type
        for i, arg_type in enumerate(argument_types):
            if i > 0:  # Add dash separator before each argument (except the first)
                components.append(
                    GlossComponent("-", "punctuation", "gloss-default", "")
                )

            # Get color for this argument type (no description for individual components)
            color_class, _ = self._get_argument_type_color_and_description(arg_type)
            components.append(GlossComponent(arg_type, "argument", color_class, ""))

        # Add closing bracket
        components.append(GlossComponent(">", "punctuation", "gloss-default", ""))

        return components

    def _get_argument_type_color_and_description(
        self, arg_type: str
    ) -> tuple[str, str]:
        """
        Get the appropriate color class and description for an argument type.

        Args:
            arg_type: The argument type (e.g., "S", "DO", "IO")

        Returns:
            Tuple of (color_class, description)
        """
        argument_mapping = {
            "S": ("gloss-subject", "Subject"),
            "DO": ("gloss-direct-object", "Direct Object"),
            "IO": ("gloss-indirect-object", "Indirect Object"),
            # Add more argument types as needed
            "A": ("gloss-agent", "Agent"),
            "P": ("gloss-patient", "Patient"),
            "T": ("gloss-theme", "Theme"),
            "R": ("gloss-recipient", "Recipient"),
        }

        return argument_mapping.get(
            arg_type, ("gloss-argument", f"{arg_type} argument")
        )


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
    def serialize_component(comp):
        """Convert a component to serializable format, handling both GlossComponent objects and dictionaries."""
        if isinstance(comp, dict):
            # Already a dictionary (grouped component)
            if comp.get("type") == "argument_pattern_group":
                # Recursively serialize the components within the group
                serialized_components = [
                    {
                        "text": sub_comp.text,
                        "component_type": sub_comp.component_type,
                        "color_class": sub_comp.color_class,
                        "description": sub_comp.description,
                    }
                    for sub_comp in comp.get("components", [])
                ]
                return {
                    "type": "argument_pattern_group",
                    "original_text": comp.get("original_text"),
                    "description": comp.get("description"),
                    "components": serialized_components,
                }
            else:
                return comp
        else:
            # GlossComponent object
            return {
                "text": comp.text,
                "component_type": comp.component_type,
                "color_class": comp.color_class,
                "description": comp.description,
            }

    return {
        "raw_components": [
            serialize_component(comp) for comp in gloss_data.raw_components
        ],
        "expanded_components": [
            serialize_component(comp) for comp in gloss_data.expanded_components
        ],
        "argument_pattern": gloss_data.argument_pattern,
        "case_specifications": gloss_data.case_specifications or [],
    }
