import type {
  DiagramVerbsFile,
  LayoutData,
  MountHandle,
  MountOptions,
  PreverbInventory,
  PreverbTier,
  VerbDiagramProfile,
} from './types'
import { buildSpatialIconsSectionHtml, buildCanvasIconStripHtml } from './spatial-icons'
import { PreverbScene } from './scene'
import { captureDiagramViewAsPng } from './capture-view'
import { PV_SCENARIOS } from './scenarios'
import { escapeAttr, escapeHtml, formatCitationHtml, safeErrorMessage } from '../util/html'
import { SITE_NAME_KA } from '../branding'

/** Public data URLs for the demo app; honor Vite `base` (e.g. GitHub Pages project sites). */
function defaultDataUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL
  const path = relativePath.replace(/^\//, '')
  return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`
}

const DEFAULT_URLS = {
  preverbs: defaultDataUrl('data/preverbs.json'),
  layout: defaultDataUrl('data/layout.json'),
  diagramVerbs: defaultDataUrl('data/diagram_verbs.json'),
} as const

async function loadJson<T>(url: string): Promise<T> {
  const r = await fetch(url)
  if (!r.ok) throw new Error(`Failed to load ${url}: ${r.status}`)
  return r.json() as Promise<T>
}

const TIER_DISPLAY: Record<PreverbTier, string> = {
  modern_simple: 'Modern simple preverb',
  modern_complex: 'Modern complex preverb — simple preverb + მო-',
  old_simple: 'Old simple',
  old_complex: 'Old complex',
}

const LEGEND_ROWS: { tier: PreverbTier; title: string; sub: string }[] = [
  {
    tier: 'modern_simple',
    title: 'Modern simple',
    sub: 'Modern simple-type preverbs.',
  },
  {
    tier: 'modern_complex',
    title: 'Modern complex',
    sub: 'Modern complex-type preverbs.',
  },
  {
    tier: 'old_simple',
    title: 'Old simple',
    sub: 'Archaic / literary simple-type preverbs.',
  },
  {
    tier: 'old_complex',
    title: 'Old complex',
    sub: 'Archaic / literary complex-type preverbs.',
  },
]

function citationHtml(): string {
  return `<div class="pd-citation-block">
    <p class="pd-citation"><strong>Source:</strong> Rusudan Asatiani, <cite>Dynamic Conceptual Model of the Linguistic Structuring of Space: the Georgian Preverbs</cite> (Institute of Oriental Studies, Georgia), 2007. [<a href="https://archive.illc.uva.nl/Tbilisi/Tbilisi2007/abstracts/3.pdf" target="_blank" rel="noopener">source</a>]</p>
    <br>
    <p class="pd-citation">This interactive diagram adapts and extends the author's spatial model into an interactive model. Some icons, terminology, and scenarios are drawn directly from the author's text. Citations given where relevant.</p>
  </div>`
}

const STORAGE_COLLAPSE_LEFT = 'pd-collapse-left'
const STORAGE_COLLAPSE_RIGHT = 'pd-collapse-right'
const STORAGE_THEME = 'pd-theme'
const WIDE_MQ = '(min-width: 1101px)'

export async function mountPreverbDiagram(options: MountOptions): Promise<MountHandle> {
  const { container, mode: initialMode, verbKey: initialVerbKey, fontFamily, embedded = false } =
    options
  let initialTheme: 'dark' | 'light' = options.theme === 'dark' ? 'dark' : 'light'
  if (!options.theme && !embedded) {
    try {
      const storedTheme = localStorage.getItem(STORAGE_THEME)
      if (storedTheme === 'dark' || storedTheme === 'light') {
        initialTheme = storedTheme
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        initialTheme = 'dark'
      }
    } catch {
      /* ignore storage errors */
    }
  }

  const preverbsUrl = options.preverbsUrl ?? DEFAULT_URLS.preverbs
  const layoutUrl = options.layoutUrl ?? DEFAULT_URLS.layout
  const diagramVerbsUrl = options.diagramVerbsUrl ?? DEFAULT_URLS.diagramVerbs

  const preverbs: PreverbInventory =
    options.preverbs ?? (await loadJson<PreverbInventory>(preverbsUrl))
  const layout: LayoutData = options.layout ?? (await loadJson<LayoutData>(layoutUrl))
  const diagramVerbs: Record<string, VerbDiagramProfile> =
    options.diagramVerbs !== undefined
      ? options.diagramVerbs
      : (await loadJson<DiagramVerbsFile>(diagramVerbsUrl)).verbs

  let mode = initialMode
  let verbKey = initialVerbKey ?? ''
  let selectedId: string | null = null
  let modernPreverbsOnly = false
  let scenarioId: string | null = null
  let legendTierFilter: PreverbTier | null = null

  const siteHeaderHtml = embedded
    ? ''
    : `<header class="pd-site-header">
      <div class="pd-site-header__inner pd-site-header__inner--controls">
        <a class="pd-header-link" href="../">Back to Bagh</a>
        <button type="button" class="pd-btn pd-theme-toggle">Switch theme</button>
      </div>
    </header>`

  const root = document.createElement('div')
  root.className = embedded ? 'pd-root pd-root--embedded' : 'pd-root'
  root.innerHTML = `
    <div class="pd-layout">
      ${siteHeaderHtml}
      <div class="pd-layout-body">
      <div class="pd-sidebar-shell pd-sidebar-shell--left">
        <button type="button" class="pd-sidebar-toggle pd-sidebar-toggle--left" aria-expanded="true" aria-controls="pd-scroll-left" title="Hide reference panel">‹</button>
        <div class="pd-sidebar-scroll" id="pd-scroll-left">
          <aside class="pd-sidebar pd-sidebar--left" aria-label="Legend and diagram reference">
            <label class="pd-check pd-modern-preverbs-label"><input type="checkbox" class="pd-modern-preverbs-only"/> Modern preverbs only (9 simple preverbs + 6 complex preverbs with მო-)</label>
            <div class="pd-legend"></div>
            <div class="pd-axes-legend pd-axes-legend--stacked">
              <strong>Dimensions:</strong>
              <span><strong>Geographic Space (GS):</strong> up ←→ down / in ←→ out</span>
              <div class="pd-axes-legend__dimension">
                <span><strong>Communicational Space (CS):</strong> Ego Space (ES) ←→ Alter Space (AS)</span>
                <ul class="pd-axes-legend__subbullets">
                  <li><strong>Ego Space (ES):</strong> Towards participants (speaker/addressee, I/II persons)</li>
                  <li><strong>Alter Space (AS):</strong> Towards non-participants (III person)</li>
                </ul>
              </div>
            </div>
            <div class="pd-reading-hint">
              <h3>Axes, arrows, perspectives</h3>
              <p>Colored <strong>arrows</strong> from the center show the six main directions (<strong>up/down</strong>, <strong>in/out</strong>, <strong>toward ego</strong> / <strong>toward alter</strong>).</p>
              <ul>
                <li><span class="pd-key pd-key--y"></span> <strong>Green</strong> — Geographic movement up/down (GS) along <strong>ა-</strong> / <strong>ჩა-</strong>.</li>
                <li><span class="pd-key pd-key--x"></span> <strong>Blue</strong> — Communicational movement toward Ego Space (ES) or Alter Space (AS) along <strong>მო-</strong> / <strong>მი-</strong>.</li>
                <li><span class="pd-key pd-key--z"></span> <strong>Purple</strong> — Geographic movement in/out (GS) along <strong>შე-</strong> / <strong>გა-</strong>.</li>
              </ul>
              <p><strong>Select a <em>Scenario</em></strong> (in the <strong>Details</strong> panel) to see how “up/down” <strong>Point of view (PV):</strong> can shift with the speaker's position.</p>
            </div>
            ${buildSpatialIconsSectionHtml()}
            ${citationHtml()}
          </aside>
        </div>
      </div>
      <div class="pd-main">
        <div class="pd-canvas-host">
          <div class="pd-canvas-chrome">
            <div class="pd-canvas-chrome__bottom">
              <div class="pd-canvas-chrome__icons">
                <div class="pd-icon-strip-host" aria-live="polite"></div>
              </div>
              <div class="pd-canvas-chrome__actions">
                <button type="button" class="pd-btn pd-reset-view">Reset view</button>
                <button type="button" class="pd-btn pd-print">Print</button>
              </div>
            </div>
          </div>
        </div>
        <footer class="pd-bottom-bar" aria-label="Diagram help">
          <p class="pd-view-hint">Drag empty space to rotate (touch or mouse). <strong>Reset view</strong> restores the default angle. <strong>Print</strong> captures the current 3D view (WYSIWYG).</p>
        </footer>
      </div>
      <div class="pd-sidebar-shell pd-sidebar-shell--right">
        <div class="pd-sidebar-scroll" id="pd-scroll-right">
          <aside class="pd-sidebar pd-sidebar--right" aria-label="View options and preverb details">
            <div class="pd-mode-bar">
              <label>View <select class="pd-mode">
                <option value="overview">All preverbs</option>
                <option value="verb">Verb-specific</option>
              </select></label>
              <label class="pd-verb-wrap" style="display:none">Verb
                <select class="pd-verb"></select>
              </label>
              <label class="pd-check pd-scenario-label">Scenario
                <select class="pd-scenario">
                  <option value="">— none —</option>
                  ${PV_SCENARIOS.map((s) => `<option value="${s.id}">${escapeAttr(s.title)}</option>`).join('')}
                </select>
              </label>
            </div>
            <div class="pd-panel"></div>
          </aside>
        </div>
        <button type="button" class="pd-sidebar-toggle pd-sidebar-toggle--right" aria-expanded="true" aria-controls="pd-scroll-right" title="Hide details panel">›</button>
      </div>
      <div class="pd-fab-layer">
        <button type="button" class="pd-drawer-fab pd-drawer-fab--left" aria-expanded="false" aria-controls="pd-scroll-left">Reference</button>
        <button type="button" class="pd-drawer-fab pd-drawer-fab--right" aria-expanded="false" aria-controls="pd-scroll-right">Details</button>
      </div>
      </div>
    </div>
    <div class="pd-drawer-backdrop" hidden></div>
    <div class="pd-print-root" aria-hidden="true"></div>
  `
  container.appendChild(root)

  const layoutEl = root.querySelector('.pd-layout') as HTMLElement
  const drawerBackdrop = root.querySelector('.pd-drawer-backdrop') as HTMLElement
  const toggleLeft = root.querySelector('.pd-sidebar-toggle--left') as HTMLButtonElement
  const toggleRight = root.querySelector('.pd-sidebar-toggle--right') as HTMLButtonElement
  const fabLeft = root.querySelector('.pd-drawer-fab--left') as HTMLButtonElement
  const fabRight = root.querySelector('.pd-drawer-fab--right') as HTMLButtonElement
  const scrollLeftEl = root.querySelector('#pd-scroll-left') as HTMLElement
  const scrollRightEl = root.querySelector('#pd-scroll-right') as HTMLElement

  const mql = window.matchMedia(WIDE_MQ)

  function isWideLayout() {
    return mql.matches
  }

  function readStoredCollapse(key: string): boolean {
    try {
      return sessionStorage.getItem(key) === '1'
    } catch {
      return false
    }
  }

  function writeStoredCollapse(key: string, collapsed: boolean) {
    try {
      sessionStorage.setItem(key, collapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }

  function syncWideToggleUi() {
    const leftCollapsed = layoutEl.classList.contains('pd-layout--left-collapsed')
    const rightCollapsed = layoutEl.classList.contains('pd-layout--right-collapsed')
    toggleLeft.setAttribute('aria-expanded', (!leftCollapsed).toString())
    toggleRight.setAttribute('aria-expanded', (!rightCollapsed).toString())
    toggleLeft.textContent = leftCollapsed ? '›' : '‹'
    toggleRight.textContent = rightCollapsed ? '‹' : '›'
    toggleLeft.title = leftCollapsed ? 'Show reference panel' : 'Hide reference panel'
    toggleRight.title = rightCollapsed ? 'Show details panel' : 'Hide details panel'
  }

  function applyStoredWideCollapse() {
    if (!isWideLayout()) return
    if (readStoredCollapse(STORAGE_COLLAPSE_LEFT)) layoutEl.classList.add('pd-layout--left-collapsed')
    if (readStoredCollapse(STORAGE_COLLAPSE_RIGHT)) layoutEl.classList.add('pd-layout--right-collapsed')
    syncWideToggleUi()
  }

  function setDrawerOpen(side: 'left' | 'right' | null) {
    const leftOn = side === 'left'
    const rightOn = side === 'right'
    root.classList.toggle('pd-root--drawer-left-open', leftOn)
    root.classList.toggle('pd-root--drawer-right-open', rightOn)
    root.classList.toggle('pd-root--drawer-open', side !== null)
    drawerBackdrop.hidden = side === null
    fabLeft.setAttribute('aria-expanded', leftOn.toString())
    fabRight.setAttribute('aria-expanded', rightOn.toString())
  }

  function closeDrawers() {
    setDrawerOpen(null)
  }

  function focusDrawerStart(side: 'left' | 'right') {
    const wrap = side === 'left' ? scrollLeftEl : scrollRightEl
    const first =
      wrap.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) ?? wrap
    first.focus()
  }

  applyStoredWideCollapse()

  const iconStripHost = root.querySelector('.pd-icon-strip-host')
  const canvasHost = root.querySelector('.pd-canvas-host') as HTMLElement
  if (!iconStripHost) {
    console.warn(
      'acha-mimo: .pd-icon-strip-host missing from template; canvas icon strip disabled.'
    )
  }
  const panel = root.querySelector('.pd-panel') as HTMLElement
  const legend = root.querySelector('.pd-legend') as HTMLElement
  const modeSelect = root.querySelector('.pd-mode') as HTMLSelectElement
  const verbSelect = root.querySelector('.pd-verb') as HTMLSelectElement
  const verbWrap = root.querySelector('.pd-verb-wrap') as HTMLElement
  const modernPreverbsCb = root.querySelector('.pd-modern-preverbs-only') as HTMLInputElement
  const scenarioSelect = root.querySelector('.pd-scenario') as HTMLSelectElement
  const resetBtn = root.querySelector('.pd-reset-view') as HTMLButtonElement
  const printBtn = root.querySelector('.pd-print') as HTMLButtonElement
  const printRoot = root.querySelector('.pd-print-root') as HTMLElement
  const viewHintEl = root.querySelector('.pd-view-hint') as HTMLElement
  const themeToggleBtn = root.querySelector('.pd-theme-toggle') as HTMLButtonElement | null

  if (fontFamily) {
    root.style.setProperty('--pd-font-georgian', fontFamily)
  }

  const scene = new PreverbScene(canvasHost, fontFamily)
  const applyTheme = (theme: 'dark' | 'light') => {
    root.dataset.theme = theme
    scene.setTheme(theme)
    if (themeToggleBtn) {
      themeToggleBtn.textContent = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
    }
  }
  applyTheme(initialTheme)

  const onThemeToggle = () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark'
    applyTheme(nextTheme)
    if (!embedded) {
      try {
        localStorage.setItem(STORAGE_THEME, nextTheme)
      } catch {
        /* ignore storage errors */
      }
    }
  }
  themeToggleBtn?.addEventListener('click', onThemeToggle)

  toggleLeft.addEventListener('click', () => {
    if (!isWideLayout()) return
    const next = !layoutEl.classList.contains('pd-layout--left-collapsed')
    layoutEl.classList.toggle('pd-layout--left-collapsed', next)
    writeStoredCollapse(STORAGE_COLLAPSE_LEFT, next)
    syncWideToggleUi()
    scene.resize()
  })

  toggleRight.addEventListener('click', () => {
    if (!isWideLayout()) return
    const next = !layoutEl.classList.contains('pd-layout--right-collapsed')
    layoutEl.classList.toggle('pd-layout--right-collapsed', next)
    writeStoredCollapse(STORAGE_COLLAPSE_RIGHT, next)
    syncWideToggleUi()
    scene.resize()
  })

  fabLeft.addEventListener('click', () => {
    if (isWideLayout()) return
    if (root.classList.contains('pd-root--drawer-left-open')) closeDrawers()
    else {
      setDrawerOpen('left')
      requestAnimationFrame(() => focusDrawerStart('left'))
    }
  })

  fabRight.addEventListener('click', () => {
    if (isWideLayout()) return
    if (root.classList.contains('pd-root--drawer-right-open')) closeDrawers()
    else {
      setDrawerOpen('right')
      requestAnimationFrame(() => focusDrawerStart('right'))
    }
  })

  drawerBackdrop.addEventListener('click', () => closeDrawers())

  const onViewportChange = () => {
    if (isWideLayout()) {
      closeDrawers()
      applyStoredWideCollapse()
      syncWideToggleUi()
    } else {
      layoutEl.classList.remove('pd-layout--left-collapsed', 'pd-layout--right-collapsed')
    }
    scene.resize()
  }

  mql.addEventListener('change', onViewportChange)

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (!root.classList.contains('pd-root--drawer-open')) return
    closeDrawers()
  }
  document.addEventListener('keydown', onKeydown)

  for (const k of Object.keys(diagramVerbs).sort()) {
    const opt = document.createElement('option')
    opt.value = k
    opt.textContent = diagramVerbs[k].label ?? k
    verbSelect.appendChild(opt)
  }
  if (verbKey && diagramVerbs[verbKey]) verbSelect.value = verbKey
  else if (verbSelect.options.length) {
    verbKey = verbSelect.options[0].value
  }

  modeSelect.value = mode
  verbWrap.style.display = mode === 'verb' ? 'flex' : 'none'

  function updateViewHint() {
    if (!viewHintEl) return
    if (mode === 'verb') {
      viewHintEl.innerHTML =
        'Drag empty space to rotate (touch or mouse).'
      return
    }
    viewHintEl.innerHTML =
      'Drag empty space to rotate (touch or mouse). <strong>Reset view</strong> restores the default angle. <strong>Print</strong> captures the current 3D view (WYSIWYG).'
  }

  function currentVerbProfile(): VerbDiagramProfile | null {
    if (mode !== 'verb') return null
    return diagramVerbs[verbKey] ?? null
  }

  function usedSet(): Set<string> | null {
    const v = currentVerbProfile()
    if (!v) return null
    return new Set(v.usedPreverbIds)
  }

  function scenarioHighlight(): Set<string> | null {
    if (!scenarioId) return null
    const s = PV_SCENARIOS.find((x) => x.id === scenarioId)
    return s ? new Set(s.highlightIds) : null
  }

  function syncLegendAria() {
    legend.querySelectorAll<HTMLButtonElement>('.pd-leg-item').forEach((btn) => {
      const t = btn.dataset.tier as PreverbTier
      const on = legendTierFilter === t
      btn.setAttribute('aria-pressed', on ? 'true' : 'false')
      btn.classList.toggle('pd-leg-item--active', on)
    })
  }

  function renderLegend() {
    legend.innerHTML =
      '<h3>Legend</h3>' +
      '<p class="pd-legend-help">Click a row to dim other tiers on the cube.</p>' +
      '<div class="pd-leg-list">' +
      LEGEND_ROWS.map(
        (r) =>
          `<button type="button" class="pd-leg-item" data-tier="${r.tier}" aria-pressed="false"><span class="pd-leg-stripe pd-leg-stripe--${r.tier}" aria-hidden="true"></span><span class="pd-leg-body"><strong>${escapeHtml(r.title)}</strong><span class="pd-leg-sub">${escapeHtml(r.sub)}</span></span></button>`
      ).join('') +
      '</div>'

    legend.querySelectorAll<HTMLButtonElement>('.pd-leg-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.tier as PreverbTier
        legendTierFilter = legendTierFilter === t ? null : t
        syncLegendAria()
        syncStylesOnly()
      })
    })
  }

  function syncCanvasIconStrip() {
    if (!iconStripHost) return
    iconStripHost.innerHTML = buildCanvasIconStripHtml(selectedId, preverbs.preverbs)
  }

  function renderPanel() {
    const list = preverbs.preverbs
    const p = selectedId ? list.find((x) => x.id === selectedId) : null
    const verb = currentVerbProfile()
    let html = ''

    syncCanvasIconStrip()

    if (scenarioId) {
      const sc = PV_SCENARIOS.find((x) => x.id === scenarioId)
      if (sc) {
        html += `<div class="pd-scenario-box"><h3>${escapeHtml(sc.title)}</h3><p>${escapeHtml(sc.body)}</p></div>`
      }
    }

    if (!p) {
      html += `<p class="pd-hint">Click a preverb on the cube to see glosses and notes.</p>`
      panel.innerHTML = html
      return
    }

    const ann = verb?.annotations?.[p.id]
    const hints = { ...p.axisHints, ...layout.entries.find((e) => e.id === p.id)?.axisHints }

    html += `<h2>${escapeHtml(p.display)} <span class="pd-meta">${escapeHtml(TIER_DISPLAY[p.tier] ?? p.tier)}</span></h2>`
    if (p.specialRules?.length) {
      html += `<ul class="pd-rules">${p.specialRules.map((r) => `<li>${escapeHtml(r)}</li>`).join('')}</ul>`
    }
    if (hints.geographic)
      html += `<p><strong>Geographic Space (GS):</strong> ${escapeHtml(hints.geographic)}</p>`
    if (hints.communicational)
      html += `<p><strong>Communicational Space (CS):</strong> ${escapeHtml(hints.communicational)}</p>`
    if (hints.distance)
      html += `<p><strong>Distance (within GS):</strong> ${escapeHtml(hints.distance)}</p>`
    if (p.aliases?.length) {
      html += `<p><strong>Aliases:</strong> ${p.aliases.map(escapeHtml).join(', ')}</p>`
    }
    if (p.wiktionaryPath) {
      const u = `https://en.wiktionary.org/wiki/${encodeURIComponent(p.wiktionaryPath)}`
      html += `<p><a href="${u}" target="_blank" rel="noopener">Wiktionary</a></p>`
    }
    if (ann?.note) html += `<p class="pd-annote"><strong>Note:</strong> ${escapeHtml(ann.note)}</p>`
    if (ann?.examples?.length) {
      html += `<h4>Examples</h4><ul class="pd-examples">`
      for (const ex of ann.examples) {
        html += `<li><span class="pd-geo">${escapeHtml(ex.georgian)}</span> — ${escapeHtml(ex.gloss)}</li>`
      }
      html += `</ul>`
    }
    if (ann?.citation)
      html += `<p class="pd-ann-citation"><strong>Citation:</strong> ${formatCitationHtml(ann.citation)}</p>`
    panel.innerHTML = html
  }

  function syncScene() {
    const sh = scenarioHighlight()
    scene.buildLabels(layout, preverbs.preverbs, {
      modernPreverbsOnly,
      mode,
      usedIds: usedSet(),
      selectedId,
      scenarioHighlight: sh,
      legendTier: legendTierFilter,
    })
    scene.setDiagramHints(selectedId, layout)
  }

  function syncStylesOnly() {
    scene.updateLabelStyles(
      {
        modernPreverbsOnly,
        mode,
        usedIds: usedSet(),
        selectedId,
        scenarioHighlight: scenarioHighlight(),
        legendTier: legendTierFilter,
      },
      preverbs.preverbs
    )
  }

  scene.setPickCallback((id) => {
    if (id === null) return
    selectedId = selectedId === id ? null : id
    scene.setDiagramHints(selectedId, layout)
    syncStylesOnly()
    renderPanel()
  })

  modeSelect.addEventListener('change', () => {
    mode = modeSelect.value as 'overview' | 'verb'
    verbWrap.style.display = mode === 'verb' ? 'flex' : 'none'
    selectedId = null
    updateViewHint()
    syncScene()
    renderPanel()
  })

  verbSelect.addEventListener('change', () => {
    verbKey = verbSelect.value
    selectedId = null
    syncScene()
    renderPanel()
  })

  modernPreverbsCb.addEventListener('change', () => {
    modernPreverbsOnly = modernPreverbsCb.checked
    selectedId = null
    syncScene()
    renderPanel()
  })

  scenarioSelect.addEventListener('change', () => {
    scenarioId = scenarioSelect.value || null
    syncStylesOnly()
    renderPanel()
  })

  resetBtn.addEventListener('click', () => {
    scene.resetView()
  })

  printBtn.addEventListener('click', async () => {
    printBtn.disabled = true
    try {
      const dataUrl = await captureDiagramViewAsPng(canvasHost, () => scene.renderOnce())
      printRoot.replaceChildren()
      const img = document.createElement('img')
      img.alt = SITE_NAME_KA
      img.style.maxWidth = '100%'
      img.style.height = 'auto'
      img.src = dataUrl
      printRoot.appendChild(img)
      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        window.clearTimeout(failSafeTimer)
        window.removeEventListener('afterprint', onAfterPrint)
        printRoot.replaceChildren()
        printBtn.disabled = false
      }
      const onAfterPrint = () => finish()
      const failSafeTimer = window.setTimeout(finish, 120_000)
      window.addEventListener('afterprint', onAfterPrint)
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      )
      window.print()
    } catch (e) {
      console.error(e)
      window.alert(`Could not capture the 3D view for printing: ${safeErrorMessage(e)}`)
      printBtn.disabled = false
    }
  })

  renderLegend()
  syncLegendAria()
  updateViewHint()
  renderPanel()
  syncScene()

  const ro = new ResizeObserver(() => scene.resize())
  ro.observe(canvasHost)

  return {
    destroy: () => {
      mql.removeEventListener('change', onViewportChange)
      document.removeEventListener('keydown', onKeydown)
      themeToggleBtn?.removeEventListener('click', onThemeToggle)
      ro.disconnect()
      scene.destroy()
      root.remove()
    },
    setMode: (m, vk) => {
      mode = m
      modeSelect.value = m
      verbWrap.style.display = m === 'verb' ? 'flex' : 'none'
      if (vk !== undefined && diagramVerbs[vk]) {
        verbKey = vk
        verbSelect.value = vk
      }
      selectedId = null
      syncScene()
      renderPanel()
    },
    setModernPreverbsOnly: (on) => {
      modernPreverbsOnly = on
      modernPreverbsCb.checked = on
      selectedId = null
      syncScene()
      renderPanel()
    },
    setScenarioId: (id) => {
      scenarioId = id
      scenarioSelect.value = id ?? ''
      syncStylesOnly()
      renderPanel()
    },
    captureViewAsPng: () => captureDiagramViewAsPng(canvasHost, () => scene.renderOnce()),
    resetView: () => {
      scene.resetView()
    },
    setTheme: (theme) => {
      applyTheme(theme === 'dark' ? 'dark' : 'light')
    },
  }
}
