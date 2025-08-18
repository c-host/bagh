#!/usr/bin/env python3
"""
Database Validator for Georgian Verb Example System

This script validates the completeness and format consistency of the four databases:
- subject_database.json
- direct_object_database.json
- indirect_object_database.json
- adjective_database.json

It checks for:
- Required case forms (nom, erg, dat, gen, inst, adv)
- Singular and plural forms
- Required fields (base, category, semantic_domain, verb_compatibility)
- Format consistency
"""

import os
import sys
from typing import Dict, List, Set
from pathlib import Path

from tools.utils import DatabaseLoader, validate_file_path


class DatabaseValidator:
    def __init__(self):
        self.db_loader = DatabaseLoader()
        self.required_cases = ["nom", "erg", "dat", "gen", "inst", "adv"]
        self.required_fields = {
            "subjects": [
                "base",
                "category",
                "semantic_domain",
                "verb_compatibility",
                "cases",
                "plural",
            ],
            "direct_objects": [
                "base",
                "category",
                "semantic_domain",
                "verb_compatibility",
                "cases",
                "plural",
            ],
            "indirect_objects": [
                "base",
                "category",
                "semantic_domain",
                "verb_compatibility",
                "cases",
                "plural",
            ],
            "adjectives": ["base", "category", "compatibility", "cases", "plural"],
        }
        self.errors = []
        self.warnings = []

    def validate_all_databases(self) -> bool:
        """Validate all four databases"""
        print("🔍 Validating Georgian Verb Example Databases...")
        print("=" * 60)

        databases = [
            ("subjects", "subject_database.json"),
            ("direct_objects", "direct_object_database.json"),
            ("indirect_objects", "indirect_object_database.json"),
            ("adjectives", "adjective_database.json"),
        ]

        all_valid = True

        for db_type, filename in databases:
            print(f"\n📋 Validating {db_type} database...")
            if self.validate_database(db_type, filename):
                print(f"✅ {db_type} database is valid")
            else:
                print(f"❌ {db_type} database has errors")
                all_valid = False

        self.print_summary()
        return all_valid

    def validate_database(self, db_type: str, filename: str) -> bool:
        """Validate a single database"""
        try:
            data = self.db_loader.get_database(db_type)
            if not data:
                self.errors.append(f"Database {db_type} is empty or could not be loaded")
                return False
        except Exception as e:
            self.errors.append(f"Error reading {filename}: {e}")
            return False

        if db_type not in data:
            self.errors.append(f"Missing '{db_type}' key in {filename}")
            return False

        items = data[db_type]
        if not isinstance(items, dict):
            self.errors.append(f"'{db_type}' must be an object in {filename}")
            return False

        valid = True
        for item_key, item_data in items.items():
            if not self.validate_item(db_type, item_key, item_data):
                valid = False

        return valid

    def validate_item(self, db_type: str, item_key: str, item_data: Dict) -> bool:
        """Validate a single item in a database"""
        valid = True

        # Check required fields
        required_fields = self.required_fields[db_type]
        for field in required_fields:
            if field not in item_data:
                self.errors.append(f"Missing field '{field}' in {db_type}.{item_key}")
                valid = False

        if not valid:
            return False

        # Validate base form
        if not isinstance(item_data["base"], str) or not item_data["base"]:
            self.errors.append(f"Invalid base form in {db_type}.{item_key}")
            valid = False

        # Validate category
        if not isinstance(item_data["category"], str) or not item_data["category"]:
            self.errors.append(f"Invalid category in {db_type}.{item_key}")
            valid = False

        # Validate semantic domain (except for adjectives)
        if db_type != "adjectives":
            if (
                not isinstance(item_data["semantic_domain"], str)
                or not item_data["semantic_domain"]
            ):
                self.errors.append(f"Invalid semantic_domain in {db_type}.{item_key}")
                valid = False

        # Validate verb compatibility (except for adjectives)
        if db_type != "adjectives":
            if (
                not isinstance(item_data["verb_compatibility"], list)
                or not item_data["verb_compatibility"]
            ):
                self.errors.append(
                    f"Invalid verb_compatibility in {db_type}.{item_key}"
                )
                valid = False

        # Validate compatibility (for adjectives)
        if db_type == "adjectives":
            if (
                not isinstance(item_data["compatibility"], list)
                or not item_data["compatibility"]
            ):
                self.errors.append(f"Invalid compatibility in {db_type}.{item_key}")
                valid = False

        # Validate cases
        if not self.validate_cases(db_type, item_key, item_data["cases"], "singular"):
            valid = False

        # Validate plural
        if not self.validate_cases(db_type, item_key, item_data["plural"], "plural"):
            valid = False

        return valid

    def validate_cases(
        self, db_type: str, item_key: str, cases: Dict, number: str
    ) -> bool:
        """Validate case forms for a given number"""
        valid = True

        if not isinstance(cases, dict):
            self.errors.append(f"Invalid {number} cases format in {db_type}.{item_key}")
            return False

        for case in self.required_cases:
            if case not in cases:
                self.errors.append(
                    f"Missing {case} case in {number} forms for {db_type}.{item_key}"
                )
                valid = False
            elif not isinstance(cases[case], str) or not cases[case]:
                self.errors.append(
                    f"Invalid {case} case form in {number} forms for {db_type}.{item_key}"
                )
                valid = False

        return valid

    def print_summary(self):
        """Print validation summary with errors and warnings"""
        print("\n" + "=" * 60)
        print("📊 VALIDATION SUMMARY")
        print("=" * 60)

        if not self.errors and not self.warnings:
            print("🎉 All databases are valid!")
            return

        if self.errors:
            print(f"\n❌ ERRORS ({len(self.errors)}):")
            for i, error in enumerate(self.errors, 1):
                print(f"  {i}. {error}")

        if self.warnings:
            print(f"\n⚠️  WARNINGS ({len(self.warnings)}):")
            for i, warning in enumerate(self.warnings, 1):
                print(f"  {i}. {warning}")

        if self.errors:
            print(f"\n🔧 RESOLUTION INSTRUCTIONS:")
            print("  1. Fix all errors listed above")
            print("  2. Ensure all required case forms are present")
            print("  3. Verify all Georgian text is correct")
            print("  4. Run validation again")

    def print_database_stats(self):
        """Print statistics about the databases"""
        print("\n📈 DATABASE STATISTICS")
        print("=" * 60)

        databases = [
            ("subjects", "subject_database.json"),
            ("direct_objects", "direct_object_database.json"),
            ("indirect_objects", "indirect_object_database.json"),
            ("adjectives", "adjective_database.json"),
        ]

        for db_type, filename in databases:
            filepath = self.data_dir / filename
            if filepath.exists():
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        data = json.load(f)
                    count = len(data.get(db_type, {}))
                    print(f"  {db_type}: {count} entries")
                except:
                    print(f"  {db_type}: Error reading file")
            else:
                print(f"  {db_type}: File not found")


def main():
    """Main validation function"""
    validator = DatabaseValidator()

    # Print database statistics
    validator.print_database_stats()

    # Validate all databases
    is_valid = validator.validate_all_databases()

    # Exit with appropriate code
    sys.exit(0 if is_valid else 1)


if __name__ == "__main__":
    main()
