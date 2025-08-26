#!/usr/bin/env python3
"""
Combined Server Startup Script for Verb Editor

This script can start any combination of servers needed for the verb editor:
- Scraper Server (port 8000) - for importing verbs from external sources
- Example Generator Server (port 5000) - for generating pedagogical examples
- GNC Proxy Server (port 5001) - for GNC API integration and raw gloss generation

Usage:
    python start_all_servers.py                    # Start all servers
    python start_all_servers.py --scraper          # Start only scraper server
    python start_all_servers.py --example          # Start only example server
    python start_all_servers.py --gnc              # Start only GNC server
    python start_all_servers.py --help             # Show help
"""

import subprocess
import sys
import os
import argparse
import signal
import time
from pathlib import Path
from typing import List, Optional

# Global variables to track running processes
running_processes = []


def signal_handler(signum, frame):
    """Handle Ctrl+C to gracefully shut down all servers"""
    print("\n[SHUTDOWN] Shutting down all servers...")
    for process in running_processes:
        if process.poll() is None:  # Process is still running
            process.terminate()
            try:
                process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                process.kill()
    print("[SUCCESS] All servers stopped")
    sys.exit(0)


def check_port_available(port: int) -> bool:
    """Check if a port is available"""
    import socket

    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.bind(("localhost", port))
            return True
    except OSError:
        return False


def start_scraper_server() -> Optional[subprocess.Popen]:
    """Start the scraper server on port 8000"""
    if not check_port_available(8000):
        print(
            "[ERROR] Port 8000 is already in use. Scraper server may already be running."
        )
        return None

    print("[STARTING] Starting Scraper Server...")
    print("   Port: 8000")
    print("   Endpoints: /health, /status, /scrape")

    try:
        # Get the path to the scraper server script
        script_dir = Path(__file__).parent
        scraper_script = script_dir / "start_scraper_server.py"

        if not scraper_script.exists():
            print(f"❌ Error: Scraper server script not found at {scraper_script}")
            return None

        # Start the scraper server
        process = subprocess.Popen(
            [sys.executable, str(scraper_script)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )

        # Give it a moment to start
        time.sleep(1)

        if process.poll() is None:
            print("[SUCCESS] Scraper server started successfully")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"[ERROR] Failed to start scraper server:")
            print(f"   stdout: {stdout}")
            print(f"   stderr: {stderr}")
            return None

    except Exception as e:
        print(f"[ERROR] Error starting scraper server: {e}")
        return None


def start_example_server() -> Optional[subprocess.Popen]:
    """Start the example generator server on port 5000"""
    if not check_port_available(5000):
        print(
            "[ERROR] Port 5000 is already in use. Example server may already be running."
        )
        return None

    print("[STARTING] Starting Example Generator Server...")
    print("   Port: 5000")
    print("   Endpoints: /health, /generate_examples, /test")

    try:
        # Get the path to the example server script
        script_dir = Path(__file__).parent
        example_script = script_dir / "example_generator_server.py"

        if not example_script.exists():
            print(f"❌ Error: Example server script not found at {example_script}")
            return None

        # Start the example server - don't capture output to prevent blocking
        process = subprocess.Popen(
            [sys.executable, str(example_script)],
            # Don't capture stdout/stderr to prevent Flask from hanging
        )

        # Give it a moment to start
        time.sleep(1)

        if process.poll() is None:
            print("[SUCCESS] Example server started successfully")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"[ERROR] Failed to start example server:")
            print(f"   stdout: {stdout}")
            print(f"   stderr: {stderr}")
            return None

    except Exception as e:
        print(f"[ERROR] Error starting example server: {e}")
        return None


def start_gnc_server() -> Optional[subprocess.Popen]:
    """Start the GNC proxy server on port 5001"""
    if not check_port_available(5001):
        print("[ERROR] Port 5001 is already in use. GNC server may already be running.")
        return None

    print("[STARTING] Starting GNC Proxy Server...")
    print("   Port: 5001")
    print("   Endpoints: /api/gnc/health, /api/gnc/analyze, /api/gnc/cache/stats")

    try:
        # Get the path to the GNC server script
        script_dir = Path(__file__).parent
        gnc_script = script_dir / "start_gnc_server.py"

        if not gnc_script.exists():
            print(f"❌ Error: GNC server script not found at {gnc_script}")
            return None

        # Start the GNC server
        process = subprocess.Popen(
            [sys.executable, str(gnc_script)],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )

        # Give it a moment to start
        time.sleep(1)

        if process.poll() is None:
            print("[SUCCESS] GNC server started successfully")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"[ERROR] Failed to start GNC server:")
            print(f"   stdout: {stdout}")
            print(f"   stderr: {stderr}")
            return None

    except Exception as e:
        print(f"[ERROR] Error starting GNC server: {e}")
        return None


def main():
    parser = argparse.ArgumentParser(
        description="Start servers for the Verb Editor",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python start_all_servers.py              # Start all servers
  python start_all_servers.py --scraper    # Start only scraper server
  python start_all_servers.py --example    # Start only example server
  python start_all_servers.py --gnc        # Start only GNC server
  python start_all_servers.py --help       # Show this help message
        """,
    )

    parser.add_argument(
        "--scraper",
        action="store_true",
        help="Start only the scraper server (port 8000)",
    )

    parser.add_argument(
        "--example",
        action="store_true",
        help="Start only the example generator server (port 5000)",
    )

    parser.add_argument(
        "--gnc",
        action="store_true",
        help="Start only the GNC proxy server (port 5001)",
    )

    args = parser.parse_args()

    # Set up signal handler for graceful shutdown
    signal.signal(signal.SIGINT, signal_handler)

    print("[INFO] Verb Editor Server Manager")
    print("=" * 50)

    # Determine which servers to start
    start_scraper = args.scraper or (
        not args.scraper and not args.example and not args.gnc
    )
    start_example = args.example or (
        not args.scraper and not args.example and not args.gnc
    )
    start_gnc = args.gnc or (not args.scraper and not args.example and not args.gnc)

    if start_scraper and start_example and start_gnc:
        print("[INFO] Starting all three servers...")
    elif start_scraper and start_example:
        print("[INFO] Starting scraper and example servers...")
    elif start_scraper and start_gnc:
        print("[INFO] Starting scraper and GNC servers...")
    elif start_example and start_gnc:
        print("[INFO] Starting example and GNC servers...")
    elif start_scraper:
        print("[INFO] Starting scraper server only...")
    elif start_example:
        print("[INFO] Starting example server only...")
    elif start_gnc:
        print("[INFO] Starting GNC server only...")

    print("=" * 50)

    # Start servers
    if start_scraper:
        scraper_process = start_scraper_server()
        if scraper_process:
            running_processes.append(scraper_process)

    if start_example:
        example_process = start_example_server()
        if example_process:
            running_processes.append(example_process)

    if start_gnc:
        gnc_process = start_gnc_server()
        if gnc_process:
            running_processes.append(gnc_process)

    if not running_processes:
        print("[ERROR] No servers were started successfully")
        sys.exit(1)

    print("=" * 50)
    print("[SUCCESS] Servers are running!")
    print("[INFO] Available endpoints:")

    if start_scraper:
        print("   Scraper Server (port 8000):")
        print("     GET  http://localhost:8000/health")
        print("     GET  http://localhost:8000/status")
        print("     POST http://localhost:8000/scrape")

    if start_example:
        print("   Example Server (port 5000):")
        print("     GET  http://localhost:5000/health")
        print("     POST http://localhost:5000/generate_examples")
        print("     GET  http://localhost:5000/test")

    if start_gnc:
        print("   GNC Server (port 5001):")
        print("     GET  http://localhost:5001/api/gnc/health")
        print("     POST http://localhost:5001/api/gnc/analyze")
        print("     GET  http://localhost:5001/api/gnc/cache/stats")

    print("=" * 50)
    print("[INFO] Press Ctrl+C to stop all servers")
    print("=" * 50)

    # Keep the script running and monitor processes
    try:
        while running_processes:
            # Check if any processes have died
            for i, process in enumerate(running_processes[:]):
                if process.poll() is not None:
                    stdout, stderr = process.communicate()
                    print(f"[WARNING] Server process exited unexpectedly:")
                    if stdout.strip():
                        print(f"   stdout: {stdout.strip()}")
                    if stderr.strip():
                        print(f"   stderr: {stderr.strip()}")
                    running_processes.pop(i)

            if not running_processes:
                print("[ERROR] All servers have stopped")
                break

            time.sleep(1)

    except KeyboardInterrupt:
        signal_handler(signal.SIGINT, None)


if __name__ == "__main__":
    main()
