const treatments = {
  iron: {
    label: "The Iron Room",
    name: "Steam, plunge, repeat.",
    copy:
      "Fifteen minutes in the steam room, thirty seconds in the plunge, and as many rounds as you can manage. Ends with a salt scrub at the bench and a glass of water in the rest room.",
    time: "45 minutes",
    price: "£38",
    includes: "Baths, towel, scrub, tea",
  },
  salt: {
    label: "Salt & Steam",
    name: "Scrub, steam, oil.",
    copy:
      "A full salt scrub on the stone bench, then steam, then a warm oil rub in the treatment room. The scrub is coarse on purpose. Say if you want it softer.",
    time: "60 minutes",
    price: "£52",
    includes: "Baths, towel, scrub, oil, tea",
  },
  soak: {
    label: "The Long Soak",
    name: "A bath, then nothing.",
    copy:
      "A private bath drawn at 39°C, twenty minutes in the steam, and an hour in the rest room with a blanket. No talking, no music, no interruption.",
    time: "90 minutes",
    price: "£74",
    includes: "Private bath, steam, rest room, tea",
  },
  swim: {
    label: "Morning Swim",
    name: "Laps before the city wakes.",
    copy:
      "The pool is 18 metres and rarely busy before ten. Lane one is for slow swimming, lane three for anyone training. Bring your own goggles.",
    time: "30 minutes",
    price: "£18",
    includes: "Pool, towel, tea",
  },
};

const buttons = Array.from(document.querySelectorAll(".treatment"));
const label = document.querySelector("#panel-label");
const name = document.querySelector("#panel-name");
const copy = document.querySelector("#panel-copy");
const time = document.querySelector("#panel-time");
const price = document.querySelector("#panel-price");
const includes = document.querySelector("#panel-includes");

function choose(key) {
  const item = treatments[key];
  if (!item) return;

  label.textContent = item.label;
  name.textContent = item.name;
  copy.textContent = item.copy;
  time.textContent = item.time;
  price.textContent = item.price;
  includes.textContent = item.includes;

  buttons.forEach((button) => {
    const active = button.dataset.treatment === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => choose(button.dataset.treatment));
});

choose("iron");
