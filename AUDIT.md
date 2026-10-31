# Audit — 2026-10-31

Scope: the catalogue, all 60 designs, `tools/check_designs.py`, README, AGENTS.md,
CONTRIBUTING.md.

Baseline before any change:

```
$ python3 tools/check_designs.py
  designs              60
  entries              60
  thumbnails           60
  pages checked        61
  sitemap urls         61
All checks passed.

$ python3 tools/check_designs.py --browser
  pages                61
  loads                244
  console errors       0
  JavaScript errors    0
  horizontal overflow  0
All checks passed.
```

| # | Finding | Severity | Status |
| --- | --- | --- | --- |
| F1 | "Update the counts in … CONTRIBUTING.md" — that file has no count | Low | fixed |

## F1 — The add-a-design checklist names the wrong file (Low)

**Claim:** AGENTS.md step 7: "Update the counts in `index.html`, `README.md`,
and `CONTRIBUTING.md` if the total changes."
**Evidence:** `grep -c '\b60\b'` gives `index.html` 13, `README.md` 8,
`AGENTS.md` 2, `CONTRIBUTING.md` 0. Following the step leads to a file with
nothing to update, while the file that does carry the total — AGENTS.md's own
"60 self-contained landing pages" — is not named.
**Cause:** the checklist was written before CONTRIBUTING.md lost its count.
**Fix:** the step names `AGENTS.md` instead of `CONTRIBUTING.md`.
**Status:** fixed.

## Verified, no finding

- 60 design folders, each with `index.html`, `style.css`, `script.js`; 60
  gallery entries; 60 thumbnails; 61 sitemap URLs (gallery plus 60 pages).
- Browser pass: 244 loads at 1440, 768, 390, and 320 px, with no console
  errors, no JavaScript errors, and no horizontal overflow.
- Every design stylesheet contains a `prefers-reduced-motion` block.
- No analytics, trackers, cookies, CDN scripts, or third-party scripts. The
  only matches for those words are prose saying they are absent.
- No broken in-page `href="#…"` targets and no duplicate `id` attributes across
  all 60 pages (checked separately; the bundled checker does not cover this).
- README, `index.html`, and AGENTS.md all state 60 pages across ten families,
  six per family, and the gallery data has exactly six entries per family.

## Outside the repository

The GitHub repository description still reads "57 hand-built landing pages
across ten families". The repository holds 60. It is not changed here: editing
repository metadata is a remote-visible action that needs its own approval.
