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
        this.isLoadingVerb = false; // Add flag to prevent local storage interference

        try {
            this.database = new Database();
            this.validationEngine = new ValidationEngine();
            this.storageManager = new StorageManager();
            this.scraperIntegration = new ScraperIntegration();
            this.progressiveDisclosure = new ProgressiveDisclosure();

            // Initialize GNC integration
            this.gncIntegration = new VerbEditorGNCIntegration(this);



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
        if (savedData.georgian_wrapper) {
            const georgianWrapperField = document.getElementById('georgianWrapper');
            if (georgianWrapperField) georgianWrapperField.value = savedData.georgian_wrapper;
        }
        if (savedData.georgian_display) {
            const georgianDisplayField = document.getElementById('georgianDisplay');
            if (georgianDisplayField) georgianDisplayField.value = savedData.georgian_display;
        }
        // Backward compatibility for old georgian field
        if (!savedData.georgian_wrapper && !savedData.georgian_display && savedData.georgian) {
            const georgianWrapperField = document.getElementById('georgianWrapper');
            const georgianDisplayField = document.getElementById('georgianDisplay');
            if (georgianWrapperField) georgianWrapperField.value = savedData.georgian;
            if (georgianDisplayField) georgianDisplayField.value = savedData.georgian;
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

        // Populate argument pattern and valency fields
        if (savedData.global_argument_pattern) {
            const argumentPatternField = document.getElementById('argumentPattern');
            if (argumentPatternField) argumentPatternField.value = savedData.global_argument_pattern;
        }
        if (savedData.valency) {
            // Populate default valency
            if (savedData.valency.default) {
                const valencyDefaultField = document.getElementById('valencyDefault');
                if (valencyDefaultField) valencyDefaultField.value = savedData.valency.default;
            }
            // Populate alternative valencies
            if (savedData.valency.alternatives && Array.isArray(savedData.valency.alternatives)) {
                savedData.valency.alternatives.forEach(alternative => {
                    const checkbox = document.querySelector(`input[name="valencyAlternatives"][value="${alternative}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            }
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
        } else {
            // Update progressive disclosure immediately if no preverb config to restore
            this.updateProgressiveDisclosure();
        }

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
        console.log('[STORAGE] Current progressive disclosure state before restoration:', this.progressiveDisclosure.getFormState());

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
            // Ensure hasMultiplePreverbs is set in progressive disclosure form state first
            this.progressiveDisclosure.updateFormState({ hasMultiplePreverbs: 'true' });

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
            }, 250);
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

        // Final form state synchronization to ensure progressive disclosure matches UI state
        setTimeout(() => {
            // Update form state based on current UI state
            const hasComplexRules = document.getElementById('hasComplexRules')?.checked || false;
            const hasArgumentOverrides = document.getElementById('hasArgumentOverrides')?.checked || false;

            this.progressiveDisclosure.updateFormState({
                hasMultiplePreverbs: 'true', // Ensure this is preserved
                hasComplexRules: hasComplexRules,
                hasArgumentOverrides: hasArgumentOverrides
            });

            console.log('[STORAGE] Final form state synchronization completed:', {
                hasMultiplePreverbs: 'true',
                hasComplexRules: hasComplexRules,
                hasArgumentOverrides: hasArgumentOverrides
            });

            // Update progressive disclosure visibility after all form state is synchronized
            this.progressiveDisclosure.updateVisibility();

            console.log('[STORAGE] Progressive disclosure state after final update:', this.progressiveDisclosure.getFormState());
            console.log('[STORAGE] Progressive disclosure visibility status after final update:', this.progressiveDisclosure.getVisibilityStatus());
        }, 600);
    }

    /**
     * Handle complex rules checkbox change
     */
    handleComplexRulesChange(hasComplexRules) {
        console.log('[COMPLEX_RULES] handleComplexRulesChange called with:', hasComplexRules);
        console.log('[COMPLEX_RULES] Current progressive disclosure state before update:', this.progressiveDisclosure.getFormState());

        const complexRulesContent = document.getElementById('complexRulesContent');
        if (complexRulesContent) {
            if (hasComplexRules) {
                complexRulesContent.classList.remove('hidden');
            } else {
                complexRulesContent.classList.add('hidden');
            }
        }

        // Update progressive disclosure form state to match UI state
        // Preserve existing form state and only update hasComplexRules
        const currentFormState = this.progressiveDisclosure.getFormState();
        this.progressiveDisclosure.updateFormState({
            ...currentFormState,
            hasComplexRules: hasComplexRules
        });

        console.log('[COMPLEX_RULES] Progressive disclosure state after update:', this.progressiveDisclosure.getFormState());
        console.log('[COMPLEX_RULES] Progressive disclosure visibility status after update:', this.progressiveDisclosure.getVisibilityStatus());
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
        // Update progressive disclosure form state to match UI state
        // Preserve existing form state and only update hasArgumentOverrides
        const currentFormState = this.progressiveDisclosure.getFormState();
        this.progressiveDisclosure.updateFormState({
            ...currentFormState,
            hasArgumentOverrides: hasArgumentOverrides
        });
    }

    /**
     * Restore complex rules data from saved configuration
     */
    restoreComplexRulesData(rules) {
        console.log('[STORAGE] Restoring complex rules data:', rules);

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

        // Ensure the complex rules checkbox is checked and form state is updated
        const hasComplexRulesCheckbox = document.getElementById('hasComplexRules');
        if (hasComplexRulesCheckbox && !hasComplexRulesCheckbox.checked) {
            hasComplexRulesCheckbox.checked = true;
            console.log('[STORAGE] Ensuring complex rules checkbox is checked during data restoration');
        }

        // Update progressive disclosure form state to reflect that complex rules are enabled
        const currentFormState = this.progressiveDisclosure.getFormState();
        this.progressiveDisclosure.updateFormState({
            ...currentFormState,
            hasComplexRules: true
        });

        console.log('[STORAGE] Complex rules data restoration completed');
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
        console.log('[STORAGE] Restoring translation overrides data:', translations);

        Object.entries(translations).forEach(([preverb, translationData]) => {
            this.addPreverbTranslationWithData(preverb, translationData);
        });

        // Ensure the complex rules checkbox is checked since we have translation overrides
        const hasComplexRulesCheckbox = document.getElementById('hasComplexRules');
        if (hasComplexRulesCheckbox && !hasComplexRulesCheckbox.checked) {
            hasComplexRulesCheckbox.checked = true;
            console.log('[STORAGE] Ensuring complex rules checkbox is checked during translation restoration');
        }

        // Update progressive disclosure form state to reflect that complex rules are enabled
        const currentFormState = this.progressiveDisclosure.getFormState();
        this.progressiveDisclosure.updateFormState({
            ...currentFormState,
            hasComplexRules: true
        });

        console.log('[STORAGE] Translation overrides data restoration completed');
    }

    /**
 * Add tense fallback with pre-populated data
 */
    addTenseFallbackWithData(preverb, tenses, fallback) {
        // First add a new fallback item
        this.addTenseFallback();

        // Use a small delay to ensure DOM elements are fully created
        setTimeout(() => {
            // Get the last added fallback item
            const fallbackItems = document.querySelectorAll('.fallback-item');
            const lastItem = fallbackItems[fallbackItems.length - 1];

            if (lastItem) {
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
        }, 50); // Small delay to ensure DOM is ready
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

        // Georgian field changes
        addEventListenerSafely('georgianWrapper', 'input', () => this.autoSave());
        addEventListenerSafely('georgianDisplay', 'input', () => this.autoSave());

        // Valency field changes
        addEventListenerSafely('valencyDefault', 'change', () => this.autoSave());

        // Valency alternatives checkbox changes
        const valencyAlternativeCheckboxes = document.querySelectorAll('input[name="valencyAlternatives"]');
        valencyAlternativeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.autoSave());
        });

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
        this.validationEngine.addRule('georgian_wrapper', (value) => {
            if (!value || !value.trim()) return 'Georgian verb name (wrapper) is required';
            if (!/^[ა-ჰ\s]+$/.test(value)) return 'Georgian verb name must contain only Georgian characters';
            return true;
        });

        this.validationEngine.addRule('georgian_display', (value) => {
            if (!value || !value.trim()) return 'Georgian verb name (display) is required';
            if (!/^[ა-ჰ\s\/]+$/.test(value)) return 'Georgian verb name must contain only Georgian characters, spaces, and forward slashes';
            return true;
        });

        this.validationEngine.addRule('description', (value) => {
            if (!value || !value.trim()) return 'Description is required';
            return true;
        });

        this.validationEngine.addRule('category', (value) => {
            if (!value || !value.trim()) return 'Category is required';
            return true;
        });

        this.validationEngine.addRule('argument_pattern', (value) => {
            if (!value || !value.trim()) return 'Argument pattern is required';

            // Validate specific pattern combinations
            const validPatterns = ['<S>', '<S-DO>', '<S-IO>', '<S-DO-IO>'];
            if (!validPatterns.includes(value)) {
                return 'Invalid argument pattern. Please select from the dropdown options.';
            }

            return true;
        });

        this.validationEngine.addRule('valencyDefault', (value) => {
            if (!value || !value.trim()) return 'Default valency is required';

            // Validate specific pattern combinations
            const validPatterns = ['<S>', '<S-DO>', '<S-IO>', '<S-DO-IO>'];
            if (!validPatterns.includes(value)) {
                return 'Invalid default valency. Please select from the dropdown options.';
            }

            return true;
        });

        this.validationEngine.addRule('semantic_key', (value) => {
            if (!value || !value.trim()) return 'Semantic key is required';
            if (!/^[a-z_]+$/.test(value)) return 'Semantic key must contain only lowercase letters and underscores';
            return true;
        });

        // Add validation for preposition fields
        this.validationEngine.addRule('subjectPreposition', (value) => {
            if (!value || !value.trim()) return 'Subject preposition is required';
            if (!/^[a-zA-Z\s]+$/.test(value)) return 'Subject preposition must contain only letters and spaces';
            return true;
        });

        this.validationEngine.addRule('directObjectPreposition', (value) => {
            if (!value || !value.trim()) return 'Direct object preposition is required';
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
            if (!value || !value.trim()) return 'Raw gloss is required for each tense';
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
        const formFields = ['georgianWrapper', 'georgianDisplay', 'description', 'category', 'argumentPattern', 'valencyDefault', 'semanticKey', 'notes', 'url', 'verbClass'];

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
                // Note: handleComplexRulesChange already updates progressive disclosure
            });
        }

        const hasArgumentOverridesCheckbox = document.getElementById('hasArgumentOverrides');
        if (hasArgumentOverridesCheckbox) {
            hasArgumentOverridesCheckbox.addEventListener('change', (e) => {
                this.handleArgumentOverridesChange(e.target.checked);
                this.autoSave();
                // Note: handleArgumentOverridesChange already updates progressive disclosure
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
            const formData = this.getFormData();

            // Create a new verb object if one doesn't exist
            if (!this.currentVerb) {
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
                            direct_object: ''
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
            await this.storageManager.saveProgress(this.currentVerb);

            // Show auto-save indicator (briefly)
            this.showAutoSaveIndicator();
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
        let argumentsData;
        if (this.isLoadingVerb && this.currentVerb && this.currentVerb.syntax && this.currentVerb.syntax.arguments) {
            // When loading a verb, use the database data instead of form fields
            argumentsData = this.currentVerb.syntax.arguments;
            console.log('[FORM_DATA] Arguments data from database:', argumentsData);
        } else {
            // When not loading, get data from form fields
            argumentsData = this.getArgumentsData();
            console.log('[FORM_DATA] Arguments data collected from form:', argumentsData);
        }

        // Get prepositions data
        const prepositionsData = this.getPrepositionsData();
        console.log('[FORM_DATA] Prepositions data collected:', prepositionsData);

        // Get preverb config data
        const preverbConfigData = this.getPreverbConfigData();
        console.log('[FORM_DATA] Preverb config data collected:', preverbConfigData);

        // Get preverb translations data
        const preverbTranslationsData = this.getPreverbTranslations();
        console.log('[FORM_DATA] Preverb translations data collected:', preverbTranslationsData);

        const formData = {
            georgian_wrapper: getFieldValue('georgianWrapper'),
            georgian_display: getFieldValue('georgianDisplay'),
            description: getFieldValue('description'),
            category: getFieldValue('category'),
            class: getFieldValue('verbClass'), // Map verbClass to class
            url: getFieldValue('url'),
            argument_pattern: getFieldValue('argumentPattern'), // Map argumentPattern to argument_pattern
            valency_default: getFieldValue('valencyDefault'),
            valency_alternatives: this.getSelectedValencyAlternatives(),
            semantic_key: getFieldValue('semanticKey'), // Map semanticKey to semantic_key
            notes: getFieldValue('notes'),
            hasMultiplePreverbs: document.querySelector('input[name="hasMultiplePreverbs"]:checked')?.value === 'true',
            defaultPreverb: getFieldValue('defaultPreverb'),
            subjectPreposition: getFieldValue('subjectPreposition'),
            directObjectPreposition: getFieldValue('directObjectPreposition'),
            indirectObjectPreposition: getFieldValue('indirectObjectPreposition'),
            translationPresent: getFieldValue('translationPresent'),
            translationImperfect: getFieldValue('translationImperfect'),
            translationFuture: getFieldValue('translationFuture'),
            translationAorist: getFieldValue('translationAorist'),
            translationOptative: getFieldValue('translationOptative'),
            translationImperative: getFieldValue('translationImperative'),
            syntax: {
                arguments: argumentsData,
                prepositions: prepositionsData,
                preverb_overrides: {}
            },
            english_translations: (() => {
                const translations = {
                    default: this.getTranslationData()
                };

                // Add preverb-specific translations if they exist
                if (preverbTranslationsData && Object.keys(preverbTranslationsData).length > 0) {
                    Object.entries(preverbTranslationsData).forEach(([preverb, preverbTranslations]) => {
                        translations[preverb] = preverbTranslations;
                    });
                }

                return translations;
            })(),
            conjugations: this.getConjugationData(),
            preverb_config: preverbConfigData,
            preverbTranslations: preverbTranslationsData
        };

        console.log('[FORM_DATA] Complete form data:', {
            georgian_wrapper: formData.georgian_wrapper,
            georgian_display: formData.georgian_display,
            class: formData.class,
            semantic_key: formData.semantic_key,
            argument_pattern: formData.argument_pattern,
            valency_default: formData.valency_default,
            valency_alternatives: formData.valency_alternatives,
            hasArguments: Object.keys(argumentsData).length > 0,
            hasPrepositions: Object.keys(prepositionsData).length > 0,
            hasPreverbConfig: !!preverbConfigData.has_multiple_preverbs,
            hasPreverbTranslations: Object.keys(preverbTranslationsData).length > 0
        });

        return formData;
    }

    getFormState() {
        return this.getFormData();
    }

    getSelectedValencyAlternatives() {
        const checkboxes = document.querySelectorAll('input[name="valencyAlternatives"]:checked');
        return Array.from(checkboxes).map(checkbox => checkbox.value);
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
            subject: getPrepositionValue('subjectPreposition', ''),
            direct_object: getPrepositionValue('directObjectPreposition', ''),
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

        // Ensure optative translation doesn't have "should" prefix added automatically
        if (translations.optative && translations.optative.trim() !== '') {
            // Remove any automatic "should" prefix that might have been added
            const optativeValue = translations.optative.trim();
            if (optativeValue.toLowerCase().startsWith('should ')) {
                translations.optative = optativeValue.substring(7); // Remove "should " prefix
                console.log('[TRANSLATIONS] Removed automatic "should" prefix from optative:', optativeValue, '->', translations.optative);
            }
        }

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

        // Restore argument data after fields are generated, but only if we're not loading a new verb
        if (Object.keys(currentArguments).length > 0 && !this.isLoadingVerb) {
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
        console.log('[PREVERB] handlePreverbChange called with:', hasMultiple);

        // Update form state and refresh progressive disclosure
        this.progressiveDisclosure.updateFormState({ hasMultiplePreverbs: hasMultiple });

        // Also update the progressive disclosure visibility
        this.progressiveDisclosure.updateVisibility();

        console.log('[PREVERB] Progressive disclosure state after update:', this.progressiveDisclosure.getFormState());
        console.log('[PREVERB] Progressive disclosure visibility status:', this.progressiveDisclosure.getVisibilityStatus());
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

            // Restore saved argument values if they exist AND we're not in the middle of loading a verb
            // This prevents local storage from overriding newly loaded verb data
            if (this.currentVerb && this.currentVerb.syntax && this.currentVerb.syntax.arguments && !this.isLoadingVerb) {
                this.populateArgumentsWithSavedData(this.currentVerb.syntax.arguments).catch(error => {
                    console.error('[STORAGE] Error restoring arguments after pattern change:', error);
                });
            }

            // Also handle semantic arguments when loading a verb (after fields are generated)
            if (this.currentVerb && this.currentVerb.syntax && this.currentVerb.syntax.arguments && this.isLoadingVerb) {
                this.populateArgumentsWithSavedData(this.currentVerb.syntax.arguments).catch(error => {
                    console.error('[LOADER] Error loading semantic arguments after field generation:', error);
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
                error: 'Raw gloss must follow format: V MedAct Tense <S:Erg> <DO:Dat> etc.',
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



        // Get the current state of complex rules and argument overrides checkboxes
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
            default: document.getElementById('defaultPreverb')?.value || '',
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
                    direct_object: ''
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
        // Show the verb selection modal
        this.showVerbSelectionModal();
    }

    showVerbSelectionModal() {
        const modal = document.getElementById('verbSelectionModal');
        modal.style.display = 'block';

        // Load and display verbs
        this.loadVerbsForSelection();

        // Setup event listeners
        this.setupVerbSelectionEventListeners();
    }

    hideVerbSelectionModal() {
        const modal = document.getElementById('verbSelectionModal');
        modal.style.display = 'none';

        // Clear selection
        this.selectedVerb = null;
        document.getElementById('loadSelectedVerbBtn').disabled = true;
    }

    setupVerbSelectionEventListeners() {
        // Close modal when clicking X or outside
        const modal = document.getElementById('verbSelectionModal');
        const closeBtn = modal.querySelector('.close');
        const cancelBtn = document.getElementById('cancelVerbSelectionBtn');

        closeBtn.onclick = () => {
            this.hideVerbSelectionModal();
        };
        cancelBtn.onclick = () => {
            this.hideVerbSelectionModal();
        };

        // Close modal when clicking outside
        window.onclick = (event) => {
            if (event.target === modal) {
                this.hideVerbSelectionModal();
            }
        };

        // Search functionality
        const searchInput = document.getElementById('verbSearchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const classFilter = document.getElementById('classFilter');

        searchInput.oninput = () => {
            this.filterVerbs();
        };
        categoryFilter.onchange = () => {
            this.filterVerbs();
        };
        classFilter.onchange = () => {
            this.filterVerbs();
        };

        // Load selected verb
        const loadBtn = document.getElementById('loadSelectedVerbBtn');
        loadBtn.onclick = () => {
            this.loadSelectedVerb();
        };
    }

    async loadVerbsForSelection() {
        try {
            // Show loading state
            document.getElementById('verbListLoading').style.display = 'block';
            document.getElementById('verbList').innerHTML = '';
            document.getElementById('verbListEmpty').style.display = 'none';

            // Ensure database is loaded
            if (!this.database.isReady()) {
                await this.database.initialize();
            }

            // Get all verbs
            const verbs = this.database.verbs || [];

            // Store verbs for filtering
            this.allVerbs = verbs;

            // Display verbs
            this.displayVerbs(verbs);

            // Hide loading state
            document.getElementById('verbListLoading').style.display = 'none';

        } catch (error) {
            console.error('[VERB SELECTION] Failed to load verbs for selection:', error);
            document.getElementById('verbListLoading').style.display = 'none';
            document.getElementById('verbListEmpty').style.display = 'block';
            document.getElementById('verbListEmpty').textContent = 'Failed to load verbs. Please try again.';
        }
    }

    displayVerbs(verbs) {
        const verbList = document.getElementById('verbList');
        const emptyMessage = document.getElementById('verbListEmpty');

        if (verbs.length === 0) {
            verbList.innerHTML = '';
            emptyMessage.style.display = 'block';
            return;
        }

        emptyMessage.style.display = 'none';

        const verbItems = verbs.map(verb => this.createVerbListItem(verb)).join('');
        verbList.innerHTML = verbItems;

        // Add click listeners to verb items
        this.addVerbItemClickListeners();
    }

    createVerbListItem(verb) {
        // Use georgian_wrapper for display (the key), with backward compatibility
        const georgian = verb.georgian_wrapper || verb.georgian || 'No Georgian text';
        const description = verb.description || 'No description';
        const category = verb.category || 'Uncategorized';
        const verbClass = verb.class || 'Unknown';
        const semanticKey = verb.semantic_key || 'No semantic key';
        const argumentPattern = verb.global_argument_pattern || verb.valency?.default || 'No pattern';
        const id = verb.id || 'No ID';

        return `
            <div class="verb-item" data-verb-id="${id}" data-semantic-key="${semanticKey}">
                <div class="verb-item-info">
                    <div class="verb-item-georgian">${georgian}</div>
                    <div class="verb-item-description">${description}</div>
                    <div class="verb-item-meta">
                        <span>ID: ${id}</span>
                        <span>${category}</span>
                        <span>${verbClass}</span>
                        <span>${semanticKey}</span>
                        <span>${argumentPattern}</span>
                    </div>
                </div>
                <div class="verb-item-id">#${id}</div>
            </div>
        `;
    }

    addVerbItemClickListeners() {
        const verbItems = document.querySelectorAll('.verb-item');

        verbItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove previous selection
                document.querySelectorAll('.verb-item').forEach(i => i.classList.remove('selected'));

                // Add selection to clicked item
                item.classList.add('selected');

                // Store selected verb
                const verbId = item.dataset.verbId;
                const semanticKey = item.dataset.semanticKey;

                // Try to get verb by ID first, then by semantic key
                this.selectedVerb = this.database.getVerb(verbId);

                if (!this.selectedVerb && semanticKey) {
                    this.selectedVerb = this.database.getVerb(semanticKey);
                }

                // Enable load button
                document.getElementById('loadSelectedVerbBtn').disabled = false;
            });
        });
    }

    filterVerbs() {
        const searchTerm = document.getElementById('verbSearchInput').value.toLowerCase();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const classFilter = document.getElementById('classFilter').value;
        const argumentPatternFilter = document.getElementById('argumentPatternFilter').value;

        if (!this.allVerbs || this.allVerbs.length === 0) {
            this.displayVerbs([]);
            return;
        }

        const filteredVerbs = this.allVerbs.filter(verb => {
            // Search filter
            const matchesSearch = !searchTerm ||
                (verb.georgian_wrapper && verb.georgian_wrapper.toLowerCase().includes(searchTerm)) ||
                (verb.georgian && verb.georgian.toLowerCase().includes(searchTerm)) || // Backward compatibility
                (verb.description && verb.description.toLowerCase().includes(searchTerm)) ||
                (verb.semantic_key && verb.semantic_key.toLowerCase().includes(searchTerm)) ||
                (verb.global_argument_pattern && verb.global_argument_pattern.toLowerCase().includes(searchTerm)) ||
                (verb.valency && verb.valency.default && verb.valency.default.toLowerCase().includes(searchTerm));

            // Category filter
            const matchesCategory = !categoryFilter || verb.category === categoryFilter;

            // Class filter
            const matchesClass = !classFilter || verb.class === classFilter;

            // Argument pattern filter
            const verbPattern = verb.global_argument_pattern || verb.valency?.default;
            const matchesArgumentPattern = !argumentPatternFilter || verbPattern === argumentPatternFilter;

            return matchesSearch && matchesCategory && matchesClass && matchesArgumentPattern;
        });

        this.displayVerbs(filteredVerbs);
    }

    loadSelectedVerb() {
        if (!this.selectedVerb) {
            this.showError('No verb selected');
            return;
        }

        try {
            // Store verb data before clearing selection
            const verbToLoad = this.selectedVerb;
            const verbName = verbToLoad.georgian || verbToLoad.semantic_key;

            // Clear localStorage when loading a new verb
            this.storageManager.clearProgress();
            this.loadVerbForEditing(this.selectedVerb);

            // Hide modal
            this.hideVerbSelectionModal();

            this.showSuccess(`Loaded verb: ${verbName}`);

        } catch (error) {
            console.error('[VERB SELECTION] Error loading verb:', error);
            this.showError(`Failed to load verb: ${error.message || 'Unknown error occurred'}`);
        }
    }

    async saveVerb() {
        try {
            console.log('[SAVE] Starting save process...');
            const formData = this.getFormData();
            console.log('[SAVE] Form data collected:', formData);

            // Validate form data
            console.log('[SAVE] Validating form data...');
            const validationResult = this.validationEngine.validateForm(formData);
            console.log('[SAVE] Validation result:', validationResult);

            if (!validationResult.isValid) {
                this.showValidationErrors(validationResult.errors);
                return;
            }

            // Check if verb already exists (for new verbs)
            if (!this.currentVerb || !this.currentVerb.id) {
                console.log('[SAVE] Checking if verb exists...');
                const existsCheck = await this.database.checkVerbExists(formData.georgian, formData.semantic_key);
                if (existsCheck.exists) {
                    this.showError('A verb with this Georgian text or semantic key already exists. Please use a different value.');
                    return;
                }
            }

            // Convert form data to new semantic-only structure
            console.log('[SAVE] Converting form data to verb structure...');
            const verbData = this.convertFormDataToVerbStructure(formData);
            console.log('[SAVE] Verb data converted:', verbData);

            // Update current verb with converted data
            if (!this.currentVerb) {
                this.currentVerb = {};
            }
            Object.assign(this.currentVerb, verbData);

            // Save to localStorage
            console.log('[SAVE] Saving to localStorage...');
            await this.storageManager.saveProgress(this.currentVerb);

            // Save to file
            console.log('[SAVE] Saving to file...');
            await this.saveVerbToFile(verbData);

            // Show detailed success message with file location
            const successMessage = `Verb saved successfully!
            
File Location: ${this.getVerbsFilePath()}
Verb ID: ${verbData.id}
Georgian: ${verbData.georgian_wrapper}
Semantic Key: ${verbData.semantic_key}

The verb has been saved to the verbs.json file and all form data has been cleared.`;

            // Show both alert and success message for save operations
            alert(`✅ SAVE SUCCESSFUL!\n\n${successMessage}`);
            this.showSuccess(successMessage);

            // Clear all form data
            this.clearAllFormData();

            // Log detailed save operation
            console.log('✅ [SAVE_SUCCESS] Verb saved successfully!');
            console.log('✅ [SAVE_SUCCESS] File location:', this.getVerbsFilePath());
            console.log('✅ [SAVE_SUCCESS] Verb data:', verbData);
            console.log('✅ [SAVE_SUCCESS] Form data cleared');

            // Verify the save operation by checking if the verb exists in the file
            this.verifySaveOperation(verbData);

        } catch (error) {
            console.error('[SAVE] Error in saveVerb:', error);
            console.error('[SAVE] Error stack:', error.stack);
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
        // Populate basic fields with new structure
        if (scrapedData.georgian) {
            // Populate both wrapper and display fields with the scraped Georgian text
            const georgianWrapperField = document.getElementById('georgianWrapper');
            const georgianDisplayField = document.getElementById('georgianDisplay');

            if (georgianWrapperField) {
                georgianWrapperField.value = scrapedData.georgian;
            }
            if (georgianDisplayField) {
                georgianDisplayField.value = scrapedData.georgian;
            }
        }

        if (scrapedData.english) {
            const descriptionField = document.getElementById('description');
            if (descriptionField) {
                descriptionField.value = scrapedData.english;
            }
        }

        // Generate semantic key from Georgian text
        if (scrapedData.georgian) {
            const semanticKey = this.scraperIntegration.generateSemanticKey(scrapedData.georgian);
            const semanticKeyField = document.getElementById('semanticKey');
            if (semanticKeyField) {
                semanticKeyField.value = semanticKey;
            }
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
        console.log('[LOADER] loadVerbForEditing called with verb:', verb);

        if (!verb) {
            console.error('[LOADER] Error: verb parameter is null or undefined');
            this.showError('Failed to load verb: verb data is missing');
            return;
        }

        // Set loading flag to prevent local storage interference
        this.isLoadingVerb = true;

        this.currentVerb = verb;
        console.log('[LOADER] Current verb set:', this.currentVerb);

        // Populate form with existing verb data
        // Handle Georgian fields with new structure - clear if no data
        const georgianWrapperField = document.getElementById('georgianWrapper');
        const georgianDisplayField = document.getElementById('georgianDisplay');

        if (georgianWrapperField) {
            if (verb.georgian_wrapper) {
                // Use the wrapper field (from top-level key) for the wrapper input
                georgianWrapperField.value = verb.georgian_wrapper;
            } else if (verb.georgian) {
                // Backward compatibility: use old georgian field as wrapper
                georgianWrapperField.value = verb.georgian;
            } else {
                georgianWrapperField.value = '';
            }
        }

        if (georgianDisplayField) {
            if (verb.georgian) {
                // Use the georgian field for the display input
                georgianDisplayField.value = verb.georgian;
            } else if (verb.georgian_display) {
                // Backward compatibility: use old georgian_display field
                georgianDisplayField.value = verb.georgian_display;
            } else {
                georgianDisplayField.value = '';
            }
        }

        // Handle basic form fields - clear if no data
        const descriptionField = document.getElementById('description');
        const categoryField = document.getElementById('category');
        const verbClassField = document.getElementById('verbClass');
        const semanticKeyField = document.getElementById('semanticKey');

        if (descriptionField) {
            descriptionField.value = verb.description || '';
        }
        if (categoryField) {
            categoryField.value = verb.category || '';
        }
        if (verbClassField) {
            verbClassField.value = verb.class || '';
        }
        if (semanticKeyField) {
            semanticKeyField.value = verb.semantic_key || '';
        }
        // Handle notes field - set to empty string if notes is empty or undefined
        const notesField = document.getElementById('notes');
        if (notesField) {
            notesField.value = verb.notes || '';
        }
        // Handle URL field - clear if no data
        const urlField = document.getElementById('url');
        if (urlField) {
            urlField.value = verb.url || '';
        }

        // Populate English translations (new structure) - clear fields if no data
        const translationFields = {
            present: document.getElementById('translationPresent'),
            imperfect: document.getElementById('translationImperfect'),
            future: document.getElementById('translationFuture'),
            aorist: document.getElementById('translationAorist'),
            optative: document.getElementById('translationOptative'),
            imperative: document.getElementById('translationImperative')
        };

        if (verb.english_translations && verb.english_translations.default) {
            const translations = verb.english_translations.default;
            Object.keys(translationFields).forEach(tense => {
                if (translationFields[tense]) {
                    translationFields[tense].value = translations[tense] || '';
                }
            });
        } else {
            // Clear all translation fields if no translations data
            Object.values(translationFields).forEach(field => {
                if (field) {
                    field.value = '';
                }
            });
        }

        // Handle argument pattern - determine from raw gloss in conjugations
        if (verb && verb.conjugations) {
            const argumentPattern = this.determineArgumentPatternFromGloss(verb);
            if (argumentPattern) {
                document.getElementById('argumentPattern').value = argumentPattern;
                this.handleArgumentPatternChange(argumentPattern);
            }
        }

        // Handle valency configuration
        if (verb && verb.valency) {
            if (verb.valency.default) {
                document.getElementById('valencyDefault').value = verb.valency.default;
            }
            if (verb.valency.alternatives && Array.isArray(verb.valency.alternatives)) {
                // Clear all checkboxes first
                document.querySelectorAll('input[name="valencyAlternatives"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                // Check the appropriate ones
                verb.valency.alternatives.forEach(alternative => {
                    const checkbox = document.querySelector(`input[name="valencyAlternatives"][value="${alternative}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
        } else if (verb && verb.global_argument_pattern) {
            // Backward compatibility: use global_argument_pattern if valency not present
            document.getElementById('argumentPattern').value = verb.global_argument_pattern;
            this.handleArgumentPatternChange(verb.global_argument_pattern);
        }

        // Handle arguments and prepositions (new semantic-only structure)
        if (verb && verb.syntax) {
            // Handle prepositions - clear fields if no data
            const subjectPrepositionField = document.getElementById('subjectPreposition');
            const directObjectPrepositionField = document.getElementById('directObjectPreposition');
            const indirectObjectPrepositionField = document.getElementById('indirectObjectPreposition');

            if (verb.syntax.prepositions) {
                const prepositions = verb.syntax.prepositions;
                if (subjectPrepositionField) {
                    subjectPrepositionField.value = prepositions.subject || '';
                }
                if (directObjectPrepositionField) {
                    directObjectPrepositionField.value = prepositions.direct_object || '';
                }
                if (indirectObjectPrepositionField) {
                    indirectObjectPrepositionField.value = prepositions.indirect_object || '';
                }
            } else {
                // Clear preposition fields if no prepositions data
                if (subjectPrepositionField) {
                    subjectPrepositionField.value = '';
                }
                if (directObjectPrepositionField) {
                    directObjectPrepositionField.value = '';
                }
                if (indirectObjectPrepositionField) {
                    indirectObjectPrepositionField.value = '';
                }
            }

            // Handle semantic-only arguments - will be loaded after argument pattern is set
            // to ensure fields are generated first
        }

        // Handle conjugations
        if (verb && verb.conjugations) {
            this.loadConjugations(verb.conjugations);
        }

        // Handle preverb configuration (new structure)
        if (verb && verb.preverb_config) {
            this.loadPreverbConfiguration(verb.preverb_config, verb.preverb_rules);
        }

        // Handle preverb-specific translations
        if (verb && verb.english_translations) {
            this.loadPreverbTranslations(verb.english_translations);
        }

        // Handle preverb rules (tense-specific fallbacks)
        if (verb && verb.preverb_rules) {
            console.log('[LOADER] Loading preverb rules:', verb.preverb_rules);
            this.loadPreverbRules(verb.preverb_rules);
        } else {
            console.log('[LOADER] No preverb rules found in verb:', verb?.preverb_rules);
        }

        // Reset loading flag after all data is loaded
        this.isLoadingVerb = false;

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

                // Generate preverb checkboxes for examples section if this is a multi-preverb verb
                // Use a small delay to ensure DOM elements are fully created
                setTimeout(() => {
                    if (this.currentVerb && this.currentVerb.preverb_config && this.currentVerb.preverb_config.has_multiple_preverbs) {
                        this.generatePreverbCheckboxesForExamples();
                    }
                }, 100);
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

    /**
     * Determine argument pattern from raw gloss in conjugations
     * Updated for semantic-only approach
     */
    determineArgumentPatternFromGloss(verb) {
        console.log('[ARGUMENT_PATTERN] determineArgumentPatternFromGloss called with verb:', verb);

        if (!verb) {
            console.error('[ARGUMENT_PATTERN] Error: verb parameter is null or undefined');
            return null;
        }

        if (!verb.conjugations) {
            console.log('[ARGUMENT_PATTERN] No conjugations found in verb');
            return null;
        }

        console.log('[ARGUMENT_PATTERN] Verb conjugations:', verb.conjugations);

        // Look for raw gloss in any conjugation
        for (const [tense, data] of Object.entries(verb.conjugations)) {
            console.log(`[ARGUMENT_PATTERN] Checking tense: ${tense}, data:`, data);
            if (data.raw_gloss) {
                const rawGloss = data.raw_gloss;
                console.log(`[ARGUMENT_PATTERN] Found raw gloss: ${rawGloss}`);

                // Parse valency from raw gloss patterns
                if (rawGloss.includes('<S-DO-IO>') || rawGloss.includes('<S-IO-DO>')) {
                    console.log('[ARGUMENT_PATTERN] Pattern found: <S-DO-IO>');
                    return '<S-DO-IO>';
                } else if (rawGloss.includes('<S-DO>')) {
                    console.log('[ARGUMENT_PATTERN] Pattern found: <S-DO>');
                    return '<S-DO>';
                } else if (rawGloss.includes('<S-IO>')) {
                    console.log('[ARGUMENT_PATTERN] Pattern found: <S-IO>');
                    return '<S-IO>';
                } else if (rawGloss.includes('<S>')) {
                    console.log('[ARGUMENT_PATTERN] Pattern found: <S>');
                    return '<S>';
                }
            }
        }
        console.log('[ARGUMENT_PATTERN] No pattern found, returning null');
        return null;
    }

    /**
     * Load semantic-only arguments from new structure
     */
    loadSemanticArguments(argumentData) {
        // Wait for argument sections to be generated
        const maxAttempts = 10;
        let attempts = 0;

        const tryLoadArguments = () => {
            attempts++;

            // Check if argument sections exist
            const hasArgumentSections = document.getElementById('subjectArguments') &&
                document.getElementById('directObjectArguments') &&
                document.getElementById('indirectObjectArguments');

            if (hasArgumentSections) {
                // Load subject arguments
                if (argumentData.subject) {
                    this.loadArgumentData('subject', argumentData.subject);
                }

                // Load direct object arguments
                if (argumentData.direct_object) {
                    this.loadArgumentData('direct_object', argumentData.direct_object);
                }

                // Load indirect object arguments
                if (argumentData.indirect_object) {
                    this.loadArgumentData('indirect_object', argumentData.indirect_object);
                }

                console.log('[LOADER] Semantic arguments loaded successfully');
            } else {
                // Sections don't exist yet, try again
                if (attempts < maxAttempts) {
                    setTimeout(tryLoadArguments, 200);
                } else {
                    console.warn('[LOADER] Failed to load arguments after maximum attempts');
                }
            }
        };

        // Start the loading process
        tryLoadArguments();
    }

    /**
     * Load argument data for a specific argument type
     */
    loadArgumentData(argType, argData) {
        // Get all fields for this argument type
        const fields = {
            '3sg': {
                noun: document.getElementById(`${argType}Noun3sg`),
                adjective: document.getElementById(`${argType}Adjective3sg`)
            },
            '3pl': {
                noun: document.getElementById(`${argType}Noun3pl`),
                adjective: document.getElementById(`${argType}Adjective3pl`)
            }
        };

        // Load 3sg data
        if (argData['3sg']) {
            if (fields['3sg'].noun) {
                fields['3sg'].noun.value = argData['3sg'].noun || '';
            }
            if (fields['3sg'].adjective) {
                fields['3sg'].adjective.value = argData['3sg'].adjective || '';
            }
        } else {
            // Clear 3sg fields if no data
            if (fields['3sg'].noun) {
                fields['3sg'].noun.value = '';
            }
            if (fields['3sg'].adjective) {
                fields['3sg'].adjective.value = '';
            }
        }

        // Load 3pl data
        if (argData['3pl']) {
            if (fields['3pl'].noun) {
                fields['3pl'].noun.value = argData['3pl'].noun || '';
            }
            if (fields['3pl'].adjective) {
                fields['3pl'].adjective.value = argData['3pl'].adjective || '';
            }
        } else {
            // Clear 3pl fields if no data
            if (fields['3pl'].noun) {
                fields['3pl'].noun.value = '';
            }
            if (fields['3pl'].adjective) {
                fields['3pl'].adjective.value = '';
            }
        }
    }

    /**
     * Load preverb configuration from new structure
     */
    loadPreverbConfiguration(preverbConfig, preverbRules) {
        // Clear all preverb-related form fields first
        this.clearPreverbFormFields();

        // Set multiple preverbs flag
        if (preverbConfig && preverbConfig.has_multiple_preverbs) {
            document.querySelector('input[name="hasMultiplePreverbs"][value="true"]').checked = true;
            this.handlePreverbChange('true');

            // Set default preverb
            if (preverbConfig.default_preverb) {
                const defaultPreverbSelect = document.getElementById('defaultPreverb');
                if (defaultPreverbSelect) {
                    defaultPreverbSelect.value = preverbConfig.default_preverb;
                }
            }

            // Set available preverbs
            if (preverbConfig.available_preverbs && preverbConfig.available_preverbs.length > 0) {
                preverbConfig.available_preverbs.forEach(preverb => {
                    const checkbox = document.querySelector(`input[name="availablePreverbs"][value="${preverb}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }

            // Load preverb rules if they exist
            if (preverbRules) {
                this.loadPreverbRules(preverbRules);
            }

            // Update progressive disclosure form state after loading preverb configuration
            setTimeout(() => {
                const hasComplexRules = document.getElementById('hasComplexRules')?.checked || false;
                const hasArgumentOverrides = document.getElementById('hasArgumentOverrides')?.checked || false;

                this.progressiveDisclosure.updateFormState({
                    hasComplexRules: hasComplexRules,
                    hasArgumentOverrides: hasArgumentOverrides
                });

                console.log('[LOADER] Preverb configuration form state synchronized:', {
                    hasComplexRules: hasComplexRules,
                    hasArgumentOverrides: hasArgumentOverrides
                });
            }, 100);
        } else {
            // Single preverb verb - set "No" radio button and hide preverb config
            document.querySelector('input[name="hasMultiplePreverbs"][value="false"]').checked = true;
            this.handlePreverbChange('false');
        }
    }

    /**
 * Generate preverb checkboxes for examples section
 */
    generatePreverbCheckboxesForExamples() {
        if (!this.currentVerb || !this.currentVerb.preverb_config) {
            return;
        }

        const availablePreverbs = this.currentVerb.preverb_config.available_preverbs || [];
        const defaultPreverb = this.currentVerb.preverb_config.default_preverb || '';

        // Use a retry mechanism to wait for DOM elements to be created
        const maxAttempts = 10;
        let attempts = 0;

        const tryGenerateCheckboxes = () => {
            attempts++;

            // Get all tense sections
            const tenseSections = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
            let allContainersFound = true;

            tenseSections.forEach(tense => {
                const checkboxesContainer = document.getElementById(`preverbCheckboxes_${tense}`);
                if (!checkboxesContainer) {
                    allContainersFound = false;
                }
            });

            if (allContainersFound) {
                tenseSections.forEach(tense => {
                    const checkboxesContainer = document.getElementById(`preverbCheckboxes_${tense}`);

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

                    // Show the preverb selection section
                    const preverbSelection = document.getElementById(`preverbSelection_${tense}`);
                    if (preverbSelection) {
                        preverbSelection.style.display = 'block';
                    }
                });
            } else if (attempts < maxAttempts) {
                setTimeout(tryGenerateCheckboxes, 200);
            }
        };

        // Start the retry process
        tryGenerateCheckboxes();
    }

    /**
     * Clear all preverb-related form fields
     */
    clearPreverbFormFields() {
        // Clear default preverb select
        const defaultPreverbSelect = document.getElementById('defaultPreverb');
        if (defaultPreverbSelect) {
            defaultPreverbSelect.value = '';
        }

        // Clear all available preverb checkboxes
        document.querySelectorAll('input[name="availablePreverbs"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Clear complex rules checkbox
        const complexRulesCheckbox = document.getElementById('hasComplexRules');
        if (complexRulesCheckbox) {
            complexRulesCheckbox.checked = false;
        }

        // Clear argument overrides checkbox
        const argumentOverridesCheckbox = document.getElementById('hasArgumentOverrides');
        if (argumentOverridesCheckbox) {
            argumentOverridesCheckbox.checked = false;
        }

        // Clear complex rules content
        const complexRulesContent = document.getElementById('complexRulesContent');
        if (complexRulesContent) {
            complexRulesContent.classList.add('hidden');
        }

        // Clear argument overrides content
        const argumentOverridesContent = document.getElementById('argumentOverridesContent');
        if (argumentOverridesContent) {
            argumentOverridesContent.classList.add('hidden');
        }

        // Clear preverb translations list
        const preverbTranslationsList = document.getElementById('preverbTranslationsList');
        if (preverbTranslationsList) {
            preverbTranslationsList.innerHTML = '';
        }

        // Clear tense fallbacks list
        const tenseFallbacksList = document.getElementById('tenseFallbacksList');
        if (tenseFallbacksList) {
            tenseFallbacksList.innerHTML = '';
        }

        // Clear preverb overrides list
        const preverbOverridesList = document.getElementById('preverbOverridesList');
        if (preverbOverridesList) {
            preverbOverridesList.innerHTML = '';
        }

        // Clear preverb checkboxes in examples section
        const tenseSections = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        tenseSections.forEach(tense => {
            const checkboxesContainer = document.getElementById(`preverbCheckboxes_${tense}`);
            if (checkboxesContainer) {
                checkboxesContainer.innerHTML = '';
            }

            // Hide the preverb selection section
            const preverbSelection = document.getElementById(`preverbSelection_${tense}`);
            if (preverbSelection) {
                preverbSelection.style.display = 'none';
            }
        });
    }

    /**
     * Load preverb rules from new structure
     */
    loadPreverbRules(preverbRules) {
        console.log('[LOADER] Loading preverb rules:', preverbRules);

        // Show complex rules section if there are any preverb rules (indicating multi-preverb verb)
        // or if there are actual fallback data
        const hasComplexRules = preverbRules.default ||
            preverbRules.replacements ||
            (preverbRules.tense_specific_fallbacks && Object.keys(preverbRules.tense_specific_fallbacks).length > 0) ||
            (preverbRules.english_fallbacks && Object.keys(preverbRules.english_fallbacks).length > 0);

        if (hasComplexRules) {
            // Check the complex rules checkbox and show the content
            const complexRulesCheckbox = document.getElementById('hasComplexRules');
            const complexRulesContent = document.getElementById('complexRulesContent');

            if (complexRulesCheckbox) {
                complexRulesCheckbox.checked = true;
            }

            if (complexRulesContent) {
                complexRulesContent.classList.remove('hidden');
            }

            // Update progressive disclosure form state to match UI state
            this.progressiveDisclosure.updateFormState({ hasComplexRules: true });

            // Load tense-specific fallbacks
            if (preverbRules.tense_specific_fallbacks && Object.keys(preverbRules.tense_specific_fallbacks).length > 0) {
                console.log('[LOADER] Found tense-specific fallbacks, calling loadTenseSpecificFallbacks');
                this.loadTenseSpecificFallbacks(preverbRules.tense_specific_fallbacks);
            } else {
                console.log('[LOADER] No tense-specific fallbacks found in preverbRules:', preverbRules.tense_specific_fallbacks);
            }

            // Load English fallbacks (same as tense-specific for now)
            if (preverbRules.english_fallbacks && Object.keys(preverbRules.english_fallbacks).length > 0) {
                console.log('[LOADER] English fallbacks found:', preverbRules.english_fallbacks);
            }
        }
    }

    /**
     * Load preverb-specific translations from english_translations
     */
    loadPreverbTranslations(englishTranslations) {
        console.log('[LOADER] Loading preverb-specific translations:', englishTranslations);

        if (!englishTranslations) {
            console.log('[LOADER] No english translations found');
            return;
        }

        // Find preverb-specific translations (any key that's not 'default')
        const preverbTranslations = {};
        Object.entries(englishTranslations).forEach(([key, translations]) => {
            if (key !== 'default') {
                preverbTranslations[key] = translations;
            }
        });

        if (Object.keys(preverbTranslations).length === 0) {
            console.log('[LOADER] No preverb-specific translations found');
            return;
        }

        // Check the complex rules checkbox and show the content
        const complexRulesCheckbox = document.getElementById('hasComplexRules');
        const complexRulesContent = document.getElementById('complexRulesContent');

        if (complexRulesCheckbox) {
            complexRulesCheckbox.checked = true;
        }

        if (complexRulesContent) {
            complexRulesContent.classList.remove('hidden');
        }

        // Update progressive disclosure form state to match UI state
        this.progressiveDisclosure.updateFormState({ hasComplexRules: true });

        console.log('[LOADER] Found preverb translations:', preverbTranslations);
        this.loadPreverbTranslationsIntoUI(preverbTranslations);
    }

    /**
     * Load preverb-specific translations into the UI
     */
    loadPreverbTranslationsIntoUI(preverbTranslations) {
        const translationsList = document.getElementById('preverbTranslationsList');
        if (!translationsList) {
            console.error('[LOADER] Preverb translations list container not found');
            return;
        }

        // Clear existing translations
        translationsList.innerHTML = '';

        // Add each preverb translation
        Object.entries(preverbTranslations).forEach(([preverb, translations]) => {
            this.addPreverbTranslationItem(preverb, translations);
        });
    }

    /**
     * Add a preverb translation item to the UI
     */
    addPreverbTranslationItem(preverb, translations) {
        const translationsList = document.getElementById('preverbTranslationsList');
        const itemId = `translation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        const tenseInputs = tenses.map(tense => {
            const translation = translations[tense] || '';
            let placeholder = '';
            if (tense === 'present') placeholder = 'show';
            else if (tense === 'imperfect') placeholder = 'was showing';
            else if (tense === 'future') placeholder = 'will show';
            else if (tense === 'aorist') placeholder = 'showed';
            else if (tense === 'optative') placeholder = 'show (should added in examples)';
            else if (tense === 'imperative') placeholder = 'show';

            return `
                <div class="form-group">
                    <label for="translation${tense.charAt(0).toUpperCase() + tense.slice(1)}_${itemId}">${tense.charAt(0).toUpperCase() + tense.slice(1)}:</label>
                    <input type="text" id="translation${tense.charAt(0).toUpperCase() + tense.slice(1)}_${itemId}" 
                           value="${translation}" placeholder="e.g., ${placeholder}">
                    <div class="field-help">${tense.charAt(0).toUpperCase() + tense.slice(1)} form</div>
                </div>
            `;
        }).join('');

        const html = `
            <div class="translation-item" id="${itemId}">
                <div class="translation-controls">
                    <button type="button" class="btn btn-danger btn-small" onclick="this.closest('.translation-item').remove()">Remove</button>
                </div>
                <h5>Preverb: ${preverb}</h5>
                <input type="hidden" data-field="preverb" value="${preverb}">
                <div class="translation-overrides" style="display: block;">
                    <h6>English Translations for ${preverb}</h6>
                    <div class="translations-grid">
                        ${tenseInputs}
                    </div>
                </div>
            </div>
        `;

        translationsList.insertAdjacentHTML('beforeend', html);
    }

    /**
     * Load tense-specific fallbacks into the UI
     */
    loadTenseSpecificFallbacks(tenseFallbacks) {
        console.log('[LOADER] Loading tense-specific fallbacks:', tenseFallbacks);

        const fallbacksList = document.getElementById('tenseFallbacksList');
        if (!fallbacksList) {
            console.error('[LOADER] Tense fallbacks list container not found');
            return;
        }

        // Clear existing fallbacks
        fallbacksList.innerHTML = '';

        if (!tenseFallbacks || Object.keys(tenseFallbacks).length === 0) {
            console.log('[LOADER] No tense fallbacks to load');
            return;
        }

        console.log('[LOADER] Processing fallbacks:', Object.entries(tenseFallbacks));

        // Group fallbacks by preverb and fallback target
        const fallbackGroups = new Map();

        Object.entries(tenseFallbacks).forEach(([preverb, tenseFallbacks]) => {
            console.log('[LOADER] Processing preverb:', preverb, 'with fallbacks:', tenseFallbacks);
            Object.entries(tenseFallbacks).forEach(([tense, fallback]) => {
                console.log('[LOADER] Adding fallback item:', preverb, tense, fallback);

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

        // Create consolidated fallback sections
        fallbackGroups.forEach((group) => {
            console.log('[LOADER] Creating consolidated fallback for:', group);
            this.addTenseFallbackWithData(group.preverb, group.tenses, group.fallback);
        });
    }

    /**
     * Add a tense fallback item to the UI (DEPRECATED - use addTenseFallbackWithData instead)
     * This method creates individual fallback sections for each tense, which is not the desired behavior.
     * The consolidated approach using addTenseFallbackWithData is preferred.
     */
    addTenseFallbackItem(preverb, tense, fallback) {
        console.warn('[LOADER] addTenseFallbackItem is deprecated. Use addTenseFallbackWithData for consolidated fallback sections.');

        // For backward compatibility, create a single consolidated section
        this.addTenseFallbackWithData(preverb, [tense], fallback);
    }

    /**
     * Generate preverb options for select dropdowns
     */
    generatePreverbOptions(selectedPreverb) {
        // Get available preverbs from the current verb's configuration
        let availablePreverbs = ['მი', 'მო', 'გა', 'წა']; // Default fallback

        if (this.currentVerb && this.currentVerb.preverb_config && this.currentVerb.preverb_config.available_preverbs) {
            availablePreverbs = this.currentVerb.preverb_config.available_preverbs;
            console.log('[LOADER] Using available preverbs from verb config:', availablePreverbs);
        } else {
            console.log('[LOADER] Using default preverbs:', availablePreverbs);
        }

        return availablePreverbs.map(preverb =>
            `<option value="${preverb}" ${preverb === selectedPreverb ? 'selected' : ''}>${preverb}</option>`
        ).join('');
    }

    /**
     * Convert form data to new semantic-only verb structure
     */
    convertFormDataToVerbStructure(formData) {
        console.log('[CONVERT] Starting conversion with formData:', formData);

        try {
            console.log('[CONVERT] Building valency section...');
            const valency = this.buildValencySection(formData);
            console.log('[CONVERT] Valency built:', valency);

            console.log('[CONVERT] Building syntax section...');
            const syntax = this.buildSyntaxSection(formData);
            console.log('[CONVERT] Syntax built:', syntax);

            console.log('[CONVERT] Building English translations...');
            const english_translations = this.buildEnglishTranslations(formData);
            console.log('[CONVERT] English translations built:', english_translations);

            console.log('[CONVERT] Building conjugations...');
            const conjugations = this.buildConjugations(formData);
            console.log('[CONVERT] Conjugations built:', conjugations);

            console.log('[CONVERT] Building preverb config...');
            const preverb_config = this.buildPreverbConfig(formData);
            console.log('[CONVERT] Preverb config built:', preverb_config);

            console.log('[CONVERT] Building preverb rules...');
            const preverb_rules = this.buildPreverbRules(formData);
            console.log('[CONVERT] Preverb rules built:', preverb_rules);

            const verbData = {
                id: this.currentVerb?.id || null, // Don't assign ID for new verbs - let server assign it
                georgian: formData.georgian_display, // Use georgian_display as the main georgian field
                description: formData.description,
                category: formData.category,
                class: formData.class,
                semantic_key: formData.semantic_key,
                notes: formData.notes,
                url: formData.url,
                global_argument_pattern: formData.argument_pattern,
                valency: valency,
                syntax: syntax,
                english_translations: english_translations,
                conjugations: conjugations,
                preverb_config: preverb_config,
                preverb_rules: preverb_rules
            };

            console.log('[CONVERT] Final verb data:', verbData);
            return verbData;
        } catch (error) {
            console.error('[CONVERT] Error in convertFormDataToVerbStructure:', error);
            console.error('[CONVERT] Error stack:', error.stack);
            throw error;
        }
    }

    /**
     * Build valency section
     */
    buildValencySection(formData) {
        // Use the valency data that was already collected in getFormData()
        if (formData.valency && formData.valency.default) {
            console.log('[VALENCY] Using pre-collected valency data:', formData.valency);
            return formData.valency;
        }

        // Fallback: collect valency data directly from form
        console.log('[VALENCY] Collecting valency data from form...');
        const defaultValency = formData.valency_default || formData.argument_pattern;
        const alternatives = formData.valency_alternatives || [];

        return {
            default: defaultValency,
            alternatives: alternatives
        };
    }

    /**
     * Build syntax section with semantic-only arguments
     */
    buildSyntaxSection(formData) {
        // Use the syntax data that was already collected in getFormData()
        if (formData.syntax && formData.syntax.arguments) {
            console.log('[SYNTAX] Using pre-collected syntax data:', formData.syntax);
            return formData.syntax;
        }

        // Fallback: collect syntax data directly from form
        console.log('[SYNTAX] Collecting syntax data from form...');
        const syntax = {
            arguments: {},
            prepositions: {
                subject: formData.subjectPreposition || "",
                direct_object: formData.directObjectPreposition || "",
                indirect_object: formData.indirectObjectPreposition || ""
            },
            preverb_overrides: {}
        };

        // Get arguments data from form fields
        syntax.arguments = this.getArgumentsDataFromForm(formData.argument_pattern);

        return syntax;
    }

    /**
     * Build English translations section
     */
    buildEnglishTranslations(formData) {
        // Use the english_translations data that was already collected in getFormData()
        if (formData.english_translations && formData.english_translations.default) {
            console.log('[TRANSLATIONS] Using pre-collected translations data:', formData.english_translations);
            return formData.english_translations;
        }

        // Fallback: collect translations data directly from form
        console.log('[TRANSLATIONS] Collecting translations data from form...');

        // Ensure optative translation doesn't have "should" prefix
        let optativeTranslation = formData.translationOptative || "";
        if (optativeTranslation && optativeTranslation.trim() !== '') {
            const optativeValue = optativeTranslation.trim();
            if (optativeValue.toLowerCase().startsWith('should ')) {
                optativeTranslation = optativeValue.substring(7); // Remove "should " prefix
                console.log('[TRANSLATIONS] Removed automatic "should" prefix from optative in fallback:', optativeValue, '->', optativeTranslation);
            }
        }

        const translations = {
            default: {
                present: formData.translationPresent || "",
                imperfect: formData.translationImperfect || "",
                future: formData.translationFuture || "",
                aorist: formData.translationAorist || "",
                optative: optativeTranslation,
                imperative: formData.translationImperative || ""
            }
        };

        // Add preverb-specific translations if they exist
        if (formData.preverbTranslations && Object.keys(formData.preverbTranslations).length > 0) {
            Object.entries(formData.preverbTranslations).forEach(([preverb, preverbTranslations]) => {
                translations[preverb] = {
                    present: preverbTranslations.present || "",
                    imperfect: preverbTranslations.imperfect || "",
                    future: preverbTranslations.future || "",
                    aorist: preverbTranslations.aorist || "",
                    optative: preverbTranslations.optative || "",
                    imperative: preverbTranslations.imperative || ""
                };
            });
        }

        return translations;
    }

    /**
     * Add "should" prefix to optative translations if not already present
     */
    addShouldPrefix(optativeTranslation) {
        if (!optativeTranslation || optativeTranslation.trim() === '') {
            return "";
        }

        const trimmed = optativeTranslation.trim();

        // If it already starts with "should", return as is
        if (trimmed.toLowerCase().startsWith('should ')) {
            return trimmed;
        }

        // Add "should" prefix
        return `should ${trimmed}`;
    }

    /**
     * Build conjugations section
     */
    buildConjugations(formData) {
        // Use the conjugations data that was already collected in getFormData()
        if (formData.conjugations && Object.keys(formData.conjugations).length > 0) {
            console.log('[CONJUGATIONS] Using pre-collected conjugations data:', formData.conjugations);
            return formData.conjugations;
        }

        // Fallback: collect conjugations data directly from form
        console.log('[CONJUGATIONS] Collecting conjugations data from form...');
        const conjugations = {};
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        tenses.forEach(tense => {
            conjugations[tense] = {
                raw_gloss: this.getRawGlossFromForm(tense),
                forms: this.getConjugationFormsForTense(tense),
                examples: []
            };
        });

        return conjugations;
    }

    /**
     * Build preverb configuration
     */
    buildPreverbConfig(formData) {
        // Use the preverb_config data that was already collected in getFormData()
        if (formData.preverb_config) {
            console.log('[PREVERB_CONFIG] Using pre-collected preverb config data:', formData.preverb_config);

            // Clean up the pre-collected data to remove extra keys for simple verbs
            const hasMultiplePreverbs = formData.preverb_config.has_multiple_preverbs;
            const cleanedConfig = {
                has_multiple_preverbs: hasMultiplePreverbs,
                default_preverb: formData.preverb_config.default_preverb || "",
                available_preverbs: formData.preverb_config.available_preverbs || []
            };

            // Only add complex keys if has_multiple_preverbs is true
            // Note: Removed has_complex_rules and has_argument_overrides as they are not needed

            console.log('[PREVERB_CONFIG] Cleaned config:', cleanedConfig);
            return cleanedConfig;
        }

        // Fallback: collect preverb config data directly from form
        console.log('[PREVERB_CONFIG] Collecting preverb config data from form...');
        const hasMultiplePreverbs = formData.hasMultiplePreverbs === 'true';

        const config = {
            has_multiple_preverbs: hasMultiplePreverbs,
            default_preverb: formData.defaultPreverb || "",
            available_preverbs: this.getSelectedPreverbsFromForm()
        };

        // Note: Removed has_complex_rules and has_argument_overrides as they are not needed

        return config;
    }

    /**
     * Build preverb rules
     */
    buildPreverbRules(formData) {
        // Check if we have pre-collected preverb_rules data in preverb_config
        if (formData.preverb_config && formData.preverb_config.rules) {
            console.log('[PREVERB_RULES] Using pre-collected preverb_rules data from preverb_config:', formData.preverb_config.rules);

            // For simple verbs, return empty object regardless of pre-collected data
            const hasMultiplePreverbs = formData.hasMultiplePreverbs === 'true' ||
                (formData.preverb_config && formData.preverb_config.has_multiple_preverbs);

            if (!hasMultiplePreverbs) {
                console.log('[PREVERB_RULES] Simple verb - returning empty preverb_rules object');
                return {};
            }

            // For complex verbs, return the pre-collected data
            console.log('[PREVERB_RULES] Complex verb - returning pre-collected preverb_rules structure');
            return formData.preverb_config.rules;
        }

        // Fallback: determine from form data
        const hasMultiplePreverbs = formData.hasMultiplePreverbs === 'true';

        // For simple verbs (has_multiple_preverbs: false), return empty object
        if (!hasMultiplePreverbs) {
            console.log('[PREVERB_RULES] Simple verb - returning empty preverb_rules object');
            return {};
        }

        // For complex verbs (has_multiple_preverbs: true), return full structure
        console.log('[PREVERB_RULES] Complex verb - returning full preverb_rules structure');

        // Get the preverb config data to build proper rules
        const preverbConfig = formData.preverb_config;
        const rules = {
            default: preverbConfig?.default_preverb || formData.defaultPreverb || "",
            replacements: {},
            tense_specific_fallbacks: {},
            english_fallbacks: {}
        };

        // Generate replacements based on available preverbs
        if (preverbConfig?.available_preverbs) {
            preverbConfig.available_preverbs.forEach(preverb => {
                rules.replacements[preverb] = preverb;
            });
        }

        return rules;
    }

    /**
     * Get the path to the verbs.json file
     */
    getVerbsFilePath() {
        // Return the relative path to the verbs.json file
        return 'src/data/verbs.json';
    }

    /**
     * Clear all form data and reset the form
     */
    clearAllFormData() {
        console.log('[CLEAR] Clearing all form data...');

        // Clear basic information fields
        const basicFields = [
            'georgianWrapper', 'georgianDisplay', 'description', 'category',
            'verbClass', 'semanticKey', 'notes', 'url', 'argumentPattern',
            'valencyDefault', 'subjectPreposition', 'directObjectPreposition',
            'indirectObjectPreposition'
        ];

        basicFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.value = '';
                console.log(`[CLEAR] Cleared field: ${fieldId}`);
            }
        });

        // Clear translation fields
        const translationFields = [
            'translationPresent', 'translationImperfect', 'translationFuture',
            'translationAorist', 'translationOptative', 'translationImperative'
        ];

        translationFields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                element.value = '';
                console.log(`[CLEAR] Cleared translation field: ${fieldId}`);
            }
        });

        // Clear valency alternatives checkboxes
        const valencyCheckboxes = document.querySelectorAll('input[name="valencyAlternatives"]:checked');
        valencyCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            console.log(`[CLEAR] Unchecked valency alternative: ${checkbox.value}`);
        });

        // Clear preverb configuration
        const preverbRadios = document.querySelectorAll('input[name="hasMultiplePreverbs"]');
        preverbRadios.forEach(radio => {
            radio.checked = false;
        });
        document.querySelector('input[name="hasMultiplePreverbs"][value="false"]').checked = true;

        const defaultPreverbSelect = document.getElementById('defaultPreverb');
        if (defaultPreverbSelect) {
            defaultPreverbSelect.value = '';
        }

        const preverbCheckboxes = document.querySelectorAll('input[name="availablePreverbs"]:checked');
        preverbCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });

        // Clear conjugation forms
        const tenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];
        tenses.forEach(tense => {
            const rawGlossElement = document.getElementById(`rawGloss_${tense}`);
            if (rawGlossElement) {
                rawGlossElement.value = '';
            }

            const personForms = this.getPersonFormsForTense(tense);
            personForms.forEach(person => {
                const conjugationElement = document.getElementById(`conjugation_${tense}_${person}`);
                if (conjugationElement) {
                    conjugationElement.value = '';
                }
            });
        });

        // Clear argument fields
        const argumentSelects = document.querySelectorAll('.noun-select, .adjective-select');
        argumentSelects.forEach(select => {
            select.value = '';
        });

        // Reset current verb
        this.currentVerb = null;

        // Clear localStorage
        if (this.storageManager) {
            try {
                this.storageManager.clearAllData();
            } catch (error) {
                console.log('[CLEAR] Storage manager clearAllData not available, clearing localStorage manually');
                // Clear localStorage manually
                const keys = Object.keys(localStorage);
                keys.forEach(key => {
                    if (key.startsWith('verb_editor_')) {
                        localStorage.removeItem(key);
                        console.log(`[CLEAR] Removed localStorage key: ${key}`);
                    }
                });
            }
        } else {
            // Clear localStorage manually if storage manager not available
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('verb_editor_')) {
                    localStorage.removeItem(key);
                    console.log(`[CLEAR] Removed localStorage key: ${key}`);
                }
            });
        }

        // Hide any error or success messages
        this.hideErrors();
        this.hideSuccess();

        console.log('[CLEAR] All form data cleared successfully');
    }

    /**
     * Verify that the save operation was successful by checking if the verb exists in the file
     */
    async verifySaveOperation(verbData) {
        try {
            console.log('[VERIFY] Verifying save operation...');

            // Wait a moment for the file to be written
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Try to fetch the verb from the server to verify it was saved
            const serverUrl = 'http://localhost:5002/api/verbs';
            const response = await fetch(`${serverUrl}/${verbData.id}`);

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.verb) {
                    console.log('✅ [VERIFY] Save verification successful!');
                    console.log('✅ [VERIFY] Verb found in file:', result.verb);
                } else {
                    console.warn('⚠️ [VERIFY] Save verification failed - verb not found in file');
                }
            } else {
                console.warn('⚠️ [VERIFY] Save verification failed - server response not ok');
            }
        } catch (error) {
            console.warn('⚠️ [VERIFY] Save verification failed:', error.message);
        }
    }

    /**
     * Get next available verb ID
     */
    getNextVerbId() {
        if (!this.database || !this.database.verbs || this.database.verbs.length === 0) {
            return 1;
        }

        const maxId = Math.max(...this.database.verbs.map(v => v.id || 0));
        return maxId + 1;
    }

    /**
     * Get arguments data from form fields
     */
    getArgumentsDataFromForm(argumentPattern) {
        const argumentsData = {};

        if (!argumentPattern || !/^<[SDOI\-]+>$/.test(argumentPattern)) {
            console.log('[ARGUMENTS] No valid argument pattern:', argumentPattern);
            return argumentsData;
        }

        const args = argumentPattern.slice(1, -1).split('-');
        console.log('[ARGUMENTS] Processing argument pattern:', argumentPattern, 'args:', args);

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

    /**
     * Get raw gloss for a specific tense from the form
     */
    getRawGlossFromForm(tense) {
        const rawGlossElement = document.getElementById(`rawGloss_${tense}`);
        if (rawGlossElement && rawGlossElement.value) {
            return rawGlossElement.value.trim();
        }

        // Fallback to basic pattern if no raw gloss is entered
        const argumentPatternElement = document.getElementById('argumentPattern');
        const argumentPattern = argumentPatternElement ? argumentPatternElement.value : '';
        return this.getRawGlossForTense(tense, argumentPattern);
    }

    /**
     * Get raw gloss for a specific tense and argument pattern (fallback method)
     */
    getRawGlossForTense(tense, argumentPattern) {
        if (!argumentPattern) return "";

        // Convert argument pattern to raw gloss format
        return argumentPattern;
    }

    /**
     * Get conjugation forms for a specific tense
     */
    getConjugationFormsForTense(tense) {
        const forms = {};
        const persons = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];

        persons.forEach(person => {
            const element = document.getElementById(`conjugation_${tense}_${person}`);
            if (element) {
                forms[person] = element.value || "";
            }
        });

        return forms;
    }

    /**
     * Get selected preverbs from form
     */
    getSelectedPreverbsFromForm() {
        const selectedPreverbs = [];
        const preverbCheckboxes = document.querySelectorAll('input[name="availablePreverbs"]:checked');

        preverbCheckboxes.forEach(checkbox => {
            selectedPreverbs.push(checkbox.value);
        });

        return selectedPreverbs;
    }

    /**
     * Save verb data to file via server API
     */
    async saveVerbToFile(verbData) {
        try {
            console.log('[SAVE_FILE] Starting save to file with verbData:', verbData);
            const serverUrl = 'http://localhost:5002/api/verbs';

            // Check if verb actually exists in the database by ID
            let isNewVerb = true;
            if (verbData.id) {
                try {
                    const checkResponse = await fetch(`${serverUrl}/${verbData.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    isNewVerb = !checkResponse.ok;
                    console.log('[SAVE_FILE] Verb exists check result:', !isNewVerb);
                } catch (error) {
                    console.log('[SAVE_FILE] Error checking if verb exists, treating as new verb:', error);
                    isNewVerb = true;
                }
            }
            console.log('[SAVE_FILE] Is new verb:', isNewVerb);

            let response;
            if (isNewVerb) {
                // Add new verb
                console.log('[SAVE_FILE] Adding new verb...');
                response = await fetch(serverUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(verbData)
                });
            } else {
                // Update existing verb
                console.log('[SAVE_FILE] Updating existing verb...');
                response = await fetch(`${serverUrl}/${verbData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(verbData)
                });
            }

            console.log('[SAVE_FILE] Response received:', response);
            const result = await response.json();
            console.log('[SAVE_FILE] Result:', result);

            if (result.success) {
                console.log('[SAVE_FILE] Verb saved successfully:', result.message);

                // Update the current verb with the saved data
                if (result.verb) {
                    console.log('[SAVE_FILE] Updating current verb with:', result.verb);
                    this.currentVerb = result.verb;
                }

                return result;
            } else {
                throw new Error(result.error || 'Failed to save verb');
            }

        } catch (error) {
            console.error('[SAVE_FILE] Failed to save verb to file:', error);
            console.error('[SAVE_FILE] Error stack:', error.stack);

            // Fallback to download if server is not available
            if (error.message.includes('fetch') || error.message.includes('network')) {
                console.warn('[SAVE_FILE] Server not available, falling back to download');
                this.downloadVerbAsFile(verbData);
                return { success: true, message: 'Verb downloaded as file (server unavailable)' };
            }

            throw new Error(`File save failed: ${error.message}`);
        }
    }

    /**
     * Download verb data as file (fallback method)
     */
    downloadVerbAsFile(verbData) {
        try {
            const dataStr = JSON.stringify(verbData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = `verb_${verbData.semantic_key || verbData.georgian}.json`;
            link.click();

            console.log('[SAVE] Verb data downloaded as file:', verbData);
        } catch (error) {
            console.error('[SAVE] Failed to download verb file:', error);
            throw error;
        }
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
        alert(`Error: ${message}`);
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
                georgian_wrapper: formData.georgian_wrapper,
                georgian_display: formData.georgian_display,
                class: formData.class,
                semantic_key: formData.semantic_key,
                argument_pattern: formData.argument_pattern,
                valency_default: formData.valency_default,
                valency_alternatives: formData.valency_alternatives,
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
                georgian: formData.georgian_display || '', // Use georgian_display as the internal georgian field
                description: formData.description || '', // Use description field value
                category: formData.category || '',
                class: formData.class || '',
                semantic_key: formData.semantic_key || '',
                notes: formData.notes || '',
                url: formData.url || '',
                global_argument_pattern: formData.argument_pattern || '',
                valency: {
                    default: formData.valency_default || formData.argument_pattern || '',
                    alternatives: formData.valency_alternatives || []
                },

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
                description: verbJson.description,
                category: verbJson.category,
                class: verbJson.class,
                semantic_key: verbJson.semantic_key,
                global_argument_pattern: verbJson.global_argument_pattern,
                valency: verbJson.valency,
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
            const formData = this.getFormData();
            const georgianWrapper = formData.georgian_wrapper; // Use the wrapper field as the key

            if (!georgianWrapper) {
                throw new Error('Georgian wrapper text is required for verbs wrapper');
            }

            const verbData = this.generateVerbJson();

            // Create internal structure with "verbs" wrapper (matches verbs.json)
            const verbsWrapperJson = {
                verbs: {
                    [georgianWrapper]: verbData
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
            const formData = this.getFormData();
            const georgianWrapper = formData.georgian_wrapper; // Use the wrapper field as the key

            if (!georgianWrapper) {
                throw new Error('Georgian wrapper text is required for meta-verb wrapper');
            }

            const verbData = this.generateVerbJson();

            // Create meta-verb wrapper structure
            const metaVerbJson = {
                [georgianWrapper]: verbData
            };

            return metaVerbJson;
        } catch (error) {
            console.error('Error generating meta-verb JSON:', error);
            throw new Error(`Failed to generate meta-verb JSON: ${error.message}`);
        }
    }

    generateVerbJsonForVerbsFile() {
        try {
            const formData = this.getFormData();
            const georgianWrapper = formData.georgian_wrapper; // Use the wrapper field as the key

            if (!georgianWrapper) {
                throw new Error('Georgian wrapper text is required for verbs.json format');
            }

            const verbData = this.generateVerbJson();

            // Create the structure that matches verbs.json format
            const verbsFileJson = {
                verbs: {
                    [georgianWrapper]: verbData
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
            // Populate both wrapper and display fields with the scraped Georgian text
            const georgianWrapperField = document.getElementById('georgianWrapper');
            const georgianDisplayField = document.getElementById('georgianDisplay');

            if (georgianWrapperField) {
                georgianWrapperField.value = scrapedData.georgian;
            }
            if (georgianDisplayField) {
                georgianDisplayField.value = scrapedData.georgian;
            }

            this.checkVerbExists(scrapedData.georgian);
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

            // Check if arguments are properly configured
            const argumentPattern = actualVerbData.global_argument_pattern || actualVerbData.valency?.default;
            const syntax = actualVerbData.syntax || {};
            const argumentData = syntax.arguments || {};

            // Check if arguments are missing
            const missingArguments = this.checkMissingArguments(argumentPattern, argumentData);
            if (missingArguments.length > 0) {
                this.showArgumentGuidance(tense, missingArguments);
                return;
            }

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

            // Debug: Check what prepositions are being passed
            console.log(`🔍 [EXAMPLES] Prepositions being passed:`, actualVerbData.syntax?.prepositions);

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

    /**
     * Check if arguments are missing based on the argument pattern
     */
    checkMissingArguments(argumentPattern, argumentData) {
        if (!argumentPattern) return [];

        const missing = [];
        const args = argumentPattern.slice(1, -1).split('-'); // Remove < > and split

        args.forEach(arg => {
            const argType = this.getArgumentTypeFromPattern(arg);
            if (argType && (!argumentData[argType] || this.isArgumentEmpty(argumentData[argType]))) {
                missing.push(argType);
            }
        });

        return missing;
    }

    /**
     * Get argument type from pattern (S -> subject, DO -> direct_object, IO -> indirect_object)
     */
    getArgumentTypeFromPattern(pattern) {
        switch (pattern) {
            case 'S': return 'subject';
            case 'DO': return 'direct_object';
            case 'IO': return 'indirect_object';
            default: return null;
        }
    }

    /**
     * Check if an argument is empty (no nouns or adjectives selected)
     */
    isArgumentEmpty(argument) {
        if (!argument) return true;

        // Check if any person has a noun or adjective selected
        for (const person of ['3sg', '3pl']) {
            const personData = argument[person];
            if (personData && (personData.noun || personData.adjective)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Show guidance when arguments are missing
     */
    showArgumentGuidance(tense, missingArguments) {
        const loadingElement = document.getElementById(`exampleLoading_${tense}`);
        const errorElement = document.getElementById(`exampleError_${tense}`);
        const containerElement = document.getElementById(`examplesContainer_${tense}`);

        // Hide loading state
        loadingElement.style.display = 'none';
        containerElement.style.display = 'none';

        // Show guidance message
        errorElement.style.display = 'block';

        const argNames = missingArguments.map(arg => {
            switch (arg) {
                case 'subject': return 'Subject';
                case 'direct_object': return 'Direct Object';
                case 'indirect_object': return 'Indirect Object';
                default: return arg;
            }
        }).join(', ');

        errorElement.innerHTML = `
            <div class="argument-guidance">
                <h4>⚠️ Arguments Not Configured</h4>
                <p>Please configure the following arguments in the <strong>Arguments</strong> section before generating examples:</p>
                <ul>
                    ${missingArguments.map(arg => `<li><strong>${this.getArgumentTypeFromPattern(arg === 'subject' ? 'S' : arg === 'direct_object' ? 'DO' : 'IO')}</strong> - ${arg.replace('_', ' ')}</li>`).join('')}
                </ul>
                <p><em>This ensures examples use your selected nouns and adjectives instead of fallback values.</em></p>
            </div>
        `;
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
                georgian_wrapper: document.getElementById('georgianWrapper')?.value || '',
                georgian_display: document.getElementById('georgianDisplay')?.value || '',
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
                    [basicVerbData.georgian_wrapper || 'temp']: basicVerbData
                }
            };
        }

        // Use the existing form data collection and enhance it
        const verbData = {
            id: this.currentVerb?.id || null,
            georgian_wrapper: formData.georgian_wrapper || '',
            georgian_display: formData.georgian_display || '',
            description: formData.description || '',
            category: formData.category || '',
            class: formData.class || '',
            semantic_key: formData.semantic_key || '',
            notes: formData.notes || '',
            url: formData.url || '',

            // Enhanced syntax data collection
            syntax: {
                arguments: this.collectEnhancedSyntaxData(),
                prepositions: formData.syntax?.prepositions || {},
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
                [verbData.georgian_wrapper || 'temp']: verbData
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
    const requiredElements = ['newVerbBtn', 'loadVerbBtn', 'saveVerbBtn', 'scrapeBtn', 'clearFormBtn', 'verbSelectionModal', 'verbSearchInput', 'categoryFilter', 'classFilter', 'verbList', 'verbListLoading', 'verbListEmpty', 'loadSelectedVerbBtn', 'cancelVerbSelectionBtn'];
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