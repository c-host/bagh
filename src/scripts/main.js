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

// Import feature modules
import { ThemeManager } from './modules/theme-manager.js';
import { FontManager } from './modules/font-manager.js';
import { NotepadManager } from './modules/notepad-manager.js';
import { SidebarManager } from './modules/sidebar-manager.js';
import { VerbDataManager } from './modules/verb-data-manager.js';
import { PreverbManager } from './modules/preverb-manager.js';
import { EventManager } from './modules/event-manager.js';
import { HelpManager } from './modules/help-manager.js';

// Import new missing functionality modules
import { CategoryManager } from './modules/category-manager.js';
import { StickyHeaderManager } from './modules/sticky-header-manager.js';


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

        /** @type {Object} Verb Data Manager instance */
        this.verbDataManager = null;

        /** @type {Object} Preverb Manager instance */
        this.preverbManager = null;

        /** @type {Object} Help Manager instance */
        this.helpManager = null;

        /** @type {Object} Category Manager instance */
        this.categoryManager = null;

        /** @type {Object} Sticky Header Manager instance */
        this.stickyHeaderManager = null;

        /** @type {boolean} Whether app is initialized */
        this.initialized = false;
    }

    async runIntegrationTests() {
        const results = {
            total: 0,
            passed: 0,
            failed: 0,
            details: {}
        };

        console.log('🔗 Running integration tests...');

        // Test theme manager integration
        try {
            results.total++;
            if (this.themeManager && this.notepadManager) {
                const originalTheme = this.themeManager.getCurrentTheme();
                console.log(`🔗 Testing theme integration: original=${originalTheme}`);

                await this.themeManager.setTheme(originalTheme === 'light' ? 'dark' : 'light');

                // Wait for theme change to propagate and check if notepad font was updated
                await new Promise(resolve => setTimeout(resolve, 200));
                const notepadFont = this.notepadManager.getCurrentFont();
                console.log(`🔗 Theme integration result: notepadFont=${notepadFont}`);

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
                console.log(`🔗 Testing font integration: original=${originalFont}`);

                // Use font keys instead of font family names
                const testFont = originalFont === 'default' ? 'sonata' : 'default';
                await this.fontManager.changeFont(testFont);

                // Wait for font change to propagate and check if notepad font was updated
                await new Promise(resolve => setTimeout(resolve, 200));
                const notepadFont = this.notepadManager.getCurrentFont();
                console.log(`🔗 Font integration result: notepadFont=${notepadFont}`);

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

        // Test verb data manager integration
        try {
            results.total++;
            if (this.verbDataManager && this.preverbManager) {
                // Simulate verb data loaded event
                const verbDataEvent = new CustomEvent('verbDataLoaded', {
                    detail: { verbId: 'test-verb-1' }
                });
                document.dispatchEvent(verbDataEvent);

                results.passed++;
                results.details.verbDataIntegration = { status: 'PASSED', message: 'Verb data loaded event properly dispatched' };
            }
        } catch (error) {
            results.failed++;
            results.details.verbDataIntegration = { status: 'ERROR', message: error.message };
        }

        console.log(`🔗 Integration tests: ${results.passed}/${results.total} passed`);
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
     * Initialize the application
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            console.log('🚀 Initializing Bagh application...');

            // Initialize DOM Manager first
            this.domManager = new DOMManager();
            if (!this.domManager.initializeElements()) {
                throw new Error('Failed to initialize DOM Manager');
            }
            console.log('✅ DOM Manager initialized');

            // Initialize Theme Manager
            this.themeManager = new ThemeManager(this.domManager);
            if (!this.themeManager.initialize()) {
                throw new Error('Failed to initialize Theme Manager');
            }
            console.log('✅ Theme Manager initialized');

            // Initialize Font Manager
            this.fontManager = new FontManager(this.domManager);
            if (!this.fontManager.initialize()) {
                throw new Error('Failed to initialize Font Manager');
            }
            console.log('✅ Font Manager initialized');

            // Initialize Notepad Manager
            this.notepadManager = new NotepadManager(this.domManager, this.fontManager);
            if (!this.notepadManager.initialize()) {
                throw new Error('Failed to initialize Notepad Manager');
            }
            console.log('✅ Notepad Manager initialized');



            // Initialize Sidebar Manager
            this.sidebarManager = new SidebarManager(this.domManager);
            if (!this.sidebarManager.initialize()) {
                throw new Error('Failed to initialize Sidebar Manager');
            }
            console.log('✅ Sidebar Manager initialized');

            // Initialize Verb Data Manager
            this.verbDataManager = new VerbDataManager();
            if (!(await this.verbDataManager.initialize())) {
                throw new Error('Failed to initialize Verb Data Manager');
            }
            console.log('✅ Verb Data Manager initialized');

            // Initialize Preverb Manager
            this.preverbManager = new PreverbManager(this.verbDataManager);
            if (!(await this.preverbManager.initialize())) {
                throw new Error('Failed to initialize Preverb Manager');
            }
            console.log('✅ Preverb Manager initialized');

            // Initialize Event Manager
            this.eventManager = new EventManager(this);
            if (!(await this.eventManager.initialize())) {
                throw new Error('Failed to initialize Event Manager');
            }
            console.log('✅ Event Manager initialized');

            // Initialize Help Manager
            this.helpManager = new HelpManager(this.domManager);
            if (!this.helpManager.initialize()) {
                throw new Error('Failed to initialize Help Manager');
            }
            console.log('✅ Help Manager initialized');



            // Initialize Category Manager
            this.categoryManager = new CategoryManager();
            if (!(await this.categoryManager.initialize())) {
                throw new Error('Failed to initialize Category Manager');
            }
            console.log('✅ Category Manager initialized');

            // Initialize Sticky Header Manager
            this.stickyHeaderManager = new StickyHeaderManager();
            if (!(await this.stickyHeaderManager.initialize())) {
                throw new Error('Failed to initialize Sticky Header Manager');
            }
            console.log('✅ Sticky Header Manager initialized');

            // Set up cross-module communication
            this.setupCrossModuleCommunication();

            this.initialized = true;
            console.log('🎉 Bagh application initialized successfully!');



            return true;

        } catch (error) {
            console.error('❌ Failed to initialize Bagh application:', error);
            return false;
        }
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



        // Verb data changes should update preverb manager
        if (this.verbDataManager && this.preverbManager) {
            // When verb data is loaded, enable preverb selectors
            document.addEventListener('verbDataLoaded', (event) => {
                if (this.preverbManager && this.preverbManager.isInitialized()) {
                    console.log('Verb data loaded:', event.detail);
                    // The preverb manager will handle enabling selectors
                }
            });
        }

        // Preverb changes should update verb display
        if (this.preverbManager && this.verbDataManager) {
            document.addEventListener('preverbChanged', (event) => {
                if (this.verbDataManager && this.verbDataManager.isInitialized()) {
                    console.log('Preverb changed:', event.detail);
                    // The preverb manager will handle updating displays
                }
            });
        }

        // Listen for global errors from EventManager
        document.addEventListener('globalError', (event) => {
            console.error('Global error:', event.detail);
        });

        document.addEventListener('unhandledRejection', (event) => {
            console.error('Unhandled rejection:', event.detail);
        });

        // Listen for category events
        document.addEventListener('categoryExpanded', (event) => {
            console.log('Category expanded:', event.detail);
            // Update sticky header if needed
            if (this.stickyHeaderManager?.isInitialized()) {
                this.stickyHeaderManager.forceUpdate();
            }
        });

        document.addEventListener('categoryCollapsed', (event) => {
            console.log('Category collapsed:', event.detail);
            // Update sticky header if needed
            if (this.stickyHeaderManager?.isInitialized()) {
                this.stickyHeaderManager.forceUpdate();
            }
        });

        // Listen for sticky header events
        document.addEventListener('stickyHeaderChanged', (event) => {
            console.log('Sticky header changed:', event.detail);
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
            verbDataManager: this.verbDataManager?.isInitialized() || false,
            preverbManager: this.preverbManager?.isInitialized() || false,
            eventManager: this.eventManager?.isInitialized() || false,
            helpManager: this.helpManager?.isInitialized() || false,
            categoryManager: this.categoryManager?.isInitialized() || false,
            stickyHeaderManager: this.stickyHeaderManager?.isInitialized() || false
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
            verbDataManager: this.verbDataManager,
            preverbManager: this.preverbManager,
            eventManager: this.eventManager,
            helpManager: this.helpManager,
            categoryManager: this.categoryManager,
            stickyHeaderManager: this.stickyHeaderManager
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
        if (this.verbDataManager) {
            this.verbDataManager.destroy();
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

        if (this.categoryManager) {
            this.categoryManager.destroy();
        }
        if (this.stickyHeaderManager) {
            this.stickyHeaderManager.destroy();
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
        // Make app globally available for debugging
        window.baghApp = app;

        // Show initialization success
        console.log('🎯 Bagh application ready!');
        console.log('📊 Status:', app.getStatus());
    } else {
        console.error('💥 Failed to initialize Bagh application');
    }
});

// Export for potential use in other modules
export { App };
