const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const bottle = document.querySelector("#bottle");
const hero = document.querySelector(".hero");

if (hero && bottle && !reduceMotion.matches) {
  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    bottle.style.transform = `translate3d(${x * 16}px, ${y * 12}px, 0) rotateX(${-y * 7}deg) rotateY(${x * 9}deg)`;
  });

  hero.addEventListener("pointerleave", () => {
    bottle.style.transform = "";
  });
}

const dialog = document.querySelector("#reserve-dialog");
const openButton = document.querySelector("#open-reserve");
const closeButton = document.querySelector(".reserve-dialog__close");
const form = document.querySelector("#reserve-form");
const confirm = document.querySelector("#reserve-confirm");
const nameInput = document.querySelector("#reserve-name");

openButton?.addEventListener("click", () => {
  dialog.showModal();
  setTimeout(() => nameInput?.focus(), 60);
});

closeButton?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  confirm.textContent = `Noted, ${name}. Your name is in the ledger. We will write when the bottle is ready.`;
  form.reset();
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}
