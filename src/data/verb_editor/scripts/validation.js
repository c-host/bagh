/**
 * Validation Engine for Verb Editor
 * Handles form validation and provides clear error messages
 */

class ValidationEngine {
    constructor() {
        this.rules = new Map();
        this.setupDefaultRules();
    }

    setupDefaultRules() {
        // Georgian text validation
        this.addRule('georgian', (value) => {
            if (!value.trim()) return 'Georgian text is required';
            if (!/^[ა-ჰ\s]+$/.test(value)) return 'Georgian text must contain only Georgian characters';
            return true;
        });

        // Description validation
        this.addRule('description', (value) => {
            if (!value.trim()) return 'Description is required';
            return true;
        });

        // Category validation
        this.addRule('category', (value) => {
            if (!value.trim()) return 'Category is required';
            return true;
        });

        // Argument pattern validation
        this.addRule('argumentPattern', (value) => {
            if (!value.trim()) return 'Argument pattern is required';
            if (!/^<[SDOI\-]+>$/.test(value)) return 'Invalid argument pattern format. Use format like <S>, <S-DO>, <S-IO>, or <S-DO-IO>';

            // Extract the pattern without brackets
            const pattern = value.slice(1, -1);
            const args = pattern.split('-');

            // Check for valid patterns only
            const validPatterns = ['S', 'S-DO', 'S-IO', 'S-DO-IO'];
            if (!validPatterns.includes(pattern)) {
                return 'Invalid argument pattern. Only &lt;S&gt;, &lt;S-DO&gt;, &lt;S-IO&gt;, or &lt;S-DO-IO&gt; are allowed.';
            }

            // Ensure S (Subject) is always first
            if (!args.includes('S') || args[0] !== 'S') {
                return 'Subject (S) must be the first argument in the pattern.';
            }

            return true;
        });

        // Semantic key validation
        this.addRule('semanticKey', (value) => {
            if (!value.trim()) return 'Semantic key is required';
            if (!/^[a-z_]+$/.test(value)) return 'Semantic key must contain only lowercase letters and underscores';
            return true;
        });

        // URL validation
        this.addRule('url', (value) => {
            if (value && !this.isValidUrl(value)) return 'Please enter a valid URL';
            return true;
        });

        // Raw gloss validation
        this.addRule('rawGloss', (value) => {
            if (!value.trim()) return 'Raw gloss is required for each tense';
            // Basic validation for raw gloss format - allow more flexible patterns
            if (!/^V\s+[A-Za-z]+\s+[A-Za-z]+\s+<[SDOI\-:]+>/.test(value)) {
                return 'Raw gloss must follow the format: V MedAct Tense <S-DO> <S:Case> <DO:Case>';
            }
            return true;
        });

        // Preverb validation
        this.addRule('preverb', (value) => {
            if (value && !/^[ა-ჰ]+$/.test(value)) return 'Preverb must contain only Georgian characters';
            return true;
        });

        // Preposition validation
        this.addRule('preposition', (value) => {
            if (value && !/^[a-zA-Z\s]+$/.test(value)) return 'Preposition must contain only letters and spaces';
            return true;
        });
    }

    addRule(fieldName, validator) {
        this.rules.set(fieldName, validator);
    }

    validateField(fieldName, value) {
        const validator = this.rules.get(fieldName);
        if (!validator) return { isValid: true, errors: [] };

        const result = validator(value);
        if (result === true) {
            return { isValid: true, errors: [] };
        } else {
            return { isValid: false, errors: [result] };
        }
    }

    validateForm(formData) {
        const errors = {};
        let isValid = true;

        // Validate required fields
        const requiredFields = ['georgian', 'description', 'category', 'argumentPattern', 'semanticKey'];
        requiredFields.forEach(field => {
            const validation = this.validateField(field, formData[field]);
            if (!validation.isValid) {
                errors[field] = validation.errors;
                isValid = false;
            }
        });

        // Validate conditional fields based on argument pattern
        if (formData.argumentPattern) {
            const args = this.parseArgumentPattern(formData.argumentPattern);

            // Validate that argument fields are filled if pattern requires them
            if (args.includes('S')) {
                if (!this.validateSubjectArguments(formData)) {
                    errors.arguments = ['Subject arguments must be specified for 3sg and 3pl'];
                    isValid = false;
                }
            }

            if (args.includes('DO')) {
                if (!this.validateDirectObjectArguments(formData)) {
                    errors.arguments = ['Direct object arguments must be specified for all person forms'];
                    isValid = false;
                }
            }

            if (args.includes('IO')) {
                if (!this.validateIndirectObjectArguments(formData)) {
                    errors.arguments = ['Indirect object arguments must be specified for all person forms'];
                    isValid = false;
                }
            }
        }

        // Validate preverb configuration if multiple preverbs
        if (formData.hasMultiplePreverbs === 'true') {
            if (!this.validatePreverbConfiguration(formData)) {
                errors.preverb = ['Preverb configuration is incomplete'];
                isValid = false;
            }

            // Validate preverb argument overrides
            if (!this.validatePreverbArgumentOverrides(formData)) {
                errors.preverbArgumentOverrides = ['Preverb argument overrides validation failed'];
                isValid = false;
            }
        }

        // Validate conjugations
        if (!this.validateConjugations(formData)) {
            errors.conjugations = ['Conjugation data is incomplete'];
            isValid = false;
        }

        return { isValid, errors };
    }

    parseArgumentPattern(pattern) {
        if (!pattern || !/^<[SDOI\-]+>$/.test(pattern)) return [];
        return pattern.slice(1, -1).split('-');
    }

    validateSubjectArguments(formData) {
        // Check if subject arguments are specified for 3sg and 3pl (not 1sg)
        const subjectArgs = formData.arguments?.subject;
        if (!subjectArgs) {
            return false;
        }

        const has3sg = subjectArgs['3sg'] && subjectArgs['3sg'].noun && subjectArgs['3sg'].adjective;
        const has3pl = subjectArgs['3pl'] && subjectArgs['3pl'].noun && subjectArgs['3pl'].adjective;

        const result = has3sg && has3pl;
        // console.log(`Subject validation result: ${result}`);
        return result;
    }

    validateDirectObjectArguments(formData) {
        // Check if direct object arguments are specified for all person forms
        const doArgs = formData.arguments?.direct_object;
        if (!doArgs) {
            // console.log('❌ No direct_object arguments found in formData.arguments');
            return false;
        }

        const personForms = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
        const validationResult = personForms.every(person => {
            const personData = doArgs[person];
            const hasNoun = personData && personData.noun && personData.noun.trim();
            const hasAdjective = personData && personData.adjective && personData.adjective.trim();

            if (!hasNoun || !hasAdjective) {
                // console.log(`❌ ${person}: noun="${personData?.noun || ''}", adjective="${personData?.adjective || ''}"`);
            }

            return hasNoun && hasAdjective;
        });

        // console.log(`Direct object validation result: ${validationResult}`);
        return validationResult;
    }

    validateIndirectObjectArguments(formData) {
        // Check if indirect object arguments are specified for all person forms
        const ioArgs = formData.arguments?.indirect_object;
        if (!ioArgs) {
            // console.log('❌ No indirect_object arguments found in formData.arguments');
            return false;
        }

        const personForms = ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'];
        const validationResult = personForms.every(person => {
            const personData = ioArgs[person];
            const hasNoun = personData && personData.noun && personData.noun.trim();
            const hasAdjective = personData && personData.adjective && personData.adjective.trim();

            if (!hasNoun || !hasAdjective) {
                // console.log(`❌ ${person}: noun="${personData?.noun || ''}", adjective="${personData?.adjective || ''}"`);
            }

            return hasNoun && hasAdjective;
        });

        // console.log(`Indirect object validation result: ${validationResult}`);
        return validationResult;
    }

    validatePreverbConfiguration(formData) {
        // Check if the form has multiple preverbs enabled
        if (formData.hasMultiplePreverbs !== 'true') {
            return true; // No validation needed if multiple preverbs is not enabled
        }

        // If multiple preverbs is enabled, check basic required fields
        const config = formData.preverbConfig; // Note: using camelCase to match form data
        if (!config) return false;

        // Basic validation: default preverb and available preverbs
        if (!config.default_preverb || !config.available_preverbs || config.available_preverbs.length === 0) {
            return false;
        }

        // Check that default preverb is in the available list
        if (!config.available_preverbs.includes(config.default_preverb)) {
            return false;
        }

        // Enhanced validation for complex preverb configurations
        if (config.rules && Object.keys(config.rules).length > 0) {
            if (!this.validatePreverbRules(config.rules, config.available_preverbs)) {
                return false;
            }
        }

        if (config.overrides && Object.keys(config.overrides).length > 0) {
            if (!this.validatePreverbOverrides(config.overrides, config.available_preverbs)) {
                return false;
            }
        }

        if (config.translations && Object.keys(config.translations).length > 0) {
            if (!this.validatePreverbTranslations(config.translations, config.available_preverbs)) {
                return false;
            }
        }

        return true;
    }

    validatePreverbRules(rules, availablePreverbs) {
        // Validate that all preverbs in rules are in the available list
        for (const preverb in rules) {
            if (!availablePreverbs.includes(preverb)) {
                console.log(`❌ Preverb rule references unavailable preverb: ${preverb}`);
                return false;
            }

            // Validate that each preverb has valid tense mappings
            const preverbRules = rules[preverb];
            for (const tense in preverbRules) {
                const replacement = preverbRules[tense];
                if (!availablePreverbs.includes(replacement)) {
                    console.log(`❌ Preverb rule references unavailable replacement: ${replacement}`);
                    return false;
                }
            }
        }
        return true;
    }

    validatePreverbOverrides(overrides, availablePreverbs) {
        // Validate that all preverbs in overrides are in the available list
        for (const preverb in overrides) {
            if (!availablePreverbs.includes(preverb)) {
                console.log(`❌ Preverb override references unavailable preverb: ${preverb}`);
                return false;
            }

            // Validate argument structure
            const preverbOverrides = overrides[preverb];
            if (preverbOverrides.arguments) {
                for (const argumentType in preverbOverrides.arguments) {
                    const personOverrides = preverbOverrides.arguments[argumentType];
                    for (const person in personOverrides) {
                        const override = personOverrides[person];
                        if (!override.noun || !override.adjective) {
                            console.log(`❌ Incomplete override for ${preverb} ${argumentType} ${person}`);
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }

    // Enhanced validation for preverb argument overrides
    validatePreverbArgumentOverrides(formData) {
        const config = formData.preverbConfig;
        if (!config || !config.has_multiple_preverbs) {
            return true; // No validation needed
        }

        const overridesContainer = document.getElementById('preverbArgumentOverrides');
        if (!overridesContainer) {
            return true; // No overrides to validate
        }

        const preverbSections = overridesContainer.querySelectorAll('.preverb-arguments');
        const errors = [];

        preverbSections.forEach(section => {
            const preverb = section.getAttribute('data-preverb');
            if (!config.available_preverbs.includes(preverb)) {
                errors.push(`Preverb "${preverb}" is not in the available preverbs list`);
                return;
            }

            // Validate argument fields for this preverb
            const argumentGroups = section.querySelectorAll('.argument-group');
            argumentGroups.forEach(group => {
                const argType = group.getAttribute('data-arg');
                const personForms = group.querySelectorAll('.noun-select, .adjective-select');

                personForms.forEach(form => {
                    const person = form.getAttribute('data-person');
                    const valueType = form.classList.contains('noun-select') ? 'noun' : 'adjective';
                    const value = form.value;

                    if (value && value.trim() !== '') {
                        // Value is set, validate it's not empty
                        if (value.trim() === '') {
                            errors.push(`Empty ${valueType} value for ${preverb} ${argType} ${person}`);
                        }
                    }
                    // If value is empty, it means "inherit from default" which is valid
                });
            });
        });

        if (errors.length > 0) {
            console.log('❌ Preverb argument override validation errors:', errors);
            return false;
        }

        return true;
    }

    validatePreverbTranslations(translations, availablePreverbs) {
        // Validate that all preverbs in translations are in the available list
        for (const preverb in translations) {
            if (!availablePreverbs.includes(preverb)) {
                console.log(`❌ Preverb translation references unavailable preverb: ${preverb}`);
                return false;
            }

            // Validate that each preverb has valid tense translations
            const preverbTranslations = translations[preverb];
            for (const tense in preverbTranslations) {
                const translation = preverbTranslations[tense];
                if (!translation || typeof translation !== 'string' || translation.trim() === '') {
                    console.log(`❌ Missing translation for ${preverb} ${tense}`);
                    return false;
                }
            }
        }
        return true;
    }

    validateConjugations(formData) {
        const conjugations = formData.conjugations;
        console.log('🔍 Conjugations data:', conjugations);
        if (!conjugations) {
            console.log('❌ No conjugations found');
            return false;
        }

        const requiredTenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        // Check that all required tenses are present
        if (!requiredTenses.every(tense => conjugations[tense])) {
            console.log('❌ Missing required tenses');
            return false;
        }

        // Validate each tense
        for (const tense of requiredTenses) {
            console.log(`🔍 Validating ${tense} tense...`);
            const tenseData = conjugations[tense];
            if (!this.validateTense(tenseData, tense)) {
                console.log(`❌ ${tense} tense validation failed`);
                return false;
            }
        }

        return true;
    }

    validateTense(tenseData, tenseName) {
        console.log(`🔍 Validating ${tenseName} tense data:`, tenseData);
        if (!tenseData || typeof tenseData !== 'object') {
            console.log(`❌ ${tenseName}: Invalid tense data structure`);
            return false;
        }

        // Check required fields
        if (!tenseData.raw_gloss || !tenseData.forms) {
            console.log(`❌ ${tenseName}: Missing raw_gloss or forms`);
            return false;
        }

        // Validate raw gloss format
        console.log(`🔍 Validating ${tenseName} raw_gloss: "${tenseData.raw_gloss}"`);
        if (!this.validateRawGlossFormat(tenseData.raw_gloss)) {
            console.log(`❌ ${tenseName}: Raw gloss validation failed`);
            return false;
        }

        // Validate forms structure
        console.log(`🔍 Validating ${tenseName} forms structure:`, tenseData.forms);
        if (!this.validateFormsStructure(tenseData.forms, tenseName)) {
            console.log(`❌ ${tenseName}: Forms structure validation failed`);
            return false;
        }

        return true;
    }

    validateRawGlossFormat(rawGloss) {
        if (!rawGloss || typeof rawGloss !== 'string') {
            console.log('❌ Raw gloss is not a string:', rawGloss);
            return false;
        }

        // More flexible pattern to account for the variety of raw gloss formats in verbs.json
        // Voice can be: MedAct, Act, Pass, MedPass
        // Tense can be: Pres, Impf, Fut, Aor, Opt, Impv
        // Modifiers can be: Inv, Pv, LV, SV, OV (optional, in any order)
        // Argument patterns can be: <S>, <DO>, <IO>, <S-DO>, <S-IO>, <S-DO-IO>, etc.
        // Case markers can be: Nom, Dat, Erg, Gen, etc.
        // Comprehensive pattern that matches ALL actual raw gloss formats found in verbs.json
        // Format: V Voice [Modifiers] Tense [Modifiers] <ArgumentPattern> [<S:Case> <DO:Case> <IO:Case>]
        // Voices: MedAct, Act, Pass, MedPass
        // Tenses: Pres, Impf, Fut, Aor, Opt, Impv
        // Modifiers: Inv, Pv, LV, SV, OV (can appear BEFORE or AFTER tense, optional)
        // Argument Patterns: <S>, <S-DO>, <S-IO>, <S-DO-IO>
        // Case Patterns: <S:Nom>, <S:Erg>, <S:Dat>, <DO:Nom>, <DO:Dat>, <IO:Nom>, <IO:Dat>
        const pattern = /^V\s+(MedAct|Act|Pass|MedPass)(\s+(Inv|Pv|LV|SV|OV))*\s+(Pres|Impf|Fut|Aor|Opt|Impv)(\s+(Inv|Pv|LV|SV|OV))*\s+<[SDOI\-]+>.*$/;
        const isValid = pattern.test(rawGloss);

        if (!isValid) {
            console.log(`❌ Raw gloss validation failed for: "${rawGloss}"`);
            console.log('Expected format: V Voice Tense [Modifiers] <ArgumentPattern> [<S:Case> <DO:Case> <IO:Case>]');
            console.log('Examples:');
            console.log('  V Act Pres <S-DO> <S:Nom> <DO:Dat>');
            console.log('  V MedAct Inv Pres Pv LV <S-DO> <S:Dat> <DO:Nom>');
            console.log('  V Pass Pres <S-IO> <S:Nom> <IO:Dat>');
            console.log('  V Act Pres <S> <S:Nom>');
        } else {
            console.log(`✅ Raw gloss validation passed: "${rawGloss}"`);
        }

        return isValid;
    }

    validateFormsStructure(forms, tenseName) {
        console.log(`🔍 Validating ${tenseName} forms structure:`, forms);
        if (!forms || typeof forms !== 'object') {
            console.log(`❌ ${tenseName}: Invalid forms structure`);
            return false;
        }

        // Get expected person forms for this tense
        const expectedPersons = this.getExpectedPersonsForTense(tenseName);
        console.log(`🔍 Expected persons for ${tenseName}:`, expectedPersons);

        // Check that all expected persons are present
        for (const person of expectedPersons) {
            if (!forms[person] || typeof forms[person] !== 'object') {
                console.log(`❌ ${tenseName}: Missing or invalid person form for ${person}`);
                return false;
            }
        }

        console.log(`✅ ${tenseName}: Forms structure validation passed`);
        return true;
    }

    getExpectedPersonsForTense(tenseName) {
        switch (tenseName) {
            case 'imperative':
                return ['2sg', '2pl']; // Only 2nd person forms for imperative
            case 'present':
            case 'imperfect':
            case 'future':
            case 'aorist':
            case 'optative':
                return ['1sg', '3sg', '3pl']; // Only 1sg, 3sg, 3pl for these tenses
            default:
                return ['1sg', '3sg', '3pl']; // Default to 1sg, 3sg, 3pl
        }
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // Special validation for Georgian text
    validateGeorgianText(text) {
        if (!text) return { isValid: false, errors: ['Text is required'] };

        const errors = [];

        // Check for Georgian characters only
        if (!/^[ა-ჰ\s]+$/.test(text)) {
            errors.push('Text must contain only Georgian characters');
        }

        // Check for empty strings
        if (!text.trim()) {
            errors.push('Text cannot be empty');
        }

        // Check for proper word boundaries (basic check)
        if (/\s{2,}/.test(text)) {
            errors.push('Multiple consecutive spaces are not allowed');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Validation for semantic key uniqueness
    async validateSemanticKeyUniqueness(semanticKey, existingVerbs) {
        if (!semanticKey) return { isValid: false, errors: ['Semantic key is required'] };

        const errors = [];

        // Check format
        if (!/^[a-z_]+$/.test(semanticKey)) {
            errors.push('Semantic key must contain only lowercase letters and underscores');
        }

        // Check uniqueness against existing verbs
        if (existingVerbs && existingVerbs.some(verb => verb.semantic_key === semanticKey)) {
            errors.push('Semantic key must be unique across all verbs');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
}
