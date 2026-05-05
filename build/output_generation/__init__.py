"""
Output Generation Stage

This package contains modules for generating final output:
- External data generation (individual verb JSON files)
- HTML generation and formatting
- HTML file writing and management
- Asset management and copying
"""

from .split_processed_verbs import VerbDataSplitter
from .html_generator import HTMLGenerator
from .html_index_file_writer import HTMLIndexFileWriter
from .asset_manager import AssetManager

__all__ = [
    "VerbDataSplitter",
    "HTMLGenerator",
    "HTMLIndexFileWriter",
    "AssetManager",
]
