#!/usr/bin/env python3
"""
Robust Gloss Processor for Georgian Verb Analysis

This module provides a clean, structured approach to processing gloss data
that separates the data structure from HTML presentation concerns.

This module consolidates all gloss processing functionality, including:
- Structured gloss component processing (robust approach)
- Standardized raw gloss parsing (for example generation)
- Legacy compatibility functions
"""

import logging
import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass

from tools.utils import DatabaseLoader
from tools.modules.config_manager import ConfigManager

logger = logging.getLogger(__name__)


@dataclass
class GlossComponent:
    """Represents a single component of a gloss with its type and metadata."""

    text: str
    component_type: str  # 'verb', 'voice', 'tense', 'argument_pattern', 'case_spec'
    color_class: str
    description: str


@dataclass
class GlossData:
    """Complete structured gloss data for a verb tense."""

    raw_components: List[GlossComponent]
    expanded_components: List[GlossComponent]
    argument_pattern: Optional[str] = None
    case_specifications: List[str] = None


class RobustGlossProcessor:
    """Processes raw gloss strings into structured data for consistent HTML generation."""

    def __init__(self):
        # Initialize config manager
        self.config = ConfigManager()
        
        # Define color mappings for different component types - using existing CSS classes
        self.color_mapping = {
            "verb": "gloss-verb",  # Blue
            "voice": "gloss-voice",  # Orange
            "tense": "gloss-tense",  # Light Blue
            "argument_pattern": "gloss-argument",  # Green
            "case_spec": "gloss-case",  # Red/Green based on role
            "preverb": "gloss-preverb",  # Purple
            "auxiliary": "gloss-auxiliary",  # Yellow
        }

        # Load gloss reference for proper expanded definitions
        self.gloss_reference = self._load_gloss_reference()

        # Component type detection patterns
        self.component_patterns = {
            "verb": ["V"],
            "voice": ["Act", "Med", "Pass", "MedAct", "MedPass"],
            "tense": ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv", "Inv"],
            "preverb": ["Pv"],
            "auxiliary": ["AuxIntr", "AuxTrans", "AuxTransHum"],
        }

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

        # Split into components
        components = raw_gloss.split()
        raw_components = []
        expanded_components = []

        # Track argument pattern and case specs
        argument_pattern = None
        case_specs = []

        for component in components:
            # Determine component type
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
                if ":" in component:
                    # Case specification like <S:Nom>
                    case_specs.append(component)
                    expanded_comp = GlossComponent(
                        text=component,
                        component_type="case_spec",
                        color_class=self._get_case_color(component),
                        description=description,
                    )
                else:
                    # Argument pattern like <S-DO>
                    argument_pattern = component
                    expanded_comp = GlossComponent(
                        text=component,
                        component_type="argument_pattern",
                        color_class="gloss-argument",
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

    def _classify_component(self, component: str) -> str:
        """Classify a component based on its content."""
        for component_type, patterns in self.component_patterns.items():
            if component in patterns:
                return component_type

        # Check for special patterns
        if component.startswith("<") and component.endswith(">"):
            if ":" in component:
                return "case_spec"
            else:
                return "argument_pattern"

        # Default to unknown
        return "unknown"

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
            if ":" in component:
                # Case specification like <S:Nom> - try to construct a reasonable description
                role, case = component[1:-1].split(":", 1)
                case_desc = f"{case}inative" if case == "Nom" else f"{case}ative"
                role_desc = f"{role.title()} {case_desc.lower()}"
                return role_desc
            else:
                # Argument pattern like <S-DO> - try to construct a reasonable description
                pattern_descriptions = {
                    "<S>": "Intransitive absolute",
                    "<S-DO>": "Transitive absolute",
                    "<S-IO>": "Ditransitive (Subject-Indirect Object)",
                    "<S-DO-IO>": "Ditransitive (Subject-Direct Object-Indirect Object)",
                }
                return pattern_descriptions.get(component, "Argument pattern")

        return component

    def _get_case_color(self, case_spec: str) -> str:
        """Get appropriate color class for case specifications."""
        if case_spec.startswith("<S:"):
            return "gloss-subject"
        elif case_spec.startswith("<DO:"):
            return "gloss-direct-object"
        elif case_spec.startswith("<IO:"):
            return "gloss-indirect-object"
        else:
            return "gloss-case"


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


# ============================================================================
# LEGACY COMPATIBILITY FUNCTIONS
# These functions are kept for backward compatibility with example_generator.py
# ============================================================================


class RawGlossParseError(Exception):
    """Raised when raw_gloss format is invalid"""

    pass


class StandardizedRawGlossParser:
    """Parser for gnc.ge format raw_gloss specifications - used by example_generator.py"""

    def __init__(self):
        """Initialize the parser with supported patterns and cases"""
        self.supported_voices = ["Act", "Pass", "MedAct", "MedPass"]
        self.supported_tenses = ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv", "Inv"]
        self.supported_argument_patterns = ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]
        self.supported_cases = ["Nom", "Erg", "Dat", "Gen", "Inst", "Adv"]

        # Define auxiliary markers that should not be treated as argument patterns
        self.auxiliary_markers = ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]

        # Define other modifiers that should not be treated as argument patterns
        self.modifier_markers = ["<Advb>", "<MWE>", "<Null>"]

        # Load databases for validation
        self.databases = self._load_databases()

    def _load_databases(self) -> Dict:
        """Load the four databases for validation using shared utility"""
        loader = DatabaseLoader()
        return loader.load_all_databases()

    def parse_raw_gloss(self, raw_gloss: str) -> Dict[str, Dict]:
        """
        Parse standardized gnc.ge format raw_gloss

        Args:
            raw_gloss: String in gnc.ge format

        Returns:
            Dictionary with parsed information:
            {
                "voice": "Act",
                "tense": "Pres",
                "preverb": None,
                "argument_pattern": "<S-DO>",
                "arguments": {
                    "subject": {"type": "S", "case": "Nom"},
                    "direct_object": {"type": "DO", "case": "Dat"}
                }
            }

        Raises:
            RawGlossParseError: If format is invalid
        """
        try:
            # Clean and validate input
            if not raw_gloss or not raw_gloss.strip():
                # Return a minimal valid structure for empty glosses
                return {
                    "voice": "Act",
                    "tense": "Pres",
                    "preverb": None,
                    "argument_pattern": "<S>",
                    "arguments": {"subject": {"type": "S", "case": "Nom"}},
                }

            raw_gloss = raw_gloss.strip()
            parts = raw_gloss.split()

            # Validate basic structure - allow shorter forms for basic verbs
            if len(parts) < 1:
                raise RawGlossParseError(
                    f"Raw gloss must have at least 1 part, got {len(parts)}"
                )

            # If only "V" is present, provide a default structure
            if len(parts) == 1 and parts[0] == "V":
                return {
                    "voice": "Act",
                    "tense": "Pres",
                    "preverb": None,
                    "argument_pattern": "<S>",
                    "arguments": {"subject": {"type": "S", "case": "Nom"}},
                }

            # Parse components
            result = {
                "voice": None,
                "tense": None,
                "preverb": None,
                "argument_pattern": None,
                "arguments": {},
            }

            # First part should be "V"
            if parts[0] != "V":
                raise RawGlossParseError(
                    f"Raw gloss must start with 'V', got '{parts[0]}'"
                )

            # Parse voice and tense
            voice_found = False
            tense_found = False
            i = 1

            # Look for voice and tense in the first few parts
            while i < len(parts) and i < 4:
                part = parts[i]

                # Check if it's a voice
                if not voice_found and part in self.supported_voices:
                    result["voice"] = part
                    voice_found = True
                    i += 1
                    continue

                # Check if it's a tense
                if not tense_found and part in self.supported_tenses:
                    result["tense"] = part
                    tense_found = True
                    i += 1
                    continue

                # If voice or tense not found, this might be a preverb
                if not voice_found and not tense_found:
                    # Assume it's a preverb (Georgian preverbs)
                    result["preverb"] = part
                    i += 1
                    continue

                # If both found, break
                if voice_found and tense_found:
                    break

                i += 1

            # Validate required components
            if not result["voice"]:
                raise RawGlossParseError("Voice not found in raw gloss")

            if not result["tense"]:
                raise RawGlossParseError("Tense not found in raw gloss")

            # Parse argument pattern and case specifications
            argument_pattern = None
            case_specifications = []

            for part in parts[i:]:
                if part.startswith("<") and part.endswith(">"):
                    if ":" in part:
                        # This is a case specification
                        case_specifications.append(part)
                    elif part in self.modifier_markers:
                        # This is a modifier marker, not an argument pattern
                        # Skip it - these are handled elsewhere if needed
                        continue
                    elif part in self.auxiliary_markers:
                        # This is an auxiliary marker, preserve it in the result
                        # Store it in a special field for auxiliary markers
                        if "auxiliary_markers" not in result:
                            result["auxiliary_markers"] = []
                        result["auxiliary_markers"].append(part)
                        continue
                    else:
                        # This is an argument pattern
                        if argument_pattern is None:
                            argument_pattern = part
                        else:
                            raise RawGlossParseError(
                                f"Multiple argument patterns found: {argument_pattern} and {part}"
                            )

            # Validate argument pattern
            if argument_pattern:
                if argument_pattern not in self.supported_argument_patterns:
                    raise RawGlossParseError(
                        f"Unsupported argument pattern: {argument_pattern}"
                    )
                result["argument_pattern"] = argument_pattern
            else:
                # Fallback for basic verbs without argument patterns
                result["argument_pattern"] = "<S>"
                result["arguments"]["subject"] = {"type": "S", "case": "Nom"}

            # Parse case specifications
            for case_spec in case_specifications:
                self._parse_case_specification(case_spec, result["arguments"])

            # Validate that arguments match the pattern
            self._validate_argument_consistency(result)

            return result

        except RawGlossParseError:
            raise
        except Exception as e:
            raise RawGlossParseError(f"Unexpected error parsing raw gloss: {e}")

    def _parse_case_specification(self, case_spec: str, arguments: Dict):
        """Parse a case specification like <S:Nom> or <DO:Dat>"""
        try:
            # Remove angle brackets
            inner = case_spec[1:-1]

            if ":" not in inner:
                raise RawGlossParseError(
                    f"Invalid case specification format: {case_spec}"
                )

            role, case = inner.split(":", 1)

            # Validate case
            if case not in self.supported_cases:
                raise RawGlossParseError(f"Unsupported case: {case}")

            # Map role to argument type
            role_mapping = {
                "S": "subject",
                "DO": "direct_object",
                "IO": "indirect_object",
            }

            if role not in role_mapping:
                raise RawGlossParseError(f"Unsupported role: {role}")

            argument_type = role_mapping[role]

            # Store the argument information
            arguments[argument_type] = {
                "type": role,
                "case": case,
            }

        except Exception as e:
            raise RawGlossParseError(
                f"Failed to parse case specification {case_spec}: {e}"
            )

    def _validate_argument_consistency(self, result: Dict):
        """Validate that arguments are consistent with the pattern"""
        pattern = result.get("argument_pattern")
        arguments = result.get("arguments", {})

        if not pattern:
            return

        # Extract expected roles from pattern
        pattern_roles = set()
        inner = pattern[1:-1]  # Remove < >
        for role in inner.split("-"):
            pattern_roles.add(role)

        # Check that all pattern roles have case specifications
        for role in pattern_roles:
            role_mapping = {
                "S": "subject",
                "DO": "direct_object",
                "IO": "indirect_object",
            }
            expected_arg = role_mapping.get(role)

            if expected_arg and expected_arg not in arguments:
                raise RawGlossParseError(
                    f"Argument pattern {pattern} requires {role} but no case specification found"
                )

        # Check that no extra arguments are specified
        for arg_type in arguments:
            if arg_type not in ["subject", "direct_object", "indirect_object"]:
                raise RawGlossParseError(f"Unknown argument type: {arg_type}")

    def validate_preverb_requirement(self, raw_gloss: str, preverb: str = None) -> bool:
        """
        Validate if a preverb is required for the given raw gloss.

        Args:
            raw_gloss: Raw gloss string
            preverb: Preverb value (can be None)

        Returns:
            True if preverb is required but not provided, False otherwise
        """
        if not raw_gloss:
            return False

        # Check if the raw gloss contains 'Pv' (preverb marker)
        if "Pv" in raw_gloss:
            # If the raw gloss already contains a preverb value like "Pv (მო)", no additional preverb is needed
            if "Pv(" in raw_gloss and ")" in raw_gloss:
                return False
            # If Pv is present but no preverb is provided, it's required
            return not preverb or not preverb.strip()

        return False


# Convenience functions for backward compatibility
def create_gloss_parser():
    """Create a gloss parser instance - legacy compatibility"""
    # This would need to be implemented if GlossParser is still needed
    raise NotImplementedError(
        "GlossParser class not implemented in consolidated module"
    )


def create_standardized_raw_gloss_parser() -> StandardizedRawGlossParser:
    """Create a standardized raw gloss parser instance - legacy compatibility"""
    return StandardizedRawGlossParser()
