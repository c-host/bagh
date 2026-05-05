# Tools Guide

`tools/` contains scripts that build the site, process data, and support editor/pipeline workflows.

For build internals (pipeline stages, dist assembly rules), see `build/README.md`.

## Most common commands

From repo root:

```bash
# Build deployable dist output
npm run build

# Start local website + morphology pipeline service
npm run dev
```

Direct Python entrypoint (same build logic used by `npm run build`):

```bash
python build/build_pipeline.py --production
```

## Directory overview

- Build internals now live in `build/` (`build/README.md`).
- `gnc/` - Georgian National Corpus utilities for verb workflows.
- `morphology/` - ENA/NPLG/GNC morphology candidate pipeline + local API service.
- `scraper/` - external data scraping tools.
- `dev/` - local development helper scripts.

## Practical workflows

### Rebuild the website

```bash
npm run build
```

Use this when you changed source code/data and want fresh `dist/`.

### Run site locally without rebuilding

```bash
npm run dev
```

Use this when you want to interact with the already-built site and morphology tools quickly.

### Run morphology candidate pipeline manually

```bash
python tools/morphology/run_ena_morphology_pipeline.py --headword-mode contains შეცვლ
```

See `tools/morphology/ENA_PIPELINE_USAGE.md` for full options.

## Working-data locations

Pipeline-generated working data is intentionally separate from tool scripts:

- Morphology working outputs: `apps/morphology-chart/data/work/`
- GNC working outputs: `apps/bagh/data/gnc/work/`

These working directories are ignored and are not intended for deployment.
