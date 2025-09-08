/**
 * Shared Types Module
 * TypeScript-like interfaces and data structure documentation
 */

/**
 * @typedef {Object} DOMElement
 * @property {HTMLElement} themeToggle - Theme toggle button
 * @property {HTMLElement} fontSelectButton - Font selection button
 * @property {HTMLElement} fontSelectDropdown - Font selection dropdown
 * @property {HTMLElement} sidebarToggle - Sidebar toggle button
 * @property {HTMLElement} sidebarModal - Sidebar modal container
 * @property {HTMLElement} sidebarOverlay - Sidebar overlay
 * @property {HTMLElement} sidebarClose - Sidebar close button
 * @property {HTMLElement} searchInput - Search input field
 * @property {HTMLElement} filterToggle - Filter toggle button
 * @property {HTMLElement} filterModal - Filter modal container
 * @property {HTMLElement} filterOverlay - Filter overlay
 * @property {HTMLElement} filterClose - Filter close button
 * @property {HTMLElement} notepadToggle - Notepad toggle button
 * @property {HTMLElement} notepadModal - Notepad modal container
 * @property {HTMLElement} notepadOverlay - Notepad overlay
 * @property {HTMLElement} notepadClose - Notepad close button
 * @property {HTMLTextAreaElement} notepadTextarea - Notepad text area
 * @property {HTMLElement} helpToggle - Help toggle button
 * @property {HTMLElement} helpModal - Help modal container
 * @property {HTMLElement} helpOverlay - Help overlay
 * @property {HTMLElement} helpClose - Help close button

 */

/**
 * @typedef {Object} VerbData
 * @property {string} id - Verb identifier
 * @property {string} infinitive - Verb infinitive form
 * @property {string} meaning - Verb meaning/translation
 * @property {Object} conjugations - Verb conjugations by preverb
 * @property {Array<string>} preverbs - Available preverbs for this verb
 */

/**
 * @typedef {Object} PreverbData
 * @property {string} preverb - Preverb text
 * @property {Object} forms - Conjugated forms
 * @property {string} meaning - Preverb meaning
 */



/**
 * @typedef {Object} ThemeConfig
 * @property {string} current - Current theme (light/dark)
 * @property {string} icon - Theme icon class
 * @property {boolean} transitionsEnabled - Whether transitions are enabled
 */

/**
 * @typedef {Object} FontConfig
 * @property {string} current - Current font family
 * @property {Array<string>} available - Available fonts
 * @property {boolean} preloaded - Whether fonts are preloaded
 */

/**
 * @typedef {Object} NotepadConfig
 * @property {string} content - Notepad content
 * @property {string} font - Notepad font
 * @property {string} size - Notepad size
 * @property {boolean} isOpen - Whether notepad is open
 */

/**
 * @typedef {Object} SidebarConfig
 * @property {boolean} isOpen - Whether sidebar is open
 * @property {Array} tableOfContents - Table of contents data
 * @property {string} searchTerm - Current search term
 * @property {Array} filteredItems - Filtered sidebar items
 */

/**
 * @typedef {Object} NotificationConfig
 * @property {string} message - Notification message
 * @property {string} type - Notification type (info/success/error)
 * @property {number} duration - Display duration in milliseconds
 * @property {string} position - Position on screen
 */

/**
 * @typedef {Object} ManagerConfig
 * @property {Object} domManager - DOM manager instance
 * @property {Object} themeManager - Theme manager instance
 * @property {Object} fontManager - Font manager instance
 * @property {Object} notepadManager - Notepad manager instance
 * @property {Object} filterManager - Filter manager instance
 * @property {Object} sidebarManager - Sidebar manager instance
 * @property {Object} enhancedVerbLoader - Dynamic verb loader instance
 * @property {Object} preverbManager - Preverb manager instance
 * @property {Object} eventManager - Event manager instance
 * @property {Object} helpManager - Help manager instance
 */

/**
 * @typedef {Function} EventHandler
 * @param {Event} event - DOM event object
 * @param {Object} context - Event context
 */

/**
 * @typedef {Function} ThrottledFunction
 * @param {...any} args - Function arguments
 */

/**
 * @typedef {Function} AsyncFunction
 * @param {...any} args - Function arguments
 * @returns {Promise<any>} Promise result
 */
