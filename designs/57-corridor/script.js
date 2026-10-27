const form = document.querySelector("#join-form");
const status = document.querySelector("#form-status");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameField.value.trim();
  const email = emailField.value.trim();

  status.classList.remove("is-done", "is-error");

  if (!name || !email || !email.includes("@") || !email.includes(".")) {
    status.textContent = "Add a name and an email address, and we can reply.";
    status.classList.add("is-error");
    (name ? emailField : nameField).focus();
    return;
  }

  status.textContent = `Thank you, ${name}. We read every request and reply on Mondays.`;
  status.classList.add("is-done");
  form.reset();
});
