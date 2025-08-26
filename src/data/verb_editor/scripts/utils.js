/**
 * Progressive Disclosure System for Verb Editor
 * Shows/hides sections based on form state and user selections
 */

class ProgressiveDisclosure {
    constructor() {
        this.sections = new Map();
        this.formState = {};
        this.visibilityCallbacks = new Map();
    }

    /**
     * Add a section with its visibility condition
     */
    addSection(sectionId, element, visibilityCondition) {
        if (!element) {
            console.warn(`Element not found for section: ${sectionId}`);
            return;
        }

        this.sections.set(sectionId, {
            element: element,
            condition: visibilityCondition,
            visible: false
        });

        // Store the visibility callback for this section
        this.visibilityCallbacks.set(sectionId, visibilityCondition);
    }

    /**
     * Update visibility of all sections based on current form state
     */
    updateVisibility() {
        this.sections.forEach((section, sectionId) => {
            const shouldBeVisible = this.evaluateVisibility(sectionId);
            this.setSectionVisibility(sectionId, shouldBeVisible);
        });
    }

    /**
     * Evaluate whether a section should be visible
     */
    evaluateVisibility(sectionId) {
        const callback = this.visibilityCallbacks.get(sectionId);
        if (!callback) return false;

        try {
            const result = callback(this.formState);
            return result;
        } catch (error) {
            console.warn(`Error evaluating visibility for section ${sectionId}:`, error);
            return false;
        }
    }

    /**
     * Set the visibility of a specific section
     */
    setSectionVisibility(sectionId, visible) {
        const section = this.sections.get(sectionId);
        if (!section) return;

        if (visible && !section.visible) {
            // Show section
            section.element.classList.remove('hidden');
            section.visible = true;
            this.animateSectionIn(section.element);
        } else if (!visible && section.visible) {
            // Hide section
            section.visible = false;
            this.animateSectionOut(section.element, () => {
                section.element.classList.add('hidden');
            });
        }
    }

    /**
     * Animate section in
     */
    animateSectionIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';
        element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        // Trigger animation
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    /**
     * Animate section out
     */
    animateSectionOut(element, callback) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

        // Trigger animation
        requestAnimationFrame(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(-10px)';

            // Call callback after animation
            setTimeout(callback, 200);
        });
    }

    /**
     * Update form state and refresh visibility
     */
    updateFormState(newState) {
        this.formState = { ...this.formState, ...newState };
        this.updateVisibility();
    }

    /**
     * Get current form state
     */
    getFormState() {
        return { ...this.formState };
    }

    /**
     * Show a specific section
     */
    showSection(sectionId) {
        this.setSectionVisibility(sectionId, true);
    }

    /**
     * Hide a specific section
     */
    hideSection(sectionId) {
        this.setSectionVisibility(sectionId, false);
    }

    /**
     * Toggle a section's visibility
     */
    toggleSection(sectionId) {
        const section = this.sections.get(sectionId);
        if (!section) return;

        this.setSectionVisibility(sectionId, !section.visible);
    }

    /**
     * Get visibility status of all sections
     */
    getVisibilityStatus() {
        const status = {};
        this.sections.forEach((section, sectionId) => {
            status[sectionId] = section.visible;
        });
        return status;
    }

    /**
     * Reset all sections to hidden
     */
    resetAllSections() {
        this.sections.forEach((section, sectionId) => {
            this.setSectionVisibility(sectionId, false);
        });
    }

    /**
     * Add a custom visibility rule
     */
    addCustomRule(sectionId, rule) {
        if (this.sections.has(sectionId)) {
            this.visibilityCallbacks.set(sectionId, rule);
        }
    }

    /**
     * Remove a section
     */
    removeSection(sectionId) {
        this.sections.delete(sectionId);
        this.visibilityCallbacks.delete(sectionId);
    }

    /**
     * Get all registered section IDs
     */
    getSectionIds() {
        return Array.from(this.sections.keys());
    }

    /**
     * Check if a section is currently visible
     */
    isSectionVisible(sectionId) {
        const section = this.sections.get(sectionId);
        return section ? section.visible : false;
    }

    /**
     * Add a section with progressive disclosure based on form field changes
     */
    addFormDependentSection(sectionId, element, fieldName, expectedValue, operator = 'equals') {
        const condition = (formState) => {
            const fieldValue = formState[fieldName];

            switch (operator) {
                case 'equals':
                    return fieldValue === expectedValue;
                case 'not_equals':
                    return fieldValue !== expectedValue;
                case 'contains':
                    return fieldValue && fieldValue.includes(expectedValue);
                case 'starts_with':
                    return fieldValue && fieldValue.startsWith(expectedValue);
                case 'ends_with':
                    return fieldValue && fieldValue.endsWith(expectedValue);
                case 'greater_than':
                    return fieldValue > expectedValue;
                case 'less_than':
                    return fieldValue < expectedValue;
                case 'is_empty':
                    return !fieldValue || fieldValue.trim() === '';
                case 'is_not_empty':
                    return fieldValue && fieldValue.trim() !== '';
                default:
                    return false;
            }
        };

        this.addSection(sectionId, element, condition);
    }

    /**
     * Add a section that depends on multiple conditions (AND logic)
     */
    addMultiConditionSection(sectionId, element, conditions) {
        const condition = (formState) => {
            return conditions.every(cond => {
                const fieldValue = formState[cond.field];

                switch (cond.operator) {
                    case 'equals':
                        return fieldValue === cond.value;
                    case 'not_equals':
                        return fieldValue !== cond.value;
                    case 'contains':
                        return fieldValue && fieldValue.includes(cond.value);
                    case 'is_empty':
                        return !fieldValue || fieldValue.trim() === '';
                    case 'is_not_empty':
                        return fieldValue && fieldValue.trim() !== '';
                    default:
                        return false;
                }
            });
        };

        this.addSection(sectionId, element, condition);
    }

    /**
     * Add a section that depends on multiple conditions (OR logic)
     */
    addOrConditionSection(sectionId, element, conditions) {
        const condition = (formState) => {
            return conditions.some(cond => {
                const fieldValue = formState[cond.field];

                switch (cond.operator) {
                    case 'equals':
                        return fieldValue === cond.value;
                    case 'not_equals':
                        return fieldValue !== cond.value;
                    case 'contains':
                        return fieldValue && fieldValue.includes(cond.value);
                    case 'is_empty':
                        return !fieldValue || fieldValue.trim() === '';
                    case 'is_not_empty':
                        return fieldValue && fieldValue.trim() !== '';
                    default:
                        return false;
                }
            });
        };

        this.addSection(sectionId, element, condition);
    }
}
