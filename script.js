const copyButton = document.querySelector("[data-copy]");

if (copyButton) {
  copyButton.addEventListener("click", async () => {
    const text = copyButton.dataset.copy || "";
    let copied = false;

    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      copied = document.execCommand("copy");
      area.remove();
    }

    const original = copyButton.textContent;
    copyButton.textContent = copied ? "Copied" : "Copy failed";
    copyButton.classList.toggle("is-copied", copied);

    setTimeout(() => {
      copyButton.textContent = original;
      copyButton.classList.remove("is-copied");
    }, 1800);
  });
}

const faqItems = Array.from(document.querySelectorAll(".faq__item"));

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});
