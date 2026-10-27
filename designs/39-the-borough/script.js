const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
const tabPanels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function activateTab(button, focus) {
  tabButtons.forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  tabPanels.forEach((panel) => {
    panel.hidden = panel.id !== button.getAttribute("aria-controls");
  });

  if (focus) button.focus();
}

tabButtons.forEach((button, index) => {
  button.tabIndex = index === 0 ? 0 : -1;

  button.addEventListener("click", () => activateTab(button, false));

  button.addEventListener("keydown", (event) => {
    const last = tabButtons.length - 1;
    let next = null;

    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;

    if (next === null) return;
    event.preventDefault();
    activateTab(tabButtons[next], true);
  });
});

const programmeForm = document.querySelector("#programme-form");
const programmeEmail = document.querySelector("#programme-email");
const programmeNote = document.querySelector("#programme-note");

if (programmeForm && programmeEmail && programmeNote) {
  programmeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!programmeEmail.value.trim() || !programmeEmail.validity.valid) {
      programmeNote.textContent = "That email does not look right. Try again.";
      programmeEmail.focus();
      return;
    }

    programmeNote.textContent = "Subscribed. Team news on Friday, results on Saturday.";
    programmeForm.reset();
  });
}
