"""
File writer module for verb-website build process.
Handles writing HTML content to output files and managing file operations.

This module:
1. Writes HTML content to index.html in dist directory
2. Manages file encoding and error handling
3. Provides validation of written files
4. Handles directory creation and file permissions
"""

import logging
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)


class FileWriter:
    """Handles writing HTML content and other files to the dist directory."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.dist_dir = project_root / "dist"
        self.output_file = self.dist_dir / "index.html"

    def write_html_file(self, html_content: str) -> bool:
        """
        Write HTML content to the output file.
        
        Args:
            html_content: The HTML content to write
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            logger.info("📝 Writing HTML file...")
            
            # Ensure dist directory exists
            self.dist_dir.mkdir(exist_ok=True)
            
            # Write HTML content to file
            with open(self.output_file, "w", encoding="utf-8") as f:
                f.write(html_content)
            
            logger.info(f"✅ HTML file written successfully: {self.output_file}")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error writing HTML file: {e}")
            return False

    def validate_output_file(self) -> bool:
        """
        Validate that the output file was created successfully.
        
        Returns:
            bool: True if file exists and is readable, False otherwise
        """
        try:
            if not self.output_file.exists():
                logger.error(f"❌ Output file not found: {self.output_file}")
                return False
            
            # Check if file is readable and has content
            with open(self.output_file, "r", encoding="utf-8") as f:
                content = f.read()
                
            if not content.strip():
                logger.warning("⚠️ Output file is empty")
                return False
                
            file_size = self.output_file.stat().st_size
            logger.info(f"✅ Output file validated: {file_size} bytes")
            return True
            
        except Exception as e:
            logger.error(f"❌ Error validating output file: {e}")
            return False

    def get_output_path(self) -> Path:
        """
        Get the path to the output HTML file.
        
        Returns:
            Path: Path to the output file
        """
        return self.output_file

    def get_file_info(self) -> dict:
        """
        Get information about the output file.
        
        Returns:
            dict: Dictionary containing file information
        """
        info = {
            "path": str(self.output_file),
            "exists": self.output_file.exists(),
            "size": 0,
            "readable": False
        }
        
        if self.output_file.exists():
            try:
                info["size"] = self.output_file.stat().st_size
                info["readable"] = self.output_file.is_file()
            except Exception:
                pass
                
        return info

    def cleanup_output_file(self) -> bool:
        """
        Remove the output file if it exists.
        
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            if self.output_file.exists():
                self.output_file.unlink()
                logger.info("🗑️ Output file cleaned up")
                return True
            else:
                logger.info("ℹ️ No output file to clean up")
                return True
                
        except Exception as e:
            logger.error(f"❌ Error cleaning up output file: {e}")
            return False

    def write_file_with_backup(self, content: str, backup_suffix: str = ".backup") -> bool:
        """
        Write content to file with automatic backup of existing file.
        
        Args:
            content: Content to write
            backup_suffix: Suffix for backup file
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            backup_file = self.output_file.with_suffix(backup_suffix)
            
            # Create backup if file exists
            if self.output_file.exists():
                import shutil
                shutil.copy2(self.output_file, backup_file)
                logger.info(f"📋 Backup created: {backup_file}")
            
            # Write new content
            success = self.write_html_file(content)
            
            if success:
                logger.info("✅ File written with backup")
            else:
                # Restore backup if write failed
                if backup_file.exists():
                    import shutil
                    shutil.copy2(backup_file, self.output_file)
                    logger.info("🔄 Backup restored after failed write")
                    
            return success
            
        except Exception as e:
            logger.error(f"❌ Error in backup/write process: {e}")
            return False
