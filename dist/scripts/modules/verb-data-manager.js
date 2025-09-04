/**
 * VerbDataManager - Handles verb data loading, caching, and lazy loading
 * 
 * This module manages the loading and caching of verb data for multi-preverb verbs,
 * implementing lazy loading with intersection observer for performance optimization.
 */



/**
 * Manages verb data loading, caching, and lazy loading functionality
 */
export class VerbDataManager {
    constructor() {
        this.coreData = null;
        this.conjugations = null;
        this.examples = null;
        this.glossData = null;
        this.preverbConfigs = null;
        this.loadingPromises = {};
        this.initialized = false;

        // Lazy loading infrastructure
        this.loadedVerbs = new Set();
        this.loadingVerbs = new Set();
        this.verbCache = new Map();
        this.intersectionObserver = null;
        this.retryAttempts = new Map();
        this.maxRetries = 3;

        // Initialize intersection observer for lazy loading
        this.initializeIntersectionObserver();

        // Add loading state styles
        this.addLoadingStyles();
    }

    /**
     * Initialize the VerbDataManager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {

            // Start observing multi-preverb verb sections for lazy loading
            this.startObservingVerbSections();

            // For non-multi-preverb verbs, no initialization needed as they're static


            this.initialized = true;
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize VerbDataManager:', error);
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
     * Initialize intersection observer for lazy loading
     */
    initializeIntersectionObserver() {
        if (!window.IntersectionObserver) {
            // Fallback for older browsers - load all data immediately
            this.loadAllDataImmediately();
            return;
        }

        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const verbSection = entry.target;
                        const verbId = verbSection.dataset.verbId;

                        if (verbId && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
                            this.loadVerbDataLazily(verbId, verbSection);
                        }
                    }
                });
            },
            {
                rootMargin: '100px', // Start loading 100px before the element comes into view
                threshold: 0.1
            }
        );
    }

    /**
     * Load all data immediately (fallback for older browsers)
     * NOTE: This is now disabled to implement true lazy loading
     */
    async loadAllDataImmediately() {
        // Disabled: No longer preload all data to improve initial page load performance
        // Data will be loaded on-demand when sections come into view
        this.initializeVerbSections();
    }

    /**
     * Lazy load data for a specific verb
     * @param {string} verbId - Verb identifier
     * @param {Element} verbSection - Verb section DOM element
     */
    async loadVerbDataLazily(verbId, verbSection) {
        // Skip if already loaded or loading
        if (this.loadedVerbs.has(verbId) || this.loadingVerbs.has(verbId)) {
            return;
        }

        this.loadingVerbs.add(verbId);

        try {

            // Load core data if not already loaded (this is now truly on-demand)
            await this.preloadAllData();

            const verbData = await this.getVerbData(verbId);
            if (verbData) {
                await this.populateVerbSection(verbSection, verbData);
                verbSection.dataset.dataLoaded = 'true';
                this.loadedVerbs.add(verbId);
                this.verbCache.set(verbId, verbData);

                // Stop observing this section since data is now loaded
                if (this.intersectionObserver) {
                    this.intersectionObserver.unobserve(verbSection);
                    delete verbSection.dataset.beingObserved;
                }

                // Dispatch event for other modules
                document.dispatchEvent(new CustomEvent('verbDataLoaded', {
                    detail: { verbId, verbData }
                }));

                // Notify virtual scroll manager if it exists
                if (window.app && window.app.virtualScrollManager) {
                    window.app.virtualScrollManager.updateVerbData(verbId, verbData);
                }
            }
        } catch (error) {
            this.handleLoadError(verbId, verbSection, error);
        } finally {
            this.loadingVerbs.delete(verbId);
        }
    }

    /**
     * Handle loading errors with retry logic
     * @param {string} verbId - Verb identifier
     * @param {Element} verbSection - Verb section DOM element
     * @param {Error} error - Error that occurred
     */
    handleLoadError(verbId, verbSection, error) {
        const attempts = this.retryAttempts.get(verbId) || 0;

        if (attempts < this.maxRetries) {
            this.retryAttempts.set(verbId, attempts + 1);

            // Exponential backoff retry
            const delay = Math.pow(2, attempts) * 1000;
            setTimeout(() => {
                this.loadingVerbs.delete(verbId);
                this.loadVerbDataLazily(verbId, verbSection);
            }, delay);
        } else {
            // Max retries reached, show error state
            this.showErrorState(verbSection);
            this.retryAttempts.delete(verbId);
        }
    }

    /**
     * Start observing multi-preverb verb sections
     */
    startObservingVerbSections() {
        const multiPreverbSections = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"]');

        multiPreverbSections.forEach(section => {
            // Only observe if not already being observed
            if (!section.dataset.beingObserved) {
                this.intersectionObserver.observe(section);
                section.dataset.beingObserved = 'true';
            }
        });
    }


    /**
     * Clean up resources when needed
     */
    cleanup() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }

        // Clear caches
        this.verbCache.clear();
        this.loadedVerbs.clear();
        this.loadingVerbs.clear();
        this.retryAttempts.clear();
    }



    /**
     * Load verb data immediately (for direct navigation)
     * @param {string} verbId - Verb identifier
     */
    async loadVerbDataImmediately(verbId) {
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            await this.loadVerbDataLazily(verbId, verbSection);
        }
    }

    /**
     * Check if a verb section needs immediate loading (for anchor navigation)
     */
    checkForImmediateLoading() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const anchorId = decodeURIComponent(hash.substring(1));
            const targetSection = document.getElementById(anchorId);

            if (targetSection && targetSection.getAttribute('data-has-multiple-preverbs') === 'true') {
                const verbId = targetSection.dataset.verbId;
                if (verbId) {
                    // Load immediately if it's a multi-preverb verb
                    this.loadVerbDataImmediately(verbId);
                }
            }
        }
    }

    /**
     * Enhanced getVerbData with caching
     * @param {string} verbId - Verb identifier
     * @returns {Promise<Object|null>} Verb data or null if not found
     */
    async getVerbData(verbId) {
        // Check cache first
        if (this.verbCache.has(verbId)) {
            return this.verbCache.get(verbId);
        }

        // Check if this is a multi-preverb verb
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (!verbSection || verbSection.getAttribute('data-has-multiple-preverbs') !== 'true') {
            return null;
        }

        try {
            // Load the consolidated verb data file directly
            const response = await fetch(`data/verb_${verbId}.json`);

            if (!response.ok) {
                return null;
            }

            const verbData = await response.json();

            // Cache the result
            this.verbCache.set(verbId, verbData);
            return verbData;

        } catch (error) {
            console.error(`[DATA_LOAD] Error loading verb ${verbId} data:`, error);
            return null;
        }
    }

    /**
     * Load core data
     * @returns {Promise<Object>} Core data
     */
    async loadCoreData() {
        if (!this.coreData) {
            if (!this.loadingPromises.coreData) {
                this.loadingPromises.coreData = fetch('data/verbs-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load core data: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error(`[DATA_LOAD] Core data loading failed:`, error);
                        throw error;
                    });
            }
            this.coreData = await this.loadingPromises.coreData;
        }
        return this.coreData;
    }

    /**
     * Load conjugations data
     * @returns {Promise<Object>} Conjugations data
     */
    async loadConjugations() {
        if (!this.conjugations) {
            if (!this.loadingPromises.conjugations) {
                this.loadingPromises.conjugations = fetch('data/conjugations-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load conjugations: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        return data;
                    })
                    .catch(error => {
                        console.error(`[DATA_LOAD] Conjugations loading failed:`, error);
                        throw error;
                    });
            }
            this.conjugations = await this.loadingPromises.conjugations;
        }
        return this.conjugations;
    }

    /**
     * Load examples data
     * @returns {Promise<Object>} Examples data
     */
    async loadExamples() {
        if (!this.examples) {
            if (!this.loadingPromises.examples) {
                this.loadingPromises.examples = fetch('data/examples-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load examples: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.examples = await this.loadingPromises.examples;
        }
        return this.examples;
    }

    /**
     * Load gloss data
     * @returns {Promise<Object>} Gloss data
     */
    async loadGlossData() {
        if (!this.glossData) {
            if (!this.loadingPromises.glossData) {
                this.loadingPromises.glossData = fetch('data/gloss-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load gloss data: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.glossData = await this.loadingPromises.glossData;
        }
        return this.glossData;
    }

    /**
     * Load preverb configs
     * @returns {Promise<Object>} Preverb configs
     */
    async loadPreverbConfigs() {
        if (!this.preverbConfigs) {
            if (!this.loadingPromises.preverbConfigs) {
                this.loadingPromises.preverbConfigs = fetch('data/preverb-config.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load preverb configs: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.preverbConfigs = await this.loadingPromises.preverbConfigs;
        }
        return this.preverbConfigs;
    }

    /**
     * Load data on-demand when first needed (true lazy loading)
     * @returns {Promise<void>}
     */
    async preloadAllData() {
        if (this.isInitialized) {
            return;
        }

        // Only load data if there are multi-preverb verbs
        const multiPreverbSections = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"]');

        if (multiPreverbSections.length === 0) {
            this.isInitialized = true;
            return;
        }

        try {
            // Load data files for multi-preverb verbs only when first needed
            await Promise.all([
                this.loadCoreData(),
                this.loadConjugations(),
                this.loadExamples(),
                this.loadGlossData(),
                this.loadPreverbConfigs()
            ]);
            this.isInitialized = true;
        } catch (error) {
            console.error('❌ Failed to load verb data:', error);
            throw error;
        }
    }

    /**
     * Enhanced initializeVerbSections with true lazy loading
     * @returns {Promise<void>}
     */
    async initializeVerbSections() {
        // Start observing multi-preverb verb sections for lazy loading
        this.startObservingVerbSections();

        // For non-multi-preverb verbs, no initialization needed as they're static
        const multiPreverbSections = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"]');
    }

    /**
     * Add loading state styles to the document
     */
    addLoadingStyles() {
        if (document.getElementById('preverb-loading-styles')) return;

        const style = document.createElement('style');
        style.id = 'preverb-loading-styles';
        style.textContent = `
            .preverb-toggle.loading {
                opacity: 0.6;
                cursor: not-allowed;
                background-color: #f5f5f5;
            }
            .preverb-toggle.loading option {
                color: #999;
            }
        `;
        document.head.appendChild(style);
    }


    /**
     * Populate verb section with data
     * @param {Element} section - Verb section DOM element
     * @param {Object} verbData - Verb data
     * @returns {Promise<void>}
     */
    async populateVerbSection(section, verbData) {

        try {
            // Check if verbData is null (non-multi-preverb verb)
            if (!verbData) {
                return;
            }

            // Generate initial conjugation tables - updated for new structure
            const defaultPreverb = verbData.preverb_config?.default_preverb || 'მი';

            // Get conjugations for the default preverb using the new structure
            const conjugations = this.getConjugationsForPreverb(
                null, // No base conjugations in external data
                verbData.preverb_config,
                defaultPreverb,
                verbData
            );


            // Populate overview table
            const overviewContainer = section.querySelector('.table-container');
            if (overviewContainer) {
                overviewContainer.innerHTML = this.generateOverviewTable(conjugations);
            } else {
            }

            // Populate each tense column
            const tenseColumns = section.querySelectorAll('.tense-column');
            tenseColumns.forEach(column => {
                const tense = column.dataset.tense;
                this.populateTenseColumn(column, tense, conjugations[tense], verbData, defaultPreverb);
            });

            // Enable the preverb selector now that data is loaded
            const verbId = section.dataset.verbId;
            if (verbId) {
                // Dispatch event for preverb manager to listen to
                const event = new CustomEvent('verbDataLoaded', {
                    detail: {
                        verbId: verbId,
                        verbData: verbData,
                        defaultPreverb: defaultPreverb
                    }
                });
                document.dispatchEvent(event);
            }
        } catch (error) {
            console.error(`[POPULATE_SECTION] Error in populateVerbDisplay:`, error);
            this.showErrorState(section);
        }
    }

    /**
     * Get conjugations for a specific preverb
     * @param {Object} conjugations - Conjugations data
     * @param {Object} preverbConfig - Preverb configuration
     * @param {string} targetPreverb - Target preverb
     * @param {Object} verbData - Full verb data object (optional)
     * @returns {Object} Conjugations for the target preverb
     */
    getConjugationsForPreverb(conjugations, preverbConfig, targetPreverb, verbData = null) {

        if (!preverbConfig) {
            return conjugations;
        }

        // Check if this is a multi-preverb verb
        const isMultiPreverb = preverbConfig &&
            preverbConfig.has_multiple_preverbs === true;

        if (!isMultiPreverb) {
            return conjugations;
        }


        // Use pre-calculated forms from build pipeline
        if (verbData && verbData.preverb_content && verbData.preverb_content[targetPreverb]) {

            const preverbContent = verbData.preverb_content[targetPreverb];
            const preverbConjugations = preverbContent.conjugations || {};
            const result = {};

            // Restructure to match expected format
            for (const [tense, tenseForms] of Object.entries(preverbConjugations)) {
                result[tense] = {
                    forms: tenseForms,
                    gloss: preverbContent.gloss_analysis?.[tense] || {},
                    examples: preverbContent.examples?.[tense] || []
                };
            }

            return result;
        }

        // Fallback to original conjugations if no pre-calculated forms
        return conjugations;
    }

    /**
     * Generate overview table HTML
     * @param {Object} conjugations - Conjugations data
     * @returns {string} HTML for overview table
     */
    generateOverviewTable(conjugations) {

        const tenses = ["present", "imperfect", "future", "aorist", "optative", "imperative"];
        const tenseNames = {
            "present": "PRES", "imperfect": "IMPF", "future": "FUT",
            "aorist": "AOR", "optative": "OPT", "imperative": "IMPV"
        };

        let tableHtml = `
            <div class="table-container">
                <table class="meta-table">
                    <thead>
                        <tr>
                            <th>Screve</th><th>1sg</th><th>2sg</th><th>3sg</th>
                            <th>1pl</th><th>2pl</th><th>3pl</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        for (const tense of tenses) {
            const tenseData = conjugations[tense];
            const forms = tenseData?.forms || {};

            tableHtml += `
                <tr class="tense-${tense}">
                    <td>${tenseNames[tense]}</td>
                    <td class="georgian-text">${forms['1sg'] || '-'}</td>
                    <td class="georgian-text">${forms['2sg'] || '-'}</td>
                    <td class="georgian-text">${forms['3sg'] || '-'}</td>
                    <td class="georgian-text">${forms['1pl'] || '-'}</td>
                    <td class="georgian-text">${forms['2pl'] || '-'}</td>
                    <td class="georgian-text">${forms['3pl'] || '-'}</td>
                </tr>
            `;
        }

        tableHtml += `
                    </tbody>
                </table>
            </div>
        `;

        return tableHtml;
    }

    /**
     * Populate tense column with data
     * @param {Element} column - Tense column DOM element
     * @param {string} tense - Tense name
     * @param {Object} tenseData - Tense data
     * @param {Object} verbData - Verb data
     * @param {string} selectedPreverb - Selected preverb
     */
    populateTenseColumn(column, tense, tenseData, verbData, selectedPreverb) {

        const tenseNames = {
            "present": "Present Indicative",
            "imperfect": "Imperfect",
            "future": "Future",
            "aorist": "Aorist",
            "optative": "Optative",
            "imperative": "Affirmative Imperative"
        };

        // Get examples and gloss for this tense
        let examplesHtml = '';
        let glossHtml = '';

        // Check if this is a multi-preverb verb by looking at the preverb config
        const isMultiPreverb = verbData.preverb_config &&
            verbData.preverb_config.has_multiple_preverbs === true;


        if (isMultiPreverb) {
            // Multi-preverb verb: get examples for the specific preverb from external data
            const normalizedPreverb = selectedPreverb.replace('-', '');
            const preverbContent = verbData.preverb_content[normalizedPreverb] || {};
            const preverbExamples = preverbContent.examples || {};
            const preverbGloss = preverbContent.gloss_analysis || {};


            examplesHtml = this.generateExamplesHtmlForTense(preverbExamples[tense], normalizedPreverb);
            glossHtml = this.generateGlossHtmlForTense(preverbGloss[tense]);
        } else {
            // Single-preverb verb: examples are organized by tense
            const examples = verbData.examples || {};
            const glossAnalyses = verbData.gloss_analysis || {};


            examplesHtml = this.generateExamplesHtmlForTense(examples[tense]);
            glossHtml = this.generateGlossHtmlForTense(glossAnalyses[tense]);
        }

        if (glossHtml) {
        }

        // Generate conjugation table for this tense
        const conjugationTableHtml = this.generateTenseConjugationTable(tense, tenseData);

        // Update the column content by replacing specific sections instead of the entire content
        this.updateColumnContent(column, tense, tenseNames[tense], conjugationTableHtml, examplesHtml, glossHtml);
    }

    /**
     * Update column content with new data
     * @param {Element} column - Tense column DOM element
     * @param {string} tense - Tense name
     * @param {string} tenseDisplay - Display name for tense
     * @param {string} conjugationTableHtml - Conjugation table HTML
     * @param {string} examplesHtml - Examples HTML
     * @param {string} glossHtml - Gloss HTML
     */
    updateColumnContent(column, tense, tenseDisplay, conjugationTableHtml, examplesHtml, glossHtml) {

        // First, ensure we have the basic structure
        if (!column.querySelector('h3')) {
            column.innerHTML = `<h3>${tenseDisplay}</h3>`;
        }

        // Update conjugation table
        const existingTable = column.querySelector('.table-container');
        if (existingTable) {
            existingTable.outerHTML = conjugationTableHtml;
        } else {
            // Insert after the h3
            const h3 = column.querySelector('h3');
            h3.insertAdjacentHTML('afterend', conjugationTableHtml);
        }

        // Update examples section
        const existingExamples = column.querySelector('.examples');
        if (examplesHtml) {
            if (existingExamples) {
                existingExamples.outerHTML = examplesHtml;
            } else {
                // Insert after conjugation table
                const tableContainer = column.querySelector('.table-container');
                if (tableContainer) {
                    tableContainer.insertAdjacentHTML('afterend', examplesHtml);
                }
            }
        } else if (existingExamples) {
            // Remove examples if no new ones provided
            existingExamples.remove();
        }

        // Update gloss section
        // Find ALL existing gloss sections and remove them
        const existingGlossSections = column.querySelectorAll('.case-gloss');

        if (glossHtml) {
            // Remove all existing gloss sections first
            existingGlossSections.forEach(glossSection => {
                glossSection.remove();
            });

            // Insert the new gloss section
            const examples = column.querySelector('.examples');
            const tableContainer = column.querySelector('.table-container');
            const insertAfter = examples || tableContainer;
            if (insertAfter) {
                insertAfter.insertAdjacentHTML('afterend', glossHtml);
            }
        } else if (existingGlossSections.length > 0) {
            // Remove all gloss sections if no new one provided
            existingGlossSections.forEach(glossSection => {
                glossSection.remove();
            });
        }
    }

    /**
     * Generate tense conjugation table HTML
     * @param {string} tense - Tense name
     * @param {Object} tenseData - Tense data
     * @returns {string} HTML for tense conjugation table
     */
    generateTenseConjugationTable(tense, tenseData) {
        const forms = tenseData?.forms || {};

        // Check if any forms are available
        if (!forms || Object.keys(forms).length === 0) {
            return '<div class="table-container regular-table-container"><p>No conjugation data available</p></div>';
        }

        let tableHtml = `
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
        `;

        // Define person mappings
        const persons = [
            { name: "1st", sg: "1sg", pl: "1pl" },
            { name: "2nd", sg: "2sg", pl: "2pl" },
            { name: "3rd", sg: "3sg", pl: "3pl" }
        ];

        for (const person of persons) {
            const singularForm = forms[person.sg] || '-';
            const pluralForm = forms[person.pl] || '-';

            tableHtml += `
                <tr>
                    <td>${person.name}</td>
                    <td class="georgian-text">${singularForm}</td>
                    <td class="georgian-text">${pluralForm}</td>
                </tr>
            `;
        }

        tableHtml += `
                    </tbody>
                </table>
            </div>
        `;

        return tableHtml;
    }

    /**
     * Generate examples HTML for a tense
     * @param {Object} tenseExamples - Examples for the tense
     * @param {string} preverb - Preverb (optional)
     * @returns {string} Examples HTML
     */
    generateExamplesHtmlForTense(tenseExamples, preverb) {
        if (!tenseExamples || !Array.isArray(tenseExamples) || tenseExamples.length === 0) {
            return '';
        }

        let examplesHtml = '<div class="examples"><h4>Examples';
        if (preverb) {
            examplesHtml += ` (${preverb})`;
        }
        examplesHtml += ':</h4><ul>';

        for (const example of tenseExamples) {
            if (example.html) {
                // Use pre-generated HTML with color coding directly (no additional wrapping)
                examplesHtml += example.html;
            } else if (example.georgian && example.english) {
                // Fallback to plain text if no HTML available
                examplesHtml += `
                    <li class="example-item">
                        <div class="georgian georgian-text">${example.georgian}</div>
                        <div class="translation english-text">${example.english}</div>
                    </li>
                `;
            }
        }

        examplesHtml += '</ul></div>';
        return examplesHtml;
    }

    /**
     * Generate gloss HTML for a tense
     * @param {Object} tenseGloss - Gloss for the tense
     * @returns {string} Gloss HTML
     */
    generateGlossHtmlForTense(tenseGloss) {
        if (!tenseGloss) {
            return '';
        }

        // Use pre-generated HTML if available
        if (tenseGloss.html) {
            return tenseGloss.html;
        }

        // Fallback to building HTML from components (for backward compatibility)
        if (tenseGloss.structured_gloss) {
            const structuredGloss = tenseGloss.structured_gloss;
            let glossHtml = '<div class="case-gloss"><h4>Verb Gloss Analysis</h4>';

            // Raw gloss
            if (tenseGloss.raw_gloss) {
                // Escape HTML characters to prevent interpretation as HTML tags
                const escapedRawGloss = tenseGloss.raw_gloss
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;');
                glossHtml += `<div class="gloss-section"><strong>Raw:</strong> ${escapedRawGloss}</div>`;
            }

            // Expanded gloss
            if (structuredGloss.expanded_components && structuredGloss.expanded_components.length > 0) {
                glossHtml += '<div class="gloss-section"><strong>Expanded:</strong> ';
                glossHtml += structuredGloss.expanded_components.map(component =>
                    `<span class="${component.color_class || ''}" title="${component.description || ''}">${component.text}</span>`
                ).join(' ');
                glossHtml += '</div>';
            }

            glossHtml += '</div>';
            return glossHtml;
        }

        return '';
    }

    /**
     * Show error state for a section
     * @param {Element} section - Verb section DOM element
     */
    showErrorState(section) {
        // Show error state for overview container
        const overviewContainer = section.querySelector('.table-container');
        if (overviewContainer) {
            overviewContainer.innerHTML = '<div class="error-indicator">Error loading overview table. Please refresh the page.</div>';
        }

        // Show error state for all tense columns
        const tenseColumns = section.querySelectorAll('.tense-column');
        tenseColumns.forEach(column => {
            const tense = column.dataset.tense;
            column.innerHTML = `<div class="error-indicator">Error loading ${tense} tense. Please refresh the page.</div>`;
        });
    }

    /**
     * Destroy the manager and clean up resources
     */
    destroy() {
        this.cleanup();
        this.isInitialized = false;
    }
}
