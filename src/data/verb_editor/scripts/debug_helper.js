/**
 * Debug Helper for Verb Editor Validation Issues
 * This script provides debugging tools to identify validation problems
 */

class ValidationDebugHelper {
    constructor(verbEditor, validationEngine) {
        this.verbEditor = verbEditor;
        this.validationEngine = validationEngine;
    }

    /**
 * Run comprehensive validation debug
 */
    debugValidation() {
        console.log('=== VALIDATION DEBUG START ===');

        try {
            console.log('🔍 Getting form data from verb editor...');
            const formData = this.verbEditor.getFormData();
            console.log('Form Data Collected:', formData);

            // Show key data structure
            console.log('\n📊 FORM DATA STRUCTURE:');
            console.log(`  - Basic info: ${formData.basic ? '✓' : '✗'}`);
            console.log(`  - Arguments: ${formData.arguments ? '✓' : '✗'}`);
            console.log(`  - Conjugations: ${formData.conjugations ? '✓' : '✗'}`);
            console.log(`  - Prepositions: ${formData.prepositions ? '✓' : '✗'}`);
            console.log(`  - Preverb config: ${formData.preverbConfig ? '✓' : '✗'}`);
            console.log(`  - Has multiple preverbs: ${formData.hasMultiplePreverbs || '✗'}`);

            console.log('🔍 Running validation...');
            // Run validation
            const validationResult = this.validationEngine.validateForm(formData);
            console.log('Validation Result:', validationResult);

            // Show detailed validation breakdown
            if (validationResult.isValid) {
                console.log('✅ All validation checks passed');
            } else {
                console.log(`❌ Validation failed with ${Object.keys(validationResult.errors).length} error categories:`);
                Object.keys(validationResult.errors).forEach(category => {
                    console.log(`  - ${category}: ${validationResult.errors[category].length} errors`);
                });
            }

            if (!validationResult.isValid) {
                console.log('❌ VALIDATION FAILED');
                this.analyzeValidationErrors(validationResult.errors, formData);
            } else {
                console.log('✅ VALIDATION PASSED');
            }

            // Detailed field analysis
            this.analyzeArgumentsStructure(formData);
            this.analyzeConjugationsStructure(formData);

            // Show validation rules summary
            console.log('\n📋 VALIDATION RULES SUMMARY:');
            try {
                const rules = this.validationEngine.getRules();
                if (rules && typeof rules === 'object') {
                    Object.keys(rules).forEach(ruleName => {
                        console.log(`  - ${ruleName}: ${typeof rules[ruleName] === 'function' ? 'Custom function' : 'Pattern'}`);
                    });
                } else {
                    console.log('  - Validation rules not available');
                }
            } catch (error) {
                console.log('  - Validation rules not available (error:', error.message, ')');
            }

        } catch (error) {
            console.error('❌ Debug Error:', error);
        }

        console.log('=== VALIDATION DEBUG END ===');
    }

    /**
     * Analyze specific validation errors
     */
    analyzeValidationErrors(errors, formData) {
        console.log('\n🔍 ANALYZING VALIDATION ERRORS:');

        Object.entries(errors).forEach(([field, fieldErrors]) => {
            console.log(`\n${field.toUpperCase()} ERRORS:`);
            fieldErrors.forEach(error => {
                console.log(`  - ${error}`);
            });

            // Field-specific analysis
            switch (field) {
                case 'arguments':
                    this.analyzeArgumentsValidation(formData);
                    break;
                case 'conjugations':
                    this.analyzeConjugationsValidation(formData);
                    break;
                case 'preverb':
                    this.analyzePreverbValidation(formData);
                    break;
            }
        });
    }

    /**
 * Analyze arguments structure and validation
 */
    analyzeArgumentsValidation(formData) {
        console.log('\n📋 ARGUMENTS VALIDATION ANALYSIS:');

        const args = formData.arguments;
        console.log('  Arguments object:', args);

        if (!args) {
            console.log('  ❌ No arguments object found');
            return;
        }

        // Check subject arguments
        if (args.subject) {
            console.log('  Subject Arguments:');
            ['3sg', '3pl'].forEach(person => {
                const personData = args.subject[person];
                if (personData) {
                    const hasNoun = personData.noun && personData.noun.trim();
                    const hasAdjective = personData.adjective && personData.adjective.trim();
                    console.log(`    ${person}: noun=${hasNoun ? '✓' : '✗'}, adjective=${hasAdjective ? '✓' : '✗'}`);
                } else {
                    console.log(`    ${person}: ✗ Missing`);
                }
            });
        } else {
            console.log('  ❌ No subject arguments found');
        }

        // Check direct object arguments
        if (args.direct_object) {
            console.log('  Direct Object Arguments:');
            ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'].forEach(person => {
                const personData = args.direct_object[person];
                if (personData) {
                    const hasNoun = personData.noun && personData.noun.trim();
                    const hasAdjective = personData.adjective && personData.adjective.trim();
                    console.log(`    ${person}: noun=${hasNoun ? '✓' : '✗'}, adjective=${hasAdjective ? '✓' : '✗'}`);
                } else {
                    console.log(`    ${person}: ✗ Missing`);
                }
            });
        } else {
            console.log('  ❌ No direct object arguments found');
        }

        // Check indirect object arguments
        if (args.indirect_object) {
            console.log('  Indirect Object Arguments:');
            ['1sg', '2sg', '3sg', '1pl', '2pl', '3pl'].forEach(person => {
                const personData = args.indirect_object[person];
                if (personData) {
                    const hasNoun = personData.noun && personData.noun.trim();
                    const hasAdjective = personData.adjective && personData.adjective.trim();
                    console.log(`    ${person}: noun=${hasNoun ? '✓' : '✗'}, adjective=${hasAdjective ? '✓' : '✗'}`);
                } else {
                    console.log(`    ${person}: ✗ Missing`);
                }
            });
        } else {
            console.log('  ❌ No indirect object arguments found');
        }
    }

    /**
     * Analyze conjugations structure and validation
     */
    analyzeConjugationsValidation(formData) {
        console.log('\n📚 CONJUGATIONS VALIDATION ANALYSIS:');

        const conjugations = formData.conjugations;
        console.log('  Conjugations object:', conjugations);

        if (!conjugations) {
            console.log('  ❌ No conjugations object found');
            return;
        }

        const requiredTenses = ['present', 'imperfect', 'future', 'aorist', 'optative', 'imperative'];

        requiredTenses.forEach(tense => {
            console.log(`\n  ${tense.toUpperCase()}:`);

            if (conjugations[tense]) {
                const tenseData = conjugations[tense];
                console.log(`    Tense data keys: ${Object.keys(tenseData).join(', ')}`);

                // Check raw_gloss
                if (tenseData.raw_gloss) {
                    const glossValid = this.validationEngine.validateRawGlossFormat(tenseData.raw_gloss);
                    console.log(`    raw_gloss: ✓ Present (${glossValid ? 'Valid' : 'Invalid'})`);
                    console.log(`      Value: "${tenseData.raw_gloss}"`);

                    if (!glossValid) {
                        console.log(`      ❌ Raw gloss validation failed`);
                        console.log(`      Expected format: V Voice Tense [Modifiers] <S:Case> <DO:Case> etc.`);
                        console.log(`      Example: V MedAct Pres <S:Nom> <DO:Dat>`);
                    }
                } else {
                    console.log(`    raw_gloss: ✗ Missing`);
                }

                // Check forms
                if (tenseData.forms) {
                    const formsValid = this.validationEngine.validateFormsStructure(tenseData.forms, tense);
                    console.log(`    forms: ✓ Present (${formsValid ? 'Valid' : 'Invalid'})`);

                    if (!formsValid) {
                        const expectedPersons = this.validationEngine.getExpectedPersonsForTense(tense);
                        console.log(`      Expected persons: ${expectedPersons.join(', ')}`);

                        expectedPersons.forEach(person => {
                            if (tenseData.forms[person]) {
                                console.log(`        ${person}: ✓ Present`);
                                // Show the actual form data for debugging
                                const personForm = tenseData.forms[person];
                                console.log(`          Form data:`, personForm);
                            } else {
                                console.log(`        ${person}: ✗ Missing`);
                            }
                        });
                    } else {
                        // Show forms structure even when valid
                        console.log(`      Forms structure:`, tenseData.forms);
                    }
                } else {
                    console.log(`    forms: ✗ Missing`);
                }

            } else {
                console.log(`    ❌ Tense data missing`);
            }
        });
    }

    /**
     * Analyze preverb validation
     */
    analyzePreverbValidation(formData) {
        console.log('\n🔄 PREVERB VALIDATION ANALYSIS:');

        if (formData.hasMultiplePreverbs === 'true') {
            console.log('  Multiple Preverbs: Enabled');

            const config = formData.preverbConfig;
            if (config) {
                console.log('  Preverb Config:');
                console.log(`    default_preverb: ${config.default_preverb || '✗ Missing'}`);
                console.log(`    available_preverbs: ${config.available_preverbs ? config.available_preverbs.join(', ') : '✗ Missing'}`);

                if (config.default_preverb && config.available_preverbs) {
                    const defaultInList = config.available_preverbs.includes(config.default_preverb);
                    console.log(`    default in available list: ${defaultInList ? '✓' : '✗'}`);
                }
            } else {
                console.log('  ❌ No preverb config found');
            }
        } else {
            console.log('  Multiple Preverbs: Disabled (no validation needed)');
        }
    }

    /**
 * Analyze arguments structure
 */
    analyzeArgumentsStructure(formData) {
        console.log('\n🏗️ ARGUMENTS STRUCTURE ANALYSIS:');

        const args = formData.arguments;
        console.log('  Arguments object:', args);

        if (!args) {
            console.log('  ❌ No arguments object found');
            return;
        }

        console.log('  Arguments object keys:', Object.keys(args));

        Object.entries(args).forEach(([argType, argData]) => {
            console.log(`\n  ${argType.toUpperCase()}:`);
            if (argData && typeof argData === 'object') {
                console.log(`    Person forms: ${Object.keys(argData).join(', ')}`);

                Object.entries(argData).forEach(([person, personData]) => {
                    if (personData && typeof personData === 'object') {
                        console.log(`      ${person}: noun="${personData.noun || ''}", adjective="${personData.adjective || ''}"`);
                    } else {
                        console.log(`      ${person}: ✗ Invalid data structure`);
                    }
                });
            } else {
                console.log(`    ❌ Invalid data structure`);
            }
        });
    }

    /**
 * Analyze conjugations structure
 */
    analyzeConjugationsStructure(formData) {
        console.log('\n📖 CONJUGATIONS STRUCTURE ANALYSIS:');

        const conjugations = formData.conjugations;
        console.log('  Conjugations object:', conjugations);

        if (!conjugations) {
            console.log('  ❌ No conjugations object found');
            return;
        }

        console.log('  Conjugations object keys:', Object.keys(conjugations));

        Object.entries(conjugations).forEach(([tense, tenseData]) => {
            console.log(`\n  ${tense.toUpperCase()}:`);

            if (tenseData && typeof tenseData === 'object') {
                console.log(`    Data keys: ${Object.keys(tenseData).join(', ')}`);

                if (tenseData.raw_gloss) {
                    console.log(`    raw_gloss: "${tenseData.raw_gloss}"`);
                }

                if (tenseData.forms) {
                    console.log(`    Forms keys: ${Object.keys(tenseData.forms).join(', ')}`);

                    Object.entries(tenseData.forms).forEach(([person, personData]) => {
                        if (personData && typeof personData === 'object') {
                            console.log(`      ${person}: ${Object.keys(personData).join(', ')}`);
                        } else {
                            console.log(`      ${person}: ✗ Invalid data structure`);
                        }
                    });
                }
            } else {
                console.log(`    ❌ Invalid data structure`);
            }
        });
    }

    /**
     * Check specific field values
     */
    checkFieldValue(fieldPath) {
        const formData = this.verbEditor.getFormData();
        const pathParts = fieldPath.split('.');
        let value = formData;

        for (const part of pathParts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                console.log(`❌ Field path "${fieldPath}" not found at "${part}"`);
                return null;
            }
        }

        console.log(`✅ Field "${fieldPath}":`, value);
        return value;
    }

    /**
     * Validate specific field
     */
    validateField(fieldName, value) {
        const result = this.validationEngine.validateField(fieldName, value);
        console.log(`Field "${fieldName}" validation:`, result);
        return result;
    }

    /**
     * Show help information
     */
    showHelp() {
        console.log(`
🔧 VALIDATION DEBUG HELPER - USAGE GUIDE

Available Methods:
- debugValidation() - Run comprehensive validation debug
- analyzeArgumentsValidation(formData) - Analyze arguments validation issues
- analyzeConjugationsValidation(formData) - Analyze conjugations validation issues
- analyzePreverbValidation(formData) - Analyze preverb validation issues
- analyzeArgumentsStructure(formData) - Analyze arguments data structure
- analyzeConjugationsStructure(formData) - Analyze conjugations data structure
- checkFieldValue(fieldPath) - Check specific field value (e.g., "arguments.subject.3sg")
- validateField(fieldName, value) - Validate specific field
- showHelp() - Show this help message

Example Usage:
  debugHelper.debugValidation();
  debugHelper.checkFieldValue("arguments.direct_object.1sg");
  debugHelper.validateField("georgian", "ვხედავ");

Common Field Paths:
  arguments.subject.3sg
  arguments.direct_object.1sg
  conjugations.present.raw_gloss
  conjugations.present.forms.1sg
        `);
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ValidationDebugHelper;
}
