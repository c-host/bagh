"""
HTML generation module for verb-website build process.
Handles generation of HTML content for verb sections, TOC, and examples.
"""

import html
import re
from pathlib import Path
from typing import Dict, List, Optional
import logging

from .data_loader import VerbDataLoader

# Import core modules for static content generation
from tools.core.example_generator import generate_pedagogical_examples
from tools.core.gloss_parser import GlossParser
from tools.core.verb_conjugation import get_conjugation_form, has_preverb_in_tense

logger = logging.getLogger(__name__)


class HTMLGenerator:
    """Handles generation of HTML content for the verb website."""

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
        """
        Create a safe anchor ID with smart disambiguation.

        Args:
            georgian_text: Georgian verb text
            semantic_key: Semantic key for disambiguation
            verb_id: Verb ID for disambiguation
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            Safe anchor ID string
        """
        from tools.utils import safe_anchor_id, create_deterministic_hash

        primary_verb = self.data_loader.get_primary_verb(georgian_text)

        # Basic validation - ensure it's not empty
        if not primary_verb or primary_verb == "unknown":
            return f"verb-{create_deterministic_hash(georgian_text) % 10000}"

        # Check if this primary verb has duplicates
        if duplicate_primary_verbs and primary_verb in duplicate_primary_verbs:
            # This is a duplicate, so disambiguation is needed
            if semantic_key:
                return f"{primary_verb}-{semantic_key}"
            elif verb_id:
                return f"{primary_verb}-{verb_id}"
            else:
                return (
                    f"{primary_verb}-{create_deterministic_hash(georgian_text) % 1000}"
                )
        else:
            # This is unique, use clean URL
            return primary_verb

    def create_preverb_selector(self, verb_data: Dict) -> str:
        """
        Create preverb toggle selector for verb section.

        Args:
            verb_data: Verb data dictionary

        Returns:
            HTML string for preverb selector
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

    def create_verb_section(
        self,
        verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create a verb section with static content generation.

        Args:
            verb: Verb data dictionary
            index: Page number index
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            HTML string for verb section
        """
        # Use the new static content generation approach
        return self.create_static_verb_section(verb, index, duplicate_primary_verbs)

    def create_toc(
        self, verbs: List[Dict], duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """
        Create a table of contents with clickable links.

        Args:
            verbs: List of verb dictionaries
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            HTML string for table of contents
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
        self, verbs: List[Dict], duplicate_primary_verbs: Optional[Dict] = None
    ) -> str:
        """
        Generate the complete HTML file.

        Args:
            verbs: List of verb dictionaries
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            Complete HTML content string
        """
        # Generate table of contents first
        toc_section = self.create_toc(verbs, duplicate_primary_verbs)

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
            sidebar_category_options += (
                f'<option value="{category}">{category}</option>'
            )
            filter_category_options += f'<option value="{category}">{category}</option>'

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

                verb_html = self.create_verb_section(
                    verb, global_index, duplicate_primary_verbs
                )
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
        <button id="filter-toggle" class="filter-toggle" title="Toggle Filter Controls">
            <i class="fas fa-filter"></i>
        </button>
        <button id="reset-toggle" class="reset-toggle" title="Reset to Default State">
            <i class="fas fa-undo"></i>
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

        {verb_sections}
    </div>
</body>

</html>"""

        return html_content

    # ============================================================================
    # STATIC CONTENT GENERATION METHODS
    # ============================================================================

    def create_static_verb_section(
        self,
        verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create a complete static verb section with embedded content.

        Args:
            verb: Verb data dictionary
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
            # Generate static content with default preverb
            return self._create_multi_preverb_static_section(
                verb, index, duplicate_primary_verbs
            )
        else:
            # Generate complete static content
            return self._create_single_preverb_static_section(
                verb, index, duplicate_primary_verbs
            )

    def _create_single_preverb_static_section(
        self,
        verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create complete static content for single-preverb verbs.

        Args:
            verb: Verb data dictionary
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

        # Generate static content with default preverb
        overview_table = self._generate_overview_table(verb, default_preverb)
        tense_tables = self._generate_tense_tables(verb, default_preverb)

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

    def _create_multi_preverb_static_section(
        self,
        verb: Dict,
        index: Optional[int] = None,
        duplicate_primary_verbs: Optional[Dict] = None,
    ) -> str:
        """
        Create static content for multi-preverb verbs with default preverb.

        Args:
            verb: Verb data dictionary
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

        # Generate static content with default preverb
        overview_table = self._generate_overview_table(verb, default_preverb)
        tense_tables = self._generate_tense_tables(verb, default_preverb)

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

    def _generate_overview_table(
        self, verb: Dict, preverb: Optional[str] = None
    ) -> str:
        """
        Generate overview table HTML with all tenses.

        Args:
            verb: Verb data dictionary
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

            # Generate table rows
            table_rows = ""
            for tense_name, tense_display in tenses:
                row_class = f"tense-{tense_name}"
                cells = f"<td>{tense_display}</td>"

                for person in persons:
                    form = get_conjugation_form(verb, tense_name, person, preverb)
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

    def _generate_tense_tables(self, verb: Dict, preverb: Optional[str] = None) -> str:
        """
        Generate individual tense tables HTML.

        Args:
            verb: Verb data dictionary
            preverb: Optional preverb to use (for multi-preverb verbs)

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
                table1 = self._generate_single_tense_table(
                    verb, tense1[0], tense1[1], preverb
                )
                table2 = self._generate_single_tense_table(
                    verb, tense2[0], tense2[1], preverb
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

    def _generate_single_tense_table(
        self, verb: Dict, tense: str, tense_display: str, preverb: Optional[str] = None
    ) -> str:
        """
        Generate a single tense table with examples and gloss analysis.

        Args:
            verb: Verb data dictionary
            tense: Tense name
            tense_display: Display name for the tense
            preverb: Optional preverb to use

        Returns:
            HTML string for single tense table
        """
        try:
            # Generate conjugation table
            conjugation_table = self._generate_conjugation_table(verb, tense, preverb)

            # Generate examples
            examples_section = self._generate_examples_section(verb, tense, preverb)

            # Generate gloss analysis
            gloss_analysis = self._generate_gloss_analysis(verb, tense, preverb)

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

    def _generate_conjugation_table(
        self, verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> str:
        """
        Generate conjugation table HTML for a specific tense.

        Args:
            verb: Verb data dictionary
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

            # Generate table rows
            table_rows = ""
            for person_display, sg_person, pl_person in persons:
                sg_form = get_conjugation_form(verb, tense, sg_person, preverb)
                pl_form = get_conjugation_form(verb, tense, pl_person, preverb)

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

    def _generate_examples_section(
        self, verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> str:
        """
        Generate examples section HTML using example generator with multi-preverb support.

        Args:
            verb: Verb data dictionary
            tense: Tense name
            preverb: Optional preverb to use

        Returns:
            HTML string for examples section
        """
        try:
            logger.info(
                f"Generating examples for verb {verb.get('id', 'unknown')}, tense {tense}, preverb {preverb}"
            )

            # Check if verb has multiple preverbs
            preverb_config = verb.get("preverb_config", {})
            has_multiple_preverbs = preverb_config.get("has_multiple_preverbs", False)

            logger.info(f"Verb has multiple preverbs: {has_multiple_preverbs}")
            logger.info(f"Preverb config: {preverb_config}")

            if has_multiple_preverbs:
                # Generate examples for the default preverb only (static)
                default_preverb = preverb_config.get("default_preverb", "")
                examples_html = ""

                logger.info(
                    f"Multi-preverb verb, generating examples for default preverb: {default_preverb}"
                )

                # Generate examples for the default preverb only
                enhanced_examples = generate_pedagogical_examples(
                    verb, tense, [default_preverb]
                )
                logger.info(
                    f"Enhanced examples result for default preverb: {enhanced_examples}"
                )

                if enhanced_examples.get("enhanced", False) and enhanced_examples.get(
                    "examples"
                ):
                    # Handle the new nested structure
                    examples_data = enhanced_examples["examples"]
                    if isinstance(examples_data, list) and examples_data:
                        # Check if this is the new nested structure
                        first_item = examples_data[0]
                        if isinstance(first_item, dict) and "examples" in first_item:
                            # New nested structure: examples grouped by preverb
                            for item in examples_data:
                                if item.get("preverb") == default_preverb:
                                    examples_html = self._format_multi_preverb_examples(
                                        item.get("examples", []), default_preverb
                                    )
                                    logger.info(
                                        f"Added examples for default preverb {default_preverb}"
                                    )
                                    break
                        else:
                            # Old structure: direct list of examples
                            examples_html = self._format_multi_preverb_examples(
                                examples_data, default_preverb
                            )
                            logger.info(
                                f"Added examples for default preverb {default_preverb}"
                            )

                logger.info(f"Final examples HTML length: {len(examples_html)}")
                return examples_html
            else:
                # Single preverb - use existing logic
                logger.info(f"Single preverb verb, generating examples")
                enhanced_examples = generate_pedagogical_examples(verb, tense, preverb)
                logger.info(f"Enhanced examples result: {enhanced_examples}")

                if enhanced_examples.get("enhanced", False) and enhanced_examples.get(
                    "examples"
                ):
                    # Handle the new nested structure where examples are grouped by preverb
                    examples_data = enhanced_examples["examples"]
                    if isinstance(examples_data, list) and examples_data:
                        # Check if this is the new nested structure
                        first_item = examples_data[0]
                        if isinstance(first_item, dict) and "examples" in first_item:
                            # New nested structure: examples grouped by preverb
                            # For single preverb, extract examples from the first (and only) preverb group
                            if examples_data:
                                first_preverb_group = examples_data[0]
                                examples_list = first_preverb_group.get("examples", [])
                                result = self._format_pedagogical_examples(
                                    examples_list
                                )
                            else:
                                result = ""
                        else:
                            # Old structure: direct list of examples
                            result = self._format_pedagogical_examples(examples_data)
                    else:
                        result = ""

                    logger.info(f"Formatted examples HTML length: {len(result)}")
                    return result
                else:
                    logger.warning(
                        f"No examples generated for verb {verb.get('id', 'unknown')}, tense {tense}"
                    )
                return ""

        except Exception as e:
            logger.warning(
                f"Failed to generate examples for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )
            return ""

    def _format_pedagogical_examples(self, examples: List[Dict]) -> str:
        """
        Format pedagogical examples into HTML.

        Args:
            examples: List of example dictionaries

        Returns:
            HTML string for formatted examples
        """
        try:
            if not examples:
                return ""

            examples_html = ""
            for example in examples:
                georgian_html = example.get("html", example.get("georgian", ""))
                english_text = example.get("english", "")
                copy_text = example.get("copy_text", english_text)

                # Ensure copy_text is plain text (remove HTML tags if present)
                import re

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

            return f"""
                <div class="examples">
                    <h4>Examples:</h4>
                    <ul>
                        {examples_html}
                    </ul>
                </div>
            """

        except Exception as e:
            logger.warning(f"Failed to format pedagogical examples: {e}")
            return ""

    def _format_multi_preverb_examples(self, examples: List[Dict], preverb: str) -> str:
        """
        Format multi-preverb examples into HTML with preverb-specific sections.

        Args:
            examples: List of example dictionaries for a specific preverb
            preverb: The preverb being formatted

        Returns:
            HTML string for formatted multi-preverb examples
        """
        try:
            if not examples:
                return ""

            examples_html = ""
            for example in examples:
                georgian_html = example.get("html", example.get("georgian", ""))
                english_text = example.get("english", "")
                copy_text = example.get("copy_text", english_text)

                # Ensure copy_text is plain text (remove HTML tags if present)
                import re

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

            return f"""
                <div class="examples" data-preverb="{preverb}">
                    <h4>Examples ({preverb}):</h4>
                    <ul>
                        {examples_html}
                    </ul>
                </div>
            """

        except Exception as e:
            logger.warning(
                f"Failed to format multi-preverb examples for preverb {preverb}: {e}"
            )
            return ""

    def _format_nested_examples(self, examples_data: List[Dict]) -> str:
        """
        Format nested examples (where examples are grouped by preverb) into HTML.

        Args:
            examples_data: List of dictionaries, where each dictionary contains a 'preverb' key
            and a 'examples' key (which is a list of example dictionaries).

        Returns:
            HTML string for formatted nested examples.
        """
        try:
            if not examples_data:
                return ""

            nested_examples_html = ""
            for item in examples_data:
                preverb = item.get("preverb", "N/A")
                examples_list = item.get("examples", [])

                if not examples_list:
                    continue

                # Format the individual examples for this preverb
                examples_html = ""
                for example in examples_list:
                    georgian_html = example.get("html", example.get("georgian", ""))
                    english_text = example.get("english", "")
                    copy_text = example.get("copy_text", english_text)

                    # Ensure copy_text is plain text (remove HTML tags if present)
                    import re

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

                nested_examples_html += f"""
                    <div class="examples" data-preverb="{preverb}">
                        <h4>Examples ({preverb}):</h4>
                        <ul>
                            {examples_html}
                        </ul>
                    </div>
                """

            return nested_examples_html

        except Exception as e:
            logger.warning(f"Failed to format nested examples: {e}")
            return ""

    def _generate_gloss_analysis(
        self, verb: Dict, tense: str, preverb: Optional[str] = None
    ) -> str:
        """
        Generate gloss analysis HTML using gloss parser.

        Args:
            verb: Verb data dictionary
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
                f"[GLOSS] Generating static gloss for verb {verb_id}, tense {tense}, preverb {preverb}, multi-preverb: {has_multiple_preverbs}"
            )

            gloss_parser = GlossParser()

            # Get raw gloss from verb data
            conjugations = verb.get("conjugations", {})
            tense_data = conjugations.get(tense, {})

            # Handle different data structures
            raw_gloss = ""
            gloss_preverb = preverb

            if isinstance(tense_data, dict):
                if "raw_gloss" in tense_data:
                    # New structure: raw_gloss is directly in tense_data
                    raw_gloss = tense_data.get("raw_gloss", "")
                elif "gloss" in tense_data:
                    gloss_data = tense_data["gloss"]
                    if isinstance(gloss_data, dict):
                        # New structure: gloss is a dictionary with raw_gloss and preverb
                        raw_gloss = gloss_data.get("raw_gloss", "")
                        gloss_preverb = gloss_data.get("preverb", preverb)
                    else:
                        # Old structure: gloss is a string
                        raw_gloss = gloss_data
                elif "forms" in tense_data and isinstance(tense_data["forms"], dict):
                    # Try to get gloss from forms structure
                    raw_gloss = tense_data["forms"].get("gloss", "")

            logger.info(
                f"[GLOSS] Raw gloss for verb {verb_id}, tense {tense}: '{raw_gloss}'"
            )

            if not raw_gloss:
                logger.info(
                    f"[GLOSS] No raw gloss found for verb {verb_id}, tense {tense}"
                )
                return ""

            # Keep the raw gloss unchanged - the preverb will be handled in the expanded gloss
            logger.info(f"[GLOSS] Using raw gloss as-is: '{raw_gloss}'")

            # Process raw gloss to get full expanded format using the same method as external data
            from tools.core.gloss_parser import (
                format_raw_gloss_with_colors,
                format_gloss_for_html,
                process_raw_gloss_simple,
            )

            expanded_gloss = process_raw_gloss_simple(raw_gloss, gloss_preverb)
            if not expanded_gloss:
                logger.warning(
                    f"[GLOSS] No expanded gloss generated for verb {verb_id}, tense {tense}"
                )
                return ""

            logger.info(
                f"[GLOSS] Expanded gloss for verb {verb_id}, tense {tense}: '{expanded_gloss[:100]}...'"
            )

            # Format the gloss analysis with color coding
            color_coded_raw = format_raw_gloss_with_colors(raw_gloss)
            color_coded_expanded = format_gloss_for_html(expanded_gloss)

            gloss_html = f"""
                <div class="case-gloss" data-verb-id="{verb_id}" data-tense="{tense}" data-preverb="{preverb or ''}">
                    <div class="gloss-header">
                        <strong>Verb Gloss Analysis</strong>
                    </div>
                    <div class="gloss-content">
                        <div class="raw-gloss">
                            <strong>Raw:</strong>
                            <code>{color_coded_raw}</code>
                        </div>
                        <div class="expanded-gloss">
                            <strong>Expanded:</strong>
                            <div class="gloss-definitions">
                                {color_coded_expanded}
                            </div>
                        </div>
                    </div>
                </div>
            """

            logger.info(
                f"[GLOSS] Generated static gloss HTML for verb {verb_id}, tense {tense}, length: {len(gloss_html)}"
            )
            return gloss_html

        except Exception as e:
            logger.warning(
                f"Failed to generate gloss analysis for verb {verb.get('id', 'unknown')}, tense {tense}: {e}"
            )
            return ""
