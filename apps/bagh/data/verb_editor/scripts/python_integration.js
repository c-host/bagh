/**
 * Python Tools Integration Module
 * Provides seamless integration with existing Python tools
 */

class PythonIntegration {
    constructor() {
        this.endpoints = {
            glossParser: '/tools/core/gloss_parser.py',
            verbConjugation: '/tools/core/verb_conjugation.py',
            exampleGenerator: '/tools/core/example_generator.py',
            databaseValidator: '/tools/validation/database_validator.py'
        };

        this.cache = new Map();
        this.cacheTimeout = 2 * 60 * 1000; // 2 minutes
        this.performanceMetrics = {
            callTimes: {},
            cacheHits: 0,
            cacheMisses: 0,
            errors: 0
        };

        this.initialize();
    }

    /**
     * Initialize Python integration
     */
    async initialize() {
        try {
            // Test connectivity to Python tools
            await this.testConnectivity();
            console.log('Python integration initialized successfully');
        } catch (error) {
            console.warn('Python integration initialization failed:', error);
            console.log('Falling back to JavaScript-only mode');
        }
    }

    /**
     * Test connectivity to Python tools
     */
    async testConnectivity() {
        const tests = [
            { name: 'gloss_parser', endpoint: this.endpoints.glossParser },
            { name: 'verb_conjugation', endpoint: this.endpoints.verbConjugation },
            { name: 'example_generator', endpoint: this.endpoints.exampleGenerator }
        ];

        for (const test of tests) {
            try {
                const response = await fetch(test.endpoint, { method: 'HEAD' });
                if (response.ok) {
                    console.log(`✅ ${test.name} endpoint accessible`);
                } else {
                    console.warn(`⚠️ ${test.name} endpoint returned ${response.status}`);
                }
            } catch (error) {
                console.warn(`❌ ${test.name} endpoint not accessible:`, error.message);
            }
        }
    }

    /**
     * Parse raw gloss using gloss_parser.py
     */
    async parseRawGloss(rawGloss, cacheKey = null) {
        const cacheKeyFinal = cacheKey || `gloss_${rawGloss}`;

        // Check cache first
        if (this.cache.has(cacheKeyFinal)) {
            const cached = this.cache.get(cacheKeyFinal);
            if (Date.now() < cached.expiry) {
                this.performanceMetrics.cacheHits++;
                return cached.data;
            } else {
                this.cache.delete(cacheKeyFinal);
            }
        }

        const startTime = performance.now();

        try {
            // Try Python integration first
            const result = await this.callPythonTool('gloss_parser', {
                action: 'parse',
                raw_gloss: rawGloss
            });

            // Cache the result
            this.cache.set(cacheKeyFinal, {
                data: result,
                expiry: Date.now() + this.cacheTimeout
            });

            this.performanceMetrics.callTimes.glossParser = performance.now() - startTime;
            this.performanceMetrics.cacheMisses++;

            return result;

        } catch (error) {
            console.warn('Python gloss parsing failed, falling back to JavaScript:', error);

            // Fallback to JavaScript implementation
            return this.parseRawGlossJavaScript(rawGloss);
        }
    }

    /**
     * Generate verb conjugations using verb_conjugation.py
     */
    async generateConjugations(verbData, cacheKey = null) {
        const cacheKeyFinal = cacheKey || `conjugations_${verbData.georgian}_${verbData.argument_pattern}`;

        // Check cache first
        if (this.cache.has(cacheKeyFinal)) {
            const cached = this.cache.get(cacheKeyFinal);
            if (Date.now() < cached.expiry) {
                this.performanceMetrics.cacheHits++;
                return cached.data;
            } else {
                this.cache.delete(cacheKeyFinal);
            }
        }

        const startTime = performance.now();

        try {
            // Try Python integration first
            const result = await this.callPythonTool('verb_conjugation', {
                action: 'generate',
                verb_data: verbData
            });

            // Cache the result
            this.cache.set(cacheKeyFinal, {
                data: result,
                expiry: Date.now() + this.cacheTimeout
            });

            this.performanceMetrics.callTimes.verbConjugation = performance.now() - startTime;
            this.performanceMetrics.cacheMisses++;

            return result;

        } catch (error) {
            console.warn('Python conjugation generation failed, falling back to JavaScript:', error);

            // Fallback to JavaScript implementation
            return this.generateConjugationsJavaScript(verbData);
        }
    }

    /**
     * Generate example sentences using example_generator.py
     */
    async generateExamples(verbData, argumentData, cacheKey = null) {
        const cacheKeyFinal = cacheKey || `examples_${verbData.georgian}_${JSON.stringify(argumentData)}`;

        // Check cache first
        if (this.cache.has(cacheKeyFinal)) {
            const cached = this.cache.get(cacheKeyFinal);
            if (Date.now() < cached.expiry) {
                this.performanceMetrics.cacheHits++;
                return cached.data;
            } else {
                this.cache.delete(cacheKeyFinal);
            }
        }

        const startTime = performance.now();

        try {
            // Try Python integration first
            const result = await this.callPythonTool('example_generator', {
                action: 'generate',
                verb_data: verbData,
                argument_data: argumentData
            });

            // Cache the result
            this.cache.set(cacheKeyFinal, {
                data: result,
                expiry: Date.now() + this.cacheTimeout
            });

            this.performanceMetrics.callTimes.exampleGenerator = performance.now() - startTime;
            this.performanceMetrics.cacheMisses++;

            return result;

        } catch (error) {
            console.warn('Python example generation failed, falling back to JavaScript:', error);

            // Fallback to JavaScript implementation
            return this.generateExamplesJavaScript(verbData, argumentData);
        }
    }

    /**
     * Validate database using database_validator.py
     */
    async validateDatabase(databasePath, cacheKey = null) {
        const cacheKeyFinal = cacheKey || `validation_${databasePath}`;

        // Check cache first
        if (this.cache.has(cacheKeyFinal)) {
            const cached = this.cache.get(cacheKeyFinal);
            if (Date.now() < cached.expiry) {
                this.performanceMetrics.cacheHits++;
                return cached.data;
            } else {
                this.cache.delete(cacheKeyFinal);
            }
        }

        const startTime = performance.now();

        try {
            const result = await this.callPythonTool('database_validator', {
                action: 'validate',
                database_path: databasePath
            });

            // Cache the result
            this.cache.set(cacheKeyFinal, {
                data: result,
                expiry: Date.now() + this.cacheTimeout
            });

            this.performanceMetrics.callTimes.databaseValidator = performance.now() - startTime;
            this.performanceMetrics.cacheMisses++;

            return result;

        } catch (error) {
            console.error('Database validation failed:', error);
            this.performanceMetrics.errors++;
            throw error;
        }
    }

    /**
     * Call Python tool with proper error handling
     */
    async callPythonTool(toolName, data) {
        const endpoint = this.endpoints[toolName];
        if (!endpoint) {
            throw new Error(`Unknown Python tool: ${toolName}`);
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }

            return result;

        } catch (error) {
            console.error(`Python tool ${toolName} call failed:`, error);
            throw error;
        }
    }

    /**
     * JavaScript fallback implementations
     */

    /**
     * JavaScript fallback for raw gloss parsing
     */
    parseRawGlossJavaScript(rawGloss) {
        // Basic JavaScript implementation as fallback
        const pattern = /^V\s+(MedAct|Act|Pass)\s+(Pres|Impf|Fut|Aor|Opt|Impv)\s+(<[SDOI]:[A-Za-z]+>(\s+<[SDOI]:[A-Za-z]+>)*)$/;

        if (!pattern.test(rawGloss)) {
            return {
                isValid: false,
                error: 'Invalid raw gloss format',
                suggestion: 'Use format: V MedAct Pres <S:Erg> <DO:Dat>'
            };
        }

        const parts = rawGloss.split(/\s+/);
        const args = rawGloss.match(/<([SDOI]):([A-Za-z]+)>/g) || [];

        return {
            isValid: true,
            verbType: parts[0],
            voice: parts[1],
            tense: parts[2],
            arguments: args.map(arg => {
                const match = arg.match(/<([SDOI]):([A-Za-z]+)>/);
                return {
                    type: match[1],
                    case: match[2]
                };
            }),
            message: 'Raw gloss parsed successfully (JavaScript fallback)'
        };
    }

    /**
     * JavaScript fallback for conjugation generation
     */
    generateConjugationsJavaScript(verbData) {
        // Basic JavaScript implementation as fallback
        const conjugations = {};
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        tenses.forEach(tense => {
            conjugations[tense] = {
                raw_gloss: `V MedAct ${tense.charAt(0).toUpperCase() + tense.slice(1)} ${verbData.argument_pattern}`,
                forms: {},
                examples: []
            };
        });

        return {
            conjugations,
            message: 'Conjugations generated (JavaScript fallback)'
        };
    }

    /**
     * JavaScript fallback for example generation
     */
    generateExamplesJavaScript(verbData, argumentData) {
        // Basic JavaScript implementation as fallback
        const examples = [];

        // Generate simple examples based on argument data
        if (argumentData.subject && argumentData.direct_object) {
            examples.push({
                georgian: `${argumentData.subject} ${verbData.georgian} ${argumentData.direct_object}`,
                english: `${argumentData.subject} ${verbData.english} ${argumentData.direct_object}`,
                tense: 'present'
            });
        }

        return {
            examples,
            message: 'Examples generated (JavaScript fallback)'
        };
    }

    /**
     * Performance monitoring and cleanup
     */

    /**
     * Get performance summary
     */
    getPerformanceSummary() {
        return {
            callTimes: this.performanceMetrics.callTimes,
            cacheStats: {
                hits: this.performanceMetrics.cacheHits,
                misses: this.performanceMetrics.cacheMisses,
                hitRate: this.performanceMetrics.cacheHits / (this.performanceMetrics.cacheHits + this.performanceMetrics.cacheMisses)
            },
            errors: this.performanceMetrics.errors,
            cacheSize: this.cache.size
        };
    }

    /**
     * Clear expired cache entries
     */
    cleanup() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (now > value.expiry) {
                this.cache.delete(key);
            }
        }
    }

    /**
     * Force refresh cache
     */
    refreshCache() {
        this.cache.clear();
        console.log('Python integration cache refreshed');
    }

    /**
     * Test specific Python tool functionality
     */
    async testTool(toolName) {
        try {
            const testData = this.getTestData(toolName);
            const result = await this.callPythonTool(toolName, testData);

            console.log(`✅ ${toolName} test passed:`, result);
            return { success: true, result };

        } catch (error) {
            console.error(`❌ ${toolName} test failed:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get test data for specific tools
     */
    getTestData(toolName) {
        switch (toolName) {
            case 'gloss_parser':
                return {
                    action: 'parse',
                    raw_gloss: 'V MedAct Pres <S:Erg> <DO:Dat>'
                };
            case 'verb_conjugation':
                return {
                    action: 'generate',
                    verb_data: {
                        georgian: 'დანახვა',
                        english: 'to see',
                        argument_pattern: '<S-DO>'
                    }
                };
            case 'example_generator':
                return {
                    action: 'generate',
                    verb_data: {
                        georgian: 'დანახვა',
                        english: 'to see'
                    },
                    argument_data: {
                        subject: 'student',
                        direct_object: 'book'
                    }
                };
            default:
                return { action: 'test' };
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PythonIntegration;
}
