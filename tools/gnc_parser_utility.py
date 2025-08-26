#!/usr/bin/env python3
"""
GNC Parser Utility

A utility class for integrating the Georgian National Corpus parsing API
into the existing verb-website project.
"""

import requests
import json
import time
from typing import Dict, Any, List, Optional
from dataclasses import dataclass


@dataclass
class MorphologicalAnalysis:
    """Data class for morphological analysis results"""

    word: str
    lemma: str
    features: str
    pos: str  # Part of speech
    person: Optional[str] = None
    tense: Optional[str] = None
    voice: Optional[str] = None
    case: Optional[str] = None
    number: Optional[str] = None


class GNCParserUtility:
    """Utility class for GNC API integration"""

    def __init__(self, base_url: str = "http://gnc.gov.ge/gnc/parse-api"):
        self.base_url = base_url
        self.session_id: Optional[str] = None
        self.session_timeout = 300  # 5 minutes
        self.last_session_time = 0
        self.cache = {}  # Simple cache for parsed words

    def _get_session(self) -> bool:
        """Get a new session ID from the API"""
        try:
            response = requests.get(f"{self.base_url}?command=get-session", timeout=10)
            response.raise_for_status()
            data = response.json()

            self.session_id = data.get("session-id")
            self.last_session_time = time.time()

            if self.session_id:
                return True
            return False

        except requests.exceptions.RequestException as e:
            print(f"Error getting session: {e}")
            return False

    def _ensure_session(self) -> bool:
        """Ensure there is a valid session"""
        current_time = time.time()

        # Check if session is expired or doesn't exist
        if (
            not self.session_id
            or current_time - self.last_session_time > self.session_timeout
        ):
            return self._get_session()

        return True

    def parse_word(
        self, word: str, use_cache: bool = True
    ) -> Optional[MorphologicalAnalysis]:
        """Parse a single Georgian word"""

        # Check cache first
        if use_cache and word in self.cache:
            return self.cache[word]

        # Ensure there is a valid session
        if not self._ensure_session():
            return None

        try:
            # Parse the word
            parse_url = f"{self.base_url}?command=parse&session-id={self.session_id}"
            parse_data = {"text": word}

            response = requests.post(parse_url, data=parse_data, timeout=10)
            response.raise_for_status()
            result = response.json()

            # Extract analysis
            analysis = self._extract_analysis(result, word)

            # Cache the result
            if use_cache and analysis:
                self.cache[word] = analysis

            return analysis

        except requests.exceptions.RequestException as e:
            print(f"Error parsing word '{word}': {e}")
            return None

    def parse_sentence(self, sentence: str) -> List[MorphologicalAnalysis]:
        """Parse a Georgian sentence"""
        if not self._ensure_session():
            return []

        try:
            parse_url = f"{self.base_url}?command=parse&session-id={self.session_id}"
            parse_data = {"text": sentence}

            response = requests.post(parse_url, data=parse_data, timeout=15)
            response.raise_for_status()
            result = response.json()

            analyses = []
            if "tokens" in result:
                for token in result["tokens"]:
                    analysis = self._extract_analysis(
                        {"tokens": [token]}, token.get("word", "")
                    )
                    if analysis:
                        analyses.append(analysis)

            return analyses

        except requests.exceptions.RequestException as e:
            print(f"Error parsing sentence: {e}")
            return []

    def _extract_analysis(
        self, result: Dict[str, Any], word: str
    ) -> Optional[MorphologicalAnalysis]:
        """Extract morphological analysis from API response"""
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
        parsed_features = self._parse_features(features)

        analysis = MorphologicalAnalysis(
            word=word, lemma=lemma, features=features, **parsed_features
        )

        return analysis

    def _parse_features(self, features: str) -> Dict[str, Any]:
        """Parse morphological features string into structured data"""
        parsed = {
            "pos": "Unknown",
            "person": None,
            "tense": None,
            "voice": None,
            "case": None,
            "number": None,
        }

        feature_parts = features.split()

        for part in feature_parts:
            if part == "V":
                parsed["pos"] = "Verb"
            elif part == "N":
                parsed["pos"] = "Noun"
            elif part == "Adj":
                parsed["pos"] = "Adjective"
            elif part == "Adv":
                parsed["pos"] = "Adverb"
            elif part == "Interj":
                parsed["pos"] = "Interjection"
            elif part in ["Pres", "Past", "Fut"]:
                parsed["tense"] = part
            elif part in ["MedAct", "Act", "Pass"]:
                parsed["voice"] = part
            elif part.startswith("S:"):
                parsed["person"] = part
            elif part.startswith("<S:"):
                parsed["case"] = part.strip("<>")
            elif part.startswith("<DO:"):
                parsed["case"] = part.strip("<>")
            elif part.startswith("<IO:"):
                parsed["case"] = part.strip("<>")

        return parsed

    def get_verb_info(self, verb_form: str) -> Optional[Dict[str, Any]]:
        """Get detailed verb information for a specific form"""
        analysis = self.parse_word(verb_form)

        if not analysis or analysis.pos != "Verb":
            return None

        return {
            "form": verb_form,
            "lemma": analysis.lemma,
            "person": analysis.person,
            "tense": analysis.tense,
            "voice": analysis.voice,
            "features": analysis.features,
        }

    def validate_georgian_word(self, word: str) -> bool:
        """Validate if a word is recognized by the GNC parser"""
        analysis = self.parse_word(word)
        return analysis is not None

    def clear_cache(self):
        """Clear the word cache"""
        self.cache.clear()

    def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        return {
            "cached_words": len(self.cache),
            "session_id": self.session_id,
            "session_age": (
                time.time() - self.last_session_time if self.session_id else None
            ),
        }


# Example usage and integration functions
def integrate_with_verb_database(
    parser: GNCParserUtility, verb_form: str
) -> Dict[str, Any]:
    """Example function showing how to integrate with existing verb database"""

    verb_info = parser.get_verb_info(verb_form)

    if not verb_info:
        return {"error": f"Could not parse verb form: {verb_form}"}

    # This could be integrated with your existing verb database
    return {
        "verb_form": verb_form,
        "morphological_analysis": verb_info,
        "integration_ready": True,
        "suggested_uses": [
            "Add to verb conjugation database",
            "Validate user input",
            "Generate example sentences",
            "Provide grammatical explanations",
        ],
    }


def test_integration():
    """Test the integration utility"""
    print("🔍 Testing GNC Parser Utility Integration")
    print("=" * 50)

    parser = GNCParserUtility()

    # Test words
    test_words = ["ვამბობ", "ვწერ", "ვკითხულობ", "გამარჯობა"]

    for word in test_words:
        print(f"\n📝 Testing: '{word}'")

        # Parse word
        analysis = parser.parse_word(word)

        if analysis:
            print(f"  ✅ Parsed successfully")
            print(f"  📖 Lemma: {analysis.lemma}")
            print(f"  🔍 POS: {analysis.pos}")
            print(f"  👤 Person: {analysis.person}")
            print(f"  ⏰ Tense: {analysis.tense}")
            print(f"  🎭 Voice: {analysis.voice}")

            # Test integration
            integration_result = integrate_with_verb_database(parser, word)
            print(
                f"  🔗 Integration: {integration_result.get('integration_ready', False)}"
            )
        else:
            print(f"  ❌ Failed to parse")

    # Test cache
    cache_stats = parser.get_cache_stats()
    print(f"\n📊 Cache stats: {cache_stats}")


if __name__ == "__main__":
    test_integration()
