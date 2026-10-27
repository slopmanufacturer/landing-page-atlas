const nodes = [
  { id: "N-01", name: "North Ridge", demand: "1.21 GW", gen: "1.42 GW", renew: "64%", state: "Exporting" },
  { id: "N-02", name: "Harbour", demand: "0.98 GW", gen: "0.72 GW", renew: "12%", state: "Importing" },
  { id: "N-03", name: "Eastfield", demand: "1.42 GW", gen: "1.18 GW", renew: "28%", state: "Importing" },
  { id: "N-04", name: "South Bank", demand: "0.76 GW", gen: "0.88 GW", renew: "51%", state: "Exporting" },
  { id: "N-05", name: "Westmoor", demand: "0.45 GW", gen: "0.71 GW", renew: "82%", state: "Exporting" },
];

const nodeId = document.querySelector("#node-id");
const nodeState = document.querySelector("#node-state");
const nodeName = document.querySelector("#node-name");
const nodeDemand = document.querySelector("#node-demand");
const nodeGen = document.querySelector("#node-gen");
const nodeRenew = document.querySelector("#node-renew");
const buttons = document.querySelectorAll(".node");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const node = nodes[Number(button.dataset.node)];

    buttons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    nodeId.textContent = node.id;
    nodeState.textContent = node.state;
    nodeName.textContent = node.name;
    nodeDemand.textContent = node.demand;
    nodeGen.textContent = node.gen;
    nodeRenew.textContent = node.renew;
  });
});

const freq = document.querySelector("#freq");
const freqBig = document.querySelector("#freq-big");

function updateFrequency() {
  const now = Date.now();
  const value = (50 + Math.sin(now / 9000) * 0.04 + Math.sin(now / 2300) * 0.01).toFixed(2);
  if (freq) freq.textContent = value;
  if (freqBig) freqBig.textContent = `${value} Hz`;
}

updateFrequency();
setInterval(updateFrequency, 2400);
