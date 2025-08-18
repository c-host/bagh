"""
Utilities package for Georgian verb tools.

This package provides shared utilities used across multiple tools
to eliminate code duplication and provide consistent behavior.
"""

from .database_loader import DatabaseLoader, load_all_databases, get_database
from .common_utils import (
    create_deterministic_hash,
    get_primary_verb,
    safe_anchor_id,
    validate_required_fields,
    format_georgian_text,
    escape_html,
    validate_file_path,
    merge_dictionaries,
    get_nested_value,
    set_nested_value,
    format_error_message,
    log_function_call,
)

__all__ = [
    # Database loader
    "DatabaseLoader",
    "load_all_databases", 
    "get_database",
    
    # Common utilities
    "create_deterministic_hash",
    "get_primary_verb",
    "safe_anchor_id",
    "validate_required_fields",
    "format_georgian_text",
    "escape_html",
    "validate_file_path",
    "merge_dictionaries",
    "get_nested_value",
    "set_nested_value",
    "format_error_message",
    "log_function_call",
]
