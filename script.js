const designs = [
  { folder: "01-atelier-nord", title: "Atelier Nord", cat: "editorial", tags: "Editorial · Architecture", accent: "#e1340f" },
  { folder: "02-meridian", title: "Meridian", cat: "interface", tags: "Interface · Observatory", accent: "#5f8f55" },
  { folder: "03-maison-noir", title: "Maison Noir", cat: "luxury", tags: "Luxury · Art deco", accent: "#a9823f" },
  { folder: "04-wave-pool", title: "Wave Pool", cat: "print", tags: "Print · Festival", accent: "#ff3f7f" },
  { folder: "05-koan", title: "Kōan", cat: "minimal", tags: "Minimal · Tea room", accent: "#5c6b52" },
  { folder: "06-hydra-works", title: "Hydra Works", cat: "industrial", tags: "Industrial · Product", accent: "#8a9700" },
  { folder: "07-sunday-review", title: "The Sunday Review", cat: "editorial", tags: "Editorial · Newspaper", accent: "#b3261e" },
  { folder: "08-marrow", title: "Marrow", cat: "editorial", tags: "Editorial · Literary journal", accent: "#a65a3a" },
  { folder: "09-biennale-04", title: "Biennale 04", cat: "editorial", tags: "Editorial · Art biennale", accent: "#ff4d00" },
  { folder: "10-field-notes", title: "Field Notes", cat: "editorial", tags: "Editorial · Travel journal", accent: "#b5532f" },
  { folder: "11-long-table", title: "The Long Table", cat: "editorial", tags: "Editorial · Food magazine", accent: "#d63b2f" },
  { folder: "12-aster", title: "Aster", cat: "interface", tags: "Interface · Satellite ops", accent: "#6ff2ff" },
  { folder: "13-tidewatch", title: "Tidewatch", cat: "interface", tags: "Interface · Ocean data", accent: "#9ff5d6" },
  { folder: "14-signal", title: "Signal 88.4", cat: "interface", tags: "Interface · Radio", accent: "#ff5c1a" },
  { folder: "15-grid", title: "Grid", cat: "interface", tags: "Interface · Power network", accent: "#f5d90a" },
  { folder: "16-relay", title: "Relay", cat: "interface", tags: "Interface · Mesh network", accent: "#d8ff5e" },
  { folder: "17-aurelia", title: "Aurelia", cat: "luxury", tags: "Luxury · High jewellery", accent: "#c9a227" },
  { folder: "18-hotel-cendres", title: "Hôtel Cendres", cat: "luxury", tags: "Luxury · Hotel", accent: "#a8895e" },
  { folder: "19-vantage", title: "Vantage", cat: "luxury", tags: "Luxury · Watchmaker", accent: "#d97b29" },
  { folder: "20-cuvee-9", title: "Cuvée 9", cat: "luxury", tags: "Luxury · Champagne", accent: "#b88a3e" },
  { folder: "21-atelier-lune", title: "Atelier Lune", cat: "luxury", tags: "Luxury · Couture", accent: "#e8c987" },
  { folder: "22-static-club", title: "Static Club", cat: "print", tags: "Print · Record label", accent: "#c8ff00" },
  { folder: "23-dog-ear-books", title: "Dog Ear Books", cat: "print", tags: "Print · Bookshop", accent: "#d23b2e" },
  { folder: "24-kickflip", title: "Kickflip", cat: "print", tags: "Print · Skate shop", accent: "#e63322" },
  { folder: "25-laugh-track", title: "Laugh Track", cat: "print", tags: "Print · Comedy festival", accent: "#5b2bd9" },
  { folder: "26-press-room", title: "Press Room", cat: "print", tags: "Print · Print fair", accent: "#ff4f9a" },
  { folder: "27-clay-and-co", title: "Clay &amp; Co.", cat: "minimal", tags: "Minimal · Ceramics", accent: "#b45f3f" },
  { folder: "28-still", title: "Still", cat: "minimal", tags: "Minimal · Meditation", accent: "#7f9c8f" },
  { folder: "29-northbound", title: "Northbound", cat: "minimal", tags: "Minimal · Furniture", accent: "#c89a5b" },
  { folder: "30-soma", title: "Sōma", cat: "minimal", tags: "Minimal · Coffee", accent: "#b5532f" },
  { folder: "31-quiet-room", title: "The Quiet Room", cat: "minimal", tags: "Minimal · Gallery", accent: "#6f6b63" },
  { folder: "32-forge", title: "Forge", cat: "industrial", tags: "Industrial · Tools", accent: "#ff6b1a" },
  { folder: "33-apex", title: "Apex", cat: "industrial", tags: "Industrial · Motorcycle", accent: "#e63322" },
  { folder: "34-bolt", title: "Bolt", cat: "industrial", tags: "Industrial · Hardware", accent: "#ff6a00" },
  { folder: "35-tape-deck", title: "Tape Deck", cat: "industrial", tags: "Industrial · Audio", accent: "#ff6b1a" },
  { folder: "36-foundry", title: "Foundry", cat: "industrial", tags: "Industrial · Type", accent: "#e23b2e" },
  { folder: "37-crux", title: "Crux", cat: "sport", tags: "Sport · Bouldering", accent: "#f2c200" },
  { folder: "38-negative-split", title: "Negative Split", cat: "sport", tags: "Sport · Running club", accent: "#d7ff3f" },
  { folder: "39-the-borough", title: "The Borough", cat: "sport", tags: "Sport · Football club", accent: "#1f5c3a" },
  { folder: "40-lane-four", title: "Lane Four", cat: "sport", tags: "Sport · Swim club", accent: "#0e5a7a" },
  { folder: "41-cadence", title: "Cadence", cat: "sport", tags: "Sport · Cycling club", accent: "#ff5a1f" },
  { folder: "42-southpaw", title: "Southpaw", cat: "sport", tags: "Sport · Boxing gym", accent: "#7a1f1f" },
];

const catalog = document.querySelector("#catalog");
const count = document.querySelector("#catalog-count");
const filterButtons = Array.from(document.querySelectorAll(".filters [data-filter]"));
const paletteLinks = Array.from(document.querySelectorAll(".palettes [data-filter]"));
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let activeFilter = "all";

if (catalog) {
  catalog.innerHTML = designs
    .map((design, index) => {
      const num = String(index + 1).padStart(2, "0");
      return `<article class="card" data-category="${design.cat}" style="--accent: ${design.accent}">
        <a class="card__link" href="designs/${design.folder}/index.html">
          <div class="card__art"><img src="assets/thumbs/${design.folder}.webp" alt="Screenshot of the ${design.title} landing page" loading="lazy" width="720" height="540"></div>
          <div class="card__meta">
            <span class="card__num">${num}</span>
            <h2>${design.title}</h2>
            <span class="card__tags">${design.tags}</span>
            <span class="card__arrow" aria-hidden="true">↗</span>
          </div>
        </a>
        <button class="card__copy" type="button" data-copy-src="designs/${design.folder}/index.html" aria-label="Copy the HTML source of ${design.title}">Copy HTML</button>
      </article>`;
    })
    .join("");

  const cards = Array.from(catalog.querySelectorAll(".card"));

  function applyFilter(filter, scroll) {
    activeFilter = filter;
    let visible = 0;

    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visible += 1;
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (count) count.textContent = String(visible);
    if (scroll) {
      document.querySelector("#designs")?.scrollIntoView({
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button.dataset.filter, false));
  });

  paletteLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      applyFilter(link.dataset.filter, true);
    });
  });

  applyFilter("all", false);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } finally {
      area.remove();
    }
    return copied;
  }
}

function flash(button, label) {
  if (!button.dataset.label) button.dataset.label = button.textContent;
  button.textContent = label;
  button.classList.toggle("is-copied", label === "Copied");

  clearTimeout(button._flash);
  button._flash = setTimeout(() => {
    button.textContent = button.dataset.label;
    button.classList.remove("is-copied");
  }, 1600);
}

const copyButton = document.querySelector("[data-copy]");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const copied = await copyText(copyButton.dataset.copy || "");
    flash(copyButton, copied ? "Copied" : "Copy failed");
  });
}

if (catalog) {
  catalog.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-src]");
    if (!button) return;

    event.preventDefault();
    button.disabled = true;
    try {
      const response = await fetch(button.dataset.copySrc);
      if (!response.ok) throw new Error(String(response.status));
      const copied = await copyText(await response.text());
      flash(button, copied ? "Copied" : "Copy failed");
    } catch {
      flash(button, "Copy failed");
    } finally {
      button.disabled = false;
    }
  });
}

const faqItems = Array.from(document.querySelectorAll(".faq__item"));

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
