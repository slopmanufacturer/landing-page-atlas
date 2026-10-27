const patterns = {
  "478": {
    phases: [
      { name: "Breathe in", seconds: 4, scale: 1 },
      { name: "Hold", seconds: 7, scale: 1 },
      { name: "Breathe out", seconds: 8, scale: 0.58 },
    ],
    note: "Three cycles. About one minute.",
  },
  box: {
    phases: [
      { name: "Breathe in", seconds: 4, scale: 1 },
      { name: "Hold", seconds: 4, scale: 1 },
      { name: "Breathe out", seconds: 4, scale: 0.58 },
      { name: "Hold", seconds: 4, scale: 0.58 },
    ],
    note: "Three cycles. About a minute.",
  },
  coherent: {
    phases: [
      { name: "Breathe in", seconds: 5, scale: 1 },
      { name: "Breathe out", seconds: 5, scale: 0.58 },
    ],
    note: "Three cycles. Thirty seconds.",
  },
};

let currentPattern = "478";
let phaseIndex = 0;
let remaining = patterns[currentPattern].phases[0].seconds;
let cycles = 0;
let running = false;
let interval = null;

const phaseEl = document.querySelector("#phase");
const secondsEl = document.querySelector("#seconds");
const cycleEl = document.querySelector("#cycle");
const orb = document.querySelector("#orb");
const start = document.querySelector("#start");
const note = document.querySelector("#timer-note");
const patternButtons = document.querySelectorAll("[data-pattern]");

function renderPhase() {
  const pattern = patterns[currentPattern];
  const phase = pattern.phases[phaseIndex];
  phaseEl.textContent = phase.name;
  secondsEl.textContent = String(remaining).padStart(2, "0");
  orb.style.setProperty("--scale", String(phase.scale));
  cycleEl.textContent = `${cycles} / 3 cycles`;
}

function stop(message) {
  clearInterval(interval);
  running = false;
  start.textContent = "Begin";
  start.setAttribute("aria-pressed", "false");
  phaseEl.textContent = "Ready";
  secondsEl.textContent = "00";
  orb.style.setProperty("--scale", "0.72");
  note.textContent = message;
}

function startTimer() {
  if (running) {
    stop("Stopped. The room is still here.");
    return;
  }

  running = true;
  phaseIndex = 0;
  cycles = 0;
  remaining = patterns[currentPattern].phases[0].seconds;
  start.textContent = "Stop";
  start.setAttribute("aria-pressed", "true");
  note.textContent = patterns[currentPattern].note;
  renderPhase();

  interval = setInterval(() => {
    remaining -= 1;

    if (remaining <= 0) {
      phaseIndex += 1;
      if (phaseIndex >= patterns[currentPattern].phases.length) {
        phaseIndex = 0;
        cycles += 1;
      }
      if (cycles >= 3) {
        stop("Three cycles. Thank you.");
        return;
      }
      remaining = patterns[currentPattern].phases[phaseIndex].seconds;
    }

    renderPhase();
  }, 1000);
}

patternButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (running) stop("Stopped. Choose a pattern when you are ready.");
    currentPattern = button.dataset.pattern;
    patternButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    note.textContent = patterns[currentPattern].note;
    phaseEl.textContent = "Ready";
    secondsEl.textContent = "00";
    cycleEl.textContent = "0 / 3 cycles";
  });
});

start?.addEventListener("click", startTimer);
