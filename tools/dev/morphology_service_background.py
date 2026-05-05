#!/usr/bin/env python3
"""
Start/stop helper for morphology pipeline service in background.
"""

from __future__ import annotations

import argparse
import os
import signal
import socket
import subprocess
import sys
from pathlib import Path


def project_root() -> Path:
    return Path(__file__).resolve().parents[2]


def pid_file_path() -> Path:
    return project_root() / ".cache" / "morphology-service.pid"


def is_port_open(host: str, port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.4)
        return sock.connect_ex((host, port)) == 0


def process_is_alive(pid: int) -> bool:
    if pid <= 0:
        return False
    if os.name == "nt":
        try:
            result = subprocess.run(
                ["tasklist", "/FI", f"PID eq {pid}", "/FO", "CSV", "/NH"],
                capture_output=True,
                text=True,
                check=False,
            )
            out = (result.stdout or "").strip()
            if not out or "No tasks are running" in out:
                return False
            return str(pid) in out
        except OSError:
            return False
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


def start_service(port: int, host: str) -> int:
    root = project_root()
    pid_path = pid_file_path()
    pid_path.parent.mkdir(parents=True, exist_ok=True)

    if pid_path.exists():
        try:
            existing_pid = int(pid_path.read_text(encoding="utf-8").strip())
            if existing_pid > 0 and process_is_alive(existing_pid):
                print(f"Morphology service already running (pid={existing_pid}).")
                return 0
        except (ValueError, OSError):
            pass
        pid_path.unlink(missing_ok=True)

    if is_port_open(host, port):
        print(f"Port {port} already in use. Assuming morphology service is already running.")
        return 0

    cmd = [
        sys.executable,
        str(root / "tools" / "morphology" / "morphology_pipeline_service.py"),
        "--host",
        host,
        "--port",
        str(port),
    ]

    if os.name == "nt":
        creationflags = subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.CREATE_NO_WINDOW
        proc = subprocess.Popen(
            cmd,
            cwd=str(root),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            stdin=subprocess.DEVNULL,
            creationflags=creationflags,
        )
    else:
        proc = subprocess.Popen(
            cmd,
            cwd=str(root),
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            stdin=subprocess.DEVNULL,
            start_new_session=True,
        )

    pid_path.write_text(str(proc.pid), encoding="utf-8")
    print(f"Started morphology service in background (pid={proc.pid}, port={port}).")
    return 0


def stop_service() -> int:
    pid_path = pid_file_path()
    if not pid_path.exists():
        print("Morphology service PID file not found.")
        return 0

    try:
        pid = int(pid_path.read_text(encoding="utf-8").strip())
    except (ValueError, OSError):
        pid_path.unlink(missing_ok=True)
        print("Invalid PID file removed.")
        return 0

    if pid <= 0:
        pid_path.unlink(missing_ok=True)
        print("Invalid PID file removed.")
        return 0

    try:
        if os.name == "nt":
            subprocess.run(
                ["taskkill", "/PID", str(pid), "/T", "/F"],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                check=False,
            )
        else:
            os.kill(pid, signal.SIGTERM)
        print(f"Stopped morphology service (pid={pid}).")
    except OSError:
        print(f"No running process found for pid={pid}.")
    finally:
        pid_path.unlink(missing_ok=True)
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description="Manage background morphology service.")
    parser.add_argument("action", choices=["start", "stop"])
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8765)
    args = parser.parse_args()

    if args.action == "start":
        return start_service(port=args.port, host=args.host)
    return stop_service()


if __name__ == "__main__":
    raise SystemExit(main())
