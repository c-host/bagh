/**
 * AnimationManager - Centralized animation logic for smooth fade-in effects
 * Consolidates all fade-in animation logic that was previously duplicated across modules
 */
export class AnimationManager {
    // Animation constants - centralized for easy modification
    static TRANSITION_VALUE = 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    static FADE_IN_DELAY = 100;
    static FONT_LOADING_TIMEOUT = 50;
    static STAGGER_DELAY = 100;
    static INITIAL_STAGGER_DELAY = 200;

    // Standardized timeout values
    static LOADING_CONTAINER_REMOVAL_DELAY = 700;
    static INTEGRATION_TEST_DELAY = 200;
    static DOM_READINESS_DELAY = 100;
    static FONT_TIMEOUT_DELAY = 100;

    /**
     * Ensure the CSS rule that hides verb sections is present
     * This prevents flash of static content before animations start
     */
    static ensureCssRulePresent() {
        // Check if the CSS rule already exists
        const styleElements = document.querySelectorAll('style');
        let ruleExists = false;

        styleElements.forEach(style => {
            if (style.textContent &&
                style.textContent.includes('.verb-section') &&
                style.textContent.includes('display: none !important')) {
                ruleExists = true;
            }
        });

        // If rule doesn't exist, inject it
        if (!ruleExists) {
            const style = document.createElement('style');
            style.textContent = '.verb-section { display: none !important; }';
            document.head.appendChild(style);
        }
    }

    /**
     * Wait for fonts to load and then fade in content smoothly
     * @param {Element} verbSection - Verb section element to fade in
     * @param {Object} options - Animation options
     * @param {number} options.delay - Custom delay before fade-in (default: FADE_IN_DELAY)
     * @param {string} options.context - Context for logging (e.g., 'Main', 'Sidebar', 'Enhanced')
     */
    static async waitForFontsAndFadeIn(verbSection, options = {}) {
        const { delay = this.FADE_IN_DELAY, context = 'AnimationManager' } = options;

        try {
            // Check if document.fonts is available (modern browsers)
            if (document.fonts && document.fonts.ready) {
                await document.fonts.ready;
            } else {
                // Fallback: wait a short time for fonts to load
                await new Promise(resolve => setTimeout(resolve, this.FONT_LOADING_TIMEOUT));
            }

            // Remove the CSS rule that hides all verb sections NOW, after fonts are loaded
            const styleElements = document.querySelectorAll('style');
            styleElements.forEach((style, index) => {
                if (style.textContent &&
                    style.textContent.includes('.verb-section') &&
                    style.textContent.includes('display: none !important')) {
                    style.remove();
                }
            });

            // Start the fade-in animation with specified delay
            setTimeout(() => {
                verbSection.style.opacity = '1';
            }, delay);

        } catch (error) {
            // Fallback: make content visible immediately
            verbSection.style.opacity = '1';
        }
    }

    /**
     * Fade in a single verb section with smooth animation
     * @param {Element} verbSection - Verb section element to fade in
     * @param {Object} options - Animation options
     * @param {boolean} options.hideOthers - Whether to hide other verb sections (default: true)
     * @param {number} options.delay - Custom delay before fade-in (default: FADE_IN_DELAY)
     * @param {string} options.context - Context for logging (e.g., 'Main', 'Sidebar', 'Enhanced')
     */
    static async fadeInVerbSection(verbSection, options = {}) {
        const {
            hideOthers = true,
            delay = this.FADE_IN_DELAY,
            context = 'AnimationManager'
        } = options;

        // Hide all other verb sections if requested
        if (hideOthers) {
            const allVerbSections = document.querySelectorAll('.verb-section');
            allVerbSections.forEach(section => {
                if (section !== verbSection) {
                    section.style.display = 'none';
                }
            });
        }

        // Ensure CSS rule is present to prevent flash
        this.ensureCssRulePresent();

        // Set up the fade-in animation
        verbSection.style.display = 'block';
        verbSection.style.opacity = '0';
        verbSection.style.transition = this.TRANSITION_VALUE;

        // Wait for fonts and then fade in
        await this.waitForFontsAndFadeIn(verbSection, { delay, context });
    }

    /**
     * Fade in multiple verb sections with staggered timing
     * @param {NodeList|Array} verbSections - Verb section elements to fade in
     * @param {Object} options - Animation options
     * @param {number} options.initialDelay - Initial delay before first section (default: INITIAL_STAGGER_DELAY)
     * @param {number} options.staggerDelay - Delay between each section (default: STAGGER_DELAY)
     * @param {string} options.context - Context for logging (e.g., 'Main', 'Sidebar', 'Enhanced')
     */
    static async fadeInMultipleSections(verbSections, options = {}) {
        const {
            initialDelay = this.INITIAL_STAGGER_DELAY,
            staggerDelay = this.STAGGER_DELAY,
            context = 'AnimationManager'
        } = options;

        // Set up the fade-in animation for all sections
        verbSections.forEach((section, index) => {
            section.style.display = 'block';
            section.style.opacity = '0';
            section.style.transition = this.TRANSITION_VALUE;
        });

        // Wait for fonts and then fade in with staggering
        try {
            // Check if document.fonts is available (modern browsers)
            if (document.fonts && document.fonts.ready) {
                await document.fonts.ready;
            } else {
                // Fallback: wait a short time for fonts to load
                await new Promise(resolve => setTimeout(resolve, this.FONT_LOADING_TIMEOUT));
            }

            // Remove the CSS rule that hides all verb sections
            const styleElements = document.querySelectorAll('style');
            styleElements.forEach((style, index) => {
                if (style.textContent &&
                    style.textContent.includes('.verb-section') &&
                    style.textContent.includes('display: none !important')) {
                    style.remove();
                }
            });

            // Stagger the fade-in for each section
            verbSections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.opacity = '1';
                }, initialDelay + (index * staggerDelay));
            });

        } catch (error) {
            // Fallback: make all content visible immediately
            verbSections.forEach(section => {
                section.style.opacity = '1';
            });
        }
    }

    /**
     * Handle loading state reveal for dynamic verb loading
     * This is a specialized method for the enhanced verb loader
     * @param {Element} verbSection - Verb section element to reveal
     * @param {Object} options - Animation options
     * @param {string} options.context - Context for logging (default: 'Enhanced')
     */
    static async handleLoadingStateReveal(verbSection, options = {}) {
        const { context = 'Enhanced' } = options;

        if (verbSection) {
            // Ensure CSS rule is present to prevent flash
            this.ensureCssRulePresent();

            // Set up the fade-in animation
            verbSection.style.display = 'block';
            verbSection.style.opacity = '0';
            verbSection.style.transition = this.TRANSITION_VALUE;

            // Wait for fonts to load, then remove CSS rule and start fade-in
            await this.waitForFontsAndFadeIn(verbSection, { context });
        }
    }

    /**
     * Remove loading container with consistent timing
     * @param {Element} loadingContainer - Loading container element to remove
     * @param {number} delay - Delay before removal (default: LOADING_CONTAINER_REMOVAL_DELAY)
     */
    static removeLoadingContainer(loadingContainer, delay = this.LOADING_CONTAINER_REMOVAL_DELAY) {
        if (loadingContainer) {
            setTimeout(() => {
                if (loadingContainer && loadingContainer.parentNode) {
                    loadingContainer.parentNode.removeChild(loadingContainer);
                }
            }, delay);
        }
    }
}
