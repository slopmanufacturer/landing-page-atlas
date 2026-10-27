const sailings = {
  out: {
    label: "North Pier → Inch Island",
    caption: "North Pier to Inch Island, Monday to Saturday",
    times: [
      ["06:40", "MV Carrow", "First boat"],
      ["07:20", "MV Inch", "—"],
      ["08:00", "MV Carrow", "School run"],
      ["08:40", "MV Inch", "—"],
      ["09:20", "MV Carrow", "—"],
      ["10:00", "MV Inch", "—"],
      ["10:40", "MV Carrow", "—"],
      ["11:20", "MV Inch", "—"],
      ["12:00", "MV Carrow", "—"],
      ["12:40", "MV Inch", "Post bag"],
      ["13:20", "MV Carrow", "—"],
      ["14:00", "MV Inch", "—"],
      ["14:40", "MV Carrow", "—"],
      ["15:20", "MV Inch", "School run"],
      ["16:00", "MV Carrow", "—"],
      ["16:40", "MV Inch", "—"],
      ["17:20", "MV Carrow", "—"],
      ["18:00", "MV Inch", "—"],
      ["18:40", "MV Carrow", "—"],
      ["19:20", "MV Inch", "Last boat"],
    ],
  },
  back: {
    label: "Inch Island → North Pier",
    caption: "Inch Island to North Pier, Monday to Saturday",
    times: [
      ["07:00", "MV Carrow", "First boat"],
      ["07:40", "MV Inch", "—"],
      ["08:20", "MV Carrow", "School run"],
      ["09:00", "MV Inch", "—"],
      ["09:40", "MV Carrow", "—"],
      ["10:20", "MV Inch", "—"],
      ["11:00", "MV Carrow", "—"],
      ["11:40", "MV Inch", "—"],
      ["12:20", "MV Carrow", "Post bag"],
      ["13:00", "MV Inch", "—"],
      ["13:40", "MV Carrow", "—"],
      ["14:20", "MV Inch", "—"],
      ["15:00", "MV Carrow", "—"],
      ["15:40", "MV Inch", "School run"],
      ["16:20", "MV Carrow", "—"],
      ["17:00", "MV Inch", "—"],
      ["17:40", "MV Carrow", "—"],
      ["18:20", "MV Inch", "—"],
      ["19:00", "MV Carrow", "—"],
      ["19:40", "MV Inch", "Last boat"],
    ],
  },
};

const body = document.querySelector("#sailings");
const caption = document.querySelector("#table-caption");
const controls = Array.from(document.querySelectorAll(".control"));
const nextTime = document.querySelector("#next-time");
const nextRoute = document.querySelector("#next-route");
const nextVessel = document.querySelector("#next-vessel");
let direction = "out";

function minutes(time) {
  const [hours, mins] = time.split(":").map(Number);
  return hours * 60 + mins;
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function nextIndex(times, now) {
  const found = times.findIndex(([time]) => minutes(time) > now + 2);
  return found === -1 ? 0 : found;
}

function render(nextOnly) {
  const data = sailings[direction];
  if (!data || !body) return;

  if (caption) caption.textContent = data.caption;
  if (nextOnly) {
    const index = nextIndex(data.times, nowMinutes());
    const [time, vessel, note] = data.times[index];
    const tomorrow = minutes(data.times[index][0]) <= nowMinutes();
    if (nextTime) nextTime.textContent = time;
    if (nextRoute) nextRoute.textContent = data.label + (tomorrow ? " · tomorrow" : "");
    if (nextVessel) nextVessel.textContent = vessel + (note === "—" ? "" : " · " + note);
    return;
  }

  const index = nextIndex(data.times, nowMinutes());
  body.innerHTML = data.times
    .map(([time, vessel, note], i) => {
      const row = document.createElement("tr");
      if (i === index) row.className = "is-next";
      row.innerHTML = `<td>${time}</td><td>${vessel}</td><td>${note}</td>`;
      return row.outerHTML;
    })
    .join("");
}

controls.forEach((button) => {
  button.addEventListener("click", () => {
    direction = button.dataset.direction;
    controls.forEach((other) => {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", String(active));
    });
    render(false);
    render(true);
  });
});

render(false);
render(true);
