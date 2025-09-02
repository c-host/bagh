"""
Argument Parser for Example Generation

This module provides parsing of raw gloss strings for argument resolution
during example generation. It extracts argument patterns and case specifications
for database lookup and example construction.

Used by: example_generator.py for generating pedagogical examples
"""

import logging
from typing import Dict, List, Optional

from .shared_gloss_utils import BaseGlossParser
from tools.utils import DatabaseLoader

logger = logging.getLogger(__name__)


class ArgumentResolutionError(Exception):
    """Raised when argument resolution fails"""

    pass


class RawGlossParseError(Exception):
    """Raised when raw_gloss format is invalid"""

    pass


class StandardizedRawGlossParser(BaseGlossParser):
    """Parser for gnc.ge format raw_gloss specifications - used by example_generator.py"""

    def __init__(self):
        """Initialize the parser with supported patterns and cases"""
        super().__init__()

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
            # Use shared validation
            if not self._validate_basic_format(raw_gloss):
                # Return a minimal valid structure for empty glosses
                return {
                    "voice": "Act",
                    "tense": "Pres",
                    "preverb": None,
                    "argument_pattern": "<S>",
                    "arguments": {"subject": {"type": "S", "case": "Nom"}},
                }

            raw_gloss = raw_gloss.strip()
            parts = self._split_components(raw_gloss)

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

            # First part should be "V" (already validated)
            voice_found = False
            tense_found = False
            i = 1

            # Look for voice and tense in the first few parts
            while i < len(parts) and i < 4:
                part = parts[i]

                # Check if it's a voice
                if not voice_found and part in self.component_patterns["voice"]:
                    result["voice"] = part
                    voice_found = True
                    i += 1
                    continue

                # Check if it's a tense
                if not tense_found and part in self.component_patterns["tense"]:
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
                    if self._is_case_specification(part):
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
                    elif self._is_argument_pattern(part):
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
def create_standardized_parser() -> StandardizedRawGlossParser:
    """Create a standardized raw gloss parser instance - legacy compatibility"""
    return StandardizedRawGlossParser()
