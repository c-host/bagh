/**
 * EventManager - Centralizes global event handling and cross-module communication
 * 
 * This module manages all global event listeners, keyboard shortcuts, URL handling,
 * and provides a centralized event system for communication between modules.
 */

/**
 * Manages global events, keyboard shortcuts, and cross-module communication
 */
export class EventManager {
    constructor(app) {
        this.app = app;
        this.managers = app.getManagers();
        this.initialized = false;

        // Event listeners storage for cleanup
        this.eventListeners = new Map();

        // Keyboard shortcuts configuration
        this.keyboardShortcuts = new Map();

        // URL change handling
        this.currentUrl = window.location.href;
        this.urlChangeHandlers = new Set();
    }

    /**
     * Initialize the EventManager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            console.log('🚀 Initializing EventManager...');

            // Set up global event handlers
            this.setupGlobalEventHandlers();

            // Set up keyboard shortcuts
            this.setupKeyboardShortcuts();

            // Set up URL change monitoring
            this.setupURLMonitoring();

            // Set up cross-module event communication
            this.setupCrossModuleEvents();

            this.initialized = true;
            console.log('✅ EventManager initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize EventManager:', error);
            return false;
        }
    }

    /**
     * Check if the manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.initialized;
    }

    /**
     * Set up global event handlers
     */
    setupGlobalEventHandlers() {
        // Global link icon click handler
        window.handleLinkIconClick = (anchorId) => {
            this.handleLinkIconClick(anchorId);
        };

        // Global URL update handler
        window.updateURLWithAnchor = (anchorId) => {
            this.updateURLWithAnchor(anchorId);
        };

        // Global copy to clipboard handler
        window.copyToClipboard = (text) => {
            return this.copyToClipboard(text);
        };

        // Store references for cleanup
        this.eventListeners.set('global', {
            handleLinkIconClick: window.handleLinkIconClick,
            updateURLWithAnchor: window.updateURLWithAnchor,
            copyToClipboard: window.copyToClipboard
        });
    }

    /**
     * Set up link icon event listeners
     */
    setupLinkIconEventListeners() {
        const linkIcons = document.querySelectorAll('.verb-link-icon');
        linkIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                const georgianVerb = icon.getAttribute('data-verb-georgian');
                this.handleLinkIconClick(georgianVerb);
            });
        });
    }

    /**
     * Set up keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        // Theme toggle: Ctrl/Cmd + T
        this.keyboardShortcuts.set('theme-toggle', {
            key: 't',
            ctrlKey: true,
            handler: () => this.managers.themeManager?.toggleTheme()
        });



        // Notepad toggle: Ctrl/Cmd + N
        this.keyboardShortcuts.set('notepad-toggle', {
            key: 'n',
            ctrlKey: true,
            handler: () => this.managers.notepadManager?.toggleNotepad()
        });

        // Search focus: Ctrl/Cmd + K
        this.keyboardShortcuts.set('search-focus', {
            key: 'k',
            ctrlKey: true,
            handler: () => this.focusSearch()
        });



        // Add keyboard event listener
        document.addEventListener('keydown', this.handleKeyboardShortcut.bind(this));
        this.eventListeners.set('keyboard', 'keydown');

        // Add centralized ESC key handler for better performance
        document.addEventListener('keydown', this.handleEscapeKey.bind(this));
        this.eventListeners.set('escape', 'keydown');

        // Add window resize handler
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        this.eventListeners.set('resize', 'resize');

        // Add global error handlers
        window.addEventListener('error', this.handleGlobalError.bind(this));
        this.eventListeners.set('error', 'error');

        window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
        this.eventListeners.set('unhandledrejection', 'unhandledrejection');
    }

    /**
     * Set up URL monitoring
     */
    setupURLMonitoring() {
        // Monitor URL changes
        window.addEventListener('popstate', this.handleURLChange.bind(this));
        this.eventListeners.set('popstate', 'popstate');

        // Check for immediate loading on page load
        if (this.managers.verbDataManager) {
            this.managers.verbDataManager.checkForImmediateLoading();
        }
    }

    /**
     * Set up cross-module event communication
     */
    setupCrossModuleEvents() {
        // Listen for category events
        document.addEventListener('categoryExpanded', (event) => {
            console.log('Category expanded:', event.detail);
        });

        document.addEventListener('categoryCollapsed', (event) => {
            console.log('Category collapsed:', event.detail);
        });

        // Listen for sticky header events
        document.addEventListener('stickyHeaderChanged', (event) => {
            console.log('Sticky header changed:', event.detail);
        });
        // Listen for theme changes
        if (this.managers.themeManager) {
            document.addEventListener('themeChanged', (event) => {
                console.log('Theme changed:', event.detail);
                // Update notepad font after theme change
                if (this.managers.notepadManager?.isInitialized()) {
                    setTimeout(() => {
                        this.managers.notepadManager.updateNotepadFont();
                    }, 100);
                }
            });
        }

        // Listen for font changes
        if (this.managers.fontManager) {
            document.addEventListener('fontChanged', (event) => {
                console.log('Font changed:', event.detail);
                // Update notepad font after font change
                if (this.managers.notepadManager?.isInitialized()) {
                    setTimeout(() => {
                        this.managers.notepadManager.updateNotepadFont();
                    }, 100);
                }
            });
        }



        // Listen for verb data loading
        if (this.managers.verbDataManager) {
            document.addEventListener('verbDataLoaded', (event) => {
                console.log('Verb data loaded:', event.detail);
                // The preverb manager will handle enabling selectors
                if (this.managers.preverbManager?.isInitialized()) {
                    this.managers.preverbManager.enablePreverbSelector(event.detail.verbId);
                }
            });
        }

        // Listen for preverb changes
        if (this.managers.preverbManager) {
            document.addEventListener('preverbChanged', (event) => {
                console.log('Preverb changed:', event.detail);
                // The preverb manager will handle updating displays
            });
        }
    }

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeyboardShortcut(event) {
        // Don't trigger shortcuts when typing in input fields
        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        for (const [shortcutName, shortcut] of this.keyboardShortcuts) {
            if (event.key.toLowerCase() === shortcut.key &&
                event.ctrlKey === shortcut.ctrlKey &&
                !event.shiftKey &&
                !event.altKey) {

                event.preventDefault();
                console.log(`Keyboard shortcut triggered: ${shortcutName}`);
                shortcut.handler();
                break;
            }
        }
    }

    /**
     * Centralized ESC key handler for optimal performance
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleEscapeKey(event) {
        if (event.key === 'Escape') {
            // Use requestAnimationFrame for better performance
            requestAnimationFrame(() => {
                this.handleEscapeKeyActions();
            });
        }
    }

    /**
     * Handle ESC key actions in order of priority
     */
    handleEscapeKeyActions() {
        // Check if any modal is open and close it
        if (this.managers.helpManager?.isInitialized() && this.managers.helpManager.isHelpOpen()) {
            this.managers.helpManager.closeHelp();
            return;
        }

        if (this.managers.notepadManager?.isInitialized() && this.managers.notepadManager.isOpen) {
            this.managers.notepadManager.closeNotepad();
            return;
        }

        if (this.managers.sidebarManager?.isInitialized() && this.managers.sidebarManager.isSidebarOpen()) {
            this.managers.sidebarManager.closeSidebar();
            return;
        }

        // Close font dropdown if open
        if (this.managers.fontManager?.isInitialized() && this.managers.fontManager.isDropdownOpen()) {
            this.managers.fontManager.closeFontDropdown();
            return;
        }
    }

    /**
     * Focus search input
     */
    focusSearch() {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.focus();
            searchInput.select();
        }
    }

    /**
     * Handle link icon clicks
     * @param {string} anchorId - Anchor ID to navigate to
     */
    handleLinkIconClick(anchorId) {
        const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;

        // Find the clicked link icon element
        const clickedElement = window.event ? window.event.target : null;

        if (!clickedElement) {
            console.log('Link icon click handled for:', anchorId);
            this.updateURLWithAnchor(anchorId);
            return;
        }

        // Store original styles
        const originalBackground = clickedElement.style.backgroundColor;
        const originalColor = clickedElement.style.color;
        const originalOpacity = clickedElement.style.opacity;

        // Apply copied state styles
        clickedElement.style.backgroundColor = 'var(--success-color)';
        clickedElement.style.color = 'white';
        clickedElement.style.opacity = '1';

        // Copy to clipboard
        this.copyToClipboard(url);

        // Update URL
        this.updateURLWithAnchor(anchorId);

        // Restore original styles after a short delay
        setTimeout(() => {
            clickedElement.style.backgroundColor = 'transparent';
            clickedElement.style.color = originalColor;
            clickedElement.style.opacity = originalOpacity;
        }, 500);
    }

    /**
     * Update URL with anchor
     * @param {string} anchorId - Anchor ID
     */
    updateURLWithAnchor(anchorId) {
        try {
            const newUrl = `${window.location.pathname}#${encodeURIComponent(anchorId)}`;
            window.history.pushState({}, '', newUrl);

            // Trigger URL change event
            this.handleURLChange();
        } catch (error) {
            console.warn('Failed to update URL:', error);
        }
    }

    /**
     * Handle URL changes
     */
    handleURLChange() {
        const newUrl = window.location.href;
        if (newUrl !== this.currentUrl) {
            this.currentUrl = newUrl;

            // Check for immediate loading if URL contains hash
            if (this.managers.verbDataManager && window.location.hash) {
                this.managers.verbDataManager.checkForImmediateLoading();
            }

            // Notify URL change handlers
            this.urlChangeHandlers.forEach(handler => {
                try {
                    handler(window.location.hash);
                } catch (error) {
                    console.error('Error in URL change handler:', error);
                }
            });
        }
    }

    /**
     * Add URL change handler
     * @param {Function} handler - Handler function
     */
    addURLChangeHandler(handler) {
        this.urlChangeHandlers.add(handler);
    }

    /**
     * Remove URL change handler
     * @param {Function} handler - Handler function
     */
    removeURLChangeHandler(handler) {
        this.urlChangeHandlers.delete(handler);
    }

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Success status
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                return successful;
            } catch (err) {
                document.body.removeChild(textArea);
                return false;
            }
        }
    }

    /**
     * Dispatch custom event
     * @param {string} eventName - Event name
     * @param {Object} detail - Event detail
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    /**
     * Add event listener
     * @param {string} eventName - Event name
     * @param {Function} handler - Event handler
     * @param {Object} options - Event options
     */
    addEventListener(eventName, handler, options = {}) {
        document.addEventListener(eventName, handler, options);

        // Store for cleanup
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, []);
        }
        this.eventListeners.get(eventName).push(handler);
    }

    /**
     * Remove event listener
     * @param {string} eventName - Event name
     * @param {Function} handler - Event handler
     */
    removeEventListener(eventName, handler) {
        document.removeEventListener(eventName, handler);

        // Remove from stored list
        if (this.eventListeners.has(eventName)) {
            const handlers = this.eventListeners.get(eventName);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    /**
     * Clean up resources when needed
     */
    cleanup() {
        // Remove global window handlers
        if (window.handleLinkIconClick) {
            delete window.handleLinkIconClick;
        }
        if (window.updateURLWithAnchor) {
            delete window.updateURLWithAnchor;
        }
        if (window.copyToClipboard) {
            delete window.copyToClipboard;
        }

        // Remove event listeners
        for (const [eventName, handlers] of this.eventListeners) {
            if (typeof handlers === 'string') {
                // Single event listener
                document.removeEventListener(eventName, handlers);
            } else if (Array.isArray(handlers)) {
                // Multiple event listeners
                handlers.forEach(handler => {
                    document.removeEventListener(eventName, handler);
                });
            }
        }

        this.eventListeners.clear();
        this.urlChangeHandlers.clear();
    }

    /**
     * Destroy the manager and clean up resources
     */
    destroy() {
        this.cleanup();
        this.initialized = false;
    }



    /**
     * Handle window resize events
     */
    handleWindowResize() {
        // Handle responsive behavior
        if (this.managers.sidebarManager?.isInitialized()) {
            // Close sidebar on mobile resize
            if (window.innerWidth < 768) {
                this.managers.sidebarManager.closeSidebar();
            }
        }
    }

    /**
     * Handle global errors
     */
    handleGlobalError(event) {
        console.error('Global error caught:', event.error);
        // Note: showNotification is not available in EventManager
        // This could be dispatched as a custom event for the main app to handle
        this.dispatchEvent('globalError', { error: event.error });
    }

    /**
     * Handle unhandled promise rejections
     */
    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        // Note: showNotification is not available in EventManager
        // This could be dispatched as a custom event for the main app to handle
        this.dispatchEvent('unhandledRejection', { reason: event.reason });
    }
}
