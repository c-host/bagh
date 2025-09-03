"""
Verb Data Processor - Core pipeline stage for processing raw verb data.
"""

import logging
from typing import Dict, List, Optional
from tools.data_processing.example_generation.example_generator import generate_examples
from tools.data_processing.gloss_processor import create_gloss_data_structure
from tools.data_processing.verb_conjugation import calculate_preverb_forms
from tools.utils.unicode_console import safe_log

logger = logging.getLogger(__name__)


class VerbDataProcessor:
    """Processes raw verb data into structured, validated data.

    Error Handling:
    - Warnings: Missing verb forms in certain tenses (expected) → Build continues, logged
    - Errors: Missing argument configuration, malformed data → Build fails

    Preverb Fallback System:
    - When preverb forms fall back (e.g., წა uses მი forms for present/imperfect),
      English translations are automatically copied to maintain consistency
    - No manual english_fallbacks configuration needed - the system handles this automatically
    """

    # Class constants for consistent tense handling
    TENSES = ["present", "imperfect", "future", "aorist", "optative", "imperative"]

    # Default person requirements for each tense
    DEFAULT_PERSON_REQUIREMENTS = {
        "present": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        "imperfect": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        "future": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        "aorist": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        "optative": ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
        "imperative": ["2sg", "2pl"],  # Imperative only has 2nd person forms
    }

    def __init__(self, config: Optional[Dict] = None):
        # Configuration with sensible defaults
        self.config = config or {}

        # Processing options
        self.enable_caching = self.config.get("enable_caching", True)
        self.enable_validation = self.config.get("enable_validation", True)
        self.enable_fallbacks = self.config.get("enable_fallbacks", True)

        # Tense configuration
        self.tenses = self.config.get("tenses", self.TENSES)

        # Person requirements configuration
        self.person_requirements = self.config.get(
            "person_requirements",
            self.DEFAULT_PERSON_REQUIREMENTS,
        )

        # Add caching for expensive operations
        self._gloss_cache = {}
        self._example_cache = {}

    def process_verb(self, raw_verb: Dict) -> Dict:
        """Process a single verb through the pipeline - now just orchestrates other methods."""
        verb_id = raw_verb.get("id", "unknown")

        try:
            safe_log(logger, "info", f"Starting processing for verb {verb_id}")

            # Stage 1: Validation
            safe_log(logger, "debug", f"Stage 1/4: Validating verb {verb_id}")
            self._validate_verb_structure(raw_verb)
            safe_log(logger, "debug", f"✓ Validation completed for verb {verb_id}")

            # Stage 2: Examples generation
            safe_log(
                logger, "debug", f"Stage 2/4: Generating examples for verb {verb_id}"
            )
            examples = self._generate_examples(raw_verb)
            safe_log(logger, "debug", f"✓ Examples generated for verb {verb_id}")

            # Stage 3: Gloss analysis
            safe_log(
                logger,
                "debug",
                f"Stage 3/4: Generating gloss analysis for verb {verb_id}",
            )
            gloss_analysis = self._generate_gloss_analysis(raw_verb)
            safe_log(logger, "debug", f"✓ Gloss analysis completed for verb {verb_id}")

            # Stage 4: Preverb forms
            safe_log(
                logger,
                "debug",
                f"Stage 4/4: Calculating preverb forms for verb {verb_id}",
            )
            preverb_forms = self._calculate_preverb_forms(raw_verb)
            safe_log(logger, "debug", f"✓ Preverb forms calculated for verb {verb_id}")

            # Assemble final result
            processed_verb = {
                "base_data": raw_verb,
                "generated_data": {
                    "examples": examples,
                    "gloss_analysis": gloss_analysis,
                    "preverb_forms": preverb_forms,
                },
            }

            safe_log(
                logger,
                "info",
                f"✓ Successfully processed verb {verb_id} through all stages",
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
        return {tense: processor_func(verb, tense) for tense in self.tenses}

    def _generate_examples(self, verb: Dict) -> Dict:
        """Generate examples for all preverbs and tenses - single responsibility."""
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
            # Generate examples for all tenses for this preverb
            tense_examples = self._process_all_tenses(
                verb,
                lambda v, t: self._generate_examples_for_tense_preverb_cached(
                    v, t, preverb
                ),
            )

            # Store with appropriate key - use "default" for single preverb case
            key = preverb if preverb else "default"
            result[key] = tense_examples

        return result

    def _generate_examples_for_tense_preverb_cached(
        self, verb: Dict, tense: str, preverb: Optional[str]
    ) -> List:
        """Generate examples for a specific tense and preverb combination with caching."""
        verb_id = verb.get("id", "unknown")

        # Check cache first (if caching is enabled)
        if self.enable_caching:
            cached_examples = self._get_cached_examples(verb_id, tense, preverb)
            if cached_examples is not None:
                safe_log(
                    logger,
                    "debug",
                    f"Cache hit for verb {verb_id}/{tense}/{preverb or 'single'}",
                )
                return cached_examples

        # Generate new examples
        examples = self._generate_examples_for_tense_preverb(verb, tense, preverb)

        # Cache the result (if caching is enabled)
        if self.enable_caching:
            self._cache_examples(verb_id, tense, preverb, examples)
            safe_log(
                logger,
                "debug",
                f"Cached examples for verb {verb_id}/{tense}/{preverb or 'single'}",
            )

        return examples

    def _generate_examples_for_tense_preverb(
        self, verb: Dict, tense: str, preverb: Optional[str]
    ) -> List:
        """Generate examples for a specific tense and preverb combination."""
        try:
            # Generate examples using the existing example generator
            examples_result = generate_examples(
                verb, tense, [preverb] if preverb else None
            )

            # Check if there was an error
            if examples_result.get("error"):
                error_info = examples_result["error"]
                error_msg = f"Example generation failed for {verb['id']}/{preverb or 'single'}/{tense}: {error_info}"
                safe_log(logger, "error", error_msg)
                raise ValueError(error_msg)

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
        safe_log(
            logger,
            "debug",
            f"Extracting examples from: {examples_result}, preverb: {preverb}",
        )

        examples_data = examples_result.get("examples", [])
        if not isinstance(examples_data, list):
            raise ValueError(f"Invalid examples data structure: {examples_result}")

        # Empty examples list is valid - it means no forms exist for this tense (warning case)
        if examples_data is None:
            raise ValueError(f"Examples field is None in {examples_result}")

        safe_log(
            logger,
            "debug",
            f"Examples data: {examples_data}, length: {len(examples_data) if examples_data else 0}",
        )

        if preverb is None:
            # Single preverb - get first group
            if not examples_data:
                # No examples data at all - this is expected when verb has no forms in this tense
                safe_log(
                    logger,
                    "warning",
                    f"No examples data for single preverb verb - this may be expected if verb has no forms in this tense",
                )
                return []

            first_group = examples_data[0] if examples_data else {}
            examples = first_group.get("examples", [])
            safe_log(
                logger, "debug", f"First group: {first_group}, examples: {examples}"
            )
            # Empty examples is a warning, not an error - some tenses may not have forms
            if examples is None:
                raise ValueError(
                    f"Examples field is None for single preverb verb {examples_result}"
                )
            if not examples:
                safe_log(
                    logger,
                    "warning",
                    f"No examples generated for single preverb verb - this may be expected if verb has no forms in this tense",
                )
            return examples or []  # Return empty list if no examples (warning case)
        else:
            # Multi preverb - find matching group
            if not examples_data:
                # No examples data at all - this is expected when verb has no forms in this tense
                safe_log(
                    logger,
                    "warning",
                    f"No examples data for multi-preverb verb - this may be expected if verb has no forms in this tense",
                )
                return []

            for group in examples_data:
                if isinstance(group, dict) and group.get("preverb") == preverb:
                    examples = group.get("examples", [])
                    # Empty examples is a warning, not an error - some tenses may not have forms
                    if examples is None:
                        raise ValueError(
                            f"Examples field is None for preverb '{preverb}' in {examples_result}"
                        )
                    if not examples:
                        safe_log(
                            logger,
                            "warning",
                            f"No examples generated for preverb '{preverb}' - this may be expected if verb has no forms in this tense",
                        )
                    return (
                        examples or []
                    )  # Return empty list if no examples (warning case)

            # If we get here, no matching preverb was found
            raise ValueError(
                f"Preverb '{preverb}' not found in examples data: {examples_result}"
            )

    def _generate_gloss_analysis(self, verb: Dict) -> Dict:
        """Generate gloss analysis for all preverbs and tenses - single responsibility."""
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
        result = {}

        for preverb in preverbs:
            # Generate gloss analysis for a single preverb across all tenses
            result[preverb] = self._generate_gloss_for_preverb_batch(verb, preverb)

        return result

    def _generate_gloss_for_preverb_batch(self, verb: Dict, preverb: str) -> Dict:
        """Generate gloss analysis for a single preverb across all tenses."""
        return self._process_all_tenses(
            verb,
            lambda v, t: self._generate_gloss_for_preverb_tense_cached(v, preverb, t),
        )

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
        """Calculate preverb forms for all available preverbs - orchestrator only."""
        preverb_config = self._safe_get_preverb_config(verb)
        if not preverb_config.get("has_multiple_preverbs", False):
            return {}

        # Calculate all preverb forms without fallbacks or validation
        preverb_forms = self._calculate_all_preverb_forms(verb)

        # Apply preverb fallback rules after calculating all forms (if enabled)
        if self.enable_fallbacks:
            preverb_forms = self._process_preverb_fallbacks(verb, preverb_forms)

        # Validate that all preverb forms are complete after fallback processing (if enabled)
        if self.enable_validation:
            self._validate_preverb_forms_complete(verb, preverb_forms)

        return preverb_forms

    def _calculate_all_preverb_forms(self, verb: Dict) -> Dict:
        """Calculate forms for all preverbs without fallbacks or validation."""
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

        return preverb_forms

    def _validate_preverb_forms_complete(self, verb: Dict, preverb_forms: Dict):
        """Validate that all preverb forms are complete after fallback processing"""
        if not preverb_forms:
            return

        validation_errors = []

        for preverb, tense_data in preverb_forms.items():
            errors = self._validate_preverb_tense_completeness(
                verb, preverb, tense_data
            )
            validation_errors.extend(errors)

        if validation_errors:
            self._raise_validation_error(verb, validation_errors)

        safe_log(
            logger, "info", f"Preverb forms validation passed for verb {verb.get('id')}"
        )

    def _validate_preverb_tense_completeness(
        self, verb: Dict, preverb: str, tense_data: Dict
    ) -> List[str]:
        """Validate completeness of a single preverb's tense data."""
        errors = []

        for tense in self.tenses:
            if tense not in tense_data:
                errors.append(
                    f"Missing tense '{tense}' for preverb '{preverb}' in verb {verb.get('id')}"
                )
                continue

            errors.extend(
                self._validate_tense_forms(verb, preverb, tense, tense_data[tense])
            )

        return errors

    def _validate_tense_forms(
        self, verb: Dict, preverb: str, tense: str, forms: Dict
    ) -> List[str]:
        """Validate forms for a specific tense."""
        errors = []

        if not isinstance(forms, dict):
            errors.append(
                f"Forms for {preverb} {tense} is not a dictionary in verb {verb.get('id')}"
            )
            return errors

        required_persons = self._get_required_persons_for_tense(tense)
        for person in required_persons:
            if person not in forms or not forms[person]:
                errors.append(
                    f"Missing form for {person} in {preverb} {tense} for verb {verb.get('id')}"
                )

        return errors

    def _get_required_persons_for_tense(self, tense: str) -> List[str]:
        """Get required person forms for a specific tense."""
        return self.person_requirements.get(
            tense, ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
        )

    def _raise_validation_error(self, verb: Dict, validation_errors: List[str]):
        """Raise a validation error with formatted error message."""
        error_msg = f"Preverb forms validation failed for verb {verb.get('id')}: {'; '.join(validation_errors)}"
        safe_log(logger, "error", error_msg)
        raise ValueError(error_msg)

    def _calculate_forms_for_preverb(self, verb: Dict, preverb: str) -> Dict:
        """Calculate conjugation forms for a specific preverb."""
        try:
            preverb_rules = verb.get("preverb_rules", {})
            forms_by_tense = {}

            for tense in self.tenses:
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

        # Process tense-specific fallbacks
        for preverb, tense_fallbacks in tense_specific_fallbacks.items():
            if preverb in preverb_forms:
                for tense, fallback_preverb in tense_fallbacks.items():
                    if self._can_apply_form_fallback(
                        preverb_forms, preverb, tense, fallback_preverb
                    ):
                        self._apply_form_fallback(
                            verb, preverb_forms, preverb, tense, fallback_preverb
                        )

        # Automatically apply English translation fallbacks to match form fallbacks
        self._apply_english_translation_fallbacks(verb, preverb_forms)

        return preverb_forms

    def _can_apply_form_fallback(
        self, preverb_forms: Dict, preverb: str, tense: str, fallback_preverb: str
    ) -> bool:
        """Check if a form fallback can be applied."""
        return (
            tense in preverb_forms[preverb]
            and fallback_preverb in preverb_forms
            and tense in preverb_forms[fallback_preverb]
        )

    def _apply_form_fallback(
        self,
        verb: Dict,
        preverb_forms: Dict,
        preverb: str,
        tense: str,
        fallback_preverb: str,
    ):
        """Apply a form fallback and update metadata."""
        # Apply the fallback: use forms from fallback preverb
        preverb_forms[preverb][tense] = preverb_forms[fallback_preverb][tense].copy()

        # Mark this as a fallback for debugging
        self._ensure_fallback_info_structure(verb, preverb)

        verb["fallback_info"][preverb][tense] = {
            "original_preverb": preverb,
            "fallback_preverb": fallback_preverb,
            "reason": f"Linguistic rule: {preverb} uses {fallback_preverb} forms for {tense}",
            "fallback_type": "tense_specific",
        }

    def _ensure_fallback_info_structure(self, verb: Dict, preverb: str):
        """Ensure the fallback_info structure exists for the given preverb."""
        if "fallback_info" not in verb:
            verb["fallback_info"] = {}
        if preverb not in verb["fallback_info"]:
            verb["fallback_info"][preverb] = {}

    def _apply_english_translation_fallbacks(self, verb: Dict, preverb_forms: Dict):
        """
        Automatically copy English translations when preverb forms fall back.

        This ensures that when a preverb uses forms from another preverb (e.g.,
        წა uses მი forms for present/imperfect), the English translations also
        match the actual forms being used.
        """
        fallback_info = verb.get("fallback_info", {})

        for preverb, tense_info in fallback_info.items():
            for tense, fallback_data in tense_info.items():
                if fallback_data["fallback_type"] == "tense_specific":
                    self._apply_single_translation_fallback(
                        verb, preverb, tense, fallback_data
                    )

    def _apply_single_translation_fallback(
        self, verb: Dict, preverb: str, tense: str, fallback_data: Dict
    ):
        """Apply translation fallback for a single preverb-tense combination."""
        fallback_preverb = fallback_data["fallback_preverb"]

        # Check if translation fallback can be applied
        if self._can_apply_translation_fallback(verb, fallback_preverb, tense):
            self._copy_translation_and_metadata(
                verb, preverb, tense, fallback_preverb, fallback_data
            )

    def _can_apply_translation_fallback(
        self, verb: Dict, fallback_preverb: str, tense: str
    ) -> bool:
        """Check if translation fallback can be applied."""
        return (
            fallback_preverb in verb.get("english_translations", {})
            and tense in verb["english_translations"][fallback_preverb]
        )

    def _copy_translation_and_metadata(
        self,
        verb: Dict,
        preverb: str,
        tense: str,
        fallback_preverb: str,
        fallback_data: Dict,
    ):
        """Copy translation and update metadata."""
        # Ensure the target preverb has english_translations structure
        self._ensure_translation_structure(verb, preverb)

        # Copy the English translation
        verb["english_translations"][preverb][tense] = verb["english_translations"][
            fallback_preverb
        ][tense]

        # Mark this in fallback_info for debugging
        self._update_fallback_metadata(fallback_data, fallback_preverb)

        safe_log(
            logger,
            "info",
            f"Applied English translation fallback: {preverb}/{tense} -> {fallback_preverb}/{tense}",
        )

    def _ensure_translation_structure(self, verb: Dict, preverb: str):
        """Ensure the target preverb has english_translations structure."""
        if "english_translations" not in verb:
            verb["english_translations"] = {}
        if preverb not in verb["english_translations"]:
            verb["english_translations"][preverb] = {}

    def _update_fallback_metadata(self, fallback_data: Dict, fallback_preverb: str):
        """Update fallback metadata for debugging."""
        fallback_data["english_translation_fallback"] = True
        fallback_data["english_translation_source"] = fallback_preverb

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
