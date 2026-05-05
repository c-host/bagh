import './style.css'
import { mountPreverbDiagram } from './diagram/mount'
import { escapeHtml, safeErrorMessage } from './util/html'

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('#app missing')

const embedded = new URLSearchParams(window.location.search).get('embedded') === '1'

mountPreverbDiagram({
  container: app,
  mode: 'overview',
  embedded,
}).catch((e) => {
  app.innerHTML = `<p class="pd-err">Failed to load acha-mimo: ${escapeHtml(safeErrorMessage(e))}</p>`
  console.error(e)
})
