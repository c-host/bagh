/**
 * Test Configuration for Modular Bagh System
 * 
 * This file provides configuration and utilities for testing the modular system
 * during development and before production deployment.
 */

export const TestConfig = {
    // Enable/disable various testing features
    enableVerboseLogging: true,
    enablePerformanceMonitoring: true,
    enableErrorSimulation: false,
    enableMockData: false,

    // Performance thresholds
    maxInitializationTime: 5000, // 5 seconds
    maxModuleLoadTime: 1000,     // 1 second
    maxEventResponseTime: 100,   // 100ms

    // Test data
    testVerbs: ['test-verb-1', 'test-verb-2'],
    testPreverbs: ['მი', 'წა', 'გა'],

    // Mock responses for testing
    mockResponses: {
        'data/verb_test-verb-1.json': {
            conjugations: {
                present: { forms: { '1sg': 'test-1sg', '2sg': 'test-2sg' } },
                future: { forms: { '1sg': 'test-fut-1sg', '2sg': 'test-fut-2sg' } }
            },
            preverb_config: { default_preverb: 'მი' },
            preverb_rules: { default: 'მი', replacements: { 'წა': 'წა', 'გა': 'გა' } }
        }
    }
};

/**
 * Test utilities for the modular system
 */
export class TestUtils {
    /**
     * Measure execution time of a function
     * @param {Function} fn - Function to measure
     * @param {string} label - Label for the measurement
     * @returns {number} Execution time in milliseconds
     */
    static measureExecutionTime(fn, label = 'Function') {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        const duration = end - start;

        if (TestConfig.enableVerboseLogging) {
            console.log(`⏱️ ${label} execution time: ${duration.toFixed(2)}ms`);
        }

        return { result, duration };
    }

    /**
     * Measure async execution time
     * @param {Function} asyncFn - Async function to measure
     * @param {string} label - Label for the measurement
     * @returns {Promise<Object>} Result and execution time
     */
    static async measureAsyncExecutionTime(asyncFn, label = 'Async Function') {
        const start = performance.now();
        const result = await asyncFn();
        const end = performance.now();
        const duration = end - start;

        if (TestConfig.enableVerboseLogging) {
            console.log(`⏱️ ${label} execution time: ${duration.toFixed(2)}ms`);
        }

        return { result, duration };
    }

    /**
     * Simulate network delay for testing
     * @param {number} delay - Delay in milliseconds
     * @returns {Promise<void>}
     */
    static async simulateNetworkDelay(delay = 100) {
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    /**
     * Create mock fetch response
     * @param {Object} data - Data to return
     * @param {number} status - HTTP status code
     * @returns {Response} Mock response object
     */
    static createMockResponse(data, status = 200) {
        return new Response(JSON.stringify(data), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * Mock fetch for testing
     * @param {string} url - URL to mock
     * @returns {Promise<Response>} Mock response
     */
    static async mockFetch(url) {
        if (TestConfig.enableMockData && TestConfig.mockResponses[url]) {
            await this.simulateNetworkDelay(50); // Simulate network delay
            return this.createMockResponse(TestConfig.mockResponses[url]);
        }

        // Fall back to real fetch
        return fetch(url);
    }

    /**
     * Validate module initialization
     * @param {Object} module - Module to validate
     * @param {string} moduleName - Name of the module
     * @returns {boolean} Validation result
     */
    static validateModule(module, moduleName) {
        if (!module) {
            console.error(`❌ ${moduleName}: Module is null or undefined`);
            return false;
        }

        if (typeof module.isInitialized !== 'function') {
            console.error(`❌ ${moduleName}: Missing isInitialized method`);
            return false;
        }

        if (typeof module.initialize !== 'function') {
            console.error(`❌ ${moduleName}: Missing initialize method`);
            return false;
        }

        if (typeof module.destroy !== 'function') {
            console.error(`❌ ${moduleName}: Missing destroy method`);
            return false;
        }

        console.log(`✅ ${moduleName}: Module validation passed`);
        return true;
    }

    /**
     * Run comprehensive module tests
     * @param {Object} app - Main application instance
     * @returns {Object} Test results
     */
    static async runModuleTests(app) {
        console.log('🧪 Running comprehensive module tests...');

        const results = {
            total: 0,
            passed: 0,
            failed: 0,
            details: {}
        };

        const managers = app.getManagers();
        const expectedModules = [
            'domManager', 'themeManager', 'fontManager', 'notepadManager',
            'filterManager', 'sidebarManager', 'verbDataManager', 'preverbManager', 'eventManager', 'helpManager'
        ];

        for (const moduleName of expectedModules) {
            results.total++;
            const module = managers[moduleName];

            try {
                if (this.validateModule(module, moduleName)) {
                    results.passed++;
                    results.details[moduleName] = { status: 'PASSED', message: 'Module validation successful' };
                } else {
                    results.failed++;
                    results.details[moduleName] = { status: 'FAILED', message: 'Module validation failed' };
                }
            } catch (error) {
                results.failed++;
                results.details[moduleName] = { status: 'ERROR', message: error.message };
            }
        }

        console.log(`🧪 Test Results: ${results.passed}/${results.total} passed, ${results.failed} failed`);
        return results;
    }

    /**
     * Performance benchmark for the system
     * @param {Object} app - Main application instance
     * @returns {Object} Performance metrics
     */
    static async runPerformanceBenchmark(app) {
        if (!TestConfig.enablePerformanceMonitoring) {
            return { enabled: false };
        }

        console.log('📊 Running performance benchmark...');

        const metrics = {
            initializationTime: 0,
            moduleLoadTimes: {},
            memoryUsage: 0,
            eventResponseTimes: {}
        };

        // Measure initialization time (only if not already initialized)
        if (!app.initialized) {
            const initStart = performance.now();
            await app.initialize();
            const initEnd = performance.now();
            metrics.initializationTime = initEnd - initStart;
        } else {
            metrics.initializationTime = 0; // Already initialized
        }

        // Measure individual module performance (without re-initializing)
        const managers = app.getManagers();
        for (const [name, manager] of Object.entries(managers)) {
            if (manager && typeof manager.getConfig === 'function') {
                const start = performance.now();
                const config = manager.getConfig();
                const end = performance.now();
                metrics.moduleLoadTimes[name] = end - start;
            }
        }

        // Memory usage (if available)
        if (performance.memory) {
            metrics.memoryUsage = performance.memory.usedJSHeapSize;
        }

        console.log('📊 Performance benchmark completed');
        return metrics;
    }
}

/**
 * Error simulation utilities for testing
 */
export class ErrorSimulator {
    /**
     * Simulate network error
     * @param {string} url - URL to simulate error for
     * @returns {Promise<Response>} Error response
     */
    static async simulateNetworkError(url) {
        await TestUtils.simulateNetworkDelay(100);
        return TestUtils.createMockResponse({ error: 'Network error simulated' }, 500);
    }

    /**
     * Simulate timeout error
     * @param {string} url - URL to simulate timeout for
     * @returns {Promise<Response>} Timeout response
     */
    static async simulateTimeout(url) {
        await TestUtils.simulateNetworkDelay(10000); // 10 second delay
        return TestUtils.createMockResponse({ error: 'Timeout simulated' }, 408);
    }
}

// Export for use in other modules
export default { TestConfig, TestUtils, ErrorSimulator };
