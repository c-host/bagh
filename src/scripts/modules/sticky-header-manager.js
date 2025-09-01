/**
 * Sticky Header Manager Module
 * Handles sticky header positioning and scroll behavior for category headers
 */

/**
 * Sticky Header Manager Class
 * Manages sticky header positioning and scroll behavior
 */
export class StickyHeaderManager {
    constructor() {
        this.initialized = false;
        this.headers = [];
        this.currentStickyHeader = null;
        this.throttledUpdate = null;
        this.scrollOffset = 100; // Offset for floating controls
    }

    /**
     * Initialize the Sticky Header Manager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            console.log('🚀 Initializing StickyHeaderManager...');

            this.initializeStickyHeaders();
            this.setupScrollHandler();

            this.initialized = true;
            console.log('✅ StickyHeaderManager initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize StickyHeaderManager:', error);
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
     * Initialize sticky headers
     */
    initializeStickyHeaders() {
        this.headers = document.querySelectorAll('.main-category-header');
        console.log(`📌 Found ${this.headers.length} category headers for sticky behavior`);

        // Initial update
        this.updateStickyHeader();
    }

    /**
     * Set up scroll handler with throttling
     */
    setupScrollHandler() {
        this.throttledUpdate = this.throttle(this.updateStickyHeader.bind(this), 16); // ~60fps
        window.addEventListener('scroll', this.throttledUpdate);
    }

    /**
     * Update sticky header state based on scroll position
     */
    updateStickyHeader() {
        const scrollTop = window.scrollY;

        let newStickyHeader = null;

        this.headers.forEach(header => {
            const rect = header.getBoundingClientRect();
            const container = header.closest('.category-container');

            if (rect.top <= this.scrollOffset && rect.bottom > this.scrollOffset) {
                newStickyHeader = header;
            }
        });

        // Update sticky state
        this.headers.forEach(header => {
            header.classList.remove('sticky-active');
        });

        if (newStickyHeader && newStickyHeader !== this.currentStickyHeader) {
            newStickyHeader.classList.add('sticky-active');
            this.currentStickyHeader = newStickyHeader;

            // Dispatch custom event for other modules
            document.dispatchEvent(new CustomEvent('stickyHeaderChanged', {
                detail: {
                    header: newStickyHeader,
                    category: newStickyHeader.textContent.trim()
                }
            }));
        }
    }

    /**
     * Throttle function to limit scroll event frequency
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
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
     * Get current sticky header
     * @returns {HTMLElement|null} Current sticky header or null
     */
    getCurrentStickyHeader() {
        return this.currentStickyHeader;
    }

    /**
     * Get all headers being managed
     * @returns {Array} Array of header elements
     */
    getHeaders() {
        return [...this.headers];
    }

    /**
     * Check if a header is currently sticky
     * @param {HTMLElement} header - Header element to check
     * @returns {boolean} Whether header is sticky
     */
    isHeaderSticky(header) {
        return header.classList.contains('sticky-active');
    }

    /**
     * Set scroll offset
     * @param {number} offset - New scroll offset
     */
    setScrollOffset(offset) {
        this.scrollOffset = offset;
    }

    /**
     * Get current scroll offset
     * @returns {number} Current scroll offset
     */
    getScrollOffset() {
        return this.scrollOffset;
    }

    /**
     * Force update of sticky header state
     */
    forceUpdate() {
        this.updateStickyHeader();
    }

    /**
     * Clean up resources when needed
     */
    cleanup() {
        if (this.throttledUpdate) {
            window.removeEventListener('scroll', this.throttledUpdate);
            this.throttledUpdate = null;
        }
    }

    /**
     * Destroy the manager and clean up resources
     */
    destroy() {
        this.cleanup();

        // Remove sticky classes
        this.headers.forEach(header => {
            header.classList.remove('sticky-active');
        });

        this.headers = [];
        this.currentStickyHeader = null;
        this.initialized = false;
    }
}
