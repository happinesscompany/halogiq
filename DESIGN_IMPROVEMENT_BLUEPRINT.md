# HALOGIQ — Locked Design, UI/UX & Accessibility Improvement Blueprint

**Status:** LOCKED FOR EXECUTION  
**Baseline Commit:** `2041993` (`chore: initial baseline v2.0 HALOGIQ static website build`)  
**Baseline Score:** `73.4 / 100` -> **Target Post-Upgrade Score:** `98.5+ / 100` (WCAG 2.2 AA Compliant, Mobile-First SVG Legibility, Zero Inline Styles, Full WAI-ARIA 1.2 Interactivity)

---

## 1. Content & IA Preservation Contract (Strict Lock)
- **Zero Copy Changes:** 100% of the approved PART 3 website content copy (`halogiq_website_content_copy.md`) remains word-for-word intact across all 5 views (`#home`, `#methodology`, `#programmes`, `#schools`, `#partner`).
- **Zero IA Changes:** No sections or pages added or removed; all improvements are strictly graphics, UI/UX, responsive layout, interaction, accessibility, and design-system upgrades.

---

## 2. Locked Execution Items (Phases 1–3)

### Phase 1: Quick Wins — Accessibility, Contrast & Form Validation
- **QW-1 (WCAG 2.2 AA Text Contrast Tokens):**
  - Add `--hq-text-ochre-ink: #B45309` (5.02:1 on `#FFFFFF`, 4.68:1 on `#FFFBEB`) and `--hq-text-teal-ink: #0F766E` (5.47:1 on `#FFFFFF`, 5.12:1 on `#F0FDF4`) for all small text, eyebrows, pills, badges, and SVG text labels while keeping `--hq-accent-ochre: #D97706` and `--hq-accent-teal: #0D9488` for graphical strokes, icons, and fills.
  - Darken muted SVG node text from `#94A3B8` to `#64748B` (≥ 4.5:1 contrast).
- **QW-2 (SPA Focus Management, Skip Link & Live Route Announcer):**
  - Add a keyboard-accessible `.skip-link` (`Skip to main content`) as the first focusable element inside `<body>`.
  - Add an `aria-live="polite"` visually-hidden status region (`#routeAnnouncer`) that announces the active page title upon view change.
  - On user-initiated route transitions, programmatically move focus to the newly activated view's `<h1 tabindex="-1">` so focus is never lost when the previous `.page-view` becomes `display: none`.
- **QW-3 (Field-Level Form Validation & Error Recovery on Page 5):**
  - Add `.form-control.is-invalid` visual error state (`border-color: #E11D48; background-color: #FFF1F2;`).
  - Add inline `.field-error-msg` elements linked via `aria-describedby` for each required field (`#fullName`, `#userRole`, `#institutionCity`, `#contactInfo`), dynamically toggle `aria-invalid="true" / "false"`, add `role="alert"` to `#formErrorMsg`, and automatically focus the first invalid input on submit.
  - Clear field error state dynamically on `input` / `change`.
- **QW-4 (Complete WAI-ARIA 1.2 Widget Semantics):**
  - **Section 1.5 Tabs:** Implement roving `tabindex` (`tabindex="0"` on active `.tab-btn`, `tabindex="-1"` on inactive `.tab-btn`) and `tabindex="0"` on `.tab-panel`.
  - **Section 2.2 Graphic 5 Toggles:** Add `aria-pressed="true/false"` to `.diagram-toggle-btn`.
  - **Section 2.3 Graphic 6 Loop:** Add `aria-pressed="true/false"` and visible `:focus-visible` styling to `.loop-node-group` and make `.loop-step-card` keyboard-focusable (`tabindex="0"`, `role="button"`, `aria-pressed`) with Enter/Space activation.
  - **Section 4.5 FAQ Accordion:** Link each `.faq-question` button to its `.faq-answer` panel via `aria-controls` and `aria-labelledby` with `role="region"`.
- **QW-5 (Eliminate Render-Blocking Font `@import`):**
  - Remove `@import url(...)` from `styles.css` and add `<link rel="preconnect" href="https://fonts.googleapis.com">`, `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`, and non-blocking `<link rel="stylesheet" ...>` in `<head>` of `index.html`.

### Phase 2: Structural UI/UX & Responsive Fixes
- **ST-1 (Responsive Mobile Legibility for Wide SVGs — Graphics 2, 4, 5, 6, 8, 9):**
  - Wrap wide architectural SVGs (Graphics 4, 5, 6, 9) in responsive scrollable diagram viewports (`.svg-scroll-viewport`) on narrow screens (`< 768px`) with a minimum intrinsic diagram width (`min-width: 640px`) and a subtle mobile "Swipe diagram horizontally" pill cue so SVG typography never shrinks below `12px` visual size on `320px–480px` phones.
  - Refine internal coordinate spacing in Graphic 2 and Graphic 9 so no text overlaps or crowds adjacent strokes.
- **ST-2 (Mobile Table Scroll Affordance & Graphic 5 Table Column Sync):**
  - Add a mobile horizontal scroll cue pill above `.table-responsive` on `< 768px` and subtle scroll container styling.
  - Sync Graphic 5's toggle buttons (`[Compare Both]`, `[View Surface Memorisation]`, `[View HALOGIQ Structured Learning]`) with the 4-row comparison table below so selecting a mode visually highlights the corresponding column (`col-surface` vs. `col-structured`) and dims the unselected column.
- **ST-3 (Sub-Section Deep-Linking & Active Header CTA State on `#partner`):**
  - Upgrade router in `script.js` to support `data-scroll-target` attributes and compound hashes (e.g., `#programmes:studio`, `#programmes:literacy`, `#schools:pathways`, `#schools:faq`) so clicking specific solutions or streams in the global footer navigates to the parent page and smoothly scrolls to the target section.
  - Add `.active-cta` visual styling on `.header-cta .btn` when `#partner` is the active route.
- **ST-4 (Touch Target Expansion ≥ 44px & Form Draft Persistence):**
  - Expand `.diagram-toggle-btn`, `.radio-option`, and mobile `.footer-links a` hit targets to ≥ `44px` height.
  - Persist `#walkthroughForm` input values (`fullName`, `userRole`, `institutionCity`, `contactInfo`, `pathway`, `assistanceNotes`) in `sessionStorage` so returning visitors never lose draft entries.

### Phase 3: Design-System Hygiene & Visual Polish
- **DS-1 (Zero Static Inline Styles in `index.html`):**
  - Replace all 21 static `style="..."` attributes in `index.html` with clean, reusable classes in `styles.css`.
- **DS-2 (Screen-Reader SVG Text Hygiene):**
  - Add `aria-hidden="true"` to internal decorative `<svg>` coordinate text groups where the `<svg>` element already provides a complete, human-readable `aria-label`, preventing fragmented readout by screen readers.
- **DS-3 (Interactive Viewport Feedback Bar for Graphic 6 Loop):**
  - Add a live active-step summary callout bar directly inside `.loop-svg-container` that updates immediately when clicking/activating any of the 4 SVG nodes (`01 OBSERVE`, `02 ENGINEER`, `03 TEST`, `04 SELF-FIX`), providing instant above-the-fold feedback even when the 2x2 step cards are below the fold on mobile/laptop screens.
