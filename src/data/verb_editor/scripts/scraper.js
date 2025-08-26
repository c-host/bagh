/**
 * Scraper Integration for Verb Editor
 * Handles integration with lingua_verb_scraper.py and URL scraping
 */

class ScraperIntegration {
    constructor() {
        this.baseUrl = 'https://lingua.ge';
        this.scrapingInProgress = false;
        this.lastScrapedData = null;
        this.pythonScraperPath = './lingua_verb_scraper.py'; // Path to the Python scraper
    }

    /**
     * Scrape verb data from a lingua.ge URL
     */
    async scrapeVerb(url) {
        if (this.scrapingInProgress) {
            throw new Error('Scraping already in progress');
        }

        if (!this.isValidLinguaUrl(url)) {
            throw new Error('Invalid lingua.ge URL. Please provide a valid verb page URL.');
        }

        this.scrapingInProgress = true;

        try {
            // Attempt real scraping
            const scrapedData = await this.realScraping(url);

            // Validate scraped data
            const validationResult = this.validateScrapedData(scrapedData);
            if (!validationResult.isValid) {
                throw new Error(`Scraped data validation failed: ${validationResult.errors.join(', ')}`);
            }

            this.lastScrapedData = scrapedData;
            return scrapedData;

        } catch (error) {
            console.error('Scraping failed:', error);
            throw new Error(`Failed to scrape verb data: ${error.message}`);
        } finally {
            this.scrapingInProgress = false;
        }
    }

    /**
     * Real scraping using lingua_verb_scraper.py
     */
    async realScraping(url) {
        try {
            // Method 1: Try using Python subprocess (if running in Node.js environment)
            if (typeof process !== 'undefined' && process.versions && process.versions.node) {
                return await this.scrapeWithNodePython(url);
            }

            // Method 2: Try using Python HTTP server (if running in browser)
            return await this.scrapeWithPythonServer(url);

        } catch (error) {
            throw new Error(`Scraping failed: ${error.message}`);
        }
    }

    /**
     * Scrape using Node.js Python subprocess
     */
    async scrapeWithNodePython(url) {
        // This would work if a Node.js environment
        // For now, throw an error
        throw new Error('Node.js Python integration not yet implemented. Please use the Python HTTP server method.');
    }

    /**
     * Scrape using Python HTTP server
     */
    async scrapeWithPythonServer(url) {
        try {
            // Try to connect to a local Python scraper server
            const response = await fetch('http://localhost:8000/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Python scraper server not found. Please start the scraper server by running: python src/data/verb_editor/scripts/scraper_server.py');
                } else if (response.status === 0) {
                    throw new Error('Cannot connect to Python scraper server. Please ensure the server is running on http://localhost:8000');
                } else {
                    throw new Error(`Server error: HTTP ${response.status}: ${response.statusText}`);
                }
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return this.transformScrapedData(data);
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error: Cannot connect to Python scraper server. Please ensure the server is running on http://localhost:8000');
            }
            throw new Error(`Scraping failed: ${error.message}`);
        }
    }

    /**
     * Transform scraped data to expected format
     */
    transformScrapedData(rawData) {
        // Handle Python server response structure
        // The server returns: { success: true, data: {...}, timestamp: "..." }
        const actualData = rawData.data || rawData;

        // Transform the actual scraped data to match expected structure
        return {
            georgian: actualData.georgian || actualData.infinitive || '',
            english: actualData.english || actualData.translation || '',
            description: actualData.description || '',
            semantic_key: actualData.semantic_key || '',
            conjugations: this.transformConjugations(actualData.conjugations || actualData.forms || {}),
            url: actualData.url || '',
            timestamp: new Date().toISOString(),
            verbClass: actualData.verb_class || actualData.class || '',
            root: actualData.root || '',
            stem: actualData.stem || '',
            preverbs: actualData.preverbs || [],
            notes: actualData.notes || ''
        };
    }

    /**
     * Transform conjugation data to expected format
     */
    transformConjugations(rawConjugations) {
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        const transformed = {};

        tenses.forEach(tense => {
            if (rawConjugations[tense]) {
                transformed[tense] = {
                    raw_gloss: rawConjugations[tense].raw_gloss || '',
                    forms: rawConjugations[tense].forms || {},
                    examples: []
                };
            } else {
                // Provide empty structure for missing tenses
                transformed[tense] = {
                    raw_gloss: '',
                    forms: {},
                    examples: []
                };
            }
        });

        return transformed;
    }







    /**
     * Validate if URL is a valid lingua.ge verb page
     */
    isValidLinguaUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname === 'lingua.ge' &&
                urlObj.pathname.includes('/verbs/');
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if a verb already exists in the database
     */
    async checkVerbExists(georgianText, semanticKey = null) {
        try {
            // This would integrate with the actual database
            // For now, return a mock result
            const exists = Math.random() > 0.7; // 30% chance of existing

            if (exists) {
                return {
                    exists: true,
                    matches: [{
                        id: 'mock_' + Date.now(),
                        georgian: georgianText,
                        semantic_key: semanticKey || 'mock_key',
                        category: 'perception'
                    }]
                };
            }

            return { exists: false, matches: [] };
        } catch (error) {
            console.warn('Failed to check if verb exists:', error);
            return { exists: false, matches: [] };
        }
    }

    /**
     * Generate semantic key from Georgian text
     */
    generateSemanticKey(georgianText) {
        if (!georgianText) return '';

        // Remove Georgian characters and convert to lowercase
        const key = georgianText
            .replace(/[ა-ჰ]/g, '')
            .replace(/[^\w\s]/g, '')
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '_');

        return key || 'verb_' + Date.now();
    }

    /**
     * Parse raw gloss to extract argument information
     */
    parseRawGloss(rawGloss) {
        if (!rawGloss) return { pattern: '', arguments: [] };

        // Extract pattern like <S-DO> from <S:Erg> <DO:Nom>
        const patternMatch = rawGloss.match(/<([SDOI\-]+):[A-Za-z]+>/g);
        if (!patternMatch) return { pattern: '', arguments: [] };

        // Extract argument types
        const args = patternMatch.map(match => {
            const argMatch = match.match(/<([SDOI\-]+):/);
            return argMatch ? argMatch[1] : '';
        }).filter(arg => arg);

        // Create pattern
        const pattern = args.length > 0 ? `<${args.join('-')}>` : '';

        return {
            pattern: pattern,
            arguments: args
        };
    }

    /**
     * Extract verb class from scraped data
     */
    extractVerbClass(scrapedData) {
        return scrapedData.verbClass || 'I';
    }

    /**
     * Extract tense information from scraped data
     */
    extractTense(scrapedData) {
        const tenses = Object.keys(scrapedData.conjugations || {});
        return tenses.filter(tense =>
            scrapedData.conjugations[tense] &&
            scrapedData.conjugations[tense].raw_gloss
        );
    }

    /**
     * Get scraping status
     */
    getScrapingStatus() {
        return {
            inProgress: this.scrapingInProgress,
            lastScraped: this.lastScrapedData ? this.lastScrapedData.timestamp : null
        };
    }

    /**
     * Clear last scraped data
     */
    clearLastScrapedData() {
        this.lastScrapedData = null;
    }



    /**
     * Get available preverbs from scraped data
     */
    getAvailablePreverbs(scrapedData) {
        return scrapedData.preverbs || [];
    }

    /**
     * Validate scraped data structure
     */
    validateScrapedData(data) {
        const errors = [];

        if (!data.georgian || typeof data.georgian !== 'string') {
            errors.push('Georgian text is required and must be a string');
        }

        if (!data.english || typeof data.english !== 'string') {
            errors.push('English translation is required and must be a string');
        }

        if (!data.conjugations || typeof data.conjugations !== 'object') {
            errors.push('Conjugations object is required');
        }

        if (!data.url || typeof data.url !== 'string') {
            errors.push('URL is required and must be a string');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }


}
