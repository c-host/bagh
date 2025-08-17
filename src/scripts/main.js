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

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const fontSelectButton = document.getElementById('font-select');
    const fontSelectDropdown = document.getElementById('font-select-dropdown');

    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedFont = localStorage.getItem('font') || 'default';

    // Apply saved preferences (font is already set in head)
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Preload all fonts to prevent flicker
    async function preloadFonts() {
        const fontsToPreload = ['SonataNo5', 'NeueImpakt', 'k_gorga', 'k_grigol', 'k_kalig', 'k_lortki'];

        // Check if Font Loading API is available
        if (document.fonts && document.fonts.load) {
            for (const fontFamily of fontsToPreload) {
                try {
                    await document.fonts.load(`12px "${fontFamily}"`);
                } catch (error) {
                    // Font preloading failed, continue without it
                }
            }
        }
    }

    // Start preloading fonts in background
    preloadFonts().catch(() => {
        // Font preloading failed, continue without it
    });

    // Helper functions for dual ID system
    function safeGetElementById(id) {
        try {
            return document.getElementById(id);
        } catch (error) {
            console.error(`Error getting element by ID: ${id}`, error);
            return null;
        }
    }

    function getPrimaryVerb(georgianText) {
        if (!georgianText || georgianText === "N/A") {
            return "unknown";
        }
        return georgianText.split(" / ")[0].trim();
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
    themeToggle.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Font selector variables
    let selectedFontIndex = -1;
    let fontOptions = [];

    // Font selector button click event
    fontSelectButton.addEventListener('click', function () {
        const isVisible = fontSelectDropdown.classList.contains('show');

        if (isVisible) {
            closeFontDropdown();
        } else {
            openFontDropdown();
        }
    });

    // Open font dropdown
    function openFontDropdown() {
        // Get all font options
        fontOptions = fontSelectDropdown.querySelectorAll('.font-option');

        // Find current font index
        const currentFont = document.documentElement.getAttribute('data-font');
        selectedFontIndex = Array.from(fontOptions).findIndex(option =>
            option.getAttribute('data-font') === currentFont
        );

        // Show dropdown
        fontSelectDropdown.classList.add('show');

        // Update selection
        updateFontSelection();
    }

    // Close font dropdown
    function closeFontDropdown() {
        fontSelectDropdown.classList.remove('show');
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

    // Wait for font to load before applying
    async function waitForFont(fontFamily) {
        if (fontFamily === 'Noto Sans Georgian') {
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            if (isFontLoaded(fontFamily)) {
                resolve();
            } else {
                // Check if Font Loading API is available
                if (document.fonts && document.fonts.load) {
                    // Try to load the font using the Font Loading API
                    document.fonts.load(`12px "${fontFamily}"`).then(() => {
                        resolve();
                    }).catch(() => {
                        // Fallback: check periodically with timeout
                        let attempts = 0;
                        const maxAttempts = 40; // 2 seconds max
                        const checkFont = () => {
                            attempts++;
                            if (isFontLoaded(fontFamily)) {
                                resolve();
                            } else if (attempts < maxAttempts) {
                                setTimeout(checkFont, 50);
                            } else {
                                // Timeout - proceed anyway
                                resolve();
                            }
                        };
                        checkFont();
                    });
                } else {
                    // No Font Loading API - proceed immediately
                    resolve();
                }
            }
        });
    }

    // Single font change function
    async function changeFont(fontName, saveToStorage = true) {
        const fontFamily = fontFamilies[fontName];

        // For default font, apply immediately without waiting
        if (fontName === 'default') {
            document.documentElement.setAttribute('data-font', fontName);
            if (saveToStorage) {
                localStorage.setItem('font', fontName);
            }
            if (notepadModal && notepadModal.classList.contains('active')) {
                updateNotepadFont();
            }
            return;
        }

        // Wait for font to load before applying
        await waitForFont(fontFamily);

        // Set font on document
        document.documentElement.setAttribute('data-font', fontName);

        // Save to localStorage if permanent change
        if (saveToStorage) {
            localStorage.setItem('font', fontName);
        }

        // Update notepad if open
        if (notepadModal && notepadModal.classList.contains('active')) {
            updateNotepadFont();
        }
    }

    // Font preview (for hover effects)
    async function previewFont(fontName) {
        await changeFont(fontName, false);
    }

    // Font selection (permanent change)
    async function selectFont(fontName) {
        await changeFont(fontName, true);
    }

    // Font dropdown event listeners
    fontSelectDropdown.addEventListener('click', async function (e) {
        const fontOption = e.target.closest('.font-option');
        if (fontOption) {
            const fontName = fontOption.getAttribute('data-font');
            selectedFontIndex = Array.from(fontOptions).findIndex(option =>
                option.getAttribute('data-font') === fontName
            );
            updateFontSelection();
            await selectFont(fontName);
            closeFontDropdown();
        }
    });

    // Font option hover events
    fontSelectDropdown.addEventListener('mouseover', async function (e) {
        const fontOption = e.target.closest('.font-option');
        if (fontOption && fontSelectDropdown.classList.contains('show')) {
            const fontName = fontOption.getAttribute('data-font');
            await previewFont(fontName);
        }
    });

    // Font dropdown mouse leave - revert to selected font
    fontSelectDropdown.addEventListener('mouseleave', async function () {
        if (fontSelectDropdown.classList.contains('show') && selectedFontIndex >= 0) {
            const selectedOption = fontOptions[selectedFontIndex];
            const selectedFont = selectedOption.getAttribute('data-font');
            await previewFont(selectedFont);
        }
    });

    // Arrow key navigation for fonts
    document.addEventListener('keydown', async function (e) {
        if (fontSelectDropdown.classList.contains('show')) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedFontIndex = Math.max(selectedFontIndex - 1, 0);
                updateFontSelection();
                if (selectedFontIndex >= 0) {
                    const selectedOption = fontOptions[selectedFontIndex];
                    const selectedFont = selectedOption.getAttribute('data-font');
                    await previewFont(selectedFont);
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedFontIndex = Math.min(selectedFontIndex + 1, fontOptions.length - 1);
                updateFontSelection();
                if (selectedFontIndex >= 0) {
                    const selectedOption = fontOptions[selectedFontIndex];
                    const selectedFont = selectedOption.getAttribute('data-font');
                    await previewFont(selectedFont);
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (selectedFontIndex >= 0) {
                    const selectedOption = fontOptions[selectedFontIndex];
                    const selectedFont = selectedOption.getAttribute('data-font');
                    await selectFont(selectedFont);
                    closeFontDropdown();
                }
            } else if (e.key === 'Escape') {
                e.preventDefault();
                // Only close font dropdown if notepad is not open
                // If notepad is open, let the global ESC handler deal with it
                if (!notepadModal.classList.contains('active')) {
                    closeFontDropdown();
                }
            }
        } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !notepadModal.classList.contains('active')) {
            e.preventDefault();

            // Get current font and available fonts
            const currentFont = document.documentElement.getAttribute('data-font');
            const fontOptions = fontSelectDropdown.querySelectorAll('.font-option');
            const fontValues = Array.from(fontOptions).map(option => option.getAttribute('data-font'));
            const currentIndex = fontValues.indexOf(currentFont);

            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : fontValues.length - 1;
            } else {
                newIndex = currentIndex < fontValues.length - 1 ? currentIndex + 1 : 0;
            }

            const newFont = fontValues[newIndex];
            await selectFont(newFont);
        }
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
            themeToggle.title = 'Switch to Light Mode';
        } else {
            icon.className = 'fas fa-moon';
            themeToggle.title = 'Switch to Dark Mode';
        }
    }

    // Copy functionality
    function copyText(button) {
        const translationDiv = button.previousElementSibling;
        const copyText = translationDiv.getAttribute('data-copy-text');

        navigator.clipboard.writeText(copyText).then(function () {
            // Visual feedback
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.backgroundColor = '#4CAF50';

            setTimeout(function () {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 1000);
        }).catch(function (err) {
            console.error('Could not copy text: ', err);
            alert('Failed to copy text. Please try again.');
        });
    }

    // Sidebar Modal functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarModal = document.getElementById('sidebar-modal');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarClose = document.getElementById('sidebar-close');
    const tocList = document.getElementById('toc-list');
    const searchInput = document.getElementById('search-input');

    // Toggle sidebar
    sidebarToggle.addEventListener('click', function () {
        sidebarModal.classList.add('active');
        populateTableOfContents();
    });

    // Close sidebar
    function closeSidebar() {
        sidebarModal.classList.remove('active');
    }

    sidebarClose.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Sticky positioning is now handled purely by CSS due to restructured HTML
    // No JavaScript calculations needed for sidebar-sticky-header positioning



    // Populate table of contents - SIMPLIFIED VERSION
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

        // Set the first item as active by default
        const firstItem = tocContainer.querySelector('.toc-item');
        if (firstItem) {
            firstItem.classList.add('active');
        }


    }

    // Highlight current section in TOC
    function updateActiveTocItem() {
        const verbSections = document.querySelectorAll('.verb-section');
        const tocItems = document.querySelectorAll('.toc-item');

        // Find which section is currently in view
        const scrollPosition = window.scrollY + 100; // Offset for better detection

        let activeIndex = -1;
        verbSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                activeIndex = index;
            }
        });

        // Update active class
        tocItems.forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
        });
    }

    // Update active TOC item on scroll
    window.addEventListener('scroll', updateActiveTocItem);

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
            const sidebarOpen = sidebarModal.classList.contains('active');
            const fontDropdownOpen = fontSelectDropdown.classList.contains('show');
            const filterOpen = filterModal.classList.contains('active');
            const notepadOpen = notepadModal.classList.contains('active');

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
        if (!fontSelectButton.contains(e.target) && !fontSelectDropdown.contains(e.target) && !notepadToggle.contains(e.target)) {
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
            console.error('Error updating URL:', error);
        }
    }

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
            saveCategoryState(category, 'expanded');
        }
    }

    // Navigate to verb section with proper positioning
    function navigateToVerbSection(verbSection, primaryVerb, fullGeorgian) {
        if (!verbSection) {
            showNotification(`Verb "${fullGeorgian}" not found`, 'error');
            return false;
        }

        // Calculate proper offset accounting for sticky header
        const stickyHeaderHeight = 80; // Adjust based on actual header height
        const rect = verbSection.getBoundingClientRect();
        const targetPosition = window.scrollY + rect.top - stickyHeaderHeight;

        // Update URL with primary verb
        updateURLWithAnchor(primaryVerb);

        // Navigate instantly (no animation as per user preference)
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });

        return true;
    }

    // Category state management functions (removed session storage for instant behavior)
    function saveCategoryState(category, state) {
        // No longer saving to session storage - removed for instant behavior
    }

    function loadCategoryState(category) {
        // Always return expanded - no persistence
        return 'expanded';
    }

    function restoreCategoryStates() {
        // No longer restoring states - all categories start expanded
    }

    function handleURLAnchor() {
        const hash = window.location.hash;

        // Try multiple methods to extract the hash
        let primaryVerb = null;

        // Method 1: Direct hash access
        if (hash && hash.startsWith('#')) {
            primaryVerb = decodeURIComponent(hash.substring(1)); // Remove the # symbol
        }

        // Method 2: Extract from full URL
        if (!primaryVerb) {
            const urlParts = window.location.href.split('#');
            if (urlParts.length > 1) {
                primaryVerb = decodeURIComponent(urlParts[1]);
            }
        }

        // Method 3: Try to get hash after a delay (for file:// URLs)
        if (!primaryVerb) {
            setTimeout(() => {
                const delayedHash = window.location.hash;
                if (delayedHash && delayedHash.startsWith('#')) {
                    const delayedPrimaryVerb = decodeURIComponent(delayedHash.substring(1));
                    scrollToVerb(delayedPrimaryVerb);
                }
            }, 500);
            return; // Exit early, let the delayed check handle it
        }

        if (primaryVerb) {
            scrollToVerb(primaryVerb);
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
                behavior: 'auto' // No animation, instant jump
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

    // Make handleLinkIconClick globally accessible
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
        copyToClipboard(url);
        updateURLWithAnchor(anchorId);

        // Restore original styles after a short delay
        setTimeout(() => {
            clickedElement.style.backgroundColor = 'transparent';
            clickedElement.style.color = originalColor;
            clickedElement.style.opacity = originalOpacity;
        }, 500);
    }

    // Search and filter function
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
                    categoriesWithVisibleVerbs.add(itemCategory); // Track this category as having visible verbs

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
                const categoryName = item.textContent;
                const shouldShowCategory = selectedCategory === 'all' || categoryName === selectedCategory;

                // Hide category header if no verbs are visible in this category
                const hasVisibleVerbs = categoriesWithVisibleVerbs.has(categoryName);

                if (shouldShowCategory && hasVisibleVerbs) {
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
    }

    // Update search selection highlighting
    function updateSearchSelection() {
        // Remove previous selection
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

    // Sidebar category filter event listener
    sidebarCategoryFilter.addEventListener('change', function () {
        filterTableOfContents(searchInput.value);
    });

    // Search input event listener
    searchInput.addEventListener('input', function () {
        filterTableOfContents(this.value);
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

    // Apply filters to content
    function applyFilters() {
        const groupBy = groupBySelect.value;
        const categoryFilter = categorySelect.value;
        const classFilter = classSelect.value;

        const verbSections = document.querySelectorAll('.verb-section');
        const filterToggle = document.getElementById('filter-toggle');

        // Check if any filter is active
        const isFilterActive = (groupBy === 'category' && categoryFilter !== 'all') ||
            (groupBy === 'class' && classFilter !== 'all');

        // Update filter button appearance
        if (isFilterActive) {
            filterToggle.classList.add('filter-active');
            // Add a visual indicator to the button
            const icon = filterToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-filter';
                icon.style.color = 'var(--filter-active-text)';
            }
        } else {
            filterToggle.classList.remove('filter-active');
            // Reset the button appearance
            const icon = filterToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-filter';
                icon.style.color = '';
            }
        }

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

            // Show/hide section
            section.style.display = shouldShow ? 'block' : 'none';
        });

        // Handle category containers for collapsible functionality
        const categoryContainers = document.querySelectorAll('.category-container');
        categoryContainers.forEach(container => {
            const category = container.getAttribute('data-category');
            const content = container.querySelector('.category-content');
            const header = container.querySelector('.collapsible-header');

            // Check if this category has any visible verbs
            const visibleVerbs = container.querySelectorAll('.verb-section[style*="display: block"]');

            if (visibleVerbs.length === 0) {
                // Hide the entire category container if no verbs are visible
                container.style.display = 'none';
            } else {
                // Show the category container and expand it if it was collapsed
                container.style.display = 'block';
                if (content && header) {
                    content.classList.remove('collapsed');
                    header.classList.remove('collapsed');
                }
            }
        });

        // Scroll to category header if filter is applied
        if (isFilterActive) {
            // Use setTimeout to ensure DOM updates are complete before scrolling
            setTimeout(() => {
                scrollToCategoryHeader(groupBy, groupBy === 'category' ? categoryFilter : classFilter);
            }, 100);
        }
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
            const offset = 80; // Adjust this value based on header height
            const targetPosition = targetHeader.offsetTop - offset;

            // Use requestAnimationFrame for smoother scrolling
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

    // Initialize preverb toggle functionality
    initializePreverbToggles();

    // Initialize collapsible category headers
    initializeCollapsibleHeaders();

    // Initialize sticky header functionality
    initializeStickyHeaders();

    // Restore category states from session storage
    restoreCategoryStates();

    // Reset functionality
    const resetToggle = document.getElementById('reset-toggle');

    resetToggle.addEventListener('click', function () {
        // Show confirmation dialog
        if (confirm('Reset to default state? This will clear all filters and remove any anchor links from the URL.')) {
            resetToDefaultState();
        }
    });

    // Function to reset to default state
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

        // Apply filters to reset everything
        applyFilters();

        // Clear table of contents filter
        filterTableOfContents('');

        // Remove anchor from URL without triggering page reload
        if (window.history && window.history.replaceState) {
            window.history.replaceState(null, null, window.location.pathname);
        }

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Show success notification
        showNotification('Page reset to default state', 'success');
    }

    // Handle direct URL access with anchor tags
    // Add a small delay to ensure hash is available
    setTimeout(() => {
        handleURLAnchor();
    }, 100);

    // Listen for browser back/forward navigation
    window.addEventListener('popstate', handleURLAnchor);

    // Add link icon event listeners
    document.querySelectorAll('.verb-link-icon').forEach(icon => {
        icon.addEventListener('click', function (e) {
            e.preventDefault();
            const georgianVerb = this.getAttribute('data-verb-georgian');
            handleLinkIconClick(georgianVerb);
        });
    });

    // Enhanced category management functions
    function expandCategory(header, content, category) {
        content.classList.remove('collapsed');
        header.classList.remove('collapsed');
        saveCategoryState(category, 'expanded');
    }

    function collapseCategoryWithSmartScroll(header, content, category) {
        // 1. Collapse the category
        content.classList.add('collapsed');
        header.classList.add('collapsed');

        // 2. Save state to session storage
        saveCategoryState(category, 'collapsed');

        // 3. Scroll to the top of the collapsed header
        const headerTop = header.offsetTop;
        const stickyHeaderHeight = 80; // Adjust based on actual header height
        const targetPosition = headerTop - stickyHeaderHeight;

        // 4. Scroll instantly to show the collapsed header at the top
        window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
        });
    }

    // Initialize expand/collapse all buttons
    const expandAllBtn = document.getElementById('expand-all-categories');
    const collapseAllBtn = document.getElementById('collapse-all-categories');

    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function () {
            const contents = document.querySelectorAll('.category-content');
            const headers = document.querySelectorAll('.collapsible-header');

            contents.forEach(content => content.classList.remove('collapsed'));
            headers.forEach(header => header.classList.remove('collapsed'));

            // No longer saving to session storage
        });
    }

    if (collapseAllBtn) {
        collapseAllBtn.addEventListener('click', function () {
            const contents = document.querySelectorAll('.category-content');
            const headers = document.querySelectorAll('.collapsible-header');

            contents.forEach(content => content.classList.add('collapsed'));
            headers.forEach(header => header.classList.add('collapsed'));

            // No longer saving to session storage
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
            requestAnimationFrame(updateStickyHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

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
                    // Simple expand without smart scroll
                    content.classList.remove('collapsed');
                    this.classList.remove('collapsed');

                    // No longer saving to session storage
                } else {
                    // Collapse with smart scroll

                    // 1. Collapse the category
                    content.classList.add('collapsed');
                    this.classList.add('collapsed');

                    // 2. No longer saving to session storage

                    // 3. Scroll to show collapsed header positioned higher in viewport
                    const categoryContainer = this.closest('.category-container');
                    const containerTop = categoryContainer ? categoryContainer.offsetTop : this.offsetTop;
                    const stickyHeaderHeight = 0; // Reduced offset to position header higher
                    const targetPosition = containerTop - stickyHeaderHeight;

                    // 4. Scroll instantly to show the category container at the top
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'auto'
                    });
                }
            } else {
                console.error('Content not found for category:', category);
            }
        });
    });
}

/**
 * PreverbManager - Handles dynamic preverb switching for multi-preverb verbs
 * 
 * This class manages the interactive preverb selection system that allows users
 * to switch between different preverb forms of Georgian verbs (e.g., მი-, წა-, etc.)
 * and updates all related content (tables, examples) accordingly.
 */
class PreverbManager {
    constructor() {
        this.initializePreverbToggles();
    }

    initializePreverbToggles() {
        document.querySelectorAll('.preverb-toggle').forEach(selector => {
            selector.addEventListener('change', (e) => {
                this.handlePreverbChange(e.target);
            });
        });
    }

    handlePreverbChange(selector) {
        const verbId = selector.dataset.verbId;
        const selectedPreverb = selector.value;
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);

        if (verbSection) {
            this.updateVerbDisplay(verbSection, selectedPreverb);
        }
    }

    updateVerbDisplay(verbSection, preverb) {
        // Update tables
        this.updateConjugationTables(verbSection, preverb);

        // Update examples
        this.updateExamples(verbSection, preverb);

        // Update gloss analyses
        this.updateGlossAnalyses(verbSection, preverb);

        // Update semantic indicators
        this.updateSemanticIndicators(verbSection, preverb);
    }

    updateConjugationTables(verbSection, preverb) {
        const verbId = verbSection.dataset.verbId;
        const preverbConfig = JSON.parse(verbSection.dataset.preverbConfig);

        // Get conjugations for selected preverb
        const conjugations = this.getConjugationsForPreverb(verbId, preverb);

        // Update overview table
        const overviewTable = verbSection.querySelector('.meta-table');
        if (overviewTable) {
            this.updateTableContent(overviewTable, conjugations);
        }

        // Update regular tables
        const regularTables = verbSection.querySelectorAll('.regular-table');
        regularTables.forEach(table => {
            this.updateRegularTableContent(table, conjugations);
        });
    }

    updateExamples(verbSection, preverb) {
        const normalizedPreverb = preverb.replace('-', '');

        // Access the data attribute directly using getAttribute since dataset doesn't handle Georgian characters well
        const examplesData = verbSection.getAttribute(`data-examples-${normalizedPreverb}`);

        if (!examplesData) {
            return;
        }

        try {
            const examples = JSON.parse(examplesData);
            const exampleSections = verbSection.querySelectorAll('.examples');

            exampleSections.forEach(section => {
                const tense = this.getTenseFromExampleSection(section);
                if (!tense) return;

                // Get the HTML content for this tense
                const tenseHtml = examples[tense];
                if (tenseHtml) {
                    // Replace the entire examples section with the new HTML
                    section.outerHTML = tenseHtml;
                }
            });
        } catch (error) {
            console.error(`Error parsing examples data for preverb ${preverb}:`, error);
        }
    }

    updateGlossAnalyses(verbSection, preverb) {
        const normalizedPreverb = preverb.replace('-', '');

        // Access the data attribute directly using getAttribute since dataset doesn't handle Georgian characters well
        const glossAnalysesData = verbSection.getAttribute(`data-gloss-analyses-${normalizedPreverb}`);

        if (!glossAnalysesData) {
            return;
        }

        try {
            const glossAnalyses = JSON.parse(glossAnalysesData);
            const glossSections = verbSection.querySelectorAll('.case-gloss');

            glossSections.forEach(section => {
                const tense = this.getTenseFromGlossSection(section);
                if (!tense) return;

                // Get the HTML content for this tense
                const tenseGlossHtml = glossAnalyses[tense];
                if (tenseGlossHtml) {
                    // Replace the entire gloss section with the new HTML
                    section.outerHTML = tenseGlossHtml;
                }
            });
        } catch (error) {
            console.error(`Error parsing gloss analyses data for preverb ${preverb}:`, error);
        }
    }

    getTenseFromGlossSection(glossSection) {
        // Try to find the tense from the section context
        const section = glossSection.closest('.tense-column');
        if (section) {
            const heading = section.querySelector('h3');
            if (heading) {
                const headingText = heading.textContent.toLowerCase();
                if (headingText.includes('present')) return 'present';
                if (headingText.includes('imperfect')) return 'imperfect';
                if (headingText.includes('future')) return 'future';
                if (headingText.includes('aorist')) return 'aorist';
                if (headingText.includes('optative')) return 'optative';
                if (headingText.includes('imperative')) return 'imperative';
            }
        }
        return null;
    }

    getConjugationsForPreverb(verbId, preverb) {
        // Get data from the verb section's data attributes
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (!verbSection) return {};

        const preverbConfig = JSON.parse(verbSection.dataset.preverbConfig || '{}');
        const conjugations = JSON.parse(verbSection.dataset.conjugations || '{}');
        const preverbRules = JSON.parse(verbSection.dataset.preverbRules || '{}');

        // Handle new preverb rules structure
        if (preverbRules && Object.keys(preverbRules).length > 0) {
            return this.calculatePreverbForms(conjugations, preverbRules, preverb);
        }

        // Handle available_preverbs approach - should always have preverb_rules
        if (preverbConfig.available_preverbs && preverbConfig.available_preverbs.length > 0) {
            // If we have available_preverbs but no preverb_rules, this is an error
            // All verbs with available_preverbs should have preverb_rules
            console.warn(`Verb ${verbId} has available_preverbs but no preverb_rules`);
            return conjugations;
        }

        // Handle old multi-preverb structure (fallback)
        const preverbConjugations = {};
        for (const [tense, tenseData] of Object.entries(conjugations)) {
            if (tenseData && typeof tenseData === 'object') {
                // Check if the selected preverb has conjugations for this tense
                if (tenseData[preverb]) {
                    preverbConjugations[tense] = tenseData[preverb];
                } else {
                    // Fallback logic: for წა- preverb, use მი- for present and imperfect
                    if (preverb === 'წა-' && (tense === 'present' || tense === 'imperfect')) {
                        if (tenseData['მი-']) {
                            preverbConjugations[tense] = tenseData['მი-'];
                        }
                    } else {
                        // For other cases, use the first available preverb as fallback
                        const availablePreverbs = Object.keys(tenseData);
                        if (availablePreverbs.length > 0) {
                            preverbConjugations[tense] = tenseData[availablePreverbs[0]];
                        }
                    }
                }
            }
        }

        return preverbConjugations;
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
            // We'll handle tense-specific fallbacks in the form calculation loop
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

    getExamplesForPreverb(verbId, preverb) {
        // Get data from the verb section's data attributes
        const verbSection = document.querySelector(`[data-verb-id="${verbId}"]`);
        if (!verbSection) return {};

        const examples = JSON.parse(verbSection.dataset.examples || '{}');
        const preverbRules = JSON.parse(verbSection.dataset.preverbRules || '{}');

        // For new preverb rules structure, examples are already generated at build time
        // and stored in the examples data attribute. We just need to return them.
        if (preverbRules && Object.keys(preverbRules).length > 0) {
            return examples;
        }

        // Extract examples for the selected preverb with fallback logic (old structure)
        const preverbExamples = {};
        for (const [tense, tenseData] of Object.entries(examples)) {
            if (tenseData && typeof tenseData === 'object') {
                // Check if the selected preverb has examples for this tense
                if (tenseData[preverb]) {
                    preverbExamples[tense] = tenseData[preverb];
                } else {
                    // Fallback logic: for წა- preverb, use მი- for present and imperfect
                    if (preverb === 'წა-' && (tense === 'present' || tense === 'imperfect')) {
                        if (tenseData['მი-']) {
                            preverbExamples[tense] = tenseData['მი-'];
                        }
                    } else {
                        // For other cases, use the first available preverb as fallback
                        const availablePreverbs = Object.keys(tenseData);
                        if (availablePreverbs.length > 0) {
                            preverbExamples[tense] = tenseData[availablePreverbs[0]];
                        }
                    }
                }
            }
        }

        return preverbExamples;
    }

    updateTableContent(table, conjugations) {
        // Update table cells with new conjugation data
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 6) {
                // Update conjugation cells (skip first cell which is tense name)
                const tense = this.getTenseFromRow(row);
                if (tense && conjugations[tense]) {
                    const tenseConjugations = conjugations[tense];

                    // Handle stem-based verb structure (forms object) vs old structure (direct person keys)
                    let forms;
                    if (tenseConjugations.forms) {
                        // Stem-based structure: { forms: { "1sg": "...", ... } }
                        forms = tenseConjugations.forms;
                    } else {
                        // Old structure: { "1sg": "...", ... }
                        forms = tenseConjugations;
                    }

                    cells[1].textContent = forms['1sg'] || '-';
                    cells[2].textContent = forms['2sg'] || '-';
                    cells[3].textContent = forms['3sg'] || '-';
                    cells[4].textContent = forms['1pl'] || '-';
                    cells[5].textContent = forms['2pl'] || '-';
                    cells[6].textContent = forms['3pl'] || '-';
                }
            }
        });
    }

    getTenseFromRow(row) {
        // Extract tense from the first cell or row class
        const firstCell = row.querySelector('td');
        if (firstCell) {
            const tenseText = firstCell.textContent.trim();
            const tenseMap = {
                'PRES': 'present',
                'IMPF': 'imperfect',
                'FUT': 'future',
                'AOR': 'aorist',
                'OPT': 'optative',
                'IMPR': 'imperative'
            };
            return tenseMap[tenseText] || null;
        }
        return null;
    }

    updateRegularTableContent(table, conjugations) {
        // Update regular table content (3-column format: Person, Singular, Plural)
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                // Get tense from the table context
                const tense = this.getTenseFromRegularTable(table);
                if (tense && conjugations[tense]) {
                    const tenseConjugations = conjugations[tense];

                    // Handle stem-based verb structure (forms object) vs old structure (direct person keys)
                    let forms;
                    if (tenseConjugations.forms) {
                        // Stem-based structure: { forms: { "1sg": "...", ... } }
                        forms = tenseConjugations.forms;
                    } else {
                        // Old structure: { "1sg": "...", ... }
                        forms = tenseConjugations;
                    }

                    const person = cells[0].textContent.trim();

                    // Update singular and plural cells based on person
                    if (person.includes('1st')) {
                        cells[1].textContent = forms['1sg'] || '-';
                        cells[2].textContent = forms['1pl'] || '-';
                    } else if (person.includes('2nd')) {
                        cells[1].textContent = forms['2sg'] || '-';
                        cells[2].textContent = forms['2pl'] || '-';
                    } else if (person.includes('3rd')) {
                        cells[1].textContent = forms['3sg'] || '-';
                        cells[2].textContent = forms['3pl'] || '-';
                    }
                }
            }
        });
    }

    getTenseFromRegularTable(table) {
        // Get tense from the table's context (heading or parent section)
        const tableContainer = table.closest('.regular-table-container');
        if (tableContainer) {
            const heading = tableContainer.previousElementSibling;
            if (heading && heading.tagName === 'H3') {
                const headingText = heading.textContent.toLowerCase();
                if (headingText.includes('present')) return 'present';
                if (headingText.includes('imperfect')) return 'imperfect';
                if (headingText.includes('future')) return 'future';
                if (headingText.includes('aorist')) return 'aorist';
                if (headingText.includes('optative')) return 'optative';
                if (headingText.includes('imperative')) return 'imperative';
            }
        }
        return null;
    }

    updateExampleContent(exampleSection, conjugations, preverb, preverbTranslations) {
        // This method is no longer needed as examples are now pre-generated
        // and handled by the updateExamples method
    }

    getTenseFromExampleSection(exampleSection) {
        // Try to find the tense from the section context
        const section = exampleSection.closest('.tense-column');
        if (section) {
            const heading = section.querySelector('h3');
            if (heading) {
                const headingText = heading.textContent.toLowerCase();
                if (headingText.includes('present')) return 'present';
                if (headingText.includes('imperfect')) return 'imperfect';
                if (headingText.includes('future')) return 'future';
                if (headingText.includes('aorist')) return 'aorist';
                if (headingText.includes('optative')) return 'optative';
                if (headingText.includes('imperative')) return 'imperative';
            }
        }
        return null;
    }

    getVerbFormForExample(verbReference, examples) {
        // Parse verb reference like "present.1sg" to get the verb form
        if (!verbReference) return null;

        const [tense, person] = verbReference.split('.');
        if (!tense || !person) return null;

        // Get conjugations for the current preverb with fallback logic
        const verbSection = document.querySelector('.verb-section[data-has-multiple-preverbs="True"]');
        if (!verbSection) return null;

        const conjugations = JSON.parse(verbSection.dataset.conjugations || '{}');
        const preverbConfig = JSON.parse(verbSection.dataset.preverbConfig || '{}');
        const preverbRules = JSON.parse(verbSection.dataset.preverbRules || '{}');
        const currentPreverb = verbSection.querySelector('.preverb-toggle').value;

        // Handle new preverb rules structure
        if (preverbRules && Object.keys(preverbRules).length > 0) {
            const calculatedConjugations = this.calculatePreverbForms(conjugations, preverbRules, currentPreverb);
            if (calculatedConjugations[tense] && calculatedConjugations[tense].forms) {
                return calculatedConjugations[tense].forms[person] || null;
            }
            return null;
        }

        // Handle stem-based approach (available_preverbs array)
        if (preverbConfig.available_preverbs && preverbConfig.available_preverbs.length > 0) {
            if (conjugations[tense] && conjugations[tense].forms) {
                const stem = conjugations[tense].forms[person];
                if (stem && stem !== '-') {
                    // Remove hyphen from preverb before combining
                    const clean_preverb = currentPreverb.replace('-', '');
                    return clean_preverb + stem;
                }
            }
            return null;
        }

        // Handle old multi-preverb structure (fallback)
        if (conjugations[tense] && typeof conjugations[tense] === 'object') {
            // Check if the current preverb has conjugations for this tense
            if (conjugations[tense][currentPreverb]) {
                return conjugations[tense][currentPreverb][person];
            } else {
                // Fallback logic: for წა- preverb, use მი- for present and imperfect
                if (currentPreverb === 'წა-' && (tense === 'present' || tense === 'imperfect')) {
                    if (conjugations[tense]['მი-']) {
                        return conjugations[tense]['მი-'][person];
                    }
                } else {
                    // For other cases, use the first available preverb as fallback
                    const availablePreverbs = Object.keys(conjugations[tense]);
                    if (availablePreverbs.length > 0) {
                        return conjugations[tense][availablePreverbs[0]][person];
                    }
                }
            }
        }

        return null;
    }

    updateSemanticIndicators(verbSection, preverb) {
        // Update semantic indicators if present
        const indicators = verbSection.querySelectorAll('.preverb-semantic');
        indicators.forEach(indicator => {
            // Update semantic category based on selected preverb
            const semanticCategory = this.getSemanticCategory(preverb);
            indicator.className = `preverb-semantic ${semanticCategory}`;
        });

        // Add visual indicators for preverb fallbacks
        this.updatePreverbFallbackIndicators(verbSection, preverb);
    }

    updatePreverbFallbackIndicators(verbSection, preverb) {
        const preverbRules = JSON.parse(verbSection.dataset.preverbRules || '{}');

        // Remove existing indicators
        const existingIndicators = verbSection.querySelectorAll('.preverb-fallback-indicator');
        existingIndicators.forEach(indicator => indicator.remove());

        const normalizedPreverb = preverb.replace('-', '');

        // Check for form fallbacks
        const formFallbacks = preverbRules.tense_specific_fallbacks?.[normalizedPreverb];
        // Check for translation fallbacks
        const translationFallbacks = preverbRules.english_fallbacks?.[normalizedPreverb];

        if (formFallbacks || translationFallbacks) {
            const indicator = document.createElement('div');
            indicator.className = 'preverb-fallback-indicator';

            let fallbackText = '';
            if (formFallbacks && translationFallbacks) {
                fallbackText = `${preverb} uses ${formFallbacks.present || formFallbacks.imperfect} forms and translations for present/imperfect`;
            } else if (formFallbacks) {
                fallbackText = `${preverb} uses ${formFallbacks.present || formFallbacks.imperfect} forms for present/imperfect`;
            } else if (translationFallbacks) {
                fallbackText = `${preverb} uses ${translationFallbacks.present || translationFallbacks.imperfect} translations for present/imperfect`;
            }

            indicator.innerHTML = `
                <span class="fallback-icon">⚠️</span>
                <span class="fallback-text">${fallbackText}</span>
            `;

            const preverbSelector = verbSection.querySelector('.preverb-selector');
            if (preverbSelector) {
                preverbSelector.parentNode.insertBefore(indicator, preverbSelector.nextSibling);
            }
        }
    }

    getSemanticCategory(preverb) {
        // Map preverb to semantic category
        const semanticMap = {
            'მი-': 'directional',
            'მო-': 'directional',
            'გა-': 'directional',
            'წა-': 'directional'
        };
        return semanticMap[preverb] || 'directional';
    }


}

// Initialize preverb functionality
function initializePreverbToggles() {
    new PreverbManager();
} 