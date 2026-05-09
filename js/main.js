/* =========================================================
   We Care English School — Main Script
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initDropdownMobile();
    initRevealOnScroll();
    initHeroSlider();
    initStatsCounter();
    initGalleryFilter();
    initLightbox();
    initProgramTabs();
    initContactForm();
    setActiveNav();
    setFooterYear();
  });

  /* -------- Mobile menu toggle -------- */
  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 768 && !a.parentElement.classList.contains('has-drop')) {
          nav.classList.remove('is-open');
          toggle.classList.remove('is-open');
        }
      });
    });
  }

  /* -------- Dropdown click on mobile -------- */
  function initDropdownMobile() {
    document.querySelectorAll('.has-drop > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          const parent = a.parentElement;
          parent.parentElement.querySelectorAll('.has-drop').forEach(function (li) {
            if (li !== parent) li.classList.remove('is-expanded');
          });
          parent.classList.toggle('is-expanded');
        }
      });
    });
  }

  /* -------- Active link highlighting -------- */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      const href = a.getAttribute('href');
      if (!href) return;
      if (href === path || (path === '' && href === 'index.html')) {
        const li = a.closest('li');
        if (li) li.classList.add('active');
      }
    });
  }

  /* -------- Reveal on scroll -------- */
  function initRevealOnScroll() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    els.forEach(function (el) { io.observe(el); });
  }

  /* -------- Hero slider -------- */
  function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.hero-slide');
    const dots = slider.querySelectorAll('.hero-dots button');
    const prev = slider.querySelector('.hero-arrow.prev');
    const next = slider.querySelector('.hero-arrow.next');
    if (!slides.length) return;

    let current = 0;
    let timer;

    function show(idx) {
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
      current = idx;
      const active = slides[idx];
      if (active) {
        active.querySelectorAll('.hero-eyebrow, h1, p.lead, .hero-actions').forEach(function (el) {
          el.style.animation = 'none';
          /* eslint-disable-next-line no-unused-expressions */
          el.offsetHeight;
          el.style.animation = '';
        });
      }
    }

    function nextSlide() { show((current + 1) % slides.length); }
    function prevSlide() { show((current - 1 + slides.length) % slides.length); }

    function startAuto() { stopAuto(); timer = setInterval(nextSlide, 6500); }
    function stopAuto() { if (timer) clearInterval(timer); }

    if (next) next.addEventListener('click', function () { nextSlide(); startAuto(); });
    if (prev) prev.addEventListener('click', function () { prevSlide(); startAuto(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); startAuto(); });
    });

    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);

    show(0);
    startAuto();
  }

  /* -------- Stats counter (animated count up) -------- */
  function initStatsCounter() {
    const nums = document.querySelectorAll('.stat-block .num');
    if (!nums.length || !('IntersectionObserver' in window)) {
      nums.forEach(function (n) {
        n.textContent = (n.getAttribute('data-target') || '0') + (n.getAttribute('data-suffix') || '');
      });
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.floor(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (n) { io.observe(n); });
  }

  /* -------- Gallery filter -------- */
  function initGalleryFilter() {
    const filters = document.querySelectorAll('.gallery-filters button');
    const items = document.querySelectorAll('.gallery-item');
    if (!filters.length) return;

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        items.forEach(function (item) {
          const itemCat = item.getAttribute('data-category');
          item.style.display = (cat === 'all' || cat === itemCat) ? '' : 'none';
        });
      });
    });
  }

  /* -------- Lightbox -------- */
  function initLightbox() {
    const items = document.querySelectorAll('.gallery-item');
    if (!items.length) return;

    let lb = document.querySelector('.lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog');
      lb.setAttribute('aria-modal', 'true');
      lb.innerHTML = '' +
        '<div class="lightbox-content">' +
          '<button class="close" aria-label="Close">&times;</button>' +
          '<button class="nav prev" aria-label="Previous">&#10094;</button>' +
          '<button class="nav next" aria-label="Next">&#10095;</button>' +
          '<img alt="">' +
          '<div class="caption"></div>' +
        '</div>';
      document.body.appendChild(lb);
    }

    const img = lb.querySelector('img');
    const cap = lb.querySelector('.caption');
    const closeBtn = lb.querySelector('.close');
    const prevBtn = lb.querySelector('.nav.prev');
    const nextBtn = lb.querySelector('.nav.next');

    let visible = [];
    let current = 0;

    function getVisible() {
      return Array.prototype.filter.call(items, function (it) {
        return it.style.display !== 'none';
      });
    }

    function open(idx) {
      visible = getVisible();
      current = idx;
      render();
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    function render() {
      const item = visible[current];
      if (!item) return;
      const src = item.getAttribute('data-full') || item.querySelector('img').src;
      const caption = item.getAttribute('data-caption') || '';
      img.src = src;
      img.alt = caption;
      cap.textContent = caption;
    }
    function next() { current = (current + 1) % visible.length; render(); }
    function prev() { current = (current - 1 + visible.length) % visible.length; render(); }

    items.forEach(function (item) {
      item.addEventListener('click', function () {
        const v = getVisible();
        const idx = v.indexOf(item);
        open(idx >= 0 ? idx : 0);
      });
    });

    closeBtn.addEventListener('click', close);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  }

  /* -------- Academics program tabs -------- */
  function initProgramTabs() {
    const tabs = document.querySelectorAll('.program-tabs button');
    const panels = document.querySelectorAll('.program-panel');
    if (!tabs.length) return;

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        const target = tab.getAttribute('data-tab');
        tabs.forEach(function (t) { t.classList.remove('active'); });
        panels.forEach(function (p) { p.classList.remove('active'); });
        tab.classList.add('active');
        const panel = document.getElementById(target);
        if (panel) panel.classList.add('active');
      });
    });
  }

  /* -------- Contact form validation -------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const success = form.querySelector('.form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll('.field').forEach(function (field) {
        const input = field.querySelector('input, select, textarea');
        if (!input) return;
        const value = input.value.trim();
        const required = input.hasAttribute('required');
        const type = input.getAttribute('type');

        let fieldValid = true;
        if (required && !value) fieldValid = false;
        if (type === 'email' && value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) fieldValid = false;
        if (type === 'tel' && value && !/^[+\d][\d\s\-()]{6,}$/.test(value)) fieldValid = false;

        field.classList.toggle('has-error', !fieldValid);
        if (!fieldValid) valid = false;
      });

      if (valid) {
        if (success) {
          success.classList.add('is-visible');
          setTimeout(function () { success.classList.remove('is-visible'); }, 6000);
        }
        form.reset();
      }
    });

    form.querySelectorAll('input, select, textarea').forEach(function (el) {
      el.addEventListener('input', function () {
        const field = el.closest('.field');
        if (field) field.classList.remove('has-error');
      });
    });
  }

  /* -------- Footer year -------- */
  function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  }
})();
