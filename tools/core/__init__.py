"""
Core data processing modules for Georgian verb tools.

This package contains the core data processing functionality:
- Gloss parsing and analysis
- Verb conjugation management
- Pedagogical example generation
- Noun/adjective selection
"""

from .robust_gloss_processor import StandardizedRawGlossParser, RawGlossParseError
from .verb_conjugation import (
    get_conjugation_form,
    get_verb_gloss,
    get_english_translation,
    get_indirect_object_preposition,
    get_direct_object_preposition,
    has_preverb_in_tense,
    calculate_preverb_forms,
    add_should_prefix_for_optative,
)
from .example_generator import PedagogicalExampleGenerator, ExampleGenerationError
from .argument_resolver import (
    ArgumentResolver,
    ArgumentResolutionError,
    CaseFormMissingError,
)

__all__ = [
    # Gloss parsing
    "StandardizedRawGlossParser",
    "RawGlossParseError",
    # Verb conjugation
    "get_conjugation_form",
    "get_verb_gloss",
    "get_english_translation",
    "get_indirect_object_preposition",
    "get_direct_object_preposition",
    "has_preverb_in_tense",
    "calculate_preverb_forms",
    "add_should_prefix_for_optative",
    # Example generation
    "PedagogicalExampleGenerator",
    "ExampleGenerationError",
    # Argument resolution
    "ArgumentResolver",
    "ArgumentResolutionError",
    "CaseFormMissingError",
]
