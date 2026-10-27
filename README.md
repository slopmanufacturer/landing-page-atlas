# HTM / Designs

[![Live site](https://img.shields.io/badge/live_site-view-151412?style=flat-square)](https://slopmanufacturer.github.io/htm-designs/)
[![Use this template](https://img.shields.io/badge/use_this_template-151412?style=flat-square)](https://github.com/slopmanufacturer/htm-designs/generate)
[![License: MIT](https://img.shields.io/badge/license-MIT-7d5b46?style=flat-square)](LICENSE)
[![No dependencies](https://img.shields.io/badge/dependencies-0-e8ff00?style=flat-square)](#)

Six hand-built landing pages. Plain HTML, CSS, and JavaScript — no frameworks, no templates, no shared stylesheet.

[![HTM / Designs — six hand-built landing pages](assets/og.png)](https://slopmanufacturer.github.io/htm-designs/)

**Live site:** <https://slopmanufacturer.github.io/htm-designs/>

Open the live site, or [`index.html`](index.html) locally, to browse the collection, read the FAQ, and grab the quick start.

## The designs

| # | Design | Direction | What makes it different |
|---|--------|-----------|--------------------------|
| 01 | [Atelier Nord](designs/01-atelier-nord/index.html) | Swiss editorial / architecture | Asymmetric 12-column grid, oversized grotesque type, cursor-following project previews, native-dialog case studies |
| 02 | [Meridian](designs/02-meridian/index.html) | Observatory terminal | Pointer-reactive canvas star chart, live UTC clock, typed boot sequence, survey-field targeting |
| 03 | [Maison Noir](designs/03-maison-noir/index.html) | Art deco perfume | Oxblood, ivory, and gold; a custom SVG flacon; rotating sunburst; pointer-tilt parallax; reservation dialog |
| 04 | [Wave Pool](designs/04-wave-pool/index.html) | Risograph festival | Halftone and misregistration, draggable stickers, day-tab lineup, generated ticket with barcode |
| 05 | [Kōan](designs/05-koan/index.html) | Kyoto tea room | Vertical Japanese type, hand-drawn animated enso, four-season menu switcher, one-minute breathing timer |
| 06 | [Hydra Works](designs/06-hydra-works/index.html) | Industrial synth datasheet | Hazard-yellow technical layout, draggable and keyboard-operable knobs, live oscilloscope, order proforma |

## Quick start

No build step, no package manager, no dependencies. Open `index.html` directly, or serve the folder:

```sh
git clone https://github.com/slopmanufacturer/htm-designs.git
cd htm-designs
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Use this template

The repository is a GitHub template. Click **Use this template** above to get your own copy, or clone it and start deleting the rooms you do not need.

- Each folder under `designs/` is self-contained.
- Every design has its own `style.css` and `script.js`.
- Nothing is shared between pages except the decision to keep them different.
- MIT licensed: personal and commercial use, modification, and redistribution are fine.

## What's inside

- Six complete landing pages, each with its own layout, type, palette, and interactions
- A gallery / landing page with a palette index, quick start, and FAQ
- No frameworks, no bundlers, no analytics, no cookies
- Responsive at 1440, 768, 390, and 320 px
- Keyboard-operable controls, labelled forms, and `prefers-reduced-motion` support
- Google Fonts with system fallbacks

## Structure

```text
.
├── index.html              # Showcase landing page + gallery + FAQ
├── style.css               # Showcase only
├── script.js               # Copy button + FAQ fallback
├── assets/
│   ├── favicon.svg
│   └── og.png              # Social preview
├── designs/
│   ├── 01-atelier-nord/    # index.html, style.css, script.js
│   ├── 02-meridian/
│   ├── 03-maison-noir/
│   ├── 04-wave-pool/
│   ├── 05-koan/
│   └── 06-hydra-works/
├── LICENSE
└── README.md
```

## License

[MIT](LICENSE). The brands, people, products, and addresses inside the designs are fictional.
