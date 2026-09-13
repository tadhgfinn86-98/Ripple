/* =========================================================================
   Ripple Recycling — behaviour
   Three small things: the mobile menu, the ambient hero ripple,
   and a quiet reveal on scroll. Nothing else.
   ========================================================================= */

// Mark that scripting is available, so the reveal styles may safely hide
// content. Done first, before paint, to avoid a flash.
document.documentElement.classList.add('js');

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ---------- Mobile menu ---------- */
(function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setOpen(!document.body.classList.contains('nav-open'));
  });

  // Close after choosing a destination.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();


/* ---------- Reveal on scroll ---------- */
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      // Stagger siblings slightly so a row arrives as a phrase, not a block.
      var siblings = Array.prototype.slice.call(entry.target.parentNode.children);
      var i = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = Math.min(i, 4) * 80 + 'ms';
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  items.forEach(function (el) { observer.observe(el); });
})();


/* ---------- Ambient hero ripple ----------
   Concentric rings, very low contrast. The brand's own metaphor, kept
   near the threshold of visibility so it reads as atmosphere, not decoration.
--------------------------------------------------------------------------- */
(function () {
  var canvas = document.getElementById('rippleCanvas');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var w = 0, h = 0;
  var origin = { x: 0, y: 0 };
  var maxR = 0;

  var RING_LIFE = 15000;   // ms for a ring to travel from centre to edge
  var RING_GAP  = 2600;    // ms between new rings
  var rings = [];
  var raf = null;
  var last = 0;
  var spawnTimer = 0;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    origin.x = w * 0.5;
    origin.y = h * 0.44;
    maxR = Math.sqrt(Math.max(origin.x, w - origin.x) * Math.max(origin.x, w - origin.x) +
                     Math.max(origin.y, h - origin.y) * Math.max(origin.y, h - origin.y));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < rings.length; i++) {
      var p = rings[i];                       // 0 → 1 progress
      var r = p * maxR;
      if (r <= 0) continue;
      // Fade in briefly, then out across the run.
      var alpha = Math.sin(Math.PI * p) * 0.16;
      if (alpha <= 0.001) continue;
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(155, 164, 158, ' + alpha.toFixed(4) + ')';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function tick(now) {
    var dt = last ? now - last : 16;
    last = now;

    for (var i = rings.length - 1; i >= 0; i--) {
      rings[i] += dt / RING_LIFE;
      if (rings[i] >= 1) rings.splice(i, 1);
    }

    spawnTimer += dt;
    if (spawnTimer >= RING_GAP) {
      spawnTimer -= RING_GAP;
      rings.push(0);
    }

    draw();
    raf = window.requestAnimationFrame(tick);
  }

  function start() {
    if (raf !== null) return;
    last = 0;
    raf = window.requestAnimationFrame(tick);
  }

  function stop() {
    if (raf === null) return;
    window.cancelAnimationFrame(raf);
    raf = null;
  }

  resize();
  window.addEventListener('resize', function () { resize(); draw(); });

  if (reduceMotion) {
    // Still say something, but hold it still.
    rings = [0.28, 0.52, 0.76];
    draw();
    return;
  }

  // Seed a few rings so the hero is never empty on arrival.
  rings = [0.18, 0.46, 0.74];

  // Only animate while the hero is on screen and the tab is visible.
  var visible = true, onScreen = true;
  function sync() { (visible && onScreen) ? start() : stop(); }

  document.addEventListener('visibilitychange', function () {
    visible = !document.hidden;
    sync();
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
      sync();
    }, { threshold: 0 }).observe(canvas);
  }

  sync();
})();


/* ---------- Footer year ---------- */
(function () {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
