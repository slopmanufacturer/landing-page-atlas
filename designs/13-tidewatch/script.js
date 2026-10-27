const buoys = [
  { name: "North Sea 04", height: 1.84, water: "11.2°C", wind: "14 kn", swell: "1.84 m" },
  { name: "Dogger Bank", height: 1.42, water: "10.8°C", wind: "18 kn", swell: "1.42 m" },
  { name: "Firth of Forth", height: 0.96, water: "9.9°C", wind: "9 kn", swell: "0.96 m" },
  { name: "English Channel", height: 2.31, water: "12.4°C", wind: "22 kn", swell: "2.31 m" },
];

let selectedBuoy = 0;
let mode = "now";

const heightEl = document.querySelector("#height");
const buoyLabel = document.querySelector("#buoy-label");
const chartRange = document.querySelector("#chart-range");
const swellEl = document.querySelector("#swell");
const waterEl = document.querySelector("#water");
const windEl = document.querySelector("#wind");
const modeButtons = document.querySelectorAll("[data-mode]");
const buoyButtons = document.querySelectorAll("[data-buoy]");

function updateReadout() {
  const buoy = buoys[selectedBuoy];
  heightEl.textContent = buoy.height.toFixed(2);
  buoyLabel.textContent = buoy.name;
  swellEl.textContent = buoy.swell;
  waterEl.textContent = buoy.water;
  windEl.textContent = buoy.wind;
  chartRange.textContent = mode === "now" ? "Last 60 min" : mode === "24h" ? "Last 24 h" : "Last 7 days";
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    modeButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    updateReadout();
  });
});

buoyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedBuoy = Number(button.dataset.buoy);
    buoyButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    updateReadout();
  });
});

const canvas = document.querySelector("#chart");
const ctx = canvas?.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let width = 0;
let height = 0;

function resize() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function sample(x, time) {
  const buoy = buoys[selectedBuoy];
  const amplitude = buoy.height;
  const t = x / width;

  if (mode === "now") {
    return amplitude * (0.72 + 0.12 * Math.sin(t * 18 + time * 0.0015) + 0.06 * Math.sin(t * 41 + 1.2));
  }

  if (mode === "24h") {
    return amplitude * (0.66 + 0.3 * Math.sin(t * Math.PI * 2.2 + 0.6) + 0.08 * Math.sin(t * Math.PI * 8));
  }

  return amplitude * (0.7 + 0.18 * Math.sin(t * Math.PI * 1.2 + 0.3) + 0.05 * Math.sin(t * Math.PI * 5));
}

function draw(time) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const pad = 16;
  const top = height * 0.32;
  const bottom = height * 0.88;
  const scale = (bottom - top) / 3.2;

  ctx.strokeStyle = "rgba(159, 245, 214, 0.12)";
  ctx.lineWidth = 0.5;
  for (let i = 0; i <= 4; i += 1) {
    const y = top + ((bottom - top) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad, y);
    ctx.lineTo(width - pad, y);
    ctx.stroke();
  }

  for (let i = 0; i <= 6; i += 1) {
    const x = pad + ((width - pad * 2) / 6) * i;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
  }

  ctx.beginPath();
  for (let x = pad; x <= width - pad; x += 2) {
    const value = sample(x, time);
    const y = bottom - value * scale;
    if (x === pad) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }

  ctx.lineTo(width - pad, bottom);
  ctx.lineTo(pad, bottom);
  ctx.closePath();
  const fill = ctx.createLinearGradient(0, top, 0, bottom);
  fill.addColorStop(0, "rgba(159, 245, 214, 0.22)");
  fill.addColorStop(1, "rgba(159, 245, 214, 0.01)");
  ctx.fillStyle = fill;
  ctx.fill();

  ctx.beginPath();
  for (let x = pad; x <= width - pad; x += 2) {
    const value = sample(x, time);
    const y = bottom - value * scale;
    if (x === pad) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#9ff5d6";
  ctx.lineWidth = 1.6;
  ctx.shadowColor = "rgba(159, 245, 214, 0.45)";
  ctx.shadowBlur = 6;
  ctx.stroke();
  ctx.shadowBlur = 0;

  const value = sample(width * 0.78, time);
  const dotX = width * 0.78;
  const dotY = bottom - value * scale;
  ctx.beginPath();
  ctx.arc(dotX, dotY, 3.2, 0, Math.PI * 2);
  ctx.fillStyle = "#ff7a59";
  ctx.fill();
}

function loop(time) {
  draw(reduceMotion.matches ? 0 : time);
  requestAnimationFrame(loop);
}

if (canvas && ctx) {
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
  requestAnimationFrame(loop);
}

updateReadout();
