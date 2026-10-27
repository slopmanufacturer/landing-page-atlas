const menus = {
  omnivore: {
    note: "November menu. Subject to what the market has, which is the only honest way to write it.",
    courses: [
      ["Oyster, apple, horseradish", "Raw, cold, and gone in two bites."],
      ["Celeriac soup, brown butter", "Thick enough to stand a spoon in. Bread from the bakery on Quay Street."],
      ["Hake, mussels, cider", "Landed that morning, cooked in a wide pan, served with the liquor."],
      ["Venison, beetroot, juniper", "Roe deer from the estate above the sound. Pink, rested, sliced thick."],
      ["Damson tart, cream", "Damsons from the hedge behind the pub. The last of the season."],
    ],
  },
  vegetarian: {
    note: "November vegetarian menu. Cooked alongside the main menu, not instead of it.",
    courses: [
      ["Beetroot, apple, horseradish", "Roasted in salt, sharpened with apple, and finished cold."],
      ["Celeriac soup, brown butter", "Thick enough to stand a spoon in. Bread from the bakery on Quay Street."],
      ["Hispi cabbage, hazelnut, cider", "Charred in the pan and dressed with the cider liquor."],
      ["Mushroom, beetroot, juniper", "Field mushrooms, a juniper cream, and beetroot cooked in the embers."],
      ["Damson tart, cream", "Damsons from the hedge behind the pub. The last of the season."],
    ],
  },
};

const numerals = ["I", "II", "III", "IV", "V"];
const list = document.querySelector("#courses");
const note = document.querySelector("#menu-note");
const buttons = Array.from(document.querySelectorAll(".toggle__button"));

function choose(key) {
  const menu = menus[key];
  if (!menu || !list) return;

  list.innerHTML = menu.courses
    .map(
      ([title, copy], i) =>
        `<li class="course"><span class="course__num">${numerals[i]}</span><div><h3>${title}</h3><p>${copy}</p></div></li>`
    )
    .join("");

  if (note) note.textContent = menu.note;

  buttons.forEach((button) => {
    const active = button.dataset.menu === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

buttons.forEach((button) => {
  button.addEventListener("click", () => choose(button.dataset.menu));
});

choose("omnivore");
