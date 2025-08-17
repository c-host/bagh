#!/usr/bin/env python3
"""
Consolidated Gloss Parser for Georgian Verb Analysis

This module combines the functionality of both gloss parsers:
- GlossParser: Converts raw gloss codes to verbose descriptions using gloss reference data
- StandardizedRawGlossParser: Parses gnc.ge format raw_gloss specifications

Features:
- Parse raw gloss codes and convert to verbose descriptions
- Handle gnc.ge format raw_gloss specifications
- Support for argument patterns and case specifications
- Integration with gloss reference data
- Validation of gloss formats and database compatibility
"""

import json
import re
import logging
import html
from pathlib import Path
from typing import Dict, List, Optional, Tuple

# Configure logging
logging.basicConfig(level=logging.WARNING)
logger = logging.getLogger(__name__)


class RawGlossParseError(Exception):
    """Raised when raw_gloss format is invalid"""

    pass


class GlossParser:
    """Parser for Georgian gloss codes."""

    def __init__(self):
        """Initialize the parser with gloss reference data."""
        self.gloss_reference = self._load_gloss_reference()

    def _load_gloss_reference(self) -> Dict[str, str]:
        """Load the gloss reference data from JSON file."""
        try:
            gloss_path = (
                Path(__file__).parent.parent / "src" / "data" / "gloss_reference.json"
            )
            with open(gloss_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: gloss_reference.json not found at {gloss_path}")
            return {}
        except json.JSONDecodeError as e:
            print(f"Error parsing gloss reference: {e}")
            return {}

    def parse_raw_gloss(self, raw_gloss: str, preverb: Optional[str] = None) -> str:
        """
        Parse raw gloss and convert to verbose format.

        Args:
            raw_gloss: Raw gloss string (e.g., "V MedAct Inv Pres Pv LV")
            preverb: Preverb value when Pv appears in gloss

        Returns:
            Formatted verbose gloss with line breaks and raw codes
        """
        if not raw_gloss:
            return ""

        # Split the raw gloss into components
        components = raw_gloss.split()

        # Process each component
        verbose_parts = []

        for component in components:
            # Handle special cases
            if component == "Pv" and preverb:
                verbose_parts.append(f"Pv: Preverb ({preverb})")
            elif component.startswith("<") and component.endswith(">"):
                # Handle case frame components and auxiliary markers - add line break before
                # Preserve auxiliary markers in their original form
                if component in ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]:
                    verbose_parts.append(f"\n{component}")
                else:
                    case_desc = self._parse_case_frame(component)
                    verbose_parts.append(f"\n{component}: {case_desc}")
            else:
                # Look up in gloss reference
                description = self.gloss_reference.get(component, component)
                verbose_parts.append(f"{component}: {description}")

        # Join with line breaks for readability
        result = "\n".join(verbose_parts)

        # Clean up any double line breaks that might occur
        result = result.replace("\n\n", "\n")

        return result

    def validate_preverb_requirement(
        self, raw_gloss: str, preverb: Optional[str] = None
    ) -> bool:
        """
        Validate if a preverb is required for this verb and gloss.

        Args:
            raw_gloss: Raw gloss string
            preverb: Preverb value (optional)

        Returns:
            True if preverb is required, False otherwise
        """
        # Check if the raw gloss contains "Pv" (preverb marker)
        if "Pv" in raw_gloss:
            return True

        # If a preverb is provided and not empty, it's required
        if preverb and preverb.strip():
            return True

        return False

    def _parse_case_frame(self, case_component: str) -> str:
        """
        Parse case frame components like <S-DO-IO>, <S:Erg>, etc.

        Args:
            case_component: Case frame component (e.g., "<S-DO-IO>")

        Returns:
            Verbose description of the case frame
        """
        # Preserve auxiliary markers in their original form
        if case_component in ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]:
            return case_component

        # First, check if this is an auxiliary marker or modifier that should be looked up in gloss reference
        if case_component in self.gloss_reference:
            return self.gloss_reference[case_component]

        # Remove angle brackets
        inner = case_component[1:-1]

        # Handle different case frame patterns
        if ":" in inner:
            # Pattern like <S:Erg>, <DO:Dat>
            parts = inner.split(":")
            if len(parts) == 2:
                role, case = parts
                role_desc = self._get_role_description(role)
                case_desc = self.gloss_reference.get(case, case)
                return f"{role_desc} ({case_desc})"
        else:
            # Pattern like <S-DO-IO>
            roles = inner.split("-")
            role_descriptions = [self._get_role_description(role) for role in roles]
            return " - ".join(role_descriptions)

        return case_component

    def _get_role_description(self, role: str) -> str:
        """Get description for argument role."""
        role_mapping = {
            "S": "Subject",
            "DO": "Direct Object",
            "IO": "Indirect Object",
        }
        return role_mapping.get(role, role)


def process_raw_gloss(raw_gloss: str, preverb: str = None) -> str:
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

    parser = StandardizedRawGlossParser()

    # Validate preverb requirement
    if parser.validate_preverb_requirement(raw_gloss, preverb):
        # Preverb is required but not provided or empty
        if not preverb or not preverb.strip():
            print(f"Warning: Preverb required for gloss containing 'Pv': {raw_gloss}")
            return raw_gloss

    # Parse the raw gloss to get the structure
    parsed_gloss = parser.parse_raw_gloss(raw_gloss)
    
    # Convert the parsed gloss to a formatted string
    formatted_parts = []
    
    # Add voice and tense
    voice = parsed_gloss.get("voice", "")
    tense = parsed_gloss.get("tense", "")
    if voice and tense:
        formatted_parts.append(f"<V {voice} {tense}>: Verb, {voice}ive Voice, {tense} Tense")
    
    # Add preverb if present
    preverb = parsed_gloss.get("preverb")
    if preverb:
        formatted_parts.append(f"<Pv ({preverb})>: Preverb, {preverb}")
    
    # Add argument pattern
    argument_pattern = parsed_gloss.get("argument_pattern", "")
    if argument_pattern:
        # Map argument patterns to descriptions
        pattern_descriptions = {
            "<S>": "Intransitive",
            "<S-DO>": "Transitive",
            "<S-IO>": "Ditransitive (Subject-Indirect Object)",
            "<S-DO-IO>": "Ditransitive (Subject-Direct Object-Indirect Object)"
        }
        description = pattern_descriptions.get(argument_pattern, argument_pattern)
        formatted_parts.append(f"{argument_pattern}: {description}")
    
    # Add individual arguments
    arguments = parsed_gloss.get("arguments", {})
    for arg_type, arg_data in arguments.items():
        case = arg_data.get("case", "")
        if case:
            case_desc = f"{case}inative" if case == "Nom" else f"{case}ative"
            formatted_parts.append(f"<{arg_type}:{case}>: {arg_type}, {case_desc} Case")
    
    return "\n".join(formatted_parts)


def format_raw_gloss_with_colors(raw_gloss: str) -> str:
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


def format_gloss_for_html(case_gloss: str) -> str:
    """
    Format case gloss for HTML display with CSS classes and color coding.

    Args:
        case_gloss: Raw case gloss string

    Returns:
        HTML-formatted gloss with CSS classes and color coding
    """
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
                        if component in ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]:
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
                                    inner_content = component[1:-1]  # Remove < and >
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
                                    color_coded_component = "-".join(color_coded_parts)
                            # Case-marked patterns first (longer patterns)
                            elif "S:Nom" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S:Nom", '<span class="gloss-subject">S:Nom</span>'
                                )
                            elif "S:Erg" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S:Erg", '<span class="gloss-subject">S:Erg</span>'
                                )
                            elif "S:Dat" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S:Dat", '<span class="gloss-subject">S:Dat</span>'
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
                                color_coded_component = color_coded_component.replace(
                                    "S", '<span class="gloss-subject">S</span>'
                                )
                            elif "DO" in component:
                                color_coded_component = color_coded_component.replace(
                                    "DO", '<span class="gloss-direct-object">DO</span>'
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


class StandardizedRawGlossParser:
    def __init__(self):
        """Initialize the parser with supported patterns and cases"""
        self.supported_voices = ["Act", "Pass", "MedAct", "MedPass"]
        self.supported_tenses = [
            "Pres",
            "Impf",
            "Fut",
            "Aor",
            "Opt",
            "Impv",
            "Inv",
        ]  # Added Inv for inverted
        self.supported_argument_patterns = ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]
        self.supported_cases = ["Nom", "Erg", "Dat", "Gen", "Inst", "Adv"]

        # Define auxiliary markers that should not be treated as argument patterns
        self.auxiliary_markers = ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]

        # Define other modifiers that should not be treated as argument patterns
        self.modifier_markers = ["<Advb>", "<MWE>", "<Null>"]

        # Load databases for validation
        self.databases = self._load_databases()

    def _load_databases(self) -> Dict:
        """Load the four databases for validation"""
        data_dir = Path("src/data")
        databases = {}

        db_files = [
            ("subjects", "subject_database.json"),
            ("direct_objects", "direct_object_database.json"),
            ("indirect_objects", "indirect_object_database.json"),
            ("adjectives", "adjective_database.json"),
        ]

        for db_type, filename in db_files:
            filepath = data_dir / filename
            if filepath.exists():
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        databases[db_type] = json.load(f)
                except Exception as e:
                    logger.warning(f"Could not load {filename}: {e}")
                    databases[db_type] = {}
            else:
                logger.warning(f"Database file not found: {filepath}")
                databases[db_type] = {}

        return databases

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

            # If we only have "V", provide a default structure
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

                # If we haven't found voice or tense, this might be a preverb
                if not voice_found and not tense_found:
                    # Assume it's a preverb (Georgian preverbs)
                    result["preverb"] = part
                    i += 1
                    continue

                # If we've found both, break
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

# Convenience functions for backward compatibility
def create_gloss_parser() -> GlossParser:
    """Create a gloss parser instance"""
    return GlossParser()


def create_standardized_raw_gloss_parser() -> StandardizedRawGlossParser:
    """Create a standardized raw gloss parser instance"""
    return StandardizedRawGlossParser()
