const landings = {
  mon: {
    name: "Monday",
    boats: 12,
    tonnes: "2.8",
    rows: [
      ["Hake", "184 kg", "6.40", "Silver Spray"],
      ["Megrim", "96 kg", "4.10", "Silver Spray"],
      ["Crab", "38 boxes", "11.20", "Little Edgar"],
      ["Lobster", "14 boxes", "24.60", "Little Edgar"],
      ["Mackerel", "212 kg", "3.80", "Maud"],
    ],
  },
  tue: {
    name: "Tuesday",
    boats: 13,
    tonnes: "3.1",
    rows: [
      ["Sole", "72 kg", "18.40", "Kestrel"],
      ["Plaice", "118 kg", "7.20", "Kestrel"],
      ["Hake", "206 kg", "6.10", "Silver Spray"],
      ["Crab", "41 boxes", "10.80", "Little Edgar"],
      ["Herring", "164 kg", "2.90", "Maud"],
    ],
  },
  wed: {
    name: "Wednesday",
    boats: 11,
    tonnes: "2.4",
    rows: [
      ["Hake", "168 kg", "6.70", "Silver Spray"],
      ["Megrim", "88 kg", "4.30", "Silver Spray"],
      ["Lobster", "11 boxes", "26.10", "Little Edgar"],
      ["Crab", "36 boxes", "11.60", "Little Edgar"],
      ["Mackerel", "186 kg", "3.60", "Maud"],
    ],
  },
  thu: {
    name: "Thursday",
    boats: 14,
    tonnes: "3.4",
    rows: [
      ["Hake", "242 kg", "6.20", "Silver Spray"],
      ["Turbot", "18 kg", "21.80", "Silver Spray"],
      ["Sole", "64 kg", "19.10", "Kestrel"],
      ["Crab", "44 boxes", "10.40", "Little Edgar"],
      ["Mackerel", "238 kg", "3.40", "Maud"],
    ],
  },
  fri: {
    name: "Friday",
    boats: 14,
    tonnes: "3.2",
    rows: [
      ["Sole", "81 kg", "18.90", "Kestrel"],
      ["Plaice", "126 kg", "7.40", "Kestrel"],
      ["Hake", "214 kg", "6.50", "Silver Spray"],
      ["Lobster", "16 boxes", "23.80", "Little Edgar"],
      ["Herring", "192 kg", "3.10", "Maud"],
    ],
  },
  sat: {
    name: "Saturday",
    boats: 9,
    tonnes: "1.9",
    rows: [
      ["Mackerel", "204 kg", "3.90", "Maud"],
      ["Herring", "148 kg", "3.20", "Maud"],
      ["Crab", "29 boxes", "12.40", "Little Edgar"],
      ["Hake", "96 kg", "6.90", "Silver Spray"],
      ["Megrim", "42 kg", "4.60", "Silver Spray"],
    ],
  },
};

const body = document.querySelector("#landing-rows");
const caption = document.querySelector("#landings-caption");
const summary = document.querySelector("#landings-summary");
const days = Array.from(document.querySelectorAll(".day"));

function render(key) {
  const day = landings[key];
  if (!day || !body) return;

  body.innerHTML = day.rows
    .map(
      ([species, weight, price, boat]) =>
        `<tr><td>${species}</td><td>${weight}</td><td>£${price}</td><td>${boat}</td></tr>`
    )
    .join("");

  if (caption) caption.textContent = `${day.name} landings, auction average`;
  if (summary) {
    summary.textContent = `${day.name} · ${day.boats} boats · ${day.tonnes} tonnes landed`;
  }

  days.forEach((button) => {
    const active = button.dataset.day === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

days.forEach((button) => {
  button.addEventListener("click", () => render(button.dataset.day));
});

render("mon");
