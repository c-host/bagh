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
    constructor(enhancedVerbLoader) {
        this.enhancedVerbLoader = enhancedVerbLoader;
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
            await new Promise(resolve => setTimeout(resolve, 100)); // Using standard DOM readiness delay

            this.initializePreverbToggles();

            // Listen for dynamically rendered verbs
            document.addEventListener('verbRendered', (event) => {
                this.reinitializePreverbSelectors();
            });

            this.initialized = true;
            return true;
        } catch (error) {
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

        const calculatedForms = this.enhancedVerbLoader.getConjugationsForPreverb(
            conjugations,
            preverbConfig,
            preverb,
            this.enhancedVerbLoader.verbCache.get(verbId)
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
     * Initialize preverb toggles
     */
    initializePreverbToggles() {
        // Only initialize preverb toggles for multi-preverb verbs
        const preverbSelectors = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"] .preverb-toggle');

        if (preverbSelectors.length === 0) {
            return;
        }

        preverbSelectors.forEach(selector => {
            // Preverb selectors are now enabled immediately
            // Add change event listener for on-demand loading
            selector.addEventListener('change', (e) => {
                this.handlePreverbChange(e.target);
            });

            // Mark as initialized to avoid duplicate listeners
            selector.setAttribute('data-preverb-initialized', 'true');
        });
    }

    /**
     * Re-initialize preverb selectors for newly rendered verbs
     * This is called when a verb is dynamically loaded
     */
    reinitializePreverbSelectors() {
        // Find all preverb selectors that don't have event listeners yet
        const selectors = document.querySelectorAll('.preverb-toggle');

        selectors.forEach(selector => {
            // Check if this selector already has event listeners
            // Can be done by checking if it has a data attribute or by using a different approach
            if (!selector.hasAttribute('data-preverb-initialized')) {
                // Add change event listener
                selector.addEventListener('change', (e) => {
                    this.handlePreverbChange(e.target);
                });

                // Mark as initialized to avoid duplicate listeners
                selector.setAttribute('data-preverb-initialized', 'true');

            }
        });
    }

    /**
     * Handle preverb change
     * @param {Element} selector - Preverb selector element
     */
    async handlePreverbChange(selector) {
        const verbId = selector.dataset.verbId;
        const selectedPreverb = selector.value;
        const verbSection = document.querySelector(`#verb-${verbId}`);

        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            try {

                // Load verb data on-demand if not already loaded
                let verbData = this.enhancedVerbLoader.verbCache.get(verbId);
                if (!verbData) {
                    verbData = await this.enhancedVerbLoader.loadVerbDataOnDemand(verbId, verbSection);
                }

                if (verbData) {
                    // Update verb display with the selected preverb
                    await this.updateVerbDisplay(verbSection, selectedPreverb);
                }
            } catch (error) {
                this.enhancedVerbLoader.showErrorState(verbSection);
            }
        }
    }

    /**
     * Update verb display with new preverb
     * @param {Element} verbSection - Verb section DOM element
     * @param {string} preverb - Selected preverb
     * @returns {Promise<void>}
     */
    async updateVerbDisplay(verbSection, preverb) {
        // Extract verbId from the section ID (e.g., "verb-1" -> "1")
        const verbId = verbSection.id.replace('verb-', '');

        try {

            // Get verb data from cache
            const verbData = this.enhancedVerbLoader.verbCache.get(verbId);

            if (!verbData) {
                return;
            }


            // Get pre-calculated conjugations for the selected preverb from new data structure
            const conjugations = verbData.generated_data?.preverb_forms?.[preverb] || {};

            // Update flat overview table
            const flatOverview = verbSection.querySelector('.flat-overview');
            if (flatOverview) {
                flatOverview.innerHTML = this.generateFlatOverviewTable(conjugations);
            }

            // Update flat tenses
            const flatTenses = verbSection.querySelector('.flat-tenses');
            if (flatTenses) {
                flatTenses.innerHTML = this.generateFlatTenses(conjugations, verbData, preverb);
            }

        } catch (error) {
            this.enhancedVerbLoader.showErrorState(verbSection);
        }
    }

    /**
     * Generate flat overview table HTML
     * @param {Object} conjugations - Conjugations data
     * @returns {string} HTML for flat overview table
     */
    generateFlatOverviewTable(conjugations) {
        const tenses = ["present", "imperfect", "future", "aorist", "optative", "imperative"];
        const tenseNames = {
            "present": "PRES", "imperfect": "IMPF", "future": "FUT",
            "aorist": "AOR", "optative": "OPT", "imperative": "IMPV"
        };

        let tableHtml = `
            <div class="flat-overview-header">Screve</div>
            <div class="flat-overview-header">1sg</div>
            <div class="flat-overview-header">2sg</div>
            <div class="flat-overview-header">3sg</div>
            <div class="flat-overview-header">1pl</div>
            <div class="flat-overview-header">2pl</div>
            <div class="flat-overview-header">3pl</div>
        `;

        for (const tense of tenses) {
            const tenseData = conjugations[tense];
            const forms = tenseData || {};


            tableHtml += `<div class="flat-overview-cell flat-overview-tense flat-overview-screev">${tenseNames[tense]}</div>`;
            tableHtml += `<div class="flat-overview-cell georgian-text">${forms['1sg'] || '-'}</div>`;
            tableHtml += `<div class="flat-overview-cell georgian-text">${forms['2sg'] || '-'}</div>`;
            tableHtml += `<div class="flat-overview-cell georgian-text">${forms['3sg'] || '-'}</div>`;
            tableHtml += `<div class="flat-overview-cell georgian-text">${forms['1pl'] || '-'}</div>`;
            tableHtml += `<div class="flat-overview-cell georgian-text">${forms['2pl'] || '-'}</div>`;
            tableHtml += `<div class="flat-overview-cell georgian-text">${forms['3pl'] || '-'}</div>`;
        }

        return tableHtml;
    }

    /**
     * Generate flat tenses HTML
     * @param {Object} conjugations - Conjugations data
     * @param {Object} verbData - Verb data
     * @param {string} preverb - Selected preverb
     * @returns {string} HTML for flat tenses
     */
    generateFlatTenses(conjugations, verbData, preverb) {
        const tenses = [
            { name: 'present', title: 'Present Indicative' },
            { name: 'imperfect', title: 'Imperfect' },
            { name: 'aorist', title: 'Aorist' },
            { name: 'optative', title: 'Optative' },
            { name: 'future', title: 'Future' },
            { name: 'imperative', title: 'Imperative' }
        ];

        return tenses.map(tense => this.generateFlatTense(tense, conjugations, verbData, preverb)).join('');
    }

    /**
     * Generate individual flat tense HTML
     * @param {Object} tense - Tense information
     * @param {Object} conjugations - Conjugations data
     * @param {Object} verbData - Verb data
     * @param {string} preverb - Selected preverb
     * @returns {string} HTML for flat tense
     */
    generateFlatTense(tense, conjugations, verbData, preverb) {
        const tenseData = conjugations[tense.name];
        if (!tenseData) return '';

        // Check if this is a single-preverb verb by examining the examples structure
        // Multi-preverb verbs have preverb keys like "მი", "მო", etc.
        // Single-preverb verbs only have "default" key
        const exampleKeys = Object.keys(verbData.generated_data?.examples || {});
        const isSinglePreverb = exampleKeys.length === 1 && exampleKeys[0] === 'default';

        // Get examples and gloss for this tense and preverb from new data structure
        const examples = isSinglePreverb
            ? verbData.generated_data?.examples?.default?.[tense.name] || []
            : verbData.generated_data?.examples?.[preverb]?.[tense.name] || [];
        const glossAnalysis = isSinglePreverb
            ? verbData.generated_data?.gloss_analysis?.[tense.name] || {}
            : verbData.generated_data?.gloss_analysis?.[preverb]?.[tense.name] || {};


        return `
            <div class="flat-tense">
                <div class="flat-tense-header">${tense.title}</div>
                ${this.generateFlatConjugation(tenseData)}
                ${this.generateFlatExamples(examples, preverb)}
                ${this.generateFlatGloss(glossAnalysis)}
            </div>
        `;
    }

    /**
     * Generate flat conjugation HTML
     * @param {Object} tenseData - Tense data
     * @returns {string} HTML for flat conjugation
     */
    generateFlatConjugation(tenseData) {
        const forms = tenseData || {};
        const persons = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];


        const generateConjugationItems = (persons) => {
            return persons.map(person => `
                <div class="flat-conjugation-item">
                    <span class="flat-conjugation-person">${person}</span>
                    <span class="flat-conjugation-form georgian-text">${forms[person] || '-'}</span>
                </div>
            `).join('');
        };

        return `
            <div class="flat-conjugation">
                ${generateConjugationItems(persons)}
            </div>
            <div class="flat-conjugation-2x3">
                ${generateConjugationItems(['1sg', '1pl', '2sg', '2pl', '3sg', '3pl'])}
            </div>
        `;
    }

    /**
     * Generate flat examples HTML
     * @param {Array} examples - Examples array
     * @param {string} preverb - Selected preverb
     * @returns {string} HTML for flat examples
     */
    generateFlatExamples(examples, preverb) {
        if (!examples || examples.length === 0) return '';

        return `
            <div class="flat-examples">
                <div class="flat-examples-header">Examples</div>
                ${examples.slice(0, 3).map(example => {
            // Use structured component data for color coding
            const georgianHtml = this.buildStyledText(example.georgian, example.georgian_components, 'georgian');
            const englishHtml = this.buildStyledText(example.english, example.english_components, 'english');

            return `
                        <div class="flat-example">
                            <div class="flat-example-georgian georgian-text">${georgianHtml}</div>
                            <div class="flat-example-english">${englishHtml}</div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }


    /**
     * Build styled text with proper color coding (from demo approach)
     */
    buildStyledText(text, components, language) {
        if (!components || Object.keys(components).length === 0) {
            return text;
        }

        let styledText = text;

        // Apply styling based on components
        Object.entries(components).forEach(([role, component]) => {
            const className = this.getComponentClassName(role, language);
            const componentText = component.text;

            if (styledText.includes(componentText)) {
                const caseClass = component.case ? ` case-${component.case}` : '';
                const dataAttributes = `data-role="${role}"${component.person ? ` data-person="${component.person}"` : ''}`;

                styledText = styledText.replace(
                    componentText,
                    `<span class="${className}${caseClass}" ${dataAttributes}>${componentText}</span>`
                );
            }
        });

        return styledText;
    }

    /**
     * Get CSS class name for component styling
     */
    getComponentClassName(role, language) {
        const classMap = {
            'verb': 'gloss-verb',
            'subject': 'gloss-subject',
            'direct_object': 'gloss-direct-object',
            'indirect_object': 'gloss-indirect-object'
        };

        return classMap[role] || 'gloss-default';
    }

    /**
     * Generate flat gloss HTML
     * @param {Object} glossAnalysis - Gloss analysis data
     * @returns {string} HTML for flat gloss
     */
    generateFlatGloss(glossAnalysis) {
        if (!glossAnalysis || !glossAnalysis.raw_gloss) return '';

        // The glossAnalysis data is already correctly accessed in generateFlatTense

        // Use structured gloss data if available (for both single and multi-preverb verbs)
        let styledRawGloss = glossAnalysis.raw_gloss;
        let structuredExpandedGloss = '';

        if (glossAnalysis.structured_gloss) {
            const structuredGloss = glossAnalysis.structured_gloss;
            const rawComponents = structuredGloss.raw_components || [];
            const expandedComponents = structuredGloss.expanded_components || [];

            // Generate color-coded raw gloss
            styledRawGloss = this.generateStyledRawGloss(rawComponents);

            // Generate structured expanded gloss
            structuredExpandedGloss = this.generateStructuredExpandedGloss(expandedComponents);
        } else {
            // Don't use buildStructuredGloss - just show raw gloss
            structuredExpandedGloss = '<div class="gloss-error">Structured gloss data not available</div>';
        }

        // Generate HTML from structured gloss data
        return `
            <div class="flat-gloss">
                <div class="flat-gloss-header">
                    <span>Gloss Analysis</span>
                    <button class="flat-gloss-toggle" onclick="toggleGlossExpansion(this)">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
                <div class="flat-gloss-content">
                    <div class="flat-gloss-raw">
                        <strong>Gloss:</strong> <span style="font-family: 'Courier New', monospace;">${styledRawGloss}</span>
                    </div>
                    <div class="flat-gloss-expanded" style="display: none;">
                        ${structuredExpandedGloss}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Generate styled raw gloss from structured components
     */
    generateStyledRawGloss(rawComponents) {
        if (!rawComponents || rawComponents.length === 0) {
            return '';
        }

        const styledParts = [];

        for (const component of rawComponents) {
            // Check if this is a grouped argument pattern component
            if (component.type === 'argument_pattern_group') {
                // Handle grouped argument pattern - no spaces between components
                const groupComponents = component.components || [];
                const groupParts = [];

                for (const groupComp of groupComponents) {
                    const text = groupComp.text || '';
                    const colorClass = groupComp.color_class || 'gloss-default';

                    // Properly escape all text content to prevent HTML parsing issues
                    const escapedText = this.escapeHtmlText(text);
                    groupParts.push(`<span class="${colorClass}">${escapedText}</span>`);
                }

                // Join group components without spaces
                const groupedHtml = groupParts.join('');
                styledParts.push(groupedHtml);
            } else {
                // Handle regular components
                const text = component.text || '';
                const colorClass = component.color_class || 'gloss-default';

                // Always escape HTML to prevent parsing issues with linguistic notation
                const escapedText = this.escapeHtmlText(text);
                styledParts.push(`<span class="${colorClass}">${escapedText}</span>`);
            }
        }

        // Join components with spaces for proper formatting
        return styledParts.join(' ');
    }

    /**
     * Generate structured expanded gloss from components
     */
    generateStructuredExpandedGloss(expandedComponents) {
        if (!expandedComponents || expandedComponents.length === 0) {
            return '';
        }

        // Build expanded gloss with proper categorization
        const categories = {
            'Verb Properties': [],
            'Screve': [], // Changed from "Tense & Aspect" to "Screve"
            'Argument Structure': [],
            'Case Marking': []
        };

        for (const component of expandedComponents) {
            // Handle argument pattern groups specially
            if (component.type === 'argument_pattern_group') {
                const originalText = component.original_text || '';
                const description = component.description || '';
                const groupComponents = component.components || [];

                // Generate color-coded display text from components
                let displayText = '';
                for (const groupComp of groupComponents) {
                    const text = groupComp.text || '';
                    const colorClass = groupComp.color_class || 'gloss-default';
                    const escapedText = this.escapeHtmlText(text);
                    displayText += `<span class="${colorClass}">${escapedText}</span>`;
                }

                categories['Argument Structure'].push({
                    text: displayText,
                    colorClass: 'gloss-argument',
                    description: description
                });
                continue;
            }

            const componentType = component.component_type || '';
            const text = component.text || '';
            const colorClass = component.color_class || 'gloss-default';
            let description = component.description || '';

            // Handle argument pattern components specially
            if (componentType === 'argument' && text.startsWith('<') && text.endsWith('>')) {
                // Look up description from gloss reference (would need to be loaded)
                if (!description) {
                    // Fallback to common patterns
                    if (text === '<S-DO>') {
                        description = 'Transitive absolute';
                    } else if (text === '<S-DO-IO>') {
                        description = 'Transitive relative';
                    } else if (text === '<S-IO>') {
                        description = 'Intransitive relative';
                    }
                }
            }

            // Categorize components
            if (componentType === 'verb' || componentType === 'voice') {
                categories['Verb Properties'].push({ text, colorClass, description });
            } else if (componentType === 'tense' || componentType === 'aspect') {
                categories['Screve'].push({ text, colorClass, description });
            } else if (componentType === 'argument') {
                categories['Argument Structure'].push({ text, colorClass, description });
            } else if (componentType === 'case_spec') {
                categories['Case Marking'].push({ text, colorClass, description });
            } else {
                // Default to Verb Properties for unknown types
                categories['Verb Properties'].push({ text, colorClass, description });
            }
        }

        // Generate HTML for each category with consistent font styling
        let structuredHtml = '';
        for (const [categoryName, items] of Object.entries(categories)) {
            if (items.length > 0) {
                let itemsHtml = '';
                for (const { text, colorClass, description } of items) {
                    const escapedDescription = this.escapeHtmlText(description);

                    if (description && description.trim()) {
                        // Check if text is already HTML (for argument patterns)
                        if (text.includes('<span class=')) {
                            itemsHtml += `<div class="gloss-element"><span class="gloss-brackets ${colorClass}" style="font-family: 'Courier New', monospace;">${text}</span>: <span style="font-family: 'Courier New', monospace;">${escapedDescription}</span></div>`;
                        } else {
                            // Regular text needs escaping
                            const escapedText = this.escapeHtmlText(text);
                            itemsHtml += `<div class="gloss-element"><span class="gloss-brackets ${colorClass}" style="font-family: 'Courier New', monospace;">${escapedText}</span>: <span style="font-family: 'Courier New', monospace;">${escapedDescription}</span></div>`;
                        }
                    } else {
                        // Check if text is already HTML (for argument patterns)
                        if (text.includes('<span class=')) {
                            itemsHtml += `<div class="gloss-element"><span class="gloss-brackets ${colorClass}" style="font-family: 'Courier New', monospace;">${text}</span></div>`;
                        } else {
                            // Regular text needs escaping
                            const escapedText = this.escapeHtmlText(text);
                            itemsHtml += `<div class="gloss-element"><span class="gloss-brackets ${colorClass}" style="font-family: 'Courier New', monospace;">${escapedText}</span></div>`;
                        }
                    }
                }

                structuredHtml += `
                    <div class="gloss-category">
                        <div class="gloss-category-title" style="font-family: 'Courier New', monospace;">${this.escapeHtmlText(categoryName)}</div>
                        <div class="gloss-category-items">
                            ${itemsHtml}
                        </div>
                    </div>
                `;
            }
        }

        return structuredHtml;
    }

    /**
     * Escape HTML characters to prevent parsing issues with linguistic notation
     * @param {string} text - Text to escape
     * @returns {string} HTML-escaped text
     */
    escapeHtmlText(text) {
        if (!text) return '';

        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Style gloss text with color coding
     * @param {string} rawGloss - Raw gloss text
     * @returns {string} Styled gloss HTML
     */
    styleGlossText(rawGloss) {
        if (!rawGloss) return '';

        // Basic styling for gloss elements
        return rawGloss
            .replace(/\b(V|Act|MedAct|Impf|Perf|Pres|Fut|Aor|Opt|Impv|Inv|Pv|SV|LV)\b/g,
                '<span class="gloss-verb">$1</span>')
            .replace(/<([^:>]+):([^>]+)>/g,
                '<span class="gloss-case"><$1:$2></span>')
            .replace(/<([^:>]+)>/g,
                '<span class="gloss-argument"><$1></span>');
    }

    // buildStructuredGloss method removed - now only uses structured data from JSON files

    /**
     * Get preverb selector element for a specific verb
     * @param {string} verbId - Verb identifier
     * @returns {HTMLElement|null} Preverb selector element
     */
    getPreverbSelector(verbId) {
        const verbSection = document.querySelector(`#verb-${verbId}`);
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
