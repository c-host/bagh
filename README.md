# Bagh: Georgian Verbs

🌱 A Georgian verb conjugation website with interactive tables, examples, and detailed grammatical analysis.

> **⚠️ Work in Progress:** This website is a personal study resource and under active development. While functional, it may contain some inconsistencies and incomplete features. Please do not treat this as a definitive source for Georgian verb conjugations.

## 🌐 View the Website

The website is automatically deployed to GitHub Pages and available at:
[https://c-host.github.io/bagh/dist/index.html](https://c-host.github.io/bagh/dist/index.html)

## 🧩 Components

This repository contains multiple integrated components:

- `morphology-chart/` — standalone morphology chart editor/viewer used in embedded read-only mode on verb pages.
- `preverb-cube/` — interactive 3D preverb diagram (standalone page + embedded verb-specific views).
- `src/` — main Bagh application source (tables, examples, glossary analysis, managers, styles).
- `tools/` — build/data pipeline that generates and syncs deployable `dist/` output.

Component-specific docs:

- `preverb-cube/README.md`
- `MORPHOLOGY_DEVELOPER_WORKFLOW.md`

## 🛠️ Build And Deploy

Build production output (including synced morphology/preverb artifacts) from this repo root:

```bash
python tools/build_pipeline.py --stage output-generation --production
```

This pipeline is the source of truth for deployment artifacts in `dist/`.

## 🎨 Fonts

This project uses several custom fonts for Georgian text display. See [FONTS.md](FONTS.md) for more information.

## 🐛 Known Issues

- Some verbs may have incomplete or incoherent semantic mappings