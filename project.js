
const projects = {

  ar: {
    title: "AUGMENTED REALITY",
    kicker: "IMMERSIVE SYSTEMS · C",
    summary: "An augmented reality system built from scratch in C.",

    stack: "C · GRAPHICS · TRACKING",
    status: "IN DEVELOPMENT",
    symbol: "◉",

    overviewTitle: "Seeing the world through code.",

    overview: "This augmented reality project explores spatial alignment, scene composition, and real-time rendering logic in C. The goal is to understand how immersive systems are constructed from the ground up.",

    process: [
      "Studying 3D space and camera logic.",
      "Designing scene composition and object transforms.",
      "Implementing tracking and alignment systems.",
      "Building a real-time rendering loop.",
      "Refining interaction and scene behavior."
    ],

    learning: "Learning graphics pipelines, spatial math, tracking systems, and immersive interaction design in C.",

    github: "https://github.com/"
  },

  browser: {
    title: "BROWSER FROM SCRATCH",
    kicker: "SYSTEMS · C",
    summary: "A custom browser built from the ground up in C.",

    stack: "C · HTML · RENDERING",
    status: "IN DEVELOPMENT",
    symbol: "⌘",

    overviewTitle: "Understanding the browser core.",

    overview: "This project explores how a browser interprets HTML, builds a document tree, and eventually renders structured content on screen.",

    process: [
      "Studying HTML parsing and structure.",
      "Implementing a minimal rendering pipeline.",
      "Designing layout and viewport logic.",
      "Exploring browser internals from scratch.",
      "Improving performance and correctness."
    ],

    learning: "Learning browser architecture, rendering fundamentals, and low-level software design in C.",

    github: "https://github.com/"
  },

  os: {
    title: "OS FROM SCRATCH",
    kicker: "OPERATING SYSTEMS · C",
    summary: "A kernel-side OS exploration built in C.",

    stack: "C · KERNEL · MEMORY",
    status: "EXPERIMENT",
    symbol: "▣",

    overviewTitle: "Building the machine from the bottom up.",

    overview: "This project focuses on the foundations of operating systems: boot flow, memory, interrupts, scheduling, and process management.",

    process: [
      "Understanding boot and startup flow.",
      "Exploring memory layout and system state.",
      "Designing process and task basics.",
      "Studying interrupts and device interaction.",
      "Extending the system one layer at a time."
    ],

    learning: "Learning kernel design, memory management, and the internals of operating systems.",

    github: "https://github.com/"
  },

  game: {
    title: "RETRO PHYSICS GAME",
    kicker: "GAME ENGINE · PHYSICS · C",
    summary: "A falling-block style game with custom physics.",

    stack: "C · PHYSICS · COLLISION",
    status: "PLAYABLE",
    symbol: "◫",

    overviewTitle: "Physics from scratch.",

    overview: "A retro game project built in C that focuses on collision handling, gravity, falling motion, and simple interaction logic without relying on a game engine.",

    process: [
      "Designing the game loop.",
      "Implementing gravity and falling motion.",
      "Adding collision detection and block logic.",
      "Improving controls and game feel.",
      "Tuning physics and level rules."
    ],

    learning: "Learning game loops, collision detection, physics simulation, and low-level rendering in C.",

    github: "https://github.com/"
  },

};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const project = projects[id];

if (!project) {
  window.location.replace("index.html#work");
} else {

  document.title = `${project.title} | Sujay`;

  document.getElementById("case-title").textContent = project.title;
  document.getElementById("case-kicker").textContent = project.kicker;
  document.getElementById("case-summary").textContent = project.summary;

  document.getElementById("case-stack").textContent = project.stack;
  document.getElementById("case-status").textContent = project.status;

  document.getElementById("cover-symbol").textContent = project.symbol;

  document.getElementById("case-overview-title").textContent =
    project.overviewTitle;

  document.getElementById("case-overview").textContent =
    project.overview;

  document.getElementById("case-learning").textContent =
    project.learning;

  document.getElementById("github-link").href = project.github;

  const list = document.getElementById("case-process");

  project.process.forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    list.appendChild(li);
  });

}
