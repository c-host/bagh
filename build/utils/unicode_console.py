"""
Unicode Console Utility - Handles Unicode encoding issues in Windows console
"""

import sys
import os
import codecs
from typing import Optional


def setup_unicode_console():
    """
    Set up the console to handle Unicode properly, especially for Georgian text.

    This function:
    1. Sets the console output encoding to UTF-8
    2. Configures stdout/stderr to handle Unicode
    3. Sets environment variables for proper encoding
    """
    try:
        # Set environment variables for proper encoding
        os.environ["PYTHONIOENCODING"] = "utf-8"

        # Force UTF-8 encoding for stdout and stderr
        if sys.platform == "win32":
            # Windows-specific handling
            try:
                # Try to set console code page to UTF-8
                os.system("chcp 65001 > nul 2>&1")
            except:
                pass

            # Reconfigure stdout and stderr with UTF-8 encoding
            if hasattr(sys.stdout, "reconfigure"):
                sys.stdout.reconfigure(encoding="utf-8", errors="replace")
            if hasattr(sys.stderr, "reconfigure"):
                sys.stderr.reconfigure(encoding="utf-8", errors="replace")

            # Alternative method for older Python versions
            if not hasattr(sys.stdout, "reconfigure"):
                sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
                sys.stderr = codecs.getwriter("utf-8")(sys.stderr.detach())

        return True

    except Exception as e:
        print(f"Warning: Could not set up Unicode console: {e}")
        return False


def force_utf8_environment():
    """
    Force UTF-8 encoding throughout the Python environment.
    This is a more aggressive approach to ensure Unicode compatibility.
    """
    # Set all possible encoding environment variables
    os.environ["PYTHONIOENCODING"] = "utf-8"
    os.environ["PYTHONUTF8"] = "1"

    # Force UTF-8 for all file operations
    if hasattr(sys, "setdefaultencoding"):
        sys.setdefaultencoding("utf-8")

    # Set locale if possible
    try:
        import locale

        locale.setlocale(locale.LC_ALL, "en_US.UTF-8")
    except:
        try:
            locale.setlocale(locale.LC_ALL, "C.UTF-8")
        except:
            pass


def configure_logging_unicode():
    """
    Configure logging to handle Unicode properly.
    Call this after setting up logging but before using loggers.
    """
    import logging

    # Get the root logger
    root_logger = logging.getLogger()

    # Configure all handlers to use UTF-8
    for handler in root_logger.handlers:
        if hasattr(handler, "setFormatter"):
            # Create a formatter that handles Unicode (no encoding parameter needed)
            formatter = logging.Formatter(
                "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
            )
            handler.setFormatter(formatter)

        # Try to set encoding on the handler if possible
        if hasattr(handler, "stream") and hasattr(handler.stream, "reconfigure"):
            try:
                handler.stream.reconfigure(encoding="utf-8", errors="replace")
            except:
                pass


def safe_log(logger, level: str, message: str, *args, **kwargs):
    """
    Safely log messages that may contain Unicode characters.

    Args:
        logger: Logger instance
        level: Log level ('info', 'error', 'warning', 'debug')
        message: Message to log
        *args: Additional arguments
        **kwargs: Additional keyword arguments
    """
    try:
        # Try normal logging first
        if level == "info":
            logger.info(message, *args, **kwargs)
        elif level == "error":
            logger.error(message, *args, **kwargs)
        elif level == "warning":
            logger.warning(message, *args, **kwargs)
        elif level == "debug":
            logger.debug(message, *args, **kwargs)
        else:
            logger.info(message, *args, **kwargs)
    except UnicodeEncodeError:
        try:
            # If that fails, encode and decode with error handling
            encoded = message.encode("utf-8", errors="replace")
            decoded = encoded.decode("utf-8", errors="replace")

            if level == "info":
                logger.info(decoded, *args, **kwargs)
            elif level == "error":
                logger.error(decoded, *args, **kwargs)
            elif level == "warning":
                logger.warning(decoded, *args, **kwargs)
            elif level == "debug":
                logger.debug(decoded, *args, **kwargs)
            else:
                logger.info(decoded, *args, **kwargs)
        except Exception:
            # Last resort: log ASCII-safe version
            safe_message = message.encode("ascii", errors="replace").decode("ascii")
            if level == "info":
                logger.info(safe_message, *args, **kwargs)
            elif level == "error":
                logger.error(safe_message, *args, **kwargs)
            elif level == "warning":
                logger.warning(safe_message, *args, **kwargs)
            elif level == "debug":
                logger.debug(safe_message, *args, **kwargs)
            else:
                logger.info(safe_message, *args, **kwargs)


def force_utf8_on_all_loggers():
    """
    Force UTF-8 encoding on all existing logging handlers.
    This is a simple approach that doesn't require complex interception.
    """
    import logging

    # Get all loggers
    loggers = [logging.getLogger()] + [
        logging.getLogger(name) for name in logging.root.manager.loggerDict
    ]

    for logger in loggers:
        for handler in logger.handlers:
            # Try to set UTF-8 encoding on the handler's stream
            if hasattr(handler, "stream") and hasattr(handler.stream, "reconfigure"):
                try:
                    handler.stream.reconfigure(encoding="utf-8", errors="replace")
                except:
                    pass

            # Also try to set encoding on the handler itself if it has that attribute
            if hasattr(handler, "setStream"):
                try:
                    # Create a new stream with UTF-8 encoding
                    import sys

                    if handler.stream == sys.stdout:
                        import codecs

                        new_stream = codecs.getwriter("utf-8")(sys.stdout.detach())
                        handler.setStream(new_stream)
                except:
                    pass
