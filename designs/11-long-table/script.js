const recipes = {
  soup: {
    title: "Tomato and bread soup",
    meta: "35 min / one pot",
    base: 4,
    ingredients: [
      ["Tomatoes", 800, "g"],
      ["Stale bread", 200, "g"],
      ["Olive oil", 4, "tbsp"],
      ["Garlic", 2, "cloves"],
      ["Basil", 1, "bunch"],
      ["Salt", 1, "tsp"],
    ],
    steps: [
      "Tear the bread into rough pieces. Leave it in a bowl while you start the tomatoes.",
      "Warm the olive oil in a heavy pot. Add the garlic and cook until it smells like the room has changed.",
      "Add the tomatoes, salt, and half the basil. Simmer for 20 minutes, pressing the tomatoes with a wooden spoon.",
      "Stir in the bread. Add a splash of water if it looks tight. Cook for another 8 minutes.",
      "Taste. Add the rest of the basil and more salt than you think. Serve with the oil on the table.",
    ],
  },
  greens: {
    title: "A pan of greens",
    meta: "15 min / one pan",
    base: 2,
    ingredients: [
      ["Cavolo nero", 300, "g"],
      ["Olive oil", 2, "tbsp"],
      ["Lemon", 1, "whole"],
      ["Chilli", 1, "whole"],
      ["Garlic", 2, "cloves"],
      ["Salt", 0.5, "tsp"],
    ],
    steps: [
      "Strip the leaves from the stems. Tear the leaves into pieces the size of your hand.",
      "Warm the oil in a wide pan. Add the garlic and chilli and let them colour for a minute.",
      "Add the greens with a splash of water. Cover and cook for 5 minutes.",
      "Remove the lid. Squeeze over the lemon, season, and cook until the water has gone.",
      "Serve with bread, or on top of the soup if there is any left.",
    ],
  },
  pears: {
    title: "Burnt honey pears",
    meta: "25 min / one pan",
    base: 4,
    ingredients: [
      ["Pears", 4, "whole"],
      ["Honey", 3, "tbsp"],
      ["Butter", 30, "g"],
      ["Thyme", 4, "sprigs"],
      ["Yoghurt", 200, "g"],
      ["Salt", 1, "pinch"],
    ],
    steps: [
      "Halve the pears and scoop out the cores. Leave the skin on.",
      "Melt the butter in a pan. Add the honey and let it bubble until it smells slightly burnt.",
      "Lay the pears cut-side down in the pan. Add the thyme and a pinch of salt.",
      "Cook for 8 minutes, spooning the honey over the fruit. Turn and cook for 5 more.",
      "Serve warm with cold yoghurt and the pan juices.",
    ],
  },
};

let currentRecipe = "soup";
let servings = 4;
let switchTimer = null;

const title = document.querySelector("#recipe-title");
const meta = document.querySelector("#recipe-meta");
const ingredientsList = document.querySelector("#ingredients");
const stepsList = document.querySelector("#steps");
const servingsValue = document.querySelector("#servings");
const panel = document.querySelector("#recipe-panel");
const tabs = document.querySelectorAll(".recipe-tab");

function formatQuantity(value) {
  if (Number.isInteger(value)) return String(value);
  return String(Math.round(value * 10) / 10);
}

function render() {
  const recipe = recipes[currentRecipe];
  const scale = servings / recipe.base;

  title.textContent = recipe.title;
  meta.textContent = recipe.meta;
  servingsValue.textContent = String(servings);

  ingredientsList.innerHTML = recipe.ingredients
    .map(([name, amount, unit]) => `<li><span>${name}</span><span>${formatQuantity(amount * scale)} ${unit}</span></li>`)
    .join("");

  stepsList.innerHTML = recipe.steps.map((step) => `<li>${step}</li>`).join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    if (tab.dataset.recipe === currentRecipe) return;

    currentRecipe = tab.dataset.recipe;
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    panel.classList.add("is-switching");
    clearTimeout(switchTimer);
    switchTimer = setTimeout(() => {
      render();
      panel.classList.remove("is-switching");
    }, 180);
  });
});

document.querySelector("#servings-down")?.addEventListener("click", () => {
  servings = Math.max(2, servings - 2);
  render();
});

document.querySelector("#servings-up")?.addEventListener("click", () => {
  servings = Math.min(8, servings + 2);
  render();
});

render();

const form = document.querySelector("#subscribe-form");
const note = document.querySelector("#subscribe-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = new FormData(form).get("email");
  note.textContent = `You're on the list. The first issue will find ${email} with a shopping list.`;
  form.reset();
});
