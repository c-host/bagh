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
from pathlib import Path


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


def create_preverb_selector(verb_data):
    """Create preverb toggle selector for verb section."""
    preverb_config = verb_data.get("preverb_config", {})

    # Don't show selector for single-preverb verbs
    if not preverb_config.get("has_multiple_preverbs", False):
        return ""

    preverbs = preverb_config.get("preverbs", {})
    default_preverb = preverb_config.get("default_preverb", "")

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

    # Handle single-preverb verbs
    if not preverb_config.get("has_multiple_preverbs", False):
        return create_overview_table(verb_data)

    # Handle multi-preverb verbs
    if selected_preverb is None:
        selected_preverb = preverb_config.get("default_preverb", "")

    # Extract conjugations for selected preverb
    preverb_conjugations = {}
    for tense, tense_data in verb_data.get("conjugations", {}).items():
        if isinstance(tense_data, dict) and selected_preverb in tense_data:
            preverb_conjugations[tense] = tense_data[selected_preverb]
        elif isinstance(tense_data, dict):
            # Fallback to first available preverb
            first_preverb = next(iter(tense_data.keys()))
            preverb_conjugations[tense] = tense_data[first_preverb]

    return create_overview_table({"conjugations": preverb_conjugations})


def create_preverb_aware_examples(verb_data, tense, selected_preverb=None):
    """Create examples for specific preverb and tense."""
    preverb_config = verb_data.get("preverb_config", {})

    # Handle single-preverb verbs
    if not preverb_config.get("has_multiple_preverbs", False):
        return create_examples(verb_data, tense)

    # Handle multi-preverb verbs
    if selected_preverb is None:
        selected_preverb = preverb_config.get("default_preverb", "")

    examples_data = verb_data.get("examples", {}).get(tense, {})
    if isinstance(examples_data, dict) and selected_preverb in examples_data:
        # Create a modified verb structure with the selected preverb's conjugations
        modified_verb = {
            "examples": {tense: examples_data[selected_preverb]},
            "conjugations": {},
        }

        # Add conjugations for the specific tense and preverb
        tense_data = verb_data.get("conjugations", {}).get(tense, {})
        if isinstance(tense_data, dict) and selected_preverb in tense_data:
            modified_verb["conjugations"][tense] = tense_data[selected_preverb]

        return create_examples(modified_verb, tense)

    return ""


def create_overview_table(verb):
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
        conjugations = verb["conjugations"].get(tense, {})
        if conjugations:
            tense_class = f"tense-{tense}"
            table_html += f"""
                <tr class="{tense_class}">
                    <td>{tense_names[tense]}</td>
                    <td class="georgian-text">{conjugations.get('1sg', '-')}</td>
                    <td class="georgian-text">{conjugations.get('2sg', '-')}</td>
                    <td class="georgian-text">{conjugations.get('3sg', '-')}</td>
                    <td class="georgian-text">{conjugations.get('1pl', '-')}</td>
                    <td class="georgian-text">{conjugations.get('2pl', '-')}</td>
                    <td class="georgian-text">{conjugations.get('3pl', '-')}</td>
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

    # Extract conjugations for selected preverb
    tense_data = verb_data.get("conjugations", {}).get(tense, {})
    if isinstance(tense_data, dict) and selected_preverb in tense_data:
        conjugations = tense_data[selected_preverb]
    elif isinstance(tense_data, dict):
        # Fallback to first available preverb
        first_preverb = next(iter(tense_data.keys()))
        conjugations = tense_data[first_preverb]
    else:
        conjugations = tense_data

    if not conjugations:
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
                <td class="georgian-text">{conjugations.get(person['sg'], '-')}</td>
                <td class="georgian-text">{conjugations.get(person['pl'], '-')}</td>
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
    conjugations = verb["conjugations"].get(tense, {})
    if not conjugations:
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
                <td class="georgian-text">{conjugations.get(person['sg'], '-')}</td>
                <td class="georgian-text">{conjugations.get(person['pl'], '-')}</td>
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
    tense_data = verb["examples"].get(tense, {})

    # Handle new format where tense_data is a dict with case_gloss and examples
    if isinstance(tense_data, dict) and "examples" in tense_data:
        examples = tense_data["examples"]
        case_gloss = tense_data.get("case_gloss", "")
    else:
        # Handle old format where tense_data is directly a list of examples
        examples = tense_data if isinstance(tense_data, list) else []
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
            verb_form = verb["conjugations"][tense_name][person]

            # Replace the placeholder with the actual verb form (bolded)
            georgian_text = template.replace("{verb}", f"<strong>{verb_form}</strong>")
        else:
            # Old format: use hardcoded georgian text
            georgian_text = example.get("georgian", "")

        # Handle English verb highlighting
        english_text = example["english"]
        if "english_verb" in example:
            english_text = english_text.replace(
                example["english_verb"], f"<strong>{example['english_verb']}</strong>"
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
        # First convert \n to <br> tags for proper line breaks in HTML
        # Then escape angle brackets, but preserve the <br> tags
        case_gloss_html = case_gloss.replace("\n", "<br>")
        # Escape angle brackets but protect <br> tags
        case_gloss_html = case_gloss_html.replace(
            "<br>", "___BR___"
        )  # Temporarily replace <br>
        case_gloss_html = case_gloss_html.replace("<", "&lt;").replace(
            ">", "&gt;"
        )  # Escape brackets
        case_gloss_html = case_gloss_html.replace(
            "___BR___", "<br>"
        )  # Restore <br> tags
        examples_html += f"""
        <div class="case-gloss">
            <strong>Case Gloss -- </strong> {case_gloss_html}
        </div>
    """

    return examples_html


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

    # Add data attributes for JavaScript
    # Properly escape JSON data for HTML attributes
    preverb_config_json = html.escape(json.dumps(preverb_config, ensure_ascii=False))
    conjugations_json = html.escape(
        json.dumps(verb.get("conjugations", {}), ensure_ascii=False)
    )
    examples_json = html.escape(
        json.dumps(verb.get("examples", {}), ensure_ascii=False)
    )

    section_html = f"""
        <div class="verb-section" id="{anchor_id}" 
             data-category="{category}" 
             data-class="{verb_class}"
             data-has-multiple-preverbs="{has_multiple_preverbs}"
             data-default-preverb="{default_preverb}"
             data-preverb-config='{preverb_config_json}'
             data-conjugations='{conjugations_json}'
             data-examples='{examples_json}'>
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

    if verb["conjugations"].get("present"):
        present_content += create_preverb_aware_regular_table(
            verb, "present", default_preverb
        )
        present_content += create_preverb_aware_examples(
            verb, "present", default_preverb
        )

    if verb["conjugations"].get("imperfect"):
        imperfect_content += create_preverb_aware_regular_table(
            verb, "imperfect", default_preverb
        )
        imperfect_content += create_preverb_aware_examples(
            verb, "imperfect", default_preverb
        )

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

    if verb["conjugations"].get("aorist"):
        aorist_content += create_preverb_aware_regular_table(
            verb, "aorist", default_preverb
        )
        aorist_content += create_preverb_aware_examples(verb, "aorist", default_preverb)

    if verb["conjugations"].get("optative"):
        optative_content += create_preverb_aware_regular_table(
            verb, "optative", default_preverb
        )
        optative_content += create_preverb_aware_examples(
            verb, "optative", default_preverb
        )

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

    if verb["conjugations"].get("future"):
        future_content += create_preverb_aware_regular_table(
            verb, "future", default_preverb
        )
        future_content += create_preverb_aware_examples(verb, "future", default_preverb)

    if verb["conjugations"].get("imperative"):
        imperative_content += create_preverb_aware_regular_table(
            verb, "imperative", default_preverb
        )
        imperative_content += create_preverb_aware_examples(
            verb, "imperative", default_preverb
        )

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
                        <li><strong>Preverbs:</strong> Explore how preverbs change verb meanings s</li>
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
