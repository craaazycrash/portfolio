  /* ── PARTICLE CANVAS ── */
  (function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(70, Math.floor(W * H / 14000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    }

    function drawLine(a, b, dist) {
      const alpha = (1 - dist / 130) * 0.12;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(117,5,255,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(117,5,255,${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) drawLine(particles[i], particles[j], dist);
        }
      }
      requestAnimationFrame(loop);
    }

    resize();
    createParticles();
    loop();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  })();

  /* ── PROGRESS BAR ── */
  const fill = document.getElementById('progress-fill');
  const label = document.getElementById('progress-label');
  const DURATION = 3200;
  const START = performance.now();

  const labels = ['Loading', 'Building', 'Crafting', 'Almost'];

  function tick(now) {
    const elapsed = now - START;
    const pct = Math.min(elapsed / DURATION * 100, 100);
    fill.style.width = pct + '%';
    fill.style.transition = 'width 50ms linear';

    const idx = Math.floor(pct / 25);
    label.textContent = labels[Math.min(idx, labels.length - 1)];

    if (pct < 100) {
      requestAnimationFrame(tick);
    } else {
      label.textContent = 'Ready';
      // small pause then reveal
      setTimeout(reveal, 250);
    }
  }
  requestAnimationFrame(tick);

  /* ── REVEAL ── */
  function reveal() {
    const splash = document.getElementById('splash');
    const site = document.getElementById('site-content');
    splash.classList.add('hide');
    site.classList.add('visible');
    setTimeout(() => {
      splash.style.display = 'none';
      document.body.style.overflow = '';
    }, 950);
  }
