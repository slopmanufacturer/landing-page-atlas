const filters = Array.from(document.querySelectorAll(".filter"));
const drinks = Array.from(document.querySelectorAll("#drinks .drink"));
const status = document.querySelector("#menu-status");

const labels = {
  all: "drinks",
  stirred: "stirred drinks",
  shaken: "shaken drinks",
  zero: "drinks without alcohol",
};

function applyFilter(method) {
  let visible = 0;

  drinks.forEach((drink) => {
    const show = method === "all" || drink.dataset.method === method;
    drink.hidden = !show;
    if (show) visible += 1;
  });

  filters.forEach((button) => {
    const active = button.dataset.method === method;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (status) {
    const noun = labels[method] || "drinks";
    status.textContent =
      method === "all"
        ? `Showing all ${visible} drinks.`
        : `Showing ${visible} ${noun}.`;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.method));
});

applyFilter("all");
