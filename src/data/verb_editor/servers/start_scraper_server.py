#!/usr/bin/env python3
"""
HTTP Server for Verb Scraper Integration
This script provides a simple HTTP API to integrate with lingua_verb_scraper.py
"""

import json
import sys
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import subprocess
import traceback
from typing import Dict, Any, Optional

# Add the project root to the Python path
project_root = os.path.dirname(
    os.path.dirname(
        os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    )
)
sys.path.append(project_root)

# Import the scraper from the tools directory
try:
    from tools.scraper.lingua_verb_scraper import VerbScraper

    SCRAPER_AVAILABLE = True
except ImportError as e:
    print(f"Warning: lingua_verb_scraper.py not found. Error: {e}")
    SCRAPER_AVAILABLE = False


class VerbScraperHandler(BaseHTTPRequestHandler):
    """HTTP request handler for verb scraping API"""

    def __init__(self, *args, **kwargs):
        self.scraper = None
        if SCRAPER_AVAILABLE:
            try:
                self.scraper = VerbScraper()
            except Exception as e:
                print(f"Warning: Failed to initialize scraper: {e}")
        super().__init__(*args, **kwargs)

    def do_OPTIONS(self):
        """Handle CORS preflight requests"""
        self.send_response(200)
        self.send_cors_headers()
        self.end_headers()

    def send_cors_headers(self):
        """Send CORS headers for all responses"""
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Max-Age", "86400")  # 24 hours

    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)

        if parsed_path.path == "/health":
            self.send_health_response()
        elif parsed_path.path == "/status":
            self.send_status_response()
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urlparse(self.path)

        if parsed_path.path == "/scrape":
            self.handle_scrape_request()
        else:
            self.send_error(404, "Not Found")

    def handle_scrape_request(self):
        """Handle verb scraping requests"""
        try:
            # Read request body
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length == 0:
                self.send_error(400, "No request body")
                return

            body = self.rfile.read(content_length)
            request_data = json.loads(body.decode("utf-8"))

            # Validate request
            if "url" not in request_data:
                self.send_error(400, "Missing 'url' parameter")
                return

            url = request_data["url"]

            # Scrape the verb
            result = self.scrape_verb(url)

            # Send response
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_cors_headers()
            self.end_headers()

            response_data = {
                "success": True,
                "data": result,
                "timestamp": self.get_timestamp(),
            }

            self.wfile.write(
                json.dumps(response_data, ensure_ascii=False).encode("utf-8")
            )

        except json.JSONDecodeError:
            self.send_error(400, "Invalid JSON")
        except Exception as e:
            self.send_error(500, f"Scraping failed: {str(e)}")
            traceback.print_exc()

    def scrape_verb(self, url: str) -> Dict[str, Any]:
        """Scrape verb data from the given URL"""
        if not self.scraper:
            # Return mock data if scraper is not available
            return self.generate_mock_data(url)

        try:
            # Use the actual scraper
            scraped_data = self.scraper.scrape_verb(url)
            transformed_data = self.transform_scraped_data(scraped_data)
            # Add the URL to the response for frontend validation
            transformed_data["url"] = url
            return transformed_data
        except Exception as e:
            print(f"Scraping failed: {e}")
            # Fallback to mock data
            mock_data = self.generate_mock_data(url)
            mock_data["url"] = url
            return mock_data

    def transform_scraped_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Transform scraped data to the expected format"""
        # This would transform the actual scraper output to match expected structure
        # For now, return as-is
        return raw_data

    def generate_mock_data(self, url: str) -> Dict[str, Any]:
        """Generate mock data for testing when scraper is not available"""
        # Extract verb name from URL
        verb_name = url.split("/")[-1] if "/" in url else "unknown"

        return {
            "georgian": f"მოკაპ{verb_name}",
            "english": f"to {verb_name}",
            "verb_class": "I",
            "root": "კაპ",
            "stem": "კაპ",
            "preverbs": ["მო", "გა", "წა"],
            "conjugations": {
                "present": {"raw_gloss": "<S:Erg> <DO:Nom>", "forms": {}},
                "imperfect": {"raw_gloss": "<S:Erg> <DO:Dat>", "forms": {}},
                "future": {"raw_gloss": "<S:Erg> <DO:Nom>", "forms": {}},
                "aorist": {"raw_gloss": "<S:Erg> <DO:Nom>", "forms": {}},
                "optative": {"raw_gloss": "<S:Erg> <DO:Nom>", "forms": {}},
                "imperative": {"raw_gloss": "<S:Erg> <DO:Nom>", "forms": {}},
            },
            "notes": "Mock data generated for testing",
        }

    def send_health_response(self):
        """Send health check response"""
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_cors_headers()
        self.end_headers()

        health_data = {
            "status": "healthy",
            "scraper_available": SCRAPER_AVAILABLE,
            "timestamp": self.get_timestamp(),
        }

        self.wfile.write(json.dumps(health_data).encode("utf-8"))

    def send_status_response(self):
        """Send detailed status response"""
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_cors_headers()
        self.end_headers()

        status_data = {
            "scraper_available": SCRAPER_AVAILABLE,
            "scraper_initialized": self.scraper is not None,
            "python_version": sys.version,
            "timestamp": self.get_timestamp(),
        }

        self.wfile.write(json.dumps(status_data).encode("utf-8"))

    def send_error(self, code, message):
        """Override send_error to include CORS headers"""
        self.send_response(code)
        self.send_header("Content-Type", "text/plain")
        self.send_cors_headers()
        self.end_headers()
        self.wfile.write(f"{code} {message}".encode("utf-8"))

    def get_timestamp(self) -> str:
        """Get current timestamp in ISO format"""
        from datetime import datetime

        return datetime.now().isoformat()

    def log_message(self, format, *args):
        """Override logging to be less verbose"""
        # Uncomment the next line to enable logging
        # super().log_message(format, *args)
        pass


def run_server(port: int = 8000):
    """Run the HTTP server"""
    server_address = ("", port)
    httpd = HTTPServer(server_address, VerbScraperHandler)

    print(f"Verb Scraper Server starting on port {port}")
    print(f"Health check: http://localhost:{port}/health")
    print(f"Status: http://localhost:{port}/status")
    print(f"Scrape endpoint: http://localhost:{port}/scrape")
    print("Press Ctrl+C to stop the server")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        httpd.shutdown()


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Verb Scraper HTTP Server")
    parser.add_argument(
        "--port", type=int, default=8000, help="Port to run server on (default: 8000)"
    )

    args = parser.parse_args()
    run_server(args.port)
