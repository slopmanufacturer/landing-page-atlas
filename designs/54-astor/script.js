const filters = Array.from(document.querySelectorAll(".filter"));
const films = Array.from(document.querySelectorAll("#films .film"));
const status = document.querySelector("#film-status");

const labels = {
  all: "films",
  "35mm": "films on 35mm",
  "70mm": "films on 70mm",
  dcp: "films on DCP",
};

function applyFilter(format) {
  let visible = 0;

  films.forEach((film) => {
    const show = format === "all" || film.dataset.format === format;
    film.hidden = !show;
    if (show) visible += 1;
  });

  filters.forEach((button) => {
    const active = button.dataset.format === format;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (status) {
    const noun = labels[format] || "films";
    status.textContent =
      format === "all"
        ? `Showing all ${visible} films.`
        : `Showing ${visible} ${noun}.`;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.format));
});

applyFilter("all");
