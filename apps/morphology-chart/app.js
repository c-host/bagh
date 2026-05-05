const chartSelect = document.getElementById("chartSelect");
const layoutSelect = document.getElementById("layoutSelect");
const addChartBtn = document.getElementById("addChartBtn");
const renameChartBtn = document.getElementById("renameChartBtn");
const historySelect = document.getElementById("historySelect");
const restoreHistoryBtn = document.getElementById("restoreHistoryBtn");
const exportBtn = document.getElementById("exportBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const zoomResetBtn = document.getElementById("zoomResetBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const importInput = document.getElementById("importInput");
const chartContainer = document.getElementById("chartContainer");
const chartViewport = document.getElementById("chartViewport");
const chartStage = document.getElementById("chartStage");
const nodeTemplate = document.getElementById("nodeTemplate");
const nodeForm = document.getElementById("nodeForm");
const editorHelp = document.getElementById("editorHelp");
const autosaveStatus = document.getElementById("autosaveStatus");
const kaInput = document.getElementById("kaInput");
const enInput = document.getElementById("enInput");
const typeInput = document.getElementById("typeInput");
const enSecondaryInput = document.getElementById("enSecondaryInput");
const typeSecondaryInput = document.getElementById("typeSecondaryInput");
const notesInput = document.getElementById("notesInput");
const linkedVerbsInput = document.getElementById("linkedVerbsInput");
const editLinkedVerbsBtn = document.getElementById("editLinkedVerbsBtn");
const saveLinkedVerbsBtn = document.getElementById("saveLinkedVerbsBtn");
const linkedVerbsSummary = document.getElementById("linkedVerbsSummary");
const linkedVerbMapBody = document.getElementById("linkedVerbMapBody");
const siblingGroupInput = document.getElementById("siblingGroupInput");
const siblingGroupLabelInput = document.getElementById("siblingGroupLabelInput");
const addChildBtn = document.getElementById("addChildBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const reparentSelect = document.getElementById("reparentSelect");
const moveNodeBtn = document.getElementById("moveNodeBtn");
const dragReparentModeBtn = document.getElementById("dragReparentModeBtn");
const siblingOrderInfo = document.getElementById("siblingOrderInfo");
const moveUpBtn = document.getElementById("moveUpBtn");
const moveDownBtn = document.getElementById("moveDownBtn");
const moveToPositionInput = document.getElementById("moveToPositionInput");
const moveToPositionBtn = document.getElementById("moveToPositionBtn");
const reviewQueueInput = document.getElementById("reviewQueueInput");
const exportReviewQueueBtn = document.getElementById("exportReviewQueueBtn");
const reviewQueueStatus = document.getElementById("reviewQueueStatus");
const reviewQueueSelect = document.getElementById("reviewQueueSelect");
const reviewLemma = document.getElementById("reviewLemma");
const reviewConfidence = document.getElementById("reviewConfidence");
const reviewRelation = document.getElementById("reviewRelation");
const reviewPos = document.getElementById("reviewPos");
const reviewDecision = document.getElementById("reviewDecision");
const reviewDefinition = document.getElementById("reviewDefinition");
const reviewNplgGloss = document.getElementById("reviewNplgGloss");
const reviewGncFeatures = document.getElementById("reviewGncFeatures");
const reviewNplgTermLink = document.getElementById("reviewNplgTermLink");
const pipelineServiceStatus = document.getElementById("pipelineServiceStatus");
const pipelineHeadwordsInput = document.getElementById("pipelineHeadwordsInput");
const pipelineHeadwordModeSelect = document.getElementById("pipelineHeadwordModeSelect");
const pipelineUseGncCheckbox = document.getElementById("pipelineUseGncCheckbox");
const pipelineDropNotFoundGncCheckbox = document.getElementById("pipelineDropNotFoundGncCheckbox");
const pipelineUseNplgCheckbox = document.getElementById("pipelineUseNplgCheckbox");
const pipelineDropNotFoundNplgCheckbox = document.getElementById("pipelineDropNotFoundNplgCheckbox");
const runPipelineBtn = document.getElementById("runPipelineBtn");
const refreshPipelineStatusBtn = document.getElementById("refreshPipelineStatusBtn");
const pipelineRunStatus = document.getElementById("pipelineRunStatus");
const pipelineReviewQueueSelect = document.getElementById("pipelineReviewQueueSelect");
const loadGeneratedReviewBtn = document.getElementById("loadGeneratedReviewBtn");
const pipelineStatusBadge = document.getElementById("pipelineStatusBadge");
const approveCandidateBtn = document.getElementById("approveCandidateBtn");
const rejectCandidateBtn = document.getElementById("rejectCandidateBtn");
const resetCandidateBtn = document.getElementById("resetCandidateBtn");
const insertCandidateBtn = document.getElementById("insertCandidateBtn");
const insertAllApprovedBtn = document.getElementById("insertAllApprovedBtn");
const georgianCollator = new Intl.Collator("ka", { sensitivity: "base" });

const STORAGE_KEY = "georgianMorphologyChartsState";
const STORAGE_HISTORY_KEY = "georgianMorphologyChartsHistory";
const HISTORY_MAX_ENTRIES = 12;

function isStorageQuotaError(error) {
  return (
    Boolean(error) &&
    (error.name === "QuotaExceededError" ||
      error.code === 22 ||
      error.code === 1014)
  );
}
const QUERY_PARAMS = new URLSearchParams(window.location.search);
const EMBED_MODE = QUERY_PARAMS.get("embed") === "1";
const READ_ONLY_MODE = QUERY_PARAMS.get("readonly") === "1";
/** Set on dist/morphology-chart/index.html by build_pipeline (hides maintainer-only UI via CSS). */
const PUBLIC_DIST_BUILD = document.documentElement?.dataset?.verbWebsiteDist === "1";
const FORCED_THEME = (() => {
  const rawTheme = String(QUERY_PARAMS.get("theme") || "").trim().toLowerCase();
  if (rawTheme === "dark") {
    return "dark";
  }
  if (rawTheme === "light") {
    return "light";
  }
  return null;
})();
const PIPELINE_SERVICE_DEFAULT_PORT = 8765;

function getPipelineServiceBaseUrl() {
  const fromQuery = String(QUERY_PARAMS.get("pipelineApi") || "").trim();
  if (fromQuery && /^https?:\/\//i.test(fromQuery)) {
    return fromQuery.replace(/\/$/, "");
  }
  const host = window.location.hostname || "127.0.0.1";
  return `http://${host}:${PIPELINE_SERVICE_DEFAULT_PORT}`;
}
const CHART_INDEX_FROM_QUERY = QUERY_PARAMS.has("chartIndex")
  ? Number.parseInt(String(QUERY_PARAMS.get("chartIndex") || "0"), 10)
  : null;
const HIGHLIGHT_NODE_IDS = new Set(
  String(QUERY_PARAMS.get("highlightNodeIds") || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean),
);

if (READ_ONLY_MODE) {
  document.body.classList.add("readonly-mode");
}
if (EMBED_MODE) {
  document.body.classList.add("embed-mode");
  if (dragReparentModeBtn) {
    dragReparentModeBtn.hidden = true;
    dragReparentModeBtn.setAttribute("aria-hidden", "true");
  }
}

function applyTheme(themeName) {
  const normalized = String(themeName || "").trim().toLowerCase();
  const theme = normalized === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(`theme-${theme}`);
}

if (FORCED_THEME) {
  applyTheme(FORCED_THEME);
}

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin) {
    return;
  }
  const data = event.data || {};
  if (data.type !== "morphology-theme") {
    return;
  }
  applyTheme(data.theme);
});

const state = {
  charts: [],
  verbs: [],
  currentChartIndex: 0,
  layout: "top-down",
  selectedNodeId: "",
  panX: 48,
  panY: 48,
  zoom: 1,
  history: [],
  reviewQueue: null,
  dragReparentMode: false,
  linkedVerbsEditing: false,
  pipeline: {
    jobId: "",
    pollTimer: null,
    serviceHealthy: null,
    latestReviewFiles: [],
  },
};

const panState = {
  isPointerDown: false,
  isDragging: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  startPanX: 0,
  startPanY: 0,
  suppressClick: false,
  pinchActive: false,
  touchPinchStartDistance: 0,
  touchPinchStartZoom: 1,
  touchPinchStartPanX: 0,
  touchPinchStartPanY: 0,
  touchPinchMidX: 0,
  touchPinchMidY: 0,
};

const dragState = {
  isPointerDown: false,
  pointerId: null,
  startX: 0,
  startY: 0,
  lastClientX: 0,
  lastClientY: 0,
  sourceNodeId: "",
  sourceDescendantIds: new Set(),
  isDragging: false,
  hoverParentId: "",
  edgeScrollRaf: null,
  ghostEl: null,
};

async function loadCharts() {
  const response = await fetch("./data/charts.json");
  if (!response.ok) {
    throw new Error("Could not load chart data.");
  }
  const payload = await response.json();
  return payload.charts || [];
}

async function loadVerbOptions() {
  const candidatePaths = [
    "../../dist/data/verbs-index.json",
    "../data/verbs-index.json",
    "../bagh/data/verbs-index.json",
    "../../apps/bagh/data/verbs-index.json",
    "./data/verbs-index.json",
  ];

  for (const path of candidatePaths) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        continue;
      }
      const payload = await response.json();
      if (Array.isArray(payload?.verbs) && payload.verbs.length > 0) {
        return payload.verbs;
      }
    } catch (error) {
      // Try the next candidate path.
    }
  }

  return [];
}

function populateLinkedVerbOptions() {
  if (!linkedVerbsInput) {
    return;
  }
  linkedVerbsInput.replaceChildren();

  if (!Array.isArray(state.verbs) || state.verbs.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No verb index found";
    linkedVerbsInput.appendChild(option);
    linkedVerbsInput.disabled = true;
    setLinkedVerbsEditingUI(false);
    return;
  }

  state.verbs.forEach((verb) => {
    const option = document.createElement("option");
    option.value = String(verb.id);
    option.textContent = `${verb.id} - ${verb.georgian || ""} (${verb.semantic_key || ""})`;
    linkedVerbsInput.appendChild(option);
  });
  setLinkedVerbsEditingUI(state.linkedVerbsEditing);
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function getPersistedPayload() {
  return {
    charts: state.charts,
    layout: state.layout,
    currentChartIndex: state.currentChartIndex,
    dragReparentMode: state.dragReparentMode,
  };
}

function persistHistory() {
  if (READ_ONLY_MODE) {
    return;
  }
  for (;;) {
    try {
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(state.history));
      return;
    } catch (error) {
      if (!isStorageQuotaError(error)) {
        console.warn("Morphology chart history could not be saved to localStorage.", error);
        return;
      }
      if (state.history.length === 0) {
        try {
          localStorage.removeItem(STORAGE_HISTORY_KEY);
        } catch (_) {
          /* ignore */
        }
        console.warn(
          "Morphology chart history storage is full; history was cleared so the chart can keep saving.",
        );
        return;
      }
      state.history.pop();
    }
  }
}

function recordHistory(reason, payload) {
  const nowMs = Date.now();
  const timestamp = new Date(nowMs).toISOString();
  const entry = {
    id: `${nowMs}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp,
    reason,
    payload: cloneData(payload),
  };

  const latest = state.history[0];
  const isCoalescedAutosave =
    latest &&
    reason === "Node auto-save" &&
    latest.reason === "Node auto-save" &&
    nowMs - Date.parse(latest.timestamp) < 5000;

  if (isCoalescedAutosave) {
    state.history[0] = entry;
  } else {
    state.history.unshift(entry);
  }
  state.history = state.history.slice(0, HISTORY_MAX_ENTRIES);
  persistHistory();
}

function saveState(reason = "Update") {
  if (READ_ONLY_MODE) {
    return;
  }
  const payload = getPersistedPayload();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    if (!isStorageQuotaError(error)) {
      console.error("Could not save charts to localStorage.", error);
      return;
    }
    state.history = [];
    persistHistory();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error2) {
      console.error("Could not save charts to localStorage after clearing history (quota exceeded).", error2);
      window.alert(
        "Browser storage is full. Use Export JSON to back up your charts, then clear site data for this site or free disk space.",
      );
      return;
    }
  }
  recordHistory(reason, payload);
  updateAutosaveStatus();
  populateHistorySelect();
}

function restoreState(defaultCharts) {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    state.charts = defaultCharts;
    return;
  }

  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed.charts) && parsed.charts.length > 0) {
      state.charts = parsed.charts;
      if (parsed.layout === "left-right") {
        state.layout = "left-right";
      }
      const savedIdx = Number(parsed.currentChartIndex);
      if (Number.isInteger(savedIdx) && savedIdx >= 0 && savedIdx < parsed.charts.length) {
        state.currentChartIndex = savedIdx;
      } else {
        state.currentChartIndex = 0;
      }
      state.dragReparentMode = parsed.dragReparentMode === true;
      return;
    }
  } catch (error) {
    console.error("Saved chart state could not be restored.", error);
  }

  state.charts = defaultCharts;
}

function loadHistory() {
  const savedHistory = localStorage.getItem(STORAGE_HISTORY_KEY);
  if (!savedHistory) {
    state.history = [];
    return;
  }
  try {
    const parsed = JSON.parse(savedHistory);
    if (!Array.isArray(parsed)) {
      state.history = [];
      return;
    }
    const trimmed = parsed.slice(0, HISTORY_MAX_ENTRIES);
    state.history = trimmed;
    if (!READ_ONLY_MODE && trimmed.length < parsed.length) {
      persistHistory();
    }
  } catch (error) {
    state.history = [];
  }
}

function populateHistorySelect() {
  historySelect.replaceChildren();
  if (!Array.isArray(state.history) || state.history.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No saved history yet";
    historySelect.appendChild(option);
    historySelect.disabled = true;
    restoreHistoryBtn.disabled = true;
    return;
  }

  state.history.forEach((entry, index) => {
    const option = document.createElement("option");
    option.value = entry.id;
    const timeLabel = new Date(entry.timestamp).toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    option.textContent = `${timeLabel} - ${entry.reason}`;
    if (index === 0) {
      option.selected = true;
    }
    historySelect.appendChild(option);
  });
  historySelect.disabled = false;
  restoreHistoryBtn.disabled = false;
}

function updateAutosaveStatus() {
  if (READ_ONLY_MODE) {
    autosaveStatus.textContent = "Read-only embedded viewer mode.";
    return;
  }
  const now = new Date();
  const timeLabel = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  autosaveStatus.textContent = `Changes auto-save instantly. Last saved ${timeLabel}.`;
}

function ensureNodeShape(node) {
  if (!Array.isArray(node.children)) {
    node.children = [];
  }
  if (node.enSecondary === undefined) {
    node.enSecondary = "";
  }
  if (node.typeSecondary === undefined) {
    node.typeSecondary = "";
  }
  if (!Array.isArray(node.linkedVerbIds)) {
    node.linkedVerbIds = [];
  }
  if (node.nplgTermUrl === undefined) {
    node.nplgTermUrl = "";
  }
  if (Array.isArray(node.functions) && node.functions.length > 0) {
    const firstAlt = node.functions[0];
    if (!node.enSecondary) {
      node.enSecondary = String(firstAlt.en || "").trim();
    }
    if (!node.typeSecondary) {
      node.typeSecondary = String(firstAlt.type || "").trim();
    }
  }
}

function getCurrentChart() {
  return state.charts[state.currentChartIndex];
}

function getVerbById(verbId) {
  const normalizedId = Number(verbId);
  if (!Number.isInteger(normalizedId) || !Array.isArray(state.verbs)) {
    return null;
  }
  return state.verbs.find((verb) => Number(verb.id) === normalizedId) || null;
}

function formatVerbLabelFromVerb(verb) {
  if (!verb) {
    return "";
  }
  const ge = String(verb.georgian || "").trim();
  const sk = String(verb.semantic_key || "").trim();
  if (ge && sk) {
    return `${ge} (${sk})`;
  }
  return ge || sk || "";
}

function formatVerbLabelById(verbId) {
  return formatVerbLabelFromVerb(getVerbById(verbId)) || `verb ${verbId}`;
}

function collectLinkedVerbOccurrences() {
  const byVerb = new Map();
  const chart = getCurrentChart();
  const root = chart?.root;
  if (!root) {
    return byVerb;
  }
  const visit = (node) => {
    const ids = Array.isArray(node.linkedVerbIds) ? node.linkedVerbIds : [];
    ids.forEach((raw) => {
      const id = Number(raw);
      if (!Number.isInteger(id) || id <= 0) {
        return;
      }
      if (!byVerb.has(id)) {
        byVerb.set(id, []);
      }
      byVerb.get(id).push({
        nodeKa: String(node.ka || "").trim() || "(untitled)",
        nodeId: node.id,
      });
    });
    (node.children || []).forEach(visit);
  };
  visit(root);
  return byVerb;
}

function centerNodeInViewport(nodeId) {
  if (!nodeId) {
    return;
  }
  const nodeEl = chartStage.querySelector(`.chart-node[data-node-id="${nodeId}"] .node-card`);
  if (!nodeEl) {
    return;
  }
  const nodeRect = nodeEl.getBoundingClientRect();
  const viewportRect = chartViewport.getBoundingClientRect();
  const deltaX = (viewportRect.left + viewportRect.width / 2) - (nodeRect.left + nodeRect.width / 2);
  const deltaY = (viewportRect.top + viewportRect.height / 2) - (nodeRect.top + nodeRect.height / 2);
  state.panX += deltaX;
  state.panY += deltaY;
  applyPanTransform();
}

function refreshLinkedVerbMapPanel() {
  if (!linkedVerbMapBody) {
    return;
  }
  linkedVerbMapBody.replaceChildren();
  const byVerb = collectLinkedVerbOccurrences();
  const ids = Array.from(byVerb.keys()).sort((a, b) => a - b);
  if (ids.length === 0) {
    const p = document.createElement("p");
    p.className = "small-help";
    p.textContent = "No linked verbs in this chart yet.";
    linkedVerbMapBody.appendChild(p);
    return;
  }
  ids.forEach((verbId) => {
    const row = document.createElement("div");
    row.className = "linked-verb-map-row";
    const titleEl = document.createElement("div");
    titleEl.className = "linked-verb-map-verb";
    titleEl.textContent = formatVerbLabelById(verbId);
    const ul = document.createElement("ul");
    ul.className = "linked-verb-map-nodes";
    byVerb.get(verbId).forEach((occ) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "linked-verb-map-node-btn";
      button.dataset.nodeId = String(occ.nodeId || "");
      button.textContent = occ.nodeKa;
      li.appendChild(button);
      ul.appendChild(li);
    });
    row.appendChild(titleEl);
    row.appendChild(ul);
    linkedVerbMapBody.appendChild(row);
  });
}

function updateLinkedVerbsSummaryForNode(node) {
  if (!linkedVerbsSummary) {
    return;
  }
  linkedVerbsSummary.replaceChildren();
  if (!node) {
    const p = document.createElement("p");
    p.className = "small-help";
    p.textContent = "—";
    linkedVerbsSummary.appendChild(p);
    return;
  }
  const ids = Array.isArray(node.linkedVerbIds)
    ? node.linkedVerbIds.map((x) => Number(x)).filter((id) => Number.isInteger(id) && id > 0)
    : [];
  if (ids.length === 0) {
    const p = document.createElement("p");
    p.className = "small-help";
    p.textContent = "No verbs linked to this node.";
    linkedVerbsSummary.appendChild(p);
    return;
  }
  const ul = document.createElement("ul");
  ul.className = "linked-verbs-summary-list";
  ids.forEach((verbId) => {
    const li = document.createElement("li");
    const label = document.createElement("span");
    label.className = "linked-verbs-summary-label";
    label.textContent = formatVerbLabelById(verbId);
    li.appendChild(label);
    const href = EMBED_MODE ? `../index.html?verb=${verbId}` : `../dist/index.html?verb=${verbId}`;
    const a = document.createElement("a");
    a.href = href;
    a.className = "linked-verbs-summary-open";
    a.textContent = "Open in bagh";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    li.appendChild(a);
    const unlinkButton = document.createElement("button");
    unlinkButton.type = "button";
    unlinkButton.className = "linked-verbs-summary-unlink";
    unlinkButton.dataset.verbId = String(verbId);
    unlinkButton.textContent = "Unlink";
    unlinkButton.disabled = READ_ONLY_MODE;
    li.appendChild(unlinkButton);
    ul.appendChild(li);
  });
  linkedVerbsSummary.appendChild(ul);
}

function setLinkedVerbsEditingUI(editing) {
  state.linkedVerbsEditing = Boolean(editing);
  if (!linkedVerbsInput) {
    return;
  }
  const hasVerbIndex = Array.isArray(state.verbs) && state.verbs.length > 0;
  linkedVerbsInput.disabled = READ_ONLY_MODE || !hasVerbIndex || !state.linkedVerbsEditing;
  if (editLinkedVerbsBtn) {
    editLinkedVerbsBtn.disabled = READ_ONLY_MODE || !hasVerbIndex || state.linkedVerbsEditing;
    editLinkedVerbsBtn.hidden = state.linkedVerbsEditing;
  }
  if (saveLinkedVerbsBtn) {
    const showSave = hasVerbIndex && state.linkedVerbsEditing;
    saveLinkedVerbsBtn.hidden = !showSave;
    saveLinkedVerbsBtn.disabled = READ_ONLY_MODE || !showSave;
  }
}

function applyDragReparentModeChrome() {
  document.body.classList.toggle("drag-reparent-mode-on", state.dragReparentMode);
  if (chartContainer) {
    chartContainer.classList.toggle("chart-drag-reparent-active", state.dragReparentMode);
  }
  if (dragReparentModeBtn) {
    dragReparentModeBtn.classList.toggle("canvas-icon-btn--drag-active", state.dragReparentMode);
  }
}

function unlinkVerbFromSelectedNode(verbIdRaw) {
  const verbId = Number(verbIdRaw);
  if (!Number.isInteger(verbId) || verbId <= 0) {
    return;
  }
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const found = findNodeById(chart.root, state.selectedNodeId);
  if (!found || !found.node) {
    return;
  }
  const node = found.node;
  const prior = Array.isArray(node.linkedVerbIds) ? node.linkedVerbIds : [];
  const next = prior.filter((raw) => Number(raw) !== verbId);
  if (next.length === prior.length) {
    return;
  }
  node.linkedVerbIds = next;
  Array.from(linkedVerbsInput.options).forEach((option) => {
    option.selected = next.includes(Number(option.value));
  });
  saveState("Unlink verb from node");
  renderChart();
  syncEditorFromSelectedNode();
}

function setTypeSelectValue(typeValue) {
  const normalized = String(typeValue || "").trim();
  if (!normalized) {
    typeInput.value = "Noun";
    return;
  }
  const exact = Array.from(typeInput.options).find(
    (option) => option.value === normalized,
  );
  if (exact) {
    typeInput.value = exact.value;
    return;
  }
  const lower = normalized.toLowerCase();
  const caseInsensitive = Array.from(typeInput.options).find(
    (option) => option.value.toLowerCase() === lower,
  );
  typeInput.value = caseInsensitive ? caseInsensitive.value : "Noun";
}

function normalizeGroupLayout(layoutValue) {
  return layoutValue === "left-right" ? "left-right" : "top-down";
}

function setSecondaryTypeSelectValue(typeValue) {
  const normalized = String(typeValue || "").trim();
  if (!normalized) {
    typeSecondaryInput.value = "";
    return;
  }
  const exact = Array.from(typeSecondaryInput.options).find(
    (option) => option.value === normalized,
  );
  if (exact) {
    typeSecondaryInput.value = exact.value;
    return;
  }
  const lower = normalized.toLowerCase();
  const caseInsensitive = Array.from(typeSecondaryInput.options).find(
    (option) => option.value.toLowerCase() === lower,
  );
  typeSecondaryInput.value = caseInsensitive ? caseInsensitive.value : "";
}

function buildGroupedChildSegments(children) {
  const segments = [];
  let current = null;

  children.forEach((child, index) => {
    const groupKey = String(child.siblingGroup || "").trim();
    const groupLabel = String(child.siblingGroupLabel || "").trim();
    const segmentKey = groupKey ? `group:${groupKey}` : `single:${index}`;

    if (!current || current.segmentKey !== segmentKey) {
      current = {
        segmentKey,
        groupKey,
        groupLabel,
        items: [],
      };
      segments.push(current);
    }
    if (!current.groupLabel && groupLabel) {
      current.groupLabel = groupLabel;
    }
    current.items.push(child);
  });

  return segments;
}

function buildNode(node) {
  ensureNodeShape(node);
  const fragment = nodeTemplate.content.cloneNode(true);
  const li = fragment.querySelector("li");
  const ge = fragment.querySelector(".ge");
  const en = fragment.querySelector(".en");
  const unitType = fragment.querySelector(".unit-type");
  const enSecondary = fragment.querySelector(".en-secondary");
  const unitTypeSecondary = fragment.querySelector(".unit-type-secondary");
  const notes = fragment.querySelector(".notes");
  const nodeCard = fragment.querySelector(".node-card");
  const childrenList = fragment.querySelector(".children");

  li.dataset.nodeId = node.id;
  if (HIGHLIGHT_NODE_IDS.has(String(node.id))) {
    li.classList.add("persistent-highlight");
  }

  ge.textContent = node.ka || "";
  en.textContent = node.en || "";
  unitType.textContent = node.type || "";
  if (node.enSecondary || node.typeSecondary) {
    enSecondary.textContent = node.enSecondary || "";
    unitTypeSecondary.textContent = node.typeSecondary || "";
  } else {
    enSecondary.remove();
    unitTypeSecondary.remove();
  }

  if (node.notes) {
    notes.textContent = node.notes;
  } else {
    notes.remove();
  }

  const linkedVerbIds = Array.isArray(node.linkedVerbIds)
    ? node.linkedVerbIds.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0)
    : [];
  if (linkedVerbIds.length > 0) {
    const linkWrap = document.createElement("div");
    linkWrap.className = "linked-verb-chips";

    linkedVerbIds.slice(0, 6).forEach((verbId) => {
      const chip = document.createElement("span");
      chip.className = "linked-verb-chip linked-verb-chip--static";
      chip.textContent = formatVerbLabelById(verbId);
      chip.title = "Linked verb (edit links in the node editor)";
      linkWrap.appendChild(chip);
    });
    if (linkedVerbIds.length > 6) {
      const more = document.createElement("span");
      more.className = "linked-verb-chip linked-verb-chip--static";
      more.textContent = `+${linkedVerbIds.length - 6} more`;
      linkWrap.appendChild(more);
    }

    nodeCard.appendChild(linkWrap);
  }

  const nplgTermUrl = String(node.nplgTermUrl || "").trim();
  if (nplgTermUrl) {
    const sourceWrap = document.createElement("div");
    sourceWrap.className = "linked-verb-chips";
    const sourceLink = document.createElement("a");
    sourceLink.className = "linked-verb-chip";
    sourceLink.href = nplgTermUrl;
    sourceLink.target = "_blank";
    sourceLink.rel = "noopener noreferrer";
    sourceLink.textContent = "NPLG source";
    sourceLink.title = "Open source entry in NPLG";
    sourceLink.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    sourceWrap.appendChild(sourceLink);
    nodeCard.appendChild(sourceWrap);
  }

  if (node.id === state.selectedNodeId) {
    li.classList.add("selected");
  }

  if (node.children.length === 0) {
    childrenList.remove();
  } else {
    const segments = buildGroupedChildSegments(node.children);
    segments.forEach((segment) => {
      if (!segment.groupKey) {
        const singleChild = buildNode(segment.items[0]);
        childrenList.appendChild(singleChild);
        return;
      }

      const groupListItem = document.createElement("li");
      groupListItem.className = "sibling-group";
      const groupBox = document.createElement("div");
      groupBox.className = "sibling-group-box";

      const displayLabel = segment.groupLabel || segment.groupKey;
      const groupLayout = normalizeGroupLayout(segment.items[0]?.siblingGroupLayout);
      const groupHeader = document.createElement("div");
      groupHeader.className = "sibling-group-header";
      const label = document.createElement("p");
      label.className = "sibling-group-label";
      label.textContent = displayLabel;
      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "group-layout-toggle";
      toggleBtn.dataset.parentId = node.id;
      toggleBtn.dataset.groupKey = segment.groupKey;
      toggleBtn.dataset.firstChildId = segment.items[0]?.id || "";
      toggleBtn.textContent = groupLayout === "left-right" ? "LR" : "TB";
      toggleBtn.title =
        groupLayout === "left-right"
          ? "Switch this group to top-bottom"
          : "Switch this group to left-right";
      groupHeader.appendChild(toggleBtn);
      groupHeader.appendChild(label);
      groupBox.appendChild(groupHeader);

      const groupedChildrenList = document.createElement("ul");
      groupedChildrenList.className = `sibling-group-list ${groupLayout === "left-right" ? "group-layout-lr" : "group-layout-tb"
        }`;
      segment.items.forEach((groupedChild) => {
        const childNode = buildNode(groupedChild);
        groupedChildrenList.appendChild(childNode);
      });

      groupBox.appendChild(groupedChildrenList);
      groupListItem.appendChild(groupBox);
      childrenList.appendChild(groupListItem);
    });

    if (childrenList.children.length === 0) {
      childrenList.remove();
    }
  }

  return li;
}

function renderChart() {
  chartStage.replaceChildren();
  const chart = getCurrentChart();
  if (!chart) {
    chartStage.textContent = "No charts available.";
    return;
  }

  const rootList = document.createElement("ul");
  rootList.className = state.layout === "left-right" ? "tree tree-lr" : "tree";
  const rootNode = buildNode(chart.root);
  rootList.appendChild(rootNode);
  chartStage.appendChild(rootList);
  applyPanTransform();
  updateCanvasHeight();
  refreshLinkedVerbMapPanel();
}

function populateChartSelect() {
  chartSelect.replaceChildren();
  state.charts.forEach((chart, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = chart.title || `Chart ${index + 1}`;
    chartSelect.appendChild(option);
  });
  chartSelect.value = String(state.currentChartIndex);
}

function findNodeById(node, nodeId, parent = null) {
  if (!node) {
    return null;
  }
  if (node.id === nodeId) {
    return { node, parent };
  }
  for (const child of node.children || []) {
    const found = findNodeById(child, nodeId, node);
    if (found) {
      return found;
    }
  }
  return null;
}

function findNodeWithParentAndIndex(node, nodeId, parent = null) {
  if (!node) {
    return null;
  }
  if (node.id === nodeId) {
    return { node, parent, index: -1 };
  }
  const children = node.children || [];
  for (let i = 0; i < children.length; i += 1) {
    const child = children[i];
    if (child.id === nodeId) {
      return { node: child, parent: node, index: i };
    }
    const found = findNodeWithParentAndIndex(child, nodeId, node);
    if (found) {
      return found;
    }
  }
  return null;
}

function collectNodes(node, list = [], depth = 0) {
  if (!node) {
    return list;
  }
  list.push({
    id: node.id,
    ka: node.ka || "",
    en: node.en || "",
    type: node.type || "",
    depth,
  });
  (node.children || []).forEach((child) => collectNodes(child, list, depth + 1));
  return list;
}

function collectDescendantIds(node, ids = new Set()) {
  if (!node) {
    return ids;
  }
  (node.children || []).forEach((child) => {
    ids.add(child.id);
    collectDescendantIds(child, ids);
  });
  return ids;
}

function removeDragReparentGhost() {
  if (dragState.ghostEl) {
    dragState.ghostEl.remove();
    dragState.ghostEl = null;
  }
}

function positionDragReparentGhost(clientX, clientY) {
  if (!dragState.ghostEl) {
    return;
  }
  dragState.ghostEl.style.left = `${Math.round(clientX + 12)}px`;
  dragState.ghostEl.style.top = `${Math.round(clientY + 12)}px`;
}

function ensureDragReparentGhost() {
  if (dragState.ghostEl || !dragState.sourceNodeId) {
    return;
  }
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const found = findNodeById(chart.root, dragState.sourceNodeId);
  if (!found?.node) {
    return;
  }
  const { node } = found;
  const el = document.createElement("div");
  el.className = "drag-reparent-ghost";
  el.setAttribute("role", "presentation");
  const ge = document.createElement("p");
  ge.className = "drag-reparent-ghost-ge";
  ge.textContent = node.ka || "";
  const en = document.createElement("p");
  en.className = "drag-reparent-ghost-en";
  en.textContent = node.en || "";
  el.appendChild(ge);
  el.appendChild(en);
  document.body.appendChild(el);
  dragState.ghostEl = el;
}

function isValidReparentTarget(sourceNodeId, targetParentId, sourceDescendantIds = new Set()) {
  if (!sourceNodeId || !targetParentId) {
    return false;
  }
  if (sourceNodeId === targetParentId) {
    return false;
  }
  if (sourceDescendantIds.has(targetParentId)) {
    return false;
  }
  return true;
}

function cancelDragEdgeScroll() {
  if (dragState.edgeScrollRaf !== null) {
    cancelAnimationFrame(dragState.edgeScrollRaf);
    dragState.edgeScrollRaf = null;
  }
}

function pointerInViewportEdgeZone(clientX, clientY) {
  const rect = chartViewport.getBoundingClientRect();
  const margin = 56;
  return (
    clientX < rect.left + margin ||
    clientX > rect.right - margin ||
    clientY < rect.top + margin ||
    clientY > rect.bottom - margin
  );
}

function applyViewportEdgeAutoPan(clientX, clientY) {
  const rect = chartViewport.getBoundingClientRect();
  const margin = 56;
  const maxSpeed = 16;
  let dx = 0;
  let dy = 0;
  if (clientX < rect.left + margin) {
    dx = Math.ceil(((rect.left + margin - clientX) / margin) * maxSpeed);
  } else if (clientX > rect.right - margin) {
    dx = -Math.ceil(((clientX - (rect.right - margin)) / margin) * maxSpeed);
  }
  if (clientY < rect.top + margin) {
    dy = Math.ceil(((rect.top + margin - clientY) / margin) * maxSpeed);
  } else if (clientY > rect.bottom - margin) {
    dy = -Math.ceil(((clientY - (rect.bottom - margin)) / margin) * maxSpeed);
  }
  if (dx || dy) {
    state.panX += dx;
    state.panY += dy;
    applyPanTransform();
    return true;
  }
  return false;
}

function updateDragHoverFromPoint(clientX, clientY) {
  const hovered = document.elementFromPoint(clientX, clientY);
  if (!hovered || !chartViewport.contains(hovered)) {
    setDragHoverParent("");
    return;
  }
  const targetNode = hovered.closest(".chart-node");
  const targetParentId = targetNode?.dataset?.nodeId || "";
  if (
    isValidReparentTarget(
      dragState.sourceNodeId,
      targetParentId,
      dragState.sourceDescendantIds,
    )
  ) {
    setDragHoverParent(targetParentId);
  } else {
    setDragHoverParent("");
  }
}

function dragEdgeScrollStep() {
  dragState.edgeScrollRaf = null;
  if (!dragState.isPointerDown || !dragState.isDragging) {
    return;
  }
  const x = dragState.lastClientX;
  const y = dragState.lastClientY;
  applyViewportEdgeAutoPan(x, y);
  updateDragHoverFromPoint(x, y);
  positionDragReparentGhost(x, y);
  if (pointerInViewportEdgeZone(x, y) && dragState.isPointerDown && dragState.isDragging) {
    dragState.edgeScrollRaf = requestAnimationFrame(dragEdgeScrollStep);
  }
}

function scheduleDragEdgeScrollLoop() {
  if (dragState.edgeScrollRaf !== null) {
    return;
  }
  dragState.edgeScrollRaf = requestAnimationFrame(dragEdgeScrollStep);
}

function setDragHoverParent(nodeId) {
  dragState.hoverParentId = String(nodeId || "");
  chartStage.querySelectorAll(".chart-node.drop-parent-target").forEach((element) => {
    element.classList.remove("drop-parent-target");
  });
  if (!dragState.hoverParentId) {
    return;
  }
  const targetNode = chartStage.querySelector(`.chart-node[data-node-id="${dragState.hoverParentId}"]`);
  if (targetNode) {
    targetNode.classList.add("drop-parent-target");
  }
}

function clearDragReparentVisualState() {
  cancelDragEdgeScroll();
  removeDragReparentGhost();
  chartViewport.classList.remove("drag-reparent-active");
  chartStage.querySelectorAll(".chart-node.drag-source").forEach((element) => {
    element.classList.remove("drag-source");
  });
  setDragHoverParent("");
}

function reparentNodeToTarget(sourceNodeId, targetParentId, reason = "Reclassify parent") {
  const chart = getCurrentChart();
  if (!chart) {
    return false;
  }
  const selected = findNodeWithParentAndIndex(chart.root, sourceNodeId);
  if (!selected || !selected.parent || selected.index < 0) {
    alert("Root node cannot be moved.");
    return false;
  }
  if (!targetParentId || selected.parent.id === targetParentId) {
    return false;
  }
  const newParentResult = findNodeById(chart.root, targetParentId);
  if (!newParentResult || !newParentResult.node) {
    return false;
  }

  const sourceDescendantIds = collectDescendantIds(selected.node);
  if (!isValidReparentTarget(sourceNodeId, targetParentId, sourceDescendantIds)) {
    return false;
  }

  const movingNode = selected.node;
  selected.parent.children.splice(selected.index, 1);
  ensureNodeShape(newParentResult.node);
  newParentResult.node.children.push(movingNode);
  state.selectedNodeId = sourceNodeId;
  saveState(reason);
  renderChart();
  syncEditorFromSelectedNode();
  return true;
}

function populateReparentOptions() {
  reparentSelect.replaceChildren();
  const chart = getCurrentChart();
  if (!chart || !state.selectedNodeId) {
    reparentSelect.disabled = true;
    moveNodeBtn.disabled = true;
    return;
  }

  const selected = findNodeById(chart.root, state.selectedNodeId);
  if (!selected || !selected.node) {
    reparentSelect.disabled = true;
    moveNodeBtn.disabled = true;
    return;
  }

  const descendantIds = collectDescendantIds(selected.node);
  const allNodes = collectNodes(chart.root);
  const options = allNodes
    .filter((item) => item.id !== state.selectedNodeId && !descendantIds.has(item.id))
    .sort((a, b) => {
      const aLabel = (a.ka || a.en || "").trim();
      const bLabel = (b.ka || b.en || "").trim();
      return georgianCollator.compare(aLabel, bLabel);
    });

  if (options.length === 0) {
    reparentSelect.disabled = true;
    moveNodeBtn.disabled = true;
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No valid parent options";
    reparentSelect.appendChild(option);
    return;
  }

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = "Select parent...";
  placeholderOption.selected = true;
  reparentSelect.appendChild(placeholderOption);

  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    const label = (item.ka || item.en || "Unnamed node").trim();
    option.textContent = label;
    reparentSelect.appendChild(option);
  });
  reparentSelect.disabled = false;
  moveNodeBtn.disabled = true;
}

function updateSiblingOrderControls() {
  const chart = getCurrentChart();
  if (!chart || !state.selectedNodeId) {
    siblingOrderInfo.textContent = "Select a node to reorder it.";
    moveUpBtn.disabled = true;
    moveDownBtn.disabled = true;
    moveToPositionBtn.disabled = true;
    moveToPositionInput.disabled = true;
    moveToPositionInput.value = "";
    return;
  }

  const selected = findNodeWithParentAndIndex(chart.root, state.selectedNodeId);
  if (!selected || !selected.parent || selected.index < 0) {
    siblingOrderInfo.textContent = "Root node has no sibling order.";
    moveUpBtn.disabled = true;
    moveDownBtn.disabled = true;
    moveToPositionBtn.disabled = true;
    moveToPositionInput.disabled = true;
    moveToPositionInput.value = "";
    return;
  }

  const total = selected.parent.children.length;
  const position = selected.index + 1;
  siblingOrderInfo.textContent = `Current position: ${position} of ${total}`;
  moveUpBtn.disabled = selected.index === 0;
  moveDownBtn.disabled = selected.index === total - 1;
  moveToPositionBtn.disabled = total <= 1;
  moveToPositionInput.disabled = total <= 1;
  moveToPositionInput.min = "1";
  moveToPositionInput.max = String(total);
  if (!moveToPositionInput.value) {
    moveToPositionInput.value = String(position);
  }
}

function syncEditorFromSelectedNode() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const found = findNodeById(chart.root, state.selectedNodeId);
  if (!found) {
    editorHelp.textContent = "Click a node in the chart to edit it.";
    nodeForm.reset();
    deleteNodeBtn.disabled = true;
    addChildBtn.disabled = true;
    moveNodeBtn.disabled = true;
    reparentSelect.disabled = true;
    updateSiblingOrderControls();
    updateLinkedVerbsSummaryForNode(null);
    setLinkedVerbsEditingUI(false);
    return;
  }

  const { node, parent } = found;
  editorHelp.textContent = "Editing selected node";
  kaInput.value = node.ka || "";
  enInput.value = node.en || "";
  setTypeSelectValue(node.type || "");
  enSecondaryInput.value = node.enSecondary || "";
  setSecondaryTypeSelectValue(node.typeSecondary || "");
  notesInput.value = node.notes || "";
  const linkedVerbIds = new Set((node.linkedVerbIds || []).map((id) => String(id)));
  Array.from(linkedVerbsInput.options).forEach((option) => {
    option.selected = linkedVerbIds.has(option.value);
  });
  siblingGroupInput.value = node.siblingGroup || "";
  siblingGroupLabelInput.value = node.siblingGroupLabel || "";
  addChildBtn.disabled = false;
  deleteNodeBtn.disabled = !parent;
  populateReparentOptions();
  moveToPositionInput.value = "";
  updateSiblingOrderControls();
  updateLinkedVerbsSummaryForNode(node);
  setLinkedVerbsEditingUI(false);
}

function createNewNode() {
  const suffix = Date.now();
  return {
    id: `node-${suffix}`,
    ka: "ახალი ფორმა",
    en: "new form",
    type: "Noun",
    enSecondary: "",
    typeSecondary: "",
    notes: "",
    linkedVerbIds: [],
    siblingGroup: "",
    siblingGroupLabel: "",
    children: [],
  };
}

function getReviewCandidates() {
  if (!state.reviewQueue || !Array.isArray(state.reviewQueue.candidates)) {
    return [];
  }
  return state.reviewQueue.candidates;
}

function ensureReviewCandidateShape(candidate) {
  if (!candidate || typeof candidate !== "object") {
    return;
  }
  candidate.review = candidate.review || {};
  candidate.review.decision = String(candidate.review.decision || "pending");
  candidate.review.reviewer = String(candidate.review.reviewer || "");
  candidate.review.notes = String(candidate.review.notes || "");
  candidate.status = String(candidate.status || "candidate");
  candidate.nplg = candidate.nplg || {};
  candidate.nplg.found = Boolean(candidate.nplg.found);
  candidate.nplg.matchCount = Number(candidate.nplg.matchCount || 0);
  candidate.nplg.bestTerm = String(candidate.nplg.bestTerm || "");
  candidate.nplg.enGloss = String(candidate.nplg.enGloss || "");
  candidate.nplg.enGlosses = Array.isArray(candidate.nplg.enGlosses)
    ? candidate.nplg.enGlosses
        .map((value) => String(value || "").trim())
        .filter((value) => Boolean(value))
    : [];
  candidate.nplg.labelTitles = Array.isArray(candidate.nplg.labelTitles)
    ? candidate.nplg.labelTitles
        .map((value) => String(value || "").trim())
        .filter((value) => Boolean(value))
    : [];
  candidate.nplg.searchUrl = String(candidate.nplg.searchUrl || "");
  candidate.nplg.termUrl = String(candidate.nplg.termUrl || "");
  candidate.gnc = candidate.gnc || {};
  candidate.gnc.features = String(candidate.gnc.features || "");
}

function setReviewLink(container, url, fallbackText = "-") {
  if (!container) {
    return;
  }
  const safeUrl = String(url || "").trim();
  if (!safeUrl) {
    container.textContent = fallbackText;
    return;
  }
  container.replaceChildren();
  const link = document.createElement("a");
  link.href = safeUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Open source entry";
  container.appendChild(link);
}

function getCandidateEnglishGloss(candidate) {
  const direct = String(candidate?.en || "").trim();
  if (direct) {
    return direct;
  }
  const nplgGloss = String(candidate?.nplg?.enGloss || "").trim();
  if (nplgGloss) {
    return nplgGloss;
  }
  const nplgGlosses = Array.isArray(candidate?.nplg?.enGlosses)
    ? candidate.nplg.enGlosses.map((value) => String(value || "").trim()).filter((value) => Boolean(value))
    : [];
  const labelTitles = Array.isArray(candidate?.nplg?.labelTitles)
    ? candidate.nplg.labelTitles.map((value) => String(value || "").trim()).filter((value) => Boolean(value))
    : [];
  if (nplgGlosses.length > 0) {
    const joinedGlosses = nplgGlosses.join(" | ");
    if (labelTitles.length > 0) {
      return `[${labelTitles.join("; ")}] ${joinedGlosses}`;
    }
    return joinedGlosses;
  }
  return "";
}

function getReviewDecisionSymbol(decision) {
  if (decision === "approved") {
    return "[A]";
  }
  if (decision === "rejected") {
    return "[R]";
  }
  return "[ ]";
}

function normalizeCandidateType(candidate) {
  const raw = String(candidate?.type || candidate?.posGuess || "").trim().toLowerCase();
  if (!raw) {
    return "Noun";
  }
  if (raw.includes("future participle")) {
    return "Future Participle";
  }
  if (raw.includes("past participle")) {
    return "Past Participle";
  }
  if (raw.includes("negative participle")) {
    return "Negative Participle";
  }
  if (raw.includes("present participle") || raw.includes("participle")) {
    return "Present Participle";
  }
  if (raw.includes("verbal noun")) {
    return "Verbal Noun";
  }
  if (raw.includes("abstract noun")) {
    return "Abstract Noun";
  }
  if (raw.includes("adjective")) {
    return "Adjective";
  }
  if (raw.includes("adverb")) {
    return "Adverb";
  }
  if (raw.includes("root")) {
    return "Root";
  }
  return "Noun";
}

function getSelectedReviewCandidate() {
  const candidates = getReviewCandidates();
  const index = Number.parseInt(String(reviewQueueSelect?.value || ""), 10);
  if (!Number.isInteger(index) || index < 0 || index >= candidates.length) {
    return null;
  }
  return { candidate: candidates[index], index };
}

function normalizeLemma(rawValue) {
  return String(rawValue || "").trim().toLowerCase();
}

function getCurrentChartLemmaSet() {
  const chart = getCurrentChart();
  if (!chart || !chart.root) {
    return new Set();
  }
  const items = collectNodes(chart.root);
  const lemmas = new Set();
  items.forEach((item) => {
    const normalized = normalizeLemma(item.ka);
    if (normalized) {
      lemmas.add(normalized);
    }
  });
  return lemmas;
}

function autoRejectDuplicateCandidatesForCurrentChart() {
  const candidates = getReviewCandidates();
  if (candidates.length === 0) {
    return 0;
  }
  const chartLemmas = getCurrentChartLemmaSet();
  if (chartLemmas.size === 0) {
    return 0;
  }
  let rejectedCount = 0;
  candidates.forEach((candidate) => {
    ensureReviewCandidateShape(candidate);
    if (candidate.status === "inserted") {
      return;
    }
    const normalized = normalizeLemma(candidate.lemma || candidate.normalizedLemma);
    if (!normalized || !chartLemmas.has(normalized)) {
      return;
    }
    if (candidate.review.decision !== "rejected") {
      rejectedCount += 1;
    }
    candidate.review.decision = "rejected";
    candidate.status = "duplicate_in_chart";
    if (!candidate.review.notes.includes("duplicate lemma in current chart")) {
      candidate.review.notes = candidate.review.notes
        ? `${candidate.review.notes}; duplicate lemma in current chart`
        : "duplicate lemma in current chart";
    }
  });
  return rejectedCount;
}

function updateReviewQueueStatus() {
  if (!reviewQueueStatus) {
    return;
  }
  const candidates = getReviewCandidates();
  if (candidates.length === 0) {
    reviewQueueStatus.textContent = "Load a review queue JSON to begin.";
    return;
  }
  let approved = 0;
  let rejected = 0;
  let pending = 0;
  candidates.forEach((candidate) => {
    ensureReviewCandidateShape(candidate);
    if (candidate.review.decision === "approved") {
      approved += 1;
    } else if (candidate.review.decision === "rejected") {
      rejected += 1;
    } else {
      pending += 1;
    }
  });
  reviewQueueStatus.textContent = `Review queue loaded: ${candidates.length} items (${pending} pending, ${approved} approved, ${rejected} rejected).`;
}

function refreshReviewDetails() {
  const selected = getSelectedReviewCandidate();
  if (!selected) {
    if (reviewLemma) {
      reviewLemma.textContent = "-";
    }
    if (reviewConfidence) {
      reviewConfidence.textContent = "-";
    }
    if (reviewRelation) {
      reviewRelation.textContent = "-";
    }
    if (reviewPos) {
      reviewPos.textContent = "-";
    }
    if (reviewDecision) {
      reviewDecision.textContent = "pending";
    }
    if (reviewDefinition) {
      reviewDefinition.textContent = "-";
    }
    if (reviewNplgGloss) {
      reviewNplgGloss.textContent = "-";
    }
    if (reviewGncFeatures) {
      reviewGncFeatures.textContent = "-";
    }
    if (reviewNplgTermLink) {
      reviewNplgTermLink.textContent = "-";
    }
    if (approveCandidateBtn) {
      approveCandidateBtn.disabled = true;
    }
    if (rejectCandidateBtn) {
      rejectCandidateBtn.disabled = true;
    }
    if (resetCandidateBtn) {
      resetCandidateBtn.disabled = true;
    }
    if (insertCandidateBtn) {
      insertCandidateBtn.disabled = true;
    }
    if (insertAllApprovedBtn) {
      insertAllApprovedBtn.disabled = getReviewCandidates().every(
        (candidate) =>
          String(candidate?.review?.decision || "pending") !== "approved" ||
          String(candidate?.status || "") === "inserted",
      );
    }
    return;
  }

  const { candidate } = selected;
  ensureReviewCandidateShape(candidate);
  if (reviewLemma) {
    reviewLemma.textContent = String(candidate.lemma || candidate.normalizedLemma || "-");
  }
  if (reviewConfidence) {
    reviewConfidence.textContent = String(candidate.confidence ?? "-");
  }
  if (reviewRelation) {
    reviewRelation.textContent = String(candidate.relation || "-");
  }
  if (reviewPos) {
    reviewPos.textContent = String(candidate.posGuess || candidate.type || "-");
  }
  if (reviewDecision) {
    reviewDecision.textContent = String(candidate.review.decision || "pending");
  }
  if (reviewDefinition) {
    reviewDefinition.textContent = String(candidate.definitionSnippet || "-");
  }
  if (reviewNplgGloss) {
    reviewNplgGloss.textContent = getCandidateEnglishGloss(candidate) || "-";
  }
  if (reviewGncFeatures) {
    reviewGncFeatures.textContent = String(candidate?.gnc?.features || "").trim() || "-";
  }
  if (reviewNplgTermLink) {
    setReviewLink(reviewNplgTermLink, candidate?.nplg?.termUrl || "", "-");
  }
  if (approveCandidateBtn) {
    approveCandidateBtn.disabled = false;
  }
  if (rejectCandidateBtn) {
    rejectCandidateBtn.disabled = false;
  }
  if (resetCandidateBtn) {
    resetCandidateBtn.disabled = false;
  }
  if (insertCandidateBtn) {
    insertCandidateBtn.disabled = candidate.review.decision !== "approved";
  }
  if (insertAllApprovedBtn) {
    insertAllApprovedBtn.disabled = getReviewCandidates().every((item) => {
      ensureReviewCandidateShape(item);
      return item.review.decision !== "approved" || item.status === "inserted";
    });
  }
}

function populateReviewQueueSelect() {
  if (!reviewQueueSelect) {
    return;
  }
  const candidates = getReviewCandidates();
  const priorValue = reviewQueueSelect.value;
  reviewQueueSelect.replaceChildren();

  if (candidates.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No review queue loaded";
    reviewQueueSelect.appendChild(option);
    reviewQueueSelect.disabled = true;
    refreshReviewDetails();
    updateReviewQueueStatus();
    return;
  }

  candidates.forEach((candidate, index) => {
    ensureReviewCandidateShape(candidate);
    const option = document.createElement("option");
    option.value = String(index);
    const symbol = getReviewDecisionSymbol(candidate.review.decision);
    const lemma = String(candidate.lemma || candidate.normalizedLemma || `Candidate ${index + 1}`);
    const score = candidate.confidence === undefined ? "" : ` (${candidate.confidence})`;
    option.textContent = `${symbol} ${lemma}${score}`;
    reviewQueueSelect.appendChild(option);
  });
  reviewQueueSelect.disabled = false;

  if (priorValue && Number.isInteger(Number.parseInt(priorValue, 10))) {
    reviewQueueSelect.value = priorValue;
  }
  if (!reviewQueueSelect.value) {
    reviewQueueSelect.value = "0";
  }
  refreshReviewDetails();
  updateReviewQueueStatus();
}

function setSelectedCandidateDecision(decision) {
  const selected = getSelectedReviewCandidate();
  if (!selected) {
    return;
  }
  const { candidate } = selected;
  ensureReviewCandidateShape(candidate);
  candidate.review.decision = decision;
  populateReviewQueueSelect();
}

function isTypingIntoTextControl(target) {
  if (!target || !(target instanceof HTMLElement)) {
    return false;
  }
  const tagName = String(target.tagName || "").toUpperCase();
  if (tagName === "INPUT" || tagName === "TEXTAREA") {
    return true;
  }
  return target.isContentEditable;
}

function isReviewCandidateListFocused(eventTarget) {
  if (!reviewQueueSelect) {
    return false;
  }
  const active = document.activeElement;
  return active === reviewQueueSelect || eventTarget === reviewQueueSelect;
}

function handleReviewQueueKeyboardShortcuts(event) {
  if (READ_ONLY_MODE) {
    return;
  }
  const key = String(event.key || "").toLowerCase();

  if ((event.ctrlKey || event.metaKey) && key === "c") {
    if (!state.reviewQueue || !reviewQueueSelect || reviewQueueSelect.disabled) {
      return;
    }
    if (isTypingIntoTextControl(event.target)) {
      return;
    }
    const tag = String(event.target?.tagName || "").toUpperCase();
    if (tag === "SELECT" && event.target !== reviewQueueSelect) {
      return;
    }
    if (!isReviewCandidateListFocused(event.target)) {
      return;
    }
    const selected = getSelectedReviewCandidate();
    if (!selected) {
      return;
    }
    const lemma = String(selected.candidate?.lemma || selected.candidate?.normalizedLemma || "").trim();
    if (!lemma) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(lemma).catch(() => {});
    }
    return;
  }

  if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) {
    return;
  }
  if (isTypingIntoTextControl(event.target)) {
    return;
  }
  const selectTag = String(event.target?.tagName || "").toUpperCase();
  if (selectTag === "SELECT" && event.target !== reviewQueueSelect) {
    return;
  }
  if (!state.reviewQueue || !reviewQueueSelect || reviewQueueSelect.disabled) {
    return;
  }
  if (key === "a") {
    event.preventDefault();
    event.stopPropagation();
    setSelectedCandidateDecision("approved");
    return;
  }
  if (key === "r") {
    event.preventDefault();
    event.stopPropagation();
    setSelectedCandidateDecision("rejected");
  }
}

function createNodeFromCandidate(candidate) {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const lemma = String(candidate.lemma || candidate.normalizedLemma || "").trim() || "ახალი ფორმა";
  const definition = getCandidateEnglishGloss(candidate) || "pending gloss";
  const nodeType = normalizeCandidateType(candidate);
  return {
    id: `node-${suffix}`,
    ka: lemma,
    en: definition,
    type: nodeType,
    enSecondary: "",
    typeSecondary: "",
    notes: "",
    nplgTermUrl: String(candidate?.nplg?.termUrl || "").trim(),
    linkedVerbIds: [],
    siblingGroup: "",
    siblingGroupLabel: "",
    children: [],
  };
}

function insertSelectedCandidateUnderCurrentNode() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const selected = getSelectedReviewCandidate();
  if (!selected) {
    alert("Select a review candidate first.");
    return;
  }
  const { candidate } = selected;
  ensureReviewCandidateShape(candidate);
  if (candidate.status === "inserted") {
    alert("This candidate has already been inserted.");
    return;
  }
  if (candidate.review.decision !== "approved") {
    alert("Approve the candidate before inserting.");
    return;
  }

  const parentFound = state.selectedNodeId
    ? findNodeById(chart.root, state.selectedNodeId)
    : { node: chart.root };
  if (!parentFound || !parentFound.node) {
    alert("Select a target node in the chart first.");
    return;
  }
  const parentNode = parentFound.node;
  ensureNodeShape(parentNode);

  const lemma = String(candidate.lemma || candidate.normalizedLemma || "").trim();
  const duplicate = collectNodes(chart.root).find(
    (item) => normalizeLemma(item.ka) === normalizeLemma(lemma),
  );
  if (duplicate) {
    candidate.review.decision = "rejected";
    candidate.status = "duplicate_in_chart";
    candidate.review.notes = candidate.review.notes
      ? `${candidate.review.notes}; duplicate lemma in current chart`
      : "duplicate lemma in current chart";
    populateReviewQueueSelect();
    alert(`"${lemma}" already exists in this chart, so it was auto-rejected as a duplicate.`);
    return;
  }

  const node = createNodeFromCandidate(candidate);
  parentNode.children.push(node);
  candidate.status = "inserted";
  state.selectedNodeId = node.id;
  saveState(`Insert reviewed candidate: ${lemma || node.id}`);
  renderChart();
  syncEditorFromSelectedNode();
  populateReviewQueueSelect();
  alert(`Inserted "${lemma || node.id}" under "${parentNode.ka || parentNode.en || "selected node"}".`);
}

function insertAllApprovedCandidatesUnderCurrentNode() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const candidates = getReviewCandidates();
  if (candidates.length === 0) {
    alert("Load a review queue first.");
    return;
  }

  const parentFound = state.selectedNodeId
    ? findNodeById(chart.root, state.selectedNodeId)
    : { node: chart.root };
  if (!parentFound || !parentFound.node) {
    alert("Select a target node in the chart first.");
    return;
  }
  const parentNode = parentFound.node;
  ensureNodeShape(parentNode);

  const chartLemmaSet = getCurrentChartLemmaSet();
  let inserted = 0;
  let duplicatesRejected = 0;
  let alreadyInserted = 0;
  let lastInsertedId = "";

  candidates.forEach((candidate) => {
    ensureReviewCandidateShape(candidate);
    if (candidate.review.decision !== "approved") {
      return;
    }
    if (candidate.status === "inserted") {
      alreadyInserted += 1;
      return;
    }

    const lemma = String(candidate.lemma || candidate.normalizedLemma || "").trim();
    const normalizedLemma = normalizeLemma(lemma);
    if (normalizedLemma && chartLemmaSet.has(normalizedLemma)) {
      candidate.review.decision = "rejected";
      candidate.status = "duplicate_in_chart";
      candidate.review.notes = candidate.review.notes
        ? `${candidate.review.notes}; duplicate lemma in current chart`
        : "duplicate lemma in current chart";
      duplicatesRejected += 1;
      return;
    }

    const node = createNodeFromCandidate(candidate);
    parentNode.children.push(node);
    candidate.status = "inserted";
    if (normalizedLemma) {
      chartLemmaSet.add(normalizedLemma);
    }
    lastInsertedId = node.id;
    inserted += 1;
  });

  if (inserted > 0) {
    state.selectedNodeId = lastInsertedId || state.selectedNodeId;
    saveState(`Insert all approved candidates under ${parentNode.ka || parentNode.en || "selected node"}`);
    renderChart();
    syncEditorFromSelectedNode();
  }
  populateReviewQueueSelect();

  alert(
    `Bulk insert complete.\nInserted: ${inserted}\nRejected as duplicates: ${duplicatesRejected}\nAlready inserted: ${alreadyInserted}`,
  );
}

function exportReviewQueue() {
  if (!state.reviewQueue || !Array.isArray(state.reviewQueue.candidates)) {
    alert("Load a review queue first.");
    return;
  }
  const rootId = String(state.reviewQueue?.root?.id || "review-queue");
  const payload = JSON.stringify(state.reviewQueue, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${rootId}-reviewed.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importReviewQueue(file) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      applyImportedReviewQueuePayload(parsed);
    } catch (error) {
      alert(`Review queue import failed: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function applyImportedReviewQueuePayload(parsed) {
  if (!Array.isArray(parsed?.candidates)) {
    throw new Error("Review queue must include a candidates array.");
  }
  parsed.candidates.forEach((candidate) => ensureReviewCandidateShape(candidate));
  state.reviewQueue = parsed;
  autoRejectDuplicateCandidatesForCurrentChart();
  populateReviewQueueSelect();
}

function splitPipelineHeadwords(raw) {
  return String(raw || "")
    .split(/[\s,]+/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function setPipelineStatusBadge(kind, text) {
  if (!pipelineStatusBadge) {
    return;
  }
  pipelineStatusBadge.classList.remove("running", "success", "failed");
  if (kind) {
    pipelineStatusBadge.classList.add(kind);
  }
  pipelineStatusBadge.textContent = String(text || "Pipeline idle");
}

function setPipelineRunMessage(text) {
  if (pipelineRunStatus) {
    pipelineRunStatus.textContent = String(text || "");
  }
}

function setPipelineServiceMessage(isHealthy, message) {
  state.pipeline.serviceHealthy = isHealthy;
  if (pipelineServiceStatus) {
    pipelineServiceStatus.textContent = message;
  }
}

function populateGeneratedReviewQueueSelect(files) {
  if (!pipelineReviewQueueSelect) {
    return;
  }
  const priorValue = pipelineReviewQueueSelect.value;
  pipelineReviewQueueSelect.replaceChildren();
  const safeFiles = Array.isArray(files) ? files : [];
  state.pipeline.latestReviewFiles = safeFiles;
  if (safeFiles.length === 0) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "No generated review queues yet";
    pipelineReviewQueueSelect.appendChild(option);
    pipelineReviewQueueSelect.disabled = true;
    if (loadGeneratedReviewBtn) {
      loadGeneratedReviewBtn.disabled = true;
    }
    return;
  }
  safeFiles.forEach((path, index) => {
    const option = document.createElement("option");
    option.value = path;
    option.textContent = `${index + 1}. ${path}`;
    pipelineReviewQueueSelect.appendChild(option);
  });
  pipelineReviewQueueSelect.disabled = false;
  if (priorValue && safeFiles.includes(priorValue)) {
    pipelineReviewQueueSelect.value = priorValue;
  }
  if (!pipelineReviewQueueSelect.value) {
    pipelineReviewQueueSelect.value = safeFiles[0];
  }
  if (loadGeneratedReviewBtn) {
    loadGeneratedReviewBtn.disabled = false;
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function formatPipelineJobFailureMessage(job) {
  const base = job?.error || "See service logs.";
  const tail = Array.isArray(job?.tail) ? job.tail.filter((line) => String(line).trim()) : [];
  const tailSlice = tail.slice(-20);
  if (tailSlice.length === 0) {
    return base;
  }
  return `${base}\n\nLast log lines:\n${tailSlice.join("\n")}`;
}

async function checkPipelineServiceHealth() {
  try {
    const response = await fetchWithTimeout(
      `${getPipelineServiceBaseUrl()}/api/morphology/pipeline/health`,
      {},
      5000,
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    let payload;
    try {
      payload = await response.json();
    } catch (parseError) {
      throw new Error("Response was not JSON (wrong service on this port?)");
    }
    if (!payload?.ok) {
      throw new Error(payload?.error || "Health check returned not ok");
    }
    setPipelineServiceMessage(
      true,
      `Service status: connected (${getPipelineServiceBaseUrl()})`,
    );
    return true;
  } catch (error) {
    const detail = error?.name === "AbortError" ? "timed out" : String(error?.message || error);
    setPipelineServiceMessage(
      false,
      `Service status: unavailable (${detail}). Start the pipeline service, then click Refresh Status.`,
    );
    return false;
  }
}

function stopPipelinePolling() {
  if (state.pipeline.pollTimer) {
    window.clearTimeout(state.pipeline.pollTimer);
    state.pipeline.pollTimer = null;
  }
}

async function pollPipelineStatus() {
  const jobId = String(state.pipeline.jobId || "").trim();
  if (!jobId) {
    stopPipelinePolling();
    return;
  }
  try {
    const response = await fetchWithTimeout(
      `${getPipelineServiceBaseUrl()}/api/morphology/pipeline/status?jobId=${encodeURIComponent(jobId)}`,
      {},
      30000,
    );
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    if (!payload?.ok || !payload?.job) {
      throw new Error(payload?.error || "Invalid status payload.");
    }
    const job = payload.job;
    const outputs = job.outputs || {};
    populateGeneratedReviewQueueSelect(outputs.reviewQueueFiles || []);
    if (job.status === "running") {
      setPipelineStatusBadge("running", "Pipeline running...");
      setPipelineRunMessage(
        `Pipeline running (${jobId})... latest: ${String(job.tail?.slice(-1)?.[0] || "working")}`,
      );
      state.pipeline.pollTimer = window.setTimeout(pollPipelineStatus, 2200);
      return;
    }
    if (job.status === "completed") {
      setPipelineStatusBadge("success", "Pipeline complete");
      setPipelineRunMessage(
        `Pipeline complete. Review queues: ${(outputs.reviewQueueFiles || []).length}; candidates: ${(outputs.candidateFiles || []).length}.`,
      );
      stopPipelinePolling();
      return;
    }
    setPipelineStatusBadge("failed", "Pipeline failed");
    setPipelineRunMessage(`Pipeline failed: ${formatPipelineJobFailureMessage(job)}`);
    stopPipelinePolling();
  } catch (error) {
    const detail =
      error?.name === "AbortError" ? "request timed out" : String(error?.message || error);
    setPipelineStatusBadge("failed", "Pipeline status error");
    setPipelineRunMessage(`Pipeline status check failed: ${detail}`);
    stopPipelinePolling();
  }
}

async function runPipelineFromPanel() {
  const healthy = await checkPipelineServiceHealth();
  if (!healthy) {
    alert("Pipeline service is not reachable. Start the local service first.");
    return;
  }
  const headwords = splitPipelineHeadwords(pipelineHeadwordsInput?.value || "");
  if (headwords.length === 0) {
    alert("Enter at least one headword.");
    return;
  }
  const body = {
    headwords,
    headwordMode: String(pipelineHeadwordModeSelect?.value || "contains"),
    useGnc: Boolean(pipelineUseGncCheckbox?.checked),
    dropNotFoundOnGnc: Boolean(pipelineDropNotFoundGncCheckbox?.checked),
    useNplg: Boolean(pipelineUseNplgCheckbox?.checked),
    dropNotFoundOnNplg: Boolean(pipelineDropNotFoundNplgCheckbox?.checked),
  };
  try {
    setPipelineStatusBadge("running", "Starting pipeline...");
    setPipelineRunMessage("Starting pipeline job...");
    const response = await fetch(`${getPipelineServiceBaseUrl()}/api/morphology/pipeline/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error || `HTTP ${response.status}`);
    }
    state.pipeline.jobId = String(payload.jobId || "").trim();
    setPipelineRunMessage(`Pipeline started (${state.pipeline.jobId}).`);
    stopPipelinePolling();
    state.pipeline.pollTimer = window.setTimeout(pollPipelineStatus, 1200);
  } catch (error) {
    setPipelineStatusBadge("failed", "Pipeline start failed");
    setPipelineRunMessage(`Pipeline start failed: ${error.message}`);
  }
}

async function refreshPipelineStatusManually() {
  if (!state.pipeline.jobId) {
    const healthy = await checkPipelineServiceHealth();
    if (healthy) {
      setPipelineStatusBadge("", "Pipeline idle");
      setPipelineRunMessage("Service connected. No active job.");
    } else {
      setPipelineRunMessage("Service not reachable. Confirm it is listening on port 8765.");
    }
    return;
  }
  await pollPipelineStatus();
}

async function loadGeneratedReviewQueueFromService() {
  const selectedPath = String(pipelineReviewQueueSelect?.value || "").trim();
  if (!selectedPath) {
    alert("Select a generated review queue first.");
    return;
  }
  try {
    const response = await fetch(
      `${getPipelineServiceBaseUrl()}/api/morphology/pipeline/read-json?path=${encodeURIComponent(selectedPath)}`,
    );
    const payload = await response.json();
    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error || `HTTP ${response.status}`);
    }
    applyImportedReviewQueuePayload(payload.payload);
    setPipelineRunMessage(`Loaded generated review queue: ${payload.path}`);
  } catch (error) {
    alert(`Failed to load generated review queue: ${error.message}`);
  }
}

function selectNode(nodeId) {
  if (!READ_ONLY_MODE && state.linkedVerbsEditing) {
    updateSelectedNodeFromForm({
      syncEditor: false,
      persist: true,
      render: false,
      reason: "Save linked verbs (switch node)",
    });
  }
  state.linkedVerbsEditing = false;
  state.selectedNodeId = nodeId;
  renderChart();
  syncEditorFromSelectedNode();
}

function updateSelectedNodeFromForm(options = {}) {
  const {
    syncEditor = false,
    persist = true,
    render = true,
    reason = "Node auto-save",
  } = options;
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const found = findNodeById(chart.root, state.selectedNodeId);
  if (!found) {
    return;
  }

  const { node } = found;
  node.ka = kaInput.value.trim();
  node.en = enInput.value.trim();
  node.type = typeInput.value.trim();
  node.enSecondary = enSecondaryInput.value.trim();
  node.typeSecondary = typeSecondaryInput.value.trim();
  node.notes = notesInput.value.trim();
  node.linkedVerbIds = Array.from(linkedVerbsInput.selectedOptions)
    .map((option) => Number(option.value))
    .filter((id) => Number.isInteger(id) && id > 0);
  node.siblingGroup = siblingGroupInput.value.trim();
  node.siblingGroupLabel = siblingGroupLabelInput.value.trim();
  ensureNodeShape(node);

  if (persist) {
    saveState(reason);
  }
  if (render) {
    renderChart();
  }
  if (syncEditor) {
    syncEditorFromSelectedNode();
  }
}

function addChildToSelectedNode() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const found = findNodeById(chart.root, state.selectedNodeId);
  if (!found) {
    return;
  }
  const { node } = found;
  ensureNodeShape(node);
  const newNode = createNewNode();
  node.children.push(newNode);
  state.selectedNodeId = newNode.id;
  saveState("Add child node");
  renderChart();
  syncEditorFromSelectedNode();
}

function deleteSelectedNode() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const found = findNodeById(chart.root, state.selectedNodeId);
  if (!found || !found.parent) {
    return;
  }
  const descendants = countDescendants(found.node);
  const message =
    descendants > 0
      ? `Delete this node and its ${descendants} descendant node(s)?`
      : "Delete this node?";
  if (!window.confirm(message)) {
    return;
  }

  found.parent.children = found.parent.children.filter(
    (child) => child.id !== state.selectedNodeId,
  );
  state.selectedNodeId = found.parent.id;
  saveState("Delete node");
  renderChart();
  syncEditorFromSelectedNode();
}

function moveSelectedNodeToParent() {
  const targetParentId = reparentSelect.value;
  if (!targetParentId) {
    return;
  }
  reparentNodeToTarget(state.selectedNodeId, targetParentId, "Reclassify parent");
}

function updateDragReparentModeUI() {
  if (!dragReparentModeBtn) {
    return;
  }
  dragReparentModeBtn.textContent = state.dragReparentMode ? "Drag on" : "Drag off";
  dragReparentModeBtn.setAttribute("aria-pressed", state.dragReparentMode ? "true" : "false");
  if (state.dragReparentMode) {
    dragReparentModeBtn.setAttribute(
      "aria-label",
      "Drag reparent mode on. Drag a node onto another to reparent. Click to disable.",
    );
    dragReparentModeBtn.title =
      "Drag mode on: drag a node card onto another node to reparent. Hover near canvas edges to auto-scroll.";
  } else {
    dragReparentModeBtn.setAttribute("aria-label", "Enable drag reparent mode");
    dragReparentModeBtn.title = "Enable drag mode: drag a node onto another to reparent; edges auto-scroll.";
  }
  applyDragReparentModeChrome();
}

function toggleDragReparentMode() {
  state.dragReparentMode = !state.dragReparentMode;
  clearDragReparentVisualState();
  dragState.isPointerDown = false;
  dragState.isDragging = false;
  dragState.pointerId = null;
  updateDragReparentModeUI();
  if (!READ_ONLY_MODE) {
    saveState("Toggle drag reparent mode");
  }
}

function handleNodeDragStart(event) {
  if (!state.dragReparentMode || READ_ONLY_MODE) {
    return false;
  }
  cancelDragEdgeScroll();
  removeDragReparentGhost();
  const isTouchPointer = event.pointerType === "touch";
  if (!isTouchPointer && event.button !== 0) {
    return false;
  }
  if (event.target.closest("a") || event.target.closest(".group-layout-toggle")) {
    return false;
  }
  const nodeCard = event.target.closest(".node-card");
  if (!nodeCard) {
    return false;
  }
  const chartNode = nodeCard.closest(".chart-node");
  const sourceNodeId = chartNode?.dataset?.nodeId || "";
  if (!sourceNodeId) {
    return false;
  }
  const chart = getCurrentChart();
  if (!chart) {
    return false;
  }
  const source = findNodeWithParentAndIndex(chart.root, sourceNodeId);
  if (!source || !source.parent || source.index < 0) {
    return false;
  }

  dragState.isPointerDown = true;
  dragState.pointerId = event.pointerId;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;
  dragState.sourceNodeId = sourceNodeId;
  dragState.sourceDescendantIds = collectDescendantIds(source.node);
  dragState.isDragging = false;
  dragState.hoverParentId = "";
  dragState.lastClientX = event.clientX;
  dragState.lastClientY = event.clientY;
  chartNode.classList.add("drag-source");
  chartViewport.classList.add("drag-reparent-active");
  event.preventDefault();
  return true;
}

function handleNodeDragMove(event) {
  if (!dragState.isPointerDown || event.pointerId !== dragState.pointerId) {
    return false;
  }
  const deltaX = event.clientX - dragState.startX;
  const deltaY = event.clientY - dragState.startY;
  if (!dragState.isDragging && Math.abs(deltaX) + Math.abs(deltaY) > 4) {
    dragState.isDragging = true;
  }
  if (!dragState.isDragging) {
    return true;
  }

  ensureDragReparentGhost();
  dragState.lastClientX = event.clientX;
  dragState.lastClientY = event.clientY;
  positionDragReparentGhost(event.clientX, event.clientY);
  applyViewportEdgeAutoPan(event.clientX, event.clientY);
  updateDragHoverFromPoint(event.clientX, event.clientY);
  if (pointerInViewportEdgeZone(event.clientX, event.clientY)) {
    scheduleDragEdgeScrollLoop();
  }
  event.preventDefault();
  return true;
}

function handleNodeDragEnd(event) {
  if (!dragState.isPointerDown) {
    return false;
  }
  if (event && dragState.pointerId !== null && event.pointerId !== dragState.pointerId) {
    return false;
  }
  cancelDragEdgeScroll();
  const didDrag = dragState.isDragging;
  const sourceNodeId = dragState.sourceNodeId;
  const targetParentId = dragState.hoverParentId;

  dragState.isPointerDown = false;
  dragState.pointerId = null;
  dragState.startX = 0;
  dragState.startY = 0;
  dragState.sourceNodeId = "";
  dragState.sourceDescendantIds = new Set();
  dragState.isDragging = false;
  dragState.hoverParentId = "";
  clearDragReparentVisualState();

  if (didDrag) {
    panState.suppressClick = true;
    if (targetParentId) {
      reparentNodeToTarget(sourceNodeId, targetParentId, "Reclassify parent (drag)");
    }
  }
  return true;
}

function toggleSiblingGroupLayout(parentId, groupKey, firstChildId) {
  if (!parentId || !groupKey || !firstChildId) {
    return;
  }
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const parentFound = findNodeById(chart.root, parentId);
  if (!parentFound || !parentFound.node) {
    return;
  }
  const parentNode = parentFound.node;
  ensureNodeShape(parentNode);
  const startIndex = parentNode.children.findIndex((child) => child.id === firstChildId);
  if (startIndex < 0) {
    return;
  }
  const normalizedGroupKey = String(groupKey).trim();
  if (String(parentNode.children[startIndex].siblingGroup || "").trim() !== normalizedGroupKey) {
    return;
  }
  const currentLayout = normalizeGroupLayout(
    parentNode.children[startIndex].siblingGroupLayout,
  );
  const nextLayout = currentLayout === "left-right" ? "top-down" : "left-right";

  for (let i = startIndex; i < parentNode.children.length; i += 1) {
    const sibling = parentNode.children[i];
    if (String(sibling.siblingGroup || "").trim() !== normalizedGroupKey) {
      break;
    }
    sibling.siblingGroupLayout = nextLayout;
  }

  saveState("Toggle sibling group layout");
  renderChart();
  syncEditorFromSelectedNode();
}

function countDescendants(node) {
  if (!node || !node.children) {
    return 0;
  }
  return node.children.reduce(
    (total, child) => total + 1 + countDescendants(child),
    0,
  );
}

function moveSelectedNodeToSiblingIndex(nextIndex) {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const selected = findNodeWithParentAndIndex(chart.root, state.selectedNodeId);
  if (!selected || !selected.parent || selected.index < 0) {
    return;
  }

  const siblings = selected.parent.children;
  const currentIndex = selected.index;
  const boundedIndex = Math.max(0, Math.min(nextIndex, siblings.length - 1));
  if (boundedIndex === currentIndex) {
    return;
  }

  const [node] = siblings.splice(currentIndex, 1);
  siblings.splice(boundedIndex, 0, node);
  saveState("Reorder siblings");
  renderChart();
  syncEditorFromSelectedNode();
}

function moveSelectedNodeEarlier() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const selected = findNodeWithParentAndIndex(chart.root, state.selectedNodeId);
  if (!selected) {
    return;
  }
  moveSelectedNodeToSiblingIndex(selected.index - 1);
}

function moveSelectedNodeLater() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const selected = findNodeWithParentAndIndex(chart.root, state.selectedNodeId);
  if (!selected) {
    return;
  }
  moveSelectedNodeToSiblingIndex(selected.index + 1);
}

function moveSelectedNodeToExactPosition() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const selected = findNodeWithParentAndIndex(chart.root, state.selectedNodeId);
  if (!selected || !selected.parent || selected.index < 0) {
    return;
  }
  const total = selected.parent.children.length;
  const entered = Number(moveToPositionInput.value);
  if (!Number.isFinite(entered)) {
    return;
  }
  const position = Math.max(1, Math.min(entered, total));
  moveSelectedNodeToSiblingIndex(position - 1);
}

function addChart() {
  const defaultTitle = `New chart ${state.charts.length + 1}`;
  const enteredTitle = window.prompt("Enter chart title:", defaultTitle);
  if (enteredTitle === null) {
    return;
  }
  const finalTitle = enteredTitle.trim() || defaultTitle;

  const newChart = {
    title: finalTitle,
    root: {
      id: `root-${Date.now()}`,
      ka: "ახალი ფუძე",
      en: "new root",
      type: "Root",
      notes: "",
      children: [],
    },
  };
  state.charts.push(newChart);
  state.currentChartIndex = state.charts.length - 1;
  state.selectedNodeId = newChart.root.id;
  populateChartSelect();
  renderChart();
  syncEditorFromSelectedNode();
  saveState("Add chart");
}

function renameCurrentChart() {
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }
  const enteredTitle = window.prompt("Rename current chart:", chart.title || "");
  if (enteredTitle === null) {
    return;
  }
  const finalTitle = enteredTitle.trim() || "Untitled chart";
  chart.title = finalTitle;
  populateChartSelect();
  saveState("Rename chart");
}

function exportCharts() {
  const payload = JSON.stringify({ charts: state.charts }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "charts.json";
  link.click();
  URL.revokeObjectURL(url);
}

function importCharts(file) {
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      if (!Array.isArray(parsed.charts) || parsed.charts.length === 0) {
        throw new Error("Imported file must contain a non-empty charts array.");
      }
      state.charts = parsed.charts;
      state.currentChartIndex = 0;
      state.selectedNodeId = state.charts[0].root.id;
      populateChartSelect();
      renderChart();
      syncEditorFromSelectedNode();
      saveState("Import charts");
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    }
  };
  reader.readAsText(file);
}

function restoreFromHistory() {
  if (!historySelect.value) {
    return;
  }
  const selectedEntry = state.history.find((entry) => entry.id === historySelect.value);
  if (!selectedEntry) {
    return;
  }
  if (!window.confirm("Restore selected history snapshot?")) {
    return;
  }
  const payload = selectedEntry.payload || {};
  if (!Array.isArray(payload.charts) || payload.charts.length === 0) {
    alert("Selected history entry is invalid.");
    return;
  }

  state.charts = cloneData(payload.charts);
  state.layout = payload.layout === "left-right" ? "left-right" : "top-down";
  state.currentChartIndex = 0;
  state.selectedNodeId = state.charts[0]?.root?.id || "";
  state.dragReparentMode = payload.dragReparentMode === true;
  layoutSelect.value = state.layout;
  populateChartSelect();
  renderChart();
  syncEditorFromSelectedNode();
  updateDragReparentModeUI();
  saveState("Restore history snapshot");
}

function selectionHasText() {
  const selection = window.getSelection();
  return Boolean(selection && selection.toString().trim().length > 0);
}

function applyPanTransform() {
  const snappedPanX = Math.round(state.panX);
  const snappedPanY = Math.round(state.panY);
  chartStage.style.transform = `translate(${snappedPanX}px, ${snappedPanY}px) scale(${state.zoom})`;
  zoomResetBtn.textContent = `${Math.round(state.zoom * 100)}%`;
}

function updateStickyLayoutMetrics() {
  if (EMBED_MODE) {
    return;
  }
  const desktopQuery = window.matchMedia("(min-width: 1001px)");
  if (!desktopQuery.matches) {
    document.documentElement.style.removeProperty("--header-sticky-height");
    return;
  }
  const header = document.querySelector("header");
  if (!header) {
    return;
  }
  const headerHeight = Math.ceil(header.getBoundingClientRect().height);
  document.documentElement.style.setProperty("--header-sticky-height", `${headerHeight}px`);
}

function updateCanvasHeight() {
  updateStickyLayoutMetrics();
  if (EMBED_MODE) {
    chartContainer.style.height = "100%";
    return;
  }
  if (window.matchMedia("(min-width: 1001px)").matches) {
    chartContainer.style.removeProperty("height");
    return;
  }
  const treeRoot = chartStage.querySelector(".tree");
  if (!treeRoot) {
    chartContainer.style.height = "240px";
    return;
  }
  const contentHeight = Math.max(180, Math.ceil(treeRoot.offsetHeight) + 20);
  const viewportCap = Math.max(300, Math.floor(window.innerHeight * 0.74));
  const nextHeight = Math.min(contentHeight, viewportCap);
  chartContainer.style.height = `${nextHeight}px`;
}

function clampZoom(zoomValue) {
  return Math.max(0.5, Math.min(2.4, Number(zoomValue.toFixed(3))));
}

function zoomAtPoint(nextZoomRaw, clientX, clientY) {
  const nextZoom = clampZoom(nextZoomRaw);
  if (nextZoom === state.zoom) {
    return;
  }
  const viewportRect = chartViewport.getBoundingClientRect();
  const localX = clientX - viewportRect.left;
  const localY = clientY - viewportRect.top;
  const worldX = (localX - state.panX) / state.zoom;
  const worldY = (localY - state.panY) / state.zoom;
  state.panX = localX - worldX * nextZoom;
  state.panY = localY - worldY * nextZoom;
  state.zoom = nextZoom;
  applyPanTransform();
}

function adjustZoom(delta) {
  const rect = chartViewport.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  zoomAtPoint(state.zoom + delta, cx, cy);
}

function resetZoom() {
  state.zoom = 1;
  applyPanTransform();
}

function updateFullscreenButtonLabel() {
  const inFullscreen = document.fullscreenElement === chartContainer;
  fullscreenBtn.textContent = inFullscreen ? "][" : "[]";
  fullscreenBtn.title = inFullscreen ? "Exit fullscreen" : "Toggle fullscreen";
}

function handlePanStart(event) {
  if (handleNodeDragStart(event)) {
    return;
  }
  const isTouchPointer = event.pointerType === "touch";
  if (!isTouchPointer && event.button !== 0) {
    return;
  }
  if (panState.pinchActive) {
    return;
  }
  if (event.target.closest(".canvas-tools") || event.target.closest(".group-layout-toggle")) {
    return;
  }
  if (event.target.closest(".node-card")) {
    return;
  }

  panState.isPointerDown = true;
  panState.isDragging = false;
  panState.pointerId = event.pointerId;
  panState.startX = event.clientX;
  panState.startY = event.clientY;
  panState.startPanX = state.panX;
  panState.startPanY = state.panY;
  event.preventDefault();
}

function getTouchDistance(touchA, touchB) {
  const dx = touchA.clientX - touchB.clientX;
  const dy = touchA.clientY - touchB.clientY;
  return Math.hypot(dx, dy);
}

function getTouchMidpoint(touchA, touchB) {
  return {
    x: (touchA.clientX + touchB.clientX) / 2,
    y: (touchA.clientY + touchB.clientY) / 2,
  };
}

function handleTouchStart(event) {
  if (event.touches.length !== 2) {
    return;
  }
  const [t1, t2] = event.touches;
  const midpoint = getTouchMidpoint(t1, t2);
  panState.pinchActive = true;
  panState.isPointerDown = false;
  panState.isDragging = false;
  panState.pointerId = null;
  panState.touchPinchStartDistance = getTouchDistance(t1, t2);
  panState.touchPinchStartZoom = state.zoom;
  panState.touchPinchStartPanX = state.panX;
  panState.touchPinchStartPanY = state.panY;
  panState.touchPinchMidX = midpoint.x;
  panState.touchPinchMidY = midpoint.y;
}

function handleTouchMove(event) {
  if (!panState.pinchActive || event.touches.length !== 2) {
    return;
  }
  event.preventDefault();
  const [t1, t2] = event.touches;
  const nextDistance = getTouchDistance(t1, t2);
  if (!panState.touchPinchStartDistance) {
    return;
  }
  const scaleFactor = nextDistance / panState.touchPinchStartDistance;
  const nextZoom = clampZoom(panState.touchPinchStartZoom * scaleFactor);

  const viewportRect = chartViewport.getBoundingClientRect();
  const localX = panState.touchPinchMidX - viewportRect.left;
  const localY = panState.touchPinchMidY - viewportRect.top;
  const worldX = (localX - panState.touchPinchStartPanX) / panState.touchPinchStartZoom;
  const worldY = (localY - panState.touchPinchStartPanY) / panState.touchPinchStartZoom;
  state.panX = localX - worldX * nextZoom;
  state.panY = localY - worldY * nextZoom;
  state.zoom = nextZoom;
  applyPanTransform();
}

function handleTouchEnd(event) {
  if (event.touches.length < 2) {
    panState.pinchActive = false;
  }
}

function handlePanMove(event) {
  if (handleNodeDragMove(event)) {
    return;
  }
  if (!panState.isPointerDown || event.pointerId !== panState.pointerId) {
    return;
  }

  const deltaX = event.clientX - panState.startX;
  const deltaY = event.clientY - panState.startY;
  if (!panState.isDragging && Math.abs(deltaX) + Math.abs(deltaY) > 4) {
    panState.isDragging = true;
    chartViewport.classList.add("dragging");
  }

  if (!panState.isDragging) {
    return;
  }

  state.panX = panState.startPanX + deltaX;
  state.panY = panState.startPanY + deltaY;
  applyPanTransform();
  event.preventDefault();
}

function handlePanEnd() {
  if (handleNodeDragEnd()) {
    return;
  }
  const wasDragging = panState.isDragging;
  panState.isPointerDown = false;
  panState.isDragging = false;
  panState.pointerId = null;
  chartViewport.classList.remove("dragging");
  if (wasDragging) {
    panState.suppressClick = true;
  }
}

async function toggleFullscreenChart() {
  if (document.fullscreenElement === chartContainer) {
    await document.exitFullscreen();
    return;
  }
  await chartContainer.requestFullscreen();
}

function bindEvents() {
  chartSelect.addEventListener("change", (event) => {
    state.currentChartIndex = Number(event.target.value);
    const currentChart = getCurrentChart();
    state.selectedNodeId = currentChart?.root?.id || "";
    renderChart();
    syncEditorFromSelectedNode();
    saveState("Switch chart");
    refreshLinkedVerbMapPanel();
    if (state.reviewQueue) {
      autoRejectDuplicateCandidatesForCurrentChart();
      populateReviewQueueSelect();
    }
  });

  layoutSelect.addEventListener("change", (event) => {
    state.layout = event.target.value;
    renderChart();
    saveState("Change layout");
  });

  reparentSelect.addEventListener("change", () => {
    moveNodeBtn.disabled = !reparentSelect.value;
  });
  if (dragReparentModeBtn) {
    dragReparentModeBtn.addEventListener("click", toggleDragReparentMode);
  }
  if (linkedVerbsSummary) {
    linkedVerbsSummary.addEventListener("click", (event) => {
      const unlinkBtn = event.target.closest(".linked-verbs-summary-unlink");
      if (!unlinkBtn) {
        return;
      }
      unlinkVerbFromSelectedNode(unlinkBtn.dataset.verbId);
    });
  }
  if (linkedVerbMapBody) {
    linkedVerbMapBody.addEventListener("click", (event) => {
      const nodeBtn = event.target.closest(".linked-verb-map-node-btn");
      if (!nodeBtn) {
        return;
      }
      const nodeId = String(nodeBtn.dataset.nodeId || "");
      if (!nodeId) {
        return;
      }
      selectNode(nodeId);
      centerNodeInViewport(nodeId);
    });
  }

  if (reviewQueueSelect) {
    reviewQueueSelect.addEventListener("change", () => {
      refreshReviewDetails();
    });
  }

  chartViewport.addEventListener("click", (event) => {
    if (panState.suppressClick) {
      panState.suppressClick = false;
      return;
    }
    if (panState.isDragging || selectionHasText()) {
      return;
    }
    const layoutToggle = event.target.closest(".group-layout-toggle");
    if (layoutToggle) {
      toggleSiblingGroupLayout(
        layoutToggle.dataset.parentId,
        layoutToggle.dataset.groupKey,
        layoutToggle.dataset.firstChildId,
      );
      return;
    }
    const nodeCard = event.target.closest(".node-card");
    if (!nodeCard) {
      return;
    }
    const node = nodeCard.closest(".chart-node");
    if (!node || !node.dataset.nodeId) {
      return;
    }
    selectNode(node.dataset.nodeId);
  });

  chartViewport.addEventListener("pointerdown", handlePanStart);
  window.addEventListener("pointermove", handlePanMove);
  window.addEventListener("pointerup", handlePanEnd);
  window.addEventListener("pointercancel", handlePanEnd);
  chartViewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const intensity = event.deltaMode === 1 ? 0.08 : 0.0025;
      const zoomDelta = -event.deltaY * intensity;
      zoomAtPoint(state.zoom + zoomDelta, event.clientX, event.clientY);
    },
    { passive: false },
  );
  chartViewport.addEventListener("touchstart", handleTouchStart, { passive: true });
  chartViewport.addEventListener("touchmove", handleTouchMove, { passive: false });
  chartViewport.addEventListener("touchend", handleTouchEnd, { passive: true });
  chartViewport.addEventListener("touchcancel", handleTouchEnd, { passive: true });

  if (!READ_ONLY_MODE) {
    const liveFields = [
      kaInput,
      enInput,
      typeInput,
      enSecondaryInput,
      typeSecondaryInput,
      notesInput,
    ];
    const groupingFields = [siblingGroupInput, siblingGroupLabelInput];
    const allLiveFields = [...liveFields, ...groupingFields];
    allLiveFields.forEach((field) => {
      const handleLiveUpdate = () => {
        updateSelectedNodeFromForm({
          syncEditor: false,
          persist: true,
          render: true,
        });
      };
      field.addEventListener("input", handleLiveUpdate);
      field.addEventListener("change", handleLiveUpdate);
    });

    nodeForm.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    if (editLinkedVerbsBtn) {
      editLinkedVerbsBtn.addEventListener("click", () => {
        state.linkedVerbsEditing = true;
        setLinkedVerbsEditingUI(true);
      });
    }
    if (saveLinkedVerbsBtn) {
      saveLinkedVerbsBtn.addEventListener("click", () => {
        updateSelectedNodeFromForm({
          syncEditor: true,
          persist: true,
          render: true,
          reason: "Save linked verbs",
        });
        state.linkedVerbsEditing = false;
        setLinkedVerbsEditingUI(false);
      });
    }

    addChildBtn.addEventListener("click", addChildToSelectedNode);
    deleteNodeBtn.addEventListener("click", deleteSelectedNode);
    moveNodeBtn.addEventListener("click", moveSelectedNodeToParent);
    moveUpBtn.addEventListener("click", moveSelectedNodeEarlier);
    moveDownBtn.addEventListener("click", moveSelectedNodeLater);
    moveToPositionBtn.addEventListener("click", moveSelectedNodeToExactPosition);
    addChartBtn.addEventListener("click", addChart);
    renameChartBtn.addEventListener("click", renameCurrentChart);
    restoreHistoryBtn.addEventListener("click", restoreFromHistory);
    exportBtn.addEventListener("click", exportCharts);
    if (reviewQueueInput) {
      reviewQueueInput.addEventListener("change", (event) => {
        const file = event.target.files?.[0];
        importReviewQueue(file);
        reviewQueueInput.value = "";
      });
    }
    if (exportReviewQueueBtn) {
      exportReviewQueueBtn.addEventListener("click", exportReviewQueue);
    }
    if (approveCandidateBtn) {
      approveCandidateBtn.addEventListener("click", () => {
        setSelectedCandidateDecision("approved");
      });
    }
    if (rejectCandidateBtn) {
      rejectCandidateBtn.addEventListener("click", () => {
        setSelectedCandidateDecision("rejected");
      });
    }
    if (resetCandidateBtn) {
      resetCandidateBtn.addEventListener("click", () => {
        setSelectedCandidateDecision("pending");
      });
    }
    if (insertCandidateBtn) {
      insertCandidateBtn.addEventListener("click", insertSelectedCandidateUnderCurrentNode);
    }
    if (insertAllApprovedBtn) {
      insertAllApprovedBtn.addEventListener("click", insertAllApprovedCandidatesUnderCurrentNode);
    }
    if (runPipelineBtn) {
      runPipelineBtn.addEventListener("click", () => {
        runPipelineFromPanel().catch((error) => {
          setPipelineStatusBadge("failed", "Pipeline start failed");
          setPipelineRunMessage(`Pipeline start failed: ${error.message}`);
        });
      });
    }
    if (refreshPipelineStatusBtn) {
      refreshPipelineStatusBtn.addEventListener("click", () => {
        refreshPipelineStatusManually().catch((error) => {
          setPipelineServiceMessage(
            false,
            `Service status: unavailable (${String(error?.message || error)}).`,
          );
          setPipelineRunMessage(`Pipeline refresh failed: ${error.message}`);
        });
      });
    }
    if (loadGeneratedReviewBtn) {
      loadGeneratedReviewBtn.addEventListener("click", () => {
        loadGeneratedReviewQueueFromService().catch((error) => {
          alert(`Failed to load generated review queue: ${error.message}`);
        });
      });
    }
    if (pipelineReviewQueueSelect) {
      pipelineReviewQueueSelect.addEventListener("change", () => {
        if (loadGeneratedReviewBtn) {
          loadGeneratedReviewBtn.disabled = !pipelineReviewQueueSelect.value;
        }
      });
    }
    document.addEventListener("keydown", handleReviewQueueKeyboardShortcuts, true);
  }
  zoomOutBtn.addEventListener("click", () => adjustZoom(-0.1));
  zoomInBtn.addEventListener("click", () => adjustZoom(0.1));
  zoomResetBtn.addEventListener("click", resetZoom);
  fullscreenBtn.addEventListener("click", () => {
    toggleFullscreenChart().catch((error) => {
      alert(`Fullscreen failed: ${error.message}`);
    });
  });
  document.addEventListener("fullscreenchange", updateFullscreenButtonLabel);
  window.addEventListener("resize", updateCanvasHeight);
  if (!READ_ONLY_MODE) {
    importInput.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      importCharts(file);
      importInput.value = "";
    });
  }
  updateDragReparentModeUI();
}

function setup(charts, verbs = []) {
  if (!Array.isArray(charts) || charts.length === 0) {
    chartStage.textContent = "No charts found in data/charts.json.";
    return;
  }

  restoreState(charts);
  state.verbs = Array.isArray(verbs) ? verbs : [];
  populateLinkedVerbOptions();
  loadHistory();
  let targetChartIndex = state.currentChartIndex;
  if (CHART_INDEX_FROM_QUERY !== null && Number.isFinite(CHART_INDEX_FROM_QUERY)) {
    targetChartIndex = CHART_INDEX_FROM_QUERY;
  }
  state.currentChartIndex = Math.max(
    0,
    Math.min(Math.trunc(targetChartIndex), state.charts.length - 1),
  );
  state.selectedNodeId = state.charts[state.currentChartIndex]?.root?.id || "";
  if (HIGHLIGHT_NODE_IDS.size > 0) {
    const chart = state.charts[state.currentChartIndex];
    const highlightedInChart = collectNodes(chart?.root || {}).find((item) =>
      HIGHLIGHT_NODE_IDS.has(String(item.id)),
    );
    if (highlightedInChart?.id) {
      state.selectedNodeId = highlightedInChart.id;
    }
  }
  layoutSelect.value = state.layout;
  applyPanTransform();

  populateChartSelect();
  renderChart();
  syncEditorFromSelectedNode();
  bindEvents();
  populateHistorySelect();
  populateReviewQueueSelect();
  populateGeneratedReviewQueueSelect([]);
  setPipelineStatusBadge("", "Pipeline idle");
  if (READ_ONLY_MODE) {
    setPipelineServiceMessage(
      false,
      "Service status: pipeline panel disabled in readonly mode (?readonly=1).",
    );
  } else if (!PUBLIC_DIST_BUILD) {
    checkPipelineServiceHealth().catch((error) => {
      setPipelineServiceMessage(
        false,
        `Service status: check failed (${String(error?.message || error)}). Click Refresh Status.`,
      );
    });
  }
  updateFullscreenButtonLabel();
  updateAutosaveStatus();
  updateStickyLayoutMetrics();
}

Promise.all([loadCharts(), loadVerbOptions()])
  .then(([charts, verbs]) => setup(charts, verbs))
  .catch((error) => {
    chartStage.textContent = `Error: ${error.message}`;
  });
