/**
 * Virtual Scroll Manager - Implements virtual scrolling for verb sections
 * 
 * This module provides virtual scrolling functionality to dramatically reduce
 * DOM size by only rendering visible verb sections and a small buffer.
 */

/**
 * Virtual Scroll Manager Class
 * Manages virtual scrolling for verb sections to improve performance
 */
export class VirtualScrollManager {
    constructor() {
        this.container = null;
        this.verbSections = [];
        this.visibleRange = { start: 0, end: 0 };
        this.itemHeight = 400; // Estimated height of each verb section
        this.bufferSize = 3; // Number of items to render outside viewport
        this.renderedItems = new Map();
        this.intersectionObserver = null;
        this.scrollContainer = null;
        this.initialized = false;

        // Performance tracking
        this.renderCount = 0;
        this.lastRenderTime = 0;
    }

    /**
     * Initialize the virtual scroll manager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            console.log('🚀 Initializing VirtualScrollManager...');

            this.setupVirtualScrolling();
            this.initialized = true;
            console.log('✅ VirtualScrollManager initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize VirtualScrollManager:', error);
            return false;
        }
    }

    /**
     * Check if the manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Set up virtual scrolling infrastructure
     */
    setupVirtualScrolling() {
        // Find the main content container
        this.scrollContainer = document.querySelector('.main-content') || document.body;
        this.container = document.querySelector('.verb-sections-container');

        if (!this.container) {
            // Create container if it doesn't exist
            this.container = document.createElement('div');
            this.container.className = 'verb-sections-container';
            this.container.style.position = 'relative';

            // Find where to insert it (after category headers)
            const categoryHeaders = document.querySelectorAll('.category-container');
            if (categoryHeaders.length > 0) {
                const lastCategory = categoryHeaders[categoryHeaders.length - 1];
                lastCategory.parentNode.insertBefore(this.container, lastCategory.nextSibling);
            } else {
                document.body.appendChild(this.container);
            }
        }

        // Collect all verb sections
        this.collectVerbSections();

        // Set up virtual scrolling
        this.setupVirtualScrollContainer();

        // Set up intersection observer for lazy loading
        this.setupIntersectionObserver();

        // Initial render
        this.updateVisibleRange();
    }

    /**
     * Collect all verb sections from the DOM
     */
    collectVerbSections() {
        const sections = document.querySelectorAll('.verb-section');
        this.verbSections = Array.from(sections).map((section, index) => ({
            id: section.id || `verb-${index}`,
            element: section,
            data: this.extractVerbData(section),
            height: this.itemHeight,
            rendered: false
        }));

        console.log(`📊 Collected ${this.verbSections.length} verb sections for virtual scrolling`);
    }

    /**
     * Extract verb data from a section element
     * @param {HTMLElement} section - Verb section element
     * @returns {Object} Extracted verb data
     */
    extractVerbData(section) {
        return {
            id: section.id,
            semanticKey: section.getAttribute('data-semantic-key'),
            category: section.getAttribute('data-category'),
            hasMultiplePreverbs: section.getAttribute('data-has-multiple-preverbs') === 'true',
            verbId: section.dataset.verbId,
            fullGeorgian: section.getAttribute('data-full-georgian'),
            html: section.outerHTML
        };
    }

    /**
     * Set up virtual scroll container
     */
    setupVirtualScrollContainer() {
        // Create virtual scroll container
        const virtualContainer = document.createElement('div');
        virtualContainer.className = 'virtual-scroll-container';
        virtualContainer.style.height = `${this.verbSections.length * this.itemHeight}px`;
        virtualContainer.style.position = 'relative';

        // Create viewport container
        const viewport = document.createElement('div');
        viewport.className = 'virtual-scroll-viewport';
        viewport.style.position = 'absolute';
        viewport.style.top = '0';
        viewport.style.left = '0';
        viewport.style.right = '0';
        viewport.style.height = '100%';

        virtualContainer.appendChild(viewport);
        this.container.appendChild(virtualContainer);

        // Store references
        this.virtualContainer = virtualContainer;
        this.viewport = viewport;

        // Set up scroll listener
        this.setupScrollListener();
    }

    /**
     * Set up scroll listener for virtual scrolling
     */
    setupScrollListener() {
        let scrollTimeout;

        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateVisibleRange();
            }, 16); // ~60fps
        };

        this.scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

        // Store for cleanup
        this.scrollHandler = handleScroll;
    }

    /**
     * Set up intersection observer for lazy loading
     * Note: Disabled - VerbDataManager handles all verb data loading
     */
    setupIntersectionObserver() {
        // Intersection observer disabled - VerbDataManager handles all loading
        // This prevents duplicate loading and event dispatching
        this.intersectionObserver = null;
    }

    /**
     * Update visible range based on scroll position
     */
    updateVisibleRange() {
        const scrollTop = this.scrollContainer.scrollTop;
        const containerHeight = this.scrollContainer.clientHeight;

        // Calculate visible range
        const start = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
        const end = Math.min(
            this.verbSections.length - 1,
            Math.ceil((scrollTop + containerHeight) / this.itemHeight) + this.bufferSize
        );

        // Update if range changed
        if (start !== this.visibleRange.start || end !== this.visibleRange.end) {
            this.visibleRange = { start, end };
            this.renderVisibleItems();
        }
    }

    /**
     * Render visible items
     */
    renderVisibleItems() {
        const startTime = performance.now();

        // Remove items outside visible range
        this.renderedItems.forEach((item, index) => {
            if (index < this.visibleRange.start || index > this.visibleRange.end) {
                this.removeItem(index);
            }
        });

        // Add items in visible range
        for (let i = this.visibleRange.start; i <= this.visibleRange.end; i++) {
            if (!this.renderedItems.has(i)) {
                this.renderItem(i);
            }
        }

        // Update viewport position
        this.updateViewportPosition();

        this.renderCount++;
        this.lastRenderTime = performance.now() - startTime;

        if (this.renderCount % 10 === 0) {
            console.log(`🔄 Virtual scroll render #${this.renderCount}, time: ${this.lastRenderTime.toFixed(2)}ms`);
        }
    }

    /**
     * Render a single item
     * @param {number} index - Item index
     */
    renderItem(index) {
        const verbData = this.verbSections[index];
        if (!verbData) return;

        // Create item container
        const itemContainer = document.createElement('div');
        itemContainer.className = 'virtual-scroll-item';
        itemContainer.style.position = 'absolute';
        itemContainer.style.top = `${index * this.itemHeight}px`;
        itemContainer.style.left = '0';
        itemContainer.style.right = '0';
        itemContainer.style.height = `${this.itemHeight}px`;
        itemContainer.dataset.index = index;
        itemContainer.dataset.verbId = verbData.data.verbId;

        // Create placeholder or load content
        if (verbData.data.hasMultiplePreverbs) {
            // Show loading placeholder for multi-preverb verbs
            itemContainer.innerHTML = this.createLoadingPlaceholder(verbData.data);
        } else {
            // Show static content for single-preverb verbs
            itemContainer.innerHTML = verbData.element.innerHTML;
        }

        this.viewport.appendChild(itemContainer);
        this.renderedItems.set(index, itemContainer);

        // Note: Intersection observation handled by VerbDataManager
        // No need to observe here to prevent duplicate loading
    }

    /**
     * Remove a rendered item
     * @param {number} index - Item index
     */
    removeItem(index) {
        const item = this.renderedItems.get(index);
        if (item) {
            // Stop observing
            this.intersectionObserver.unobserve(item);

            // Remove from DOM
            item.remove();
            this.renderedItems.delete(index);
        }
    }

    /**
     * Create loading placeholder for multi-preverb verbs
     * @param {Object} verbData - Verb data
     * @returns {string} HTML for loading placeholder
     */
    createLoadingPlaceholder(verbData) {
        return `
            <div class="verb-section-loading">
                <div class="loading-header">
                    <h2>${verbData.fullGeorgian || 'Loading...'}</h2>
                    <div class="loading-spinner"></div>
                </div>
                <div class="loading-content">
                    <div class="loading-table"></div>
                    <div class="loading-table"></div>
                </div>
            </div>
        `;
    }

    /**
     * Update viewport position
     */
    updateViewportPosition() {
        const offsetY = this.visibleRange.start * this.itemHeight;
        this.viewport.style.transform = `translateY(${offsetY}px)`;
    }


    /**
     * Update verb data when it's loaded
     * @param {string} verbId - Verb ID
     * @param {Object} verbData - Verb data
     */
    updateVerbData(verbId, verbData) {
        // Find the verb section and update its content
        const verbSection = this.verbSections.find(verb => verb.data.verbId === verbId);
        if (verbSection) {
            // Update the verb data
            verbSection.data = { ...verbSection.data, ...verbData };

            // Find the rendered item and update its content
            const renderedItem = Array.from(this.renderedItems.values()).find(item =>
                item.dataset.verbId === verbId
            );

            if (renderedItem) {
                // Update the content with the loaded data
                this.updateRenderedItemContent(renderedItem, verbData);
            }

            console.log(`✅ Updated virtual scroll data for verb: ${verbId}`);
        }
    }

    /**
     * Update the content of a rendered item
     * @param {HTMLElement} item - Rendered item element
     * @param {Object} verbData - Verb data
     */
    updateRenderedItemContent(item, verbData) {
        // Remove loading placeholder and add real content
        const loadingPlaceholder = item.querySelector('.verb-section-loading');
        if (loadingPlaceholder) {
            loadingPlaceholder.remove();
        }

        // Add the actual verb content
        // This would be populated with the real verb data HTML
        item.innerHTML = this.generateVerbContent(verbData);
    }

    /**
     * Generate verb content HTML
     * @param {Object} verbData - Verb data
     * @returns {string} HTML content
     */
    generateVerbContent(verbData) {
        // This is a simplified version - in reality, this would generate
        // the full verb conjugation tables and content
        return `
            <div class="verb-section">
                <h2>${verbData.fullGeorgian || 'Verb'}</h2>
                <div class="verb-content">
                    <p>Verb data loaded successfully!</p>
                    <p>Verb ID: ${verbData.verbId}</p>
                </div>
            </div>
        `;
    }

    /**
     * Get performance statistics
     * @returns {Object} Performance stats
     */
    getPerformanceStats() {
        return {
            totalItems: this.verbSections.length,
            renderedItems: this.renderedItems.size,
            visibleRange: this.visibleRange,
            renderCount: this.renderCount,
            lastRenderTime: this.lastRenderTime,
            memoryUsage: this.renderedItems.size * this.itemHeight
        };
    }

    /**
     * Scroll to a specific verb section
     * @param {string} verbId - Verb ID to scroll to
     */
    scrollToVerb(verbId) {
        const index = this.verbSections.findIndex(verb => verb.data.verbId === verbId);
        if (index !== -1) {
            const scrollTop = index * this.itemHeight;
            this.scrollContainer.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Destroy the virtual scroll manager
     */
    destroy() {
        if (this.scrollHandler) {
            this.scrollContainer.removeEventListener('scroll', this.scrollHandler);
        }

        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }

        this.renderedItems.clear();
        this.verbSections = [];
        this.initialized = false;
    }
}
