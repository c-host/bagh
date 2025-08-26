/**
 * Storage Manager for Verb Editor
 * Handles local storage persistence and file operations
 */

class StorageManager {
    constructor() {
        this.storageKey = 'verb_editor_progress';
        this.backupKey = 'verb_editor_backup';
        this.maxBackups = 5;
    }

    /**
     * Save progress to localStorage
     */
    async saveProgress(verbData) {
        try {
            const timestamp = new Date().toISOString();
            const progressData = {
                verb: verbData,
                timestamp: timestamp,
                version: '1.0'
            };

            // Save to localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(progressData));

            // Create backup
            await this.createBackup(progressData);

            console.log('[STORAGE] Progress saved successfully');
            console.log('[STORAGE] Saved data includes:', {
                hasGeorgian: !!verbData.georgian,
                hasConjugations: !!verbData.conjugations,
                hasArguments: !!verbData.syntax?.arguments,
                hasRawGlosses: verbData.conjugations ? Object.keys(verbData.conjugations).filter(tense => verbData.conjugations[tense].raw_gloss).length : 0
            });
            return true;
        } catch (error) {
            console.error('Failed to save progress:', error);
            throw new Error(`Failed to save progress: ${error.message}`);
        }
    }

    /**
     * Load progress from localStorage
     */
    async loadProgress() {
        try {
            const progressData = localStorage.getItem(this.storageKey);
            if (!progressData) {
                console.log('[STORAGE] No saved progress found');
                return null;
            }

            const parsed = JSON.parse(progressData);

            // Validate backup data
            if (!this.validateProgressData(parsed)) {
                console.warn('[STORAGE] Invalid progress data found, clearing...');
                this.clearProgress();
                return null;
            }

            console.log('[STORAGE] Progress loaded successfully');
            console.log('[STORAGE] Loaded data includes:', {
                hasGeorgian: !!parsed.verb.georgian,
                hasConjugations: !!parsed.verb.conjugations,
                hasArguments: !!parsed.verb.syntax?.arguments,
                hasRawGlosses: parsed.verb.conjugations ? Object.keys(parsed.verb.conjugations).filter(tense => parsed.verb.conjugations[tense].raw_gloss).length : 0,
                timestamp: parsed.timestamp
            });
            return parsed.verb;
        } catch (error) {
            console.error('[STORAGE] Failed to load progress:', error);
            return null;
        }
    }

    /**
     * Clear progress from localStorage
     */
    clearProgress() {
        try {
            localStorage.removeItem(this.storageKey);
            console.log('[STORAGE] Progress cleared successfully');
        } catch (error) {
            console.error('[STORAGE] Failed to clear progress:', error);
        }
    }

    /**
     * Create a backup of the current progress
     */
    async createBackup(progressData) {
        try {
            const backups = this.getBackups();

            // Add new backup
            backups.unshift({
                data: progressData,
                timestamp: new Date().toISOString()
            });

            // Keep only the most recent backups
            if (backups.length > this.maxBackups) {
                backups.splice(this.maxBackups);
            }

            // Save backups
            localStorage.setItem(this.backupKey, JSON.stringify(backups));
        } catch (error) {
            console.warn('Failed to create backup:', error);
        }
    }

    /**
     * Get list of available backups
     */
    getBackups() {
        try {
            const backupsData = localStorage.getItem(this.backupKey);
            return backupsData ? JSON.parse(backupsData) : [];
        } catch (error) {
            console.warn('Failed to load backups:', error);
            return [];
        }
    }

    /**
     * Restore from a specific backup
     */
    async restoreFromBackup(backupIndex) {
        try {
            const backups = this.getBackups();
            if (backupIndex < 0 || backupIndex >= backups.length) {
                throw new Error('Invalid backup index');
            }

            const backup = backups[backupIndex];
            const progressData = backup.data;

            // Validate backup data
            if (!this.validateProgressData(progressData)) {
                throw new Error('Invalid backup data');
            }

            // Restore to current progress
            await this.saveProgress(progressData.verb);

            console.log(`Restored from backup: ${backup.timestamp}`);
            return progressData.verb;
        } catch (error) {
            console.error('Failed to restore from backup:', error);
            throw new Error(`Failed to restore from backup: ${error.message}`);
        }
    }

    /**
     * Validate progress data structure
     */
    validateProgressData(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.verb || typeof data.verb !== 'object') return false;
        if (!data.timestamp || !data.version) return false;

        // Basic validation of verb structure
        const verb = data.verb;
        const requiredFields = ['georgian', 'description', 'category', 'semantic_key'];

        return requiredFields.every(field =>
            verb.hasOwnProperty(field) && verb[field] !== undefined
        );
    }

    /**
     * Export current progress to file
     */
    async exportToFile(verbData, filename = null) {
        try {
            if (!filename) {
                const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
                filename = `verb_${verbData.semantic_key || 'export'}_${timestamp}.json`;
            }

            const dataStr = JSON.stringify(verbData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });

            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = filename;
            link.style.display = 'none';

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            URL.revokeObjectURL(link.href);

            console.log(`Progress exported to ${filename}`);
            return filename;
        } catch (error) {
            console.error('Failed to export progress:', error);
            throw new Error(`Failed to export progress: ${error.message}`);
        }
    }

    /**
     * Import progress from file
     */
    async importFromFile(file) {
        return new Promise((resolve, reject) => {
            try {
                const reader = new FileReader();

                reader.onload = (event) => {
                    try {
                        const verbData = JSON.parse(event.target.result);

                        // Validate imported data
                        if (!this.validateVerbData(verbData)) {
                            reject(new Error('Invalid verb data format'));
                            return;
                        }

                        console.log('Progress imported successfully');
                        resolve(verbData);
                    } catch (parseError) {
                        reject(new Error(`Failed to parse file: ${parseError.message}`));
                    }
                };

                reader.onerror = () => {
                    reject(new Error('Failed to read file'));
                };

                reader.readAsText(file);
            } catch (error) {
                reject(new Error(`Failed to import file: ${error.message}`));
            }
        });
    }

    /**
     * Validate verb data structure
     */
    validateVerbData(verbData) {
        if (!verbData || typeof verbData !== 'object') return false;

        // Check for required fields
        const requiredFields = ['georgian', 'description', 'category', 'semantic_key'];
        if (!requiredFields.every(field => verbData.hasOwnProperty(field))) {
            return false;
        }

        // Check for basic structure
        if (!verbData.syntax || !verbData.conjugations || !verbData.english_translations) {
            return false;
        }

        return true;
    }

    /**
     * Get storage usage information
     */
    getStorageInfo() {
        try {
            const currentSize = localStorage.getItem(this.storageKey)?.length || 0;
            const backupsSize = localStorage.getItem(this.backupKey)?.length || 0;
            const totalSize = currentSize + backupsSize;

            return {
                currentSize: this.formatBytes(currentSize),
                backupsSize: this.formatBytes(backupsSize),
                totalSize: this.formatBytes(totalSize),
                backupCount: this.getBackups().length
            };
        } catch (error) {
            console.warn('Failed to get storage info:', error);
            return null;
        }
    }

    /**
     * Format bytes to human readable format
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Clear all backups
     */
    clearBackups() {
        try {
            localStorage.removeItem(this.backupKey);
            console.log('All backups cleared successfully');
        } catch (error) {
            console.error('Failed to clear backups:', error);
        }
    }

    /**
     * Check if localStorage is available and has sufficient space
     */
    checkStorageAvailability() {
        try {
            const testKey = '__storage_test__';
            const testData = 'x'.repeat(1000); // 1KB test

            localStorage.setItem(testKey, testData);
            const retrieved = localStorage.getItem(testKey);
            localStorage.removeItem(testKey);

            if (retrieved !== testData) {
                throw new Error('Storage test failed');
            }

            return {
                available: true,
                message: 'Local storage is available'
            };
        } catch (error) {
            return {
                available: false,
                message: `Local storage is not available: ${error.message}`
            };
        }
    }
}
