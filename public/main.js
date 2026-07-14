// ===========================
// VortKart® Global JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', function () {

  // Enable JS-driven fade-in animations (keeps elements visible when JS is off)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-fade-ready');
  }

  // ---- Google Ads / GA4 micro-conversion click tracking ----
  // Fires only when gtag is loaded (i.e. ANALYTICS IDs are set in site.ts).
  (function () {
    function track(eventName, label) {
      if (typeof window.gtag !== 'function') return;
      // GA4 event
      window.gtag('event', eventName, { event_category: 'contact', event_label: label });
      // Google Ads conversion (if a WhatsApp/Call label is configured you can extend here)
    }
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link) return;
      var href = (link.getAttribute('href') || '').toLowerCase();
      if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1 || href.indexOf('api.whatsapp') !== -1) {
        track('whatsapp_click', 'WhatsApp');
      } else if (href.indexOf('tel:') === 0) {
        track('phone_click', 'Phone');
      } else if (href.indexOf('mailto:') === 0) {
        track('email_click', 'Email');
      }
    }, true);
  })();


  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    // Apply scrolled state on load if page is already scrolled (e.g. back navigation)
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ---- Mobile Nav Toggle ----
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    const setToggleOpen = (open) => {
      const spans = toggle.querySelectorAll('span');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        mobileNav.classList.add('open');
        document.body.style.overflow = 'hidden';
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    };
    toggle.addEventListener('click', function () {
      setToggleOpen(!mobileNav.classList.contains('open'));
    });
    // Close on link click or ESC key
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setToggleOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) setToggleOpen(false);
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0].replace(/\/$/, ''); // strip anchors + trailing slash
    if (href && href === currentPath) {
      link.classList.add('active');
    }
  });

  // ---- Scroll-triggered fade in ----
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target); // stop observing once visible
        }
      });
    }, { threshold: 0.08 });
    fadeEls.forEach(el => observer.observe(el));
  }

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Find the closest dedicated FAQ group wrapper; fall back to the item's direct parent element
      // This prevents closing FAQ items that belong to a different section on the same page
      const group = item.closest('.faq-right') || item.parentElement;
      group.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Filter bars (scoped —handles multiple independent filter groups on the same page) ----
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const btns = bar.querySelectorAll('.filter-btn');
    // Find the closest sibling grid that contains [data-category] cards
    const gridContainer = bar.nextElementSibling;
    if (!gridContainer) return;
    const cards = gridContainer.querySelectorAll('[data-category]');
    if (!cards.length) return;

    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        btns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        this.classList.add('active');
        this.setAttribute('aria-pressed', 'true');
        const cat = this.dataset.filter;
        const isProductFilter = bar.id === 'product-filter';
        cards.forEach(card => {
          const match = isProductFilter
            ? card.dataset.category === cat
            : (cat === 'all' || card.dataset.category === cat);
          if (match) {
            card.style.display = '';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = '';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => { card.style.display = 'none'; }, 280);
          }
        });
      });
    });
  });

  // Auto-apply "All Models" filter on page load — hides product cards initially
  const productFilter = document.getElementById('product-filter');
  if (productFilter) {
    const allBtn = productFilter.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.click();
  }

  // ---- Fix cross-page anchor jumps (e.g. /portfolio#projects) ----
  // The product filter above changes page height on load, which throws off the
  // browser's native hash scroll and causes a visible "second jump". If the URL
  // has a hash, re-align to the target instantly (no smooth animation) after the
  // layout has settled.
  if (window.location.hash.length > 1) {
    const anchorTarget = document.getElementById(window.location.hash.slice(1));
    if (anchorTarget) {
      const alignAnchor = () => anchorTarget.scrollIntoView({ behavior: 'auto', block: 'start' });
      // Run after the filter's fade transition and a layout frame.
      requestAnimationFrame(() => setTimeout(alignAnchor, 60));
      window.addEventListener('load', alignAnchor, { once: true });
    }
  }

  // ---- "View X Range" category-card buttons: apply filter, then scroll to the
  //      product grid so the user actually sees the filtered results ----
  window.vkFilterProducts = function (cat) {
    const bar = document.getElementById('product-filter');
    if (!bar) return;
    const btn = bar.querySelector('.filter-btn[data-filter="' + cat + '"]');
    if (btn) btn.click();
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Scroll to the filter bar so both the active filter and the filtered
    // product grid are visible after the fade transition completes.
    setTimeout(() => {
      bar.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }, 320);
  };

  // ---- Counter animation ----
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length && !prefersReducedMotion) {
    const countObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el = e.target;
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          const duration = 1800;
          const steps = Math.max(1, Math.round(duration / 16));
          const increment = target / steps;
          let current = 0;
          let frame = 0;
          const timer = setInterval(() => {
            frame++;
            current = Math.min(Math.round(increment * frame), target);
            el.textContent = current.toLocaleString() + suffix;
            if (current >= target) clearInterval(timer);
          }, 16);
          countObs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => countObs.observe(el));
  }

  // ---- Contact form (Web3Forms AJAX) ----
  const form = document.getElementById('contactForm');
  if (form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!submitBtn) return;

      // Basic client-side validation
      let valid = true;
      let firstInvalid = null;
      form.querySelectorAll('[required]').forEach(field => {
        const isInvalid = !field.value.trim() || !field.checkValidity();
        if (isInvalid) {
          field.style.borderColor = 'var(--primary)';
          if (!firstInvalid) firstInvalid = field;
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });
      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      submitBtn.innerHTML = 'Sending&hellip;';
      submitBtn.disabled = true;

      // Collect form data as JSON for Web3Forms
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      fetch(form.getAttribute('action'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
        signal: controller.signal
      })
      .then(response => { clearTimeout(timeoutId); return response.json(); })
      .then(result => {
        if (result.success) {
          // Redirect to thank-you page (also serves as Google Ads conversion landing page)
          window.location.href = form.dataset.successRedirect || '/thank-you';
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      })
      .catch(error => {
        console.error('Web3Forms error:', error);
        const isTimeout = error.name === 'AbortError';
        submitBtn.innerHTML = isTimeout
          ? '&#9888; Request timed out. Please try again or email info@vortkart.com'
          : '&#9888; Submission failed. Please email us directly at info@vortkart.com';
        submitBtn.style.background = '#ef4444';
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnHTML;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 6000);
      });
    });
  }

  // ---- Smooth scroll for same-page anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Fix cross-page anchor scroll on load (e.g. /portfolio#projects) ----
  // Prevents the browser's native jump (which ignores fixed navbar offset)
  // by temporarily removing the target id, then smooth-scrolling manually.
  if (window.location.hash) {
    const selector = window.location.hash;
    const hashTarget = document.querySelector(selector);
    if (hashTarget) {
      // 1. Neutralize the browser's native anchor scroll
      hashTarget.removeAttribute('id');

      // 2. Restore id after a frame, then gradually correct scroll position
      //    as layout settles (images loading, filter animations, etc.)
      requestAnimationFrame(() => {
        hashTarget.setAttribute('id', selector.slice(1));

        const scrollToTarget = () => {
          const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
          const targetTop = hashTarget.getBoundingClientRect().top + window.scrollY - navH - 24;
          const clampedTop = Math.max(0, targetTop);
          // Only adjust if we're off by more than 5px
          if (Math.abs(window.scrollY - clampedTop) > 5) {
            window.scrollTo({ top: clampedTop, behavior: 'smooth' });
          }
        };

        // First correction after layout begins to settle
        setTimeout(scrollToTarget, 100);
        // Final fine-tune after images/filters have settled
        setTimeout(scrollToTarget, 400);
      });
    }
  }

  // ---- Dynamic "Currently Open" indicator ----
  const statusEl = document.querySelector('.hours-status');
  if (statusEl) {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23'
    }).formatToParts(now);
    const valueFor = (type) => parts.find(part => part.type === type)?.value;
    const dayMap = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const day = dayMap[valueFor('weekday')] ?? 0;
    const hour = parseInt(valueFor('hour') || '0', 10);
    const minute = parseInt(valueFor('minute') || '0', 10);
    const timeDecimal = hour + minute / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5) {
      isOpen = timeDecimal >= 8 && timeDecimal < 19;
    } else if (day === 6) {
      isOpen = timeDecimal >= 9 && timeDecimal < 15;
    }
    if (isOpen) {
      statusEl.textContent = 'Currently Open';
      statusEl.style.color = '#22c55e';
      statusEl.style.setProperty('--dot-color', '#22c55e');
    } else {
      statusEl.textContent = 'Currently Closed';
      statusEl.style.color = '#f87171';
    }
    // Update dot color via pseudo-element (inject a class)
    statusEl.classList.toggle('open', isOpen);
    statusEl.classList.toggle('closed', !isOpen);
  }

});
