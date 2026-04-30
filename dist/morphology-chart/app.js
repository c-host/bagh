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
const siblingGroupInput = document.getElementById("siblingGroupInput");
const siblingGroupLabelInput = document.getElementById("siblingGroupLabelInput");
const addChildBtn = document.getElementById("addChildBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const reparentSelect = document.getElementById("reparentSelect");
const moveNodeBtn = document.getElementById("moveNodeBtn");
const siblingOrderInfo = document.getElementById("siblingOrderInfo");
const moveUpBtn = document.getElementById("moveUpBtn");
const moveDownBtn = document.getElementById("moveDownBtn");
const moveToPositionInput = document.getElementById("moveToPositionInput");
const moveToPositionBtn = document.getElementById("moveToPositionBtn");
const georgianCollator = new Intl.Collator("ka", { sensitivity: "base" });

const STORAGE_KEY = "georgianMorphologyChartsState";
const STORAGE_HISTORY_KEY = "georgianMorphologyChartsHistory";
const QUERY_PARAMS = new URLSearchParams(window.location.search);
const EMBED_MODE = QUERY_PARAMS.get("embed") === "1";
const READ_ONLY_MODE = QUERY_PARAMS.get("readonly") === "1";
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
const INITIAL_CHART_INDEX = Number.parseInt(QUERY_PARAMS.get("chartIndex") || "0", 10);
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
    "../dist/data/verbs-index.json",
    "../src/data/verbs-index.json",
    "../data/verbs-index.json",
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
    return;
  }

  state.verbs.forEach((verb) => {
    const option = document.createElement("option");
    option.value = String(verb.id);
    option.textContent = `${verb.id} - ${verb.georgian || ""} (${verb.semantic_key || ""})`;
    linkedVerbsInput.appendChild(option);
  });
  linkedVerbsInput.disabled = false;
}

function cloneData(value) {
  return JSON.parse(JSON.stringify(value));
}

function getPersistedPayload() {
  return {
    charts: state.charts,
    layout: state.layout,
  };
}

function persistHistory() {
  localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(state.history));
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
  state.history = state.history.slice(0, 80);
  persistHistory();
}

function saveState(reason = "Update") {
  if (READ_ONLY_MODE) {
    return;
  }
  const payload = getPersistedPayload();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
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
    state.history = Array.isArray(parsed) ? parsed : [];
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
      const link = document.createElement("a");
      link.className = "linked-verb-chip";
      link.href = EMBED_MODE
        ? `../index.html?verb=${verbId}`
        : `../dist/index.html?verb=${verbId}`;
      link.textContent = "view conjugation tables";
      link.title = "Open linked verb conjugation tables";
      link.addEventListener("click", (event) => {
        event.stopPropagation();
        if (EMBED_MODE && window.top && window.top !== window) {
          event.preventDefault();
          window.top.location.href = link.href;
        }
      });
      linkWrap.appendChild(link);
    });

    nodeCard.appendChild(linkWrap);
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

function selectNode(nodeId) {
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
  const chart = getCurrentChart();
  if (!chart) {
    return;
  }

  const selected = findNodeWithParentAndIndex(chart.root, state.selectedNodeId);
  if (!selected || !selected.parent || selected.index < 0) {
    alert("Root node cannot be moved.");
    return;
  }

  const newParentResult = findNodeById(chart.root, targetParentId);
  if (!newParentResult || !newParentResult.node) {
    return;
  }

  const newParent = newParentResult.node;
  const movingNode = selected.node;
  selected.parent.children.splice(selected.index, 1);
  ensureNodeShape(newParent);
  newParent.children.push(movingNode);
  saveState("Reclassify parent");
  renderChart();
  syncEditorFromSelectedNode();
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
  layoutSelect.value = state.layout;
  populateChartSelect();
  renderChart();
  syncEditorFromSelectedNode();
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

function updateCanvasHeight() {
  if (EMBED_MODE) {
    chartContainer.style.height = "100%";
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
  });

  layoutSelect.addEventListener("change", (event) => {
    state.layout = event.target.value;
    renderChart();
    saveState("Change layout");
  });

  reparentSelect.addEventListener("change", () => {
    moveNodeBtn.disabled = !reparentSelect.value;
  });

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
      linkedVerbsInput,
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
  const boundedChartIndex = Number.isInteger(INITIAL_CHART_INDEX)
    ? Math.max(0, Math.min(INITIAL_CHART_INDEX, state.charts.length - 1))
    : 0;
  state.currentChartIndex = boundedChartIndex;
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
  updateFullscreenButtonLabel();
  updateAutosaveStatus();
}

Promise.all([loadCharts(), loadVerbOptions()])
  .then(([charts, verbs]) => setup(charts, verbs))
  .catch((error) => {
    chartStage.textContent = `Error: ${error.message}`;
  });
