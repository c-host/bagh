/** Escape text for safe insertion into HTML text nodes and attributes. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, '&#39;')
}

const URL_IN_TEXT = /(https?:\/\/[^\s]+)/gi

/** Turn https URLs in a citation into clickable links; escape all other text. */
export function formatCitationHtml(citation: string): string {
  if (!/https?:\/\//i.test(citation)) return escapeHtml(citation)
  const parts = citation.split(URL_IN_TEXT)
  return parts
    .map((part, i) => {
      if (i % 2 === 1 && /^https?:\/\//i.test(part)) {
        const href = part.replace(/[)\].,;:!?]+$/u, '')
        const tail = part.slice(href.length)
        const label = citationLinkLabel(href)
        return `<a href="${escapeAttr(href)}" target="_blank" rel="noopener">${escapeHtml(label)}</a>${escapeHtml(tail)}`
      }
      return escapeHtml(part)
    })
    .join('')
}

function citationLinkLabel(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname === 'lingua.ge' || u.hostname.endsWith('.lingua.ge')) return 'Lingua.ge'
    if (u.hostname.endsWith('wiktionary.org')) return 'Wiktionary'
    if (u.hostname.includes('archive.illc.uva.nl')) return 'ILLC archive'
    return u.hostname.replace(/^www\./, '') || 'Link'
  } catch {
    return 'Link'
  }
}

/** Safe one-line message for error UI (never interpret as HTML). */
export function safeErrorMessage(e: unknown): string {
  if (e instanceof Error) return e.message || e.name || 'Error'
  if (typeof e === 'string') return e
  try {
    return JSON.stringify(e)
  } catch {
    return String(e)
  }
}
