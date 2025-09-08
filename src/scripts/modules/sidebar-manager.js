/**
 * Sidebar Manager Module
 * Handles sidebar functionality matching the original main.js implementation
 */
import { STORAGE_KEYS, ELEMENT_IDS } from '../shared/constants.js';
import { storageManager } from '../shared/storage-manager.js';
import { AnimationManager } from './animation-manager.js';
import { updateVerbURL } from '../shared/url-utils.js';


/**
 * Sidebar Manager Class
 * Manages sidebar functionality as implemented in original main.js
 */
export class SidebarManager {
    constructor(domManager, enhancedVerbLoader = null) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {Object} Enhanced Dynamic Verb Loader instance */
        this.enhancedVerbLoader = enhancedVerbLoader;

        /** @type {Array} Table of contents items */
        this.allTocItems = [];

        /** @type {Array} Filtered items for search */
        this.filteredItems = [];

        /** @type {number} Current search index */
        this.currentSearchIndex = -1;

        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;

        /** @type {boolean} Whether TOC has been populated */
        this.tocPopulated = false;

        /** @type {Array} Event listeners for cleanup */
        this.eventListeners = [];

        /** @type {Object} DOM elements */
        this.elements = {};

        /** @type {Function} Throttled scroll handler */
        this.throttledUpdateActiveTocItem = null;

        /** @type {boolean} Whether scroll update is pending */
        this.scrollUpdatePending = false;

        /** @type {Object} Cached DOM references */
        this.domCache = {
            verbSections: null,
            tocItems: null,
            tocContainer: null,
            lastCacheTime: 0,
            cacheTimeout: 1000 // Cache for 1 second
        };

        /** @type {boolean} Whether device is mobile */
        this.isMobile = window.innerWidth <= 768;

        /** @type {number} Cached scroll position for restoration */
        this.cachedScrollPosition = 0;

        /** @type {Object} Mobile-specific scroll optimization settings */
        this.mobileScrollSettings = {
            throttleDelay: this.isMobile ? 16 : 100, // 60fps on mobile, 10fps on desktop
            passiveEvents: true,
            momentumScrolling: true
        };
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
            const savedState = storageManager.get(STORAGE_KEYS.SIDEBAR_STATE);
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
            storageManager.set(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(state));
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
        const toggleSidebar = async () => {
            // Populate TOC first, then show sidebar to prevent flicker
            await this.populateTableOfContents();
            sidebarModal.classList.add('active');
        };

        // Close sidebar
        const closeSidebar = () => {
            sidebarModal.classList.remove('active');
        };

        // Handle search input
        const handleSearchInput = (e) => {
            this.filterTableOfContents(e.target.value);
            this.updateClearButtonVisibility();
        };

        // Handle clear button click
        const handleClearButton = () => {
            this.clearSearchInput();
        };

        // Add event listeners
        sidebarToggle.addEventListener('click', toggleSidebar);
        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
        searchInput.addEventListener('input', handleSearchInput);

        // Add clear button event listener
        const searchClearButton = this.domManager.getElement('search-clear');
        if (searchClearButton) {
            searchClearButton.addEventListener('click', handleClearButton);
        }

        // Set up keyboard navigation
        this.setupKeyboardNavigation();

        // Handle window resize for mobile detection updates
        const handleResize = () => {
            // Update mobile detection
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;

            // Update mobile scroll settings if device type changed
            if (wasMobile !== this.isMobile) {
                this.mobileScrollSettings.throttleDelay = this.isMobile ? 16 : 100;
            }

            // Close sidebar on desktop if it was opened on mobile
            if (!this.isMobile && this.isOpen) {
                this.closeSidebar();
            }
        };

        // Add resize listener
        window.addEventListener('resize', handleResize);

        // Store listeners for cleanup
        this.eventListeners = [
            { element: sidebarToggle, event: 'click', handler: toggleSidebar },
            { element: sidebarClose, event: 'click', handler: closeSidebar },
            { element: sidebarOverlay, event: 'click', handler: closeSidebar },
            { element: searchInput, event: 'input', handler: handleSearchInput },
            { element: window, event: 'resize', handler: handleResize }
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
     * Get cached DOM elements or query and cache them
     * @param {string} selector - CSS selector
     * @param {string} cacheKey - Cache key
     * @param {boolean} all - Whether to use querySelectorAll
     * @returns {Element|NodeList} DOM element(s)
     */
    getCachedElement(selector, cacheKey, all = false) {
        const now = Date.now();

        // Check if cache is still valid
        if (this.domCache[cacheKey] && (now - this.domCache.lastCacheTime) < this.domCache.cacheTimeout) {
            return this.domCache[cacheKey];
        }

        // Query and cache
        const element = all ? document.querySelectorAll(selector) : document.querySelector(selector);
        this.domCache[cacheKey] = element;
        this.domCache.lastCacheTime = now;

        return element;
    }

    /**
     * Clear DOM cache
     */
    clearDomCache() {
        this.domCache.verbSections = null;
        this.domCache.tocItems = null;
        this.domCache.tocContainer = null;
        this.domCache.lastCacheTime = 0;
    }

    /**
     * Set up scroll handler for active TOC item updates
     */
    setupScrollHandler() {
        // Use IntersectionObserver for better performance instead of scroll events
        this.setupIntersectionObserver();

        // Add mobile-specific scroll optimizations
        if (this.isMobile) {
            this.setupMobileScrollOptimizations();
        }
    }

    /**
     * Set up IntersectionObserver for active TOC item updates
     */
    setupIntersectionObserver() {
        // Create IntersectionObserver with mobile-optimized settings
        const observerOptions = {
            root: null, // Use viewport as root
            rootMargin: this.isMobile ? '-50px 0px -60% 0px' : '-100px 0px -50% 0px',
            threshold: this.isMobile ? 0.2 : 0.1 // Higher threshold on mobile for better performance
        };

        this.intersectionObserver = new IntersectionObserver((entries) => {
            // Use requestAnimationFrame to batch updates
            requestAnimationFrame(() => {
                this.updateActiveTocItemFromIntersection(entries);
            });
        }, observerOptions);

        // Observe all verb sections
        this.observeVerbSections();
    }

    /**
     * Observe all verb sections for intersection
     */
    observeVerbSections() {
        const verbSections = this.getCachedElement('.verb-section', 'verbSections', true);
        verbSections.forEach(section => {
            this.intersectionObserver.observe(section);
        });
    }

    /**
     * Update active TOC item based on intersection entries
     * @param {Array} entries - IntersectionObserver entries
     */
    updateActiveTocItemFromIntersection(entries) {
        const tocItems = this.getCachedElement('.toc-item', 'tocItems', true);
        if (tocItems.length === 0) return;

        // Find the section that's most visible in the upper portion of viewport
        let mostVisibleSection = null;
        let maxVisibility = 0;

        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > maxVisibility) {
                maxVisibility = entry.intersectionRatio;
                mostVisibleSection = entry.target;
            }
        });

        if (mostVisibleSection) {
            // Find corresponding TOC item
            const sectionId = mostVisibleSection.id;
            const correspondingTocItem = Array.from(tocItems).find(item => {
                const verbSection = document.getElementById(sectionId);
                return verbSection && item.getAttribute('data-semantic-key') === verbSection.getAttribute('data-semantic-key');
            });

            if (correspondingTocItem) {
                // Update active state
                tocItems.forEach(item => item.classList.remove('active'));
                correspondingTocItem.classList.add('active');
            }
        }
    }

    /**
     * Throttle function (kept for backward compatibility)
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
     * Set up mobile-specific scroll optimizations
     */
    setupMobileScrollOptimizations() {
        // Cache scroll position when sidebar closes
        this.setupScrollPositionCaching();

        // Add momentum scrolling support
        this.setupMomentumScrolling();

        // Optimize touch interactions
        this.setupMobileTouchHandling();
    }

    /**
     * Set up scroll position caching for smooth restoration
     */
    setupScrollPositionCaching() {
        const sidebarBody = this.getCachedElement('.sidebar-body');
        if (!sidebarBody) return;

        // Cache scroll position when sidebar closes
        const originalCloseSidebar = this.closeSidebar.bind(this);
        this.closeSidebar = () => {
            this.cachedScrollPosition = sidebarBody.scrollTop;
            originalCloseSidebar();
        };

        // Restore scroll position when sidebar opens
        const originalOpenSidebar = this.openSidebar.bind(this);
        this.openSidebar = () => {
            originalOpenSidebar();
            // Restore scroll position after a brief delay to ensure DOM is ready
            setTimeout(() => {
                if (sidebarBody && this.cachedScrollPosition > 0) {
                    sidebarBody.scrollTop = this.cachedScrollPosition;
                }
            }, 50);
        };
    }

    /**
     * Set up momentum scrolling support
     */
    setupMomentumScrolling() {
        const sidebarBody = this.getCachedElement('.sidebar-body');
        if (!sidebarBody) return;

        // Add momentum scrolling CSS class
        sidebarBody.style.webkitOverflowScrolling = 'touch';
        sidebarBody.style.overscrollBehavior = 'contain';
    }

    /**
     * Set up mobile touch handling for better touch feedback
     */
    setupMobileTouchHandling() {
        const tocItems = this.getCachedElement('.toc-item', null, true);
        if (!tocItems || tocItems.length === 0) return;

        tocItems.forEach(item => {
            // Add touch event listeners for better mobile interaction
            const handleTouchStart = (e) => {
                item.style.transform = 'scale(0.98) translateZ(0)';
                item.style.transition = 'transform 0.1s ease';
            };

            const handleTouchEnd = (e) => {
                item.style.transform = 'scale(1) translateZ(0)';
                item.style.transition = 'transform 0.1s ease, background-color 0.15s ease, color 0.15s ease';
            };

            const handleTouchCancel = (e) => {
                item.style.transform = 'scale(1) translateZ(0)';
                item.style.transition = 'transform 0.1s ease, background-color 0.15s ease, color 0.15s ease';
            };

            item.addEventListener('touchstart', handleTouchStart, { passive: true });
            item.addEventListener('touchend', handleTouchEnd, { passive: true });
            item.addEventListener('touchcancel', handleTouchCancel, { passive: true });

            // Store listeners for cleanup
            this.eventListeners.push(
                { element: item, event: 'touchstart', handler: handleTouchStart },
                { element: item, event: 'touchend', handler: handleTouchEnd },
                { element: item, event: 'touchcancel', handler: handleTouchCancel }
            );
        });
    }

    /**
     * Populate table of contents using enhanced verb loader
     */
    async populateTableOfContents() {
        // Only populate once per session
        if (this.tocPopulated) {
            return;
        }

        const tocContainer = this.getCachedElement('.toc-content-container', 'tocContainer');
        if (!tocContainer) return;

        // Always use enhanced verb loader (no more DOM fallback)
        if (this.enhancedVerbLoader) {
            await this.populateTocFromVerbLoader(tocContainer);
            this.tocPopulated = true;
        } else {
            console.error('Enhanced verb loader not available');
            tocContainer.innerHTML = '<div class="error">Verb loader not available</div>';
        }
    }

    /**
     * Populate TOC from enhanced verb loader
     */
    async populateTocFromVerbLoader(tocContainer) {
        try {
            const verbIndex = this.enhancedVerbLoader.getVerbIndex();
            if (!verbIndex || !verbIndex.verbs) {
                console.error('No verb index available');
                return;
            }

            // Clear existing content
            tocContainer.innerHTML = '';
            this.allTocItems = [];

            // Generate TOC items from verb index
            const tocHTML = verbIndex.verbs.map(verb => {
                return `
                    <div class="toc-item" data-verb-id="${verb.id}" data-semantic-key="${verb.semantic_key}">
                        <div class="verb-georgian georgian-text">${verb.georgian}</div>
                        <div class="verb-description">${verb.description}</div>
                    </div>
                `;
            }).join('');

            tocContainer.innerHTML = tocHTML;

            // Add click handlers
            this.addTocClickHandlers();

        } catch (error) {
            console.error('Error populating TOC from verb loader:', error);
            tocContainer.innerHTML = '<div class="error">Error loading verb list</div>';
        }
    }

    /**
     * Add click handlers to TOC items
     */
    addTocClickHandlers() {
        const tocItems = document.querySelectorAll('.toc-item');
        tocItems.forEach(item => {
            item.addEventListener('click', () => {
                const verbId = item.getAttribute('data-verb-id');
                const georgianElement = item.querySelector('.verb-georgian');
                const georgianWord = georgianElement ? georgianElement.textContent.trim() : null;

                if (this.enhancedVerbLoader && verbId && georgianWord) {
                    // Remove active class from all items
                    document.querySelectorAll('.toc-item').forEach(tocItem => {
                        tocItem.classList.remove('active');
                    });

                    // Add active class to clicked item
                    item.classList.add('active');

                    // Update URL with Georgian word
                    if (window.updateVerbURLWithGeorgian) {
                        window.updateVerbURLWithGeorgian(georgianWord, verbId);
                    }

                    // Load verb using dynamic loader
                    this.enhancedVerbLoader.loadVerb(verbId, false); // Don't update URL (already done above)

                    // Close sidebar
                    this.closeSidebar();
                } else {
                    console.error('Missing required data for verb navigation', {
                        verbId,
                        georgianWord,
                        hasLoader: !!this.enhancedVerbLoader
                    });
                }
            });
        });

        // Reinitialize mobile touch handling for new TOC items
        if (this.isMobile) {
            this.setupMobileTouchHandling();
        }
    }


    /**
     * Filter table of contents - simplified without category filtering
     * @deprecated TODO: Remove this method - category and class filtering has been removed
     */
    filterTableOfContents(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        let visibleCount = 0;
        this.filteredItems = [];

        // Get all items including category headers
        const tocContainer = this.getCachedElement('.toc-content-container', 'tocContainer');
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
        const tocItems = this.getCachedElement('.toc-item', 'tocItems', true);
        tocItems.forEach(item => {
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
     * @deprecated TODO: Remove this method - category-based organization has been removed
     */
    findCategoryContainer(category) {
        return document.querySelector(`.category-container[data-category="${category}"]`);
    }

    /**
     * Expand category if it's collapsed
     * @deprecated TODO: Remove this method - category-based organization has been removed
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
        console.log('🔗 SidebarManager.navigateToVerbSection called:', {
            verbSection: verbSection?.id,
            primaryVerb,
            fullGeorgian
        });

        if (!verbSection) {
            console.error(`Verb "${fullGeorgian}" not found`);
            return false;
        }

        // Extract verb ID from section ID (e.g., "verb-1" -> "1")
        const verbId = verbSection.id.replace('verb-', '');
        console.log('🔗 SidebarManager: Extracted verb ID:', verbId);

        // Update URL with new format: ?verb=მიტანა&id=1
        console.log('🔗 SidebarManager: Checking for updateVerbURLWithGeorgian function');
        if (window.updateVerbURLWithGeorgian) {
            console.log('🔗 SidebarManager: Using updateVerbURLWithGeorgian');
            window.updateVerbURLWithGeorgian(fullGeorgian, verbId);
        } else {
            // Fallback to legacy method
            console.log('🔗 SidebarManager: updateVerbURLWithGeorgian not available, checking for updateURLWithAnchor');
            if (window.updateURLWithAnchor) {
                console.log('🔗 SidebarManager: Using updateURLWithAnchor fallback');
                window.updateURLWithAnchor(verbId);
            } else {
                console.warn('🔗 SidebarManager: No URL update functions available');
            }
        }

        // Use the same smooth fade-in approach as URL anchor loading
        this.smoothFadeInVerbSection(verbSection);

        // Only load verb data for multi-preverb verbs that need it
        if (verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            const verbId = verbSection.dataset.verbId;
            if (verbId && this.enhancedVerbLoader) {
                // Load data but don't let it override the smooth fade-in
                this.enhancedVerbLoader.loadVerbDataImmediately(verbId);
            }
        }

        return true;
    }

    /**
     * Smooth fade-in for verb section (same as URL anchor loading)
     * @param {Element} verbSection - Verb section element to fade in
     */
    async smoothFadeInVerbSection(verbSection) {
        // Use AnimationManager for consistent fade-in behavior
        await AnimationManager.fadeInVerbSection(verbSection, {
            context: 'Sidebar'
        });
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
            console.log(`[SIDEBAR] Handling URL anchor: ${primaryVerb}`);

            // Check if verb exists in static content
            const verbSection = document.getElementById(primaryVerb);
            if (verbSection) {
                console.log(`[SIDEBAR] Verb ${primaryVerb} found in static content, scrolling to it`);
                this.scrollToVerb(primaryVerb);
            } else {
                console.log(`[SIDEBAR] Verb ${primaryVerb} not found in static content`);
                // Verb not in static content - this will be handled by the main app's URL processing
            }
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
    async openSidebar() {
        if (this.elements.sidebarModal) {
            await this.populateTableOfContents();
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
     * Update clear button visibility based on search input value
     */
    updateClearButtonVisibility() {
        const searchInput = this.domManager.getElement('search-input');
        const clearButton = this.domManager.getElement('search-clear');

        if (searchInput && clearButton) {
            if (searchInput.value.trim().length > 0) {
                clearButton.classList.remove('hidden');
            } else {
                clearButton.classList.add('hidden');
            }
        }
    }

    /**
     * Clear search input and hide clear button
     */
    clearSearchInput() {
        const searchInput = this.domManager.getElement('search-input');
        const clearButton = this.domManager.getElement('search-clear');

        if (searchInput) {
            searchInput.value = '';
            searchInput.focus();
            this.filterTableOfContents('');
            this.updateSearchSelection();
        }

        if (clearButton) {
            clearButton.classList.add('hidden');
        }
    }

    /**
     * Clean up event listeners
     */
    destroy() {
        // Clean up IntersectionObserver
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }

        // Clean up throttled scroll handler (if still exists)
        if (this.throttledUpdateActiveTocItem) {
            window.removeEventListener('scroll', this.throttledUpdateActiveTocItem);
        }

        // Clear DOM cache
        this.clearDomCache();

        this.eventListeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.eventListeners = [];
        this.initialized = false;
    }
}
