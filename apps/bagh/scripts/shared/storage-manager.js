/**
 * Storage Manager - Centralized localStorage operations with batching
 * 
 * This module provides optimized localStorage operations with batching,
 * error handling, and performance monitoring.
 */

import { STORAGE_KEYS } from './constants.js';

/**
 * Centralized storage manager for optimized localStorage operations
 */
export class StorageManager {
    constructor() {
        this.pendingWrites = new Map();
        this.writeTimeout = null;
        this.batchDelay = 50; // Batch writes within 50ms
        this.isInitialized = false;
    }

    /**
     * Initialize the storage manager
     * @returns {Promise<boolean>} Success status
     */
    async initialize() {
        try {
            // Pre-load all storage data in a single batch
            await this.preloadStorageData();
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize StorageManager:', error);
            return false;
        }
    }

    /**
     * Pre-load all storage data to avoid repeated synchronous reads
     * @returns {Promise<Object>} All storage data
     */
    async preloadStorageData() {
        return new Promise((resolve) => {
            // Use requestIdleCallback for non-blocking storage reads
            if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                    const data = this.loadAllStorageData();
                    resolve(data);
                }, { timeout: 100 });
            } else {
                // Fallback for browsers without requestIdleCallback
                setTimeout(() => {
                    const data = this.loadAllStorageData();
                    resolve(data);
                }, 0);
            }
        });
    }

    /**
     * Load all storage data synchronously (called in idle time)
     * @returns {Object} All storage data
     */
    loadAllStorageData() {
        const data = {};

        try {
            // Load all known storage keys
            data[STORAGE_KEYS.THEME] = localStorage.getItem(STORAGE_KEYS.THEME);
            data[STORAGE_KEYS.FONT] = localStorage.getItem(STORAGE_KEYS.FONT);
            data[STORAGE_KEYS.NOTEPAD_CONTENT] = localStorage.getItem(STORAGE_KEYS.NOTEPAD_CONTENT);
            data[STORAGE_KEYS.NOTEPAD_SIZE] = localStorage.getItem(STORAGE_KEYS.NOTEPAD_SIZE);
            data[STORAGE_KEYS.SIDEBAR_STATE] = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE);

        } catch (error) {
            // Failed to load storage data
        }

        return data;
    }

    /**
     * Get a value from storage (from pre-loaded cache)
     * @param {string} key - Storage key
     * @param {*} defaultValue - Default value if key doesn't exist
     * @returns {*} Stored value or default
     */
    get(key, defaultValue = null) {
        try {
            // First try pre-loaded cache
            if (this.preloadedData && this.preloadedData.hasOwnProperty(key)) {
                return this.preloadedData[key] || defaultValue;
            }

            // Fallback to direct localStorage read
            const value = localStorage.getItem(key);
            return value !== null ? value : defaultValue;
        } catch (error) {
            console.warn(`Failed to get storage key ${key}:`, error);
            return defaultValue;
        }
    }

    /**
     * Set a value in storage (batched for performance)
     * @param {string} key - Storage key
     * @param {*} value - Value to store
     * @param {boolean} immediate - Whether to write immediately
     */
    set(key, value, immediate = false) {
        try {
            if (immediate) {
                localStorage.setItem(key, value);
            } else {
                // Add to pending writes batch
                this.pendingWrites.set(key, value);
                this.scheduleBatchWrite();
            }
        } catch (error) {
            console.warn(`Failed to set storage key ${key}:`, error);
        }
    }

    /**
     * Schedule a batched write operation
     */
    scheduleBatchWrite() {
        if (this.writeTimeout) {
            clearTimeout(this.writeTimeout);
        }

        this.writeTimeout = setTimeout(() => {
            this.flushPendingWrites();
        }, this.batchDelay);
    }

    /**
     * Flush all pending writes to localStorage
     */
    flushPendingWrites() {
        if (this.pendingWrites.size === 0) return;

        try {
            // Batch all writes
            for (const [key, value] of this.pendingWrites) {
                localStorage.setItem(key, value);
            }

            console.log(`💾 Batched ${this.pendingWrites.size} storage writes`);
            this.pendingWrites.clear();
        } catch (error) {
            console.error('Failed to flush pending writes:', error);
            this.pendingWrites.clear();
        }
    }

    /**
     * Remove a key from storage
     * @param {string} key - Storage key to remove
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
            // Remove from pending writes if it exists
            this.pendingWrites.delete(key);
        } catch (error) {
            console.warn(`Failed to remove storage key ${key}:`, error);
        }
    }

    /**
     * Clear all storage data
     */
    clear() {
        try {
            localStorage.clear();
            this.pendingWrites.clear();
        } catch (error) {
            console.warn('Failed to clear storage:', error);
        }
    }

    /**
     * Get storage usage information
     * @returns {Object} Storage usage stats
     */
    getStorageInfo() {
        try {
            let totalSize = 0;
            const items = {};

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const size = (key.length + value.length) * 2; // Approximate size in bytes
                totalSize += size;
                items[key] = { size, value: value.substring(0, 50) + '...' };
            }

            return {
                totalSize,
                itemCount: localStorage.length,
                items
            };
        } catch (error) {
            return { error: error.message };
        }
    }

    /**
     * Check if storage is available
     * @returns {boolean} Whether localStorage is available
     */
    isStorageAvailable() {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if manager is initialized
     * @returns {boolean} Initialization status
     */
    isInitialized() {
        return this.isInitialized;
    }

    /**
     * Destroy the storage manager
     */
    destroy() {
        // Flush any pending writes
        this.flushPendingWrites();

        if (this.writeTimeout) {
            clearTimeout(this.writeTimeout);
            this.writeTimeout = null;
        }

        this.pendingWrites.clear();
        this.isInitialized = false;
    }
}

// Create singleton instance
export const storageManager = new StorageManager();
