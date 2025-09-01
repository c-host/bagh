/**
 * Database Manager for Verb Editor
 * Performance Optimized Database Management
 * Handles loading and managing existing verb database and related databases
 */

class Database {
    constructor() {
        this.verbs = [];
        this.subjects = {};
        this.directObjects = {};
        this.indirectObjects = {};
        this.categories = {};
        this.adjectives = {};
        this.loaded = false;
        this.loading = false;

        // Performance optimization properties
        this.cache = new Map();
        this.cacheExpiry = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
        this.lazyLoadQueue = [];
        this.isLazyLoading = false;
        this.performanceMetrics = {
            loadTimes: {},
            queryTimes: {},
            cacheHits: 0,
            cacheMisses: 0
        };

        // Performance monitoring
        this.startTime = performance.now();
        this.memoryUsage = 0;
    }

    /**
     * Initialize database with performance optimizations
     */
    async initialize() {
        if (this.loading) {
            console.warn('Database already loading');
            return;
        }

        if (this.loaded) {
            return;
        }

        this.loading = true;
        const initStartTime = performance.now();

        try {
            // Load critical data first, then lazy load the rest
            await this.loadCriticalData();

            // Start lazy loading for non-critical data
            this.startLazyLoading();

            this.loaded = true;
            this.performanceMetrics.loadTimes.initialization = performance.now() - initStartTime;

        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw new Error(`Database initialization failed: ${error.message}`);
        } finally {
            this.loading = false;
        }
    }

    /**
     * Load only critical data for immediate functionality
     */
    async loadCriticalData() {
        const criticalStartTime = performance.now();

        try {
            // Load only essential data for immediate functionality
            await Promise.all([
                this.loadCategoriesDatabase(), // Categories are needed for form display
                this.loadVerbsDatabase(),      // Basic verb list for suggestions
                this.loadAdjectiveDatabase()   // Adjectives are needed for form dropdowns
            ]);

            this.performanceMetrics.loadTimes.critical = performance.now() - criticalStartTime;

        } catch (error) {
            console.error('Failed to load critical data:', error);
            throw error;
        }
    }

    /**
     * Start lazy loading for non-critical data
     */
    startLazyLoading() {
        if (this.isLazyLoading) return;

        this.isLazyLoading = true;

        // Queue non-critical database loads
        this.lazyLoadQueue = [
            () => this.loadSubjectDatabase(),
            () => this.loadDirectObjectDatabase(),
            () => this.loadIndirectObjectDatabase()
        ];

        // Process queue with delays to avoid blocking UI
        this.processLazyLoadQueue();
    }

    /**
     * Process lazy load queue with performance optimization
     */
    async processLazyLoadQueue() {
        if (this.lazyLoadQueue.length === 0) {
            this.isLazyLoading = false;
            return;
        }

        const loadFunction = this.lazyLoadQueue.shift();
        const loadStartTime = performance.now();

        try {
            await loadFunction();
            this.performanceMetrics.loadTimes[loadFunction.name] = performance.now() - loadStartTime;
        } catch (error) {
            console.warn(`Lazy load failed for ${loadFunction.name}:`, error);
        }

        // Process next item with a small delay to avoid blocking UI
        setTimeout(() => this.processLazyLoadQueue(), 50);
    }

    /**
     * Optimized verbs database loading with caching
     * Updated to handle new semantic-only migrated data structure
     */
    async loadVerbsDatabase() {
        const cacheKey = 'verbs_database';

        // Check cache first
        if (this.isCacheValid(cacheKey)) {
            this.verbs = this.cache.get(cacheKey);
            this.performanceMetrics.cacheHits++;
            console.log('[DATABASE] Using cached verbs data');
            return;
        }

        const loadStartTime = performance.now();

        try {
            console.log('[DATABASE] Loading verbs from ../verbs.json...');
            const response = await fetch('../verbs.json');
            if (!response.ok) {
                throw new Error(`Failed to load verbs: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('[DATABASE] Raw data structure:', Object.keys(data));

            // Handle new migrated structure with verbs object
            if (data.verbs && typeof data.verbs === 'object') {
                // Convert object format to array format for compatibility, preserving the key as georgian_wrapper
                this.verbs = Object.entries(data.verbs).map(([key, verb]) => ({
                    ...verb,
                    georgian_wrapper: key // Preserve the top-level key as georgian_wrapper
                }));
                console.log('[DATABASE] Converted object format to array, found', this.verbs.length, 'verbs');
            } else if (Array.isArray(data.verbs)) {
                this.verbs = data.verbs;
                console.log('[DATABASE] Using array format, found', this.verbs.length, 'verbs');
            } else {
                this.verbs = [];
                console.log('[DATABASE] No verbs found in data');
            }

            // Cache the result
            this.cache.set(cacheKey, this.verbs);
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheTimeout);

            this.performanceMetrics.loadTimes.verbs = performance.now() - loadStartTime;
            this.performanceMetrics.cacheMisses++;

            console.log(`[DATABASE] Loaded ${this.verbs.length} verbs from migrated data structure`);

        } catch (error) {
            console.warn('[DATABASE] Failed to load verbs database:', error);
            this.verbs = [];
        }
    }

    /**
     * Optimized subject database loading with lazy loading
     */
    async loadSubjectDatabase() {
        const cacheKey = 'subjects_database';

        if (this.isCacheValid(cacheKey)) {
            this.subjects = this.cache.get(cacheKey);
            this.performanceMetrics.cacheHits++;
            return;
        }

        const loadStartTime = performance.now();

        try {
            const response = await fetch('../databases/subject_database.json');
            if (!response.ok) {
                throw new Error(`Failed to load subjects: ${response.statusText}`);
            }

            const data = await response.json();
            this.subjects = data.subjects || {};

            // Cache the result
            this.cache.set(cacheKey, this.subjects);
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheTimeout);

            this.performanceMetrics.loadTimes.subjects = performance.now() - loadStartTime;
            this.performanceMetrics.cacheMisses++;
        } catch (error) {
            console.warn('Failed to load subject database:', error);
            this.subjects = {};
        }
    }

    /**
     * Optimized direct object database loading
     */
    async loadDirectObjectDatabase() {
        const cacheKey = 'direct_objects_database';

        if (this.isCacheValid(cacheKey)) {
            this.directObjects = this.cache.get(cacheKey);
            this.performanceMetrics.cacheHits++;
            return;
        }

        const loadStartTime = performance.now();

        try {
            const response = await fetch('../databases/direct_object_database.json');
            if (!response.ok) {
                throw new Error(`Failed to load direct objects: ${response.statusText}`);
            }

            const data = await response.json();
            this.directObjects = data.direct_objects || {};

            // Cache the result
            this.cache.set(cacheKey, this.directObjects);
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheTimeout);

            this.performanceMetrics.loadTimes.directObjects = performance.now() - loadStartTime;
            this.performanceMetrics.cacheMisses++;
        } catch (error) {
            console.warn('Failed to load direct object database:', error);
            this.directObjects = {};
        }
    }

    /**
     * Optimized indirect object database loading
     */
    async loadIndirectObjectDatabase() {
        const cacheKey = 'indirect_objects_database';

        if (this.isCacheValid(cacheKey)) {
            this.indirectObjects = this.cache.get(cacheKey);
            this.performanceMetrics.cacheHits++;
            return;
        }

        const loadStartTime = performance.now();

        try {
            const response = await fetch('../databases/indirect_object_database.json');
            if (!response.ok) {
                throw new Error(`Failed to load indirect objects: ${response.statusText}`);
            }

            const data = await response.json();
            this.indirectObjects = data.indirect_objects || {};

            // Cache the result
            this.cache.set(cacheKey, this.indirectObjects);
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheTimeout);

            this.performanceMetrics.loadTimes.indirectObjects = performance.now() - loadStartTime;
            this.performanceMetrics.cacheMisses++;

            // console.log(`Loaded ${Object.keys(this.indirectObjects).length} indirect objects`);
        } catch (error) {
            console.warn('Failed to load indirect object database:', error);
            this.indirectObjects = {};
        }
    }

    /**
     * Optimized categories database loading
     */
    async loadCategoriesDatabase() {
        const cacheKey = 'categories_database';

        if (this.isCacheValid(cacheKey)) {
            this.categories = this.cache.get(cacheKey);
            this.performanceMetrics.cacheHits++;
            return;
        }

        const loadStartTime = performance.now();

        try {
            const response = await fetch('../references/gloss_reference.json');
            if (!response.ok) {
                throw new Error(`Failed to load categories: ${response.statusText}`);
            }

            const data = await response.json();
            this.categories = data.categories || {};

            // Cache the result
            this.cache.set(cacheKey, this.categories);
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheTimeout);

            this.performanceMetrics.loadTimes.categories = performance.now() - loadStartTime;
            this.performanceMetrics.cacheMisses++;

            // console.log(`Loaded ${Object.keys(this.categories).length} categories`);
        } catch (error) {
            console.warn('Failed to load categories database:', error);
            this.categories = {};
        }
    }

    /**
     * Optimized adjective database loading
     */
    async loadAdjectiveDatabase() {
        const cacheKey = 'adjectives_database';

        if (this.isCacheValid(cacheKey)) {
            this.adjectives = this.cache.get(cacheKey);
            this.performanceMetrics.cacheHits++;
            return;
        }

        const loadStartTime = performance.now();

        try {
            const response = await fetch('../databases/adjective_database.json');
            if (!response.ok) {
                throw new Error(`Failed to load adjectives: ${response.statusText}`);
            }

            const data = await response.json();
            this.adjectives = data.adjectives || {};

            // Cache the result
            this.cache.set(cacheKey, this.adjectives);
            this.cacheExpiry.set(cacheKey, Date.now() + this.cacheTimeout);

            this.performanceMetrics.loadTimes.adjectives = performance.now() - loadStartTime;
            this.performanceMetrics.cacheMisses++;

            // console.log(`Loaded ${Object.keys(this.adjectives).length} adjectives from adjective_database.json`);
            // console.log('Sample adjectives:', Object.keys(this.adjectives).slice(0, 5));
        } catch (error) {
            console.warn('Failed to load adjective database:', error);
            this.adjectives = {};
        }
    }

    /**
     * Check if database is ready
     */
    isReady() {
        return this.loaded && !this.loading;
    }

    /**
     * Get database loading status
     */
    getLoadingStatus() {
        return {
            loaded: this.loaded,
            loading: this.loading
        };
    }

    /**
     * Cache validation with expiry checking
     */
    isCacheValid(key) {
        if (!this.cache.has(key)) return false;

        const expiry = this.cacheExpiry.get(key);
        if (!expiry) return false;

        return Date.now() < expiry;
    }

    /**
     * Performance-optimized suggestions with caching
     */
    getSuggestions(type, query, verbSemantics = null) {
        const queryStartTime = performance.now();
        const cacheKey = `suggestions_${type}_${query}_${verbSemantics || 'none'}`;

        // Check cache first
        if (this.cache.has(cacheKey)) {
            this.performanceMetrics.cacheHits++;
            return this.cache.get(cacheKey);
        }

        let database;
        switch (type) {
            case 'subjects':
                database = this.subjects;
                break;
            case 'direct_objects':
                database = this.directObjects;
                break;
            case 'indirect_objects':
                database = this.indirectObjects;
                break;
            default:
                return [];
        }

        if (!database || Object.keys(database).length === 0) {
            return [];
        }

        // Optimized filtering with early termination
        const suggestions = [];
        const queryLower = query.toLowerCase();
        let count = 0;
        const maxSuggestions = 10;

        for (const [key, data] of Object.entries(database)) {
            if (count >= maxSuggestions) break;

            const matchesQuery = key.toLowerCase().includes(queryLower);
            if (!matchesQuery) continue;

            const matchesVerb = !verbSemantics ||
                !data.verb_compatibility ||
                data.verb_compatibility.includes(verbSemantics);

            if (matchesVerb) {
                suggestions.push({
                    key,
                    base: data.base || key,
                    english: data.english?.singular || key
                });
                count++;
            }
        }

        // Cache the result
        this.cache.set(cacheKey, suggestions);
        this.cacheExpiry.set(cacheKey, Date.now() + (this.cacheTimeout / 2)); // Shorter cache for suggestions

        this.performanceMetrics.queryTimes[type] = performance.now() - queryStartTime;
        this.performanceMetrics.cacheMisses++;

        return suggestions;
    }

    /**
     * Memory management and cleanup
     */
    cleanup() {
        // Clear expired cache entries
        const now = Date.now();
        for (const [key, expiry] of this.cacheExpiry.entries()) {
            if (now > expiry) {
                this.cache.delete(key);
                this.cacheExpiry.delete(key);
            }
        }

        // Limit cache size to prevent memory issues
        const maxCacheSize = 100;
        if (this.cache.size > maxCacheSize) {
            const entries = Array.from(this.cache.entries());
            entries.sort((a, b) => {
                const expiryA = this.cacheExpiry.get(a[0]) || 0;
                const expiryB = this.cacheExpiry.get(b[0]) || 0;
                return expiryA - expiryB;
            });

            // Remove oldest entries
            const toRemove = entries.slice(0, this.cache.size - maxCacheSize);
            toRemove.forEach(([key]) => {
                this.cache.delete(key);
                this.cacheExpiry.delete(key);
            });
        }

        // Update memory usage tracking
        this.memoryUsage = this.cache.size * 1024; // Rough estimate
    }

    /**
     * Performance metrics logging
     */
    logPerformanceMetrics() {
        // Disabled for performance reasons
    }

    /**
     * Get performance summary for monitoring
     */
    getPerformanceSummary() {
        return {
            totalTime: performance.now() - this.startTime,
            loadTimes: this.performanceMetrics.loadTimes,
            queryTimes: this.performanceMetrics.queryTimes,
            cacheStats: {
                hits: this.performanceMetrics.cacheHits,
                misses: this.performanceMetrics.cacheMisses,
                hitRate: this.performanceMetrics.cacheHits / (this.performanceMetrics.cacheHits + this.performanceMetrics.cacheMisses)
            },
            memoryUsage: this.memoryUsage,
            cacheSize: this.cache.size
        };
    }

    /**
     * Force refresh of cached data
     */
    async refreshCache() {
        // Clear all cache
        this.cache.clear();
        this.cacheExpiry.clear();

        // Reload all databases
        await this.loadCriticalData();
        this.startLazyLoading();
    }

    /**
     * Check if a verb already exists
     */
    checkVerbExists(georgianText, semanticKey = null) {
        if (!georgianText && !semanticKey) return { exists: false, matches: [] };

        const matches = this.verbs.filter(verb => {
            if (georgianText && verb.georgian === georgianText) return true;
            if (semanticKey && verb.semantic_key === semanticKey) return true;
            return false;
        });

        return {
            exists: matches.length > 0,
            matches: matches
        };
    }

    /**
     * Get verb by ID or semantic key
     */
    getVerb(identifier) {
        if (!identifier) return null;

        console.log('[DATABASE] Looking for verb with identifier:', identifier, 'type:', typeof identifier);

        // Try to find by ID first (handle both string and number)
        let verb = this.verbs.find(v => v.id == identifier); // Use == for type coercion
        if (verb) {
            console.log('[DATABASE] Found verb by ID:', verb.georgian);
            return verb;
        }

        // Try to find by semantic key
        verb = this.verbs.find(v => v.semantic_key === identifier);
        if (verb) {
            console.log('[DATABASE] Found verb by semantic key:', verb.georgian);
            return verb;
        }

        // Try to find by Georgian text
        verb = this.verbs.find(v => v.georgian === identifier);
        if (verb) {
            console.log('[DATABASE] Found verb by Georgian text:', verb.georgian);
            return verb;
        }

        console.log('[DATABASE] Verb not found for identifier:', identifier);
        return null;
    }

    /**
     * Search verbs by various criteria
     */
    searchVerbs(query, criteria = 'all') {
        if (!query || !query.trim()) return [];

        const searchTerm = query.toLowerCase().trim();
        const results = [];

        this.verbs.forEach(verb => {
            let match = false;

            switch (criteria) {
                case 'georgian':
                    match = verb.georgian && verb.georgian.toLowerCase().includes(searchTerm);
                    break;
                case 'english':
                    match = verb.english && verb.english.toLowerCase().includes(searchTerm);
                    break;
                case 'semantic_key':
                    match = verb.semantic_key && verb.semantic_key.toLowerCase().includes(searchTerm);
                    break;
                case 'category':
                    match = verb.category && verb.category.toLowerCase().includes(searchTerm);
                    break;
                case 'all':
                default:
                    match = (
                        (verb.georgian && verb.georgian.toLowerCase().includes(searchTerm)) ||
                        (verb.english && verb.english.toLowerCase().includes(searchTerm)) ||
                        (verb.semantic_key && verb.semantic_key.toLowerCase().includes(searchTerm)) ||
                        (verb.category && verb.category.toLowerCase().includes(searchTerm))
                    );
                    break;
            }

            if (match) {
                results.push(verb);
            }
        });

        return results;
    }

    /**
     * Get all available categories
     */
    getCategories() {
        return Object.entries(this.categories).map(([key, category]) => ({
            key: key,
            name: category.name,
            description: category.description
        }));
    }

    /**
     * Add a new category
     */
    addCategory(key, name, description) {
        if (this.categories[key]) {
            throw new Error(`Category '${key}' already exists`);
        }

        this.categories[key] = {
            name: name,
            description: description
        };

        // Save to localStorage for persistence
        this.saveCategoriesToStorage();

        return this.categories[key];
    }

    /**
     * Update an existing category
     */
    updateCategory(key, name, description) {
        if (!this.categories[key]) {
            throw new Error(`Category '${key}' does not exist`);
        }

        this.categories[key] = {
            name: name,
            description: description
        };

        // Save to localStorage for persistence
        this.saveCategoriesToStorage();

        return this.categories[key];
    }

    /**
     * Delete a category
     */
    deleteCategory(key) {
        if (!this.categories[key]) {
            throw new Error(`Category '${key}' does not exist`);
        }

        // Check if any verbs are using this category
        const verbsUsingCategory = this.verbs.filter(verb => verb.category === key);
        if (verbsUsingCategory.length > 0) {
            throw new Error(`Cannot delete category '${key}' - ${verbsUsingCategory.length} verbs are using it`);
        }

        delete this.categories[key];

        // Save to localStorage for persistence
        this.saveCategoriesToStorage();

        return true;
    }

    /**
     * Get nouns from a specific database
     */
    getNouns(databaseType) {
        let result;
        switch (databaseType) {
            case 'subjects':
                result = this.subjects;
                break;
            case 'direct_objects':
                result = this.directObjects;
                break;
            case 'indirect_objects':
                result = this.indirectObjects;
                break;
            default:
                result = {};
        }

        return result;
    }

    /**
     * Get noun options for dropdowns
     */
    getNounOptions(databaseType) {
        const nouns = this.getNouns(databaseType);

        const options = Object.entries(nouns).map(([key, data]) => ({
            value: key,
            label: databaseType === 'subjects' ? key : key, // Show English for subjects, English for objects
            description: data.description || ''
        }));

        return options;
    }

    /**
     * Get adjectives for a specific noun
     */
    getAdjectivesForNoun(nounKey, databaseType) {
        const nouns = this.getNouns(databaseType);
        const noun = nouns[nounKey];

        if (!noun || !noun.adjectives) return [];

        return noun.adjectives.map(adj => ({
            value: adj,
            label: adj
        }));
    }

    /**
     * Get all available adjectives
     */
    getAllAdjectives() {
        const allAdjectives = new Set();

        // Collect adjectives from all databases
        Object.values(this.subjects).forEach(noun => {
            if (noun.adjectives) {
                noun.adjectives.forEach(adj => allAdjectives.add(adj));
            }
        });

        Object.values(this.directObjects).forEach(noun => {
            if (noun.adjectives) {
                noun.adjectives.forEach(adj => allAdjectives.add(adj));
            }
        });

        Object.values(this.indirectObjects).forEach(noun => {
            if (noun.adjectives) {
                noun.adjectives.forEach(adj => allAdjectives.add(adj));
            }
        });

        return Array.from(allAdjectives).map(adj => ({
            value: adj,
            label: adj
        }));
    }

    /**
     * Get adjective options from the adjective database
     */
    getAdjectiveOptions() {
        if (!this.adjectives || Object.keys(this.adjectives).length === 0) {
            // Fallback to basic adjectives if database not loaded
            return [
                { value: 'good', label: 'good' },
                { value: 'excellent', label: 'excellent' },
                { value: 'interesting', label: 'interesting' },
                { value: 'difficult', label: 'difficult' },
                { value: 'engaging', label: 'engaging' },
                { value: 'various', label: 'various' },
                { value: 'challenging', label: 'challenging' },
                { value: 'captivating', label: 'captivating' }
            ];
        }

        const options = Object.entries(this.adjectives).map(([key, adjData]) => ({
            value: key,
            label: key  // Use English key as label, not Georgian base form
        }));

        return options;
    }

    /**
     * Get all available categories from all databases
     */
    getAllCategories() {
        const categories = new Set();

        // Collect categories from all databases
        Object.values(this.subjects).forEach(noun => {
            if (noun.category) {
                categories.add(noun.category);
            }
        });

        Object.values(this.directObjects).forEach(noun => {
            if (noun.category) {
                categories.add(noun.category);
            }
        });

        Object.values(this.indirectObjects).forEach(noun => {
            if (noun.category) {
                categories.add(noun.category);
            }
        });

        Object.values(this.adjectives).forEach(adj => {
            if (adj.category) {
                categories.add(adj.category);
            }
        });

        return Array.from(categories).sort();
    }

    /**
     * Get all available semantic domains from all databases
     */
    getAllSemanticDomains() {
        const semanticDomains = new Set();

        // Collect semantic domains from all databases (except adjectives which don't have semantic domains)
        Object.values(this.subjects).forEach(noun => {
            if (noun.semantic_domain) {
                semanticDomains.add(noun.semantic_domain);
            }
        });

        Object.values(this.directObjects).forEach(noun => {
            if (noun.semantic_domain) {
                semanticDomains.add(noun.semantic_domain);
            }
        });

        Object.values(this.indirectObjects).forEach(noun => {
            if (noun.semantic_domain) {
                semanticDomains.add(noun.semantic_domain);
            }
        });

        return Array.from(semanticDomains).sort();
    }

    /**
     * Get filtered noun options based on selected categories and semantic domains
     */
    getFilteredNounOptions(databaseType, selectedCategories = [], selectedSemanticDomains = []) {
        const nouns = this.getNouns(databaseType);

        // If no filters are selected, return all options
        if (selectedCategories.length === 0 && selectedSemanticDomains.length === 0) {
            return this.getNounOptions(databaseType);
        }

        const filteredOptions = Object.entries(nouns).filter(([key, data]) => {
            // Check if item matches any selected category
            const matchesCategory = selectedCategories.length === 0 ||
                (data.category && selectedCategories.includes(data.category));

            // Check if item matches any selected semantic domain
            const matchesSemanticDomain = selectedSemanticDomains.length === 0 ||
                (data.semantic_domain && selectedSemanticDomains.includes(data.semantic_domain));

            // Item must match at least one category AND one semantic domain if both are specified
            if (selectedCategories.length > 0 && selectedSemanticDomains.length > 0) {
                return matchesCategory && matchesSemanticDomain;
            }

            // If only categories are specified, item must match at least one category
            if (selectedCategories.length > 0) {
                return matchesCategory;
            }

            // If only semantic domains are specified, item must match at least one semantic domain
            if (selectedSemanticDomains.length > 0) {
                return matchesSemanticDomain;
            }

            return true;
        }).map(([key, data]) => ({
            value: key,
            label: databaseType === 'subjects' ? key : key,
            description: data.description || ''
        }));

        return filteredOptions;
    }

    /**
     * Get filtered adjective options based on selected categories
     */
    getFilteredAdjectiveOptions(selectedCategories = []) {
        if (!this.adjectives || Object.keys(this.adjectives).length === 0) {
            // Fallback to basic adjectives if database not loaded
            return [
                { value: 'good', label: 'good' },
                { value: 'excellent', label: 'excellent' },
                { value: 'interesting', label: 'interesting' },
                { value: 'difficult', label: 'difficult' },
                { value: 'engaging', label: 'engaging' },
                { value: 'various', label: 'various' },
                { value: 'challenging', label: 'challenging' },
                { value: 'captivating', label: 'captivating' }
            ];
        }

        // If no categories are selected, return all options
        if (selectedCategories.length === 0) {
            return this.getAdjectiveOptions();
        }

        const filteredOptions = Object.entries(this.adjectives).filter(([key, adjData]) => {
            return adjData.category && selectedCategories.includes(adjData.category);
        }).map(([key, adjData]) => ({
            value: key,
            label: key
        }));

        return filteredOptions;
    }

    /**
     * Check if a selected item matches the current filters
     */
    checkItemMatchesFilters(itemKey, databaseType, selectedCategories = [], selectedSemanticDomains = []) {
        const nouns = this.getNouns(databaseType);
        const item = nouns[itemKey];

        if (!item) return false;

        // Check if item matches any selected category
        const matchesCategory = selectedCategories.length === 0 ||
            (item.category && selectedCategories.includes(item.category));

        // Check if item matches any selected semantic domain
        const matchesSemanticDomain = selectedSemanticDomains.length === 0 ||
            (item.semantic_domain && selectedSemanticDomains.includes(item.semantic_domain));

        // Item must match at least one category AND one semantic domain if both are specified
        if (selectedCategories.length > 0 && selectedSemanticDomains.length > 0) {
            return matchesCategory && matchesSemanticDomain;
        }

        // If only categories are specified, item must match at least one category
        if (selectedCategories.length > 0) {
            return matchesCategory;
        }

        // If only semantic domains are specified, item must match at least one semantic domain
        if (selectedSemanticDomains.length > 0) {
            return matchesSemanticDomain;
        }

        return true;
    }

    /**
     * Check if a selected adjective matches the current filters
     */
    checkAdjectiveMatchesFilters(adjectiveKey, selectedCategories = []) {
        if (!this.adjectives || !this.adjectives[adjectiveKey]) return false;

        const adjective = this.adjectives[adjectiveKey];

        // If no categories are selected, it matches
        if (selectedCategories.length === 0) return true;

        return adjective.category && selectedCategories.includes(adjective.category);
    }

    /**
     * Save categories to localStorage
     */
    saveCategoriesToStorage() {
        try {
            localStorage.setItem('verb_editor_categories', JSON.stringify(this.categories));
        } catch (error) {
            console.warn('Failed to save categories to localStorage:', error);
        }
    }

    /**
     * Load categories from localStorage
     */
    loadCategoriesFromStorage() {
        try {
            const stored = localStorage.getItem('verb_editor_categories');
            if (stored) {
                const parsed = JSON.parse(stored);
                this.categories = { ...this.categories, ...parsed };
            }
        } catch (error) {
            console.warn('Failed to load categories from localStorage:', error);
        }
    }

    /**
     * Get database statistics
     */
    getDatabaseStats() {
        return {
            totalVerbs: this.verbs.length,
            totalSubjects: Object.keys(this.subjects).length,
            totalDirectObjects: Object.keys(this.directObjects).length,
            totalIndirectObjects: Object.keys(this.indirectObjects).length,
            totalCategories: Object.keys(this.categories).length,
            totalAdjectives: Object.keys(this.adjectives).length,
            loaded: this.loaded,
            loading: this.loading
        };
    }

    /**
     * Reload database
     */
    async reload() {
        this.loaded = false;
        await this.initialize();
    }

    /**
     * Cache validation with expiry checking
     */
    isCacheValid(key) {
        if (!this.cache.has(key)) return false;

        const expiry = this.cacheExpiry.get(key);
        if (!expiry) return false;

        return Date.now() < expiry;
    }

    /**
     * Performance-optimized suggestions with caching
     */
    getSuggestions(type, query, verbSemantics = null) {
        const queryStartTime = performance.now();
        const cacheKey = `suggestions_${type}_${query}_${verbSemantics || 'none'}`;

        // Check cache first
        if (this.cache.has(cacheKey)) {
            this.performanceMetrics.cacheHits++;
            return this.cache.get(cacheKey);
        }

        let database;
        switch (type) {
            case 'subjects':
                database = this.subjects;
                break;
            case 'direct_objects':
                database = this.directObjects;
                break;
            case 'indirect_objects':
                database = this.indirectObjects;
                break;
            default:
                return [];
        }

        if (!database || Object.keys(database).length === 0) {
            return [];
        }

        // Optimized filtering with early termination
        const suggestions = [];
        const queryLower = query.toLowerCase();
        let count = 0;
        const maxSuggestions = 10;

        for (const [key, data] of Object.entries(database)) {
            if (count >= maxSuggestions) break;

            const matchesQuery = key.toLowerCase().includes(queryLower);
            if (!matchesQuery) continue;

            const matchesVerb = !verbSemantics ||
                !data.verb_compatibility ||
                data.verb_compatibility.includes(verbSemantics);

            if (matchesVerb) {
                suggestions.push({
                    key,
                    base: data.base || key,
                    english: data.english?.singular || key
                });
                count++;
            }
        }

        // Cache the result
        this.cache.set(cacheKey, suggestions);
        this.cacheExpiry.set(cacheKey, Date.now() + (this.cacheTimeout / 2)); // Shorter cache for suggestions

        this.performanceMetrics.queryTimes[type] = performance.now() - queryStartTime;
        this.performanceMetrics.cacheMisses++;

        return suggestions;
    }

    /**
     * Memory management and cleanup
     */
    cleanup() {
        // Clear expired cache entries
        const now = Date.now();
        for (const [key, expiry] of this.cacheExpiry.entries()) {
            if (now > expiry) {
                this.cache.delete(key);
                this.cacheExpiry.delete(key);
            }
        }

        // Limit cache size to prevent memory issues
        const maxCacheSize = 100;
        if (this.cache.size > maxCacheSize) {
            const entries = Array.from(this.cache.entries());
            entries.sort((a, b) => {
                const expiryA = this.cacheExpiry.get(a[0]) || 0;
                const expiryB = this.cacheExpiry.get(b[0]) || 0;
                return expiryA - expiryB;
                return expiryA - expiryB;
            });

            // Remove oldest entries
            const toRemove = entries.slice(0, this.cache.size - maxCacheSize);
            toRemove.forEach(([key]) => {
                this.cache.delete(key);
                this.cacheExpiry.delete(key);
            });
        }

        // Update memory usage tracking
        this.memoryUsage = this.cache.size * 1024; // Rough estimate
    }

    /**
     * Performance metrics logging
     */
    logPerformanceMetrics() {
        const totalTime = performance.now() - this.startTime;

        console.group('🚀 Database Performance Metrics');
        // Performance metrics logging disabled for performance reasons
        console.groupEnd();
    }

    /**
     * Get performance summary for monitoring
     */
    getPerformanceSummary() {
        return {
            totalTime: performance.now() - this.startTime,
            loadTimes: this.performanceMetrics.loadTimes,
            queryTimes: this.performanceMetrics.queryTimes,
            cacheStats: {
                hits: this.performanceMetrics.cacheHits,
                misses: this.performanceMetrics.cacheMisses,
                hitRate: this.performanceMetrics.cacheHits / (this.performanceMetrics.cacheHits + this.performanceMetrics.cacheMisses)
            },
            memoryUsage: this.memoryUsage,
            cacheSize: this.cache.size
        };
    }

    /**
     * Force refresh of cached data
     */
    async refreshCache() {
        // console.log('Refreshing database cache...');

        // Clear all cache
        this.cache.clear();
        this.cacheExpiry.clear();

        // Reload all databases
        await this.loadCriticalData();
        this.startLazyLoading();

        // console.log('Database cache refreshed successfully');
    }
}

