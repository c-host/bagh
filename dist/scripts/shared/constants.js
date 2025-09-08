/**
 * Shared Constants Module
 * Configuration constants and magic numbers
 */

// Theme constants
export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

// Font constants
export const FONTS = {
    DEFAULT: 'default',
    SONATA: 'SonataNo5',
    NEUE_IMPACT: 'NeueImpakt',
    K_GORGA: 'k_gorga',
    K_GRIGOL: 'k_grigol',
    K_KALIG: 'k_kalig',
    K_LORTKI: 'k_lortki'
};

// Font preloading
export const FONTS_TO_PRELOAD = [
    FONTS.SONATA,
    FONTS.NEUE_IMPACT,
    FONTS.K_GORGA,
    FONTS.K_GRIGOL,
    FONTS.K_KALIG,
    FONTS.K_LORTKI
];

// Local storage keys
export const STORAGE_KEYS = {
    THEME: 'theme',
    FONT: 'font',
    NOTEPAD_CONTENT: 'notepadContent',
    NOTEPAD_FONT: 'notepadFont',
    NOTEPAD_SIZE: 'notepadSize',
    SIDEBAR_STATE: 'sidebarState'
};

// Notification types
export const NOTIFICATION_TYPES = {
    INFO: 'info',
    SUCCESS: 'success',
    ERROR: 'error'
};

// Animation and timing constants
export const TIMING = {
    NOTIFICATION_DURATION: 3000,
    THEME_TRANSITION_DISABLE: 100,
    LINK_COPY_FEEDBACK: 500,
    FONT_PRELOAD_DELAY: 300
};

// Z-index values
export const Z_INDEX = {
    NOTIFICATION: 10000,
    MODAL: 9999,
    OVERLAY: 9998
};

// CSS custom properties for colors
export const CSS_COLORS = {
    SUCCESS: '#28a745',
    ERROR: '#dc3545',
    INFO: '#17a2b8'
};

// Element IDs
export const ELEMENT_IDS = {
    THEME_TOGGLE: 'theme-toggle',
    FONT_SELECT: 'font-select',
    FONT_SELECT_DROPDOWN: 'font-select-dropdown',
    SIDEBAR_TOGGLE: 'sidebar-toggle',
    SIDEBAR_MODAL: 'sidebar-modal',
    SIDEBAR_OVERLAY: 'sidebar-overlay',
    SIDEBAR_CLOSE: 'sidebar-close',
    SEARCH_INPUT: 'search-input',
    SEARCH_CLEAR: 'search-clear',

    NOTEPAD_TOGGLE: 'notepad-toggle',
    NOTEPAD_MODAL: 'notepad-modal',
    NOTEPAD_OVERLAY: 'notepad-overlay',
    NOTEPAD_CLOSE: 'notepad-close',
    NOTEPAD_TEXTAREA: 'notepad-textarea',
    HELP_TOGGLE: 'help-toggle',
    HELP_MODAL: 'help-modal',
    HELP_OVERLAY: 'help-overlay',
    HELP_CLOSE: 'help-close',

};
