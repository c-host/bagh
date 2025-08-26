/**
 * GNC Integration for Verb Editor
 * 
 * This module provides JavaScript integration with the Georgian National Corpus API
 * for automatic raw gloss generation and argument pattern detection in the verb editor.
 */

class GNCIntegration {
    constructor() {
        // Use local proxy server to avoid CORS issues
        this.proxyUrl = "http://localhost:5001/api/gnc";
        this.cache = new Map();

        // Tense mapping for validation
        this.tenseMapping = {
            "present": "Pres",
            "imperfect": "Impf",
            "future": "Fut",
            "aorist": "Aor",
            "optative": "Opt",
            "imperative": "Impv"
        };

        // Argument pattern mapping
        this.argumentPatterns = {
            "<S>": "Subject only",
            "<S-DO>": "Subject + Direct Object",
            "<S-IO>": "Subject + Indirect Object",
            "<S-DO-IO>": "Subject + Direct Object + Indirect Object"
        };

        // Forms to use for GNC analysis for each tense
        this.tenseAnalysisForms = {
            "present": "1sg",      // Use 1sg for present
            "imperfect": "1sg",    // Use 1sg for imperfect
            "future": "1sg",       // Use 1sg for future
            "aorist": "1sg",       // Use 1sg for aorist
            "optative": "1sg",     // Use 1sg for optative
            "imperative": "2sg"    // Use 2sg for imperative (fallback to 2pl if needed)
        };
    }

    /**
     * Check if the proxy server is available
     */
    async checkProxyHealth() {
        try {
            const response = await fetch(`${this.proxyUrl}/health`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.status === 'healthy';

        } catch (error) {
            console.error("Error checking proxy health:", error);
            return false;
        }
    }

    /**
     * Analyze a single verb form using GNC API via proxy
     */
    async analyzeVerbForm(verbForm) {
        // Check cache first
        if (this.cache.has(verbForm)) {
            return this.cache.get(verbForm);
        }

        try {
            // Use proxy server to analyze verb form
            const response = await fetch(`${this.proxyUrl}/analyze`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ verb_form: verbForm })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Extract analysis
            const analysis = this.extractAnalysis(result, verbForm);

            // Cache the result
            if (analysis && analysis.isValid) {
                this.cache.set(verbForm, analysis);
            }

            return analysis;

        } catch (error) {
            console.error(`Error analyzing verb form '${verbForm}':`, error);
            return null;
        }
    }

    /**
     * Extract analysis from GNC API response
     */
    extractAnalysis(result, verbForm) {
        if (!result.tokens || !result.tokens.length) {
            return null;
        }

        const token = result.tokens[0];
        if (!token.msa || !token.msa.length) {
            return null;
        }

        // Get the first analysis (most likely)
        const msa = token.msa[0];
        const lemma = msa.lemma || "";
        const features = msa.features || "";

        // Parse features
        const analysis = this.parseFeatures(features);
        analysis.word = verbForm;
        analysis.lemma = lemma;

        return analysis;
    }

    /**
     * Parse GNC features string into structured analysis
     */
    parseFeatures(features) {
        if (!features) {
            return {
                word: "",
                lemma: "",
                features: "",
                isValid: false,
                errorMessage: "No features provided"
            };
        }

        const parts = features.split(" ");

        // Extract tense
        let tense = null;
        for (const part of parts) {
            if (Object.values(this.tenseMapping).includes(part)) {
                tense = part;
                break;
            }
        }

        // Extract voice
        let voice = null;
        const voicePatterns = ["MedAct", "Act", "Pass", "MedPass"];
        for (const part of parts) {
            if (voicePatterns.includes(part)) {
                voice = part;
                break;
            }
        }

        // Extract argument pattern
        const argumentPattern = this.extractArgumentPattern(features);

        // Extract case markers
        const caseMarkers = this.extractCaseMarkers(features);

        return {
            word: "",
            lemma: "",
            features: features,
            tense: tense,
            voice: voice,
            argumentPattern: argumentPattern,
            caseMarkers: caseMarkers,
            isValid: true
        };
    }

    /**
     * Extract argument pattern from features string
     */
    extractArgumentPattern(features) {
        for (const pattern of Object.keys(this.argumentPatterns)) {
            if (features.includes(pattern)) {
                return pattern;
            }
        }
        return null;
    }

    /**
     * Extract case markers from features string
     */
    extractCaseMarkers(features) {
        const caseMarkers = {};

        // Subject case
        const subjectMatch = features.match(/<S:([A-Za-z]+)>/);
        if (subjectMatch) {
            caseMarkers.subject = subjectMatch[1];
        }

        // Direct object case
        const doMatch = features.match(/<DO:([A-Za-z]+)>/);
        if (doMatch) {
            caseMarkers.directObject = doMatch[1];
        }

        // Indirect object case
        const ioMatch = features.match(/<IO:([A-Za-z]+)>/);
        if (ioMatch) {
            caseMarkers.indirectObject = ioMatch[1];
        }

        return caseMarkers;
    }

    /**
     * Generate raw gloss from GNC analysis
     */
    generateRawGloss(analysis, expectedTense) {
        if (!analysis.isValid || !analysis.tense || !analysis.voice) {
            return "";
        }

        // Validate tense matches expected
        const expectedTenseAbbr = this.tenseMapping[expectedTense.toLowerCase()];
        if (!expectedTenseAbbr || analysis.tense !== expectedTenseAbbr) {
            return "";
        }

        // Build raw gloss
        const parts = ["V", analysis.voice, analysis.tense];

        // Add argument pattern and case markers
        if (analysis.argumentPattern) {
            parts.push(analysis.argumentPattern);

            // Add case markers in correct order
            if (analysis.caseMarkers) {
                if (analysis.caseMarkers.subject) {
                    parts.push(`<S:${analysis.caseMarkers.subject}>`);
                }
                if (analysis.caseMarkers.directObject) {
                    parts.push(`<DO:${analysis.caseMarkers.directObject}>`);
                }
                if (analysis.caseMarkers.indirectObject) {
                    parts.push(`<IO:${analysis.caseMarkers.indirectObject}>`);
                }
            }
        }

        return parts.join(" ");
    }

    /**
     * Generate raw gloss for a specific tense using appropriate form
     */
    async generateRawGlossForTense(conjugations, tense) {
        // Get the appropriate form for the tense
        const personKey = this.tenseAnalysisForms[tense.toLowerCase()];
        if (!personKey || !conjugations[personKey]) {
            return { rawGloss: "", error: `No ${personKey} form available for analysis` };
        }

        const verbForm = conjugations[personKey];
        if (!verbForm || verbForm.trim() === "") {
            return { rawGloss: "", error: `${personKey} form is empty` };
        }

        // Special handling for imperative: try 2sg first, then 2pl if needed
        if (tense.toLowerCase() === "imperative" && personKey === "2sg") {
            // Try 2sg first
            const analysis = await this.analyzeVerbForm(verbForm);
            if (analysis && analysis.isValid) {
                const rawGloss = this.generateRawGloss(analysis, tense);
                if (rawGloss) {
                    return { rawGloss, error: null };
                }
            }

            // If 2sg failed, try 2pl
            if (conjugations["2pl"] && conjugations["2pl"].trim() !== "") {
                const verbForm2pl = conjugations["2pl"];
                const analysis2pl = await this.analyzeVerbForm(verbForm2pl);
                if (analysis2pl && analysis2pl.isValid) {
                    const rawGloss2pl = this.generateRawGloss(analysis2pl, tense);
                    if (rawGloss2pl) {
                        return { rawGloss: rawGloss2pl, error: null };
                    }
                }
            }
        }

        // Standard analysis for other tenses
        const analysis = await this.analyzeVerbForm(verbForm);
        if (!analysis) {
            return { rawGloss: "", error: "Failed to analyze verb form" };
        }

        if (!analysis.isValid) {
            return { rawGloss: "", error: analysis.errorMessage || "Invalid analysis" };
        }

        // Generate raw gloss
        const rawGloss = this.generateRawGloss(analysis, tense);
        if (!rawGloss) {
            return { rawGloss: "", error: `Could not generate raw gloss for ${tense} tense` };
        }

        return { rawGloss, error: null };
    }

    /**
     * Extract argument pattern from raw gloss for dropdown selection
     */
    getArgumentPatternFromRawGloss(rawGloss) {
        if (!rawGloss) {
            return null;
        }

        // Extract argument pattern from raw gloss
        for (const pattern of Object.keys(this.argumentPatterns)) {
            if (rawGloss.includes(pattern)) {
                return pattern;
            }
        }

        return null;
    }

    /**
     * Process all conjugations for a verb and generate raw glosses
     */
    async processVerbConjugations(conjugationsData) {
        const results = {
            rawGlosses: {},
            argumentPattern: null,
            successCount: 0,
            errorCount: 0,
            errors: [],
            autoGenerated: true
        };

        // Process each tense
        for (const [tense, conjugations] of Object.entries(conjugationsData)) {
            const { rawGloss, error } = await this.generateRawGlossForTense(conjugations, tense);

            if (rawGloss) {
                results.rawGlosses[tense] = rawGloss;
                results.successCount++;

                // Use first successful raw gloss to determine argument pattern
                if (!results.argumentPattern) {
                    results.argumentPattern = this.getArgumentPatternFromRawGloss(rawGloss);
                }
            } else {
                results.errors.push(`${tense}: ${error}`);
                results.errorCount++;
            }
        }

        return results;
    }

    /**
     * Get fallback instructions for manual GNC lookup
     */
    getFallbackInstructions(verbForm) {
        return `GNC API unavailable. Please ensure the proxy server is running (python src/data/verb_editor/servers/start_gnc_server.py) or visit https://clarino.uib.no/gnc/page?page-id=gnc-main-page, select the GNC corpus from the Corpus list tab, and search for '${verbForm}' in the Query tab to find the raw gloss in the Features section of the query results.`;
    }

    /**
     * Clear the analysis cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Get cache statistics
     */
    async getCacheStats() {
        try {
            const response = await fetch(`${this.proxyUrl}/cache/stats`);
            if (response.ok) {
                const proxyStats = await response.json();
                return {
                    cachedForms: this.cache.size,
                    proxyCachedForms: proxyStats.cached_forms,
                    sessionId: proxyStats.session_id,
                    sessionAge: proxyStats.session_age
                };
            }
        } catch (error) {
            console.error("Error getting cache stats:", error);
        }

        return {
            cachedForms: this.cache.size,
            proxyCachedForms: 0,
            sessionId: null,
            sessionAge: null
        };
    }
}

/**
 * Verb Editor GNC Integration
 * 
 * This class handles the integration between the verb editor and GNC API
 */
class VerbEditorGNCIntegration {
    constructor(verbEditor) {
        this.verbEditor = verbEditor;
        this.gnc = new GNCIntegration();
        this.isProcessing = false;
    }

    /**
     * Automatically generate raw glosses after conjugation scraping
     */
    async autoGenerateRawGlosses(conjugationsData) {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;

        try {
            // Show loading state
            this.showLoadingState();

            // Check if proxy server is available
            const proxyHealthy = await this.gnc.checkProxyHealth();
            if (!proxyHealthy) {
                throw new Error("GNC proxy server is not available. Please start it with: python src/data/verb_editor/servers/start_gnc_server.py");
            }

            // Process conjugations
            const results = await this.gnc.processVerbConjugations(conjugationsData);

            if (results.successCount > 0) {
                // Populate raw gloss fields
                this.populateRawGlossFields(results.rawGlosses);

                // Set argument pattern if found
                if (results.argumentPattern) {
                    this.setArgumentPattern(results.argumentPattern);
                }

                // Show success message
                this.showSuccessMessage(results);
            } else {
                // Show error message with fallback instructions
                this.showErrorMessage(results);
            }

        } catch (error) {
            console.error("Error in auto-generating raw glosses:", error);
            this.showErrorMessage({
                errors: [error.message],
                fallbackInstructions: this.gnc.getFallbackInstructions("verb_form")
            });
        } finally {
            this.isProcessing = false;
            this.hideLoadingState();
        }
    }

    /**
     * Populate raw gloss fields with generated values
     */
    populateRawGlossFields(rawGlosses) {
        for (const [tense, rawGloss] of Object.entries(rawGlosses)) {
            const rawGlossElement = document.getElementById(`rawGloss_${tense}`);
            if (rawGlossElement) {
                rawGlossElement.value = rawGloss;
                rawGlossElement.classList.add("auto-generated");

                // Add auto-generated indicator
                this.addAutoGeneratedIndicator(rawGlossElement, tense);

                // Trigger validation
                if (this.verbEditor.validateRawGloss) {
                    this.verbEditor.validateRawGloss(rawGlossElement);
                }
            }
        }
    }

    /**
     * Add auto-generated indicator to raw gloss field
     */
    addAutoGeneratedIndicator(element, tense) {
        // Remove existing indicator
        const existingIndicator = element.parentElement.querySelector(".auto-generated-indicator");
        if (existingIndicator) {
            existingIndicator.remove();
        }

        // Create new indicator
        const indicator = document.createElement("div");
        indicator.className = "auto-generated-indicator";
        indicator.innerHTML = `
            <span class="indicator-icon">🤖</span>
            <span class="indicator-text">Auto-generated from GNC API</span>
        `;
        indicator.style.cssText = `
            font-size: 12px;
            color: #28a745;
            margin-top: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
        `;

        element.parentElement.appendChild(indicator);
    }

    /**
     * Set argument pattern dropdown
     */
    setArgumentPattern(pattern) {
        const argumentPatternSelect = document.getElementById("argumentPattern");
        if (argumentPatternSelect) {
            argumentPatternSelect.value = pattern;

            // Trigger change event to update UI
            const event = new Event("change", { bubbles: true });
            argumentPatternSelect.dispatchEvent(event);
        }
    }

    /**
     * Show loading state
     */
    showLoadingState() {
        // Add loading overlay to conjugations section
        const conjugationsSection = document.getElementById("conjugationsSection");
        if (conjugationsSection) {
            const loadingOverlay = document.createElement("div");
            loadingOverlay.id = "gncLoadingOverlay";
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <div class="loading-text">Analyzing verb forms with GNC API...</div>
                </div>
            `;
            loadingOverlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            `;

            conjugationsSection.style.position = "relative";
            conjugationsSection.appendChild(loadingOverlay);
        }
    }

    /**
     * Hide loading state
     */
    hideLoadingState() {
        const loadingOverlay = document.getElementById("gncLoadingOverlay");
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    /**
     * Show success message
     */
    showSuccessMessage(results) {
        const message = `Successfully generated ${results.successCount} raw glosses automatically from GNC API`;
        if (this.verbEditor.showSuccess) {
            this.verbEditor.showSuccess(message);
        } else {
            console.log(message);
        }
    }

    /**
     * Show error message with fallback instructions
     */
    showErrorMessage(results) {
        let message = "Failed to generate raw glosses automatically";

        if (results.errors && results.errors.length > 0) {
            message += `: ${results.errors.join(", ")}`;
        }

        if (results.fallbackInstructions) {
            message += `\n\n${results.fallbackInstructions}`;
        }

        if (this.verbEditor.showError) {
            this.verbEditor.showError(message);
        } else {
            console.error(message);
        }
    }

    /**
     * Remove auto-generated indicators
     */
    removeAutoGeneratedIndicators() {
        const indicators = document.querySelectorAll(".auto-generated-indicator");
        indicators.forEach(indicator => indicator.remove());

        const autoGeneratedFields = document.querySelectorAll(".auto-generated");
        autoGeneratedFields.forEach(field => field.classList.remove("auto-generated"));
    }
}

// Export for use in main verb editor
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GNCIntegration, VerbEditorGNCIntegration };
}
