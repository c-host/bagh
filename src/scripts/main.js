/**
 * Bagh - JavaScript
 * 
 * This file handles all interactive functionality including:
 * - Theme switching (light/dark mode)
 * - Font selection and management
 * - Sidebar navigation and search
 * - Filter controls
 * - Notepad functionality
 * - Preverb toggle system
 */

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}





// Global function for link icon clicks - must be defined before DOMContentLoaded
window.handleLinkIconClick = function (anchorId) {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;

    // Find the clicked link icon element
    const clickedElement = event.target;

    // Store original styles
    const originalBackground = clickedElement.style.backgroundColor;
    const originalColor = clickedElement.style.color;
    const originalOpacity = clickedElement.style.opacity;

    // Apply copied state styles
    clickedElement.style.backgroundColor = 'var(--success-color)';
    clickedElement.style.color = 'white';
    clickedElement.style.opacity = '1';

    // Copy to clipboard
    if (window.copyToClipboard) {
        window.copyToClipboard(url);
    } else {
        // Fallback if copyToClipboard not available yet
        navigator.clipboard.writeText(url).catch(err => {
            // Silent fail for clipboard operations
        });
    }

    // Update URL
    if (window.updateURLWithAnchor) {
        window.updateURLWithAnchor(anchorId);
    } else {
        // Fallback if updateURLWithAnchor not available yet
        try {
            const newUrl = `${window.location.pathname}#${encodeURIComponent(anchorId)}`;
            window.history.pushState({}, '', newUrl);
        } catch (error) {
            // Silent fail for URL updates
        }
    }

    // Restore original styles after a short delay
    setTimeout(() => {
        clickedElement.style.backgroundColor = 'transparent';
        clickedElement.style.color = originalColor;
        clickedElement.style.opacity = originalOpacity;
    }, 500);
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFont = localStorage.getItem('font') || 'default';

    // Apply saved preferences
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize DOM elements
    initializeDOMElements();
    updateThemeIcon(savedTheme);

    // Move DOM element caching to a separate function
    function initializeDOMElements() {
        window.domElements = {
            themeToggle: document.getElementById('theme-toggle'),
            fontSelectButton: document.getElementById('font-select'),
            fontSelectDropdown: document.getElementById('font-select-dropdown'),
            sidebarToggle: document.getElementById('sidebar-toggle'),
            sidebarModal: document.getElementById('sidebar-modal'),
            sidebarOverlay: document.getElementById('sidebar-overlay'),
            sidebarClose: document.getElementById('sidebar-close'),
            searchInput: document.getElementById('search-input'),
            filterToggle: document.getElementById('filter-toggle'),
            filterModal: document.getElementById('filter-modal'),
            filterOverlay: document.getElementById('filter-overlay'),
            filterClose: document.getElementById('filter-close'),
            notepadToggle: document.getElementById('notepad-toggle'),
            notepadModal: document.getElementById('notepad-modal'),
            notepadOverlay: document.getElementById('notepad-overlay'),
            notepadClose: document.getElementById('notepad-close'),
            notepadTextarea: document.getElementById('notepad-textarea'),
            helpToggle: document.getElementById('help-toggle'),
            helpModal: document.getElementById('help-modal'),
            helpOverlay: document.getElementById('help-overlay'),
            helpClose: document.getElementById('help-close'),
            resetToggle: document.getElementById('reset-toggle')
        };
    }

    // Preload all fonts to prevent flicker
    function preloadFonts() {
        const fontsToPreload = ['SonataNo5', 'NeueImpakt', 'k_gorga', 'k_grigol', 'k_kalig', 'k_lortki'];

        // Check if Font Loading API is available
        if (document.fonts && document.fonts.load) {
            // Use Promise.all to load fonts in parallel
            Promise.all(fontsToPreload.map(fontFamily =>
                document.fonts.load(`12px "${fontFamily}"`).catch(() => {
                    // Font preloading failed, continue without it
                })
            )).catch(() => {
                // Overall font preloading failed, continue without it
            });
        }
    }

    // Start preloading fonts in background
    setTimeout(() => {
        preloadFonts();
    }, 300);

    // Helper functions for dual ID system
    function safeGetElementById(id) {
        try {
            return document.getElementById(id);
        } catch (error) {
            return null;
        }
    }



    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        // Set background color based on type
        if (type === 'error') {
            notification.style.backgroundColor = '#dc3545';
        } else if (type === 'success') {
            notification.style.backgroundColor = '#28a745';
        } else {
            notification.style.backgroundColor = '#17a2b8';
        }

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }

    // Theme toggle event
    if (window.domElements && window.domElements.themeToggle) {
        window.domElements.themeToggle.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            // Temporarily disable transitions
            const style = document.createElement('style');
            style.id = 'instant-theme-switch';
            style.textContent = '* { transition: none !important; }';
            document.head.appendChild(style);

            // Apply theme change immediately
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);

            // Save to localStorage immediately
            localStorage.setItem('theme', newTheme);

            // Re-enable transitions after a brief moment
            setTimeout(() => {
                const instantStyle = document.getElementById('instant-theme-switch');
                if (instantStyle) {
                    instantStyle.remove();
                }
            }, 50);
        });
    }

    // Font selector variables
    let selectedFontIndex = -1;
    let fontOptions = [];

    // Font selector button click event
    if (window.domElements && window.domElements.fontSelectButton) {
        window.domElements.fontSelectButton.addEventListener('click', function () {
            const isVisible = window.domElements.fontSelectDropdown.classList.contains('show');

            if (isVisible) {
                closeFontDropdown();
            } else {
                openFontDropdown();
            }
        });
    }

    // Open font dropdown
    function openFontDropdown() {
        if (!window.domElements || !window.domElements.fontSelectDropdown) return;

        // Get all font options
        fontOptions = window.domElements.fontSelectDropdown.querySelectorAll('.font-option');

        // Find current font index
        const currentFont = document.documentElement.getAttribute('data-font');
        selectedFontIndex = Array.from(fontOptions).findIndex(option =>
            option.getAttribute('data-font') === currentFont
        );

        // Show dropdown
        window.domElements.fontSelectDropdown.classList.add('show');

        // Update selection
        updateFontSelection();
    }

    // Close font dropdown
    function closeFontDropdown() {
        if (!window.domElements || !window.domElements.fontSelectDropdown) return;

        window.domElements.fontSelectDropdown.classList.remove('show');
        selectedFontIndex = -1;

        // Remove all selection classes
        fontOptions.forEach(option => {
            option.classList.remove('selected');
        });
    }

    // Update font selection highlighting
    function updateFontSelection() {
        fontOptions.forEach((option, index) => {
            option.classList.toggle('selected', index === selectedFontIndex);
        });
    }

    // Font loading detection
    const fontFamilies = {
        'default': 'Noto Sans Georgian',
        'sonata': 'SonataNo5',
        'neueimpakt': 'NeueImpakt',
        'k_gorga': 'k_gorga',
        'k_grigol': 'k_grigol',
        'k_kalig': 'k_kalig',
        'k_lortki': 'k_lortki'
    };

    // Check if a font is loaded
    function isFontLoaded(fontFamily) {
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

    // Wait for font to load before applying - Optimized version
    async function waitForFont(fontFamily) {
        if (fontFamily === 'Noto Sans Georgian') {
            return Promise.resolve();
        }

        // If font is already loaded, resolve immediately
        if (isFontLoaded(fontFamily)) {
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

    // Single font change function - Optimized version
    function changeFont(fontName, saveToStorage = true) {
        const fontFamily = fontFamilies[fontName];

        // Apply font immediately
        document.documentElement.setAttribute('data-font', fontName);

        // Save to storage if needed
        if (saveToStorage) {
            localStorage.setItem('font', fontName);
        }

        // Update notepad font if needed
        if (notepadModal && notepadModal.classList.contains('active')) {
            updateNotepadFont();
        }

        // Load font in background without blocking UI
        if (!isFontLoaded(fontFamily)) {
            // Use requestIdleCallback for non-critical font loading
            if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                    waitForFont(fontFamily).catch(() => {
                        // Font loading failed, but we already applied the font
                    });
                });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(() => {
                    waitForFont(fontFamily).catch(() => {
                        // Font loading failed, but we already applied the font
                    });
                }, 0);
            }
        }
    }



    // Font selection (permanent change)
    function selectFont(fontName) {
        changeFont(fontName, true);
    }

    // Font dropdown event listeners - Optimized version
    domElements.fontSelectDropdown.addEventListener('click', function (e) {
        const fontOption = e.target.closest('.font-option');
        if (fontOption) {
            const fontName = fontOption.getAttribute('data-font');

            // Use requestAnimationFrame to defer non-critical updates
            requestAnimationFrame(() => {
                selectedFontIndex = Array.from(fontOptions).findIndex(option =>
                    option.getAttribute('data-font') === fontName
                );
                updateFontSelection();
                selectFont(fontName);
                closeFontDropdown();
            });
        }
    });

    // Arrow key navigation for fonts
    document.addEventListener('keydown', function (e) {
        if (domElements.fontSelectDropdown.classList.contains('show')) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedFontIndex = Math.max(selectedFontIndex - 1, 0);
                updateFontSelection();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedFontIndex = Math.min(selectedFontIndex + 1, fontOptions.length - 1);
                updateFontSelection();
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedFontIndex >= 0) {
                    const selectedOption = fontOptions[selectedFontIndex];
                    const selectedFont = selectedOption.getAttribute('data-font');
                    selectFont(selectedFont);
                    closeFontDropdown();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                // Only close font dropdown if notepad is not open
                // If notepad is open, let the global ESC handler deal with it
                if (!domElements.notepadModal.classList.contains('active')) {
                    closeFontDropdown();
                }
            }
        } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !domElements.notepadModal.classList.contains('active')) {
            e.preventDefault();

            // Get current font and available fonts
            const currentFont = document.documentElement.getAttribute('data-font');
            const fontOptions = domElements.fontSelectDropdown.querySelectorAll('.font-option');
            const fontValues = Array.from(fontOptions).map(option => option.getAttribute('data-font'));
            const currentIndex = fontValues.indexOf(currentFont);

            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : fontValues.length - 1;
            } else {
                newIndex = currentIndex < fontValues.length - 1 ? currentIndex + 1 : 0;
            }

            const newFont = fontValues[newIndex];
            selectFont(newFont);
        }
    });

    function updateThemeIcon(theme) {
        if (!window.domElements || !window.domElements.themeToggle) return;

        const icon = window.domElements.themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            window.domElements.themeToggle.title = 'Switch to Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            window.domElements.themeToggle.title = 'Switch to Dark Mode';
        }
    }

    // Sidebar Modal functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarModal = document.getElementById('sidebar-modal');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const searchInput = document.getElementById('search-input');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function () {
        // Populate TOC first, then show sidebar to prevent flicker
        populateTableOfContents();
        sidebarModal.classList.add('active');
    });

    // Close sidebar
    function closeSidebar() {
        sidebarModal.classList.remove('active');
    }

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);


    // Populate table of contents
    function populateTableOfContents() {
        const tocContainer = document.querySelector('.toc-content-container');
        if (!tocContainer) return;

        const verbSections = document.querySelectorAll('.verb-section');
        tocContainer.innerHTML = '';
        allTocItems = []; // Reset the array

        // Group verbs by category
        const verbsByCategory = {};

        verbSections.forEach((section, index) => {
            // Extract basic data from the section
            const semanticKey = section.getAttribute('data-semantic-key') || '';
            const georgian = section.getAttribute('data-full-georgian') || '';
            const category = section.getAttribute('data-category') || 'Unknown';
            const sectionId = section.id;

            // Extract description from the h2 element - clean up the text properly
            const h2Element = section.querySelector('h2');
            let description = '';
            if (h2Element) {
                // Get the text content and clean it up
                let fullText = h2Element.textContent;
                // Remove page number at the start
                fullText = fullText.replace(/^\d+\s*/, '');
                // Remove Georgian text and the dash
                fullText = fullText.replace(/^[^\s-]*\s*-\s*/, '');
                // Remove "↑ ToC" and "🔗" at the end
                fullText = fullText.replace(/\s*↑\s*ToC\s*🔗\s*$/, '');
                fullText = fullText.replace(/\s*🔗\s*$/, '');
                description = fullText.trim();
            }



            // Group by category
            if (!verbsByCategory[category]) {
                verbsByCategory[category] = [];
            }

            verbsByCategory[category].push({
                section,
                semanticKey,
                georgian,
                category,
                description,
                sectionId
            });
        });

        // Create organized TOC with category headers
        Object.keys(verbsByCategory).sort().forEach(category => {
            const categoryVerbs = verbsByCategory[category];

            // Add category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'toc-category-header';
            categoryHeader.innerHTML = `<h3>${category}</h3>`;
            tocContainer.appendChild(categoryHeader);

            // Create toc-list for this category's items
            const tocList = document.createElement('div');
            tocList.className = 'toc-list';

            // Add verbs in this category
            categoryVerbs.forEach((verb, verbIndex) => {
                const tocItem = document.createElement('div');
                tocItem.className = 'toc-item';
                tocItem.setAttribute('data-semantic-key', verb.semanticKey);
                tocItem.setAttribute('data-category', verb.category);
                tocItem.innerHTML = `
                    <div class="verb-georgian">${verb.georgian}</div>
                    <div class="verb-description">${verb.description}</div>
                `;



                tocItem.addEventListener('click', function () {
                    // Remove active class from all items
                    document.querySelectorAll('.toc-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Add active class to clicked item
                    tocItem.classList.add('active');

                    // Navigate directly to the section
                    if (verb.section) {
                        // Ensure category is expanded
                        const categoryContainer = findCategoryContainer(verb.category);
                        if (categoryContainer) {
                            expandCategoryIfCollapsed(categoryContainer);
                        }

                        // Close sidebar first
                        closeSidebar();

                        // Navigate to verb after a brief delay
                        setTimeout(() => {
                            navigateToVerbSection(verb.section, verb.section.id, verb.georgian);
                        }, 100);
                    } else {
                        showNotification(`Verb "${verb.georgian}" not found`, 'error');
                    }
                });

                tocList.appendChild(tocItem);
                allTocItems.push(tocItem);
            });

            // Append the toc-list to the container
            tocContainer.appendChild(tocList);
        });

        // Initialize filtered items
        filteredItems = [...allTocItems];
        currentSearchIndex = 0;
        updateSearchSelection();

        // Set the first item as active by default (only if no item is already active)
        const firstItem = tocContainer.querySelector('.toc-item');
        const hasActiveItem = tocContainer.querySelector('.toc-item.active');
        if (firstItem && !hasActiveItem) {
            firstItem.classList.add('active');
        }


    }

    // Highlight current section in TOC
    function updateActiveTocItem() {
        const verbSections = document.querySelectorAll('.verb-section');
        const tocItems = document.querySelectorAll('.toc-item');

        // Cache scroll position and viewport height
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const offset = 100;

        let activeIndex = -1;
        let minDistance = Infinity;

        // Use intersection detection
        for (let i = 0; i < verbSections.length; i++) {
            const section = verbSections[i];
            const rect = section.getBoundingClientRect();

            // Check if section is in viewport with offset
            if (rect.top <= offset && rect.bottom >= offset) {
                // Find the section closest to the offset point
                const distance = Math.abs(rect.top - offset);
                if (distance < minDistance) {
                    minDistance = distance;
                    activeIndex = i;
                }
            }
        }

        // Batch DOM updates
        if (activeIndex !== -1) {
            tocItems.forEach((item, index) => {
                const shouldBeActive = index === activeIndex;
                if (item.classList.contains('active') !== shouldBeActive) {
                    item.classList.toggle('active', shouldBeActive);
                }
            });
        }
    }

    // Throttled scroll handler
    const throttledUpdateActiveTocItem = throttle(updateActiveTocItem, 16); // ~60fps
    window.addEventListener('scroll', throttledUpdateActiveTocItem);

    // Global keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        // Ctrl/Cmd + K to open search sidebar
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            sidebarModal.classList.add('active');
            populateTableOfContents();
            // Clear search input and reset filter
            searchInput.value = '';
            filterTableOfContents('');
            setTimeout(() => {
                searchInput.focus();
            }, 100);
        }

        // Shift + Alt + N to open notepad
        if (e.shiftKey && e.altKey && e.key === 'N') {
            e.preventDefault();
            notepadModal.classList.add('active');
            setTimeout(() => {
                notepadTextarea.focus();
                updateNotepadFont(); // Sync font when notepad opens
            }, 100);
        }

        // Handle arrow keys when sidebar is open
        if (sidebarModal.classList.contains('active')) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (filteredItems.length > 0) {
                    currentSearchIndex = Math.min(currentSearchIndex + 1, filteredItems.length - 1);
                    updateSearchSelection();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (filteredItems.length > 0) {
                    currentSearchIndex = Math.max(currentSearchIndex - 1, 0);
                    updateSearchSelection();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (currentSearchIndex >= 0 && currentSearchIndex < filteredItems.length) {
                    // Trigger click on selected item
                    filteredItems[currentSearchIndex].click();
                }
            }
        }

        // ESC key to close sidebar, font dropdown, filter modal, or notepad (in priority order)
        if (e.key === 'Escape') {
            const sidebarOpen = domElements.sidebarModal.classList.contains('active');
            const fontDropdownOpen = domElements.fontSelectDropdown.classList.contains('show');
            const filterOpen = domElements.filterModal.classList.contains('active');
            const notepadOpen = domElements.notepadModal.classList.contains('active');

            if (sidebarOpen) {
                closeSidebar();
            } else if (fontDropdownOpen) {
                closeFontDropdown();
            } else if (filterOpen) {
                closeFilterModal();
            } else if (notepadOpen) {
                closeNotepad();
            }
        }
    });

    // Close font dropdown when clicking outside
    document.addEventListener('click', function (e) {
        const notepadToggle = document.getElementById('notepad-toggle');
        if (!domElements.fontSelectButton.contains(e.target) && !domElements.fontSelectDropdown.contains(e.target) && !notepadToggle.contains(e.target)) {
            closeFontDropdown();
        }
    });

    // Search functionality
    let allTocItems = [];
    let currentSearchIndex = -1;
    let filteredItems = [];
    let sidebarCategoryFilter = null;

    // Enhanced URL management and navigation functions
    function updateURLWithAnchor(anchor) {
        try {
            const newUrl = `${window.location.pathname}#${encodeURIComponent(anchor)}`;
            window.history.pushState({}, '', newUrl);
        } catch (error) {
            // Silent fail for URL updates
        }
    }

    // Make updateURLWithAnchor globally available
    window.updateURLWithAnchor = updateURLWithAnchor;

    // Find category container by category name
    function findCategoryContainer(category) {
        return document.querySelector(`.category-container[data-category="${category}"]`);
    }

    // Expand category if it's collapsed
    function expandCategoryIfCollapsed(categoryContainer) {
        const content = categoryContainer.querySelector('.category-content');
        const header = categoryContainer.querySelector('.collapsible-header');

        if (content && content.classList.contains('collapsed')) {
            // Expand the category
            content.classList.remove('collapsed');
            header.classList.remove('collapsed');

            // Update session storage
            const category = categoryContainer.getAttribute('data-category');
        }
    }

    // Navigate to verb section with proper positioning
    function navigateToVerbSection(verbSection, primaryVerb, fullGeorgian) {
        if (!verbSection) {
            showNotification(`Verb "${fullGeorgian}" not found`, 'error');
            return false;
        }

        // Check if this is a multi-preverb verb and load data immediately if needed
        if (verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            const verbId = verbSection.dataset.verbId;
            if (verbId && window.verbDataManager) {
                window.verbDataManager.loadVerbDataImmediately(verbId);
            }
        }

        // Calculate proper offset accounting for sticky header
        const stickyHeaderHeight = 80; // Adjust based on actual header height
        const rect = verbSection.getBoundingClientRect();
        const targetPosition = window.scrollY + rect.top - stickyHeaderHeight;

        // Update URL with primary verb
        updateURLWithAnchor(primaryVerb);

        // Navigate instantly
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });

        return true;
    }

    // Category state management functions

    function loadCategoryState(category) {
        return 'expanded';
    }

    function handleURLAnchor() {
        const hash = window.location.hash;

        if (hash && hash.startsWith('#')) {
            const primaryVerb = decodeURIComponent(hash.substring(1)); // Remove the # symbol
            scrollToVerb(primaryVerb);

            // Check if we need to load multi-preverb verb data immediately
            if (window.verbDataManager) {
                window.verbDataManager.checkForImmediateLoading();
            }
        }
    }

    function scrollToVerb(primaryVerb) {
        const verbSection = safeGetElementById(primaryVerb);
        if (verbSection) {
            // Use the same working scroll calculation as the search sidebar navigation
            const stickyHeaderHeight = 80; // Adjust based on actual header height
            const rect = verbSection.getBoundingClientRect();
            const targetPosition = window.scrollY + rect.top - stickyHeaderHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'auto'
            });
        }
    }

    // Clipboard functions with fallback support
    function fallbackCopyToClipboard(text) {
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
            if (successful) {
                showNotification('Link copied to clipboard!', 'success');
            } else {
                showNotification('Failed to copy link', 'error');
            }
        } catch (err) {
            showNotification('Failed to copy link', 'error');
        }

        document.body.removeChild(textArea);
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Link copied to clipboard!', 'success');
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    // Make copyToClipboard globally available
    window.copyToClipboard = copyToClipboard;

    function showNotification(message, type = 'success') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create new notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 3000);
    }

    // Search and filter function - Optimized version
    function filterTableOfContents(searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const selectedCategory = sidebarCategoryFilter ? sidebarCategoryFilter.value : 'all';
        let visibleCount = 0;
        filteredItems = [];

        // Get all items including category headers
        const tocContainer = document.querySelector('.toc-content-container');
        if (!tocContainer) return;

        const allItems = tocContainer.querySelectorAll('.toc-item, .category-header, .toc-category-header');

        // Track which categories have visible verbs
        const categoriesWithVisibleVerbs = new Set();

        // Use requestAnimationFrame to batch DOM updates
        requestAnimationFrame(() => {
            // First pass: process verb items and track visible categories
            allItems.forEach(item => {
                if (!item.classList.contains('category-header') && !item.classList.contains('toc-category-header')) {
                    // Handle verb items
                    const georgianText = item.querySelector('.verb-georgian')?.textContent || '';
                    const descriptionText = item.querySelector('.verb-description')?.textContent || '';
                    const classText = item.querySelector('.verb-class')?.textContent || '';

                    const searchableText = `${georgianText} ${descriptionText} ${classText}`.toLowerCase();

                    // Check if item matches search term
                    const matchesSearch = searchTerm === '' || searchableText.includes(searchLower);

                    // Check if item matches category filter - get category from data attribute
                    const itemCategory = item.getAttribute('data-category') || '';
                    const matchesCategory = selectedCategory === 'all' || itemCategory === selectedCategory;

                    if (matchesSearch && matchesCategory) {
                        item.classList.remove('hidden');
                        visibleCount++;
                        filteredItems.push(item);
                        categoriesWithVisibleVerbs.add(itemCategory);

                        // Highlight matching text if search term is not empty
                        if (searchTerm !== '') {
                            item.classList.add('highlighted');
                        } else {
                            item.classList.remove('highlighted');
                        }
                    } else {
                        item.classList.add('hidden');
                        item.classList.remove('highlighted');
                    }
                }
            });

            // Second pass: process category headers
            allItems.forEach(item => {
                if (item.classList.contains('category-header') || item.classList.contains('toc-category-header')) {
                    const categoryName = item.textContent.trim();
                    const shouldShowCategory = selectedCategory === 'all' || categoryName === selectedCategory;

                    // Hide category header if no verbs are visible in this category
                    const hasVisibleVerbs = categoriesWithVisibleVerbs.has(categoryName);

                    // Hide all category headers if there are no visible verbs at all
                    if (visibleCount === 0) {
                        item.classList.add('hidden');
                    } else if (shouldShowCategory && hasVisibleVerbs) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });

            // If search is empty and no category filter, show all items for navigation
            if (searchTerm === '' && selectedCategory === 'all') {
                filteredItems = [...allTocItems];
            }

            // Set initial search index if there are results
            if (visibleCount > 0) {
                currentSearchIndex = 0;
            } else {
                currentSearchIndex = -1;
            }
            updateSearchSelection();

            // Show/hide no results message
            const noResultsMsg = document.getElementById('no-results-message');
            if (visibleCount === 0 && (searchTerm !== '' || selectedCategory !== 'all')) {
                if (!noResultsMsg) {
                    const msg = document.createElement('div');
                    msg.id = 'no-results-message';
                    msg.className = 'no-results';
                    msg.textContent = 'No verbs found matching your criteria.';
                    tocContainer.appendChild(msg);
                }
            } else {
                if (noResultsMsg) {
                    noResultsMsg.remove();
                }
            }
        });
    }

    // Update search selection highlighting
    function updateSearchSelection() {
        document.querySelectorAll('.toc-item').forEach(item => {
            item.classList.remove('search-selected');
        });

        // Add selection to current item
        if (currentSearchIndex >= 0 && currentSearchIndex < filteredItems.length) {
            filteredItems[currentSearchIndex].classList.add('search-selected');
            // Scroll to selected item
            filteredItems[currentSearchIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }

    // Sidebar category filter
    sidebarCategoryFilter = document.getElementById('sidebar-category-filter');

    // Sidebar category filter event listener - Optimized with debouncing
    sidebarCategoryFilter.addEventListener('change', function () {
        debouncedSearch(searchInput.value);
    });

    // Debounced search function for better performance
    let searchTimeout;
    function debouncedSearch(value) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            filterTableOfContents(value);
        }, 150); // 150ms delay
    }

    // Search input event listener - Optimized with debouncing
    searchInput.addEventListener('input', function () {
        debouncedSearch(this.value);
    });

    // Clear search when sidebar is opened
    sidebarToggle.addEventListener('click', function () {
        setTimeout(() => {
            searchInput.value = '';
            if (sidebarCategoryFilter) {
                sidebarCategoryFilter.value = 'all';
            }
            searchInput.focus();
            filterTableOfContents('');
        }, 100);
    });

    // Handle search input keyboard shortcuts
    searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            this.value = '';
            filterTableOfContents('');
            this.blur();
            currentSearchIndex = -1;
            updateSearchSelection();
        }
    });

    // Filter functionality
    const filterToggle = document.getElementById('filter-toggle');
    const filterModal = document.getElementById('filter-modal');
    const filterOverlay = document.getElementById('filter-overlay');
    const filterClose = document.getElementById('filter-close');
    const groupBySelect = document.getElementById('group-by-select');
    const categorySelect = document.getElementById('category-select');
    const classSelect = document.getElementById('class-select');
    const categoryFilterGroup = document.getElementById('category-filter-group');
    const classFilterGroup = document.getElementById('class-filter-group');

    // Toggle filter modal
    filterToggle.addEventListener('click', function () {
        filterModal.classList.add('active');
    });

    // Close filter modal
    function closeFilterModal() {
        filterModal.classList.remove('active');
    }

    filterClose.addEventListener('click', closeFilterModal);
    filterOverlay.addEventListener('click', closeFilterModal);

    // Handle filter changes
    groupBySelect.addEventListener('change', function () {
        const selectedValue = this.value;

        // Hide all filter groups
        categoryFilterGroup.style.display = 'none';
        classFilterGroup.style.display = 'none';

        // Show relevant filter group
        if (selectedValue === 'category') {
            categoryFilterGroup.style.display = 'block';
        } else if (selectedValue === 'class') {
            classFilterGroup.style.display = 'block';
        }

        // Apply filtering
        applyFilters();
    });

    categorySelect.addEventListener('change', applyFilters);
    classSelect.addEventListener('change', applyFilters);

    // Apply filters to content - Optimized version
    function applyFilters() {
        const groupBy = groupBySelect.value;
        const categoryFilter = categorySelect.value;
        const classFilter = classSelect.value;

        // Check if any filter is active
        const isFilterActive = (groupBy === 'category' && categoryFilter !== 'all') ||
            (groupBy === 'class' && classFilter !== 'all');

        // Update filter button appearance
        const filterToggle = document.getElementById('filter-toggle');
        if (isFilterActive) {
            filterToggle.classList.add('filter-active');
            const icon = filterToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-filter';
                icon.style.color = 'var(--filter-active-text)';
            }
        } else {
            filterToggle.classList.remove('filter-active');
            const icon = filterToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-filter';
                icon.style.color = '';
            }
        }

        // Use requestAnimationFrame to batch all DOM updates
        requestAnimationFrame(() => {
            // Cache DOM queries
            const verbSections = document.querySelectorAll('.verb-section');
            const categoryContainers = document.querySelectorAll('.category-container');

            // Track visible categories for efficient container updates
            const visibleCategories = new Set();

            // First pass: filter verb sections
            verbSections.forEach(section => {
                const category = section.getAttribute('data-category');
                const verbClass = section.getAttribute('data-class');

                let shouldShow = true;

                // Apply category filter
                if (groupBy === 'category' && categoryFilter !== 'all') {
                    shouldShow = category === categoryFilter;
                }

                // Apply class filter
                if (groupBy === 'class' && classFilter !== 'all') {
                    shouldShow = verbClass === classFilter;
                }

                // Update visibility
                section.style.display = shouldShow ? 'block' : 'none';

                if (shouldShow) {
                    visibleCategories.add(category);
                }
            });

            // Second pass: update category containers efficiently
            categoryContainers.forEach(container => {
                const category = container.getAttribute('data-category');
                const hasVisibleVerbs = visibleCategories.has(category);

                if (hasVisibleVerbs) {
                    container.style.display = 'block';
                    const content = container.querySelector('.category-content');
                    const header = container.querySelector('.collapsible-header');
                    if (content && header) {
                        content.classList.remove('collapsed');
                        header.classList.remove('collapsed');
                    }
                } else {
                    container.style.display = 'none';
                }
            });

            // Scroll to category header if filter is applied
            if (isFilterActive) {
                requestAnimationFrame(() => {
                    scrollToCategoryHeader(groupBy, groupBy === 'category' ? categoryFilter : classFilter);
                });
            }
        });
    }


    // Scroll to category header when filter is applied
    function scrollToCategoryHeader(groupBy, filterValue) {
        let targetHeader = null;

        if (groupBy === 'category') {
            // Find the category header
            const categoryHeaders = document.querySelectorAll('.main-category-header');

            for (const header of categoryHeaders) {
                const headerText = header.textContent.trim();
                if (headerText === filterValue) {
                    targetHeader = header;
                    break;
                }
            }
        } else if (groupBy === 'class') {
            // For class filtering, find the first verb section with that class
            const verbSections = document.querySelectorAll('.verb-section');

            for (const section of verbSections) {
                const verbClass = section.getAttribute('data-class');
                if (verbClass === filterValue) {
                    // Find the category header for this section
                    const category = section.getAttribute('data-category');

                    const categoryHeaders = document.querySelectorAll('.main-category-header');
                    for (const header of categoryHeaders) {
                        if (header.textContent.trim() === category) {
                            targetHeader = header;
                            break;
                        }
                    }
                    break;
                }
            }
        }

        // Scroll to the target header
        if (targetHeader) {
            // Add a small offset to account for fixed header elements
            const offset = 80;
            const targetPosition = targetHeader.offsetTop - offset;

            // Use requestAnimationFrame for smooth scrolling
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        } else {
            // If no header found, scroll to top
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Notepad functionality
    const notepadToggle = document.getElementById('notepad-toggle');
    const notepadModal = document.getElementById('notepad-modal');
    const notepadOverlay = document.getElementById('notepad-overlay');
    const notepadClose = document.getElementById('notepad-close');
    const notepadTextarea = document.getElementById('notepad-textarea');
    const fontSizeSelect = document.getElementById('font-size-select');

    // Load saved notepad content
    const savedNotepadContent = localStorage.getItem('notepadContent') || '';
    const savedFontSize = localStorage.getItem('notepadFontSize') || '16';

    notepadTextarea.value = savedNotepadContent;
    fontSizeSelect.value = savedFontSize;
    notepadTextarea.style.fontSize = savedFontSize + 'px';

    // Toggle notepad
    notepadToggle.addEventListener('click', function () {
        notepadModal.classList.add('active');
        setTimeout(() => {
            notepadTextarea.focus();
            updateNotepadFont(); // Sync font when notepad opens
        }, 100);
    });

    // Close notepad
    function closeNotepad() {
        notepadModal.classList.remove('active');
    }

    notepadClose.addEventListener('click', closeNotepad);
    notepadOverlay.addEventListener('click', closeNotepad);

    // Save notepad content on input
    notepadTextarea.addEventListener('input', function () {
        localStorage.setItem('notepadContent', this.value);
    });

    // Handle font size change
    fontSizeSelect.addEventListener('change', function () {
        const fontSize = this.value;
        notepadTextarea.style.fontSize = fontSize + 'px';
        localStorage.setItem('notepadFontSize', fontSize);
    });

    // Apply current website font to notepad
    function updateNotepadFont() {
        const currentFont = document.documentElement.getAttribute('data-font');
        // Set the data-font attribute on the notepad modal so CSS can target it
        notepadModal.setAttribute('data-font', currentFont);
    }

    // Initialize notepad font
    updateNotepadFont();

    // Help modal functionality
    const helpToggle = document.getElementById('help-toggle');
    const helpModal = document.getElementById('help-modal');
    const helpOverlay = document.getElementById('help-overlay');
    const helpClose = document.getElementById('help-close');

    // Toggle help modal
    helpToggle.addEventListener('click', function () {
        helpModal.classList.add('active');
    });

    // Close help modal
    function closeHelp() {
        helpModal.classList.remove('active');
    }

    helpClose.addEventListener('click', closeHelp);
    helpOverlay.addEventListener('click', closeHelp);

    // Close help modal with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (helpModal.classList.contains('active')) {
                closeHelp();
            }
        }
    });

    // Initialize verb data manager and preverb toggle functionality
    const verbDataManager = new VerbDataManager();
    const preverbManager = new PreverbManager(verbDataManager);

    // Make verbDataManager globally available for anchor navigation
    window.verbDataManager = verbDataManager;

    // Initialize verb sections with external data
    setTimeout(() => {
        verbDataManager.initializeVerbSections().catch(error => {
            // Silent fail for background loading
        });
    }, 500);

    // Defer heavy initialization functions
    setTimeout(() => {
        initializeCollapsibleHeaders();
        initializeStickyHeaders();
    }, 100);

    // Reset functionality
    const resetToggle = document.getElementById('reset-toggle');

    resetToggle.addEventListener('click', function () {
        // Show confirmation dialog
        if (confirm('Reset to default state? This will clear all filters and remove any anchor links from the URL.')) {
            resetToDefaultState();
        }
    });

    // Function to reset to default state - Optimized version
    function resetToDefaultState() {
        // Clear all filters
        if (groupBySelect) {
            groupBySelect.value = 'category';
        }
        if (categorySelect) {
            categorySelect.value = 'all';
        }
        if (classSelect) {
            classSelect.value = 'all';
        }

        // Reset sidebar filters
        if (sidebarCategoryFilter) {
            sidebarCategoryFilter.value = 'all';
        }

        // Clear search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.value = '';
        }

        // Use requestAnimationFrame to batch all DOM updates
        requestAnimationFrame(() => {
            // Apply filters to reset everything
            applyFilters();

            // Clear table of contents filter
            filterTableOfContents('');

            // Remove anchor from URL without triggering page reload
            if (window.history && window.history.replaceState) {
                window.history.replaceState(null, null, window.location.pathname);
            }

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Show success notification
            showNotification('Page reset to default state', 'success');
        });
    }

    // Defer URL handling and event listeners
    setTimeout(() => {
        handleURLAnchor();

        const linkIcons = document.querySelectorAll('.verb-link-icon');
        linkIcons.forEach(icon => {
            icon.addEventListener('click', function (e) {
                e.preventDefault();
                const georgianVerb = this.getAttribute('data-verb-georgian');
                handleLinkIconClick(georgianVerb);
            });
        });
    }, 200);

    // Listen for browser back/forward navigation
    window.addEventListener('popstate', handleURLAnchor);

    // Enhanced category management functions
    function expandCategory(header, content, category) {
        content.classList.remove('collapsed');
        header.classList.remove('collapsed');
    }

    function collapseCategoryWithSmartScroll(header, content, category) {
        // Collapse the category
        content.classList.add('collapsed');
        header.classList.add('collapsed');

        // Scroll to the top of the collapsed header
        const headerTop = header.offsetTop;
        const stickyHeaderHeight = 80;
        const targetPosition = headerTop - stickyHeaderHeight;

        // Scroll to show the collapsed header at the top
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });
    }


}); // Close DOMContentLoaded function

/**
 * Initialize sticky header functionality
 */
function initializeStickyHeaders() {
    const headers = document.querySelectorAll('.main-category-header');
    let currentStickyHeader = null;

    function updateStickyHeader() {
        const scrollTop = window.scrollY;
        const offset = 100; // Offset for floating controls

        // Find which header should be sticky
        let newStickyHeader = null;

        headers.forEach(header => {
            const rect = header.getBoundingClientRect();
            const container = header.closest('.category-container');

            // Check if this header should be sticky (when it reaches the top)
            if (rect.top <= offset && rect.bottom > offset) {
                newStickyHeader = header;
            }
        });

        // Update sticky state
        headers.forEach(header => {
            header.classList.remove('sticky-active');
        });

        if (newStickyHeader && newStickyHeader !== currentStickyHeader) {
            newStickyHeader.classList.add('sticky-active');
            currentStickyHeader = newStickyHeader;
        }
    }

    // Update on scroll with throttling
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateStickyHeader();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Use throttled scroll handler
    const throttledRequestTick = throttle(requestTick, 16); // ~60fps
    window.addEventListener('scroll', throttledRequestTick);

    // Initial update
    updateStickyHeader();
}

/**
 * Initialize collapsible category headers
 */
function initializeCollapsibleHeaders() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            const content = document.querySelector(`.category-content[data-category="${category}"]`);

            if (content) {
                const isCollapsed = content.classList.contains('collapsed');

                if (isCollapsed) {
                    // Expand
                    content.classList.remove('collapsed');
                    this.classList.remove('collapsed');
                } else {
                    // Collapse with scroll
                    content.classList.add('collapsed');
                    this.classList.add('collapsed');

                    // Use requestAnimationFrame for smooth scrolling
                    requestAnimationFrame(() => {
                        const categoryContainer = this.closest('.category-container');
                        const containerTop = categoryContainer ? categoryContainer.offsetTop : this.offsetTop;
                        const stickyHeaderHeight = 0;
                        const targetPosition = containerTop - stickyHeaderHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    });
                }
            }
        });
    });
}

/**
 * VerbDataManager - Handles loading and caching of external verb data
 * 
 * This class manages the loading of verb data from external JSON files
 * and provides a unified interface for accessing verb information.
 * Now includes lazy loading for multi-preverb verbs.
 */
class VerbDataManager {
    constructor() {
        this.coreData = null;
        this.conjugations = null;
        this.examples = null;
        this.glossData = null;
        this.preverbConfigs = null;
        this.loadingPromises = {};
        this.isInitialized = false;

        // Lazy loading infrastructure
        this.loadedVerbs = new Set();
        this.loadingVerbs = new Set();
        this.verbCache = new Map();
        this.intersectionObserver = null;
        this.retryAttempts = new Map();
        this.maxRetries = 3;

        // Initialize intersection observer for lazy loading
        this.initializeIntersectionObserver();
    }

    // Initialize intersection observer for lazy loading
    initializeIntersectionObserver() {
        if (!window.IntersectionObserver) {
            // Fallback for older browsers - load all data immediately
            this.loadAllDataImmediately();
            return;
        }

        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const verbSection = entry.target;
                        const verbId = verbSection.dataset.verbId;

                        if (verbId && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
                            this.loadVerbDataLazily(verbId, verbSection);
                        }
                    }
                });
            },
            {
                rootMargin: '100px', // Start loading 100px before the element comes into view
                threshold: 0.1
            }
        );
    }

    // Load all data immediately (fallback for older browsers)
    async loadAllDataImmediately() {
        try {
            await this.preloadAllData();
            this.initializeVerbSections();
        } catch (error) {
            // Silent fail for background loading
        }
    }

    // Lazy load data for a specific verb
    async loadVerbDataLazily(verbId, verbSection) {
        // Skip if already loaded or loading
        if (this.loadedVerbs.has(verbId) || this.loadingVerbs.has(verbId)) {
            return;
        }

        this.loadingVerbs.add(verbId);

        try {
            const verbData = await this.getVerbData(verbId);
            if (verbData) {
                await this.populateVerbSection(verbSection, verbData);
                verbSection.dataset.dataLoaded = 'true';
                this.loadedVerbs.add(verbId);
                this.verbCache.set(verbId, verbData);
            }
        } catch (error) {
            this.handleLoadError(verbId, verbSection, error);
        } finally {
            this.loadingVerbs.delete(verbId);
        }
    }

    // Handle loading errors with retry logic
    handleLoadError(verbId, verbSection, error) {
        const attempts = this.retryAttempts.get(verbId) || 0;

        if (attempts < this.maxRetries) {
            this.retryAttempts.set(verbId, attempts + 1);

            // Exponential backoff retry
            const delay = Math.pow(2, attempts) * 1000;
            setTimeout(() => {
                this.loadingVerbs.delete(verbId);
                this.loadVerbDataLazily(verbId, verbSection);
            }, delay);
        } else {
            // Max retries reached, show error state
            this.showErrorState(verbSection);
            this.retryAttempts.delete(verbId);
        }
    }

    // Start observing multi-preverb verb sections
    startObservingVerbSections() {
        const multiPreverbSections = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"]');

        multiPreverbSections.forEach(section => {
            this.intersectionObserver.observe(section);
        });
    }

    // Stop observing a specific section (after data is loaded)
    stopObservingSection(verbSection) {
        if (this.intersectionObserver) {
            this.intersectionObserver.unobserve(verbSection);
        }
    }

    // Clean up resources when needed
    cleanup() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }

        // Clear caches
        this.verbCache.clear();
        this.loadedVerbs.clear();
        this.loadingVerbs.clear();
        this.retryAttempts.clear();
    }

    // Get cache statistics for debugging
    getCacheStats() {
        return {
            loadedVerbs: this.loadedVerbs.size,
            cachedVerbs: this.verbCache.size,
            loadingVerbs: this.loadingVerbs.size,
            retryAttempts: this.retryAttempts.size
        };
    }

    // Clear cache for a specific verb (useful for testing or data updates)
    clearVerbCache(verbId) {
        this.verbCache.delete(verbId);
        this.loadedVerbs.delete(verbId);
        this.loadingVerbs.delete(verbId);
        this.retryAttempts.delete(verbId);
    }

    // Load verb data immediately (for direct navigation)
    async loadVerbDataImmediately(verbId) {
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            await this.loadVerbDataLazily(verbId, verbSection);
        }
    }

    // Check if a verb section needs immediate loading (for anchor navigation)
    checkForImmediateLoading() {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#')) {
            const anchorId = decodeURIComponent(hash.substring(1));
            const targetSection = document.getElementById(anchorId);

            if (targetSection && targetSection.getAttribute('data-has-multiple-preverbs') === 'true') {
                const verbId = targetSection.dataset.verbId;
                if (verbId) {
                    // Load immediately if it's a multi-preverb verb
                    this.loadVerbDataImmediately(verbId);
                }
            }
        }
    }

    // Enhanced getVerbData with caching
    async getVerbData(verbId) {
        // Check cache first
        if (this.verbCache.has(verbId)) {
            return this.verbCache.get(verbId);
        }

        // Check if this is a multi-preverb verb
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (!verbSection || verbSection.getAttribute('data-has-multiple-preverbs') !== 'true') {
            return null;
        }

        const [coreData, conjugations, examples, glossData, preverbConfigs] = await Promise.all([
            this.loadCoreData(),
            this.loadConjugations(),
            this.loadExamples(),
            this.loadGlossData(),
            this.loadPreverbConfigs()
        ]);

        const verbData = {
            core: coreData.verbs[verbId],
            conjugations: conjugations.conjugations[verbId],
            examples: examples.examples[verbId],
            glossAnalyses: glossData.gloss_analyses[verbId],
            preverbConfig: preverbConfigs.preverb_configs[verbId]
        };

        // Cache the result
        this.verbCache.set(verbId, verbData);
        return verbData;
    }

    async loadCoreData() {
        if (!this.coreData) {
            if (!this.loadingPromises.coreData) {
                this.loadingPromises.coreData = fetch('data/verbs-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load core data: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.coreData = await this.loadingPromises.coreData;
        }
        return this.coreData;
    }

    async loadConjugations() {
        if (!this.conjugations) {
            if (!this.loadingPromises.conjugations) {
                this.loadingPromises.conjugations = fetch('data/conjugations-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load conjugations: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.conjugations = await this.loadingPromises.conjugations;
        }
        return this.conjugations;
    }

    async loadExamples() {
        if (!this.examples) {
            if (!this.loadingPromises.examples) {
                this.loadingPromises.examples = fetch('data/examples-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load examples: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.examples = await this.loadingPromises.examples;
        }
        return this.examples;
    }

    async loadGlossData() {
        if (!this.glossData) {
            if (!this.loadingPromises.glossData) {
                this.loadingPromises.glossData = fetch('data/gloss-data.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load gloss data: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.glossData = await this.loadingPromises.glossData;
        }
        return this.glossData;
    }

    async loadPreverbConfigs() {
        if (!this.preverbConfigs) {
            if (!this.loadingPromises.preverbConfigs) {
                this.loadingPromises.preverbConfigs = fetch('data/preverb-config.json')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Failed to load preverb configs: ${response.status}`);
                        }
                        return response.json();
                    });
            }
            this.preverbConfigs = await this.loadingPromises.preverbConfigs;
        }
        return this.preverbConfigs;
    }

    // Enhanced preloadAllData for non-lazy loading scenarios
    async preloadAllData() {
        if (this.isInitialized) {
            return;
        }

        // Only preload data if there are multi-preverb verbs
        const multiPreverbSections = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"]');

        if (multiPreverbSections.length === 0) {
            this.isInitialized = true;
            return;
        }

        try {
            // Preload data files for multi-preverb verbs only
            await Promise.all([
                this.loadCoreData(),
                this.loadConjugations(),
                this.loadExamples(),
                this.loadGlossData(),
                this.loadPreverbConfigs()
            ]);
            this.isInitialized = true;
        } catch (error) {
            throw error;
        }
    }

    calculatePreverbForms(conjugations, preverbRules, targetPreverb) {
        if (!preverbRules) {
            return conjugations;
        }

        const defaultPreverb = preverbRules.default || "";
        const replacements = preverbRules.replacements || {};
        const tenseSpecificFallbacks = preverbRules.tense_specific_fallbacks || {};

        // Normalize preverb values by removing hyphens for comparison
        const normalizedTarget = targetPreverb.replace("-", "");
        const normalizedDefault = defaultPreverb.replace("-", "");

        // If target preverb is the same as default, return original forms
        if (normalizedTarget === normalizedDefault) {
            return conjugations;
        }

        // Get the actual replacement for this preverb (normalized)
        let replacement = replacements[normalizedTarget] || targetPreverb;

        // Check for tense-specific fallbacks
        if (tenseSpecificFallbacks[normalizedTarget]) {
            // Handle tense-specific fallbacks in the form calculation loop
        }

        const result = {};
        for (const [tense, tenseData] of Object.entries(conjugations)) {
            if (tenseData && typeof tenseData === 'object' && tenseData.forms) {
                const forms = tenseData.forms;
                const calculatedForms = {};

                // Check for tense-specific fallback
                let effectiveReplacement = replacement;
                if (tenseSpecificFallbacks[normalizedTarget] && tenseSpecificFallbacks[normalizedTarget][tense]) {
                    effectiveReplacement = tenseSpecificFallbacks[normalizedTarget][tense];
                }

                for (const [person, form] of Object.entries(forms)) {
                    if (form === "-" || form === "") {
                        calculatedForms[person] = form;
                    } else if (form.startsWith(defaultPreverb)) {
                        // Extract stem and apply new preverb
                        const stem = form.substring(defaultPreverb.length);
                        calculatedForms[person] = effectiveReplacement + stem;
                    } else {
                        // Handle irregular forms that don't follow prefix pattern
                        calculatedForms[person] = form;
                    }
                }

                result[tense] = {
                    ...tenseData,
                    forms: calculatedForms
                };
            }
        }

        return result;
    }

    // Enhanced initializeVerbSections with lazy loading
    async initializeVerbSections() {
        // Start observing multi-preverb verb sections for lazy loading
        this.startObservingVerbSections();

        // For non-multi-preverb verbs, no initialization needed as they're static
        const multiPreverbSections = document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"]');

        if (multiPreverbSections.length > 0) {
            // Process sections one by one with yields to prevent blocking
            await this.processVerbSectionsInChunks(multiPreverbSections);
        }
    }

    // Enhanced processVerbSectionsInChunks with lazy loading
    async processVerbSectionsInChunks(sections) {
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const verbId = section.dataset.verbId;

            if (verbId) {
                try {
                    // Yield control back to main thread every few sections
                    if (i > 0 && i % 3 === 0) {
                        await new Promise(resolve => setTimeout(resolve, 0));
                    }

                    // For lazy loading, we don't load data here - intersection observer will handle it
                    // Just ensure the section is being observed
                    if (this.intersectionObserver) {
                        this.intersectionObserver.observe(section);
                    }
                } catch (error) {
                    this.showErrorState(section);
                }
            }
        }
    }

    async populateVerbSection(section, verbData) {
        try {
            // Check if verbData is null (non-multi-preverb verb)
            if (!verbData) {
                return;
            }

            // Generate initial conjugation tables
            const defaultPreverb = verbData.core.default_preverb || 'მი';
            const conjugations = this.getConjugationsForPreverb(
                verbData.conjugations,
                verbData.preverbConfig,
                defaultPreverb
            );

            // Populate overview table
            const overviewContainer = section.querySelector('.table-container');
            if (overviewContainer) {
                overviewContainer.innerHTML = this.generateOverviewTable(conjugations);
            }

            // Populate each tense column
            const tenseColumns = section.querySelectorAll('.tense-column');
            tenseColumns.forEach(column => {
                const tense = column.dataset.tense;
                this.populateTenseColumn(column, tense, conjugations[tense], verbData, defaultPreverb);
            });
        } catch (error) {
            this.showErrorState(section);
        }
    }



    getConjugationsForPreverb(conjugations, preverbConfig, targetPreverb) {
        if (!preverbConfig) {
            return conjugations;
        }

        // Extract the preverb rules from the config
        const preverbRules = preverbConfig.preverb_rules || {};
        const defaultPreverb = preverbRules.default || "";
        const replacements = preverbRules.replacements || {};
        const tenseSpecificFallbacks = preverbRules.tense_specific_fallbacks || {};

        // Normalize preverb values by removing hyphens for comparison
        const normalizedTarget = targetPreverb.replace("-", "");
        const normalizedDefault = defaultPreverb.replace("-", "");

        // Check if this is a multi-preverb verb using the has_multiple_preverbs flag
        const isMultiPreverb = preverbConfig.preverb_config && preverbConfig.preverb_config.has_multiple_preverbs === true;

        if (isMultiPreverb) {
            // This is a multi-preverb verb, calculate the target preverb forms

            const preverbConjugations = {};
            for (const [tense, tenseData] of Object.entries(conjugations)) {
                if (tenseData && typeof tenseData === 'object' && tenseData.forms) {
                    // Calculate the preverb forms for this tense
                    const calculatedConjugations = this.calculatePreverbForms(
                        { [tense]: tenseData },
                        preverbRules,
                        targetPreverb
                    );

                    const calculatedForms = calculatedConjugations[tense]?.forms || tenseData.forms;

                    preverbConjugations[tense] = {
                        forms: calculatedForms,
                        gloss: tenseData.gloss || {},
                        examples: tenseData.examples || []
                    };
                }
            }

            return preverbConjugations;
        } else {
            // This is a single-preverb verb, return the original data as-is
            return conjugations;
        }
    }

    generateOverviewTable(conjugations) {
        const tenses = ["present", "imperfect", "future", "aorist", "optative", "imperative"];
        const tenseNames = {
            "present": "PRES", "imperfect": "IMPF", "future": "FUT",
            "aorist": "AOR", "optative": "OPT", "imperative": "IMPV"
        };

        let tableHtml = `
            <div class="table-container">
                <table class="meta-table">
                    <thead>
                        <tr>
                            <th>Screve</th><th>1sg</th><th>2sg</th><th>3sg</th>
                            <th>1pl</th><th>2pl</th><th>3pl</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        for (const tense of tenses) {
            const tenseData = conjugations[tense];
            const forms = tenseData?.forms || {};

            tableHtml += `
                <tr class="tense-${tense}">
                    <td>${tenseNames[tense]}</td>
                    <td class="georgian-text">${forms['1sg'] || '-'}</td>
                    <td class="georgian-text">${forms['2sg'] || '-'}</td>
                    <td class="georgian-text">${forms['3sg'] || '-'}</td>
                    <td class="georgian-text">${forms['1pl'] || '-'}</td>
                    <td class="georgian-text">${forms['2pl'] || '-'}</td>
                    <td class="georgian-text">${forms['3pl'] || '-'}</td>
                </tr>
            `;
        }

        tableHtml += `
                    </tbody>
                </table>
            </div>
        `;

        return tableHtml;
    }

    populateTenseColumn(column, tense, tenseData, verbData, selectedPreverb) {
        console.log(`[JS] populateTenseColumn: tense=${tense}, selectedPreverb=${selectedPreverb}`);

        const tenseNames = {
            "present": "Present Indicative",
            "imperfect": "Imperfect",
            "future": "Future",
            "aorist": "Aorist",
            "optative": "Optative",
            "imperative": "Affirmative Imperative"
        };

        // Get examples and gloss for this tense
        let examplesHtml = '';
        let glossHtml = '';

        // Check if this is a multi-preverb verb
        const isMultiPreverb = verbData.preverbConfig &&
            verbData.preverbConfig.preverb_config &&
            verbData.preverbConfig.preverb_config.has_multiple_preverbs === true;

        console.log(`[JS] isMultiPreverb: ${isMultiPreverb}`);

        if (isMultiPreverb) {
            // Multi-preverb verb: get examples for the specific preverb from external data
            const normalizedPreverb = selectedPreverb.replace('-', '');
            const preverbExamples = verbData.examples[normalizedPreverb] || {};
            const preverbGloss = verbData.glossAnalyses[normalizedPreverb] || {};

            console.log(`[JS] Multi-preverb data: examples=${!!preverbExamples[tense]}, gloss=${!!preverbGloss[tense]}`);
            console.log(`[JS] Preverb examples keys: ${Object.keys(preverbExamples)}`);
            console.log(`[JS] Preverb gloss keys: ${Object.keys(preverbGloss)}`);

            examplesHtml = this.generateExamplesHtmlForTense(preverbExamples[tense], normalizedPreverb);
            glossHtml = this.generateGlossHtmlForTense(preverbGloss[tense]);
        } else {
            // Single-preverb verb: examples are organized by tense
            const examples = verbData.examples || {};
            const glossAnalyses = verbData.glossAnalyses || {};

            console.log(`[JS] Single-preverb data: examples=${!!examples[tense]}, gloss=${!!glossAnalyses[tense]}`);

            examplesHtml = this.generateExamplesHtmlForTense(examples[tense]);
            glossHtml = this.generateGlossHtmlForTense(glossAnalyses[tense]);
        }

        console.log(`[JS] Generated HTML lengths: examples=${examplesHtml.length}, gloss=${glossHtml.length}`);
        if (glossHtml) {
            console.log(`[JS] Gloss HTML preview: ${glossHtml.substring(0, 200)}...`);
        }

        // Generate conjugation table for this tense
        const conjugationTableHtml = this.generateTenseConjugationTable(tense, tenseData);

        // Update the column content by replacing specific sections instead of the entire content
        this.updateColumnContent(column, tense, tenseNames[tense], conjugationTableHtml, examplesHtml, glossHtml);
    }

    updateColumnContent(column, tense, tenseDisplay, conjugationTableHtml, examplesHtml, glossHtml) {
        console.log(`[JS] updateColumnContent: tense=${tense}, examplesLength=${examplesHtml.length}, glossLength=${glossHtml.length}`);

        // First, ensure we have the basic structure
        if (!column.querySelector('h3')) {
            column.innerHTML = `<h3>${tenseDisplay}</h3>`;
        }

        // Update conjugation table
        const existingTable = column.querySelector('.table-container');
        if (existingTable) {
            existingTable.outerHTML = conjugationTableHtml;
        } else {
            // Insert after the h3
            const h3 = column.querySelector('h3');
            h3.insertAdjacentHTML('afterend', conjugationTableHtml);
        }

        // Update examples section
        const existingExamples = column.querySelector('.examples');
        if (examplesHtml) {
            if (existingExamples) {
                existingExamples.outerHTML = examplesHtml;
            } else {
                // Insert after conjugation table
                const tableContainer = column.querySelector('.table-container');
                if (tableContainer) {
                    tableContainer.insertAdjacentHTML('afterend', examplesHtml);
                }
            }
        } else if (existingExamples) {
            // Remove examples if no new ones provided
            existingExamples.remove();
        }

        // Update gloss section - this is the key fix
        // Find ALL existing gloss sections and remove them
        const existingGlossSections = column.querySelectorAll('.case-gloss');
        console.log(`[JS] Found ${existingGlossSections.length} existing gloss sections to replace`);

        if (glossHtml) {
            // Remove all existing gloss sections first
            existingGlossSections.forEach(glossSection => {
                console.log(`[JS] Removing existing gloss section`);
                glossSection.remove();
            });

            // Insert the new gloss section
            const examples = column.querySelector('.examples');
            const tableContainer = column.querySelector('.table-container');
            const insertAfter = examples || tableContainer;
            if (insertAfter) {
                insertAfter.insertAdjacentHTML('afterend', glossHtml);
                console.log(`[JS] Inserted new gloss section after ${insertAfter.className}`);
            }
        } else if (existingGlossSections.length > 0) {
            // Remove all gloss sections if no new one provided
            existingGlossSections.forEach(glossSection => {
                console.log(`[JS] Removing existing gloss section (no replacement)`);
                glossSection.remove();
            });
        }
    }

    generateTenseConjugationTable(tense, tenseData) {
        const forms = tenseData?.forms || {};

        // Check if any forms are available
        if (!forms || Object.keys(forms).length === 0) {
            return '<div class="table-container regular-table-container"><p>No conjugation data available</p></div>';
        }

        let tableHtml = `
            <div class="table-container regular-table-container">
                <table class="regular-table">
                    <thead>
                        <tr>
                            <th>Person</th>
                            <th>Singular</th>
                            <th>Plural</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Define person mappings
        const persons = [
            { name: "1st", sg: "1sg", pl: "1pl" },
            { name: "2nd", sg: "2sg", pl: "2pl" },
            { name: "3rd", sg: "3sg", pl: "3pl" }
        ];

        for (const person of persons) {
            tableHtml += `
                <tr>
                    <td>${person.name}</td>
                    <td class="georgian-text">${forms[person.sg] || '-'}</td>
                    <td class="georgian-text">${forms[person.pl] || '-'}</td>
                </tr>
            `;
        }

        tableHtml += `
                    </tbody>
                </table>
            </div>
        `;

        return tableHtml;
    }

    generateExamplesHtmlForTense(tenseExamples, preverb) {
        if (!tenseExamples || typeof tenseExamples !== 'string') {
            return '';
        }

        // External data always contains properly formatted HTML with headers
        return tenseExamples;
    }

    generateGlossHtmlForTense(tenseGloss) {
        if (!tenseGloss || typeof tenseGloss !== 'string') {
            return '';
        }

        // External data always contains properly formatted HTML with headers
        return tenseGloss;
    }









    showErrorState(section) {
        // Show error state for overview container
        const overviewContainer = section.querySelector('.table-container');
        if (overviewContainer) {
            overviewContainer.innerHTML = '<div class="error-indicator">Error loading overview table. Please refresh the page.</div>';
        }

        // Show error state for all tense columns
        const tenseColumns = section.querySelectorAll('.tense-column');
        tenseColumns.forEach(column => {
            const tense = column.dataset.tense;
            column.innerHTML = `<div class="error-indicator">Error loading ${tense} tense. Please refresh the page.</div>`;
        });
    }
}

/**
 * PreverbManager - Handles dynamic preverb switching for multi-preverb verbs
 * 
 * This class manages the interactive preverb selection system that allows users
 * to switch between different preverb forms of Georgian verbs (e.g., მი-, წა-, etc.)
 * and updates all related content (tables, examples) accordingly.
 * Now includes caching for improved performance with lazy loading.
 */
class PreverbManager {
    constructor(verbDataManager) {
        this.verbDataManager = verbDataManager;
        this.preverbFormCache = new Map(); // Cache calculated preverb forms
        this.initializePreverbToggles();
    }

    // Generate cache key for preverb forms
    generateCacheKey(verbId, preverb) {
        return `${verbId}-${preverb}`;
    }

    // Get cached preverb forms or calculate them
    getCachedPreverbForms(verbId, preverb, conjugations, preverbConfig) {
        const cacheKey = this.generateCacheKey(verbId, preverb);

        if (this.preverbFormCache.has(cacheKey)) {
            return this.preverbFormCache.get(cacheKey);
        }

        const calculatedForms = this.verbDataManager.getConjugationsForPreverb(
            conjugations,
            preverbConfig,
            preverb
        );

        // Cache the result
        this.preverbFormCache.set(cacheKey, calculatedForms);
        return calculatedForms;
    }

    // Clear cache for a specific verb (when data is reloaded)
    clearVerbCache(verbId) {
        const keysToDelete = [];
        for (const key of this.preverbFormCache.keys()) {
            if (key.startsWith(`${verbId}-`)) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => this.preverbFormCache.delete(key));
    }

    initializePreverbToggles() {
        // Only initialize preverb toggles for multi-preverb verbs
        document.querySelectorAll('.verb-section[data-has-multiple-preverbs="true"] .preverb-toggle').forEach(selector => {
            selector.addEventListener('change', (e) => {
                this.handlePreverbChange(e.target);
            });
        });
    }

    handlePreverbChange(selector) {
        const verbId = selector.dataset.verbId;
        const selectedPreverb = selector.value;
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);

        if (verbSection && verbSection.getAttribute('data-has-multiple-preverbs') === 'true') {
            // Update verb display asynchronously
            this.updateVerbDisplay(verbSection, selectedPreverb).catch(error => {
                this.verbDataManager.showErrorState(verbSection);
            });
        }
    }

    async updateVerbDisplay(verbSection, preverb) {
        const verbId = verbSection.dataset.verbId;

        try {
            // Get verb data from cache or external files
            let verbData = this.verbDataManager.verbCache.get(verbId);

            if (!verbData) {
                // If not in cache, load it (this should rarely happen with lazy loading)
                verbData = await this.verbDataManager.getVerbData(verbId);
            }

            if (!verbData) {
                return;
            }

            // Get conjugations for selected preverb (with caching)
            const conjugations = this.getCachedPreverbForms(
                verbId,
                preverb,
                verbData.conjugations,
                verbData.preverbConfig
            );

            // Update overview table
            const overviewContainer = verbSection.querySelector('.table-container');
            if (overviewContainer) {
                overviewContainer.innerHTML = this.verbDataManager.generateOverviewTable(conjugations);
            }

            // Update each tense column
            const tenseColumns = verbSection.querySelectorAll('.tense-column');
            tenseColumns.forEach(column => {
                const tense = column.dataset.tense;
                this.verbDataManager.populateTenseColumn(column, tense, conjugations[tense], verbData, preverb);
            });

        } catch (error) {
            this.verbDataManager.showErrorState(verbSection);
        }
    }

    calculatePreverbForms(conjugations, preverbRules, targetPreverb) {
        if (!preverbRules) {
            return conjugations;
        }

        const defaultPreverb = preverbRules.default || "";
        const replacements = preverbRules.replacements || {};
        const tenseSpecificFallbacks = preverbRules.tense_specific_fallbacks || {};

        // Normalize preverb values by removing hyphens for comparison
        const normalizedTarget = targetPreverb.replace("-", "");
        const normalizedDefault = defaultPreverb.replace("-", "");

        // If target preverb is the same as default, return original forms
        if (normalizedTarget === normalizedDefault) {
            return conjugations;
        }

        // Get the actual replacement for this preverb (normalized)
        let replacement = replacements[normalizedTarget] || targetPreverb;

        // Check for tense-specific fallbacks
        if (tenseSpecificFallbacks[normalizedTarget]) {
            // Handle tense-specific fallbacks in the form calculation loop
        }

        const result = {};
        for (const [tense, tenseData] of Object.entries(conjugations)) {
            if (tenseData && typeof tenseData === 'object' && tenseData.forms) {
                const forms = tenseData.forms;
                const calculatedForms = {};

                // Check for tense-specific fallback
                let effectiveReplacement = replacement;
                if (tenseSpecificFallbacks[normalizedTarget] && tenseSpecificFallbacks[normalizedTarget][tense]) {
                    effectiveReplacement = tenseSpecificFallbacks[normalizedTarget][tense];
                }

                for (const [person, form] of Object.entries(forms)) {
                    if (form === "-" || form === "") {
                        calculatedForms[person] = form;
                    } else if (form.startsWith(defaultPreverb)) {
                        // Extract stem and apply new preverb
                        const stem = form.substring(defaultPreverb.length);
                        calculatedForms[person] = effectiveReplacement + stem;
                    } else {
                        // Handle irregular forms that don't follow prefix pattern
                        calculatedForms[person] = form;
                    }
                }

                result[tense] = {
                    ...tenseData,
                    forms: calculatedForms
                };
            }
        }

        return result;
    }
























}

