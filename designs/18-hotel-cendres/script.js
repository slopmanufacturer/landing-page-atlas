const form = document.querySelector("#booking-form");
const note = document.querySelector("#booking-note");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const checkin = new Date(`${data.get("checkin")}T00:00:00`);
  const checkout = new Date(`${data.get("checkout")}T00:00:00`);
  const guests = data.get("guests");
  const nights = Math.round((checkout - checkin) / 86400000);

  if (nights <= 0) {
    note.textContent = "The check-out date needs to come after the check-in date.";
    return;
  }

  const rate = nights >= 3 ? 145 : 160;
  const total = nights * rate * (Number(guests) > 2 ? 1.2 : 1);
  note.textContent = `${nights} ${nights === 1 ? "night" : "nights"} for ${guests} ${Number(guests) === 1 ? "guest" : "guests"} — from €${Math.round(total).toLocaleString("en-GB")}. Breakfast included.`;
});
