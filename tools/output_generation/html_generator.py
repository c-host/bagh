"""
HTML Generator - Generates HTML structure with processed data
"""

import html
import re
from pathlib import Path
from typing import Dict, List, Optional
import logging

from tools.data_extraction.verb_data_loader import VerbDataLoader

# TODO: Check if needed:
from tools.utils.config_manager import ConfigManager

logger = logging.getLogger(__name__)


class HTMLGenerator:
    """
    Refactored HTML Generator that combines:
    - Rich HTML structure and UI features from html_generator.py
    - Data reading from processed pipeline data instead of calling generation functions
    """

    def __init__(self, project_root: Path, data_loader: VerbDataLoader):
        self.project_root = project_root
        self.data_loader = data_loader

    def create_safe_anchor_id(
        self,
        georgian_text: str,
        semantic_key: str = "",
        verb_id: str = "",
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """Create a safe anchor ID with smart disambiguation."""
        from tools.utils import create_safe_anchor_id as utils_create_safe_anchor_id

        return utils_create_safe_anchor_id(
            georgian_text,
            semantic_key,
            verb_id,
            duplicate_primary_verbs,
            self.data_loader,
        )

    def create_preverb_selector(self, verb_data: Dict) -> str:
        """
        Create preverb toggle selector for verb section.
        [KEPT FROM ORIGINAL - No changes needed]
        """
        preverb_config = verb_data.get("preverb_config", {})

        # Don't show selector for single-preverb verbs
        if not preverb_config.get("has_multiple_preverbs", False):
            return ""

        default_preverb = preverb_config.get("default_preverb", "")

        # Handle stem-based approach (available_preverbs array)
        available_preverbs = preverb_config.get("available_preverbs", [])
        if available_preverbs:
            selector_html = f"""
                <div class="preverb-selector">
                    <label for="preverb-toggle-{verb_data['id']}">Preverb:</label>
                    <select id="preverb-toggle-{verb_data['id']}" class="preverb-toggle" data-verb-id="{verb_data['id']}">
            """

            for preverb in available_preverbs:
                selected = "selected" if preverb == default_preverb else ""
                selector_html += (
                    f'<option value="{preverb}" {selected}>{preverb}</option>'
                )

            selector_html += """
                    </select>
                </div>
            """

            return selector_html

        return ""

    def create_toc(
        self, verbs: List[Dict], duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """
        Create a table of contents with clickable links.
        [KEPT FROM ORIGINAL - No changes needed]
        """
        toc_html = """
            <div class="toc-container" id="toc">
                <h1>Table of Contents</h1>
                <div class="toc-list">
        """

        for i, verb in enumerate(verbs, 1):
            georgian = verb.get("georgian", "N/A")
            description = verb.get("description", "")
            semantic_key = verb.get("semantic_key", "")

            # Use primary verb for anchor ID with smart disambiguation
            primary_verb = self.data_loader.get_primary_verb(georgian)
            verb_id = verb.get("id", "")
            anchor_id = self.create_safe_anchor_id(
                georgian, semantic_key, verb_id, duplicate_primary_verbs
            )

            toc_html += f"""
                    <div class="toc-item" data-semantic-key="{semantic_key}">
                        <a href="#{anchor_id}" class="toc-link">
                            <span class="toc-number">{i}</span>
                            <span class="toc-georgian">{georgian}</span>
                            <span class="toc-description">{description}</span>
                        </a>
                    </div>
            """

        toc_html += """
                </div>
            </div>
        """
        return toc_html

    def generate_html(
        self, processed_verbs: Dict, duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """
        Generate the complete HTML file using processed data.
        [REFACTORED - Now reads from processed data instead of calling generation functions]

        Args:
            processed_verbs: Dictionary of processed verb data from the pipeline
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            Complete HTML content string
        """
        # Debug: Check what data we're receiving
        print(
            f"[DEBUG] generate_html called with {len(processed_verbs)} processed verbs"
        )
        if processed_verbs:
            first_verb_id = list(processed_verbs.keys())[0]
            first_verb = processed_verbs[first_verb_id]
            examples = first_verb.get("generated_data", {}).get("examples", {})
            # Don't print examples keys to avoid Unicode encoding issues
            print(
                f"[DEBUG] First verb {first_verb_id} has examples: {'YES' if examples else 'NO'}"
            )

        # Convert processed verbs to list for TOC generation
        verbs_list = []
        for verb_id, processed_verb in processed_verbs.items():
            base_data = processed_verb["base_data"]
            verbs_list.append(base_data)

        # Generate table of contents first
        toc_section = self.create_toc(verbs_list, duplicate_primary_verbs)

        # Group verbs by category and generate verb sections with category headers
        verbs_by_category = {}
        for verb in verbs_list:
            category = verb.get("category", "Unknown")
            if category not in verbs_by_category:
                verbs_by_category[category] = []
            verbs_by_category[category].append(verb)

        # Get all unique categories for dynamic generation
        all_categories = sorted(verbs_by_category.keys())

        # Generate verb sections organized by category
        verb_sections = ""

        for i, (category, category_verbs) in enumerate(
            sorted(verbs_by_category.items())
        ):
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

                # Find the corresponding processed verb data
                verb_id = str(
                    verb.get("id", "")
                )  # Convert to string to match processed_verbs keys
                processed_verb = processed_verbs.get(verb_id, {})

                verb_html = self.create_static_verb_section_from_processed_data(
                    verb, processed_verb, global_index, duplicate_primary_verbs
                )
                verb_sections += verb_html

            # Close category content div
            verb_sections += """
                </div>
            </div>
            """

        # Create the complete HTML - KEEPING THE RICH STRUCTURE FROM ORIGINAL
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
    <script type="module" src="scripts/main.js"></script>

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
                // For custom fonts, let the CSS handle it with font-display: block
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
            <div class="sidebar-sticky-header">
                <div class="search-container">
                    <input type="text" id="search-input" class="search-input" placeholder="Search verbs (↑↓ to navigate, Enter to select)" title="Search by Georgian or English name. Use ↑↓ arrows to navigate, Enter to select">
                    <div class="search-icon">
                        <i class="fas fa-search"></i>
                    </div>
                </div>
            </div>
            <div class="sidebar-body">
                <div class="toc-content-container">
                    <!-- Category headers and TOC items will be populated by JavaScript -->
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

        {verb_sections}
    </div>
</body>

</html>"""

        return html_content

    # ============================================================================
    # REFACTORED METHODS - READ FROM PROCESSED DATA INSTEAD OF CALLING GENERATION FUNCTIONS
    # ============================================================================

    def create_static_verb_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create a complete static verb section using processed data instead of calling generation functions.
        [REFACTORED - Now reads from processed data instead of calling example generation methods]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            index: Page number index
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            HTML string for complete static verb section
        """
        # Check if verb has multiple preverbs
        has_multiple_preverbs = verb.get("preverb_config", {}).get(
            "has_multiple_preverbs", False
        )

        if has_multiple_preverbs:
            # Generate static content with default preverb using processed data
            return self._create_multi_preverb_static_section_from_processed_data(
                verb, processed_verb, index, duplicate_primary_verbs
            )
        else:
            # Generate complete static content using processed data
            return self._create_single_preverb_static_section_from_processed_data(
                verb, processed_verb, index, duplicate_primary_verbs
            )

    def _create_single_preverb_static_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create complete static content for single-preverb verbs using processed data.
        [REFACTORED - Now reads from processed data instead of calling generation functions]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            index: Page number index
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            HTML string for complete static verb section
        """
        verb_id = verb.get("id", "N/A")
        georgian = verb.get("georgian", "N/A")
        description = verb.get("description", "N/A")
        semantic_key = verb.get("semantic_key", "")

        # Create anchor ID for this section using primary verb with smart disambiguation
        primary_verb = self.data_loader.get_primary_verb(georgian)
        verb_id = verb.get("id", "")
        anchor_id = self.create_safe_anchor_id(
            georgian, semantic_key, verb_id, duplicate_primary_verbs
        )

        # Add page number and backlink if index is provided
        page_number = f"<span class='page-number'>{index}</span>" if index else ""
        backlink = f"<a href='#toc' class='toc-backlink'>↑ ToC</a>" if index else ""

        # Get notes and URL for conditional inclusion
        notes = verb.get("notes", "")
        url = verb.get("url", "")

        # Get preverb configuration for single-preverb verbs
        preverb_config = verb.get("preverb_config", {})
        default_preverb = preverb_config.get("default_preverb", "")

        # Generate static content using processed data instead of calling generation functions
        # For single-preverb verbs, don't pass a preverb parameter so examples/glosses are retrieved from base data
        overview_table = self._generate_overview_table_from_processed_data(
            verb, processed_verb, None
        )
        tense_tables = self._generate_tense_tables_from_processed_data(
            verb, processed_verb, None
        )

        # Get category for the verb
        category = verb.get("category", "Unknown")

        # Create complete static verb section
        section_html = f"""
            <div class="verb-section" id="{anchor_id}" 
                 data-verb-id="{verb_id}"
                 data-georgian="{primary_verb}"
                 data-full-georgian="{georgian}"
                 data-semantic-key="{semantic_key}"
                 data-category="{category}"
                 data-has-multiple-preverbs="false">
                
                <h2>{page_number}<span class="georgian-text">{georgian}</span> - {description} {backlink} <button class="link-icon" onclick="handleLinkIconClick('{anchor_id}')" title="Copy link to clipboard">🔗</button></h2>
                
                {overview_table}
                
                {f'<div class="verb-notes"><strong>Note:</strong> {notes}</div>' if notes.strip() else ''}
                {f'<div class="verb-external-link"><a href="{url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View on Lingua.ge</a></div>' if url.strip() else ''}
                
                {tense_tables}
            </div>
        """

        return section_html

    def _create_multi_preverb_static_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create static content for multi-preverb verbs with default preverb using processed data.
        [REFACTORED - Now reads from processed data instead of calling generation functions]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            index: Page number index
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            HTML string for multi-preverb static verb section
        """
        verb_id = verb.get("id", "N/A")
        georgian = verb.get("georgian", "N/A")
        description = verb.get("description", "N/A")
        semantic_key = verb.get("semantic_key", "")

        # Create anchor ID for this section using primary verb with smart disambiguation
        primary_verb = self.data_loader.get_primary_verb(georgian)
        verb_id = verb.get("id", "")
        anchor_id = self.create_safe_anchor_id(
            georgian, semantic_key, verb_id, duplicate_primary_verbs
        )

        # Add page number and backlink if index is provided
        page_number = f"<span class='page-number'>{index}</span>" if index else ""
        backlink = f"<a href='#toc' class='toc-backlink'>↑ ToC</a>" if index else ""

        # Get preverb configuration
        preverb_config = verb.get("preverb_config", {})
        default_preverb = preverb_config.get("default_preverb", "")

        # Add preverb selector for multi-preverb verbs
        preverb_selector = self.create_preverb_selector(verb)

        # Get notes and URL for conditional inclusion
        notes = verb.get("notes", "")
        url = verb.get("url", "")

        # Get category for the verb
        category = verb.get("category", "Unknown")

        # Generate static content using processed data instead of calling generation functions
        overview_table = self._generate_overview_table_from_processed_data(
            verb, processed_verb, default_preverb
        )
        tense_tables = self._generate_tense_tables_from_processed_data(
            verb, processed_verb, default_preverb
        )

        # Create multi-preverb static verb section
        section_html = f"""
            <div class="verb-section" id="{anchor_id}" 
                 data-verb-id="{verb_id}"
                 data-georgian="{primary_verb}"
                 data-full-georgian="{georgian}"
                 data-semantic-key="{semantic_key}"
                 data-category="{category}"
                 data-has-multiple-preverbs="true"
                 data-default-preverb="{default_preverb}">
                
                {preverb_selector}
                <h2>{page_number}<span class="georgian-text">{georgian}</span> - {description} {backlink} <button class="link-icon" onclick="handleLinkIconClick('{anchor_id}')" title="Copy link to clipboard">🔗</button></h2>
                
                {overview_table}
                
                {f'<div class="verb-notes"><strong>Note:</strong> {notes}</div>' if notes.strip() else ''}
                {f'<div class="verb-external-link"><a href="{url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View on Lingua.ge</a></div>' if url.strip() else ''}
                
                {tense_tables}
            </div>
        """

        return section_html

    def _generate_overview_table_from_processed_data(
        self, verb: Dict, processed_verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """
        Generate overview table HTML using processed data instead of calling generation functions.
        [REFACTORED - Now reads from processed data instead of calling get_conjugation_form]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            preverb: Optional preverb to use (for multi-preverb verbs)

        Returns:
            HTML string for overview table
        """
        try:
            # Define tenses and their display names
            tenses = [
                ("present", "PRES"),
                ("imperfect", "IMPF"),
                ("future", "FUT"),
                ("aorist", "AOR"),
                ("optative", "OPT"),
                ("imperative", "IMPR"),
            ]

            # Define persons
            persons = ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]

            # Check if verb has multiple preverbs
            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            # Generate table rows using processed data
            table_rows = ""
            for tense_name, tense_display in tenses:
                row_class = f"tense-{tense_name}"
                cells = f"<td>{tense_display}</td>"

                for person in persons:
                    if has_multiple_preverbs and preverb:
                        # Use processed preverb forms for multi-preverb verbs
                        form = self._get_processed_conjugation_form(
                            processed_verb, tense_name, person, preverb
                        )
                    else:
                        # Use base conjugations for single-preverb verbs
                        form = self._get_base_conjugation_form(verb, tense_name, person)

                    cells += f'<td class="georgian-text">{form}</td>'

                table_rows += f'<tr class="{row_class}">{cells}</tr>'

            overview_table = f"""
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
                            {table_rows}
                        </tbody>
                    </table>
                </div>
            """

            return overview_table

        except Exception as e:
            logger.warning(
                f"Failed to generate overview table for verb {verb.get('id', 'unknown')}: {e}"
            )
            return ""

    def _generate_tense_tables_from_processed_data(
        self, verb: Dict, processed_verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """
        Generate individual tense tables HTML using processed data.
        [REFACTORED - Now reads from processed data instead of calling generation functions]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            preverb: Optional preverb to use

        Returns:
            HTML string for all tense tables
        """
        try:
            # Define tense pairs for layout
            tense_pairs = [
                [("present", "Present Indicative"), ("imperfect", "Imperfect")],
                [("aorist", "Aorist"), ("optative", "Optative")],
                [("future", "Future"), ("imperative", "Imperative")],
            ]

            tense_tables_html = ""
            for pair_index, (tense1, tense2) in enumerate(tense_pairs, 1):
                table1 = self._generate_single_tense_table_from_processed_data(
                    verb, processed_verb, tense1[0], tense1[1], preverb
                )
                table2 = self._generate_single_tense_table_from_processed_data(
                    verb, processed_verb, tense2[0], tense2[1], preverb
                )

                tense_tables_html += f"""
                    <div class="tense-pair">
                        <div class="tense-column" data-tense="{tense1[0]}">
                            {table1}
                        </div>
                        <div class="tense-column" data-tense="{tense2[0]}">
                            {table2}
                        </div>
                    </div>
                """

            return tense_tables_html

        except Exception as e:
            logger.warning(
                f"Failed to generate tense tables for verb {verb.get('id', 'unknown')}: {e}"
            )
            return ""

    def _generate_single_tense_table_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        tense_display: str,
        preverb: Optional[str] = None,
    ) -> str:
        """
        Generate a single tense table with examples and gloss analysis using processed data.
        [REFACTORED - Now reads from processed data instead of calling generation functions]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            tense: Tense name
            tense_display: Display name for the tense
            preverb: Optional preverb to use

        Returns:
            HTML string for single tense table
        """
        try:
            # Generate conjugation table using processed data
            conjugation_table = self._generate_conjugation_table_from_processed_data(
                verb, processed_verb, tense, preverb
            )

            # Generate examples using processed data
            examples_section = self._generate_examples_section_from_processed_data(
                verb, processed_verb, tense, preverb
            )

            # Generate gloss analysis using processed data
            gloss_analysis = self._generate_gloss_analysis_from_processed_data(
                verb, processed_verb, tense, preverb
            )

            return f"""
                <h3>{tense_display}</h3>
                {conjugation_table}
                {examples_section}
                {gloss_analysis}
            """

        except Exception as e:
            logger.warning(
                f"Failed to generate tense table for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )
            return ""

    def _generate_conjugation_table_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        preverb: Optional[str] = None,
    ) -> str:
        """
        Generate conjugation table HTML for a specific tense using processed data.
        [REFACTORED - Now reads from processed data instead of calling get_conjugation_form]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            tense: Tense name
            preverb: Optional preverb to use

        Returns:
            HTML string for conjugation table
        """
        try:
            # Define persons
            persons = [
                ("1st", "1sg", "1pl"),
                ("2nd", "2sg", "2pl"),
                ("3rd", "3sg", "3pl"),
            ]

            # Check if verb has multiple preverbs
            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            # Generate table rows using processed data
            table_rows = ""
            for person_display, sg_person, pl_person in persons:
                if has_multiple_preverbs and preverb:
                    # Use processed preverb forms for multi-preverb verbs
                    sg_form = self._get_processed_conjugation_form(
                        processed_verb, tense, sg_person, preverb
                    )
                    pl_form = self._get_processed_conjugation_form(
                        processed_verb, tense, pl_person, preverb
                    )
                else:
                    # Use base conjugations for single-preverb verbs
                    sg_form = self._get_base_conjugation_form(verb, tense, sg_person)
                    pl_form = self._get_base_conjugation_form(verb, tense, pl_person)

                table_rows += f"""
                    <tr>
                        <td>{person_display}</td>
                        <td class="georgian-text">{sg_form}</td>
                        <td class="georgian-text">{pl_form}</td>
                    </tr>
                """

            return f"""
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
                            {table_rows}
                        </tbody>
                    </table>
                </div>
            """

        except Exception as e:
            logger.warning(
                f"Failed to generate conjugation table for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )
            return ""

    def _generate_examples_section_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        preverb: Optional[str] = None,
    ) -> str:
        """
        Generate examples section HTML using processed data instead of calling example generation methods.

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            tense: Tense name
            preverb: Optional preverb to use

        Returns:
            HTML string for examples section
        """
        try:
            logger.info(
                f"Generating examples from processed data for verb {verb.get('id', 'unknown')}, tense {tense}, preverb {preverb}"
            )

            # Check if verb has multiple preverbs
            preverb_config = verb.get("preverb_config", {})
            has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

            logger.info(f"Verb has multiple preverbs: {has_multiple_preverbs}")

            if has_multiple_preverbs:
                # Generate examples for the default preverb only (static)
                default_preverb = preverb_config.get("default_preverb", "")
                examples_html = ""

                logger.info(
                    f"Multi-preverb verb, generating examples for default preverb: {default_preverb}"
                )

                # Get examples from processed data for the default preverb
                examples = self._get_processed_examples(
                    processed_verb, tense, default_preverb
                )
                if examples:
                    examples_html = self._format_examples_from_processed_data(
                        examples, default_preverb
                    )

                logger.info(f"Final examples HTML length: {len(examples_html)}")
                return examples_html
            else:
                # Single preverb - get examples from processed data
                logger.info(
                    f"Single preverb verb, getting examples from processed data"
                )
                examples = self._get_processed_examples(processed_verb, tense, preverb)
                logger.info(
                    f"Retrieved examples: {len(examples) if examples else 0} examples"
                )
                if examples:
                    result = self._format_examples_from_processed_data(examples)
                    logger.info(f"Formatted examples HTML length: {len(result)}")
                    logger.info(f"Formatted examples HTML preview: {result[:200]}...")
                    return result
                else:
                    logger.warning(
                        f"No examples found in processed data for verb {verb.get('id', 'unknown')}, tense {tense}"
                    )
                    return ""

        except Exception as e:
            logger.warning(
                f"Failed to generate examples from processed data for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )
            return ""

    def _generate_gloss_analysis_from_processed_data(
        self,
        verb: Dict,
        processed_verb: Dict,
        tense: str,
        preverb: Optional[str] = None,
    ) -> str:
        """
        Generate gloss analysis HTML using processed data instead of calling gloss parser functions.
        [REFACTORED - Now reads from processed data instead of calling gloss parser functions]

        Args:
            verb: Base verb data dictionary
            processed_verb: Processed verb data from the pipeline
            tense: Tense name
            preverb: Optional preverb to use

        Returns:
            HTML string for gloss analysis
        """
        try:
            verb_id = verb.get("id", "unknown")
            has_multiple_preverbs = verb.get("preverb_config", {}).get(
                "has_multiple_preverbs", False
            )

            logger.info(
                f"[GLOSS] Generating gloss from processed data for verb {verb_id}, tense {tense}, preverb {preverb}, multi-preverb: {has_multiple_preverbs}"
            )

            # Get gloss data from processed data
            gloss_data = self._get_processed_gloss_data(processed_verb, tense, preverb)

            if not gloss_data:
                logger.info(
                    f"[GLOSS] No gloss data found in processed data for verb {verb_id}, tense {tense}"
                )
                return ""

                # Format the gloss analysis using processed data
            gloss_html = self._format_gloss_analysis_from_processed_data(
                gloss_data, verb_id, tense, preverb
            )

            logger.info(
                f"[GLOSS] Generated gloss HTML from processed data for verb {verb_id}, tense {tense}, length: {len(gloss_html)}"
            )
            return gloss_html

        except Exception as e:
            logger.warning(
                f"Failed to generate gloss analysis from processed data for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )
            return ""

    # ============================================================================
    # HELPER METHODS FOR READING FROM PROCESSED DATA
    # ============================================================================

    def _get_processed_conjugation_form(
        self, processed_verb: Dict, tense: str, person: str, preverb: str
    ) -> str:
        """Get conjugation form from processed data for multi-preverb verbs."""
        try:
            preverb_forms = processed_verb.get("generated_data", {}).get(
                "preverb_forms", {}
            )
            tense_forms = preverb_forms.get(preverb, {}).get(tense, {})
            return tense_forms.get(person, "-")
        except Exception:
            return "-"

    def _get_base_conjugation_form(self, verb: Dict, tense: str, person: str) -> str:
        """Get conjugation form from base verb data for single-preverb verbs."""
        try:
            conjugations = verb.get("conjugations", {})
            tense_data = conjugations.get(tense, {})
            forms = tense_data.get("forms", {})
            return forms.get(person, "-")
        except Exception:
            return "-"

    def _get_processed_examples(
        self, processed_verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> List[Dict]:
        """Get examples from processed data."""
        try:
            examples = processed_verb.get("generated_data", {}).get("examples", {})
            print(f"[EXAMPLES] Looking for examples: tense={tense}, preverb={preverb}")
            # Don't print examples keys to avoid Unicode encoding issues
            print(f"[EXAMPLES] Available keys in examples: {len(examples)} keys")

            if preverb:
                # Multi-preverb verb - get examples for specific preverb
                result = examples.get(preverb, {}).get(tense, [])
                print(f"[EXAMPLES] Multi-preverb result: {len(result)} examples")
                return result
            else:
                # Single-preverb verb - examples might be stored directly under tense
                # or under a default preverb key
                if tense in examples:
                    # Direct tense access
                    result = examples.get(tense, [])
                    print(
                        f"[EXAMPLES] Direct tense access result: {len(result)} examples"
                    )
                    return result
                else:
                    # Check if there's a default preverb
                    # Look for any preverb that has examples for this tense
                    for preverb_key, preverb_data in examples.items():
                        if isinstance(preverb_data, dict) and tense in preverb_data:
                            result = preverb_data.get(tense, [])
                            print(
                                f"[EXAMPLES] Found under preverb {preverb_key}: {len(result)} examples"
                            )
                            return result
                    print(f"[EXAMPLES] No examples found for tense {tense}")
                    return []
        except Exception as e:
            # Don't print exception details to avoid Unicode encoding issues
            print(
                f"[EXAMPLES] Exception in _get_processed_examples: {type(e).__name__}"
            )
            return []

    def _get_processed_gloss_data(
        self, processed_verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> Dict:
        """Get gloss data from processed data."""
        try:
            gloss_analysis = processed_verb.get("generated_data", {}).get(
                "gloss_analysis", {}
            )
            if preverb:
                # Multi-preverb verb - get gloss for specific preverb
                gloss_data = gloss_analysis.get(preverb, {}).get(tense, {})
            else:
                # Single-preverb verb - gloss might be stored directly under tense
                # or under a default preverb key
                if tense in gloss_analysis:
                    # Direct tense access
                    gloss_data = gloss_analysis.get(tense, {})
                else:
                    # Check if there's a default preverb
                    # Look for any preverb that has gloss for this tense
                    for preverb_key, preverb_data in gloss_analysis.items():
                        if isinstance(preverb_data, dict) and tense in preverb_data:
                            gloss_data = preverb_data.get(tense, {})
                            break
                    else:
                        return {}

            # Extract the structured gloss data if it exists
            if gloss_data and "structured_gloss" in gloss_data:
                return gloss_data["structured_gloss"]
            else:
                return gloss_data
        except Exception:
            return {}

    def _format_examples_from_processed_data(
        self, examples: List[Dict], preverb: Optional[str] = None
    ) -> str:
        """Format examples from processed data into HTML."""
        try:
            if not examples:
                return ""

            examples_html = ""
            for example in examples:
                georgian_html = example.get("html", example.get("georgian", ""))
                english_text = example.get("english", "")
                copy_text = example.get("copy_text", english_text)

                # Ensure copy_text is plain text (remove HTML tags if present)
                plain_copy_text = re.sub(r"<[^>]+>", "", copy_text)

                examples_html += f"""
                    <li class="example-item">
                        <div class="georgian georgian-text">
                            {georgian_html}
                        </div>
                        <div class="translation english-text" data-copy-text="{plain_copy_text}">
                            {english_text}
                        </div>
                    </li>
                """

            preverb_suffix = f" ({preverb})" if preverb else ""
            return f"""
                <div class="examples">
                    <h4>Examples{preverb_suffix}:</h4>
                    <ul>
                        {examples_html}
                    </ul>
                </div>
            """

        except Exception as e:
            logger.warning(f"Failed to format examples from processed data: {e}")
            return ""

    def _format_gloss_analysis_from_processed_data(
        self, gloss_data: Dict, verb_id: str, tense: str, preverb: Optional[str] = None
    ) -> str:
        """Format gloss analysis from processed data into HTML using the new structured format."""
        try:
            # Check if we have structured gloss data (either direct or nested)
            if "raw_components" in gloss_data:
                # Direct structure from robust gloss processor
                raw_components = gloss_data.get("raw_components", [])
                expanded_components = gloss_data.get("expanded_components", [])
            else:
                # Legacy nested structure
                structured_gloss = gloss_data.get("structured_gloss", {})
                if not structured_gloss:
                    return ""
                raw_components = structured_gloss.get("raw_components", [])
                expanded_components = structured_gloss.get("expanded_components", [])

            # Generate raw gloss section with monospaced font
            raw_html = self._generate_raw_gloss_section(raw_components)

            # Generate expanded gloss section
            expanded_html = self._generate_expanded_gloss_section(expanded_components)

            # Wrap in case-gloss div
            preverb_attr = f' data-preverb="{preverb}"' if preverb else ""
            result = f"""
            <div class="case-gloss" data-verb-id="{verb_id}" data-tense="{tense}"{preverb_attr}>
                <div class="gloss-header">
                    <strong>Verb Gloss Analysis</strong>
                </div>
                <div class="gloss-content">
                    {raw_html}
                    {expanded_html}
                </div>
            </div>
            """

            return result

        except Exception as e:
            logger.warning(f"Failed to format gloss analysis from processed data: {e}")
            return ""

    def _generate_raw_gloss_section(self, raw_components: List[Dict]) -> str:
        """Generate the raw gloss section with monospaced font and color coding."""
        if not raw_components:
            return ""

        # Build color-coded raw gloss
        colored_parts = []
        for component in raw_components:
            text = component.get("text", "")
            color_class = component.get("color_class", "gloss-default")

            # Escape angle brackets so they display as literal text
            escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")
            colored_parts.append(f'<span class="{color_class}">{escaped_text}</span>')

        colored_raw_gloss = " ".join(colored_parts)

        return f"""
        <div class="raw-gloss">
            <strong>Raw:</strong> 
            <span class="gloss-text" style="font-family: 'Courier New', monospace;">{colored_raw_gloss}</span>
        </div>
        """

    def _generate_expanded_gloss_section(self, expanded_components: List[Dict]) -> str:
        """Generate the expanded gloss section with proper formatting."""
        if not expanded_components:
            return ""

        # Build expanded gloss
        expanded_parts = []
        for component in expanded_components:
            text = component.get("text", "")
            color_class = component.get("color_class", "gloss-default")
            description = component.get("description", "")

            # Escape angle brackets so they display as literal text
            escaped_text = text.replace("<", "&lt;").replace(">", "&gt;")
            colored_text = f'<span class="{color_class}">{escaped_text}</span>'

            expanded_parts.append(f"{colored_text}: {description}")

        expanded_gloss = "<br>".join(expanded_parts)

        return f"""
        <div class="expanded-gloss">
            <strong>Expanded:</strong> 
            <div class="gloss-text">{expanded_gloss}</div>
        </div>
        """
