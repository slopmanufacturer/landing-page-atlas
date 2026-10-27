const lightToggle = document.querySelector("#light-toggle");

lightToggle?.addEventListener("click", () => {
  const night = document.body.classList.toggle("night");
  lightToggle.setAttribute("aria-pressed", String(night));
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
  note.textContent = `Welcome in. The next issue will find ${email} in the post.`;
  form.reset();
});
