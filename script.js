const loader = document.getElementById("loader");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formResult = document.getElementById("formResult");

document.body.classList.add("no-scroll");

window.addEventListener("load", () => {
  anime({
    targets: ".loader-icon",
    scale: [0.8, 1.1],
    rotate: [-8, 8],
    direction: "alternate",
    loop: 3,
    duration: 330,
    easing: "easeInOutSine",
    complete: () => {
      loader.classList.add("hidden");
      document.body.classList.remove("no-scroll");
      initIntroAnimation();
      initParallax();
    }
  });
});

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

function initParallax() {
  const parallaxImages = document.querySelectorAll(".parallax-img");
  const bannerImages = document.querySelectorAll(".parallax-banner");

  if (window.simpleParallax) {
    new simpleParallax(parallaxImages, {
      scale: 1.18,
      delay: 0.7,
      orientation: "up",
      transition: "cubic-bezier(0,0,0,1)"
    });

    new simpleParallax(bannerImages, {
      scale: 1.28,
      delay: 0.8,
      orientation: "down",
      overflow: true
    });
  }
}

function initIntroAnimation() {
  anime.timeline({ easing: "easeOutExpo" })
    .add({
      targets: ".navbar",
      opacity: [0, 1],
      translateY: [-24, 0],
      duration: 700
    })
    .add({
      targets: ".hero-copy > *",
      opacity: [0, 1],
      translateY: [36, 0],
      delay: anime.stagger(90),
      duration: 780
    }, "-=300")
    .add({
      targets: ".hero-img",
      opacity: [0, 1],
      scale: [0.88, 1],
      rotate: [-4, 0],
      duration: 950
    }, "-=650");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 850,
        easing: "easeOutExpo"
      });

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    formResult.textContent = `Mensaje generado para ${name}: ${message}`;

    anime({
      targets: "#formResult",
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 600,
      easing: "easeOutExpo"
    });
  });
}
