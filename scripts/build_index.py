#!/usr/bin/env python3
"""Regenerate index.html sidebar nav + PAGES data from the repo's .md files.

Source of truth is always the markdown files. Existing sidebar labels are
preserved for files already known to index.html; new files get an
auto-derived label (emoji + first H1) so a run is idempotent and safe to
call after every markdown edit.
"""
import json
import re
from pathlib import Path

import markdown

ROOT = Path(__file__).resolve().parent.parent
INDEX_HTML = ROOT / "index.html"
EXCLUDE_DIRS = {".git", "node_modules", "scripts", ".claude"}

DEFAULT_EMOJI_BY_DIR = {
    "python": "🐍",
    "sql": "🗄️",
    "sap": "🏢",
    "javascript": "💛",
    "docker": "🐳",
    "odoo": "🟣",
    "spreadsheet": "📊",
    "excel": "📊",
    "github": "🧰",
    "mind": "🧠",
    "ai_engineering": "🤖",
}


def key_for(rel_path: str) -> str:
    return rel_path.replace("/", "_").replace(".", "_")


def discover_md_files():
    files = []
    for p in ROOT.rglob("*.md"):
        rel = p.relative_to(ROOT)
        if EXCLUDE_DIRS & set(rel.parts[:-1]):
            continue
        files.append(rel.as_posix())
    return sorted(files)


def extract_existing_labels(html: str) -> dict[str, str]:
    labels = {}
    for m in re.finditer(
        r'data-page="([^"]+)"[^>]*>([^<]+)</button>', html
    ):
        labels[m.group(1)] = m.group(2)
    return labels


def first_h1_title(md_text: str) -> str:
    m = re.search(r"^#\s+(.+)$", md_text, re.MULTILINE)
    return m.group(1).strip() if m else "Untitled"


def derive_label(rel_path: str, md_text: str) -> str:
    top_dir = rel_path.split("/")[0] if "/" in rel_path else ""
    emoji = DEFAULT_EMOJI_BY_DIR.get(top_dir, "📄")
    title = first_h1_title(md_text)
    title = re.sub(r"^[^\w]+", "", title).strip()
    return f"{emoji} {title}"


def render_body(md_text: str) -> str:
    md = markdown.Markdown(
        extensions=["extra", "toc", "sane_lists"],
        extension_configs={"toc": {"permalink": False}},
    )
    return md.convert(md_text)


def main():
    html = INDEX_HTML.read_text(encoding="utf-8")
    existing_labels = extract_existing_labels(html)

    rel_paths = discover_md_files()
    entries = []
    pages = {}
    for rel_path in rel_paths:
        key = key_for(rel_path)
        md_text = (ROOT / rel_path).read_text(encoding="utf-8")
        label = existing_labels.get(key) or derive_label(rel_path, md_text)
        entries.append((key, label))
        pages[key] = {"label": label, "body": render_body(md_text)}

    nav_lines = "\n".join(
        f'    <button class="nav-btn" data-page="{key}" onclick="showPage(\'{key}\')">{label}</button>'
        for key, label in entries
    )
    nav_block = f'<div class="nav-list" id="navList">\n{nav_lines}\n  </div>'
    html = re.sub(
        r'<div class="nav-list" id="navList">.*?</div>\n</nav>',
        nav_block + "\n</nav>",
        html,
        flags=re.DOTALL,
    )

    pages_json = json.dumps(pages, ensure_ascii=False)
    js_literal = json.dumps(pages_json)  # produces a valid JS string literal
    new_pages_line = "var PAGES = JSON.parse(" + js_literal + ");"
    lines = html.split("\n")
    pages_line_idx = next(
        i for i, line in enumerate(lines) if line.startswith("var PAGES = JSON.parse(")
    )
    lines[pages_line_idx] = new_pages_line
    html = "\n".join(lines)

    html = re.sub(
        r"\d+ ta fayl · Barcha \.md Fayllar",
        f"{len(entries)} ta fayl · Barcha .md Fayllar",
        html,
    )

    INDEX_HTML.write_text(html, encoding="utf-8")
    print(f"index.html regenerated: {len(entries)} pages.")


if __name__ == "__main__":
    main()
