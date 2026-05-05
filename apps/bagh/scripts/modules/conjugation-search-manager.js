/**
 * ConjugationSearchManager - Handles Georgian verb conjugation form search
 * 
 * This module provides:
 * - Building search index from verb conjugation forms
 * - Searching conjugation forms with context
 * - Performance optimization through caching
 * - Support for multi-preverb verbs
 */

export class ConjugationSearchManager {
    constructor(verbLoader) {
        /** @type {Object} Enhanced Dynamic Verb Loader instance */
        this.verbLoader = verbLoader;

        /** @type {Map} Search index: conjugation_form -> array of verb info */
        this.searchIndex = new Map();

        /** @type {boolean} Whether search index is built */
        this.indexBuilt = false;

        /** @type {boolean} Whether index building is in progress */
        this.indexBuilding = false;

        /** @type {Map} Cache for search results */
        this.searchCache = new Map();

        /** @type {number} Maximum cache size */
        this.maxCacheSize = 100;

        /** @type {Array} Available tenses for context display */
        this.tenseNames = {
            'present': 'Present',
            'imperfect': 'Imperfect',
            'future': 'Future',
            'aorist': 'Aorist',
            'optative': 'Optative',
            'imperative': 'Imperative'
        };

        /** @type {Object} Person names for context display */
        this.personNames = {
            '1sg': '1st person singular',
            '2sg': '2nd person singular',
            '3sg': '3rd person singular',
            '1pl': '1st person plural',
            '2pl': '2nd person plural',
            '3pl': '3rd person plural'
        };
    }

    /**
     * Build search index from all verb conjugation forms
     * @returns {Promise<boolean>} Success status
     */
    async buildSearchIndex() {
        if (this.indexBuilt || this.indexBuilding) {
            return this.indexBuilt;
        }

        this.indexBuilding = true;

        try {
            const verbIndex = this.verbLoader.getVerbIndex();
            if (!verbIndex || !verbIndex.verbs) {
                throw new Error('No verb index available');
            }

            // Clear existing index
            this.searchIndex.clear();

            // Process verbs in chunks for background building
            const chunkSize = 5;
            const verbs = verbIndex.verbs;

            for (let i = 0; i < verbs.length; i += chunkSize) {
                const chunk = verbs.slice(i, i + chunkSize);

                // Process chunk
                for (const verb of chunk) {
                    await this.indexVerb(verb);
                }

                // Yield control to browser for background processing
                if (i + chunkSize < verbs.length) {
                    await new Promise(resolve => setTimeout(resolve, 0));
                }
            }

            this.indexBuilt = true;
            this.indexBuilding = false;

            return true;

        } catch (error) {
            console.error('Failed to build conjugation search index:', error);
            this.indexBuilding = false;
            return false;
        }
    }

    /**
     * Load verb data without rendering (for indexing only)
     * @param {string} verbId - Verb ID
     * @returns {Promise<Object|null>} Verb data or null if not found
     */
    async loadVerbDataOnly(verbId) {
        try {
            // Check cache first
            const normalizedVerbId = String(verbId);
            if (this.verbLoader.verbCache.has(normalizedVerbId)) {
                return this.verbLoader.verbCache.get(normalizedVerbId);
            }

            // Check if already loading
            if (this.verbLoader.loading.has(normalizedVerbId)) {
                // Wait for the loading to complete
                while (this.verbLoader.loading.has(normalizedVerbId)) {
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
                return this.verbLoader.verbCache.get(normalizedVerbId);
            }

            // Start loading
            this.verbLoader.loading.add(normalizedVerbId);
            try {
                const response = await fetch(`data/verbs/${verbId}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load verb ${verbId}: ${response.status}`);
                }

                const verbData = await response.json();

                // Cache the verb data
                this.verbLoader.verbCache.set(normalizedVerbId, verbData);

                return verbData;
            } catch (error) {
                throw error;
            } finally {
                this.verbLoader.loading.delete(normalizedVerbId);
            }
        } catch (error) {
            console.error(`Failed to load verb data for ${verbId}:`, error);
            return null;
        }
    }

    /**
     * Index a single verb's conjugation forms
     * @param {Object} verb - Verb from index
     */
    async indexVerb(verb) {
        try {
            // Load verb data without rendering (for indexing only)
            const verbData = await this.loadVerbDataOnly(verb.id);
            if (!verbData || !verbData.base_data) {
                return;
            }

            const baseData = verbData.base_data;
            const generatedData = verbData.generated_data;

            // Check if this is a multi-preverb verb
            const hasMultiplePreverbs = baseData.preverb_config?.has_multiple_preverbs || false;

            if (hasMultiplePreverbs && generatedData?.preverb_forms) {
                // Index all preverb variations for multi-preverb verbs
                for (const [preverb, preverbData] of Object.entries(generatedData.preverb_forms)) {
                    for (const [tense, tenseData] of Object.entries(preverbData)) {
                        if (!tenseData || typeof tenseData !== 'object') continue;

                        // Process each person form
                        for (const [person, form] of Object.entries(tenseData)) {
                            if (!form || form === '-' || form.trim() === '') continue;

                            // Create search entry
                            const searchEntry = {
                                verbId: verb.id,
                                verbTitle: baseData.georgian,
                                verbDescription: baseData.description,
                                verbCategory: baseData.category,
                                verbClass: baseData.class,
                                semanticKey: baseData.semantic_key,
                                form: form.trim(),
                                tense: tense,
                                person: person,
                                preverb: preverb,
                                hasMultiplePreverbs: true
                            };

                            // Add to search index
                            const normalizedForm = form.trim().toLowerCase();
                            if (!this.searchIndex.has(normalizedForm)) {
                                this.searchIndex.set(normalizedForm, []);
                            }
                            this.searchIndex.get(normalizedForm).push(searchEntry);
                        }
                    }
                }
            } else {
                // Index default conjugations for single-preverb verbs
                const conjugations = baseData.conjugations;
                for (const [tense, tenseData] of Object.entries(conjugations)) {
                    if (!tenseData.forms) continue;

                    // Process each person form
                    for (const [person, form] of Object.entries(tenseData.forms)) {
                        if (!form || form === '-' || form.trim() === '') continue;

                        // Create search entry
                        const searchEntry = {
                            verbId: verb.id,
                            verbTitle: baseData.georgian,
                            verbDescription: baseData.description,
                            verbCategory: baseData.category,
                            verbClass: baseData.class,
                            semanticKey: baseData.semantic_key,
                            form: form.trim(),
                            tense: tense,
                            person: person,
                            preverb: this.getPreverbForForm(baseData, form),
                            hasMultiplePreverbs: false
                        };

                        // Add to search index
                        const normalizedForm = form.trim().toLowerCase();
                        if (!this.searchIndex.has(normalizedForm)) {
                            this.searchIndex.set(normalizedForm, []);
                        }
                        this.searchIndex.get(normalizedForm).push(searchEntry);
                    }
                }
            }

        } catch (error) {
            console.error(`Failed to index verb ${verb.id}:`, error);
        }
    }

    /**
     * Get preverb for a specific form
     * @param {Object} baseData - Verb base data
     * @param {string} form - Conjugation form
     * @returns {string} Preverb or empty string
     */
    getPreverbForForm(baseData, form) {
        if (!baseData.preverb_config?.has_multiple_preverbs) {
            return baseData.preverb_config?.default_preverb || '';
        }

        // For multi-preverb verbs, try to extract preverb from form
        const availablePreverbs = baseData.preverb_config.available_preverbs || [];
        for (const preverb of availablePreverbs) {
            if (form.startsWith(preverb)) {
                return preverb;
            }
        }

        return baseData.preverb_config.default_preverb || '';
    }

    /**
     * Search conjugation forms
     * @param {string} searchTerm - Search term
     * @returns {Array} Array of search results
     */
    searchConjugations(searchTerm) {
        if (!this.indexBuilt) {
            return [];
        }

        const normalizedTerm = searchTerm.trim().toLowerCase();
        if (!normalizedTerm) {
            return [];
        }

        // Check cache first
        if (this.searchCache.has(normalizedTerm)) {
            return this.searchCache.get(normalizedTerm);
        }

        const exactResults = [];
        const partialResults = [];

        // Search through index with enhanced matching
        for (const [form, entries] of this.searchIndex) {
            const formLower = form.toLowerCase();
            let matchType = null;

            // Check for exact match first
            if (formLower === normalizedTerm) {
                matchType = 'exact';
            }
            // Check for starts with match
            else if (formLower.startsWith(normalizedTerm)) {
                matchType = 'prefix';
            }
            // Check for ends with match
            else if (formLower.endsWith(normalizedTerm)) {
                matchType = 'suffix';
            }
            // Check for contains match
            else if (formLower.includes(normalizedTerm)) {
                matchType = 'contains';
            }

            if (matchType) {
                entries.forEach(entry => {
                    const result = {
                        ...entry,
                        form: form,
                        matchType: matchType
                    };

                    if (matchType === 'exact') {
                        exactResults.push(result);
                    } else {
                        partialResults.push(result);
                    }
                });
            }
        }

        // Combine results with exact matches first
        const allResults = [...exactResults, ...partialResults];

        // Remove duplicates and sort by relevance
        const uniqueResults = this.removeDuplicates(allResults);
        const sortedResults = this.sortResults(uniqueResults, normalizedTerm);

        // Cache results
        this.cacheResults(normalizedTerm, sortedResults);

        return sortedResults;
    }

    /**
     * Remove duplicate results
     * @param {Array} results - Search results
     * @returns {Array} Unique results
     */
    removeDuplicates(results) {
        const seen = new Set();
        return results.filter(result => {
            const key = `${result.verbId}-${result.form}-${result.tense}-${result.person}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    /**
     * Sort results by relevance
     * @param {Array} results - Search results
     * @param {string} searchTerm - Original search term
     * @returns {Array} Sorted results
     */
    sortResults(results, searchTerm) {
        return results.sort((a, b) => {
            // Exact matches first
            const aExact = a.form.toLowerCase() === searchTerm;
            const bExact = b.form.toLowerCase() === searchTerm;
            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            // Then by form length (shorter forms first)
            if (a.form.length !== b.form.length) {
                return a.form.length - b.form.length;
            }

            // Then alphabetically
            return a.form.localeCompare(b.form);
        });
    }

    /**
     * Cache search results
     * @param {string} term - Search term
     * @param {Array} results - Search results
     */
    cacheResults(term, results) {
        // Simple LRU cache
        if (this.searchCache.size >= this.maxCacheSize) {
            const firstKey = this.searchCache.keys().next().value;
            this.searchCache.delete(firstKey);
        }

        this.searchCache.set(term, results);
    }

    /**
     * Get context string for a search result
     * @param {Object} result - Search result
     * @returns {string} Context string
     */
    getContextString(result) {
        const tenseName = this.tenseNames[result.tense] || result.tense;
        const personName = this.personNames[result.person] || result.person;
        const preverbText = result.preverb ? `${result.preverb} preverb` : '';

        return `
            <div class="context-line">${tenseName}</div>
            <div class="context-line">${personName}</div>
            <div class="context-line">${preverbText}</div>
        `;
    }

    /**
     * Find match positions in text for highlighting
     * @param {string} searchTerm - Search term to find
     * @param {string} text - Text to search in
     * @returns {Array} Array of match positions
     */
    findMatchPositions(searchTerm, text) {
        if (!searchTerm || !text) return [];

        const positions = [];
        const searchLower = searchTerm.toLowerCase();
        const textLower = text.toLowerCase();
        let index = textLower.indexOf(searchLower);

        while (index !== -1) {
            positions.push({
                start: index,
                end: index + searchTerm.length
            });
            index = textLower.indexOf(searchLower, index + 1);
        }

        return positions;
    }

    /**
     * Create emphasized text with visual highlighting
     * @param {string} text - Original text
     * @param {Array} matchPositions - Array of match positions
     * @returns {string} HTML with emphasized matches
     */
    createEmphasizedText(text, matchPositions) {
        if (!matchPositions || matchPositions.length === 0) {
            return text;
        }

        // Sort positions by start index
        const sortedPositions = matchPositions.sort((a, b) => a.start - b.start);

        // Merge overlapping positions
        const mergedPositions = [];
        for (const pos of sortedPositions) {
            if (mergedPositions.length === 0 || mergedPositions[mergedPositions.length - 1].end < pos.start) {
                mergedPositions.push({ ...pos });
            } else {
                mergedPositions[mergedPositions.length - 1].end = Math.max(
                    mergedPositions[mergedPositions.length - 1].end,
                    pos.end
                );
            }
        }

        // Build emphasized text
        let result = '';
        let lastIndex = 0;

        for (const pos of mergedPositions) {
            // Add text before match
            if (pos.start > lastIndex) {
                result += text.substring(lastIndex, pos.start);
            }

            // Add emphasized match
            const matchText = text.substring(pos.start, pos.end);
            result += `<span class="search-emphasis">${matchText}</span>`;

            lastIndex = pos.end;
        }

        // Add remaining text
        if (lastIndex < text.length) {
            result += text.substring(lastIndex);
        }

        return result;
    }

    /**
     * Check if search index is ready
     * @returns {boolean} Whether index is built
     */
    isIndexReady() {
        return this.indexBuilt;
    }

    /**
     * Get index statistics
     * @returns {Object} Index statistics
     */
    getIndexStats() {
        return {
            indexBuilt: this.indexBuilt,
            totalForms: this.searchIndex.size,
            cacheSize: this.searchCache.size,
            indexBuilding: this.indexBuilding
        };
    }

    /**
     * Clear search cache
     */
    clearCache() {
        this.searchCache.clear();
    }

    /**
     * Reset search index
     */
    resetIndex() {
        this.searchIndex.clear();
        this.searchCache.clear();
        this.indexBuilt = false;
        this.indexBuilding = false;
    }
}
