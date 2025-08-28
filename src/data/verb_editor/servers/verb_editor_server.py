#!/usr/bin/env python3
"""
Verb Editor Server
Simple Flask server to handle file I/O operations for the verb editor
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import sys
import time
from pathlib import Path
from typing import Dict, Any, List, Optional
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
# Use absolute paths from project root - calculate from current file location
current_file = Path(__file__).resolve()
project_root = (
    current_file.parent.parent.parent.parent.parent
)  # Go up 5 levels from servers/verb_editor_server.py
VERBS_FILE = project_root / "src" / "data" / "verbs.json"
BACKUP_DIR = project_root / "temp" / "backups" / "verbs_json"


class VerbEditorServer:
    def __init__(self):
        self.verbs_file = VERBS_FILE
        self.backup_dir = BACKUP_DIR
        self.verbs_data = {}
        self.load_verbs_data()

    def load_verbs_data(self):
        """Load verbs data from file"""
        try:
            if self.verbs_file.exists():
                with open(self.verbs_file, "r", encoding="utf-8") as f:
                    self.verbs_data = json.load(f)
                logger.info(
                    f"Loaded {len(self.verbs_data.get('verbs', {}))} verbs from {self.verbs_file}"
                )
            else:
                logger.warning(f"Verbs file not found: {self.verbs_file}")
                self.verbs_data = {"verbs": {}}
        except Exception as e:
            logger.error(f"Failed to load verbs data: {e}")
            self.verbs_data = {"verbs": {}}

    def save_verbs_data(self):
        """Save verbs data to file"""
        try:
            # Create backup
            self.create_backup()

            # Save to file
            with open(self.verbs_file, "w", encoding="utf-8") as f:
                json.dump(self.verbs_data, f, indent=4, ensure_ascii=False)

            logger.info(
                f"Saved {len(self.verbs_data.get('verbs', {}))} verbs to {self.verbs_file}"
            )
            return True
        except Exception as e:
            logger.error(f"Failed to save verbs data: {e}")
            return False

    def create_backup(self):
        """Create backup of current verbs file"""
        try:
            if not self.backup_dir.exists():
                self.backup_dir.mkdir(parents=True, exist_ok=True)

            if self.verbs_file.exists():
                import shutil
                from datetime import datetime

                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                backup_file = self.backup_dir / f"verbs_backup_{timestamp}.json"

                shutil.copy2(self.verbs_file, backup_file)
                logger.info(f"Created backup: {backup_file}")
        except Exception as e:
            logger.error(f"Failed to create backup: {e}")

    def get_next_verb_id(self) -> int:
        """Get next available verb ID"""
        if not self.verbs_data.get("verbs"):
            return 1

        max_id = 0
        for verb in self.verbs_data["verbs"].values():
            if verb.get("id", 0) > max_id:
                max_id = verb.get("id", 0)

        return max_id + 1

    def check_verb_exists(
        self, georgian: str, semantic_key: str = None
    ) -> Dict[str, Any]:
        """Check if verb already exists"""
        matches = []

        for verb_key, verb in self.verbs_data.get("verbs", {}).items():
            if georgian and verb.get("georgian") == georgian:
                matches.append(verb)
            elif semantic_key and verb.get("semantic_key") == semantic_key:
                matches.append(verb)

        return {"exists": len(matches) > 0, "matches": matches}

    def add_verb(self, verb_data: Dict[str, Any]) -> Dict[str, Any]:
        """Add new verb to database"""
        try:
            # Check if verb already exists
            exists_check = self.check_verb_exists(
                verb_data.get("georgian"), verb_data.get("semantic_key")
            )

            if exists_check["exists"]:
                return {
                    "success": False,
                    "error": "Verb already exists",
                    "matches": exists_check["matches"],
                }

            # Generate verb key (use Georgian text or semantic key)
            verb_key = verb_data.get(
                "georgian",
                verb_data.get("semantic_key", f"verb_new_{int(time.time())}"),
            )

            # Ensure ID is set
            if not verb_data.get("id"):
                verb_data["id"] = self.get_next_verb_id()

            # Add to database
            self.verbs_data["verbs"][verb_key] = verb_data

            # Save to file
            if self.save_verbs_data():
                return {
                    "success": True,
                    "verb": verb_data,
                    "message": f"Verb '{verb_key}' added successfully",
                }
            else:
                return {"success": False, "error": "Failed to save to file"}

        except Exception as e:
            logger.error(f"Failed to add verb: {e}")
            return {"success": False, "error": str(e)}

    def update_verb(self, verb_id: int, verb_data: Dict[str, Any]) -> Dict[str, Any]:
        """Update existing verb in database"""
        try:
            # Find verb by ID
            verb_key = None
            for key, verb in self.verbs_data.get("verbs", {}).items():
                if verb.get("id") == verb_id:
                    verb_key = key
                    break

            if not verb_key:
                return {"success": False, "error": f"Verb with ID {verb_id} not found"}

            # Update verb data
            self.verbs_data["verbs"][verb_key] = verb_data

            # Save to file
            if self.save_verbs_data():
                return {
                    "success": True,
                    "verb": verb_data,
                    "message": f"Verb '{verb_key}' updated successfully",
                }
            else:
                return {"success": False, "error": "Failed to save to file"}

        except Exception as e:
            logger.error(f"Failed to update verb: {e}")
            return {"success": False, "error": str(e)}

    def get_verb(self, identifier: str) -> Optional[Dict[str, Any]]:
        """Get verb by ID, semantic key, or Georgian text"""
        for verb in self.verbs_data.get("verbs", {}).values():
            if (
                verb.get("id") == identifier
                or verb.get("semantic_key") == identifier
                or verb.get("georgian") == identifier
            ):
                return verb
        return None

    def get_all_verbs(self) -> List[Dict[str, Any]]:
        """Get all verbs"""
        return list(self.verbs_data.get("verbs", {}).values())


# Initialize server
server = VerbEditorServer()


@app.route("/")
def index():
    """Serve the verb editor HTML"""
    return send_from_directory("../", "index.html")


@app.route("/api/verbs", methods=["GET"])
def get_verbs():
    """Get all verbs"""
    try:
        verbs = server.get_all_verbs()
        return jsonify({"success": True, "verbs": verbs, "count": len(verbs)})
    except Exception as e:
        logger.error(f"Failed to get verbs: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/verbs/<identifier>", methods=["GET"])
def get_verb(identifier):
    """Get verb by identifier"""
    try:
        verb = server.get_verb(identifier)
        if verb:
            return jsonify({"success": True, "verb": verb})
        else:
            return (
                jsonify({"success": False, "error": f"Verb '{identifier}' not found"}),
                404,
            )
    except Exception as e:
        logger.error(f"Failed to get verb: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/verbs", methods=["POST"])
def add_verb():
    """Add new verb"""
    try:
        verb_data = request.json
        if not verb_data:
            return jsonify({"success": False, "error": "No verb data provided"}), 400

        result = server.add_verb(verb_data)
        if result["success"]:
            return jsonify(result), 201
        else:
            return jsonify(result), 400

    except Exception as e:
        logger.error(f"Failed to add verb: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/verbs/<int:verb_id>", methods=["PUT"])
def update_verb(verb_id):
    """Update existing verb"""
    try:
        verb_data = request.json
        if not verb_data:
            return jsonify({"success": False, "error": "No verb data provided"}), 400

        result = server.update_verb(verb_id, verb_data)
        if result["success"]:
            return jsonify(result)
        else:
            return jsonify(result), 400

    except Exception as e:
        logger.error(f"Failed to update verb: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/verbs/check", methods=["POST"])
def check_verb_exists():
    """Check if verb exists"""
    try:
        data = request.json
        georgian = data.get("georgian")
        semantic_key = data.get("semantic_key")

        if not georgian and not semantic_key:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "Either georgian or semantic_key must be provided",
                    }
                ),
                400,
            )

        result = server.check_verb_exists(georgian, semantic_key)
        return jsonify({"success": True, **result})

    except Exception as e:
        logger.error(f"Failed to check verb existence: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


@app.route("/api/verbs/next-id", methods=["GET"])
def get_next_id():
    """Get next available verb ID"""
    try:
        next_id = server.get_next_verb_id()
        return jsonify({"success": True, "next_id": next_id})
    except Exception as e:
        logger.error(f"Failed to get next ID: {e}")
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Starting Verb Editor Server...")
    print(f"📁 Verbs file: {server.verbs_file}")
    print(f"💾 Backup directory: {server.backup_dir}")
    print("🌐 Server will be available at: http://localhost:5002")
    print("📚 API endpoints:")
    print("  GET  /api/verbs - Get all verbs")
    print("  GET  /api/verbs/<id> - Get verb by ID")
    print("  POST /api/verbs - Add new verb")
    print("  PUT  /api/verbs/<id> - Update verb")
    print("  POST /api/verbs/check - Check if verb exists")
    print("  GET  /api/verbs/next-id - Get next available ID")
    print()

    app.run(debug=True, host="0.0.0.0", port=5002)
