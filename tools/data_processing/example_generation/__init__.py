"""
Example Generation Sub-module

This package contains modules for generating pedagogical examples:
- Pedagogical example generation
- Argument processing and resolution
- Example validation and formatting
"""

from .example_generator import PedagogicalExampleGenerator, ExampleGenerationError
from .argument_processor import (
    ArgumentProcessor,
    ArgumentResolutionError,
    RawGlossParseError,
    CaseFormMissingError,
)

__all__ = [
    "PedagogicalExampleGenerator",
    "ExampleGenerationError",
    "ArgumentProcessor",
    "ArgumentResolutionError",
    "RawGlossParseError",
    "CaseFormMissingError",
]
