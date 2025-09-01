/**
 * Help Manager Module
 * Handles help button functionality and modal display
 */

import { ELEMENT_IDS } from '../shared/constants.js';
import { showNotification } from '../shared/utils.js';

/**
 * Help Manager Class
 * Manages help modal functionality
 */
export class HelpManager {
    constructor(domManager) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {boolean} Whether help modal is open */
        this.isOpen = false;

        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;

        /** @type {Array} Event listeners for cleanup */
        this.eventListeners = [];
    }

    /**
     * Initialize the help manager
     * @returns {boolean} Success status
     */
    initialize() {
        try {
            this.setupEventListeners();
            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize Help Manager:', error);
            return false;
        }
    }

    /**
     * Set up help button event listeners
     */
    setupEventListeners() {
        const helpToggle = this.domManager.getElement(ELEMENT_IDS.HELP_TOGGLE);
        const helpModal = this.domManager.getElement(ELEMENT_IDS.HELP_MODAL);
        const helpOverlay = this.domManager.getElement(ELEMENT_IDS.HELP_OVERLAY);
        const helpClose = this.domManager.getElement(ELEMENT_IDS.HELP_CLOSE);

        if (!helpToggle || !helpModal || !helpOverlay) {
            console.warn('Help elements not found');
            return;
        }

        // Store elements for later use
        this.elements = {
            helpToggle,
            helpModal,
            helpOverlay,
            helpClose
        };

        // Toggle help modal
        const toggleHelp = () => {
            this.toggleHelp();
        };

        // Close help modal
        const closeHelp = () => {
            this.closeHelp();
        };

        // Add event listeners
        helpToggle.addEventListener('click', toggleHelp);
        if (helpOverlay) helpOverlay.addEventListener('click', closeHelp);
        if (helpClose) helpClose.addEventListener('click', closeHelp);

        // Store listeners for cleanup
        this.eventListeners = [
            { element: helpToggle, event: 'click', handler: toggleHelp }
        ];

        if (helpOverlay) {
            this.eventListeners.push({ element: helpOverlay, event: 'click', handler: closeHelp });
        }
        if (helpClose) {
            this.eventListeners.push({ element: helpClose, event: 'click', handler: closeHelp });
        }


    }

    /**
     * Toggle help modal open/closed
     */
    toggleHelp() {
        if (this.isOpen) {
            this.closeHelp();
        } else {
            this.openHelp();
        }
    }

    /**
     * Open the help modal
     */
    openHelp() {
        const helpModal = this.domManager.getElement(ELEMENT_IDS.HELP_MODAL);
        const helpOverlay = this.domManager.getElement(ELEMENT_IDS.HELP_OVERLAY);

        if (!helpModal || !helpOverlay) return;

        helpModal.classList.add('active');
        helpOverlay.classList.add('active');
        this.isOpen = true;

        showNotification('Help opened', 'info');
    }

    /**
     * Close the help modal
     */
    closeHelp() {
        const helpModal = this.domManager.getElement(ELEMENT_IDS.HELP_MODAL);
        const helpOverlay = this.domManager.getElement(ELEMENT_IDS.HELP_OVERLAY);

        if (!helpModal || !helpOverlay) return;

        helpModal.classList.remove('active');
        helpOverlay.classList.remove('active');
        this.isOpen = false;

        showNotification('Help closed', 'info');
    }

    /**
     * Check if help modal is open
     * @returns {boolean} Whether help modal is open
     */
    isHelpOpen() {
        return this.isOpen;
    }

    /**
     * Check if manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Get help configuration
     * @returns {Object} Help configuration
     */
    getConfig() {
        return {
            isOpen: this.isOpen,
            initialized: this.initialized
        };
    }

    /**
     * Clean up help manager
     */
    destroy() {
        this.eventListeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.eventListeners = [];
        this.initialized = false;
    }
}
