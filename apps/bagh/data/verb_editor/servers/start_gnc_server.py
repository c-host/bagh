#!/usr/bin/env python3
"""
Start GNC Proxy Server

This script starts the GNC proxy server for the verb editor.
"""

import sys
import os
from pathlib import Path

# Add the current directory to the path
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))


def main():
    """Start the GNC proxy server"""
    try:
        from gnc_proxy_server import app

        print("[STARTING] GNC Proxy Server...")
        print("[INFO] Server will be available at: http://localhost:5001")
        print("[INFO] GNC API endpoint: http://gnc.gov.ge/gnc/parse-api")
        print("[INFO] Available endpoints:")
        print("   POST /api/gnc/analyze - Analyze verb form")
        print("   GET  /api/gnc/health - Health check")
        print("   GET  /api/gnc/cache/stats - Cache statistics")
        print("   POST /api/gnc/cache/clear - Clear cache")
        print("=" * 60)

        app.run(host="127.0.0.1", port=5001, debug=True)

    except ImportError as e:
        print(f"[ERROR] Error importing GNC server: {e}")
        print("Please ensure all dependencies are installed:")
        print("pip install flask flask-cors requests")
        return 1
    except Exception as e:
        print(f"[ERROR] Error starting GNC server: {e}")
        return 1


if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)
