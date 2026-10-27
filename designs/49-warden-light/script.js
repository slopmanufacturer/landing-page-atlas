const scene = document.querySelector(".scene");
const panel = document.querySelector(".light__panel");
const status = document.querySelector("#light-status");
const buttons = Array.from(document.querySelectorAll(".character"));

const characters = {
  fl3: "Fl(3) W 15s — three flashes of one second, then eleven seconds of darkness. Visible for 18 nautical miles.",
  oc: "Oc W 10s — lit for seven seconds, dark for three. Visible for 15 nautical miles.",
  iso: "Iso W 4s — two seconds lit, two seconds dark, all night. Visible for 12 nautical miles.",
};

function choose(character) {
  if (scene) scene.dataset.character = character;
  if (panel) panel.dataset.character = character;

  buttons.forEach((button) => {
    const active = button.dataset.character === character;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (status) status.textContent = characters[character];
}

buttons.forEach((button) => {
  button.addEventListener("click", () => choose(button.dataset.character));
});

choose("fl3");
