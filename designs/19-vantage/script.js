const hourHand = document.querySelector("#hour-hand");
const minuteHand = document.querySelector("#minute-hand");
const secondHand = document.querySelector("#second-hand");
const digital = document.querySelector("#digital");
const dateWindow = document.querySelector("#watch-date");
const zoneButtons = document.querySelectorAll("[data-zone]");

let zone = "local";

function timeParts() {
  const now = new Date();

  if (zone === "geneva") {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Zurich",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).formatToParts(now);
    const get = (type) => Number(parts.find((part) => part.type === type)?.value || 0);
    return { hours: get("hour") % 24, minutes: get("minute"), seconds: get("second") };
  }

  return { hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
}

function updateWatch() {
  const { hours, minutes, seconds } = timeParts();

  const secondAngle = seconds * 6;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
  hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;

  const pad = (value) => String(value).padStart(2, "0");
  digital.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  if (dateWindow) dateWindow.textContent = String(new Date().getDate()).padStart(2, "0");
}

zoneButtons.forEach((button) => {
  button.addEventListener("click", () => {
    zone = button.dataset.zone;
    zoneButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    updateWatch();
  });
});

updateWatch();
setInterval(updateWatch, 1000);
