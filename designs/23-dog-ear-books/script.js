const filters = document.querySelectorAll("[data-filter]");
const books = document.querySelectorAll(".book-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    books.forEach((book) => {
      book.hidden = filter !== "all" && book.dataset.category !== filter;
    });
  });
});

const form = document.querySelector("#club-form");
const note = document.querySelector("#club-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = new FormData(form).get("email");
  note.textContent = `Welcome to the club. The first book will find ${email} within a week.`;
  form.reset();
});
