const paceForm = document.querySelector("#pace-form");
const distanceSelect = document.querySelector("#distance");
const minutesInput = document.querySelector("#target-min");
const secondsInput = document.querySelector("#target-sec");
const paceKm = document.querySelector("#pace-km");
const paceMile = document.querySelector("#pace-mile");
const splitsBody = document.querySelector("#splits tbody");
const paceStatus = document.querySelector("#pace-status");

function formatTime(totalSeconds) {
  const rounded = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  const seconds = rounded % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function distanceLabel(km) {
  if (Math.abs(km - 21.0975) < 0.01) return "half marathon";
  if (Math.abs(km - 42.195) < 0.01) return "marathon";
  return `${km} km`;
}

function renderSplits() {
  if (!paceForm || !distanceSelect || !minutesInput || !secondsInput || !splitsBody || !paceStatus) return;

  const distance = Number(distanceSelect.value);
  const minutes = Number(minutesInput.value);
  const seconds = Number(secondsInput.value);

  if (!Number.isFinite(distance) || distance <= 0) {
    paceStatus.textContent = "Pick a distance first.";
    return;
  }

  if (!Number.isFinite(minutes) || !Number.isFinite(seconds) || minutes < 0 || seconds < 0 || seconds > 59) {
    paceStatus.textContent = "Use whole minutes and 0—59 seconds.";
    return;
  }

  const total = minutes * 60 + seconds;

  if (total <= 0) {
    paceStatus.textContent = "A target time needs to be longer than zero.";
    return;
  }

  const perKm = total / distance;
  const perMile = total / (distance * 0.621371);

  paceKm.textContent = formatTime(perKm);
  paceMile.textContent = formatTime(perMile);

  const step = distance <= 10 ? 1 : 5;
  const points = [];

  for (let km = step; km < distance; km += step) {
    points.push(km);
  }

  points.push(distance);

  splitsBody.innerHTML = points
    .map((km, index) => {
      const label = Number.isInteger(km) ? `${km} km` : `${km.toFixed(1)} km`;
      return `<tr><td>${String(index + 1).padStart(2, "0")}</td><td>${label}</td><td>${formatTime(perKm * km)}</td></tr>`;
    })
    .join("");

  paceStatus.textContent = `Even pace for a ${formatTime(total)} ${distanceLabel(distance)}.`;
}

if (paceForm) {
  paceForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSplits();
  });

  distanceSelect?.addEventListener("change", renderSplits);
  minutesInput?.addEventListener("change", renderSplits);
  secondsInput?.addEventListener("change", renderSplits);

  renderSplits();
}

const joinForm = document.querySelector("#join-form");
const joinName = document.querySelector("#join-name");
const joinEmail = document.querySelector("#join-email");
const joinNote = document.querySelector("#join-note");

if (joinForm && joinName && joinEmail && joinNote) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!joinName.value.trim()) {
      joinNote.textContent = "We need a name to put on the list.";
      joinName.focus();
      return;
    }

    if (!joinEmail.value.trim() || !joinEmail.validity.valid) {
      joinNote.textContent = "That email does not look right. Try again.";
      joinEmail.focus();
      return;
    }

    joinNote.textContent = "Sent. Someone will reply before the next Sunday run.";
    joinForm.reset();
  });
}
