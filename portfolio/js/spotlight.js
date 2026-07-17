/* ============ PROJECT CARD SPOTLIGHT ============ */
(function () {
  document.querySelectorAll(".project").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", xPercent + "%");
      card.style.setProperty("--my", yPercent + "%");
    });
  });
})();