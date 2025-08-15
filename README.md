# Georgian Verb Website

A comprehensive Georgian verb conjugation website with interactive tables, pedagogical examples, and detailed grammatical analysis.

> **⚠️ Work in Progress:** This website is a personal study resource and under active development. While functional, it may contain some inconsistencies and incomplete features. Please do not treat this as a definitive source for Georgian verb conjugations.

## 🌐 View the Website

The website is automatically deployed to GitHub Pages and available at:
`https://github.io/c-host/bagh`

## ✨ Features

### Core Functionality
- **Interactive Verb Tables**: Complete conjugation tables for all Georgian verb tenses
- **Preverb Selector**: Dynamic preverb switching with automatic table updates
- **Pedagogical Examples**: Contextual examples with case marking and English translations
- **Gloss Analysis**: Detailed grammatical analysis with case specifications
- **3rd Person Plural Examples**: Complete coverage including subject inclusion

### Grammar & Structure
- **SOV → SVO Mapping**: Automatic conversion from Georgian to English word order
- **Optative Forms**: Proper "უნდა" (should) integration for optative verbs
- **Word Order System**: Rule-based sentence construction with proper component ordering
- **Definite Articles**: Automatic "the" insertion in English translations
- **Subject Exclusion Logic**: Contextual subject inclusion based on person

### Developer Experience
- **Override System**: Fine-grained control over example generation
- **Comprehensive Validation**: Data integrity checks during build process
- **Consolidated Tools**: Streamlined development workflow
- **Deterministic Selection**: Consistent example generation across builds

## 🏗️ Project Structure

```
verb-website/
├── src/
│   ├── data/                    # Verb and linguistic data
│   │   ├── verbs.json          # Main verb database
│   │   ├── subject_database.json
│   │   ├── direct_object_database.json
│   │   ├── indirect_object_database.json
│   │   ├── adjective_database.json
│   │   └── gloss_reference.json
│   ├── scripts/
│   │   └── main.js             # Frontend JavaScript
│   └── styles/
│       └── main.css            # Styling
├── tools/                       # Build and processing tools
│   ├── build.py                # Main build orchestrator
│   ├── example_generator.py    # Consolidated example generation
│   ├── gloss_parser.py         # Gloss parsing and analysis
│   ├── noun_adjective_selection_engine.py
│   └── verb_form_generator.py
├── dist/                        # Generated website (after build)
└── temp/notes/                 # Development documentation
```

## 📝 Editing Verb Data

### Basic Verb Editing

To modify the verb data:

1. **Edit the data file**: `src/data/verbs.json`
2. **Build the changes**: 
   ```bash
   cd tools
   python build.py
   ```
3. **View locally**: Open `dist/index.html` in your browser

### Advanced: Developer Overrides

For fine-grained control over example generation, you can add override fields to verbs:

```json
{
  "id": 1,
  "georgian": "მოტანა",
  "english": "motana",
  "overrides": {
    "subject": {
      "nom": "მასწავლებელი კარგი",
      "dat": "მასწავლებელს კარგს"
    },
    "direct_object": {
      "nom": "წიგნი საინტერესო",
      "dat": "წიგნს საინტერესოს"
    }
  }
}
```

See [DEVELOPER_OVERRIDES.md](DEVELOPER_OVERRIDES.md) for detailed documentation.

## 🔧 Development Workflow

### Prerequisites
- Python 3.7+
- Basic understanding of Georgian grammar

### Building the Website

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd verb-website
   ```

2. **Run the build process**:
   ```bash
   cd tools
   python build.py
   ```

3. **View the results**:
   - Open `dist/index.html` in your browser
   - Check the console for any validation warnings

### Validation System

The build process includes comprehensive validation:
- **Verb Data Structure**: Ensures all required fields are present
- **Database Files**: Validates JSON integrity and structure
- **Example Generation**: Checks for missing semantic mappings
- **Override System**: Validates override field structure

### Adding New Verbs

1. **Add verb data** to `src/data/verbs.json`:
   ```json
   {
     "id": 999,
     "georgian": "წერა",
     "english": "tsera",
     "description": "To Write",
     "category": "Communication",
     "class": "Class-I",
     "conjugations": {
       "present": {
         "forms": {
           "1sg": "ვწერ",
           "2sg": "წერ",
           "3sg": "წერს"
         },
         "gloss": {
           "raw_gloss": "V Act Pres <S-DO> <S:Nom> <DO:Dat>"
         }
       }
     }
   }
   ```

2. **Add semantic mappings** to the appropriate database files
3. **Run validation** to ensure data integrity
4. **Test example generation** for the new verb

## 📚 Documentation

- **[DEVELOPER_OVERRIDES.md](DEVELOPER_OVERRIDES.md)**: Complete guide to the override system
- **[FONTS.md](FONTS.md)**: Information about custom Georgian fonts
- **[temp/notes/](temp/notes/)**: Development documentation and work plans

## 🎨 Fonts

This project uses several custom fonts for Georgian text display. See [FONTS.md](FONTS.md) for more information.

## 🔍 Technical Details

### Example Generation System

The website uses a sophisticated example generation system:

1. **Noun-Adjective Selection**: Deterministic selection based on verb semantics
2. **Case Marking**: Automatic case form selection based on grammatical context
3. **Word Order**: Rule-based sentence construction following Georgian grammar
4. **Translation**: SOV → SVO conversion with proper English grammar

### Override System

The override system provides developers with precise control:
- **Case-Specific Overrides**: Different words for different grammatical cases
- **Default Overrides**: General overrides that apply to all cases
- **Priority System**: Overrides take precedence over semantic mapping
- **Graceful Fallback**: Falls back to semantic mapping when overrides are not found

### Validation System

Comprehensive validation ensures data quality:
- **Structure Validation**: Checks for required fields and proper JSON structure
- **Semantic Validation**: Ensures semantic mappings are complete and consistent
- **Database Validation**: Verifies all database files exist and are valid
- **Example Validation**: Checks that example generation works for all verbs

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-verb`
3. **Make your changes**: Add verbs, fix bugs, or improve documentation
4. **Run validation**: Ensure the build process completes without errors
5. **Submit a pull request**: Include a description of your changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- Some verbs may have incomplete semantic mappings
- Example generation may not work for all verb types
- Preverb selector may not work correctly for all multi-preverb verbs

## 🔮 Future Plans

- [ ] Add more verb types and tenses
- [ ] Implement user feedback system
- [ ] Add automated testing
- [ ] Improve performance optimization
- [ ] Add more pedagogical features