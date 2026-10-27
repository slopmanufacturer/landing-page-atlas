const gem = document.querySelector("#gem");
const hero = document.querySelector(".hero");

if (gem && hero) {
  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    gem.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(${y * 6}px)`;
  });

  hero.addEventListener("pointerleave", () => {
    gem.style.transform = "";
  });
}

const form = document.querySelector("#appointment-form");
const note = document.querySelector("#appointment-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = data.get("name");
  const date = data.get("date");
  const city = data.get("city");
  const formatted = date
    ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" }).format(new Date(`${date}T00:00:00`))
    : "a date to be agreed";

  note.textContent = `Thank you, ${name}. We will write to confirm ${formatted} in ${city}.`;
  form.reset();
});
