/**
 * Library entry: bundle with `vite build --config vite.lib.config.ts`.
 * Import CSS once in the host app, or rely on extracted acha-mimo.css.
 */
import './style.css'

export { SITE_NAME_KA, SITE_SHORT_SLUG } from './branding'
export { mountPreverbDiagram } from './diagram/mount'
export type {
  MountOptions,
  MountHandle,
  PreverbEntry,
  PreverbInventory,
  LayoutData,
  VerbDiagramProfile,
  DiagramVerbsFile,
  PreverbTier,
  DirectionArrowId,
} from './diagram/types'
export { captureDiagramViewAsPng } from './diagram/capture-view'
export { PV_SCENARIOS } from './diagram/scenarios'
export { SPATIAL_ICON_ROW_IDS } from './diagram/spatial-icons'
export type { SpatialIconRow, SpatialIconRowId } from './diagram/spatial-icons'
