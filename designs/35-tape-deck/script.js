const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const playLabel = document.querySelector("#play-label");
const deckState = document.querySelector("#deck-state");
const counter = document.querySelector("#counter");
let count = 0;
let timer = null;

function setPlaying(playing) {
  document.body.classList.toggle("is-playing", playing);
  play.setAttribute("aria-pressed", String(playing));
  playLabel.textContent = playing ? "Pause" : "Play";
  deckState.textContent = playing ? "Playing" : "Standby";

  clearInterval(timer);
  if (playing) {
    timer = setInterval(() => {
      count += 1;
      counter.textContent = String(count).padStart(4, "0");
    }, 1000);
  }
}

play?.addEventListener("click", () => {
  setPlaying(!document.body.classList.contains("is-playing"));
});

stop?.addEventListener("click", () => {
  setPlaying(false);
  count = 0;
  counter.textContent = "0000";
});
