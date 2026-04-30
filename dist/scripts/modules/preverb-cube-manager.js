/**
 * Preverb Cube Manager
 * Mounts verb-specific preverb-cube embeds for mapped verbs.
 */
export class PreverbCubeManager {
    constructor(enhancedVerbLoader = null) {
        this.enhancedVerbLoader = enhancedVerbLoader;
        this.initialized = false;
        this.mountPreverbDiagram = null;
        this.verbProfileMap = new Map();
        this.embeds = new Map();
        this.onVerbRendered = null;
        this.themeObserver = null;
    }

    async initialize() {
        try {
            await this.loadVerbProfileMap();
            if (this.verbProfileMap.size === 0) {
                return false;
            }

            await this.loadEmbedLibrary();
            if (typeof this.mountPreverbDiagram !== 'function') {
                return false;
            }

            this.renderEmbedsForCurrentSections();
            this.setupThemeSync();
            this.onVerbRendered = (event) => {
                const verbId = Number(event?.detail?.verbId);
                if (!Number.isInteger(verbId)) {
                    return;
                }
                const section = document.getElementById(`verb-${verbId}`);
                if (section) {
                    this.renderEmbedForSection(section);
                }
            };
            document.addEventListener('verbRendered', this.onVerbRendered);

            this.initialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize preverb cube manager:', error);
            return false;
        }
    }

    isInitialized() {
        return this.initialized;
    }

    async loadVerbProfileMap() {
        const candidatePaths = [
            'data/preverb-cube/verb-profile-map.json',
            'src/data/preverb-cube/verb-profile-map.json'
        ];

        for (const path of candidatePaths) {
            try {
                const response = await fetch(path);
                if (!response.ok) {
                    continue;
                }
                const payload = await response.json();
                const profiles = payload?.profiles;
                if (!profiles || typeof profiles !== 'object') {
                    continue;
                }

                this.verbProfileMap.clear();
                Object.entries(profiles).forEach(([verbId, config]) => {
                    const normalizedVerbId = Number(verbId);
                    const verbKey = String(config?.verbKey || '').trim();
                    if (!Number.isInteger(normalizedVerbId) || !verbKey) {
                        return;
                    }
                    this.verbProfileMap.set(normalizedVerbId, {
                        verbKey,
                        label: String(config?.label || '').trim()
                    });
                });

                if (this.verbProfileMap.size > 0) {
                    return;
                }
            } catch (error) {
                // Try the next candidate path.
            }
        }
    }

    async loadEmbedLibrary() {
        this.ensureEmbedStylesheet();
        this.ensureHostPageStyleOverrides();

        const moduleCandidatePaths = [
            '../../preverb-cube-lib/acha-mimo.js',
            '../../../preverb-cube/dist-lib/acha-mimo.js'
        ];

        for (const modulePath of moduleCandidatePaths) {
            try {
                const module = await import(modulePath);
                if (typeof module?.mountPreverbDiagram === 'function') {
                    this.mountPreverbDiagram = module.mountPreverbDiagram;
                    return;
                }
            } catch (error) {
                // Try next module path.
            }
        }
    }

    ensureEmbedStylesheet() {
        if (document.getElementById('preverb-cube-embed-css')) {
            return;
        }

        const cssLink = document.createElement('link');
        cssLink.id = 'preverb-cube-embed-css';
        cssLink.rel = 'stylesheet';
        cssLink.href = 'preverb-cube-lib/acha-mimo.css';
        document.head.appendChild(cssLink);
    }

    ensureHostPageStyleOverrides() {
        if (document.getElementById('preverb-cube-host-overrides')) {
            this.forceHostScrollUnlock();
            return;
        }

        // Prevent embedded library defaults from disabling host-page scroll.
        const style = document.createElement('style');
        style.id = 'preverb-cube-host-overrides';
        style.textContent = `
            html, body {
                overflow: auto !important;
                overflow-y: auto !important;
                height: auto !important;
                min-height: 100%;
            }
            body {
                position: static !important;
            }
        `;
        document.head.appendChild(style);
        this.forceHostScrollUnlock();
    }

    forceHostScrollUnlock() {
        document.documentElement.style.setProperty('overflow', 'auto', 'important');
        document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
        document.documentElement.style.setProperty('height', 'auto', 'important');
        document.body.style.setProperty('overflow', 'auto', 'important');
        document.body.style.setProperty('overflow-y', 'auto', 'important');
        document.body.style.setProperty('height', 'auto', 'important');
    }

    getCurrentTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        return current === 'dark' ? 'dark' : 'light';
    }

    applyThemeToWrapper(wrapper, themeName) {
        if (!wrapper) {
            return;
        }
        wrapper.dataset.theme = themeName;
    }

    applyThemeToAllEmbeds() {
        const themeName = this.getCurrentTheme();
        this.embeds.forEach((entry) => {
            this.applyThemeToWrapper(entry?.wrapper, themeName);
            if (entry?.handle && typeof entry.handle.setTheme === 'function') {
                entry.handle.setTheme(themeName);
            }
        });
    }

    setupThemeSync() {
        if (this.themeObserver) {
            this.applyThemeToAllEmbeds();
            return;
        }

        this.themeObserver = new MutationObserver((mutations) => {
            const changed = mutations.some(
                (mutation) =>
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme'
            );
            if (changed) {
                this.applyThemeToAllEmbeds();
            }
        });

        this.themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        this.applyThemeToAllEmbeds();
    }

    renderEmbedsForCurrentSections() {
        const sections = document.querySelectorAll('.verb-section[id^="verb-"]');
        sections.forEach((section) => this.renderEmbedForSection(section));
    }

    cleanupEmbedForVerbId(verbId) {
        const existing = this.embeds.get(verbId);
        if (existing?.handle && typeof existing.handle.destroy === 'function') {
            existing.handle.destroy();
        }
        this.embeds.delete(verbId);
    }

    async renderEmbedForSection(section) {
        const rawId = String(section?.id || '').replace('verb-', '');
        const verbId = Number(rawId);
        if (!Number.isInteger(verbId)) {
            return;
        }

        this.cleanupEmbedForVerbId(verbId);

        const existingContainer = section.querySelector('.related-preverb-cube');
        if (existingContainer) {
            existingContainer.remove();
        }

        const mapping = this.verbProfileMap.get(verbId);
        if (!mapping) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'related-preverb-cube';
        this.applyThemeToWrapper(wrapper, this.getCurrentTheme());

        const heading = document.createElement('h4');
        heading.textContent = 'Preverb Context';
        wrapper.appendChild(heading);

        const subTitle = document.createElement('p');
        subTitle.className = 'related-preverb-cube-title';
        subTitle.textContent = mapping.label || 'Verb-specific conceptual preverb view';
        wrapper.appendChild(subTitle);

        const host = document.createElement('div');
        host.className = 'preverb-cube-embed-host';
        wrapper.appendChild(host);

        const openFullLink = document.createElement('a');
        openFullLink.className = 'preverb-cube-open-full';
        openFullLink.href = 'preverb-cube/';
        openFullLink.textContent = 'Open full preverb cube';
        wrapper.appendChild(openFullLink);

        const contentContainer = section.querySelector('.verb-content-container');
        if (contentContainer) {
            contentContainer.appendChild(wrapper);
        } else {
            section.appendChild(wrapper);
        }

        try {
            const handle = await this.mountPreverbDiagram({
                container: host,
                mode: 'verb',
                verbKey: mapping.verbKey,
                embedded: true,
                theme: this.getCurrentTheme(),
                preverbsUrl: 'preverb-cube/data/preverbs.json',
                layoutUrl: 'preverb-cube/data/layout.json',
                diagramVerbsUrl: 'preverb-cube/data/diagram_verbs.json'
            });

            // Keep embeds verb-constrained by immediately setting fixed mode/profile.
            if (handle?.setMode) {
                handle.setMode('verb', mapping.verbKey);
            }
            if (handle?.setTheme) {
                handle.setTheme(this.getCurrentTheme());
            }
            this.embeds.set(verbId, { handle, wrapper });
            this.applyThemeToWrapper(wrapper, this.getCurrentTheme());
        } catch (error) {
            host.innerHTML = '<p class="preverb-cube-embed-error">Preverb cube embed could not be loaded.</p>';
        }
    }

    destroy() {
        if (this.themeObserver) {
            this.themeObserver.disconnect();
            this.themeObserver = null;
        }
        if (this.onVerbRendered) {
            document.removeEventListener('verbRendered', this.onVerbRendered);
            this.onVerbRendered = null;
        }

        Array.from(this.embeds.keys()).forEach((verbId) => {
            this.cleanupEmbedForVerbId(verbId);
        });
        this.embeds.clear();
        this.initialized = false;
    }
}
