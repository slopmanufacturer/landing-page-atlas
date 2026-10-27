const canvas = document.querySelector("#bubbles");
const ctx = canvas?.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let width = 0;
let height = 0;
let bubbles = [];

function resize() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = rect.width;
  height = rect.height;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  bubbles = Array.from({ length: 34 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 2.4 + 0.8,
    speed: Math.random() * 0.4 + 0.2,
    drift: Math.random() * Math.PI * 2,
  }));
}

function draw(time) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);

  bubbles.forEach((bubble) => {
    const y = reduceMotion.matches
      ? bubble.y
      : (bubble.y - time * 0.001 * bubble.speed * 20) % height;
    const x = bubble.x + Math.sin(time * 0.001 + bubble.drift) * 4;
    const drawY = y < 0 ? y + height : y;

    ctx.beginPath();
    ctx.arc(x, drawY, bubble.r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(184, 138, 62, 0.5)";
    ctx.lineWidth = 0.8;
    ctx.stroke();
  });
}

function loop(time) {
  draw(time);
  requestAnimationFrame(loop);
}

if (canvas && ctx) {
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
  else window.addEventListener("resize", resize);
  requestAnimationFrame(loop);
}

const shops = {
  reims: { shop: "La Cave du Nord", address: "18 Rue de Mars, 51100 Reims", stock: "12 bottles / 2 cases" },
  paris: { shop: "Le Cellier", address: "44 Rue de Charonne, 75011 Paris", stock: "6 bottles / 1 case" },
  london: { shop: "Noble Rot Wines", address: "51 Lamb's Conduit St, London WC1N", stock: "4 bottles" },
  tokyo: { shop: "Vinum Tokyo", address: "2-11-3 Ebisu, Shibuya", stock: "8 bottles / 1 case" },
};

const city = document.querySelector("#city");
const result = document.querySelector("#locator-result");

city?.addEventListener("change", () => {
  const shop = shops[city.value];
  result.innerHTML = `<span class="locator__shop">${shop.shop}</span><span class="locator__address">${shop.address}</span><span class="locator__stock">${shop.stock}</span>`;
});
