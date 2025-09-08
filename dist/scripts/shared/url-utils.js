/**
 * URL Utility Functions
 * Handles URL generation and parsing for verb navigation with Georgian words
 * 
 * URL Format: ?verb=მიტანა&id=1
 * - verb: Georgian word (primary parameter)
 * - id: Numeric verb ID (secondary parameter)
 * 
 * Backward compatibility maintained for:
 * - Legacy format: ?verb=1
 * - Hash format: #1
 */

/**
 * Build verb URL with Georgian word and numeric ID
 * @param {string} georgianWord - Georgian verb word
 * @param {string|number} verbId - Numeric verb ID
 * @returns {string} Formatted URL
 */
export function buildVerbURL(georgianWord, verbId) {
    const params = new URLSearchParams();
    params.set('verb', georgianWord);
    params.set('id', String(verbId));
    return `?${params.toString()}`;
}

/**
 * Parse verb URL to extract Georgian word and numeric ID
 * @returns {Object} { georgianWord: string, verbId: string|null, isLegacy: boolean }
 */
export function parseVerbURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;

    // Check for new format: ?verb=მიტანა&id=1
    const georgianWord = urlParams.get('verb');
    const numericId = urlParams.get('id');

    if (georgianWord && numericId && !isNumeric(georgianWord)) {
        return {
            georgianWord: georgianWord,
            verbId: numericId,
            isLegacy: false
        };
    }

    // Check for legacy format: ?verb=1
    const legacyVerb = urlParams.get('verb');
    if (legacyVerb && isNumeric(legacyVerb)) {
        return {
            georgianWord: null,
            verbId: legacyVerb,
            isLegacy: true
        };
    }

    // Check for hash format: #1
    if (hash && hash.startsWith('#')) {
        const hashId = hash.substring(1);
        if (hashId) {
            return {
                georgianWord: null,
                verbId: hashId,
                isLegacy: true
            };
        }
    }

    return { georgianWord: null, verbId: null, isLegacy: false };
}

/**
 * Get verb ID from URL (backward compatible)
 * @returns {string|null} Verb ID or null if not found
 */
export function getVerbIdFromURL() {
    const parsed = parseVerbURL();
    return parsed.verbId;
}

/**
 * Get Georgian word from URL
 * @returns {string|null} Georgian word or null if not found
 */
export function getGeorgianWordFromURL() {
    const parsed = parseVerbURL();
    return parsed.georgianWord;
}

/**
 * Update browser URL with new format
 * @param {string} georgianWord - Georgian verb word
 * @param {string|number} verbId - Numeric verb ID
 */
export function updateVerbURL(georgianWord, verbId) {
    const newUrl = buildVerbURL(georgianWord, verbId);

    if (history.pushState) {
        history.pushState({ georgianWord, verbId }, '', newUrl);
    } else {
        console.warn('history.pushState not available');
    }
}

/**
 * Update browser URL with legacy format (for backward compatibility)
 * @param {string|number} verbId - Numeric verb ID
 */
export function updateLegacyVerbURL(verbId) {
    const newUrl = `?verb=${verbId}`;

    if (history.pushState) {
        history.pushState({ verbId }, '', newUrl);
    } else {
        console.warn('history.pushState not available');
    }
}

/**
 * Update browser URL with hash format (for backward compatibility)
 * @param {string|number} verbId - Numeric verb ID
 */
export function updateHashURL(verbId) {
    const newUrl = `${window.location.pathname}#${encodeURIComponent(verbId)}`;

    if (history.pushState) {
        history.pushState({ verbId }, '', newUrl);
    } else {
        console.warn('history.pushState not available');
    }
}

/**
 * Check if string is numeric
 * @param {string} str - String to check
 * @returns {boolean} Whether string is numeric
 */
export function isNumeric(str) {
    return /^\d+$/.test(str);
}

/**
 * Check if URL has verb parameters (any format)
 * @returns {boolean} Whether URL contains verb parameters
 */
export function hasVerbURL() {
    const parsed = parseVerbURL();
    return parsed.verbId !== null;
}

/**
 * Get URL format type
 * @returns {string} 'new', 'legacy', 'hash', or 'none'
 */
export function getURLFormat() {
    const parsed = parseVerbURL();
    if (parsed.verbId === null) return 'none';
    if (parsed.isLegacy) {
        const urlParams = new URLSearchParams(window.location.search);
        const verbParam = urlParams.get('verb');
        return verbParam && isNumeric(verbParam) ? 'legacy' : 'hash';
    }
    return 'new';
}
