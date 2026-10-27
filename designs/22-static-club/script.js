const releases = document.querySelectorAll(".release");
const nowTitle = document.querySelector("#now-title");
const nowArtist = document.querySelector("#now-artist");
const play = document.querySelector("#play");
const playLabel = document.querySelector("#play-label");

releases.forEach((release) => {
  release.addEventListener("click", () => {
    releases.forEach((item) => {
      const active = item === release;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    nowTitle.textContent = release.dataset.title;
    nowArtist.textContent = release.dataset.artist;
    document.body.classList.add("is-playing");
    play.setAttribute("aria-pressed", "true");
    playLabel.textContent = "Pause";
  });
});

play?.addEventListener("click", () => {
  const playing = document.body.classList.toggle("is-playing");
  play.setAttribute("aria-pressed", String(playing));
  playLabel.textContent = playing ? "Pause" : "Play";
});

const form = document.querySelector("#join-form");
const note = document.querySelector("#join-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = new FormData(form).get("email");
  note.textContent = `You're on the list. One email a month, starting with SC-048. (${email})`;
  form.reset();
});
