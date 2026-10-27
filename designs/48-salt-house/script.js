const filters = Array.from(document.querySelectorAll(".filter"));
const courses = Array.from(document.querySelectorAll("#course-grid .course"));
const status = document.querySelector("#course-status");

const labels = {
  all: "courses",
  start: "start courses",
  intermediate: "intermediate courses",
  advanced: "advanced courses",
  youth: "youth courses",
};

function applyFilter(level) {
  let visible = 0;

  courses.forEach((course) => {
    const show = level === "all" || course.dataset.level === level;
    course.hidden = !show;
    if (show) visible += 1;
  });

  filters.forEach((button) => {
    const active = button.dataset.level === level;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (status) {
    const noun = labels[level] || "courses";
    status.textContent =
      level === "all"
        ? `Showing all ${visible} courses.`
        : `Showing ${visible} ${noun}.`;
  }
}

filters.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.level));
});

applyFilter("all");
