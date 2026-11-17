/**
 * HALOGIQ — Deployment-Ready Frontend Controller (Vanilla ES6)
 * Handles:
 * 1. Hash-synced 5-page view routing (#home, #methodology, #programmes, #schools, #partner)
 * 2. Mobile navigation drawer & accessibility
 * 3. Page 1: 4-Stakeholder tab switcher
 * 4. Page 2: Graphic 5 Memory Comparison SVG toggle & Graphic 6 4-Step Loop interactive sync
 * 5. Page 4: Expandable Leadership FAQ accordion
 * 6. Page 5: Curriculum Walkthrough form validation & instant confirmation state
 */

document.addEventListener('DOMContentLoaded', () => {
  const VALID_ROUTES = ['home', 'methodology', 'programmes', 'schools', 'partner'];

  // ==========================================================================
  // 1. HASH-SYNCED VIEW ROUTING
  // ==========================================================================
  const views = document.querySelectorAll('.page-view');
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  function closeMobileDrawer() {
    if (mobileNavDrawer && mobileMenuToggle) {
      mobileNavDrawer.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function activateRoute(routeKey, scrollToTop = true) {
    const targetRoute = VALID_ROUTES.includes(routeKey) ? routeKey : 'home';

    views.forEach((view) => {
      const isMatch = view.getAttribute('data-route') === targetRoute;
      view.classList.toggle('active', isMatch);
    });

    desktopNavLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-nav') === targetRoute;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    mobileNavLinks.forEach((link) => {
      const isMatch = link.getAttribute('data-nav') === targetRoute;
      link.classList.toggle('active', isMatch);
    });

    closeMobileDrawer();

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleHashChange() {
    const rawHash = window.location.hash.replace('#', '').trim().toLowerCase();
    const targetRoute = VALID_ROUTES.includes(rawHash) ? rawHash : 'home';
    activateRoute(targetRoute, true);
  }

  // Intercept clicks on any [data-nav] element
  document.querySelectorAll('[data-nav]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const targetRoute = trigger.getAttribute('data-nav');
      const pathwaySelect = trigger.getAttribute('data-pathway-select');

      if (pathwaySelect) {
        const radios = document.querySelectorAll('input[name="pathway"]');
        radios.forEach((radio) => {
          if (pathwaySelect === 'elevate' && radio.value.includes('HALOGIQ Elevate')) {
            radio.checked = true;
          } else if (pathwaySelect === 'exams' && radio.value.includes('HALOGIQ Exams')) {
            radio.checked = true;
          }
        });
      }

      if (targetRoute && VALID_ROUTES.includes(targetRoute)) {
        if (window.location.hash === `#${targetRoute}`) {
          e.preventDefault();
          activateRoute(targetRoute, true);
        }
      }
    });
  });

  window.addEventListener('hashchange', handleHashChange);

  // Initialize initial view from URL hash without abrupt scroll jump
  const initialHash = window.location.hash.replace('#', '').trim().toLowerCase();
  activateRoute(VALID_ROUTES.includes(initialHash) ? initialHash : 'home', false);

  // ==========================================================================
  // 2. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('open')) {
        closeMobileDrawer();
      }
    });
  }

  // ==========================================================================
  // 3. SECTION 1.5: INTERACTIVE 4-STAKEHOLDER TAB SWITCHER
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateStakeholderTab(targetPanelId) {
    tabButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-tab') === targetPanelId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });

    tabPanels.forEach((panel) => {
      const isMatch = panel.id === targetPanelId;
      panel.classList.toggle('active', isMatch);
    });
  }

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      activateStakeholderTab(btn.getAttribute('data-tab'));
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = (idx + dir + tabButtons.length) % tabButtons.length;
        tabButtons[nextIdx].focus();
        activateStakeholderTab(tabButtons[nextIdx].getAttribute('data-tab'));
      }
    });
  });

  // ==========================================================================
  // 4. PAGE 2, SECTION 2.2: GRAPHIC 5 MEMORY COMPARISON DIAGRAM TOGGLE
  // ==========================================================================
  const memoryToggleBtns = document.querySelectorAll('[data-memory-view]');
  const svgStateSurface = document.getElementById('svgStateSurface');
  const svgStateStructured = document.getElementById('svgStateStructured');

  memoryToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-memory-view');
      memoryToggleBtns.forEach((b) => b.classList.toggle('active', b === btn));

      if (!svgStateSurface || !svgStateStructured) return;

      if (mode === 'surface') {
        svgStateSurface.setAttribute('class', 'svg-state-active');
        svgStateStructured.setAttribute('class', 'svg-state-dimmed');
      } else if (mode === 'structured') {
        svgStateSurface.setAttribute('class', 'svg-state-dimmed');
        svgStateStructured.setAttribute('class', 'svg-state-active');
      } else {
        svgStateSurface.setAttribute('class', 'svg-state-active');
        svgStateStructured.setAttribute('class', 'svg-state-active');
      }
    });
  });

  // ==========================================================================
  // 5. PAGE 2, SECTION 2.3: GRAPHIC 6 INTERACTIVE 4-STEP LEARNING LOOP
  // ==========================================================================
  const loopNodes = document.querySelectorAll('.loop-node-group');
  const loopCards = document.querySelectorAll('.loop-step-card');

  function highlightLoopStep(stepNumber) {
    loopCards.forEach((card) => {
      const isMatch = card.getAttribute('data-step-card') === String(stepNumber);
      card.classList.toggle('active', isMatch);
    });

    loopNodes.forEach((node) => {
      const isMatch = node.getAttribute('data-step-target') === String(stepNumber);
      const rect = node.querySelector('rect');
      if (rect) {
        if (isMatch) {
          rect.setAttribute('fill', '#EFF6FF');
          rect.setAttribute('stroke', '#2563EB');
          rect.setAttribute('stroke-width', '2.2');
        } else {
          rect.setAttribute('fill', '#FFFFFF');
          rect.setAttribute('stroke', '#CBD5E1');
          rect.setAttribute('stroke-width', '1.8');
        }
      }
    });
  }

  loopNodes.forEach((node) => {
    node.addEventListener('click', () => {
      highlightLoopStep(node.getAttribute('data-step-target'));
    });
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        highlightLoopStep(node.getAttribute('data-step-target'));
      }
    });
  });

  loopCards.forEach((card) => {
    card.addEventListener('click', () => {
      highlightLoopStep(card.getAttribute('data-step-card'));
    });
  });

  // ==========================================================================
  // 6. PAGE 4, SECTION 4.5: EXPANDABLE FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('open');
      questionBtn.setAttribute('aria-expanded', String(isOpen));
    });
  });

  // ==========================================================================
  // 7. PAGE 5, SECTION 5.2: CURRICULUM WALKTHROUGH FORM VALIDATION
  // ==========================================================================
  const walkthroughForm = document.getElementById('walkthroughForm');
  const formErrorMsg = document.getElementById('formErrorMsg');
  const formConfirmation = document.getElementById('formConfirmation');
  const confirmationSummary = document.getElementById('confirmationSummary');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (walkthroughForm) {
    walkthroughForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const userRole = document.getElementById('userRole').value.trim();
      const institutionCity = document.getElementById('institutionCity').value.trim();
      const contactInfo = document.getElementById('contactInfo').value.trim();
      const selectedPathway = document.querySelector('input[name="pathway"]:checked');
      const pathwayVal = selectedPathway ? selectedPathway.value : 'HALOGIQ Elevate';

      if (!fullName || !userRole || !institutionCity || !contactInfo) {
        if (formErrorMsg) {
          formErrorMsg.style.display = 'block';
        }
        return;
      }

      if (formErrorMsg) {
        formErrorMsg.style.display = 'none';
      }

      if (confirmationSummary) {
        confirmationSummary.textContent = `We have received your request for ${institutionCity} (${userRole}: ${fullName}) regarding ${pathwayVal}. Our Academic Partnerships Team will connect with you via ${contactInfo} within 24 hours.`;
      }

      walkthroughForm.style.display = 'none';
      if (formConfirmation) {
        formConfirmation.classList.add('visible');
      }
    });
  }

  if (resetFormBtn && walkthroughForm && formConfirmation) {
    resetFormBtn.addEventListener('click', () => {
      walkthroughForm.reset();
      formConfirmation.classList.remove('visible');
      walkthroughForm.style.display = 'block';
    });
  }
});
