const projects = {
  fjellstue: {
    index: "01",
    title: "Fjellstue",
    meta: "Cultural · Hemsedal, NO · 2025",
    text:
      "A timber refuge folded into the ridge above Hemsedal. The building is two rooms and a long bench: one room faces the valley, the other faces the fire. The roof is planted with the moss that was lifted from the site, and the exterior is untreated pine that will silver within three winters.",
    facts: [
      ["Program", "Lodge / cultural"],
      ["Area", "640 m²"],
      ["Completed", "2025"],
      ["Structure", "CLT + pine"],
    ],
    art: `
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="380" fill="#1c1c1a"/>
        <circle cx="212" cy="112" r="54" fill="#e1340f"/>
        <path d="M0 292 L84 196 L146 258 L208 202 L300 292 V380 H0 Z" fill="#f0ede6"/>
        <path d="M0 292 L84 196 L146 258 L208 202 L300 292" fill="none" stroke="#1c1c1a" stroke-width="2"/>
        <rect x="30" y="304" width="240" height="4" fill="#1c1c1a"/>
        <g fill="#1c1c1a">
          <rect x="58" y="318" width="42" height="2"/>
          <rect x="58" y="330" width="66" height="2"/>
          <rect x="58" y="342" width="30" height="2"/>
        </g>
        <text x="30" y="364" fill="#8b877c" font-family="Archivo, sans-serif" font-size="7" letter-spacing="1.4">FJELLSTUE / 2025</text>
      </svg>`,
  },
  brygge: {
    index: "02",
    title: "Brygge 7",
    meta: "Housing · Bergen, NO · 2024",
    text:
      "Seven gabled volumes on a working quay, arranged so that every apartment sees water and every courtyard sees sky. The lower floor is left to the harbour: workshops, a bakery, and a covered passage that stays open when the weather does not.",
    facts: [
      ["Program", "Housing / mixed use"],
      ["Area", "2,800 m²"],
      ["Completed", "2024"],
      ["Units", "24"],
    ],
    art: `
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="380" fill="#ded7c8"/>
        <circle cx="246" cy="82" r="34" fill="#e1340f"/>
        <g fill="#1c1c1a">
          <path d="M16 210 L52 176 L88 210 V300 H16 Z"/>
          <path d="M96 196 L134 158 L172 196 V300 H96 Z"/>
          <path d="M180 214 L214 182 L248 214 V300 H180 Z"/>
          <path d="M254 224 L282 198 L300 214 V300 H254 Z"/>
        </g>
        <g fill="#ded7c8">
          <rect x="32" y="232" width="10" height="16"/>
          <rect x="52" y="232" width="10" height="16"/>
          <rect x="32" y="260" width="10" height="16"/>
          <rect x="52" y="260" width="10" height="16"/>
          <rect x="112" y="220" width="12" height="18"/>
          <rect x="138" y="220" width="12" height="18"/>
          <rect x="112" y="252" width="12" height="18"/>
          <rect x="138" y="252" width="12" height="18"/>
          <rect x="196" y="238" width="10" height="16"/>
          <rect x="216" y="238" width="10" height="16"/>
        </g>
        <rect y="300" width="300" height="80" fill="#6f7f86"/>
        <g stroke="#ded7c8" stroke-width="1" opacity=".45">
          <line x1="0" y1="318" x2="300" y2="318"/>
          <line x1="0" y1="338" x2="300" y2="338"/>
          <line x1="0" y1="358" x2="300" y2="358"/>
        </g>
        <text x="16" y="370" fill="#ded7c8" font-family="Archivo, sans-serif" font-size="7" letter-spacing="1.4">BRYGGE 7 / 2024</text>
      </svg>`,
  },
  nordlys: {
    index: "03",
    title: "Nordlys Pavilion",
    meta: "Pavilion · Tromsø, NO · 2026",
    text:
      "A glass room for watching the sky, set into a bowl of dark stone. There is no heating and no programme beyond sitting. The roof is a single sheet of laminated glass; the walls are polished black concrete that holds the last light long after the sun has gone.",
    facts: [
      ["Program", "Observation pavilion"],
      ["Area", "180 m²"],
      ["Completed", "2026"],
      ["Status", "On site"],
    ],
    art: `
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="380" fill="#0d1620"/>
        <g fill="#fff">
          <circle cx="42" cy="58" r="1.2"/><circle cx="86" cy="36" r="1"/><circle cx="132" cy="72" r="1.4"/>
          <circle cx="188" cy="44" r="1"/><circle cx="244" cy="70" r="1.3"/><circle cx="268" cy="32" r="1"/>
          <circle cx="66" cy="118" r="1"/><circle cx="214" cy="128" r="1.2"/><circle cx="118" cy="112" r="0.9"/>
        </g>
        <g fill="none" stroke="#a8e6c1" stroke-linecap="round">
          <path d="M-20 232 C 58 96, 150 96, 228 232" stroke-width="2.4" opacity=".85"/>
          <path d="M-20 256 C 66 132, 158 132, 244 256" stroke-width="1.4" opacity=".55"/>
          <path d="M-20 280 C 74 168, 166 168, 260 280" stroke-width="1" opacity=".32"/>
        </g>
        <rect x="58" y="262" width="184" height="3" fill="#e6dfcf"/>
        <rect x="72" y="265" width="2" height="52" fill="#e6dfcf" opacity=".7"/>
        <rect x="226" y="265" width="2" height="52" fill="#e6dfcf" opacity=".7"/>
        <rect x="58" y="316" width="184" height="1" fill="#e6dfcf" opacity=".4"/>
        <text x="58" y="350" fill="#7f8b8c" font-family="Archivo, sans-serif" font-size="7" letter-spacing="1.4">NORDLYS / 2026</text>
      </svg>`,
  },
  sanden: {
    index: "04",
    title: "Sanden School",
    meta: "Education · Stavanger, NO · 2022",
    text:
      "A school that opens like a book. The classrooms sit behind a deep timber colonnade, and the central hall can be a canteen, a theatre, or a place to wait out a rain shower. The brick is the colour of the old town, but the building is entirely new.",
    facts: [
      ["Program", "Primary school"],
      ["Area", "4,100 m²"],
      ["Completed", "2022"],
      ["Capacity", "420 pupils"],
    ],
    art: `
      <svg viewBox="0 0 300 380" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="380" fill="#c98f2e"/>
        <rect x="26" y="62" width="248" height="252" fill="#f0ede6"/>
        <g stroke="#1c1c1a" stroke-width="1.5">
          <line x1="26" y1="62" x2="274" y2="62"/>
          <line x1="26" y1="125" x2="274" y2="125"/>
          <line x1="26" y1="188" x2="274" y2="188"/>
          <line x1="26" y1="251" x2="274" y2="251"/>
          <line x1="88" y1="62" x2="88" y2="314"/>
          <line x1="150" y1="62" x2="150" y2="314"/>
          <line x1="212" y1="62" x2="212" y2="314"/>
        </g>
        <rect x="26" y="62" width="62" height="63" fill="#e1340f"/>
        <rect x="150" y="188" width="62" height="63" fill="#1c1c1a"/>
        <g fill="#1c1c1a">
          <rect x="100" y="136" width="34" height="3"/>
          <rect x="100" y="146" width="24" height="3"/>
          <rect x="224" y="74" width="38" height="3"/>
          <rect x="224" y="84" width="28" height="3"/>
        </g>
        <rect y="314" width="300" height="66" fill="#1c1c1a"/>
        <text x="26" y="352" fill="#c98f2e" font-family="Archivo, sans-serif" font-size="7" letter-spacing="1.4">SANDEN SKOLE / 2022</text>
      </svg>`,
  },
};

const preview = document.querySelector(".cursor-preview");
const previewInner = document.querySelector(".cursor-preview__inner");
const dialog = document.querySelector("#project-dialog");
const dialogIndex = document.querySelector("#dialog-index");
const dialogTitle = document.querySelector("#dialog-title");
const dialogMeta = document.querySelector("#dialog-meta");
const dialogText = document.querySelector("#dialog-text");
const dialogFacts = document.querySelector("#dialog-facts");
const dialogArt = document.querySelector("#dialog-art");
const closeButton = document.querySelector(".dialog__close");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let activeProject = null;

function renderPreview(key) {
  if (!previewInner || activeProject === key) return;
  activeProject = key;
  previewInner.innerHTML = projects[key].art;
}

function showPreview(key, x, y) {
  if (!preview || window.matchMedia("(hover: none)").matches) return;
  renderPreview(key);
  targetX = x;
  targetY = y;
  if (reduceMotion.matches) {
    currentX = x;
    currentY = y;
    preview.style.left = `${x}px`;
    preview.style.top = `${y}px`;
  }
  preview.classList.add("is-visible");
}

function hidePreview() {
  preview?.classList.remove("is-visible");
}

function animatePreview() {
  currentX += (targetX - currentX) * 0.16;
  currentY += (targetY - currentY) * 0.16;
  if (preview) {
    preview.style.left = `${currentX}px`;
    preview.style.top = `${currentY}px`;
  }
  requestAnimationFrame(animatePreview);
}

document.querySelectorAll(".project").forEach((button) => {
  const key = button.dataset.project;

  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType === "mouse") {
      showPreview(key, event.clientX, event.clientY);
    }
  });

  button.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse") {
      targetX = event.clientX;
      targetY = event.clientY;
    }
  });

  button.addEventListener("pointerleave", hidePreview);

  button.addEventListener("focus", () => {
    const rect = button.getBoundingClientRect();
    showPreview(key, rect.right - 140, rect.top + rect.height / 2);
  });

  button.addEventListener("blur", hidePreview);

  button.addEventListener("click", () => {
    const project = projects[key];
    dialogIndex.textContent = `${project.index} — Selected work`;
    dialogTitle.textContent = project.title;
    dialogMeta.textContent = project.meta;
    dialogText.textContent = project.text;
    dialogArt.innerHTML = project.art;
    dialogFacts.innerHTML = project.facts
      .map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`)
      .join("");
    hidePreview();
    dialog.showModal();
  });
});

closeButton?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

function updateClock() {
  const now = new Date();
  const clock = document.querySelector("#clock");
  const year = document.querySelector("#year");
  if (clock) {
    clock.textContent = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Oslo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(now);
    clock.dateTime = now.toISOString();
  }
  if (year) year.textContent = now.getFullYear();
}

updateClock();
setInterval(updateClock, 1000);

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}

animatePreview();
