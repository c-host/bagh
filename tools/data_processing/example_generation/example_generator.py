#!/usr/bin/env python3
"""
Compositional example sentence generator.

This generator emits tokenized, layered examples:
 - layer "always": always visible
 - layer "adjectives": adjective tokens
 - layer "adverbs": adverb tokens
"""

import logging
from typing import Dict, List, Optional, Tuple, Any

from tools.data_processing.example_generation.argument_processor import ArgumentProcessor
from tools.data_processing.verb_conjugation import get_conjugation_form
from tools.utils.shared_gloss_utils import (
    TENSE_MAPPING,
    REVERSE_TENSE_MAPPING,
    CASE_NAMES,
    ROLE_DESCRIPTIONS,
)
from tools.utils.unicode_console import safe_log

logger = logging.getLogger(__name__)


class ExampleGenerationError(Exception):
    """Raised when example generation fails."""


class ExampleGenerator:
    def __init__(self):
        self.argument_processor = ArgumentProcessor()
        self.case_names = CASE_NAMES
        self.role_descriptions = ROLE_DESCRIPTIONS
        self.tense_mapping = TENSE_MAPPING
        self.reverse_tense_mapping = REVERSE_TENSE_MAPPING
        self.IMPERATIVE_PERSONS = ["2sg", "2pl"]
        self.STANDARD_PERSONS = ["1sg", "3sg", "3pl"]
        self.DATABASE_TYPE_MAPPING = {
            "subject": "subjects",
            "direct_object": "direct_objects",
            "indirect_object": "indirect_objects",
        }

    def _get_default_composition_orders(self, syntax: Dict[str, Any]) -> Tuple[List[str], List[str]]:
        """
        Determine token order from syntax configuration, without requiring exampleComposition.

        Priority:
        1) Locative surface inclusion pattern
        2) Verbal noun inclusion (modal-like) pattern
        3) Generic default pattern
        """
        complements = syntax.get("complements", {}) if syntax else {}
        adjuncts = syntax.get("adjuncts", {}) if syntax else {}

        has_verbal_noun = bool(complements.get("verbalNoun"))
        has_locative_surface = bool(adjuncts.get("locativeSurface"))

        if has_locative_surface:
            return (
                ["locative_surface", "subject", "direct_object", "verb"],
                ["subject", "verb", "direct_object", "locative_surface"],
            )

        if has_verbal_noun:
            return (
                ["subject", "direct_object", "verb", "adverb", "verbal_noun"],
                ["subject", "verb", "verbal_noun", "direct_object", "adverb"],
            )

        return (
            ["subject", "direct_object", "indirect_object", "verb"],
            ["subject", "verb", "direct_object", "indirect_object"],
        )

    def _should_include_subject(self, person: str) -> bool:
        return person in ["3sg", "3pl"]

    def _append_role_tokens(
        self, role_tokens: Dict[str, List[Dict[str, Any]]], role: str, tokens: List[Dict[str, Any]]
    ) -> None:
        if tokens:
            role_tokens[role] = tokens

    def _build_verb_component(
        self,
        tense: str,
        person: str,
        georgian_verb_form: str,
        verb_data: Optional[Dict] = None,
        effective_preverb: str = "",
    ) -> Tuple[Dict[str, Any], Dict[str, Any]]:
        if tense == "Opt" and georgian_verb_form != "-":
            georgian_text = f"უნდა {georgian_verb_form}"
            english_text = f"should {self._get_verb_translation(verb_data, self.tense_mapping.get(tense, tense), effective_preverb)}"
        else:
            georgian_text = georgian_verb_form
            english_text = self._get_verb_translation(
                verb_data, self.tense_mapping.get(tense, tense), effective_preverb
            )

        if verb_data:
            mapped_tense = self.tense_mapping.get(tense, tense)
            english_text = self._apply_subject_verb_agreement(
                english_text, mapped_tense, person
            )
        return (
            {"text": georgian_text, "role": "verb", "layer": "always", "toggleable": False},
            {"text": english_text, "role": "verb", "layer": "always", "toggleable": False},
        )

    def _compose_by_order(
        self, order: List[str], role_tokens: Dict[str, List[Dict[str, Any]]]
    ) -> List[Dict[str, Any]]:
        output: List[Dict[str, Any]] = []
        for role in order:
            output.extend(role_tokens.get(role, []))
        return output

    def _tokens_to_text(self, tokens: List[Dict[str, Any]]) -> str:
        return " ".join([t["text"] for t in tokens if t.get("text")])

    def _capitalize_sentence(self, sentence: str) -> str:
        if not sentence:
            return sentence
        return sentence[0].upper() + sentence[1:]

    def _make_component_summary(self, tokens: List[Dict[str, Any]], role: str, person: str = "") -> Dict[str, Any]:
        text = self._tokens_to_text(tokens)
        result = {"text": text, "role": role}
        if person:
            result["person"] = person
        return result

    def _build_argument_tokens(
        self,
        person: str,
        role: str,
        role_config: Dict[str, Any],
        role_case: str,
        english_prefix: str = "",
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], Dict[str, Any], Dict[str, Any]]:
        noun_key = role_config.get("noun", "")
        adjective_key = role_config.get("adjective", "")
        if not noun_key:
            raise ValueError(f"Missing noun for role={role}, person={person}")

        number = "plural" if (person == "3pl" and role == "subject") else "singular"
        noun_ge = self.argument_processor.get_case_form(
            noun_key, role_case.lower(), self.argument_processor.databases, number
        )
        noun_en = self.argument_processor.get_english_translation(
            noun_key, self.argument_processor.databases, "noun", number
        )

        ge_tokens: List[Dict[str, Any]] = []
        en_tokens: List[Dict[str, Any]] = []

        if english_prefix:
            en_tokens.append(
                {"text": english_prefix, "role": role, "part": "preposition", "layer": "always", "toggleable": False}
            )

        if adjective_key:
            adj_ge = self.argument_processor.get_adjective_form(
                adjective_key, role_case.lower(), self.argument_processor.databases
            )
            adj_en = self.argument_processor.get_english_translation(
                adjective_key, self.argument_processor.databases, "adjective", "singular"
            )
            ge_tokens.append(
                {"text": adj_ge, "role": role, "part": "adjective", "layer": "adjectives", "toggleable": True}
            )
            en_tokens.append(
                {"text": adj_en, "role": role, "part": "adjective", "layer": "adjectives", "toggleable": True}
            )

        ge_tokens.append(
            {"text": noun_ge, "role": role, "part": "noun", "layer": "always", "toggleable": False}
        )
        en_tokens.append(
            {"text": noun_en, "role": role, "part": "noun", "layer": "always", "toggleable": False}
        )

        ge_component = {"text": self._tokens_to_text(ge_tokens), "case": role_case.lower(), "role": role}
        en_component = self._make_component_summary(en_tokens, role, person if role == "subject" else "")

        return ge_tokens, en_tokens, ge_component, en_component

    def _build_verbal_noun_tokens(
        self, verb_data: Dict[str, Any], person: str
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], List[Dict[str, Any]], List[Dict[str, Any]]]:
        complements = verb_data.get("syntax", {}).get("complements", {})
        verbal_noun_cfg = complements.get("verbalNoun")
        if not verbal_noun_cfg:
            return [], [], [], []

        person_cfg = self.argument_processor.get_person_keyed_config(verbal_noun_cfg, person)
        verbal_noun_key = person_cfg.get("verbal_noun")
        adverb_key = person_cfg.get("adverb")
        if verbal_noun_cfg.get("required") and not verbal_noun_key:
            raise ValueError(f"Required verbal noun missing for person={person}")
        if not verbal_noun_key:
            return [], [], [], []

        verbal_noun_entry = self.argument_processor.get_verbal_noun_entry(verbal_noun_key)
        ge_vn_tokens: List[Dict[str, Any]] = []
        en_vn_tokens: List[Dict[str, Any]] = []
        ge_adv_tokens: List[Dict[str, Any]] = []
        en_adv_tokens: List[Dict[str, Any]] = []

        if adverb_key:
            adverb_entry = self.argument_processor.get_adverb_entry(adverb_key)
            ge_adv_tokens.append(
                {"text": adverb_entry.get("georgian", ""), "role": "adverb", "layer": "adverbs", "toggleable": True}
            )
            en_adv_tokens.append(
                {"text": adverb_entry.get("english_literal", ""), "role": "adverb", "layer": "adverbs", "toggleable": True}
            )

        ge_vn_tokens.append(
            {"text": verbal_noun_entry.get("georgian", ""), "role": "verbal_noun", "layer": "always", "toggleable": False}
        )
        en_vn_tokens.append(
            {"text": verbal_noun_entry.get("english_literal", ""), "role": "verbal_noun", "layer": "always", "toggleable": False}
        )
        return ge_vn_tokens, en_vn_tokens, ge_adv_tokens, en_adv_tokens

    def _build_locative_surface_tokens(
        self, verb_data: Dict[str, Any], person: str
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
        adjuncts = verb_data.get("syntax", {}).get("adjuncts", {})
        loc_cfg = adjuncts.get("locativeSurface")
        if not loc_cfg:
            return [], []

        person_cfg = self.argument_processor.get_person_keyed_config(loc_cfg, person)
        surface_noun = person_cfg.get("surface_noun")
        postposition = person_cfg.get("postposition", "on")
        if loc_cfg.get("required") and not surface_noun:
            raise ValueError(f"Required locative surface missing for person={person}")
        if not surface_noun:
            return [], []

        ge, en = self.argument_processor.get_surface_phrase(surface_noun, postposition)
        return (
            [{"text": ge, "role": "locative_surface", "layer": "always", "toggleable": False}],
            [{"text": en, "role": "locative_surface", "layer": "always", "toggleable": False}],
        )

    def generate_example_structured(
        self,
        verb_id: int,
        tense: str,
        person: str,
        raw_gloss: str,
        verb_semantics: str,
        georgian_verb_form: str,
        verb_data: Optional[Dict] = None,
        effective_preverb: str = "",
    ) -> Dict[str, Any]:
        try:
            if not raw_gloss or not raw_gloss.strip():
                raise ValueError(
                    "Raw gloss is required for example generation - no defaults allowed"
                )

            try:
                parsed_gloss = self.argument_processor.parse_raw_gloss(raw_gloss)
                arguments = parsed_gloss.arguments
            except Exception as e:
                # Parsing failed - generation should fail, not use defaults
                raise ValueError(
                    f"Failed to parse raw gloss '{raw_gloss}': {e}. Raw gloss must be valid."
                )

            ge_role_tokens: Dict[str, List[Dict[str, Any]]] = {}
            en_role_tokens: Dict[str, List[Dict[str, Any]]] = {}
            georgian_components: Dict[str, Dict[str, Any]] = {}
            english_components: Dict[str, Dict[str, Any]] = {}

            syntax = verb_data.get("syntax", {}) if verb_data else {}
            syntax_args = syntax.get("arguments", {})
            syntax_prepositions = syntax.get("prepositions", {})

            if "subject" in arguments and self._should_include_subject(person):
                subject_cfg = syntax_args.get("subject", {}).get(person, {})
                ge_t, en_t, ge_c, en_c = self._build_argument_tokens(
                    person,
                    "subject",
                    subject_cfg,
                    arguments["subject"].get("case", "Nom"),
                    syntax_prepositions.get("subject", ""),
                )
                georgian_components["subject"] = ge_c
                english_components["subject"] = en_c
                self._append_role_tokens(ge_role_tokens, "subject", ge_t)
                self._append_role_tokens(en_role_tokens, "subject", en_t)
            elif person in ["1sg", "2sg", "1pl", "2pl"]:
                en_role_tokens["subject"] = [
                    {
                        "text": self._get_person_text(person),
                        "role": "subject",
                        "layer": "always",
                        "toggleable": False,
                    }
                ]
                english_components["subject"] = {
                    "text": self._get_person_text(person),
                    "role": "subject",
                    "person": person,
                }

            if "direct_object" in arguments:
                do_cfg = syntax_args.get("direct_object", {}).get(person, {})
                ge_t, en_t, ge_c, en_c = self._build_argument_tokens(
                    person,
                    "direct_object",
                    do_cfg,
                    arguments["direct_object"].get("case", "Nom"),
                    syntax_prepositions.get("direct_object", ""),
                )
                georgian_components["direct_object"] = ge_c
                english_components["direct_object"] = en_c
                self._append_role_tokens(ge_role_tokens, "direct_object", ge_t)
                self._append_role_tokens(en_role_tokens, "direct_object", en_t)

            if "indirect_object" in arguments:
                io_cfg = syntax_args.get("indirect_object", {}).get(person, {})
                ge_t, en_t, ge_c, en_c = self._build_argument_tokens(
                    person,
                    "indirect_object",
                    io_cfg,
                    arguments["indirect_object"].get("case", "Dat"),
                    syntax_prepositions.get("indirect_object", ""),
                )
                georgian_components["indirect_object"] = ge_c
                english_components["indirect_object"] = en_c
                self._append_role_tokens(ge_role_tokens, "indirect_object", ge_t)
                self._append_role_tokens(en_role_tokens, "indirect_object", en_t)

            ge_vn, en_vn, ge_adv, en_adv = self._build_verbal_noun_tokens(verb_data or {}, person)
            self._append_role_tokens(ge_role_tokens, "verbal_noun", ge_vn)
            self._append_role_tokens(en_role_tokens, "verbal_noun", en_vn)
            self._append_role_tokens(ge_role_tokens, "adverb", ge_adv)
            self._append_role_tokens(en_role_tokens, "adverb", en_adv)
            if ge_vn:
                georgian_components["verbal_noun"] = self._make_component_summary(ge_vn, "verbal_noun")
                english_components["verbal_noun"] = self._make_component_summary(en_vn, "verbal_noun")
            if ge_adv:
                georgian_components["adverb"] = self._make_component_summary(ge_adv, "adverb")
                english_components["adverb"] = self._make_component_summary(en_adv, "adverb")

            ge_loc, en_loc = self._build_locative_surface_tokens(verb_data or {}, person)
            self._append_role_tokens(ge_role_tokens, "locative_surface", ge_loc)
            self._append_role_tokens(en_role_tokens, "locative_surface", en_loc)
            if ge_loc:
                georgian_components["locative_surface"] = self._make_component_summary(
                    ge_loc, "locative_surface"
                )
                english_components["locative_surface"] = self._make_component_summary(
                    en_loc, "locative_surface"
                )

            ge_v_tok, en_v_tok = self._build_verb_component(
                tense, person, georgian_verb_form, verb_data, effective_preverb
            )
            ge_role_tokens["verb"] = [ge_v_tok]
            en_role_tokens["verb"] = [en_v_tok]
            georgian_components["verb"] = {"text": ge_v_tok["text"], "role": "verb"}
            english_components["verb"] = {"text": en_v_tok["text"], "role": "verb"}

            ge_order, en_order = self._get_default_composition_orders(syntax)

            ge_tokens = self._compose_by_order(ge_order, ge_role_tokens)
            en_tokens = self._compose_by_order(en_order, en_role_tokens)
            georgian_sentence = self._tokens_to_text(ge_tokens)
            english_sentence = self._capitalize_sentence(self._tokens_to_text(en_tokens))

            return {
                "georgian": georgian_sentence,
                "georgian_components": georgian_components,
                "english": english_sentence,
                "english_components": english_components,
                "tokens": {"georgian": ge_tokens, "english": en_tokens},
                "georgian_verb_form": georgian_verb_form,
                "person": person,
                "effective_preverb": effective_preverb,
            }

        except Exception as e:
            safe_log(
                logger,
                "error",
                f"Failed to generate structured example for verb {verb_id}, tense {tense}, person {person}: {e}",
            )
            logger.exception("Structured example generation traceback")
            raise ExampleGenerationError(f"Structured example generation failed: {e}")

    def _get_english_base_form(self, key: str, number: str, database_type: str) -> str:
        try:
            return self.argument_processor.get_english_translation(
                key, self.argument_processor.databases, "noun", number
            )
        except Exception:
            return key

    def _add_definite_article(self, text: str) -> str:
        """Add definite article 'The' to the first noun in text"""
        words = text.split()
        stop_words = {
            "the",
            "a",
            "an",
            "and",
            "or",
            "but",
            "in",
            "on",
            "at",
            "to",
            "for",
            "of",
            "with",
            "by",
        }

        for i, word in enumerate(words):
            clean_word = word.lower().strip(".,!?;:")
            if clean_word not in stop_words and len(clean_word) > 2:
                words[i] = f"The {word}"
                break

        return " ".join(words)

    def _apply_subject_verb_agreement(
        self, verb_translation: str, tense: str, person: str
    ) -> str:
        """
        Apply subject-verb agreement rules to the verb translation.

        Args:
            verb_translation: Base verb translation
            tense: Tense name (Pres, Impf, etc.)
            person: Person (1sg, 2sg, 3sg, 1pl, 2pl, 3pl)

        Returns:
            Verb translation with proper subject-verb agreement
        """
        import re

        # Present tense 3rd person singular: handle special cases
        if tense == "Pres" and person == "3sg":
            # Handle "am" → "is"
            if "am" in verb_translation:
                return re.sub(r"\bam\b", "is", verb_translation)

            # Handle special verb endings for 3rd person singular
            # Verbs ending in -o, -s, -x, -z, -ch, -sh get "es" ending
            if verb_translation.endswith(("o", "s", "x", "z", "ch", "sh")):
                return verb_translation + "es"

            # Verbs ending in consonant + y change y to ies
            if verb_translation.endswith("y") and len(verb_translation) > 1:
                # Check if the character before 'y' is a consonant
                consonants = "bcdfghjklmnpqrstvwxz"
                if verb_translation[-2].lower() in consonants:
                    return verb_translation[:-1] + "ies"

            # Check if the verb already ends with "s" (like "was", "is", etc.)
            if not verb_translation.endswith("s"):
                return verb_translation + "s"

        # Present tense 3rd person plural: handle "am" specially
        if tense == "Pres" and person == "3pl":
            if "am" in verb_translation:
                # Use word boundary replacement to avoid affecting words like "familiar"
                return re.sub(r"\bam\b", "are", verb_translation)

        # Imperfect tense 3rd person plural: change "was" to "were"
        if tense == "Impf" and person == "3pl":
            if "was" in verb_translation:
                # Use word boundary replacement to avoid affecting other words
                return re.sub(r"\bwas\b", "were", verb_translation)

        # Aorist tense 3rd person plural: change "was" to "were"
        if tense == "Aor" and person == "3pl":
            if "was" in verb_translation:
                # Use word boundary replacement to avoid affecting other words
                return re.sub(r"\bwas\b", "were", verb_translation)

        return verb_translation

    # Legacy component builder removed in favor of tokenized generation.

    def _get_verb_translation(
        self,
        verb_data: Optional[Dict] = None,
        tense: str = None,
        effective_preverb: str = "",
    ) -> str:
        """
        Extract and return verb translation from verb data.

        Args:
            verb_data: Verb data dictionary
            tense: Verb tense
            effective_preverb: Effective preverb being used

        Returns:
            Verb translation string

        Raises:
            ValueError: If no translation is available
        """
        try:
            # Get English translations
            english_translations = (
                verb_data.get("english_translations", {}) if verb_data else {}
            )

            # Convert mapped tense back to original tense name for English translation lookup
            original_tense = self.reverse_tense_mapping.get(tense, tense)

            # Debug logging
            safe_log(
                logger,
                "info",
                f"[ENGLISH_TRANSLATION] Effective preverb: '{effective_preverb}', Original tense: '{original_tense}'",
            )

            # Get the correct verb translation based on preverb
            if effective_preverb and effective_preverb in english_translations:
                # Use preverb-specific translation directly from english_translations
                verb_translation = english_translations[effective_preverb].get(
                    original_tense, ""
                )
                safe_log(
                    logger,
                    "info",
                    f"[ENGLISH_TRANSLATION] Using preverb-specific translation: '{verb_translation}'",
                )
            else:
                # Use default translation
                default_translations = english_translations.get("default", {})
                verb_translation = default_translations.get(original_tense, "")
                safe_log(
                    logger,
                    "info",
                    f"[ENGLISH_TRANSLATION] Using default translation: '{verb_translation}'",
                )

            if not verb_translation:
                safe_log(
                    logger,
                    "error",
                    f"[ENGLISH_TRANSLATION] No translation found for tense '{tense}'",
                )
                raise ValueError(f"No translation found for tense '{tense}'")

            return verb_translation

        except Exception as e:
            safe_log(logger, "error", f"Failed to get verb translation: {e}")
            raise ValueError(f"Failed to get verb translation: {e}")

    def _build_argument_english_text(
        self,
        verb_data: Optional[Dict] = None,
        person: str = None,
        argument_type: str = "subject",
        include_preposition: bool = False,
        capitalize_preposition: bool = False,
    ) -> str:
        """
        Build the English text for a specific argument (subject, direct object, indirect object)
        using the JSON structure.
        """
        try:
            # Get argument data
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            arguments = syntax.get("arguments", {})
            argument_args = arguments.get(argument_type, {})

            # Get noun and adjective for this person
            person_data = argument_args.get(person, {})
            noun_key = person_data.get("noun", "")
            adjective_key = person_data.get("adjective", "")

            # Handle empty noun key
            if not noun_key:
                error_msg = f"Missing noun key for {argument_type} argument in person {person} for verb {verb_data.get('id', 'N/A')}"
                guidance = f"Please configure the {argument_type} noun in the Arguments section of the verb editor before generating examples."
                logger.error(f"{error_msg}. {guidance}")
                raise ValueError(f"{error_msg}. {guidance}")

            # Adjectives are optional in compositional rendering

            # Get case form
            case = person_data.get("case", "nom").lower()
            number = "plural" if person == "3pl" else "singular"

            # Get case form from selected object - pass number parameter for 3pl subjects
            case_form = self.argument_processor.get_case_form(
                noun_key, case, self.argument_processor.databases, number
            )

            georgian_text = case_form
            if adjective_key:
                adj_case_form = self.argument_processor.get_adjective_form(
                    adjective_key, case, self.argument_processor.databases
                )
                georgian_text = f"{adj_case_form} {case_form}"

            # Add definite article if case is Nom or Acc
            if case in ["nom", "acc"]:
                georgian_text = self._add_definite_article(georgian_text)

            # Get English form - pass number parameter for 3pl subjects
            noun_english = self._get_english_base_form(
                noun_key,
                (
                    "plural"
                    if person == "3pl" and argument_type == "subject"
                    else "singular"
                ),
                self.DATABASE_TYPE_MAPPING.get(argument_type, "subjects"),
            )
            adj_english = self._get_english_base_form(
                adjective_key, "singular", "adjectives"
            )

            english_text = noun_english
            if adjective_key:
                english_text = f"{adj_english} {noun_english}"

            # Add preposition if specified
            syntax = verb_data.get("syntax", {}) if verb_data else {}
            prepositions = syntax.get("prepositions", {})
            argument_preposition = prepositions.get(argument_type, "")

            if include_preposition and argument_preposition:
                # Capitalize "the" to "The" for subjects
                if argument_type == "subject" and argument_preposition.lower() == "the":
                    argument_preposition = "The"
                english_text = f"{argument_preposition} {english_text}"

            return english_text

        except Exception as e:
            error_msg = f"Failed to build English text for {argument_type} argument in person {person}: {e}"
            guidance = "Please check the verb configuration and ensure all required argument data is properly configured."
            logger.error(f"{error_msg}. {guidance}")
            raise ValueError(f"{error_msg}. {guidance}")

    def _get_person_text(self, person: str) -> str:
        """Get the English text for a person"""
        person_mapping = {
            "1sg": "I",
            "2sg": "You,",
            "1pl": "We",
            "2pl": "You all (you formal),",
        }
        return person_mapping.get(person, "subject")

    def _get_database_type(self, argument_type: str) -> str:
        """
        Get the database type for an argument type.

        Args:
            argument_type: Type of argument

        Returns:
            Database type string
        """
        return self.DATABASE_TYPE_MAPPING.get(argument_type, "subjects")


def generate_examples(
    verb_data: Dict, tense: str, selected_preverbs: Optional[List[str]] = None
) -> Dict[str, Any]:
    """
    Generate examples for a verb and tense using the JSON structure

    Args:
        verb_data: Verb data from verb editor
        tense: Tense name (present, imperfect, etc.)
        selected_preverbs: List of preverbs to generate examples for (for multi-preverb verbs)

    Returns:
        Dictionary with examples data organized by preverb
    """
    logger.info(
        f"[EXAMPLES] Starting example generation for tense: {tense}, selected_preverbs: {selected_preverbs}"
    )

    try:
        # Get tense data from conjugations structure
        conjugations = verb_data.get("conjugations", {})
        tense_conjugation = conjugations.get(tense, {})

        if not isinstance(tense_conjugation, dict):
            safe_log(
                logger,
                "warning",
                f"[EXAMPLES] Verb {verb_data.get('id', 'unknown')} ({verb_data.get('georgian', 'unknown')}): No valid tense conjugation data for {tense}",
            )
            return {"examples": [], "raw_gloss": ""}

        # Extract data from structure
        raw_gloss = tense_conjugation.get("raw_gloss", "")
        verb_semantics = verb_data.get("semantic_key", "to do")
        verb_id = verb_data.get("id", 0)

        # Determine which preverbs to generate examples for
        preverb_config = verb_data.get("preverb_config", {})
        has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

        safe_log(
            logger,
            "info",
            f"[EXAMPLES] Verb has multiple preverbs: {has_multiple_preverbs}",
        )
        safe_log(logger, "info", f"[EXAMPLES] Preverb config: {preverb_config}")

        if has_multiple_preverbs and selected_preverbs:
            # Multi-preverb verb with selected preverbs
            preverbs_to_generate = selected_preverbs
            safe_log(
                logger,
                "info",
                f"[EXAMPLES] Using selected preverbs: {selected_preverbs}",
            )
        elif has_multiple_preverbs:
            # Multi-preverb verb, use all available preverbs
            preverbs_to_generate = preverb_config.get("available_preverbs", [])
            safe_log(
                logger,
                "info",
                f"[EXAMPLES] Using all available preverbs: {preverbs_to_generate}",
            )
        else:
            # Single preverb verb, use default
            preverbs_to_generate = [preverb_config.get("default_preverb", "")]
            safe_log(
                logger,
                "info",
                f"[EXAMPLES] Using default preverb: {preverbs_to_generate}",
            )

        # Generate examples for each preverb
        all_examples = []
        fallback_warnings = []

        generator = ExampleGenerator()

        # For imperative tense, use 2sg and 2pl instead of 1sg, 3sg, 3pl
        if tense == "imperative":
            persons = generator.IMPERATIVE_PERSONS
        else:
            persons = generator.STANDARD_PERSONS

        # Generate examples for each person across all preverbs
        for person in persons:
            for preverb in preverbs_to_generate:
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Generating example for person: {person}, preverb: {preverb}",
                )

                # Handle preverb fallbacks (even for empty preverbs)
                effective_preverb = get_effective_preverb(verb_data, preverb, tense)
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Effective preverb for {preverb}: {effective_preverb}",
                )

                # Check if preverb fallback occurred
                if effective_preverb != preverb:
                    safe_log(
                        logger,
                        "warning",
                        f"[EXAMPLES] Verb {verb_id} ({verb_data.get('georgian', 'unknown')}): Preverb fallback '{preverb}' -> '{effective_preverb}' in {tense} tense",
                    )
                    fallback_warnings.append(
                        {
                            "original_preverb": preverb,
                            "effective_preverb": effective_preverb,
                            "tense": tense,
                            "message": f"Preverb '{preverb}' falls back to '{effective_preverb}' in {tense} tense",
                        }
                    )

                # Get the correct verb form for this preverb and tense
                georgian_form = get_conjugation_form_for_preverb(
                    verb_data, tense, person, effective_preverb
                )
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Georgian form for {person} with preverb {effective_preverb}: {georgian_form}",
                )

                if not georgian_form or georgian_form == "-":
                    safe_log(
                        logger,
                        "warning",
                        f"[EXAMPLES] Verb {verb_id} ({verb_data.get('georgian', 'unknown')}): No valid form for {person} with preverb '{effective_preverb}' in {tense} tense",
                    )
                    continue

                # Generate the example
                mapped_tense = generator.tense_mapping.get(tense, tense)
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Original tense: '{tense}', mapped tense: '{mapped_tense}'",
                )
                # Use the structured method
                example = generator.generate_example_structured(
                    verb_id=verb_id,
                    tense=mapped_tense,
                    person=person,
                    raw_gloss=raw_gloss,
                    verb_semantics=verb_semantics,
                    georgian_verb_form=georgian_form,
                    verb_data=verb_data,
                    effective_preverb=effective_preverb,
                )
                safe_log(
                    logger,
                    "info",
                    f"[EXAMPLES] Generated structured example: {example.get('georgian', 'N/A')} -> {example.get('english_components', 'N/A')}",
                )

                # Find or create the preverb group in all_examples
                preverb_group = None
                for group in all_examples:
                    if group["preverb"] == preverb:
                        preverb_group = group
                        break

                if not preverb_group:
                    preverb_group = {
                        "preverb": preverb,
                        "effective_preverb": effective_preverb,
                        "examples": [],
                    }
                    all_examples.append(preverb_group)
                    safe_log(
                        logger,
                        "info",
                        f"[EXAMPLES] Created preverb group for: {preverb}",
                    )

                preverb_group["examples"].append(example)

        return {
            "examples": all_examples,
            "raw_gloss": raw_gloss,
            "fallback_warnings": fallback_warnings if fallback_warnings else None,
        }

    except Exception as e:
        safe_log(logger, "error", f"Failed to generate examples: {e}")
        logger.exception(
            "Example generation traceback (verb_id=%s, tense=%s, selected_preverbs=%s)",
            verb_data.get("id", "unknown"),
            tense,
            selected_preverbs,
        )

        # Provide more specific error information
        error_details = str(e)
        error_type = "unknown"

        if "arguments" in error_details.lower() or "syntax" in error_details.lower():
            error_type = "missing_arguments"
        elif "raw_gloss" in error_details.lower() or "gloss" in error_details.lower():
            error_type = "invalid_raw_gloss"
        elif "preverb" in error_details.lower():
            error_type = "preverb_config"
        elif "noun" in error_details.lower() or "adjective" in error_details.lower():
            error_type = "missing_lexical_data"

        return {
            "examples": [],
            "raw_gloss": "",
            "error": {
                "type": error_type,
                "message": error_details,
                "guidance": get_error_guidance(error_type),
            },
        }


def get_effective_preverb(verb_data: Dict, preverb: str, tense: str) -> str:
    """
    Get the effective preverb for a given preverb and tense, handling fallbacks

    Args:
        verb_data: Verb data dictionary
        preverb: Requested preverb
        tense: Tense name

    Returns:
        Effective preverb to use (may be different due to fallbacks)
    """
    safe_log(
        logger,
        "info",
        f"[PREVERB] Getting effective preverb for: {preverb} in tense: {tense}",
    )

    preverb_rules = verb_data.get("preverb_rules", {})
    safe_log(logger, "info", f"[PREVERB] Preverb rules: {preverb_rules}")

    # Check for tense-specific fallbacks
    tense_fallbacks = preverb_rules.get("tense_specific_fallbacks", {})
    if preverb in tense_fallbacks and tense in tense_fallbacks[preverb]:
        effective = tense_fallbacks[preverb][tense]
        safe_log(
            logger,
            "info",
            f"[PREVERB] Found tense-specific fallback: {preverb} -> {effective}",
        )
        return effective

    # English fallbacks are now handled automatically by the verb data processor
    # when form fallbacks are applied, so no manual checking is needed here

    # No fallback, use original preverb
    safe_log(
        logger,
        "info",
        f"[PREVERB] No fallback found, using original preverb: {preverb}",
    )
    return preverb


def get_error_guidance(error_type: str) -> str:
    """
    Get user-friendly guidance for different error types

    Args:
        error_type: Type of error that occurred

    Returns:
        User-friendly guidance message
    """
    guidance_messages = {
        "missing_arguments": "Please configure arguments in the Arguments section before generating examples.",
        "invalid_raw_gloss": "Please enter a valid raw gloss pattern (e.g., '<S-DO>') in the Raw Gloss field.",
        "preverb_config": "Please check your preverb configuration in the Preverb Configuration section.",
        "missing_lexical_data": "Please ensure noun and adjective data is available for the selected arguments.",
        "unknown": "Please check your configuration and try again.",
    }

    return guidance_messages.get(error_type, guidance_messages["unknown"])


def get_conjugation_form_for_preverb(
    verb_data: Dict, tense: str, person: str, preverb: str
) -> str:
    """
    Get conjugation form for a specific preverb

    Args:
        verb_data: Verb data dictionary
        tense: Tense name
        person: Person form
        preverb: Preverb to use

    Returns:
        Georgian verb form
    """
    logger.info(
        f"[CONJUGATION] Getting form for tense: {tense}, person: {person}, preverb: {preverb}"
    )

    # Use the verb_conjugation module to get the proper form with preverb handling
    form = get_conjugation_form(verb_data, tense, person, preverb)
    logger.info(f"[CONJUGATION] Retrieved form: {form}")

    return form
