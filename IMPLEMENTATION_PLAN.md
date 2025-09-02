# Build Pipeline Reorganization Implementation Plan

## Overview
This plan outlines the step-by-step process for:
1. Merging `argument_parser.py` and `argument_resolver.py` into a single `argument_processor.py`
2. Reorganizing the tools directory to reflect the build pipeline stages
3. Updating all import statements and references

## Current Structure
```
tools/
├── README.md
├── build_pipeline.py                   # Main orchestrator
├── core/                               # Core data processing modules
│   ├── __init__.py
│   ├── shared_gloss_utils.py
│   ├── gloss_processor.py
│   ├── argument_parser.py              # TO BE MERGED
│   ├── argument_resolver.py            # TO BE MERGED
│   ├── verb_conjugation.py
│   ├── example_generator.py
│   └── noun_adjective_engine.py        # DOESN'T EXIST
├── modules/                            # Build system modules
│   ├── __init__.py
│   ├── config_manager.py
│   ├── verb_data_loader.py
│   ├── html_generator_refactored.py    # TO BE RENAMED
│   ├── external_data_generator.py
│   ├── asset_manager.py
│   ├── html_index_file_writer.py
│   └── verb_data_processor.py          
├── utils/                              # Shared utilities
│   ├── __init__.py
│   ├── database_loader.py
│   └── common_utils.py
├── gnc/                                # GNC tools (keep as-is)
└── scraper/                            # Scraper tools (keep as-is)

```

## Target Structure
```
tools/
├── README.md                           # Build pipeline documentation
├── build_pipeline.py                   # Main orchestrator (entry point)
├── 01_data_extraction/                 # Stage 1: Extract raw data
│   ├── __init__.py
│   ├── verb_data_loader.py            # Load raw verb data from JSON
│   └── database_loader.py             # Load reference databases
├── 02_data_processing/                 # Stage 2: Process raw data
│   ├── __init__.py
│   ├── verb_data_processor.py         # Main processing orchestrator
│   ├── gloss_processor.py             # Processed verbs.json data structure for glosses
│   ├── verb_conjugation.py            # Conjugation calculations
│   └── example_generation/            # Example generation sub-module
│       ├── __init__.py
│       ├── example_generator.py
│       └── argument_processor.py      # MERGED MODULE (argument_parser and argument_processor)
├── 03_output_generation/              # Stage 3: Generate final output
│   ├── __init__.py
│   ├── external_data_generator.py     # Generate individual verb_n JSON data files
│   ├── html_generator.py              # Generate HTML content (RENAMED)
│   ├── html_index_file_writer.py      # Write HTML files
│   └── asset_manager.py               # Copy static assets
└── 00_utilities/                      # Shared utilities across stages
    ├── __init__.py
    ├── config_manager.py              # Configuration & paths
    ├── common_utils.py                # General utilities
    ├── shared_gloss_utils.py          # Used by argument_processor and gloss_processor
    └── unicode_console.py             # Unicode-safe logging
```

## Phase 1: Merge Argument Modules

### Step 1.1: Create Merged Argument Processor
**File**: `tools/core/argument_processor.py`
**Purpose**: Merge functionality from `argument_parser.py` and `argument_resolver.py`

**Implementation**:
1. Create new file `tools/core/argument_processor.py`
2. Combine classes: `StandardizedRawGlossParser` + `ArgumentResolver`
3. Merge database loading logic (load once, use everywhere)
4. Merge error handling classes
5. Create unified interface: `parse_and_resolve(raw_gloss, verb_data, person)`

**Key Changes**:
- Single `_load_databases()` method
- Combined error handling
- Unified `ArgumentProcessor` class
- Maintain backward compatibility with existing interfaces

### Step 1.2: Update Import Statements
**Files to Update**:
- `tools/core/example_generator.py`
- Any other files importing from argument modules

**Changes**:
```python
# Before
from tools.core.argument_parser import StandardizedRawGlossParser
from tools.core.argument_resolver import ArgumentResolver

# After
from tools.core.argument_processor import ArgumentProcessor
```

### Step 1.3: Test Merged Module
**Verification**:
1. Compile: `python -m py_compile tools/core/argument_processor.py`
2. Import test: `python -c "from tools.core.argument_processor import ArgumentProcessor"`
3. Run existing tests to ensure functionality preserved

### Step 1.4: Remove Old Modules
**Files to Delete**:
- `tools/core/argument_parser.py`
- `tools/core/argument_resolver.py`

## Phase 2: Directory Structure Reorganization

### Step 2.1: Create New Directory Structure
**Commands**:
```bash
mkdir -p tools/01_data_extraction
mkdir -p tools/02_data_processing
mkdir -p tools/02_data_processing/example_generation
mkdir -p tools/03_output_generation
mkdir -p tools/00_utilities
```

### Step 2.2: Move Files to New Locations

#### Stage 1: Data Extraction
**Move**:
- `tools/modules/verb_data_loader.py` → `tools/01_data_extraction/verb_data_loader.py`
- `tools/utils/database_loader.py` → `tools/01_data_extraction/database_loader.py`

#### Stage 2: Data Processing
**Move**:
- `tools/modules/verb_data_processor.py` → `tools/02_data_processing/verb_data_processor.py`
- `tools/core/gloss_processor.py` → `tools/02_data_processing/gloss_processor.py`
- `tools/core/verb_conjugation.py` → `tools/02_data_processing/verb_conjugation.py`
- `tools/core/example_generator.py` → `tools/02_data_processing/example_generation/example_generator.py`
- `tools/core/argument_processor.py` → `tools/02_data_processing/example_generation/argument_processor.py`

#### Stage 3: Output Generation
**Move**:
- `tools/modules/external_data_generator.py` → `tools/03_output_generation/external_data_generator.py`
- `tools/modules/html_generator_refactored.py` → `tools/03_output_generation/html_generator.py`
- `tools/modules/html_index_file_writer.py` → `tools/03_output_generation/html_index_file_writer.py`
- `tools/modules/asset_manager.py` → `tools/03_output_generation/asset_manager.py`

#### Stage 4: Utilities
**Move**:
- `tools/modules/config_manager.py` → `tools/00_utilities/config_manager.py`
- `tools/utils/common_utils.py` → `tools/00_utilities/common_utils.py`
- `tools/core/shared_gloss_utils.py` → `tools/00_utilities/shared_gloss_utils.py`
- `tools/utils/unicode_console.py` → `tools/00_utilities/unicode_console.py`

### Step 2.3: Remove Duplicate Files
**Files to Delete**:
- `tools/utils/` (empty directory)
- `tools/core/` (empty directory)
- `tools/modules/` (empty directory)

### Step 2.4: Create __init__.py Files
**Create**:
- `tools/01_data_extraction/__init__.py`
- `tools/02_data_processing/__init__.py`
- `tools/02_data_processing/example_generation/__init__.py`
- `tools/03_output_generation/__init__.py`
- `tools/00_utilities/__init__.py`

## Phase 3: Update Import Statements

### Step 3.1: Update build_pipeline.py
**File**: `tools/build_pipeline.py`
**Changes**:
```python
# Before
from tools.modules.verb_data_loader import VerbDataLoader
from tools.modules.config_manager import ConfigManager
from tools.modules.html_generator_refactored import HTMLGeneratorRefactored
from tools.modules.external_data_generator import ExternalDataGeneratorPipeline
from tools.modules.asset_manager import AssetManager
from tools.modules.html_index_file_writer import HTMLIndexFileWriter

# After
from tools.01_data_extraction.verb_data_loader import VerbDataLoader
from tools.00_utilities.config_manager import ConfigManager
from tools.03_output_generation.html_generator import HTMLGenerator
from tools.03_output_generation.external_data_generator import ExternalDataGeneratorPipeline
from tools.03_output_generation.asset_manager import AssetManager
from tools.03_output_generation.html_index_file_writer import HTMLIndexFileWriter
```

### Step 3.2: Update verb_data_processor.py
**File**: `tools/02_data_processing/verb_data_processor.py`
**Changes**:
```python
# Before
from tools.core.example_generator import generate_pedagogical_examples
from tools.core.gloss_processor import create_gloss_data_structure
from tools.core.verb_conjugation import calculate_preverb_forms

# After
from tools.02_data_processing.example_generation.example_generator import generate_pedagogical_examples
from tools.02_data_processing.gloss_processor import create_gloss_data_structure
from tools.02_data_processing.verb_conjugation import calculate_preverb_forms
```

### Step 3.3: Update example_generator.py
**File**: `tools/02_data_processing/example_generation/example_generator.py`
**Changes**:
```python
# Before
from tools.core.argument_parser import StandardizedRawGlossParser
from tools.core.argument_resolver import ArgumentResolver
from tools.core.verb_conjugation import get_conjugation_form
from tools.utils.unicode_console import safe_log

# After
from tools.02_data_processing.example_generation.argument_processor import ArgumentProcessor
from tools.02_data_processing.verb_conjugation import get_conjugation_form
from tools.00_utilities.unicode_console import safe_log
```

### Step 3.4: Update gloss_processor.py
**File**: `tools/02_data_processing/gloss_processor.py`
**Changes**:
```python
# Before
from .shared_gloss_utils import BaseGlossParser, GlossComponent, GlossData
from tools.modules.config_manager import ConfigManager

# After
from tools.00_utilities.shared_gloss_utils import BaseGlossParser, GlossComponent, GlossData
from tools.00_utilities.config_manager import ConfigManager
```

### Step 3.5: Update argument_processor.py
**File**: `tools/02_data_processing/example_generation/argument_processor.py`
**Changes**:
```python
# Before
from .shared_gloss_utils import BaseGlossParser
from tools.utils import DatabaseLoader

# After
from tools.00_utilities.shared_gloss_utils import BaseGlossParser
from tools.01_data_extraction.database_loader import DatabaseLoader
```

### Step 3.6: Update html_generator.py
**File**: `tools/03_output_generation/html_generator.py`
**Changes**:
```python
# Before
from tools.modules.verb_data_loader import VerbDataLoader
from tools.modules.config_manager import ConfigManager

# After
from tools.01_data_extraction.verb_data_loader import VerbDataLoader
from tools.00_utilities.config_manager import ConfigManager
```

### Step 3.7: Update external_data_generator.py
**File**: `tools/03_output_generation/external_data_generator.py`
**Changes**:
```python
# Before
from tools.modules.config_manager import ConfigManager

# After
from tools.00_utilities.config_manager import ConfigManager
```

### Step 3.8: Update asset_manager.py
**File**: `tools/03_output_generation/asset_manager.py`
**Changes**:
```python
# Before
from tools.modules.config_manager import ConfigManager

# After
from tools.00_utilities.config_manager import ConfigManager
```

### Step 3.9: Update html_index_file_writer.py
**File**: `tools/03_output_generation/html_index_file_writer.py`
**Changes**:
```python
# Before
from tools.modules.config_manager import ConfigManager

# After
from tools.00_utilities.config_manager import ConfigManager
```

## Phase 4: Update __init__.py Files

### Step 4.1: Update Main tools/__init__.py
**File**: `tools/__init__.py`
**Content**:
```python
"""
Build pipeline tools for verb-website.
Organized by build pipeline stages for clarity.
"""

# Import main entry point
from .build_pipeline import main

__all__ = ["main"]
```

### Step 4.2: Update Stage __init__.py Files
**Create appropriate imports for each stage** based on what modules need to be accessible.

## Phase 5: Testing and Verification

### Step 5.1: Compilation Tests
**Test each moved file**:
```bash
python -m py_compile tools/01_data_extraction/verb_data_loader.py
python -m py_compile tools/02_data_processing/verb_data_processor.py
python -m py_compile tools/03_output_generation/html_generator.py
# ... etc for all moved files
```

### Step 5.2: Import Tests
**Test key imports**:
```bash
python -c "from tools.01_data_extraction.verb_data_loader import VerbDataLoader"
python -c "from tools.00_utilities.config_manager import ConfigManager"
python -c "from tools.02_data_processing.example_generation.argument_processor import ArgumentProcessor"
```

### Step 5.3: Prompt user to test Build Pipeline
**Test the main build process**:
```bash
cd tools
python build_pipeline.py --help
```

## Phase 6: Documentation Updates

### Step 6.1: Update tools/README.md
**Reflect new structure** with clear stage descriptions.

### Step 6.2: Update Import Documentation
**Document new import paths** for developers.

## Risk Mitigation

### Backup Strategy
1. **Test each phase** before proceeding to next

### Rollback Plan
If issues arise:
1. **Revert to previous commit**: `git reset --hard HEAD~1`
2. **Restore original structure** from backup
3. **Debug issues** in isolation before retrying

## Success Criteria

1. **All files compile** without syntax errors
2. **All imports work** from new locations
3. **Build pipeline runs** successfully end-to-end
4. **No functionality lost** during reorganization
5. **Clear directory structure** reflects build pipeline stages

## Timeline Estimate

- **Phase 1** (Merge argument modules): 2-3 hours
- **Phase 2** (Directory reorganization): 1-2 hours
- **Phase 3** (Import updates): 2-3 hours
- **Phase 4** (__init__.py updates): 1 hour
- **Phase 5** (Testing): 2-3 hours
- **Phase 6** (Documentation): 1 hour

**Total**: 9-13 hours

## Next Steps

1. **Review this plan** for accuracy and completeness
2. **Begin with Phase 1** (merge argument modules)
3. **Test thoroughly** before proceeding to next phase
4. **Document any issues** encountered during implementation
