const searchInput = document.querySelector("#index-search");
const filterButtons = Array.from(document.querySelectorAll(".filters button[data-cat]"));
const rows = Array.from(document.querySelectorAll("#index-body tr"));
const count = document.querySelector("#index-count");
const empty = document.querySelector("#index-empty");

let activeCat = "all";

function applyFilters() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  let visible = 0;

  rows.forEach((row) => {
    const matchesCat = activeCat === "all" || row.dataset.cat === activeCat;
    const matchesText = !query || row.textContent.toLowerCase().includes(query);
    const show = matchesCat && matchesText;

    row.hidden = !show;
    if (show) visible += 1;
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.cat === activeCat;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (count) count.textContent = "Showing " + visible + " of " + rows.length + " records";
  if (empty) empty.hidden = visible !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCat = button.dataset.cat;
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", applyFilters);
  searchInput.addEventListener("search", applyFilters);
}

applyFilters();

const requestForm = document.querySelector("#request-form");
const requestName = document.querySelector("#request-name");
const requestEmail = document.querySelector("#request-email");
const requestNotes = document.querySelector("#request-notes");
const requestStatus = document.querySelector("#request-status");

if (requestForm && requestName && requestEmail && requestNotes && requestStatus) {
  requestForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameOk = requestName.value.trim().length > 1;
    const emailOk = requestEmail.value.trim() !== "" && requestEmail.validity.valid;
    const notesOk = requestNotes.value.trim().length >= 10;

    if (!nameOk || !emailOk || !notesOk) {
      requestStatus.textContent =
        "Add your name, a working email, and a line about what you are looking for.";
      if (!nameOk) {
        requestName.focus();
      } else if (!emailOk) {
        requestEmail.focus();
      } else {
        requestNotes.focus();
      }
      return;
    }

    requestStatus.textContent =
      "Request received. We will reply to " +
      requestEmail.value.trim() +
      " within three working days.";
    requestForm.reset();
  });
}
