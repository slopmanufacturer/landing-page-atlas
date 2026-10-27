const routes = {
  fast: {
    name: "Route / Saturday fast",
    distance: "118 km",
    elevation: "1,860 m",
    average: "31 km/h",
    caption: "Fig. 01 — Coast loop, via Begur.",
    surface: "Tarmac",
    profile: [10, 18, 25, 22, 40, 35, 55, 48, 65, 60, 80, 72, 90],
  },
  social: {
    name: "Route / Sunday social",
    distance: "92 km",
    elevation: "1,240 m",
    average: "26 km/h",
    caption: "Fig. 01 — Valley loop, via Sant Hilari.",
    surface: "Tarmac",
    profile: [8, 12, 20, 30, 42, 38, 52, 48, 62, 58, 70, 66, 74],
  },
  hills: {
    name: "Route / Wednesday hills",
    distance: "64 km",
    elevation: "1,420 m",
    average: "24 km/h",
    caption: "Fig. 01 — Three climbs, via Rocacorba.",
    surface: "Tarmac / lights",
    profile: [5, 10, 45, 20, 15, 50, 25, 18, 58, 30, 22, 62, 40],
  },
};

const routeButtons = Array.from(document.querySelectorAll(".route-tabs button[data-route]"));
const routeCards = Array.from(document.querySelectorAll(".route-card"));
const profileLine = document.querySelector("#profile-line");
const profileFill = document.querySelector("#profile-fill");
const profilePoints = document.querySelector("#profile-points");
const profileName = document.querySelector("#profile-name");
const profileDistance = document.querySelector("#profile-distance");
const profileElevation = document.querySelector("#profile-elevation");
const profileAverage = document.querySelector("#profile-average");
const profileCaption = document.querySelector("#profile-caption");
const profileSurface = document.querySelector("#profile-surface");

function drawProfile(values) {
  const width = 560;
  const left = 30;
  const bottom = 220;
  const height = 180;
  const step = width / (values.length - 1);

  const points = values.map((value, index) => {
    const x = left + step * index;
    const y = bottom - (value / 100) * height;
    return [Math.round(x), Math.round(y)];
  });

  const line = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const fill = `${line} L${left + width} ${bottom} L${left} ${bottom} Z`;

  if (profileLine) profileLine.setAttribute("d", line);
  if (profileFill) profileFill.setAttribute("d", fill);
  if (profilePoints) {
    profilePoints.innerHTML = points
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`)
      .join("");
  }
}

function selectRoute(key) {
  const route = routes[key];
  if (!route) return;

  drawProfile(route.profile);

  if (profileName) profileName.textContent = route.name;
  if (profileDistance) profileDistance.textContent = route.distance;
  if (profileElevation) profileElevation.textContent = route.elevation;
  if (profileAverage) profileAverage.textContent = route.average;
  if (profileCaption) profileCaption.textContent = route.caption;
  if (profileSurface) profileSurface.textContent = route.surface;

  routeButtons.forEach((button) => {
    const active = button.dataset.route === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  routeCards.forEach((card) => {
    card.classList.toggle("is-active", card.dataset.route === key);
  });
}

routeButtons.forEach((button) => {
  if (!button.dataset.route) return;
  button.addEventListener("click", () => selectRoute(button.dataset.route));
});

selectRoute("social");

const joinForm = document.querySelector("#join-form");
const joinName = document.querySelector("#join-name");
const joinEmail = document.querySelector("#join-email");
const joinNote = document.querySelector("#join-note");

if (joinForm && joinName && joinEmail && joinNote) {
  joinForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!joinName.value.trim()) {
      joinNote.textContent = "We need a name for the kit list.";
      joinName.focus();
      return;
    }

    if (!joinEmail.value.trim() || !joinEmail.validity.valid) {
      joinNote.textContent = "That email does not look right. Try again.";
      joinEmail.focus();
      return;
    }

    joinNote.textContent = "Sent. Someone will reply after the Sunday ride.";
    joinForm.reset();
  });
}
