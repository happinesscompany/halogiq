/**
 * HALOGIQ — Superhuman Golden Hour Editorial Frontend Controller (Vanilla ES6)
 * Powers:
 * 1. Hash-synced 5-page view routing (#home, #methodology, #programmes, #schools, #partner)
 *    with sub-section deep-linking, focus management, live route announcements & active states
 * 2. Sticky translucent header hairline border fade-in on scroll
 * 3. Superhuman-style interactive navbar dropdown menus + mobile drawer
 * 4. Hero interactive "Explore HALOGIQ" launcher button & staggered dark frosted popover
 * 5. Dynamic 6-cell Trust Grid subtle cross-fade rotation (pauses on hover & reduced motion)
 * 6. Scroll-triggered editorial reveal animations (IntersectionObserver)
 * 7. WAI-ARIA 1.2 4-Stakeholder Suite Tab Strip with roving tabindex & keyboard navigation
 * 8. Page 2: Graphic 5 Memory Comparison SVG toggle synced with table columns
 * 9. Page 2: Graphic 6 4-Step Loop interactive sync + live viewport feedback bar
 * 10. Page 4: Smooth grid-row Leadership FAQ accordion
 * 11. Page 5: WhatsApp Curriculum Walkthrough dynamic link sync
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

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 1. STICKY HEADER SCROLL BORDER REVEAL
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');

  function updateHeaderScrollState() {
    if (!siteHeader) return;
    siteHeader.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  window.addEventListener('scroll', updateHeaderScrollState, { passive: true });
  updateHeaderScrollState();

  // ==========================================================================
  // 2. NAVBAR DROPDOWNS & HERO INTERACTIVE LAUNCHER POPOVER
  // ==========================================================================
  const navDropdownItems = document.querySelectorAll('.nav-item[data-dropdown]');
  const heroLauncherBtn = document.getElementById('heroLauncherBtn');
  const heroLauncherMenu = document.getElementById('heroLauncherMenu');

  function closeAllDropdowns(exceptEl = null) {
    navDropdownItems.forEach((item) => {
      if (item === exceptEl) return;
      item.classList.remove('open');
      const btn = item.querySelector('.nav-dropdown-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function closeHeroLauncher() {
    if (heroLauncherMenu && heroLauncherBtn) {
      heroLauncherMenu.classList.remove('open');
      heroLauncherBtn.setAttribute('aria-expanded', 'false');
    }
  }

  navDropdownItems.forEach((item) => {
    const trigger = item.querySelector('.nav-dropdown-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !item.classList.contains('open');
      closeAllDropdowns(item);
      closeHeroLauncher();
      item.classList.toggle('open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });

  if (heroLauncherBtn && heroLauncherMenu) {
    heroLauncherBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = !heroLauncherMenu.classList.contains('open');
      closeAllDropdowns();
      heroLauncherMenu.classList.toggle('open', willOpen);
      heroLauncherBtn.setAttribute('aria-expanded', String(willOpen));
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item[data-dropdown]')) {
      closeAllDropdowns();
    }
    if (!e.target.closest('.sh-hero-launcher')) {
      closeHeroLauncher();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      closeHeroLauncher();
    }
  });

  // ==========================================================================
  // 3. HASH-SYNCED 5-VIEW ROUTING, FOCUS MANAGEMENT & DEEP-LINKING
  // ==========================================================================
  const views = document.querySelectorAll('.page-view');
  const desktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
  const desktopNavGroups = document.querySelectorAll('.main-nav .nav-dropdown-trigger[data-nav-group]');
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

    desktopNavGroups.forEach((btn) => {
      const isMatch = btn.getAttribute('data-nav-group') === targetRoute;
      btn.classList.toggle('active', isMatch);
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
    closeAllDropdowns();
    closeHeroLauncher();

    if (focusHeading && routeAnnouncer && ROUTE_TITLES[targetRoute]) {
      routeAnnouncer.textContent = `Navigated to ${ROUTE_TITLES[targetRoute]}`;
    }

    // Ensure revealed sections inside newly active view render crisply
    if (activeViewEl) {
      triggerVisibleReveals(activeViewEl);
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
        updateWhatsAppWalkthroughLink();
      }

      if (scrollToId) {
        pendingScrollSectionId = scrollToId;
      }

      if (targetRoute && VALID_ROUTES.includes(targetRoute)) {
        const isButton = trigger.tagName.toLowerCase() === 'button';
        const currentParsed = parseHash(window.location.hash);

        if (isButton) {
          e.preventDefault();
          const newHash = scrollToId ? `#${targetRoute}:${scrollToId}` : `#${targetRoute}`;
          if (window.location.hash !== newHash) {
            window.location.hash = newHash;
          } else {
            activateRoute(targetRoute, {
              scrollToTop: !scrollToId,
              focusHeading: true,
              sectionId: scrollToId
            });
          }
        } else if (currentParsed.route === targetRoute) {
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

  // ==========================================================================
  // 4. MOBILE NAVIGATION DRAWER
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
  // 5. DYNAMIC 6-CELL TRUST GRID CROSS-FADE ROTATION (WITH 12 MONOCHROME EMBLEMS)
  // ==========================================================================
  const trustGrid = document.getElementById('trustLogoGrid');
  const trustSlots = document.querySelectorAll('[data-trust-slot]');

  const TRUST_SETS = [
    [
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 15l2 2 4-4"/></svg>',
        title: 'Zero Timetable Disruption',
        sub: 'Flexible campus touchpoints'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l3-7 4 14 3-7h6"/></svg>',
        title: '50% Less Re-Teaching',
        sub: 'Attentive classrooms'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="8" y1="21" x2="16" y2="21"/></svg>',
        title: 'In-Campus Studio',
        sub: 'Podcasts & keynote talks'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 3 3 19 21 19"/><circle cx="12" cy="14" r="2.2"/></svg>',
        title: 'THC-Institute R&D',
        sub: '6 specialist scientists'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 7l9 5 9-5-9-5z"/><path d="M3 17l9 5 9-5"/><path d="M3 12l9 5 9-5"/></svg>',
        title: 'NEP 2020 Execution',
        sub: 'Practical campus mandate'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
        title: 'Me vs. Past Me',
        sub: 'Zero rank shaming'
      }
    ],
    [
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><line x1="7" y1="7.5" x2="9.8" y2="9.8"/><line x1="17" y1="7.5" x2="14.2" y2="9.8"/><line x1="7" y1="16.5" x2="9.8" y2="14.2"/><line x1="17" y1="16.5" x2="14.2" y2="14.2"/></svg>',
        title: 'Cognitive Neuroscientist',
        sub: 'THC-Institute R&D · 01'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V9"/><path d="M12 15C7.5 15 6 11 6 8.5C9.5 8.5 12 10.8 12 15Z"/><path d="M12 12C16.5 12 18 8 18 5.5C14.5 5.5 12 7.8 12 12Z"/></svg>',
        title: 'Developmental Psych.',
        sub: 'THC-Institute R&D · 02'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/></svg>',
        title: 'Educational Psych.',
        sub: 'THC-Institute R&D · 03'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="13" width="4" height="7" rx="1"/><rect x="10" y="9" width="4" height="11" rx="1"/><rect x="17" y="4" width="4" height="16" rx="1"/></svg>',
        title: 'Psychometrician',
        sub: 'THC-Institute R&D · 04'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2"/><polyline points="3 7 12 12 21 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>',
        title: 'Game Architect',
        sub: 'THC-Institute R&D · 05'
      },
      {
        icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polygon points="15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5 15.5 8.5"/></svg>',
        title: 'Behavioral Scientist',
        sub: 'THC-Institute R&D · 06'
      }
    ]
  ];

  let activeTrustSetIdx = 0;
  let isTrustHovered = false;

  if (trustGrid && trustSlots.length === 6 && !prefersReducedMotion) {
    trustGrid.addEventListener('mouseenter', () => { isTrustHovered = true; });
    trustGrid.addEventListener('mouseleave', () => { isTrustHovered = false; });

    setInterval(() => {
      if (isTrustHovered || document.hidden) return;
      activeTrustSetIdx = (activeTrustSetIdx + 1) % TRUST_SETS.length;
      const nextSet = TRUST_SETS[activeTrustSetIdx];

      trustSlots.forEach((slotEl, idx) => {
        setTimeout(() => {
          slotEl.classList.add('is-swapping');
          setTimeout(() => {
            const emblemEl = slotEl.querySelector('.trust-cell-emblem');
            const titleEl = slotEl.querySelector('.trust-cell-title');
            const subEl = slotEl.querySelector('.trust-cell-sub');
            if (titleEl && subEl && nextSet[idx]) {
              if (emblemEl && nextSet[idx].icon) {
                emblemEl.innerHTML = nextSet[idx].icon;
              }
              titleEl.textContent = nextSet[idx].title;
              subEl.textContent = nextSet[idx].sub;
            }
            slotEl.classList.remove('is-swapping');
          }, 340);
        }, idx * 140);
      });
    }, 5200);
  }

  // ==========================================================================
  // 5b. POINTER-REACTIVE SPECULAR GLASS SHEEN ON FLOATING HERO CARDS
  // ==========================================================================
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (hasFinePointer && !prefersReducedMotion) {
    document.querySelectorAll('.sh-glass-card').forEach((card) => {
      let rafId = null;
      card.addEventListener('pointermove', (e) => {
        if (rafId) return;
        const clientX = e.clientX;
        const clientY = e.clientY;
        rafId = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', `${Math.round(clientX - rect.left)}px`);
          card.style.setProperty('--my', `${Math.round(clientY - rect.top)}px`);
          rafId = null;
        });
      });
    });
  }

  // ==========================================================================
  // 6. SCROLL-TRIGGERED EDITORIAL REVEAL ANIMATIONS
  // ==========================================================================
  const revealEls = document.querySelectorAll('.reveal-on-scroll');

  function triggerVisibleReveals(scopeEl = document) {
    scopeEl.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        el.classList.add('is-visible');
      }
    });
  }

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ==========================================================================
  // 7. SECTION 1.5: INTERACTIVE 4-STAKEHOLDER SUITE TAB SWITCHER
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
  // 8. PAGE 2, SECTION 2.2: GRAPHIC 5 MEMORY COMPARISON + TABLE SYNC
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
  // 9. PAGE 2, SECTION 2.3: GRAPHIC 6 INTERACTIVE 4-STEP LOOP
  // ==========================================================================
  const loopNodes = document.querySelectorAll('.loop-node-group');
  const loopCards = document.querySelectorAll('.loop-step-card');
  const loopLivePreview = document.getElementById('loopLivePreview');

  const LOOP_STEP_SUMMARIES = {
    '1': {
      label: 'Selected Step 01: OBSERVE ·',
      text: 'Reading an unfamiliar Science problem or History topic calmly to spot the main relationship before trying to memorise details.'
    },
    '2': {
      label: 'Selected Step 02: ENGINEER ·',
      text: 'Turning a twelve-page chapter into a clear one-page visual map or structuring an unscripted talk into three clear points.'
    },
    '3': {
      label: 'Selected Step 03: TEST ·',
      text: 'Explaining a tough concept to a squad partner in plain language to immediately see which step still needs clarity.'
    },
    '4': {
      label: 'Selected Step 04: SELF-FIX ·',
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
          rect.setAttribute('fill', '#f1ecff');
          rect.setAttribute('stroke', '#714cb6');
          rect.setAttribute('stroke-width', '2');
        } else {
          rect.setAttribute('fill', '#ffffff');
          rect.setAttribute('stroke', '#e3e3e2');
          rect.setAttribute('stroke-width', '1.6');
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
  // 10. PAGE 4, SECTION 4.5: EXPANDABLE LEADERSHIP FAQ ACCORDION
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
  // 11. PAGE 5, SECTION 5.2: WHATSAPP CURRICULUM WALKTHROUGH LINK SYNC
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

  document.querySelectorAll('input[name="pathway"]').forEach((radio) => {
    radio.addEventListener('change', updateWhatsAppWalkthroughLink);
  });

  updateWhatsAppWalkthroughLink();

  // ==========================================================================
  // 12. V4.2 MODULE 1: 30-SECOND CLASSROOM CHALLENGE SWITCHER (#home)
  // ==========================================================================
  const challengePills = document.querySelectorAll('[data-challenge]');
  const challengeTagEl = document.getElementById('challengeTag');
  const challengePromptEl = document.getElementById('challengePromptText');
  const challengeRoteMetaEl = document.getElementById('challengeRoteMeta');
  const challengeRoteTitleEl = document.getElementById('challengeRoteTitle');
  const challengeRoteBodyEl = document.getElementById('challengeRoteBody');
  const challengeRoteOutcomeEl = document.getElementById('challengeRoteOutcome');
  const challengeHalogiqMetaEl = document.getElementById('challengeHalogiqMeta');
  const challengeHalogiqTitleEl = document.getElementById('challengeHalogiqTitle');
  const challengeHalogiqStepsEl = document.getElementById('challengeHalogiqSteps');
  const challengeHalogiqOutcomeEl = document.getElementById('challengeHalogiqOutcome');

  const CHALLENGES = {
    exam: {
      tag: 'BOARD EXAM HALL',
      prompt: 'Question 1 on the Grade 10 Physics paper describes a real-world setup you have never seen in the textbook. The clock is running.',
      roteMeta: 'Cortisol Spike',
      roteTitle: 'Searches for a memorised paragraph, then blanks out',
      roteBody: 'Because the wording does not match the revision sheet, heart rate jumps and stress hormones block memory recall. The student assumes it is out of syllabus and loses ten minutes staring at the page.',
      roteOutcome: 'Panic spills into Questions 2 and 3.',
      halogiqMeta: '5-Sec Calm Reset',
      halogiqTitle: 'Resets focus, isolates the principle, rebuilds the answer',
      steps: [
        { k: '01 Observe:', v: 'Takes one 5-second breath and spots the two known physical variables.' },
        { k: '02 Engineer:', v: 'Connects the scenario to the core cause-and-effect rule on a quick scratch map.' },
        { k: '03 Test & Self-Fix:', v: 'Checks units and logic before writing a clean step-by-step solution.' }
      ],
      halogiqOutcome: 'Full conceptual clarity and steady nerves for the rest of the paper.'
    },
    stage: {
      tag: 'ASSEMBLY STAGE & STUDIO',
      prompt: 'A teacher hands you the mic in morning assembly: "Should AI grade student essays?" You have ten seconds and no written speech.',
      roteMeta: 'Script Freeze',
      roteTitle: 'Hunts for exact sentences and rushes off stage',
      roteBody: 'Without a memorised speech to recite, working memory jams. The student repeats the first line twice, avoids eye contact, and wraps up in ten uncomfortable seconds.',
      roteOutcome: 'Strong ideas stay unspoken and stage fear deepens.',
      halogiqMeta: '10-Sec Structure',
      halogiqTitle: 'Builds a 3-point mental frame and speaks calmly',
      steps: [
        { k: '01 Observe:', v: 'Pauses for two seconds, makes steady eye contact, and picks one clear stance.' },
        { k: '02 Engineer:', v: 'Organises 1 core claim, 2 concrete classroom examples, and 1 short closing line.' },
        { k: '03 Test & Self-Fix:', v: 'Reads the room\'s reactions, slows pacing, and lands the closing point cleanly.' }
      ],
      halogiqOutcome: 'Clear unscripted speaking that parents and teachers notice right away.'
    },
    ai: {
      tag: 'HOMEWORK & AI LITERACY',
      prompt: 'An AI tool writes a smooth, confident paragraph for a Grade 9 History assignment, with one subtle fabricated date tucked inside.',
      roteMeta: 'Blind Copy',
      roteTitle: 'Copies the polished text without checking a single claim',
      roteBody: 'Because the grammar sounds authoritative, the student treats the output as settled truth, submits it verbatim, and struggles when asked a follow-up question in viva.',
      roteOutcome: 'Zero real understanding and growing dependence on shortcuts.',
      halogiqMeta: 'First-Principles Audit',
      halogiqTitle: 'Questions the source, verifies facts, and owns the reasoning',
      steps: [
        { k: '01 Observe:', v: 'Treats AI output as an unverified draft and flags specific dates and claims.' },
        { k: '02 Engineer:', v: 'Cross-checks the claim against primary notes and maps the real historical sequence.' },
        { k: '03 Test & Self-Fix:', v: 'Rewrites the argument in plain words so they can defend every line aloud.' }
      ],
      halogiqOutcome: 'Uses AI as a research tool while staying sharper than the prompt.'
    }
  };

  function renderChallenge(key) {
    const data = CHALLENGES[key];
    if (!data) return;

    challengePills.forEach((btn) => {
      const active = btn.getAttribute('data-challenge') === key;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    if (challengeTagEl) challengeTagEl.textContent = data.tag;
    if (challengePromptEl) challengePromptEl.textContent = data.prompt;
    if (challengeRoteMetaEl) challengeRoteMetaEl.textContent = data.roteMeta;
    if (challengeRoteTitleEl) challengeRoteTitleEl.textContent = data.roteTitle;
    if (challengeRoteBodyEl) challengeRoteBodyEl.textContent = data.roteBody;
    if (challengeRoteOutcomeEl) challengeRoteOutcomeEl.innerHTML = `<strong>Result:</strong> ${data.roteOutcome}`;
    if (challengeHalogiqMetaEl) challengeHalogiqMetaEl.textContent = data.halogiqMeta;
    if (challengeHalogiqTitleEl) challengeHalogiqTitleEl.textContent = data.halogiqTitle;
    if (challengeHalogiqStepsEl) {
      challengeHalogiqStepsEl.innerHTML = data.steps
        .map((s) => `<div class="challenge-step-row"><strong>${s.k}</strong> ${s.v}</div>`)
        .join('');
    }
    if (challengeHalogiqOutcomeEl) challengeHalogiqOutcomeEl.innerHTML = `<strong>Result:</strong> ${data.halogiqOutcome}`;
  }

  challengePills.forEach((btn) => {
    btn.addEventListener('click', () => {
      renderChallenge(btn.getAttribute('data-challenge'));
    });
  });

  // ==========================================================================
  // 13. V4.2 MODULE 3: LIVE SAMPLE SESSION STAGE FILTER (#programmes)
  // ==========================================================================
  const sessionFilterBtns = document.querySelectorAll('[data-stage-filter]');
  const sessionCards = document.querySelectorAll('.session-sample-card');
  const sessionFilterCount = document.getElementById('sessionFilterCount');

  sessionFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-stage-filter');
      sessionFilterBtns.forEach((b) => {
        const isMatch = b === btn;
        b.classList.toggle('active', isMatch);
        b.setAttribute('aria-pressed', String(isMatch));
      });

      let visibleCount = 0;
      sessionCards.forEach((card) => {
        const stages = (card.getAttribute('data-stage') || '').split(' ');
        const show = stage === 'all' || stages.includes(stage);
        card.classList.toggle('is-hidden', !show);
        if (show) visibleCount += 1;
      });

      if (sessionFilterCount) {
        sessionFilterCount.textContent = `${visibleCount} sample session${visibleCount === 1 ? '' : 's'}`;
      }
    });
  });

  // ==========================================================================
  // 14. V4.2 MODULE 2: INTERACTIVE CAMPUS BLUEPRINT CONFIGURATOR (#schools)
  // ==========================================================================
  const scopeBtns = document.querySelectorAll('[data-config-scope]');
  const slotBtns = document.querySelectorAll('[data-config-slot]');
  const cfgTrackKicker = document.getElementById('cfgTrackKicker');
  const cfgTrackTitle = document.getElementById('cfgTrackTitle');
  const cfgTrackSummary = document.getElementById('cfgTrackSummary');
  const cfgSessionVal = document.getElementById('cfgSessionVal');
  const cfgSessionLbl = document.getElementById('cfgSessionLbl');
  const cfgDeliverables = document.getElementById('cfgDeliverables');
  const cfgWhatsappBtn = document.getElementById('cfgWhatsappBtn');
  const cfgPartnerLink = document.getElementById('cfgPartnerLink');

  let activeScope = 'elevate';
  let activeSlot = 'activity';

  const SCOPE_CONFIG = {
    elevate: {
      kicker: 'RECOMMENDED TRACK · FULL CAMPUS',
      title: 'HALOGIQ Elevate (Full Campus + Studio)',
      label: 'Full Campus (Grades 3-12)',
      partnerRadio: 'elevate',
      deliverables: [
        'All 8 Skill & Literacy Streams',
        'In-Campus Executive Studio',
        'HALOGIQ Exams (Grades 10-12)',
        'Monthly Teacher Certification',
        'Open House Parent Showcases',
        'District Exclusivity Eligible'
      ]
    },
    exams: {
      kicker: 'RECOMMENDED TRACK · BOARD COHORT',
      title: 'HALOGIQ Exams (Grades 10, 11 & 12)',
      label: 'Senior Board Wing (Grades 10-12)',
      partnerRadio: 'exams',
      deliverables: [
        '4-Step Learning & Recall Loop',
        'One-Page Chapter Mapping Labs',
        'Twisted Question Breakdowns',
        '5-Second Exam Stress Reset',
        'Pre-Board Time Allocation Sprints',
        'Faculty Orientation Included'
      ]
    },
    college: {
      kicker: 'RECOMMENDED TRACK · LAUNCHPAD',
      title: 'HALOGIQ Launchpad (College & Senior Wing)',
      label: 'College Launchpad Wing',
      partnerRadio: 'elevate',
      deliverables: [
        'Executive Studio Keynote Lab',
        'Mock Interview & GD Panels',
        'Stream 07: AI Literacy Lab',
        'Stream 08: Financial Wisdom Lab',
        'Case-Study Deconstruction',
        'Career & Placement Poise'
      ]
    }
  };

  const SLOT_CONFIG = {
    activity: {
      label: 'Activity / Life-Skill Slot',
      val: '45 mins',
      lbl: 'Weekly On-Campus',
      summary: (scopeLabel) => `Fits neatly into existing activity or life-skill periods for your ${scopeLabel} while keeping every core subject hour intact.`
    },
    zero: {
      label: 'Zero-Period Sessions',
      val: '20-30 mins',
      lbl: 'Zero-Period Flow',
      summary: (scopeLabel) => `Runs as crisp morning zero-period sessions for your ${scopeLabel}, energizing focus before Period 1 without touching syllabus slots.`
    },
    studio: {
      label: 'After-Class Studio Lab',
      val: '45-60 mins',
      lbl: 'Beyond-Class Lab',
      summary: (scopeLabel) => `Operates in dedicated after-class studio and squad lab blocks for your ${scopeLabel} with zero daytime timetable changes.`
    }
  };

  function updateCampusConfigurator() {
    const scopeData = SCOPE_CONFIG[activeScope];
    const slotData = SLOT_CONFIG[activeSlot];
    if (!scopeData || !slotData) return;

    scopeBtns.forEach((b) => {
      const match = b.getAttribute('data-config-scope') === activeScope;
      b.classList.toggle('active', match);
      b.setAttribute('aria-checked', String(match));
    });

    slotBtns.forEach((b) => {
      const match = b.getAttribute('data-config-slot') === activeSlot;
      b.classList.toggle('active', match);
      b.setAttribute('aria-checked', String(match));
    });

    if (cfgTrackKicker) cfgTrackKicker.textContent = scopeData.kicker;
    if (cfgTrackTitle) cfgTrackTitle.textContent = scopeData.title;
    if (cfgTrackSummary) cfgTrackSummary.textContent = slotData.summary(scopeData.label);
    if (cfgSessionVal) cfgSessionVal.textContent = slotData.val;
    if (cfgSessionLbl) cfgSessionLbl.textContent = slotData.lbl;

    if (cfgDeliverables) {
      cfgDeliverables.innerHTML = scopeData.deliverables
        .map((item) => `<span class="config-deliv-pill">&#10003; ${item}</span>`)
        .join('');
    }

    if (cfgWhatsappBtn) {
      const msg = `Hello HALOGIQ Team, we would like a custom Campus Blueprint for ${scopeData.label} using ${slotData.label}.`;
      cfgWhatsappBtn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
    }

    if (cfgPartnerLink) {
      cfgPartnerLink.setAttribute('data-pathway-select', scopeData.partnerRadio);
    }
  }

  scopeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeScope = btn.getAttribute('data-config-scope');
      updateCampusConfigurator();
    });
  });

  slotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSlot = btn.getAttribute('data-config-slot');
      updateCampusConfigurator();
    });
  });

  updateCampusConfigurator();

  // ==========================================================================
  // 15. PAGE 4, SECTION 4.2: INTERACTIVE 3-TIER ARCHITECTURE & 12-PILLAR INSPECTOR
  // ==========================================================================
  const tierWidget = document.getElementById('tierArchitectureWidget');
  const tierCards = document.querySelectorAll('.arch-tier-card[data-arch-tier]');
  const tierTriggers = document.querySelectorAll('[data-select-tier]');
  const subChips = document.querySelectorAll('[data-select-sub]');
  const tierTableRows = document.querySelectorAll('#tierSummaryTable tr[data-tier-row]');
  const archInspectorPanel = document.getElementById('archInspectorPanel');
  const archInspectorKicker = document.getElementById('archInspectorKicker');
  const archInspectorTag = document.getElementById('archInspectorTag');
  const archBackToTier = document.getElementById('archBackToTier');
  const archBackToTierLabel = document.getElementById('archBackToTierLabel');
  const archInspectorTitle = document.getElementById('archInspectorTitle');
  const archInspectorSummary = document.getElementById('archInspectorSummary');
  const archInspectorListLabel = document.getElementById('archInspectorListLabel');
  const archInspectorList = document.getElementById('archInspectorList');
  const archInspectorMetrics = document.getElementById('archInspectorMetrics');

  let activeArchTier = '1';

  const ARCH_TIER_DATA = {
    '1': {
      kicker: 'TIER 01 · SCIENTIFIC R&D CORE',
      tag: 'Year-Round R&D',
      title: 'Six learning scientists behind every campus session.',
      summary: 'Six full-time researchers at the THC-Institute build and stress-test every classroom module and exam-calm routine before it reaches your students.',
      listLabel: 'HOW THIS SUPPORTS YOUR CAMPUS',
      items: [
        { k: 'Age-Calibrated Modules:', v: 'Curriculum tailored for developmental readiness across ages 8 to 21.' },
        { k: 'Exam-Calm Protocols:', v: 'Applied neuroscience strategies built to stop blank-outs under pressure.' },
        { k: 'Me vs. Past Me Rubrics:', v: 'Self-referenced skill tracking with zero public rank shaming.' }
      ],
      metrics: [
        { val: '6 Specialists', lbl: 'Full-Time R&D Wing' },
        { val: '8 Streams', lbl: 'Age-Calibrated Design' }
      ]
    },
    '2': {
      kicker: 'TIER 02 · FACULTY EMPOWERMENT',
      tag: 'Monthly Cadence',
      title: 'Equipping your teachers with zero added workload.',
      summary: 'Monthly interactive workshops give your faculty practical tools for higher classroom absorption and active participation, backed by recognized professional credentials.',
      listLabel: 'HOW THIS SUPPORTS YOUR FACULTY',
      items: [
        { k: 'Cognitive Absorption Workshops:', v: 'Monthly hands-on sessions that help teachers cut repeated re-teaching.' },
        { k: 'Recognized Credentials:', v: 'Formal educator certifications that strengthen your school’s academic profile.' },
        { k: 'Zero Extra Paperwork:', v: 'HALOGIQ facilitators run sessions and portfolios so faculty focus on core subjects.' }
      ],
      metrics: [
        { val: 'Monthly', lbl: 'Educator Workshops' },
        { val: '0 Hrs', lbl: 'Added Teacher Grading' }
      ]
    },
    '3': {
      kicker: 'TIER 03 · CAMPUS DELIVERY',
      tag: 'Weekly + Monthly',
      title: 'Weekly on-site sessions backed by a live campus studio.',
      summary: 'Students build lasting study and speaking habits through weekly 45-minute on-campus labs, monthly In-Campus Executive Studio recordings, and senior exam readiness sprints.',
      listLabel: 'WHAT HAPPENS ON CAMPUS',
      items: [
        { k: 'Weekly 45-Min Labs:', v: 'Active Understand, Explore, Practise, and Reflect sessions mapped into existing slots.' },
        { k: 'In-Campus Executive Studio:', v: 'Monthly camera-ready talks and mock interviews parents watch proudly.' },
        { k: 'HALOGIQ Exams (Grades 10–12):', v: 'One-page chapter maps, twisted-question breakdowns, and 5-second stress resets.' }
      ],
      metrics: [
        { val: '45 Mins', lbl: 'Weekly On-Campus Flow' },
        { val: '100%', lbl: 'Core Syllabus Protected' }
      ]
    }
  };

  const ARCH_SUB_DATA = {
    // Tier 3 Modules
    'weekly-labs': {
      parentTier: '3',
      kicker: 'TIER 03 MODULE 01 / 03 · CAMPUS DELIVERY',
      tag: '45-Min Weekly Rhythm',
      title: 'Weekly 45-Min Labs',
      summary: 'Students practise active thinking inside existing activity periods or zero-period slots while core syllabus hours stay completely untouched.',
      listLabel: 'INSIDE EVERY WEEKLY SESSION',
      items: [
        { k: 'Understand & Explore (20 mins):', v: 'Breaks one real concept into clear cause-and-effect links before any note-taking starts.' },
        { k: 'Practise in Squads (15 mins):', v: 'Balanced 4-member teams solve an unseen classroom problem together.' },
        { k: 'Reflect & Self-Fix (10 mins):', v: 'Each student writes one takeaway they can apply right away in regular subjects.' }
      ],
      metrics: [
        { val: '45 Mins', lbl: 'Weekly On-Campus' },
        { val: '0 Mins', lbl: 'Core Syllabus Cut' }
      ]
    },
    'executive-studio': {
      parentTier: '3',
      kicker: 'TIER 03 MODULE 02 / 03 · CAMPUS DELIVERY',
      tag: 'Monthly Productions',
      title: 'In-Campus Executive Studio',
      summary: 'We set up a professional studio right on your school grounds so students record structured talks and mock interviews every month.',
      listLabel: 'STUDIO OUTCOMES FOR FAMILIES',
      items: [
        { k: 'Camera-Ready Speaking Poise:', v: 'Replaces memorised stage speeches with calm, unscripted three-point speaking.' },
        { k: 'Monthly Student Reels:', v: 'Gives families tangible audio and video recordings they share proudly.' },
        { k: 'Open House Showcases:', v: 'Live parent demonstrations where students think and speak clearly on stage.' }
      ],
      metrics: [
        { val: 'Monthly', lbl: 'Studio Recordings' },
        { val: '100%', lbl: 'On-Campus Setup' }
      ]
    },
    'halogiq-exams': {
      parentTier: '3',
      kicker: 'TIER 03 MODULE 03 / 03 · CAMPUS DELIVERY',
      tag: 'Grades 10 to 12',
      title: 'HALOGIQ Exams',
      summary: 'Dedicated board-exam readiness for senior wings focused on chapter mapping, unfamiliar question breakdowns, and calm recall under timed conditions.',
      listLabel: 'SENIOR BOARD-EXAM TOOLKIT',
      items: [
        { k: 'One-Page Chapter Maps:', v: 'Turns twelve-page chapters into fast visual retrieval sheets for pre-board revision.' },
        { k: 'Twisted-Question Sprints:', v: 'Trains students to read unfamiliar word problems calmly instead of freezing.' },
        { k: '5-Second Stress Reset:', v: 'Simple breathing and focus drills that keep recall steady from Question 1 onward.' }
      ],
      metrics: [
        { val: 'Grades 10–12', lbl: 'Senior Board Wing' },
        { val: '5 Seconds', lbl: 'Exam Stress Reset' }
      ]
    },

    // Tier 2 Modules
    'monthly-workshops': {
      parentTier: '2',
      kicker: 'TIER 02 MODULE 01 / 03 · FACULTY EMPOWERMENT',
      tag: 'Monthly Faculty Sessions',
      title: 'Monthly Educator Workshops',
      summary: 'Short, practical workshops help your teachers spot attention drops early and run active recall checks during regular subject classes.',
      listLabel: 'PRACTICAL CLASSROOM GAINS',
      items: [
        { k: '50% Less Re-Teaching:', v: 'Active comprehension checks ensure students grasp concepts the first time around.' },
        { k: 'Shared Campus Vocabulary:', v: 'Teachers reinforce the same 4-step learning loop students practise in HALOGIQ labs.' },
        { k: 'Classroom-Ready Next Morning:', v: 'Built for busy Indian school timetables with tools usable straight away.' }
      ],
      metrics: [
        { val: 'Monthly', lbl: 'Interactive Sessions' },
        { val: '50% Less', lbl: 'Classroom Re-Teaching' }
      ]
    },
    'educator-credentials': {
      parentTier: '2',
      kicker: 'TIER 02 MODULE 02 / 03 · FACULTY EMPOWERMENT',
      tag: 'Formal Certification',
      title: 'Recognized Educator Credentials',
      summary: 'Participating teachers earn structured professional credentials backed by the THC-Institute, strengthening faculty retention and institutional standing.',
      listLabel: 'INSTITUTIONAL VALUE FOR SCHOOLS',
      items: [
        { k: 'THC-Institute Certification:', v: 'Formal recognition for completing monthly cognitive pedagogy training modules.' },
        { k: 'Visible NEP 2020 Readiness:', v: 'Demonstrates active teacher upskilling during school inspections and parent orientations.' },
        { k: 'Career-Building Craft:', v: 'Teachers gain lasting instructional tools they value well beyond one academic year.' }
      ],
      metrics: [
        { val: 'Certified', lbl: 'Faculty Credentials' },
        { val: 'NEP 2020', lbl: 'Aligned Practice' }
      ]
    },
    'zero-grading': {
      parentTier: '2',
      kicker: 'TIER 02 MODULE 03 / 03 · FACULTY EMPOWERMENT',
      tag: 'Zero Added Workload',
      title: 'Zero Extra Teacher Workload',
      summary: 'Your school faculty never have to write extra lesson plans or grade extra worksheets. Our on-site team runs HALOGIQ delivery end to end.',
      listLabel: 'HOW WE PROTECT TEACHER TIME',
      items: [
        { k: 'Dedicated HALOGIQ Facilitators:', v: 'Trained specialists lead every weekly student lab and monthly studio shoot.' },
        { k: 'Managed Growth Portfolios:', v: 'Our team compiles termly Me vs. Past Me student portfolios for parents.' },
        { k: 'Protected Teacher Bandwidth:', v: 'Your faculty keep 100% of their focus on core academic subjects and mentoring.' }
      ],
      metrics: [
        { val: '0 Hrs', lbl: 'Extra Teacher Prep' },
        { val: '100%', lbl: 'Managed On-Site' }
      ]
    },

    // Tier 1 Specialists (6 THC-Institute Scientists)
    neuroscientist: {
      parentTier: '1',
      kicker: 'R&D SPECIALIST 01 / 06 · TIER 01',
      tag: 'Memory & Exam Calm',
      title: 'Cognitive Neuroscientist',
      summary: 'Designs structured recall routines and the 5-second stress reset so students retrieve concepts cleanly during timed exams.',
      listLabel: 'DIRECT CAMPUS CONTRIBUTION',
      items: [
        { k: 'Structured Concept Linking:', v: 'Replaces fragile word-for-word cramming with connected mental maps.' },
        { k: '5-Second Exam Stress Reset:', v: 'Simple breathing and focus resets that stop cortisol-driven blank-outs.' },
        { k: 'Attention-Paced Lessons:', v: 'Structures every 45-minute period to hold focus from minute one to reflection.' }
      ],
      metrics: [
        { val: '5 Seconds', lbl: 'Exam Stress Reset' },
        { val: '4 Steps', lbl: 'Core Learning Loop' }
      ]
    },
    developmental: {
      parentTier: '1',
      kicker: 'R&D SPECIALIST 02 / 06 · TIER 01',
      tag: 'Ages 8 to 21',
      title: 'Developmental Psychologist',
      summary: 'Tunes every activity, squad prompt, and stage milestone to match how reasoning and self-assurance mature from Grade 3 to College.',
      listLabel: 'DIRECT CAMPUS CONTRIBUTION',
      items: [
        { k: 'Three Distinct Age Tracks:', v: 'Separates Foundation, Builder, and Launchpad difficulty cleanly by stage.' },
        { k: 'Safe Speaking Climates:', v: 'Helps quieter students build vocal confidence without stage anxiety.' },
        { k: 'Healthy Growth Mindset:', v: 'Normalises self-fixing mistakes instead of fearing red marks.' }
      ],
      metrics: [
        { val: '3 Stages', lbl: 'Age-Matched Tracks' },
        { val: 'Ages 8–21', lbl: 'Continuous Pathway' }
      ]
    },
    educational: {
      parentTier: '1',
      kicker: 'R&D SPECIALIST 03 / 06 · TIER 01',
      tag: 'Classroom Absorption',
      title: 'Educational Psychologist',
      summary: 'Builds our four-part session architecture and designs monthly teacher workshops so study habits carry straight into Maths and Science.',
      listLabel: 'DIRECT CAMPUS CONTRIBUTION',
      items: [
        { k: 'Four-Part Session Rhythm:', v: 'Balances Understand, Explore, Practise, and Reflect inside every period.' },
        { k: 'Faster Class Absorption:', v: 'Equips teachers with active checks that cut daily chapter re-teaching.' },
        { k: 'Syllabus Transfer:', v: 'Ensures learning routines improve regular textbook and board performance.' }
      ],
      metrics: [
        { val: '50% Less', lbl: 'Classroom Re-Teaching' },
        { val: 'Monthly', lbl: 'Teacher Alignment' }
      ]
    },
    psychometrician: {
      parentTier: '1',
      kicker: 'R&D SPECIALIST 04 / 06 · TIER 01',
      tag: 'Growth Measurement',
      title: 'Psychometrician',
      summary: 'Crafts fair, self-referenced growth rubrics and term portfolios so parents and principals see clear progress across all 8 streams.',
      listLabel: 'DIRECT CAMPUS CONTRIBUTION',
      items: [
        { k: 'Me vs. Past Me Portfolios:', v: 'Measures each learner against their own baseline rather than class rank.' },
        { k: 'Term Progress Evidence:', v: 'Gives families concrete proof of growth across speaking and recall.' },
        { k: 'NEP 2020 Alignment:', v: 'Translates competency-based learning policy into observable school records.' }
      ],
      metrics: [
        { val: 'Zero', lbl: 'Public Rank Shaming' },
        { val: '8 Streams', lbl: 'Tracked Per Term' }
      ]
    },
    'game-architect': {
      parentTier: '1',
      kicker: 'R&D SPECIALIST 05 / 06 · TIER 01',
      tag: 'Squad Simulations',
      title: 'Experiential Game Architect',
      summary: 'Turns abstract thinking frameworks into lively 4-person squad simulations and studio challenges students genuinely enjoy.',
      listLabel: 'DIRECT CAMPUS CONTRIBUTION',
      items: [
        { k: '4-Person Squad Mechanics:', v: 'Balanced team challenges where every member owns an active role.' },
        { k: 'Applied Problem Sprints:', v: 'Hands-on unseen scenarios that lock study concepts into long-term recall.' },
        { k: 'Engaging Studio Formats:', v: 'Structured on-camera talks and mock interviews that reward clear thinking.' }
      ],
      metrics: [
        { val: '4-Person', lbl: 'Balanced Squads' },
        { val: '15 Mins', lbl: 'Live Practise Block' }
      ]
    },
    behavioral: {
      parentTier: '1',
      kicker: 'R&D SPECIALIST 06 / 06 · TIER 01',
      tag: 'Lasting Habits',
      title: 'Behavioral Scientist',
      summary: 'Turns classroom insights into repeatable weekly habits so steady study routines and clear speaking last well beyond exam week.',
      listLabel: 'DIRECT CAMPUS CONTRIBUTION',
      items: [
        { k: 'Repeatable Weekly Loops:', v: 'Builds steady study habits that outlast one-day motivational talks.' },
        { k: 'Post-Test Self-Fixing:', v: 'Guides students to diagnose errors calmly after unit tests and pre-boards.' },
        { k: 'Home-to-School Continuity:', v: 'Simple revision prompts families recognize during daily homework hours.' }
      ],
      metrics: [
        { val: 'Year-Round', lbl: 'Habit Reinforcement' },
        { val: 'Termly', lbl: 'Parent Showcases' }
      ]
    }
  };

  function syncTierShellState(tierKey) {
    activeArchTier = String(tierKey);

    if (tierWidget) {
      tierWidget.setAttribute('data-active-tier', activeArchTier);
    }

    tierCards.forEach((card) => {
      card.classList.toggle('is-active', card.getAttribute('data-arch-tier') === activeArchTier);
    });

    tierTriggers.forEach((btn) => {
      const match = btn.getAttribute('data-select-tier') === activeArchTier;
      btn.setAttribute('aria-pressed', String(match));
      if (btn.classList.contains('arch-step-pill')) {
        btn.classList.toggle('active', match);
      }
    });

    tierTableRows.forEach((row) => {
      row.classList.toggle('is-highlighted', row.getAttribute('data-tier-row') === activeArchTier);
    });
  }

  function renderArchInspector(payload, backTierKey = null) {
    if (!payload) return;
    if (archInspectorKicker) archInspectorKicker.textContent = payload.kicker;
    if (archInspectorTag) archInspectorTag.textContent = payload.tag;

    if (archBackToTier) {
      archBackToTier.hidden = !backTierKey;
      if (backTierKey && archBackToTierLabel) {
        archBackToTierLabel.textContent = `Back to Tier 0${backTierKey} Overview`;
      }
    }

    if (archInspectorTitle) archInspectorTitle.textContent = payload.title;
    if (archInspectorSummary) archInspectorSummary.textContent = payload.summary;
    if (archInspectorListLabel) archInspectorListLabel.textContent = payload.listLabel;

    if (archInspectorList) {
      archInspectorList.innerHTML = payload.items
        .map((item) => `<li><span class="arch-perk-bar" aria-hidden="true"></span><div><strong>${item.k}</strong> ${item.v}</div></li>`)
        .join('');
    }

    if (archInspectorMetrics) {
      archInspectorMetrics.innerHTML = payload.metrics
        .map((m) => `<div class="arch-metric-tile"><span class="arch-metric-val">${m.val}</span><span class="arch-metric-lbl">${m.lbl}</span></div>`)
        .join('');
    }
  }

  function selectArchTier(tierKey) {
    const key = String(tierKey);
    const data = ARCH_TIER_DATA[key];
    if (!data) return;

    syncTierShellState(key);

    subChips.forEach((chip) => {
      chip.classList.remove('is-selected');
      chip.setAttribute('aria-pressed', 'false');
    });

    renderArchInspector(data, null);
  }

  function selectArchSubModule(subKey) {
    const data = ARCH_SUB_DATA[subKey];
    if (!data) return;

    syncTierShellState(data.parentTier);

    subChips.forEach((chip) => {
      const match = chip.getAttribute('data-select-sub') === subKey;
      chip.classList.toggle('is-selected', match);
      chip.setAttribute('aria-pressed', String(match));
    });

    renderArchInspector(data, data.parentTier);
  }

  function revealArchInspectorOnMobile() {
    if (!archInspectorPanel || window.innerWidth > 1024) return;
    const rect = archInspectorPanel.getBoundingClientRect();
    const isVisible = rect.top >= 60 && rect.top <= window.innerHeight - 180;
    if (!isVisible) {
      archInspectorPanel.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest'
      });
    }
  }

  tierTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectArchTier(btn.getAttribute('data-select-tier'));
      if (!btn.classList.contains('arch-step-pill')) {
        revealArchInspectorOnMobile();
      }
    });
  });

  subChips.forEach((chip) => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      selectArchSubModule(chip.getAttribute('data-select-sub'));
      revealArchInspectorOnMobile();
    });
  });

  if (archBackToTier) {
    archBackToTier.addEventListener('click', () => {
      selectArchTier(activeArchTier);
    });
  }

  tierTableRows.forEach((row) => {
    row.addEventListener('click', () => {
      selectArchTier(row.getAttribute('data-tier-row'));
    });
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectArchTier(row.getAttribute('data-tier-row'));
      }
    });
  });

  // Initialize initial view from URL hash
  const initialParsed = parseHash(window.location.hash);
  activateRoute(initialParsed.route, {
    scrollToTop: false,
    focusHeading: false,
    sectionId: initialParsed.sectionId
  });
});
