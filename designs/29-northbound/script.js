const chair = document.querySelector(".chair");
const finishName = document.querySelector("#finish-name");
const finishes = document.querySelectorAll("[data-finish]");

const colors = {
  oak: "#c89a5b",
  walnut: "#6b4423",
  black: "#232323",
};

finishes.forEach((button) => {
  button.addEventListener("click", () => {
    finishes.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    chair.style.setProperty("--wood", colors[button.dataset.finish]);
    finishName.textContent = button.dataset.name;
  });
});
