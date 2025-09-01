# Tools Directory Organization

This directory contains all build, processing, and maintenance tools for Bagh.

## Directory Structure

```
tools/
├── README.md                    # This file
├── build.py                     # Main build script (entry point)
├── modules/                     # Build system modules
│   ├── __init__.py
│   ├── config_manager.py        # Configuration management
│   ├── data_loader.py           # Data loading and validation
│   ├── html_generator.py        # HTML generation
│   ├── external_data_generator.py # External data file generation
│   ├── asset_manager.py         # Asset copying and management
│   └── file_writer.py           # File writing operations
├── core/                        # Core data processing modules
│   ├── __init__.py
│   ├── robust_gloss_processor.py # Gloss parsing and analysis (consolidated)
│   ├── verb_conjugation.py      # Verb conjugation management
│   ├── example_generator.py     # Pedagogical example generation
│   └── noun_adjective_engine.py # Noun/adjective selection
├── validation/                  # Validation modules
│   ├── __init__.py
│   └── database_validator.py    # Database structure validation
└── utils/                       # Shared utilities
    ├── __init__.py
    ├── database_loader.py       # Shared database loading logic
    └── common_utils.py          # Common helper functions
```

## Module Categories

### Build System (`modules/`)
- **Purpose**: Website generation and deployment
- **Usage**: Called by `build.py`

### Core Processing (`core/`)
- **Purpose**: Data processing and analysis
- **Usage**: Used by build system and validation tools

### Validation (`validation/`)
- **Purpose**: Data and structure validation
- **Usage**: Standalone validation tools

### Utilities (`utils/`)
- **Purpose**: Shared functionality across all modules
- **Usage**: Imported by other modules
