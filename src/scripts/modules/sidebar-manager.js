/**
 * Sidebar Manager Module
 * Handles sidebar functionality matching the original main.js implementation
 */
import { STORAGE_KEYS, ELEMENT_IDS } from '../shared/constants.js';


/**
 * Sidebar Manager Class
 * Manages sidebar functionality as implemented in original main.js
 */
export class SidebarManager {
    constructor(domManager) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {Array} Table of contents items */
        this.allTocItems = [];

        /** @type {Array} Filtered items for search */
        this.filteredItems = [];

        /** @type {number} Current search index */
        this.currentSearchIndex = -1;



        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;

        /** @type {Array} Event listeners for cleanup */
        this.eventListeners = [];

        /** @type {Object} DOM elements */
        this.elements = {};

        /** @type {Function} Throttled scroll handler */
        this.throttledUpdateActiveTocItem = null;

        /** @type {boolean} Whether scroll update is pending */
        this.scrollUpdatePending = false;
    }

    /**
     * Initialize the sidebar manager
     */
    initialize() {
        try {
            this.loadSavedState();
            this.setupEventListeners();
            this.setupScrollHandler();
            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize Sidebar Manager:', error);
            return false;
        }
    }

    /**
     * Load saved sidebar state from localStorage
     */
    loadSavedState() {
        try {
            const savedState = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE);
            if (savedState) {
                const state = JSON.parse(savedState);
                // Load any saved sidebar state if needed in the future
            }
        } catch (error) {
            console.warn('Failed to load sidebar state:', error);
        }
    }

    /**
     * Save current sidebar state to localStorage
     */
    saveState() {
        try {
            const state = {
                // Save any sidebar state if needed in the future
            };
            localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(state));
        } catch (error) {
            console.warn('Failed to save sidebar state:', error);
        }
    }





    /**
     * Set up event listeners for sidebar functionality
     */
    setupEventListeners() {
        const sidebarToggle = this.domManager.getElement(ELEMENT_IDS.SIDEBAR_TOGGLE);
        const sidebarModal = this.domManager.getElement(ELEMENT_IDS.SIDEBAR_MODAL);
        const sidebarOverlay = this.domManager.getElement(ELEMENT_IDS.SIDEBAR_OVERLAY);
        const sidebarClose = this.domManager.getElement(ELEMENT_IDS.SIDEBAR_CLOSE);
        const searchInput = this.domManager.getElement(ELEMENT_IDS.SEARCH_INPUT);

        if (!sidebarToggle || !sidebarModal || !sidebarOverlay || !sidebarClose) {
            console.warn('Sidebar elements not found');
            return;
        }

        // Store elements for later use
        this.elements = {
            sidebarToggle,
            sidebarModal,
            sidebarOverlay,
            sidebarClose,
            searchInput
        };

        // Toggle sidebar
        const toggleSidebar = () => {
            // Populate TOC first, then show sidebar to prevent flicker
            this.populateTableOfContents();
            sidebarModal.classList.add('active');
        };

        // Close sidebar
        const closeSidebar = () => {
            sidebarModal.classList.remove('active');
        };

        // Handle search input
        const handleSearchInput = (e) => {
            this.filterTableOfContents(e.target.value);
        };

        // Add event listeners
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        searchInput.addEventListener('input', handleSearchInput);

        // Set up keyboard navigation
        this.setupKeyboardNavigation();

        // Store listeners for cleanup
        this.eventListeners = [
            { element: sidebarToggle, event: 'click', handler: toggleSidebar },
            { element: sidebarClose, event: 'click', handler: closeSidebar },
            { element: sidebarOverlay, event: 'click', handler: closeSidebar },
            { element: searchInput, event: 'input', handler: handleSearchInput }
        ];
    }

    /**
     * Set up keyboard navigation for sidebar
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isSidebarOpen()) {
                this.handleSidebarKeyNavigation(e);
            }
        });
    }

    /**
     * Handle keyboard navigation within sidebar
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleSidebarKeyNavigation(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.filteredItems.length > 0) {
                this.currentSearchIndex = Math.min(this.currentSearchIndex + 1, this.filteredItems.length - 1);
                this.updateSearchSelection();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.filteredItems.length > 0) {
                this.currentSearchIndex = Math.max(this.currentSearchIndex - 1, 0);
                this.updateSearchSelection();
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.currentSearchIndex >= 0 && this.currentSearchIndex < this.filteredItems.length) {
                this.filteredItems[this.currentSearchIndex].click();
            }
        }
    }

    /**
     * Set up scroll handler for active TOC item updates
     */
    setupScrollHandler() {
        // Create throttled scroll handler
        this.throttledUpdateActiveTocItem = this.throttle(this.updateActiveTocItem.bind(this), 16); // ~60fps
        window.addEventListener('scroll', this.throttledUpdateActiveTocItem);
    }

    /**
     * Throttle function (copied from original main.js)
     */
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    /**
     * Populate table of contents - matches original main.js implementation
     */
    populateTableOfContents() {
        const tocContainer = document.querySelector('.toc-content-container');
        if (!tocContainer) return;

        const verbSections = document.querySelectorAll('.verb-section');
        tocContainer.innerHTML = '';
        this.allTocItems = []; // Reset the array

        // Group verbs by category
        const verbsByCategory = {};

        verbSections.forEach((section, index) => {
            // Extract basic data from the section
            const semanticKey = section.getAttribute('data-semantic-key') || '';
            const georgian = section.getAttribute('data-full-georgian') || '';
            const category = section.getAttribute('data-category') || 'Unknown';
            const sectionId = section.id;

            // Extract description from the h2 element - clean up the text properly
            const h2Element = section.querySelector('h2');
            let description = '';
            if (h2Element) {
                // Get the text content and clean it up
                let fullText = h2Element.textContent;
                // Remove page number at the start
                fullText = fullText.replace(/^\d+\s*/, '');
                // Remove Georgian text and the dash
                fullText = fullText.replace(/^[^\s-]*\s*-\s*/, '');
                // Remove "↑ ToC" and "🔗" at the end
                fullText = fullText.replace(/\s*↑\s*ToC\s*🔗\s*$/, '');
                fullText = fullText.replace(/\s*🔗\s*$/, '');
                description = fullText.trim();
            }

            // Group by category
            if (!verbsByCategory[category]) {
                verbsByCategory[category] = [];
            }

            verbsByCategory[category].push({
                section,
                semanticKey,
                georgian,
                category,
                description,
                sectionId
            });
        });

        // Create organized TOC with category headers
        Object.keys(verbsByCategory).sort().forEach(category => {
            const categoryVerbs = verbsByCategory[category];

            // Add category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'toc-category-header';
            categoryHeader.innerHTML = `<h3>${category}</h3>`;
            tocContainer.appendChild(categoryHeader);

            // Create toc-list for this category's items
            const tocList = document.createElement('div');
            tocList.className = 'toc-list';

            // Add verbs in this category
            categoryVerbs.forEach((verb, verbIndex) => {
                const tocItem = document.createElement('div');
                tocItem.className = 'toc-item';
                tocItem.setAttribute('data-semantic-key', verb.semanticKey);
                tocItem.setAttribute('data-category', verb.category);
                tocItem.innerHTML = `
                    <div class="verb-georgian">${verb.georgian}</div>
                    <div class="verb-description">${verb.description}</div>
                `;

                tocItem.addEventListener('click', function () {
                    // Remove active class from all items
                    document.querySelectorAll('.toc-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Add active class to clicked item
                    tocItem.classList.add('active');

                    // Navigate directly to the section
                    if (verb.section) {
                        // Ensure category is expanded
                        const categoryContainer = this.findCategoryContainer(verb.category);
                        if (categoryContainer) {
                            this.expandCategoryIfCollapsed(categoryContainer);
                        }

                        // Close sidebar first
                        this.closeSidebar();

                        // Navigate to verb after a brief delay
                        setTimeout(() => {
                            this.navigateToVerbSection(verb.section, verb.section.id, verb.georgian);
                        }, 100);
                    } else {
                        console.error(`Verb "${verb.georgian}" not found`);
                    }
                }.bind(this));

                tocList.appendChild(tocItem);
                this.allTocItems.push(tocItem);
            });

            // Append the toc-list to the container
            tocContainer.appendChild(tocList);
        });

        // Initialize filtered items
        this.filteredItems = [...this.allTocItems];
        this.currentSearchIndex = 0;
        this.updateSearchSelection();

        // Set the first item as active by default (only if no item is already active)
        const firstItem = tocContainer.querySelector('.toc-item');
        const hasActiveItem = tocContainer.querySelector('.toc-item.active');
        if (firstItem && !hasActiveItem) {
            firstItem.classList.add('active');
        }
    }

    /**
     * Filter table of contents - simplified without category filtering
     */
    filterTableOfContents(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        let visibleCount = 0;
        this.filteredItems = [];

        // Get all items including category headers
        const tocContainer = document.querySelector('.toc-content-container');
        if (!tocContainer) return;

        const allItems = tocContainer.querySelectorAll('.toc-item, .category-header, .toc-category-header');

        // Track which categories have visible verbs
        const categoriesWithVisibleVerbs = new Set();

        // Use requestAnimationFrame to batch DOM updates
        requestAnimationFrame(() => {
            // First pass: process verb items and track visible categories
            allItems.forEach(item => {
                if (!item.classList.contains('category-header') && !item.classList.contains('toc-category-header')) {
                    // Handle verb items
                    const georgianText = item.querySelector('.verb-georgian')?.textContent || '';
                    const descriptionText = item.querySelector('.verb-description')?.textContent || '';
                    const classText = item.querySelector('.verb-class')?.textContent || '';

                    const searchableText = `${georgianText} ${descriptionText} ${classText}`.toLowerCase();

                    // Check if item matches search term
                    const matchesSearch = searchTerm === '' || searchableText.includes(searchLower);

                    if (matchesSearch) {
                        item.classList.remove('hidden');
                        visibleCount++;
                        this.filteredItems.push(item);

                        // Get category from data attribute for tracking
                        const itemCategory = item.getAttribute('data-category') || '';
                        if (itemCategory) {
                            categoriesWithVisibleVerbs.add(itemCategory);
                        }

                        // Highlight matching text if search term is not empty
                        if (searchTerm !== '') {
                            item.classList.add('highlighted');
                        } else {
                            item.classList.remove('highlighted');
                        }
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('highlighted');
                    }
                }
            });

            // Second pass: process category headers
            allItems.forEach(item => {
                if (item.classList.contains('category-header') || item.classList.contains('toc-category-header')) {
                    const categoryName = item.textContent.trim();

                    // Hide category header if no verbs are visible in this category
                    const hasVisibleVerbs = categoriesWithVisibleVerbs.has(categoryName);

                    // Hide all category headers if there are no visible verbs at all
                    if (visibleCount === 0) {
                        item.classList.add('hidden');
                    } else if (hasVisibleVerbs) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });

            // If search is empty, show all items for navigation
            if (searchTerm === '') {
                this.filteredItems = [...this.allTocItems];
            }

            // Set initial search index if there are results
            if (visibleCount > 0) {
                this.currentSearchIndex = 0;
            } else {
                this.currentSearchIndex = -1;
            }
            this.updateSearchSelection();

            // Show/hide no results message
            const noResultsMsg = document.getElementById('no-results-message');
            if (visibleCount === 0 && searchTerm !== '') {
                if (!noResultsMsg) {
                    const msg = document.createElement('div');
                    msg.id = 'no-results-message';
                    msg.className = 'no-results';
                    msg.textContent = 'No verbs found matching your criteria.';
                    tocContainer.appendChild(msg);
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        });
    }

    /**
     * Update search selection highlighting
     */
    updateSearchSelection() {
        document.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('search-selected');
        });

        if (this.currentSearchIndex >= 0 && this.currentSearchIndex < this.filteredItems.length) {
            const selectedItem = this.filteredItems[this.currentSearchIndex];
            if (selectedItem) {
                selectedItem.classList.add('search-selected');
                selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    }

    /**
     * Highlight current section in TOC - optimized for performance
     */
    updateActiveTocItem() {
        // Use requestAnimationFrame to defer expensive operations
        if (this.scrollUpdatePending) return;

        this.scrollUpdatePending = true;
        requestAnimationFrame(() => {
            this.performActiveTocUpdate();
            this.scrollUpdatePending = false;
        });
    }

    /**
     * Perform the actual TOC update (deferred to requestAnimationFrame)
     */
    performActiveTocUpdate() {
        const verbSections = document.querySelectorAll('.verb-section');
        const tocItems = document.querySelectorAll('.toc-item');

        if (verbSections.length === 0 || tocItems.length === 0) return;

        const offset = 100;
        let activeIndex = -1;
        let minDistance = Infinity;

        // Use intersection detection with optimized DOM queries
        for (let i = 0; i < verbSections.length; i++) {
            const section = verbSections[i];
            const rect = section.getBoundingClientRect();

            // Check if section is in viewport with offset
            if (rect.top <= offset && rect.bottom >= offset) {
                // Find the section closest to the offset point
                const distance = Math.abs(rect.top - offset);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = i;
                }
            }
        }

        // Batch DOM updates to minimize reflows
        if (activeIndex !== -1) {
            const fragment = document.createDocumentFragment();
            let hasChanges = false;

            tocItems.forEach((item, index) => {
                const shouldBeActive = index === activeIndex;
                const isCurrentlyActive = item.classList.contains('active');

                if (shouldBeActive !== isCurrentlyActive) {
                    hasChanges = true;
                    if (shouldBeActive) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                }
            });

            // Only update if there were actual changes
            if (hasChanges) {
                // Force a single reflow by reading a property
                tocItems[0]?.offsetHeight;
            }
        }
    }

    /**
     * Find category container by category name
     */
    findCategoryContainer(category) {
        return document.querySelector(`.category-container[data-category="${category}"]`);
    }

    /**
     * Expand category if it's collapsed
     */
    expandCategoryIfCollapsed(categoryContainer) {
        const content = categoryContainer.querySelector('.category-content');
        const header = categoryContainer.querySelector('.collapsible-header');

        if (content && content.classList.contains('collapsed')) {
            // Expand the category
            content.classList.remove('collapsed');
            header.classList.remove('collapsed');
        }
    }

    /**
     * Navigate to verb section with proper positioning
     */
    navigateToVerbSection(verbSection, primaryVerb, fullGeorgian) {
        if (!verbSection) {
            console.error(`Verb "${fullGeorgian}" not found`);
            return false;
        }

        // Check if this is a multi-preverb verb and load data immediately if needed
        if (verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            const verbId = verbSection.dataset.verbId;
            if (verbId && window.verbDataManager) {
                window.verbDataManager.loadVerbDataImmediately(verbId);
            }
        }

        // Calculate proper offset accounting for sticky header
        const stickyHeaderHeight = 80; // Adjust based on actual header height
        const rect = verbSection.getBoundingClientRect();
        const targetPosition = window.scrollY + rect.top - stickyHeaderHeight;

        // Update URL with primary verb
        if (window.updateURLWithAnchor) {
            window.updateURLWithAnchor(primaryVerb);
        }

        // Navigate instantly
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });

        return true;
    }

    /**
     * Check if manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Check if sidebar is open
     * @returns {boolean} Whether sidebar is open
     */
    isSidebarOpen() {
        return this.elements.sidebarModal ? this.elements.sidebarModal.classList.contains('active') : false;
    }

    /**
     * Handle URL anchor navigation
     */
    handleURLAnchor() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const primaryVerb = decodeURIComponent(hash.substring(1));
            this.scrollToVerb(primaryVerb);
        }
    }

    /**
     * Scroll to specific verb section
     * @param {string} primaryVerb - Primary verb identifier
     */
    scrollToVerb(primaryVerb) {
        const verbSection = document.getElementById(primaryVerb);
        if (verbSection) {
            const stickyHeaderHeight = 80;
            const rect = verbSection.getBoundingClientRect();
            const targetPosition = window.scrollY + rect.top - stickyHeaderHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }
    }

    /**
     * Close sidebar
     */
    closeSidebar() {
        if (this.elements.sidebarModal) {
            this.elements.sidebarModal.classList.remove('active');
        }
    }



    /**
     * Open sidebar
     */
    openSidebar() {
        if (this.elements.sidebarModal) {
            this.populateTableOfContents();
            this.elements.sidebarModal.classList.add('active');
        }
    }

    /**
     * Toggle sidebar
     */
    toggleSidebar() {
        if (this.elements.sidebarModal && this.elements.sidebarModal.classList.contains('active')) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    /**
     * Get current sidebar state
     */
    getSidebarState() {
        return {
            isOpen: this.elements.sidebarModal ? this.elements.sidebarModal.classList.contains('active') : false,
            searchIndex: this.currentSearchIndex,
            filteredCount: this.filteredItems.length
        };
    }

    /**
     * Check if sidebar is open
     * @returns {boolean} Whether sidebar is open
     */
    isSidebarOpen() {
        return this.elements.sidebarModal ? this.elements.sidebarModal.classList.contains('active') : false;
    }



    /**
     * Clean up event listeners
     */
    destroy() {
        if (this.throttledUpdateActiveTocItem) {
            window.removeEventListener('scroll', this.throttledUpdateActiveTocItem);
        }

        this.eventListeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.eventListeners = [];
        this.initialized = false;
    }
}
