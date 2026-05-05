# Build Pipeline Guide

`build/` contains the production build system for `verb-website`.

## Entrypoint

From repo root:

```bash
python build/build_pipeline.py --production
```

Equivalent npm command:

```bash
npm run build
```

## What this pipeline does

1. Loads and processes verb/source data.
2. Generates main site output.
3. Splits per-verb JSON payloads for runtime loading.
4. Copies/syncs static assets.
5. Builds and syncs app artifacts for:
   - `apps/bagh`
   - `apps/morphology-chart`
   - `apps/preverb-cube`

## Package layout

- `build/build_pipeline.py` - orchestration entrypoint.
- `build/data_extraction/` - source data loading.
- `build/data_processing/` - transformation and generation logic.
- `build/output_generation/` - HTML/assets/data output assembly.
- `build/utils/` - shared config/logging/path helpers.

## Declarative dist assembly

`build/build_pipeline.py` defines two top-level structures:

- `APP_DIRS` - canonical source roots for each app.
- `DIST_ASSEMBLY_RULES` - file/dir sync rules used when assembling `dist/`.

When changing where app artifacts come from or where they are copied in `dist/`,
update those structures first.

## Build modes

- `--production` - full dataset build (default workflow).
- `--reference` - reduced dataset mode for quick reference builds.

## Notes

- `dist/` is build output, not source-of-truth input.
- Morphology work artifacts are intentionally excluded from deployable `dist` output.
