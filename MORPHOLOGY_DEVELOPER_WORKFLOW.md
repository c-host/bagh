# Morphology Developer Workflow

This repo uses an `apps/*` layout.

- Editor app: `apps/morphology-chart/`
- Canonical chart data: `apps/morphology-chart/data/charts.json`
- Morphology working data: `apps/morphology-chart/data/work/`
- Built embed target: `dist/morphology-chart/`

## 1) Edit charts in the morphology editor

Open:

- `apps/morphology-chart/index.html`

In the node editor:

- Select a node.
- Use **Linked verbs** to assign one or more verb IDs.
- Changes autosave in browser local storage while you work.

When ready, click **Export JSON** and save the file.

## 2) Commit the exported chart data

Replace:

- `apps/morphology-chart/data/charts.json`

with your exported JSON.

## 3) Build the website

From repo root:

- `npm run build`

Build output includes:

- `dist/data/morphology/charts.json` (main app runtime path)
- `dist/morphology-chart/index.html`, `styles.css`, `app.js`
- `dist/morphology-chart/data/charts.json`

## 4) Verify locally

Start local services:

- `npm run dev`

Then open:

- `http://127.0.0.1:8000/dist/index.html`
- Optional direct chart editor: `http://127.0.0.1:8000/apps/morphology-chart/index.html`

Check:

- Verb pages show **Morphological Context** where linked nodes exist.
- Embedded morphology chart is draggable/zoomable.
- Node highlights and deep-link behavior work.

## Notes

- End users in bagh see read-only embedded morphology charts.
- The full editor remains a separate app under `apps/morphology-chart/`.
