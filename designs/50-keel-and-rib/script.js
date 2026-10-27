const slider = document.querySelector("#length");
const value = document.querySelector("#length-value");
const lines = {
  haul: document.querySelector("#line-haul"),
  store: document.querySelector("#line-store"),
  paint: document.querySelector("#line-paint"),
  shed: document.querySelector("#line-shed"),
};
const total = document.querySelector("#total");

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

function update() {
  const length = Number(slider.value);
  const haul = length * 18;
  const store = length * 4 * 26;
  const paint = length * 22;
  const shed = 12 * 45;

  if (value) value.textContent = length.toFixed(1) + " m";
  lines.haul.textContent = money.format(haul);
  lines.store.textContent = money.format(store);
  lines.paint.textContent = money.format(paint);
  lines.shed.textContent = money.format(shed);
  total.textContent = money.format(haul + store + paint + shed);
}

slider.addEventListener("input", update);
update();
