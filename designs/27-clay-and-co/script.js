const vessel = document.querySelector(".vessel");
const glazeName = document.querySelector("#glaze-name");
const glazes = document.querySelectorAll("[data-glaze]");

const glazesData = {
  rust: { a: "#b45f3f", b: "#8a3f2a", c: "#e8dcc8" },
  ash: { a: "#8a8a7a", b: "#5f6054", c: "#efe9df" },
  moss: { a: "#5c6b52", b: "#3f4a38", c: "#d8d0bd" },
};

glazes.forEach((button) => {
  button.addEventListener("click", () => {
    const glaze = glazesData[button.dataset.glaze];

    glazes.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    vessel.style.setProperty("--glaze-a", glaze.a);
    vessel.style.setProperty("--glaze-b", glaze.b);
    vessel.style.setProperty("--glaze-c", glaze.c);
    glazeName.textContent = button.dataset.name;
  });
});
