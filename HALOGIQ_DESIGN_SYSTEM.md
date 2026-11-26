# HALOGIQ Education — Brand & UI Design System
> golden hour applied-neuroscience editorial architecture

**Theme:** Light-first editorial canvas with deliberate deep-wine, lagoon, and indigo brand punctuation  
**Live Reference:** `https://www.halogiq.com`  
**Brand Lineage:** Originally inspired by the **Superhuman** (*Golden Hour Editorial Dashboard*) design language, evolved specifically for **HALOGIQ Education** and the **THC-Institute Human Development & Learning Sciences R&D Wing** serving Indian K–12 schools, colleges, principals, educators, parents, and students (Ages 8–19).

---

## 1. Design Philosophy & Lineage

HALOGIQ sits at the intersection of **warm academic editorial craft**, **applied neuroscience precision**, and **modern interactive software UI**.

Like our original **Superhuman** inspiration, HALOGIQ replaces stark `#ffffff` screens with a **Warm Parchment (`#f2f0eb`)** canvas that feels calm like fine paper, anchors brand authority in **Midnight Wine (`#421d24`)**, punctuates interactive clarity with **Royal Violet (`#714cb6`)** and **Lilac Mist (`#d4c7ff`)**, and lets headlines speak in a quiet, confident **weight 460** display cut rather than shouting in heavy bold. Depth comes from **layered golden-hour photography, frosted glass surfaces, and crisp hairline borders (`#e3e3e2`)** — never heavy drop-shadow stacks.

### How HALOGIQ Evolved Beyond Superhuman
While rooted in Superhuman's calm editorial restraint, HALOGIQ introduces five domain-specific extensions tailored to education, neuroscience, and institutional trust:
1. **Scientific Monospace Precision (`JetBrains Mono`)**: Paired with Inter Variable to anchor cognitive metrics, 4-step loop indicators (`01–04`), live quarterly countdown clocks, and Founding Partner governance badges.
2. **Extended Atmospheric Surface Hierarchy**: Expands the core 9-color palette with soft lavender washes (`#f1ecff`, `#e6deff`), warm stone (`#e8e5df`), and deep studio indigo (`#271147`) to support multi-track curriculum showcases (`Elevate`, `Executive Studio`, `Exams`) without introducing off-brand colors.
3. **Interactive Pedagogical Diagrams + Mobile-Native Fallbacks**: Replaces static stock graphics with live interactive SVG learning systems (Memory Chain vs. Connected Web, 4-Step Loop, First Inventor Shift, 3-Tier Support Blueprint) that gracefully swap to legible native HTML card stacks below `768px`.
4. **Silk-Ribbon Aurora Transitions**: Uses luminous animated multi-ribbon SVG + radial-gradient aurora bands (`8s` canvas cycle) as chapter transitions across the single-page crawlable scroll journey.
5. **Parent- & Student-Safe Institutional Tone**: Balances executive rigor for principals and trustees with emotionally encouraging, zero-shaming language for visiting families and students.

---

## 2. Brand Identity & Logo System

### Official Wordmark & Monogram
| Asset | File Path | Usage Context | Min Height |
|-------|-----------|---------------|------------|
| **Master Vector Wordmark** | `halogiq-logo.svg` (`viewBox="0 0 748 112"`) | Print, pitch decks, brand signage, large displays | 22px digital / 10mm print |
| **Dark Wordmark (PNG)** | `assets/halogiq-logo-dark.png` (`1024×140`) | Header navigation on Warm Parchment (`#f2f0eb`) & Paper White (`#ffffff`) | 22px (`161×22` header) |
| **Light Wordmark (PNG)** | `assets/halogiq-logo-light.png` (`1024×140`) | Midnight Wine footer (`#421d24`), dark `404.html`, OG cards, dark studio decks | 24px (`176×24` footer) |
| **Brand Wordmark Master (PNG)** | `halogiq-logo.png` (`1024×140`) | Structured data (`EducationalOrganization.logo`), press kit | 24px |
| **Q-Blade App Icon / Favicon** | Inline SVG (`128×128`, `rx="24"`) | Browser tab favicon, mobile home screen, square avatars | 16px |
| **Social Preview Card** | `og-image.png` (`1200×630`) | Open Graph (WhatsApp, LinkedIn, Facebook) & Twitter/X `summary_large_image` | `1200×630px` |

### Wordmark Anatomy & Clear Space Rules
- **Signature Feature**: Geometric wide-stance uppercase letterforms (`HALOGIQ`) culminating in a **45-degree collinear vector blade cutting cleanly across the `Q` bowl** — symbolizing breakthrough thinking and structured clarity.
- **Favicon Monogram Formula**: Rounded square (`rx: 24/128`) in **Midnight Wine (`#421d24`)**, `Q` ring in **Lilac Mist (`#d4c7ff`)**, and diagonal blade in **Paper White (`#ffffff`)**.
- **Clear Space**: Maintain minimum clear space equal to the height of the `H` (`1×` cap height) on all four sides.
- **Watermark Treatment**: On the Midnight Wine footer, `halogiq-logo-light.png` may span edge-to-edge at very low opacity as a monumental architectural signature (`aria-hidden="true"`).

---

## 3. Tokens — Colors

### Core Palette (Superhuman-Anchored Foundation)

| Name | Hex | CSS Token | Role & Usage Rules |
|------|-----|-----------|--------------------|
| **Midnight Wine** | `#421d24` | `--color-midnight-wine` | Primary action buttons, dual announcement banner, site footer, favicon ground — warm near-black maroon that commands institutional authority without feeling loud |
| **Royal Violet** | `#714cb6` | `--color-royal-violet` | Inline text links, active nav states, emphasized `<em>` headline words on light backgrounds, eyebrow labels. Do not use as the primary filled CTA button on light surfaces |
| **Lilac Mist** | `#d4c7ff` | `--color-lilac-mist` | Secondary action fills (`.btn-lilac-outline`, `.btn-lilac-solid`), active suite tab fill, emphasized `<em>` words on dark backgrounds, text selection highlight |
| **Deep Lagoon** | `#0c4243` | `--color-deep-lagoon` | Dark storytelling feature bands, unified architecture showcase card, aurora base ground, calm exam-reset visual anchors |
| **Warm Parchment** | `#f2f0eb` | `--color-warm-parchment` | Dominant page canvas (`html`, `body`) — warm editorial cream that replaces sterile white |
| **Soft Mist** | `#e3e3e2` | `--color-soft-mist` | Hairline 1px borders, card outlines, divider lines, scrolled header hairline |
| **Ink Charcoal** | `#292827` | `--color-ink-charcoal` | Primary body text, headings, monochrome icons — warm near-black ink, never cold `#000000` |
| **Stone Gray** | `#666666` | `--color-stone-gray` | Secondary body copy, `.heading-muted` second headline phrases, metadata captions |
| **Paper White** | `#ffffff` | `--color-paper-white` | Elevated card surfaces on parchment, floating UI mockups, primary text on dark grounds |

### Extended Brand & Surface Tints (HALOGIQ System Extensions)

| Name | Hex | CSS Token | Role |
|------|-----|-----------|------|
| **Midnight Wine Deep** | `#36181f` | `--color-midnight-wine-deep` | Deepened wine gradient stops & announcement hover depth |
| **Royal Violet Vivid** | `#5f34d6` | `--color-royal-violet-vivid` | High-energy violet gradient accents (Pillar 01 cloudscape, interactive focus states) |
| **Royal Violet Deep** | `#4b2383` | `--color-royal-violet-deep` | Deep contrast text on lilac chips & aurora ribbon bases |
| **Royal Indigo** | `#271147` | `--color-royal-indigo` | In-Campus Executive Studio dark showcase card & enterprise deep dark canvas |
| **Lilac Wash** | `#e6deff` | `--color-lilac-wash` | Highlighted code/diff pills, subtle tag fills |
| **Lilac Soft** | `#f1ecff` | `--color-lilac-soft` | Lilac-tinted full-bleed editorial quote bands (`.surface-lilac`), hover backgrounds |
| **Deep Lagoon Soft** | `#12585a` | `--color-deep-lagoon-soft` | Secondary teal gradient lift inside lagoon feature blocks |
| **Warm Parchment Light** | `#f7f6f3` | `--color-warm-parchment-light` | Alternating light section band (`.surface-parchment-light`) for soft vertical rhythm |
| **Warm Stone** | `#e8e5df` | `--color-warm-stone` | Neutral bento cards (`.sh-stone-card`, Pillar 03 Exams prism base), secondary pills |

### Functional Status Accents (Used Strictly in Semantic UI Contexts)

| Context | Color Values | Strictly Reserved For |
|---------|-------------|------------------------|
| **Audit / Calm Reset Teal** | `#14b8a6`, `#0d9488`, `#5eead4`, `#99f6e4`, `#a7f3d0` | Criterion 01 Readiness Audit border/badge, 5-Sec Calm Reset confirmations, aurora cyan ribbon |
| **Studio ON AIR / Fracture Alert** | `#ef4444`, `#f87171`, `#fca5a5`, `#be123c`, `#fff1f2` | Pulsing `ON AIR` Executive Studio recording dot, State A glass-bead fracture warning & passive re-reading strikethrough diff |
| **Session Growth & Browser Chrome Dots** | `#eef6f0`, `#14532d`, `#4ade80`, `#fbbf24` | Soft sage growth stage pill (`#eef6f0` bg / `#14532d` text) & enterprise browser-window mockup traffic lights (`#f87171`, `#fbbf24`, `#4ade80`) |

### Complete Production Color Appendix (Gradients, Icon Tiles, SVG Diagrams & Component Accents)
Every additional hex swatch used across `styles.css`, `index.html`, `404.html`, and `halogiq-logo.svg` beyond the 18 `:root` tokens:

| Family | Exact Hex Values | Where Used in Production |
|--------|------------------|--------------------------|
| **Wordmark & Hover States** | `#51545a` (SVG wordmark graphite), `#592831` (Midnight Wine hover), `#c5b3ff` & `#e4dcff` (Lilac Mist button hovers) | Master `halogiq-logo.svg` fill, `.btn-primary:hover`, `.btn-lilac-outline:hover`, `.btn-lilac-solid:hover` |
| **Warm Neutral & Diagram Hairlines** | `#faf8ff`, `#f4f3f0`, `#d4d2cd`, `#c8c5be`, `#a8a6a1` | Subtle diagram card surfaces, SVG wireframe strokes, muted illustration dividers |
| **Lagoon & Wine Soft Washes** | `#e9f2f2`, `#e6f2f2`, `#b9d4d4`, `#99d4cc`, `#f6e7ea`, `#f7ebee`, `#f7e8ea`, `#f9c2d6`, `#fecdd3` | Soft calm-recall cell tints, comparison badges, blush card highlights |
| **Hero Twilight Sky Gradient** | `#3a5ba8`, `#6379c4`, `#9b97d6`, `#584c8f` | `.sh-hero` atmospheric sky fallback & twilight backdrop gradient behind `hero-portrait.jpg` |
| **Silk Aurora Ribbons & Violet/Orchid Glows** | `#7c3aed`, `#c4b5fd`, `#6366f1`, `#818cf8`, `#4f46e5`, `#8b5cf6`, `#9333ea`, `#c084fc`, `#9f7aea`, `#e879f9`, `#f0abfc`, `#f9a8d4`, `#ec4899`, `#93c5fd` | Shared SVG `<defs>` silk ribbon gradients (`#ribbonGradViolet`, `#ribbonGradCyan`, `#ribbonGradOrchid`), `.aurora-cta-banner`, `.studio-spectrogram-svg`, holographic foil prism |
| **Pastel Mesh Icon Tiles (`.mesh-*`)** | `#a7f3d0`, `#b8e8d8`, `#bfdbfe`, `#b8ceff` (Mint); `#fbcfe8`, `#fed7aa`, `#fbcba6` (Peach); `#ddd6fe`, `#decbf8`, `#f5d0fe` (Lavender); `#e9d5ff`, `#f4c8d8` (Wine-Blush) | Superhuman-style nav dropdown & feature icon square tiles (`.mesh-mint`, `.mesh-peach`, `.mesh-lavender`, `.mesh-wine-blush`) |
| **Deep Dark Grounds & Blueprint Stops** | `#240f14`, `#2d1219`, `#34151c`, `#1c0d16`, `#21101d`, `#260d24`, `#2b1028`, `#211428`, `#1c1038`, `#1f1140`, `#171029`, `#161428`, `#150e24`, `#140d23`, `#131126`, `#08292a`, `#092c2d` | Founding Partner Charter blueprint, 3-Tier Support dark inspector, Enterprise R&D band, dark active pill text contrast, and `404.html` aurora backdrop |

---

## 4. Surfaces & Elevation Ladder

HALOGIQ uses **tonal layering, not heavy drop shadows**, to separate visual hierarchy across the page:

| Level | Surface Name | Value / Token | Purpose |
|-------|-------------|---------------|---------|
| **0** | Parchment Canvas | `#f2f0eb` (`--surface-parchment-canvas`) | Base viewport background and alternating section canvas |
| **0.5** | Parchment Light | `#f7f6f3` (`--color-warm-parchment-light`) | Subtle alternating editorial band to distinguish adjacent sections without hard boxes |
| **1** | Warm Stone | `#e8e5df` (`--surface-stone-card`) | Recessed vignette cards, Pillars showcase secondary prism |
| **2** | Paper Card | `#ffffff` (`--surface-paper-card`) | Elevated cards, FAQ containers, 4-stakeholder tab bar, walkthrough card (bordered with `1px solid #e3e3e2`) |
| **3** | Lilac Soft / Wash | `#f1ecff` / `#d4c7ff` (`--surface-lilac-wash`) | Philosophy quote section, selected tabs, secondary lilac buttons |
| **4** | Deep Lagoon Band | `#0c4243` (`--surface-deep-lagoon-band`) | High-contrast cognitive architecture storytelling & aurora base |
| **5** | Royal Indigo / Blueprint Dark | `#271147` / `#150e24` | Executive Studio card, Enterprise R&D showcase, Founding Partner Charter card |
| **6** | Midnight Wine Ground | `#421d24` (`--surface-wine-ground`) | Top announcement bar, site-wide footer, primary filled CTA |

---

## 5. Tokens — Typography

### Font Families
1. **Primary Display & Body — `Inter` (Variable Font) / `Super Sans VF` stack** (`--font-super-sans-vf`)
   - Google Fonts load: `Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900` (loaded non-blocking via `preload` + `display=swap`).
   - OpenType features enabled globally: `font-feature-settings: "ss01" 1, "cv01" 1;`.
   - **Signature Voice**: Weight **`460`** (`font-variation-settings: "wght" 460`) for ALL display headlines (`h1`, `h2`) and primary body copy, paired with weight **`540`** (`"wght" 540`) for `h3`, `h4`, and subtle UI emphasis. Weight `700` is reserved exclusively for compact micro-labels, uppercase eyebrows, and footer column headings.
2. **Scientific & Telemetry Mono — `JetBrains Mono`** (`--font-mono`)
   - Weights loaded: `400`, `500`, `600`, `700`.
   - Used with `font-variant-numeric: tabular-nums` for quarterly application countdown digits, step numbers (`01`–`04`), charter eyebrows, studio `ON AIR` tags, and background aurora cognitive code-texture overlays.

### Type Scale & Responsive Clamps

| Role | Token | Desktop Size | Responsive Clamp | Weight | Line Height | Letter Spacing |
|------|-------|-------------|------------------|--------|-------------|----------------|
| **Display (`h1`, `.h1`)** | `--text-display` | `64px` | `clamp(2.45rem, 4.7vw, 4rem)` | `460` | `0.96` | `-0.028em` |
| **Heading Lg (`h2`, `.h2`)** | `--text-heading-lg` | `49px` | `clamp(1.85rem, 3.4vw, 3.0625rem)` | `460` | `1.08` | `-0.027em` |
| **Aurora Banner `h2`** | — | `45.6px` | `clamp(1.75rem, 3.2vw, 2.85rem)` | `460` | `1.08` | `-0.025em` |
| **Heading Sm** | `--text-heading-sm` | `28px` | — | `460` | `1.14` | `-0.022em` |
| **Subheading** | `--text-subheading` | `26px` | — | `460` | `1.28` | `-0.018em` |
| **Card Heading (`h3`, `.h3`)** | — | `24px` | `clamp(1.2rem, 1.5vw, 1.5rem)` | `540` | `1.22` | `-0.018em` |
| **Label Bold** | `--text-label-bold` | `19px` | — | `540–600` | `1.42` | `-0.01em` |
| **Sub-Heading (`h4`, `.h4`)** | — | `17px` | `1.0625rem` | `540` | `1.35` | `-0.01em` |
| **Body (`p`)** | `--text-body` | `16px` | `16px` (`max-width: 66ch`) | `460` | `1.48–1.58` | `0` |
| **Body Sm** | `--text-body-sm` | `14px` | `14px` | `460–540` | `1.50` | `0` |
| **Caption / Eyebrow** | `--text-caption` | `12px` | `11px–12px` | `700` | `1.50` | `+0.08em`–`+0.11em` |

### Editorial Two-Tone Headline Pattern
HALOGIQ adopts Superhuman's signature **two-tone headline split**:
- **On light backgrounds**: Primary claim in **Ink Charcoal (`#292827`)** + secondary phrase wrapped in `<span class="heading-muted">` (**Stone Gray `#666666`**), or single strategic emphasis word wrapped in `<em>` (**Royal Violet `#714cb6`**, `font-style: normal`).
- **On dark backgrounds**: Primary claim in **Paper White (`#ffffff`)** + emphasis `<em>` or muted secondary phrase in **Lilac Mist (`#d4c7ff`)** (`78%–100%` opacity).

---

## 6. Tokens — Spacing, Layout, Radii & Shadows

### Spacing Scale (`4px` Base Unit)
`4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `48px`, `64px`, `80px`, `96px` (`--spacing-4` through `--spacing-96`).

### Layout Grid, Fluid Spacing & Mobile-Native Architecture
- **Max Content Width**: `1240px` (`--page-max-width`, centered with fluid safe-area gutters `--gutter-inline: clamp(16px, 3.6vw, 32px)`)
- **Fluid Spacing & Rhythm Tokens**: `--space-section: clamp(48px, 6.2vw, 88px)`, `--space-section-tight: clamp(40px, 5vw, 64px)`, `--space-header-gap: clamp(28px, 3.8vw, 48px)`, `--space-card: clamp(18px, 2.4vw, 28px)`, `--space-card-lg: clamp(20px, 3.2vw, 38px)`, `--grid-gap: clamp(14px, 2vw, 22px)`
- **Intrinsic Grids & Container Queries**: `.narrative-intro`, `.philosophy-grid`, and `.session-catalog-grid` reflow intrinsically via `auto-fit` / `auto-fill` + `minmax(min(100%, ...), 1fr)`; `.bento-stone-prism` adapts via `@container exam-prism (max-width: 410px)`; sibling card bottom blocks (`.application-box`, `.outcomes-box`, `.pillar-meta-block`) lock to shared horizontal baselines via `margin-top: auto`
- **Native Mobile Ergonomics**: `viewport-fit=cover` + `env(safe-area-inset-*)`, `100dvh` frosted mobile drawer with backdrop scrim & body scroll-lock, `44×44px` animated menu toggle, `@media (hover: hover) and (pointer: fine)` guarded card lifts, `text-wrap: balance` / `pretty`, horizontal scroll-snap Hero card deck with live dot indicator, horizontal scroll-snap pill rails (`.challenge-selector`, `.rd-specialists-strip`, `.session-filter-pills`, `.diagram-toggle-group`, `.config-slot-row`, `.arch-sub-pills`), compact 2×2 segmented controls & 3-col KPI strips preserved down to `360px`, and a 2-column mobile footer with `>= 44px` tap targets
- **Sticky Anchor Offsets**: `scroll-margin-top: calc(var(--header-h) + 8px)` on `.page-view` chapters and `calc(var(--header-h) + 16px)` on deep-linked sections (`[id^="sec-"]`, `[id^="stream-"]`, `#partnerFormCard`)
- **Single-Page Crawl Architecture**: All 5 chapters (`#home`, `#methodology`, `#programmes`, `#schools`, `#partner`) stay visible in static HTML flow (`display: block`) with `IntersectionObserver` ScrollSpy syncing active navigation states

### Responsive Breakpoints
| Breakpoint | Target Tier | Key Adaptations |
|------------|-------------|-----------------|
| `<= 1180px` | Compact Desktop | Hero floating glass cards tuck inward (`332px` studio card) |
| `<= 1024px` | Tablet | Main nav switches to `100dvh` frosted sheet with backdrop; Hero glass cards become a horizontal scroll-snap deck with live dots; Partner card un-sticks; Footer shifts to clean 2-column link grid |
| `<= 900px` | Narrow Tablet | 3-item grids step cleanly to 1-col (zero 2+1 orphans); 4 Stakeholder tabs shift to compact 2×2 segmented control; announcement pips hide |
| `<= 768px` | Mobile (Primary) | Desktop SVGs swap to legible native HTML card stacks; Trust Grid locks `grid-auto-rows: 146px`; Challenge pills & 3-Tier sub-pills become horizontal snap rails; comparison table renders as separated tonal cards; footer links expand to `>= 44px` touch targets |
| `<= 640px` | Standard Phone | R&D specialists, stage filters, memory toggles & timetable slots become horizontal snap pill rails; Charter checkpoints render as 1+2 architectural grid; CTAs go full-width `48px` |
| `<= 480px` | Small Phone | Compact 2×2 tabs/session segments & 3-col KPI strip stay side-by-side; Hero swipe deck cards size to `85vw` for clean next-card edge peek |
| `<= 380px` | Compact Mobile (`360px`) | Zero-overflow enforcement (`overflow: clip` on dark panels, announcement mobile CTA condensed) |

### Border Radius Scale
| Token | Value | Applied To |
|-------|-------|-----------|
| `--radius-tabs` / `--radius-small-buttons` | `8px` | Suite tab bar, `.btn-lilac-outline`, `.btn-outline-light`, skip link |
| `--radius-xl` | `12px` | Dropdown items, inner nested boxes, input controls |
| `--radius-cards` / `--radius-buttons` / `--radius-floating-cards` | `16px` | Standard cards, primary buttons, hero floating frosted glass cards, charter criterion cards |
| `--radius-bento` / `--radius-card-lg` | `20px`–`22px` | Asymmetric 3-Pillar Bento cards, Founding Partner Charter blueprint |
| `--radius-pills` | `999px` | Eyebrow pills, scientist badges, stage badges, announcement countdown pill |

### Shadows & Borders
| Token | Value | Usage |
|-------|-------|-------|
| Default Card Edge | `1px solid #e3e3e2` | Standard cards on parchment — **no drop shadow** |
| `--shadow-subtle` | `rgb(113, 76, 182) 0px 0px 0px 1px inset` | Signature violet inset focus/active ring |
| `--shadow-soft` | `0 12px 28px -12px rgba(41, 40, 39, 0.08)` | Interactive cards on hover/lift only |
| `--shadow-dropdown` | `0 18px 38px -10px rgba(41, 40, 39, 0.12), 0 0 0 1px #e3e3e2` | Navbar dropdown menus |
| `--shadow-popover` | `0 20px 44px -12px rgba(24, 15, 42, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.14)` | Hero dark frosted pathway launcher popover |

---

## 7. Motion & Interaction Architecture

### Signature Easing Curves
- **Editorial Glide (`--ease-editorial`)**: `cubic-bezier(0.22, 1, 0.36, 1)` — smooth exponential deceleration for reveals, dropdowns, accordion growth, button hovers, and tab transitions.
- **Snappy Response (`--ease-snappy`)**: `cubic-bezier(0.2, 0.8, 0.2, 1)` — crisp micro-interactions (icon nudges, radio state shifts, pill toggles).

### Key Motion Patterns
- **Dual Announcement Swipe-Up**: Perpetual vertical swipe-up rotation between Slide 0 (Institutional Positioning) and Slide 1 (Live Quarterly Countdown rolling across Mar 31 / Jun 30 / Sep 30 / Dec 31), pausing on hover/focus.
- **Aurora Continuity Flow**: `auroraFlow` (`8s ease-in-out infinite alternate`) layered with SVG silk ribbons (`6.5s–10.5s` staggered sweeps) for calm, living atmospheric energy without jarring flashes.
- **Pointer-Reactive Glass Sheen**: Fine-pointer desktop devices update `--mx`/`--my` via `requestAnimationFrame` on hero `.sh-glass-card` mockups.
- **Zero-Shake Mobile Containment**: `#trustLogoGrid` rotates cells on a `5200ms` staggered cadence (`140ms` per cell) ONLY when visible in viewport (`IntersectionObserver`), with fixed `grid-auto-rows` and `contain: layout style` preventing vertical page jump.
- **Smooth Grid-Row Accordion**: Leadership FAQ animates via `grid-template-rows: 0fr → 1fr` (`0.3s var(--ease-editorial)`) — keeping all FAQ copy crawlable in the DOM without `display: none`.
- **Accessibility Safeguard**: `@media (prefers-reduced-motion: reduce)` disables non-essential keyframe motion and forces `.reveal-on-scroll` elements immediately visible (`opacity: 1; transform: none`). `<noscript>` also guarantees zero hidden content without JavaScript.

---

## 8. Core Component Library

### 8.1 Buttons & Interactive Links
1. **Primary Action Button (`.btn-primary`)**: Midnight Wine `#421d24`, Paper White `#ffffff` text at `16px` / weight `460`, radius `16px`, min-height `48px`, `0 22px` padding. Hover darkens to `#592831` with `-1px` vertical lift and `3px` right nudge on `.arrow-nudge` SVG icons. **The sole dark chromatic filled button on light surfaces.**
2. **Outlined Lilac Secondary Button (`.btn-lilac-outline`)**: Lilac Mist `#d4c7ff`, Ink Charcoal `#292827` text at `14px` / weight `500`, `1px solid #292827` border, radius `8px`, min-height `38px`. Used for the header `Request Walkthrough` CTA; flips to Midnight Wine when `#partner` is active.
3. **Solid Lilac Dark-Surface CTA (`.btn-lilac-solid`)**: Lilac Mist `#d4c7ff`, Ink Charcoal `#292827` text, radius `10px`, min-height `46px`. Primary CTA on dark bands (Enterprise R&D, Aurora banners, Charter card, `404.html`).
4. **White Outlined Ghost Button (`.btn-outline-light`)**: `rgba(255,255,255,0.06)` with `backdrop-filter: blur(8px)`, `1px solid rgba(255,255,255,0.62)`, Paper White text, radius `8px`, min-height `44px`. Secondary action on dark feature bands and aurora banners.
5. **Quiet Paper Outline (`.btn-secondary`)**: Paper White `#ffffff`, `1px solid #e3e3e2`, Ink Charcoal text, radius `16px`, min-height `48px`.
6. **Ghost Text Action (`.btn-ghost`)**: Transparent background, Ink Charcoal `#292827`, `14px` / weight `460`, underline on hover (`text-underline-offset: 4px`).
7. **Royal Violet Inline Link (`.violet-link`)**: Royal Violet `#714cb6` (`#ffffff` with `.on-dark`), weight `460`, `16px`, animated `scaleX(0 → 1)` 1px left-to-right underline and `3px` chevron nudge on hover.

### 8.2 Navigation & Global Framing
- **Dual Announcement Banner (`#announcementBanner`)**: Full-width Midnight Wine `#421d24` strip flush above the header with desktop vertical switcher pips, subtle comet sweep, and responsive mobile condensed countdown CTA (`Apply by DEC 31`).
- **Sticky Frosted Header (`.site-header`)**: `64px` height, `rgba(242, 240, 235, 0.82)` with `backdrop-filter: blur(12px)`, transitioning to `0.92` opacity + `1px solid #e3e3e2` bottom hairline once `scrollY > 12px`. Features left wordmark (`161×22px`), centered weight-`460` nav links with two Superhuman-style frosted dropdown menus (`Programmes & Studio`, `How It Works in Schools`) with soft pastel icon tiles (`.mesh-lavender`, `.mesh-mint`, `.mesh-peach`, `.mesh-wine-blush`), and right action cluster.
- **Full-Bleed Midnight Wine Footer (`.site-footer`)**: `#421d24` ground, 4-column link architecture (`Explore`, `Institutional Solutions`, `8 Learning Streams`, `Contact`), `14px` weight `700` Paper White column titles, muted white links, legal meta bar, and monumental edge-to-edge low-opacity wordmark watermark.

### 8.3 Hero & Signature Editorial Sections
- **Full-Bleed Golden-Hour Hero (`.sh-hero`)**: Edge-to-edge editorial portrait (`assets/hero-portrait.jpg`) with warm atmospheric scrim, swaying horizon grass silhouettes, centered weight-`460` white `<h1>` (`em` in Lilac Mist), interactive dark-frosted **Explore HALOGIQ** pathway launcher popover, and 7 floating translucent glass UI cards composited across the margins (`Executive Studio ON AIR`, `5-Icon Quick Dock`, `4-Step Loop`, `THC-Institute R&D` pills).
- **6-Cell Institutional Trust Strip (`#trustLogoGrid`)**: Square `0px`-radius Paper White cells separated by `1px #e3e3e2` grid borders in a single 6-column desktop row (2-column on mobile), rotating institutional proof pillars and the 6 THC-Institute research disciplines.
- **4-Stakeholder Suite Tab Strip**: Equal-width horizontal WAI-ARIA 1.2 tab strip (`Principals & Management`, `Educators & Faculty`, `Parents`, `Students`) on Paper White with `8px` outer radius; active tab fills with Lilac Mist `#d4c7ff` and reveals 3 outcome cards below.
- **Asymmetric 7:5 Three-Pillar Bento Grid**:
  - *Pillar 01 (`HALOGIQ Elevate`)*: Tall Royal Violet cloudscape card overlaying `assets/bento-clouds.jpg` with orbital learning-stream ring.
  - *Pillar 02 (`In-Campus Executive Studio`)*: Royal Indigo `#271147` dark card with live podcast schedule slot, animated acoustic waveform bars, and multi-ribbon SVG spectrogram.
  - *Pillar 03 (`HALOGIQ Exams`)*: Warm Stone `#e8e5df` card with crisp holographic prism edge shimmer, floating protocol chips (`1-Pg`, `4-Step`, `5-Sec`), and exam recall table.
- **Interactive Cognitive Diagrams (Desktop SVG + Mobile Native Cards)**:
  - *Graphic 4*: Static Information Retrieval vs. First-Principles Human Discovery.
  - *Graphic 5*: Interactive Cognitive Recall Comparison (`State A: Glass-Bead Chain` vs. `State B: HALOGIQ Connected Web` + `5-Sec Calm Reset`).
  - *Graphic 6*: Interactive 4-Step Learning Loop (`Observe → Engineer → Test → Self-Fix`).
  - *Graphic 7*: *Me vs. Past Me* Self-Referenced Growth Portfolio + 4-Person Squad Badge Hexagon.
- **3-Tier Institutional Support Blueprint & 15-Second Timetable Configurator**: Interactive dark inspector panel (`overflow: clip`, inset radial gradients) paired with grade/slot toggles dynamically generating a tailored WhatsApp Campus Blueprint CTA.
- **Founding Partner Standards Charter (`#sec-partner-charter`)**: Dark blueprint card (`#21101d → #131126`) with luminous Lilac/Teal top-accented criterion cards detailing the *Prerequisite Campus Readiness Audit* and *Phase-1 District Exclusivity (14-Day Priority Window)*.
- **Leadership FAQ Accordion (`#sec-faq`)**: Clean Paper White / Parchment expandable items (`grid-template-rows` smooth animation, rotating `+` icon), backed 1:1 by Google `FAQPage` JSON-LD schema.

---

## 9. Imagery, Iconography & Diagram Guidelines

- **Photography Direction**: Warm, golden-hour, authentic Indian student and campus atmosphere — optimistic, calm, and thoughtful rather than stock-classroom clichés or overly corporate poses. Profile and candid compositions let floating frosted glass cards breathe around the subject without obscuring faces.
- **Iconography**: Minimal single-weight monochrome line icons (`14px–20px`, `stroke-width: 1.8–2.2`, `stroke-linecap="round"`, `stroke-linejoin="round"`) matching the clean weight-460 typographic stroke. Inside dropdowns and badges, place icons on small soft-tinted square tiles (`26px–32px`, `border-radius: 7px–9px`).
- **Diagram & SVG Accessibility**:
  - Informative diagrams carry `role="img"` + descriptive `aria-label` (with inner `<g aria-hidden="true">` so screen readers announce one clean synthesis instead of fragmented SVG text nodes).
  - Purely decorative icons, ribbons, and spectrograms MUST carry `aria-hidden="true" focusable="false"`.
  - Every `<img>` requires descriptive `alt`, explicit `width`/`height` (zero CLS), `fetchpriority="high"` + `<link rel="preload">` for LCP hero photography, and `loading="lazy"` for below-the-fold imagery.

---

## 10. Brand Voice & Psychological Framing Guardrails

Because HALOGIQ's website and collateral are read simultaneously by **School Principals/Trustees (B2B decision-makers)** and **Parents/Students (B2C families)**, every headline, deck slide, and brochure must obey these tone rules:

| Do Say (HALOGIQ Voice) | Avoid Saying |
|------------------------|--------------|
| *"Schools teach students what to learn. We teach them how to learn, think, and communicate."* | *"Schools fail to teach real skills."* (never criticize partner schools) |
| *"Founding Partner Standards" / "Campus Readiness Audit" / "One Founding Partner School per District"* | *"Elite Panel" / "Exclusive Monopoly" / "Rejected Schools"* (feels elitist to parents) |
| *"Me vs. Past Me" Growth Tracking & Collaborative 4-Person Squad Badges* | *Rankings, public leaderboards, top-1% elitism* (creates student anxiety) |
| *"Calm recall under exam pressure" / "5-Second Calm Reset"* | *"Memory hacks" / "Rote shortcuts" / "Guaranteed 99% marks"* (sounds gimmicky) |
| *"Zero timetable friction" / "Zero extra grading for teachers"* | *"Overhauling your syllabus"* (triggers institutional friction) |

---

## 11. Do's and Don'ts

### Do
- **Use weight `460`** for all display and section headings (`>= 28px`) with tight negative tracking (`-0.022em` to `-0.028em`).
- **Anchor pages on Warm Parchment (`#f2f0eb`)** and lift cards with Paper White (`#ffffff`) + `1px solid #e3e3e2` hairlines.
- **Reserve Midnight Wine (`#421d24`)** as the sole dark primary CTA fill on light surfaces, and **Lilac Mist (`#d4c7ff`)** as the primary filled CTA on dark surfaces.
- **Reserve Royal Violet (`#714cb6`)** for inline links, active nav states, and strategic `<em>` emphasis words.
- **Provide mobile-native card alternatives (`<= 768px`)** for any multi-column SVG diagram wider than `480px`.
- **Keep all crawlable content visible in the DOM** — use `grid-template-rows` for accordions and ScrollSpy for single-page sections, never `display: none` on full content chapters.
- **Pair `Inter` with `JetBrains Mono`** only for micro-eyebrows, timers, numeric telemetry, and step codes (`01`–`04`).

### Don't
- **Do not use weight `700+`** for large display headings (except compact `1200×630` social share OG thumbnails where legibility at tiny WhatsApp scales requires bold weight).
- **Do not use pure `#000000`** for text or `#ffffff` as the base full-page canvas.
- **Do not stack heavy drop shadows** on parchment cards; rely on hairline borders and tonal surface steps.
- **Do not introduce off-brand bright blues, oranges, or neon greens** — keep chromatic accents strictly inside the Wine / Violet / Lilac / Deep Lagoon family (with semantic Teal/Crimson restricted solely to Calm/Audit and ON AIR/Fracture states).
- **Do not allow horizontal overflow or layout-shifting timers/rotators** on `360px–390px` mobile screens; lock grid row heights and apply `contain: layout style` + `overflow: clip`.

---

## 12. Quick Start — Copy-Paste Tokens

### CSS Custom Properties (`styles.css` Production Source)

```css
:root {
  /* Core Brand & Surface Tokens */
  --color-midnight-wine: #421d24;
  --color-midnight-wine-deep: #36181f;
  --color-royal-violet: #714cb6;
  --color-royal-violet-vivid: #5f34d6;
  --color-royal-violet-deep: #4b2383;
  --color-royal-indigo: #271147;
  --color-lilac-mist: #d4c7ff;
  --color-lilac-wash: #e6deff;
  --color-lilac-soft: #f1ecff;
  --color-deep-lagoon: #0c4243;
  --color-deep-lagoon-soft: #12585a;
  --color-warm-parchment: #f2f0eb;
  --color-warm-parchment-light: #f7f6f3;
  --color-warm-stone: #e8e5df;
  --color-soft-mist: #e3e3e2;
  --color-ink-charcoal: #292827;
  --color-stone-gray: #666666;
  --color-paper-white: #ffffff;

  /* Named Surface Levels */
  --surface-parchment-canvas: var(--color-warm-parchment);
  --surface-paper-card: var(--color-paper-white);
  --surface-stone-card: var(--color-warm-stone);
  --surface-lilac-wash: var(--color-lilac-mist);
  --surface-deep-lagoon-band: var(--color-deep-lagoon);
  --surface-wine-ground: var(--color-midnight-wine);

  /* Typography — Font Families */
  --font-super-sans-vf: 'Super Sans VF', 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* Typography — Scale */
  --text-caption: 12px;
  --leading-caption: 1.5;
  --text-body-sm: 14px;
  --leading-body-sm: 1.5;
  --text-body: 16px;
  --leading-body: 1.48;
  --text-label-bold: 19px;
  --leading-label-bold: 1.42;
  --text-subheading: 26px;
  --leading-subheading: 1.28;
  --text-heading-sm: 28px;
  --leading-heading-sm: 1.14;
  --tracking-heading-sm: -0.022em;
  --text-heading-lg: 49px;
  --leading-heading-lg: 1.08;
  --tracking-heading-lg: -0.027em;
  --text-display: 64px;
  --leading-display: 0.96;
  --tracking-display: -0.028em;

  /* Typography — Variable Weights */
  --font-weight-w460: 460;
  --font-weight-medium: 500;
  --font-weight-w540: 540;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Spacing Scale (4px Base) */
  --spacing-unit: 4px;
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-36: 36px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-80: 80px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1240px;
  --section-gap: 88px;
  --card-padding: 24px;
  --element-gap: 8px;

  /* Border Radii */
  --radius-tabs: 8px;
  --radius-small-buttons: 8px;
  --radius-xl: 12px;
  --radius-cards: 16px;
  --radius-buttons: 16px;
  --radius-floating-cards: 16px;
  --radius-bento: 20px;
  --radius-pills: 999px;

  /* Shadows */
  --shadow-subtle: rgb(113, 76, 182) 0px 0px 0px 1px inset;
  --shadow-soft: 0 12px 28px -12px rgba(41, 40, 39, 0.08);
  --shadow-popover: 0 20px 44px -12px rgba(24, 15, 42, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.14);
  --shadow-dropdown: 0 18px 38px -10px rgba(41, 40, 39, 0.12), 0 0 0 1px var(--color-soft-mist);

  /* Motion Curves */
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-snappy: cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

### Tailwind v4 (`@theme`)

```css
@theme {
  /* Core & Extended Colors */
  --color-midnight-wine: #421d24;
  --color-midnight-wine-deep: #36181f;
  --color-royal-violet: #714cb6;
  --color-royal-violet-vivid: #5f34d6;
  --color-royal-violet-deep: #4b2383;
  --color-royal-indigo: #271147;
  --color-lilac-mist: #d4c7ff;
  --color-lilac-wash: #e6deff;
  --color-lilac-soft: #f1ecff;
  --color-deep-lagoon: #0c4243;
  --color-deep-lagoon-soft: #12585a;
  --color-warm-parchment: #f2f0eb;
  --color-warm-parchment-light: #f7f6f3;
  --color-warm-stone: #e8e5df;
  --color-soft-mist: #e3e3e2;
  --color-ink-charcoal: #292827;
  --color-stone-gray: #666666;
  --color-paper-white: #ffffff;

  /* Typography */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* Radii */
  --radius-sm-btn: 8px;
  --radius-xl: 12px;
  --radius-card: 16px;
  --radius-bento: 20px;
  --radius-pill: 999px;

  /* Shadows */
  --shadow-subtle: rgb(113, 76, 182) 0px 0px 0px 1px inset;
  --shadow-soft: 0 12px 28px -12px rgba(41, 40, 39, 0.08);
}
```

---

## 13. AI Agent & Future Designer Prompt Guide

Use this quick-reference block when briefing designers, agencies, pitch-deck tools, or AI coding agents on any future HALOGIQ landing page, school dossier, or mobile app:

**Quick Color & Type Cheat Sheet**
- **Canvas**: `#f2f0eb` (Warm Parchment) · Alternate light band: `#f7f6f3`
- **Primary Ink**: `#292827` · Muted Ink: `#666666` · Hairline Border: `#e3e3e2`
- **Elevated Card**: `#ffffff` (`16px` radius, `1px solid #e3e3e2`, zero drop shadow)
- **Primary Brand CTA (Light Surface)**: `#421d24` (Midnight Wine) with `#ffffff` text (`16px` radius, `48px` height)
- **Primary Brand CTA (Dark Surface)**: `#d4c7ff` (Lilac Mist) with `#292827` text (`10px` radius, `46px` height)
- **Inline Links & Emphasis**: `#714cb6` (Royal Violet on light) / `#d4c7ff` (Lilac Mist on dark)
- **Dark Storytelling Grounds**: `#0c4243` (Deep Lagoon), `#271147` (Royal Indigo), `#421d24` (Midnight Wine)
- **Fonts**: `Inter` Variable (`wght: 460` display & body, `540` subheadings) + `JetBrains Mono` (`600–700` eyebrows, timers, metrics)

**Reusable Prompt Starters**
1. **New Landing Page Section**: *"Build a HALOGIQ section on Warm Parchment (`#f2f0eb`), max-width `1240px`, with an uppercase `JetBrains Mono` eyebrow (`12px`, `#714cb6`), a two-tone `Inter` weight-`460` `49px` heading (`#292827` + `.heading-muted` `#666666`), and Paper White (`#ffffff`) cards with `16px` radius, `24px` padding, and `1px solid #e3e3e2` borders (no drop shadows)."*
2. **Dark Institutional / Studio Feature Card**: *"Create a full-bleed or `22px`-radius dark feature card on Deep Lagoon (`#0c4243`) or Royal Indigo (`#271147`) with subtle radial violet/teal lighting, Paper White weight-`460` display heading with Lilac Mist (`#d4c7ff`) `<em>` accent, `JetBrains Mono` status pill, and a `#d4c7ff` filled CTA button (`#292827` text)."*
3. **School Pitch Deck / Print Dossier**: *"Use Warm Parchment (`#f2f0eb`) slide backgrounds for editorial reading slides, Midnight Wine (`#421d24`) for cover/divider slides with the white HALOGIQ wordmark (`halogiq-logo-light.png`), `Inter` light-medium (`460`) headings, hairline `#e3e3e2` tables, and `JetBrains Mono` tags for NEP 2020 and THC-Institute R&D citations."*
