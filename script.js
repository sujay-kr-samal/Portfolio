const projectData = {
  browser: { title: "BROWSER FROM SCRATCH", kicker: "SYSTEMS · C", description: "A browser built from the ground up in C to understand how HTML, layout, rendering, and browser architecture fit together. This project focuses on the core mechanics rather than abstraction layers or frameworks.", stack: "C · HTML · RENDERING", link: "project.html?id=browser" },
  os: { title: "OS FROM SCRATCH", kicker: "OPERATING SYSTEMS · C", description: "A minimal operating system project exploring bootloading, memory, interrupts, process control, and low-level system structure. It is a hands-on attempt to understand how an OS really starts and behaves.", stack: "C · KERNEL · MEMORY", link: "project.html?id=os" },
  game: { title: "RETRO PHYSICS GAME", kicker: "GAME ENGINE · PHYSICS · C", description: "A falling-block style retro game made in C with custom gravity, collision detection, and physics logic from scratch. The goal is to build the game systems directly instead of relying on libraries or engines.", stack: "C · PHYSICS · COLLISION", link: "project.html?id=game" },
  ar: { title: "AUGMENTED REALITY", kicker: "IMMERSIVE SYSTEMS · C", description: "An augmented reality project built from scratch in C to explore spatial tracking, graphics pipelines, and real-time scene logic without relying on higher-level engines.", stack: "C · GRAPHICS · TRACKING", link: "project.html?id=ar" }
};

const dialog = document.querySelector(".project-dialog");
const dialogLink = document.querySelector("#dialog-link");

if (dialog && dialogLink) {
  function openProjectDialog(card) {
    const item = projectData[card.dataset.project];
    if (!item) return;

    document.querySelector("#dialog-title").textContent = item.title;
    document.querySelector("#dialog-kicker").textContent = item.kicker;
    document.querySelector("#dialog-description").textContent = item.description;
    document.querySelector("#dialog-stack").textContent = item.stack;
    dialogLink.href = item.link;
    dialog.showModal();
  }

  document.querySelectorAll(".project").forEach(card => {
    card.addEventListener("click", event => {
      event.preventDefault();
      openProjectDialog(card);
    });
  });
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
}

const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const contactBottom = document.querySelector(".contact-bottom");
  const typingText = document.querySelector(".typing-text");
  const fullText = typingText?.textContent || "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typingText && !reduceMotion) typingText.textContent = "";

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        if (entry.target === contactBottom && typingText && !reduceMotion) {
          let index = 0;
          const typingTimer = window.setInterval(() => {
            typingText.textContent = fullText.slice(0, ++index);
            if (index >= fullText.length) window.clearInterval(typingTimer);
          }, 32);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".topbar nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

// Theme switcher: remembers the visitor's choice in this browser.
const themePicker = document.querySelector(".theme-picker");
const themeTrigger = document.querySelector(".theme-trigger");
const themeCurrent = document.querySelector(".theme-current");
const themeButtons = document.querySelectorAll(".theme-options button");
const themeNames = { beige: "BEIGE", wine: "WINE", forest: "FOREST", midnight: "MIDNIGHT", slate: "SLATE", plum: "PLUM" };

function setTheme(theme) {
  if (!Object.hasOwn(themeNames, theme)) theme = "beige";
  document.documentElement.dataset.theme = theme;
  if (themeCurrent) themeCurrent.textContent = themeNames[theme];
  themeButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.theme === theme));
  });
  try { localStorage.setItem("sujay-portfolio-theme", theme); } catch (_) {}
}

if (themeTrigger && themePicker && themeButtons.length) {
  let savedTheme = "beige";
  try { savedTheme = localStorage.getItem("sujay-portfolio-theme") || "beige"; } catch (_) {}
  setTheme(savedTheme);

  themeTrigger.addEventListener("click", () => {
    const open = themePicker.classList.toggle("open");
    themeTrigger.setAttribute("aria-expanded", String(open));
  });

  themeButtons.forEach(button => button.addEventListener("click", () => {
    setTheme(button.dataset.theme);
    themePicker.classList.remove("open");
    themeTrigger.setAttribute("aria-expanded", "false");
  }));

  document.addEventListener("click", event => {
    if (!themePicker.contains(event.target)) {
      themePicker.classList.remove("open");
      themeTrigger.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      themePicker.classList.remove("open");
      themeTrigger.setAttribute("aria-expanded", "false");
    }
  });
}
