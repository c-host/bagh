# ENA Morphology Pipeline Usage

Run scrape + records + summary + candidates + review queues in one command.

## Python entrypoint

`tools/morphology/run_ena_morphology_pipeline.py`

## Windows shortcut

`tools/morphology/run_ena_morphology_pipeline.cmd`

## Examples

From repo root:

```bash
python "websites/verb-website/tools/morphology/run_ena_morphology_pipeline.py" ძლ ძალ სძლ
```

Using CSV-style headwords:

```bash
python "websites/verb-website/tools/morphology/run_ena_morphology_pipeline.py" --headwords "ძლ,ძალ,სძლ"
```

Contains-mode search (`*headword*`):

```bash
python "websites/verb-website/tools/morphology/run_ena_morphology_pipeline.py" --headword-mode contains ძლ ძალ
```

GNC-enhanced quality mode (recommended for tighter review queues):

```bash
python "websites/verb-website/tools/morphology/run_ena_morphology_pipeline.py" \
  --headword-mode contains შეცვლ ცვლ ცვალ \
  --use-gnc \
  --drop-not-found-on-gnc \
  --review-require-gnc-deriv
```

In GNC mode, review queues include candidates found in GNC whose POS is one of:
`noun`, `verbal noun`, `adjective`, and participle types (`participle`, `past/future/present/negative participle`).

Using repeatable option:

```bash
python "websites/verb-website/tools/morphology/run_ena_morphology_pipeline.py" --headword ძლ --headword ძალ
```

Using the `.cmd` wrapper:

```bat
websites\verb-website\tools\morphology\run_ena_morphology_pipeline.cmd ძლ ძალ სძლ
```

## Common optional flags

- `--delay-ms 400` polite delay between pages
- `--max-pages-per-query 0` no page cap
- `--review-min-confidence 0.55`
- `--headword-mode contains` wraps each headword as `*headword*`
- `--use-gnc` enrich candidates with GNC lemma/features
- `--drop-not-found-on-gnc` removes candidates not recognized by GNC
- `--review-require-gnc-deriv` keeps only VN/Participle-like GNC tags in review queue
- `--use-nplg` enrich candidates with English glosses from NPLG (`d=46`) (enabled by default)
- `--drop-not-found-on-nplg` removes candidates with no NPLG match
- `--nplg-cache-json <path>` persistent cache for NPLG lookups (faster repeated runs)
- `--records-jsonl <path>`
- `--summary-json <path>`
- `--candidates-output-dir <path>`

NPLG enrichment writes a `nplg` object per candidate with:
- `found`
- `matchCount`
- `bestTerm`
- `enGloss`
- `enGlosses` (all extracted English definitions/senses)
- `labelTitles` (acronym/context labels such as `proper noun`, `Botany`, `archaic`)
- `searchUrl`
- `termUrl`

Notes:
- `enGloss` is the joined display string used by the review panel and candidate insertion.
- `enGlosses` + `labelTitles` preserve structured data so reviewers can disambiguate.
- Existing NPLG cache entries are lazily refreshed from `termUrl` when label metadata is missing.

## Optional local background service (for morphology chart UI)

Start:

```bat
websites\verb-website\tools\morphology\start_morphology_pipeline_service.cmd
```

Then use the **Generate From ENA/NPLG** panel in `apps/morphology-chart/index.html` to:
- run the pipeline in background
- monitor running/completed status
- pick generated review queue files and load them directly

**Ports:** The chart page (for example `http://localhost:8000/apps/morphology-chart/index.html`) only serves static files. The pipeline API is a **separate** process on **port 8765**. The UI calls `http://<same-hostname>:8765` by default; if checks fail, try `?pipelineApi=http://127.0.0.1:8765` on the chart URL.

**Workspace:** Scripts default to the **verb-website** root (the directory that contains `tools/` and `apps/`). If you use a monorepo layout with `websites/verb-website/`, pass that monorepo root as `--workspace-root` and it will be normalized to the inner `verb-website` folder automatically.

Default outputs:

- `apps/morphology-chart/data/work/raw/ena-explanatory-records.jsonl`
- `apps/morphology-chart/data/work/raw/ena-explanatory-summary.json`
- `apps/morphology-chart/data/work/candidates/*.json`

Candidate/review filenames are now based on your query headwords (for example `შეცვლ-candidates.json`, `ცვლ-review-queue.json`) instead of fixed `dzl/dzala` names.

By default, each run auto-tags outputs with mode + headwords + timestamp, so files are unique and not overwritten. Example:

- `apps/morphology-chart/data/work/raw/ena/ena-explanatory-records__contains__ძლ-ძალ__20260503-121500.jsonl`
- `apps/morphology-chart/data/work/raw/ena/ena-explanatory-summary__contains__ძლ-ძალ__20260503-121500.json`
- `apps/morphology-chart/data/work/candidates/contains__ძლ-ძალ__20260503-121500/`

Disable this behavior with:

```bash
python "websites/verb-website/tools/morphology/run_ena_morphology_pipeline.py" --no-auto-tag-outputs ...
```
