/**
 * Main Verb Editor Application
 * Performance Optimized Implementation
 */

class VerbEditor {
    // Performance optimization properties - initialized as class fields
    performanceMetrics = {
        renderTimes: {},
        eventTimes: {},
        memoryUsage: 0,
        domOperations: 0
    };
    debounceTimers = new Map();
    throttleTimers = new Map();
    observerCallbacks = new Map();
    elementCache = new Map();
    virtualScrolling = {
        enabled: false,
        itemHeight: 60,
        visibleItems: 10,
        totalItems: 0
    };
    startTime = performance.now();

    constructor() {
        this.database = null;
        this.currentVerb = null;
        this.scrapedData = null;

        try {
            this.database = new Database();
            this.validationEngine = new ValidationEngine();
            this.storageManager = new StorageManager();
            this.scraperIntegration = new ScraperIntegration();
            this.progressiveDisclosure = new ProgressiveDisclosure();

            // Initialize GNC integration
            this.gncIntegration = new VerbEditorGNCIntegration(this);

            this.debugHelper = null; // Will be initialized after components are ready

            this.initialize();
        } catch (error) {
            console.error('🔍 Error in VerbEditor constructor:', error);
            throw error;
        }
    }

    async initialize() {
        try {
            const initStartTime = performance.now();

            await this.database.initialize();
            this.setupProgressiveDisclosure();
            this.setupValidationRules();
            this.generateConjugationForms();
            this.setupExampleGeneration();
            this.initializeDebugHelper();

            // Test localStorage functionality
            this.testStorage();

            // Load saved data from localStorage on page load
            await this.loadSavedData();

            // Setup auto-save after all methods are available
            this.setupAutoSave();

            // Setup event listeners AFTER auto-save is configured
            this.setupEventListeners();

            // Performance monitoring
            this.performanceMetrics.renderTimes.initialization = performance.now() - initStartTime;
        } catch (error) {
            console.error('Failed to initialize Verb Editor:', error);
            console.error('Error details:', {
                name: error.name,
                message: error.message,
                stack: error.stack,
                constructor: error.constructor?.name
            });

            // Use a simple error display during initialization since showError might not be available yet
            try {
                this.showError(`Failed to initialize application: ${error.message || error.name || 'Unknown error'}. Please refresh the page.`);
            } catch (displayError) {
                console.error('Failed to display error:', displayError);
                alert(`Failed to initialize application: ${error.message || error.name || 'Unknown error'}. Please refresh the page.`);
            }
        }
    }

    async loadCategories() {
        // Categories are now loaded by the Database class
        // This method is kept for backward compatibility
    }

    async loadDatabases() {
        // Databases are now loaded by the Database class
        // This method is kept for backward compatibility
    }

    /**
     * Load saved data from localStorage on page load
     */
    async loadSavedData() {
        try {
            const savedData = await this.storageManager.loadProgress();
            if (savedData) {
                this.currentVerb = savedData;
                this.populateFormWithSavedData(savedData);

                // Show success message
                this.showSuccess('📁 Previous work restored from local storage');
                console.log('[STORAGE] Successfully loaded saved data from localStorage');
            }
        } catch (error) {
            console.warn('Failed to load saved data:', error);
        }
    }

    /**
     * Populate form with saved data from localStorage
     */
    populateFormWithSavedData(savedData) {
        // Populate basic fields
        if (savedData.georgian) {
            const georgianField = document.getElementById('georgian');
            if (georgianField) georgianField.value = savedData.georgian;
        }
        if (savedData.description) {
            const descriptionField = document.getElementById('description');
            if (descriptionField) descriptionField.value = savedData.description;
        }
        if (savedData.category) {
            const categoryField = document.getElementById('category');
            if (categoryField) categoryField.value = savedData.category;
        }
        if (savedData.class) {
            const verbClassField = document.getElementById('verbClass');
            if (verbClassField) verbClassField.value = savedData.class;
        }
        if (savedData.semantic_key) {
            const semanticKeyField = document.getElementById('semanticKey');
            if (semanticKeyField) semanticKeyField.value = savedData.semantic_key;
        }
        if (savedData.notes) {
            const notesField = document.getElementById('notes');
            if (notesField) notesField.value = savedData.notes;
        }
        if (savedData.url) {
            const urlField = document.getElementById('url');
            if (urlField) urlField.value = savedData.url;
        }

        // Populate English translations
        if (savedData.english_translations && savedData.english_translations.default) {
            const translations = savedData.english_translations.default;
            if (translations.present) {
                const field = document.getElementById('translationPresent');
                if (field) field.value = translations.present;
            }
            if (translations.imperfect) {
                const field = document.getElementById('translationImperfect');
                if (field) field.value = translations.imperfect;
            }
            if (translations.future) {
                const field = document.getElementById('translationFuture');
                if (field) field.value = translations.future;
            }
            if (translations.aorist) {
                const field = document.getElementById('translationAorist');
                if (field) field.value = translations.aorist;
            }
            if (translations.optative) {
                const field = document.getElementById('translationOptative');
                if (field) field.value = translations.optative;
            }
            if (translations.imperative) {
                const field = document.getElementById('translationImperative');
                if (field) field.value = translations.imperative;
            }
        }

        // Handle argument pattern
        if (savedData.argument_pattern) {
            const argumentPatternField = document.getElementById('argumentPattern');
            if (argumentPatternField) {
                argumentPatternField.value = savedData.argument_pattern;
                this.handleArgumentPatternChange(savedData.argument_pattern);

                // Wait longer for argument fields to be generated, then restore values
                setTimeout(() => {
                    if (savedData.syntax && savedData.syntax.arguments) {
                        this.populateArgumentsWithSavedData(savedData.syntax.arguments).catch(error => {
                            console.error('[STORAGE] Error populating arguments after pattern change:', error);
                        });
                    }
                }, 300); // Increased delay for better stability
            }
        }

        // Handle arguments and prepositions
        if (savedData.syntax && savedData.syntax.prepositions) {
            const prepositions = savedData.syntax.prepositions;
            if (prepositions.subject) {
                const field = document.getElementById('subjectPreposition');
                if (field) field.value = prepositions.subject;
            }
            if (prepositions.direct_object) {
                const field = document.getElementById('directObjectPreposition');
                if (field) field.value = prepositions.direct_object;
            }
            if (prepositions.indirect_object) {
                const field = document.getElementById('indirectObjectPreposition');
                if (field) field.value = prepositions.indirect_object;
            }
        }

        // Handle arguments data (nouns and adjectives) - only if no argument pattern to avoid duplication
        if (savedData.syntax && savedData.syntax.arguments && !savedData.argument_pattern) {
            this.populateArgumentsWithSavedData(savedData.syntax.arguments).catch(error => {
                console.error('[STORAGE] Error populating arguments:', error);
            });
        }

        // Handle conjugations
        if (savedData.conjugations) {
            this.loadConjugations(savedData.conjugations);
        }

        // Handle preverb configuration
        if (savedData.preverb_config && savedData.preverb_config.has_multiple_preverbs) {
            const radioButton = document.querySelector('input[name="hasMultiplePreverbs"][value="true"]');
            if (radioButton) {
                radioButton.checked = true;
                this.handlePreverbChange('true');
            }

            // Populate preverb configuration fields
            this.populatePreverbConfigWithSavedData(savedData.preverb_config);
        }

        // Update progressive disclosure after populating fields
        this.updateProgressiveDisclosure();

        // Initialize preverb selection after form is populated
        setTimeout(() => {
            this.initializePreverbSelectionForAllTenses();
        }, 200);
    }

    /**
 * Populate argument dropdowns with saved data
 */
    async populateArgumentsWithSavedData(argumentsData) {
        // First, ensure databases are loaded
        await this.ensureDatabasesLoaded();

        // Use a more robust approach to wait for argument fields to be generated
        const maxAttempts = 20; // Increased attempts
        let attempts = 0;

        const tryPopulateArguments = () => {
            attempts++;

            // Check if argument fields exist and have options
            const hasArgumentFields = document.querySelectorAll('.noun-select, .adjective-select').length > 0;
            const hasNounOptions = document.querySelectorAll('.noun-select option').length > 1; // More than just "Select noun"

            if (hasArgumentFields && hasNounOptions) {
                // Fields exist and have options, populate them
                let populatedCount = 0;

                Object.keys(argumentsData).forEach(argType => {
                    const argData = argumentsData[argType];
                    Object.keys(argData).forEach(person => {
                        const personData = argData[person];

                        // Find the noun select element
                        const nounSelect = document.querySelector(`.noun-select[data-arg="${argType}"][data-person="${person}"]`);
                        if (nounSelect && personData.noun) {
                            // Check if the option exists before setting value
                            const optionExists = Array.from(nounSelect.options).some(option => option.value === personData.noun);
                            if (optionExists) {
                                nounSelect.value = personData.noun;
                                populatedCount++;
                                console.log(`[STORAGE] Set noun for ${argType} ${person}: ${personData.noun}`);
                            } else {
                                console.warn(`[STORAGE] Noun option not found: ${personData.noun} for ${argType} ${person}`);
                            }
                        }

                        // Find the adjective select element
                        const adjectiveSelect = document.querySelector(`.adjective-select[data-arg="${argType}"][data-person="${person}"]`);
                        if (adjectiveSelect && personData.adjective) {
                            // Check if the option exists before setting value
                            const optionExists = Array.from(adjectiveSelect.options).some(option => option.value === personData.adjective);
                            if (optionExists) {
                                adjectiveSelect.value = personData.adjective;
                                populatedCount++;
                                console.log(`[STORAGE] Set adjective for ${argType} ${person}: ${personData.adjective}`);
                            } else {
                                console.warn(`[STORAGE] Adjective option not found: ${personData.adjective} for ${argType} ${person}`);
                            }
                        }
                    });
                });

                console.log(`[STORAGE] Arguments populated successfully: ${populatedCount} values restored`);

                // Trigger auto-save to ensure the restored values are saved
                setTimeout(() => {
                    this.autoSave();
                }, 100);

            } else if (attempts < maxAttempts) {
                // Fields don't exist yet or don't have options, try again with shorter delay
                setTimeout(tryPopulateArguments, 200);
            } else {
                console.warn('[STORAGE] Failed to populate arguments after maximum attempts');
                console.warn('[STORAGE] Fields exist:', hasArgumentFields, 'Options exist:', hasNounOptions);
            }
        };

        // Start the population process
        tryPopulateArguments();
    }

    /**
     * Ensure all required databases are loaded
     */
    async ensureDatabasesLoaded() {
        if (!this.database || !this.database.loaded) {
            console.log('[STORAGE] Waiting for database to load...');
            await this.database.initialize();
        }

        // Load specific databases if they're empty
        const databasesToLoad = [];

        if (Object.keys(this.database.subjects).length === 0) {
            databasesToLoad.push('subjects');
        }
        if (Object.keys(this.database.directObjects).length === 0) {
            databasesToLoad.push('direct_objects');
        }
        if (Object.keys(this.database.indirectObjects).length === 0) {
            databasesToLoad.push('indirect_objects');
        }
        if (Object.keys(this.database.adjectives).length === 0) {
            databasesToLoad.push('adjectives');
        }

        if (databasesToLoad.length > 0) {
            console.log('[STORAGE] Loading databases:', databasesToLoad);

            for (const dbType of databasesToLoad) {
                switch (dbType) {
                    case 'subjects':
                        await this.database.loadSubjectDatabase();
                        break;
                    case 'direct_objects':
                        await this.database.loadDirectObjectDatabase();
                        break;
                    case 'indirect_objects':
                        await this.database.loadIndirectObjectDatabase();
                        break;
                    case 'adjectives':
                        await this.database.loadAdjectiveDatabase();
                        break;
                }
            }

            console.log('[STORAGE] Databases loaded successfully');

            // Refresh dropdown options after loading databases
            this.refreshDropdownOptions();
        }
    }

    /**
     * Refresh dropdown options after databases are loaded
     */
    refreshDropdownOptions() {
        console.log('[STORAGE] Refreshing dropdown options...');

        // Refresh noun dropdowns
        const nounSelects = document.querySelectorAll('.noun-select');
        nounSelects.forEach(select => {
            const argType = select.getAttribute('data-arg');
            const databaseType = this.getArgumentType(argType);
            const currentValue = select.value;

            // Get fresh options
            const nounOptions = this.database.getNounOptions(databaseType);
            const htmlOptions = nounOptions
                .map(option => `<option value="${option.value}">${option.label}</option>`)
                .join('');

            // Update options
            select.innerHTML = '<option value="">Select noun</option>' + htmlOptions;

            // Restore value if it exists in new options
            if (currentValue && nounOptions.some(option => option.value === currentValue)) {
                select.value = currentValue;
            }
        });

        // Refresh adjective dropdowns
        const adjectiveSelects = document.querySelectorAll('.adjective-select');
        adjectiveSelects.forEach(select => {
            const currentValue = select.value;

            // Get fresh options
            const adjectiveOptions = this.database.getAdjectiveOptions();
            const htmlOptions = adjectiveOptions
                .map(option => `<option value="${option.value}">${option.label}</option>`)
                .join('');

            // Update options
            select.innerHTML = '<option value="">Select adjective</option>' + htmlOptions;

            // Restore value if it exists in new options
            if (currentValue && adjectiveOptions.some(option => option.value === currentValue)) {
                select.value = currentValue;
            }
        });

        console.log('[STORAGE] Dropdown options refreshed');
    }

    /**
     * Populate preverb configuration with saved data
     */
    populatePreverbConfigWithSavedData(preverbConfig) {
        console.log('[STORAGE] Restoring preverb configuration:', preverbConfig);

        // Set default preverb
        if (preverbConfig.default_preverb) {
            const defaultPreverbField = document.getElementById('defaultPreverb');
            if (defaultPreverbField) {
                defaultPreverbField.value = preverbConfig.default_preverb;
                console.log('[STORAGE] Set default preverb:', preverbConfig.default_preverb);
            }
        }

        // Set available preverbs checkboxes
        if (preverbConfig.available_preverbs && Array.isArray(preverbConfig.available_preverbs)) {
            preverbConfig.available_preverbs.forEach(preverb => {
                const checkbox = document.querySelector(`input[name="availablePreverbs"][value="${preverb}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                    console.log('[STORAGE] Set available preverb:', preverb);
                }
            });
        }

        // Handle advanced configuration with delays to ensure UI is ready
        setTimeout(() => {
            if (preverbConfig.has_complex_rules !== undefined) {
                const hasComplexRulesCheckbox = document.getElementById('hasComplexRules');
                if (hasComplexRulesCheckbox) {
                    hasComplexRulesCheckbox.checked = preverbConfig.has_complex_rules;
                    // Trigger change event to show/hide complex rules content
                    this.handleComplexRulesChange(preverbConfig.has_complex_rules);
                    console.log('[STORAGE] Set complex rules:', preverbConfig.has_complex_rules);
                }
            }

            if (preverbConfig.has_argument_overrides !== undefined) {
                const hasArgumentOverridesCheckbox = document.getElementById('hasArgumentOverrides');
                if (hasArgumentOverridesCheckbox) {
                    hasArgumentOverridesCheckbox.checked = preverbConfig.has_argument_overrides;
                    // Trigger change event to show/hide argument overrides content
                    this.handleArgumentOverridesChange(preverbConfig.has_argument_overrides);
                    console.log('[STORAGE] Set argument overrides:', preverbConfig.has_argument_overrides);
                }
            }
        }, 100);

        // Restore complex rules data if available
        if (preverbConfig.has_complex_rules && preverbConfig.rules) {
            setTimeout(() => {
                this.restoreComplexRulesData(preverbConfig.rules);
            }, 200);
        }

        // Restore argument overrides data if available
        if (preverbConfig.has_argument_overrides && preverbConfig.overrides) {
            setTimeout(() => {
                this.restoreArgumentOverridesData(preverbConfig.overrides);
            }, 300);
        }

        // Restore translation overrides data if available
        if (preverbConfig.translations) {
            setTimeout(() => {
                this.restoreTranslationOverridesData(preverbConfig.translations);
            }, 400);
        }

        // Trigger auto-save after restoration
        setTimeout(() => {
            this.autoSave();
        }, 500);
    }

    /**
     * Handle complex rules checkbox change
     */
    handleComplexRulesChange(hasComplexRules) {
        const complexRulesContent = document.getElementById('complexRulesContent');
        if (complexRulesContent) {
            if (hasComplexRules) {
                complexRulesContent.classList.remove('hidden');
            } else {
                complexRulesContent.classList.add('hidden');
            }
        }
        // Update progressive disclosure
        this.updateProgressiveDisclosure();
    }

    /**
     * Handle argument overrides checkbox change
     */
    handleArgumentOverridesChange(hasArgumentOverrides) {
        const argumentOverridesContent = document.getElementById('argumentOverridesContent');
        if (argumentOverridesContent) {
            if (hasArgumentOverrides) {
                argumentOverridesContent.classList.remove('hidden');
            } else {
                argumentOverridesContent.classList.add('hidden');
            }
        }
        // Update progressive disclosure
        this.updateProgressiveDisclosure();
    }

    /**
     * Restore complex rules data from saved configuration
     */
    restoreComplexRulesData(rules) {
        // Restore tense-specific fallbacks
        if (rules.tense_specific_fallbacks) {
            // Group fallbacks by preverb and fallback combination to avoid duplicates
            const fallbackGroups = new Map();

            Object.entries(rules.tense_specific_fallbacks).forEach(([preverb, tenseFallbacks]) => {
                Object.entries(tenseFallbacks).forEach(([tense, fallback]) => {
                    const key = `${preverb}-${fallback}`;
                    if (!fallbackGroups.has(key)) {
                        fallbackGroups.set(key, {
                            preverb: preverb,
                            fallback: fallback,
                            tenses: []
                        });
                    }
                    fallbackGroups.get(key).tenses.push(tense);
                });
            });

            // Create one rule per preverb-fallback combination with all its tenses
            fallbackGroups.forEach((group) => {
                this.addTenseFallbackWithData(group.preverb, group.tenses, group.fallback);
            });
        }
    }

    /**
     * Restore argument overrides data from saved configuration
     */
    restoreArgumentOverridesData(overrides) {
        Object.entries(overrides).forEach(([preverb, overrideData]) => {
            if (overrideData.arguments) {
                const selectedArguments = Object.keys(overrideData.arguments);
                this.addPreverbOverrideWithData(preverb, selectedArguments, overrideData.arguments);
            }
        });
    }

    /**
     * Restore translation overrides data from saved configuration
     */
    restoreTranslationOverridesData(translations) {
        Object.entries(translations).forEach(([preverb, translationData]) => {
            this.addPreverbTranslationWithData(preverb, translationData);
        });
    }

    /**
     * Add tense fallback with pre-populated data
     */
    addTenseFallbackWithData(preverb, tenses, fallback) {
        // First add a new fallback item
        this.addTenseFallback();

        // Get the last added fallback item
        const fallbackItems = document.querySelectorAll('.fallback-item');
        const lastItem = fallbackItems[fallbackItems.length - 1];

        if (lastItem) {
            const fallbackId = lastItem.id;

            // Set the preverb
            const preverbSelect = lastItem.querySelector('[data-field="preverb"]');
            if (preverbSelect) {
                preverbSelect.value = preverb;
            }

            // Set the fallback preverb
            const fallbackSelect = lastItem.querySelector('[data-field="fallback"]');
            if (fallbackSelect) {
                fallbackSelect.value = fallback;
            }

            // Check all the specified tense checkboxes
            if (Array.isArray(tenses)) {
                tenses.forEach(tense => {
                    const tenseCheckbox = lastItem.querySelector(`input[type="checkbox"][value="${tense}"]`);
                    if (tenseCheckbox) {
                        tenseCheckbox.checked = true;
                    }
                });
            } else {
                // Handle single tense for backward compatibility
                const tenseCheckbox = lastItem.querySelector(`input[type="checkbox"][value="${tenses}"]`);
                if (tenseCheckbox) {
                    tenseCheckbox.checked = true;
                }
            }
        }
    }

    /**
     * Add preverb override with pre-populated data
     */
    addPreverbOverrideWithData(preverb, selectedArguments, argumentData) {
        // First add a new override item
        this.addPreverbOverride();

        // Get the last added override item
        const overrideItems = document.querySelectorAll('.override-item');
        const lastItem = overrideItems[overrideItems.length - 1];

        if (lastItem) {
            const overrideId = lastItem.id;

            // Set the preverb
            const preverbSelect = lastItem.querySelector('[data-field="preverb"]');
            if (preverbSelect) {
                preverbSelect.value = preverb;
                // Trigger the change event to show argument fields
                this.handlePreverbOverrideChange(overrideId, preverb);
            }

            // Check the selected arguments
            selectedArguments.forEach(argType => {
                const argCheckbox = lastItem.querySelector(`input[type="checkbox"][value="${argType}"]`);
                if (argCheckbox) {
                    argCheckbox.checked = true;
                }
            });

            // Trigger argument override change to generate fields
            this.handleArgumentOverrideChange(overrideId);

            // Populate argument data after fields are generated
            setTimeout(() => {
                this.populateOverrideArgumentData(overrideId, argumentData);
            }, 100);
        }
    }

    /**
     * Add preverb translation with pre-populated data
     */
    addPreverbTranslationWithData(preverb, translationData) {
        // First add a new translation item
        this.addPreverbTranslation();

        // Get the last added translation item
        const translationItems = document.querySelectorAll('.translation-item');
        const lastItem = translationItems[translationItems.length - 1];

        if (lastItem) {
            const translationId = lastItem.id;

            // Set the preverb
            const preverbSelect = lastItem.querySelector('[data-field="preverb"]');
            if (preverbSelect) {
                preverbSelect.value = preverb;
                // Trigger the change event to show translation fields
                this.handlePreverbTranslationChange(translationId, preverb);
            }

            // Populate translation data
            Object.entries(translationData).forEach(([tense, translation]) => {
                const translationInput = document.getElementById(`translation${tense.charAt(0).toUpperCase() + tense.slice(1)}_${translationId}`);
                if (translationInput) {
                    translationInput.value = translation;
                }
            });
        }
    }

    /**
     * Populate override argument data after fields are generated
     */
    populateOverrideArgumentData(overrideId, argumentData) {
        Object.entries(argumentData).forEach(([argType, personData]) => {
            Object.entries(personData).forEach(([person, data]) => {
                const nounSelect = document.querySelector(`[data-override-id="${overrideId}"][data-arg="${argType}"][data-person="${person}"].noun-select`);
                const adjectiveSelect = document.querySelector(`[data-override-id="${overrideId}"][data-arg="${argType}"][data-person="${person}"].adjective-select`);

                if (nounSelect && data.noun) {
                    nounSelect.value = data.noun;
                }
                if (adjectiveSelect && data.adjective) {
                    adjectiveSelect.value = data.adjective;
                }
            });
        });
    }

    setupEventListeners() {
        // Helper function to safely add event listener
        const addEventListenerSafely = (elementId, event, handler) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.addEventListener(event, handler);
            } else {
                console.warn(`🔍 [EVENTS] Element not found: ${elementId}`);
            }
        };

        // Header controls
        addEventListenerSafely('newVerbBtn', 'click', () => this.newVerb());
        addEventListenerSafely('loadVerbBtn', 'click', () => this.loadVerb());
        addEventListenerSafely('saveVerbBtn', 'click', () => this.saveVerb());
        addEventListenerSafely('previewJsonBtn', 'click', () => this.showJsonPreview());
        addEventListenerSafely('clearSavedDataBtn', 'click', () => this.clearSavedData());

        // Form actions
        addEventListenerSafely('scrapeBtn', 'click', () => this.scrapeFromUrl());
        addEventListenerSafely('clearFormBtn', 'click', () => this.clearForm());

        // Conjugation actions

        addEventListenerSafely('enableManualEditBtn', 'click', () => this.enableManualEditing());
        addEventListenerSafely('disableManualEditBtn', 'click', () => this.disableManualEditing());

        // Preverb configuration actions
        addEventListenerSafely('addTenseFallbackBtn', 'click', () => this.addTenseFallback());
        addEventListenerSafely('addPreverbOverrideBtn', 'click', () => this.addPreverbOverride());
        addEventListenerSafely('addPreverbTranslationBtn', 'click', () => this.addPreverbTranslation());

        // Form field changes
        addEventListenerSafely('argumentPattern', 'change', (e) => this.handleArgumentPatternChange(e.target.value));

        // Preposition field changes
        addEventListenerSafely('subjectPreposition', 'input', (e) => this.handlePrepositionChange('subject', e.target.value));
        addEventListenerSafely('directObjectPreposition', 'input', (e) => this.handlePrepositionChange('directObject', e.target.value));
        addEventListenerSafely('indirectObjectPreposition', 'input', (e) => this.handlePrepositionChange('indirectObject', e.target.value));

        // Handle preverb radio button changes
        const preverbRadios = document.querySelectorAll('input[name="hasMultiplePreverbs"]');
        preverbRadios.forEach(radio => {
            radio.addEventListener('change', (e) => this.handlePreverbChange(e.target.value));
        });

        // Handle available preverbs checkbox changes
        const availablePreverbCheckboxes = document.querySelectorAll('input[name="availablePreverbs"]');
        availablePreverbCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updatePreverbDropdowns());
        });

        // Error and success message controls
        addEventListenerSafely('closeErrorsBtn', 'click', () => this.hideErrors());
        addEventListenerSafely('closeSuccessBtn', 'click', () => this.hideSuccess());

        // JSON Preview Modal controls
        addEventListenerSafely('closeJsonPreviewBtn', 'click', () => this.hideJsonPreview());
        addEventListenerSafely('copyJsonBtn', 'click', () => this.copyJsonToClipboard());
        addEventListenerSafely('downloadJsonBtn', 'click', () => this.downloadJson());


    }

    setupProgressiveDisclosure() {
        // Helper function to safely add section
        const addSectionSafely = (sectionId, condition) => {
            const element = document.getElementById(sectionId);
            if (element) {
                this.progressiveDisclosure.addSection(sectionId, element, condition);
            } else {
                console.warn(`🔍 [PROGRESSIVE] Section element not found: ${sectionId}`);
            }
        };

        // Add sections with their visibility conditions
        addSectionSafely('argumentsSection', (formState) => formState.argumentPattern);
        addSectionSafely('preverbConfigContent', (formState) => formState.hasMultiplePreverbs === 'true');

        // Add progressive disclosure for complex preverb rules
        const complexRulesContent = document.getElementById('complexRulesContent');
        if (complexRulesContent) {
            this.progressiveDisclosure.addSection(
                'complexRulesContent',
                complexRulesContent,
                (formState) => formState.hasComplexRules === true
            );
        }

        addSectionSafely('argumentOverridesContent', (formState) => formState.hasArgumentOverrides === true);

        // Update visibility when form changes
        this.progressiveDisclosure.updateVisibility();
    }

    setupValidationRules() {
        // Add validation rules for each field
        this.validationEngine.addRule('georgian', (value) => {
            if (!value.trim()) return 'Georgian text is required';
            if (!/^[ა-ჰ\s]+$/.test(value)) return 'Georgian text must contain only Georgian characters';
            return true;
        });

        this.validationEngine.addRule('description', (value) => {
            if (!value.trim()) return 'Description is required';
            return true;
        });

        this.validationEngine.addRule('category', (value) => {
            if (!value.trim()) return 'Category is required';
            return true;
        });

        this.validationEngine.addRule('argumentPattern', (value) => {
            if (!value.trim()) return 'Argument pattern is required';

            // Validate specific pattern combinations
            const validPatterns = ['<S>', '<S-DO>', '<S-IO>', '<S-DO-IO>'];
            if (!validPatterns.includes(value)) {
                return 'Invalid argument pattern. Please select from the dropdown options.';
            }

            return true;
        });

        this.validationEngine.addRule('semanticKey', (value) => {
            if (!value.trim()) return 'Semantic key is required';
            if (!/^[a-z_]+$/.test(value)) return 'Semantic key must contain only lowercase letters and underscores';
            return true;
        });

        // Add validation for preposition fields
        this.validationEngine.addRule('subjectPreposition', (value) => {
            if (!value.trim()) return 'Subject preposition is required';
            if (!/^[a-zA-Z\s]+$/.test(value)) return 'Subject preposition must contain only letters and spaces';
            return true;
        });

        this.validationEngine.addRule('directObjectPreposition', (value) => {
            if (!value.trim()) return 'Direct object preposition is required';
            if (!/^[a-zA-Z\s]+$/.test(value)) return 'Direct object preposition must contain only letters and spaces';
            return true;
        });

        this.validationEngine.addRule('indirectObjectPreposition', (value) => {
            // Indirect object preposition is optional
            if (value && !/^[a-zA-Z\s]+$/.test(value)) return 'Indirect object preposition must contain only letters and spaces';
            return true;
        });

        // Add validation for raw gloss fields
        this.validationEngine.addRule('rawGloss', (value) => {
            if (!value.trim()) return 'Raw gloss is required for each tense';
            if (!/^<[SDOI]:[A-Za-z]+>(\s+<[SDOI]:[A-Za-z]+>)*$/.test(value)) {
                return 'Raw gloss must follow format: <S:Erg> <DO:Nom> etc.';
            }
            return true;
        });
    }

    setupAutoSave() {
        // Initialize debounced auto-save function with longer delay for stability
        try {
            this.debouncedAutoSave = this.debounce(() => {
                this.autoSave();
            }, 1500); // Increased delay for better stability
        } catch (error) {
            console.error('Error creating debouncedAutoSave:', error);
        }

        // Basic form fields
        const formFields = ['georgian', 'description', 'category', 'argumentPattern', 'semanticKey', 'notes', 'url', 'verbClass'];

        formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', () => {
                    this.autoSave();
                    this.updateProgressiveDisclosure();
                });
            }
        });

        // Translation fields
        const translationFields = ['translationPresent', 'translationImperfect', 'translationFuture', 'translationAorist', 'translationOptative', 'translationImperative'];
        translationFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', () => {
                    this.autoSave();
                });
            }
        });

        // Preposition fields
        const prepositionFields = ['subjectPreposition', 'directObjectPreposition', 'indirectObjectPreposition'];
        prepositionFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', () => {
                    this.autoSave();
                });
            }
        });

        // Raw gloss fields
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        tenses.forEach(tense => {
            const rawGlossField = document.getElementById(`rawGloss_${tense}`);
            if (rawGlossField) {
                rawGlossField.addEventListener('input', () => {
                    this.autoSave();
                });
            }
        });

        // Conjugation form fields
        tenses.forEach(tense => {
            const personForms = this.getPersonFormsForTense(tense);
            personForms.forEach(person => {
                const conjugationField = document.getElementById(`conjugation_${tense}_${person}`);
                if (conjugationField) {
                    conjugationField.addEventListener('input', () => {
                        this.autoSave();
                    });
                }
            });
        });

        // Add change listener for radio buttons
        const radioButtons = document.querySelectorAll('input[name="hasMultiplePreverbs"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', () => {
                this.autoSave();
                this.updateProgressiveDisclosure();
                // Update preverb selection when multiple preverbs setting changes
                this.updatePreverbSelectionOnConfigChange();
            });
        });

        // Add change listeners for preverb configuration checkboxes
        const hasComplexRulesCheckbox = document.getElementById('hasComplexRules');
        if (hasComplexRulesCheckbox) {
            hasComplexRulesCheckbox.addEventListener('change', (e) => {
                this.handleComplexRulesChange(e.target.checked);
                this.autoSave();
                this.updateProgressiveDisclosure();
            });
        }

        const hasArgumentOverridesCheckbox = document.getElementById('hasArgumentOverrides');
        if (hasArgumentOverridesCheckbox) {
            hasArgumentOverridesCheckbox.addEventListener('change', (e) => {
                this.handleArgumentOverridesChange(e.target.checked);
                this.autoSave();
                this.updateProgressiveDisclosure();
            });
        }

        // Add listeners for argument dropdowns (these are dynamically generated)
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('noun-select') || e.target.classList.contains('adjective-select')) {
                this.autoSave();
            }
        });

        // Add listeners for preverb configuration fields
        const preverbFields = ['defaultPreverb'];
        preverbFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('change', () => {
                    this.autoSave();
                });
            }
        });

        // Add listeners for available preverbs checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.name === 'availablePreverbs') {
                this.autoSave();
                // Update preverb selection when available preverbs change
                this.updatePreverbSelectionOnConfigChange();
            }
        });

        // Add listeners for advanced configuration dynamic content
        document.addEventListener('change', (e) => {
            // Listen for changes in tense fallback items
            if (e.target.closest('.fallback-item')) {
                this.autoSave();
            }

            // Listen for changes in preverb override items
            if (e.target.closest('.override-item')) {
                this.autoSave();
            }

            // Listen for changes in preverb translation items
            if (e.target.closest('.translation-item')) {
                this.autoSave();
            }
        });

        // Add listeners for input events in advanced configuration
        document.addEventListener('input', (e) => {
            // Listen for input changes in tense fallback items
            if (e.target.closest('.fallback-item')) {
                this.autoSave();
            }

            // Listen for input changes in preverb override items
            if (e.target.closest('.override-item')) {
                this.autoSave();
            }

            // Listen for input changes in preverb translation items
            if (e.target.closest('.translation-item')) {
                this.autoSave();
            }
        });
    }

    updateProgressiveDisclosure() {
        const formState = this.getFormState();
        this.progressiveDisclosure.updateFormState(formState);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    async autoSave() {
        try {
            console.log('[AUTO-SAVE] Starting auto-save...');
            const formData = this.getFormData();
            console.log('[AUTO-SAVE] Form data collected:', {
                georgian: formData.georgian,
                class: formData.class,
                semantic_key: formData.semantic_key,
                hasArguments: !!formData.syntax?.arguments,
                argumentCount: Object.keys(formData.syntax?.arguments || {}).length,
                hasPrepositions: !!formData.syntax?.prepositions,
                hasPreverbConfig: !!formData.preverb_config?.has_multiple_preverbs,
                argumentsData: formData.syntax?.arguments,
                prepositionsData: formData.syntax?.prepositions
            });

            // Create a new verb object if one doesn't exist
            if (!this.currentVerb) {
                console.log('[AUTO-SAVE] Creating new verb object');
                this.currentVerb = {
                    id: null,
                    georgian: '',
                    english: '',
                    description: '',
                    category: '',
                    class: '',
                    semantic_key: '',
                    notes: '',
                    url: '',
                    argument_pattern: '',
                    syntax: {
                        arguments: {},
                        prepositions: {
                            indirect_object: '',
                            direct_object: 'the'
                        },
                        preverb_overrides: {}
                    },
                    english_translations: {
                        default: {
                            present: '',
                            imperfect: '',
                            future: '',
                            aorist: '',
                            optative: '',
                            imperative: ''
                        }
                    },
                    conjugations: {
                        present: { raw_gloss: '', forms: {}, examples: [] },
                        imperfect: { raw_gloss: '', forms: {}, examples: [] },
                        future: { raw_gloss: '', forms: {}, examples: [] },
                        aorist: { raw_gloss: '', forms: {}, examples: [] },
                        optative: { raw_gloss: '', forms: {}, examples: [] },
                        imperative: { raw_gloss: '', forms: {}, examples: [] }
                    },
                    preverb_config: {
                        has_multiple_preverbs: false,
                        default_preverb: '',
                        available_preverbs: [],
                        stem_based: false
                    },
                    preverb_rules: {
                        default: '',
                        replacements: {},
                        tense_specific_fallbacks: {},
                        english_fallbacks: {}
                    }
                };
            }

            // Update the current verb with form data
            this.currentVerb = { ...this.currentVerb, ...formData };
            console.log('[AUTO-SAVE] Saving verb data with arguments:', this.currentVerb.syntax?.arguments);
            console.log('[AUTO-SAVE] Saving verb data with prepositions:', this.currentVerb.syntax?.prepositions);
            console.log('[AUTO-SAVE] Saving verb data with preverb config:', this.currentVerb.preverb_config);
            await this.storageManager.saveProgress(this.currentVerb);

            // Show auto-save indicator (briefly)
            this.showAutoSaveIndicator();
            console.log('[AUTO-SAVE] Auto-save completed successfully');
        } catch (error) {
            console.warn('Auto-save failed:', error);
        }
    }

    showAutoSaveIndicator() {
        // Create or update auto-save indicator
        let indicator = document.getElementById('autoSaveIndicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'autoSaveIndicator';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #28a745;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(indicator);
        }

        indicator.textContent = '💾 Auto-saved';
        indicator.style.opacity = '1';

        // Hide after 2 seconds
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }

    clearSavedData() {
        if (confirm('Are you sure you want to clear all saved data from local storage? This action cannot be undone.')) {
            try {
                // Clear localStorage
                this.storageManager.clearProgress();

                // Clear current verb
                this.currentVerb = null;

                // Clear form
                this.clearForm();

                // Show success message
                this.showSuccess('🗑️ All saved data cleared from local storage');
                console.log('[STORAGE] All saved data cleared successfully');
            } catch (error) {
                console.error('Failed to clear saved data:', error);
                this.showError('Failed to clear saved data: ' + error.message);
            }
        }
    }

    testStorage() {
        // Test localStorage functionality
        console.log('[STORAGE] Testing localStorage functionality...');

        // Test if localStorage is available
        if (typeof (Storage) !== "undefined") {
            console.log('[STORAGE] localStorage is available');

            // Test basic storage operations
            try {
                localStorage.setItem('test_key', 'test_value');
                const testValue = localStorage.getItem('test_key');
                localStorage.removeItem('test_key');

                if (testValue === 'test_value') {
                    console.log('[STORAGE] Basic localStorage operations work correctly');
                } else {
                    console.error('[STORAGE] Basic localStorage operations failed');
                }
            } catch (error) {
                console.error('[STORAGE] localStorage test failed:', error);
            }
        } else {
            console.error('[STORAGE] localStorage is not available');
        }

        // Test current storage status
        const currentData = this.storageManager.loadProgress();
        if (currentData) {
            console.log('[STORAGE] Current saved data found:', {
                hasGeorgian: !!currentData.georgian,
                hasConjugations: !!currentData.conjugations,
                hasArguments: !!currentData.syntax?.arguments
            });

            // Test argument data specifically
            if (currentData.syntax?.arguments) {
                console.log('[STORAGE] Argument data found:', currentData.syntax.arguments);
            }
        } else {
            console.log('[STORAGE] No current saved data found');
        }

        // Test database loading status
        if (this.database) {
            console.log('[STORAGE] Database loading status:', {
                loaded: this.database.loaded,
                subjects: Object.keys(this.database.subjects).length,
                directObjects: Object.keys(this.database.directObjects).length,
                indirectObjects: Object.keys(this.database.indirectObjects).length,
                adjectives: Object.keys(this.database.adjectives).length
            });
        }
    }

    getFormData() {
        // Helper function to safely get field value
        const getFieldValue = (fieldId) => {
            const element = document.getElementById(fieldId);
            if (!element) {
                console.warn(`🔍 [FORM] Field not found: ${fieldId}`);
            }
            return element ? element.value : '';
        };

        // Get arguments data
        const argumentsData = this.getArgumentsData();
        console.log('[FORM_DATA] Arguments data collected:', argumentsData);

        // Get prepositions data
        const prepositionsData = this.getPrepositionsData();
        console.log('[FORM_DATA] Prepositions data collected:', prepositionsData);

        // Get preverb config data
        const preverbConfigData = this.getPreverbConfigData();
        console.log('[FORM_DATA] Preverb config data collected:', preverbConfigData);

        const formData = {
            georgian: getFieldValue('georgian'),
            description: getFieldValue('description'),
            category: getFieldValue('category'),
            class: getFieldValue('verbClass'), // Map verbClass to class
            url: getFieldValue('url'),
            argument_pattern: getFieldValue('argumentPattern'), // Map argumentPattern to argument_pattern
            semantic_key: getFieldValue('semanticKey'), // Map semanticKey to semantic_key
            notes: getFieldValue('notes'),
            syntax: {
                arguments: argumentsData,
                prepositions: prepositionsData,
                preverb_overrides: {}
            },
            english_translations: {
                default: this.getTranslationData()
            },
            conjugations: this.getConjugationData(),
            preverb_config: preverbConfigData
        };

        console.log('[FORM_DATA] Complete form data:', {
            georgian: formData.georgian,
            class: formData.class,
            semantic_key: formData.semantic_key,
            hasArguments: Object.keys(argumentsData).length > 0,
            hasPrepositions: Object.keys(prepositionsData).length > 0,
            hasPreverbConfig: !!preverbConfigData.has_multiple_preverbs
        });

        return formData;
    }

    getFormState() {
        return this.getFormData();
    }

    getArgumentsData() {
        const argumentPatternElement = document.getElementById('argumentPattern');
        const argumentPattern = argumentPatternElement ? argumentPatternElement.value : '';

        if (!argumentPattern || !/^<[SDOI\-]+>$/.test(argumentPattern)) {
            console.log('[ARGUMENTS] No valid argument pattern:', argumentPattern);
            return {};
        }

        const args = argumentPattern.slice(1, -1).split('-');
        const argumentsData = {};
        console.log('[ARGUMENTS] Processing argument pattern:', argumentPattern, 'args:', args);

        // Check if argument fields exist
        const hasArgumentFields = document.querySelectorAll('.noun-select, .adjective-select').length > 0;
        console.log('[ARGUMENTS] Argument fields exist:', hasArgumentFields);

        args.forEach(arg => {
            if (arg === 'S') {
                // Subject arguments for 3sg and 3pl only
                const subjectData = {
                    '3sg': this.getArgumentFormData('subject', '3sg'),
                    '3pl': this.getArgumentFormData('subject', '3pl')
                };

                // Only add if there is actual data
                if (subjectData['3sg'].noun || subjectData['3sg'].adjective ||
                    subjectData['3pl'].noun || subjectData['3pl'].adjective) {
                    argumentsData.subject = subjectData;
                    console.log('[ARGUMENTS] Subject data:', argumentsData.subject);
                }
            } else if (arg === 'DO') {
                // Direct object arguments for all persons
                const directObjectData = {
                    '1sg': this.getArgumentFormData('direct_object', '1sg'),
                    '2sg': this.getArgumentFormData('direct_object', '2sg'),
                    '3sg': this.getArgumentFormData('direct_object', '3sg'),
                    '1pl': this.getArgumentFormData('direct_object', '1pl'),
                    '2pl': this.getArgumentFormData('direct_object', '2pl'),
                    '3pl': this.getArgumentFormData('direct_object', '3pl')
                };

                // Only add if there is actual data
                const hasDirectObjectData = Object.values(directObjectData).some(data => data.noun || data.adjective);
                if (hasDirectObjectData) {
                    argumentsData.direct_object = directObjectData;
                    console.log('[ARGUMENTS] Direct object data:', argumentsData.direct_object);
                }
            } else if (arg === 'IO') {
                // Indirect object arguments for all persons
                const indirectObjectData = {
                    '1sg': this.getArgumentFormData('indirect_object', '1sg'),
                    '2sg': this.getArgumentFormData('indirect_object', '2sg'),
                    '3sg': this.getArgumentFormData('indirect_object', '3sg'),
                    '1pl': this.getArgumentFormData('indirect_object', '1pl'),
                    '2pl': this.getArgumentFormData('indirect_object', '2pl'),
                    '3pl': this.getArgumentFormData('indirect_object', '3pl')
                };

                // Only add if there is actual data
                const hasIndirectObjectData = Object.values(indirectObjectData).some(data => data.noun || data.adjective);
                if (hasIndirectObjectData) {
                    argumentsData.indirect_object = indirectObjectData;
                    console.log('[ARGUMENTS] Indirect object data:', argumentsData.indirect_object);
                }
            }
        });

        console.log('[ARGUMENTS] Final arguments data:', argumentsData);
        return argumentsData;
    }

    getArgumentFormData(argType, person) {
        // Look for the noun select element directly, since it has the data attributes
        const nounSelector = `.noun-select[data-arg="${argType}"][data-person="${person}"]`;
        const adjectiveSelector = `.adjective-select[data-arg="${argType}"][data-person="${person}"]`;

        const nounSelect = document.querySelector(nounSelector);
        const adjectiveSelect = document.querySelector(adjectiveSelector);

        if (!nounSelect || !adjectiveSelect) {
            console.log(`[ARGUMENT_DATA] Missing select elements for ${argType} ${person}:`, {
                nounSelect: !!nounSelect,
                adjectiveSelect: !!adjectiveSelect
            });
            return { noun: '', adjective: '' };
        }

        const result = {
            noun: nounSelect.value || '',
            adjective: adjectiveSelect.value || ''
        };

        // Only log if there is actual data
        if (result.noun || result.adjective) {
            console.log(`[ARGUMENT_DATA] Collected data for ${argType} ${person}:`, result);
        }

        return result;
    }

    getPrepositionsData() {
        const getPrepositionValue = (fieldId, defaultValue = '') => {
            const element = document.getElementById(fieldId);
            return element ? element.value : defaultValue;
        };

        const prepositions = {
            subject: getPrepositionValue('subjectPreposition', 'the'),
            direct_object: getPrepositionValue('directObjectPreposition', 'the'),
            indirect_object: getPrepositionValue('indirectObjectPreposition', '')
        };

        console.log('[PREPOSITIONS] Collected prepositions data:', prepositions);
        return prepositions;
    }

    getTranslationData() {
        const getTranslationValue = (fieldId) => {
            const element = document.getElementById(fieldId);
            return element ? element.value : '';
        };

        // Always return a complete structure
        const translations = {
            present: getTranslationValue('translationPresent'),
            imperfect: getTranslationValue('translationImperfect'),
            future: getTranslationValue('translationFuture'),
            aorist: getTranslationValue('translationAorist'),
            optative: getTranslationValue('translationOptative'),
            imperative: getTranslationValue('translationImperative')
        };

        // Use description as fallback for any missing translations
        const description = document.getElementById('description')?.value || '';
        Object.keys(translations).forEach(tense => {
            if (!translations[tense] || translations[tense].trim() === '') {
                translations[tense] = description;
            }
        });

        return translations;
    }

    getConjugationData() {
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        const conjugations = {};

        tenses.forEach(tense => {
            const rawGlossElement = document.getElementById(`rawGloss_${tense}`);

            if (rawGlossElement) {
                conjugations[tense] = {
                    raw_gloss: rawGlossElement.value,
                    forms: this.getTenseForms(tense),
                    examples: []
                };
            }
        });

        return conjugations;
    }

    getTenseForms(tense) {
        const forms = {};
        const personForms = this.getPersonFormsForTense(tense);

        personForms.forEach(person => {
            const conjugationElement = document.getElementById(`conjugation_${tense}_${person}`);

            if (conjugationElement) {
                const conjugationForm = conjugationElement.value.trim();
                if (conjugationForm && conjugationForm !== '') {
                    forms[person] = conjugationForm;
                }
            }
        });

        return forms;
    }

    handleArgumentPatternChange(pattern) {
        console.log('[ARGUMENT_PATTERN] Pattern changed to:', pattern);

        // Store current argument data before regenerating fields
        const currentArguments = this.getArgumentsData();
        console.log('[ARGUMENT_PATTERN] Current arguments before change:', currentArguments);

        this.generateArgumentFields(pattern);

        // Update form state and refresh progressive disclosure
        this.progressiveDisclosure.updateFormState({ argumentPattern: pattern });

        // Restore argument data after fields are generated
        if (Object.keys(currentArguments).length > 0) {
            setTimeout(() => {
                this.populateArgumentsWithSavedData(currentArguments).catch(error => {
                    console.error('[ARGUMENT_PATTERN] Error restoring arguments after pattern change:', error);
                });
            }, 500);
        }

        // NOTE: Conjugation forms should NOT refresh when argument pattern changes
        // They should only refresh when scraper data is loaded
    }

    handlePrepositionChange(type, value) {
        // Store preposition value in form state
        const formState = this.progressiveDisclosure.getFormState();
        if (!formState.prepositions) {
            formState.prepositions = {};
        }
        formState.prepositions[type] = value;

        // Update progressive disclosure form state
        this.progressiveDisclosure.updateFormState({ prepositions: formState.prepositions });

        // Auto-save the change
        this.autoSave();
    }

    refreshConjugationForms() {
        // Check if conjugation forms exist
        const conjugationsContent = document.getElementById('conjugationsContent');
        if (conjugationsContent && conjugationsContent.children.length > 0) {
            // IMPORTANT: Don't regenerate conjugation forms if there is scraped data
            // This prevents overwriting scraped conjugation forms with sample data
            if (this.scrapedData && this.scrapedData.conjugations) {
                return;
            }

            if (this.currentVerb && this.currentVerb.conjugations) {
                return;
            }

            // Regenerate conjugation forms to update inherited values
            this.generateConjugationForms();
        }
    }

    handlePreverbChange(hasMultiple) {
        // Update form state and refresh progressive disclosure
        this.progressiveDisclosure.updateFormState({ hasMultiplePreverbs: hasMultiple });

        // Also update the progressive disclosure visibility
        this.progressiveDisclosure.updateVisibility();
    }



    generateArgumentFields(pattern) {
        if (!pattern || !/^<[SDOI\-]+>$/.test(pattern)) return;

        // Validate specific pattern combinations
        const validPatterns = ['<S>', '<S-DO>', '<S-IO>', '<S-DO-IO>'];
        if (!validPatterns.includes(pattern)) return;

        const args = pattern.slice(1, -1).split('-');

        // Show/hide argument sections based on pattern
        this.showArgumentSections(args);

        // Generate fields for each argument type
        args.forEach((arg, index) => {
            switch (arg) {
                case 'S':
                    this.generateSubjectFields();
                    break;
                case 'DO':
                    this.generateDirectObjectFields();
                    break;
                case 'IO':
                    this.generateIndirectObjectFields();
                    break;
            }
        });

        // Generate and setup filter controls immediately after sections are shown
        setTimeout(() => {
            this.generateFiltersForVisibleSectionsSync();
            this.setupFilterListeners();

            // Setup listeners for argument changes AFTER filters are set up
            this.setupArgumentChangeListeners();

            // Restore saved argument values if they exist
            if (this.currentVerb && this.currentVerb.syntax && this.currentVerb.syntax.arguments) {
                this.populateArgumentsWithSavedData(this.currentVerb.syntax.arguments).catch(error => {
                    console.error('[STORAGE] Error restoring arguments after pattern change:', error);
                });
            }
        }, 50);
    }

    /**
     * Generate filter controls for categories and semantic domains based on current argument pattern
     */
    async generateFilterControls(pattern) {
        if (!this.database || !this.database.loaded) {
            console.warn('Database not loaded, cannot generate filter controls');
            return;
        }

        // Parse the argument pattern to determine which databases are relevant
        const args = pattern.slice(1, -1).split('-');
        const relevantDatabases = new Set();

        args.forEach(arg => {
            switch (arg) {
                case 'S':
                    relevantDatabases.add('subjects');
                    break;
                case 'DO':
                    relevantDatabases.add('direct_objects');
                    break;
                case 'IO':
                    relevantDatabases.add('indirect_objects');
                    break;
            }
        });

        console.log('Relevant databases for pattern', pattern, ':', Array.from(relevantDatabases));

        // Ensure relevant databases are loaded
        if (relevantDatabases.has('subjects') && Object.keys(this.database.subjects).length === 0) {
            console.log('Loading subject database...');
            await this.database.loadSubjectDatabase();
        }
        if (relevantDatabases.has('direct_objects') && Object.keys(this.database.directObjects).length === 0) {
            console.log('Loading direct object database...');
            await this.database.loadDirectObjectDatabase();
        }
        if (relevantDatabases.has('indirect_objects') && Object.keys(this.database.indirectObjects).length === 0) {
            console.log('Loading indirect object database...');
            await this.database.loadIndirectObjectDatabase();
        }

        // Debug: Log database loading status
        console.log('Database loading status:', {
            subjects: Object.keys(this.database.subjects).length,
            directObjects: Object.keys(this.database.directObjects).length,
            indirectObjects: Object.keys(this.database.indirectObjects).length,
            adjectives: Object.keys(this.database.adjectives).length
        });

        // Generate context-aware category filters
        const categories = this.getRelevantCategories(relevantDatabases);
        console.log('Relevant categories for pattern', pattern, ':', categories);
        const categoryFiltersContainer = document.getElementById('categoryFilters');
        if (categoryFiltersContainer) {
            categoryFiltersContainer.innerHTML = categories.map(category => `
                <div class="filter-checkbox-item">
                    <input type="checkbox" id="category_${category}" value="${category}" class="filter-checkbox">
                    <label for="category_${category}">${this.capitalizeFirst(category)}</label>
                </div>
            `).join('');
        }

        // Generate context-aware semantic domain filters
        const semanticDomains = this.getRelevantSemanticDomains(relevantDatabases);
        console.log('Relevant semantic domains for pattern', pattern, ':', semanticDomains);
        const semanticDomainFiltersContainer = document.getElementById('semanticDomainFilters');
        if (semanticDomainFiltersContainer) {
            if (semanticDomains.length === 0) {
                semanticDomainFiltersContainer.innerHTML = '<div class="filter-checkbox-item"><em>No semantic domains available for this pattern</em></div>';
            } else {
                semanticDomainFiltersContainer.innerHTML = semanticDomains.map(domain => `
                    <div class="filter-checkbox-item">
                        <input type="checkbox" id="semantic_${domain}" value="${domain}" class="filter-checkbox">
                        <label for="semantic_${domain}">${this.capitalizeFirst(domain)}</label>
                    </div>
                `).join('');
            }
        }
    }

    /**
     * Get categories relevant to the current argument pattern
     */
    getRelevantCategories(relevantDatabases) {
        const categories = new Set();

        // Add categories from relevant noun databases
        if (relevantDatabases.has('subjects')) {
            Object.values(this.database.subjects).forEach(noun => {
                if (noun.category) {
                    categories.add(noun.category);
                }
            });
        }
        if (relevantDatabases.has('direct_objects')) {
            Object.values(this.database.directObjects).forEach(noun => {
                if (noun.category) {
                    categories.add(noun.category);
                }
            });
        }
        if (relevantDatabases.has('indirect_objects')) {
            Object.values(this.database.indirectObjects).forEach(noun => {
                if (noun.category) {
                    categories.add(noun.category);
                }
            });
        }

        // Always include adjective categories since adjectives can be used with any argument
        Object.values(this.database.adjectives).forEach(adj => {
            if (adj.category) {
                categories.add(adj.category);
            }
        });

        return Array.from(categories).sort();
    }

    /**
     * Get semantic domains relevant to the current argument pattern
     */
    getRelevantSemanticDomains(relevantDatabases) {
        const semanticDomains = new Set();

        // Only include semantic domains from relevant noun databases
        if (relevantDatabases.has('subjects')) {
            Object.values(this.database.subjects).forEach(noun => {
                if (noun.semantic_domain) {
                    semanticDomains.add(noun.semantic_domain);
                }
            });
        }
        if (relevantDatabases.has('direct_objects')) {
            Object.values(this.database.directObjects).forEach(noun => {
                if (noun.semantic_domain) {
                    semanticDomains.add(noun.semantic_domain);
                }
            });
        }
        if (relevantDatabases.has('indirect_objects')) {
            Object.values(this.database.indirectObjects).forEach(noun => {
                if (noun.semantic_domain) {
                    semanticDomains.add(noun.semantic_domain);
                }
            });
        }

        return Array.from(semanticDomains).sort();
    }

    /**
     * Setup event listeners for filter checkboxes and tabs
     */
    setupFilterListeners() {
        // Setup filter tab listeners (these don't change)
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.handleFilterTabClick(tab);
            });
        });

        // Setup filter checkbox listeners
        this.attachFilterCheckboxListeners();
    }

    /**
     * Attach event listeners to filter checkboxes
     */
    attachFilterCheckboxListeners() {
        const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
        filterCheckboxes.forEach(checkbox => {
            // Remove existing listeners to prevent duplicates
            checkbox.removeEventListener('change', this.handleFilterChange.bind(this));
            // Add new listener
            checkbox.addEventListener('change', () => {
                this.handleFilterChange();
            });
        });
    }

    /**
 * Handle filter tab clicks
 */
    handleFilterTabClick(clickedTab) {
        const section = clickedTab.getAttribute('data-arg-section');
        const filterType = clickedTab.getAttribute('data-filter-type');

        // Remove active class from all tabs in this section
        const sectionTabs = document.querySelectorAll(`[data-arg-section="${section}"]`);
        sectionTabs.forEach(tab => tab.classList.remove('active'));

        // Add active class to clicked tab
        clickedTab.classList.add('active');

        // Update filter options based on the selected tab
        this.updateFilterOptionsForTab(section, filterType).then(() => {
            // Update dropdowns for this section
            this.updateSectionDropdowns(section, filterType);
        });
    }

    /**
 * Handle filter checkbox changes
 */
    handleFilterChange() {
        // Get filters for each section
        const sections = ['subject', 'direct_object', 'indirect_object'];

        sections.forEach(section => {
            // Get the currently active filter tab for this section
            const activeTab = document.querySelector(`[data-arg-section="${section}"].filter-tab.active`);
            const activeFilterType = activeTab ? activeTab.getAttribute('data-filter-type') : 'adjective';

            // Get filters based on the active filter type
            let selectedCategories, selectedSemanticDomains;

            if (activeFilterType === 'adjective') {
                selectedCategories = this.getSelectedCategoriesForSectionAndType(section, 'adjective');
                selectedSemanticDomains = []; // Adjectives don't have semantic domains
            } else if (activeFilterType === 'noun') {
                selectedCategories = this.getSelectedCategoriesForSectionAndType(section, 'noun');
                selectedSemanticDomains = this.getSelectedSemanticDomainsForSectionAndType(section, 'noun');
            }

            // Store the current filter state
            this.storeFilterState(section, activeFilterType, selectedCategories, selectedSemanticDomains);

            // Update dropdowns for this section based on the active filter type
            this.updateSectionDropdowns(section, activeFilterType, selectedCategories, selectedSemanticDomains);
        });
    }

    /**
     * Get selected categories from checkboxes
     */
    getSelectedCategories() {
        const categoryCheckboxes = document.querySelectorAll('#categoryFilters input[type="checkbox"]:checked');
        return Array.from(categoryCheckboxes).map(cb => cb.value);
    }

    /**
     * Get selected semantic domains from checkboxes
     */
    getSelectedSemanticDomains() {
        const semanticCheckboxes = document.querySelectorAll('#semanticDomainFilters input[type="checkbox"]:checked');
        return Array.from(semanticCheckboxes).map(cb => cb.value);
    }

    /**
     * Get selected categories for a specific section
     */
    getSelectedCategoriesForSection(section) {
        const checkboxes = document.querySelectorAll(`input[id^="${section}_category_"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }

    /**
     * Get selected semantic domains for a specific section
     */
    getSelectedSemanticDomainsForSection(section) {
        const checkboxes = document.querySelectorAll(`input[id^="${section}_semantic_"]:checked`);
        return Array.from(checkboxes).map(cb => cb.value);
    }

    /**
     * Get selected categories for a specific section and filter type
     */
    getSelectedCategoriesForSectionAndType(section, filterType) {
        const checkboxes = document.querySelectorAll(`input[id^="${section}_category_"]:checked`);
        const allCategories = Array.from(checkboxes).map(cb => cb.value);

        if (filterType === 'adjective') {
            // Only return categories that exist in adjectives
            const adjectiveCategories = this.getAdjectiveCategories();
            return allCategories.filter(cat => adjectiveCategories.includes(cat));
        } else if (filterType === 'noun') {
            // Only return categories that exist in nouns for this section
            const databaseType = this.getDatabaseTypeForSection(section);
            const nounCategories = this.getNounCategoriesForSection(databaseType);
            return allCategories.filter(cat => nounCategories.includes(cat));
        }

        return [];
    }

    /**
     * Get selected semantic domains for a specific section and filter type
     */
    getSelectedSemanticDomainsForSectionAndType(section, filterType) {
        if (filterType === 'adjective') {
            return []; // Adjectives don't have semantic domains
        } else if (filterType === 'noun') {
            const checkboxes = document.querySelectorAll(`input[id^="${section}_semantic_"]:checked`);
            return Array.from(checkboxes).map(cb => cb.value);
        }

        return [];
    }

    /**
     * Store filter state for a section and filter type
     */
    storeFilterState(section, filterType, categories, semanticDomains) {
        const stateKey = `${section}_${filterType}_filters`;
        const state = {
            categories: categories || [],
            semanticDomains: semanticDomains || []
        };
        sessionStorage.setItem(stateKey, JSON.stringify(state));
    }

    /**
     * Retrieve filter state for a section and filter type
     */
    getFilterState(section, filterType) {
        const stateKey = `${section}_${filterType}_filters`;
        const state = sessionStorage.getItem(stateKey);
        if (state) {
            return JSON.parse(state);
        }
        return { categories: [], semanticDomains: [] };
    }

    /**
     * Update dropdowns for a specific section
     */
    updateSectionDropdowns(section, filterType, selectedCategories = null, selectedSemanticDomains = null) {
        // Get database type for this section
        const databaseType = this.getDatabaseTypeForSection(section);

        // Map section name to the correct HTML element ID
        const sectionMapping = {
            'subject': 'subject',
            'direct_object': 'directObject',
            'indirect_object': 'indirectObject'
        };

        const elementId = sectionMapping[section];

        // Update noun dropdowns for this section (only if noun filter is active)
        if (filterType === 'noun') {
            const nounSelects = document.querySelectorAll(`#${elementId}Fields .noun-select`);
            nounSelects.forEach(select => {
                this.updateNounDropdown(select, databaseType, selectedCategories, selectedSemanticDomains);
            });
        }

        // Update adjective dropdowns for this section (only if adjective filter is active)
        if (filterType === 'adjective') {
            const adjectiveSelects = document.querySelectorAll(`#${elementId}Fields .adjective-select`);
            adjectiveSelects.forEach(select => {
                this.updateAdjectiveDropdown(select, selectedCategories);
            });
        }

        // Check for mismatched selections based on the active filter type
        this.checkForMismatchedSelectionsInSection(section, filterType, selectedCategories, selectedSemanticDomains);
    }

    /**
     * Get database type for a section
     */
    getDatabaseTypeForSection(section) {
        switch (section) {
            case 'subject': return 'subjects';
            case 'direct_object': return 'direct_objects';
            case 'indirect_object': return 'indirect_objects';
            default: return null;
        }
    }

    /**
     * Update a single noun dropdown
     */
    updateNounDropdown(select, databaseType, selectedCategories, selectedSemanticDomains) {
        const currentValue = select.value;
        const filteredOptions = this.database.getFilteredNounOptions(databaseType, selectedCategories, selectedSemanticDomains);

        // Always preserve the current selection
        let optionsToShow = [...filteredOptions];
        if (currentValue && !filteredOptions.some(option => option.value === currentValue)) {
            const currentItem = this.database.getNouns(databaseType)[currentValue];
            if (currentItem) {
                optionsToShow.unshift({
                    value: currentValue,
                    label: currentValue,
                    description: currentItem.description || ''
                });
            }
        }

        // Update options
        select.innerHTML = '<option value="">Select noun</option>' +
            optionsToShow.map((option) => {
                const isFilteredOut = currentValue && !filteredOptions.some(fo => fo.value === option.value) && option.value === currentValue;
                return `<option value="${option.value}" ${isFilteredOut ? 'class="filtered-option"' : ''}>${option.label}</option>`;
            }).join('');

        // Restore selection and styling
        if (currentValue) {
            select.value = currentValue;
            if (!filteredOptions.some(fo => fo.value === currentValue)) {
                select.classList.add('filtered-selection');
            } else {
                select.classList.remove('filtered-selection');
            }
        }
    }

    /**
     * Update a single adjective dropdown
     */
    updateAdjectiveDropdown(select, selectedCategories) {
        const currentValue = select.value;
        const filteredOptions = this.database.getFilteredAdjectiveOptions(selectedCategories);

        // Always preserve the current selection
        let optionsToShow = [...filteredOptions];
        if (currentValue && !filteredOptions.some(option => option.value === currentValue)) {
            const currentAdjective = this.database.adjectives[currentValue];
            if (currentAdjective) {
                optionsToShow.unshift({
                    value: currentValue,
                    label: currentValue
                });
            }
        }

        // Update options
        select.innerHTML = '<option value="">Select adjective</option>' +
            optionsToShow.map((option) => {
                const isFilteredOut = currentValue && !filteredOptions.some(fo => fo.value === option.value) && option.value === currentValue;
                return `<option value="${option.value}" ${isFilteredOut ? 'class="filtered-option"' : ''}>${option.label}</option>`;
            }).join('');

        // Restore selection and styling
        if (currentValue) {
            select.value = currentValue;
            if (!filteredOptions.some(fo => fo.value === currentValue)) {
                select.classList.add('filtered-selection');
            } else {
                select.classList.remove('filtered-selection');
            }
        }
    }

    /**
     * Check for mismatched selections in a specific section
     */
    checkForMismatchedSelectionsInSection(section, filterType, selectedCategories, selectedSemanticDomains) {
        // Clear existing warnings for this section
        this.clearIndividualWarningsInSection(section);

        const databaseType = this.getDatabaseTypeForSection(section);

        // Map section name to the correct HTML element ID
        const sectionMapping = {
            'subject': 'subject',
            'direct_object': 'directObject',
            'indirect_object': 'indirectObject'
        };

        const elementId = sectionMapping[section];

        // Only check the dropdown type that matches the active filter
        if (filterType === 'noun') {
            // Check noun dropdowns only
            const nounSelects = document.querySelectorAll(`#${elementId}Fields .noun-select`);
            nounSelects.forEach(select => {
                const selectedValue = select.value;
                if (selectedValue && !this.database.checkItemMatchesFilters(selectedValue, databaseType, selectedCategories, selectedSemanticDomains)) {
                    this.showIndividualWarning(select, 'noun', selectedValue);
                }
            });
        } else if (filterType === 'adjective') {
            // Check adjective dropdowns only
            const adjectiveSelects = document.querySelectorAll(`#${elementId}Fields .adjective-select`);
            adjectiveSelects.forEach(select => {
                const selectedValue = select.value;
                if (selectedValue && !this.database.checkAdjectiveMatchesFilters(selectedValue, selectedCategories)) {
                    this.showIndividualWarning(select, 'adjective', selectedValue);
                }
            });
        }
    }

    /**
     * Clear individual warnings in a specific section
     */
    clearIndividualWarningsInSection(section) {
        // Map section name to the correct HTML element ID
        const sectionMapping = {
            'subject': 'subject',
            'direct_object': 'directObject',
            'indirect_object': 'indirectObject'
        };

        const elementId = sectionMapping[section];
        const sectionElement = document.getElementById(`${elementId}Fields`);
        if (sectionElement) {
            const warnings = sectionElement.parentNode.querySelectorAll('.individual-filter-warning');
            warnings.forEach(warning => warning.remove());
        }
    }

    /**
     * Update all dropdown options based on selected filters
     */
    updateAllDropdownOptions(selectedCategories, selectedSemanticDomains) {
        // Update noun dropdowns
        const nounSelects = document.querySelectorAll('.noun-select');
        nounSelects.forEach(select => {
            const argType = select.getAttribute('data-arg');
            const databaseType = this.getArgumentType(argType);

            // Get current selection
            const currentValue = select.value;

            // Get filtered options
            const filteredOptions = this.database.getFilteredNounOptions(databaseType, selectedCategories, selectedSemanticDomains);

            console.log(`Noun dropdown for ${databaseType}:`, {
                selectedCategories,
                selectedSemanticDomains,
                filteredOptionsCount: filteredOptions.length,
                currentValue,
                databaseLoaded: Object.keys(this.database.getNouns(databaseType)).length
            });

            // Always preserve the current selection by adding it to options if it exists
            let optionsToShow = [...filteredOptions];
            if (currentValue && !filteredOptions.some(option => option.value === currentValue)) {
                // Add current selection to the top of the list if it's not in filtered options
                const currentItem = this.database.getNouns(databaseType)[currentValue];
                if (currentItem) {
                    optionsToShow.unshift({
                        value: currentValue,
                        label: currentValue, // Keep original label, no "(filtered out)" text
                        description: currentItem.description || ''
                    });
                }
            }

            // Update options
            select.innerHTML = '<option value="">Select noun</option>' +
                optionsToShow.map((option, index) => {
                    const isFilteredOut = currentValue && !filteredOptions.some(fo => fo.value === option.value) && option.value === currentValue;
                    return `<option value="${option.value}" ${isFilteredOut ? 'class="filtered-option"' : ''}>${option.label}</option>`;
                }).join('');

            // Always restore the current selection
            if (currentValue) {
                select.value = currentValue;
                // Add visual styling to the select element itself if it's filtered out
                if (!filteredOptions.some(fo => fo.value === currentValue)) {
                    select.classList.add('filtered-selection');
                } else {
                    select.classList.remove('filtered-selection');
                }
            }
        });

        // Update adjective dropdowns
        const adjectiveSelects = document.querySelectorAll('.adjective-select');
        adjectiveSelects.forEach(select => {
            const currentValue = select.value;

            // Get filtered options
            const filteredOptions = this.database.getFilteredAdjectiveOptions(selectedCategories);

            console.log(`Adjective dropdown:`, {
                selectedCategories,
                filteredOptionsCount: filteredOptions.length,
                currentValue,
                databaseLoaded: Object.keys(this.database.adjectives).length
            });

            // Always preserve the current selection by adding it to options if it exists
            let optionsToShow = [...filteredOptions];
            if (currentValue && !filteredOptions.some(option => option.value === currentValue)) {
                // Add current selection to the top of the list if it's not in filtered options
                const currentAdjective = this.database.adjectives[currentValue];
                if (currentAdjective) {
                    optionsToShow.unshift({
                        value: currentValue,
                        label: currentValue // Keep original label, no "(filtered out)" text
                    });
                }
            }

            // Update options
            select.innerHTML = '<option value="">Select adjective</option>' +
                optionsToShow.map((option, index) => {
                    const isFilteredOut = currentValue && !filteredOptions.some(fo => fo.value === option.value) && option.value === currentValue;
                    return `<option value="${option.value}" ${isFilteredOut ? 'class="filtered-option"' : ''}>${option.label}</option>`;
                }).join('');

            // Always restore the current selection
            if (currentValue) {
                select.value = currentValue;
                // Add visual styling to the select element itself if it's filtered out
                if (!filteredOptions.some(fo => fo.value === currentValue)) {
                    select.classList.add('filtered-selection');
                } else {
                    select.classList.remove('filtered-selection');
                }
            }
        });
    }

    /**
     * Check for selections that don't match current filters and show warnings
     */
    checkForMismatchedSelections(selectedCategories, selectedSemanticDomains) {
        // Clear any existing individual warnings
        this.clearIndividualWarnings();

        // Check noun selections
        const nounSelects = document.querySelectorAll('.noun-select');
        nounSelects.forEach(select => {
            const selectedValue = select.value;
            if (selectedValue) {
                const argType = select.getAttribute('data-arg');
                const databaseType = this.getArgumentType(argType);
                const person = select.getAttribute('data-person');

                const matches = this.database.checkItemMatchesFilters(selectedValue, databaseType, selectedCategories, selectedSemanticDomains);

                if (!matches) {
                    this.showIndividualWarning(select, 'noun', selectedValue);
                }
            }
        });

        // Check adjective selections
        const adjectiveSelects = document.querySelectorAll('.adjective-select');
        adjectiveSelects.forEach(select => {
            const selectedValue = select.value;
            if (selectedValue) {
                const matches = this.database.checkAdjectiveMatchesFilters(selectedValue, selectedCategories);

                if (!matches) {
                    this.showIndividualWarning(select, 'adjective', selectedValue);
                }
            }
        });
    }

    /**
     * Show individual warning for a specific dropdown
     */
    showIndividualWarning(selectElement, type, value) {
        // Create warning element
        const warningDiv = document.createElement('div');
        warningDiv.className = 'individual-filter-warning';
        warningDiv.innerHTML = `
            <span class="warning-icon">⚠️</span>
            <span class="warning-text">"${value}" not part of filter. will still be used in examples.</span>
            <span class="warning-action" onclick="verbEditor.clearSelection('${selectElement.id}')">Clear item</span>
        `;

        // Insert warning after the dropdown's parent container (noun-adjective-pair)
        const pairContainer = selectElement.closest('.noun-adjective-pair');
        if (pairContainer) {
            pairContainer.parentNode.insertBefore(warningDiv, pairContainer.nextSibling);
        }

        // Add event listener to the clear button
        const clearButton = warningDiv.querySelector('.warning-action');
        clearButton.addEventListener('click', () => {
            this.clearSelection(selectElement.id);
        });
    }

    /**
     * Clear all individual warnings
     */
    clearIndividualWarnings() {
        const existingWarnings = document.querySelectorAll('.individual-filter-warning');
        existingWarnings.forEach(warning => warning.remove());
    }

    /**
     * Display filter warnings (legacy method - keeping for compatibility)
     */
    displayFilterWarnings(warnings) {
        // This method is now deprecated in favor of individual warnings
        // Keeping it for backward compatibility but it won't be used
        const warningsContainer = document.getElementById('filterWarnings');
        if (warningsContainer) {
            warningsContainer.innerHTML = '';
        }
    }

    /**
     * Clear a specific selection (called from warning action)
     */
    clearSelection(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            // Clear the selection
            element.value = '';

            // Remove the warning for this specific dropdown
            const pairContainer = element.closest('.noun-adjective-pair');
            if (pairContainer) {
                const warning = pairContainer.parentNode.querySelector('.individual-filter-warning');
                if (warning) {
                    warning.remove();
                }
            }

            // Recheck warnings after clearing
            const selectedCategories = this.getSelectedCategories();
            const selectedSemanticDomains = this.getSelectedSemanticDomains();
            this.checkForMismatchedSelections(selectedCategories, selectedSemanticDomains);
        }
    }

    setupArgumentChangeListeners() {
        // NOTE: Argument changes should NOT refresh conjugation forms
        // Conjugation forms should only refresh when scraper data is loaded
        // Argument values are stored for use by the example sentence generator

        // Add change listeners for noun and adjective selects to trigger auto-save
        const nounSelects = document.querySelectorAll('.noun-select');
        const adjectiveSelects = document.querySelectorAll('.adjective-select');

        nounSelects.forEach(select => {
            // Remove existing listeners by cloning and preserving value
            const currentValue = select.value;
            const newSelect = select.cloneNode(true);
            newSelect.value = currentValue; // Preserve the current value
            select.parentNode.replaceChild(newSelect, select);

            // Add new listener
            newSelect.addEventListener('change', () => {
                console.log('[AUTO-SAVE] Noun selection changed:', newSelect.value, 'for', newSelect.getAttribute('data-arg'), newSelect.getAttribute('data-person'));
                this.autoSave();
            });
        });

        adjectiveSelects.forEach(select => {
            // Remove existing listeners by cloning and preserving value
            const currentValue = select.value;
            const newSelect = select.cloneNode(true);
            newSelect.value = currentValue; // Preserve the current value
            select.parentNode.replaceChild(newSelect, select);

            // Add new listener
            newSelect.addEventListener('change', () => {
                console.log('[AUTO-SAVE] Adjective selection changed:', newSelect.value, 'for', newSelect.getAttribute('data-arg'), newSelect.getAttribute('data-person'));
                this.autoSave();
            });
        });

        console.log('[AUTO-SAVE] Set up change listeners for', nounSelects.length, 'noun selects and', adjectiveSelects.length, 'adjective selects');
    }



    refreshConjugationForms() {
        // Check if conjugation forms exist and refresh them
        const conjugationsContent = document.getElementById('conjugationsContent');
        if (conjugationsContent && conjugationsContent.children.length > 0) {
            // Regenerate conjugation forms to update inherited values
            this.generateConjugationForms();
        }
    }

    populateConjugationFormsWithData() {
        // Priority 1: Use scraped data if available (highest priority)
        if (this.scrapedData && this.scrapedData.conjugations) {
            this.populateConjugationFormsFromVerb(this.scrapedData.conjugations);
            return; // Exit early, don't overwrite with sample data
        }

        // Priority 2: Use current verb data if available
        if (this.currentVerb && this.currentVerb.conjugations) {
            this.populateConjugationFormsFromVerb(this.currentVerb.conjugations);
            return; // Exit early, don't overwrite with sample data
        }

        // Priority 3: Only use sample data if no real data is available
        this.populateSampleConjugationData();
    }

    populateSampleConjugationData() {
        // Create empty conjugation data structure with empty strings instead of hardcoded values
        const emptyConjugations = {
            present: {
                forms: {
                    '1sg': '',
                    '1pl': '',
                    '2sg': '',
                    '2pl': '',
                    '3sg': '',
                    '3pl': ''
                }
            },
            imperfect: {
                forms: {
                    '1sg': '',
                    '1pl': '',
                    '2sg': '',
                    '2pl': '',
                    '3sg': '',
                    '3pl': ''
                }
            },
            future: {
                forms: {
                    '1sg': '',
                    '1pl': '',
                    '2sg': '',
                    '2pl': '',
                    '3sg': '',
                    '3pl': ''
                }
            },
            aorist: {
                forms: {
                    '1sg': '',
                    '1pl': '',
                    '2sg': '',
                    '2pl': '',
                    '3sg': '',
                    '3pl': ''
                }
            },
            optative: {
                forms: {
                    '1sg': '',
                    '1pl': '',
                    '2sg': '',
                    '2pl': '',
                    '3sg': '',
                    '3pl': ''
                }
            },
            imperative: {
                forms: {
                    '2sg': '',
                    '2pl': ''
                }
            }
        };

        this.populateConjugationFormsFromVerb(emptyConjugations);
    }

    populateConjugationFormsFromVerb(conjugations) {
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        tenses.forEach(tense => {
            if (conjugations[tense] && conjugations[tense].forms) {
                const forms = conjugations[tense].forms;

                // Get person forms for this tense
                const personForms = this.getPersonFormsForTense(tense);

                personForms.forEach(person => {
                    const elementId = `conjugation_${tense}_${person}`;
                    const conjugationElement = document.getElementById(elementId);

                    if (conjugationElement && forms[person]) {
                        conjugationElement.value = forms[person];
                        conjugationElement.classList.add('has-data');
                    }
                });
            }
        });

        // Auto-generate raw glosses using GNC API if there is conjugation data
        this.autoGenerateRawGlossesFromConjugations(conjugations);
    }

    /**
     * Auto-generate raw glosses using GNC API
     */
    async autoGenerateRawGlossesFromConjugations(conjugations) {
        // Check for conjugation data
        const hasConjugationData = Object.values(conjugations).some(tense =>
            tense.forms && Object.values(tense.forms).some(form => form && form.trim() !== '')
        );

        if (!hasConjugationData) {
            return; // No conjugation data to analyze
        }

        // Extract just the forms for GNC analysis
        const conjugationsData = {};
        Object.entries(conjugations).forEach(([tense, tenseData]) => {
            if (tenseData.forms) {
                conjugationsData[tense] = tenseData.forms;
            }
        });

        // Use GNC integration to generate raw glosses
        if (this.gncIntegration) {
            await this.gncIntegration.autoGenerateRawGlosses(conjugationsData);
        }
    }

    generateSubjectFields() {
        const grid = this.generatePersonFormsGrid(['3sg', '3pl'], 'subject');
        const container = document.getElementById('subjectFields');
        if (container) {
            container.innerHTML = grid;
        }
    }

    generateDirectObjectFields() {
        const grid = this.generatePersonFormsGrid(['1sg', '1pl', '2sg', '2pl', '3sg', '3pl'], 'direct_object');
        const container = document.getElementById('directObjectFields');
        if (container) {
            container.innerHTML = grid;
        }
    }

    generateIndirectObjectFields() {
        const grid = this.generatePersonFormsGrid(['1sg', '1pl', '2sg', '2pl', '3sg', '3pl'], 'indirect_object');
        const container = document.getElementById('indirectObjectFields');
        if (container) {
            container.innerHTML = grid;
        }
    }

    getNounOptions(databaseType) {
        const nounOptions = this.database.getNounOptions(databaseType);

        // If no options are available, try to load the database first
        if (nounOptions.length === 0) {
            console.log(`[STORAGE] No noun options found for ${databaseType}, attempting to load database...`);

            // Try to load the specific database
            switch (databaseType) {
                case 'subjects':
                    this.database.loadSubjectDatabase().catch(error => {
                        console.warn(`[STORAGE] Failed to load subject database:`, error);
                    });
                    break;
                case 'direct_objects':
                    this.database.loadDirectObjectDatabase().catch(error => {
                        console.warn(`[STORAGE] Failed to load direct object database:`, error);
                    });
                    break;
                case 'indirect_objects':
                    this.database.loadIndirectObjectDatabase().catch(error => {
                        console.warn(`[STORAGE] Failed to load indirect object database:`, error);
                    });
                    break;
            }

            // Return a placeholder option for now
            return '<option value="">Loading...</option>';
        }

        const htmlOptions = nounOptions
            .map(option => `<option value="${option.value}">${option.label}</option>`)
            .join('');

        return htmlOptions;
    }

    getAdjectiveOptions() {
        // Get adjectives from the database
        const adjectiveOptions = this.database.getAdjectiveOptions();

        const htmlOptions = adjectiveOptions
            .map(option => `<option value="${option.value}">${option.label}</option>`)
            .join('');

        return htmlOptions;
    }

    // Conjugation Management Methods
    generateConjugationForms() {
        // Generate forms for all six tenses
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        const content = document.getElementById('conjugationsContent');

        let html = '';
        tenses.forEach(tense => {
            const tenseSection = this.generateTenseSection(tense);
            html += tenseSection;
        });

        content.innerHTML = html;

        // Populate conjugation forms with scraped data if available
        this.populateConjugationFormsWithData();

        // Add event listeners for raw gloss validation
        this.setupRawGlossValidation();

        // Show manual editing buttons if conjugation forms are generated
        this.showManualEditingButtons();
    }

    // Manual Editing Methods
    enableManualEditing() {
        // Enable all conjugation form inputs
        const conjugationInputs = document.querySelectorAll('.conjugation-form-input');
        conjugationInputs.forEach(input => {
            input.disabled = false;
            input.classList.remove('disabled');
            input.classList.add('editable');
        });

        // Update button states
        const enableBtn = document.getElementById('enableManualEditBtn');
        const disableBtn = document.getElementById('disableManualEditBtn');
        if (enableBtn) enableBtn.classList.add('hidden');
        if (disableBtn) disableBtn.classList.remove('hidden');

        this.showSuccess('Manual editing enabled. You can now modify conjugation forms.');
    }

    disableManualEditing() {
        // Disable all conjugation form inputs
        const conjugationInputs = document.querySelectorAll('.conjugation-form-input');
        conjugationInputs.forEach(input => {
            input.disabled = true;
            input.classList.remove('editable');
            input.classList.add('disabled');
        });

        // Update button states
        const enableBtn = document.getElementById('enableManualEditBtn');
        const disableBtn = document.getElementById('disableManualEditBtn');
        if (enableBtn) enableBtn.classList.remove('hidden');
        if (disableBtn) disableBtn.classList.add('hidden');

        this.showSuccess('Manual editing disabled. Conjugation forms are now read-only.');
    }

    showManualEditingButtons() {
        const enableBtn = document.getElementById('enableManualEditBtn');
        const disableBtn = document.getElementById('disableManualEditBtn');

        if (enableBtn && disableBtn) {
            enableBtn.classList.remove('hidden');
            disableBtn.classList.add('hidden');
        }
    }

    areDefaultArgumentsSet(pattern) {
        const args = pattern.slice(1, -1).split('-');

        for (const arg of args) {
            switch (arg) {
                case 'S':
                    // Only check subject arguments for 3sg and 3pl (not 1sg)
                    const subject3sgElement = document.querySelector('[data-arg="subject"][data-person="3sg"]');
                    const subject3plElement = document.querySelector('[data-arg="subject"][data-person="3pl"]');

                    const subject3sg = subject3sgElement?.value;
                    const subject3sgAdj = subject3sgElement?.parentElement?.querySelector('.adjective-select')?.value;
                    const subject3pl = subject3plElement?.value;
                    const subject3plAdj = subject3plElement?.parentElement?.querySelector('.adjective-select')?.value;

                    if (!subject3sg || !subject3sgAdj || !subject3pl || !subject3plAdj) {
                        return false;
                    }
                    break;

                case 'DO':
                    // Check if direct object arguments are set for all person forms
                    const personForms = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
                    for (const person of personForms) {
                        const doElement = document.querySelector(`[data-arg="direct_object"][data-person="${person}"]`);
                        const noun = doElement?.value;
                        const adjective = doElement?.parentElement?.querySelector('.adjective-select')?.value;
                        if (!noun || !adjective) {
                            return false;
                        }
                    }
                    break;

                case 'IO':
                    // Check if indirect object arguments are set for all person forms
                    for (const person of personForms) {
                        const ioElement = document.querySelector(`[data-arg="indirect_object"][data-person="${person}"]`);
                        const noun = ioElement?.value;
                        const adjective = ioElement?.parentElement?.querySelector('.adjective-select')?.value;
                        if (!noun || !adjective) {
                            return false;
                        }
                    }
                    break;
            }
        }

        return true;
    }

    setupRawGlossValidation() {
        const rawGlossInputs = document.querySelectorAll('.raw-gloss-input');
        rawGlossInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateRawGloss(e.target);
            });
        });
    }

    validateRawGloss(input) {
        const value = input.value.trim();

        // Enhanced raw gloss validation
        const isValid = this.validateRawGlossPattern(value);

        if (isValid.isValid) {
            input.classList.remove('error');
            input.classList.add('valid');

            // Show helpful feedback
            this.showRawGlossFeedback(input, isValid);
        } else {
            input.classList.remove('valid');
            input.classList.add('error');

            // Show error feedback
            this.showRawGlossError(input, isValid);
        }
    }

    validateRawGlossPattern(rawGloss) {
        if (!rawGloss) {
            return { isValid: false, error: 'Raw gloss is required' };
        }

        // Check for basic structure: V MedAct Tense <S:Case> <DO:Case> etc.
        const pattern = /^V\s+(MedAct|Act|Pass)\s+(Pres|Impf|Fut|Aor|Opt|Impv)\s+(<[SDOI]:[A-Za-z]+>(\s+<[SDOI]:[A-Za-z]+>)*)$/;

        if (!pattern.test(rawGloss)) {
            return {
                isValid: false,
                error: 'Raw gloss must follow format: V MedAct Tense <S:Erg> <DO:Nom> etc.',
                suggestion: 'Example: V MedAct Pres <S:Erg> <DO:Dat>'
            };
        }

        // Extract and validate argument patterns
        const args = rawGloss.match(/<([SDOI]):([A-Za-z]+)>/g);
        if (!args) {
            return { isValid: false, error: 'No valid arguments found in raw gloss' };
        }

        // Check that arguments match the global pattern
        const globalPattern = document.getElementById('argumentPattern').value;
        if (globalPattern) {
            const expectedArgs = globalPattern.slice(1, -1).split('-');
            const foundArgs = args.map(arg => arg.match(/<([SDOI]):/)[1]);

            if (!this.arraysMatch(expectedArgs, foundArgs)) {
                return {
                    isValid: false,
                    error: 'Arguments in raw gloss do not match global pattern',
                    expected: expectedArgs,
                    found: foundArgs
                };
            }
        }

        return {
            isValid: true,
            parsed: this.parseRawGloss(rawGloss),
            message: 'Raw gloss is valid and matches global pattern'
        };
    }

    parseRawGloss(rawGloss) {
        const parts = rawGloss.split(/\s+/);
        const result = {
            verbType: parts[0],
            voice: parts[1],
            tense: parts[2],
            arguments: []
        };

        // Extract arguments
        const args = rawGloss.match(/<([SDOI]):([A-Za-z]+)>/g);
        if (args) {
            args.forEach(arg => {
                const match = arg.match(/<([SDOI]):([A-Za-z]+)>/);
                if (match) {
                    result.arguments.push({
                        type: match[1],
                        case: match[2]
                    });
                }
            });
        }

        return result;
    }

    arraysMatch(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        return arr1.every(item => arr2.includes(item));
    }

    showRawGlossFeedback(input, validation) {
        // Show success feedback
        const feedback = input.parentNode.querySelector('.field-feedback');
        if (feedback) {
            feedback.innerHTML = `<span class="feedback-success">${validation.message}</span>`;
        }
    }

    showRawGlossError(input, validation) {
        // Show error feedback
        const feedback = input.parentNode.querySelector('.field-feedback');
        if (feedback) {
            feedback.innerHTML = `<span class="feedback-error">${validation.error}</span>`;
            if (validation.suggestion) {
                feedback.innerHTML += `<br><span class="feedback-suggestion">Suggestion: ${validation.suggestion}</span>`;
            }
        }
    }

    generateTenseSection(tense) {
        const personForms = this.getPersonFormsForTense(tense);

        const html = `
            <div class="tense-section" data-tense="${tense}">
                <h3>${tense.charAt(0).toUpperCase() + tense.slice(1)} Tense</h3>
                
                <div class="form-group">
                    <label for="rawGloss_${tense}">Raw Gloss:</label>
                    <input type="text" id="rawGloss_${tense}" name="rawGloss_${tense}"
                           placeholder="V MedAct Pres <S:Erg> <DO:Nom>" class="raw-gloss-input">
                    <div class="field-help">Enter case-specific raw gloss for ${tense} tense</div>
                    <div class="field-feedback"></div>
                </div>

                <div class="conjugation-forms">
                    <h4>Conjugation Forms</h4>
                    <div class="field-help">
                        <strong>Note:</strong> These are the verb forms. Click "Enable Manual Editing" to modify them.
                    </div>
                    
                    <div class="conjugation-forms-grid" id="conjugationForms_${tense}">
                        ${personForms.map(person => `
                            <div class="form-item" data-tense="${tense}" data-person="${person}">
                                <label>${person}:</label>
                                <input type="text" 
                                       class="conjugation-form-input disabled" 
                                       id="conjugation_${tense}_${person}" 
                                       data-tense="${tense}" 
                                       data-person="${person}"
                                       disabled
                                       placeholder="Enter conjugation form">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Example Generation Section -->
                <div class="examples-section" id="examplesSection_${tense}">
                    <h4>Example Sentences</h4>
                    <div class="field-help">
                        <strong>Note:</strong> Generate example sentences using the arguments and preverbs configured above.
                    </div>
                    
                    <!-- Preverb Selection (for multi-preverb verbs) -->
                    <div class="preverb-selection" id="preverbSelection_${tense}" style="display: none;">
                        <h5>Select Preverbs to Preview:</h5>
                        <div class="preverb-checkboxes" id="preverbCheckboxes_${tense}">
                            <!-- Preverb checkboxes will be dynamically generated -->
                        </div>
                    </div>
                    
                    <!-- Generate Examples Button -->
                    <div class="example-actions">
                        <button type="button" class="btn btn-primary generate-examples-btn" 
                                data-tense="${tense}" id="generateExamplesBtn_${tense}">
                            Generate Examples
                        </button>
                        <div class="example-loading" id="exampleLoading_${tense}" style="display: none;">
                            <span class="loading-spinner"></span>
                            <span>Generating examples...</span>
                        </div>
                    </div>
                    
                    <!-- Examples Container -->
                    <div class="examples-container" id="examplesContainer_${tense}" style="display: none;">
                        <!-- Examples will be dynamically generated here -->
                    </div>
                    
                    <!-- Error Display -->
                    <div class="example-error" id="exampleError_${tense}" style="display: none;">
                        <div class="error-message"></div>
                        <div class="error-guidance"></div>
                    </div>
                </div>
            </div>
        `;

        return html;
    }

    getPersonFormsForTense(tense) {
        switch (tense) {
            case 'imperative':
                // Georgian imperatives only have 2nd person forms
                return ['2sg', '2pl'];
            default:
                // Present, Imperfect, Future, Aorist, Optative: all 6 person forms
                return ['1sg', '1pl', '2sg', '2pl', '3sg', '3pl'];
        }
    }

    generatePersonForm(tense, person, args) {
        let html = `
            <div class="person-form" data-tense="${tense}" data-person="${person}">
                <h5>${person}</h5>
        `;

        args.forEach(arg => {
            html += this.generateArgumentForm(tense, person, arg);
        });

        html += `</div>`;
        return html;
    }

    generateArgumentForm(tense, person, arg) {
        const argType = this.getArgumentType(arg);
        const nounOptions = this.getNounOptions(argType);

        return `
            <div class="argument-form" data-arg="${arg}">
                <label>${this.getArgumentLabel(arg)}:</label>
                <div class="noun-adjective-pair">
                    <select class="noun-select" data-arg="${arg}" data-person="${person}" data-tense="${tense}">
                        <option value="">Select noun</option>
                        ${nounOptions}
                    </select>
                    <select class="adjective-select" data-arg="${arg}" data-person="${person}" data-tense="${tense}">
                        <option value="">Select adjective</option>
                        ${this.getAdjectiveOptions()}
                    </select>
                </div>
            </div>
        `;
    }

    generateArgumentForms(tense, person, globalPattern) {
        const args = globalPattern.slice(1, -1).split('-');
        let html = '';

        args.forEach(arg => {
            switch (arg) {
                case 'S':
                    // Never show subject for 1sg or imperative
                    if (person !== '1sg' && tense !== 'imperative') {
                        html += this.generateArgumentForm(tense, person, 'subject');
                    }
                    break;
                case 'DO':
                    html += this.generateArgumentForm(tense, person, 'direct_object');
                    break;
                case 'IO':
                    html += this.generateArgumentForm(tense, person, 'indirect_object');
                    break;
            }
        });

        return html;
    }

    generateArgumentForm(tense, person, argType) {
        // Convert argument type to database type
        const databaseType = this.getArgumentType(argType);

        // Get the default values from the Arguments section
        const defaultNoun = this.getDefaultArgumentValue(argType, person, 'noun');
        const defaultAdjective = this.getDefaultArgumentValue(argType, person, 'adjective');

        if (!defaultNoun && !defaultAdjective) {
            return '';
        }

        return `
            <div class="argument-form" data-arg="${argType}">
                <label>${this.getArgumentLabel(argType)}:</label>
                <div class="argument-display">
                    <span class="argument-value">
                        ${defaultAdjective ? `<strong>${defaultAdjective}</strong> ` : ''}
                        ${defaultNoun ? defaultNoun : ''}
                    </span>
                    <small class="argument-note">(inherited from Arguments section)</small>
                </div>
            </div>
        `;
    }

    getDefaultArgumentValue(argType, person, valueType) {
        // Find the corresponding element in the Arguments section
        if (valueType === 'noun') {
            const nounElement = document.querySelector(`.noun-select[data-arg="${argType}"][data-person="${person}"]`);
            return nounElement?.value || '';
        } else if (valueType === 'adjective') {
            const adjElement = document.querySelector(`.adjective-select[data-arg="${argType}"][data-person="${person}"]`);
            return adjElement?.value || '';
        }
        return '';
    }

    getArgumentType(arg) {
        switch (arg) {
            case 'S':
            case 'subject': return 'subjects';
            case 'DO':
            case 'direct_object': return 'direct_objects';
            case 'IO':
            case 'indirect_object': return 'indirect_objects';
            default: return 'subjects';
        }
    }

    getArgumentLabel(arg) {
        switch (arg) {
            case 'S': return 'Subject';
            case 'DO': return 'Direct Object';
            case 'IO': return 'Indirect Object';
            default: return arg;
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



    // Preverb Configuration Management Methods
    getPreverbConfigData() {
        const hasMultiplePreverbs = document.querySelector('input[name="hasMultiplePreverbs"]:checked')?.value === 'true';

        if (!hasMultiplePreverbs) {
            return {
                has_multiple_preverbs: false,
                default_preverb: '',
                available_preverbs: [],
                has_complex_rules: false,
                has_argument_overrides: false
            };
        }

        const defaultPreverb = document.getElementById('defaultPreverb')?.value || '';
        const availablePreverbs = Array.from(document.querySelectorAll('input[name="availablePreverbs"]:checked')).map(cb => cb.value);

        // Get advanced configuration states
        const hasComplexRules = document.getElementById('hasComplexRules')?.checked || false;
        const hasArgumentOverrides = document.getElementById('hasArgumentOverrides')?.checked || false;

        return {
            has_multiple_preverbs: true,
            default_preverb: defaultPreverb,
            available_preverbs: availablePreverbs,
            has_complex_rules: hasComplexRules,
            has_argument_overrides: hasArgumentOverrides,
            rules: this.getPreverbRules(),
            overrides: this.getPreverbOverrides(),
            translations: this.getPreverbTranslations()
        };
    }

    getPreverbRules() {
        const rules = {
            replacements: {},
            tense_specific_fallbacks: {},
            english_fallbacks: {}
        };

        // Automatically generate replacements based on available preverbs (1:1 mapping)
        const availablePreverbs = this.getAvailablePreverbs();

        availablePreverbs.forEach(preverb => {
            rules.replacements[preverb] = preverb;
        });

        // Get tense-specific fallbacks from the new interface
        const tenseFallbackItems = document.querySelectorAll('.fallback-item');

        tenseFallbackItems.forEach((item, index) => {
            const preverb = item.querySelector('[data-field="preverb"]')?.value;
            const fallback = item.querySelector('[data-field="fallback"]')?.value;
            const selectedTenses = Array.from(item.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

            if (preverb && fallback && selectedTenses.length > 0) {
                if (!rules.tense_specific_fallbacks[preverb]) {
                    rules.tense_specific_fallbacks[preverb] = {};
                }
                if (!rules.english_fallbacks[preverb]) {
                    rules.english_fallbacks[preverb] = {};
                }

                // Apply the fallback to all selected tenses
                selectedTenses.forEach(tense => {
                    rules.tense_specific_fallbacks[preverb][tense] = fallback;
                    rules.english_fallbacks[preverb][tense] = fallback; // Always the same as tense-specific
                });
            }
        });

        return rules;
    }

    getPreverbOverrides() {
        const overrides = {};
        const overrideItems = document.querySelectorAll('.override-item');

        overrideItems.forEach(item => {
            const preverb = item.querySelector('[data-field="preverb"]')?.value;
            const selectedArguments = Array.from(item.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

            if (preverb && selectedArguments.length > 0) {
                if (!overrides[preverb]) {
                    overrides[preverb] = { arguments: {} };
                }

                selectedArguments.forEach(argType => {
                    const argTypeKey = this.getArgumentType(argType);
                    const personForms = this.getPersonFormsForArgument(argType);

                    if (!overrides[preverb].arguments[argTypeKey]) {
                        overrides[preverb].arguments[argTypeKey] = {};
                    }

                    personForms.forEach(person => {
                        const nounSelect = item.querySelector(`[data-override-id="${item.id}"][data-arg="${argTypeKey}"][data-person="${person}"].noun-select`);
                        const adjectiveSelect = item.querySelector(`[data-override-id="${item.id}"][data-arg="${argTypeKey}"][data-person="${person}"].adjective-select`);

                        const noun = nounSelect?.value || '';
                        const adjective = adjectiveSelect?.value || '';

                        if (noun || adjective) {
                            overrides[preverb].arguments[argTypeKey][person] = {
                                noun: noun,
                                adjective: adjective
                            };
                        }
                    });
                });
            }
        });

        return overrides;
    }

    getPreverbTranslations() {
        const translations = {};
        const translationItems = document.querySelectorAll('.translation-item');

        translationItems.forEach(item => {
            const preverb = item.querySelector('[data-field="preverb"]')?.value;

            if (preverb) {
                // Collect all tense translations for this preverb
                const preverbTranslations = {};
                const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

                tenses.forEach(tense => {
                    const translationInput = document.getElementById(`translation${tense.charAt(0).toUpperCase() + tense.slice(1)}_${item.id}`);
                    if (translationInput && translationInput.value.trim()) {
                        preverbTranslations[tense] = translationInput.value.trim();
                    }
                });

                // Only add to translations if there are actual translations
                if (Object.keys(preverbTranslations).length > 0) {
                    translations[preverb] = preverbTranslations;
                }
            }
        });

        return translations;
    }

    getAvailablePreverbs() {
        const availablePreverbs = Array.from(document.querySelectorAll('input[name="availablePreverbs"]:checked')).map(cb => cb.value);
        return availablePreverbs.length > 0 ? availablePreverbs : ['მი', 'მო', 'გა', 'წა', 'შე', 'გამო', 'ჩა', 'და'];
    }

    generatePreverbOptions(selectedValue = '') {
        const availablePreverbs = this.getAvailablePreverbs();
        return availablePreverbs.map(preverb =>
            `<option value="${preverb}" ${preverb === selectedValue ? 'selected' : ''}>${preverb}</option>`
        ).join('');
    }

    generatePersonFormsGrid(personForms, argType, overrideId = null) {
        let html = '<div class="person-forms-grid">';

        // Group person forms into pairs for 2x3 grid
        for (let i = 0; i < personForms.length; i += 2) {
            const person1 = personForms[i];
            const person2 = personForms[i + 1];

            html += '<div class="person-row">';

            // First person in the row
            const adjectiveOptions1 = this.getAdjectiveOptions();
            const nounOptions1 = this.getNounOptions(this.getArgumentType(argType));

            html += `
                <div class="form-group">
                    <label>${person1}:</label>
                    <div class="noun-adjective-pair">
                        <div class="dropdown-group">
                            <label class="dropdown-label">Adjective:</label>
                            <select class="adjective-select" data-arg="${argType}" data-person="${person1}" ${overrideId ? `data-override-id="${overrideId}"` : ''}>
                                <option value="">Select adjective</option>
                                ${adjectiveOptions1}
                            </select>
                        </div>
                        <div class="dropdown-group">
                            <label class="dropdown-label">Noun:</label>
                            <select class="noun-select" data-arg="${argType}" data-person="${person1}" ${overrideId ? `data-override-id="${overrideId}"` : ''}>
                                <option value="">Select noun</option>
                                ${nounOptions1}
                            </select>
                        </div>
                    </div>
                </div>
            `;

            // Second person in the row (if exists)
            if (person2) {
                const adjectiveOptions2 = this.getAdjectiveOptions();
                const nounOptions2 = this.getNounOptions(this.getArgumentType(argType));

                html += `
                    <div class="form-group">
                        <label>${person2}:</label>
                        <div class="noun-adjective-pair">
                            <div class="dropdown-group">
                                <label class="dropdown-label">Adjective:</label>
                                <select class="adjective-select" data-arg="${argType}" data-person="${person2}" ${overrideId ? `data-override-id="${overrideId}"` : ''}>
                                    <option value="">Select adjective</option>
                                    ${adjectiveOptions2}
                                </select>
                            </div>
                            <div class="dropdown-group">
                                <label class="dropdown-label">Noun:</label>
                                <select class="noun-select" data-arg="${argType}" data-person="${person2}" ${overrideId ? `data-override-id="${overrideId}"` : ''}>
                                    <option value="">Select noun</option>
                                    ${nounOptions2}
                                </select>
                            </div>
                        </div>
                    </div>
                `;
            }

            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    updatePreverbDropdowns() {
        const availablePreverbs = this.getAvailablePreverbs();
        const preverbOptions = availablePreverbs.map(preverb =>
            `<option value="${preverb}">${preverb}</option>`
        ).join('');

        // Update default preverb replacement dropdown
        const defaultReplacementSelect = document.getElementById('defaultPreverbReplacement');
        if (defaultReplacementSelect) {
            const currentValue = defaultReplacementSelect.value;
            defaultReplacementSelect.innerHTML = '<option value="">Select default replacement preverb</option>' + preverbOptions;
            if (currentValue && availablePreverbs.includes(currentValue)) {
                defaultReplacementSelect.value = currentValue;
            }
        }

        // Update all existing fallback and replacement dropdowns
        const allDropdowns = document.querySelectorAll('[data-field="preverb"], [data-field="fallback"], [data-field="original-preverb"], [data-field="replacement-preverb"]');
        allDropdowns.forEach(dropdown => {
            const currentValue = dropdown.value;
            const isPreverbField = dropdown.getAttribute('data-field') === 'preverb';
            const isFallbackField = dropdown.getAttribute('data-field') === 'fallback';
            const isOriginalField = dropdown.getAttribute('data-field') === 'original-preverb';
            const isReplacementField = dropdown.getAttribute('data-field') === 'replacement-preverb';

            let placeholder = '';
            if (isPreverbField) placeholder = 'Select preverb';
            else if (isFallbackField) placeholder = 'Select fallback preverb';
            else if (isOriginalField) placeholder = 'Select original preverb';
            else if (isReplacementField) placeholder = 'Select replacement preverb';

            dropdown.innerHTML = `<option value="">${placeholder}</option>` + preverbOptions;
            if (currentValue && availablePreverbs.includes(currentValue)) {
                dropdown.value = currentValue;
            }
        });
    }

    updatePreverbSelectionOnConfigChange() {
        // Update preverb selection for all tenses when configuration changes
        const verbData = this.collectCurrentVerbData();
        if (!verbData || !verbData.verbs) {
            return;
        }

        const georgianText = Object.keys(verbData.verbs)[0];
        const actualVerbData = verbData.verbs[georgianText];

        if (actualVerbData.preverb_config?.has_multiple_preverbs) {
            const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
            tenses.forEach(tense => {
                this.showPreverbSelection(tense, actualVerbData);
            });
        } else {
            // Hide preverb selection for all tenses if no longer multi-preverb
            const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
            tenses.forEach(tense => {
                const preverbSelection = document.getElementById(`preverbSelection_${tense}`);
                if (preverbSelection) {
                    preverbSelection.style.display = 'none';
                }
            });
        }
    }

    addTenseFallback() {
        const fallbacksList = document.getElementById('tenseFallbacksList');
        const fallbackId = 'fallback_' + Date.now();
        const preverbOptions = this.generatePreverbOptions();

        const fallbackHTML = `
            <div class="fallback-item" id="${fallbackId}">
                <div class="fallback-controls">
                    <button type="button" class="btn btn-danger btn-small" onclick="verbEditor.removeTenseFallback('${fallbackId}')">Remove</button>
                </div>
                <h5>Tense Fallback</h5>
                <div class="fallback-fields">
                    <div class="fallback-field">
                        <label>Preverb:</label>
                        <select data-field="preverb" data-fallback-id="${fallbackId}">
                            <option value="">Select preverb</option>
                            ${preverbOptions}
                        </select>
                        <div class="field-help">Select the preverb that should fall back to another preverb in specific tenses</div>
                    </div>
                    
                    <div class="fallback-field">
                        <label>Tenses to Apply Fallback:</label>
                        <div class="checkbox-group">
                            <label><input type="checkbox" value="present" data-fallback-id="${fallbackId}"> Present</label>
                            <label><input type="checkbox" value="imperfect" data-fallback-id="${fallbackId}"> Imperfect</label>
                            <label><input type="checkbox" value="future" data-fallback-id="${fallbackId}"> Future</label>
                            <label><input type="checkbox" value="aorist" data-fallback-id="${fallbackId}"> Aorist</label>
                            <label><input type="checkbox" value="optative" data-fallback-id="${fallbackId}"> Optative</label>
                            <label><input type="checkbox" value="imperative" data-fallback-id="${fallbackId}"> Imperative</label>
                        </div>
                        <div class="field-help">Select which tenses should use the fallback preverb</div>
                    </div>
                    
                    <div class="fallback-field">
                        <label>Fallback Preverb:</label>
                        <select data-field="fallback" data-fallback-id="${fallbackId}">
                            <option value="">Select fallback preverb</option>
                            ${preverbOptions}
                        </select>
                        <div class="field-help">Select the preverb to use as fallback in the selected tenses</div>
                    </div>
                </div>
            </div>
        `;

        fallbacksList.insertAdjacentHTML('beforeend', fallbackHTML);

        // Add event listeners for the new interface
        const preverbSelect = document.querySelector(`[data-fallback-id="${fallbackId}"][data-field="preverb"]`);
        const fallbackSelect = document.querySelector(`[data-fallback-id="${fallbackId}"][data-field="fallback"]`);
        const tenseCheckboxes = document.querySelectorAll(`input[type="checkbox"][data-fallback-id="${fallbackId}"]`);

        if (preverbSelect) {
            preverbSelect.addEventListener('change', (e) => {
                this.handleTenseFallbackChange(fallbackId, e.target.value);
            });
        }

        if (fallbackSelect) {
            fallbackSelect.addEventListener('change', (e) => {
                this.handleTenseFallbackChange(fallbackId, preverbSelect.value);
            });
        }

        tenseCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleTenseFallbackChange(fallbackId, preverbSelect.value);
            });
        });

        this.autoSave();
        this.showSuccess('Tense fallback added');
    }

    handleTenseFallbackChange(fallbackId, selectedPreverb) {
        // This method can be used for any additional logic when fallback settings change
    }



    addPreverbOverride() {
        const overridesList = document.getElementById('preverbOverridesList');
        const overrideId = 'override_' + Date.now();
        const preverbOptions = this.generatePreverbOptions();

        const overrideHTML = `
            <div class="override-item" id="${overrideId}">
                <div class="override-controls">
                    <button type="button" class="btn btn-danger btn-small" onclick="verbEditor.removePreverbOverride('${overrideId}')">Remove</button>
                </div>
                <h5>Argument Override</h5>
                <div class="override-fields">
                    <div class="override-fields-left">
                        <div class="override-field">
                            <label>Preverb:</label>
                            <select data-field="preverb" data-override-id="${overrideId}">
                                <option value="">Select preverb</option>
                                ${preverbOptions}
                            </select>
                            <div class="field-help">Select the preverb for which you want to override arguments</div>
                        </div>
                        
                        <div class="override-field">
                            <label>Arguments to Override:</label>
                            <div class="checkbox-group">
                                <label><input type="checkbox" value="S" data-override-id="${overrideId}"> Subject</label>
                                <label><input type="checkbox" value="DO" data-override-id="${overrideId}"> Direct Object</label>
                                <label><input type="checkbox" value="IO" data-override-id="${overrideId}"> Indirect Object</label>
                            </div>
                            <div class="field-help">Select which arguments you want to override for this preverb</div>
                        </div>
                    </div>
                    
                    <div class="argument-overrides" id="argument-overrides-${overrideId}" style="display: none;">
                        <h6>Argument Overrides for <span class="selected-preverb">[Preverb]</span></h6>
                        <div class="argument-override-content">
                            <!-- Argument override fields will be dynamically generated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        overridesList.insertAdjacentHTML('beforeend', overrideHTML);

        // Add event listeners
        const preverbSelect = document.querySelector(`[data-override-id="${overrideId}"]`);
        const argumentCheckboxes = document.querySelectorAll(`input[type="checkbox"][data-override-id="${overrideId}"]`);

        if (preverbSelect) {
            preverbSelect.addEventListener('change', (e) => {
                this.handlePreverbOverrideChange(overrideId, e.target.value);
            });
        }

        argumentCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleArgumentOverrideChange(overrideId);
            });
        });

        this.autoSave();
        this.showSuccess('Preverb override added');
    }

    addPreverbTranslation() {
        const translationsList = document.getElementById('preverbTranslationsList');
        const translationId = 'translation_' + Date.now();
        const preverbOptions = this.generatePreverbOptions();

        const translationHTML = `
            <div class="translation-item" id="${translationId}">
                <div class="translation-controls">
                    <button type="button" class="btn btn-danger btn-small" onclick="verbEditor.removePreverbTranslation('${translationId}')">Remove</button>
                </div>
                <h5>Translation Override</h5>
                <div class="translation-fields">
                    <div class="translation-field">
                        <label>Preverb:</label>
                        <select data-field="preverb" data-translation-id="${translationId}">
                            <option value="">Select preverb</option>
                            ${preverbOptions}
                        </select>
                        <div class="field-help">Select the preverb for which you want to define specific English translations</div>
                    </div>
                    
                    <div class="translation-overrides" id="translation-overrides-${translationId}" style="display: none;">
                        <h6>English Translations for <span class="selected-preverb">[Preverb]</span></h6>
                        <div class="translations-grid">
                            <div class="form-group">
                                <label for="translationPresent_${translationId}">Present:</label>
                                <input type="text" id="translationPresent_${translationId}" name="translationPresent_${translationId}" placeholder="to show">
                                <div class="field-help">Present form (e.g., 'to show')</div>
                            </div>

                            <div class="form-group">
                                <label for="translationImperfect_${translationId}">Imperfect:</label>
                                <input type="text" id="translationImperfect_${translationId}" name="translationImperfect_${translationId}" placeholder="was showing">
                                <div class="field-help">Past continuous (e.g., 'was showing')</div>
                            </div>

                            <div class="form-group">
                                <label for="translationFuture_${translationId}">Future:</label>
                                <input type="text" id="translationFuture_${translationId}" name="translationFuture_${translationId}" placeholder="will show">
                                <div class="field-help">Future tense (e.g., 'will show')</div>
                            </div>

                            <div class="form-group">
                                <label for="translationAorist_${translationId}">Aorist:</label>
                                <input type="text" id="translationAorist_${translationId}" name="translationAorist_${translationId}" placeholder="showed">
                                <div class="field-help">Simple past (e.g., 'showed')</div>
                            </div>

                            <div class="form-group">
                                <label for="translationOptative_${translationId}">Optative:</label>
                                <input type="text" id="translationOptative_${translationId}" name="translationOptative_${translationId}" placeholder="show">
                                <div class="field-help">Subjunctive/optative (e.g., 'show')</div>
                            </div>

                            <div class="form-group">
                                <label for="translationImperative_${translationId}">Imperative:</label>
                                <input type="text" id="translationImperative_${translationId}" name="translationImperative_${translationId}" placeholder="show">
                                <div class="field-help">Command form (e.g., 'show')</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        translationsList.insertAdjacentHTML('beforeend', translationHTML);

        // Add event listener for the preverb selection
        const preverbSelect = document.querySelector(`[data-translation-id="${translationId}"]`);
        if (preverbSelect) {
            preverbSelect.addEventListener('change', (e) => {
                this.handlePreverbTranslationChange(translationId, e.target.value);
            });
        }

        this.autoSave();
        this.showSuccess('Preverb translation override added');
    }

    handlePreverbTranslationChange(translationId, selectedPreverb) {
        const translationsContainer = document.getElementById(`translation-overrides-${translationId}`);
        const selectedPreverbSpan = translationsContainer?.querySelector('.selected-preverb');

        if (selectedPreverb && selectedPreverb.trim() !== '') {
            // Show the translations section
            if (translationsContainer) {
                translationsContainer.style.display = 'block';
            }

            // Update the selected preverb display
            if (selectedPreverbSpan) {
                selectedPreverbSpan.textContent = selectedPreverb;
            }

            this.showSuccess(`Preverb-specific English translations for "${selectedPreverb}" are now editable`);
        } else {
            // Hide the translations section if no preverb is selected
            if (translationsContainer) {
                translationsContainer.style.display = 'none';
            }
        }
    }

    handlePreverbOverrideChange(overrideId, selectedPreverb) {
        const overridesContainer = document.getElementById(`argument-overrides-${overrideId}`);
        const selectedPreverbSpan = overridesContainer?.querySelector('.selected-preverb');

        if (selectedPreverb && selectedPreverb.trim() !== '') {
            // Show the overrides section
            if (overridesContainer) {
                overridesContainer.style.display = 'block';
            }

            // Update the selected preverb display
            if (selectedPreverbSpan) {
                selectedPreverbSpan.textContent = selectedPreverb;
            }

            // Update argument override fields if any are selected
            this.handleArgumentOverrideChange(overrideId);

            this.showSuccess(`Argument overrides for "${selectedPreverb}" are now editable`);
        } else {
            // Hide the overrides section if no preverb is selected
            if (overridesContainer) {
                overridesContainer.style.display = 'none';
            }
        }
    }

    handleArgumentOverrideChange(overrideId) {
        const overrideItem = document.getElementById(overrideId);
        if (!overrideItem) return;

        const selectedPreverb = overrideItem.querySelector('[data-field="preverb"]')?.value;
        if (!selectedPreverb) return;

        const selectedArguments = Array.from(overrideItem.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

        const overridesContainer = document.getElementById(`argument-overrides-${overrideId}`);
        const contentContainer = overridesContainer?.querySelector('.argument-override-content');

        if (!contentContainer) return;

        // Clear existing content
        contentContainer.innerHTML = '';

        // Generate argument override fields for each selected argument
        selectedArguments.forEach(argType => {
            const argLabel = this.getArgumentLabel(argType);
            const personForms = this.getPersonFormsForArgument(argType);

            const argSection = document.createElement('div');
            argSection.className = 'argument-override-section';
            argSection.innerHTML = `
                <h6>${argLabel} Override</h6>
                <div class="field-help">Override ${argLabel.toLowerCase()} arguments for ${selectedPreverb}</div>
                ${this.generatePersonFormsGrid(personForms, this.getArgumentType(argType), overrideId)}
            `;

            contentContainer.appendChild(argSection);
        });

        // Populate with inherited values from the Arguments section
        this.populateOverrideWithInheritedValues(overrideId, selectedArguments);
    }

    getPersonFormsForArgument(argType) {
        switch (argType) {
            case 'S':
                return ['3sg', '3pl']; // Subject only has 3sg and 3pl
            case 'DO':
            case 'IO':
                return ['1sg', '1pl', '2sg', '2pl', '3sg', '3pl']; // Objects have all 6 forms
            default:
                return [];
        }
    }

    populateOverrideWithInheritedValues(overrideId, selectedArguments) {
        selectedArguments.forEach(argType => {
            const argTypeKey = this.getArgumentType(argType);
            const personForms = this.getPersonFormsForArgument(argType);

            personForms.forEach(person => {
                // Get inherited values from the Arguments section
                const inheritedNoun = this.getDefaultArgumentValue(argTypeKey, person, 'noun');
                const inheritedAdjective = this.getDefaultArgumentValue(argTypeKey, person, 'adjective');

                // Set the values in the override fields
                const nounSelect = document.querySelector(`[data-override-id="${overrideId}"][data-arg="${argTypeKey}"][data-person="${person}"].noun-select`);
                const adjectiveSelect = document.querySelector(`[data-override-id="${overrideId}"][data-arg="${argTypeKey}"][data-person="${person}"].adjective-select`);

                if (nounSelect && inheritedNoun) {
                    nounSelect.value = inheritedNoun;
                }

                if (adjectiveSelect && inheritedAdjective) {
                    adjectiveSelect.value = inheritedAdjective;
                }
            });
        });
    }

    removeTenseFallback(fallbackId) {
        document.getElementById(fallbackId)?.remove();
        this.autoSave();
        this.showSuccess('Tense fallback removed');
    }

    removePreverbOverride(overrideId) {
        document.getElementById(overrideId)?.remove();
        this.autoSave();
        this.showSuccess('Preverb override removed');
    }

    removePreverbTranslation(translationId) {
        document.getElementById(translationId)?.remove();
        this.autoSave();
        this.showSuccess('Preverb translation removed');
    }



    newVerb() {
        this.currentVerb = {
            id: null,
            georgian: '',
            english: '',
            description: '',
            category: '',
            class: '',
            semantic_key: '',
            notes: '',
            url: '',
            argument_pattern: '',
            syntax: {
                arguments: {},
                prepositions: {
                    indirect_object: '',
                    direct_object: 'the'
                },
                preverb_overrides: {}
            },
            english_translations: {
                default: {
                    present: '',
                    imperfect: '',
                    future: '',
                    aorist: '',
                    optative: '',
                    imperative: ''
                }
            },
            conjugations: {
                present: { raw_gloss: '', forms: {}, examples: [] },
                imperfect: { raw_gloss: '', forms: {}, examples: [] },
                future: { raw_gloss: '', forms: {}, examples: [] },
                aorist: { raw_gloss: '', forms: {}, examples: [] },
                optative: { raw_gloss: '', forms: {}, examples: [] },
                imperative: { raw_gloss: '', forms: {}, examples: [] }
            },
            preverb_config: {
                has_multiple_preverbs: false,
                default_preverb: '',
                available_preverbs: [],
                stem_based: false
            },
            preverb_rules: {
                default: '',
                replacements: {},
                tense_specific_fallbacks: {},
                english_fallbacks: {}
            }
        };

        this.clearForm();
        // Clear localStorage when starting a new verb
        this.storageManager.clearProgress();
        this.showSuccess('New verb form created');
    }

    async loadVerb() {
        const verbId = prompt('Enter verb ID, semantic key, or Georgian text to load:');
        if (!verbId) return;

        try {
            const verb = this.database.getVerb(verbId);

            if (verb) {
                // Clear localStorage when loading a new verb
                this.storageManager.clearProgress();
                this.loadVerbForEditing(verb);
            } else {
                this.showError('Verb not found. Please check the identifier and try again.');
            }
        } catch (error) {
            this.showError(`Failed to load verb: ${error.message}`);
        }
    }

    async saveVerb() {
        try {
            const formData = this.getFormData();

            // Validate form data
            const validationResult = this.validationEngine.validateForm(formData);

            if (!validationResult.isValid) {
                this.showValidationErrors(validationResult.errors);
                return;
            }

            // Check if verb already exists (for new verbs)
            if (!this.currentVerb || !this.currentVerb.id) {
                const existsCheck = await this.database.checkVerbExists(formData.georgian, formData.semantic_key);
                if (existsCheck.exists) {
                    this.showError('A verb with this Georgian text or semantic key already exists. Please use a different value.');
                    return;
                }
            }

            // Update current verb with form data
            if (!this.currentVerb) {
                this.currentVerb = {};
            }
            Object.assign(this.currentVerb, formData);

            // Save to localStorage
            await this.storageManager.saveProgress(this.currentVerb);

            // TODO: File I/O will be implemented later
            this.showSuccess('Verb saved to local storage successfully!');

        } catch (error) {
            this.showError(`Failed to save verb: ${error.message}`);
        }
    }

    async scrapeFromUrl() {
        const url = document.getElementById('url').value;
        if (!url) {
            this.showError('Please enter a URL first');
            return;
        }

        try {
            this.showProgress('Scraping verb data...');
            const scrapedData = await this.scraperIntegration.scrapeVerb(url);

            // Populate form with scraped data
            this.populateFormWithScrapedData(scrapedData);

            this.hideProgress();
            this.showSuccess('Verb data scraped successfully!');

        } catch (error) {
            this.hideProgress();
            this.showError(`Scraping failed: ${error.message}`);
        }
    }









    populateFormWithScrapedData(scrapedData) {
        // Populate basic fields
        if (scrapedData.georgian) {
            document.getElementById('georgian').value = scrapedData.georgian;
        }
        if (scrapedData.english) {
            document.getElementById('description').value = scrapedData.english;
        }

        // Generate semantic key from Georgian text
        if (scrapedData.georgian) {
            const semanticKey = this.scraperIntegration.generateSemanticKey(scrapedData.georgian);
            document.getElementById('semanticKey').value = semanticKey;
        }

        // Check if verb already exists
        if (scrapedData.georgian) {
            this.checkVerbExists(scrapedData.georgian);
        }

        // IMPORTANT: Call handleScrapedData to properly handle conjugation forms
        // This ensures the conjugation section is populated with scraped data
        this.handleScrapedData(scrapedData);
    }

    async checkVerbExists(georgianText) {
        try {
            const result = await this.database.checkVerbExists(georgianText);

            if (result.exists) {
                const message = `Verb "${georgianText}" already exists in the database.`;
                const choice = confirm(`${message}\n\nWould you like to edit the existing entry or continue with a new verb?`);

                if (choice) {
                    // Load existing verb for editing
                    const existingVerb = result.matches[0];
                    this.loadVerbForEditing(existingVerb);
                }
            }
        } catch (error) {
            console.warn('Failed to check if verb exists:', error);
        }
    }

    loadVerbForEditing(verb) {
        this.currentVerb = verb;

        // Populate form with existing verb data
        if (verb.georgian) document.getElementById('georgian').value = verb.georgian;
        if (verb.description) document.getElementById('description').value = verb.description;
        if (verb.category) document.getElementById('category').value = verb.category;
        if (verb.class) document.getElementById('verbClass').value = verb.class;
        if (verb.semantic_key) document.getElementById('semanticKey').value = verb.semantic_key;
        if (verb.notes) document.getElementById('notes').value = verb.notes;
        if (verb.url) document.getElementById('url').value = verb.url;

        // Populate English translations
        if (verb.english_translations && verb.english_translations.default) {
            const translations = verb.english_translations.default;
            if (translations.present) document.getElementById('translationPresent').value = translations.present;
            if (translations.imperfect) document.getElementById('translationImperfect').value = translations.imperfect;
            if (translations.future) document.getElementById('translationFuture').value = translations.future;
            if (translations.aorist) document.getElementById('translationAorist').value = translations.aorist;
            if (translations.optative) document.getElementById('translationOptative').value = translations.optative;
            if (translations.imperative) document.getElementById('translationImperative').value = translations.imperative;
        }

        // Handle argument pattern
        if (verb.argument_pattern) {
            document.getElementById('argumentPattern').value = verb.argument_pattern;
            this.handleArgumentPatternChange(verb.argument_pattern);
        }

        // Handle arguments and prepositions
        if (verb.syntax && verb.syntax.prepositions) {
            const prepositions = verb.syntax.prepositions;
            if (prepositions.subject) document.getElementById('subjectPreposition').value = prepositions.subject;
            if (prepositions.direct_object) document.getElementById('directObjectPreposition').value = prepositions.direct_object;
            if (prepositions.indirect_object) document.getElementById('indirectObjectPreposition').value = prepositions.indirect_object;
        }

        // Handle conjugations
        if (verb.conjugations) {
            this.loadConjugations(verb.conjugations);
        }

        // Handle preverb configuration
        if (verb.preverb_config && verb.preverb_config.has_multiple_preverbs) {
            document.querySelector('input[name="hasMultiplePreverbs"][value="true"]').checked = true;
            this.handlePreverbChange('true');
        }

        this.showSuccess('Existing verb loaded for editing');
    }

    loadConjugations(conjugations) {
        // Use a more robust approach to ensure conjugation forms are generated
        const maxAttempts = 10;
        let attempts = 0;

        const tryLoadConjugations = () => {
            attempts++;

            // Check if conjugation forms exist
            const hasConjugationForms = document.getElementById('conjugationsContent')?.children.length > 0;

            if (hasConjugationForms) {
                // Forms exist, populate the data
                Object.entries(conjugations).forEach(([tense, data]) => {
                    // Set raw gloss
                    const rawGlossElement = document.getElementById(`rawGloss_${tense}`);
                    if (rawGlossElement && data.raw_gloss) {
                        rawGlossElement.value = data.raw_gloss;
                        console.log(`[STORAGE] Loaded raw gloss for ${tense}: ${data.raw_gloss}`);
                    }

                    // Set conjugation forms
                    if (data.forms) {
                        Object.entries(data.forms).forEach(([person, conjugationForm]) => {
                            const conjugationElement = document.getElementById(`conjugation_${tense}_${person}`);
                            if (conjugationElement && conjugationForm) {
                                conjugationElement.value = conjugationForm;
                                conjugationElement.classList.add('has-data');
                                console.log(`[STORAGE] Loaded conjugation for ${tense} ${person}: ${conjugationForm}`);
                            }
                        });
                    }
                });
                console.log('[STORAGE] Conjugations loaded successfully');
            } else {
                // Forms don't exist yet, generate them and try again
                if (attempts === 1) {
                    // Only generate forms on first attempt
                    this.generateConjugationForms();
                }

                if (attempts < maxAttempts) {
                    // Try again after a short delay
                    setTimeout(tryLoadConjugations, 200);
                } else {
                    console.warn('[STORAGE] Failed to load conjugations after maximum attempts');
                }
            }
        };

        // Start the loading process
        tryLoadConjugations();
    }

    clearForm() {
        // Clear all form fields
        const fields = ['georgian', 'description', 'category', 'verbClass', 'url', 'argumentPattern', 'semanticKey', 'notes'];
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
            }
        });

        // Clear translation fields
        const translationFields = ['translationPresent', 'translationImperfect', 'translationFuture', 'translationAorist', 'translationOptative', 'translationImperative'];
        translationFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = '';
            }
        });

        // Clear preposition fields
        const prepositionFields = ['subjectPreposition', 'directObjectPreposition', 'indirectObjectPreposition'];
        prepositionFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                if (fieldId === 'subjectPreposition' || fieldId === 'directObjectPreposition') {
                    field.value = 'the'; // Reset to default
                } else {
                    field.value = ''; // Clear indirect object preposition
                }
            }
        });

        // Reset radio buttons
        document.querySelector('input[name="hasMultiplePreverbs"][value="false"]').checked = true;

        // Clear argument fields
        document.getElementById('argumentsContent').innerHTML = '';

        // Clear conjugations content
        document.getElementById('conjugationsContent').innerHTML = '';

        // Reset progressive disclosure
        this.progressiveDisclosure.resetAllSections();

        // Clear current verb
        this.currentVerb = null;

        // Clear localStorage
        this.storageManager.clearProgress();
    }

    showProgress(message) {
        const progressBar = document.getElementById('progressBar');
        const progressText = document.querySelector('.progress-text');

        progressBar.classList.remove('hidden');
        progressText.textContent = message;

        // Animate progress bar
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '100%';
    }

    hideProgress() {
        const progressBar = document.getElementById('progressBar');
        progressBar.classList.add('hidden');

        // Reset progress bar
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = '0%';
    }

    showValidationErrors(errors) {
        const errorDisplay = document.getElementById('errorDisplay');
        const errorList = document.getElementById('errorList');

        let errorHtml = '<ul>';
        Object.entries(errors).forEach(([field, fieldErrors]) => {
            fieldErrors.forEach(error => {
                errorHtml += `<li><strong>${field}:</strong> ${error}</li>`;
            });
        });
        errorHtml += '</ul>';

        errorList.innerHTML = errorHtml;
        errorDisplay.classList.remove('hidden');
    }

    hideErrors() {
        document.getElementById('errorDisplay').classList.add('hidden');
    }

    showSuccess(message) {
        const successMessage = document.getElementById('successMessage');
        const successText = document.getElementById('successText');

        successText.textContent = message;
        successMessage.classList.remove('hidden');

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideSuccess();
        }, 5000);
    }

    hideSuccess() {
        document.getElementById('successMessage').classList.add('hidden');
    }

    showError(message) {
        // TODO: Enhance error display
        alert(`Error: ${message}`);
    }

    /**
     * Initialize debug helper for validation debugging
     */
    initializeDebugHelper() {
        try {
            this.debugHelper = new ValidationDebugHelper(this, this.validationEngine);
        } catch (error) {
            console.error('Failed to initialize debug helper:', error);
        }
    }







    /**
     * Performance optimization methods
     */

    /**
     * Debounced event handler to prevent excessive function calls
     */
    debounce(func, delay, key) {
        if (this.debounceTimers.has(key)) {
            clearTimeout(this.debounceTimers.get(key));
        }

        const timer = setTimeout(() => {
            func();
            this.debounceTimers.delete(key);
        }, delay);

        this.debounceTimers.set(key, timer);
    }

    /**
     * Throttled event handler to limit function execution frequency
     */
    throttle(func, delay, key) {
        if (this.throttleTimers.has(key)) {
            return;
        }

        func();
        this.throttleTimers.set(key, true);

        setTimeout(() => {
            this.throttleTimers.delete(key);
        }, delay);
    }

    /**
     * Optimized DOM query with caching
     */
    getCachedElement(selector, cacheKey) {
        if (this.elementCache.has(cacheKey)) {
            return this.elementCache.get(cacheKey);
        }

        const element = document.querySelector(selector);
        if (element) {
            this.elementCache.set(cacheKey, element);
        }

        return element;
    }

    /**
     * Batch DOM updates to reduce reflows
     */
    batchDOMUpdates(updates) {
        // Use requestAnimationFrame to batch updates
        requestAnimationFrame(() => {
            updates.forEach(update => {
                try {
                    update();
                    this.performanceMetrics.domOperations++;
                } catch (error) {
                    console.warn('DOM update failed:', error);
                }
            });
        });
    }

    /**
     * Virtual scrolling for large lists
     */
    setupVirtualScrolling(container, items, itemHeight = 60) {
        if (items.length <= this.virtualScrolling.visibleItems) {
            return; // No need for virtual scrolling
        }

        this.virtualScrolling.enabled = true;
        this.virtualScrolling.totalItems = items.length;
        this.virtualScrolling.itemHeight = itemHeight;

        // Set container height for scrolling
        container.style.height = `${items.length * itemHeight}px`;
        container.style.overflow = 'auto';

        // Render only visible items
        this.renderVisibleItems(container, items, 0);

        // Add scroll listener for dynamic rendering
        container.addEventListener('scroll', this.throttle(() => {
            const scrollTop = container.scrollTop;
            const startIndex = Math.floor(scrollTop / itemHeight);
            this.renderVisibleItems(container, items, startIndex);
        }, 16, 'virtual-scroll')); // 60fps
    }

    /**
     * Render only visible items in virtual scrolling
     */
    renderVisibleItems(container, items, startIndex) {
        const endIndex = Math.min(startIndex + this.virtualScrolling.visibleItems, items.length);
        const visibleItems = items.slice(startIndex, endIndex);

        // Clear container
        container.innerHTML = '';

        // Add spacer for items before visible range
        if (startIndex > 0) {
            const spacer = document.createElement('div');
            spacer.style.height = `${startIndex * this.virtualScrolling.itemHeight}px`;
            container.appendChild(spacer);
        }

        // Render visible items
        visibleItems.forEach((item, index) => {
            const itemElement = this.createItemElement(item, startIndex + index);
            container.appendChild(itemElement);
        });

        // Add spacer for items after visible range
        if (endIndex < items.length) {
            const spacer = document.createElement('div');
            spacer.style.height = `${(items.length - endIndex) * this.virtualScrolling.itemHeight}px`;
            container.appendChild(spacer);
        }
    }

    /**
     * Create item element for virtual scrolling
     */
    createItemElement(item, index) {
        const element = document.createElement('div');
        element.className = 'virtual-scroll-item';
        element.style.height = `${this.virtualScrolling.itemHeight}px`;
        element.dataset.index = index;

        // Customize based on item type
        if (typeof item === 'string') {
            element.textContent = item;
        } else if (item.html) {
            element.innerHTML = item.html;
        } else {
            element.textContent = item.text || item.label || JSON.stringify(item);
        }

        return element;
    }

    /**
     * Memory management and cleanup
     */
    cleanup() {
        // Clear timers
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();
        this.throttleTimers.clear();

        // Clear element cache
        if (this.elementCache) {
            this.elementCache.clear();
        }

        // Clear observer callbacks
        this.observerCallbacks.clear();

        // Cleanup database
        if (this.database && typeof this.database.cleanup === 'function') {
            this.database.cleanup();
        }

        // Update memory usage
        this.performanceMetrics.memoryUsage = this.estimateMemoryUsage();
    }

    /**
     * Estimate memory usage
     */
    estimateMemoryUsage() {
        let memory = 0;

        // Estimate object sizes
        if (this.currentVerb) {
            memory += JSON.stringify(this.currentVerb).length * 2; // Rough estimate
        }

        // Estimate cache sizes
        if (this.elementCache) {
            memory += this.elementCache.size * 100; // Rough estimate per element
        }

        return memory;
    }

    /**
     * Performance monitoring and logging
     */
    logPerformanceMetrics() {
        // Disabled for performance reasons
    }

    /**
     * Get performance summary for monitoring
     */
    getPerformanceSummary() {
        return {
            totalTime: performance.now() - this.startTime,
            renderTimes: this.performanceMetrics.renderTimes,
            eventTimes: this.performanceMetrics.eventTimes,
            domOperations: this.performanceMetrics.domOperations,
            memoryUsage: this.performanceMetrics.memoryUsage,
            virtualScrolling: this.virtualScrolling,
            database: this.database ? this.database.getPerformanceSummary() : null
        };
    }

    /**
     * Performance monitoring for specific operations
     */
    measureOperation(operationName, operation) {
        const startTime = performance.now();

        try {
            const result = operation();
            this.performanceMetrics.renderTimes[operationName] = performance.now() - startTime;
            return result;
        } catch (error) {
            console.error(`Operation ${operationName} failed:`, error);
            throw error;
        }
    }

    /**
     * Optimize form rendering for large datasets
     */
    optimizeFormRendering() {
        // Enable virtual scrolling for large forms
        const forms = document.querySelectorAll('.form-section');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            if (inputs.length > 20) { // Threshold for optimization
                this.setupFormOptimization(form);
            }
        });
    }

    /**
     * Setup form optimization for large forms
     */
    setupFormOptimization(form) {
        // Lazy load form sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadFormSection(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        // Observe form sections
        const sections = form.querySelectorAll('.form-section');
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Load form section when it becomes visible
     */
    loadFormSection(section) {
        // Add loading indicator
        section.classList.add('loading');

        // Simulate loading delay for demonstration
        setTimeout(() => {
            section.classList.remove('loading');
            section.classList.add('loaded');
        }, 100);
    }

    // JSON Preview Methods
    /**
     * Show JSON preview modal with formatted data structure
     */
    showJsonPreview() {
        try {
            // Check if modal elements exist
            const modal = document.getElementById('jsonPreviewModal');
            const content = document.getElementById('jsonPreviewContent');

            if (!modal || !content) {
                throw new Error('JSON preview modal elements not found');
            }

            // Force an auto-save to ensure all current data is captured
            this.autoSave();

            // Small delay to ensure auto-save completes
            setTimeout(() => {
                try {
                    // Get the internal structure with "verbs" wrapper
                    const internalJsonData = this.generateVerbJsonWithVerbsWrapper();

                    // For preview, strip the "verbs" wrapper to show just the verb data
                    const georgianText = Object.keys(internalJsonData.verbs)[0];
                    const verbData = internalJsonData.verbs[georgianText];

                    // Create preview structure (single verb without "verbs" wrapper)
                    const previewData = {
                        [georgianText]: verbData
                    };

                    const formattedJson = JSON.stringify(previewData, null, 2);

                    content.textContent = formattedJson;
                    modal.classList.remove('hidden');
                } catch (error) {
                    console.error('Failed to generate JSON preview:', error);
                    this.showError('Failed to generate JSON preview: ' + error.message);
                }
            }, 100);
        } catch (error) {
            console.error('Failed to generate JSON preview:', error);
            this.showError('Failed to generate JSON preview: ' + error.message);
        }
    }

    /**
     * Hide JSON preview modal
     */
    hideJsonPreview() {
        const modal = document.getElementById('jsonPreviewModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    /**
     * Copy JSON to clipboard
     */
    async copyJsonToClipboard() {
        try {
            const content = document.getElementById('jsonPreviewContent');
            if (!content) {
                throw new Error('JSON content element not found');
            }

            const jsonContent = content.textContent;
            await navigator.clipboard.writeText(jsonContent);
            this.showSuccess('JSON copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
            this.showError('Failed to copy to clipboard: ' + error.message);
        }
    }

    /**
     * Download JSON as file
     */
    downloadJson() {
        try {
            const jsonData = this.generateVerbJson();
            const jsonString = JSON.stringify(jsonData, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = `verb_${jsonData.georgian || 'data'}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            this.showSuccess('JSON downloaded successfully!');
        } catch (error) {
            console.error('Failed to download JSON:', error);
            this.showError('Failed to download JSON: ' + error.message);
        }
    }

    /**
     * Generate the complete verb JSON structure for verbs.json
     */
    generateVerbJson() {
        try {
            const formData = this.getFormData();

            // Debug logging for form data structure
            console.log('[JSON_GENERATION] Form data structure:', {
                georgian: formData.georgian,
                class: formData.class,
                semantic_key: formData.semantic_key,
                hasArguments: !!formData.syntax?.arguments,
                hasPrepositions: !!formData.syntax?.prepositions,
                hasEnglishTranslations: !!formData.english_translations,
                hasPreverbConfig: !!formData.preverb_config,
                englishTranslationsKeys: formData.english_translations ? Object.keys(formData.english_translations) : [],
                preverbConfigKeys: formData.preverb_config ? Object.keys(formData.preverb_config) : []
            });

            // Validate required form data
            if (!formData) {
                throw new Error('No form data available');
            }

            // Transform form data to match the target database structure
            const verbJson = {
                id: this.currentVerb?.id || null, // Will be assigned when saving to verbs.json
                georgian: formData.georgian || '',
                description: formData.description || '', // Use description field value
                category: formData.category || '',
                class: formData.class || '',
                semantic_key: formData.semantic_key || '',
                notes: formData.notes || '',
                url: formData.url || '',

                // Syntax (argument pattern removed from final output)
                syntax: {
                    arguments: formData.syntax?.arguments || {},
                    prepositions: formData.syntax?.prepositions || {},
                    preverb_overrides: {} // Will be populated from preverb config if needed
                },

                // English translations with proper defaults
                english_translations: {
                    default: {
                        present: formData.english_translations?.default?.present || formData.description || '',
                        imperfect: formData.english_translations?.default?.imperfect || formData.description || '',
                        future: formData.english_translations?.default?.future || formData.description || '',
                        aorist: formData.english_translations?.default?.aorist || formData.description || '',
                        optative: formData.english_translations?.default?.optative || formData.description || '',
                        imperative: formData.english_translations?.default?.imperative || formData.description || ''
                    }
                },

                // Conjugations
                conjugations: formData.conjugations || {},

                // Preverb configuration (without duplicates)
                preverb_config: {
                    has_multiple_preverbs: formData.preverb_config?.has_multiple_preverbs || false,
                    default_preverb: formData.preverb_config?.default_preverb || '',
                    available_preverbs: formData.preverb_config?.available_preverbs || []
                },

                // Preverb rules (properly structured)
                preverb_rules: (() => {
                    const hasRules = formData.preverb_config && formData.preverb_config.has_multiple_preverbs && formData.preverb_config.rules;

                    if (hasRules) {
                        const rules = {
                            default: formData.preverb_config.rules.default || formData.preverb_config.default_preverb || '',
                            replacements: formData.preverb_config.rules.replacements || {},
                            tense_specific_fallbacks: formData.preverb_config.rules.tense_specific_fallbacks || {},
                            english_fallbacks: formData.preverb_config.rules.english_fallbacks || {}
                        };
                        return rules;
                    } else {
                        return {};
                    }
                })()
            };

            // Add preverb-specific translations if they exist
            if (formData.preverb_config && formData.preverb_config.has_multiple_preverbs && formData.preverb_config.translations) {
                Object.keys(formData.preverb_config.translations).forEach(preverb => {
                    if (formData.preverb_config.translations[preverb]) {
                        verbJson.english_translations[preverb] = formData.preverb_config.translations[preverb];
                    }
                });
            }

            // Add preverb overrides to syntax if they exist
            if (formData.preverb_config && formData.preverb_config.has_multiple_preverbs && formData.preverb_config.overrides) {
                verbJson.syntax.preverb_overrides = formData.preverb_config.overrides;
            }

            // Preverb rules are now handled in the initial preverb_rules assignment above

            // Debug logging for final JSON structure
            console.log('[JSON_GENERATION] Final verb JSON structure:', {
                georgian: verbJson.georgian,
                class: verbJson.class,
                semantic_key: verbJson.semantic_key,
                hasArguments: Object.keys(verbJson.syntax?.arguments || {}).length > 0,
                hasPrepositions: Object.keys(verbJson.syntax?.prepositions || {}).length > 0,
                argumentsKeys: Object.keys(verbJson.syntax?.arguments || {}),
                prepositionsKeys: Object.keys(verbJson.syntax?.prepositions || {})
            });

            return verbJson;
        } catch (error) {
            console.error('Error generating verb JSON:', error);
            throw new Error(`Failed to generate verb JSON: ${error.message}`);
        }
    }

    generateVerbJsonWithVerbsWrapper() {
        try {
            const verbData = this.generateVerbJson();
            const georgianText = verbData.georgian;

            if (!georgianText) {
                throw new Error('Georgian text is required for verbs wrapper');
            }

            // Create internal structure with "verbs" wrapper (matches verbs.json)
            const verbsWrapperJson = {
                verbs: {
                    [georgianText]: verbData
                }
            };

            return verbsWrapperJson;
        } catch (error) {
            console.error('Error generating verbs wrapper JSON:', error);
            throw new Error(`Failed to generate verbs wrapper JSON: ${error.message}`);
        }
    }

    generateVerbJsonWithMetaWrapper() {
        try {
            const verbData = this.generateVerbJson();
            const georgianText = verbData.georgian;

            if (!georgianText) {
                throw new Error('Georgian text is required for meta-verb wrapper');
            }

            // Create meta-verb wrapper structure
            const metaVerbJson = {
                [georgianText]: verbData
            };

            return metaVerbJson;
        } catch (error) {
            console.error('Error generating meta-verb JSON:', error);
            throw new Error(`Failed to generate meta-verb JSON: ${error.message}`);
        }
    }

    generateVerbJsonForVerbsFile() {
        try {
            const verbData = this.generateVerbJson();
            const georgianText = verbData.georgian;

            if (!georgianText) {
                throw new Error('Georgian text is required for verbs.json format');
            }

            // Create the structure that matches verbs.json format
            const verbsFileJson = {
                verbs: {
                    [georgianText]: verbData
                }
            };

            return verbsFileJson;
        } catch (error) {
            console.error('Error generating verbs.json format:', error);
            throw new Error(`Failed to generate verbs.json format: ${error.message}`);
        }
    }

    handleScrapedData(scrapedData) {
        // Store the scraped data
        this.scrapedData = scrapedData;

        // Populate form fields with scraped data
        if (scrapedData.georgian) {
            const georgianField = document.getElementById('georgian');
            if (georgianField) {
                georgianField.value = scrapedData.georgian;
                this.checkVerbExists(scrapedData.georgian);
            }
        }

        // Populate description field
        if (scrapedData.description) {
            const descriptionField = document.getElementById('description');
            if (descriptionField) {
                descriptionField.value = scrapedData.description;
            } else {
                console.warn('🔍 [SCRAPER] Description field not found in DOM');
            }
        }

        // Populate semantic key field
        if (scrapedData.semantic_key) {
            const semanticKeyField = document.getElementById('semanticKey');
            if (semanticKeyField) {
                semanticKeyField.value = scrapedData.semantic_key;
            } else {
                console.warn('🔍 [SCRAPER] Semantic key field not found in DOM');
            }
        }

        // Populate other fields if they exist
        if (scrapedData.verbClass) {
            const verbClassField = document.getElementById('verbClass');
            if (verbClassField) {
                verbClassField.value = scrapedData.verbClass;
            }
        }

        if (scrapedData.url) {
            const urlField = document.getElementById('url');
            if (urlField) {
                urlField.value = scrapedData.url;
            }
        }

        if (scrapedData.notes) {
            const notesField = document.getElementById('notes');
            if (notesField) {
                notesField.value = scrapedData.notes;
            }
        }

        if (scrapedData.conjugations) {
            // Generate conjugation forms if they don't exist yet
            if (!document.getElementById('conjugationsContent').children.length) {
                this.generateConjugationForms();
            }

            // Populate conjugation forms with scraped data
            this.populateConjugationFormsFromVerb(scrapedData.conjugations);
        }

        // Update progressive disclosure after populating fields
        this.updateProgressiveDisclosure();
    }

    // Example Generation Methods
    setupExampleGeneration() {
        // Add event listeners for generate examples buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('generate-examples-btn')) {
                const tense = e.target.dataset.tense;
                this.generateExamplesForTense(tense);
            }
        });

        // Add event listeners for preverb checkbox changes
        document.addEventListener('change', (e) => {
            if (e.target.name === 'preverbCheckbox') {
                const tense = e.target.dataset.tense;
                this.updatePreverbExamplesVisibility(tense);
            }
        });

        // Check server status on initialization
        this.checkServerStatus();

        // Initialize preverb selection for all tenses if verb has multiple preverbs
        this.initializePreverbSelectionForAllTenses();
    }

    async checkServerStatus() {
        try {
            const response = await fetch('http://localhost:5000/health', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                this.serverStatus = 'connected';
            } else {
                this.serverStatus = 'error';
            }
        } catch (error) {
            this.serverStatus = 'disconnected';
        }
    }

    initializePreverbSelectionForAllTenses() {
        // Get current verb data to check if it has multiple preverbs
        const verbData = this.collectCurrentVerbData();
        if (!verbData || !verbData.verbs) {
            return;
        }

        const georgianText = Object.keys(verbData.verbs)[0];
        const actualVerbData = verbData.verbs[georgianText];

        if (actualVerbData.preverb_config?.has_multiple_preverbs) {
            const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
            tenses.forEach(tense => {
                this.showPreverbSelection(tense, actualVerbData);
            });
        }
    }

    async generateExamplesForTense(tense) {
        console.log(`🔍 [EXAMPLES] Starting example generation for ${tense}`);

        const loadingElement = document.getElementById(`exampleLoading_${tense}`);
        const errorElement = document.getElementById(`exampleError_${tense}`);
        const containerElement = document.getElementById(`examplesContainer_${tense}`);

        try {
            console.log(`🔍 [EXAMPLES] Setting up loading state for ${tense}`);

            // Show loading state
            loadingElement.style.display = 'flex';
            errorElement.style.display = 'none';
            containerElement.style.display = 'none';

            console.log(`🔍 [EXAMPLES] Collecting current verb data for ${tense}`);

            // Get current verb data (now with internal "verbs" wrapper)
            const verbData = this.collectCurrentVerbData();
            console.log(`🔍 [EXAMPLES] Verb data collected:`, verbData);

            // Extract the actual verb data from the internal structure
            const georgianText = Object.keys(verbData.verbs)[0];
            const actualVerbData = verbData.verbs[georgianText];
            console.log(`🔍 [EXAMPLES] Actual verb data for ${georgianText}:`, actualVerbData);

            // Check if verb has multiple preverbs
            const hasMultiplePreverbs = actualVerbData.preverb_config?.has_multiple_preverbs;
            console.log(`🔍 [EXAMPLES] Has multiple preverbs: ${hasMultiplePreverbs}`);

            if (hasMultiplePreverbs) {
                console.log(`🔍 [EXAMPLES] Ensuring preverb selection is visible for ${tense}`);
                // Ensure preverb selection is visible but don't reset the checkboxes
                this.ensurePreverbSelectionVisible(tense, actualVerbData);
            }

            // Get selected preverbs
            const selectedPreverbs = this.getSelectedPreverbs(tense, actualVerbData);
            console.log(`🔍 [EXAMPLES] Selected preverbs for ${tense}:`, selectedPreverbs);

            console.log(`🔍 [EXAMPLES] Calling example generation script for ${tense}`);

            // Call the example generation script
            const examples = await this.callExampleGenerationScript(verbData, tense, selectedPreverbs);
            console.log(`🔍 [EXAMPLES] Received examples for ${tense}:`, examples);

            console.log(`🔍 [EXAMPLES] Displaying examples for ${tense}`);

            // Display the examples
            this.displayExamples(tense, examples);

        } catch (error) {
            console.error(`🔍 [EXAMPLES] Error generating examples for ${tense}:`, error);
            this.handleExampleGenerationError(tense, error);
        } finally {
            console.log(`🔍 [EXAMPLES] Hiding loading state for ${tense}`);
            // Hide loading state
            loadingElement.style.display = 'none';
        }
    }

    showPreverbSelection(tense, verbData) {
        const preverbSelection = document.getElementById(`preverbSelection_${tense}`);
        const checkboxesContainer = document.getElementById(`preverbCheckboxes_${tense}`);

        if (!preverbSelection || !checkboxesContainer) {
            console.warn(`🔍 [EXAMPLES] Preverb selection elements not found for ${tense}`);
            return;
        }

        // Get available preverbs
        const availablePreverbs = verbData.preverb_config?.available_preverbs || [];
        const defaultPreverb = verbData.preverb_config?.default_preverb || '';

        // Generate checkboxes
        let checkboxesHTML = '';
        availablePreverbs.forEach(preverb => {
            const isDefault = preverb === defaultPreverb;
            checkboxesHTML += `
                <label>
                    <input type="checkbox" name="preverbCheckbox" value="${preverb}" 
                           ${isDefault ? 'checked' : ''} data-tense="${tense}">
                    <span>${preverb}${isDefault ? ' (default)' : ''}</span>
                </label>
            `;
        });

        checkboxesContainer.innerHTML = checkboxesHTML;
        preverbSelection.style.display = 'block';
    }

    ensurePreverbSelectionVisible(tense, verbData) {
        const preverbSelection = document.getElementById(`preverbSelection_${tense}`);
        const checkboxesContainer = document.getElementById(`preverbCheckboxes_${tense}`);

        if (!preverbSelection || !checkboxesContainer) {
            console.warn(`🔍 [EXAMPLES] Preverb selection elements not found for ${tense}`);
            return;
        }

        // Only generate checkboxes if they don't already exist
        if (checkboxesContainer.children.length === 0) {
            // Get available preverbs
            const availablePreverbs = verbData.preverb_config?.available_preverbs || [];
            const defaultPreverb = verbData.preverb_config?.default_preverb || '';

            // Generate checkboxes
            let checkboxesHTML = '';
            availablePreverbs.forEach(preverb => {
                const isDefault = preverb === defaultPreverb;
                checkboxesHTML += `
                    <label>
                        <input type="checkbox" name="preverbCheckbox" value="${preverb}" 
                               ${isDefault ? 'checked' : ''} data-tense="${tense}">
                        <span>${preverb}${isDefault ? ' (default)' : ''}</span>
                    </label>
                `;
            });

            checkboxesContainer.innerHTML = checkboxesHTML;
        }

        // Ensure the selection is visible
        preverbSelection.style.display = 'block';
    }

    getSelectedPreverbs(tense, verbData) {
        const hasMultiplePreverbs = verbData.preverb_config?.has_multiple_preverbs;

        if (!hasMultiplePreverbs) {
            // Single preverb verb - return default preverb
            return [verbData.preverb_config?.default_preverb || ''];
        }

        // Multi-preverb verb - get selected checkboxes
        const checkboxes = document.querySelectorAll(`#preverbCheckboxes_${tense} input[type="checkbox"]:checked`);
        const selectedPreverbs = Array.from(checkboxes).map(cb => cb.value);

        // If no preverbs selected, use default
        if (selectedPreverbs.length === 0) {
            return [verbData.preverb_config?.default_preverb || ''];
        }

        return selectedPreverbs;
    }

    async callExampleGenerationScript(verbData, tense, selectedPreverbs) {
        console.log(`🔍 [EXAMPLES] callExampleGenerationScript called for ${tense}`);

        // Extract the actual verb data from the internal structure
        const georgianText = Object.keys(verbData.verbs)[0];
        const actualVerbData = verbData.verbs[georgianText];
        console.log(`🔍 [EXAMPLES] Extracted verb data for: ${georgianText}`);

        try {
            console.log(`🔍 [EXAMPLES] Preparing request payload for ${tense}`);

            // Prepare the request payload
            const requestPayload = {
                verb_data: actualVerbData,
                tense: tense,
                selected_preverbs: selectedPreverbs
            };
            console.log(`🔍 [EXAMPLES] Request payload:`, requestPayload);

            console.log(`🔍 [EXAMPLES] Making fetch request to http://localhost:5000/generate_examples`);

            // Make HTTP request to the Python script server with timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout for accurate generation

            const response = await fetch('http://localhost:5000/generate_examples', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestPayload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            console.log(`🔍 [EXAMPLES] Fetch response received:`, response.status, response.statusText);

            if (!response.ok) {
                console.log(`🔍 [EXAMPLES] Response not OK, parsing error data`);
                const errorData = await response.json();
                throw new Error(`Server error: ${errorData.error || response.statusText}`);
            }

            console.log(`🔍 [EXAMPLES] Parsing response JSON`);
            const result = await response.json();
            console.log(`🔍 [EXAMPLES] Parsed result:`, result);

            // Check if the result has the expected structure
            if (result.error) {
                console.log(`🔍 [EXAMPLES] Result contains error:`, result.error);
                // Handle error object with structured error information
                const errorMessage = result.error.message || result.error.type || JSON.stringify(result.error);
                const errorGuidance = result.error.guidance || '';
                const fullError = errorGuidance ? `${errorMessage}\n\nGuidance: ${errorGuidance}` : errorMessage;
                throw new Error(fullError);
            }

            console.log(`🔍 [EXAMPLES] Returning successful result`);
            return result;

        } catch (error) {
            console.error(`🔍 [EXAMPLES] Error calling example generation script:`, error);

            // No fallback - only accurate generation is allowed
            if (error.name === 'AbortError') {
                throw new Error('Example generation timed out. Please ensure the server is running and try again.');
            } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                throw new Error('Cannot connect to example generation server. Please ensure the server is running on localhost:5000.');
            } else {
                throw new Error(`Example generation failed: ${error.message}`);
            }
        }
    }





    generateMockExamples(verbData, tense, selectedPreverbs) {
        // This is a temporary mock implementation
        // In the real implementation, this would be replaced by the actual Python script call

        const examples = [];

        selectedPreverbs.forEach(preverb => {
            const preverbExamples = {
                preverb: preverb,
                effective_preverb: preverb,
                examples: []
            };

            // Generate mock examples for different persons
            const persons = tense === 'imperative' ? ['2sg', '2pl'] : ['1sg', '3sg', '3pl'];

            persons.forEach(person => {
                // Get the actual conjugation form for this preverb and person
                let georgianForm = '';
                if (verbData.conjugations && verbData.conjugations[tense] && verbData.conjugations[tense].forms) {
                    georgianForm = verbData.conjugations[tense].forms[person] || '';
                }

                // If no form found, create a mock form
                if (!georgianForm || georgianForm === '-') {
                    georgianForm = `${preverb}${verbData.georgian}`;
                }

                // Get English translation for this tense and preverb
                let englishTranslation = '';
                if (verbData.english_translations) {
                    if (verbData.english_translations[preverb] && verbData.english_translations[preverb][tense]) {
                        englishTranslation = verbData.english_translations[preverb][tense];
                    } else if (verbData.english_translations.default && verbData.english_translations.default[tense]) {
                        englishTranslation = verbData.english_translations.default[tense];
                    }
                }

                if (!englishTranslation) {
                    englishTranslation = verbData.semantic_key || 'to do';
                }

                const example = {
                    georgian: georgianForm,
                    english: person === '1sg' ? `I ${englishTranslation}` : `${englishTranslation}`,
                    html: `<span data-case="nom" data-role="subject">Subject</span> <span data-role="verb">${georgianForm}</span>`,
                    case_marking: {
                        subject: { case: "nom", word: "Subject" }
                    }
                };

                preverbExamples.examples.push(example);
            });

            examples.push(preverbExamples);
        });

        return {
            examples: examples,
            raw_gloss: verbData.conjugations?.[tense]?.raw_gloss || '',
            enhanced: true
        };
    }

    displayExamples(tense, examplesData) {
        const container = document.getElementById(`examplesContainer_${tense}`);
        const errorElement = document.getElementById(`exampleError_${tense}`);

        if (!container) {
            console.warn(`🔍 [EXAMPLES] Examples container not found for ${tense}`);
            return;
        }

        // Hide any existing errors
        errorElement.style.display = 'none';

        if (!examplesData.examples || examplesData.examples.length === 0) {
            container.innerHTML = '<p class="no-examples">No examples generated. Please check your configuration.</p>';
            container.style.display = 'block';
            return;
        }

        // Check for fallback warnings
        let fallbackWarningsHTML = '';
        if (examplesData.fallback_warnings && examplesData.fallback_warnings.length > 0) {
            fallbackWarningsHTML = `
                <div class="fallback-warnings">
                    <h5>⚠️ Preverb Fallback Notices:</h5>
                    ${examplesData.fallback_warnings.map(warning => `
                        <div class="fallback-warning">
                            <strong>${warning.original_preverb} → ${warning.effective_preverb}</strong>: ${warning.message}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Generate HTML for examples
        let examplesHTML = '';

        examplesData.examples.forEach(preverbData => {
            const preverbExamplesHTML = `
                <div class="preverb-examples" data-preverb="${preverbData.preverb}">
                    <h5>${preverbData.preverb} Preverb Examples:</h5>
                    ${preverbData.examples.map(example => `
                        <div class="example">
                            <div class="georgian">${example.georgian}</div>
                            <div class="english">${example.english}</div>
                        </div>
                    `).join('')}
                </div>
            `;

            examplesHTML += preverbExamplesHTML;
        });

        container.innerHTML = fallbackWarningsHTML + examplesHTML;
        container.style.display = 'block';
    }

    updatePreverbExamplesVisibility(tense) {
        const checkboxes = document.querySelectorAll(`#preverbCheckboxes_${tense} input[type="checkbox"]`);
        const preverbExamples = document.querySelectorAll(`#examplesContainer_${tense} .preverb-examples`);

        checkboxes.forEach(checkbox => {
            const preverb = checkbox.value;
            const isChecked = checkbox.checked;
            const exampleElement = document.querySelector(`#examplesContainer_${tense} .preverb-examples[data-preverb="${preverb}"]`);

            if (exampleElement) {
                exampleElement.style.display = isChecked ? 'block' : 'none';
            }
        });
    }

    handleExampleGenerationError(tense, error) {
        console.error(`🔍 [EXAMPLES] Handling error for ${tense}:`, error);

        const errorElement = document.getElementById(`exampleError_${tense}`);
        const errorMessage = errorElement.querySelector('.error-message');
        const errorGuidance = errorElement.querySelector('.error-guidance');

        // Determine error type and provide appropriate guidance
        let message = 'An error occurred while generating examples.';
        let guidance = 'Please check your configuration and try again.';

        // Check for server-related errors
        if (error.message.includes('fetch') || error.message.includes('NetworkError') ||
            error.message.includes('Failed to fetch') || this.serverStatus === 'disconnected') {
            message = 'Python example generator server is not available.';
            guidance = 'Using mock examples. To use real examples, start the Python server: python src/data/verb_editor/servers/start_all_servers.py';
        } else if (error.message.includes('Server error')) {
            message = 'Python server error occurred.';
            guidance = 'The example generator server encountered an error. Check the server logs for details.';
        } else if (error.error && error.error.type) {
            // Use backend-provided error information
            const errorType = error.error.type;
            const backendMessage = error.error.message;
            const backendGuidance = error.error.guidance;

            // Map error types to user-friendly messages
            const errorMessages = {
                'missing_arguments': 'Missing argument data for example generation.',
                'invalid_raw_gloss': 'Invalid raw gloss pattern.',
                'preverb_config': 'Preverb configuration issue.',
                'missing_lexical_data': 'Missing noun or adjective data.',
                'unknown': 'An error occurred while generating examples.'
            };

            message = errorMessages[errorType] || errorMessages['unknown'];
            guidance = backendGuidance || 'Please check your configuration and try again.';

            // Add backend details for debugging
            if (backendMessage && backendMessage !== message) {
                // Backend error details logging removed for performance
            }
        } else if (error.message.includes('arguments')) {
            message = 'Missing argument data for example generation.';
            guidance = 'Please configure arguments in the Arguments section before generating examples.';
        } else if (error.message.includes('raw_gloss')) {
            message = 'Invalid raw gloss pattern.';
            guidance = 'Please enter a valid raw gloss pattern (e.g., "<S-DO>") in the Raw Gloss field.';
        } else if (error.message.includes('preverb')) {
            message = 'Preverb configuration issue.';
            guidance = 'Please check your preverb configuration in the Preverb Configuration section.';
        }

        errorMessage.textContent = message;
        errorGuidance.textContent = guidance;
        errorElement.style.display = 'block';
    }

    collectCurrentVerbData() {
        // This method should collect all current form data and return it in the new JSON structure
        // NOW RETURNS INTERNAL STRUCTURE WITH "verbs" WRAPPER (matches verbs.json)
        const formData = this.getFormData();

        if (!formData) {
            const basicVerbData = {
                id: null,
                georgian: document.getElementById('georgian')?.value || '',
                description: document.getElementById('description')?.value || '',
                semantic_key: document.getElementById('semanticKey')?.value || '',
                conjugations: this.collectConjugationData(),
                preverb_config: this.collectPreverbConfig(),
                syntax: this.collectSyntaxData(),
                english_translations: this.collectEnglishTranslations()
            };

            // Return with internal "verbs" wrapper structure
            return {
                verbs: {
                    [basicVerbData.georgian || 'temp']: basicVerbData
                }
            };
        }

        // Use the existing form data collection and enhance it
        const verbData = {
            id: this.currentVerb?.id || null,
            georgian: formData.georgian || '',
            description: formData.description || '',
            category: formData.category || '',
            class: formData.class || '',
            semantic_key: formData.semantic_key || '',
            notes: formData.notes || '',
            url: formData.url || '',

            // Enhanced syntax data collection
            syntax: {
                arguments: this.collectEnhancedSyntaxData(),
                prepositions: formData.prepositions || {},
                preverb_overrides: formData.preverb_config?.overrides || {}
            },

            // Enhanced English translations
            english_translations: this.collectEnhancedEnglishTranslations(formData),

            // Conjugations
            conjugations: this.collectEnhancedConjugationData(),

            // Preverb configuration
            preverb_config: this.collectEnhancedPreverbConfig(formData),

            // Preverb rules
            preverb_rules: this.collectPreverbRules(formData)
        };

        // Return with internal "verbs" wrapper structure (matches verbs.json)
        return {
            verbs: {
                [verbData.georgian || 'temp']: verbData
            }
        };
    }

    collectConjugationData() {
        const conjugations = {};
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        tenses.forEach(tense => {
            const rawGloss = document.getElementById(`rawGloss_${tense}`)?.value || '';
            const forms = {};

            const personForms = this.getPersonFormsForTense(tense);
            personForms.forEach(person => {
                const form = document.getElementById(`conjugation_${tense}_${person}`)?.value || '';
                forms[person] = form;
            });

            conjugations[tense] = {
                raw_gloss: rawGloss,
                forms: forms
            };
        });

        return conjugations;
    }

    collectPreverbConfig() {
        const hasMultiplePreverbs = document.querySelector('input[name="hasMultiplePreverbs"]:checked')?.value === 'true';

        if (!hasMultiplePreverbs) {
            return {
                has_multiple_preverbs: false,
                default_preverb: ''
            };
        }

        const defaultPreverb = document.getElementById('defaultPreverb')?.value || '';
        const availablePreverbs = Array.from(document.querySelectorAll('input[name="availablePreverbs"]:checked'))
            .map(cb => cb.value);

        return {
            has_multiple_preverbs: true,
            default_preverb: defaultPreverb,
            available_preverbs: availablePreverbs
        };
    }

    collectSyntaxData() {
        // This will be enhanced to collect actual argument data
        return {
            arguments: {
                subject: {},
                direct_object: {},
                indirect_object: {}
            }
        };
    }

    collectEnglishTranslations() {
        // This will be enhanced to collect actual translation data
        return {
            default: {}
        };
    }

    collectEnhancedSyntaxData() {
        // Enhanced syntax data collection for example generation
        const syntaxArguments = {};

        // Collect subject arguments
        const subjectArgs = {};
        const persons = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];

        persons.forEach(person => {
            const nounElement = document.querySelector(`.noun-select[data-arg="subject"][data-person="${person}"]`);
            const adjElement = document.querySelector(`.adjective-select[data-arg="subject"][data-person="${person}"]`);

            if (nounElement || adjElement) {
                subjectArgs[person] = {
                    noun: nounElement?.value || '',
                    adjective: adjElement?.value || ''
                };
            }
        });

        if (Object.keys(subjectArgs).length > 0) {
            syntaxArguments.subject = subjectArgs;
        }

        // Collect direct object arguments
        const doArgs = {};
        persons.forEach(person => {
            const nounElement = document.querySelector(`.noun-select[data-arg="direct_object"][data-person="${person}"]`);
            const adjElement = document.querySelector(`.adjective-select[data-arg="direct_object"][data-person="${person}"]`);

            if (nounElement || adjElement) {
                doArgs[person] = {
                    noun: nounElement?.value || '',
                    adjective: adjElement?.value || ''
                };
            }
        });

        if (Object.keys(doArgs).length > 0) {
            syntaxArguments.direct_object = doArgs;
        }

        // Collect indirect object arguments
        const ioArgs = {};
        persons.forEach(person => {
            const nounElement = document.querySelector(`.noun-select[data-arg="indirect_object"][data-person="${person}"]`);
            const adjElement = document.querySelector(`.adjective-select[data-arg="indirect_object"][data-person="${person}"]`);

            if (nounElement || adjElement) {
                ioArgs[person] = {
                    noun: nounElement?.value || '',
                    adjective: adjElement?.value || ''
                };
            }
        });

        if (Object.keys(ioArgs).length > 0) {
            syntaxArguments.indirect_object = ioArgs;
        }

        return syntaxArguments;
    }

    collectEnhancedEnglishTranslations(formData) {
        // Enhanced English translations collection
        const translations = {
            default: {
                present: formData.english_translations?.default?.present || formData.description || '',
                imperfect: formData.english_translations?.default?.imperfect || formData.description || '',
                future: formData.english_translations?.default?.future || formData.description || '',
                aorist: formData.english_translations?.default?.aorist || formData.description || '',
                optative: formData.english_translations?.default?.optative || formData.description || '',
                imperative: formData.english_translations?.default?.imperative || formData.description || ''
            }
        };

        // Debug logging
        console.log('🔍 collectEnhancedEnglishTranslations - formData.preverb_config:', formData.preverb_config);
        console.log('🔍 collectEnhancedEnglishTranslations - formData.preverb_config?.translations:', formData.preverb_config?.translations);

        // Add preverb-specific translations if they exist
        if (formData.preverb_config?.translations) {
            Object.keys(formData.preverb_config.translations).forEach(preverb => {
                if (formData.preverb_config.translations[preverb]) {
                    translations[preverb] = formData.preverb_config.translations[preverb];
                    console.log(`🔍 Added preverb translation for ${preverb}:`, formData.preverb_config.translations[preverb]);
                }
            });
        }

        // Auto-populate preverb translations from default if they don't exist
        if (formData.preverb_config?.has_multiple_preverbs && formData.preverb_config?.available_preverbs) {
            formData.preverb_config.available_preverbs.forEach(preverb => {
                if (!translations[preverb]) {
                    console.log(`🔍 Auto-populating translation for preverb ${preverb} from default`);
                    translations[preverb] = { ...translations.default };
                }
            });
        }

        console.log('🔍 Final translations structure:', translations);
        return translations;
    }

    collectEnhancedConjugationData() {
        // Enhanced conjugation data collection
        const conjugations = {};
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        tenses.forEach(tense => {
            const rawGloss = document.getElementById(`rawGloss_${tense}`)?.value || '';
            const forms = {};

            const personForms = this.getPersonFormsForTense(tense);
            personForms.forEach(person => {
                const form = document.getElementById(`conjugation_${tense}_${person}`)?.value || '';
                forms[person] = form;
            });

            conjugations[tense] = {
                raw_gloss: rawGloss,
                forms: forms,
                examples: [] // Placeholder for generated examples
            };
        });

        return conjugations;
    }

    collectEnhancedPreverbConfig(formData) {
        // Enhanced preverb configuration collection
        const hasMultiplePreverbs = document.querySelector('input[name="hasMultiplePreverbs"]:checked')?.value === 'true';

        if (!hasMultiplePreverbs) {
            return {
                has_multiple_preverbs: false,
                default_preverb: '',
                available_preverbs: []
            };
        }

        const defaultPreverb = document.getElementById('defaultPreverb')?.value || '';
        const availablePreverbs = Array.from(document.querySelectorAll('input[name="availablePreverbs"]:checked'))
            .map(cb => cb.value);

        return {
            has_multiple_preverbs: true,
            default_preverb: defaultPreverb,
            available_preverbs: availablePreverbs
        };
    }

    collectPreverbRules(formData) {
        // Collect preverb rules for fallback handling
        const hasRules = formData.preverb_config && formData.preverb_config.has_multiple_preverbs && formData.preverb_config.rules;

        if (!hasRules) {
            return {};
        }

        return {
            default: formData.preverb_config.rules.default || formData.preverb_config.default_preverb || '',
            replacements: formData.preverb_config.rules.replacements || {},
            tense_specific_fallbacks: formData.preverb_config.rules.tense_specific_fallbacks || {},
            english_fallbacks: formData.preverb_config.rules.english_fallbacks || {}
        };
    }

    /**
 * Show/hide argument sections based on the selected pattern
 */
    showArgumentSections(args) {
        console.log('🔍 showArgumentSections called with args:', args);

        const sections = {
            'S': 'subjectArguments',
            'DO': 'directObjectArguments',
            'IO': 'indirectObjectArguments'
        };

        console.log('🔍 Sections mapping:', sections);

        // Hide all sections first
        Object.values(sections).forEach(sectionId => {
            const section = document.getElementById(sectionId);
            console.log(`🔍 Looking for section: ${sectionId}, found:`, !!section);
            if (section) {
                section.style.display = 'none';
                console.log(`🔍 Hidden section: ${sectionId}`);
            }
        });

        // Show only the sections that are part of the pattern
        args.forEach(arg => {
            const sectionId = sections[arg];
            console.log(`🔍 Processing arg: ${arg} -> sectionId: ${sectionId}`);
            if (sectionId) {
                const section = document.getElementById(sectionId);
                console.log(`🔍 Found section for ${arg}:`, !!section);
                if (section) {
                    section.style.display = 'block';
                    console.log(`🔍 Made section visible: ${sectionId}`);
                }
            }
        });

        console.log('🔍 About to call generateFiltersForVisibleSectionsSync');
        // Generate filters for newly visible sections immediately
        this.generateFiltersForVisibleSectionsSync();
        console.log('🔍 Finished generateFiltersForVisibleSectionsSync');
    }

    /**
     * Generate context-aware filters for each argument section
     */
    async generateContextAwareFilters() {
        if (!this.database || !this.database.loaded) {
            console.warn('Database not loaded, cannot generate filter controls');
            return;
        }

        // Ensure all databases are loaded
        await this.database.loadSubjectDatabase();
        await this.database.loadDirectObjectDatabase();
        await this.database.loadIndirectObjectDatabase();

        // Generate filters only for visible sections
        const sections = ['subject', 'direct_object', 'indirect_object'];

        for (const section of sections) {
            const sectionElement = document.getElementById(`${section}Arguments`);
            if (sectionElement && sectionElement.style.display !== 'none') {
                const databaseType = this.getDatabaseTypeForSection(section);
                await this.generateSectionFilters(section, databaseType);
            }
        }
    }

    /**
 * Generate filters for a specific argument section
 */
    async generateSectionFilters(sectionName, databaseType) {
        const section = document.getElementById(`${sectionName}Arguments`);
        if (!section) {
            console.warn(`Section ${sectionName}Arguments not found`);
            return;
        }

        console.log(`Generating filters for ${sectionName} section`);

        // Initialize with adjective filter options (default active tab)
        this.updateFilterOptionsForTab(sectionName, 'adjective');
    }

    /**
 * Generate filters for a specific argument section (synchronous version)
 */
    generateSectionFiltersSync(sectionName, databaseType) {
        console.log(`🔍 generateSectionFiltersSync called for: ${sectionName}, databaseType: ${databaseType}`);

        // Map section name to the correct element ID
        const sectionMapping = {
            'subject': 'subjectArguments',
            'direct_object': 'directObjectArguments',
            'indirect_object': 'indirectObjectArguments'
        };

        const elementId = sectionMapping[sectionName];
        const section = document.getElementById(elementId);

        if (!section) {
            console.warn(`❌ Section ${elementId} not found for ${sectionName}`);
            return;
        }

        console.log(`✅ Generating filters for ${sectionName} section (sync)`);

        // Initialize with adjective filter options (default active tab)
        console.log(`🔍 About to call updateFilterOptionsForTab for ${sectionName}`);
        this.updateFilterOptionsForTab(sectionName, 'adjective').then(() => {
            console.log(`🔍 Finished updateFilterOptionsForTab for ${sectionName}`);
        });
    }

    /**
 * Update filter options based on the selected tab
 */
    async updateFilterOptionsForTab(sectionName, filterType) {
        console.log(`🔍 updateFilterOptionsForTab called: ${sectionName}, ${filterType}`);

        const databaseType = this.getDatabaseTypeForSection(sectionName);
        console.log(`🔍 Database type: ${databaseType}`);

        // Ensure the required database is loaded
        if (databaseType === 'direct_objects' && Object.keys(this.database.directObjects).length === 0) {
            console.log('Loading direct object database...');
            await this.database.loadDirectObjectDatabase();
        }
        if (databaseType === 'indirect_objects' && Object.keys(this.database.indirectObjects).length === 0) {
            console.log('Loading indirect object database...');
            await this.database.loadIndirectObjectDatabase();
        }

        if (filterType === 'adjective') {
            // Show only adjective-relevant categories, hide semantic domains
            const adjectiveCategories = this.getAdjectiveCategories();
            console.log(`🔍 Adjective categories for ${sectionName}:`, adjectiveCategories);
            this.populateCategoryFilters(sectionName, adjectiveCategories, filterType);
            this.hideSemanticDomainFilters(sectionName);
        } else if (filterType === 'noun') {
            // Show noun-relevant categories and semantic domains
            const nounCategories = this.getNounCategoriesForSection(databaseType);
            const nounSemanticDomains = this.getNounSemanticDomainsForSection(databaseType);
            console.log(`🔍 Noun categories for ${sectionName}:`, nounCategories);
            console.log(`🔍 Noun semantic domains for ${sectionName}:`, nounSemanticDomains);
            this.populateCategoryFilters(sectionName, nounCategories, filterType);
            this.populateSemanticDomainFilters(sectionName, nounSemanticDomains, filterType);
        }

        console.log(`🔍 updateFilterOptionsForTab finished for ${sectionName}`);
    }

    /**
     * Get categories that are relevant for adjectives
     */
    getAdjectiveCategories() {
        const categories = new Set();
        Object.values(this.database.adjectives).forEach(adj => {
            if (adj.category) categories.add(adj.category);
        });
        return Array.from(categories).sort();
    }

    /**
     * Get categories that are relevant for nouns in a specific section
     */
    getNounCategoriesForSection(databaseType) {
        const categories = new Set();
        const database = this.getDatabaseByType(databaseType);
        if (database) {
            Object.values(database).forEach(item => {
                if (item.category) categories.add(item.category);
            });
        }
        return Array.from(categories).sort();
    }

    /**
     * Get semantic domains that are relevant for nouns in a specific section
     */
    getNounSemanticDomainsForSection(databaseType) {
        const semanticDomains = new Set();
        const database = this.getDatabaseByType(databaseType);
        if (database) {
            Object.values(database).forEach(item => {
                if (item.semantic_domain) semanticDomains.add(item.semantic_domain);
            });
        }
        return Array.from(semanticDomains).sort();
    }

    /**
 * Populate category filters for a section
 */
    populateCategoryFilters(sectionName, categories, filterType) {
        console.log(`🔍 populateCategoryFilters called: ${sectionName}, categories:`, categories);

        // Map section name to the correct HTML ID
        const sectionMapping = {
            'subject': 'subject',
            'direct_object': 'directObject',
            'indirect_object': 'indirectObject'
        };

        const elementId = sectionMapping[sectionName];
        const categoryContainer = document.getElementById(`${elementId}CategoryFilters`);
        console.log(`🔍 Category container found:`, !!categoryContainer);

        if (categoryContainer) {
            console.log(`✅ Populating category filters for ${sectionName}:`, categories);

            // Get stored state for this filter type
            const storedState = this.getFilterState(sectionName, filterType);
            console.log(`🔍 Stored state for ${sectionName}:`, storedState);

            categoryContainer.innerHTML = categories.map(category => {
                const isChecked = storedState.categories.includes(category) ? 'checked' : '';
                return `
                    <div class="filter-checkbox-item">
                        <input type="checkbox" id="${sectionName}_category_${category}" value="${category}" class="filter-checkbox" data-section="${sectionName}" data-filter-type="category" ${isChecked}>
                        <label for="${sectionName}_category_${category}">${this.capitalizeFirst(category)}</label>
                    </div>
                `;
            }).join('');

            console.log(`🔍 Category HTML generated for ${sectionName}`);

            // Re-attach event listeners
            this.attachFilterCheckboxListeners();
            console.log(`🔍 Event listeners attached for ${sectionName}`);
        } else {
            console.warn(`❌ Category container ${elementId}CategoryFilters not found`);
        }
    }

    /**
 * Populate semantic domain filters for a section
 */
    populateSemanticDomainFilters(sectionName, semanticDomains, filterType) {
        console.log(`🔍 populateSemanticDomainFilters called: ${sectionName}, domains:`, semanticDomains);

        // Map section name to the correct HTML ID
        const sectionMapping = {
            'subject': 'subject',
            'direct_object': 'directObject',
            'indirect_object': 'indirectObject'
        };

        const elementId = sectionMapping[sectionName];
        const semanticContainer = document.getElementById(`${elementId}SemanticDomainFilters`);
        console.log(`🔍 Semantic container found:`, !!semanticContainer);

        if (semanticContainer) {
            console.log(`✅ Populating semantic domain filters for ${sectionName}:`, semanticDomains);

            // Get stored state for this filter type
            const storedState = this.getFilterState(sectionName, filterType);
            console.log(`🔍 Stored state for ${sectionName}:`, storedState);

            semanticContainer.innerHTML = semanticDomains.map(domain => {
                const isChecked = storedState.semanticDomains.includes(domain) ? 'checked' : '';
                return `
                    <div class="filter-checkbox-item">
                        <input type="checkbox" id="${sectionName}_semantic_${domain}" value="${domain}" class="filter-checkbox" data-section="${sectionName}" data-filter-type="semantic" ${isChecked}>
                        <label for="${sectionName}_semantic_${domain}">${this.capitalizeFirst(domain)}</label>
                    </div>
                `;
            }).join('');

            console.log(`🔍 Semantic domain HTML generated for ${sectionName}`);

            // Re-attach event listeners
            this.attachFilterCheckboxListeners();
            console.log(`🔍 Event listeners attached for ${sectionName}`);
        } else {
            console.warn(`❌ Semantic domain container ${elementId}SemanticDomainFilters not found`);
        }
    }

    /**
     * Hide semantic domain filters for a section
     */
    hideSemanticDomainFilters(sectionName) {
        // Map section name to the correct HTML ID
        const sectionMapping = {
            'subject': 'subject',
            'direct_object': 'directObject',
            'indirect_object': 'indirectObject'
        };

        const elementId = sectionMapping[sectionName];
        const semanticContainer = document.getElementById(`${elementId}SemanticDomainFilters`);
        if (semanticContainer) {
            semanticContainer.innerHTML = '<div class="filter-info">No semantic domains available for adjectives</div>';
        }
    }

    /**
     * Get categories for a specific section
     */
    getSectionCategories(databaseType) {
        const categories = new Set();

        // Add categories from the specific database
        const database = this.getDatabaseByType(databaseType);
        if (database) {
            Object.values(database).forEach(item => {
                if (item.category) categories.add(item.category);
            });
        }

        // Always include adjective categories
        Object.values(this.database.adjectives).forEach(adj => {
            if (adj.category) categories.add(adj.category);
        });

        return Array.from(categories).sort();
    }

    /**
     * Get semantic domains for a specific section
     */
    getSectionSemanticDomains(databaseType) {
        const semanticDomains = new Set();

        // Add semantic domains from the specific database
        const database = this.getDatabaseByType(databaseType);
        if (database) {
            Object.values(database).forEach(item => {
                if (item.semantic_domain) semanticDomains.add(item.semantic_domain);
            });
        }

        return Array.from(semanticDomains).sort();
    }

    /**
     * Get database by type
     */
    getDatabaseByType(databaseType) {
        switch (databaseType) {
            case 'subjects': return this.database.subjects;
            case 'direct_objects': return this.database.directObjects;
            case 'indirect_objects': return this.database.indirectObjects;
            default: return null;
        }
    }

    /**
 * Generate filters for currently visible sections
 */
    async generateFiltersForVisibleSections() {
        const sections = ['subject', 'direct_object', 'indirect_object'];

        for (const section of sections) {
            const sectionElement = document.getElementById(`${section}Arguments`);
            if (sectionElement && sectionElement.style.display !== 'none') {
                const databaseType = this.getDatabaseTypeForSection(section);
                await this.generateSectionFilters(section, databaseType);
            }
        }
    }

    /**
 * Generate filters for currently visible sections (synchronous version)
 */
    generateFiltersForVisibleSectionsSync() {
        // Map section names to their actual element IDs
        const sectionMapping = {
            'subject': 'subjectArguments',
            'direct_object': 'directObjectArguments',
            'indirect_object': 'indirectObjectArguments'
        };

        for (const [sectionName, elementId] of Object.entries(sectionMapping)) {
            const sectionElement = document.getElementById(elementId);
            if (sectionElement && sectionElement.style.display !== 'none') {
                const databaseType = this.getDatabaseTypeForSection(sectionName);
                this.generateSectionFiltersSync(sectionName, databaseType);
            }
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if on the main application page
    // Check if the required elements exist
    const requiredElements = ['newVerbBtn', 'loadVerbBtn', 'saveVerbBtn', 'scrapeBtn', 'clearFormBtn'];
    const allElementsExist = requiredElements.every(id => document.getElementById(id));

    if (allElementsExist) {
        window.verbEditor = new VerbEditor();

        // Add debug function to test localStorage
        window.testLocalStorage = () => {
            console.log('Testing localStorage...');
            console.log('Current localStorage keys:', Object.keys(localStorage));
            console.log('verb_editor_progress:', localStorage.getItem('verb_editor_progress'));
            console.log('verb_editor_backup:', localStorage.getItem('verb_editor_backup'));
        };
    }
});