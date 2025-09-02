"""
Verb Data Processor - Core pipeline stage for processing raw verb data.
"""

import logging
from typing import Dict, List, Optional
from tools.data_processing.example_generation.example_generator import (
    generate_pedagogical_examples,
    get_effective_preverb,
    get_conjugation_form_for_preverb,
)
from tools.data_processing.gloss_processor import create_gloss_data_structure
from tools.data_processing.verb_conjugation import (
    calculate_preverb_forms,
    get_conjugation_form,
)
from tools.utils.unicode_console import safe_log

logger = logging.getLogger(__name__)


class VerbDataProcessor:
    """Processes raw verb data into structured, validated data."""

    # Class constants for consistent tense handling
    TENSES = ["present", "imperfect", "future", "aorist", "optative", "imperative"]

    def __init__(self):
        # Add caching for expensive operations
        self._gloss_cache = {}
        self._example_cache = {}

    def process_verb(self, raw_verb: Dict) -> Dict:
        """Process a single verb through the pipeline."""
        try:
            # Validate input
            self._validate_verb_structure(raw_verb)

            # Process the verb
            processed_verb = {
                "base_data": raw_verb,
                "generated_data": {
                    "examples": self._generate_examples_unified(raw_verb),
                    "gloss_analysis": self._generate_gloss_analysis_unified(raw_verb),
                    "preverb_forms": self._calculate_preverb_forms(raw_verb),
                },
            }

            safe_log(
                logger, "info", f"Successfully processed verb {raw_verb.get('id')}"
            )
            return processed_verb

        except Exception as e:
            safe_log(
                logger, "error", f"Failed to process verb {raw_verb.get('id')}: {e}"
            )
            # Fail fast - re-raise the exception
            raise

    def _validate_verb_structure(self, verb: Dict):
        """Validate verb data structure with simplified validation."""
        required_fields = ["id", "georgian", "conjugations", "preverb_config"]

        # Check required fields
        missing_fields = [field for field in required_fields if field not in verb]
        if missing_fields:
            raise ValueError(f"Verb missing required fields: {missing_fields}")

        # Validate conjugations and preverb config
        self._validate_conjugations(verb["conjugations"])
        self._validate_preverb_config(verb["preverb_config"])

    def _validate_conjugations(self, conjugations: Dict):
        """Validate conjugation structure."""
        for tense, tense_data in conjugations.items():
            if not isinstance(tense_data, dict):
                raise ValueError(f"Conjugation data for {tense} is not a dictionary")
            if "forms" not in tense_data or "raw_gloss" not in tense_data:
                raise ValueError(f"Missing required fields in {tense} conjugation")

    def _validate_preverb_config(self, preverb_config: Dict):
        """Validate preverb configuration."""
        if preverb_config.get("has_multiple_preverbs", False):
            if (
                not preverb_config.get("available_preverbs")
                or "default_preverb" not in preverb_config
            ):
                raise ValueError("Multi-preverb verb missing required configuration")

    def _safe_get_tense_data(self, verb: Dict, tense: str) -> Dict:
        """Safely get tense data with fallback."""
        return verb.get("conjugations", {}).get(tense, {})

    def _safe_get_preverb_config(self, verb: Dict) -> Dict:
        """Safely get preverb configuration with fallback."""
        return verb.get("preverb_config", {})

    def _safe_get_available_preverbs(self, verb: Dict) -> List[str]:
        """Safely get available preverbs with fallback."""
        return self._safe_get_preverb_config(verb).get("available_preverbs", [])

    def _process_all_tenses(self, verb: Dict, processor_func) -> Dict:
        """Process all tenses using a single function."""
        return {tense: processor_func(verb, tense) for tense in self.TENSES}

    def _generate_examples_unified(self, verb: Dict) -> Dict:
        """Generate examples for all preverbs and tenses using unified logic."""
        preverb_config = self._safe_get_preverb_config(verb)
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

        if has_multiple_preverbs:
            preverbs = self._safe_get_available_preverbs(verb)
        else:
            preverbs = [None]  # Single preverb case

        # Use batch processing with caching for better performance
        return self._generate_examples_batch(verb, preverbs)

    def _generate_examples_batch(
        self, verb: Dict, preverbs: List[Optional[str]]
    ) -> Dict:
        """Generate examples for multiple preverbs in batch with caching."""
        result = {}

        for preverb in preverbs:
            # Batch process all tenses for this preverb
            tense_examples = self._process_all_tenses(
                verb,
                lambda v, t: self._generate_examples_for_tense_preverb_cached(
                    v, t, preverb
                ),
            )

            result[preverb] = tense_examples if preverb else tense_examples

        return result if None in result else result

    def _generate_examples_for_tense_preverb_cached(
        self, verb: Dict, tense: str, preverb: Optional[str]
    ) -> List:
        """Generate examples for a specific tense and preverb combination with caching."""
        verb_id = verb.get("id", "unknown")

        # Check cache first
        cached_examples = self._get_cached_examples(verb_id, tense, preverb)
        if cached_examples is not None:
            return cached_examples

        # Generate new examples
        examples = self._generate_examples_for_tense_preverb(verb, tense, preverb)

        # Cache the result
        self._cache_examples(verb_id, tense, preverb, examples)

        return examples

    def _generate_examples_for_tense_preverb(
        self, verb: Dict, tense: str, preverb: Optional[str]
    ) -> List:
        """Generate examples for a specific tense and preverb combination."""
        try:
            # Generate examples using the existing example generator
            examples_result = generate_pedagogical_examples(
                verb, tense, [preverb] if preverb else None
            )

            # Check if there was an error
            if examples_result.get("error"):
                safe_log(
                    logger,
                    "error",
                    f"Example generation failed for {verb['id']}/{preverb or 'single'}/{tense}: {examples_result['error']}",
                )
                return []

            # Extract examples using safe extraction helper
            return self._safe_extract_examples(examples_result, preverb)

        except Exception as e:
            safe_log(
                logger,
                "error",
                f"Failed to generate examples for {verb['id']}/{preverb or 'single'}/{tense}: {e}",
            )
            raise

    def _safe_extract_examples(
        self, examples_result: Dict, preverb: Optional[str] = None
    ) -> List:
        """Safely extract examples from nested structure."""
        examples_data = examples_result.get("examples", [])
        if not examples_data or not isinstance(examples_data, list):
            return []

        if preverb is None:
            # Single preverb - get first group
            first_group = examples_data[0] if examples_data else {}
            return first_group.get("examples", [])
        else:
            # Multi preverb - find matching group
            for group in examples_data:
                if isinstance(group, dict) and group.get("preverb") == preverb:
                    return group.get("examples", [])
            return []

    def _generate_gloss_analysis_unified(self, verb: Dict) -> Dict:
        """Generate gloss analysis for all preverbs and tenses using unified logic."""
        preverb_config = self._safe_get_preverb_config(verb)
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

        if has_multiple_preverbs:
            preverbs = self._safe_get_available_preverbs(verb)
            return self._generate_gloss_analysis_batch(verb, preverbs)
        else:
            return self._process_all_tenses(
                verb,
                lambda v, t: self._generate_gloss_for_preverb_tense_cached(v, "", t),
            )

    def _generate_gloss_analysis_batch(self, verb: Dict, preverbs: List[str]) -> Dict:
        """Generate gloss analysis for multiple preverbs in batch with caching."""
        return {
            preverb: self._process_all_tenses(
                verb,
                lambda v, t: self._generate_gloss_for_preverb_tense_cached(
                    v, preverb, t
                ),
            )
            for preverb in preverbs
        }

    def _generate_gloss_for_preverb_tense_cached(
        self, verb: Dict, preverb: str, tense: str
    ) -> Dict:
        """Generate gloss analysis with caching for expensive operations."""
        try:
            # Get raw gloss using safe data extraction
            raw_gloss = self._safe_get_tense_data(verb, tense).get("raw_gloss", "")

            if not raw_gloss:
                return {"raw_gloss": "", "structured_gloss": {}}

            # Use cached gloss data if available
            structured_gloss = self._get_cached_gloss(raw_gloss, preverb)

            return {"raw_gloss": raw_gloss, "structured_gloss": structured_gloss}

        except Exception as e:
            safe_log(
                logger,
                "error",
                f"Failed to generate gloss for {verb['id']}/{preverb}/{tense}: {e}",
            )
            raise

    def _calculate_preverb_forms(self, verb: Dict) -> Dict:
        """Calculate preverb forms for all available preverbs."""
        preverb_config = self._safe_get_preverb_config(verb)
        if not preverb_config.get("has_multiple_preverbs", False):
            return {}

        preverb_forms = {}
        for preverb in self._safe_get_available_preverbs(verb):
            try:
                preverb_forms[preverb] = self._calculate_forms_for_preverb(
                    verb, preverb
                )
            except Exception as e:
                safe_log(
                    logger,
                    "error",
                    f"Failed to calculate forms for {verb['id']}/{preverb}: {e}",
                )
                raise

        # Apply preverb fallback rules after calculating all forms
        preverb_forms = self._process_preverb_fallbacks(verb, preverb_forms)

        # Validate that all preverb forms are complete after fallback processing
        self._validate_preverb_forms_complete(verb, preverb_forms)

        return preverb_forms

    def _validate_preverb_forms_complete(self, verb: Dict, preverb_forms: Dict):
        """Validate that all preverb forms are complete after fallback processing"""
        if not preverb_forms:
            return

        # Define person requirements per tense for Georgian verbs
        tense_person_requirements = {
            "present": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
            "imperfect": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
            "future": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
            "aorist": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
            "optative": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
            "imperative": ["2sg", "2pl"],  # Imperative only has 2nd person forms
        }

        validation_errors = []

        for preverb, tense_data in preverb_forms.items():
            for tense in self.TENSES:
                if tense not in tense_data:
                    validation_errors.append(
                        f"Missing tense '{tense}' for preverb '{preverb}' in verb {verb.get('id')}"
                    )
                    continue

                forms = tense_data[tense]
                if not isinstance(forms, dict):
                    validation_errors.append(
                        f"Forms for {preverb} {tense} is not a dictionary in verb {verb.get('id')}"
                    )
                    continue

                # Get required persons for this specific tense
                required_persons = tense_person_requirements.get(
                    tense, ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
                )

                for person in required_persons:
                    if person not in forms or not forms[person]:
                        validation_errors.append(
                            f"Missing form for {person} in {preverb} {tense} for verb {verb.get('id')}"
                        )

        if validation_errors:
            error_msg = f"Preverb forms validation failed for verb {verb.get('id')}: {'; '.join(validation_errors)}"
            safe_log(logger, "error", error_msg)
            raise ValueError(error_msg)

        safe_log(
            logger, "info", f"Preverb forms validation passed for verb {verb.get('id')}"
        )

    def _calculate_forms_for_preverb(self, verb: Dict, preverb: str) -> Dict:
        """Calculate conjugation forms for a specific preverb."""
        try:
            preverb_rules = verb.get("preverb_rules", {})
            forms_by_tense = {}

            for tense in self.TENSES:
                tense_data = self._safe_get_tense_data(verb, tense)
                if "forms" in tense_data:
                    forms_by_tense[tense] = calculate_preverb_forms(
                        tense_data["forms"], preverb_rules, preverb
                    )

            return forms_by_tense
        except Exception as e:
            safe_log(
                logger,
                "error",
                f"Failed to calculate forms for {verb['id']}/{preverb}: {e}",
            )
            raise

    def _process_preverb_fallbacks(self, verb: Dict, preverb_forms: Dict) -> Dict:
        """
        Apply linguistic rules for preverb fallbacks during build processing.

        This function handles complex Georgian verb conjugation patterns where
        certain preverbs use different forms for specific tenses.

        Example: წა preverb uses მი forms for present/imperfect tenses
        """
        if not preverb_forms or "preverb_rules" not in verb:
            return preverb_forms

        preverb_rules = verb["preverb_rules"]
        tense_specific_fallbacks = preverb_rules.get("tense_specific_fallbacks", {})
        english_fallbacks = preverb_rules.get("english_fallbacks", {})

        # Process tense-specific fallbacks
        for preverb, tense_fallbacks in tense_specific_fallbacks.items():
            if preverb in preverb_forms:
                for tense, fallback_preverb in tense_fallbacks.items():
                    if (
                        tense in preverb_forms[preverb]
                        and fallback_preverb in preverb_forms
                        and tense in preverb_forms[fallback_preverb]
                    ):

                        # Apply the fallback: use forms from fallback preverb
                        preverb_forms[preverb][tense] = preverb_forms[fallback_preverb][
                            tense
                        ].copy()

                        # Mark this as a fallback for debugging
                        if "fallback_info" not in verb:
                            verb["fallback_info"] = {}
                        if preverb not in verb["fallback_info"]:
                            verb["fallback_info"][preverb] = {}

                        verb["fallback_info"][preverb][tense] = {
                            "original_preverb": preverb,
                            "fallback_preverb": fallback_preverb,
                            "reason": f"Linguistic rule: {preverb} uses {fallback_preverb} forms for {tense}",
                            "fallback_type": "tense_specific",
                        }

        # Process English fallbacks (if different from tense-specific)
        for preverb, tense_fallbacks in english_fallbacks.items():
            if preverb in preverb_forms:
                for tense, fallback_preverb in tense_fallbacks.items():
                    if (
                        tense in preverb_forms[preverb]
                        and fallback_preverb in preverb_forms
                        and tense in preverb_forms[fallback_preverb]
                    ):

                        # Only apply if not already handled by tense-specific fallback
                        if preverb not in verb.get(
                            "fallback_info", {}
                        ) or tense not in verb.get("fallback_info", {}).get(
                            preverb, {}
                        ):

                            # Apply the fallback: use forms from fallback preverb
                            preverb_forms[preverb][tense] = preverb_forms[
                                fallback_preverb
                            ][tense].copy()

                            # Mark this as a fallback for debugging
                            if "fallback_info" not in verb:
                                verb["fallback_info"] = {}
                            if preverb not in verb["fallback_info"]:
                                verb["fallback_info"][preverb] = {}

                            verb["fallback_info"][preverb][tense] = {
                                "original_preverb": preverb,
                                "fallback_preverb": fallback_preverb,
                                "reason": f"English fallback rule: {preverb} uses {fallback_preverb} forms for {tense}",
                                "fallback_type": "english",
                            }

        return preverb_forms

    def _get_cached_gloss(self, raw_gloss: str, preverb: str) -> Dict:
        """Get cached gloss data or generate new."""
        cache_key = f"{raw_gloss}:{preverb}"
        if cache_key in self._gloss_cache:
            return self._gloss_cache[cache_key]

        # Generate new gloss data and cache it
        self._gloss_cache[cache_key] = create_gloss_data_structure(raw_gloss, preverb)
        return self._gloss_cache[cache_key]

    def _get_cached_examples(
        self, verb_id: str, tense: str, preverb: Optional[str]
    ) -> Optional[List]:
        """Get cached examples or return None if not cached."""
        return self._example_cache.get(f"{verb_id}:{tense}:{preverb or 'single'}")

    def _cache_examples(
        self, verb_id: str, tense: str, preverb: Optional[str], examples: List
    ):
        """Cache examples for future use."""
        self._example_cache[f"{verb_id}:{tense}:{preverb or 'single'}"] = examples
