#!/usr/bin/env python3
"""
Start local dev environment in one Python process.

This avoids nested npm child-process signal handling so Ctrl+C exits cleanly.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
import webbrowser
from pathlib import Path

from local_static_server import serve


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run local dev environment.")
    parser.add_argument("--host", default="127.0.0.1", help="Static server host.")
    parser.add_argument("--port", type=int, default=8000, help="Static server port.")
    parser.add_argument(
        "--service-host", default="127.0.0.1", help="Morphology service host."
    )
    parser.add_argument(
        "--service-port", type=int, default=8765, help="Morphology service port."
    )
    parser.add_argument("--root", default=".", help="Directory to serve.")
    parser.add_argument(
        "--open-url",
        default="http://127.0.0.1:8000/dist/index.html",
        help="URL to open in browser.",
    )
    return parser.parse_args()


def start_service(repo_root: Path, host: str, port: int) -> None:
    service_script = repo_root / "tools" / "dev" / "morphology_service_background.py"
    cmd = [sys.executable, str(service_script), "start", "--host", host, "--port", str(port)]
    subprocess.run(cmd, check=False, cwd=repo_root)


def stop_service(repo_root: Path) -> None:
    service_script = repo_root / "tools" / "dev" / "morphology_service_background.py"
    cmd = [sys.executable, str(service_script), "stop"]
    subprocess.run(cmd, check=False, cwd=repo_root)


def main() -> None:
    args = parse_args()
    repo_root = Path(__file__).resolve().parents[2]
    root = (repo_root / args.root).resolve()
    start_service(repo_root, args.service_host, args.service_port)
    webbrowser.open(args.open_url)
    try:
        serve(args.host, args.port, root)
    finally:
        stop_service(repo_root)


if __name__ == "__main__":
    main()
