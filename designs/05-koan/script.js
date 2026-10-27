const seasons = {
  spring: {
    accent: "#b75d6a",
    line: "The garden is waking.",
    note:
      "Spring is a lesson in restraint: the first pick, the first warmth, the first day you can leave the door open.",
    tea: [
      {
        name: "Hatsukaze",
        jp: "first wind",
        price: "¥900",
        desc: "Shincha, brewed soft. Grass, cream, a little rain.",
      },
      {
        name: "Sakura-bancha",
        jp: "cherry stem",
        price: "¥1,000",
        desc: "Roasted stems and salted cherry leaf. Pink in the cup.",
      },
      {
        name: "Yuzu-kōcha",
        jp: "citrus black",
        price: "¥1,100",
        desc: "Black tea, winter yuzu peel, a thread of honey.",
      },
    ],
    sweets: [
      {
        name: "Shiro-an wagashi",
        jp: "white bean",
        price: "¥600",
        desc: "White bean paste, salted cherry leaf, one blossom.",
      },
      {
        name: "Warabi mochi",
        jp: "bracken",
        price: "¥650",
        desc: "Bracken starch, kinako, cold in the middle.",
      },
    ],
  },
  summer: {
    accent: "#4f7c6a",
    line: "The garden is loud.",
    note:
      "Summer is not subtle. We answer with cold water, shade, and the sound of a knife through ice.",
    tea: [
      {
        name: "Mizudashi sencha",
        jp: "cold-brewed",
        price: "¥900",
        desc: "Green tea steeped overnight in cold water. Cucumber, melon, shade.",
      },
      {
        name: "Hōjicha on ice",
        jp: "roasted, chilled",
        price: "¥950",
        desc: "Roasted stems, chilled. Toasted barley and a clean finish.",
      },
      {
        name: "Ume kombucha",
        jp: "plum ferment",
        price: "¥1,000",
        desc: "Plum, fermented tea, a little salt. Sharp and alive.",
      },
    ],
    sweets: [
      {
        name: "Kuzukiri",
        jp: "arrowroot",
        price: "¥650",
        desc: "Arrowroot noodles in black sugar syrup. Slippery, cold.",
      },
      {
        name: "Uji shaved ice",
        jp: "matcha",
        price: "¥750",
        desc: "Matcha, condensed milk, a bowl of cold air.",
      },
    ],
  },
  autumn: {
    accent: "#a45c3d",
    line: "The garden is turning.",
    note:
      "Autumn is the season of return: the same garden, a different colour. We roast a little darker and stay open a little later.",
    tea: [
      {
        name: "Kuri no oku",
        jp: "chestnut",
        price: "¥1,100",
        desc: "Chestnut-roasted hōjicha. Sweet smoke, autumn leaves.",
      },
      {
        name: "Kinmokusei oolong",
        jp: "osmanthus",
        price: "¥1,150",
        desc: "Osmanthus, oolong, honey. The smell of a warm evening.",
      },
      {
        name: "Genmaicha",
        jp: "toasted rice",
        price: "¥850",
        desc: "Toasted rice, green tea, a little salt.",
      },
    ],
    sweets: [
      {
        name: "Chestnut kinton",
        jp: "kuri",
        price: "¥700",
        desc: "Sieve-pressed chestnut, a single candied peel.",
      },
      {
        name: "Persimmon",
        jp: "kaki",
        price: "¥650",
        desc: "Hachiya persimmon, white bean, a pinch of salt.",
      },
    ],
  },
  winter: {
    accent: "#5b6a7a",
    line: "The garden is holding its breath.",
    note:
      "Winter is the quietest room. The kettle is louder than the street. We serve the tea a little hotter and the sweets a little smaller.",
    tea: [
      {
        name: "Kōan blend",
        jp: "house pot",
        price: "¥1,000",
        desc: "Hōjicha, roasted barley, a whisper of cocoa. Our house pot.",
      },
      {
        name: "Mugi-cha",
        jp: "barley",
        price: "¥800",
        desc: "Barley tea, served hot. Nothing to prove.",
      },
      {
        name: "Matcha usucha",
        jp: "thin matcha",
        price: "¥1,200",
        desc: "Whisked to order. Bitter, bright, brief.",
      },
    ],
    sweets: [
      {
        name: "Yuzu mochi",
        jp: "citrus",
        price: "¥650",
        desc: "Yuzu peel, soft mochi, a dusting of sugar.",
      },
      {
        name: "Black sesame",
        jp: "kuro goma",
        price: "¥600",
        desc: "Sesame paste, toasted, pressed into a small square.",
      },
    ],
  },
};

const menu = document.querySelector(".menu");
const grid = document.querySelector("#menu-grid");
const seasonLine = document.querySelector("#season-line");
const seasonNote = document.querySelector("#season-note");
const teaList = document.querySelector("#tea-list");
const sweetList = document.querySelector("#sweet-list");
const seasonButtons = Array.from(document.querySelectorAll(".season"));
let currentSeason = "spring";
let switchTimer = null;

function itemMarkup(item) {
  return `
    <li>
      <span class="item__name">${item.name} <em>${item.jp}</em></span>
      <span class="item__price">${item.price}</span>
      <span class="item__desc">${item.desc}</span>
    </li>`;
}

function applySeason(key) {
  const data = seasons[key];
  if (!data) return;

  menu.dataset.season = key;
  menu.style.setProperty("--season", data.accent);
  seasonLine.textContent = data.line;
  seasonNote.textContent = data.note;
  teaList.innerHTML = data.tea.map(itemMarkup).join("");
  sweetList.innerHTML = data.sweets.map(itemMarkup).join("");
}

seasonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.season;
    if (key === currentSeason) return;

    currentSeason = key;
    seasonButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    menu.style.setProperty("--season", seasons[key].accent);
    grid.classList.add("is-switching");

    clearTimeout(switchTimer);
    switchTimer = setTimeout(() => {
      applySeason(key);
      grid.classList.remove("is-switching");
    }, 190);
  });
});

const pause = document.querySelector("#pause");
const breatheButton = document.querySelector("#breathe");
const breatheLabel = document.querySelector("#breathe-label");
const breatheTime = document.querySelector("#breathe-time");
const breatheStatus = document.querySelector("#breathe-status");

let breathing = false;
let remaining = 60;
let countdownId = null;
let phaseId = null;
let inhale = true;

function formatTime(total) {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function stopBreathing(message) {
  clearInterval(countdownId);
  clearInterval(phaseId);
  breathing = false;
  pause.classList.remove("is-breathing");
  breatheButton.setAttribute("aria-pressed", "false");
  breatheLabel.textContent = "Sit for a minute";
  breatheTime.textContent = "01:00";
  remaining = 60;
  breatheStatus.textContent = message;
}

function startBreathing() {
  clearInterval(countdownId);
  clearInterval(phaseId);
  breathing = true;
  remaining = 60;
  inhale = true;
  pause.classList.add("is-breathing");
  breatheButton.setAttribute("aria-pressed", "true");
  breatheLabel.textContent = "Stop";
  breatheTime.textContent = "01:00";
  breatheStatus.textContent = "Breathe in. Let the circle fill.";

  phaseId = setInterval(() => {
    inhale = !inhale;
    breatheStatus.textContent = inhale
      ? "Breathe in. Let the circle fill."
      : "Breathe out. Let it empty.";
  }, 4000);

  countdownId = setInterval(() => {
    remaining -= 1;
    breatheTime.textContent = formatTime(Math.max(remaining, 0));

    if (remaining <= 0) {
      stopBreathing("Thank you. The kettle is still warm.");
    }
  }, 1000);
}

breatheButton?.addEventListener("click", () => {
  if (breathing) {
    stopBreathing("Stopped. The room is still here.");
  } else {
    startBreathing();
  }
});

function updateKyotoTime() {
  const clock = document.querySelector("#kyoto-time");
  if (!clock) return;
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  clock.dateTime = now.toISOString();
}

updateKyotoTime();
setInterval(updateKyotoTime, 30000);

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
    { threshold: 0.12 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}
