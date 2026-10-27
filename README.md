# HTM / Designs

Six hand-built landing pages. Plain HTML, CSS, and JavaScript — no frameworks, no templates, no shared stylesheet.

**Open [`index.html`](index.html) to browse the collection.**

## The designs

| # | Design | Direction | What makes it different |
|---|--------|-----------|--------------------------|
| 01 | [Atelier Nord](designs/01-atelier-nord/index.html) | Swiss editorial / architecture | Asymmetric 12-column grid, oversized grotesque type, cursor-following project previews, native-dialog case studies |
| 02 | [Meridian](designs/02-meridian/index.html) | Observatory terminal | Pointer-reactive canvas star chart, live UTC clock, typed boot sequence, survey-field targeting |
| 03 | [Maison Noir](designs/03-maison-noir/index.html) | Art deco perfume | Oxblood, ivory, and gold; a custom SVG flacon; rotating sunburst; pointer-tilt parallax; reservation dialog |
| 04 | [Wave Pool](designs/04-wave-pool/index.html) | Risograph festival | Halftone and misregistration, draggable stickers, day-tab lineup, generated ticket with barcode |
| 05 | [Kōan](designs/05-koan/index.html) | Kyoto tea room | Vertical Japanese type, hand-drawn animated enso, four-season menu switcher, one-minute breathing timer |
| 06 | [Hydra Works](designs/06-hydra-works/index.html) | Industrial synth datasheet | Hazard-yellow technical layout, draggable and keyboard-operable knobs, live oscilloscope, order proforma |

## Running locally

There is no build step and no dependency to install. Open `index.html` directly, or serve the folder:

```sh
python3 -m http.server 8000
```

Then visit <http://localhost:8000>.

## Structure

```text
.
├── index.html              # Gallery / specimen room
├── style.css               # Gallery only
├── designs/
│   ├── 01-atelier-nord/    # index.html, style.css, script.js
│   ├── 02-meridian/
│   ├── 03-maison-noir/
│   ├── 04-wave-pool/
│   ├── 05-koan/
│   └── 06-hydra-works/
└── README.md
```

Every design folder is self-contained. Nothing is shared between pages except the decision to keep them different.

## Notes

- Each page uses Google Fonts with system fallbacks, so it still works offline after the fonts fail.
- All interactions are vanilla JavaScript. No libraries, no bundlers, no analytics.
- Motion is reduced automatically under `prefers-reduced-motion`.
- The brands, people, products, and addresses are fictional.
