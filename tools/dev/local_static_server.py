#!/usr/bin/env python3
"""
Small local static file server for development.

This wraps Python's http.server with explicit Ctrl+C handling so terminals
return cleanly to a prompt after stopping `npm run dev`.
"""

from __future__ import annotations

import argparse
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Run local static dev server.")
    parser.add_argument("--host", default="127.0.0.1", help="Bind host.")
    parser.add_argument("--port", type=int, default=8000, help="Bind port.")
    parser.add_argument(
        "--root",
        default=".",
        help="Directory to serve (defaults to current working directory).",
    )
    return parser.parse_args()


def serve(host: str, port: int, root: Path) -> None:
    os.chdir(root)
    server = ThreadingHTTPServer((host, port), SimpleHTTPRequestHandler)
    print(f"Static dev server running at http://{host}:{port} (root: {root})")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


def main() -> None:
    args = parse_args()
    serve(args.host, args.port, Path(args.root).resolve())


if __name__ == "__main__":
    main()
