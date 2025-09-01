/**
 * Notepad Manager Module
 * Handles notepad functionality including content persistence, font synchronization, and size controls
 */

import { STORAGE_KEYS, ELEMENT_IDS } from '../shared/constants.js';


/**
 * Notepad Manager Class
 * Manages notepad modal, content persistence, and font synchronization
 */
export class NotepadManager {
    constructor(domManager, fontManager) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {Object} Font Manager instance */
        this.fontManager = fontManager;

        /** @type {string} Saved notepad content */
        this.savedContent = '';

        /** @type {string} Saved font size */
        this.savedFontSize = '16';

        /** @type {string} Current font being used */
        this.currentFont = null;

        /** @type {string} Saved font preference */
        this.savedFont = null;

        /** @type {boolean} Whether notepad is open */
        this.isOpen = false;

        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;

        /** @type {HTMLElement} Font size select element */
        this.fontSizeSelect = null;
    }

    /**
     * Initialize the notepad manager
     * @returns {boolean} Success status
     */
    initialize() {
        try {
            // Load saved notepad content and font size
            this.loadSavedData();

            // Set up event listeners
            this.setupEventListeners();

            // Initialize notepad font
            this.updateNotepadFont();

            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize Notepad Manager:', error);
            return false;
        }
    }

    /**
     * Load saved notepad data from localStorage
     */
    loadSavedData() {
        this.savedContent = localStorage.getItem(STORAGE_KEYS.NOTEPAD_CONTENT) || '';
        this.savedFontSize = localStorage.getItem(STORAGE_KEYS.NOTEPAD_SIZE) || '16';

        // Apply saved content and font size
        const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);
        if (notepadTextarea) {
            notepadTextarea.value = this.savedContent;
            notepadTextarea.style.fontSize = this.savedFontSize + 'px';
        }

        // Find and set font size select
        this.fontSizeSelect = document.getElementById('font-size-select');
        if (this.fontSizeSelect) {
            this.fontSizeSelect.value = this.savedFontSize;
        }
    }

    /**
     * Set up notepad event listeners
     */
    setupEventListeners() {
        const notepadToggle = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TOGGLE);
        const notepadClose = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_CLOSE);
        const notepadOverlay = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_OVERLAY);
        const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);

        if (!notepadToggle || !notepadClose || !notepadOverlay || !notepadTextarea) {
            console.warn('Notepad elements not found');
            return;
        }

        // Toggle notepad
        notepadToggle.addEventListener('click', () => {
            this.openNotepad();
        });

        // Close notepad
        notepadClose.addEventListener('click', () => {
            this.closeNotepad();
        });

        // Close notepad on overlay click
        notepadOverlay.addEventListener('click', () => {
            this.closeNotepad();
        });

        // Save notepad content on input
        notepadTextarea.addEventListener('input', () => {
            this.saveNotepadContent();
        });

        // Handle font size change
        if (this.fontSizeSelect) {
            this.fontSizeSelect.addEventListener('change', () => {
                this.handleFontSizeChange();
            });
        }


    }

    /**
     * Open the notepad modal
     */
    openNotepad() {
        const notepadModal = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_MODAL);
        const notepadOverlay = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_OVERLAY);
        if (!notepadModal || !notepadOverlay) return;

        notepadModal.classList.add('active');
        notepadOverlay.classList.add('active');
        this.isOpen = true;

        // Focus textarea and sync font after a short delay
        setTimeout(() => {
            const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);
            if (notepadTextarea) {
                notepadTextarea.focus();
            }
            this.updateNotepadFont();
        }, 100);


    }

    /**
     * Close the notepad modal
     */
    closeNotepad() {
        const notepadModal = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_MODAL);
        const notepadOverlay = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_OVERLAY);
        if (!notepadModal || !notepadOverlay) return;

        notepadModal.classList.remove('active');
        notepadOverlay.classList.remove('active');
        this.isOpen = false;


    }

    /**
     * Save notepad content to localStorage
     */
    saveNotepadContent() {
        const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);
        if (!notepadTextarea) return;

        const content = notepadTextarea.value;
        localStorage.setItem(STORAGE_KEYS.NOTEPAD_CONTENT, content);
        this.savedContent = content;
    }

    /**
     * Handle font size change
     */
    handleFontSizeChange() {
        if (!this.fontSizeSelect) return;

        const fontSize = this.fontSizeSelect.value;
        const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);

        if (notepadTextarea) {
            notepadTextarea.style.fontSize = fontSize + 'px';
        }

        localStorage.setItem(STORAGE_KEYS.NOTEPAD_SIZE, fontSize);
        this.savedFontSize = fontSize;
    }

    /**
     * Apply current website font to notepad
     */
    updateNotepadFont() {
        const notepadModal = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_MODAL);
        if (!notepadModal) return;

        let currentFont = null;
        if (this.fontManager && this.fontManager.isInitialized()) {
            currentFont = this.fontManager.getCurrentFont();
            notepadModal.setAttribute('data-font', currentFont);
        } else {
            // Fallback to document attribute
            currentFont = document.documentElement.getAttribute('data-font');
            notepadModal.setAttribute('data-font', currentFont);
        }

        // Update internal font properties for getCurrentFont() method
        if (currentFont) {
            this.currentFont = currentFont;
            this.savedFont = currentFont;
        }
    }

    /**
     * Get notepad content
     * @returns {string} Current notepad content
     */
    getContent() {
        const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);
        return notepadTextarea ? notepadTextarea.value : this.savedContent;
    }

    /**
     * Set notepad content
     * @param {string} content - Content to set
     */
    setContent(content) {
        const notepadTextarea = this.domManager.getElement(ELEMENT_IDS.NOTEPAD_TEXTAREA);
        if (notepadTextarea) {
            notepadTextarea.value = content;
            this.saveNotepadContent();
        }
    }

    /**
     * Clear notepad content
     */
    clearContent() {
        this.setContent('');

    }

    /**
     * Get current font size
     * @returns {string} Current font size
     */
    getFontSize() {
        return this.savedFontSize;
    }

    /**
     * Set font size
     * @param {string} fontSize - Font size to set
     */
    setFontSize(fontSize) {
        if (this.fontSizeSelect) {
            this.fontSizeSelect.value = fontSize;
            this.handleFontSizeChange();
        }
    }

    /**
     * Check if notepad is open
     * @returns {boolean} Whether notepad is open
     */
    isNotepadOpen() {
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
     * Get notepad configuration
     * @returns {Object} Notepad configuration
     */
    getConfig() {
        return {
            content: this.getContent(),
            fontSize: this.getFontSize(),
            isOpen: this.isOpen,
            initialized: this.initialized
        };
    }

    /**
     * Reset notepad to default state
     */
    reset() {
        this.setContent('');
        this.setFontSize('16');

    }

    /**
     * Export notepad content
     * @returns {string} Exported content
     */
    exportContent() {
        const content = this.getContent();
        const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        return `Notepad Export - ${timestamp}\n\n${content}`;
    }

    /**
     * Import notepad content
     * @param {string} content - Content to import
     */
    importContent(content) {
        this.setContent(content);

    }

    /**
     * Clean up notepad manager
     */
    destroy() {
        if (this.isOpen) {
            this.closeNotepad();
        }
        this.initialized = false;
    }

    /**
     * Toggle notepad open/closed
     */
    toggleNotepad() {
        if (this.isOpen) {
            this.closeNotepad();
        } else {
            this.openNotepad();
        }
    }

    /**
     * Get current font being used in notepad
     * @returns {string} Current font
     */
    getCurrentFont() {
        // Return current font being used in notepad
        return this.currentFont || this.savedFont;
    }
}
