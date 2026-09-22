/* =============================================================================
   Asnières Jujitsu — Main JavaScript
   Jekyll/GitHub Pages version
   (Adapted from js/main.js — API calls removed; static content used instead)
   ============================================================================= */

'use strict';

// ---------------------------------------------------------------------------
// Mobile Navigation Toggle
// ---------------------------------------------------------------------------
(function () {
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      this.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
})();

// ---------------------------------------------------------------------------
// Registration Modal Handler
// ---------------------------------------------------------------------------
(function () {
  var modal      = document.getElementById('registrationModal');
  var modalClose = document.querySelector('.modal-close');
  var openBtns   = document.querySelectorAll('a[href="#contact"].btn-primary');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
})();

// ---------------------------------------------------------------------------
// Smooth Scrolling (anchor links that are NOT the registration button)
// ---------------------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    if (this.classList.contains('btn-primary') && this.getAttribute('href') === '#contact') return;
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ---------------------------------------------------------------------------
// Active Navigation Link on Scroll
// ---------------------------------------------------------------------------
window.addEventListener('scroll', function () {
  var sections  = document.querySelectorAll('section[id]');
  var scrollY   = window.pageYOffset;

  sections.forEach(function (section) {
    var sectionTop = section.offsetTop - 100;
    var sectionId  = section.getAttribute('id');
    var navLink    = document.querySelector('.nav-link[href="#' + sectionId + '"]');

    if (scrollY > sectionTop && scrollY <= sectionTop + section.offsetHeight) {
      document.querySelectorAll('.nav-link').forEach(function (l) { l.classList.remove('active'); });
      if (navLink) navLink.classList.add('active');
    }
  });
}, { passive: true });

// ---------------------------------------------------------------------------
// Carousel helper (News, Calendar)
// ---------------------------------------------------------------------------
function initCarousel(scrollId, gridSelector, dotsId, prevId, nextId, cardWidth, gap) {
  var scroll = document.getElementById(scrollId);
  var prev   = document.getElementById(prevId);
  var next   = document.getElementById(nextId);
  var dotsEl = document.getElementById(dotsId);
  var cards  = document.querySelectorAll(gridSelector);

  if (!scroll || !cards.length) return;

  dotsEl.innerHTML = '';
  cards.forEach(function (_, i) {
    var d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Élément ' + (i + 1));
    d.addEventListener('click', function () {
      scroll.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
    });
    dotsEl.appendChild(d);
  });

  function sync() {
    var sl  = scroll.scrollLeft;
    var idx = Math.round(sl / (cardWidth + gap));
    Array.from(dotsEl.children).forEach(function (d, i) {
      d.classList.toggle('active', i === idx);
    });
    prev.disabled = sl <= 2;
    next.disabled = sl + scroll.offsetWidth >= scroll.scrollWidth - 2;
  }

  prev.addEventListener('click', function () { scroll.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' }); });
  next.addEventListener('click', function () { scroll.scrollBy({ left:  (cardWidth + gap), behavior: 'smooth' }); });
  scroll.addEventListener('scroll', sync, { passive: true });
  sync();
}

// ---------------------------------------------------------------------------
// Pricing carousel helper
// ---------------------------------------------------------------------------
(function () {
  var CARD_W = 260;
  var GAP    = 24;

  function initPricingCarousel() {
    var scroll = document.getElementById('pricingScroll');
    var prev   = document.getElementById('pricingPrev');
    var next   = document.getElementById('pricingNext');
    var dotsEl = document.getElementById('pricingDots');
    var cards  = document.querySelectorAll('#pricingGrid .pricing-card');
    if (!scroll || !cards.length) return;

    dotsEl.innerHTML = '';
    cards.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', 'Tarif ' + (i + 1));
      d.addEventListener('click', function () {
        scroll.scrollTo({ left: i * (CARD_W + GAP), behavior: 'smooth' });
      });
      dotsEl.appendChild(d);
    });

    function sync() {
      var sl  = scroll.scrollLeft;
      var idx = Math.round(sl / (CARD_W + GAP));
      Array.from(dotsEl.children).forEach(function (d, i) { d.classList.toggle('active', i === idx); });
      prev.disabled = sl <= 2;
      next.disabled = sl + scroll.offsetWidth >= scroll.scrollWidth - 2;
    }

    prev.addEventListener('click', function () { scroll.scrollBy({ left: -(CARD_W + GAP), behavior: 'smooth' }); });
    next.addEventListener('click', function () { scroll.scrollBy({ left:  (CARD_W + GAP), behavior: 'smooth' }); });
    scroll.addEventListener('scroll', sync, { passive: true });
    sync();
  }

  document.addEventListener('DOMContentLoaded', initPricingCarousel);
})();

// ---------------------------------------------------------------------------
// Gallery Lightbox (static images)
// ---------------------------------------------------------------------------
var lightboxImages = [];
var lightboxIndex  = 0;

function openLightbox(images, index) {
  lightboxImages = images;
  lightboxIndex  = index;
  var lb = document.getElementById('galleryLightbox');
  if (!lb) return;
  lb.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  updateLightbox();
}

function updateLightbox() {
  var img = document.getElementById('lightboxImg');
  var cap = document.getElementById('lightboxCaption');
  var cur = lightboxImages[lightboxIndex];
  if (img) { img.src = cur.src; img.alt = cur.alt || ''; }
  if (cap) cap.textContent = cur.caption || '';
}

function closeLightbox() {
  var lb = document.getElementById('galleryLightbox');
  if (lb) lb.style.display = 'none';
  document.body.style.overflow = '';
}

function lightboxNav(dir, event) {
  if (event) event.stopPropagation();
  lightboxIndex = (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  updateLightbox();
}

document.addEventListener('keydown', function (e) {
  var lb = document.getElementById('galleryLightbox');
  if (!lb || lb.style.display === 'none') return;
  if (e.key === 'ArrowRight') lightboxNav(1, null);
  if (e.key === 'ArrowLeft')  lightboxNav(-1, null);
  if (e.key === 'Escape')     closeLightbox();
});

// Init static gallery lightbox on page load
document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.static-gallery-item img');
  if (!items.length) return;
  var images = Array.from(items).map(function (img) {
    return { src: img.src, alt: img.alt, caption: img.getAttribute('data-caption') || img.alt };
  });
  items.forEach(function (img, i) {
    img.closest('.static-gallery-item').addEventListener('click', function () {
      openLightbox(images, i);
    });
    img.closest('.static-gallery-item').style.cursor = 'pointer';
  });
});

// ---------------------------------------------------------------------------
// Blog preview carousel (if present — initialised after DOM ready)
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  initCarousel('newsScroll',      '#newsContainer .news-card',            'newsDots',      'newsPrev',     'newsNext',     300, 24);
  initCarousel('calendarScroll',  '#calendarContainer .calendar-event',   'calendarDots',  'calendarPrev', 'calendarNext', 280, 24);
});

// ---------------------------------------------------------------------------
// Contact form (static — sends to Formspree or similar, configured via data)
// ---------------------------------------------------------------------------
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Envoi en cours…';

    var data = {};
    new FormData(form).forEach(function (v, k) { data[k] = v; });

    // Use Formspree endpoint from data attribute, or show mailto fallback
    var endpoint = form.getAttribute('data-action') || '';
    if (!endpoint) {
      // Fallback: show a success-like message without actual submission
      setTimeout(function () {
        alert('✅ Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.\n\nPour activer l\'envoi réel, configurez Formspree dans _config.yml.');
        form.reset();
        btn.disabled = false;
        btn.textContent = originalText;
      }, 300);
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (res.ok || res.success) {
        alert('✅ Merci pour votre message !');
        form.reset();
      } else {
        alert('❌ ' + (res.error || 'Erreur lors de l\'envoi.'));
      }
    })
    .catch(function () {
      alert('❌ Erreur de connexion. Veuillez réessayer.');
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = originalText;
    });
  });
})();

// ---------------------------------------------------------------------------
// Newsletter form (static Formspree)
// ---------------------------------------------------------------------------
(function () {
  var form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var msg = document.getElementById('newsletterMsg');
    var endpoint = form.getAttribute('data-action') || '';
    btn.disabled = true;
    btn.textContent = 'Inscription…';

    if (!endpoint) {
      setTimeout(function () {
        if (msg) {
          msg.style.display = 'block';
          msg.className = 'newsletter-msg success';
          msg.textContent = '✅ Merci ! Pour activer l\'inscription réelle, configurez Formspree.';
        }
        form.reset();
        btn.disabled = false;
        btn.textContent = 'S\'inscrire';
      }, 300);
      return;
    }

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('nlEmail').value,
        name:  document.getElementById('nlName') ? document.getElementById('nlName').value : ''
      })
    })
    .then(function (r) { return r.json(); })
    .then(function (res) {
      if (msg) {
        msg.style.display = 'block';
        if (res.ok || res.success) {
          msg.className = 'newsletter-msg success';
          msg.textContent = '✅ Inscription confirmée !';
          form.reset();
        } else {
          msg.className = 'newsletter-msg error';
          msg.textContent = '❌ ' + (res.error || 'Erreur lors de l\'inscription.');
        }
      }
    })
    .catch(function () {
      if (msg) { msg.style.display = 'block'; msg.className = 'newsletter-msg error'; msg.textContent = '❌ Erreur de connexion.'; }
    })
    .finally(function () {
      btn.disabled = false;
      btn.textContent = 'S\'inscrire';
    });
  });
})();
