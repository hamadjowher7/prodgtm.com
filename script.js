const header = document.querySelector("[data-elevate]");
const revealItems = document.querySelectorAll(".reveal");
const productCards = document.querySelectorAll("[data-product-card]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-elevated", window.scrollY > 10);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

productCards.forEach((card) => {
  card.addEventListener("pointermove", () => {
    productCards.forEach((item) => item.classList.remove("is-hovered"));
    card.classList.add("is-hovered");
  });

  card.addEventListener("pointerleave", () => {
    card.classList.remove("is-hovered");
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
