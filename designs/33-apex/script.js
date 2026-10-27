const throttle = document.querySelector("#throttle");
const rpm = document.querySelector("#rpm");
const power = document.querySelector("#power");
const canvas = document.querySelector("#torque");
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
  draw();
}

function draw() {
  if (!ctx) return;
  const value = Number(throttle.value) / 100;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "rgba(232, 225, 210, 0.12)";
  ctx.lineWidth = 0.5;

  for (let i = 0; i <= 4; i += 1) {
    const y = 10 + ((height - 20) / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  for (let i = 0; i <= 8; i += 1) {
    const x = (width / 8) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  ctx.beginPath();
  for (let x = 0; x <= width; x += 2) {
    const t = x / width;
    const base = 0.34 + Math.sin(t * Math.PI) * 0.42;
    const curve = base * (0.65 + value * 0.35) + Math.sin(t * Math.PI * 3) * 0.04;
    const y = height - 12 - curve * (height - 28);
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#e63322";
  ctx.lineWidth = 2;
  ctx.stroke();

  const currentRpm = Math.round(1200 + value * 6800);
  rpm.textContent = `${currentRpm.toLocaleString("en-GB")} rpm`;
  power.textContent = `${Math.round(45 + value * 51)} Nm`;
}

throttle?.addEventListener("input", () => {
  if (!reduceMotion.matches) draw();
  else draw();
});

if (canvas && ctx) {
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
  draw();
}
