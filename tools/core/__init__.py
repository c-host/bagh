"""
Core data processing modules for Georgian verb tools.

This package contains the core data processing functionality:
- Gloss parsing and analysis
- Verb conjugation management  
- Pedagogical example generation
- Noun/adjective selection
"""

from .gloss_parser import GlossParser, StandardizedRawGlossParser, RawGlossParseError
from .verb_conjugation import (
    get_conjugation_form,
    get_verb_gloss,
    get_english_translation,
    get_indirect_object_preposition,
    get_direct_object_preposition,
    has_preverb_in_tense,
    calculate_preverb_forms,
)
from .example_generator import PedagogicalExampleGenerator, ExampleGenerationError
from .noun_adjective_selection_engine import (
    NounAdjectiveSelectionEngine,
    NounSelectionError,
    CaseFormMissingError,
)

__all__ = [
    # Gloss parsing
    "GlossParser",
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
    
    # Example generation
    "PedagogicalExampleGenerator",
    "ExampleGenerationError",
    
    # Noun/adjective selection
    "NounAdjectiveSelectionEngine",
    "NounSelectionError",
    "CaseFormMissingError",
]
