const gradeButtons = Array.from(document.querySelectorAll("[data-grade]"));
const routes = Array.from(document.querySelectorAll(".route"));
const empty = document.querySelector("#routes-empty");

function applyGrade(grade) {
  let visible = 0;

  routes.forEach((route) => {
    const show = grade === "all" || route.dataset.grade === grade;
    route.hidden = !show;
    if (show) visible += 1;
  });

  gradeButtons.forEach((button) => {
    const active = button.dataset.grade === grade;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (empty) empty.hidden = visible !== 0;
}

gradeButtons.forEach((button) => {
  button.addEventListener("click", () => applyGrade(button.dataset.grade));
});

const signupForm = document.querySelector("#signup-form");
const signupEmail = document.querySelector("#signup-email");
const signupNote = document.querySelector("#signup-note");

if (signupForm && signupEmail && signupNote) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!signupEmail.value.trim() || !signupEmail.validity.valid) {
      signupNote.textContent = "That email does not look right. Try again.";
      signupEmail.focus();
      return;
    }

    signupNote.textContent = "You are on the list. One email a month, no beta.";
    signupForm.reset();
  });
}
