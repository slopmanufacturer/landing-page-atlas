const nights = {
  thu: {
    name: "Thursday",
    sets: [
      ["20:00", "Aster Trio", "Piano, bass, drums. Standards, then one original they have not named yet.", "£14"],
      ["22:00", "Late Set: Rona Pike Quartet", "Rona Pike on tenor, with vibraphone. Hard bop, two long pieces, no interval.", "£12"],
    ],
  },
  fri: {
    name: "Friday",
    sets: [
      ["19:30", "Carrow Youth Jazz", "Twelve players, ages 13 to 18, and a rhythm section that has been practising since January.", "£8"],
      ["21:30", "Blue Room Big Band", "Sixteen pieces, two vocalists, and a set list that runs from Basie to Mingus.", "£18"],
    ],
  },
  sat: {
    name: "Saturday",
    sets: [
      ["20:00", "Ada Finch & the Night Bus", "Songs about buses, weather, and leaving. Ada Finch on voice, Iain Ross on keys.", "£16"],
      ["23:00", "After Hours: solo piano", "No support, no interval. Mara Finn plays until the room empties.", "£10"],
    ],
  },
};

const list = document.querySelector("#sets");
const status = document.querySelector("#programme-status");
const nowTitle = document.querySelector("#now-title");
const nowAct = document.querySelector("#now-act");
const nowDetail = document.querySelector("#now-detail");
const nowPrice = document.querySelector("#now-price");
const days = Array.from(document.querySelectorAll(".day"));

function render(key) {
  const night = nights[key];
  if (!night || !list) return;

  list.innerHTML = night.sets
    .map(
      ([time, title, desc, price]) => `<li class="set">
          <span class="set__time">${time}</span>
          <div class="set__body"><h3>${title}</h3><p>${desc}</p></div>
          <span class="set__price">${price}</span>
        </li>`
    )
    .join("");

  const [time, title, desc, price] = night.sets[0];
  if (nowTitle) nowTitle.textContent = night.name;
  if (nowAct) nowAct.textContent = title;
  if (nowDetail) nowDetail.textContent = `${desc.split(".")[0]}. First set, ${time}.`;
  if (nowPrice) nowPrice.textContent = price;
  if (status) status.textContent = `${night.name} · ${night.sets.length} sets · doors 19:00`;

  days.forEach((button) => {
    const active = button.dataset.night === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

days.forEach((button) => {
  button.addEventListener("click", () => render(button.dataset.night));
});

render("thu");
