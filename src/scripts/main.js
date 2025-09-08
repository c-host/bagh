/**
 * Bagh - JavaScript (Modular Version)
 * 
 * This file serves as the main orchestrator for all interactive functionality:
 * - Theme switching (light/dark mode)
 * - Font selection and management
 * - Sidebar navigation and search
 * - Filter controls
 * - Notepad functionality
 * - Preverb toggle system
 * - Verb data management
 */

// Import shared modules
import { DOMManager } from './shared/dom-manager.js';
import { storageManager } from './shared/storage-manager.js';

// Import critical modules (needed immediately)
import { ThemeManager } from './modules/theme-manager.js';
import { FontManager } from './modules/font-manager.js';
import { EventManager } from './modules/event-manager.js';
import { AnimationManager } from './modules/animation-manager.js';

// Non-critical modules will be loaded dynamically
// import { NotepadManager } from './modules/notepad-manager.js';
// import { SidebarManager } from './modules/sidebar-manager.js';
// import { PreverbManager } from './modules/preverb-manager.js';
// import { HelpManager } from './modules/help-manager.js';
// import { DynamicVerbLoader } from './modules/dynamic-verb-loader.js';


/**
 * Main Application Class
 * Orchestrates all managers and handles cross-module communication
 */
class App {
    constructor() {
        /** @type {Object} DOM Manager instance */
        this.domManager = null;

        /** @type {Object} Theme Manager instance */
        this.themeManager = null;

        /** @type {Object} Font Manager instance */
        this.fontManager = null;

        /** @type {Object} Notepad Manager instance */
        this.notepadManager = null;

        /** @type {Object} Sidebar Manager instance */
        this.sidebarManager = null;


        /** @type {Object} Preverb Manager instance */
        this.preverbManager = null;

        /** @type {Object} Help Manager instance */
        this.helpManager = null;


        /** @type {Object} Sticky Header Manager instance */
        this.stickyHeaderManager = null;

        /** @type {Object} Enhanced Dynamic Verb Loader instance */
        this.enhancedVerbLoader = null;

        /** @type {Object} Bottom Sheet Manager instance */
        this.bottomSheetManager = null;

        /** @type {boolean} Whether app is initialized */
        this.initialized = false;

        /** @type {Object} Dynamic module cache */
        this.moduleCache = new Map();
    }

    async runIntegrationTests() {
        const results = {
            total: 0,
            passed: 0,
            failed: 0,
            details: {}
        };

        // Test theme manager integration
        try {
            results.total++;
            if (this.themeManager && this.notepadManager) {
                const originalTheme = this.themeManager.getCurrentTheme();

                await this.themeManager.setTheme(originalTheme === 'light' ? 'dark' : 'light');

                // Wait for theme change to propagate and check if notepad font was updated
                await new Promise(resolve => setTimeout(resolve, AnimationManager.INTEGRATION_TEST_DELAY));
                const notepadFont = this.notepadManager.getCurrentFont();

                if (notepadFont) {
                    results.passed++;
                    results.details.themeIntegration = { status: 'PASSED', message: 'Theme change properly updates notepad' };
                } else {
                    results.failed++;
                    results.details.themeIntegration = { status: 'FAILED', message: 'Theme change did not update notepad' };
                }
            }
        } catch (error) {
            results.failed++;
            results.details.themeIntegration = { status: 'ERROR', message: error.message };
        }

        // Test font manager integration
        try {
            results.total++;
            if (this.fontManager && this.notepadManager) {
                const originalFont = this.fontManager.getCurrentFont();

                // Use font keys instead of font family names
                const testFont = originalFont === 'default' ? 'sonata' : 'default';
                await this.fontManager.changeFont(testFont);

                // Wait for font change to propagate and check if notepad font was updated
                await new Promise(resolve => setTimeout(resolve, AnimationManager.INTEGRATION_TEST_DELAY));
                const notepadFont = this.notepadManager.getCurrentFont();

                if (notepadFont) {
                    results.passed++;
                    results.details.fontIntegration = { status: 'PASSED', message: 'Font change properly updates notepad' };
                } else {
                    results.failed++;
                    results.details.fontIntegration = { status: 'FAILED', message: 'Font change did not update notepad' };
                }
            }
        } catch (error) {
            results.failed++;
            results.details.fontIntegration = { status: 'ERROR', message: error.message };
        }

        // Test enhanced verb loader integration
        try {
            results.total++;
            if (this.enhancedVerbLoader && this.preverbManager) {
                // Simulate verb rendered event
                const verbRenderedEvent = new CustomEvent('verbRendered', {
                    detail: { verbId: 'test-verb-1' }
                });
                document.dispatchEvent(verbRenderedEvent);

                results.passed++;
                results.details.verbLoaderIntegration = { status: 'PASSED', message: 'Verb rendered event properly dispatched' };
            }
        } catch (error) {
            results.failed++;
            results.details.verbLoaderIntegration = { status: 'ERROR', message: error.message };
        }

        return results;
    }

    /**
     * Get comprehensive application diagnostics
     * @returns {Object} Application diagnostics
     */
    getDiagnostics() {
        const diagnostics = {
            timestamp: new Date().toISOString(),
            application: {
                initialized: this.initialized,
                version: '2.0.0-modular',
                environment: this.getEnvironmentInfo()
            },
            modules: this.getStatus(),
            performance: this.getPerformanceMetrics(),
            memory: this.getMemoryUsage(),
            errors: this.getErrorLog()
        };

        return diagnostics;
    }

    /**
     * Get environment information
     * @returns {Object} Environment info
     */
    getEnvironmentInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenResolution: `${screen.width}x${screen.height}`,
            viewportSize: `${window.innerWidth}x${window.innerHeight}`,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
        };
    }

    /**
     * Get performance metrics
     * @returns {Object} Performance metrics
     */
    getPerformanceMetrics() {
        const metrics = {};

        if (performance.timing) {
            const timing = performance.timing;
            metrics.pageLoadTime = timing.loadEventEnd - timing.navigationStart;
            metrics.domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            metrics.redirectTime = timing.redirectEnd - timing.redirectStart;
            metrics.dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
            metrics.tcpTime = timing.connectEnd - timing.connectStart;
        }

        if (performance.memory) {
            metrics.memoryUsage = performance.memory.usedJSHeapSize;
            metrics.memoryLimit = performance.memory.jsHeapSizeLimit;
            metrics.memoryAvailable = performance.memory.totalJSHeapSize;
        }

        return metrics;
    }

    /**
     * Get memory usage information
     * @returns {Object} Memory usage info
     */
    getMemoryUsage() {
        if (performance.memory) {
            return {
                used: this.formatBytes(performance.memory.usedJSHeapSize),
                total: this.formatBytes(performance.memory.totalJSHeapSize),
                limit: this.formatBytes(performance.memory.jsHeapSizeLimit),
                percentage: ((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100).toFixed(2)
            };
        }
        return { available: false };
    }

    /**
     * Format bytes to human readable format
     * @param {number} bytes - Bytes to format
     * @returns {string} Formatted bytes
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Get error log
     * @returns {Array} Error log
     */
    getErrorLog() {
        // This would typically integrate with a real error logging system
        return window.errorLog || [];
    }

    /**
     * Dynamically load a module
     * @param {string} moduleName - Module name to load
     * @returns {Promise<Object>} Loaded module
     */
    async loadModule(moduleName) {
        if (this.moduleCache.has(moduleName)) {
            return this.moduleCache.get(moduleName);
        }

        try {
            const module = await import(`./modules/${moduleName}.js`);
            this.moduleCache.set(moduleName, module);
            return module;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Load non-critical modules asynchronously
     */
    async loadNonCriticalModules() {
        try {
            // Load modules in parallel for better performance
            const [
                { NotepadManager },
                { SidebarManager },
                { PreverbManager },
                { HelpManager },
                { DynamicVerbLoader },
                { BottomSheetManager }
            ] = await Promise.all([
                this.loadModule('notepad-manager'),
                this.loadModule('sidebar-manager'),
                this.loadModule('preverb-manager'),
                this.loadModule('help-manager'),
                this.loadModule('dynamic-verb-loader'),
                this.loadModule('bottom-sheet-manager')
            ]);

            // Initialize Notepad Manager
            this.notepadManager = new NotepadManager(this.domManager, this.fontManager);
            this.notepadManager.initialize();

            // Initialize Sidebar Manager
            this.sidebarManager = new SidebarManager(this.domManager);
            this.sidebarManager.initialize();


            // Initialize Enhanced Dynamic Verb Loader
            try {
                this.enhancedVerbLoader = new DynamicVerbLoader();
                await this.enhancedVerbLoader.initialize();
            } catch (error) {
                this.enhancedVerbLoader = null;
            }

            // Update Sidebar Manager with verb loader reference
            if (this.sidebarManager) {
                this.sidebarManager.enhancedVerbLoader = this.enhancedVerbLoader;
            }

            // Initialize Preverb Manager
            if (this.enhancedVerbLoader) {
                this.preverbManager = new PreverbManager(this.enhancedVerbLoader);
                await this.preverbManager.initialize();
            }

            // Initialize Help Manager
            this.helpManager = new HelpManager(this.domManager);
            this.helpManager.initialize();

            // Initialize Bottom Sheet Manager
            this.bottomSheetManager = new BottomSheetManager(this.domManager, {
                helpManager: this.helpManager,
                notepadManager: this.notepadManager,
                fontManager: this.fontManager
            });
            this.bottomSheetManager.initialize();

        } catch (error) {
            // Non-critical modules failed to load
        }
    }

    /**
     * Initialize the application
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            // Initialize Storage Manager first (for optimized localStorage operations)
            if (!(await storageManager.initialize())) {
                throw new Error('Failed to initialize Storage Manager');
            }

            // Initialize DOM Manager
            this.domManager = new DOMManager();
            if (!this.domManager.initializeElements()) {
                throw new Error('Failed to initialize DOM Manager');
            }

            // Initialize Theme Manager
            this.themeManager = new ThemeManager(this.domManager);
            if (!this.themeManager.initialize()) {
                throw new Error('Failed to initialize Theme Manager');
            }

            // Initialize Font Manager
            this.fontManager = new FontManager(this.domManager);
            if (!this.fontManager.initialize()) {
                throw new Error('Failed to initialize Font Manager');
            }

            // Initialize Event Manager (critical for user interactions)
            this.eventManager = new EventManager(this);
            if (!(await this.eventManager.initialize())) {
                throw new Error('Failed to initialize Event Manager');
            }

            // Load non-critical modules asynchronously
            this.loadNonCriticalModules().then(() => {
                // Handle URL anchors after non-critical modules are loaded
                this.handleInitialURLAnchor();
            });

            // Set up cross-module communication
            this.setupCrossModuleCommunication();

            this.initialized = true;

            // Make app instance available globally for cross-module communication
            window.app = this;

            return true;

        } catch (error) {
            return false;
        }
    }

    /**
     * Handle URL anchors on initial page load
     */
    async handleInitialURLAnchor() {
        try {
            // Check for URL hash or query parameter
            const verbId = this.getVerbIdFromURL();

            if (verbId) {

                // Check if loading state is active (from template-based flash prevention)
                const loadingContainer = document.querySelector('.verb-loading-container');
                const isInLoadingState = loadingContainer !== null;

                // Check if this is a static verb (exists in DOM) or needs dynamic loading
                const staticVerbSection = document.getElementById(`verb-${verbId}`);

                if (staticVerbSection) {
                    // Remove loading state and reveal static content
                    this.revealStaticContent(verbId);
                    // Use sidebar manager to handle static verb navigation
                    if (this.sidebarManager && this.sidebarManager.isInitialized()) {
                        this.sidebarManager.handleURLAnchor();
                    }
                } else {
                    // Check if verb exists in verb index before attempting to load
                    if (this.enhancedVerbLoader && this.enhancedVerbLoader.verbExists(verbId)) {
                        await this.loadVerbFromURL(verbId);
                    } else {
                        // Show error state
                        this.showVerbNotFoundError(verbId);
                    }
                }
            } else {
                // Always use smooth fade-in for initial load (CSS rule is now always present)
                this.smoothFadeInStaticContent();
            }
        } catch (error) {
            // Error handling initial URL anchor
        }
    }

    /**
     * Get verb ID from URL hash or query parameter
     * @returns {string|null} Verb ID or null if not found
     */
    getVerbIdFromURL() {
        // Check URL hash first (e.g., #verb123)
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const verbId = hash.substring(1);
            if (verbId) {
                return verbId;
            }
        }

        // Check URL query parameter (e.g., ?verb=verb123)
        const urlParams = new URLSearchParams(window.location.search);
        const verbParam = urlParams.get('verb');
        if (verbParam) {
            return verbParam;
        }

        return null;
    }

    /**
     * Reveal static content and remove loading state
     * @param {string} verbId - Verb ID to reveal
     */
    revealStaticContent(verbId) {
        // Remove loading container if it exists
        const loadingContainer = document.querySelector('.verb-loading-container');
        if (loadingContainer) {

            // Hide welcome content when showing a specific verb
            const welcomeContent = document.querySelector('.welcome-content');
            if (welcomeContent) {
                welcomeContent.style.display = 'none';
            }

            // Show the specific verb section (use verb- prefix for ID)
            const verbSection = document.getElementById(`verb-${verbId}`);

            if (verbSection) {
                verbSection.style.display = 'block';
                verbSection.style.opacity = '0';
                verbSection.style.transition = AnimationManager.TRANSITION_VALUE;

                // Wait for fonts and fade in smoothly
                this.waitForFontsAndFadeIn(verbSection);
            }

            // Remove loading container after transition completes
            AnimationManager.removeLoadingContainer(loadingContainer);
        }
    }

    /**
     * Show error state when verb is not found
     * @param {string} verbId - Verb ID that was not found
     */
    showVerbNotFoundError(verbId) {
        const loadingContainer = document.querySelector('.verb-loading-container');
        if (loadingContainer) {
            loadingContainer.innerHTML = `
                <div class="verb-error-container" style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 50vh;
                    padding: 2rem;
                    text-align: center;
                ">
                    <div class="error-icon" style="
                        font-size: 3rem;
                        color: #e74c3c;
                        margin-bottom: 1rem;
                    ">⚠️</div>
                    <div class="error-text" style="
                        color: #e74c3c;
                        font-size: 1.2rem;
                        margin-bottom: 0.5rem;
                        font-weight: bold;
                    ">Verb Not Found</div>
                    <div class="error-subtext" style="
                        color: #666;
                        font-size: 1rem;
                        margin-bottom: 1.5rem;
                    ">The verb "${verbId}" could not be found in the database.</div>
                    <button onclick="location.reload()" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 4px;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: background-color 0.2s;
                    " onmouseover="this.style.backgroundColor='#2980b9'" onmouseout="this.style.backgroundColor='#3498db'">
                        Reload Page
                    </button>
                </div>
            `;
        }
    }

    /**
     * Reveal default content when no verb ID is found
     */
    async revealDefaultContent() {
        const loadingContainer = document.querySelector('.verb-loading-container');
        if (loadingContainer) {

            // Remove loading container
            loadingContainer.remove();

            // Show welcome content when no specific verb is requested
            const welcomeContent = document.querySelector('.welcome-content');
            if (welcomeContent) {
                welcomeContent.style.display = 'block';
                welcomeContent.style.opacity = '0';
                welcomeContent.style.transition = AnimationManager.TRANSITION_VALUE;

                // Fade in welcome content
                this.waitForFontsAndFadeIn(welcomeContent);
            }

            // Show all verb sections with the same smooth fade-in approach
            const verbSections = document.querySelectorAll('.verb-section');
            if (verbSections.length > 0) {
                // Use the same smooth fade-in approach as other scenarios
                await this.smoothFadeInDefaultContent(verbSections);
            }
        }
    }

    /**
     * Load verb from URL (for dynamic loading)
     * @param {string} verbId - Verb ID to load
     */
    async loadVerbFromURL(verbId) {
        try {
            // Hide welcome content when loading a specific verb
            const welcomeContent = document.querySelector('.welcome-content');
            if (welcomeContent) {
                welcomeContent.style.display = 'none';
            }

            if (this.enhancedVerbLoader && this.enhancedVerbLoader.isInitialized()) {
                await this.enhancedVerbLoader.loadVerb(verbId, true); // Update URL
            } else {
                // Fallback: try to scroll to verb if it exists in static content
                const fallbackSection = document.getElementById(`verb-${verbId}`);
                if (fallbackSection) {
                    fallbackSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } catch (error) {
            // Fallback: try to scroll to verb if it exists in static content
            const fallbackSection = document.getElementById(`verb-${verbId}`);
            if (fallbackSection) {
                fallbackSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    /**
     * Smooth fade-in for static content (when no loading container exists)
     */
    async smoothFadeInStaticContent() {
        // Show welcome content when no URL parameters are present
        const welcomeContent = document.querySelector('.welcome-content');
        if (welcomeContent) {
            welcomeContent.style.display = 'block';
            welcomeContent.style.opacity = '0';
            welcomeContent.style.transition = AnimationManager.TRANSITION_VALUE;

            // Fade in welcome content
            this.waitForFontsAndFadeIn(welcomeContent);
        }

        // Find all verb sections
        const verbSections = document.querySelectorAll('.verb-section');

        if (verbSections.length === 0) {
            return;
        }

        // Use AnimationManager for consistent fade-in behavior
        await AnimationManager.fadeInMultipleSections(verbSections, {
            context: 'Main app (static content)'
        });
    }

    /**
     * Smooth fade-in for default content (multiple verb sections)
     * @param {NodeList} verbSections - All verb section elements to fade in
     */
    async smoothFadeInDefaultContent(verbSections) {
        // Use AnimationManager for consistent fade-in behavior
        await AnimationManager.fadeInMultipleSections(verbSections, {
            context: 'Main app (default content)'
        });
    }

    /**
     * Wait for fonts to load and then fade in content smoothly
     * @param {Element} verbSection - Verb section element to fade in
     */
    async waitForFontsAndFadeIn(verbSection) {
        // Use AnimationManager for consistent fade-in behavior
        await AnimationManager.waitForFontsAndFadeIn(verbSection, {
            context: 'Main app'
        });
    }

    /**
     * Set up cross-module communication
     */
    setupCrossModuleCommunication() {
        // Theme changes should update notepad font
        if (this.themeManager && this.notepadManager) {
            // Listen for theme changes and update notepad accordingly
            const originalSetTheme = this.themeManager.setTheme.bind(this.themeManager);
            this.themeManager.setTheme = async (theme) => {
                await originalSetTheme(theme);
                // Update notepad font after theme change
                setTimeout(() => {
                    if (this.notepadManager.isInitialized()) {
                        this.notepadManager.updateNotepadFont();
                    }
                }, 100);
            };
        }

        // Font changes should update notepad font
        if (this.fontManager && this.notepadManager) {
            const originalChangeFont = this.fontManager.changeFont.bind(this.fontManager);
            this.fontManager.changeFont = async (fontName, saveToStorage) => {
                await originalChangeFont(fontName, saveToStorage);
                // Update notepad font after font change
                setTimeout(() => {
                    if (this.notepadManager.isInitialized()) {
                        this.notepadManager.updateNotepadFont();
                    }
                }, 100);
            };
        }

        // Preverb changes are now handled directly by the PreverbManager
        // No additional event handling needed since preverb selectors work immediately

        // Listen for global errors from EventManager
        document.addEventListener('globalError', (event) => {
            // Handle global error
        });

        document.addEventListener('unhandledRejection', (event) => {
            // Handle unhandled rejection
        });

        // Listen for category events
        document.addEventListener('categoryExpanded', (event) => {
            // Update sticky header if needed
            if (this.stickyHeaderManager?.isInitialized()) {
                this.stickyHeaderManager.forceUpdate();
            }
        });

        document.addEventListener('categoryCollapsed', (event) => {
            // Update sticky header if needed
            if (this.stickyHeaderManager?.isInitialized()) {
                this.stickyHeaderManager.forceUpdate();
            }
        });

        // Listen for sticky header events
        document.addEventListener('stickyHeaderChanged', (event) => {
            // Could trigger other updates if needed
        });
    }

    /**
     * Get application status
     * @returns {Object} Application status
     */
    getStatus() {
        return {
            initialized: this.initialized,
            domManager: this.domManager?.isInitialized() || false,
            themeManager: this.themeManager?.isInitialized() || false,
            fontManager: this.fontManager?.isInitialized() || false,
            notepadManager: this.notepadManager?.isInitialized() || false,
            sidebarManager: this.sidebarManager?.isInitialized() || false,
            preverbManager: this.preverbManager?.isInitialized() || false,
            eventManager: this.eventManager?.isInitialized() || false,
            helpManager: this.helpManager?.isInitialized() || false,
            stickyHeaderManager: this.stickyHeaderManager?.isInitialized() || false,
            bottomSheetManager: this.bottomSheetManager?.isInitialized() || false
        };
    }

    /**
     * Get manager instances
     * @returns {Object} Manager instances
     */
    getManagers() {
        return {
            domManager: this.domManager,
            themeManager: this.themeManager,
            fontManager: this.fontManager,
            notepadManager: this.notepadManager,
            sidebarManager: this.sidebarManager,
            preverbManager: this.preverbManager,
            eventManager: this.eventManager,
            helpManager: this.helpManager,
            stickyHeaderManager: this.stickyHeaderManager,
            bottomSheetManager: this.bottomSheetManager
        };
    }

    /**
     * Clean up application
     */
    destroy() {
        if (this.themeManager) {
            this.themeManager.destroy();
        }
        if (this.fontManager) {
            this.fontManager.destroy();
        }
        if (this.notepadManager) {
            this.notepadManager.destroy();
        }
        if (this.sidebarManager) {
            this.sidebarManager.destroy();
        }
        if (this.preverbManager) {
            this.preverbManager.destroy();
        }
        if (this.eventManager) {
            this.eventManager.destroy();
        }
        if (this.helpManager) {
            this.helpManager.destroy();
        }
        if (this.stickyHeaderManager) {
            this.stickyHeaderManager.destroy();
        }
        if (this.bottomSheetManager) {
            this.bottomSheetManager.destroy();
        }

        this.initialized = false;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    const app = new App();

    // Initialize the application
    const success = await app.initialize();

    if (success) {
        // Make app globally available
        window.baghApp = app;
    }
});

// Export for potential use in other modules
export { App };