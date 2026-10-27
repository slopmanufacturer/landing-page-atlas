const countdown = document.querySelector("#countdown");
const closeDate = new Date("2026-12-21T18:00:00");

function updateCountdown() {
  if (!countdown) return;

  const distance = closeDate.getTime() - Date.now();

  if (distance <= 0) {
    countdown.textContent = "Closed for the season.";
    return;
  }

  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);

  const pad = (value) => String(value).padStart(2, "0");
  countdown.textContent = `Closes in ${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
