#!/usr/bin/env python3
"""
Verb Scraper for lingua.ge
Scrapes verb conjugation data from lingua.ge pages and returns structured data
Designed to work with the Verb Editor GUI system
"""

import json
import re
from typing import Dict, List, Optional, Any
import requests
from bs4 import BeautifulSoup


class VerbScraper:
    def __init__(self):
        """Initialize the scraper without file dependencies"""
        pass

    def scrape_verb(self, url: str) -> Optional[Dict[str, Any]]:
        """Main method to scrape a verb page and return structured data"""
        return self.scrape_verb_page(url)

    def scrape_verb_page(self, url: str) -> Optional[Dict[str, Any]]:
        """Scrape a verb page from lingua.ge and return structured data"""
        try:
            # Add headers to mimic a real browser
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate",
                "Connection": "keep-alive",
                "Upgrade-Insecure-Requests": "1",
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, "html.parser")

            # Extract basic verb information
            basic_info = self.extract_basic_info(soup, url)
            if not basic_info:
                return None

            # Extract conjugation data
            conjugations = self.extract_conjugations(soup)

            # Create the complete verb data
            verb_data = {
                **basic_info,
                "conjugations": conjugations,
            }

            # Set default values for missing fields
            verb_data = self.set_default_values(verb_data)

            return verb_data

        except requests.RequestException as e:
            print(f"Error fetching page: {e}")
            return None
        except Exception as e:
            print(f"Error parsing page: {e}")
            return None

    def extract_basic_info(
        self, soup: BeautifulSoup, url: str
    ) -> Optional[Dict[str, Any]]:
        """Extract basic verb information from the page"""
        try:
            # Extract Georgian verb from page title
            title = soup.find("title")
            georgian = ""
            if title:
                title_text = title.get_text()
                # Extract Georgian text from title (e.g., "დანახვა - Lingua.ge")
                georgian_match = re.search(r"([ა-ჰ]+)", title_text)
                if georgian_match:
                    georgian = georgian_match.group(1)

            # Extract English translation
            english = self.extract_english_translation(soup)

            # Extract infinitive form
            infinitive = self.extract_infinitive(soup)
            if not infinitive and georgian:
                infinitive = georgian

            # Extract preverb
            preverb = self.extract_preverb(soup)

            # Extract voice and transitivity
            voice = self.extract_voice(soup)
            transitivity = self.extract_transitivity(soup)

            return {
                "georgian": infinitive,
                "english": english or "",
                "description": (
                    f"to {english}" if english else f"to {infinitive.lower()}"
                ),
                "category": "",
                "class": "",
                "semantic_key": (f"{english}" if english else f"{infinitive.lower()}"),
                "notes": "",
                "url": url,
                "english_translations": {
                    "present": english or "",
                    "imperfect": f"was {english}ing" if english else "",
                    "future": f"will {english}" if english else "",
                    "aorist": english or "",
                    "optative": english or "",
                    "imperative": english or "",
                },
                "prepositions": {"indirect_object": "to", "direct_object": ""},
                "overrides": {
                    "subject": {"noun": "", "adjective": ""},
                    "direct_object": {"noun": "", "adjective": ""},
                    "indirect_object": {"noun": "", "adjective": ""},
                },
                "preverb_config": {
                    "has_multiple_preverbs": False,
                    "default_preverb": preverb,
                    "available_preverbs": [preverb] if preverb else [],
                    "stem_based": False,
                },
            }

        except Exception as e:
            print(f"Error extracting basic info: {e}")
            return None

    def extract_english_translation(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract English translation from the page"""
        # Look for the English translation in text-editor widgets
        text_editors = soup.find_all("div", class_="elementor-widget-text-editor")
        for editor in text_editors:
            text = editor.get_text().strip()
            # Look for patterns like "to go v.i." or "to see v.t."
            english_match = re.search(
                r"to\s+([a-zA-Z]+)\s+v\.(i|t)\.", text, re.IGNORECASE
            )
            if english_match:
                return english_match.group(1).lower()

        return None

    def extract_infinitive(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract infinitive form from the page"""
        # Look for the infinitive section
        text_editors = soup.find_all("div", class_="elementor-widget-text-editor")
        for i, editor in enumerate(text_editors):
            text = editor.get_text().strip()
            if "Infinitive" in text:
                # The next text-editor should contain the infinitive form
                if i + 1 < len(text_editors):
                    infinitive = text_editors[i + 1].get_text().strip()
                    if re.search(r"[ა-ჰ]+", infinitive):
                        return infinitive
        return None

    def extract_preverb(self, soup: BeautifulSoup) -> str:
        """Extract preverb from the page"""
        text_editors = soup.find_all("div", class_="elementor-widget-text-editor")
        for i, editor in enumerate(text_editors):
            text = editor.get_text().strip()
            if "Preverb" in text:
                # The next text-editor should contain the preverb
                if i + 1 < len(text_editors):
                    preverb = text_editors[i + 1].get_text().strip()
                    if preverb and preverb != "-":
                        return preverb
        return ""

    def extract_voice(self, soup: BeautifulSoup) -> str:
        """Extract voice from the page"""
        text_editors = soup.find_all("div", class_="elementor-widget-text-editor")
        for i, editor in enumerate(text_editors):
            text = editor.get_text().strip()
            if "Voice" in text:
                # The next text-editor should contain the voice
                if i + 1 < len(text_editors):
                    voice = text_editors[i + 1].get_text().strip()
                    if voice:
                        return voice
        return "მოქმედებითი"  # Default to active voice

    def extract_transitivity(self, soup: BeautifulSoup) -> str:
        """Extract transitivity from the page"""
        text_editors = soup.find_all("div", class_="elementor-widget-text-editor")
        for i, editor in enumerate(text_editors):
            text = editor.get_text().strip()
            if "Transitivity" in text:
                # The next text-editor should contain the transitivity
                if i + 1 < len(text_editors):
                    transitivity = text_editors[i + 1].get_text().strip()
                    if transitivity:
                        return transitivity
        return "გარდამავალი"  # Default to transitive

    def extract_conjugations(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """Extract conjugation forms from the page"""
        conjugations = {
            "present": {
                "forms": {},
                "gloss": {"raw_gloss": "", "preverb": ""},
                "examples": [],
            },
            "imperfect": {
                "forms": {},
                "gloss": {"raw_gloss": "", "preverb": ""},
                "examples": [],
            },
            "future": {
                "forms": {},
                "gloss": {"raw_gloss": "", "preverb": ""},
                "examples": [],
            },
            "aorist": {
                "forms": {},
                "gloss": {"raw_gloss": "", "preverb": ""},
                "examples": [],
            },
            "optative": {
                "forms": {},
                "gloss": {"raw_gloss": "", "preverb": ""},
                "examples": [],
            },
            "imperative": {
                "forms": {},
                "gloss": {"raw_gloss": "", "preverb": ""},
                "examples": [],
            },
        }

        # Extract present forms
        present_forms = self.extract_tense_forms(soup, "Present indicative")
        if present_forms:
            conjugations["present"]["forms"] = present_forms

        # Extract imperfect forms
        imperfect_forms = self.extract_tense_forms(soup, "Imperfect")
        if imperfect_forms:
            conjugations["imperfect"]["forms"] = imperfect_forms

        # Extract future forms
        future_forms = self.extract_tense_forms(soup, "Future indicative")
        if future_forms:
            conjugations["future"]["forms"] = future_forms

        # Extract aorist forms
        aorist_forms = self.extract_tense_forms(soup, "Aorist indicative")
        if aorist_forms:
            conjugations["aorist"]["forms"] = aorist_forms

        # Extract optative forms
        optative_forms = self.extract_tense_forms(soup, "Optative")
        if optative_forms:
            conjugations["optative"]["forms"] = optative_forms

        # Extract imperative forms
        imperative_forms = self.extract_imperative_forms(soup)
        if imperative_forms:
            conjugations["imperative"]["forms"] = imperative_forms

        return conjugations

    def extract_imperative_forms(self, soup: BeautifulSoup) -> Dict[str, str]:
        """Extract imperative forms - they have a different structure than other tenses"""
        forms = {}

        # Find the heading that contains "Affirmative Imperative"
        headings = soup.find_all(["h2", "h3", "h4"])
        target_heading = None

        for heading in headings:
            heading_text = heading.get_text().lower()
            if "affirmative imperative" in heading_text:
                target_heading = heading
                break

        if not target_heading:
            return forms

        # Find the parent column that contains this heading
        column = target_heading.find_parent("div", class_="elementor-column")
        if not column:
            return forms

        # Look for text-editor widgets that contain Georgian text within this column
        text_editors = column.find_all("div", class_="elementor-widget-text-editor")

        # Imperative has a different structure: 5 forms instead of 6
        # Structure: 2sg, 3sg, 1pl, 2pl, 3pl (no 1sg)
        georgian_forms = []
        for editor in text_editors:
            text = editor.get_text().strip()
            # Skip the heading text itself and only get Georgian verb forms
            if (
                re.search(r"[ა-ჰ]+", text)
                and len(text) > 2
                and not any(skip in text.lower() for skip in ["sg", "pl", "მხ", "მრ"])
            ):
                georgian_forms.append(text)

        # Map the forms to format - imperative doesn't have 1sg
        if len(georgian_forms) >= 5:
            forms["1sg"] = "-"  # Imperative doesn't have 1st person singular
            forms["2sg"] = georgian_forms[0]
            forms["3sg"] = georgian_forms[1]
            forms["1pl"] = georgian_forms[2]
            forms["2pl"] = georgian_forms[3]
            forms["3pl"] = georgian_forms[4]

        return forms

    def extract_tense_forms(
        self, soup: BeautifulSoup, tense_name: str
    ) -> Dict[str, str]:
        """Extract forms for a specific tense"""
        forms = {}

        # Find the heading that contains the tense name
        headings = soup.find_all(["h2", "h3", "h4"])
        target_heading = None

        for heading in headings:
            heading_text = heading.get_text().lower()
            if tense_name.lower() in heading_text:
                target_heading = heading
                break

        if not target_heading:
            return forms

        # Find the parent column that contains this heading
        column = target_heading.find_parent("div", class_="elementor-column")
        if not column:
            return forms

        # Look for text-editor widgets that contain Georgian text within this column
        text_editors = column.find_all("div", class_="elementor-widget-text-editor")

        # The structure is: heading, then 6 forms (1sg, 2sg, 3sg, 1pl, 2pl, 3pl)
        georgian_forms = []
        for editor in text_editors:
            text = editor.get_text().strip()
            # Skip the heading text itself and only get Georgian verb forms
            if (
                re.search(r"[ა-ჰ]+", text)
                and len(text) > 2
                and not any(skip in text.lower() for skip in ["sg", "pl", "მხ", "მრ"])
            ):
                georgian_forms.append(text)

        # Map the forms to format
        if len(georgian_forms) >= 6:
            forms["1sg"] = georgian_forms[0]
            forms["2sg"] = georgian_forms[1]
            forms["3sg"] = georgian_forms[2]
            forms["1pl"] = georgian_forms[3]
            forms["2pl"] = georgian_forms[4]
            forms["3pl"] = georgian_forms[5]

        return forms

    def set_default_values(self, verb_data: Dict[str, Any]) -> Dict[str, Any]:
        """Set default values for missing fields"""
        # The basic info extraction already sets most of the required fields
        # Just ensure there is the required structure
        if "english_translations" not in verb_data:
            verb_data["english_translations"] = {
                "present": verb_data.get("english", ""),
                "imperfect": f"was {verb_data.get('english', '')}",
                "future": f"will {verb_data.get('english', '')}",
                "aorist": verb_data.get("english", ""),
                "optative": verb_data.get("english", ""),
                "imperative": verb_data.get("english", ""),
            }

        if "prepositions" not in verb_data:
            verb_data["prepositions"] = {"indirect_object": "", "direct_object": ""}

        if "overrides" not in verb_data:
            verb_data["overrides"] = {
                "subject": {"noun": "", "adjective": ""},
                "direct_object": {"noun": "", "adjective": ""},
                "indirect_object": {"noun": "", "adjective": ""},
            }

        if "preverb_config" not in verb_data:
            verb_data["preverb_config"] = {
                "has_multiple_preverbs": False,
                "default_preverb": verb_data.get("preverb", ""),
                "available_preverbs": (
                    [verb_data.get("preverb", "")] if verb_data.get("preverb") else []
                ),
                "stem_based": False,
            }

        return verb_data
