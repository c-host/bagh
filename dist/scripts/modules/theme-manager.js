/**
 * Theme Manager Module
 * Handles theme switching, icon updates, and localStorage persistence
 */

import { THEMES, STORAGE_KEYS, TIMING, ELEMENT_IDS } from '../shared/constants.js';
import { storageManager } from '../shared/storage-manager.js';


/**
 * Theme Manager Class
 * Manages theme switching, icon updates, and persistence
 */
export class ThemeManager {
    constructor(domManager) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {string} Current theme */
        this.currentTheme = THEMES.LIGHT;

        /** @type {boolean} Whether transitions are enabled */
        this.transitionsEnabled = true;

        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;
    }

    /**
     * Initialize the theme manager
     * @returns {boolean} Success status
     */
    initialize() {
        try {
            // Load saved theme from centralized storage manager
            const savedTheme = storageManager.get(STORAGE_KEYS.THEME, THEMES.LIGHT);

            // Apply saved theme
            this.setTheme(savedTheme);

            // Set up event listeners
            this.setupEventListeners();

            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize Theme Manager:', error);
            return false;
        }
    }

    /**
     * Set up theme toggle event listener
     */
    setupEventListeners() {
        const themeToggle = this.domManager.getElement(ELEMENT_IDS.THEME_TOGGLE);
        if (!themeToggle) {
            console.warn('Theme toggle element not found');
            return;
        }

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        this.setTheme(newTheme);
    }

    /**
     * Set a specific theme
     * @param {string} theme - Theme to set (light/dark)
     */
    setTheme(theme) {
        if (!Object.values(THEMES).includes(theme)) {
            console.warn(`Invalid theme: ${theme}`);
            return;
        }

        try {
            // Temporarily disable transitions for instant theme switch
            this.disableTransitions();

            // Apply theme to document
            document.documentElement.setAttribute('data-theme', theme);

            // Update current theme
            this.currentTheme = theme;

            // Update theme icon
            this.updateThemeIcon(theme);

            // Save to storage (batched for performance)
            storageManager.set(STORAGE_KEYS.THEME, theme);

            // Re-enable transitions after a brief moment
            setTimeout(() => {
                this.enableTransitions();
            }, TIMING.THEME_TRANSITION_DISABLE);

        } catch (error) {
            console.error('Failed to set theme:', error);
        }
    }

    /**
     * Update the theme icon based on current theme
     * @param {string} theme - Current theme
     */
    updateThemeIcon(theme) {
        const themeToggle = this.domManager.getElement('themeToggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        if (!icon) return;

        if (theme === THEMES.DARK) {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to Dark Mode';
        }
    }

    /**
     * Temporarily disable CSS transitions
     */
    disableTransitions() {
        if (this.transitionsEnabled) {
            const style = document.createElement('style');
            style.id = 'instant-theme-switch';
            style.textContent = '* { transition: none !important; }';
            document.head.appendChild(style);
            this.transitionsEnabled = false;
        }
    }

    /**
     * Re-enable CSS transitions
     */
    enableTransitions() {
        if (!this.transitionsEnabled) {
            const instantStyle = document.getElementById('instant-theme-switch');
            if (instantStyle) {
                instantStyle.remove();
            }
            this.transitionsEnabled = true;
        }
    }

    /**
     * Get current theme
     * @returns {string} Current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Check if a specific theme is active
     * @param {string} theme - Theme to check
     * @returns {boolean} Whether theme is active
     */
    isThemeActive(theme) {
        return this.currentTheme === theme;
    }

    /**
     * Check if dark theme is active
     * @returns {boolean} Whether dark theme is active
     */
    isDarkTheme() {
        return this.currentTheme === THEMES.DARK;
    }

    /**
     * Check if light theme is active
     * @returns {boolean} Whether light theme is active
     */
    isLightTheme() {
        return this.currentTheme === THEMES.LIGHT;
    }

    /**
     * Reset theme to default
     */
    resetTheme() {
        this.setTheme(THEMES.LIGHT);
    }

    /**
     * Check if manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Get theme configuration
     * @returns {Object} Theme configuration
     */
    getConfig() {
        return {
            current: this.currentTheme,
            icon: this.isDarkTheme() ? 'fas fa-sun' : 'fas fa-moon',
            transitionsEnabled: this.transitionsEnabled,
            initialized: this.initialized
        };
    }

    /**
     * Clean up theme manager
     */
    destroy() {
        // Remove event listeners if needed
        this.initialized = false;
    }
}
