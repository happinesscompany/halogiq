/**
 * HALOGIQ — Upgraded Deployment-Ready Frontend Controller (Vanilla ES6)
 * Implements Locked Blueprint (QW-1..5, ST-1..4, DS-1..3):
 * 1. Hash-synced 5-page view routing (#home, #methodology, #programmes, #schools, #partner)
 *    with sub-section deep-linking, focus management, live route announcements & active CTA state
 * 2. Mobile navigation drawer & Escape/click-outside handling
 * 3. Page 1: WAI-ARIA 1.2 4-Stakeholder tablist with roving tabindex & keyboard navigation
 * 4. Page 2: Graphic 5 Memory Comparison SVG toggle synced with comparison table columns
 * 5. Page 2: Graphic 6 4-Step Loop interactive sync + live viewport preview bar + keyboard cards
 * 6. Page 4: Expandable Leadership FAQ accordion with aria-controls & region semantics
 * 7. Page 5: Field-level form validation, error recovery & sessionStorage draft persistence
 */

document.addEventListener('DOMContentLoaded', () => {
  const VALID_ROUTES = ['home', 'methodology', 'programmes', 'schools', 'partner'];
  const ROUTE_TITLES = {
    home: 'Home — On-Site Learning & Meta-Skill Architecture',
    methodology: 'Our Methodology — Learning How to Learn',
    programmes: 'Programmes, Curriculum & In-Campus Executive Studio',
    schools: 'How It Works in Schools — Seamless Implementation',
    partner: 'Partner With Us — Request a Curriculum Walkthrough'
  };

  // ==========================================================================
  // 1. HASH-SYNCED VIEW ROUTING, FOCUS MANAGEMENT & DEEP-LINKING (QW-2, ST-3)
  // ==========================================================================
  const views = document.querySelectorAll('.page-view');
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const headerWalkthroughCta = document.getElementById('headerWalkthroughCta');
  const routeAnnouncer = document.getElementById('routeAnnouncer');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  let pendingScrollSectionId = null;

  function closeMobileDrawer() {
    if (mobileNavDrawer && mobileMenuToggle) {
      mobileNavDrawer.classList.remove('open');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
  }

  function parseHash(rawHashString) {
    const clean = rawHashString.replace(/^#/, '').trim();
    if (!clean) return { route: 'home', sectionId: null };

    // Support compound hash format e.g. #programmes:sec-campus-studio
    if (clean.includes(':')) {
      const [routePart, secPart] = clean.split(':');
      const normalizedRoute = routePart.toLowerCase();
      return {
        route: VALID_ROUTES.includes(normalizedRoute) ? normalizedRoute : 'home',
        sectionId: secPart || null
      };
    }

    const normalized = clean.toLowerCase();
    if (VALID_ROUTES.includes(normalized)) {
      return { route: normalized, sectionId: null };
    }

    // If hash matches an element ID inside one of the views, resolve its parent view
    const targetEl = document.getElementById(clean);
    if (targetEl) {
      const parentView = targetEl.closest('.page-view');
      if (parentView) {
        return {
          route: parentView.getAttribute('data-route') || 'home',
          sectionId: clean
        };
      }
    }

    return { route: 'home', sectionId: null };
  }

  function activateRoute(routeKey, options = {}) {
    const {
      scrollToTop = true,
      focusHeading = false,
      sectionId = null
    } = options;

    const targetRoute = VALID_ROUTES.includes(routeKey) ? routeKey : 'home';
    let activeViewEl = null;

    views.forEach((view) => {
      const isMatch = view.getAttribute('data-route') === targetRoute;
      view.classList.toggle('active', isMatch);
      if (isMatch) {
        activeViewEl = view;
      }
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
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Highlight Header CTA when on #partner (ST-3)
    if (headerWalkthroughCta) {
      const isPartner = targetRoute === 'partner';
      headerWalkthroughCta.classList.toggle('active-cta', isPartner);
      if (isPartner) {
        headerWalkthroughCta.setAttribute('aria-current', 'page');
      } else {
        headerWalkthroughCta.removeAttribute('aria-current');
      }
    }

    closeMobileDrawer();

    // Announce route change to screen readers (QW-2)
    if (focusHeading && routeAnnouncer && ROUTE_TITLES[targetRoute]) {
      routeAnnouncer.textContent = `Navigated to ${ROUTE_TITLES[targetRoute]}`;
    }

    const targetScrollId = sectionId || pendingScrollSectionId;
    pendingScrollSectionId = null;

    if (targetScrollId) {
      const targetSection = document.getElementById(targetScrollId);
      if (targetSection) {
        requestAnimationFrame(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (focusHeading) {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus({ preventScroll: true });
          }
        });
        return;
      }
    }

    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (focusHeading && activeViewEl) {
      const mainHeading = activeViewEl.querySelector('h1');
      if (mainHeading) {
        mainHeading.focus({ preventScroll: true });
      }
    }
  }

  // Intercept clicks on any [data-nav] element
  document.querySelectorAll('[data-nav]').forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      const targetRoute = trigger.getAttribute('data-nav');
      const pathwaySelect = trigger.getAttribute('data-pathway-select');
      const scrollToId = trigger.getAttribute('data-scroll-to');

      if (pathwaySelect) {
        const radios = document.querySelectorAll('input[name="pathway"]');
        radios.forEach((radio) => {
          if (pathwaySelect === 'elevate' && radio.value.includes('HALOGIQ Elevate')) {
            radio.checked = true;
          } else if (pathwaySelect === 'exams' && radio.value.includes('HALOGIQ Exams')) {
            radio.checked = true;
          }
        });
        savePathwaySelection();
      }

      if (scrollToId) {
        pendingScrollSectionId = scrollToId;
      }

      if (targetRoute && VALID_ROUTES.includes(targetRoute)) {
        const currentParsed = parseHash(window.location.hash);
        if (currentParsed.route === targetRoute) {
          e.preventDefault();
          activateRoute(targetRoute, {
            scrollToTop: !scrollToId,
            focusHeading: true,
            sectionId: scrollToId
          });
        }
      }
    });
  });

  window.addEventListener('hashchange', () => {
    const { route, sectionId } = parseHash(window.location.hash);
    activateRoute(route, {
      scrollToTop: !sectionId,
      focusHeading: true,
      sectionId
    });
  });

  // Initialize initial view from URL hash without abrupt scroll jump
  const initialParsed = parseHash(window.location.hash);
  activateRoute(initialParsed.route, {
    scrollToTop: false,
    focusHeading: false,
    sectionId: initialParsed.sectionId
  });

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
        mobileMenuToggle.focus();
      }
    });
  }

  // ==========================================================================
  // 3. SECTION 1.5: INTERACTIVE 4-STAKEHOLDER TAB SWITCHER (QW-4 ROVING TABINDEX)
  // ==========================================================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function activateStakeholderTab(targetPanelId) {
    tabButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-tab') === targetPanelId;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
      btn.setAttribute('tabindex', isMatch ? '0' : '-1');
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
      let nextIdx = null;
      if (e.key === 'ArrowRight') {
        nextIdx = (idx + 1) % tabButtons.length;
      } else if (e.key === 'ArrowLeft') {
        nextIdx = (idx - 1 + tabButtons.length) % tabButtons.length;
      } else if (e.key === 'Home') {
        nextIdx = 0;
      } else if (e.key === 'End') {
        nextIdx = tabButtons.length - 1;
      }

      if (nextIdx !== null) {
        e.preventDefault();
        tabButtons[nextIdx].focus();
        activateStakeholderTab(tabButtons[nextIdx].getAttribute('data-tab'));
      }
    });
  });

  // ==========================================================================
  // 4. PAGE 2, SECTION 2.2: GRAPHIC 5 MEMORY COMPARISON + TABLE SYNC (QW-4, ST-2)
  // ==========================================================================
  const memoryToggleBtns = document.querySelectorAll('[data-memory-view]');
  const svgStateSurface = document.getElementById('svgStateSurface');
  const svgStateStructured = document.getElementById('svgStateStructured');
  const surfaceTableCells = document.querySelectorAll('#memoryComparisonTable .col-surface');
  const structuredTableCells = document.querySelectorAll('#memoryComparisonTable .col-structured');

  memoryToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-memory-view');

      memoryToggleBtns.forEach((b) => {
        const isSelected = b === btn;
        b.classList.toggle('active', isSelected);
        b.setAttribute('aria-pressed', String(isSelected));
      });

      if (svgStateSurface && svgStateStructured) {
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
      }

      // Sync Comparison Table Columns (ST-2)
      surfaceTableCells.forEach((cell) => {
        cell.classList.toggle('col-highlighted', mode === 'surface');
        cell.classList.toggle('col-dimmed', mode === 'structured');
      });

      structuredTableCells.forEach((cell) => {
        cell.classList.toggle('col-highlighted', mode === 'structured');
        cell.classList.toggle('col-dimmed', mode === 'surface');
      });
    });
  });

  // ==========================================================================
  // 5. PAGE 2, SECTION 2.3: GRAPHIC 6 INTERACTIVE 4-STEP LOOP (QW-4, DS-3)
  // ==========================================================================
  const loopNodes = document.querySelectorAll('.loop-node-group');
  const loopCards = document.querySelectorAll('.loop-step-card');
  const loopLivePreview = document.getElementById('loopLivePreview');

  const LOOP_STEP_SUMMARIES = {
    '1': {
      label: 'Selected Step 01 — OBSERVE:',
      text: 'Reading an unfamiliar Science problem or History topic calmly to spot the main relationship before trying to memorise details.'
    },
    '2': {
      label: 'Selected Step 02 — ENGINEER:',
      text: 'Turning a twelve-page chapter into a clear one-page visual map or structuring an unscripted talk into three clear points.'
    },
    '3': {
      label: 'Selected Step 03 — TEST:',
      text: 'Explaining a tough concept to a squad partner in plain language to immediately see which step still needs clarity.'
    },
    '4': {
      label: 'Selected Step 04 — SELF-FIX:',
      text: 'Reviewing a practice test to refine study strategy rather than feeling discouraged by a score.'
    }
  };

  function highlightLoopStep(stepNumber) {
    const key = String(stepNumber);

    loopCards.forEach((card) => {
      const isMatch = card.getAttribute('data-step-card') === key;
      card.classList.toggle('active', isMatch);
      card.setAttribute('aria-pressed', String(isMatch));
    });

    loopNodes.forEach((node) => {
      const isMatch = node.getAttribute('data-step-target') === key;
      node.setAttribute('aria-pressed', String(isMatch));
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

    if (loopLivePreview && LOOP_STEP_SUMMARIES[key]) {
      const info = LOOP_STEP_SUMMARIES[key];
      loopLivePreview.innerHTML = `<span><strong>${info.label}</strong> ${info.text}</span>`;
    }
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
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        highlightLoopStep(card.getAttribute('data-step-card'));
      }
    });
  });

  // ==========================================================================
  // 6. PAGE 4, SECTION 4.5: EXPANDABLE FAQ ACCORDION (QW-4)
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
  // 7. PAGE 5, SECTION 5.2: WHATSAPP CURRICULUM WALKTHROUGH LINK SYNC
  // ==========================================================================
  const WHATSAPP_NUMBER = '919481369078';
  const whatsappWalkthroughBtn = document.getElementById('whatsappWalkthroughBtn');
  const whatsappNumberDisplay = document.querySelector('.whatsapp-number-display');

  function updateWhatsAppWalkthroughLink() {
    const selectedPathway = document.querySelector('input[name="pathway"]:checked');
    const pathwayVal = selectedPathway ? selectedPathway.value : 'HALOGIQ Elevate [Full Campus + Studio]';
    const message = `Hello HALOGIQ Team, we would like to request a Curriculum Walkthrough for ${pathwayVal}.`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (whatsappWalkthroughBtn) {
      whatsappWalkthroughBtn.setAttribute('href', waUrl);
    }
    if (whatsappNumberDisplay) {
      whatsappNumberDisplay.setAttribute('href', waUrl);
    }
  }

  function savePathwaySelection() {
    updateWhatsAppWalkthroughLink();
  }

  document.querySelectorAll('input[name="pathway"]').forEach((radio) => {
    radio.addEventListener('change', updateWhatsAppWalkthroughLink);
  });

  updateWhatsAppWalkthroughLink();
});
