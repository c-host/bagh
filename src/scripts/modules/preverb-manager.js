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
            console.log('🚀 Initializing PreverbManager...');

            this.initializePreverbToggles();

            // Listen for verb data loaded events to enable preverb selectors
            document.addEventListener('verbDataLoaded', (event) => {
                const { verbId, verbData, defaultPreverb } = event.detail;
                console.log(`[PREVERB_LOADING] Received verbDataLoaded event for verb ${verbId}`);
                this.enablePreverbSelector(verbId);
            });

            this.initialized = true;
            console.log('✅ PreverbManager initialized successfully');
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
        console.log(`[PREVERB_SWITCH] getCachedPreverbForms: verbId=${verbId}, preverb=${preverb}, cacheKey=${cacheKey}`);

        if (this.preverbFormCache.has(cacheKey)) {
            console.log(`[PREVERB_SWITCH] Using cached preverb forms for ${cacheKey}`);
            return this.preverbFormCache.get(cacheKey);
        }

        console.log(`[PREVERB_SWITCH] Calculating new preverb forms for ${cacheKey}`);
        const calculatedForms = this.verbDataManager.getConjugationsForPreverb(
            conjugations,
            preverbConfig,
            preverb,
            this.verbDataManager.verbCache.get(verbId)
        );

        console.log(`[PREVERB_SWITCH] Calculated forms result:`, {
            hasForms: !!calculatedForms,
            tenseKeys: calculatedForms ? Object.keys(calculatedForms) : 'none'
        });

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

        console.log(`[PREVERB_LOADING] Enabling preverb selector for verb ${verbId}`);
        console.log(`[PREVERB_LOADING] Current selector state:`, {
            disabled: preverbSelector.disabled,
            hasLoadingClass: preverbSelector.classList.contains('loading'),
            hasOriginalOptions: !!preverbSelector.dataset.originalOptions,
            originalOptionsLength: preverbSelector.dataset.originalOptions ? preverbSelector.dataset.originalOptions.length : 0,
            currentInnerHTML: preverbSelector.innerHTML
        });

        // Re-enable the selector
        preverbSelector.disabled = false;
        preverbSelector.classList.remove('loading');

        // Restore original options
        if (preverbSelector.dataset.originalOptions) {
            console.log(`[PREVERB_LOADING] Restoring original options:`, preverbSelector.dataset.originalOptions);
            preverbSelector.innerHTML = preverbSelector.dataset.originalOptions;

            // Set to default preverb if available
            const defaultPreverb = preverbSelector.querySelector('option[value="მი"]') ||
                preverbSelector.querySelector('option:first-child');
            if (defaultPreverb) {
                preverbSelector.value = defaultPreverb.value;
                console.log(`[PREVERB_LOADING] Set default preverb to: ${defaultPreverb.value}`);
            } else {
                console.log(`[PREVERB_LOADING] No default preverb found, available options:`,
                    Array.from(preverbSelector.querySelectorAll('option')).map(opt => opt.value));
            }
        } else {
            console.warn(`[PREVERB_LOADING] No original options found for verb ${verbId}`);
        }

        // Remove loading attributes
        delete preverbSelector.dataset.originalOptions;
        delete preverbSelector.dataset.originalValue;

        console.log(`[PREVERB_LOADING] Preverb selector enabled for verb ${verbId}, ready for user interaction`);
        console.log(`[PREVERB_LOADING] Final selector state:`, {
            disabled: preverbSelector.disabled,
            hasLoadingClass: preverbSelector.classList.contains('loading'),
            innerHTML: preverbSelector.innerHTML,
            value: preverbSelector.value
        });
    }

    /**
     * Initialize preverb toggles
     */
    initializePreverbToggles() {
        // Only initialize preverb toggles for multi-preverb verbs
        document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"] .preverb-toggle').forEach(selector => {
            // Store original options BEFORE we replace them
            const originalOptions = selector.innerHTML;
            const originalValue = selector.value;

            console.log(`[PREVERB_LOADING] Storing original options for verb ${selector.dataset.verbId}:`, {
                originalOptionsLength: originalOptions.length,
                originalValue: originalValue,
                hasOptions: originalOptions.includes('<option')
            });

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
                    console.log(`[PREVERB_LOADING] Preverb selector clicked while loading for verb ${selector.dataset.verbId}`);
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

        console.log(`[PREVERB_SWITCH] Preverb changed: verbId=${verbId}, selectedPreverb=${selectedPreverb}`);
        console.log(`[PREVERB_SWITCH] Verb section found: ${!!verbSection}, hasMultiplePreverbs: ${verbSection?.getAttribute('data-has-multiple-preverbs')}`);

        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            console.log(`[PREVERB_SWITCH] Starting updateVerbDisplay for verb ${verbId} with preverb ${selectedPreverb}`);
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
        console.log(`[PREVERB_SWITCH] updateVerbDisplay: verbId=${verbId}, preverb=${preverb}`);

        try {
            // Get verb data from cache or external files
            let verbData = this.verbDataManager.verbCache.get(verbId);
            console.log(`[PREVERB_SWITCH] Cached verb data found: ${!!verbData}`);

            if (!verbData) {
                console.log(`[PREVERB_SWITCH] Loading verb data from external files...`);
                // If not in cache, load it (this should rarely happen with lazy loading)
                verbData = await this.verbDataManager.getVerbData(verbId);
                console.log(`[PREVERB_SWITCH] External verb data loaded: ${!!verbData}`);
            }

            if (!verbData) {
                console.warn(`[PREVERB_SWITCH] No verb data available for verb ${verbId}`);
                return;
            }

            console.log(`[PREVERB_SWITCH] Verb data structure:`, {
                hasConjugations: !!verbData.conjugations,
                hasExamples: !!verbData.examples,
                hasGlossAnalyses: !!verbData.gloss_analysis,
                hasPreverbConfig: !!verbData.preverb_config,
                hasPreverbForms: !!verbData.preverb_forms,
                examplesKeys: verbData.examples ? Object.keys(verbData.examples) : 'none',
                glossKeys: verbData.gloss_analysis ? Object.keys(verbData.gloss_analysis) : 'none',
                preverbFormsKeys: verbData.preverb_forms ? Object.keys(verbData.preverb_forms) : 'none'
            });

            // Get pre-calculated conjugations (no complex calculation needed)
            const conjugations = this.verbDataManager.getConjugationsForPreverb(
                verbData.conjugations,
                verbData.preverb_rules,
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
            console.log(`[PREVERB_SWITCH] Updating ${tenseColumns.length} tense columns`);
            tenseColumns.forEach(column => {
                const tense = column.dataset.tense;
                console.log(`[PREVERB_SWITCH] Updating tense column: ${tense}`);
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
