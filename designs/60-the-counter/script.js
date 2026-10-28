const STREAMS = {
  a: { rate: 4, start: 200, offset: 0, counters: "counters 1—2" },
  b: { rate: 6, start: 60, offset: 2, counters: "counters 3—4" },
  c: { rate: 5, start: 130, offset: 4, counters: "counters 5—6" },
};

const servingEls = {
  a: document.querySelector("#serving-a"),
  b: document.querySelector("#serving-b"),
  c: document.querySelector("#serving-c"),
};

const boardDay = document.querySelector("#board-day");
const boardState = document.querySelector("#board-state");
const serviceSelect = document.querySelector("#service-select");
const takeButton = document.querySelector("#take-ticket");
const ticketStatus = document.querySelector("#ticket-status");

function pad(number) {
  return String(number).padStart(3, "0");
}

function ticketNumber(stream, number) {
  return stream.toUpperCase() + "-" + pad(number);
}

function openMinutes(now) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day === 0) return null;
  if (day === 6) return minutes >= 540 && minutes < 750 ? minutes - 540 : null;
  if (day === 4) return minutes >= 525 && minutes < 1110 ? minutes - 525 : null;
  return minutes >= 525 && minutes < 1020 ? minutes - 525 : null;
}

function streamState(key, open) {
  const cfg = STREAMS[key];
  return {
    serving: cfg.start + Math.floor(open / cfg.rate),
    backlog: 2 + ((Math.floor(open / 6) + cfg.offset) % 6),
  };
}

function lastClosing(now) {
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (day >= 1 && day <= 5) {
    const close = day === 4 ? 1110 : 1020;
    if (minutes >= close) return close - 525;
  }

  if (day === 6 && minutes >= 750) return 750 - 540;

  return day === 0 || day === 1 ? 210 : 495;
}

function nextOpenText(now) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const minutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i <= 7; i += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const day = date.getDay();

    if (day === 0) continue;

    const opensAt = day === 6 ? 540 : 525;
    if (i === 0 && minutes >= opensAt) continue;

    const time = day === 6 ? "09:00" : "08:45";
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : "on " + days[day];
    return time + " " + when;
  }

  return "08:45 on Monday";
}

function renderBoard() {
  const now = new Date();
  const open = openMinutes(now);
  const serving = open === null ? lastClosing(now) : open;

  if (boardDay) {
    boardDay.textContent = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  Object.keys(STREAMS).forEach((key) => {
    const el = servingEls[key];
    if (!el) return;
    el.textContent = ticketNumber(key, streamState(key, serving).serving);
  });

  if (boardState) boardState.textContent = open === null ? "Closed" : "Open";
}

if (takeButton && serviceSelect && ticketStatus) {
  takeButton.addEventListener("click", () => {
    const now = new Date();
    const open = openMinutes(now);
    const key = serviceSelect.value;
    const cfg = STREAMS[key];

    if (!cfg) return;

    if (open === null) {
      ticketStatus.textContent =
        "Closed now. The machine switches on at " + nextOpenText(now) + ".";
      return;
    }

    const state = streamState(key, open);
    const number = state.serving + state.backlog;

    ticketStatus.textContent =
      "Ticket " +
      ticketNumber(key, number) +
      " / about " +
      state.backlog * cfg.rate +
      " minutes / " +
      cfg.counters +
      ". Mind the board.";
  });
}

renderBoard();
setInterval(renderBoard, 30000);

const bookForm = document.querySelector("#book-form");
const bookName = document.querySelector("#book-name");
const bookEmail = document.querySelector("#book-email");
const bookService = document.querySelector("#book-service");
const bookDay = document.querySelector("#book-day");
const bookStatus = document.querySelector("#book-status");

if (bookForm && bookName && bookEmail && bookService && bookDay && bookStatus) {
  bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameOk = bookName.value.trim().length > 1;
    const emailOk = bookEmail.value.trim() !== "" && bookEmail.validity.valid;

    if (!nameOk || !emailOk) {
      bookStatus.textContent = "Check the name and email, then try again.";
      if (!nameOk) {
        bookName.focus();
      } else {
        bookEmail.focus();
      }
      return;
    }

    bookStatus.textContent =
      "Appointment requested: " +
      bookService.value.toLowerCase() +
      ", " +
      bookDay.value.toLowerCase() +
      ". We confirm by email within one working day.";
    bookForm.reset();
  });
}
