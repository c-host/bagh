/**
 * Axis arrow highlights: `layout.json` → `highlightArrows` uses `DirectionArrowId`
 * (simple preverb pole each shaft points toward).
 */
import type { DirectionArrowId, LayoutData } from './types'

export type { DirectionArrowId } from './types'

const VALID_ARROW = new Set<DirectionArrowId>(['a', 'cha', 'mi', 'mo', 'she', 'ga'])

function arrowsFromLayout(
  id: string,
  layout: LayoutData | null | undefined
): DirectionArrowId[] | null {
  if (!layout) return null
  const entry = layout.entries.find((e) => e.id === id)
  if (!entry || entry.highlightArrows === undefined) return null
  const valid = entry.highlightArrows.filter((x): x is DirectionArrowId => VALID_ARROW.has(x))
  return valid.length > 0 ? valid : null
}

export function axisArrowsForPreverb(
  id: string | null,
  layout?: LayoutData | null
): DirectionArrowId[] | null {
  if (!id) return null
  return arrowsFromLayout(id, layout ?? null)
}
