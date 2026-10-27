const searchInput = document.querySelector("#catalogue-search");
const filterButtons = Array.from(document.querySelectorAll(".filters button[data-cat]"));
const items = Array.from(document.querySelectorAll("#catalogue-list .item"));
const count = document.querySelector("#catalogue-count");
const empty = document.querySelector("#catalogue-empty");

let activeCat = "all";

function applyFilters() {
  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  let visible = 0;

  items.forEach((item) => {
    const matchesCat = activeCat === "all" || item.dataset.cat === activeCat;
    const matchesText = !query || item.textContent.toLowerCase().includes(query);
    const show = matchesCat && matchesText;

    item.hidden = !show;
    if (show) visible += 1;
  });

  filterButtons.forEach((button) => {
    const active = button.dataset.cat === activeCat;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (count) count.textContent = "Showing " + visible + " of " + items.length + " items";
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

const joinForm = document.querySelector("#join-form");
const joinName = document.querySelector("#join-name");
const joinEmail = document.querySelector("#join-email");
const joinPostcode = document.querySelector("#join-postcode");
const joinStatus = document.querySelector("#join-status");

if (joinForm && joinName && joinEmail && joinPostcode && joinStatus) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameOk = joinName.value.trim().length > 1;
    const emailOk = joinEmail.value.trim() !== "" && joinEmail.validity.valid;
    const postcodeOk = joinPostcode.value.trim().length >= 3;

    if (!nameOk || !emailOk || !postcodeOk) {
      joinStatus.textContent = "Check the name, email, and postcode, then try again.";
      if (!nameOk) {
        joinName.focus();
      } else if (!emailOk) {
        joinEmail.focus();
      } else {
        joinPostcode.focus();
      }
      return;
    }

    joinStatus.textContent =
      "Thank you. Your card is reserved — bring proof of address to the desk on your first visit.";
    joinForm.reset();
  });
}
