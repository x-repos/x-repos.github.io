/* Tiny hamburger-menu toggle shared across all layouts. */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const toggles = document.querySelectorAll(".nav-toggle");
    toggles.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const nav = btn.closest("nav");
        if (!nav) return;
        const open = nav.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    // Close the menu when a link inside it is tapped (so the dropdown
    // doesn't hang around after navigating to a hash on the same page).
    document.querySelectorAll("nav.home-topnav a, nav.site-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        const nav = a.closest("nav");
        if (nav && nav.classList.contains("is-open")) {
          nav.classList.remove("is-open");
          const btn = nav.querySelector(".nav-toggle");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });
    });
  });
})();

/* ============================================================
   Easter egg: click π five times rapidly → reveal a hidden quote.
   ============================================================ */
(function () {
  let count = 0;
  let resetTimer = null;

  document.addEventListener("click", function (e) {
    const pi = e.target.closest(".brand-pi");
    if (!pi) return;

    count++;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () { count = 0; }, 1500);

    // Prevent same-URL navigation while the user is rapid-clicking
    if (count >= 2) e.preventDefault();

    if (count >= 5) {
      count = 0;
      reveal();
    }
  });

  function reveal() {
    // Inject styles once
    if (!document.getElementById("egg-styles")) {
      const style = document.createElement("style");
      style.id = "egg-styles";
      style.textContent = `
        .egg-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 24px;
          background: radial-gradient(ellipse at center, rgba(8,12,28,0.78) 0%, rgba(0,0,0,0.95) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .egg-overlay.is-open { opacity: 1; }
        .egg-card {
          max-width: 720px;
          text-align: center;
          color: #ffffff;
          transform: translateY(18px) scale(0.985);
          transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .egg-overlay.is-open .egg-card { transform: translateY(0) scale(1); }
        .egg-quote {
          font-family: "Source Serif 4", Georgia, serif;
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.4rem, 3.6vw, 2.4rem);
          line-height: 1.4;
          margin: 0 0 22px;
          text-shadow: 0 2px 14px rgba(0,0,0,0.8);
        }
        .egg-quote .egg-quote__mark {
          color: #8fd6ff;
          font-style: normal;
          margin: 0 0.06em;
        }
        .egg-attrib {
          margin: 0 0 28px;
          font-family: "Inter", sans-serif;
          font-size: 12px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #8fd6ff;
        }
        .egg-mini {
          font-family: "Source Serif 4", Georgia, serif;
          font-style: italic;
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }
        .egg-hint {
          position: absolute;
          bottom: 28px;
          left: 0; right: 0;
          text-align: center;
          font-family: "Inter", sans-serif;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
        }
        @media (prefers-reduced-motion: reduce) {
          .egg-overlay, .egg-card { transition: none; }
        }
      `;
      document.head.appendChild(style);
    }

    const overlay = document.createElement("div");
    overlay.className = "egg-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-label", "Hidden quote");
    overlay.innerHTML = `
      <div class="egg-card">
        <p class="egg-quote">
          <span class="egg-quote__mark">“</span>What I cannot create,
          I do not understand.<span class="egg-quote__mark">”</span>
        </p>
        <p class="egg-attrib">— Richard Feynman</p>
        <p class="egg-mini">π · you found it.</p>
      </div>
      <p class="egg-hint">click anywhere to dismiss</p>
    `;
    document.body.appendChild(overlay);
    // Force reflow so the transition runs
    requestAnimationFrame(function () { overlay.classList.add("is-open"); });

    function close() {
      overlay.classList.remove("is-open");
      setTimeout(function () { overlay.remove(); }, 550);
      document.removeEventListener("keydown", onKey);
    }
    overlay.addEventListener("click", close);
    function onKey(ev) { if (ev.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
  }
})();
