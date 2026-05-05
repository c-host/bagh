export type PreverbTier = 'modern_simple' | 'modern_complex' | 'old_simple' | 'old_complex'

/**
 * Which center arrow to highlight: the **simple preverb pole** that shaft points toward
 * (+Y → ა-, −Y → ჩა-, +X → მი-, −X → მო-, −Z → შე-, +Z → გა-).
 */
export type DirectionArrowId = 'a' | 'cha' | 'mi' | 'mo' | 'she' | 'ga'

export interface PreverbEntry {
  id: string
  display: string
  tier: PreverbTier
  wiktionaryPath?: string
  aliases?: string[]
  /** Base simple preverb id for SP + მო- complexes; null when not compositional */
  simpleId: string | null
  /** In the diagram’s “modern” inventory (9 simple + 7 with მო-) */
  modernPreverb: boolean
  /**
   * Which spatial icon rows (pole ids) show in the canvas strip for this lemma — configured here only.
   * Valid ids: `SPATIAL_ICON_ROW_IDS` in `spatial-icons.ts`. Use `[]` for none.
   */
  spatialIconRowIds?: string[]
  specialRules?: string[]
  axisHints?: {
    geographic?: string
    communicational?: string
    distance?: string
  }
}

export interface PreverbInventory {
  preverbs: PreverbEntry[]
}

export interface LayoutEntry {
  id: string
  anchor: 'vertex' | 'edge' | 'face' | 'cluster'
  position: [number, number, number]
  labelOffset?: [number, number, number]
  /**
   * Which main axis arrows brighten when this preverb is selected (configured in `layout.json` only).
   * Use `[]` for none (invalid ids are dropped; if none remain, behaves like no highlights).
   */
  highlightArrows?: DirectionArrowId[]
  axisHints?: {
    geographic?: string
    communicational?: string
    distance?: string
  }
}

export interface LayoutData {
  entries: LayoutEntry[]
}

export interface ExamplePair {
  georgian: string
  gloss: string
}

export interface PreverbAnnotation {
  examples?: ExamplePair[]
  /** Plain-language gloss of the pattern (no required citation). */
  note?: string
  /** Optional scholarly or source line (e.g. paper + section). */
  citation?: string
}

export interface VerbDiagramProfile {
  label?: string
  usedPreverbIds: string[]
  annotations?: Record<string, PreverbAnnotation>
}

export interface DiagramVerbsFile {
  verbs: Record<string, VerbDiagramProfile>
}

export interface MountOptions {
  /** Container element */
  container: HTMLElement
  mode: 'overview' | 'verb'
  /** Key into diagramVerbs when mode is 'verb' */
  verbKey?: string
  preverbsUrl?: string
  layoutUrl?: string
  diagramVerbsUrl?: string
  preverbs?: PreverbInventory
  layout?: LayoutData
  diagramVerbs?: Record<string, VerbDiagramProfile>
  /** CSS font-family for labels */
  fontFamily?: string
  /**
   * When true, fill the host `container` with `height: 100%` instead of viewport (`vh`) units.
   * Use for iframes and embedded divs where the host sets an explicit height.
   */
  embedded?: boolean
  /** Optional visual theme for embedded rendering. */
  theme?: 'light' | 'dark'
}

export interface MountHandle {
  destroy: () => void
  setMode: (mode: 'overview' | 'verb', verbKey?: string) => void
  /** When true, only preverbs with `modernPreverb: true` are shown. */
  setModernPreverbsOnly: (on: boolean) => void
  setScenarioId: (id: string | null) => void
  /** PNG data URL of the current 3D view (WebGL + CSS2D labels), for print or download. */
  captureViewAsPng: () => Promise<string>
  /** Restore camera to the default framing (shows cube + axis labels clearly). */
  resetView: () => void
  /** Update visual theme without remounting. */
  setTheme: (theme: 'light' | 'dark') => void
}
