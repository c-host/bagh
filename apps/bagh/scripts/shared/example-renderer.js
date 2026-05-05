const EXAMPLE_TOGGLE_STORAGE_KEY = "baghExampleLayerToggles";

const ROLE_CLASS_MAP = {
    verb: "gloss-verb",
    subject: "gloss-subject",
    direct_object: "gloss-direct-object",
    indirect_object: "gloss-indirect-object",
    verbal_noun: "gloss-verbal-noun",
    adverb: "gloss-adverb",
    locative_surface: "gloss-locative-surface"
};

function normalizePreverb(preverb) {
    return preverb || "default";
}

function getStorageState() {
    try {
        const raw = localStorage.getItem(EXAMPLE_TOGGLE_STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveStorageState(state) {
    localStorage.setItem(EXAMPLE_TOGGLE_STORAGE_KEY, JSON.stringify(state));
}

export function getExampleToggleState(verbId, preverb, screeve) {
    const state = getStorageState();
    const p = normalizePreverb(preverb);
    return state?.[verbId]?.[p]?.[screeve] || { adjectives: true, adverbs: true };
}

export function setExampleToggleState(verbId, preverb, screeve, nextState) {
    const state = getStorageState();
    const p = normalizePreverb(preverb);
    if (!state[verbId]) state[verbId] = {};
    if (!state[verbId][p]) state[verbId][p] = {};
    state[verbId][p][screeve] = {
        adjectives: !!nextState.adjectives,
        adverbs: !!nextState.adverbs
    };
    saveStorageState(state);
}

function isTokenVisible(token, toggles) {
    const layer = token?.layer || "always";
    if (layer === "adjectives") return !!toggles.adjectives;
    if (layer === "adverbs") return !!toggles.adverbs;
    return true;
}

function tokenClass(token) {
    return ROLE_CLASS_MAP[token?.role] || "gloss-default";
}

function capitalizeFirst(text) {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderToken(token, hidden, capitalize) {
    const klass = tokenClass(token);
    const role = token?.role || "unknown";
    const originalText = token?.text || "";
    const displayText = capitalize ? capitalizeFirst(originalText) : originalText;
    const hiddenClass = hidden ? " example-token-hidden" : "";
    return `<span class="${klass} example-token${hiddenClass}" data-role="${role}" data-token-layer="${token?.layer || "always"}" data-original-text="${originalText}">${displayText}</span>`;
}

function renderTokenLine(tokens, toggles, language) {
    const withVisibility = (tokens || [])
        .filter(token => token?.text)
        .map(token => ({ token, visible: isTokenVisible(token, toggles) }));

    let firstVisibleIndex = -1;
    if (language === "english") {
        firstVisibleIndex = withVisibility.findIndex(item => item.visible);
    }

    return withVisibility
        .map((item, index) => renderToken(item.token, !item.visible, index === firstVisibleIndex))
        .join(" ");
}

export function renderExamplePair(example, toggles) {
    const geTokens = example?.tokens?.georgian || [];
    const enTokens = example?.tokens?.english || [];

    const georgianHtml = geTokens.length ? renderTokenLine(geTokens, toggles, "georgian") : (example?.georgian || "");
    const englishFallback = example?.english || "";
    const englishHtml = enTokens.length ? renderTokenLine(enTokens, toggles, "english") : capitalizeFirst(englishFallback);

    return { georgianHtml, englishHtml };
}

export function renderPersonIndicator(person) {
    if (!person) return "";
    return `<span class="example-person-indicator" title="Example person">${String(person).toUpperCase()}</span>`;
}

export function renderScreeveToggleControls(verbId, preverb, screeve, toggles, options = {}) {
    const p = normalizePreverb(preverb);
    const showAdverbs = options.showAdverbs !== false;
    return `
        <div class="example-layer-toggles" data-verb-id="${verbId}" data-preverb="${p}" data-screeve="${screeve}">
            <label>
                <input type="checkbox" class="example-layer-toggle" data-layer="adjectives" ${toggles.adjectives ? "checked" : ""}>
                Adjectives
            </label>
            ${showAdverbs ? `
            <label>
                <input type="checkbox" class="example-layer-toggle" data-layer="adverbs" ${toggles.adverbs ? "checked" : ""}>
                Adverbs
            </label>` : ""}
        </div>
    `;
}

let toggleEventsBound = false;
export function bindExampleToggleEvents() {
    if (toggleEventsBound) return;
    toggleEventsBound = true;

    document.addEventListener("change", (event) => {
        const input = event.target;
        if (!(input instanceof HTMLInputElement)) return;
        if (!input.classList.contains("example-layer-toggle")) return;

        const wrapper = input.closest(".example-layer-toggles");
        if (!wrapper) return;

        const verbId = wrapper.getAttribute("data-verb-id");
        const preverb = wrapper.getAttribute("data-preverb");
        const screeve = wrapper.getAttribute("data-screeve");
        const layer = input.getAttribute("data-layer");
        if (!verbId || !screeve || !layer) return;

        const current = getExampleToggleState(verbId, preverb, screeve);
        const next = { ...current, [layer]: input.checked };
        setExampleToggleState(verbId, preverb, screeve, next);
        applyToggleVisibility(wrapper, next);

        document.dispatchEvent(new CustomEvent("exampleLayerTogglesChanged", {
            detail: { verbId, preverb, screeve, toggles: next }
        }));
    });
}

function applyToggleVisibility(wrapper, toggles) {
    const container = wrapper.closest(".flat-examples");
    if (!container) return;

    const adjectiveTokens = container.querySelectorAll('[data-token-layer="adjectives"]');
    const adverbTokens = container.querySelectorAll('[data-token-layer="adverbs"]');

    adjectiveTokens.forEach((node) => {
        node.classList.toggle("example-token-hidden", !toggles.adjectives);
    });
    adverbTokens.forEach((node) => {
        node.classList.toggle("example-token-hidden", !toggles.adverbs);
    });

    recalculateEnglishCapitalization(container);
}

function recalculateEnglishCapitalization(container) {
    const englishLines = container.querySelectorAll(".flat-example-english");
    englishLines.forEach((line) => {
        const tokens = Array.from(line.querySelectorAll(".example-token"));
        tokens.forEach((token) => {
            token.textContent = token.getAttribute("data-original-text") || "";
        });
        const firstVisible = tokens.find((token) => !token.classList.contains("example-token-hidden"));
        if (!firstVisible) return;
        const text = firstVisible.textContent || "";
        if (text) {
            firstVisible.textContent = capitalizeFirst(text);
        }
    });
}
