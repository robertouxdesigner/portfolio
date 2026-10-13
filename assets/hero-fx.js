/* Hero parallax + metallic sphere cursor.
   Options via window.HeroFX.config; toggles via HeroFX.set({parallax:false, sphere:false}). */
(function () {
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var cfg = { parallax: !reduce, sphere: fine && !reduce, mouseAmt: 1, scrollAmt: 1, maxSpheres: 70 };
  var hero = document.querySelector('.hero');
  var wm = document.querySelector('.hero-watermark');
  var oval = document.querySelector('.portrait-oval');
  var img = oval && oval.querySelector('img');

  /* ---------- Parallax ---------- */
  var mx = 0, my = 0, tx = 0, ty = 0, sy = 0, tsy = 0;
  addEventListener('pointermove', function (e) {
    tx = (e.clientX / innerWidth - 0.5) * 2;
    ty = (e.clientY / innerHeight - 0.5) * 2;
  }, { passive: true });
  function readScroll() {
    if (!hero) return;
    var r = hero.getBoundingClientRect();
    tsy = Math.max(-1, Math.min(1, -r.top / Math.max(r.height, 1)));
  }
  addEventListener('scroll', readScroll, { passive: true });
  readScroll();
  function tr(el, x, y) { if (el) el.style.transform = 'translate3d(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px,0)'; }
  function parallax() {
    mx += (tx - mx) * 0.07; my += (ty - my) * 0.07; sy += (tsy - sy) * 0.12;
    if (cfg.parallax) {
      var m = cfg.mouseAmt, s = cfg.scrollAmt;
      tr(wm, -mx * 64 * m, -my * 40 * m + sy * 130 * s);     /* back layer: moves against the cursor, drifts slower on scroll */
      tr(oval, mx * 24 * m, my * 20 * m + sy * -70 * s);     /* frame */
      tr(img, mx * 38 * m, my * 30 * m + sy * -40 * s);     /* photo inside the frame: extra depth */
    } else { tr(wm, 0, 0); tr(oval, 0, 0); tr(img, 0, 0); }
  }


  /* ---------- 24-column guide lines: from the very top of the page down to the marquee band ---------- */
  var band = document.querySelector('.marquee-band');
  if (band) {
    var gl = document.createElement('div');
    gl.className = 'grid-lines'; gl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(gl);
    var fit = function () { gl.style.height = (band.getBoundingClientRect().top + scrollY) + 'px'; };
    fit(); addEventListener('resize', fit); addEventListener('load', fit);
    if (window.ResizeObserver) new ResizeObserver(fit).observe(document.body);
  }

  /* ---------- Metallic sphere cursor ---------- */
  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d'), dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  addEventListener('resize', resize); resize();

  var px = -100, py = -100, cx = -100, cy = -100, down = false, lastX = 0, lastY = 0, acc = 0, grow = 1, visible = false;
  var balls = [];
  var rootEl = document.documentElement;
  function applyCursor() { rootEl.classList.toggle('fx-cursor', cfg.sphere); cv.style.display = cfg.sphere ? '' : 'none'; }
  addEventListener('pointermove', function (e) {
    px = e.clientX; py = e.clientY;
    if (!visible) { cx = px; cy = py; visible = true; }
    var t = e.target.closest && e.target.closest('a,button,[role=button],summary');
    grow += ((t ? 1.7 : 1) - grow) * 0.5;
    if (down && cfg.sphere) {
      acc += Math.hypot(px - lastX, py - lastY);
      var vx = px - lastX, vy = py - lastY;
      while (acc > 26) {
        acc -= 26;
        balls.push({ x: px + (Math.random() - 0.5) * 8, y: py + (Math.random() - 0.5) * 8,
          vx: vx * 0.06 + (Math.random() - 0.5) * 2.2, vy: vy * 0.06 + (Math.random() - 0.5) * 2.2 - 0.4,
          r: 4 + Math.random() * 7, born: performance.now(), life: 2600 + Math.random() * 1400 });
        if (balls.length > cfg.maxSpheres) balls.shift();
      }
    }
    lastX = px; lastY = py;
  }, { passive: true });
  addEventListener('pointerdown', function (e) { if (e.button === 0) { down = true; lastX = e.clientX; lastY = e.clientY; acc = 0; } });
  addEventListener('pointerup', function () { down = false; });
  addEventListener('pointercancel', function () { down = false; });
  document.addEventListener('mouseleave', function () { visible = false; });

  function sphere(x, y, r, a) {
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.clip();
    /* chrome: bright sky, dark horizon band, light ground bounce */
    var g = ctx.createLinearGradient(x, y - r, x, y + r);
    g.addColorStop(0, '#f4f7fb'); g.addColorStop(0.38, '#aab4c2'); g.addColorStop(0.5, '#2a2f38');
    g.addColorStop(0.62, '#7d8795'); g.addColorStop(1, '#e8edf3');
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    /* edge darkening */
    var e = ctx.createRadialGradient(x, y, r * 0.55, x, y, r);
    e.addColorStop(0, 'rgba(0,0,0,0)'); e.addColorStop(1, 'rgba(10,14,20,0.55)');
    ctx.fillStyle = e; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    /* specular */
    var s = ctx.createRadialGradient(x - r * 0.38, y - r * 0.42, 0, x - r * 0.38, y - r * 0.42, r * 0.42);
    s.addColorStop(0, 'rgba(255,255,255,0.95)'); s.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = s; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.restore();
  }
  /* Arrow cursor in the palette's primary blue (--color-primary #0066cc), tip at the pointer */
  function arrow(x, y, k) {
    ctx.save();
    ctx.translate(x, y); ctx.scale(k, k);
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(0, 17); ctx.lineTo(4.4, 13.2); ctx.lineTo(7.4, 20); ctx.lineTo(10.2, 18.8);
    ctx.lineTo(7.3, 12.2); ctx.lineTo(13, 12.2); ctx.closePath();
    ctx.lineJoin = 'round'; ctx.lineWidth = 1.6; ctx.strokeStyle = '#ffffff'; ctx.stroke();
    ctx.fillStyle = '#0066cc'; ctx.fill();
    ctx.restore();
  }
  function draw(now) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (!cfg.sphere) return;
    for (var i = balls.length - 1; i >= 0; i--) {
      var b = balls[i], age = now - b.born;
      if (age > b.life) { balls.splice(i, 1); continue; }
      b.vx *= 0.97; b.vy = b.vy * 0.97 + 0.03; b.x += b.vx; b.y += b.vy;
      var k = age / b.life;
      sphere(b.x, b.y, b.r * (k > 0.8 ? 1 - (k - 0.8) * 3 : 1), k > 0.7 ? 1 - (k - 0.7) / 0.3 : 1);
    }
    if (visible) {
      cx += (px - cx) * 0.35; cy += (py - cy) * 0.35;
      arrow(px, py, (down ? 0.92 : 1) * grow);
    }
  }
  function loop(now) { parallax(); draw(now); requestAnimationFrame(loop); }
  applyCursor();
  requestAnimationFrame(loop);

  window.HeroFX = { config: cfg, set: function (o) { for (var k in o) cfg[k] = o[k]; applyCursor(); } };
})();
