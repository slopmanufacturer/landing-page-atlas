const acts = [
  { name: "Pale Horse", meta: "Friday / 19:30 / Main room" },
  { name: "June Arson", meta: "Friday / 20:30 / Main room" },
  { name: "Wet Flag", meta: "Friday / 21:30 / Main room" },
  { name: "Night Bus", meta: "Friday / 22:30 / Main room" },
  { name: "Civic TV", meta: "Saturday / 19:30 / Main room" },
  { name: "Miss Pity", meta: "Saturday / 20:30 / Main room" },
  { name: "Dog Teeth", meta: "Saturday / 21:30 / Main room" },
  { name: "Soft Launch", meta: "Saturday / 22:30 / Main room" },
];

const title = document.querySelector("#random-title");
const meta = document.querySelector("#random-meta");

document.querySelector("#randomize")?.addEventListener("click", () => {
  const act = acts[Math.floor(Math.random() * acts.length)];
  title.textContent = act.name;
  meta.textContent = act.meta;
});
