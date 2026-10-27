const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const stage = document.querySelector(".chart__stage");
const canvas = document.querySelector("#sky");
const readout = document.querySelector("#field-readout");
const fieldStatus = document.querySelector("#field-status");
const ctx = canvas?.getContext("2d");

const PHOS = "182, 255, 158";
const AMBER = "255, 179, 92";

let width = 0;
let height = 0;
let stars = [];
let pointer = { x: 0.56, y: 0.44, active: false };
let smooth = { x: 0.56, y: 0.44 };
let focus = { x: 0.5, y: 0.5 };
let focusTarget = { x: 0.5, y: 0.5 };
let activeField = null;
let lastReadout = 0;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function buildStars() {
  const list = [];

  for (let i = 0; i < 215; i += 1) {
    list.push({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.35, 1.15),
      a: rand(0.2, 0.75),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.25, 1.1),
      bright: Math.random() > 0.94,
    });
  }

  const clusters = [
    [0.62, 0.3],
    [0.38, 0.55],
    [0.7, 0.68],
  ];

  clusters.forEach(([cx, cy]) => {
    for (let i = 0; i < 28; i += 1) {
      list.push({
        x: cx + (Math.random() + Math.random() - 1) * 0.09,
        y: cy + (Math.random() + Math.random() - 1) * 0.08,
        r: rand(0.4, 1.3),
        a: rand(0.3, 0.9),
        phase: rand(0, Math.PI * 2),
        speed: rand(0.3, 1.2),
        bright: Math.random() > 0.8,
      });
    }
  });

  stars = list;
}

function resize() {
  if (!stage || !canvas || !ctx) return;
  const rect = stage.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function coordsFrom(x, y) {
  const ra = 16 + Math.min(Math.max(x, 0), 1) * 6;
  const dec = -10 + Math.min(Math.max(y, 0), 1) * 80;
  const rh = Math.floor(ra);
  const rm = Math.floor((ra - rh) * 60);
  const rs = Math.floor((((ra - rh) * 60) - rm) * 60);
  const sign = dec >= 0 ? "+" : "-";
  const abs = Math.abs(dec);
  const dd = Math.floor(abs);
  const dm = Math.floor((abs - dd) * 60);
  return `RA ${rh}h ${pad(rm)}m ${pad(rs)}s / DEC ${sign}${dd}° ${pad(dm)}′`;
}

function drawStar(star, time) {
  const twinkle = reduceMotion.matches
    ? 1
    : 0.55 + 0.45 * Math.sin(time * 0.001 * star.speed + star.phase);
  const x = star.x * width;
  const y = star.y * height;
  const alpha = star.a * twinkle;

  if (star.bright) {
    ctx.beginPath();
    ctx.arc(x, y, star.r * 3.6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${PHOS}, ${alpha * 0.07})`;
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(x, y, star.r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${PHOS}, ${alpha})`;
  ctx.fill();

  if (star.bright) {
    ctx.beginPath();
    ctx.moveTo(x - 4, y);
    ctx.lineTo(x + 4, y);
    ctx.moveTo(x, y - 4);
    ctx.lineTo(x, y + 4);
    ctx.strokeStyle = `rgba(${PHOS}, ${alpha * 0.35})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

function draw(time) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  smooth.x += (pointer.x - smooth.x) * 0.12;
  smooth.y += (pointer.y - smooth.y) * 0.12;
  focus.x += (focusTarget.x - focus.x) * 0.08;
  focus.y += (focusTarget.y - focus.y) * 0.08;

  const px = smooth.x * width;
  const py = smooth.y * height;
  const radius = Math.min(width, height) * 0.34;

  const near = [];

  stars.forEach((star) => {
    drawStar(star, time);
    const dx = star.x * width - px;
    const dy = star.y * height - py;
    const distance = Math.hypot(dx, dy);
    if (distance < radius) near.push({ star, distance });
  });

  near.sort((a, b) => a.distance - b.distance);
  const chosen = near.slice(0, 10);

  ctx.lineWidth = 0.6;
  chosen.forEach(({ star, distance }, index) => {
    const alpha = (1 - distance / radius) * 0.32;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(star.x * width, star.y * height);
    ctx.strokeStyle = `rgba(${PHOS}, ${alpha})`;
    ctx.stroke();

    for (let j = index + 1; j < chosen.length; j += 1) {
      const other = chosen[j].star;
      const dx = (star.x - other.x) * width;
      const dy = (star.y - other.y) * height;
      if (Math.hypot(dx, dy) < 76) {
        ctx.beginPath();
        ctx.moveTo(star.x * width, star.y * height);
        ctx.lineTo(other.x * width, other.y * height);
        ctx.strokeStyle = `rgba(${PHOS}, ${alpha * 0.65})`;
        ctx.stroke();
      }
    }
  });

  ctx.beginPath();
  ctx.arc(px, py, 15, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(${PHOS}, 0.28)`;
  ctx.lineWidth = 0.6;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(px - 24, py);
  ctx.lineTo(px - 8, py);
  ctx.moveTo(px + 8, py);
  ctx.lineTo(px + 24, py);
  ctx.moveTo(px, py - 24);
  ctx.lineTo(px, py - 8);
  ctx.moveTo(px, py + 8);
  ctx.lineTo(px, py + 24);
  ctx.strokeStyle = `rgba(${PHOS}, 0.5)`;
  ctx.stroke();

  const fx = focus.x * width;
  const fy = focus.y * height;
  const pulse = reduceMotion.matches ? 0 : Math.sin(time * 0.002) * 3;

  ctx.beginPath();
  ctx.arc(fx, fy, 24 + pulse, 0, Math.PI * 2);
  ctx.setLineDash([2, 5]);
  ctx.strokeStyle = activeField ? `rgba(${AMBER}, 0.8)` : `rgba(${PHOS}, 0.25)`;
  ctx.lineWidth = 0.8;
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.beginPath();
  ctx.moveTo(fx - 6, fy);
  ctx.lineTo(fx + 6, fy);
  ctx.moveTo(fx, fy - 6);
  ctx.lineTo(fx, fy + 6);
  ctx.strokeStyle = activeField ? `rgba(${AMBER}, 0.9)` : `rgba(${PHOS}, 0.35)`;
  ctx.stroke();

  if (activeField) {
    ctx.font = "8px 'IBM Plex Mono', monospace";
    ctx.fillStyle = `rgba(${AMBER}, 0.9)`;
    ctx.fillText(activeField.name.toUpperCase(), fx + 32, fy + 3);
  }
}

function loop(time) {
  if (!pointer.active && !reduceMotion.matches) {
    const t = time * 0.001;
    pointer.x = 0.54 + Math.cos(t * 0.13) * 0.2;
    pointer.y = 0.46 + Math.sin(t * 0.1) * 0.16;

    if (!activeField && time - lastReadout > 400) {
      readout.textContent = `Tracking / ${coordsFrom(pointer.x, pointer.y)}`;
      lastReadout = time;
    }
  }
  draw(time);
  requestAnimationFrame(loop);
}

if (stage && canvas && ctx) {
  buildStars();
  resize();

  if ("ResizeObserver" in window) {
    new ResizeObserver(resize).observe(stage);
  } else {
    window.addEventListener("resize", resize);
  }

  stage.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = stage.getBoundingClientRect();
    pointer.x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    pointer.y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
    pointer.active = true;
    readout.textContent = `Pointer / ${coordsFrom(pointer.x, pointer.y)}`;
  });

  stage.addEventListener("pointerleave", () => {
    pointer.active = false;
    if (!activeField) {
      readout.textContent = "Pointer / 00.0° 00.0°";
    }
  });

  requestAnimationFrame(loop);
}

document.querySelectorAll(".field").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".field").forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.removeAttribute("aria-current");
    });
    button.setAttribute("aria-current", "true");

    activeField = {
      name: button.dataset.name,
      x: Number(button.dataset.x),
      y: Number(button.dataset.y),
    };

    focusTarget = { x: activeField.x, y: activeField.y };

    readout.textContent = `Pointed / ${button.dataset.name} — ${button.dataset.ra} ${button.dataset.dec}`;
    fieldStatus.textContent = `Instrument pointed to ${button.dataset.name}, right ascension ${button.dataset.ra}, declination ${button.dataset.dec}.`;
  });
});

function updateClock() {
  const clock = document.querySelector("#utc");
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toISOString().slice(11, 19);
  clock.dateTime = now.toISOString();
}

updateClock();
setInterval(updateClock, 1000);

const boot = document.querySelector("#boot-text");
const bootMessage = "slew 04:17:22 UTC / optics nominal / dome open";

if (boot) {
  if (reduceMotion.matches) {
    boot.textContent = bootMessage;
  } else {
    let index = 0;
    const type = () => {
      boot.textContent = bootMessage.slice(0, index);
      index += 1;
      if (index <= bootMessage.length) {
        setTimeout(type, 32);
      }
    };
    setTimeout(type, 650);
  }
}

const form = document.querySelector("#request-form");
const confirm = document.querySelector("#request-confirm");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const night = String(data.get("night") || "");
  const party = String(data.get("party") || "1");

  const formatted = night
    ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(
        new Date(`${night}T00:00:00`)
      )
    : "an open night";

  confirm.textContent = `Request logged for ${name} (${party} ${party === "1" ? "person" : "people"}), ${formatted}. We will write to ${email} when the forecast agrees.`;
  form.reset();
});

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-in"));
}
