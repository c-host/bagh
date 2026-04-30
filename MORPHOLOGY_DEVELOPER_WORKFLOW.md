# Morphology Developer Workflow

This project now keeps the morphology editor and chart data inside the same website repo:

- Editor app: `websites/verb-website/morphology-chart/`
- Canonical chart data: `websites/verb-website/morphology-chart/data/charts.json`
- Bagh integration data target: `websites/verb-website/src/data/morphology/charts.json`
- Built embed target: `websites/verb-website/dist/morphology-chart/`

## 1) Edit charts in the morphology editor

Open:

- `websites/verb-website/morphology-chart/index.html`

In the node editor:

- Select a node.
- Use **Linked verbs** to assign one or more verb IDs.
- Changes autosave in browser local storage while you work.

When ready, click **Export JSON** and save the file.

## 2) Commit the exported chart data

Replace:

- `websites/verb-website/morphology-chart/data/charts.json`

with your exported JSON.

This file is the source of truth for morphology charts in the repo.

## 3) Build bagh + embedded morphology viewer

From `websites/verb-website/` run:

- `npm run build_production`

The build pipeline syncs morphology files automatically:

- Copies `morphology-chart/data/charts.json` into:
  - `src/data/morphology/charts.json`
  - `dist/data/morphology/charts.json`
- Copies `morphology-chart/index.html`, `styles.css`, `app.js` into:
  - `dist/morphology-chart/`
- Copies chart data for the embedded app into:
  - `dist/morphology-chart/data/charts.json`

## 4) Verify locally

Open:

- `websites/verb-website/dist/index.html`

Check:

- A verb page with linked morphology nodes shows **Related Morphology**.
- The embedded canvas is draggable/zoomable.
- Linked node highlights persist.
- Node verb chips navigate to verb pages.

## 5) Publish

Commit and push the `websites/verb-website/` changes to GitHub Pages source branch.

If your deployment uses `dist/` as the published artifact, ensure that the rebuilt `dist/` output is included according to your repo policy.

## Notes

- End users in bagh only see read-only embedded morphology charts.
- The full editor stays separate at `morphology-chart/index.html` and is not surfaced in bagh UI.
