/**
 * PreverbManager - Handles dynamic preverb switching for multi-preverb verbs
 * 
 * This module manages the interactive preverb selection system that allows users
 * to switch between different preverb forms of Georgian verbs (e.g., მი-, წა-, etc.)
 * and updates all related content (tables, examples) accordingly.
 * Now includes caching for improved performance with lazy loading.
 */

/**
 * Manages preverb switching and form calculation for multi-preverb verbs
 */
export class PreverbManager {
    constructor(verbDataManager) {
        this.verbDataManager = verbDataManager;
        this.preverbFormCache = new Map(); // Cache calculated preverb forms
        this.initialized = false;
    }

    /**
     * Initialize the PreverbManager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            // Wait for DOM to be ready before initializing preverb toggles
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve, { once: true });
                });
            }

            // Add a small delay to ensure all DOM elements are fully loaded
            await new Promise(resolve => setTimeout(resolve, 100));

            this.initializePreverbToggles();

            // Listen for verb data loaded events to enable preverb selectors
            document.addEventListener('verbDataLoaded', (event) => {
                const { verbId, verbData, defaultPreverb } = event.detail;
                this.enablePreverbSelector(verbId);
            });

            this.initialized = true;
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize PreverbManager:', error);
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
     * Generate cache key for preverb forms
     * @param {string} verbId - Verb identifier
     * @param {string} preverb - Preverb
     * @returns {string} Cache key
     */
    generateCacheKey(verbId, preverb) {
        return `${verbId}-${preverb}`;
    }

    /**
     * Get cached preverb forms or calculate them
     * @param {string} verbId - Verb identifier
     * @param {string} preverb - Preverb
     * @param {Object} conjugations - Conjugations data
     * @param {Object} preverbConfig - Preverb configuration
     * @returns {Object} Preverb forms
     */
    getCachedPreverbForms(verbId, preverb, conjugations, preverbConfig) {
        const cacheKey = this.generateCacheKey(verbId, preverb);

        if (this.preverbFormCache.has(cacheKey)) {
            return this.preverbFormCache.get(cacheKey);
        }

        const calculatedForms = this.verbDataManager.getConjugationsForPreverb(
            conjugations,
            preverbConfig,
            preverb,
            this.verbDataManager.verbCache.get(verbId)
        );

        // Cache the result
        this.preverbFormCache.set(cacheKey, calculatedForms);
        return calculatedForms;
    }

    /**
     * Clear cache for a specific verb (when data is reloaded)
     * @param {string} verbId - Verb identifier
     */
    clearVerbCache(verbId) {
        const keysToDelete = [];
        for (const key of this.preverbFormCache.keys()) {
            if (key.startsWith(`${verbId}-`)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => this.preverbFormCache.delete(key));
    }

    /**
     * Enable preverb selector for a specific verb once data is loaded
     * @param {string} verbId - Verb identifier
     */
    enablePreverbSelector(verbId) {
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (!verbSection) return;

        const preverbSelector = verbSection.querySelector('.preverb-toggle');
        if (!preverbSelector) return;

        // Re-enable the selector
        preverbSelector.disabled = false;
        preverbSelector.classList.remove('loading');

        // Restore original options
        if (preverbSelector.dataset.originalOptions) {
            preverbSelector.innerHTML = preverbSelector.dataset.originalOptions;

            // Set to default preverb if available
            const defaultPreverb = preverbSelector.querySelector('option[value="მი"]') ||
                preverbSelector.querySelector('option:first-child');
            if (defaultPreverb) {
                preverbSelector.value = defaultPreverb.value;
            }
        } else {
            console.warn(`[PREVERB_LOADING] No original options found for verb ${verbId} - selector may not have been properly initialized`);
            // Try to restore with default options as fallback
            const defaultOptions = '<option value="მი">მი</option><option value="წა">წა</option><option value="შე">შე</option>';
            preverbSelector.innerHTML = defaultOptions;
            preverbSelector.value = 'მი';
        }

        // Remove loading attributes
        delete preverbSelector.dataset.originalOptions;
        delete preverbSelector.dataset.originalValue;
    }

    /**
     * Initialize preverb toggles
     */
    initializePreverbToggles() {
        // Only initialize preverb toggles for multi-preverb verbs
        const preverbSelectors = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"] .preverb-toggle');

        if (preverbSelectors.length === 0) {
            console.warn('[PREVERB_LOADING] No preverb selectors found - DOM may not be ready yet');
            return;
        }

        preverbSelectors.forEach(selector => {
            // Store original options BEFORE we replace them
            const originalOptions = selector.innerHTML;
            const originalValue = selector.value;

            // Store original options for later restoration
            selector.dataset.originalOptions = originalOptions;
            selector.dataset.originalValue = originalValue;

            // Initially disable the preverb selector until data is loaded
            selector.disabled = true;
            selector.classList.add('loading');

            // Add loading text to show it's not ready yet
            selector.innerHTML = '<option value="">Loading...</option>';

            // Add change event listener (will be enabled when data loads)
            selector.addEventListener('change', (e) => {
                if (!selector.disabled) {
                    this.handlePreverbChange(e.target);
                }
            });

            // Add click event listener to show loading message if clicked while disabled
            selector.addEventListener('click', (e) => {
                if (selector.disabled) {
                    e.preventDefault();
                    // Could show a tooltip or notification here if desired
                }
            });
        });
    }

    /**
     * Handle preverb change
     * @param {Element} selector - Preverb selector element
     */
    handlePreverbChange(selector) {
        const verbId = selector.dataset.verbId;
        const selectedPreverb = selector.value;
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);


        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            // Update verb display asynchronously
            this.updateVerbDisplay(verbSection, selectedPreverb).catch(error => {
                console.error(`[PREVERB_SWITCH] Error in updateVerbDisplay:`, error);
                this.verbDataManager.showErrorState(verbSection);
            });
        } else {
            console.warn(`[PREVERB_SWITCH] Cannot update: verbSection=${!!verbSection}, hasMultiplePreverbs=${verbSection?.getAttribute('data-has-multiple-preverbs')}`);
        }
    }

    /**
     * Update verb display with new preverb
     * @param {Element} verbSection - Verb section DOM element
     * @param {string} preverb - Selected preverb
     * @returns {Promise<void>}
     */
    async updateVerbDisplay(verbSection, preverb) {
        const verbId = verbSection.dataset.verbId;

        try {
            // Get verb data from cache or external files
            let verbData = this.verbDataManager.verbCache.get(verbId);

            if (!verbData) {
                // If not in cache, load it (this should rarely happen with lazy loading)
                verbData = await this.verbDataManager.getVerbData(verbId);
            }

            if (!verbData) {
                console.warn(`[PREVERB_SWITCH] No verb data available for verb ${verbId}`);
                return;
            }

            // Get pre-calculated conjugations (no complex calculation needed)
            const conjugations = this.verbDataManager.getConjugationsForPreverb(
                verbData.conjugations,
                verbData.preverb_config,
                preverb,
                verbData
            );

            // Update overview table
            const overviewContainer = verbSection.querySelector('.table-container');
            if (overviewContainer) {
                overviewContainer.innerHTML = this.verbDataManager.generateOverviewTable(conjugations);
            }

            // Update each tense column
            const tenseColumns = verbSection.querySelectorAll('.tense-column');
            tenseColumns.forEach(column => {
                const tense = column.dataset.tense;
                this.verbDataManager.populateTenseColumn(column, tense, conjugations[tense], verbData, preverb);
            });

        } catch (error) {
            this.verbDataManager.showErrorState(verbSection);
        }
    }

    /**
     * Get preverb selector element for a specific verb
     * @param {string} verbId - Verb identifier
     * @returns {HTMLElement|null} Preverb selector element
     */
    getPreverbSelector(verbId) {
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (!verbSection) return null;

        return verbSection.querySelector('.preverb-toggle');
    }

    /**
     * Clean up resources when needed
     */
    cleanup() {
        this.preverbFormCache.clear();
    }

    /**
     * Destroy the manager and clean up resources
     */
    destroy() {
        this.cleanup();
        this.initialized = false;
    }
}
