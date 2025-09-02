"""
Build pipeline tools for verb-website.
Organized by build pipeline stages for clarity.
"""

# Import main entry point only to avoid circular imports
from .build_pipeline import main

__all__ = ["main"]
