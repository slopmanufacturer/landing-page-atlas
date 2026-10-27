const dose = document.querySelector("#dose");
const ratio = document.querySelector("#ratio");
const water = document.querySelector("#water");
const time = document.querySelector("#time");
const note = document.querySelector("#calc-note");

function calculate() {
  const grams = Math.max(8, Math.min(60, Number(dose.value) || 15));
  const ratioValue = Number(ratio.value);
  const waterGrams = grams * ratioValue;
  const totalSeconds = Math.round(waterGrams * 0.68);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  water.textContent = `${waterGrams} g`;
  time.textContent = `${minutes}:${seconds}`;
  note.textContent = `${grams} g coffee, ${waterGrams} g water. Medium grind. Bloom with ${grams * 2} g water for 30 seconds.`;
}

dose?.addEventListener("input", calculate);
ratio?.addEventListener("change", calculate);
calculate();

const form = document.querySelector("#subscribe-form");
const subscribeNote = document.querySelector("#subscribe-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const email = new FormData(form).get("email");
  subscribeNote.textContent = `You're on the list. The next roast will find ${email} through the letterbox.`;
  form.reset();
});
