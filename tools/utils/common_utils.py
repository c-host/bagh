"""
Common utility functions for Georgian verb tools.

This module provides shared utility functions used across multiple tools
to eliminate code duplication and provide consistent behavior.
"""

import hashlib
import logging
import re
from pathlib import Path
from typing import Dict, List, Optional, Any

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


def safe_anchor_id(text: str, max_length: int = 50) -> str:
    """
    Create a safe anchor ID from text.
    
    Args:
        text: Text to convert to anchor ID
        max_length: Maximum length of the anchor ID
        
    Returns:
        Safe anchor ID string
    """
    # Remove special characters and replace spaces with hyphens
    safe_text = re.sub(r'[^a-zA-Z0-9\s-]', '', text)
    safe_text = re.sub(r'\s+', '-', safe_text.strip())
    
    # Convert to lowercase
    safe_text = safe_text.lower()
    
    # Truncate if too long
    if len(safe_text) > max_length:
        safe_text = safe_text[:max_length].rstrip('-')
    
    return safe_text


def validate_required_fields(data: Dict, required_fields: List[str], context: str = "") -> List[str]:
    """
    Validate that required fields are present in data.
    
    Args:
        data: Dictionary to validate
        required_fields: List of required field names
        context: Context string for error messages
        
    Returns:
        List of missing field names
    """
    missing_fields = []
    for field in required_fields:
        if field not in data or not data[field]:
            missing_fields.append(field)
    
    if missing_fields and context:
        logger.warning(f"Missing required fields in {context}: {missing_fields}")
    
    return missing_fields


def format_georgian_text(text: str) -> str:
    """
    Format Georgian text for display.
    
    Args:
        text: Raw Georgian text
        
    Returns:
        Formatted Georgian text
    """
    if not text:
        return ""
    
    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text.strip())
    
    return text


def escape_html(text: str) -> str:
    """
    Escape HTML special characters.
    
    Args:
        text: Text to escape
        
    Returns:
        HTML-escaped text
    """
    html_escapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }
    
    for char, escape in html_escapes.items():
        text = text.replace(char, escape)
    
    return text


def validate_file_path(file_path: Path, required: bool = True) -> bool:
    """
    Validate that a file path exists and is readable.
    
    Args:
        file_path: Path to validate
        required: Whether the file is required to exist
        
    Returns:
        True if valid, False otherwise
    """
    if not file_path.exists():
        if required:
            logger.error(f"Required file not found: {file_path}")
            return False
        else:
            logger.warning(f"Optional file not found: {file_path}")
            return True
    
    if not file_path.is_file():
        logger.error(f"Path is not a file: {file_path}")
        return False
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            f.read(1)  # Try to read one character
        return True
    except Exception as e:
        logger.error(f"Cannot read file {file_path}: {e}")
        return False


def merge_dictionaries(dict1: Dict, dict2: Dict, overwrite: bool = False) -> Dict:
    """
    Merge two dictionaries, with optional overwrite behavior.
    
    Args:
        dict1: First dictionary
        dict2: Second dictionary
        overwrite: Whether to overwrite existing keys in dict1
        
    Returns:
        Merged dictionary
    """
    result = dict1.copy()
    
    for key, value in dict2.items():
        if key not in result or overwrite:
            result[key] = value
        elif isinstance(result[key], dict) and isinstance(value, dict):
            # Recursively merge nested dictionaries
            result[key] = merge_dictionaries(result[key], value, overwrite)
    
    return result


def get_nested_value(data: Dict, path: List[str], default: Any = None) -> Any:
    """
    Get a nested value from a dictionary using a path.
    
    Args:
        data: Dictionary to search
        path: List of keys to traverse
        default: Default value if path not found
        
    Returns:
        Value at path or default
    """
    current = data
    
    for key in path:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return default
    
    return current


def set_nested_value(data: Dict, path: List[str], value: Any) -> bool:
    """
    Set a nested value in a dictionary using a path.
    
    Args:
        data: Dictionary to modify
        path: List of keys to traverse
        value: Value to set
        
    Returns:
        True if successful, False otherwise
    """
    if not path:
        return False
    
    current = data
    
    # Navigate to the parent of the target
    for key in path[:-1]:
        if key not in current:
            current[key] = {}
        elif not isinstance(current[key], dict):
            return False
        current = current[key]
    
    # Set the final value
    current[path[-1]] = value
    return True


def format_error_message(error: Exception, context: str = "") -> str:
    """
    Format an error message with context.
    
    Args:
        error: Exception to format
        context: Additional context
        
    Returns:
        Formatted error message
    """
    error_msg = str(error)
    
    if context:
        error_msg = f"{context}: {error_msg}"
    
    return error_msg


def log_function_call(func_name: str, args: Dict[str, Any] = None, level: str = "DEBUG"):
    """
    Log a function call for debugging.
    
    Args:
        func_name: Name of the function
        args: Function arguments
        level: Log level
    """
    if args is None:
        args = {}
    
    log_message = f"Calling {func_name}"
    if args:
        # Filter out sensitive or large arguments
        safe_args = {}
        for key, value in args.items():
            if isinstance(value, str) and len(value) > 100:
                safe_args[key] = f"{value[:50]}...{value[-50:]}"
            elif isinstance(value, (dict, list)) and len(str(value)) > 100:
                safe_args[key] = f"{type(value).__name__}[{len(value)}]"
            else:
                safe_args[key] = value
        log_message += f" with args: {safe_args}"
    
    if level.upper() == "DEBUG":
        logger.debug(log_message)
    elif level.upper() == "INFO":
        logger.info(log_message)
    elif level.upper() == "WARNING":
        logger.warning(log_message)
    elif level.upper() == "ERROR":
        logger.error(log_message)
