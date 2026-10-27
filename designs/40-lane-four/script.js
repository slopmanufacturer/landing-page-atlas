const schedule = {
  mon: {
    caption: "Monday / 25 m pool",
    note: "Monday: Masters before work, Junior after school.",
    sessions: [
      ["06:00", "Masters", "1—3", "Ruth"],
      ["18:30", "Junior", "4—6", "Ade"],
    ],
  },
  tue: {
    caption: "Tuesday / 25 m pool",
    note: "Tuesday: open water pool set, then Learn to Swim.",
    sessions: [
      ["06:00", "Open Water", "1—2", "Ruth"],
      ["19:00", "Learn to Swim", "3—6", "Mel"],
    ],
  },
  wed: {
    caption: "Wednesday / 25 m pool",
    note: "Wednesday: the middle of the week, the middle of the set.",
    sessions: [
      ["06:00", "Masters", "1—3", "Ruth"],
      ["18:30", "Junior", "4—6", "Ade"],
    ],
  },
  thu: {
    caption: "Thursday / 25 m pool",
    note: "Thursday: open water skills and a beginner lane.",
    sessions: [
      ["06:00", "Open Water", "1—2", "Ruth"],
      ["19:00", "Learn to Swim", "3—6", "Mel"],
    ],
  },
  fri: {
    caption: "Friday / 25 m pool",
    note: "Friday: short sets, long showers.",
    sessions: [
      ["06:00", "Masters", "1—3", "Ruth"],
      ["18:30", "Junior", "4—6", "Ade"],
    ],
  },
  sat: {
    caption: "Saturday / 25 m pool",
    note: "Saturday: all squads in the water, then the café.",
    sessions: [
      ["08:00", "All squads", "1—6", "All coaches"],
      ["10:00", "Learn to Swim", "3—6", "Mel"],
    ],
  },
  sun: {
    caption: "Sunday / Tinside",
    note: "Sunday: sea session from May to September. Meet at Tinside Lido.",
    sessions: [
      ["09:00", "Open Water", "Sea", "Ruth"],
    ],
  },
};

const dayButtons = Array.from(document.querySelectorAll("[data-day]"));
const scheduleBody = document.querySelector("#schedule-body");
const scheduleCaption = document.querySelector("#schedule-caption");
const scheduleNote = document.querySelector("#schedule-note");

function renderDay(day) {
  const entry = schedule[day];
  if (!entry || !scheduleBody || !scheduleCaption || !scheduleNote) return;

  scheduleBody.innerHTML = entry.sessions
    .map(([time, squad, lanes, coach]) => `<tr><td>${time}</td><td>${squad}</td><td>${lanes}</td><td>${coach}</td></tr>`)
    .join("");

  scheduleCaption.textContent = entry.caption;
  scheduleNote.textContent = entry.note;

  dayButtons.forEach((button) => {
    const active = button.dataset.day === day;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

dayButtons.forEach((button) => {
  button.addEventListener("click", () => renderDay(button.dataset.day));
});

renderDay("mon");

const trialForm = document.querySelector("#trial-form");
const trialName = document.querySelector("#trial-name");
const trialEmail = document.querySelector("#trial-email");
const trialNote = document.querySelector("#trial-note");

if (trialForm && trialName && trialEmail && trialNote) {
  trialForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!trialName.value.trim()) {
      trialNote.textContent = "We need a name for the lane list.";
      trialName.focus();
      return;
    }

    if (!trialEmail.value.trim() || !trialEmail.validity.valid) {
      trialNote.textContent = "That email does not look right. Try again.";
      trialEmail.focus();
      return;
    }

    trialNote.textContent = "Trial request sent. We reply within a day.";
    trialForm.reset();
  });
}
