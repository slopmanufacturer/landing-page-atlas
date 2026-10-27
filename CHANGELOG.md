# Changelog

All notable changes to Landing Page Atlas are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `robots.txt` and `sitemap.xml`, covering the gallery and all 45 designs.
- Canonical URLs on the gallery and every design page.
- Open Graph and Twitter card metadata on all 45 design pages, so a single
  page can be shared without falling back to a bare link.
- A static list of all 45 pages inside the gallery's `<noscript>` fallback.
- `CollectionPage` structured data for the catalogue.
- A GitHub Actions workflow that runs the static checks on every push and
  pull request.

### Changed

- The gallery is branded **Landing Page Atlas** throughout. The separate
  HTM / Designs name is retired.
- The repository moved to `vezeqs/landing-page-atlas`; every link and
  canonical URL now points at the new Pages address.

## [1.2.0] - 2026-10-27

### Added

- The Civic family: three new pages — Borrow (public library, Ancoats), Line
  Six (light rail, Calderford), and The Register (municipal archive, Leeds).
  The catalogue now holds 45 designs across eight families. Civic is a
  three-page family; the other seven have six pages each.
- Thumbnails, gallery entries, a Civic filter, and a palette card.

### Changed

- `assets/og.png` regenerated for forty-five studies. The volume remains
  Vol. 02.
- README, AGENTS.md, and CONTRIBUTING.md updated for 45 designs, eight
  families, and the next family block (`46`–`51`).

## [1.1.0] - 2026-10-27

### Added

- The Sport family: six new pages across bouldering, running, football,
  swimming, cycling, and boxing. The catalogue now holds 42 designs across
  seven families.
- `AGENTS.md`, covering the house rules, how to lift a design into a new
  project, how to add one back to the atlas, and the checks to run.
- `tools/check_designs.py`, a static checker with an optional Selenium and
  Firefox browser pass.
- `CHANGELOG.md`.

### Changed

- The gallery, README, and contributor guide now describe 42 designs and seven
  families.
- `assets/og.png` regenerated for forty-two studies. The volume remains
  Vol. 02.
- The README restructured for readability: shorter intro, family overview,
  collapsible full catalogue, usage, checks, structure, and release notes.
- `CONTRIBUTING.md` updated for the next family block, `43`–`48`.

### Fixed

- Added the missing `type="button"` to controls in Atelier Nord, Meridian, and
  Wave Pool.
- Fixed broken fragment links in The Sunday Review, Clay & Co., and Forge.
- Fixed horizontal overflow at 320 px in The Sunday Review and Press Room.

## [1.0.1] - 2026-10-26

### Fixed

- Pointed links and social cards at the published GitHub Pages site.

## [1.0.0] - 2026-10-26

### Added

- First tagged release: 36 hand-built landing pages across six families
  (Editorial, Interface, Luxury, Print, Minimal, Industrial).
- A gallery with family filters, one-click source copy, quick start, and FAQ.
- 720×540 WebP thumbnails for every design.
- MIT licence.

[Unreleased]: https://github.com/vezeqs/landing-page-atlas/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/vezeqs/landing-page-atlas/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/vezeqs/landing-page-atlas/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/vezeqs/landing-page-atlas/compare/v1.0...v1.0.1
[1.0.0]: https://github.com/vezeqs/landing-page-atlas/releases/tag/v1.0
