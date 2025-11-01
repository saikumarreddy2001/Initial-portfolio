// Mobile nav toggle
const siteNav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
siteNav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") siteNav.classList.remove("open");
});

// Scroll spy: highlight active link
const ids = ["home", "about", "skills", "projects", "contact"];
const sections = ids.map((id) => document.getElementById(id));
const navLinks = Array.from(siteNav.querySelectorAll("a"));

const setActive = () => {
  const y = window.scrollY + 120;
  let current = ids[0];
  sections.forEach((sec) => {
    if (sec.offsetTop <= y) current = sec.id;
  });
  navLinks.forEach((a) =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current)
  );
};
window.addEventListener("scroll", setActive);
window.addEventListener("load", setActive);

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Subtle tilt for project cards
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
if (!prefersReduced) {
  const tiltCards = document.querySelectorAll("[data-tilt]");
  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * -8;
    const ry = (x / r.width - 0.5) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const onLeave = (e) => {
    e.currentTarget.style.transform = "";
  };
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });
}

// Contact form -> compose email (mailto)
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) return;

  const subject = `Portfolio Contact — ${name}`;
  const body = `Hi Saikumar,\n\n${message}\n\n— ${name}\n${email}`;
  const mail = `mailto:saikumarreddym2001@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  status.textContent = "Opening your email client...";
  window.location.href = mail;

  setTimeout(() => {
    status.textContent =
      "If it didn’t open, email me at saikumarreddym2001@gmail.com.";
  }, 1200);

  form.reset();
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
