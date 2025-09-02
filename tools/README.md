# Tools Directory Organization

This directory contains all build tools for Bagh, organized by build pipeline stages.

## Directory Structure

```
tools/
├── README.md                                   # This file
├── build_pipeline.py                           # Main build pipeline entry point
├── data_extraction/                            # Stage 1: Data Extraction
│   ├── __init__.py
│   ├── verb_data_loader.py                     # Verb data loading and validation
│   └── database_loader.py                      # Database loading for reference data
├── data_processing/                            # Stage 2: Data Processing
│   ├── __init__.py
│   ├── verb_data_processor.py                  # Verb data processing and transformation
│   ├── gloss_processor.py                      # Gloss processing and analysis
│   ├── verb_conjugation.py                     # Verb conjugation calculations
│   ├── processed_data_manager.py               # Processed data management
│   └── example_generation/                     # Example generation sub-module
│       ├── __init__.py
│       ├── argument_processor.py               # Unified argument parsing and resolution
│       └── example_generator.py                # Pedagogical example generation
├── output_generation/                          # Stage 3: Output Generation
│   ├── __init__.py
│   ├── html_generator.py                       # HTML generation and formatting
│   ├── external_data_generator_pipeline.py     # External data generation pipeline
│   ├── html_index_file_writer.py               # HTML index file writing
│   └── asset_manager.py                        # Asset management and copying
├── utils/                                      # Shared utilities across all stages
│   ├── __init__.py
│   ├── config_manager.py                       # Configuration management
│   ├── common_utils.py                         # Common utility functions
│   ├── shared_gloss_utils.py                   # Shared gloss processing utilities
│   └── unicode_console.py                      # Unicode-safe console operations
├── gnc/                                        # GNC integration tools
│   ├── __init__.py
│   ├── gnc_integration.py                      # GNC data integration
│   └── gnc_parser_utility.py                   # GNC parsing utilities
└── scraper/                                    # Data scraping tools
    ├── __init__.py
    └── lingua_verb_scraper.py                  # Lingua verb data scraping
```

## Build Pipeline Stages

### Stage 1: Data Extraction (`data_extraction/`)
- **Purpose**: Extract raw data from various sources
- **Key Components**:
  - `VerbDataLoader`: Loads and validates Georgian verb data from JSON files
  - `DatabaseLoader`: Loads reference databases (subjects, direct objects, indirect objects, adjectives)
- **Usage**: First stage of the build pipeline, provides raw data for processing

### Stage 2: Data Processing (`data_processing/`)
- **Purpose**: Process raw data into structured formats
- **Key Components**:
  - `VerbDataProcessor`: Processes and transforms verb data
  - `RobustGlossProcessor`: Handles gloss processing and analysis
  - `VerbConjugation`: Manages verb conjugation calculations
  - `ProcessedDataManager`: Manages processed data throughout the pipeline
  - **Example Generation**:
    - `ArgumentProcessor`: Unified argument parsing and resolution (merged from argument_parser.py and argument_resolver.py)
    - `PedagogicalExampleGenerator`: Generates pedagogical examples with argument processing
- **Usage**: Core data transformation stage, prepares data for output generation

### Stage 3: Output Generation (`output_generation/`)
- **Purpose**: Generate final output files
- **Key Components**:
  - `HTMLGenerator`: Generates HTML pages with proper formatting
  - `ExternalDataGeneratorPipeline`: Creates individual verb JSON files for external data
  - `HTMLIndexFileWriter`: Writes HTML index files
  - `AssetManager`: Manages and copies assets (fonts, styles, scripts)
- **Usage**: Final stage of the build pipeline, produces the website and external data

### Utilities (`utils/`)
- **Purpose**: Shared functionality across all build pipeline stages
- **Key Components**:
  - `ConfigManager`: Centralized configuration management
  - `CommonUtils`: Common utility functions (hashing, ID generation, etc.)
  - `SharedGlossUtils`: Shared gloss processing foundation classes
  - `UnicodeConsole`: Unicode-safe console operations and logging
- **Usage**: Imported by modules across all stages

## Key Features

### Unified Argument Processing
- **`ArgumentProcessor`**: Combines argument parsing and resolution functionality
- **Lazy Database Loading**: Databases are loaded only when needed
- **Multi-Database Search**: Searches across subjects, direct objects, and indirect objects databases
- **Proper Case Handling**: Supports both singular and plural case forms

### Build Pipeline Integration
- **Staged Processing**: Clear separation of concerns across three main stages
- **Modular Design**: Each stage can be developed and tested independently
- **Shared Utilities**: Common functionality centralized in utils package
- **Configuration Management**: Centralized configuration for all build parameters

### Database Integration
- **Four Main Databases**: subjects, direct objects, indirect objects, adjectives
- **Structured Data**: Each database contains case forms, English translations, and metadata
- **Validation**: Built-in validation and error handling for database operations

## Usage

### Running the Build Pipeline
```bash
# From the project root
python tools/build_pipeline.py [options]

# Available options
python tools/build_pipeline.py --help
```
