#!/usr/bin/env python3
"""
Build script for Bagh
Generates static HTML from JSON data and copies assets to dist folder.

This script:
1. Loads verb data from src/data/verbs.json
2. Generates complete HTML with all verb tables and examples
3. Copies CSS, JS, and font assets to dist/ folder
4. Creates a production-ready static website

Usage: python tools/build.py
"""

import json
import os
import shutil
import html
import re
from pathlib import Path
from gloss_parser import GlossParser
from example_generator import EnhancedExampleGenerator
from verb_form_generator import get_verb_form, get_verb_gloss, get_verb_examples


def calculate_preverb_forms(forms, preverb_rules, target_preverb):
    """
    Calculate preverb forms based on preverb rules.

    Args:
        forms: Dictionary of conjugation forms with default preverb
        preverb_rules: Dictionary containing preverb replacement rules
        target_preverb: The target preverb to apply

    Returns:
        Dictionary of forms with the target preverb applied
    """
    if not preverb_rules:
        return forms

    default_preverb = preverb_rules.get("default", "")
    replacements = preverb_rules.get("replacements", {})
    tense_specific_fallbacks = preverb_rules.get("tense_specific_fallbacks", {})

    # Get the actual replacement for this preverb
    replacement = replacements.get(target_preverb, target_preverb)

    # Check for tense-specific fallbacks
    if target_preverb in tense_specific_fallbacks:
        # For now, we'll handle this in the calling function
        # This is a placeholder for future tense-specific logic
        pass

    # Normalize preverb values by removing hyphens for comparison
    normalized_target = target_preverb.replace("-", "")
    normalized_default = default_preverb.replace("-", "")

    # If the target preverb is the same as the default preverb, return the original forms
    if normalized_target == normalized_default:
        return forms

    result = {}
    for person, form in forms.items():
        if form == "-" or form == "":
            result[person] = form
        elif form.startswith(default_preverb):
            # Extract the stem (remove the default preverb) and apply the new preverb
            stem = form[len(default_preverb) :]
            result[person] = replacement + stem
        else:
            # Handle irregular forms that don't follow prefix pattern
            result[person] = form

    return result


def get_preverb_mappings(verb_data, preverb_rules):
    """
    Generate all preverb mappings for a verb.

    Args:
        verb_data: Verb data dictionary
        preverb_rules: Preverb rules dictionary

    Returns:
        Dictionary of all preverb mappings for all tenses
    """
    if not preverb_rules:
        return {}

    available_preverbs = preverb_rules.get("replacements", {}).keys()
    conjugations = verb_data.get("conjugations", {})

    all_mappings = {}

    for tense, tense_data in conjugations.items():
        if "forms" not in tense_data:
            continue

        forms = tense_data["forms"]
        tense_mappings = {}

        for preverb in available_preverbs:
            tense_mappings[preverb] = calculate_preverb_forms(
                forms, preverb_rules, preverb
            )

        all_mappings[tense] = tense_mappings

    return all_mappings


def load_json_data():
    """Load verb data from JSON file."""
    try:
        json_path = Path(__file__).parent.parent / "src" / "data" / "verbs.json"

        if not json_path.exists():
            print(f"Error: verbs.json not found at {json_path}")
            return []

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        verbs = data.get("verbs", [])
        print(f"Loaded {len(verbs)} verbs from JSON")
        return verbs

    except FileNotFoundError:
        print(f"Error: verbs.json not found at {json_path}")
        return []
    except json.JSONDecodeError as e:
        print(f"Error parsing JSON: {e}")
        return []
    except Exception as e:
        print(f"Unexpected error loading JSON: {e}")
        return []


def load_semantic_mapping():
    """Load semantic mapping data from JSON file."""
    try:
        mapping_path = (
            Path(__file__).parent.parent / "src" / "data" / "verb_semantic_mapping.json"
        )

        if not mapping_path.exists():
            print(f"Info: verb_semantic_mapping.json not found at {mapping_path}")
            print(
                "Semantic mapping file has been removed as it's not used by the current system."
            )
            return {}

        with open(mapping_path, "r", encoding="utf-8") as f:
            mapping = json.load(f)

        print(f"Loaded semantic mapping for {len(mapping)} verbs")
        return mapping

    except FileNotFoundError:
        print(f"Info: verb_semantic_mapping.json not found at {mapping_path}")
        print(
            "Semantic mapping file has been removed as it's not used by the current system."
        )
        return {}
    except json.JSONDecodeError as e:
        print(f"Error parsing semantic mapping JSON: {e}")
        return {}
    except Exception as e:
        print(f"Unexpected error loading semantic mapping: {e}")
        return {}


def validate_semantic_mappings(verbs, semantic_mapping):
    """Validate that all verbs have semantic mappings."""
    print("\n=== Semantic Mapping Validation ===")

    # Check if semantic mapping is being used
    if not semantic_mapping:
        print("Semantic mapping file is empty or not being used by current system.")
        print(
            "The current example generation system doesn't rely on semantic mappings."
        )
        print("✓ Semantic mapping validation passed (not required)")
        print("=== End Validation ===\n")
        return True

    missing_mappings = []
    total_verbs = len(verbs)
    mapped_verbs = 0

    for verb in verbs:
        english_key = verb.get("english", "")
        if not english_key:
            print(f"Warning: Verb ID {verb.get('id', 'unknown')} has no English key")
            continue

        if english_key in semantic_mapping:
            mapped_verbs += 1
        else:
            missing_mappings.append(
                {
                    "id": verb.get("id", "unknown"),
                    "georgian": verb.get("georgian", "unknown"),
                    "english": english_key,
                    "description": verb.get("description", "unknown"),
                }
            )

    # Report results
    print(f"Total verbs: {total_verbs}")
    print(f"Verbs with semantic mappings: {mapped_verbs}")
    print(f"Verbs missing semantic mappings: {len(missing_mappings)}")

    if missing_mappings:
        print("\nVerbs missing semantic mappings:")
        for verb in missing_mappings:
            print(
                f"  - ID {verb['id']}: {verb['georgian']} ({verb['english']}) - {verb['description']}"
            )

        print(
            f"\nValidation Summary: {len(missing_mappings)} verbs are missing semantic mappings."
        )
        print(
            "Note: The current example generation system doesn't rely on semantic mappings."
        )
        print("These missing mappings won't affect functionality.")
    else:
        print("\n✓ All verbs have semantic mappings!")

    print("=== End Validation ===\n")

    return len(missing_mappings) == 0


def validate_verb_data_structure(verbs):
    """Validate verb data structure and required fields."""
    print("\n=== Verb Data Structure Validation ===")

    validation_errors = []
    total_verbs = len(verbs)

    for verb in verbs:
        verb_id = verb.get("id")
        georgian = verb.get("georgian", "")
        english = verb.get("english", "")

        # Check required fields
        if not verb_id:
            validation_errors.append(f"Verb missing ID: {georgian} ({english})")
            continue

        if not georgian:
            validation_errors.append(f"Verb ID {verb_id} missing Georgian form")

        if not english:
            validation_errors.append(f"Verb ID {verb_id} missing English translation")

        # Check conjugation data
        conjugations = verb.get("conjugations", {})
        if not conjugations:
            validation_errors.append(f"Verb ID {verb_id} missing conjugation data")
        else:
            # Check for required tenses (using full names as they appear in the JSON)
            required_tenses = [
                "present",
                "imperfect",
                "future",
                "aorist",
                "optative",
                "imperative",
            ]
            missing_tenses = []
            for tense in required_tenses:
                if tense not in conjugations:
                    missing_tenses.append(tense)
            if missing_tenses:
                validation_errors.append(
                    f"Verb ID {verb_id} missing tenses: {', '.join(missing_tenses)}"
                )

        # Check preverb configuration
        preverb_config = verb.get("preverb_config", {})
        if preverb_config:
            # Validate preverb config structure
            if preverb_config.get("has_multiple_preverbs", False):
                if preverb_config.get("stem_based", False):
                    available_preverbs = preverb_config.get("available_preverbs", [])
                    if not available_preverbs:
                        validation_errors.append(
                            f"Verb ID {verb_id} has stem_based=True but no available_preverbs"
                        )
                else:
                    preverbs = preverb_config.get("preverbs", {})
                    if not preverbs:
                        validation_errors.append(
                            f"Verb ID {verb_id} has has_multiple_preverbs=True but no preverbs"
                        )

    # Report results
    print(f"Total verbs checked: {total_verbs}")
    print(f"Validation errors found: {len(validation_errors)}")

    if validation_errors:
        print("\nValidation errors:")
        for error in validation_errors:
            print(f"  - {error}")
        print(
            f"\nValidation Summary: {len(validation_errors)} data structure issues found."
        )
    else:
        print("\n✓ All verbs have valid data structure!")

    print("=== End Validation ===\n")

    return len(validation_errors) == 0


def validate_semantic_mapping_structure(semantic_mapping):
    """Validate semantic mapping data structure."""
    print("\n=== Semantic Mapping Structure Validation ===")

    validation_errors = []
    total_mappings = len(semantic_mapping)

    # Check if semantic mapping is empty (which is acceptable if not being used)
    if total_mappings == 0:
        print("Semantic mapping file is empty or not being used by current system.")
        print(
            "This is acceptable as the current example generation system doesn't rely on semantic mappings."
        )
        print("✓ Semantic mapping validation passed (not required)")
        print("=== End Validation ===\n")
        return True

    # Check for old vs new structure
    has_old_structure = False
    has_new_structure = False

    for english_key, mapping_data in semantic_mapping.items():
        if not isinstance(mapping_data, dict):
            validation_errors.append(
                f"Invalid mapping structure for '{english_key}': not a dictionary"
            )
            continue

        # Check for old structure (compatible_subjects, etc.)
        if "compatible_subjects" in mapping_data:
            has_old_structure = True

        # Check for new structure (semantic_domain, argument_patterns)
        if "semantic_domain" in mapping_data:
            has_new_structure = True

        # If neither structure is found, mark as problematic
        if not has_old_structure and not has_new_structure:
            validation_errors.append(
                f"Mapping for '{english_key}' has unknown structure"
            )

    # Report structure type
    if has_old_structure and not has_new_structure:
        print("Detected old semantic mapping structure (compatible_subjects, etc.)")
        print("This structure is not currently used by the example generation system.")
        print("Consider updating to new structure or removing if not needed.")
    elif has_new_structure and not has_old_structure:
        print(
            "Detected new semantic mapping structure (semantic_domain, argument_patterns)"
        )
        print("Validating new structure...")

        # Validate new structure
        for english_key, mapping_data in semantic_mapping.items():
            if "semantic_domain" not in mapping_data:
                validation_errors.append(
                    f"Mapping for '{english_key}' missing semantic_domain"
                )

            if "argument_patterns" not in mapping_data:
                validation_errors.append(
                    f"Mapping for '{english_key}' missing argument_patterns"
                )
            else:
                # Validate argument patterns
                patterns = mapping_data["argument_patterns"]
                if not isinstance(patterns, list):
                    validation_errors.append(
                        f"Mapping for '{english_key}' has invalid argument_patterns (not a list)"
                    )
                else:
                    for pattern in patterns:
                        if not isinstance(pattern, str):
                            validation_errors.append(
                                f"Mapping for '{english_key}' has invalid argument pattern: {pattern}"
                            )
                        elif pattern not in ["<S>", "<S-DO>", "<S-IO>", "<S-DO-IO>"]:
                            validation_errors.append(
                                f"Mapping for '{english_key}' has unknown argument pattern: {pattern}"
                            )
    elif has_old_structure and has_new_structure:
        print("Mixed semantic mapping structure detected (both old and new)")
        print("This may cause issues. Consider standardizing to one structure.")
        validation_errors.append("Mixed semantic mapping structure detected")

    # Report results
    print(f"Total semantic mappings checked: {total_mappings}")
    print(f"Validation errors found: {len(validation_errors)}")

    if validation_errors:
        print("\nValidation errors:")
        for error in validation_errors:
            print(f"  - {error}")
        print(
            f"\nValidation Summary: {len(validation_errors)} semantic mapping structure issues found."
        )
    else:
        print("\n✓ Semantic mapping structure is valid!")

    print("=== End Validation ===\n")

    return len(validation_errors) == 0


def validate_database_files():
    """Validate that all required database files exist and are valid JSON."""
    print("\n=== Database Files Validation ===")

    validation_errors = []
    required_databases = [
        "subject_database.json",
        "direct_object_database.json",
        "indirect_object_database.json",
        "adjective_database.json",
    ]

    data_dir = Path(__file__).parent.parent / "src" / "data"

    for db_file in required_databases:
        db_path = data_dir / db_file
        if not db_path.exists():
            validation_errors.append(f"Database file missing: {db_file}")
        else:
            try:
                with open(db_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                print(f"✓ {db_file} - Valid JSON")
            except json.JSONDecodeError as e:
                validation_errors.append(
                    f"Database file {db_file} has invalid JSON: {e}"
                )
            except Exception as e:
                validation_errors.append(f"Error reading database file {db_file}: {e}")

    # Report results
    print(f"Total database files checked: {len(required_databases)}")
    print(f"Validation errors found: {len(validation_errors)}")

    if validation_errors:
        print("\nValidation errors:")
        for error in validation_errors:
            print(f"  - {error}")
        print(
            f"\nValidation Summary: {len(validation_errors)} database file issues found."
        )
    else:
        print("\n✓ All database files are valid!")

    print("=== End Validation ===\n")

    return len(validation_errors) == 0


def run_comprehensive_validation(verbs, semantic_mapping):
    """Run all validation checks and return overall status."""
    print("\n" + "=" * 60)
    print("COMPREHENSIVE VALIDATION REPORT")
    print("=" * 60)

    validation_results = []

    # Run all validation checks
    validation_results.append(
        ("Semantic Mappings", validate_semantic_mappings(verbs, semantic_mapping))
    )
    validation_results.append(
        ("Verb Data Structure", validate_verb_data_structure(verbs))
    )
    validation_results.append(
        (
            "Semantic Mapping Structure",
            validate_semantic_mapping_structure(semantic_mapping),
        )
    )
    validation_results.append(("Database Files", validate_database_files()))

    # Calculate overall status
    passed_checks = sum(1 for _, passed in validation_results if passed)
    total_checks = len(validation_results)

    print("\n" + "=" * 60)
    print("VALIDATION SUMMARY")
    print("=" * 60)
    print(f"Passed: {passed_checks}/{total_checks} validation checks")

    for check_name, passed in validation_results:
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  {check_name}: {status}")

    if passed_checks == total_checks:
        print("\n🎉 All validation checks passed! Data is ready for build.")
    else:
        print(
            f"\n⚠️  {total_checks - passed_checks} validation check(s) failed. Please review the issues above."
        )

    print("=" * 60 + "\n")

    return passed_checks == total_checks


def create_preverb_selector(verb_data):
    """Create preverb toggle selector for verb section."""
    preverb_config = verb_data.get("preverb_config", {})

    # Don't show selector for single-preverb verbs
    if not preverb_config.get("has_multiple_preverbs", False):
        return ""

    default_preverb = preverb_config.get("default_preverb", "")

    # Handle stem-based verbs with available_preverbs array
    if preverb_config.get("stem_based", False):
        available_preverbs = preverb_config.get("available_preverbs", [])

        selector_html = f"""
            <div class="preverb-selector">
                <label for="preverb-toggle-{verb_data['id']}">Preverb:</label>
                <select id="preverb-toggle-{verb_data['id']}" class="preverb-toggle" data-verb-id="{verb_data['id']}">
        """

        for preverb in available_preverbs:
            selected = "selected" if preverb == default_preverb else ""
            selector_html += f'<option value="{preverb}" {selected}>{preverb}</option>'

        selector_html += """
                </select>
            </div>
        """

        return selector_html

    # Handle old multi-preverb structure
    preverbs = preverb_config.get("preverbs", {})

    selector_html = f"""
        <div class="preverb-selector">
            <label for="preverb-toggle-{verb_data['id']}">Preverb:</label>
            <select id="preverb-toggle-{verb_data['id']}" class="preverb-toggle" data-verb-id="{verb_data['id']}">
    """

    for preverb, data in preverbs.items():
        meaning = data.get("meaning", "")
        selected = "selected" if preverb == default_preverb else ""
        selector_html += (
            f'<option value="{preverb}" {selected}>{preverb} - {meaning}</option>'
        )

    selector_html += """
            </select>
        </div>
    """

    return selector_html


def create_preverb_aware_table(verb_data, selected_preverb=None):
    """Create conjugation table for specific preverb."""
    preverb_config = verb_data.get("preverb_config", {})
    preverb_rules = verb_data.get("preverb_rules", {})

    # Handle single-preverb verbs
    if not preverb_config.get("has_multiple_preverbs", False):
        return create_overview_table(verb_data, selected_preverb)

    # Handle multi-preverb verbs
    if selected_preverb is None:
        selected_preverb = preverb_config.get("default_preverb", "")

    # Handle new preverb rules structure
    if preverb_rules:
        # Calculate preverb forms using the new rules
        preverb_conjugations = {}
        conjugations = verb_data.get("conjugations", {})

        for tense, tense_data in conjugations.items():
            if "forms" in tense_data:
                forms = tense_data["forms"]
                calculated_forms = calculate_preverb_forms(
                    forms, preverb_rules, selected_preverb
                )
                preverb_conjugations[tense] = {
                    "forms": calculated_forms,
                    "gloss": tense_data.get("gloss", {}),
                    "examples": tense_data.get("examples", []),
                }

        return create_overview_table(
            {"conjugations": preverb_conjugations}, selected_preverb
        )

    # For stem-based verbs, pass the full verb data to let get_verb_form handle preverb combination
    if preverb_config.get("stem_based", False):
        return create_overview_table(verb_data, selected_preverb)

    # Handle old multi-preverb structure (fallback)
    preverb_conjugations = {}
    for tense, tense_data in verb_data.get("conjugations", {}).items():
        if isinstance(tense_data, dict) and selected_preverb in tense_data:
            preverb_conjugations[tense] = tense_data[selected_preverb]
        elif isinstance(tense_data, dict):
            # Fallback to first available preverb
            first_preverb = next(iter(tense_data.keys()))
            preverb_conjugations[tense] = tense_data[first_preverb]

    return create_overview_table(
        {"conjugations": preverb_conjugations}, selected_preverb
    )


def has_tense_forms(verb, tense, preverb=None):
    """Check if a verb has any forms for a given tense and preverb."""
    persons = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]

    # Handle new preverb rules structure
    preverb_rules = verb.get("preverb_rules", {})
    if preverb_rules and preverb:
        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})
        if "forms" in tense_data:
            forms = tense_data["forms"]
            calculated_forms = calculate_preverb_forms(forms, preverb_rules, preverb)
            return any(
                calculated_forms.get(person) and calculated_forms[person] != "-"
                for person in persons
            )

    # Fallback to original logic
    return any(get_verb_form(verb, tense, person, preverb) for person in persons)


def create_preverb_aware_examples(verb_data, preverb_rules):
    """
    Generate examples for all preverbs, applying fallback rules for both
    Georgian forms and English translations.
    """
    examples_by_preverb = {}
    gloss_analyses_by_preverb = {}

    # Get all available preverbs
    available_preverbs = list(preverb_rules.get("replacements", {}).keys())

    for preverb in available_preverbs:
        examples_by_tense = {}
        gloss_analyses_by_tense = {}

        # Process each tense
        for tense, tense_data in verb_data.get("conjugations", {}).items():
            if "forms" in tense_data:
                # Determine effective preverb for both forms and English translations
                effective_preverb = preverb
                english_fallbacks = preverb_rules.get("english_fallbacks", {})
                if preverb in english_fallbacks and tense in english_fallbacks[preverb]:
                    # Use fallback preverb for both forms and English translations
                    effective_preverb = english_fallbacks[preverb][tense]

                # Calculate forms using the effective preverb
                calculated_forms = calculate_preverb_forms(
                    tense_data["forms"], preverb_rules, effective_preverb
                )

                # Create modified verb data for example generation
                # Use calculated_forms (effective preverb) instead of original forms
                modified_verb = {
                    "id": verb_data.get("id", 0),
                    "semantic_key": verb_data.get("semantic_key", "to do"),
                    "conjugations": {
                        tense: {
                            "forms": calculated_forms,  # This uses the effective preverb
                            "examples": tense_data.get("examples", []),
                            "gloss": tense_data.get("gloss", {}),
                            "raw_gloss": tense_data.get("gloss", {}).get(
                                "raw_gloss", ""
                            ),
                            "preverb": effective_preverb,  # Use effective preverb for gloss
                        }
                    },
                    "preverb_translations": verb_data.get("preverb_translations", {}),
                    "effective_preverb": effective_preverb,
                    "preverb_config": verb_data.get("preverb_config", {}),
                    "prepositions": verb_data.get("prepositions", {}),
                    "overrides": verb_data.get("overrides", {}),
                }

                # Generate examples for this tense (without gloss analysis)
                examples_html = create_examples_without_gloss(modified_verb, tense)
                if examples_html:
                    examples_by_tense[tense] = examples_html

                # Generate gloss analysis for this preverb and tense
                # Use effective_preverb for gloss analysis to match the fallback logic
                gloss_html = create_gloss_analysis_for_preverb(
                    tense_data, effective_preverb, tense
                )
                if gloss_html:
                    gloss_analyses_by_tense[tense] = gloss_html

        examples_by_preverb[preverb] = examples_by_tense
        gloss_analyses_by_preverb[preverb] = gloss_analyses_by_tense

    return examples_by_preverb, gloss_analyses_by_preverb


def get_english_translation(preverb_translations, preverb, tense, person):
    """
    Get English translation for a specific preverb, tense, and person.
    """
    # Normalize preverb (remove hyphen)
    normalized_preverb = preverb.replace("-", "")

    # Navigate the translation structure
    if (
        normalized_preverb in preverb_translations
        and tense in preverb_translations[normalized_preverb]
        and person in preverb_translations[normalized_preverb][tense]
    ):
        translation = preverb_translations[normalized_preverb][tense][person]
        return translation

    # Fallback to default
    return "go"


def process_raw_gloss(raw_gloss: str, preverb: str = None) -> str:
    """
    Process raw gloss and convert to verbose format.

    Args:
        raw_gloss: Raw gloss in GNC format
        preverb: Preverb value when Pv appears in gloss

    Returns:
        Formatted verbose gloss
    """
    if not raw_gloss:
        return ""

    parser = GlossParser()

    # Validate preverb requirement
    if parser.validate_preverb_requirement(raw_gloss, preverb):
        # Preverb is required but not provided or empty
        if not preverb or not preverb.strip():
            print(f"Warning: Preverb required for gloss containing 'Pv': {raw_gloss}")
            return raw_gloss

    return parser.parse_raw_gloss(raw_gloss, preverb)


def format_raw_gloss_with_colors(raw_gloss: str) -> str:
    """
    Format raw gloss with color coding for V, S, DO, IO elements and case-marked patterns.

    Args:
        raw_gloss: Raw gloss string (e.g., "V Act Pres <S-DO> <S:Nom> <DO:Dat>")

    Returns:
        HTML-formatted raw gloss with color-coded elements
    """
    import re

    # Define color classes for different elements (order matters - longer patterns first)
    color_mapping = {
        "S:Nom": "gloss-subject",
        "S:Erg": "gloss-subject",
        "S:Dat": "gloss-subject",
        "DO:Nom": "gloss-direct-object",
        "DO:Dat": "gloss-direct-object",
        "IO:Nom": "gloss-indirect-object",
        "IO:Dat": "gloss-indirect-object",
        "V": "gloss-verb",
        "S": "gloss-subject",
        "DO": "gloss-direct-object",
        "IO": "gloss-indirect-object",
    }

    # Split the raw gloss into components
    components = raw_gloss.split()
    formatted_components = []

    for component in components:
        # Check if component contains case frame elements
        if "<" in component and ">" in component:
            # Handle case frame components like <S-DO>, <S:Nom>, etc.
            formatted_component = component
            for element, color_class in color_mapping.items():
                if element in component:
                    # Replace the element with color-coded version
                    formatted_component = formatted_component.replace(
                        element, f'<span class="{color_class}">{element}</span>'
                    )
            formatted_components.append(formatted_component)
        elif component in color_mapping:
            # Handle standalone elements like V
            formatted_components.append(
                f'<span class="{color_mapping[component]}">{component}</span>'
            )
        else:
            # Keep other components as-is
            formatted_components.append(component)

    return " ".join(formatted_components)


def format_gloss_for_html(case_gloss: str) -> str:
    """
    Format case gloss for HTML display with CSS classes and color coding.

    Args:
        case_gloss: Raw case gloss string

    Returns:
        HTML-formatted gloss with CSS classes and color coding
    """
    import html

    # Split into lines
    lines = case_gloss.split("\n")

    # Process each line
    formatted_lines = []
    for line in lines:
        if ":" in line:
            # Handle case frame components specially
            if line.startswith("<") and ">" in line:
                # Case frame component like "<S-DO>: Subject, Direct Object"
                # Find the closing > and the colon after it
                gt_pos = line.find(">")
                if gt_pos != -1:
                    colon_pos = line.find(":", gt_pos)
                    if colon_pos != -1:
                        # Extract the full component including angle brackets, but not the colon
                        component = line[:colon_pos]  # Don't include the colon
                        definition = line[colon_pos + 1 :].strip()

                        # Special handling for auxiliary markers
                        if component in ["<AuxIntr>", "<AuxTrans>", "<AuxTransHum>"]:
                            # For auxiliary markers, preserve them as-is without color coding
                            color_coded_component = component
                        else:
                            # Color code the component elements (order matters - longer patterns first)
                            color_coded_component = component

                            # Handle compound patterns like S-IO, S-DO, S-DO-IO by processing individual elements
                            if "-" in component and (
                                "S" in component or "DO" in component or "IO" in component
                            ):
                                # Handle compound patterns with angle brackets like <S-DO-IO>
                                if component.startswith("<") and component.endswith(">"):
                                    # Extract content between angle brackets
                                    inner_content = component[1:-1]  # Remove < and >
                                    parts = inner_content.split("-")
                                    color_coded_parts = []
                                    for part in parts:
                                        if part == "S":
                                            color_coded_parts.append(
                                                '<span class="gloss-subject">S</span>'
                                            )
                                        elif part == "DO":
                                            color_coded_parts.append(
                                                '<span class="gloss-direct-object">DO</span>'
                                            )
                                        elif part == "IO":
                                            color_coded_parts.append(
                                                '<span class="gloss-indirect-object">IO</span>'
                                            )
                                        else:
                                            color_coded_parts.append(part)
                                    # Reconstruct with angle brackets
                                    color_coded_component = (
                                        "<" + "-".join(color_coded_parts) + ">"
                                    )
                                else:
                                    # Handle patterns without angle brackets
                                    parts = component.split("-")
                                    color_coded_parts = []
                                    for part in parts:
                                        if part == "S":
                                            color_coded_parts.append(
                                                '<span class="gloss-subject">S</span>'
                                            )
                                        elif part == "DO":
                                            color_coded_parts.append(
                                                '<span class="gloss-direct-object">DO</span>'
                                            )
                                        elif part == "IO":
                                            color_coded_parts.append(
                                                '<span class="gloss-indirect-object">IO</span>'
                                            )
                                        else:
                                            color_coded_parts.append(part)
                                    color_coded_component = "-".join(color_coded_parts)
                            # Case-marked patterns first (longer patterns)
                            elif "S:Nom" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S:Nom", '<span class="gloss-subject">S:Nom</span>'
                                )
                            elif "S:Erg" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S:Erg", '<span class="gloss-subject">S:Erg</span>'
                                )
                            elif "S:Dat" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S:Dat", '<span class="gloss-subject">S:Dat</span>'
                                )
                            elif "DO:Nom" in component:
                                color_coded_component = color_coded_component.replace(
                                    "DO:Nom",
                                    '<span class="gloss-direct-object">DO:Nom</span>',
                                )
                            elif "DO:Dat" in component:
                                color_coded_component = color_coded_component.replace(
                                    "DO:Dat",
                                    '<span class="gloss-direct-object">DO:Dat</span>',
                                )
                            elif "IO:Nom" in component:
                                color_coded_component = color_coded_component.replace(
                                    "IO:Nom",
                                    '<span class="gloss-indirect-object">IO:Nom</span>',
                                )
                            elif "IO:Dat" in component:
                                color_coded_component = color_coded_component.replace(
                                    "IO:Dat",
                                    '<span class="gloss-indirect-object">IO:Dat</span>',
                                )
                            # Basic patterns after case-marked patterns
                            elif "S" in component:
                                color_coded_component = color_coded_component.replace(
                                    "S", '<span class="gloss-subject">S</span>'
                                )
                            elif "DO" in component:
                                color_coded_component = color_coded_component.replace(
                                    "DO", '<span class="gloss-direct-object">DO</span>'
                                )
                            elif "IO" in component:
                                color_coded_component = color_coded_component.replace(
                                    "IO", '<span class="gloss-indirect-object">IO</span>'
                                )

                        # Don't escape the color-coded component since it contains HTML
                        formatted_line = f'<span class="gloss-component">{color_coded_component}</span><span class="gloss-definition">{definition}</span>'
                        formatted_lines.append(formatted_line)
                    else:
                        formatted_lines.append(line)
                else:
                    formatted_lines.append(line)
            else:
                # Regular component like "V: Verb"
                parts = line.split(":", 1)
                if len(parts) == 2:
                    component, definition = parts

                    # Color code the component if it's V
                    color_coded_component = component
                    if component == "V":
                        color_coded_component = '<span class="gloss-verb">V</span>'
                    else:
                        # For non-V components, escape normally
                        color_coded_component = html.escape(component)

                    # Use appropriate escaping based on whether it contains HTML
                    if component == "V":
                        formatted_line = f'<span class="gloss-component">{color_coded_component}:</span><span class="gloss-definition">{definition}</span>'
                    else:
                        formatted_line = f'<span class="gloss-component">{color_coded_component}:</span><span class="gloss-definition">{definition}</span>'
                    formatted_lines.append(formatted_line)
                else:
                    formatted_lines.append(line)
        else:
            formatted_lines.append(line)

    # Join with single line breaks
    result = "<br>".join(formatted_lines)

    # Add visual separator before case frame components (double line break)
    # Look for the first case frame component (which will be HTML-escaped as &lt;)
    if "&lt;" in result:
        # Find the first occurrence of &lt; and add a line break before it
        # The pattern will be <br><span class="gloss-component">&lt;
        result = result.replace(
            '<br><span class="gloss-component">&lt;',
            '<br><br><span class="gloss-component">&lt;',
            1,
        )

    return result


def create_overview_table(verb, default_preverb=None):
    """Create the overview table HTML for a verb."""
    tenses = ["present", "imperfect", "future", "aorist", "optative", "imperative"]
    tense_names = {
        "present": "PRES",
        "imperfect": "IMPF",
        "future": "FUT",
        "aorist": "AOR",
        "optative": "OPT",
        "imperative": "IMPR",
    }

    table_html = f"""
        <h3>Overview Table (Main Screves)</h3>
        <div class="table-container">
            <table class="meta-table">
                <thead>
                    <tr>
                        <th>Screve</th>
                        <th>1sg</th>
                        <th>2sg</th>
                        <th>3sg</th>
                        <th>1pl</th>
                        <th>2pl</th>
                        <th>3pl</th>
                    </tr>
                </thead>
                <tbody>
    """

    for tense in tenses:
        # Check if we have pre-calculated forms (new structure) or need to use get_verb_form (old structure)
        conjugations = verb.get("conjugations", {})
        tense_data = conjugations.get(tense, {})

        if "forms" in tense_data:
            # New structure: use pre-calculated forms directly
            forms = tense_data["forms"]
            tense_class = f"tense-{tense}"
            table_html += f"""
                <tr class="{tense_class}">
                    <td>{tense_names[tense]}</td>
                    <td class="georgian-text">{forms.get('1sg', '-')}</td>
                    <td class="georgian-text">{forms.get('2sg', '-')}</td>
                    <td class="georgian-text">{forms.get('3sg', '-')}</td>
                    <td class="georgian-text">{forms.get('1pl', '-')}</td>
                    <td class="georgian-text">{forms.get('2pl', '-')}</td>
                    <td class="georgian-text">{forms.get('3pl', '-')}</td>
                </tr>
            """
        else:
            # Old structure: use get_verb_form
            tense_class = f"tense-{tense}"
            table_html += f"""
                <tr class="{tense_class}">
                    <td>{tense_names[tense]}</td>
                    <td class="georgian-text">{get_verb_form(verb, tense, '1sg', default_preverb) or '-'}</td>
                    <td class="georgian-text">{get_verb_form(verb, tense, '2sg', default_preverb) or '-'}</td>
                    <td class="georgian-text">{get_verb_form(verb, tense, '3sg', default_preverb) or '-'}</td>
                    <td class="georgian-text">{get_verb_form(verb, tense, '1pl', default_preverb) or '-'}</td>
                    <td class="georgian-text">{get_verb_form(verb, tense, '2pl', default_preverb) or '-'}</td>
                    <td class="georgian-text">{get_verb_form(verb, tense, '3pl', default_preverb) or '-'}</td>
                </tr>
            """

    table_html += """
                </tbody>
            </table>
        </div>
    """
    return table_html


def create_preverb_aware_regular_table(verb_data, tense, selected_preverb=None):
    """Create a regular table for a specific tense with preverb awareness."""
    preverb_config = verb_data.get("preverb_config", {})

    # Handle single-preverb verbs
    if not preverb_config.get("has_multiple_preverbs", False):
        return create_regular_table(verb_data, tense)

    # Handle multi-preverb verbs
    if selected_preverb is None:
        selected_preverb = preverb_config.get("default_preverb", "")

    # Check if we have any verb forms for this tense with the selected preverb
    has_forms = any(
        get_verb_form(verb_data, tense, person, selected_preverb)
        for person in ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
    )
    if not has_forms:
        return ""

    tense_names = {
        "present": "Present Indicative",
        "imperfect": "Imperfect",
        "future": "Future",
        "aorist": "Aorist",
        "optative": "Optative",
        "imperative": "Affirmative Imperative",
    }

    table_html = f"""
        <h3>{tense_names[tense]}</h3>
        <div class="table-container regular-table-container">
            <table class="regular-table">
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Singular</th>
                        <th>Plural</th>
                    </tr>
                </thead>
                <tbody>
    """

    persons = [
        {"name": "1st", "sg": "1sg", "pl": "1pl"},
        {"name": "2nd", "sg": "2sg", "pl": "2pl"},
        {"name": "3rd", "sg": "3sg", "pl": "3pl"},
    ]

    # Check if we have pre-calculated forms (new structure) or need to use get_verb_form (old structure)
    conjugations = verb_data.get("conjugations", {})
    tense_data = conjugations.get(tense, {})

    if "forms" in tense_data:
        # New structure: use pre-calculated forms directly
        forms = tense_data["forms"]
        for person in persons:
            table_html += f"""
                <tr>
                    <td>{person['name']}</td>
                    <td class="georgian-text">{forms.get(person['sg'], '-')}</td>
                    <td class="georgian-text">{forms.get(person['pl'], '-')}</td>
                </tr>
            """
    else:
        # Old structure: use get_verb_form
        for person in persons:
            table_html += f"""
                <tr>
                    <td>{person['name']}</td>
                    <td class="georgian-text">{get_verb_form(verb_data, tense, person['sg'], selected_preverb) or '-'}</td>
                    <td class="georgian-text">{get_verb_form(verb_data, tense, person['pl'], selected_preverb) or '-'}</td>
                </tr>
            """

    table_html += """
                </tbody>
            </table>
        </div>
    """
    return table_html


def create_regular_table(verb, tense):
    """Create a regular table for a specific tense."""
    # Check if we have any verb forms for this tense
    has_forms = any(
        get_verb_form(verb, tense, person)
        for person in ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
    )
    if not has_forms:
        return ""

    tense_names = {
        "present": "Present Indicative",
        "imperfect": "Imperfect",
        "future": "Future",
        "aorist": "Aorist",
        "optative": "Optative",
        "imperative": "Affirmative Imperative",
    }

    table_html = f"""
        <h3>{tense_names[tense]}</h3>
        <div class="table-container regular-table-container">
            <table class="regular-table">
                <thead>
                    <tr>
                        <th>Person</th>
                        <th>Singular</th>
                        <th>Plural</th>
                    </tr>
                </thead>
                <tbody>
    """

    persons = [
        {"name": "1st", "sg": "1sg", "pl": "1pl"},
        {"name": "2nd", "sg": "2sg", "pl": "2pl"},
        {"name": "3rd", "sg": "3sg", "pl": "3pl"},
    ]

    for person in persons:
        table_html += f"""
            <tr>
                <td>{person['name']}</td>
                <td class="georgian-text">{get_verb_form(verb, tense, person['sg']) or '-'}</td>
                <td class="georgian-text">{get_verb_form(verb, tense, person['pl']) or '-'}</td>
            </tr>
        """

    table_html += """
                </tbody>
            </table>
        </div>
    """
    return table_html


def create_examples(verb, tense):
    """Create examples HTML for a verb and tense."""
    # Use the new structure - examples are now in conjugations
    tense_data = verb.get("conjugations", {}).get(tense, {})
    if isinstance(tense_data, dict) and "examples" in tense_data:
        examples_data = tense_data["examples"]
    else:
        # Fallback to old structure
        examples_data = verb.get("examples", {}).get(tense, {})

    # Initialize enhanced example generator
    enhanced_generator = EnhancedExampleGenerator()

    # Try to generate enhanced examples first
    try:
        enhanced_examples = enhanced_generator.generate_enhanced_examples(verb, tense)

        # If enhanced examples were generated successfully
        if enhanced_examples.get("enhanced", False) and enhanced_examples.get(
            "examples"
        ):
            examples = enhanced_examples["examples"]
            raw_gloss = enhanced_examples.get("raw_gloss", "")
            case_gloss = enhanced_examples.get("case_gloss", "")

            # If case_gloss is not provided by enhanced examples, generate it using gloss_parser
            if not case_gloss:
                case_gloss = process_raw_gloss(
                    raw_gloss, enhanced_examples.get("preverb", "")
                )

            examples_html = """
        <div class="examples">
            <h4>Examples:</h4>
            <ul>
    """

            for example in examples:
                # Enhanced examples have georgian, english, and html fields
                georgian_html = example.get("html", example.get("georgian", ""))
                english_text = example.get("english", "")
                # Get plain text version for copy functionality (without HTML tags)
                english_plain = example.get("english_plain", "")
                if not english_plain:
                    # Strip HTML tags for plain text version
                    import re

                    english_plain = re.sub(r"<[^>]+>", "", english_text)

                examples_html += f"""
            <li class="example-item">
                <div class="georgian georgian-text">
                    {georgian_html}
                </div>
                <div class="translation english-text" data-copy-text="{english_plain}">
                    {english_text}
                </div>
            </li>
        """

            examples_html += """
            </ul>
        </div>
    """

            # Add case gloss if available
            if case_gloss:
                # Get the raw gloss for display
                raw_gloss = enhanced_examples.get("raw_gloss", "")

                # Format the gloss display
                if raw_gloss:
                    # Show both raw and expanded gloss
                    examples_html += f"""
        <div class="case-gloss">
            <div class="gloss-header">
                <strong>Verb Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="raw-gloss">
                    <strong>Raw:</strong> <code>{format_raw_gloss_with_colors(raw_gloss)}</code>
                </div>
                <div class="expanded-gloss">
                    <strong>Expanded:</strong>
                    <div class="gloss-definitions">
                        {format_gloss_for_html(case_gloss)}
                    </div>
                </div>
            </div>
        </div>
    """
                else:
                    # Fallback for cases where raw_gloss is not available
                    case_gloss_html = format_gloss_for_html(case_gloss)
                    examples_html += f"""
        <div class="case-gloss">
            <div class="gloss-header">
                <strong>Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="expanded-gloss">
                    <strong>Definitions:</strong>
                    <div class="gloss-definitions">
                        {case_gloss_html}
                    </div>
                </div>
            </div>
        </div>
    """

            return examples_html

        else:
            # Enhanced examples not available, fall back to original logic
            pass

    except Exception as e:
        # Enhanced example generation failed, fall back to original logic
        print(
            f"Warning: Enhanced example generation failed for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
        )
        pass

    # Fallback to original example generation logic
    # Handle format where tense_data is a dict with raw_gloss, preverb, and examples
    if isinstance(tense_data, dict) and "examples" in tense_data:
        examples = tense_data["examples"]
        raw_gloss = tense_data.get("raw_gloss", "")
        preverb = tense_data.get("preverb", "")

        # Process raw gloss to verbose format
        case_gloss = process_raw_gloss(raw_gloss, preverb)
    else:
        # Fallback for malformed data
        examples = []
        case_gloss = ""

    if not examples:
        return ""

    examples_html = """
        <div class="examples">
            <h4>Examples:</h4>
            <ul>
    """

    for example in examples:
        # Handle both old format (georgian) and new format (georgian_template + verb_reference)
        if "georgian_template" in example and "verb_reference" in example:
            # New format: use template and verb reference
            template = example["georgian_template"]
            verb_ref = example["verb_reference"]

            # Parse the verb reference (e.g., "present.1sg")
            tense_name, person = verb_ref.split(".")

            # Check if we have pre-calculated forms (new structure) or need to use get_verb_form (old structure)
            verb_form = None
            if "forms" in tense_data and person in tense_data["forms"]:
                # Use pre-calculated forms (new structure)
                verb_form = tense_data["forms"][person]
            else:
                # Fallback to get_verb_form (old structure)
                verb_form = get_verb_form(verb, tense_name, person)

            # Replace the placeholder with the actual verb form (bolded)
            georgian_text = template.replace("{verb}", f"<strong>{verb_form}</strong>")
        else:
            # Old format: use hardcoded georgian text
            georgian_text = example.get("georgian", "")

        # Handle English translation using new preverb translation structure
        english_text = example.get("english", "")

        # Check if we have new translation structure and effective preverb
        if "effective_preverb" in verb and verb.get("preverb_translations"):
            # Use new translation structure
            preverb_translations = verb.get("preverb_translations", {})
            effective_preverb = verb["effective_preverb"]

            # Get English translation for this specific preverb, tense, and person
            if "verb_reference" in example:
                tense_name, person = example["verb_reference"].split(".")

                english_translation = get_english_translation(
                    preverb_translations, effective_preverb, tense_name, person
                )

                # Replace the English text with the new translation
                english_text = english_translation

                # Handle English verb highlighting if specified
                if "english_verb" in example:
                    english_text = english_text.replace(
                        example["english_verb"],
                        f"<strong>{example['english_verb']}</strong>",
                    )
            else:
                # For examples without verb_reference, try to use the effective preverb
                # This handles cases where examples are generated by the enhanced generator
                if "english" in example:
                    # Use the example's English text but ensure it's properly formatted
                    english_text = example["english"]

                    # Handle English verb highlighting if specified
                    if "english_verb" in example:
                        english_text = english_text.replace(
                            example["english_verb"],
                            f"<strong>{example['english_verb']}</strong>",
                        )
        else:
            # Fallback to old approach
            if "english_verb" in example:
                english_text = english_text.replace(
                    example["english_verb"],
                    f"<strong>{example['english_verb']}</strong>",
                )

        examples_html += f"""
            <li class="example-item">
                <div class="georgian georgian-text">
                    {georgian_text}
                </div>
                <div class="translation english-text" data-copy-text="{example['english']}">
                    {english_text}
                </div>
            </li>
        """

    examples_html += """
            </ul>
        </div>
    """

    # Add case gloss if available
    if case_gloss:
        # Get the raw gloss for display
        raw_gloss = tense_data.get("raw_gloss", "")

        # Format the gloss display
        if raw_gloss:
            # Show both raw and expanded gloss
            examples_html += f"""
        <div class="case-gloss">
            <div class="gloss-header">
                <strong>Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="raw-gloss">
                    <strong>Raw:</strong> <code>{format_raw_gloss_with_colors(raw_gloss)}</code>
                </div>
                <div class="expanded-gloss">
                    <strong>Expanded:</strong>
                    <div class="gloss-definitions">
                        {format_gloss_for_html(case_gloss)}
                    </div>
                </div>
            </div>
        </div>
    """
        else:
            # Fallback for cases where raw_gloss is not available
            case_gloss_html = format_gloss_for_html(case_gloss)
            examples_html += f"""
        <div class="case-gloss">
            <div class="gloss-header">
                <strong>Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="expanded-gloss">
                    <strong>Definitions:</strong>
                    <div class="gloss-definitions">
                        {case_gloss_html}
                    </div>
                </div>
            </div>
        </div>
    """

    return examples_html


def create_examples_without_gloss(verb, tense):
    """Create examples HTML for a verb and tense without the gloss analysis section."""
    # Use the new structure - examples are now in conjugations
    tense_data = verb.get("conjugations", {}).get(tense, {})
    if isinstance(tense_data, dict) and "examples" in tense_data:
        examples_data = tense_data["examples"]
    else:
        # Fallback to old structure
        examples_data = verb.get("examples", {}).get(tense, {})

    # Initialize enhanced example generator
    enhanced_generator = EnhancedExampleGenerator()

    # Try to generate enhanced examples first
    try:
        enhanced_examples = enhanced_generator.generate_enhanced_examples(verb, tense)

        # If enhanced examples were generated successfully
        if enhanced_examples.get("enhanced", False) and enhanced_examples.get(
            "examples"
        ):
            examples = enhanced_examples["examples"]

            examples_html = """
        <div class="examples">
            <h4>Examples:</h4>
            <ul>
    """

            for example in examples:
                # Enhanced examples have georgian, english, and html fields
                georgian_html = example.get("html", example.get("georgian", ""))
                english_text = example.get("english", "")
                # Get plain text version for copy functionality (without HTML tags)
                english_plain = example.get("english_plain", "")
                if not english_plain:
                    # Strip HTML tags for plain text version
                    import re

                    english_plain = re.sub(r"<[^>]+>", "", english_text)

                examples_html += f"""
            <li class="example-item">
                <div class="georgian georgian-text">
                    {georgian_html}
                </div>
                <div class="translation english-text" data-copy-text="{english_plain}">
                    {english_text}
                </div>
            </li>
        """

            examples_html += """
            </ul>
        </div>
    """

            return examples_html

        else:
            # Enhanced examples not available, fall back to original logic
            pass

    except Exception as e:
        # Enhanced example generation failed, fall back to original logic
        print(
            f"Warning: Enhanced example generation failed for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
        )
        pass

    # Fallback to original example generation logic
    # Handle format where tense_data is a dict with raw_gloss, preverb, and examples
    if isinstance(tense_data, dict) and "examples" in tense_data:
        examples = tense_data["examples"]
    else:
        # Fallback for malformed data
        examples = []

    if not examples:
        return ""

    examples_html = """
        <div class="examples">
            <h4>Examples:</h4>
            <ul>
    """

    for example in examples:
        # Handle both old format (georgian) and new format (georgian_template + verb_reference)
        if "georgian_template" in example and "verb_reference" in example:
            # New format: use template and verb reference
            template = example["georgian_template"]
            verb_ref = example["verb_reference"]

            # Parse the verb reference (e.g., "present.1sg")
            tense_name, person = verb_ref.split(".")

            # Check if we have pre-calculated forms (new structure) or need to use get_verb_form (old structure)
            verb_form = None
            if "forms" in tense_data and person in tense_data["forms"]:
                # Use pre-calculated forms (new structure)
                verb_form = tense_data["forms"][person]
            else:
                # Fallback to get_verb_form (old structure)
                verb_form = get_verb_form(verb, tense_name, person)

            # Replace the placeholder with the actual verb form (bolded)
            georgian_text = template.replace("{verb}", f"<strong>{verb_form}</strong>")
        else:
            # Old format: use hardcoded georgian text
            georgian_text = example.get("georgian", "")

        # Handle English translation using new preverb translation structure
        english_text = example.get("english", "")

        # Check if we have new translation structure and effective preverb
        if "effective_preverb" in verb and verb.get("preverb_translations"):
            # Use new translation structure
            preverb_translations = verb.get("preverb_translations", {})
            effective_preverb = verb["effective_preverb"]

            # Get English translation for this specific preverb, tense, and person
            if "verb_reference" in example:
                tense_name, person = example["verb_reference"].split(".")

                english_translation = get_english_translation(
                    preverb_translations, effective_preverb, tense_name, person
                )

                # Replace the English text with the new translation
                english_text = english_translation

                # Handle English verb highlighting if specified
                if "english_verb" in example:
                    english_text = english_text.replace(
                        example["english_verb"],
                        f"<strong>{example['english_verb']}</strong>",
                    )
            else:
                # For examples without verb_reference, try to use the effective preverb
                # This handles cases where examples are generated by the enhanced generator
                if "english" in example:
                    # Use the example's English text but ensure it's properly formatted
                    english_text = example["english"]

                    # Handle English verb highlighting if specified
                    if "english_verb" in example:
                        english_text = english_text.replace(
                            example["english_verb"],
                            f"<strong>{example['english_verb']}</strong>",
                        )
        else:
            # Fallback to old approach
            if "english_verb" in example:
                english_text = english_text.replace(
                    example["english_verb"],
                    f"<strong>{example['english_verb']}</strong>",
                )

        examples_html += f"""
            <li class="example-item">
                <div class="georgian georgian-text">
                    {georgian_text}
                </div>
                <div class="translation english-text" data-copy-text="{example['english']}">
                    {english_text}
                </div>
            </li>
        """

    examples_html += """
            </ul>
        </div>
    """

    return examples_html


def create_gloss_analysis_for_preverb(tense_data, preverb, tense):
    """Create gloss analysis HTML for a specific preverb and tense."""
    if not isinstance(tense_data, dict):
        return ""

    # Get the raw gloss and update it with the correct preverb
    raw_gloss = tense_data.get("gloss", {}).get("raw_gloss", "")
    if not raw_gloss:
        return ""

    # Update the raw gloss to use the correct preverb
    # Replace any existing preverb reference with the current preverb
    import re

    updated_raw_gloss = re.sub(r"Pv \([^)]+\)", f"Pv ({preverb})", raw_gloss)

    # Process raw gloss to verbose format
    case_gloss = process_raw_gloss(updated_raw_gloss, preverb)

    if not case_gloss:
        return ""

    # Format the gloss display
    gloss_html = f"""
        <div class="case-gloss">
            <div class="gloss-header">
                <strong>Verb Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="raw-gloss">
                    <strong>Raw:</strong> <code>{format_raw_gloss_with_colors(updated_raw_gloss)}</code>
                </div>
                <div class="expanded-gloss">
                    <strong>Expanded:</strong>
                    <div class="gloss-definitions">
                        {format_gloss_for_html(case_gloss)}
                    </div>
                </div>
            </div>
        </div>
    """

    return gloss_html


def create_fallback_gloss_analysis(tense: str, preverb: str) -> str:
    """Create fallback gloss analysis HTML using gloss reference."""
    # Create a standard raw gloss for the given tense
    tense_mapping = {
        "present": "Pres",
        "imperfect": "Impf",
        "aorist": "Aor",
        "optative": "Opt",
        "future": "Fut",
        "imperative": "Impv",
    }

    tense_code = tense_mapping.get(tense, "Pres")
    raw_gloss = f"V MedPass {tense_code} Pv <S> <S:Nom>"

    # Process the raw gloss using the gloss reference
    case_gloss = process_raw_gloss(raw_gloss, preverb)

    return f"""
        <div class="case-gloss" data-tense="{tense}">
            <div class="gloss-header">
                <strong>Verb Gloss Analysis</strong>
            </div>
            <div class="gloss-content">
                <div class="raw-gloss">
                    <strong>Raw:</strong> <code>{format_raw_gloss_with_colors(raw_gloss)}</code>
                </div>
                <div class="expanded-gloss">
                    <strong>Expanded:</strong>
                    <div class="gloss-definitions">
                        {format_gloss_for_html(case_gloss)}
                    </div>
                </div>
            </div>
        </div>
    """


def create_verb_section(verb, index=None):
    """Create a complete verb section with side-by-side layouts."""
    verb_id = verb.get("id", "N/A")
    georgian = verb.get("georgian", "N/A")
    english = verb.get("english", "N/A")

    # Create anchor ID for this section
    anchor_id = f"verb-{verb_id}"

    # Add page number and backlink if index is provided
    page_number = f"<span class='page-number'>{index}</span>" if index else ""
    backlink = f"<a href='#toc' class='toc-backlink'>↑ ToC</a>" if index else ""

    # Get category and class from verb data
    category = verb.get("category", "Unknown")
    verb_class = verb.get("class", "Class-I")

    # Get preverb configuration
    preverb_config = verb.get("preverb_config", {})
    has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)
    default_preverb = preverb_config.get("default_preverb", "")

    # Add preverb selector only for multi-preverb verbs
    preverb_selector = ""
    if has_multiple_preverbs:
        preverb_selector = create_preverb_selector(verb)

    # Create default view with preverb data
    overview_table = create_preverb_aware_table(verb, default_preverb)

    # Generate examples for all verbs
    examples_by_preverb = {}
    examples_json_by_preverb = {}
    gloss_analyses_by_preverb = {}
    gloss_analyses_json_by_preverb = {}

    if has_multiple_preverbs and verb.get("preverb_rules"):
        # Multi-preverb verbs: generate examples and gloss analyses for all preverbs
        examples_by_preverb, gloss_analyses_by_preverb = create_preverb_aware_examples(
            verb, verb.get("preverb_rules", {})
        )

        # Create JSON for each preverb's examples
        for preverb, examples_by_tense in examples_by_preverb.items():
            examples_json_by_preverb[preverb] = html.escape(
                json.dumps(examples_by_tense, ensure_ascii=False)
            )

        # Create JSON for each preverb's gloss analyses
        gloss_analyses_json_by_preverb = {}
        for preverb, gloss_analyses_by_tense in gloss_analyses_by_preverb.items():
            gloss_analyses_json_by_preverb[preverb] = html.escape(
                json.dumps(gloss_analyses_by_tense, ensure_ascii=False)
            )
    else:
        # Single-preverb verbs: don't generate preverb-specific data at all
        # The examples will be generated inline in the HTML sections
        pass

    # Add data attributes for JavaScript
    # Properly escape JSON data for HTML attributes
    preverb_config_json = html.escape(json.dumps(preverb_config, ensure_ascii=False))
    preverb_rules_json = html.escape(
        json.dumps(verb.get("preverb_rules", {}), ensure_ascii=False)
    )
    conjugations_json = html.escape(
        json.dumps(verb.get("conjugations", {}), ensure_ascii=False)
    )
    examples_json = html.escape(
        json.dumps(verb.get("examples", {}), ensure_ascii=False)
    )
    preverb_translations_json = html.escape(
        json.dumps(verb.get("preverb_translations", {}), ensure_ascii=False)
    )

    # Only include preverb-specific data attributes for multi-preverb verbs
    preverb_data_attributes = ""
    if has_multiple_preverbs:
        preverb_data_attributes = f"""
             data-examples-მი='{examples_json_by_preverb.get("მი", "[]")}'
             data-examples-მო='{examples_json_by_preverb.get("მო", "[]")}'
             data-examples-გა='{examples_json_by_preverb.get("გა", "[]")}'
             data-examples-წა='{examples_json_by_preverb.get("წა", "[]")}'
             data-gloss-analyses-მი='{gloss_analyses_json_by_preverb.get("მი", "{}")}'
             data-gloss-analyses-მო='{gloss_analyses_json_by_preverb.get("მო", "{}")}'
             data-gloss-analyses-გა='{gloss_analyses_json_by_preverb.get("გა", "{}")}'
             data-gloss-analyses-წა='{gloss_analyses_json_by_preverb.get("წა", "{}")}'"""

    section_html = f"""
        <div class="verb-section" id="{anchor_id}" 
             data-category="{category}" 
             data-class="{verb_class}"
             data-has-multiple-preverbs="{has_multiple_preverbs}"
             data-default-preverb="{default_preverb}"
             data-preverb-config='{preverb_config_json}'
             data-preverb-rules='{preverb_rules_json}'
             data-conjugations='{conjugations_json}'
             data-examples='{examples_json}'
             data-preverb-translations='{preverb_translations_json}'{preverb_data_attributes}>
            {preverb_selector}
            <h2>{page_number}<span class="georgian-text">{georgian}</span> (<span class="english-text">{english}</span>) - {verb.get('description', '')} {backlink}</h2>
            {overview_table}
    """
    # Add notes section if notes is non-empty
    notes = verb.get("notes", "")
    if notes.strip():
        section_html += f'<div class="verb-notes"><strong>Note:</strong> {notes}</div>'

    # Add external link if URL is available
    url = verb.get("url", "")
    if url.strip():
        section_html += f'<div class="verb-external-link"><a href="{url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View on Lingua.ge</a></div>'

    # Create side-by-side sections
    # First pair: Present Indicative and Imperfect
    present_content = ""
    imperfect_content = ""

    if has_tense_forms(verb, "present", default_preverb):
        present_content += create_preverb_aware_regular_table(
            verb, "present", default_preverb
        )
        # Use examples if available for multi-preverb verbs, otherwise generate inline
        if has_multiple_preverbs:
            preverb_key = default_preverb.replace("-", "") if default_preverb else "default"
            if (
                preverb_key in examples_by_preverb
                and "present" in examples_by_preverb[preverb_key]
            ):
                present_content += examples_by_preverb[preverb_key]["present"]
        else:
            # For single-preverb verbs, generate examples inline
            examples_html = create_examples(verb, "present")
            if examples_html:
                present_content += examples_html

        # Add default gloss analysis section (for მი- preverb) - only for multi-preverb verbs
        if has_multiple_preverbs:
            if (
                "მი" in gloss_analyses_by_preverb
                and "present" in gloss_analyses_by_preverb["მი"]
            ):
                present_content += gloss_analyses_by_preverb["მი"]["present"]
            else:
                # Fallback for multi-preverb verbs if no gloss analysis available
                present_content += create_fallback_gloss_analysis("present", "მი")

    if has_tense_forms(verb, "imperfect", default_preverb):
        imperfect_content += create_preverb_aware_regular_table(
            verb, "imperfect", default_preverb
        )
        # Use examples if available for multi-preverb verbs, otherwise generate inline
        if has_multiple_preverbs:
            preverb_key = default_preverb.replace("-", "") if default_preverb else "default"
            if (
                preverb_key in examples_by_preverb
                and "imperfect" in examples_by_preverb[preverb_key]
            ):
                imperfect_content += examples_by_preverb[preverb_key]["imperfect"]
        else:
            # For single-preverb verbs, generate examples inline
            examples_html = create_examples(verb, "imperfect")
            if examples_html:
                imperfect_content += examples_html

        # Add default gloss analysis section (for მი- preverb) - only for multi-preverb verbs
        if has_multiple_preverbs:
            if (
                "მი" in gloss_analyses_by_preverb
                and "imperfect" in gloss_analyses_by_preverb["მი"]
            ):
                imperfect_content += gloss_analyses_by_preverb["მი"]["imperfect"]
            else:
                # Fallback for multi-preverb verbs if no gloss analysis available
                imperfect_content += create_fallback_gloss_analysis("imperfect", "მი")

    if present_content or imperfect_content:
        section_html += """
            <div class="tense-pair">
                <div class="tense-column">
        """
        section_html += present_content
        section_html += """
                </div>
                <div class="tense-column">
        """
        section_html += imperfect_content
        section_html += """
                </div>
            </div>
        """

    # Second pair: Aorist and Optative
    aorist_content = ""
    optative_content = ""

    if has_tense_forms(verb, "aorist", default_preverb):
        aorist_content += create_preverb_aware_regular_table(
            verb, "aorist", default_preverb
        )
        # Use examples if available for multi-preverb verbs, otherwise generate inline
        if has_multiple_preverbs:
            preverb_key = default_preverb.replace("-", "") if default_preverb else "default"
            if (
                preverb_key in examples_by_preverb
                and "aorist" in examples_by_preverb[preverb_key]
            ):
                aorist_content += examples_by_preverb[preverb_key]["aorist"]
        else:
            # For single-preverb verbs, generate examples inline
            examples_html = create_examples(verb, "aorist")
            if examples_html:
                aorist_content += examples_html

        # Add default gloss analysis section (for მი- preverb) - only for multi-preverb verbs
        if has_multiple_preverbs:
            if (
                "მი" in gloss_analyses_by_preverb
                and "aorist" in gloss_analyses_by_preverb["მი"]
            ):
                aorist_content += gloss_analyses_by_preverb["მი"]["aorist"]
            else:
                # Fallback for multi-preverb verbs if no gloss analysis available
                aorist_content += create_fallback_gloss_analysis("aorist", "მი")

    if has_tense_forms(verb, "optative", default_preverb):
        optative_content += create_preverb_aware_regular_table(
            verb, "optative", default_preverb
        )
        # Use examples if available for multi-preverb verbs, otherwise generate inline
        if has_multiple_preverbs:
            preverb_key = default_preverb.replace("-", "") if default_preverb else "default"
            if (
                preverb_key in examples_by_preverb
                and "optative" in examples_by_preverb[preverb_key]
            ):
                optative_content += examples_by_preverb[preverb_key]["optative"]
        else:
            # For single-preverb verbs, generate examples inline
            examples_html = create_examples(verb, "optative")
            if examples_html:
                optative_content += examples_html

        # Add default gloss analysis section (for მი- preverb) - only for multi-preverb verbs
        if has_multiple_preverbs:
            if (
                "მი" in gloss_analyses_by_preverb
                and "optative" in gloss_analyses_by_preverb["მი"]
            ):
                optative_content += gloss_analyses_by_preverb["მი"]["optative"]
            else:
                # Fallback for multi-preverb verbs if no gloss analysis available
                optative_content += create_fallback_gloss_analysis("optative", "მი")

    if aorist_content or optative_content:
        section_html += """
            <div class="tense-pair">
                <div class="tense-column">
        """
        section_html += aorist_content
        section_html += """
                </div>
                <div class="tense-column">
        """
        section_html += optative_content
        section_html += """
                </div>
            </div>
        """

    # Third pair: Future and Imperative
    future_content = ""
    imperative_content = ""

    if has_tense_forms(verb, "future", default_preverb):
        future_content += create_preverb_aware_regular_table(
            verb, "future", default_preverb
        )
        # Use examples if available for multi-preverb verbs, otherwise generate inline
        if has_multiple_preverbs:
            preverb_key = default_preverb.replace("-", "") if default_preverb else "default"
            if (
                preverb_key in examples_by_preverb
                and "future" in examples_by_preverb[preverb_key]
            ):
                future_content += examples_by_preverb[preverb_key]["future"]
        else:
            # For single-preverb verbs, generate examples inline
            examples_html = create_examples(verb, "future")
            if examples_html:
                future_content += examples_html

        # Add default gloss analysis section (for მი- preverb) - only for multi-preverb verbs
        if has_multiple_preverbs:
            if (
                "მი" in gloss_analyses_by_preverb
                and "future" in gloss_analyses_by_preverb["მი"]
            ):
                future_content += gloss_analyses_by_preverb["მი"]["future"]
            else:
                # Fallback for multi-preverb verbs if no gloss analysis available
                future_content += create_fallback_gloss_analysis("future", "მი")

    if has_tense_forms(verb, "imperative", default_preverb):
        imperative_content += create_preverb_aware_regular_table(
            verb, "imperative", default_preverb
        )
        # Use examples if available for multi-preverb verbs, otherwise generate inline
        if has_multiple_preverbs:
            preverb_key = default_preverb.replace("-", "") if default_preverb else "default"
            if (
                preverb_key in examples_by_preverb
                and "imperative" in examples_by_preverb[preverb_key]
            ):
                imperative_content += examples_by_preverb[preverb_key]["imperative"]
        else:
            # For single-preverb verbs, generate examples inline
            examples_html = create_examples(verb, "imperative")
            if examples_html:
                imperative_content += examples_html

        # Add default gloss analysis section (for მი- preverb) - only for multi-preverb verbs
        if has_multiple_preverbs:
            if (
                "მი" in gloss_analyses_by_preverb
                and "imperative" in gloss_analyses_by_preverb["მი"]
            ):
                imperative_content += gloss_analyses_by_preverb["მი"]["imperative"]
            else:
                # Fallback for multi-preverb verbs if no gloss analysis available
                imperative_content += create_fallback_gloss_analysis("imperative", "მი")

    if future_content or imperative_content:
        section_html += """
            <div class="tense-pair">
                <div class="tense-column">
        """
        section_html += future_content
        section_html += """
                </div>
                <div class="tense-column">
        """
        section_html += imperative_content
        section_html += """
                </div>
            </div>
        """

    section_html += """
        </div>
    """
    return section_html


def create_toc(verbs):
    """Create a table of contents with clickable links."""
    toc_html = """
        <div class="toc-container" id="toc">
            <h1>Table of Contents</h1>
            <div class="toc-list">
    """

    for i, verb in enumerate(verbs, 1):
        georgian = verb.get("georgian", "N/A")
        english = verb.get("english", "N/A")
        description = verb.get("description", "")

        # Create anchor ID for the verb section
        anchor_id = f"verb-{verb.get('id', i)}"

        toc_html += f"""
                <div class="toc-item">
                    <a href="#{anchor_id}" class="toc-link">
                        <span class="toc-number">{i}</span>
                        <span class="toc-georgian">{georgian}</span>
                        <span class="toc-english">({english})</span>
                        <span class="toc-description">{description}</span>
                    </a>
                </div>
        """

    toc_html += """
            </div>
        </div>
    """
    return toc_html


def generate_html(verbs):
    """Generate the complete HTML file."""
    # Generate table of contents first
    toc_section = create_toc(verbs)

    # Group verbs by category and generate verb sections with category headers
    verbs_by_category = {}
    for verb in verbs:
        category = verb.get("category", "Unknown")
        if category not in verbs_by_category:
            verbs_by_category[category] = []
        verbs_by_category[category].append(verb)

    # Get all unique categories for dynamic generation
    all_categories = sorted(verbs_by_category.keys())

    # Generate category options for sidebar and filter modal
    sidebar_category_options = ""
    filter_category_options = ""
    for category in all_categories:
        sidebar_category_options += f'<option value="{category}">{category}</option>'
        filter_category_options += f'<option value="{category}">{category}</option>'

    # Generate verb sections organized by category
    verb_sections = ""

    for i, (category, category_verbs) in enumerate(sorted(verbs_by_category.items())):

        # Add category header with collapsible functionality
        verb_sections += f"""
        <div class="category-container" data-category="{category}">
            <h1 class="main-category-header collapsible-header" data-category="{category}">
                <span class="collapse-icon">▼</span>
                <span class="category-title">{category}</span>
            </h1>
            <div class="category-content" data-category="{category}">
        """

        # Add verbs in this category
        for j, verb in enumerate(category_verbs):
            # Calculate the global index for this verb
            global_index = (
                sum(
                    len(verbs_by_category[cat])
                    for cat in sorted(verbs_by_category.keys())
                    if cat < category
                )
                + j
                + 1
            )

            verb_html = create_verb_section(verb, global_index)
            verb_sections += verb_html

        # Close category content div
        verb_sections += """
            </div>
        </div>
        """

    # Create the complete HTML
    html_content = f"""<!DOCTYPE html>
<html lang="en-ka">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ბაღ</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <link rel="alternate icon" href="assets/favicon.svg">
    
    <script>
        (function() {{
            const savedTheme = localStorage.getItem('theme') || 'light';
            const savedFont = localStorage.getItem('font') || 'default';
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.setAttribute('data-font', savedFont);
        }})();
    </script>
    
    <link rel="stylesheet" href="styles/main.css">
    <script src="scripts/main.js" defer></script>

    <!-- Google Fonts for Georgian and English -->
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet">

    <!-- Font loading script to prevent flash -->
    <script>
        // Immediately apply saved font to prevent flash
        (function() {{
            const savedFont = localStorage.getItem('font') || 'default';
            document.documentElement.setAttribute('data-font', savedFont);
            if (savedFont !== 'default') {{
                // For custom fonts, we'll let the CSS handle it with font-display: block
                // This prevents the flash while fonts load
            }}
        }})();
    </script>

    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>
    <!-- Sidebar Toggle - Top Left -->
    <button id="sidebar-toggle" class="sidebar-toggle" title="Toggle Table of Contents">
        <i class="fas fa-list"></i>
    </button>

    <!-- Theme Toggle - Top Right -->
    <div class="floating-controls">
        <button id="theme-toggle" class="theme-toggle" title="Toggle Dark/Light Mode">
            <i class="fas fa-moon"></i>
        </button>
        <button id="filter-toggle" class="filter-toggle" title="Toggle Filter Controls">
            <i class="fas fa-filter"></i>
        </button>
    </div>

    <!-- Font Selector - Bottom Right -->
    <button id="font-select" class="font-select" title="Choose Font (Use ←/→ arrow keys to scroll)">
        <i class="fas fa-font"></i>
    </button>
    
    <!-- Font Selector Dropdown (Hidden) -->
    <div id="font-select-dropdown" class="font-select-dropdown">
        <div class="font-option" data-font="default">
            <span class="font-icon">🔤</span>
            <span class="font-name">Default (Noto Sans)</span>
        </div>
        <div class="font-option" data-font="sonata">
            <span class="font-icon">🎵</span>
            <span class="font-name">SonataNo5</span>
        </div>
        <div class="font-option" data-font="neueimpakt">
            <span class="font-icon">💪</span>
            <span class="font-name">NeueImpakt</span>
        </div>
        <div class="font-option" data-font="k_gorga">
            <span class="font-icon">🎨</span>
            <span class="font-name">k_gorga</span>
        </div>
        <div class="font-option" data-font="k_grigol">
            <span class="font-icon">✍️</span>
            <span class="font-name">k_grigol</span>
        </div>
        <div class="font-option" data-font="k_kalig">
            <span class="font-icon">📝</span>
            <span class="font-name">k_kalig</span>
        </div>
        <div class="font-option" data-font="k_lortki">
            <span class="font-icon">🖋️</span>
            <span class="font-name">k_lortki</span>
        </div>
    </div>

    <!-- Help Button - Bottom Left (above notepad) -->
    <button id="help-toggle" class="help-toggle" title="Help & Features">
        <i class="fas fa-question-circle"></i>
    </button>

    <!-- Notepad Button - Bottom Left -->
    <button id="notepad-toggle" class="notepad-toggle" title="Open Notepad">
        <i class="fas fa-sticky-note"></i>
    </button>

    <!-- Sidebar Modal -->
    <div id="sidebar-modal" class="sidebar-modal">
        <div class="sidebar-overlay" id="sidebar-overlay"></div>
        <div class="sidebar-content">
            <div class="sidebar-header">
                <h3>Table of Contents</h3>
                <button id="sidebar-close" class="sidebar-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="sidebar-body">
                <div class="sidebar-filter-controls">
                    <div class="sidebar-filter-group">
                        <label for="sidebar-category-filter">Filter by Category:</label>
                        <select id="sidebar-category-filter" class="sidebar-filter-select">
                            <option value="all">All Categories</option>
                            {sidebar_category_options}
                        </select>
                    </div>
                </div>
                <div class="search-container">
                    <input type="text" id="search-input" class="search-input" placeholder="Search verbs... (↑↓ to navigate, Enter to select)" title="Search by Georgian or English name. Use ↑↓ arrows to navigate, Enter to select">
                    <div class="search-icon">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
                <div class="toc-list" id="toc-list">
                    <!-- Table of contents will be populated by JavaScript -->
                </div>
            </div>
        </div>
    </div>

    <!-- Filter Modal -->
    <div id="filter-modal" class="filter-modal">
        <div class="filter-overlay" id="filter-overlay"></div>
        <div class="filter-content">
            <div class="filter-header">
                <h3>Filter Options</h3>
                <button id="filter-close" class="filter-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="filter-body">
                <div class="filter-group">
                    <label for="group-by-select">Group by:</label>
                    <select id="group-by-select" class="filter-select">
                        <option value="none">No Grouping</option>
                        <option value="category">Category</option>
                        <option value="class">Class</option>
                    </select>
                </div>
                <div class="filter-group" id="category-filter-group" style="display: none;">
                    <label for="category-select">Category:</label>
                    <select id="category-select" class="filter-select">
                        <option value="all">All Categories</option>
                        {filter_category_options}
                    </select>
                </div>
                <div class="filter-group" id="class-filter-group" style="display: none;">
                    <label for="class-select">Class:</label>
                    <select id="class-select" class="filter-select">
                        <option value="all">All Classes</option>
                        <option value="Class-I">Class I</option>
                        <option value="Class-II">Class II</option>
                        <option value="Class-III">Class III</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

    <!-- Notepad Modal -->
    <div id="notepad-modal" class="notepad-modal">
        <div class="notepad-overlay" id="notepad-overlay"></div>
        <div class="notepad-content">
            <div class="notepad-header">
                <h3>Notepad</h3>
                <div class="notepad-controls">
                    <select id="font-size-select" class="font-size-select" title="Font Size">
                        <option value="12">12px</option>
                        <option value="14">14px</option>
                        <option value="16" selected>16px</option>
                        <option value="18">18px</option>
                        <option value="20">20px</option>
                        <option value="24">24px</option>
                        <option value="28">28px</option>
                        <option value="32">32px</option>
                    </select>
                    <button id="notepad-close" class="notepad-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="notepad-body">
                <textarea id="notepad-textarea" class="notepad-textarea" placeholder="Start typing here..."></textarea>
            </div>
        </div>
    </div>

    <!-- Help Modal -->
    <div id="help-modal" class="help-modal">
        <div class="help-overlay" id="help-overlay"></div>
        <div class="help-content">
            <div class="help-header">
                <h3>Help & Features</h3>
                <button id="help-close" class="help-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="help-body">
                <div class="help-disclaimer">
                    <p><strong>⚠️ Work in Progress:</strong> This website is a personal study resource and under semi-active development. It contains several mistakes, inconsistencies, and incomplete features. Please do not treat this as a definitive source for Georgian verb conjugations.</p>
                </div>
                
                <div class="help-section">
                    <h4>🎯 Core Features</h4>
                    <ul>
                        <li><strong>Interactive Verb Tables:</strong> Tables for common conjugations of 30+ Georgian verbs</li>
                        <li><strong>Theme Toggle:</strong> Switch between light and dark themes</li>
                        <li><strong>Font Selection:</strong> Choose from 7 Georgian fonts with left and right arrow key navigation</li>
                        <li><strong>Search Functionality:</strong> Real-time search through verbs with keyboard shortcuts</li>
                        <li><strong>Notepad:</strong> Built-in notepad with local storage</li>
                    </ul>
                </div>

                <div class="help-section">
                    <h4>⌨️ Keyboard Shortcuts</h4>
                    <ul>
                        <li><strong>Ctrl/Cmd + K:</strong> Open search sidebar</li>
                        <li><strong>↑/↓:</strong> Navigate search results</li>
                        <li><strong>Enter:</strong> Select highlighted verb</li>
                        <li><strong>←/→:</strong> Switch fonts (when notepad is closed)</li>
                        <li><strong>ESC:</strong> Close active modal</li>
                    </ul>
                </div>

                <div class="help-section">
                    <h4>🔍 How to Use</h4>
                    <ul>
                        <li><strong>Browse Verbs:</strong> Use the table of contents (top-left button) to navigate between verbs</li>
                        <li><strong>Search:</strong> Click the search icon or press Ctrl+K to find specific verbs</li>
                        <li><strong>Filter:</strong> Use the filter button (top-right) to group verbs by category or class</li>
                        <li><strong>Take Notes:</strong> Click the notepad button (bottom-left) to open a writing area</li>
                        <li><strong>Change Appearance:</strong> Use the theme toggle and font selector to customize your experience</li>
                    </ul>
                </div>

                <div class="help-section">
                    <h4>📚 Verb Information</h4>
                    <ul>
                        <li><strong>Conjugation Tables:</strong> See verb forms across 6 common tenses</li>
                        <li><strong>Examples:</strong> View example sentences showing how verbs are used in context</li>
                        <li><strong>Case Markings:</strong> Understand subject/object argument structure with case glosses</li>
                        <li><strong>Preverbs:</strong> Explore how preverbs change verb meanings</li>
                        <li><strong>English Translations:</strong>  The definite article "the" is used in English translations because Georgian doesn't have common definite or indefinite articles. This makes the English clearer and less ambiguous.</li>
                    </ul>
                </div>

                <div class="help-section">
                    <h4>🎨 Fonts Available</h4>
                    <ul>
                        <li><strong>Default:</strong> Noto Sans Georgian (clear and readable)</li>
                        <li><strong>SonataNo5:</strong> Musical-style font</li>
                        <li><strong>NeueImpakt:</strong> Bold, impactful font</li>
                        <li><strong>k_gorga:</strong> Traditional Georgian font</li>
                        <li><strong>k_grigol:</strong> Classical Georgian font</li>
                        <li><strong>k_kalig:</strong> Calligraphic Georgian font</li>
                        <li><strong>k_lortki:</strong> Handwritten Georgian font</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        {toc_section}
        
        <!-- Category Controls -->
        <div class="category-controls">
            <button id="expand-all-categories" class="category-control-btn">
                <i class="fas fa-expand-arrows-alt"></i> Expand All
            </button>
            <button id="collapse-all-categories" class="category-control-btn">
                <i class="fas fa-compress-arrows-alt"></i> Collapse All
            </button>
        </div>
        
        {verb_sections}
    </div>
</body>

</html>"""

    return html_content


def main():
    """Main function to build the HTML file."""
    print("Starting build process...")
    print("Using local gloss reference from gloss_reference.json")

    # Check if we're in the right directory
    current_dir = Path(__file__).parent
    print(f"Working directory: {current_dir}")

    # Check for required files
    json_file = current_dir.parent / "src" / "data" / "verbs.json"
    css_file = current_dir.parent / "src" / "styles" / "main.css"
    js_file = current_dir.parent / "src" / "scripts" / "main.js"

    print("Checking required files:")
    print(f"  JSON data: {'✓' if json_file.exists() else '✗'} {json_file}")
    print(f"  Styles CSS: {'✓' if css_file.exists() else '✗'} {css_file}")
    print(f"  Script JS: {'✓' if js_file.exists() else '✗'} {js_file}")

    print("\nLoading verb data from JSON...")
    verbs = load_json_data()

    if not verbs:
        print("No verbs found. Please check your verbs.json file.")
        return

    print(f"\nFound {len(verbs)} verbs. Generating HTML...")

    # Load and validate data
    semantic_mapping = load_semantic_mapping()
    run_comprehensive_validation(verbs, semantic_mapping)

    # Generate HTML
    print("Generating HTML content...")
    html_content = generate_html(verbs)

    # Check HTML content size
    content_size = len(html_content)
    print(f"Generated HTML content: {content_size:,} characters")

    # Write to file in the dist directory
    output_file = Path(__file__).parent.parent / "dist" / "index.html"
    print(f"\nWriting to file: {output_file}")

    # Ensure dist directory exists
    output_file.parent.mkdir(exist_ok=True)

    # Copy CSS and JS files to dist
    dist_dir = Path(__file__).parent.parent / "dist"
    styles_dir = dist_dir / "styles"
    scripts_dir = dist_dir / "scripts"

    # Create directories
    styles_dir.mkdir(exist_ok=True)
    scripts_dir.mkdir(exist_ok=True)

    # Copy CSS file
    css_source = Path(__file__).parent.parent / "src" / "styles" / "main.css"
    css_dest = styles_dir / "main.css"
    shutil.copy2(css_source, css_dest)
    print(f"Copied CSS to: {css_dest}")

    # Copy JS file
    js_source = Path(__file__).parent.parent / "src" / "scripts" / "main.js"
    js_dest = scripts_dir / "main.js"
    shutil.copy2(js_source, js_dest)
    print(f"Copied JS to: {js_dest}")

    # Copy assets folder (fonts, etc.)
    assets_source = Path(__file__).parent.parent / "src" / "assets"
    assets_dest = dist_dir / "assets"
    if assets_source.exists():
        if assets_dest.exists():
            shutil.rmtree(assets_dest)
        shutil.copytree(assets_source, assets_dest)
        print(f"Copied assets to: {assets_dest}")

    # Copy 404 page
    error_page_source = Path(__file__).parent.parent / "src" / "404.html"
    error_page_dest = dist_dir / "404.html"
    if error_page_source.exists():
        shutil.copy2(error_page_source, error_page_dest)
        print(f"Copied 404 page to: {error_page_dest}")

    try:
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(html_content)

        # Verify file was written
        if output_file.exists():
            file_size = output_file.stat().st_size
            print(f"Successfully generated {output_file}")
            print(f"File size: {file_size:,} bytes")
        else:
            print(f"Error: File was not created at {output_file}")

    except Exception as e:
        print(f"Error writing file: {e}")
        return

    print("\nBuild completed successfully!")


if __name__ == "__main__":
    main()
