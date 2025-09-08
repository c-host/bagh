"""
Template Orchestrator - Combines HTML template with generated content
"""

import logging
from pathlib import Path
from typing import Dict, Optional

logger = logging.getLogger(__name__)


class TemplateOrchestrator:
    """
    Orchestrates the combination of HTML templates with generated content.
    Separates page structure concerns from data processing concerns.
    """

    def __init__(self, project_root: Path):
        """
        Initialize the template orchestrator.

        Args:
            project_root: Path to the project root directory
        """
        self.project_root = project_root
        self.templates_dir = project_root / "tools" / "output_generation" / "templates"

    def load_template(self, template_name: str = "base.html") -> str:
        """
        Load an HTML template from the templates directory.

        Args:
            template_name: Name of the template file to load

        Returns:
            Template content as string

        Raises:
            FileNotFoundError: If template file doesn't exist
        """
        template_path = self.templates_dir / template_name

        if not template_path.exists():
            raise FileNotFoundError(f"Template not found: {template_path}")

        try:
            with open(template_path, "r", encoding="utf-8") as f:
                template_content = f.read()

            logger.info(f"Loaded template: {template_name}")
            return template_content

        except Exception as e:
            logger.error(f"Error loading template {template_name}: {e}")
            raise

    def generate_complete_page(
        self,
        toc_content: str,
        verb_sections_html: str,
        critical_css: str = "",
        template_name: str = "base.html",
    ) -> str:
        """
        Generate a complete HTML page by combining template with generated content.

        Args:
            toc_content: Generated table of contents HTML
            verb_sections_html: Generated verb sections HTML
            critical_css: Critical CSS for above-the-fold content
            template_name: Name of the template to use

        Returns:
            Complete HTML page as string
        """
        try:
            # Load the template
            template = self.load_template(template_name)

            # Replace template placeholders with generated content
            complete_page = template.replace("{{TOC_CONTENT}}", toc_content)
            complete_page = complete_page.replace(
                "{{VERB_SECTIONS}}", verb_sections_html
            )
            complete_page = complete_page.replace("{{CRITICAL_CSS}}", critical_css)

            logger.info("Successfully generated complete HTML page")
            return complete_page

        except Exception as e:
            logger.error(f"Error generating complete HTML page: {e}")
            raise

    def generate_page_with_custom_template(
        self, template_name: str, **placeholders: str
    ) -> str:
        """
        Generate a page using a custom template with multiple placeholders.

        Args:
            template_name: Name of the template to use
            **placeholders: Keyword arguments mapping placeholder names to content

        Returns:
            Complete HTML page as string
        """
        try:
            # Load the template
            template = self.load_template(template_name)

            # Replace all placeholders
            complete_page = template
            for placeholder_name, content in placeholders.items():
                placeholder = f"{{{{{placeholder_name}}}}}"
                complete_page = complete_page.replace(placeholder, content)

            logger.info(f"Successfully generated page with template: {template_name}")
            return complete_page

        except Exception as e:
            logger.error(f"Error generating page with custom template: {e}")
            raise
