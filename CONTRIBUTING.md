# Contributing

The atlas grows by families. A family is six pages that share a mood and solve
six different problems. One-off pages are welcome too, but six is the unit that
keeps the catalogue balanced.

## What fits

- A new family of six pages, numbered `37-…` and up, six folders in a row.
- A fix to an existing page: a layout that breaks at 320 px, a control that is
  not keyboard-operable, a contrast problem.
- A new thumbnail when a page changes enough to look different.

## The rules

- Plain HTML, CSS, and JavaScript. No frameworks, no bundlers, no package
  manager, no build step.
- No trackers, no cookies, no third-party scripts. Google Fonts are allowed,
  with system fallbacks.
- One folder per page under `designs/`, containing `index.html`, `style.css`,
  and `script.js`. No shared stylesheet.
- Responsive at 1440, 768, 390, and 320 px.
- Semantic HTML, labelled form controls, keyboard-operable interactive
  elements, `prefers-reduced-motion` respected.
- Fictional brands only. Do not use a real company's name, logo, or copy.

## Adding a family

1. Read an existing family first. `designs/01-atelier-nord` through
   `designs/11-long-table` are the editorial set, and they show the range.
2. Create six folders: `designs/37-your-name` … `designs/42-your-name`.
3. Give each one its own `index.html`, `style.css`, and `script.js`.
4. Add a 720×540 WebP screenshot to `assets/thumbs/37-your-name.webp` for each
   page. The file name must match the folder name.
5. Add six entries to the `designs` array in `script.js`:

   ```js
   { folder: "37-your-name", title: "Your Name", cat: "your-family", tags: "Your family · What it is", accent: "#c2410c" },
   ```

6. Add a filter button in `index.html` next to the existing ones, and a palette
   card if the family has its own palette.
7. Add the family to the table in `README.md` with a one-line description.

## Checks before a pull request

```sh
python3 -m http.server 8000
```

- Open the gallery, filter to your family, and open all six pages.
- Resize to 320 px. Nothing should scroll sideways.
- Tab through each page. Every control should be reachable and visible.
- Check the browser console for errors.

There is no test suite. The gallery is the test: if the card loads, the
thumbnail exists, and the page opens, you are most of the way there.

## Thumbnails

720×540, WebP, under about 120 KB. Screenshot the top of the page at 1440 px
wide, then scale it down. Keep the composition readable at card size; a
screenshot of a hero section works better than a full-page capture.

## Pull requests

- One family or one fix per PR.
- Say what you changed and why in the description.
- If you are adding a family, include the six thumbnails.

MIT licensed. By contributing, you agree to license your work the same way.
