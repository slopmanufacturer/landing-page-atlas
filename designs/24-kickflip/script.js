const deck = document.querySelector(".deck");
const deckName = document.querySelector("#deck-name");
const swatches = document.querySelectorAll("[data-deck]");

const colorways = {
  acid: { a: "#ffd400", b: "#e63322", c: "#111" },
  blood: { a: "#e63322", b: "#111", c: "#f2e9d8" },
  concrete: { a: "#d7d4cc", b: "#1f3bff", c: "#111" },
};

swatches.forEach((button) => {
  button.addEventListener("click", () => {
    const colors = colorways[button.dataset.deck];

    swatches.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    deck.style.setProperty("--deck-a", colors.a);
    deck.style.setProperty("--deck-b", colors.b);
    deck.style.setProperty("--deck-c", colors.c);
    deckName.textContent = button.dataset.name;
  });
});

const form = document.querySelector("#drop-form");
const note = document.querySelector("#drop-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = new FormData(form).get("email");
  note.textContent = `You're on the drop list. We will write to ${email} when the next batch is pressed.`;
  form.reset();
});
