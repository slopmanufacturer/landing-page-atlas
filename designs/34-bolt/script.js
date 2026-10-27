const slider = document.querySelector("#load-slider");
const beam = document.querySelector("#beam");
const deflection = document.querySelector("#deflection");
const loadLabel = document.querySelector("#load-label");
const status = document.querySelector("#status");
const capacity = document.querySelector("#capacity");

function update() {
  const value = Number(slider.value) / 100;
  const sag = value * 46;
  const mm = (value * 7.4).toFixed(1);
  const load = (value * 2).toFixed(1);

  beam.setAttribute("d", `M80 180 Q 320 ${180 + sag} 560 180`);
  deflection.textContent = `${mm} mm`;
  loadLabel.textContent = `${load} kN`;

  if (value > 0.82) {
    status.textContent = "Over safe load";
    status.style.color = "#e23b2e";
    capacity.textContent = "4.8 kN safe / exceeded";
  } else {
    status.textContent = "Within spec";
    status.style.color = "#ff6a00";
    capacity.textContent = "4.8 kN safe";
  }
}

slider?.addEventListener("input", update);
update();
