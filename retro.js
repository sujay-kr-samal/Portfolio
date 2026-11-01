(() => {
  const root = document.documentElement, body = document.body;
  const mk = (tag, cls, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };

  // CRT overlay (scanlines, vignette, channel static)
  const crt = mk("div", "crt");
  crt.setAttribute("aria-hidden", "true");
  body.append(crt);

  // Boot sequence: first visit per session only, any click or key skips it
  if (root.classList.contains("booting")) {
    try { sessionStorage.setItem("sks-booted", "1"); } catch (_) {}
    const lines = ["SKS-BIOS v2026.1", "MEMORY TEST ........ OK", "LOADING KERNEL ...... OK", "MOUNTING /PORTFOLIO ..", "SIGNAL ACQUIRED_"];
    const boot = mk("div", "boot", '<div class="boot-inner"><pre></pre><div class="boot-bar"><i></i></div><small>PRESS ANY KEY TO SKIP</small></div>');
    boot.setAttribute("aria-hidden", "true");
    body.append(boot);
    const pre = boot.querySelector("pre"), bar = boot.querySelector("i");
    let n = 0, done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearInterval(timer);
      root.classList.remove("booting");
      boot.classList.add("off");
      setTimeout(() => boot.remove(), 600);
    };
    const timer = setInterval(() => {
      pre.textContent += (n ? "\n" : "") + lines[n];
      bar.style.width = (++n / lines.length) * 100 + "%";
      if (n >= lines.length) { clearInterval(timer); setTimeout(finish, 500); }
    }, 380);
    ["click", "keydown"].forEach(ev => addEventListener(ev, finish, { once: true }));
  }

  // VU meters under the hero stats; red REC light on projects in development
  document.querySelectorAll(".hero-stats > div").forEach(d => {
    const vu = mk("span", "vu", Array.from({ length: 10 }, (_, i) => `<i style="--i:${i}"></i>`).join(""));
    vu.setAttribute("aria-hidden", "true");
    d.append(vu);
  });
  document.querySelectorAll(".project-status").forEach(s => s.classList.toggle("live", /DEV/.test(s.textContent)));

})();