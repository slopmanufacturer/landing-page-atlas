const dayButtons = Array.from(document.querySelectorAll(".day-filter [data-day]"));
const typeButtons = Array.from(document.querySelectorAll(".type-filter [data-type]"));
const sessions = Array.from(document.querySelectorAll("#session-body tr"));
const sessionCount = document.querySelector("#session-count");
const sessionEmpty = document.querySelector("#session-empty");

let activeDay = "all";
let activeType = "all";

function applyFilters() {
  let visible = 0;

  sessions.forEach((row) => {
    const matchesDay = activeDay === "all" || row.dataset.day === activeDay;
    const matchesType = activeType === "all" || row.dataset.type === activeType;
    const show = matchesDay && matchesType;

    row.hidden = !show;
    if (show) visible += 1;
  });

  dayButtons.forEach((button) => {
    const active = button.dataset.day === activeDay;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  typeButtons.forEach((button) => {
    const active = button.dataset.type === activeType;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (sessionCount) sessionCount.textContent = "Showing " + visible + " of " + sessions.length + " sessions";
  if (sessionEmpty) sessionEmpty.hidden = visible !== 0;
}

dayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeDay = button.dataset.day;
    applyFilters();
  });
});

typeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeType = button.dataset.type;
    applyFilters();
  });
});

if (sessions.length) applyFilters();

const learnForm = document.querySelector("#learn-form");
const learnName = document.querySelector("#learn-name");
const learnEmail = document.querySelector("#learn-email");
const learnStage = document.querySelector("#learn-stage");
const learnStatus = document.querySelector("#learn-status");

if (learnForm && learnName && learnEmail && learnStage && learnStatus) {
  learnForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameOk = learnName.value.trim().length > 1;
    const emailOk = learnEmail.value.trim() !== "" && learnEmail.validity.valid;

    if (!nameOk || !emailOk) {
      learnStatus.textContent = "Check the swimmer's name and the email, then try again.";
      if (!nameOk) {
        learnName.focus();
      } else {
        learnEmail.focus();
      }
      return;
    }

    learnStatus.textContent =
      "Added to the waiting list: " +
      learnStage.value +
      ". We write when a place opens, usually at half term.";
    learnForm.reset();
  });
}
