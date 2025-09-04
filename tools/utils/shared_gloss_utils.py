"""
Shared Gloss Processing Utilities

This module provides the common foundation for both gloss processors:
- Base classes and data structures
- Shared parsing logic
- Common validation functions
- Shared constants and mappings
"""

import logging
from dataclasses import dataclass
from typing import Dict, List, Optional

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


class BaseGlossParser:
    """Base class providing shared parsing logic for both gloss processors."""

    def __init__(self):
        # Define color mappings for different component types - using existing CSS classes
        self.color_mapping = {
            "verb": "gloss-verb",  # Blue
            "voice": "gloss-default",  # Default color
            "tense": "gloss-tense",  # Light Blue
            "argument_pattern": "gloss-argument",  # Green
            "case_spec": "gloss-case",  # Red/Green based on role
            "preverb": "gloss-default",  # Default color
            "auxiliary": "gloss-auxiliary",  # Yellow
            "unknown": "gloss-default",  # Default color
            "punctuation": "gloss-default",  # Default color
        }

        # Component type detection patterns
        self.component_patterns = {
            "verb": ["V"],
            "voice": ["Act", "Med", "Pass", "MedAct", "MedPass"],
            "tense": ["Pres", "Impf", "Fut", "Aor", "Opt", "Impv"],
            "preverb": ["Pv"],
            "auxiliary": ["AuxIntr", "AuxTrans", "AuxTransHum"],
        }

        # Supported cases and patterns
        self.supported_cases = ["Nom", "Erg", "Dat", "Gen", "Inst", "Adv"]
        self.supported_argument_patterns = ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]
        self.auxiliary_markers = ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]
        self.modifier_markers = ["<Advb>", "<MWE>", "<Null>"]

    def _split_components(self, raw_gloss: str) -> List[str]:
        """Split raw gloss into individual components."""
        if not raw_gloss:
            return []
        return raw_gloss.strip().split()

    def _validate_basic_format(self, raw_gloss: str) -> bool:
        """Validate basic gloss format."""
        if not raw_gloss or not raw_gloss.strip():
            return False

        parts = raw_gloss.strip().split()
        if len(parts) < 1:
            return False

        # First part should be "V"
        if parts[0] != "V":
            return False

        return True

    def _classify_component(self, component: str) -> str:
        """Classify a component based on its content."""
        for component_type, patterns in self.component_patterns.items():
            if component in patterns:
                return component_type

        # Check for special patterns
        if component.startswith("<") and component.endswith(">"):
            if ":" in component:
                return "case_spec"
            elif (
                component in self.modifier_markers
                or component in self.auxiliary_markers
            ):
                return "auxiliary"
            else:
                return "argument_pattern"

        # Default to unknown
        return "unknown"

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

    def _is_argument_pattern(self, component: str) -> bool:
        """Check if a component is an argument pattern."""
        return (
            component.startswith("<")
            and component.endswith(">")
            and ":" not in component
            and component not in self.modifier_markers
            and component not in self.auxiliary_markers
        )

    def _is_case_specification(self, component: str) -> bool:
        """Check if a component is a case specification."""
        return (
            component.startswith("<") and component.endswith(">") and ":" in component
        )


# Shared constants
TENSE_MAPPING = {
    "present": "Pres",
    "imperfect": "Impf",
    "future": "Fut",
    "aorist": "Aor",
    "optative": "Opt",
    "imperative": "Impv",
}

REVERSE_TENSE_MAPPING = {v: k for k, v in TENSE_MAPPING.items()}

CASE_NAMES = {
    "nom": "Nominative",
    "erg": "Ergative",
    "dat": "Dative",
    "gen": "Genitive",
    "inst": "Instrumental",
    "adv": "Adverbial",
}

ROLE_DESCRIPTIONS = {
    "subject": "Subject",
    "direct_object": "Direct Object",
    "indirect_object": "Indirect Object",
}
