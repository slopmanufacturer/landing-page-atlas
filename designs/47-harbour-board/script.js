const filters = Array.from(document.querySelectorAll(".filter"));
const rows = Array.from(document.querySelectorAll("#berth-rows tr"));
const status = document.querySelector("#berth-status");

const labels = {
  all: "berths",
  available: "available berths",
  annual: "annual berths",
  visitor: "visitor berths",
  works: "berths under works",
};

function applyFilter(value) {
  let visible = 0;

  rows.forEach((row) => {
    const show = value === "all" || row.dataset.status === value;
    row.hidden = !show;
    if (show) visible += 1;
  });

  filters.forEach((button) => {
    const active = button.dataset.status === value;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (status) {
    const noun = labels[value] || "berths";
    status.textContent =
      value === "all"
        ? `Showing all ${visible} berths.`
        : `Showing ${visible} ${noun}.`;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.status));
});

applyFilter("all");
