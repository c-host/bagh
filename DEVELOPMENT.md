# Development Guide

This guide is for day-to-day development in `verb-website`.

## When to use each command

### `npm run dev`

Use this for normal local interaction and testing.

It starts:
- a static web server on `http://127.0.0.1:8000`
- morphology pipeline service on `http://127.0.0.1:8765` (in background, no extra terminal window)
- your browser at `http://127.0.0.1:8000/dist/index.html`

This does **not** rebuild `dist/`.

When you stop `npm run dev` with Ctrl+C, the morphology service is stopped automatically. You may need to press Ctrl+C twice to return to a new command line.

Manual stop command (only needed if you started the service separately):

```bash
npm run dev:service:stop
```

### `npm run build`

Use this when source code or source data changes and you need fresh deployable output.

This runs the full production pipeline and updates `dist/`.

## Typical developer loops

### Frontend interaction loop

1. Run `npm run dev`.
2. Open and use the site locally.
3. If you change `apps/bagh/` code, run `npm run build` to regenerate `dist/`.
4. Refresh the browser.

### Morphology pipeline loop

1. Run `npm run dev` (service starts automatically).
2. Open `http://127.0.0.1:8000/apps/morphology-chart/index.html`.
3. Use the ENA/NPLG generation panel.
4. Working outputs are written under `apps/morphology-chart/data/work/`.

### Chart editing loop

1. Edit in `apps/morphology-chart/index.html`.
2. Export chart JSON.
3. Replace `apps/morphology-chart/data/charts.json`.
4. Run `npm run build`.
5. Verify in local `dist/` pages.

## Important paths

- App source: `apps/bagh/`
- Deploy output: `dist/`
- Morphology chart source data: `apps/morphology-chart/data/charts.json`
- Morphology working outputs: `apps/morphology-chart/data/work/`
- GNC working outputs: `apps/bagh/data/gnc/work/`

## Troubleshooting

### Port already in use

- Website server uses `8000`.
- Morphology service uses `8765`.

Stop conflicting process or run commands manually with a different port.

### Morphology UI says pipeline unavailable

- Confirm `npm run dev` is running.
- Check service health at `http://127.0.0.1:8765/api/morphology/pipeline/health`.
- If health fails, restart only the API service:

```bash
npm run dev:service:stop
npm run dev:service
```

### Changes not visible

- If you changed source files and not just `dist/`, run `npm run build` again.
