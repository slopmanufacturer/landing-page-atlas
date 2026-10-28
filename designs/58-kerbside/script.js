const ROUNDS = {
  a: { label: "Round A", day: 2 },
  b: { label: "Round B", day: 4 },
  c: { label: "Round C", day: 5 },
};

const streetSelect = document.querySelector("#street-select");
const scheduleRound = document.querySelector("#schedule-round");
const scheduleDate = document.querySelector("#schedule-date");
const scheduleBins = document.querySelector("#schedule-bins");
const scheduleNote = document.querySelector("#schedule-note");

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

function nextCollection(day) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = (day - today.getDay() + 7) % 7;
  today.setDate(today.getDate() + diff);
  return today;
}

function binFor(date) {
  const bins = [];

  if (isoWeek(date) % 2 === 0) {
    bins.push({
      name: "Black bin — general waste",
      dot: "var(--bin-black)",
      note: "Refuse week",
    });
  } else {
    bins.push({
      name: "Blue bin — recycling",
      dot: "var(--bin-blue)",
      note: "Recycling week",
    });
  }

  bins.push({
    name: "Brown caddy — food waste",
    dot: "var(--bin-food)",
    note: "Every week",
  });

  const month = date.getMonth();
  if (month >= 2 && month <= 10) {
    bins.push({
      name: "Green bin — garden waste",
      dot: "var(--bin-green)",
      note: "March—November",
    });
  }

  return bins;
}

function renderSchedule() {
  if (!streetSelect || !scheduleDate || !scheduleBins || !scheduleRound || !scheduleNote) {
    return;
  }

  const round = ROUNDS[streetSelect.value] || ROUNDS.a;
  const date = nextCollection(round.day);
  const isToday = date.toDateString() === new Date().toDateString();

  scheduleRound.textContent = round.label;
  scheduleDate.textContent =
    (isToday ? "Today, " : "") +
    date.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });

  scheduleBins.textContent = "";

  binFor(date).forEach((bin) => {
    const li = document.createElement("li");
    li.style.setProperty("--dot", bin.dot);

    const name = document.createElement("span");
    name.textContent = bin.name;

    const note = document.createElement("small");
    note.textContent = bin.note;

    li.append(name, note);
    scheduleBins.appendChild(li);
  });

  scheduleNote.textContent = isToday
    ? "Out by 07:00 this morning. If it is already gone, the crew has been and gone."
    : "Out by 07:00 on the day. We collect from the kerb, not the garden.";
}

if (streetSelect) {
  streetSelect.addEventListener("change", renderSchedule);
  renderSchedule();
}

const itemSearch = document.querySelector("#item-search");
const binButtons = Array.from(document.querySelectorAll(".filters button[data-bin]"));
const items = Array.from(document.querySelectorAll("#item-list .item"));
const itemCount = document.querySelector("#item-count");
const itemEmpty = document.querySelector("#item-empty");

let activeBin = "all";

function applyItemFilters() {
  const query = itemSearch ? itemSearch.value.trim().toLowerCase() : "";
  let visible = 0;

  items.forEach((item) => {
    const matchesBin = activeBin === "all" || item.dataset.bin === activeBin;
    const matchesText = !query || item.textContent.toLowerCase().includes(query);
    const show = matchesBin && matchesText;

    item.hidden = !show;
    if (show) visible += 1;
  });

  binButtons.forEach((button) => {
    const active = button.dataset.bin === activeBin;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  if (itemCount) itemCount.textContent = "Showing " + visible + " of " + items.length + " items";
  if (itemEmpty) itemEmpty.hidden = visible !== 0;
}

binButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeBin = button.dataset.bin;
    applyItemFilters();
  });
});

if (itemSearch) {
  itemSearch.addEventListener("input", applyItemFilters);
  itemSearch.addEventListener("search", applyItemFilters);
}

if (items.length) applyItemFilters();

const reportForm = document.querySelector("#report-form");
const reportName = document.querySelector("#report-name");
const reportEmail = document.querySelector("#report-email");
const reportStreet = document.querySelector("#report-street");
const reportBin = document.querySelector("#report-bin");
const reportStatus = document.querySelector("#report-status");

if (reportForm && reportName && reportEmail && reportStreet && reportBin && reportStatus) {
  reportForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameOk = reportName.value.trim().length > 1;
    const emailOk = reportEmail.value.trim() !== "" && reportEmail.validity.valid;

    if (!nameOk || !emailOk) {
      reportStatus.textContent = "Check the name and email, then try again.";
      if (!nameOk) {
        reportName.focus();
      } else {
        reportEmail.focus();
      }
      return;
    }

    reportStatus.textContent =
      "Reported: " +
      reportBin.value.toLowerCase() +
      ", " +
      reportStreet.value +
      ". We will come back within two working days, and email you when we do.";
    reportForm.reset();
  });
}
