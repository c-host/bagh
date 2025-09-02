"""
Utilities Package

This package contains shared utilities used across all build pipeline stages:
- Configuration management
- Common utility functions
- Shared gloss processing utilities
- Unicode-safe console operations
"""

from .config_manager import ConfigManager
from .common_utils import (
    create_deterministic_hash,
    get_primary_verb,
    create_safe_anchor_id,
)
from .shared_gloss_utils import BaseGlossParser, GlossComponent, GlossData
from .unicode_console import (
    setup_unicode_console,
    force_utf8_environment,
    configure_logging_unicode,
    safe_log,
    force_utf8_on_all_loggers,
)

__all__ = [
    "ConfigManager",
    "create_deterministic_hash",
    "get_primary_verb",
    "create_safe_anchor_id",
    "BaseGlossParser",
    "GlossComponent",
    "GlossData",
    "setup_unicode_console",
    "force_utf8_environment",
    "configure_logging_unicode",
    "safe_log",
    "force_utf8_on_all_loggers",
]
