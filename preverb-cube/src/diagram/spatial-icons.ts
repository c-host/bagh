/**
 * Renders spatial schematic SVGs keyed by pole id. Which poles apply to each lemma is set only in
 * `preverbs.json` → `spatialIconRowIds` (see `getIconRowsForPreverb`).
 */

import type { PreverbEntry } from './types'
import { escapeAttr, escapeHtml } from '../util/html'

const VB = '0 0 52 44'
const STROKE = 'currentColor'
const SW = 2

function wrapSvg(inner: string): string {
  return `<svg class="pd-spatial-icon__svg" viewBox="${VB}" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`
}

const iconA = wrapSvg(
  `<path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M26 36V8M22 12l4-4 4 4"/>`
)

const iconCha = wrapSvg(
  `<path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M26 8v28M22 32l4 4 4-4"/>`
)

const iconMi = wrapSvg(
  `<path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M8 22h32M34 18l4 4-4 4"/>`
)

const iconMo = wrapSvg(
  `<path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M44 22H12M18 18l-4 4 4 4"/>`
)

const iconGadaCross = wrapSvg(
  `<path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M8 34L26 10L41.6 30.8"/><polygon points="44,34 39.5,32.3 43.5,29.3" fill="${STROKE}"/>`
)

const iconGadaRepeat = wrapSvg(
  `<path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M10 22h32M14 18l-4 4 4 4M38 26l4-4-4-4"/>`
)

const iconSheClean = wrapSvg(
  `<circle cx="30" cy="22" r="11" stroke="${STROKE}" stroke-width="${SW}"/><path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M5 22H18"/><polygon points="18,22 14,18 14,26" fill="${STROKE}"/>`
)

const iconGa = wrapSvg(
  `<circle cx="22" cy="22" r="11" stroke="${STROKE}" stroke-width="${SW}"/><path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M22 22h20"/><polygon points="42,22 38,18 38,26" fill="${STROKE}"/>`
)

const iconTsa = wrapSvg(
  `<circle cx="20" cy="22" r="11" stroke="${STROKE}" stroke-width="${SW}"/><path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" stroke-linejoin="round" d="M31 22h16"/><polygon points="47,22 43,18 43,26" fill="${STROKE}"/>`
)

const iconDa = wrapSvg(
  `<circle cx="26" cy="18" r="10" stroke="${STROKE}" stroke-width="${SW}"/><path stroke="${STROKE}" stroke-width="${SW}" stroke-linecap="round" d="M10 34h32"/>`
)

export interface SpatialIconRow {
  id: string
  title: string
  gloss: string
  icons: string[]
}

/** Pole ids allowed in `preverbs.json` → `spatialIconRowIds` */
export const SPATIAL_ICON_ROW_IDS = [
  'a',
  'cha',
  'mi',
  'mo',
  'gada',
  'she',
  'ga',
  'tsa',
  'da',
] as const

export type SpatialIconRowId = (typeof SPATIAL_ICON_ROW_IDS)[number]

export const SPATIAL_ICON_ROWS: SpatialIconRow[] = [
  { id: 'a', title: 'ა-', gloss: 'from down to up', icons: [iconA] },
  { id: 'cha', title: 'ჩა-', gloss: 'from up to down', icons: [iconCha] },
  {
    id: 'mi',
    title: 'მი-',
    gloss: 'from speaker / listener (towards Alter Space)',
    icons: [iconMi],
  },
  { id: 'mo', title: 'მო-', gloss: 'to speaker / listener (towards Ego Space)', icons: [iconMo] },
  {
    id: 'gada',
    title: 'გადა-',
    gloss: 'crossing obstacles; also frequenting / repeating (back-and-forth)',
    icons: [iconGadaCross, iconGadaRepeat],
  },
  { id: 'she', title: 'შე-', gloss: 'from outside to inside', icons: [iconSheClean] },
  { id: 'ga', title: 'გა-', gloss: 'from inside to outside', icons: [iconGa] },
  { id: 'tsa', title: 'წა-', gloss: 'from something / somebody (departure)', icons: [iconTsa] },
  {
    id: 'da',
    title: 'და-',
    gloss: 'above some space',
    icons: [iconDa],
  },
]

const ROW_BY_ID = new Map(SPATIAL_ICON_ROWS.map((r) => [r.id, r]))

export function getIconRowsForPreverb(id: string, preverbs: PreverbEntry[]): SpatialIconRow[] {
  const p = preverbs.find((x) => x.id === id)
  if (!p?.spatialIconRowIds?.length) return []

  const out: SpatialIconRow[] = []
  for (const rowId of p.spatialIconRowIds) {
    const row = ROW_BY_ID.get(rowId)
    if (row) out.push(row)
    else
      console.warn(
        `[acha-mimo] Unknown spatialIconRowIds "${rowId}" for preverb "${id}". Valid: ${SPATIAL_ICON_ROW_IDS.join(', ')}`
      )
  }
  return out
}

export function buildCanvasIconStripHtml(
  selectedId: string | null,
  preverbs: PreverbEntry[]
): string {
  if (!selectedId) {
    return `<div class="pd-icon-strip pd-icon-strip--empty"><span class="pd-icon-strip__placeholder">Select a preverb — spatial icons for that lemma appear here.</span></div>`
  }

  const rows = getIconRowsForPreverb(selectedId, preverbs)
  if (!rows.length) {
    const p = preverbs.find((x) => x.id === selectedId)
    const label = p?.display ?? selectedId
    return `<div class="pd-icon-strip pd-icon-strip--empty"><span class="pd-icon-strip__placeholder">${escapeHtml(
      label
    )} — no spatial icons configured for this preverb.</span></div>`
  }

  const blocks = rows
    .map((row) => {
      const cells = row.icons
        .map(
          (svg) =>
            `<span class="pd-icon-strip__cell" role="img" aria-label="${escapeAttr(row.title)}">${svg}</span>`
        )
        .join('')
      return `<div class="pd-icon-strip__block"><span class="pd-icon-strip__lemma">${escapeHtml(row.title)}</span><div class="pd-icon-strip__graphics">${cells}</div></div>`
    })
    .join('')

  return `<div class="pd-icon-strip pd-icon-strip--active" role="region" aria-label="Spatial icons for selected preverb">${blocks}</div>`
}

export function buildSpatialIconsSectionHtml(): string {
  const rows = SPATIAL_ICON_ROWS.map((row) => {
    const cells = row.icons
      .map(
        (svg) =>
          `<span class="pd-spatial-icon__cell" role="img" aria-label="${escapeAttr(row.title + ' ' + row.gloss)}">${svg}</span>`
      )
      .join('')
    return `<li class="pd-spatial-icon__row" data-preverb-id="${escapeAttr(row.id)}">
      <div class="pd-spatial-icon__text"><strong class="pd-spatial-icon__lemma">${escapeHtml(row.title)}</strong> <span class="pd-spatial-icon__gloss">${escapeHtml(row.gloss)}</span></div>
      <div class="pd-spatial-icon__graphics">${cells}</div>
    </li>`
  }).join('')

  return `<div class="pd-icon-key">
    <h3>Spatial schematic icons key</h3>
    <p class="pd-icon-key__intro">Clicking a preverb will also display a 2D spatial icon in the bottom bar.</p>
    <ul class="pd-icon-key__list">${rows}</ul>
  </div>`
}
