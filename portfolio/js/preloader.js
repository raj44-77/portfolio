/* ============ PRELOADER — Kumar Raj ============ */
(function () {
  // Create preloader DOM
  const preloaderHTML = `
    <div class="preloader" id="preloader">
      <div class="preloader-glow"></div>
      <div class="preloader-name" id="preloaderName"></div>
      <div class="preloader-role" id="preloaderRole">Full Stack & SaaS Developer</div>
      <div class="preloader-bar">
        <div class="preloader-fill" id="preloaderFill"></div>
      </div>
      <div class="preloader-percent" id="preloaderPercent">0%</div>
    </div>
  `;

  document.body.insertAdjacentHTML('afterbegin', preloaderHTML);

  const preloader = document.getElementById('preloader');
  const nameEl = document.getElementById('preloaderName');
  const roleEl = document.getElementById('preloaderRole');
  const fillEl = document.getElementById('preloaderFill');
  const percentEl = document.getElementById('preloaderPercent');

  // Typing effect
  const fullName = "Kumar Raj";
  let charIndex = 0;
  let percent = 0;

  function typeName() {
    if (charIndex < fullName.length) {
      nameEl.textContent = fullName.slice(0, charIndex + 1) + "|";
      charIndex++;
      setTimeout(typeName, 150);
    } else {
      nameEl.textContent = fullName;
      roleEl.classList.add('show');
      startProgress();
    }
  }

  // Progress bar
  function startProgress() {
    const interval = setInterval(() => {
      percent += Math.random() * 8 + 3;
      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);
        fillEl.style.width = "100%";
        percentEl.textContent = "100%";
        setTimeout(hidePreloader, 400);
      } else {
        fillEl.style.width = percent + "%";
        percentEl.textContent = Math.floor(percent) + "%";
      }
    }, 120);
  }

  // Hide preloader
  function hidePreloader() {
    preloader.classList.add('hidden');
    // Remove from DOM after fade-out
    setTimeout(() => {
      preloader.remove();
    }, 700);
  }

  // Start typing after slight delay
  setTimeout(typeName, 300);

  // Fallback: if anything fails, hide after 3 seconds
  setTimeout(() => {
    if (!preloader.classList.contains('hidden')) {
      hidePreloader();
    }
  }, 4000);
})();