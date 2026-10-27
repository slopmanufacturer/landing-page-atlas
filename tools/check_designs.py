#!/usr/bin/env python3
"""Check the structure and runtime health of the Landing Page Atlas designs.

The static pass uses only the Python standard library. The optional browser
pass needs Selenium and geckodriver:

    python3 tools/check_designs.py
    python3 tools/check_designs.py --browser
"""

from __future__ import annotations

import argparse
import http.server
import re
import shutil
import socketserver
import subprocess
import sys
import threading
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse

ROOT = Path(__file__).resolve().parent.parent
DESIGNS = ROOT / "designs"
THUMBS = ROOT / "assets" / "thumbs"
GALLERY = ROOT / "index.html"
GALLERY_JS = ROOT / "script.js"
WIDTHS = (1440, 768, 390, 320)
THUMB_SIZE = (720, 540)
THUMB_LIMIT = 120 * 1024

FOLDER_RE = re.compile(r"^\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$")
ENTRY_RE = re.compile(
    r'\{\s*folder:\s*"([^"]+)"\s*,\s*title:\s*"([^"]+)"\s*,\s*cat:\s*"([^"]+)"\s*,\s*'
    r'tags:\s*"([^"]+)"\s*,\s*accent:\s*"([^"]+)"\s*\}'
)

failures: list[str] = []
warnings: list[str] = []


def fail(message: str) -> None:
    failures.append(message)


def warn(message: str) -> None:
    warnings.append(message)


@dataclass
class Design:
    folder: str
    title: str
    category: str
    tags: str
    accent: str


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.doctype = False
        self.lang = False
        self.viewport = False
        self.description = ""
        self.title = ""
        self.h1 = 0
        self.ids: list[str] = []
        self.links: list[tuple[str, str, str]] = []
        self.buttons: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.controls: list[tuple[str, dict[str, str], bool]] = []
        self.labels: set[str] = set()
        self.external_scripts: list[str] = []
        self._in_title = False
        self._label_depth = 0

    def handle_decl(self, decl: str) -> None:
        if decl.strip().lower() == "doctype html":
            self.doctype = True

    def _handle(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key: value or "" for key, value in attrs}

        if tag == "html" and values.get("lang"):
            self.lang = True
        if tag == "meta" and values.get("name") == "viewport":
            self.viewport = True
        if tag == "meta" and values.get("name") == "description":
            self.description = values.get("content", "")
        if tag == "title":
            self._in_title = True
        if tag == "h1":
            self.h1 += 1
        if values.get("id"):
            self.ids.append(values["id"])

        if tag in ("a", "link") and "href" in values:
            self.links.append((tag, "href", values["href"]))
        if tag in ("img", "script") and "src" in values:
            self.links.append((tag, "src", values["src"]))

        if tag == "img":
            self.images.append(values)
        if tag == "button":
            self.buttons.append(values)
        if tag == "label":
            self._label_depth += 1
            if values.get("for"):
                self.labels.add(values["for"])
        if tag in ("input", "select", "textarea"):
            self.controls.append((tag, values, self._label_depth > 0))
        if tag == "script" and values.get("src", "").startswith(("http://", "https://", "//")):
            self.external_scripts.append(values["src"])

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._handle(tag, attrs)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._handle(tag, attrs)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False
        if tag == "label" and self._label_depth:
            self._label_depth -= 1

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title += data


def parse_designs() -> list[Design]:
    if not GALLERY_JS.exists():
        fail("script.js: missing")
        return []

    text = GALLERY_JS.read_text(encoding="utf-8")
    designs = [Design(*match) for match in ENTRY_RE.findall(text)]

    if not designs:
        fail("script.js: no design entries found")

    folders = [design.folder for design in designs]
    duplicates = sorted({folder for folder in folders if folders.count(folder) > 1})
    if duplicates:
        fail(f"script.js: duplicate folders: {', '.join(duplicates)}")

    return designs


def check_links(page: Path, parser: PageParser) -> None:
    relative = page.relative_to(ROOT)
    ids = set(parser.ids)

    for _tag, _attr, value in parser.links:
        if not value:
            continue

        if value.startswith(("#", "http://", "https://", "//", "mailto:", "tel:", "data:", "javascript:")):
            if value.startswith("#") and len(value) > 1 and value[1:] not in ids:
                fail(f"{relative}: missing fragment target {value}")
            continue

        clean = value.split("#", 1)[0].split("?", 1)[0]
        if not clean:
            continue

        target = (page.parent / clean).resolve()
        if clean.endswith("/"):
            target = target / "index.html"
        if not target.exists():
            fail(f"{relative}: broken link {value}")


def check_page(page: Path, *, design: bool = False) -> PageParser:
    relative = page.relative_to(ROOT)

    if not page.exists():
        fail(f"{relative}: missing")
        return PageParser()

    text = page.read_text(encoding="utf-8")
    parser = PageParser()
    parser.feed(text)

    if not parser.doctype:
        fail(f"{relative}: missing <!doctype html>")
    if not parser.lang:
        fail(f"{relative}: missing <html lang>")
    if not parser.viewport:
        fail(f"{relative}: missing viewport meta")
    if not parser.title.strip():
        fail(f"{relative}: missing <title>")
    if not parser.description.strip():
        fail(f"{relative}: missing meta description")
    if parser.h1 != 1:
        fail(f"{relative}: expected one <h1>, found {parser.h1}")

    duplicates = sorted({value for value in parser.ids if parser.ids.count(value) > 1})
    if duplicates:
        fail(f"{relative}: duplicate ids: {', '.join(duplicates[:5])}")

    for button in parser.buttons:
        if "type" not in button:
            fail(f"{relative}: <button> without type")

    for image in parser.images:
        if "alt" not in image:
            fail(f"{relative}: <img> without alt")

    for tag, attrs, wrapped in parser.controls:
        if attrs.get("type") in ("hidden", "submit", "button", "reset"):
            continue
        if attrs.get("aria-label") or attrs.get("aria-labelledby") or wrapped:
            continue
        if attrs.get("id") and attrs["id"] in parser.labels:
            continue
        fail(f"{relative}: <{tag}> without a label")

    if parser.external_scripts:
        fail(f"{relative}: external script {parser.external_scripts[0]}")

    check_links(page, parser)

    if design:
        css = page.parent / "style.css"
        if not css.exists():
            fail(f"{relative}: missing style.css")
        elif "prefers-reduced-motion" not in css.read_text(encoding="utf-8"):
            fail(f"{relative}: style.css does not mention prefers-reduced-motion")

        if "../../index.html" not in text:
            fail(f"{relative}: missing footer link to ../../index.html")

    return parser


def check_javascript(path: Path) -> None:
    relative = path.relative_to(ROOT)

    if not path.exists():
        fail(f"{relative}: missing")
        return

    node = shutil.which("node")
    if not node:
        warn("node not found; skipped JavaScript syntax checks")
        return

    result = subprocess.run([node, "--check", str(path)], capture_output=True, text=True)
    if result.returncode:
        detail = result.stderr.strip().splitlines()
        fail(f"{relative}: JavaScript syntax error{': ' + detail[-1] if detail else ''}")


def webp_size(path: Path) -> tuple[int, int] | None:
    data = path.read_bytes()
    if len(data) < 30 or data[:4] != b"RIFF" or data[8:12] != b"WEBP":
        return None

    chunk = data[12:16]
    if chunk == b"VP8X":
        return 1 + int.from_bytes(data[24:27], "little"), 1 + int.from_bytes(data[27:30], "little")
    if chunk == b"VP8 ":
        return (
            int.from_bytes(data[26:28], "little") & 0x3FFF,
            int.from_bytes(data[28:30], "little") & 0x3FFF,
        )
    if chunk == b"VP8L":
        bits = int.from_bytes(data[21:25], "little")
        return (bits & 0x3FFF) + 1, ((bits >> 14) & 0x3FFF) + 1
    return None


def check_thumbnail(folder: str) -> None:
    path = THUMBS / f"{folder}.webp"

    if not path.exists():
        fail(f"assets/thumbs/{folder}.webp: missing")
        return

    size = path.stat().st_size
    if size > THUMB_LIMIT:
        fail(f"assets/thumbs/{folder}.webp: {size // 1024} KB, limit is {THUMB_LIMIT // 1024} KB")

    dimensions = webp_size(path)
    if dimensions != THUMB_SIZE:
        fail(f"assets/thumbs/{folder}.webp: expected {THUMB_SIZE[0]}x{THUMB_SIZE[1]}, got {dimensions}")


def check_gallery(designs: list[Design]) -> None:
    if not GALLERY.exists():
        fail("index.html: missing")
        return

    check_page(GALLERY)
    text = GALLERY.read_text(encoding="utf-8")

    if 'id="catalog"' not in text:
        fail("index.html: missing #catalog")
    if 'id="catalog-count"' not in text:
        fail("index.html: missing #catalog-count")

    count_match = re.search(r'<span id="catalog-count">(\d+)</span>', text)
    if not count_match:
        fail("index.html: missing catalogue count")
    elif int(count_match.group(1)) != len(designs):
        fail(f"index.html: catalogue count is {count_match.group(1)}, expected {len(designs)}")

    if 'data-filter="all"' not in text:
        fail("index.html: missing All filter")

    categories = sorted({design.category for design in designs})
    for category in categories:
        occurrences = len(re.findall(rf'data-filter="{re.escape(category)}"', text))
        if occurrences < 2:
            fail(f"index.html: expected a filter and a palette card for '{category}'")

    folder_order = [design.folder for design in designs]
    if folder_order != sorted(folder_order):
        warn("script.js: design entries are not in folder order")


def check_browser(designs: list[Design]) -> tuple[int, int]:
    try:
        from selenium import webdriver
        from selenium.webdriver.firefox.options import Options
        from selenium.webdriver.firefox.service import Service
    except ImportError:
        fail("browser checks need Selenium: python3 -m pip install selenium")
        return 0, 0

    geckodriver = shutil.which("geckodriver")
    if not geckodriver:
        fail("browser checks need geckodriver on PATH")
        return 0, 0

    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, directory=str(ROOT), **kwargs)

        def log_message(self, *args):
            pass

        def do_GET(self):
            parsed = urlparse(self.path)
            if parsed.path != "/__frame":
                super().do_GET()
                return

            query = parse_qs(parsed.query)
            target = query.get("url", ["/index.html"])[0]
            width = query.get("w", ["1440"])[0]
            body = (
                '<!doctype html><html><head><meta charset="utf-8">'
                "<style>html,body{margin:0;overflow:hidden;background:#888}"
                "iframe{display:block;border:0;height:900px}</style></head><body>"
                f'<iframe id="frame" src="{target}" style="width:{width}px"></iframe>'
                "</body></html>"
            ).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

    server = socketserver.TCPServer(("127.0.0.1", 0), QuietHandler)
    port = server.server_address[1]
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--window-size=1440,900")
    options.enable_bidi = True

    driver = webdriver.Firefox(options=options, service=Service(geckodriver))
    console: list[tuple[str, str]] = []
    errors: list[str] = []
    driver.script.add_console_message_handler(lambda message: console.append((message.level, message.text)))
    driver.script.add_javascript_error_handler(lambda error: errors.append(str(error)))

    pages = [GALLERY] + [DESIGNS / design.folder / "index.html" for design in designs]
    loads = 0

    try:
        driver.set_window_size(1440, 1000)

        for page in pages:
            target = "/" + page.relative_to(ROOT).as_posix()
            for width in WIDTHS:
                console.clear()
                errors.clear()
                driver.get(
                    f"http://127.0.0.1:{port}/__frame?"
                    + urlencode({"url": target, "w": width})
                )
                driver.execute_async_script(
                    "const done = arguments[0];"
                    "const frame = document.querySelector('#frame');"
                    "const finish = () => {"
                    "  const win = frame.contentWindow;"
                    "  if (!win) { done(false); return; }"
                    "  win.document.fonts.ready.then(() => done(true));"
                    "  setTimeout(() => done(false), 4000);"
                    "};"
                    "if (frame.contentDocument && frame.contentDocument.readyState === 'complete') finish();"
                    "else frame.addEventListener('load', finish, { once: true });"
                )
                loads += 1

                inner_width, scroll_width = driver.execute_script(
                    "const frame = document.querySelector('#frame');"
                    "return [frame.contentWindow.innerWidth, frame.contentDocument.documentElement.scrollWidth];"
                )
                if inner_width != width:
                    fail(f"{page.relative_to(ROOT)}: iframe width {inner_width}, expected {width}")
                if scroll_width > width + 1:
                    fail(f"{page.relative_to(ROOT)}: horizontal overflow at {width}px ({scroll_width} > {width})")

                for level, message in console:
                    if level in ("SEVERE", "ERROR"):
                        fail(f"{page.relative_to(ROOT)}: console error at {width}px: {message[:160]}")

                for error in errors:
                    fail(f"{page.relative_to(ROOT)}: JavaScript error at {width}px: {error[:160]}")

        driver.set_window_size(1440, 900)
        driver.get(f"http://127.0.0.1:{port}/index.html")
        driver.execute_async_script(
            "const done = arguments[0];"
            "document.fonts.ready.then(() => done(true));"
            "setTimeout(() => done(false), 4000);"
        )

        card_count = driver.execute_script("return document.querySelectorAll('#catalog .card').length")
        if card_count != len(designs):
            fail(f"index.html: rendered {card_count} cards, expected {len(designs)}")

        for category in sorted({design.category for design in designs}):
            expected = sum(1 for design in designs if design.category == category)
            visible = driver.execute_script(
                "const button = document.querySelector('.filters [data-filter=\"%s\"]');"
                "button.click();"
                "return Array.from(document.querySelectorAll('#catalog .card')).filter(card => !card.hidden).length;"
                % category
            )
            if visible != expected:
                fail(f"index.html: filter '{category}' shows {visible} cards, expected {expected}")

        driver.execute_script("document.querySelector('.filters [data-filter=\"all\"]').click();")
    finally:
        driver.quit()
        server.shutdown()
        server.server_close()

    return len(pages), loads


def main() -> int:
    parser = argparse.ArgumentParser(description="Check Landing Page Atlas designs.")
    parser.add_argument("--browser", action="store_true", help="also load every page in headless Firefox")
    args = parser.parse_args()

    designs = parse_designs()

    folders = sorted(path.name for path in DESIGNS.iterdir() if path.is_dir()) if DESIGNS.exists() else []
    for folder in folders:
        if not FOLDER_RE.match(folder):
            fail(f"designs/{folder}: folder name should look like 37-name")

    entry_folders = {design.folder for design in designs}
    for folder in folders:
        if folder not in entry_folders:
            fail(f"designs/{folder}: missing entry in script.js")
    for design in designs:
        folder = DESIGNS / design.folder
        if not folder.is_dir():
            fail(f"script.js: {design.folder} does not exist under designs/")
            continue
        for filename in ("index.html", "style.css", "script.js"):
            if not (folder / filename).exists():
                fail(f"designs/{design.folder}: missing {filename}")
        check_page(folder / "index.html", design=True)
        check_javascript(folder / "script.js")
        check_thumbnail(design.folder)

    thumbs = {path.stem for path in THUMBS.glob("*.webp")} if THUMBS.exists() else set()
    for thumb in sorted(thumbs - entry_folders):
        fail(f"assets/thumbs/{thumb}.webp: no matching design")

    check_gallery(designs)

    pages_checked = len(folders) + 1
    print("Landing Page Atlas — design checks")
    print()
    print("Static")
    print(f"  designs              {len(folders)}")
    print(f"  entries              {len(designs)}")
    print(f"  thumbnails           {len(thumbs)}")
    print(f"  pages checked        {pages_checked}")
    print(f"  JavaScript files     {len(folders)}")
    print()

    browser_pages = 0
    browser_loads = 0
    if args.browser:
        browser_pages, browser_loads = check_browser(designs)

    if failures:
        print("Failures")
        for message in failures:
            print(f"  FAIL  {message}")
        print()

    if warnings:
        print("Warnings")
        for message in warnings:
            print(f"  WARN  {message}")
        print()

    if args.browser and not failures:
        print("Browser")
        print(f"  pages                {browser_pages}")
        print(f"  loads                {browser_loads}")
        print("  console errors       0")
        print("  JavaScript errors    0")
        print("  horizontal overflow  0")
        print()

    if failures:
        print(f"{len(failures)} error{'s' if len(failures) != 1 else ''}.")
        return 1

    print("All checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
