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
        Create a minimal verb section with data references for external loading.

        Args:
            verb: Verb data dictionary
            index: Page number index
            duplicate_primary_verbs: Dictionary of duplicate primary verbs

        Returns:
            HTML string for verb section
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
            preverb_selector = self.create_preverb_selector(verb)

        # Get notes and URL for conditional inclusion
        notes = verb.get("notes", "")
        url = verb.get("url", "")

        # Create minimal verb section with only essential data attributes
        section_html = f"""
            <div class="verb-section" id="{anchor_id}" 
                 data-verb-id="{verb_id}"
                 data-georgian="{primary_verb}"
                 data-full-georgian="{georgian}"
                 data-semantic-key="{semantic_key}"
                 data-category="{category}" 
                 data-class="{verb_class}"
                 data-has-multiple-preverbs="{has_multiple_preverbs}"
                 data-default-preverb="{default_preverb}">
                {preverb_selector}
                <h2>{page_number}<span class="georgian-text">{georgian}</span> - {description} {backlink} <button class="link-icon" onclick="handleLinkIconClick('{anchor_id}')" title="Copy link to clipboard">🔗</button></h2>
                
                <!-- Overview table container -->
                <div class="overview-container">
                    <div class="loading-indicator">Loading overview table...</div>
                </div>
                
                {f'<div class="verb-notes"><strong>Note:</strong> {notes}</div>' if notes.strip() else ''}
                {f'<div class="verb-external-link"><a href="{url}" target="_blank" rel="noopener noreferrer"><i class="fas fa-external-link-alt"></i> View on Lingua.ge</a></div>' if url.strip() else ''}
                
                <!-- TENSE PAIRS - Empty containers for dynamic content -->
                <div class="tense-pair" data-pair="1">
                    <div class="tense-column" data-tense="present">
                        <div class="loading-indicator">Loading present tense...</div>
                    </div>
                    <div class="tense-column" data-tense="imperfect">
                        <div class="loading-indicator">Loading imperfect tense...</div>
                    </div>
                </div>
                
                <div class="tense-pair" data-pair="2">
                    <div class="tense-column" data-tense="aorist">
                        <div class="loading-indicator">Loading aorist tense...</div>
                    </div>
                    <div class="tense-column" data-tense="optative">
                        <div class="loading-indicator">Loading optative tense...</div>
                    </div>
                </div>
                
                <div class="tense-pair" data-pair="3">
                    <div class="tense-column" data-tense="future">
                        <div class="loading-indicator">Loading future tense...</div>
                    </div>
                    <div class="tense-column" data-tense="imperative">
                        <div class="loading-indicator">Loading imperative tense...</div>
                    </div>
                </div>
            </div>
        """

        return section_html

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
                    <input type="text" id="search-input" class="search-input" placeholder="Search verbs... (↑↓ to navigate, Enter to select)" title="Search by Georgian or English name. Use ↑↓ arrows to navigate, Enter to select">
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
