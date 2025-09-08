/**
 * Dynamic Verb Loader - Loads and renders verbs with flat structure
 * 
 * This module handles:
 * - Loading verb index
 * - Loading individual verb data
 * - Caching loaded verbs
 * - Rendering verbs using flat structure
 * - URL-based verb navigation
 */

import { AnimationManager } from './animation-manager.js';

class DynamicVerbLoader {
    constructor() {
        this.verbIndex = null;
        this.verbCache = new Map();
        this.loading = new Set();
        this.currentVerbId = null;
    }

    /**
     * Initialize the verb loader by loading the index only (no automatic verb loading)
     */
    async initialize() {
        try {
            const response = await fetch('data/verbs-index.json');
            this.verbIndex = await response.json();

            // Don't automatically load a verb - preserve static content
            // Only load verb data for sidebar TOC population

            return this.verbIndex;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Check if the verb loader is initialized
     * @returns {boolean} Whether the loader is initialized
     */
    isInitialized() {
        return this.verbIndex !== null;
    }

    /**
     * Check if a verb exists in the verb index
     * @param {string|number} verbId - Verb ID to check
     * @returns {boolean} Whether the verb exists
     */
    verbExists(verbId) {
        if (!this.verbIndex || !this.verbIndex.verbs) {
            return false;
        }
        // Convert verbId to number for comparison since verb index uses numeric IDs
        const numericVerbId = parseInt(verbId, 10);
        return this.verbIndex.verbs.some(verb => verb.id === numericVerbId);
    }

    /**
     * Load a specific verb by ID
     */
    async loadVerb(verbId, updateURL = false) {
        // Normalize verbId to string for consistent caching
        const normalizedVerbId = String(verbId);

        // Check cache first
        if (this.verbCache.has(normalizedVerbId)) {
            const verbData = this.verbCache.get(normalizedVerbId);
            this.renderVerb(verbData);

            // Dispatch event to notify other modules that a verb was rendered
            document.dispatchEvent(new CustomEvent('verbRendered', {
                detail: { verbId, verbData }
            }));

            if (updateURL) {
                this.updateCurrentVerb(verbId);
            }
            return verbData;
        }

        // Check if already loading
        if (this.loading.has(normalizedVerbId)) {
            // Wait for the loading to complete
            while (this.loading.has(normalizedVerbId)) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            return this.verbCache.get(normalizedVerbId);
        }

        // Start loading
        this.loading.add(normalizedVerbId);
        try {
            const response = await fetch(`data/verbs/${verbId}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load verb ${verbId}: ${response.status}`);
            }

            const verbData = await response.json();

            // Cache the verb data
            this.verbCache.set(normalizedVerbId, verbData);

            // Render the verb
            this.renderVerb(verbData);

            // Dispatch event to notify other modules that a verb was rendered
            document.dispatchEvent(new CustomEvent('verbRendered', {
                detail: { verbId, verbData }
            }));

            // Only update URL if explicitly requested (e.g., from user interaction)
            if (updateURL) {
                this.updateCurrentVerb(verbId);
            }

            return verbData;
        } catch (error) {
            throw error;
        } finally {
            this.loading.delete(normalizedVerbId);
        }
    }

    /**
     * Load a verb and update URL (for user interactions)
     */
    async loadVerbWithURLUpdate(verbId) {
        return await this.loadVerb(verbId, true);
    }

    /**
     * Update current verb
     */
    updateCurrentVerb(verbId) {
        this.currentVerbId = verbId;

        // Update URL (optional)
        if (history.pushState) {
            history.pushState({ verbId }, '', `?verb=${verbId}`);
        }
    }

    /**
     * Render verb using flat structure (now works with existing static content)
     */
    renderVerb(verbData) {
        const baseData = verbData.base_data;
        const generatedData = verbData.generated_data;

        // Check if this is a multi-preverb verb
        const hasMultiplePreverbs = baseData.preverb_config?.has_multiple_preverbs || false;

        // Find existing verb section or create new one
        let verbSection = document.querySelector(`#verb-${baseData.id}`);

        if (!verbSection) {
            // If no existing section, create a new one in the main content
            const container = document.querySelector('.main-content');
            if (!container) {
                return;
            }

            const preverbSelector = hasMultiplePreverbs ? this.createPreverbSelector(baseData) : '';
            const linguaUrl = baseData.url ? this.createLinguaUrl(baseData.url) : '';

            container.innerHTML = `
                <div class="verb-section" id="verb-${baseData.id}" data-semantic-key="${baseData.semantic_key}" data-category="${baseData.category}" data-has-multiple-preverbs="${hasMultiplePreverbs}" data-default-preverb="${baseData.preverb_config?.default_preverb || ''}">
                    ${preverbSelector}
                    <div class="verb-header">
                        <h2 class="verb-title">
                            <span class="verb-georgian georgian-text">${baseData.georgian}</span>
                            <span class="verb-description">${baseData.description}</span>
                        </h2>
                        ${linguaUrl}
                    </div>
                    
                    <div class="verb-content">
                        ${this.renderFlatVerbContent(baseData, generatedData)}
                    </div>
                </div>
            `;

            // Apply font changes to newly rendered content
            this.applyFontToNewContent(container);
        } else {
            // Update existing verb section with new data
            this.updateExistingVerbSection(verbSection, baseData, generatedData);
        }

        // Handle loading state - reveal content smoothly after rendering
        this.handleLoadingStateReveal();
    }

    /**
     * Update existing verb section with new data
     * @param {Element} verbSection - Existing verb section element
     * @param {Object} baseData - Base verb data
     * @param {Object} generatedData - Generated verb data
     */
    updateExistingVerbSection(verbSection, baseData, generatedData) {
        // Update verb header if needed
        const verbTitle = verbSection.querySelector('.verb-title');
        if (verbTitle) {
            const georgianSpan = verbTitle.querySelector('.verb-georgian');
            const descriptionSpan = verbTitle.querySelector('.verb-description');

            if (georgianSpan) georgianSpan.textContent = baseData.georgian;
            if (descriptionSpan) descriptionSpan.textContent = baseData.description;
        }

        // Update preverb selector if it's a multi-preverb verb
        const hasMultiplePreverbs = baseData.preverb_config?.has_multiple_preverbs || false;
        if (hasMultiplePreverbs) {
            this.updatePreverbSelector(verbSection, baseData);
        }

        // Update verb content
        const verbContent = verbSection.querySelector('.verb-content');
        if (verbContent) {
            verbContent.innerHTML = this.renderFlatVerbContent(baseData, generatedData);
        }

        // Apply font changes to updated content
        this.applyFontToNewContent(verbSection);
    }

    /**
     * Update preverb selector for existing verb section
     * @param {Element} verbSection - Verb section element
     * @param {Object} baseData - Base verb data
     */
    updatePreverbSelector(verbSection, baseData) {
        const preverbSelector = verbSection.querySelector('.preverb-toggle');
        if (preverbSelector) {
            const availablePreverbs = baseData.preverb_config?.available_preverbs || [];
            const defaultPreverb = baseData.preverb_config?.default_preverb || '';

            // Update options
            preverbSelector.innerHTML = availablePreverbs.map(preverb =>
                `<option value="${preverb}" ${preverb === defaultPreverb ? 'selected' : ''}>${preverb}</option>`
            ).join('');

            // Update data attributes
            preverbSelector.dataset.verbId = baseData.id;
        }
    }

    /**
     * Render flat verb content
     */
    renderFlatVerbContent(baseData, generatedData) {
        return `
            <div class="verb-content-container">
                ${this.renderFlatOverview(baseData)}
                ${this.renderFlatTenses(baseData, generatedData)}
            </div>
        `;
    }

    /**
     * Render flat overview grid
     */
    renderFlatOverview(baseData) {
        const conjugations = baseData.conjugations;
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        let gridHTML = `
            <div class="flat-overview">
                <div class="flat-overview-header">Screve</div>
                <div class="flat-overview-header">1sg</div>
                <div class="flat-overview-header">2sg</div>
                <div class="flat-overview-header">3sg</div>
                <div class="flat-overview-header">1pl</div>
                <div class="flat-overview-header">2pl</div>
                <div class="flat-overview-header">3pl</div>
        `;

        tenses.forEach(tense => {
            const tenseData = conjugations[tense];
            if (!tenseData || !tenseData.forms) return;

            const tenseNames = {
                "present": "PRES", "imperfect": "IMPF", "future": "FUT",
                "aorist": "AOR", "optative": "OPT", "imperative": "IMPV"
            };
            const tenseLabel = tenseNames[tense];
            gridHTML += `<div class="flat-overview-cell flat-overview-tense">${tenseLabel}</div>`;

            ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'].forEach(person => {
                const form = tenseData.forms[person] || '-';
                gridHTML += `<div class="flat-overview-cell georgian-text">${form}</div>`;
            });
        });

        gridHTML += '</div>';
        return gridHTML;
    }

    /**
     * Render flat tenses
     */
    renderFlatTenses(baseData, generatedData) {
        const tenses = [
            { name: 'present', title: 'Present Indicative' },
            { name: 'imperfect', title: 'Imperfect' },
            { name: 'aorist', title: 'Aorist' },
            { name: 'optative', title: 'Optative' },
            { name: 'future', title: 'Future' },
            { name: 'imperative', title: 'Imperative' }
        ];

        return `
            <div class="flat-tenses">
                ${tenses.map(tense => this.renderFlatTense(tense, baseData, generatedData)).join('')}
            </div>
        `;
    }

    /**
     * Render individual flat tense
     */
    renderFlatTense(tense, baseData, generatedData) {
        const conjugations = baseData.conjugations[tense.name];

        // Check if this is a single-preverb verb by examining the examples structure
        // Multi-preverb verbs have preverb keys like "მი", "მო", etc.
        // Single-preverb verbs only have "default" key
        const exampleKeys = Object.keys(generatedData.examples || {});
        const isSinglePreverb = exampleKeys.length === 1 && exampleKeys[0] === 'default';

        // Access examples data based on verb type
        const examples = isSinglePreverb
            ? generatedData.examples?.default?.[tense.name] || []
            : generatedData.examples?.[baseData.preverb_config?.default_preverb]?.[tense.name] || [];


        return `
            <div class="flat-tense">
                <div class="flat-tense-header">${tense.title}</div>
                ${this.renderFlatConjugation(conjugations)}
                ${this.renderFlatExamples(examples, baseData.preverb_config?.default_preverb || 'default', tense.name, generatedData)}
                ${this.renderFlatGloss(conjugations, baseData.id, tense.name, baseData.preverb_config?.default_preverb || 'default', generatedData)}
            </div>
        `;
    }

    /**
     * Render flat conjugation
     */
    renderFlatConjugation(conjugations) {
        if (!conjugations || !conjugations.forms) return '';

        // 3x2 layout (1sg 2sg 3sg / 1pl 2pl 3pl) for wider screens
        const persons_3x2 = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];

        // 2x3 layout (1sg 1pl / 2sg 2pl / 3sg 3pl) for narrower screens
        const persons_2x3 = ['1sg', '1pl', '2sg', '2pl', '3sg', '3pl'];

        const generateConjugationItems = (persons) => {
            return persons.map(person => `
                <div class="flat-conjugation-item">
                    <span class="flat-conjugation-person">${person}</span>
                    <span class="flat-conjugation-form georgian-text">${conjugations.forms[person] || '-'}</span>
                </div>
            `).join('');
        };

        return `
            <div class="flat-conjugation">
                ${generateConjugationItems(persons_3x2)}
            </div>
            <div class="flat-conjugation-2x3">
                ${generateConjugationItems(persons_2x3)}
            </div>
        `;
    }

    /**
     * Render flat examples
     */
    renderFlatExamples(examples, preverb, tense, generatedData) {
        if (!examples || examples.length === 0) {
            return '';
        }

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
     * Render flat gloss
     */
    renderFlatGloss(conjugations, verbId, tense, preverb, generatedData) {
        if (!conjugations || !conjugations.raw_gloss) return '';

        // Check if this is a single-preverb verb by examining the examples structure
        // Multi-preverb verbs have preverb keys like "მი", "მო", etc.
        // Single-preverb verbs only have "default" key
        const exampleKeys = Object.keys(generatedData.examples || {});
        const isSinglePreverb = exampleKeys.length === 1 && exampleKeys[0] === 'default';

        // Access gloss analysis data based on verb type
        const glossAnalysis = isSinglePreverb
            ? generatedData.gloss_analysis?.[tense]
            : generatedData.gloss_analysis?.[preverb]?.[tense];

        let styledRawGloss = conjugations.raw_gloss;
        let structuredExpandedGloss = '';

        // Use structured data if available (for both single and multi-preverb verbs)
        if (glossAnalysis && glossAnalysis.structured_gloss) {
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
     * Style gloss text with case specifications
     */
    styleGlossTextWithCaseSpecs(rawGloss, caseSpecifications) {
        let styledGloss = rawGloss;

        // Replace case specifications with color-coded spans
        caseSpecifications.forEach(spec => {
            const match = spec.match(/<([^:>]+):([^>]+)>/);
            if (match) {
                const [, arg, caseType] = match;
                const argClass = this.getArgumentClass(arg);
                const replacement = `<span class="${argClass}"><${arg}:${caseType}></span>`;
                styledGloss = styledGloss.replace(spec, replacement);
            }
        });

        // Handle argument patterns
        styledGloss = styledGloss.replace(/<([^:>]+)>/g, (match, content) => {
            if (content.includes(':')) return match; // Skip case specs (already handled)

            const parts = content.split('-');
            const styledParts = parts.map(part => {
                const argClass = this.getArgumentClass(part);
                return `<span class="${argClass}">${part}</span>`;
            });

            return `<span class="gloss-default"><${styledParts.join('<span class="gloss-default">-</span>')}></span>`;
        });

        return styledGloss;
    }

    /**
     * Get CSS class for argument type
     */
    getArgumentClass(arg) {
        const argMap = {
            'S': 'gloss-subject',
            'DO': 'gloss-direct-object',
            'IO': 'gloss-indirect-object',
            'V': 'gloss-verb',
            'Act': 'gloss-voice',
            'Impf': 'gloss-aspect',
            'Perf': 'gloss-aspect'
        };
        return argMap[arg] || 'gloss-default';
    }

    // buildStructuredGloss method removed - now only uses structured data from JSON files

    /**
     * Apply font changes to newly rendered content
     */
    applyFontToNewContent(container) {
        // This will be handled by the existing font manager
        if (window.fontManager) {
            window.fontManager.applyCurrentFont();
        }
    }

    /**
     * Handle loading state reveal - smoothly show content after loading
     */
    handleLoadingStateReveal() {
        // Check if in a loading state (loading container exists)
        const loadingContainer = document.querySelector('.verb-loading-container');

        // Find the verb section first
        const verbSection = document.querySelector('.verb-section');

        if (verbSection) {
            // Use AnimationManager for consistent fade-in behavior
            AnimationManager.handleLoadingStateReveal(verbSection, {
                context: 'Enhanced loader'
            });
        }

        // Remove loading container if it exists
        if (loadingContainer) {
            AnimationManager.removeLoadingContainer(loadingContainer);
        }
    }

    /**
     * Wait for fonts to load and then fade in content smoothly
     * @param {Element} verbSection - Verb section element to fade in
     */
    async waitForFontsAndFadeIn(verbSection) {
        // Use AnimationManager for consistent fade-in behavior
        await AnimationManager.waitForFontsAndFadeIn(verbSection, {
            context: 'Enhanced loader'
        });
    }

    /**
     * Get verb index
     */
    getVerbIndex() {
        return this.verbIndex;
    }

    /**
     * Get current verb ID
     */
    getCurrentVerbId() {
        return this.currentVerbId;
    }

    /**
     * Get verb ID from URL hash or query parameter
     */
    getVerbIdFromURL() {
        // Check URL hash first (e.g., #verb123)
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const verbId = hash.substring(1);
            if (verbId) {
                return verbId;
            }
        }

        // Check URL query parameter (e.g., ?verb=verb123)
        const urlParams = new URLSearchParams(window.location.search);
        const verbParam = urlParams.get('verb');
        if (verbParam) {
            return verbParam;
        }

        return null;
    }

    /**
     * Load verb data on-demand (for multi-preverb verbs)
     * @param {string} verbId - Verb identifier
     * @param {Element} verbSection - Verb section DOM element
     * @returns {Promise<Object|null>} Verb data or null if not found
     */
    async loadVerbDataOnDemand(verbId, verbSection) {
        // Normalize verbId to string for consistent caching
        const normalizedVerbId = String(verbId);

        // Skip if already loaded or loading
        if (this.verbCache.has(normalizedVerbId) || this.loading.has(normalizedVerbId)) {
            return this.verbCache.get(normalizedVerbId);
        }

        this.loading.add(normalizedVerbId);

        try {
            const verbData = await this.loadVerb(verbId, false); // Don't update URL for on-demand loading
            if (verbData) {
                return verbData;
            }
        } catch (error) {
            this.showErrorState(verbSection);
        } finally {
            this.loading.delete(normalizedVerbId);
        }

        return null;
    }

    /**
     * Load verb data immediately (for direct navigation)
     * @param {string} verbId - Verb identifier
     * @returns {Promise<Object|null>} Verb data or null if not found
     */
    async loadVerbDataImmediately(verbId) {
        const verbSection = document.querySelector(`#verb-${verbId}`);
        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            return await this.loadVerbDataOnDemand(verbId, verbSection);
        }
        return null;
    }

    /**
     * Get conjugations for a specific preverb (for multi-preverb verbs)
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
     * Create preverb selector for multi-preverb verbs
     */
    createPreverbSelector(baseData) {
        const preverbConfig = baseData.preverb_config || {};
        const availablePreverbs = preverbConfig.available_preverbs || [];
        const defaultPreverb = preverbConfig.default_preverb || '';

        if (availablePreverbs.length <= 1) {
            return '';
        }

        const options = availablePreverbs.map(preverb =>
            `<option value="${preverb}" ${preverb === defaultPreverb ? 'selected' : ''}>${preverb}</option>`
        ).join('');

        return `
            <div class="preverb-selector">
                <label for="preverb-select">Preverb:</label>
                <select id="preverb-select" class="preverb-toggle" data-verb-id="${baseData.id}">
                    ${options}
                </select>
            </div>
        `;
    }

    /**
     * Create Lingua URL link
     */
    createLinguaUrl(url) {
        if (!url || !url.trim()) {
            return '';
        }

        return `
            <div class="verb-external-link">
                <a href="${url}" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-external-link-alt"></i> View on Lingua.ge
                </a>
            </div>
        `;
    }
}

// Global function for gloss toggle (needed for inline onclick)
window.toggleGlossExpansion = function (button) {
    const expanded = button.closest('.flat-gloss').querySelector('.flat-gloss-expanded');
    const icon = button.querySelector('i');

    if (expanded.style.display === 'none') {
        expanded.style.display = 'block';
        icon.className = 'fas fa-chevron-up';
    } else {
        expanded.style.display = 'none';
        icon.className = 'fas fa-chevron-down';
    }
};

export { DynamicVerbLoader };