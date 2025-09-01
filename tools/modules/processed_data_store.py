"""
Processed Data Store - Manages the processed verb data between pipeline stages.
"""

import json
import logging
from pathlib import Path
from typing import Dict, Optional
from tools.utils.unicode_console import safe_log

logger = logging.getLogger(__name__)


class ProcessedDataStore:
    """Manages processed verb data between pipeline stages."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.processed_data_dir = project_root / "dist" / "processed_data"
        self.processed_data_dir.mkdir(parents=True, exist_ok=True)
        self.processed_verbs_file = self.processed_data_dir / "processed_verbs.json"

    def store_processed_verbs(self, processed_verbs: Dict):
        """Store processed verbs to disk as human-readable JSON."""
        try:
            with open(self.processed_verbs_file, "w", encoding="utf-8") as f:
                json.dump(processed_verbs, f, ensure_ascii=False, indent=2)

            safe_log(logger, 'info',
                f"Stored {len(processed_verbs)} processed verbs to {self.processed_verbs_file}"
            )
        except Exception as e:
            safe_log(logger, 'error', f"Failed to store processed verbs: {e}")
            raise

    def load_processed_verbs(self) -> Dict:
        """Load processed verbs from disk."""
        if not self.processed_verbs_file.exists():
            safe_log(logger, 'warning', "No processed verbs file found")
            return {}

        try:
            with open(self.processed_verbs_file, "r", encoding="utf-8") as f:
                data = json.load(f)

            safe_log(logger, 'info',
                f"Loaded {len(data)} processed verbs from {self.processed_verbs_file}"
            )
            return data
        except Exception as e:
            safe_log(logger, 'error', f"Failed to load processed verbs: {e}")
            raise

    def get_verb_data(self, verb_id: str) -> Optional[Dict]:
        """Retrieve specific verb data."""
        processed_verbs = self.load_processed_verbs()
        return processed_verbs.get(verb_id)

    def clear_processed_data(self):
        """Clear all processed data (useful for testing)."""
        if self.processed_verbs_file.exists():
            self.processed_verbs_file.unlink()
            safe_log(logger, 'info', "Cleared processed verbs data")

    def get_processed_data_info(self) -> Dict:
        """Get information about the processed data."""
        if not self.processed_verbs_file.exists():
            return {"exists": False, "count": 0, "size": 0}

        try:
            size = self.processed_verbs_file.stat().st_size
            processed_verbs = self.load_processed_verbs()
            return {
                "exists": True,
                "count": len(processed_verbs),
                "size": size,
                "file_path": str(self.processed_verbs_file),
            }
        except Exception as e:
            return {"exists": True, "error": str(e)}
