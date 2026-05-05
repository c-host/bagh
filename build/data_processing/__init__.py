"""
Data Processing Stage

This package contains modules for processing raw data into structured formats:
- Verb data processing and transformation
- Gloss processing and analysis
- Verb conjugation calculations
- Example generation with argument processing
"""

from .processed_data_manager import ProcessedDataManager
from .verb_data_processor import VerbDataProcessor
from .gloss_processor import RobustGlossProcessor, create_gloss_data_structure
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

__all__ = [
    "ProcessedDataManager",
    "VerbDataProcessor",
    "RobustGlossProcessor",
    "create_gloss_data_structure",
    "get_conjugation_form",
    "get_verb_gloss",
    "get_english_translation",
    "get_indirect_object_preposition",
    "get_direct_object_preposition",
    "has_preverb_in_tense",
    "calculate_preverb_forms",
    "add_should_prefix_for_optative",
]
