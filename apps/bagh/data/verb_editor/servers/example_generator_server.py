#!/usr/bin/env python3
"""
HTTP Server for Example Generator Integration

This module provides a Flask-based HTTP server that exposes the example generator
functionality to the verb editor frontend via REST API endpoints.
"""

import json
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Add the project root to the Python path
sys.path.append(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        )
    )
)

# Lazy import to avoid hanging during server startup
# generate_pedagogical_examples = None  # Will be imported when needed

# Configure logging with file output
import os
from pathlib import Path

# Create logs directory if it doesn't exist
logs_dir = Path(__file__).parent / "logs"
logs_dir.mkdir(exist_ok=True)

# Don't clear log files on server restart to preserve debugging information
# log_files = [
#     logs_dir / "example_generator_server.log",
#     logs_dir / "example_generator.log",
#     logs_dir / "verb_conjugation.log",
# ]
#
# for log_file in log_files:
#     if log_file.exists():
#         log_file.unlink()  # Delete the file
#         print(f"Cleared log file: {log_file.name}")

# Configure logging to both file and console
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler(logs_dir / "example_generator_server.log"),
        logging.StreamHandler(),
    ],
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    logger.info("Health check request received")
    try:
        # Test if the example generator can be imported
        from tools.core.example_generator import generate_pedagogical_examples

        logger.info("Health check successful")
        return jsonify(
            {
                "status": "healthy",
                "service": "example_generator",
                "timestamp": __import__("datetime").datetime.now().isoformat(),
            }
        )
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return (
            jsonify(
                {
                    "status": "unhealthy",
                    "service": "example_generator",
                    "error": str(e),
                    "timestamp": __import__("datetime").datetime.now().isoformat(),
                }
            ),
            500,
        )


@app.route("/generate_examples", methods=["POST"])
def generate_examples():
    """
    Generate pedagogical examples for a verb

    Expected JSON payload:
    {
        "verb_data": {
            // Verb data in the new structure
        },
        "tense": "present",
        "selected_preverbs": ["მი", "მო"]
    }
    """
    logger.info("Generate examples request received")
    try:
        # Lazy import to avoid hanging during server startup
        from tools.core.example_generator import generate_pedagogical_examples

        # Get JSON data from request
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON data provided"}), 400

        # Extract parameters
        verb_data = data.get("verb_data")
        tense = data.get("tense")
        selected_preverbs = data.get("selected_preverbs", [])

        if not verb_data:
            return jsonify({"error": "verb_data is required"}), 400

        if not tense:
            return jsonify({"error": "tense is required"}), 400

        logger.info(
            f"Generating examples for tense: {tense}, preverbs: {selected_preverbs}"
        )

        # Debug: Check preposition data (simplified)
        if verb_data and "syntax" in verb_data:
            syntax = verb_data.get("syntax", {})
            prepositions = syntax.get("prepositions", {})
            logger.info(f"[SERVER] Prepositions received: {prepositions}")
        else:
            logger.info("[SERVER] No syntax data found in verb_data")

        # Call the example generator
        result = generate_pedagogical_examples(
            verb_data=verb_data, tense=tense, selected_preverbs=selected_preverbs
        )

        logger.info(f"Generated {len(result.get('examples', []))} preverb examples")

        return jsonify(result)

    except ImportError as e:
        logger.error(f"Import error: {str(e)}")
        return (
            jsonify(
                {
                    "error": "Failed to import example generator",
                    "details": str(e),
                    "examples": [],
                    "raw_gloss": "",
                    "enhanced": False,
                }
            ),
            500,
        )
    except Exception as e:
        logger.error(f"Error generating examples: {str(e)}")
        return (
            jsonify(
                {
                    "error": "Failed to generate examples",
                    "details": str(e),
                    "examples": [],
                    "raw_gloss": "",
                    "enhanced": False,
                }
            ),
            500,
        )


@app.route("/test", methods=["GET"])
def test_endpoint():
    """Test endpoint with sample data"""
    try:
        # Lazy import to avoid hanging during server startup
        from tools.core.example_generator import generate_pedagogical_examples

        sample_verb_data = {
            "id": 1,
            "georgian": "მისვლა",
            "description": "to go",
            "syntax": {
                "arguments": {
                    "subject": {
                        "3sg": {"noun": "child", "adjective": "young"},
                        "3pl": {"noun": "children", "adjective": "young"},
                    }
                }
            },
            "conjugations": {
                "present": {
                    "raw_gloss": "V MedAct Pres <S> <S:Nom>",
                    "forms": {"3sg": "მიდის", "3pl": "მიდიან"},
                }
            },
            "preverb_config": {
                "has_multiple_preverbs": False,
                "default_preverb": "მი",
                "available_preverbs": ["მი"],
            },
            "english_translations": {"default": {"present": "go"}},
            "preverb_rules": {},
        }

        result = generate_pedagogical_examples(
            verb_data=sample_verb_data, tense="present", selected_preverbs=["მი"]
        )

        return jsonify(
            {"test": True, "sample_data": sample_verb_data, "result": result}
        )
    except Exception as e:
        logger.error(f"Error in test endpoint: {str(e)}")
        return jsonify({"error": "Test failed", "details": str(e)}), 500


if __name__ == "__main__":
    logger.info("Starting Example Generator Server...")
    logger.info("Server will be available at http://localhost:5000")
    logger.info("Endpoints:")
    logger.info("  GET  /health - Health check")
    logger.info("  POST /generate_examples - Generate examples")
    logger.info("  GET  /test - Test with sample data")

    try:
        app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)
    except Exception as e:
        logger.error(f"Failed to start server: {str(e)}")
        raise
