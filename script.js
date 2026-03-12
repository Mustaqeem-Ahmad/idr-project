/**
 * Institute of Digital Risk — script.js  v3.0
 * ─────────────────────────────────────────────
 * Modules:
 *  01. Page load gate
 *  02. Geometric canvas (hex, cross, bracket, ring, diag)
 *  03. Custom dual-layer cursor
 *  04. Scroll progress bar
 *  05. Sticky header
 *  06. ScrollSpy (active nav highlight)
 *  07. Mobile nav (slide-in)
 *  08. Smooth anchor scroll
 *  09. Scroll reveal (IntersectionObserver)
 *  10. Counter animation
 *  11. Typewriter cycle
 *  12. Card 3-D tilt
 *  13. Contact form validation
 */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────── */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch        = !window.matchMedia('(hover: hover)').matches;


  /* ─────────────────────────────────────────
     01. PAGE LOAD GATE
     Removes .is-loading once the window fires
     'load', allowing animations to play.
  ───────────────────────────────────────── */
  window.addEventListener('load', function () {
    document.body.classList.remove('is-loading');
  });


  /* ─────────────────────────────────────────
     02. GEOMETRIC CANVAS BACKGROUND
     Draws animated geometric primitives on a
     full-viewport fixed canvas using orange
     stroke at low opacity.
  ───────────────────────────────────────── */
  (function initCanvas() {
    var canvas = document.getElementById('js-canvas');
    if (!canvas) return;

    var ctx    = canvas.getContext('2d');
    var shapes = [];
    var raf    = null;
    var W, H;

    /* Shape types */
    var TYPES = ['hex', 'cross', 'bracket', 'ring', 'diag', 'triangle'];

    /* Build a fresh set of shapes */
    function buildShapes() {
      shapes = [];
      var density = Math.floor((W * H) / 70000);
      var count   = Math.max(10, Math.min(density, 26));

      for (var i = 0; i < count; i++) {
        shapes.push({
          type:  TYPES[Math.floor(Math.random() * TYPES.length)],
          x:     Math.random() * W,
          y:     Math.random() * H,
          size:  18 + Math.random() * 55,
          alpha: 0.05 + Math.random() * 0.11,
          rot:   Math.random() * Math.PI * 2,
          vRot:  prefersReduced ? 0 : (0.0001 + Math.random() * 0.0004) * (Math.random() < 0.5 ? 1 : -1),
          vY:    prefersReduced ? 0 : (0.06 + Math.random() * 0.14) * (Math.random() < 0.5 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    /* — Draw primitives — */
    function hex(cx, cy, r, rot) {
      ctx.beginPath();
      for (var i = 0; i < 6; i++) {
        var a = rot + (Math.PI / 3) * i;
        var x = cx + r * Math.cos(a);
        var y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    function cross(cx, cy, r) {
      var h = r * 0.28;
      ctx.beginPath();
      ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy);
      ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r);
      ctx.rect(cx - h, cy - h, h * 2, h * 2);
      ctx.stroke();
    }

    function bracket(cx, cy, r) {
      var w = r * 0.42, gap = r * 0.35;
      ctx.beginPath();
      /* left [ */
      ctx.moveTo(cx - gap, cy - r);
      ctx.lineTo(cx - gap - w, cy - r);
      ctx.lineTo(cx - gap - w, cy + r);
      ctx.lineTo(cx - gap, cy + r);
      /* right ] */
      ctx.moveTo(cx + gap, cy - r);
      ctx.lineTo(cx + gap + w, cy - r);
      ctx.lineTo(cx + gap + w, cy + r);
      ctx.lineTo(cx + gap, cy + r);
      ctx.stroke();
    }

    function ring(cx, cy, r) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 1.5);
      ctx.stroke();
    }

    function diag(cx, cy, r, rot) {
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(rot) * (-r), cy + Math.sin(rot) * (-r));
      ctx.lineTo(cx + Math.cos(rot) * r,    cy + Math.sin(rot) * r);
      ctx.stroke();
    }

    function triangle(cx, cy, r, rot) {
      ctx.beginPath();
      for (var i = 0; i < 3; i++) {
        var a = rot + (Math.PI * 2 / 3) * i - Math.PI / 2;
        var x = cx + r * Math.cos(a);
        var y = cy + r * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    /* Main loop */
    function render(ts) {
      ctx.clearRect(0, 0, W, H);

      shapes.forEach(function (s, i) {
        /* Animate */
        if (!prefersReduced) {
          s.rot += s.vRot;
          s.y   += Math.sin(ts * 0.0006 + s.phase) * 0.18 * (s.vY > 0 ? 1 : -1);
          if (s.y < -80) s.y = H + 80;
          if (s.y > H + 80) s.y = -80;
        }

        ctx.save();
        ctx.strokeStyle = 'rgba(232, 89, 12, ' + s.alpha + ')';
        ctx.lineWidth   = 0.8;

        switch (s.type) {
          case 'hex':      hex(s.x, s.y, s.size, s.rot);  break;
          case 'cross':    cross(s.x, s.y, s.size);        break;
          case 'bracket':  bracket(s.x, s.y, s.size);      break;
          case 'ring':     ring(s.x, s.y, s.size);         break;
          case 'diag':     diag(s.x, s.y, s.size, s.rot);  break;
          case 'triangle': triangle(s.x, s.y, s.size, s.rot); break;
        }
        ctx.restore();
      });

      raf = requestAnimationFrame(render);
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildShapes();
    }

    resize();
    raf = requestAnimationFrame(render);

    var resizeId;
    window.addEventListener('resize', function () {
      clearTimeout(resizeId);
      resizeId = setTimeout(resize, 200);
    });
  }());


  /* ─────────────────────────────────────────
     03. CUSTOM DUAL-LAYER CURSOR
     Small dot snaps instantly; larger ring
     follows with a smooth lag (lerp).
  ───────────────────────────────────────── */
  (function initCursor() {
    if (isTouch) return;

    var dot  = document.getElementById('js-cursor-dot');
    var ring = document.getElementById('js-cursor-ring');
    if (!dot || !ring) return;

    var mx = -100, my = -100;
    var rx = -100, ry = -100;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    (function loopRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(loopRing);
    }());

    var sel = 'a, button, .c-service, .c-fact, .c-audience, input, textarea, select, .c-btn';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(sel)) document.body.classList.add('cursor--hover');
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(sel)) document.body.classList.remove('cursor--hover');
    });

    document.addEventListener('mouseleave', function () {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', function () {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }());


  /* ─────────────────────────────────────────
     04. SCROLL PROGRESS BAR
  ───────────────────────────────────────── */
  (function initProgress() {
    var bar = document.getElementById('js-progress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      var total = document.documentElement.scrollHeight - window.innerHeight;
      var pct   = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }, { passive: true });
  }());


  /* ─────────────────────────────────────────
     05. STICKY HEADER
  ───────────────────────────────────────── */
  var header = document.getElementById('js-header');

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ─────────────────────────────────────────
     06. SCROLLSPY — ACTIVE NAV HIGHLIGHT
     Observes each section; activates the
     matching nav link when in view.
  ───────────────────────────────────────── */
  (function initSpy() {
    var sections = document.querySelectorAll('section[id]');
    var links    = document.querySelectorAll('[data-spy]');
    if (!sections.length || !links.length) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (l) {
          l.classList.toggle('is-active', l.dataset.spy === e.target.id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (s) { obs.observe(s); });
  }());


  /* ─────────────────────────────────────────
     07. MOBILE NAV (slide-in)
  ───────────────────────────────────────── */
  var hamburger  = document.getElementById('js-hamburger');
  var mobileNav  = document.getElementById('js-mobile-nav');

  function closeNav() {
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openNav() {
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.classList.contains('c-mobile-nav__link')) closeNav();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }


  /* ─────────────────────────────────────────
     08. SMOOTH ANCHOR SCROLL
  ───────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href');
    if (id === '#') return;
    var el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    var offset = header.offsetHeight;
    var top    = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });


  /* ─────────────────────────────────────────
     09. SCROLL REVEAL
  ───────────────────────────────────────── */
  (function initReveal() {
    var els = document.querySelectorAll('.js-reveal');

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -36px 0px' });

    els.forEach(function (el) { obs.observe(el); });
  }());


  /* ─────────────────────────────────────────
     10. COUNTER ANIMATION
     Counts from 0 to [data-count] with a
     smooth ease-out quad curve.
  ───────────────────────────────────────── */
  (function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;

    function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }

    function runCounter(el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var suffix   = el.getAttribute('data-suffix') || '';
      var duration = prefersReduced ? 0 : 1300;
      var start    = null;

      if (duration === 0) {
        el.textContent = target + suffix;
        return;
      }

      function step(ts) {
        if (!start) start = ts;
        var elapsed  = ts - start;
        var progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.round(easeOutQuad(progress) * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    if (!('IntersectionObserver' in window)) {
      els.forEach(runCounter);
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          runCounter(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });

    els.forEach(function (el) { obs.observe(el); });
  }());


  /* ─────────────────────────────────────────
     11. TYPEWRITER CYCLE
     Cycles through risk-related phrases in
     the hero headline. Respects prefers-
     reduced-motion.
  ───────────────────────────────────────── */
  (function initTypewriter() {
    var target = document.getElementById('js-typewriter');
    if (!target || prefersReduced) return;

    var phrases = [
      'Digital Risk',
      'Cyber Resilience',
      'AI Governance',
      'Operational Risk',
      'Digital Risk'   /* return to original */
    ];

    var pIdx       = 0;
    var cIdx       = phrases[0].length;  /* start fully typed */
    var deleting   = false;
    var frozen     = false;
    var PAUSE_FULL = 2200;               /* ms to pause after full phrase */
    var PAUSE_EMPTY= 350;               /* ms before typing next phrase */

    /* Text node followed by caret span */
    var textNode = document.createTextNode(phrases[0]);
    var caret    = target.querySelector('.c-caret') || (function () {
      var s = document.createElement('span');
      s.className = 'c-caret';
      s.setAttribute('aria-hidden', 'true');
      return s;
    }());

    target.textContent = '';
    target.appendChild(textNode);
    target.appendChild(caret);

    function type() {
      if (frozen) return;

      var phrase = phrases[pIdx];

      if (!deleting) {
        cIdx++;
        textNode.nodeValue = phrase.slice(0, cIdx);

        if (cIdx === phrase.length) {
          /* Last phrase — stop forever */
          if (pIdx === phrases.length - 1) return;
          frozen = true;
          setTimeout(function () {
            frozen   = false;
            deleting = true;
            setTimeout(type, 60);
          }, PAUSE_FULL);
          return;
        }

        setTimeout(type, 75 + Math.random() * 45);

      } else {
        cIdx--;
        textNode.nodeValue = phrase.slice(0, cIdx);

        if (cIdx === 0) {
          deleting = false;
          pIdx     = (pIdx + 1) % phrases.length;
          setTimeout(type, PAUSE_EMPTY);
          return;
        }

        setTimeout(type, 40 + Math.random() * 22);
      }
    }

    /* Start cycling after 2.8 s */
    setTimeout(function () {
      deleting = true;
      type();
    }, 2800);
  }());


  /* ─────────────────────────────────────────
     12. CARD 3-D TILT
     Adds subtle perspective rotation on
     mousemove for service, fact, audience
     cards. Touch and reduced-motion safe.
  ───────────────────────────────────────── */
  (function initTilt() {
    if (isTouch || prefersReduced) return;

    var MAX_DEG = 7;
    var cards   = document.querySelectorAll('.c-service__inner, .c-fact, .c-audience');

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
        var dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
        card.style.transform = [
          'perspective(900px)',
          'rotateX(' + (dy * -MAX_DEG)  + 'deg)',
          'rotateY(' + (dx *  MAX_DEG)  + 'deg)',
          'translateZ(5px)'
        ].join(' ');
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.55s cubic-bezier(0.16,1,0.3,1)';
        card.style.transform  = '';
        setTimeout(function () { card.style.transition = ''; }, 550);
      });
    });
  }());


  /* ─────────────────────────────────────────
     13. CONTACT FORM VALIDATION
     Live inline validation on blur + input.
     Shows animated success state on submit.
  ───────────────────────────────────────── */
  (function initForm() {
    var form    = document.getElementById('js-form');
    if (!form) return;

    var FIELDS  = {
      name:    { input: document.getElementById('f-name'),  error: document.getElementById('e-name') },
      email:   { input: document.getElementById('f-email'), error: document.getElementById('e-email') },
      message: { input: document.getElementById('f-msg'),   error: document.getElementById('e-msg') },
    };

    var success = document.getElementById('js-success');

    /* Validation rules */
    function validate(key) {
      var f   = FIELDS[key];
      var val = f.input.value.trim();
      var msg = '';

      if (key === 'name' && val.length < 2) {
        msg = 'Please enter your full name.';
      }

      if (key === 'email') {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        msg = !val ? 'Email address is required.'
            : !re.test(val) ? 'Please enter a valid email address.' : '';
      }

      if (key === 'message' && val.length < 10) {
        msg = 'Please enter a message (at least 10 characters).';
      }

      f.error.textContent = msg;
      f.input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }

    /* Live feedback after first interaction */
    Object.keys(FIELDS).forEach(function (key) {
      var touched = false;
      FIELDS[key].input.addEventListener('blur', function () {
        touched = true;
        validate(key);
      });
      FIELDS[key].input.addEventListener('input', function () {
        if (touched) validate(key);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var keys  = Object.keys(FIELDS);
      var valid = keys.every(validate);

      if (!valid) {
        var first = keys.find(function (k) {
          return FIELDS[k].input.getAttribute('aria-invalid') === 'true';
        });
        if (first) FIELDS[first].input.focus();
        return;
      }

      form.hidden         = true;
      success.hidden      = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }());

}());
