/* Lilla Beirut — interactions (vanilla, no deps) */
(function () {
  "use strict";

  /* ---- Nav: solid on scroll ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav ---- */
  var burger = document.getElementById("burger");
  var mobnav = document.getElementById("mobnav");
  function openNav() {
    mobnav.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    mobnav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  if (burger && mobnav) {
    burger.addEventListener("click", openNav);
    mobnav.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobnav.classList.contains("is-open")) closeNav();
    });
  }

  /* ---- Year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Scroll reveals ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---- Qopla order placeholder (until the real link is wired) ---- */
  document.querySelectorAll("[data-qopla]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      if (el.getAttribute("href") === "#") {
        e.preventDefault();
        el.dataset.tip = "Onlinebeställning kopplas in snart.";
        window.clearTimeout(el._t);
        el._t = window.setTimeout(function () { delete el.dataset.tip; }, 2400);
      }
    });
  });
})();
