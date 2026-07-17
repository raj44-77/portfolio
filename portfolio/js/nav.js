/* ============ NAVIGATION ============ */
(function () {
  const nav = document.querySelector(".nav");
  const navToggle = document.querySelector(".nav-toggle");
  let lastScrollY = 0;

  // Hide on scroll down, show on scroll up
  window.addEventListener(
    "scroll",
    () => {
      const currentY = window.scrollY;
      if (currentY > 120 && currentY > lastScrollY) {
        nav.classList.add("hide");
      } else {
        nav.classList.remove("hide");
      }
      lastScrollY = currentY;

      // Update active link
      const sections = document.querySelectorAll("section[id]");
      let currentSection = "";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top < 140) {
          currentSection = section.id;
        }
      });
      document.querySelectorAll(".nav a.link").forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === "#" + currentSection);
      });
    },
    { passive: true }
  );

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Close mobile nav on link click
  document.querySelectorAll(".nav a.link").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
})();