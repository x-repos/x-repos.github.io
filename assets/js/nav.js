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
