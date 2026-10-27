// Swansea Tattoo Lab — menu, scroll-spy, carousel, accordion, form, reveal
(function () {
  "use strict";
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-mobile-menu]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  var links = Array.prototype.slice.call(document.querySelectorAll(".main-nav a[href^='#']"));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) { a.classList.remove("active"); });
        var a = map[e.target.id];
        if (a) a.classList.add("active");
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ["styles", "process", "work", "first-timers", "visit"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
  });
  // Carousel: translate track by slide width (slide + padding)
  var track = document.getElementById("carousel-track");
  var count = document.getElementById("car-count");
  var idx = 0;
  function total() { return track ? track.children.length : 0; }
  function go(i) {
    if (!track) return;
    idx = Math.max(0, Math.min(i, total() - 1));
    var slide = track.children[0];
    var w = slide.getBoundingClientRect().width;
    track.style.transform = "translateX(" + (-idx * w) + "px)";
    if (count) count.textContent = (idx + 1) + " / " + total();
  }
  var prev = document.querySelector("[data-car-prev]");
  var next = document.querySelector("[data-car-next]");
  if (prev) prev.addEventListener("click", function () { go(idx - 1); });
  if (next) next.addEventListener("click", function () { go(idx + 1); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" && document.activeElement === prev) go(idx - 1);
    if (e.key === "ArrowRight" && document.activeElement === next) go(idx + 1);
  });
  window.addEventListener("resize", function () { go(idx); });
  go(0);
  // Accordion
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var panel = btn.nextElementSibling;
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      btn.querySelector("span").textContent = open ? "+" : "–";
      panel.hidden = open;
    });
  });
  // Form -> email app
  var form = document.getElementById("enquiry-form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("f-name").value.trim();
    var idea = document.getElementById("f-idea").value.trim();
    var size = document.getElementById("f-size").value;
    var body = "Hi Swansea Tattoo Lab,\n\nName: " + name + "\nRough size: " + size + "\nIdea: " + idea;
    window.location.href = "mailto:swanseatattoolab@aol.co.uk?subject=" +
      encodeURIComponent("Consultation request") + "&body=" + encodeURIComponent(body);
    document.getElementById("form-note").textContent =
      "Opening your email app — please press send there to confirm your request. You can also call 01792 644871.";
  });
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visible"); rev.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".section").forEach(function (s) { s.classList.add("reveal"); rev.observe(s); });
  }
})();
