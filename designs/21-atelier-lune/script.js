const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dots button"));
const count = document.querySelector("#count");
const lookbook = document.querySelector("#lookbook");
let current = 0;

function show(index) {
  current = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  dots.forEach((dot, i) => {
    const active = i === current;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-pressed", String(active));
  });

  count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

document.querySelector("#prev")?.addEventListener("click", () => show(current - 1));
document.querySelector("#next")?.addEventListener("click", () => show(current + 1));

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => show(index));
});

lookbook?.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    show(current - 1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    show(current + 1);
  }
});

show(0);
