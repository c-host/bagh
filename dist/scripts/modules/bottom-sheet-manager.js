/**
 * Bottom Sheet Manager Module
 * Handles bottom sheet functionality for mobile controls
 * 
 * This module manages the bottom sheet that contains mobile controls
 * (help, notepad, font selector) in a single accessible interface.
 */

import { ELEMENT_IDS } from '../shared/constants.js';

/**
 * Bottom Sheet Manager Class
 * Manages bottom sheet modal functionality for mobile devices
 */
export class BottomSheetManager {
    constructor(domManager, managers) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {Object} Reference to other managers */
        this.managers = managers;

        /** @type {boolean} Whether bottom sheet is open */
        this.isOpen = false;

        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;

        /** @type {Array} Event listeners for cleanup */
        this.eventListeners = [];

        /** @type {HTMLElement} Bottom sheet trigger button */
        this.triggerButton = null;

        /** @type {HTMLElement} Bottom sheet container */
        this.bottomSheet = null;

        /** @type {HTMLElement} Bottom sheet overlay */
        this.overlay = null;

        /** @type {HTMLElement} Bottom sheet font dropdown */
        this.fontDropdown = null;

        /** @type {Array} Font options in bottom sheet dropdown */
        this.fontOptions = [];
    }

    /**
     * Initialize the bottom sheet manager
     * @returns {boolean} Success status
     */
    initialize() {
        try {
            // Only initialize on mobile devices
            if (!this.isMobileDevice()) {
                this.initialized = true;
                return true;
            }

            // Create bottom sheet elements
            this.createBottomSheetElements();

            // Set up event listeners
            this.setupEventListeners();

            this.initialized = true;
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if device is mobile
     * @returns {boolean} Whether device is mobile
     */
    isMobileDevice() {
        return window.innerWidth <= 768;
    }

    /**
     * Create bottom sheet DOM elements
     */
    createBottomSheetElements() {
        // Create bottom sheet trigger button
        this.triggerButton = document.createElement('button');
        this.triggerButton.className = 'bottom-sheet-trigger';
        this.triggerButton.innerHTML = '<i class="fas fa-cog"></i>';
        this.triggerButton.setAttribute('aria-label', 'Open controls');
        this.triggerButton.setAttribute('title', 'Open controls');

        // Create bottom sheet container
        this.bottomSheet = document.createElement('div');
        this.bottomSheet.className = 'bottom-controls-sheet';
        this.bottomSheet.innerHTML = `
            <div class="bottom-sheet-content">
                <button class="bottom-sheet-button" data-action="help">
                    <i class="fas fa-question-circle"></i>
                    <span>Help</span>
                </button>
                <button class="bottom-sheet-button" data-action="notepad">
                    <i class="fas fa-sticky-note"></i>
                    <span>Notes</span>
                </button>
                <button class="bottom-sheet-button" data-action="font" id="bottom-sheet-font-button">
                    <i class="fas fa-font"></i>
                    <span>Font</span>
                </button>
            </div>
            <div class="bottom-sheet-font-dropdown" id="bottom-sheet-font-dropdown">
                <div class="font-option" data-font="default">Default</div>
                <div class="font-option" data-font="sonata">Sonata</div>
                <div class="font-option" data-font="neueimpakt">Neue Impakt</div>
                <div class="font-option" data-font="k_gorga">K Gorga</div>
                <div class="font-option" data-font="k_grigol">K Grigol</div>
                <div class="font-option" data-font="k_kalig">K Kalig</div>
                <div class="font-option" data-font="k_lortki">K Lortki</div>
            </div>
        `;

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'bottom-sheet-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        `;

        // Add elements to DOM
        document.body.appendChild(this.triggerButton);
        document.body.appendChild(this.overlay);
        document.body.appendChild(this.bottomSheet);

        // Store references to font dropdown elements
        this.fontDropdown = document.getElementById('bottom-sheet-font-dropdown');
        this.fontOptions = this.fontDropdown ? this.fontDropdown.querySelectorAll('.font-option') : [];
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Trigger button click
        const handleTriggerClick = () => {
            this.toggleBottomSheet();
        };

        // Overlay click to close
        const handleOverlayClick = () => {
            this.closeBottomSheet();
        };

        // Bottom sheet button clicks
        const handleButtonClick = (e) => {
            const button = e.target.closest('.bottom-sheet-button');
            const fontOption = e.target.closest('.font-option');

            if (fontOption) {
                // Handle font option selection
                const fontName = fontOption.getAttribute('data-font');
                this.handleFontSelection(fontName);
                return;
            }

            if (button) {
                const action = button.getAttribute('data-action');
                this.handleButtonAction(action);
            }
        };

        // Add event listeners
        this.triggerButton.addEventListener('click', handleTriggerClick);
        this.overlay.addEventListener('click', handleOverlayClick);
        this.bottomSheet.addEventListener('click', handleButtonClick);

        // Store listeners for cleanup
        this.eventListeners = [
            { element: this.triggerButton, event: 'click', handler: handleTriggerClick },
            { element: this.overlay, event: 'click', handler: handleOverlayClick },
            { element: this.bottomSheet, event: 'click', handler: handleButtonClick }
        ];

        // Handle window resize
        const handleResize = () => {
            if (!this.isMobileDevice() && this.isOpen) {
                this.closeBottomSheet();
            }
        };

        // Handle font selection completion
        const handleFontSelected = () => {
            this.closeBottomSheet();
        };

        // Handle font dropdown close
        const handleFontDropdownClosed = () => {
            this.closeBottomSheet();
        };

        window.addEventListener('resize', handleResize);
        document.addEventListener('fontSelected', handleFontSelected);
        document.addEventListener('fontDropdownClosed', handleFontDropdownClosed);

        this.eventListeners.push(
            { element: window, event: 'resize', handler: handleResize },
            { element: document, event: 'fontSelected', handler: handleFontSelected },
            { element: document, event: 'fontDropdownClosed', handler: handleFontDropdownClosed }
        );
    }

    /**
     * Toggle bottom sheet open/closed
     */
    toggleBottomSheet() {
        if (this.isOpen) {
            this.closeBottomSheet();
        } else {
            this.openBottomSheet();
        }
    }

    /**
     * Open the bottom sheet
     */
    openBottomSheet() {
        if (!this.bottomSheet || !this.overlay) return;

        this.bottomSheet.classList.add('active');
        this.overlay.style.opacity = '1';
        this.overlay.style.visibility = 'visible';
        this.isOpen = true;

        // Update trigger button
        this.triggerButton.innerHTML = '<i class="fas fa-times"></i>';
        this.triggerButton.setAttribute('aria-label', 'Close controls');
        this.triggerButton.setAttribute('title', 'Close controls');
    }

    /**
     * Close the bottom sheet
     */
    closeBottomSheet() {
        if (!this.bottomSheet || !this.overlay) return;

        this.bottomSheet.classList.remove('active');
        this.overlay.style.opacity = '0';
        this.overlay.style.visibility = 'hidden';
        this.isOpen = false;

        // Update trigger button
        this.triggerButton.innerHTML = '<i class="fas fa-cog"></i>';
        this.triggerButton.setAttribute('aria-label', 'Open controls');
        this.triggerButton.setAttribute('title', 'Open controls');
    }

    /**
     * Handle button actions within bottom sheet
     * @param {string} action - Action to perform
     */
    handleButtonAction(action) {
        switch (action) {
            case 'help':
                if (this.managers.helpManager?.isInitialized()) {
                    this.managers.helpManager.openHelp();
                }
                break;
            case 'notepad':
                if (this.managers.notepadManager?.isInitialized()) {
                    this.managers.notepadManager.openNotepad();
                }
                break;
            case 'font':
                this.toggleFontDropdown();
                // Don't close bottom sheet for font selector - let font selection complete first
                return;
            default:
            // Unknown bottom sheet action
        }

        // Close bottom sheet after action (except for font)
        this.closeBottomSheet();
    }

    /**
     * Toggle font dropdown
     */
    toggleFontDropdown() {
        if (!this.fontDropdown) return;

        const isVisible = this.fontDropdown.classList.contains('show');
        if (isVisible) {
            this.closeFontDropdown();
        } else {
            this.openFontDropdown();
        }
    }

    /**
     * Open font dropdown
     */
    openFontDropdown() {
        if (!this.fontDropdown) return;

        this.fontDropdown.classList.add('show');
        this.updateFontSelection();
    }

    /**
     * Close font dropdown
     */
    closeFontDropdown() {
        if (!this.fontDropdown) return;

        this.fontDropdown.classList.remove('show');

        // Dispatch event to notify that font dropdown is closed
        document.dispatchEvent(new CustomEvent('fontDropdownClosed'));
    }

    /**
     * Handle font selection
     * @param {string} fontName - Selected font name
     */
    handleFontSelection(fontName) {
        if (this.managers.fontManager?.isInitialized()) {
            // Use the font manager to change the font
            this.managers.fontManager.changeFont(fontName, true);
        }

        this.closeFontDropdown();

        // Dispatch event to notify that font was selected
        document.dispatchEvent(new CustomEvent('fontSelected', {
            detail: { fontName }
        }));
    }

    /**
     * Update font selection highlighting
     */
    updateFontSelection() {
        if (!this.fontOptions.length || !this.managers.fontManager?.isInitialized()) return;

        const currentFont = this.managers.fontManager.getCurrentFont();

        this.fontOptions.forEach(option => {
            const fontName = option.getAttribute('data-font');
            option.classList.toggle('selected', fontName === currentFont);
        });
    }

    /**
     * Check if bottom sheet is open
     * @returns {boolean} Whether bottom sheet is open
     */
    isBottomSheetOpen() {
        return this.isOpen;
    }

    /**
     * Check if font dropdown is open
     * @returns {boolean} Whether font dropdown is open
     */
    isFontDropdownOpen() {
        return this.fontDropdown && this.fontDropdown.classList.contains('show');
    }

    /**
     * Check if manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Get bottom sheet configuration
     * @returns {Object} Bottom sheet configuration
     */
    getConfig() {
        return {
            isOpen: this.isOpen,
            initialized: this.initialized,
            isMobile: this.isMobileDevice()
        };
    }

    /**
     * Clean up bottom sheet manager
     */
    destroy() {
        // Remove event listeners
        this.eventListeners.forEach(({ element, event, handler }) => {
            if (element && element.removeEventListener) {
                element.removeEventListener(event, handler);
            }
        });
        this.eventListeners = [];

        // Remove DOM elements
        if (this.triggerButton && this.triggerButton.parentNode) {
            this.triggerButton.parentNode.removeChild(this.triggerButton);
        }
        if (this.bottomSheet && this.bottomSheet.parentNode) {
            this.bottomSheet.parentNode.removeChild(this.bottomSheet);
        }
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }

        this.initialized = false;
    }
}
