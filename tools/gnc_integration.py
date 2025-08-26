#!/usr/bin/env python3
"""
GNC Integration for Verb Editor

This module provides comprehensive integration with the Georgian National Corpus API
for automatic raw gloss generation and argument pattern detection in the verb editor.
"""

import requests
import json
import time
import re
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum


class Tense(Enum):
    """Georgian tense enumeration"""

    PRESENT = "Pres"
    IMPERFECT = "Impf"
    FUTURE = "Fut"
    AORIST = "Aor"
    OPTATIVE = "Opt"
    IMPERATIVE = "Impv"


class ArgumentPattern(Enum):
    """Argument pattern enumeration"""

    SUBJECT_ONLY = "<S>"
    SUBJECT_DIRECT_OBJECT = "<S-DO>"
    SUBJECT_INDIRECT_OBJECT = "<S-IO>"
    SUBJECT_DIRECT_INDIRECT_OBJECT = "<S-DO-IO>"


@dataclass
class GNCAnalysis:
    """Data class for GNC API analysis results"""

    word: str
    lemma: str
    features: str
    tense: Optional[str] = None
    voice: Optional[str] = None
    argument_pattern: Optional[str] = None
    case_markers: Optional[Dict[str, str]] = None
    is_valid: bool = True
    error_message: Optional[str] = None


class GNCFeatureParser:
    """Parser for GNC morphological features"""

    def __init__(self):
        # Tense mapping for validation
        self.tense_mapping = {
            "present": Tense.PRESENT.value,
            "imperfect": Tense.IMPERFECT.value,
            "future": Tense.FUTURE.value,
            "aorist": Tense.AORIST.value,
            "optative": Tense.OPTATIVE.value,
            "imperative": Tense.IMPERATIVE.value,
        }

        # Argument pattern regex patterns
        self.argument_patterns = {
            ArgumentPattern.SUBJECT_ONLY: r"<S>",
            ArgumentPattern.SUBJECT_DIRECT_OBJECT: r"<S-DO>",
            ArgumentPattern.SUBJECT_INDIRECT_OBJECT: r"<S-IO>",
            ArgumentPattern.SUBJECT_DIRECT_INDIRECT_OBJECT: r"<S-DO-IO>",
        }

        # Case marker patterns
        self.case_patterns = {
            "subject": r"<S:([A-Za-z]+)>",
            "direct_object": r"<DO:([A-Za-z]+)>",
            "indirect_object": r"<IO:([A-Za-z]+)>",
        }

    def parse_features(self, features: str) -> GNCAnalysis:
        """Parse GNC features string into structured analysis"""
        if not features:
            return GNCAnalysis(
                word="",
                lemma="",
                features="",
                is_valid=False,
                error_message="No features provided",
            )

        # Extract basic components
        parts = features.split()

        # Extract tense
        tense = None
        for part in parts:
            if part in [t.value for t in Tense]:
                tense = part
                break

        # Extract voice
        voice = None
        voice_patterns = ["MedAct", "Act", "Pass", "MedPass"]
        for part in parts:
            if part in voice_patterns:
                voice = part
                break

        # Extract argument pattern
        argument_pattern = self._extract_argument_pattern(features)

        # Extract case markers
        case_markers = self._extract_case_markers(features)

        return GNCAnalysis(
            word="",  # Will be set by caller
            lemma="",  # Will be set by caller
            features=features,
            tense=tense,
            voice=voice,
            argument_pattern=argument_pattern,
            case_markers=case_markers,
            is_valid=True,
        )

    def _extract_argument_pattern(self, features: str) -> Optional[str]:
        """Extract argument pattern from features string"""
        for pattern_enum, pattern_regex in self.argument_patterns.items():
            if re.search(pattern_regex, features):
                return pattern_enum.value
        return None

    def _extract_case_markers(self, features: str) -> Dict[str, str]:
        """Extract case markers from features string"""
        case_markers = {}

        for arg_type, pattern in self.case_patterns.items():
            match = re.search(pattern, features)
            if match:
                case_markers[arg_type] = match.group(1)

        return case_markers

    def generate_raw_gloss(self, analysis: GNCAnalysis, expected_tense: str) -> str:
        """Generate raw gloss from GNC analysis"""
        if not analysis.is_valid or not analysis.tense or not analysis.voice:
            return ""

        # Validate tense matches expected
        expected_tense_abbr = self.tense_mapping.get(expected_tense.lower())
        if not expected_tense_abbr or analysis.tense != expected_tense_abbr:
            return ""

        # Build raw gloss
        parts = ["V", analysis.voice, analysis.tense]

        # Add argument pattern and case markers
        if analysis.argument_pattern:
            parts.append(analysis.argument_pattern)

            # Add case markers in correct order
            if analysis.case_markers:
                if "subject" in analysis.case_markers:
                    parts.append(f"<S:{analysis.case_markers['subject']}>")
                if "direct_object" in analysis.case_markers:
                    parts.append(f"<DO:{analysis.case_markers['direct_object']}>")
                if "indirect_object" in analysis.case_markers:
                    parts.append(f"<IO:{analysis.case_markers['indirect_object']}>")

        return " ".join(parts)

    def get_argument_pattern_enum(self, pattern: str) -> Optional[ArgumentPattern]:
        """Convert string pattern to enum"""
        for enum_val in ArgumentPattern:
            if enum_val.value == pattern:
                return enum_val
        return None


class GNCIntegration:
    """Main integration class for GNC API with verb editor"""

    def __init__(self, base_url: str = "http://gnc.gov.ge/gnc/parse-api"):
        self.base_url = base_url
        self.session_id: Optional[str] = None
        self.session_timeout = 300  # 5 minutes
        self.last_session_time = 0
        self.cache = {}
        self.parser = GNCFeatureParser()

        # Forms to use for GNC analysis for each tense
        self.tense_analysis_forms = {
            "present": "1sg",  # Use 1sg for present
            "imperfect": "1sg",  # Use 1sg for imperfect
            "future": "1sg",  # Use 1sg for future
            "aorist": "1sg",  # Use 1sg for aorist
            "optative": "1sg",  # Use 1sg for optative
            "imperative": "2sg",  # Use 2sg for imperative (fallback to 2pl if needed)
        }

    def _get_session(self) -> bool:
        """Get a new session ID from the API"""
        try:
            response = requests.get(f"{self.base_url}?command=get-session", timeout=10)
            response.raise_for_status()
            data = response.json()

            self.session_id = data.get("session-id")
            self.last_session_time = time.time()

            return bool(self.session_id)

        except requests.exceptions.RequestException as e:
            print(f"Error getting GNC session: {e}")
            return False

    def _ensure_session(self) -> bool:
        """Ensure there is a valid session"""
        current_time = time.time()

        if (
            not self.session_id
            or current_time - self.last_session_time > self.session_timeout
        ):
            return self._get_session()

        return True

    def analyze_verb_form(self, verb_form: str) -> Optional[GNCAnalysis]:
        """Analyze a single verb form using GNC API"""

        # Check cache first
        if verb_form in self.cache:
            return self.cache[verb_form]

        # Ensure there is  a valid session
        if not self._ensure_session():
            return None

        try:
            # Parse the verb form
            parse_url = f"{self.base_url}?command=parse&session-id={self.session_id}"
            parse_data = {"text": verb_form}

            response = requests.post(parse_url, data=parse_data, timeout=10)
            response.raise_for_status()
            result = response.json()

            # Extract analysis
            analysis = self._extract_analysis(result, verb_form)

            # Cache the result
            if analysis and analysis.is_valid:
                self.cache[verb_form] = analysis

            return analysis

        except requests.exceptions.RequestException as e:
            print(f"Error analyzing verb form '{verb_form}': {e}")
            return None

    def _extract_analysis(
        self, result: Dict[str, Any], verb_form: str
    ) -> Optional[GNCAnalysis]:
        """Extract analysis from GNC API response"""
        if "tokens" not in result or not result["tokens"]:
            return None

        token = result["tokens"][0]
        if "msa" not in token or not token["msa"]:
            return None

        # Get the first analysis (most likely)
        msa = token["msa"][0]
        lemma = msa.get("lemma", "")
        features = msa.get("features", "")

        # Parse features
        analysis = self.parser.parse_features(features)
        analysis.word = verb_form
        analysis.lemma = lemma

        return analysis

    def generate_raw_gloss_for_tense(
        self, conjugations: Dict[str, str], tense: str
    ) -> Tuple[str, Optional[str]]:
        """Generate raw gloss for a specific tense using appropriate form"""

        # Get the appropriate form for the tense
        person_key = self.tense_analysis_forms.get(tense.lower())
        if not person_key or person_key not in conjugations:
            return "", f"No {person_key} form available for analysis"

        verb_form = conjugations[person_key]
        if not verb_form or verb_form.strip() == "":
            return "", f"{person_key} form is empty"

        # Special handling for imperative: try 2sg first, then 2pl if needed
        if tense.lower() == "imperative" and person_key == "2sg":
            # Try 2sg first
            analysis = self.analyze_verb_form(verb_form)
            if analysis and analysis.is_valid:
                raw_gloss = self.parser.generate_raw_gloss(analysis, tense)
                if raw_gloss:
                    return raw_gloss, None

            # If 2sg failed, try 2pl
            if "2pl" in conjugations and conjugations["2pl"]:
                verb_form_2pl = conjugations["2pl"]
                analysis_2pl = self.analyze_verb_form(verb_form_2pl)
                if analysis_2pl and analysis_2pl.is_valid:
                    raw_gloss_2pl = self.parser.generate_raw_gloss(analysis_2pl, tense)
                    if raw_gloss_2pl:
                        return raw_gloss_2pl, None

        # Standard analysis for other tenses
        analysis = self.analyze_verb_form(verb_form)
        if not analysis:
            return "", "Failed to analyze verb form"

        if not analysis.is_valid:
            return "", analysis.error_message or "Invalid analysis"

        # Generate raw gloss
        raw_gloss = self.parser.generate_raw_gloss(analysis, tense)
        if not raw_gloss:
            return "", f"Could not generate raw gloss for {tense} tense"

        return raw_gloss, None

    def get_argument_pattern_from_raw_gloss(self, raw_gloss: str) -> Optional[str]:
        """Extract argument pattern from raw gloss for dropdown selection"""
        if not raw_gloss:
            return None

        # Extract argument pattern from raw gloss
        for pattern_enum in ArgumentPattern:
            if pattern_enum.value in raw_gloss:
                return pattern_enum.value

        return None

    def process_verb_conjugations(
        self, conjugations_data: Dict[str, Dict[str, str]]
    ) -> Dict[str, Any]:
        """Process all conjugations for a verb and generate raw glosses"""

        results = {
            "raw_glosses": {},
            "argument_pattern": None,
            "success_count": 0,
            "error_count": 0,
            "errors": [],
            "auto_generated": True,
        }

        # Process each tense
        for tense, conjugations in conjugations_data.items():
            raw_gloss, error = self.generate_raw_gloss_for_tense(conjugations, tense)

            if raw_gloss:
                results["raw_glosses"][tense] = raw_gloss
                results["success_count"] += 1

                # Use first successful raw gloss to determine argument pattern
                if not results["argument_pattern"]:
                    results["argument_pattern"] = (
                        self.get_argument_pattern_from_raw_gloss(raw_gloss)
                    )
            else:
                results["errors"].append(f"{tense}: {error}")
                results["error_count"] += 1

        return results

    def get_fallback_instructions(self, verb_form: str) -> str:
        """Generate fallback instructions for manual GNC lookup"""
        return (
            f"GNC API unavailable. Please visit "
            f"https://clarino.uib.no/gnc/page?page-id=gnc-main-page, "
            f"select the GNC corpus from the Corpus list tab, and search for "
            f"'{verb_form}' in the Query tab to find the raw gloss in the Features section "
            f"of the query results."
        )

    def clear_cache(self):
        """Clear the analysis cache"""
        self.cache.clear()

    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        return {
            "cached_forms": len(self.cache),
            "session_id": self.session_id,
            "session_age": (
                time.time() - self.last_session_time if self.session_id else None
            ),
        }


# Integration functions for verb editor
def integrate_with_verb_editor(
    conjugations_data: Dict[str, Dict[str, str]],
) -> Dict[str, Any]:
    """Main integration function for verb editor"""

    gnc = GNCIntegration()

    try:
        # Process conjugations
        results = gnc.process_verb_conjugations(conjugations_data)

        if results["success_count"] > 0:
            results["message"] = (
                f"Successfully generated {results['success_count']} raw glosses automatically"
            )
            results["status"] = "success"
        else:
            results["message"] = "Failed to generate any raw glosses"
            results["status"] = "error"
            results["fallback_instructions"] = gnc.get_fallback_instructions(
                "verb_form"
            )

        return results

    except Exception as e:
        return {
            "status": "error",
            "message": f"Integration error: {str(e)}",
            "raw_glosses": {},
            "argument_pattern": None,
            "success_count": 0,
            "error_count": 0,
            "errors": [str(e)],
            "auto_generated": False,
            "fallback_instructions": gnc.get_fallback_instructions("verb_form"),
        }


def test_integration():
    """Test the GNC integration"""
    print("🔍 Testing GNC Integration for Verb Editor")
    print("=" * 60)

    # Test data
    test_conjugations = {
        "present": {
            "1sg": "ვამბობ",
            "2sg": "ამბობ",
            "3sg": "ამბობს",
            "1pl": "ვამბობთ",
            "2pl": "ამბობთ",
            "3pl": "ამბობენ",
        },
        "imperfect": {
            "1sg": "ვამბობდი",
            "2sg": "ამბობდი",
            "3sg": "ამბობდა",
            "1pl": "ვამბობდით",
            "2pl": "ამბობდით",
            "3pl": "ამბობდნენ",
        },
    }

    # Test integration
    results = integrate_with_verb_editor(test_conjugations)

    print(f"Status: {results['status']}")
    print(f"Message: {results['message']}")
    print(f"Success count: {results['success_count']}")
    print(f"Error count: {results['error_count']}")

    if results["raw_glosses"]:
        print("\n📋 Generated Raw Glosses:")
        for tense, raw_gloss in results["raw_glosses"].items():
            print(f"  {tense}: {raw_gloss}")

    if results["argument_pattern"]:
        print(f"\n🎯 Argument Pattern: {results['argument_pattern']}")

    if results["errors"]:
        print("\n❌ Errors:")
        for error in results["errors"]:
            print(f"  {error}")

    return results


if __name__ == "__main__":
    test_integration()
