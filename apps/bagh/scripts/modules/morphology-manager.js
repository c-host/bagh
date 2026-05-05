/**
 * Morphology Manager
 * Provides read-only morphology chart viewing, search indexing, and verb backlinks.
 */
export class MorphologyManager {
    constructor(enhancedVerbLoader = null) {
        this.enhancedVerbLoader = enhancedVerbLoader;
        this.charts = [];
        this.nodeIndex = [];
        this.verbToNodes = new Map();
        this.currentChartIndex = 0;
        this.selectedNodeId = '';
        this.initialized = false;
        this.themeObserver = null;

        this.elements = {
            section: null,
            chartSelect: null,
            chartStage: null
        };
    }

    async initialize() {
        try {
            this.charts = await this.loadCharts();
            if (!Array.isArray(this.charts) || this.charts.length === 0) {
                return false;
            }

            this.buildIndexes();
            this.cacheViewerElements();
            this.setupViewer();
            this.attachVerbBacklinks();
            this.setupThemeSync();
            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize morphology manager:', error);
            return false;
        }
    }

    setEnhancedVerbLoader(enhancedVerbLoader) {
        this.enhancedVerbLoader = enhancedVerbLoader;
    }

    isInitialized() {
        return this.initialized;
    }

    async loadCharts() {
        const candidatePaths = [
            'data/morphology/charts.json',
            '../morphology-chart/data/charts.json',
            '../../morphology-chart/data/charts.json'
        ];

        for (const path of candidatePaths) {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    continue;
                }
                const payload = await response.json();
                if (Array.isArray(payload?.charts) && payload.charts.length > 0) {
                    return payload.charts;
                }
            } catch (error) {
                // Try the next path.
            }
        }

        return [];
    }

    buildIndexes() {
        this.nodeIndex = [];
        this.verbToNodes.clear();

        this.charts.forEach((chart, chartIndex) => {
            if (!chart?.root) {
                return;
            }
            this.indexNode(chart.root, chart, chartIndex, 0, null);
        });
    }

    indexNode(node, chart, chartIndex, depth, parentId) {
        const linkedVerbIds = this.normalizeVerbIds(node.linkedVerbIds);
        const entry = {
            nodeId: node.id,
            chartIndex,
            chartTitle: chart.title || `Chart ${chartIndex + 1}`,
            ka: String(node.ka || ''),
            en: String(node.en || ''),
            type: String(node.type || ''),
            depth,
            parentId,
            linkedVerbIds
        };
        this.nodeIndex.push(entry);

        linkedVerbIds.forEach((verbId) => {
            if (!this.verbToNodes.has(verbId)) {
                this.verbToNodes.set(verbId, []);
            }
            this.verbToNodes.get(verbId).push(entry);
        });

        (node.children || []).forEach((child) => {
            this.indexNode(child, chart, chartIndex, depth + 1, node.id);
        });
    }

    normalizeVerbIds(rawIds) {
        if (!Array.isArray(rawIds)) {
            return [];
        }

        return rawIds
            .map((id) => Number(id))
            .filter((id) => Number.isInteger(id) && id > 0);
    }

    cacheViewerElements() {
        this.elements.section = document.getElementById('morphology-viewer-section');
        this.elements.chartSelect = document.getElementById('morphology-chart-select');
        this.elements.chartStage = document.getElementById('morphology-chart-stage');
    }

    setupViewer() {
        if (!this.elements.section || !this.elements.chartSelect || !this.elements.chartStage) {
            return;
        }

        this.populateChartSelect();
        this.selectedNodeId = this.charts[0]?.root?.id || '';
        this.renderCurrentChart();

        this.elements.chartSelect.addEventListener('change', (event) => {
            this.currentChartIndex = Number(event.target.value);
            this.selectedNodeId = this.charts[this.currentChartIndex]?.root?.id || '';
            this.renderCurrentChart();
        });
    }

    populateChartSelect() {
        if (!this.elements.chartSelect) {
            return;
        }

        this.elements.chartSelect.replaceChildren();
        this.charts.forEach((chart, index) => {
            const option = document.createElement('option');
            option.value = String(index);
            option.textContent = chart.title || `Chart ${index + 1}`;
            this.elements.chartSelect.appendChild(option);
        });
        this.elements.chartSelect.value = String(this.currentChartIndex);
    }

    renderCurrentChart() {
        const chart = this.charts[this.currentChartIndex];
        if (!chart || !this.elements.chartStage) {
            return;
        }

        this.elements.chartStage.replaceChildren();
        const iframe = this.createMorphologyIframe(this.currentChartIndex, this.selectedNodeId ? [this.selectedNodeId] : []);
        iframe.classList.add('morphology-main-iframe');
        this.elements.chartStage.appendChild(iframe);
    }

    buildNodeElement(node, options = {}) {
        const {
            interactive = true,
            selectedNodeId = this.selectedNodeId,
            highlightedNodeIds = null
        } = options;
        const listItem = document.createElement('li');
        listItem.className = 'morphology-node';
        listItem.dataset.nodeId = node.id;

        const card = document.createElement('div');
        card.className = 'morphology-node-card';
        if (node.id === selectedNodeId) {
            card.classList.add('selected');
        }
        if (highlightedNodeIds && highlightedNodeIds.has(node.id)) {
            card.classList.add('persistent-highlight');
        }

        const ge = document.createElement('p');
        ge.className = 'morphology-node-ka georgian-text';
        ge.textContent = String(node.ka || '');
        card.appendChild(ge);

        const en = document.createElement('p');
        en.className = 'morphology-node-en';
        en.textContent = String(node.en || '');
        card.appendChild(en);

        if (node.type) {
            const type = document.createElement('p');
            type.className = 'morphology-node-type';
            type.textContent = String(node.type);
            card.appendChild(type);
        }

        const linkedVerbIds = this.normalizeVerbIds(node.linkedVerbIds);
        if (linkedVerbIds.length > 0) {
            const chips = document.createElement('div');
            chips.className = 'morphology-linked-verbs';
            linkedVerbIds.slice(0, 4).forEach((verbId) => {
                const chip = document.createElement('button');
                chip.type = 'button';
                chip.className = 'morphology-verb-chip';
                chip.textContent = `Verb #${verbId}`;
                chip.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.navigateToVerbId(verbId);
                });
                chips.appendChild(chip);
            });
            card.appendChild(chips);
        }

        if (interactive) {
            card.addEventListener('click', () => {
                this.selectedNodeId = node.id;
                this.renderCurrentChart();
            });
        } else {
            card.classList.add('readonly');
        }

        listItem.appendChild(card);

        if (Array.isArray(node.children) && node.children.length > 0) {
            const childList = document.createElement('ul');
            childList.className = 'morphology-children';
            node.children.forEach((child) => childList.appendChild(this.buildNodeElement(child, options)));
            listItem.appendChild(childList);
        }

        return listItem;
    }

    searchNodes(rawTerm) {
        const term = String(rawTerm || '').trim().toLowerCase();
        if (!term) {
            return [];
        }

        return this.nodeIndex
            .filter((entry) => {
                const text = `${entry.ka} ${entry.en} ${entry.type} ${entry.chartTitle}`.toLowerCase();
                return text.includes(term);
            })
            .slice(0, 120);
    }

    renderSearchResults(container, results, searchTerm, onResultNavigate) {
        container.innerHTML = '';

        if (!searchTerm.trim()) {
            const hint = document.createElement('div');
            hint.className = 'no-results';
            hint.textContent = 'Search morphology nodes by Georgian or English.';
            container.appendChild(hint);
            return;
        }

        if (!results || results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No morphology nodes found.';
            container.appendChild(noResults);
            return;
        }

        results.forEach((result) => {
            const item = document.createElement('div');
            item.className = 'toc-item morphology-search-result';
            item.innerHTML = `
                <div class="verb-georgian georgian-text">${result.ka || '(no Georgian label)'}</div>
                <div class="verb-description">${result.en || ''}</div>
                <div class="morphology-search-meta">${result.chartTitle} - ${result.type || 'Unknown type'}</div>
            `;

            item.addEventListener('click', () => {
                this.navigateToNode(result.chartIndex, result.nodeId);
                if (typeof onResultNavigate === 'function') {
                    onResultNavigate();
                }
            });

            container.appendChild(item);
        });
    }

    navigateToNode(chartIndex, nodeId) {
        if (!this.initialized) {
            return;
        }
        this.currentChartIndex = Number(chartIndex);
        this.selectedNodeId = nodeId;
        if (this.elements.chartSelect) {
            this.elements.chartSelect.value = String(this.currentChartIndex);
        }
        this.renderCurrentChart();
        this.showViewerSection();

        const selectedCard = this.elements.chartStage?.querySelector('.morphology-node-card.selected');
        selectedCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    showViewerSection() {
        if (!this.elements.section) {
            return;
        }
        this.elements.section.classList.remove('hidden');
        this.elements.section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    getNodesForVerbId(verbId) {
        const normalizedId = Number(verbId);
        if (!Number.isInteger(normalizedId)) {
            return [];
        }
        return this.verbToNodes.get(normalizedId) || [];
    }

    attachVerbBacklinks() {
        const sections = document.querySelectorAll('.verb-section[id^="verb-"]');
        sections.forEach((section) => this.renderBacklinksForSection(section));

        document.addEventListener('verbRendered', (event) => {
            const renderedVerbId = Number(event?.detail?.verbId);
            if (!Number.isInteger(renderedVerbId)) {
                return;
            }
            const section = document.getElementById(`verb-${renderedVerbId}`);
            if (section) {
                this.renderBacklinksForSection(section);
            }
        });
    }

    renderBacklinksForSection(section) {
        const rawId = String(section.id || '').replace('verb-', '');
        const verbId = Number(rawId);
        if (!Number.isInteger(verbId)) {
            return;
        }

        const relatedNodes = this.getNodesForVerbId(verbId);
        const existing = section.querySelector('.related-morphology');
        if (existing) {
            existing.remove();
        }

        if (relatedNodes.length === 0) {
            return;
        }

        const box = document.createElement('div');
        box.className = 'related-morphology';
        const title = document.createElement('h4');
        title.textContent = 'Morphological Context';
        box.appendChild(title);

        const groupedByChart = this.groupRelatedNodesByChart(relatedNodes);
        groupedByChart.forEach(({ chartIndex, chartTitle, nodeIds }) => {
            const chart = this.charts[chartIndex];
            if (!chart?.root) {
                return;
            }

            const contextualWrapper = document.createElement('div');
            contextualWrapper.className = 'related-morphology-context';

            const contextualTitle = document.createElement('p');
            contextualTitle.className = 'related-morphology-context-title';
            contextualTitle.textContent = `Full chart context: ${chartTitle}`;
            contextualWrapper.appendChild(contextualTitle);

            const embeddedIframe = this.createMorphologyIframe(chartIndex, Array.from(nodeIds));
            embeddedIframe.classList.add('embedded-context-iframe');
            contextualWrapper.appendChild(embeddedIframe);

            box.appendChild(contextualWrapper);
        });

        section.appendChild(box);
    }

    groupRelatedNodesByChart(relatedNodes) {
        const byChart = new Map();

        relatedNodes.forEach((node) => {
            if (!byChart.has(node.chartIndex)) {
                byChart.set(node.chartIndex, {
                    chartIndex: node.chartIndex,
                    chartTitle: node.chartTitle,
                    nodeIds: new Set()
                });
            }
            byChart.get(node.chartIndex).nodeIds.add(node.nodeId);
        });

        return Array.from(byChart.values());
    }

    getCurrentTheme() {
        const theme = document.documentElement.getAttribute('data-theme');
        return theme === 'dark' ? 'dark' : 'light';
    }

    setupThemeSync() {
        if (this.themeObserver) {
            this.themeObserver.disconnect();
        }

        this.themeObserver = new MutationObserver(() => {
            this.refreshEmbeddedIframeThemes();
        });
        this.themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    refreshEmbeddedIframeThemes() {
        const nextTheme = this.getCurrentTheme();
        const iframes = document.querySelectorAll('iframe.morphology-embed-iframe');
        iframes.forEach((iframe) => {
            const lastTheme = iframe.dataset.theme || '';
            if (lastTheme === nextTheme) {
                return;
            }

            iframe.dataset.theme = nextTheme;
            iframe.contentWindow?.postMessage(
                {
                    type: 'morphology-theme',
                    theme: nextTheme
                },
                window.location.origin
            );
        });
    }

    buildMorphologyIframeSrc(chartIndex, highlightedNodeIds = []) {
        const params = new URLSearchParams();
        params.set('embed', '1');
        params.set('readonly', '1');
        params.set('chartIndex', String(chartIndex));
        params.set('theme', this.getCurrentTheme());
        if (Array.isArray(highlightedNodeIds) && highlightedNodeIds.length > 0) {
            params.set('highlightNodeIds', highlightedNodeIds.join(','));
        }
        return `morphology-chart/index.html?${params.toString()}`;
    }

    createMorphologyIframe(chartIndex, highlightedNodeIds = []) {
        const iframe = document.createElement('iframe');
        iframe.className = 'morphology-embed-iframe';
        iframe.loading = 'lazy';
        iframe.referrerPolicy = 'no-referrer';
        iframe.src = this.buildMorphologyIframeSrc(chartIndex, highlightedNodeIds);
        iframe.dataset.theme = this.getCurrentTheme();
        iframe.title = 'Morphology chart viewer';
        return iframe;
    }

    createCanvasChart(rootNode, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'morphology-canvas';

        const viewport = document.createElement('div');
        viewport.className = 'morphology-canvas-viewport';
        const stage = document.createElement('div');
        stage.className = 'morphology-canvas-stage';

        const rootList = document.createElement('ul');
        rootList.className = 'morphology-tree tree';
        rootList.appendChild(this.buildNodeElement(rootNode, options));
        stage.appendChild(rootList);
        viewport.appendChild(stage);
        wrapper.appendChild(viewport);

        // Default canvas offset to show root with breathing room.
        stage.style.transform = 'translate(24px, 24px)';
        this.enableCanvasPan(viewport, stage);

        return wrapper;
    }

    enableCanvasPan(viewport, stage) {
        const pan = {
            isPointerDown: false,
            isDragging: false,
            pointerId: null,
            startX: 0,
            startY: 0,
            startPanX: 24,
            startPanY: 24,
            panX: 24,
            panY: 24
        };

        const applyTransform = () => {
            stage.style.transform = `translate(${Math.round(pan.panX)}px, ${Math.round(pan.panY)}px)`;
        };

        viewport.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) {
                return;
            }
            if (event.target.closest('.morphology-node-card')) {
                return;
            }
            pan.isPointerDown = true;
            pan.isDragging = false;
            pan.pointerId = event.pointerId;
            pan.startX = event.clientX;
            pan.startY = event.clientY;
            pan.startPanX = pan.panX;
            pan.startPanY = pan.panY;
            viewport.setPointerCapture(event.pointerId);
            event.preventDefault();
        });

        viewport.addEventListener('pointermove', (event) => {
            if (!pan.isPointerDown || event.pointerId !== pan.pointerId) {
                return;
            }
            const deltaX = event.clientX - pan.startX;
            const deltaY = event.clientY - pan.startY;
            if (!pan.isDragging && Math.abs(deltaX) + Math.abs(deltaY) > 4) {
                pan.isDragging = true;
                viewport.classList.add('dragging');
            }
            if (!pan.isDragging) {
                return;
            }
            pan.panX = pan.startPanX + deltaX;
            pan.panY = pan.startPanY + deltaY;
            applyTransform();
            event.preventDefault();
        });

        const endPan = (event) => {
            if (!pan.isPointerDown || event.pointerId !== pan.pointerId) {
                return;
            }
            pan.isPointerDown = false;
            pan.isDragging = false;
            pan.pointerId = null;
            viewport.classList.remove('dragging');
        };

        viewport.addEventListener('pointerup', endPan);
        viewport.addEventListener('pointercancel', endPan);
    }

    navigateToVerbId(verbId) {
        const normalizedId = Number(verbId);
        if (!Number.isInteger(normalizedId)) {
            return;
        }

        const section = document.getElementById(`verb-${normalizedId}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (this.enhancedVerbLoader && this.enhancedVerbLoader.isInitialized()) {
            this.enhancedVerbLoader.loadVerb(normalizedId, true).catch(() => {
                // Keep existing page state if load fails.
            });
        }
    }
}
