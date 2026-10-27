const toolGroups = {
  wrench: document.querySelector("#tool-wrench"),
  hammer: document.querySelector("#tool-hammer"),
  pliers: document.querySelector("#tool-pliers"),
};

const toolButtons = document.querySelectorAll("[data-tool]");
const specName = document.querySelector("#spec-name");
const specLength = document.querySelector("#spec-length");
const specWeight = document.querySelector("#spec-weight");
const specUse = document.querySelector("#spec-use");

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    Object.entries(toolGroups).forEach(([key, group]) => {
      group.hidden = key !== button.dataset.tool;
    });

    toolButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    specName.textContent = button.dataset.name;
    specLength.textContent = button.dataset.length;
    specWeight.textContent = button.dataset.weight;
    specUse.textContent = button.dataset.use;
  });
});
