/* =========================================================
   Creative Portfolio — interactions
   - Dark/light theme toggle (remembers choice)
   - Scroll reveal animations
   - Animated skill bars
   - Scroll progress + header state
   - Contact form (AJAX submit with graceful fallback)
   ========================================================= */
(function () {
  "use strict";

  const root = document.documentElement;

  /* ---------- Theme toggle (persists in localStorage) ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ---------- Scroll progress bar + sticky header state ---------- */
  const progress = document.getElementById("scrollProgress");
  const header = document.getElementById("siteHeader");
  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.width = (scrolled * 100) + "%";
    header.classList.toggle("scrolled", h.scrollTop > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll + skill bars ---------- */
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");

      // If it's a skill block, animate its bar to data-level
      if (entry.target.classList.contains("skill")) {
        const level = entry.target.getAttribute("data-level");
        const bar = entry.target.querySelector(".skill-bar i");
        if (bar) bar.style.width = level + "%";
      }
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    // Basic validation
    if (!form.checkValidity()) {
      status.textContent = "Please fill in all fields with a valid email.";
      status.classList.add("err");
      return;
    }

    const action = form.getAttribute("action") || "";
    const btn = form.querySelector("button[type=submit]");
    const original = btn.textContent;
    btn.textContent = "Sending...";
    btn.disabled = true;

    // If no real endpoint is configured yet, fall back to a mailto link.
    if (action.indexOf("your-form-id") !== -1 || action === "") {
      const name = encodeURIComponent(form.name.value);
      const msg = encodeURIComponent(form.message.value + "\n\n— " + form.name.value + " (" + form.email.value + ")");
      window.location.href = "mailto:you@example.com?subject=Portfolio enquiry from " + name + "&body=" + msg;
      status.textContent = "Opening your email app...";
      status.classList.add("ok");
      btn.textContent = original;
      btn.disabled = false;
      return;
    }

    // Real AJAX submit (e.g. Formspree)
    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (res.ok) {
          form.reset();
          status.textContent = "Thanks! Your message has been sent.";
          status.classList.add("ok");
        } else {
          throw new Error("Bad response");
        }
      })
      .catch(function () {
        status.textContent = "Something went wrong. Please email me directly.";
        status.classList.add("err");
      })
      .finally(function () {
        btn.textContent = original;
        btn.disabled = false;
      });
  });
})();
