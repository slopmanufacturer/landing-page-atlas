const dateElement = document.querySelector("#today");
const issueDate = document.querySelector("#issue-date");
const today = new Date();
const sunday = new Date(today);
sunday.setDate(today.getDate() - today.getDay());

if (dateElement) {
  dateElement.textContent = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(sunday);
}

if (issueDate) {
  issueDate.textContent = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(sunday);
}

let readerSize = 0.92;

document.querySelectorAll("[data-size]").forEach((button) => {
  button.addEventListener("click", () => {
    readerSize += button.dataset.size === "up" ? 0.06 : -0.06;
    readerSize = Math.min(Math.max(readerSize, 0.82), 1.22);
    document.documentElement.style.setProperty("--reader", `${readerSize.toFixed(2)}rem`);
  });
});

const form = document.querySelector("#subscribe-form");
const note = document.querySelector("#subscribe-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = new FormData(form).get("email");
  note.textContent = `You're on the list. The first issue will arrive at ${email} on Sunday.`;
  form.reset();
});
