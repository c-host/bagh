# Bagh: Georgian Verbs

🌱 Bagh is a Georgian verb resource with searchable entries, screve tables, examples, gloss/case analysis, 3D representation and verb-specific preverb cubes, and linked morphology charts.

> **⚠️ Work in Progress:** This website is a personal study resource and under active development. While functional, it may contain some inconsistencies and incomplete features. Please do not treat this as a definitive source for Georgian verb conjugations.

## 🌐 View the Website
[https://c-host.github.io/bagh/dist/index.html](https://c-host.github.io/bagh/dist/index.html)

- Browse verb pages with tense tables and gloss breakdowns.
- Compare preverb behavior.
- Open related morphology charts from verb pages.
- Use multiple Georgian fonts for readability preferences.

## Quick start for developers

From repo root:

```bash
npm run dev
```

This starts:
- a local static server on port `8000`
- the morphology pipeline API service on port `8765`
- the browser at `http://127.0.0.1:8000/dist/index.html`

Build deployable output:

```bash
npm run build
```

This generates/syncs everything into `dist/`.

## 🗺️ Project map

- `apps/bagh/` - main app source (UI, scripts, styles, and source data).
- `dist/` - built output used for deployment/local static preview.
- `apps/morphology-chart/` - standalone morphology editor/viewer app.
- `apps/preverb-cube/` - 3D preverb visualization app/library.
- `tools/` - build pipeline, data processing, scraping, and morphology/GNC utilities.

## 🧊 Data model notes

- Canonical morphology chart data lives in `apps/morphology-chart/data/charts.json`.
- Build sync copies morphology chart data into:
  - `dist/data/morphology/charts.json`
  - `dist/morphology-chart/data/charts.json`
- Generated working data for pipelines now lives under:
  - `apps/morphology-chart/data/work/`
  - `apps/bagh/data/gnc/work/`

## 📚 More docs

- `DEVELOPMENT.md` - practical workflows for local development.
- `build/README.md` - build pipeline architecture and assembly rules.
- `tools/README.md` - build/data pipeline guide.
- `MORPHOLOGY_DEVELOPER_WORKFLOW.md` - chart editing workflow.
- `tools/morphology/ENA_PIPELINE_USAGE.md` - ENA/NPLG/GNC candidate pipeline usage.
- `apps/preverb-cube/README.md` - preverb cube component details.