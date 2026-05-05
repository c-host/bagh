import html2canvas from 'html2canvas'

/**
 * Raster snapshot of the live diagram: WebGL (drawImage) + CSS2D labels (html2canvas).
 * Compositing avoids empty-WebGL issues when cloning the whole host in a single html2canvas pass.
 */
export async function captureDiagramViewAsPng(
  canvasHost: HTMLElement,
  renderOnce: () => void
): Promise<string> {
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
  )
  renderOnce()

  const glCanvas = canvasHost.querySelector('canvas')
  if (!glCanvas) throw new Error('acha-mimo: no WebGL canvas in host')

  const labelLayer = canvasHost.querySelector<HTMLElement>('.pd-label-layer')

  const w = Math.max(1, Math.round(canvasHost.clientWidth))
  const h = Math.max(1, Math.round(canvasHost.clientHeight))
  const scale = Math.min(2, window.devicePixelRatio || 1)
  const outW = Math.round(w * scale)
  const outH = Math.round(h * scale)

  const out = document.createElement('canvas')
  out.width = outW
  out.height = outH
  const ctx = out.getContext('2d')
  if (!ctx) throw new Error('acha-mimo: 2D context unavailable')

  ctx.fillStyle = '#f8f9fa'
  ctx.fillRect(0, 0, outW, outH)
  ctx.drawImage(glCanvas, 0, 0, glCanvas.width, glCanvas.height, 0, 0, outW, outH)

  if (labelLayer) {
    try {
      const labelSnap = await html2canvas(labelLayer, {
        backgroundColor: null,
        scale,
        width: w,
        height: h,
        logging: false,
        useCORS: true,
      })
      ctx.drawImage(labelSnap, 0, 0, outW, outH)
    } catch (e) {
      console.warn('[acha-mimo] Label overlay capture failed; image has 3D only.', e)
    }
  }

  return out.toDataURL('image/png')
}
