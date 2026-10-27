const satellites = [
  { id: "AST-01", name: "Meridian", orbit: "LEO", altitude: "550 km", velocity: "7.59 km/s", pass: "14:22 UTC", state: "Nominal", signal: "98%" },
  { id: "AST-02", name: "Kestrel", orbit: "LEO", altitude: "610 km", velocity: "7.56 km/s", pass: "15:04 UTC", state: "Nominal", signal: "96%" },
  { id: "AST-03", name: "Harrow", orbit: "SSO", altitude: "720 km", velocity: "7.48 km/s", pass: "16:11 UTC", state: "Drift", signal: "81%" },
  { id: "AST-04", name: "Juniper", orbit: "LEO", altitude: "540 km", velocity: "7.60 km/s", pass: "17:38 UTC", state: "Nominal", signal: "99%" },
];

let selected = 0;
const detail = document.querySelector("#fleet-detail");
const orbitName = document.querySelector("#orbit-name");
const orbitAlt = document.querySelector("#orbit-alt");
const satButtons = document.querySelectorAll(".sat");

function renderDetail(index) {
  const sat = satellites[index];
  selected = index;

  detail.innerHTML = `
    <div class="fleet__detail-head">
      <span class="fleet__id">${sat.id}</span>
      <span class="fleet__state">${sat.state}</span>
    </div>
    <h3>${sat.name}</h3>
    <dl>
      <div><dt>Orbit</dt><dd>${sat.orbit}</dd></div>
      <div><dt>Altitude</dt><dd>${sat.altitude}</dd></div>
      <div><dt>Velocity</dt><dd>${sat.velocity}</dd></div>
      <div><dt>Next pass</dt><dd>${sat.pass}</dd></div>
    </dl>
    <div class="signal">
      <span>Signal</span>
      <div class="signal__bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <strong>${sat.signal}</strong>
    </div>`;

  orbitName.textContent = `${sat.id} ${sat.name}`;
  orbitAlt.textContent = sat.altitude;

  satButtons.forEach((button, i) => {
    const active = i === index;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

satButtons.forEach((button) => {
  button.addEventListener("click", () => renderDetail(Number(button.dataset.sat)));
});

const canvas = document.querySelector("#orbit");
const ctx = canvas?.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let width = 0;
let height = 0;
let stars = [];

function resize() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  stars = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height * 0.7,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.5 + 0.2,
  }));
}

function draw(time) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  const cx = width / 2;
  const cy = height * 0.48;

  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(216, 230, 242, ${star.a})`;
    ctx.fill();
  });

  const planetY = height * 1.1;
  const planetR = height * 0.55;
  const gradient = ctx.createRadialGradient(cx, planetY - planetR * 0.4, 10, cx, planetY, planetR);
  gradient.addColorStop(0, "rgba(45, 110, 135, 0.55)");
  gradient.addColorStop(1, "rgba(6, 16, 31, 1)");
  ctx.beginPath();
  ctx.arc(cx, planetY, planetR, 0, Math.PI * 2);
  ctx.fillStyle = gradient;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cx, planetY, planetR, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(111, 242, 255, 0.35)";
  ctx.lineWidth = 1;
  ctx.stroke();

  const orbits = [
    { rx: width * 0.36, ry: height * 0.14, tilt: -0.18, speed: 0.00022, offset: 0 },
    { rx: width * 0.42, ry: height * 0.19, tilt: 0.08, speed: 0.00017, offset: 2.1 },
    { rx: width * 0.3, ry: height * 0.1, tilt: -0.05, speed: 0.00027, offset: 4.2 },
  ];

  orbits.forEach((orbit, index) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(orbit.tilt);
    ctx.beginPath();
    ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = index === selected ? "rgba(111, 242, 255, 0.55)" : "rgba(111, 242, 255, 0.16)";
    ctx.lineWidth = index === selected ? 1.3 : 0.7;
    ctx.stroke();
    ctx.restore();

    const angle = (reduceMotion.matches ? 0 : time * orbit.speed) + orbit.offset;
    const x = cx + Math.cos(angle) * orbit.rx * Math.cos(orbit.tilt) - Math.sin(angle) * orbit.ry * Math.sin(orbit.tilt);
    const y = cy + Math.cos(angle) * orbit.rx * Math.sin(orbit.tilt) + Math.sin(angle) * orbit.ry * Math.cos(orbit.tilt);

    ctx.beginPath();
    ctx.arc(x, y, index === selected ? 4 : 2.4, 0, Math.PI * 2);
    ctx.fillStyle = index === selected ? "#ffb454" : "#6ff2ff";
    ctx.shadowColor = index === selected ? "rgba(255, 180, 84, 0.8)" : "rgba(111, 242, 255, 0.8)";
    ctx.shadowBlur = index === selected ? 12 : 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  ctx.beginPath();
  ctx.arc(cx, cy, 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(111, 242, 255, 0.7)";
  ctx.fill();
}

function loop(time) {
  draw(time);
  requestAnimationFrame(loop);
}

if (canvas && ctx) {
  resize();
  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(canvas);
  } else {
    window.addEventListener("resize", resize);
  }
  requestAnimationFrame(loop);
}

function updateClock() {
  const clock = document.querySelector("#utc");
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toISOString().slice(11, 19);
  clock.dateTime = now.toISOString();
}

updateClock();
setInterval(updateClock, 1000);

renderDetail(0);
