/**
 * Font Manager Module
 * Handles font selection, loading, preloading, and management
 */

import { FONTS, FONTS_TO_PRELOAD, STORAGE_KEYS, TIMING, ELEMENT_IDS } from '../shared/constants.js';
import { showNotification } from '../shared/utils.js';

/**
 * Font Manager Class
 * Manages font selection, loading, and preloading
 */
export class FontManager {
    constructor(domManager) {
        /** @type {Object} DOM Manager instance */
        this.domManager = domManager;

        /** @type {string} Current font */
        this.currentFont = FONTS.DEFAULT;

        /** @type {Array<string>} Available fonts */
        this.availableFonts = Object.values(FONTS);

        /** @type {boolean} Whether fonts are preloaded */
        this.fontsPreloaded = false;

        /** @type {boolean} Whether manager is initialized */
        this.initialized = false;

        /** @type {number} Selected font index for dropdown */
        this.selectedFontIndex = -1;

        /** @type {Array} Font options in dropdown */
        this.fontOptions = [];
    }

    /**
     * Initialize the font manager
     * @returns {boolean} Success status
     */
    initialize() {
        try {
            // Load saved font from localStorage
            const savedFont = localStorage.getItem(STORAGE_KEYS.FONT) || FONTS.DEFAULT;

            // Apply saved font
            this.setFont(savedFont);

            // Set up event listeners
            this.setupEventListeners();

            // Start font preloading
            this.startFontPreloading();

            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize Font Manager:', error);
            return false;
        }
    }

    /**
     * Set up font selection event listeners
     */
    setupEventListeners() {
        const fontSelectButton = this.domManager.getElement(ELEMENT_IDS.FONT_SELECT);
        const fontSelectDropdown = this.domManager.getElement(ELEMENT_IDS.FONT_SELECT_DROPDOWN);

        if (!fontSelectButton || !fontSelectDropdown) {
            console.warn('Font selection elements not found');
            return;
        }

        // Font selector button click event
        fontSelectButton.addEventListener('click', () => {
            const isVisible = fontSelectDropdown.classList.contains('show');
            if (isVisible) {
                this.closeFontDropdown();
            } else {
                this.openFontDropdown();
            }
        });

        // Font dropdown click event
        fontSelectDropdown.addEventListener('click', (e) => {
            const fontOption = e.target.closest('.font-option');
            if (fontOption) {
                const fontName = fontOption.getAttribute('data-font');
                this.selectFont(fontName);
            }
        });

        // Set up keyboard navigation
        this.setupKeyboardNavigation();
    }

    /**
     * Open font dropdown
     */
    openFontDropdown() {
        const fontSelectDropdown = this.domManager.getElement(ELEMENT_IDS.FONT_SELECT_DROPDOWN);
        if (!fontSelectDropdown) return;

        // Get all font options
        this.fontOptions = fontSelectDropdown.querySelectorAll('.font-option');

        // Find current font index
        this.selectedFontIndex = Array.from(this.fontOptions).findIndex(option =>
            option.getAttribute('data-font') === this.currentFont
        );

        // Show dropdown
        fontSelectDropdown.classList.add('show');

        // Update selection
        this.updateFontSelection();
    }

    /**
     * Close font dropdown
     */
    closeFontDropdown() {
        const fontSelectDropdown = this.domManager.getElement(ELEMENT_IDS.FONT_SELECT_DROPDOWN);
        if (!fontSelectDropdown) return;

        fontSelectDropdown.classList.remove('show');
        this.selectedFontIndex = -1;

        // Remove all selection classes
        this.fontOptions.forEach(option => {
            option.classList.remove('selected');
        });
    }

    /**
     * Update font selection highlighting
     */
    updateFontSelection() {
        this.fontOptions.forEach((option, index) => {
            option.classList.toggle('selected', index === this.selectedFontIndex);
        });
    }

    /**
     * Start font preloading
     */
    startFontPreloading() {
        setTimeout(() => {
            this.preloadFonts();
        }, TIMING.FONT_PRELOAD_DELAY);
    }

    /**
     * Preload all fonts to prevent flicker
     */
    preloadFonts() {
        // Check if Font Loading API is available
        if (document.fonts && document.fonts.load) {
            // Use Promise.all to load fonts in parallel
            Promise.all(FONTS_TO_PRELOAD.map(fontFamily =>
                document.fonts.load(`12px "${fontFamily}"`).catch(() => {
                    // Font preloading failed, continue without it
                })
            )).then(() => {
                this.fontsPreloaded = true;
                console.log('Fonts preloaded successfully');
            }).catch(() => {
                // Overall font preloading failed, continue without it
                console.warn('Font preloading failed');
            });
        }
    }

    /**
     * Check if a font is loaded
     * @param {string} fontFamily - Font family name
     * @returns {boolean} Whether font is loaded
     */
    isFontLoaded(fontFamily) {
        if (fontFamily === 'Noto Sans Georgian') {
            return true; // System font, always available
        }

        // Check if Font Loading API is available
        if (document.fonts && document.fonts.check) {
            return document.fonts.check(`12px "${fontFamily}"`);
        }

        // Fallback for older browsers
        return false;
    }

    /**
     * Wait for font to load before applying
     * @param {string} fontFamily - Font family name
     * @returns {Promise} Promise that resolves when font is loaded
     */
    async waitForFont(fontFamily) {
        if (fontFamily === 'Noto Sans Georgian') {
            return Promise.resolve();
        }

        // If font is already loaded, resolve immediately
        if (this.isFontLoaded(fontFamily)) {
            return Promise.resolve();
        }

        // Check if Font Loading API is available
        if (document.fonts && document.fonts.load) {
            try {
                // Use Font Loading API with a short timeout
                await Promise.race([
                    document.fonts.load(`12px "${fontFamily}"`),
                    new Promise(resolve => setTimeout(resolve, 100)) // 100ms timeout
                ]);
            } catch (error) {
                // Font loading failed, but we'll proceed anyway
            }
        }

        // Always resolve - don't block the UI
        return Promise.resolve();
    }

    /**
     * Set font (alias for changeFont)
     * @param {string} fontName - Font name to set
     * @param {boolean} saveToStorage - Whether to save to localStorage
     */
    setFont(fontName, saveToStorage = true) {
        this.changeFont(fontName, saveToStorage);
    }

    /**
     * Change font with loading optimization
     * @param {string} fontName - Font name to change to
     * @param {boolean} saveToStorage - Whether to save to localStorage
     */
    changeFont(fontName, saveToStorage = true) {
        const fontFamily = this.getFontFamily(fontName);
        if (!fontFamily) {
            console.warn(`Invalid font name: ${fontName}`);
            return;
        }

        // Apply font immediately
        document.documentElement.setAttribute('data-font', fontName);

        // Update current font
        this.currentFont = fontName;

        // Save to storage if needed
        if (saveToStorage) {
            localStorage.setItem(STORAGE_KEYS.FONT, fontName);
        }

        // Load font in background without blocking UI
        if (!this.isFontLoaded(fontFamily)) {
            // Use requestIdleCallback for non-critical font loading
            if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                    this.waitForFont(fontFamily).catch(() => {
                        // Font loading failed, but we already applied the font
                    });
                });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(() => {
                    this.waitForFont(fontFamily).catch(() => {
                        // Font loading failed, but we already applied the font
                    });
                }, 0);
            }
        }

        // Show notification
        showNotification(`Font changed to ${fontName}`, 'success');
    }

    /**
     * Select font (permanent change)
     * @param {string} fontName - Font name to select
     */
    selectFont(fontName) {
        this.changeFont(fontName, true);
        this.closeFontDropdown();
    }

    /**
     * Get font family name from font key
     * @param {string} fontName - Font key
     * @returns {string} Font family name
     */
    getFontFamily(fontName) {
        const fontFamilies = {
            'default': 'Noto Sans Georgian',
            'sonata': 'SonataNo5',
            'neueimpakt': 'NeueImpakt',
            'k_gorga': 'k_gorga',
            'k_grigol': 'k_grigol',
            'k_kalig': 'k_kalig',
            'k_lortki': 'k_lortki'
        };

        return fontFamilies[fontName] || fontName;
    }

    /**
     * Get current font
     * @returns {string} Current font
     */
    getCurrentFont() {
        return this.currentFont;
    }

    /**
     * Check if a specific font is active
     * @param {string} fontName - Font to check
     * @returns {boolean} Whether font is active
     */
    isFontActive(fontName) {
        return this.currentFont === fontName;
    }

    /**
     * Check if fonts are preloaded
     * @returns {boolean} Whether fonts are preloaded
     */
    areFontsPreloaded() {
        return this.fontsPreloaded;
    }

    /**
     * Get available fonts
     * @returns {Array<string>} Available fonts
     */
    getAvailableFonts() {
        return [...this.availableFonts];
    }

    /**
     * Check if manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Get font configuration
     * @returns {Object} Font configuration
     */
    getConfig() {
        return {
            current: this.currentFont,
            available: this.availableFonts,
            preloaded: this.fontsPreloaded,
            initialized: this.initialized
        };
    }

    /**
     * Reset font to default
     */
    resetFont() {
        this.setFont(FONTS.DEFAULT);
    }

    /**
     * Set up keyboard navigation for font selection
     */
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (this.isDropdownOpen()) {
                this.handleDropdownKeyNavigation(e);
            } else if (this.isFontNavigationKey(e)) {
                this.handleFontCycleNavigation(e);
            }
        });
    }

    /**
     * Handle keyboard navigation within dropdown
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleDropdownKeyNavigation(e) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedFontIndex = Math.max(this.selectedFontIndex - 1, 0);
            this.updateFontSelection();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedFontIndex = Math.min(this.selectedFontIndex + 1, this.fontOptions.length - 1);
            this.updateFontSelection();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (this.selectedFontIndex >= 0) {
                const selectedOption = this.fontOptions[this.selectedFontIndex];
                const selectedFont = selectedOption.getAttribute('data-font');
                this.selectFont(selectedFont);
                this.closeFontDropdown();
            }
        }
    }

    /**
     * Handle font cycling with arrow keys
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleFontCycleNavigation(e) {
        if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !this.isNotepadOpen()) {
            e.preventDefault();
            this.cycleFont(e.key === 'ArrowLeft' ? 'prev' : 'next');
        }
    }

    /**
     * Cycle through available fonts
     * @param {string} direction - Direction to cycle ('prev' or 'next')
     */
    cycleFont(direction = 'next') {
        const currentIndex = this.availableFonts.indexOf(this.currentFont);
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : this.availableFonts.length - 1;
        } else {
            newIndex = currentIndex < this.availableFonts.length - 1 ? currentIndex + 1 : 0;
        }

        this.changeFont(this.availableFonts[newIndex]);
    }

    /**
     * Check if dropdown is open
     * @returns {boolean} Whether dropdown is open
     */
    isDropdownOpen() {
        const dropdown = this.domManager.getElement(ELEMENT_IDS.FONT_SELECT_DROPDOWN);
        return dropdown && dropdown.classList.contains('show');
    }

    /**
     * Check if notepad is open
     * @returns {boolean} Whether notepad is open
     */
    isNotepadOpen() {
        // Check if notepad is open (integrate with notepad manager)
        // This will be updated when the font manager is integrated with the main app
        const notepadModal = document.querySelector('.notepad-modal');
        return notepadModal ? notepadModal.classList.contains('active') : false;
    }

    /**
     * Check if key is for font navigation
     * @param {KeyboardEvent} e - Keyboard event
     * @returns {boolean} Whether key is for font navigation
     */
    isFontNavigationKey(e) {
        return (e.key === 'ArrowLeft' || e.key === 'ArrowRight') &&
            (e.ctrlKey || e.metaKey);
    }

    /**
     * Clean up font manager
     */
    destroy() {
        this.closeFontDropdown();
        this.initialized = false;
    }
}
