/**
 * Category Manager Module
 * Handles collapsible category headers and category state management
 */

/**
 * Category Manager Class
 * Manages category header collapse/expand functionality
 */
export class CategoryManager {
    constructor() {
        this.initialized = false;
        this.collapsibleHeaders = new Map();
        this.eventListeners = [];
    }

    /**
     * Initialize the Category Manager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            console.log('🚀 Initializing CategoryManager...');

            this.initializeCollapsibleHeaders();

            this.initialized = true;
            console.log('✅ CategoryManager initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize CategoryManager:', error);
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
     * Initialize collapsible headers for all categories
     */
    initializeCollapsibleHeaders() {
        const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

        collapsibleHeaders.forEach(header => {
            const category = header.getAttribute('data-category');
            const content = document.querySelector(`.category-content[data-category="${category}"]`);

            if (content) {
                this.collapsibleHeaders.set(category, { header, content });
                this.setupHeaderClickHandler(header, content, category);
            }
        });

        console.log(`📁 Initialized ${this.collapsibleHeaders.size} collapsible category headers`);
    }

    /**
     * Set up click handler for a category header
     * @param {HTMLElement} header - Header element
     * @param {HTMLElement} content - Content element
     * @param {string} category - Category name
     */
    setupHeaderClickHandler(header, content, category) {
        const clickHandler = () => {
            const isCollapsed = content.classList.contains('collapsed');

            if (isCollapsed) {
                this.expandCategory(header, content, category);
            } else {
                this.collapseCategoryWithSmartScroll(header, content, category);
            }
        };

        header.addEventListener('click', clickHandler);

        // Store for cleanup
        this.eventListeners.push({
            element: header,
            event: 'click',
            handler: clickHandler
        });
    }

    /**
     * Expand a collapsed category
     * @param {HTMLElement} header - Header element
     * @param {HTMLElement} content - Content element
     * @param {string} category - Category name
     */
    expandCategory(header, content, category) {
        content.classList.remove('collapsed');
        header.classList.remove('collapsed');

        // Dispatch custom event for other modules
        document.dispatchEvent(new CustomEvent('categoryExpanded', {
            detail: { category, header, content }
        }));
    }

    /**
     * Collapse a category with smart scrolling
     * @param {HTMLElement} header - Header element
     * @param {HTMLElement} content - Content element
     * @param {string} category - Category name
     */
    collapseCategoryWithSmartScroll(header, content, category) {
        content.classList.add('collapsed');
        header.classList.add('collapsed');

        // Scroll to show the collapsed header
        const headerTop = header.offsetTop;
        const stickyHeaderHeight = 80; // Adjust based on actual header height
        const targetPosition = headerTop - stickyHeaderHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Dispatch custom event for other modules
        document.dispatchEvent(new CustomEvent('categoryCollapsed', {
            detail: { category, header, content }
        }));
    }

    /**
     * Expand category if it's collapsed (for navigation)
     * @param {HTMLElement} categoryContainer - Category container element
     */
    expandCategoryIfCollapsed(categoryContainer) {
        const content = categoryContainer.querySelector('.category-content');
        const header = categoryContainer.querySelector('.collapsible-header');

        if (content && content.classList.contains('collapsed')) {
            content.classList.remove('collapsed');
            if (header) {
                header.classList.remove('collapsed');
            }
        }
    }

    /**
     * Collapse all categories
     */
    collapseAllCategories() {
        this.collapsibleHeaders.forEach(({ header, content }, category) => {
            if (!content.classList.contains('collapsed')) {
                content.classList.add('collapsed');
                header.classList.add('collapsed');
            }
        });
    }

    /**
     * Expand all categories
     */
    expandAllCategories() {
        this.collapsibleHeaders.forEach(({ header, content }, category) => {
            if (content.classList.contains('collapsed')) {
                content.classList.remove('collapsed');
                header.classList.remove('collapsed');
            }
        });
    }

    /**
     * Get category state
     * @param {string} category - Category name
     * @returns {Object|null} Category state or null if not found
     */
    getCategoryState(category) {
        const categoryData = this.collapsibleHeaders.get(category);
        if (!categoryData) return null;

        return {
            category,
            isCollapsed: categoryData.content.classList.contains('collapsed'),
            header: categoryData.header,
            content: categoryData.content
        };
    }

    /**
     * Get all category states
     * @returns {Array} Array of category states
     */
    getAllCategoryStates() {
        const states = [];
        this.collapsibleHeaders.forEach(({ header, content }, category) => {
            states.push({
                category,
                isCollapsed: content.classList.contains('collapsed'),
                header,
                content
            });
        });
        return states;
    }

    /**
     * Check if a category is collapsed
     * @param {string} category - Category name
     * @returns {boolean} Whether category is collapsed
     */
    isCategoryCollapsed(category) {
        const categoryData = this.collapsibleHeaders.get(category);
        return categoryData ? categoryData.content.classList.contains('collapsed') : false;
    }

    /**
     * Clean up resources when needed
     */
    cleanup() {
        // Remove event listeners
        this.eventListeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.eventListeners = [];
    }

    /**
     * Destroy the manager and clean up resources
     */
    destroy() {
        this.cleanup();
        this.collapsibleHeaders.clear();
        this.initialized = false;
    }
}
