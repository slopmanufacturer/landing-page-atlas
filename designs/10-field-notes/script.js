const markers = document.querySelectorAll(".marker");
const noteCoords = document.querySelector("#note-coords");
const noteTitle = document.querySelector("#note-title");
const noteText = document.querySelector("#note-text");

markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    markers.forEach((item) => item.classList.toggle("is-active", item === marker));
    noteCoords.textContent = marker.dataset.coords;
    noteTitle.textContent = marker.dataset.title;
    noteText.textContent = marker.dataset.text;
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
  note.textContent = `You're on the list. Issue 13 will find ${email} when it is ready.`;
  form.reset();
});
