const weight = document.querySelector("#weight");
const width = document.querySelector("#width");
const weightValue = document.querySelector("#weight-value");
const widthValue = document.querySelector("#width-value");
const specimen = document.querySelector("#specimen-text");

function update() {
  const wght = Number(weight.value);
  const wdth = Number(width.value);

  weightValue.textContent = String(wght);
  widthValue.textContent = String(wdth);
  specimen.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}`;
  specimen.style.fontWeight = String(wght);
}

weight?.addEventListener("input", update);
width?.addEventListener("input", update);
update();
