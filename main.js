// Mobile menu: instant toggle (no transition), closes on link tap.
(function () {
  var btn = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-mobile-menu]");
  if (!btn || !nav) return;
  btn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
})();
