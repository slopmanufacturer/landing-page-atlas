const slides = Array.from(document.querySelectorAll(".slide"));
const counter = document.querySelector("#counter");
const panel = document.querySelector("#art-panel");
let current = 0;

function show(index) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
}

document.querySelector("#prev")?.addEventListener("click", () => show(current - 1));
document.querySelector("#next")?.addEventListener("click", () => show(current + 1));

panel?.addEventListener("keydown", (event) => {
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
