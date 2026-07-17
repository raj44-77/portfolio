/* ============ TECH ORBIT PARALLAX ============ */
(function () {
  const orbit = document.querySelector(".tech-orbit");
  if (!orbit) return;

  const techCards = orbit.querySelectorAll(".tech-card");

  window.addEventListener("mousemove", (e) => {
    const centerX = e.clientX / window.innerWidth - 0.5;
    const centerY = e.clientY / window.innerHeight - 0.5;

    techCards.forEach((card, i) => {
      const depth = (i % 3 + 1) * 6;
      card.style.translate = `${centerX * depth}px ${centerY * depth}px`;
    });
  });
})();