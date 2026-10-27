# AGENTS.md

Operating instructions for AI coding agents working with Landing Page Atlas.
Read this before you copy a design or add one.

## What this repository is

Landing Page Atlas is a catalogue of 45 self-contained landing pages across
eight families. Seven families have six pages; Civic has three. Each design
lives in its own folder under `designs/` and contains exactly three files:
`index.html`, `style.css`, and `script.js`.

The gallery at the repository root (`index.html`, `style.css`, `script.js`) is
a catalogue. It is not a dependency. Every design folder works on its own,
with no build step, no package manager, and no shared stylesheet.

## House rules

- Plain HTML, CSS, and JavaScript. No frameworks, bundlers, package managers,
  or build steps.
- No trackers, cookies, analytics, or third-party scripts. Google Fonts are
  allowed, with system fallbacks.
- One folder per design, with its own `index.html`, `style.css`, and
  `script.js`. Do not introduce a shared stylesheet.
- Fictional brands, people, addresses, and emails only. Do not use a real
  company's name, logo, or copy.
- Semantic HTML, one `<h1>` per page, labelled form controls, explicit
  `type` on every `<button>`, and a working skip link.
- Respect `prefers-reduced-motion`. Interactive controls must work with a
  keyboard.
- Responsive at 1440, 768, 390, and 320 px. Nothing should scroll sideways.
- Keep each page self-contained. If a design needs a library, it does not
  belong here.

## Take one design into a new project

1. Pick a folder under `designs/`. Read its `index.html` and `style.css`
   before changing anything.
2. Copy the whole folder, not just `index.html`. The three files belong
   together.
3. Open `index.html`. Replace the `<title>`, the meta description, the
   `theme-color`, and the Google Fonts `<link>` if the project uses different
   fonts.
4. Open `style.css`. Change the tokens at the top (`:root`) first: colours,
   font stacks, spacing. Then rewrite the rules that depend on them.
5. Replace the copy, brand name, addresses, emails, and prices. Keep it
   specific. Fictional is fine; generic is not.
6. Remove the footer link to `../../index.html`. It points at the gallery and
   will break in a new project.
7. Check relative paths. Designs do not use images, but if you add some, keep
   them inside the folder and reference them relatively.
8. Remove sections you do not need. If you remove a section, remove any
   `href="#..."` links to it and the JavaScript that targets it.
9. Keep `script.js` only if the page still uses the interaction. If you
   remove the markup, remove the matching code.
10. Serve the folder (`python3 -m http.server 8000`) and test at 1440, 768,
    390, and 320 px. Tab through every control.

### Keep

- The skip link.
- The `:root` token block.
- The `:focus-visible` styles.
- The `prefers-reduced-motion` block.
- Form labels and status elements (`role="status"` or `aria-live`).

### Common mistakes

- Copying only `index.html` and losing the stylesheet or script.
- Leaving the `../../index.html` backlink in a new project.
- Renaming an `id` or class without updating the JavaScript that selects it.
- Removing a form but leaving code that queries it.
- Adding a framework, a bundler, or a build step.
- Using a real brand, a stock photo, or lorem ipsum.
- Fixing a layout by hiding overflow instead of fixing the element that
  overflows.

## Add a design to the atlas

1. Use the next free two-digit number: `designs/46-your-name/`. A new family
   takes the next block of six (`46`–`51`).
2. Create `index.html`, `style.css`, and `script.js` in that folder. Follow
   the house rules and the quality bar below.
3. Add a 720×540 WebP thumbnail to `assets/thumbs/<folder>.webp`, under
   120 KB. The file name must match the folder name exactly.
4. Add an entry to the `designs` array in `script.js`:

   ```js
   { folder: "46-your-name", title: "Your Name", cat: "family", tags: "Family · What it is", accent: "#c2410c" },
   ```

5. If it is a new family, add a filter button and a palette card in
   `index.html`, and a row in the README table.
6. Update the counts in `index.html`, `README.md`, and `CONTRIBUTING.md` if
   the total changes.
7. Run both checks:

   ```sh
   python3 tools/check_designs.py
   python3 tools/check_designs.py --browser
   ```

## Thumbnails

- 720×540, WebP, under about 120 KB.
- Screenshot the top of the page at 1440×1080, then scale it to 50%.
- A hero capture reads better at card size than a full-page screenshot.
- Name the file after the folder: `assets/thumbs/37-crux.webp`.

## Quality bar

- One specific idea per page. Not a generic SaaS hero with the nouns swapped.
- Real copy: names, times, prices, addresses, opening hours. Fictional is
  fine; generic is not.
- A distinct type pairing and palette. No two pages share a stylesheet.
- Art from CSS and inline SVG. No stock photos, no external images.
- No lorem ipsum, no placeholder testimonials, no emoji.
- Interactions must earn their place: a grade filter, a pace calculator, a
  timetable, a route selector. Not a carousel for its own sake.

## Verification

```sh
python3 tools/check_designs.py
python3 tools/check_designs.py --browser
```

The static pass checks folder structure, gallery entries, thumbnails, HTML
basics, local links, form labels, button types, and JavaScript syntax. It
needs only Python 3.9+.

The browser pass needs Selenium and geckodriver. It loads the gallery and all
45 pages at 1440, 768, 390, and 320 px inside a same-origin frame, checks for
horizontal overflow and JavaScript errors, and confirms the gallery filters.

Manual checks before a pull request:

- Open the gallery, filter to the family, and open every page.
- Resize to 320 px. Nothing should scroll sideways.
- Tab through each page. Every control should be reachable and visible.
- Check the browser console.

## Definition of done

- [ ] The folder has `index.html`, `style.css`, and `script.js`.
- [ ] The page loads at 1440, 768, 390, and 320 px with no horizontal overflow.
- [ ] No console errors and no JavaScript errors.
- [ ] One `<h1>`, labelled controls, explicit button types, skip link, and
      `prefers-reduced-motion`.
- [ ] A 720×540 WebP thumbnail under 120 KB.
- [ ] An entry in `script.js`, plus a filter and palette card if it is a new
      family.
- [ ] The README table and counts are up to date.
- [ ] Both checks pass.
- [ ] No real brands, trackers, dependencies, or build steps.

## Working in this repository

- Run the checks before you finish. Do not report a design as done if the
  browser pass fails.
- Do not reformat unrelated files or rewrite pages you were not asked to
  touch.
- Do not change the licence. The code is MIT; keep the copyright notice when
  you redistribute a page.
- Do not commit generated screenshots beyond the six thumbnails a family
  needs.
- If a check fails, fix the cause. Do not suppress the check.
