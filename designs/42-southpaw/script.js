const filterButtons = Array.from(document.querySelectorAll(".filters [data-type]"));
const sessions = Array.from(document.querySelectorAll(".class"));
const empty = document.querySelector("#classes-empty");

function applyFilter(type) {
  let visible = 0;

  sessions.forEach((session) => {
    const show = type === "all" || session.dataset.type === type;
    session.hidden = !show;
    if (show) visible += 1;
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.type === type;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (empty) empty.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyFilter(button.dataset.type));
});

const joinForm = document.querySelector("#join-form");
const joinName = document.querySelector("#join-name");
const joinEmail = document.querySelector("#join-email");
const joinNote = document.querySelector("#join-note");

if (joinForm && joinName && joinEmail && joinNote) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!joinName.value.trim()) {
      joinNote.textContent = "We need a name for the register.";
      joinName.focus();
      return;
    }

    if (!joinEmail.value.trim() || !joinEmail.validity.valid) {
      joinNote.textContent = "That email does not look right. Try again.";
      joinEmail.focus();
      return;
    }

    joinNote.textContent = "Booked. Come ten minutes early; we will do the rest.";
    joinForm.reset();
  });
}
