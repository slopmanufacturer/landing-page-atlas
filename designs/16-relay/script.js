const canvas = document.querySelector("#mesh");
const ctx = canvas?.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let width = 0;
let height = 0;
let nodes = [];
let links = [];

function layout() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  nodes = [
    { x: 0.18, y: 0.28, label: "M-01" },
    { x: 0.42, y: 0.18, label: "M-02" },
    { x: 0.68, y: 0.26, label: "M-03" },
    { x: 0.84, y: 0.46, label: "M-04" },
    { x: 0.66, y: 0.64, label: "M-05" },
    { x: 0.4, y: 0.72, label: "M-06" },
    { x: 0.2, y: 0.58, label: "M-07" },
    { x: 0.5, y: 0.44, label: "CORE" },
  ];

  links = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0],
    [0, 7], [2, 7], [4, 7], [6, 7], [1, 7],
  ];
}

function draw(time) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  links.forEach(([a, b], index) => {
    const start = nodes[a];
    const end = nodes[b];
    ctx.beginPath();
    ctx.moveTo(start.x * width, start.y * height);
    ctx.lineTo(end.x * width, end.y * height);
    ctx.strokeStyle = "rgba(123, 156, 255, 0.3)";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    if (reduceMotion.matches) return;

    const speed = 0.00018 + (index % 3) * 0.00004;
    const progress = (time * speed + index * 0.17) % 1;
    const x = (start.x + (end.x - start.x) * progress) * width;
    const y = (start.y + (end.y - start.y) * progress) * height;

    ctx.beginPath();
    ctx.arc(x, y, 1.8, 0, Math.PI * 2);
    ctx.fillStyle = index % 4 === 0 ? "#d8ff5e" : "#7b9cff";
    ctx.shadowColor = ctx.fillStyle;
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0;
  });

  nodes.forEach((node) => {
    const x = node.x * width;
    const y = node.y * height;
    const core = node.label === "CORE";
    ctx.beginPath();
    ctx.arc(x, y, core ? 5 : 3.2, 0, Math.PI * 2);
    ctx.fillStyle = core ? "#d8ff5e" : "#7b9cff";
    ctx.fill();

    if (core) {
      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(216, 255, 94, 0.3)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  });
}

function loop(time) {
  draw(reduceMotion.matches ? 0 : time);
  requestAnimationFrame(loop);
}

if (canvas && ctx) {
  layout();
  if ("ResizeObserver" in window) new ResizeObserver(layout).observe(canvas);
  else window.addEventListener("resize", layout);
  requestAnimationFrame(loop);
}

const packetLog = document.querySelector("#packet-log");
const prefixes = ["M-01", "M-02", "M-03", "M-04", "M-05", "M-06", "M-07", "CORE"];
const sizes = ["1.2 KB", "4.8 KB", "12 KB", "220 B", "3.1 KB", "640 B"];

function packetLine() {
  const source = prefixes[Math.floor(Math.random() * prefixes.length)];
  let target = prefixes[Math.floor(Math.random() * prefixes.length)];
  if (target === source) target = "CORE";
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  return `<li><span>${time}</span><span>${source}</span><span>${target}</span><span>${sizes[Math.floor(Math.random() * sizes.length)]}</span></li>`;
}

if (packetLog) {
  for (let i = 0; i < 8; i += 1) {
    packetLog.insertAdjacentHTML("beforeend", packetLine());
  }

  if (!reduceMotion.matches) {
    setInterval(() => {
      packetLog.insertAdjacentHTML("beforeend", packetLine());
      if (packetLog.children.length > 9) packetLog.removeChild(packetLog.firstElementChild);
    }, 1600);
  }
}

const form = document.querySelector("#join-form");
const note = document.querySelector("#join-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const postcode = new FormData(form).get("postcode");
  note.textContent = `We will check the line of sight for ${postcode}. If there is a relay in range, you will hear from a person.`;
  form.reset();
});
