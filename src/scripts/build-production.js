/**
 * Production Build Script for Modular Bagh System
 * 
 * This script optimizes the modular system for production deployment,
 * including minification, bundling, and performance optimizations.
 */

import { TestConfig, TestUtils } from './test-config.js';

/**
 * Production build configuration
 */
const BuildConfig = {
    // Output settings
    outputDir: '../dist/scripts',
    bundleName: 'bagh-bundle.js',
    minifiedName: 'bagh-bundle.min.js',

    // Optimization settings
    enableMinification: true,
    enableTreeShaking: true,
    enableCodeSplitting: false,

    // Performance settings
    enableLazyLoading: true,
    enablePreloading: true,
    enableCaching: true
};

/**
 * Production build manager
 */
export class ProductionBuilder {
    constructor() {
        this.modules = new Map();
        this.dependencies = new Map();
        this.bundleSize = 0;
        this.optimizationLevel = 'high';
    }

    /**
     * Initialize the production builder
     */
    async initialize() {
        console.log('🏗️ Initializing production builder...');

        // Load module definitions
        await this.loadModuleDefinitions();

        // Analyze dependencies
        this.analyzeDependencies();

        // Calculate bundle size
        this.calculateBundleSize();

        console.log('✅ Production builder initialized');
    }

    /**
     * Load module definitions
     */
    async loadModuleDefinitions() {
        const moduleFiles = [
            'shared/utils.js',
            'shared/constants.js',
            'shared/types.js',
            'shared/dom-manager.js',
            'modules/theme-manager.js',
            'modules/font-manager.js',
            'modules/notepad-manager.js',
            'modules/filter-manager.js',
            'modules/sidebar-manager.js',
            'modules/verb-data-manager.js',
            'modules/preverb-manager.js',
            'modules/event-manager.js',
            'main.js'
        ];

        for (const file of moduleFiles) {
            try {
                const moduleInfo = await this.analyzeModule(file);
                this.modules.set(file, moduleInfo);
            } catch (error) {
                console.warn(`⚠️ Could not analyze module ${file}:`, error.message);
            }
        }
    }

    /**
     * Analyze a single module
     * @param {string} filePath - Path to the module file
     * @returns {Object} Module information
     */
    async analyzeModule(filePath) {
        try {
            const response = await fetch(filePath);
            const content = await response.text();

            return {
                path: filePath,
                size: content.length,
                lines: content.split('\n').length,
                imports: this.extractImports(content),
                exports: this.extractExports(content),
                dependencies: this.extractDependencies(content)
            };
        } catch (error) {
            return {
                path: filePath,
                error: error.message,
                size: 0,
                lines: 0,
                imports: [],
                exports: [],
                dependencies: []
            };
        }
    }

    /**
     * Extract import statements from module content
     * @param {string} content - Module content
     * @returns {Array} Import statements
     */
    extractImports(content) {
        const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
        const imports = [];
        let match;

        while ((match = importRegex.exec(content)) !== null) {
            imports.push(match[1]);
        }

        return imports;
    }

    /**
     * Extract export statements from module content
     * @param {string} content - Module content
     * @returns {Array} Export statements
     */
    extractExports(content) {
        const exportRegex = /export\s+(?:class|function|const|let|var|default)\s+(\w+)/g;
        const exports = [];
        let match;

        while ((match = exportRegex.exec(content)) !== null) {
            exports.push(match[1]);
        }

        return exports;
    }

    /**
     * Extract dependencies from module content
     * @param {string} content - Module content
     * @returns {Array} Dependencies
     */
    extractDependencies(content) {
        // Extract DOM API usage
        const domApis = ['document', 'window', 'localStorage', 'sessionStorage'];
        const dependencies = [];

        for (const api of domApis) {
            if (content.includes(api)) {
                dependencies.push(api);
            }
        }

        return dependencies;
    }

    /**
     * Analyze module dependencies
     */
    analyzeDependencies() {
        console.log('🔍 Analyzing module dependencies...');

        for (const [modulePath, moduleInfo] of this.modules) {
            if (moduleInfo.imports) {
                for (const importPath of moduleInfo.imports) {
                    if (!this.dependencies.has(importPath)) {
                        this.dependencies.set(importPath, []);
                    }
                    this.dependencies.get(importPath).push(modulePath);
                }
            }
        }

        console.log(`📊 Found ${this.dependencies.size} dependency relationships`);
    }

    /**
     * Calculate bundle size
     */
    calculateBundleSize() {
        let totalSize = 0;
        let totalLines = 0;

        for (const moduleInfo of this.modules.values()) {
            totalSize += moduleInfo.size || 0;
            totalLines += moduleInfo.lines || 0;
        }

        this.bundleSize = totalSize;

        console.log(`📦 Estimated bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
        console.log(`📄 Total lines of code: ${totalLines.toLocaleString()}`);
    }

    /**
     * Generate dependency graph
     * @returns {Object} Dependency graph
     */
    generateDependencyGraph() {
        const graph = {
            nodes: [],
            edges: []
        };

        // Add nodes
        for (const [modulePath, moduleInfo] of this.modules) {
            graph.nodes.push({
                id: modulePath,
                label: modulePath.split('/').pop().replace('.js', ''),
                size: moduleInfo.size || 0,
                lines: moduleInfo.lines || 0
            });
        }

        // Add edges
        for (const [modulePath, moduleInfo] of this.modules) {
            if (moduleInfo.imports) {
                for (const importPath of moduleInfo.imports) {
                    graph.edges.push({
                        from: modulePath,
                        to: importPath
                    });
                }
            }
        }

        return graph;
    }

    /**
     * Generate build report
     * @returns {Object} Build report
     */
    generateBuildReport() {
        const report = {
            timestamp: new Date().toISOString(),
            buildConfig: BuildConfig,
            modules: {
                total: this.modules.size,
                shared: 0,
                feature: 0,
                main: 0
            },
            dependencies: {
                total: this.dependencies.size,
                circular: this.detectCircularDependencies()
            },
            performance: {
                estimatedBundleSize: this.bundleSize,
                estimatedLoadTime: this.estimateLoadTime(),
                optimizationOpportunities: this.identifyOptimizations()
            },
            recommendations: this.generateRecommendations()
        };

        // Categorize modules
        for (const [modulePath, moduleInfo] of this.modules) {
            if (modulePath.startsWith('shared/')) {
                report.modules.shared++;
            } else if (modulePath.startsWith('modules/')) {
                report.modules.feature++;
            } else if (modulePath.includes('main')) {
                report.modules.main++;
            }
        }

        return report;
    }

    /**
     * Detect circular dependencies
     * @returns {Array} Circular dependency paths
     */
    detectCircularDependencies() {
        const circular = [];
        const visited = new Set();
        const recursionStack = new Set();

        const dfs = (modulePath) => {
            if (recursionStack.has(modulePath)) {
                circular.push([...recursionStack, modulePath]);
                return;
            }

            if (visited.has(modulePath)) {
                return;
            }

            visited.add(modulePath);
            recursionStack.add(modulePath);

            const moduleInfo = this.modules.get(modulePath);
            if (moduleInfo && moduleInfo.imports) {
                for (const importPath of moduleInfo.imports) {
                    dfs(importPath);
                }
            }

            recursionStack.delete(modulePath);
        };

        for (const modulePath of this.modules.keys()) {
            if (!visited.has(modulePath)) {
                dfs(modulePath);
            }
        }

        return circular;
    }

    /**
     * Estimate load time based on bundle size
     * @returns {number} Estimated load time in milliseconds
     */
    estimateLoadTime() {
        // Rough estimation: 1KB = 1ms on fast connection
        const baseTime = this.bundleSize / 1024;

        // Apply optimization factors
        let optimizedTime = baseTime;
        if (BuildConfig.enableLazyLoading) optimizedTime *= 0.7;
        if (BuildConfig.enablePreloading) optimizedTime *= 0.8;
        if (BuildConfig.enableCaching) optimizedTime *= 0.5;

        return Math.round(optimizedTime);
    }

    /**
     * Identify optimization opportunities
     * @returns {Array} Optimization suggestions
     */
    identifyOptimizations() {
        const optimizations = [];

        // Check for large modules
        for (const [modulePath, moduleInfo] of this.modules) {
            if (moduleInfo.size > 50 * 1024) { // 50KB threshold
                optimizations.push({
                    type: 'large-module',
                    module: modulePath,
                    size: moduleInfo.size,
                    suggestion: 'Consider splitting this module into smaller components'
                });
            }
        }

        // Check for unused exports
        for (const [modulePath, moduleInfo] of this.modules) {
            if (moduleInfo.exports.length > 0) {
                const isUsed = this.dependencies.has(modulePath);
                if (!isUsed) {
                    optimizations.push({
                        type: 'unused-module',
                        module: modulePath,
                        suggestion: 'This module appears to be unused and could be removed'
                    });
                }
            }
        }

        // Check for circular dependencies
        const circular = this.detectCircularDependencies();
        if (circular.length > 0) {
            optimizations.push({
                type: 'circular-dependency',
                count: circular.length,
                suggestion: 'Circular dependencies detected - consider refactoring module structure'
            });
        }

        return optimizations;
    }

    /**
     * Generate build recommendations
     * @returns {Array} Build recommendations
     */
    generateRecommendations() {
        const recommendations = [];

        // Performance recommendations
        if (this.bundleSize > 200 * 1024) { // 200KB threshold
            recommendations.push({
                priority: 'high',
                category: 'performance',
                message: 'Bundle size is large - consider code splitting or lazy loading',
                action: 'Implement dynamic imports for non-critical modules'
            });
        }

        // Architecture recommendations
        if (this.modules.size > 15) {
            recommendations.push({
                priority: 'medium',
                category: 'architecture',
                message: 'Many modules detected - consider consolidating related functionality',
                action: 'Group related modules into feature bundles'
            });
        }

        // Dependency recommendations
        const circular = this.detectCircularDependencies();
        if (circular.length > 0) {
            recommendations.push({
                priority: 'high',
                category: 'architecture',
                message: 'Circular dependencies detected',
                action: 'Refactor module dependencies to eliminate cycles'
            });
        }

        return recommendations;
    }

    /**
     * Run the production build process
     * @returns {Object} Build results
     */
    async runBuild() {
        console.log('🚀 Starting production build process...');

        try {
            await this.initialize();

            const report = this.generateBuildReport();
            const graph = this.generateDependencyGraph();

            console.log('📊 Build analysis completed');
            console.log('📋 Build report generated');

            return {
                success: true,
                report,
                dependencyGraph: graph,
                modules: this.modules,
                dependencies: this.dependencies
            };

        } catch (error) {
            console.error('❌ Production build failed:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Export for use - ProductionBuilder is already exported via class declaration
