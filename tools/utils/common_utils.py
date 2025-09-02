"""
Common utility functions for Georgian verb tools.

This module provides shared utility functions used across multiple tools
to eliminate code duplication and provide consistent behavior.
"""

import hashlib
import logging
import re
from pathlib import Path
from typing import Optional, Dict

logger = logging.getLogger(__name__)


def create_deterministic_hash(text: str, salt: str = "") -> int:
    """
    Create a deterministic hash from text and optional salt.

    Args:
        text: Text to hash
        salt: Optional salt for additional randomness

    Returns:
        Integer hash value
    """
    combined = f"{text}_{salt}"
    return int(hashlib.md5(combined.encode()).hexdigest(), 16)


def get_primary_verb(georgian_text: str) -> str:
    """
    Extract the first verb form from Georgian text.

    Args:
        georgian_text: Georgian verb text

    Returns:
        Primary verb form
    """
    if not georgian_text or georgian_text == "N/A":
        return "unknown"
    return georgian_text.split(" / ")[0].strip()


def create_safe_anchor_id(
    georgian_text: str,
    semantic_key: str = "",
    verb_id: str = "",
    duplicate_primary_verbs: Optional[Dict] = None,
    data_loader=None,
) -> str:
    """
    Create a safe anchor ID with smart disambiguation.

    Args:
        georgian_text: Georgian verb text
        semantic_key: Semantic key for disambiguation
        verb_id: Verb ID for disambiguation
        duplicate_primary_verbs: Dictionary of duplicate primary verbs
        data_loader: DataLoader instance for getting primary verb

    Returns:
        Safe anchor ID string
    """
    if data_loader is None:
        # Fallback to utility function if no data_loader provided
        primary_verb = get_primary_verb(georgian_text)
    else:
        primary_verb = data_loader.get_primary_verb(georgian_text)

    # Basic validation - ensure it's not empty
    if not primary_verb or primary_verb == "unknown":
        return f"verb-{create_deterministic_hash(georgian_text) % 10000}"

    # Check if this primary verb has duplicates
    if duplicate_primary_verbs and primary_verb in duplicate_primary_verbs:
        # This is a duplicate, so disambiguation is needed
        if semantic_key:
            return f"{primary_verb}-{semantic_key}"
        elif verb_id:
            return f"{primary_verb}-{verb_id}"
        else:
            return f"{primary_verb}-{create_deterministic_hash(georgian_text) % 1000}"
    else:
        # This is unique, use clean URL
        return primary_verb
