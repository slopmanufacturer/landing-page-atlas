const search = document.querySelector("#search");
const cards = Array.from(document.querySelectorAll(".exhibitor-grid article"));
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");

search?.addEventListener("input", () => {
  const query = search.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach((card) => {
    const match = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    card.hidden = !match;
    if (match) visible += 1;
  });

  count.textContent = `${visible} ${visible === 1 ? "exhibitor" : "exhibitors"}`;
  empty.hidden = visible !== 0;
});
