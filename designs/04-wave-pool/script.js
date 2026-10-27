const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));

function selectTab(tab) {
  tabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("is-active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });

  panels.forEach((panel) => {
    const active = panel.id === tab.getAttribute("aria-controls");
    panel.hidden = !active;
    panel.classList.remove("is-entering");

    if (active) {
      requestAnimationFrame(() => {
        panel.classList.add("is-entering");
        setTimeout(() => panel.classList.remove("is-entering"), 700);
      });
    }
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));

  tab.addEventListener("keydown", (event) => {
    let next = null;

    if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
    if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === "Home") next = tabs[0];
    if (event.key === "End") next = tabs[tabs.length - 1];

    if (next) {
      event.preventDefault();
      selectTab(next);
      next.focus();
    }
  });
});

const stickers = document.querySelectorAll("[data-drag]");

stickers.forEach((sticker) => {
  let startX = 0;
  let startY = 0;
  let baseX = 0;
  let baseY = 0;
  let dragging = false;

  sticker.addEventListener("pointerdown", (event) => {
    dragging = true;
    startX = event.clientX;
    startY = event.clientY;
    baseX = Number(sticker.dataset.x || 0);
    baseY = Number(sticker.dataset.y || 0);
    sticker.classList.add("is-dragging");
    sticker.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  sticker.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    const x = baseX + event.clientX - startX;
    const y = baseY + event.clientY - startY;
    sticker.dataset.x = String(x);
    sticker.dataset.y = String(y);
    sticker.style.setProperty("--x", `${x}px`);
    sticker.style.setProperty("--y", `${y}px`);
  });

  const stop = (event) => {
    if (!dragging) return;
    dragging = false;
    sticker.classList.remove("is-dragging");
    if (sticker.hasPointerCapture(event.pointerId)) {
      sticker.releasePointerCapture(event.pointerId);
    }
  };

  sticker.addEventListener("pointerup", stop);
  sticker.addEventListener("pointercancel", stop);
});

const dialog = document.querySelector("#ticket-dialog");
const openButton = document.querySelector("#open-ticket");
const closeButton = document.querySelector(".ticket-dialog__close");
const formWrap = document.querySelector("#ticket-form-wrap");
const form = document.querySelector("#ticket-form");
const result = document.querySelector("#ticket-result");
const closeResult = document.querySelector("#close-result");
const nameInput = document.querySelector("#ticket-name");

function resetDialog() {
  formWrap.hidden = false;
  result.hidden = true;
  form?.reset();
}

openButton?.addEventListener("click", () => {
  resetDialog();
  dialog.showModal();
  setTimeout(() => nameInput?.focus(), 60);
});

closeButton?.addEventListener("click", () => dialog.close());
closeResult?.addEventListener("click", () => dialog.close());

dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog?.addEventListener("close", resetDialog);

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const type = String(data.get("type") || "Three-day — £145");
  const [ticketType, price] = type.split("—").map((part) => part.trim());
  const ref = `WP-26-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  document.querySelector("#result-name").textContent = name;
  document.querySelector("#result-type").textContent = ticketType;
  document.querySelector("#result-ref").textContent = ref;
  document.querySelector(".result-ticket__row span:last-child").textContent = price;
  document.querySelector("#result-note").textContent =
    `Saved. ${ticketType} ticket reserved for ${name}. Check your inbox for the good stuff.`;

  formWrap.hidden = true;
  result.hidden = false;
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
