#!/usr/bin/env python3
"""
GNC API Proxy Server for Verb Editor

This Flask server acts as a proxy to handle GNC API calls from the verb editor frontend,
avoiding CORS issues by making server-side requests to the GNC API.
"""

import sys
import os
from pathlib import Path

# Add the tools directory to the path for imports
tools_path = Path(__file__).parent.parent.parent.parent.parent / "tools"
sys.path.insert(0, str(tools_path))

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json
import time
from typing import Dict, Any, Optional

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


class GNCProxy:
    """Proxy class for GNC API calls"""

    def __init__(self, base_url: str = "http://gnc.gov.ge/gnc/parse-api"):
        self.base_url = base_url
        self.session_id: Optional[str] = None
        self.session_timeout = 300  # 5 minutes
        self.last_session_time = 0
        self.cache = {}

    def _get_session(self) -> bool:
        """Get a new session ID from the API"""
        try:
            response = requests.get(f"{self.base_url}?command=get-session", timeout=10)
            response.raise_for_status()
            data = response.json()

            self.session_id = data.get("session-id")
            self.last_session_time = time.time()

            return bool(self.session_id)

        except requests.exceptions.RequestException as e:
            print(f"Error getting GNC session: {e}")
            return False

    def _ensure_session(self) -> bool:
        """Ensure it is a valid session"""
        current_time = time.time()

        if (
            not self.session_id
            or current_time - self.last_session_time > self.session_timeout
        ):
            return self._get_session()

        return True

    def analyze_verb_form(self, verb_form: str) -> Optional[Dict[str, Any]]:
        """Analyze a single verb form using GNC API"""

        # Check cache first
        if verb_form in self.cache:
            return self.cache[verb_form]

        # Ensure it is a valid session
        if not self._ensure_session():
            return None

        try:
            # Parse the verb form
            parse_url = f"{self.base_url}?command=parse&session-id={self.session_id}"
            parse_data = {"text": verb_form}

            response = requests.post(parse_url, data=parse_data, timeout=10)
            response.raise_for_status()
            result = response.json()

            # Cache the result
            self.cache[verb_form] = result

            return result

        except requests.exceptions.RequestException as e:
            print(f"Error analyzing verb form '{verb_form}': {e}")
            return None


# Initialize the proxy
gnc_proxy = GNCProxy()


@app.route("/api/gnc/analyze", methods=["POST"])
def analyze_verb():
    """Analyze a verb form using GNC API"""
    try:
        data = request.get_json()
        verb_form = data.get("verb_form")

        if not verb_form:
            return jsonify({"error": "No verb_form provided"}), 400

        result = gnc_proxy.analyze_verb_form(verb_form)

        if result:
            return jsonify(result)
        else:
            return jsonify({"error": "Failed to analyze verb form"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/gnc/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    try:
        # Test if there is a session
        if gnc_proxy._get_session():
            return jsonify(
                {
                    "status": "healthy",
                    "gnc_api": "available",
                    "session_id": gnc_proxy.session_id,
                }
            )
        else:
            return (
                jsonify(
                    {
                        "status": "unhealthy",
                        "gnc_api": "unavailable",
                        "error": "Cannot connect to GNC API",
                    }
                ),
                503,
            )
    except Exception as e:
        return jsonify({"status": "error", "error": str(e)}), 500


@app.route("/api/gnc/cache/stats", methods=["GET"])
def cache_stats():
    """Get cache statistics"""
    return jsonify(
        {
            "cached_forms": len(gnc_proxy.cache),
            "session_id": gnc_proxy.session_id,
            "session_age": (
                time.time() - gnc_proxy.last_session_time
                if gnc_proxy.session_id
                else None
            ),
        }
    )


@app.route("/api/gnc/cache/clear", methods=["POST"])
def clear_cache():
    """Clear the cache"""
    gnc_proxy.cache.clear()
    return jsonify({"message": "Cache cleared successfully"})


if __name__ == "__main__":
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
