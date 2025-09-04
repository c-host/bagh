"""
Output Generation Stage

This package contains modules for generating final output:
- External data generation (individual verb JSON files)
- HTML generation and formatting
- HTML file writing and management
- Asset management and copying
"""

from .external_data_generator import ExternalDataGenerator
from .html_generator import HTMLGenerator
from .html_index_file_writer import HTMLIndexFileWriter
from .asset_manager import AssetManager

__all__ = [
    "ExternalDataGenerator",
    "HTMLGenerator",
    "HTMLIndexFileWriter",
    "AssetManager",
]
