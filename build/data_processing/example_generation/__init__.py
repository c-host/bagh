"""
Example Generation Sub-module

This package contains modules for generating example sentence data including:
- Argument processing and resolution
- Example validation and formatting
"""

from .example_generator import ExampleGenerator, ExampleGenerationError
from .argument_processor import ArgumentProcessor

__all__ = [
    "ExampleGenerator",
    "ExampleGenerationError",
    "ArgumentProcessor",
]
