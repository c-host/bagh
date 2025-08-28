#!/usr/bin/env python3
"""
Startup script for Verb Editor Server
Handles path resolution and server startup
"""

import os
import sys
from pathlib import Path

# Add the project root to the Python path
project_root = Path(
    __file__
).parent.parent.parent.parent.parent  # Go up 5 levels from servers/start_verb_editor_server.py
sys.path.insert(0, str(project_root))

# Don't change directory - stay in current location

# Import and run the server
from verb_editor_server import app, server

if __name__ == "__main__":
    print("🚀 Starting Verb Editor Server...")
    print(f"📁 Project root: {project_root}")
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
