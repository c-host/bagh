/**
 * DOM Manager Module
 * Centralized DOM element management and safe access methods
 */

import { ELEMENT_IDS } from './constants.js';
import { safeGetElementById } from './utils.js';

/**
 * DOM Manager Class
 * Handles DOM element initialization, caching, and safe access
 */
export class DOMManager {
    constructor() {
        /** @type {Object} Cached DOM elements */
        this.elements = {};

        /** @type {boolean} Whether elements have been initialized */
        this.initialized = false;
    }

    /**
     * Initialize and cache all DOM elements
     * @returns {boolean} Success status
     */
    initializeElements() {
        try {
            this.elements = {
                themeToggle: safeGetElementById(ELEMENT_IDS.THEME_TOGGLE),
                fontSelectButton: safeGetElementById(ELEMENT_IDS.FONT_SELECT),
                fontSelect: safeGetElementById(ELEMENT_IDS.FONT_SELECT), // Add alias for consistency
                fontSelectDropdown: safeGetElementById(ELEMENT_IDS.FONT_SELECT_DROPDOWN),
                sidebarToggle: safeGetElementById(ELEMENT_IDS.SIDEBAR_TOGGLE),
                sidebarModal: safeGetElementById(ELEMENT_IDS.SIDEBAR_MODAL),
                sidebarOverlay: safeGetElementById(ELEMENT_IDS.SIDEBAR_OVERLAY),
                sidebarClose: safeGetElementById(ELEMENT_IDS.SIDEBAR_CLOSE),
                searchInput: safeGetElementById(ELEMENT_IDS.SEARCH_INPUT),

                notepadToggle: safeGetElementById(ELEMENT_IDS.NOTEPAD_TOGGLE),
                notepadModal: safeGetElementById(ELEMENT_IDS.NOTEPAD_MODAL),
                notepadOverlay: safeGetElementById(ELEMENT_IDS.NOTEPAD_OVERLAY),
                notepadClose: safeGetElementById(ELEMENT_IDS.NOTEPAD_CLOSE),
                notepadTextarea: safeGetElementById(ELEMENT_IDS.NOTEPAD_TEXTAREA),
                helpToggle: safeGetElementById(ELEMENT_IDS.HELP_TOGGLE),
                helpModal: safeGetElementById(ELEMENT_IDS.HELP_MODAL),
                helpOverlay: safeGetElementById(ELEMENT_IDS.HELP_OVERLAY),
                helpClose: safeGetElementById(ELEMENT_IDS.HELP_CLOSE),

            };

            // Validate that critical elements exist
            const criticalElements = [
                'themeToggle',
                'fontSelectButton',
                'sidebarToggle',
                'notepadToggle'
            ];

            const missingElements = criticalElements.filter(id => !this.elements[id]);

            if (missingElements.length > 0) {
                console.warn('Missing critical DOM elements:', missingElements);
                return false;
            }

            this.initialized = true;

            // Make elements globally available for backward compatibility
            window.domElements = this.elements;

            return true;
        } catch (error) {
            console.error('Failed to initialize DOM elements:', error);
            return false;
        }
    }

    /**
     * Initialize the DOM Manager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            // DOM initialization logic
            const success = this.initializeElements();
            if (success) {
                this.initialized = true;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to initialize DOM Manager:', error);
            return false;
        }
    }

    /**
     * Get a cached DOM element by ID
     * @param {string} id - Element ID
     * @returns {HTMLElement|null} Element or null if not found
     */
    getElement(id) {
        if (!this.initialized) {
            console.warn('DOM Manager not initialized. Call initializeElements() first.');
            return null;
        }

        // First try to get by the exact ID
        if (this.elements[id]) {
            return this.elements[id];
        }

        // If not found, try to find by matching the cached key names
        // Convert 'filter-toggle' to 'filterToggle' format
        const camelCaseKey = id.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
        if (this.elements[camelCaseKey]) {
            return this.elements[camelCaseKey];
        }

        // If still not found, try direct DOM lookup as fallback
        const directElement = document.getElementById(id);
        if (directElement) {
            console.warn(`Element ${id} found via direct DOM lookup but not cached. Consider adding to DOM manager.`);
            return directElement;
        }

        console.warn(`Element ${id} not found in cache or DOM`);
        return null;
    }

    /**
     * Get multiple elements by selector
     * @param {string} selector - CSS selector
     * @returns {NodeList|Array} Elements matching selector
     */
    getElements(selector) {
        try {
            return document.querySelectorAll(selector);
        } catch (error) {
            console.error(`Failed to get elements with selector "${selector}":`, error);
            return [];
        }
    }

    /**
     * Update an element's properties
     * @param {string} id - Element ID
     * @param {Object} updates - Properties to update
     * @returns {boolean} Success status
     */
    updateElement(id, updates) {
        const element = this.getElement(id);
        if (!element) {
            console.warn(`Element with ID "${id}" not found`);
            return false;
        }

        try {
            Object.assign(element, updates);
            return true;
        } catch (error) {
            console.error(`Failed to update element "${id}":`, error);
            return false;
        }
    }

    /**
     * Check if an element exists and is visible
     * @param {string} id - Element ID
     * @returns {boolean} Whether element exists and is visible
     */
    isElementVisible(id) {
        const element = this.getElement(id);
        if (!element) return false;

        const style = window.getComputedStyle(element);
        return style.display !== 'none' && style.visibility !== 'hidden' && element.offsetParent !== null;
    }

    /**
     * Show or hide an element
     * @param {string} id - Element ID
     * @param {boolean} show - Whether to show the element
     * @returns {boolean} Success status
     */
    toggleElementVisibility(id, show) {
        const element = this.getElement(id);
        if (!element) return false;

        try {
            element.style.display = show ? '' : 'none';
            return true;
        } catch (error) {
            console.error(`Failed to toggle visibility for element "${id}":`, error);
            return false;
        }
    }

    /**
     * Add event listener to an element
     * @param {string} id - Element ID
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     * @returns {boolean} Success status
     */
    addEventListener(id, event, handler, options = {}) {
        const element = this.getElement(id);
        if (!element) return false;

        try {
            element.addEventListener(event, handler, options);
            return true;
        } catch (error) {
            console.error(`Failed to add event listener to element "${id}":`, error);
            return false;
        }
    }

    /**
     * Remove event listener from an element
     * @param {string} id - Element ID
     * @param {string} event - Event type
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     * @returns {boolean} Success status
     */
    removeEventListener(id, event, handler, options = {}) {
        const element = this.getElement(id);
        if (!element) return false;

        try {
            element.removeEventListener(event, handler, options);
            return true;
        } catch (error) {
            console.error(`Failed to remove event listener from element "${id}":`, error);
            return false;
        }
    }

    /**
     * Get all cached elements
     * @returns {Object} All cached elements
     */
    getAllElements() {
        return { ...this.elements };
    }

    /**
     * Check if DOM Manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }



    /**
     * Destroy the DOM Manager and clean up resources
     */
    destroy() {

        this.initialized = false;
    }
}
