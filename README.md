# Bagh

Georgian verb conjugations with tables, examples, and case glosses.

> **⚠️ Work in Progress:** This website is a personal study resource and under semi-active development. It contains several mistakes, inconsistencies, and incomplete features. Please do not treat this as a definitive source for Georgian verb conjugations.

## 🌐 View the Website

The website is automatically deployed to GitHub Pages and available at:
https://c-host.github.io/bagh/dist/index.html

## 📝 Editing Verb Data

To modify the verb data:

1. **Edit the data file**: `src/data/verbs.json`
2. **Build the changes**: 
   ```bash
   cd tools
   python build.py
   ```
3. **View locally**: Open `dist/index.html` in your browser

The build script will generate the complete website from the JSON data and copy all assets to the `dist/` folder.

## 🎨 Fonts

This project uses several custom fonts for Georgian text display. See [FONTS.md](FONTS.md) for more information.
