const stops = [
  { name: "Eastgate", offset: 0 },
  { name: "St Anne's", offset: 3 },
  { name: "Corn Exchange", offset: 6 },
  { name: "Victoria Bridge", offset: 9 },
  { name: "Northgate", offset: 12 },
  { name: "Saltworks", offset: 15 },
  { name: "Bramble Hill", offset: 18 },
  { name: "Calderbank", offset: 21 },
];

const HEADWAY = 8;
const FIRST = 5 * 60 + 40;
const LAST = 23 * 60 + 30;
const TOTAL = stops[stops.length - 1].offset;

const boardBody = document.querySelector("#board-body");
const boardStop = document.querySelector("#board-stop");
const boardCaption = document.querySelector("#board-caption");
const boardNote = document.querySelector("#board-note");
const stopSelect = document.querySelector("#board-stop-select");
const dirButtons = Array.from(document.querySelectorAll("[data-dir]"));

let direction = "out";
let stopIndex = 0;

function minutesToTime(minutes) {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return String(h).padStart(2, "0") + ":" + String(mm).padStart(2, "0");
}

function departuresFor(offset) {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
  const start = FIRST + offset;
  const end = LAST + offset;
  const rows = [];

  if (nowMin <= end) {
    const k = Math.max(0, Math.ceil((nowMin - start) / HEADWAY));
    for (let i = 0; i < 4; i += 1) {
      const t = start + (k + i) * HEADWAY;
      if (t > end) break;
      rows.push({ t: t, tomorrow: false });
    }
  }

  if (rows.length < 4) {
    for (let i = 0; rows.length < 4; i += 1) {
      rows.push({ t: start + i * HEADWAY, tomorrow: true });
    }
  }

  return rows.map((row) => {
    const away = Math.max(0, Math.round(row.t - nowMin));
    let status = "On time";

    if (row.tomorrow) {
      status = "Tomorrow";
    } else if (away <= 0) {
      status = "Due";
    } else if (away <= 6) {
      status = away + " min";
    }

    return { time: minutesToTime(row.t), status: status };
  });
}

function updateDirectionButtons() {
  const last = stops.length - 1;

  dirButtons.forEach((button) => {
    const isOut = button.dataset.dir === "out";
    const invalid = (stopIndex === 0 && !isOut) || (stopIndex === last && isOut);
    const active = button.dataset.dir === direction;

    button.disabled = invalid;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function renderBoard() {
  if (!boardBody) return;

  const stop = stops[stopIndex];
  const offset = direction === "out" ? stop.offset : TOTAL - stop.offset;
  const destination = direction === "out" ? "Calderbank" : "Eastgate";
  const platform = direction === "out" ? "1" : "2";
  const rows = departuresFor(offset);

  boardBody.textContent = "";

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    [row.time, destination, platform, row.status].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    boardBody.appendChild(tr);
  });

  updateDirectionButtons();

  if (boardStop) boardStop.textContent = stop.name;
  if (boardCaption) {
    boardCaption.textContent =
      "Next departures from " + stop.name + " towards " + destination + ".";
  }
  if (boardNote) {
    const allTomorrow = rows.every((row) => row.status === "Tomorrow");
    boardNote.textContent = allTomorrow
      ? "First trams tomorrow from " + minutesToTime(FIRST + offset) + "."
      : "Signal testing at Victoria Bridge";
  }
}

dirButtons.forEach((button) => {
  button.addEventListener("click", () => {
    direction = button.dataset.dir;
    renderBoard();
  });
});

if (stopSelect) {
  stopSelect.addEventListener("change", () => {
    const found = stops.findIndex((stop) => stop.name === stopSelect.value);
    stopIndex = found < 0 ? 0 : found;

    if (stopIndex === 0 && direction === "in") {
      direction = "out";
    } else if (stopIndex === stops.length - 1 && direction === "out") {
      direction = "in";
    }

    renderBoard();
  });
}

renderBoard();
setInterval(renderBoard, 30000);

const clock = document.querySelector("#clock");

function updateClock() {
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-GB", { hour12: false });
  clock.dateTime = now.toISOString();
}

updateClock();
setInterval(updateClock, 1000);

const alertsForm = document.querySelector("#alerts-form");
const alertsEmail = document.querySelector("#alerts-email");
const alertsStop = document.querySelector("#alerts-stop");
const alertsStatus = document.querySelector("#alerts-status");

if (alertsForm && alertsEmail && alertsStop && alertsStatus) {
  alertsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!alertsEmail.value.trim() || !alertsEmail.validity.valid) {
      alertsStatus.textContent = "That email does not look right. Try again.";
      alertsEmail.focus();
      return;
    }

    alertsStatus.textContent =
      "You are signed up for " + alertsStop.value + " alerts. Check your inbox to confirm.";
    alertsForm.reset();
  });
}
