const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const knobState = { cutoff: 62, resonance: 38, drive: 24 };
const knobs = document.querySelectorAll(".knob");
const readout = document.querySelector("#scope-readout");

function updateReadout() {
  if (!readout) return;
  readout.textContent = `C${knobState.cutoff} / R${knobState.resonance} / D${knobState.drive}`;
}

function setKnob(element, value) {
  const key = element.dataset.knob;
  const next = clamp(Math.round(value), 0, 100);
  knobState[key] = next;

  element.setAttribute("aria-valuenow", String(next));
  element.querySelector(".knob__value").textContent = String(next);
  element
    .querySelector(".knob__dial")
    .style.setProperty("--angle", `${-135 + (next / 100) * 270}deg`);

  updateReadout();
}

knobs.forEach((knob) => {
  const key = knob.dataset.knob;
  let dragging = false;
  let startY = 0;
  let startValue = 0;

  knob.addEventListener("pointerdown", (event) => {
    dragging = true;
    startY = event.clientY;
    startValue = knobState[key];
    knob.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  knob.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    setKnob(knob, startValue + (startY - event.clientY) * 0.7);
  });

  const stop = (event) => {
    if (!dragging) return;
    dragging = false;
    if (knob.hasPointerCapture(event.pointerId)) {
      knob.releasePointerCapture(event.pointerId);
    }
  };

  knob.addEventListener("pointerup", stop);
  knob.addEventListener("pointercancel", stop);

  knob.addEventListener("keydown", (event) => {
    let next = null;

    if (event.key === "ArrowUp" || event.key === "ArrowRight") next = knobState[key] + 5;
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") next = knobState[key] - 5;
    if (event.key === "PageUp") next = knobState[key] + 10;
    if (event.key === "PageDown") next = knobState[key] - 10;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 100;

    if (next !== null) {
      event.preventDefault();
      setKnob(knob, next);
    }
  });
});

const scope = document.querySelector("#scope");
const scopeWrap = document.querySelector(".scope");
const scopeCtx = scope?.getContext("2d");
const powerButton = document.querySelector("#power");
let powered = true;
let scopeWidth = 0;
let scopeHeight = 0;

function resizeScope() {
  if (!scope || !scopeWrap || !scopeCtx) return;
  const rect = scopeWrap.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  scopeWidth = rect.width;
  scopeHeight = rect.height;
  scope.width = Math.round(scopeWidth * dpr);
  scope.height = Math.round(scopeHeight * dpr);
  scopeCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawScope(time) {
  if (!scopeCtx) return;

  const w = scopeWidth;
  const h = scopeHeight;
  scopeCtx.clearRect(0, 0, w, h);

  scopeCtx.lineWidth = 0.5;
  scopeCtx.strokeStyle = "rgba(232, 255, 0, 0.09)";

  for (let x = 0; x <= w; x += 24) {
    scopeCtx.beginPath();
    scopeCtx.moveTo(x, 0);
    scopeCtx.lineTo(x, h);
    scopeCtx.stroke();
  }

  for (let y = 0; y <= h; y += 24) {
    scopeCtx.beginPath();
    scopeCtx.moveTo(0, y);
    scopeCtx.lineTo(w, y);
    scopeCtx.stroke();
  }

  scopeCtx.strokeStyle = "rgba(232, 255, 0, 0.18)";
  scopeCtx.beginPath();
  scopeCtx.moveTo(0, h / 2);
  scopeCtx.lineTo(w, h / 2);
  scopeCtx.stroke();

  if (!powered) {
    scopeCtx.strokeStyle = "rgba(232, 255, 0, 0.35)";
    scopeCtx.lineWidth = 1;
    scopeCtx.beginPath();
    scopeCtx.moveTo(0, h / 2);
    scopeCtx.lineTo(w, h / 2);
    scopeCtx.stroke();
    return;
  }

  const t = reduceMotion.matches ? 0 : time * 0.0012;
  const freq = 1 + (knobState.cutoff / 100) * 6;
  const resonance = knobState.resonance / 100;
  const drive = knobState.drive / 100;
  const amp = h * (0.24 + drive * 0.12);

  scopeCtx.beginPath();
  scopeCtx.lineWidth = 1.7;
  scopeCtx.strokeStyle = "#e8ff00";
  scopeCtx.shadowColor = "rgba(232, 255, 0, 0.55)";
  scopeCtx.shadowBlur = 7;

  for (let x = 0; x <= w; x += 2) {
    const phase = (x / w) * Math.PI * 2 * freq + t * 5;
    let value = Math.sin(phase);
    value += Math.sin(phase * 2 + 0.8) * resonance * 0.32;
    value += Math.sin(phase * 3 + 1.9) * resonance * 0.14;
    value = Math.tanh(value * (1 + drive * 2.2));

    const y = h / 2 - value * amp;
    if (x === 0) scopeCtx.moveTo(x, y);
    else scopeCtx.lineTo(x, y);
  }

  scopeCtx.stroke();
  scopeCtx.shadowBlur = 0;
}

function scopeLoop(time) {
  drawScope(time);
  requestAnimationFrame(scopeLoop);
}

if (scope && scopeCtx) {
  resizeScope();

  if ("ResizeObserver" in window) {
    new ResizeObserver(resizeScope).observe(scopeWrap);
  } else {
    window.addEventListener("resize", resizeScope);
  }

  requestAnimationFrame(scopeLoop);
}

powerButton?.addEventListener("click", () => {
  powered = !powered;
  powerButton.classList.toggle("is-off", !powered);
  powerButton.setAttribute("aria-pressed", String(powered));
  drawScope(performance.now());
});

updateReadout();

const orderForm = document.querySelector("#order-form");
const quantity = document.querySelector("#order-qty");
const total = document.querySelector("#order-total");
const orderNote = document.querySelector("#order-confirm");
const UNIT_PRICE = 1290;

function updateTotal() {
  const qty = Number(quantity?.value || 1);
  if (total) {
    total.textContent = `£${(UNIT_PRICE * qty).toLocaleString("en-GB")}`;
  }
}

quantity?.addEventListener("change", updateTotal);

orderForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  const data = new FormData(orderForm);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const finish = String(data.get("finish") || "Black anodised");
  const qty = Number(data.get("qty") || 1);
  const ref = `HW-6-${String(Math.floor(Math.random() * 9000) + 1000)}`;

  orderNote.textContent = `Order ${ref} logged for ${qty} × HYDRA-6 in ${finish}. No payment taken — a proforma is on its way to ${email}. Thank you, ${name}.`;
  orderForm.classList.add("is-logged");
});

updateTotal();

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
