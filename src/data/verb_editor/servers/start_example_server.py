#!/usr/bin/env python3
"""
Startup script for the Example Generator Server

This script helps users start the example generator server for the verb editor.
"""

import subprocess
import sys
import os
from pathlib import Path


def main():
    print("🚀 Starting Example Generator Server...")
    print("=" * 50)

    # Get the server directory
    server_dir = Path(__file__).parent
    server_path = server_dir / "example_generator_server.py"

    if not server_path.exists():
        print(f"❌ Error: Server file not found at {server_path}")
        print("Please ensure you're running this from the project root directory.")
        sys.exit(1)

    print(f"📁 Server location: {server_path}")
    print("🌐 Server will be available at: http://localhost:5000")
    print("📋 Available endpoints:")
    print("   GET  /health - Health check")
    print("   POST /generate_examples - Generate examples")
    print("   GET  /test - Test with sample data")
    print("=" * 50)
    print("Press Ctrl+C to stop the server")
    print("=" * 50)

    try:
        # Start the server
        subprocess.run([sys.executable, str(server_path)], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)
    except FileNotFoundError:
        print("❌ Error: Python executable not found")
        print("Please ensure Python is installed and in your PATH")
        sys.exit(1)


if __name__ == "__main__":
    main()
