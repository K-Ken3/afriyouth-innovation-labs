# Design System

The visual language is **contemporary African editorial practice crossed with an experimental innovation lab**: oversized type, visible grid lines, precise hairlines, generous negative space, archival numbering, one deliberate accent, and photography treated as documentary material rather than decoration. It is built on the official AfriYouth brand system: Dark Purple, Steel Pink, Duke Blue and Blue, with Poppins headings and DM Sans standing in for the proprietary Gilroy body face.

The system avoids the generic nonprofit look (soft gradients, rounded cards everywhere, stock smiling children) and the generic AI-dashboard look (glassmorphism, neon purple, floating metric cards).

## 1. Principles

1. **Editorial before decorative.** Layout, hierarchy and typography carry the identity. Ornament is restrained.
2. **Evidence made visible.** Numbered chapters, captions, sources and status labels are part of the aesthetic.
3. **Honest states are designed states.** Empty channels, unpublished figures and unopened calls get the same care as finished content.
4. **One accent, used with intent.** Steel Pink marks attention, action and data. It is never a background wash for whole pages.
5. **Motion reveals structure.** Animation clarifies hierarchy and sequence. It never delays access to content or hijacks scrolling.
6. **Accessible by construction.** Contrast, focus, target size, semantics and reduced motion are system defaults, not patches.

## 2. Colour

Colour is defined once in `src/styles/index.css` as RGB channel variables, then exposed to Tailwind in `tailwind.config.js`. Components use token classes such as `bg-forest`, `text-lime/70`, `border-forest/15`. Do not introduce raw hex values in components.

Token names are semantic slots inherited from the first build: `forest` is the primary ink slot, `lime` the accent slot and `clay` the secondary accent slot. The official palette is mapped onto those slots, so a future change remains a one-file edit.

| Token | Value | Hex | Official name | Role |
| --- | --- | --- | --- | --- |
| `forest` | `13 6 36` | `#0D0624` | Dark Purple | Primary ink, dark sections, primary buttons |
| `ink` | `7 3 20` | `#070314` | — | Hover/darkest text, near-black contrast |
| `lime` | `199 35 223` | `#C723DF` | Steel Pink | Accent, active states, data marks, CTA panel |
| `ivory` | `247 245 251` | `#F7F5FB` | — | Page background |
| `sage` | `233 229 247` | `#E9E5F7` | — | Quiet panels, supporting surfaces |
| `paper` | `255 255 255` | `#FFFFFF` | White | Cards and form fields |
| `blush` | `250 232 253` | `#FAE8FD` | — | Filled accent surfaces that carry dark text |
| `clay` | `3 1 255` | `#0301FF` | Duke Blue | Secondary marker, required-field asterisk, ticker dot |
| `blue` | `2 0 167` | `#0200A7` | Blue | Text selection, deep supporting graphic accent |

Support colours:

- Error border `#A33A2A`, error text `#8F2F20`.
- Focus ring: `#0D0624` on light surfaces, `#E879F9` inside `.on-dark`.
- Text muting is achieved with forest/ivory plus opacity. Body and label copy sits at `/60` or higher so it clears WCAG AA on ivory; display-size accent lines may also use `/60` because their weight and size carry the contrast.
- Inside `.on-dark`, the `lime` token resolves to `#E879F9` so pink text and focus rings stay legible on Dark Purple. Components keep using the same classes.

Rules:

- Default page background is ivory, not white.
- Dark sections use Dark Purple with ivory text and the `.on-dark` class so focus and hairline colours switch correctly.
- Steel Pink is reserved for emphasis. A typical page has one pink moment, not five.
- Filled pink surfaces use the `blush` tint with Dark Purple text; never place Steel Pink text on ivory or paper.
- Steel Pink text is for dark backgrounds only, where it resolves to `#E879F9`.
- Use opacity for secondary text rather than adding new grey tokens.

## 3. Typography

Self-hosted variable fonts via Fontsource. No external font requests. Only latin subsets are imported, which keeps the payload to roughly 60 kB instead of loading the Devanagari range.

| Use | Family | Fallback |
| --- | --- | --- |
| Display and headings | Poppins | Poppins, DM Sans Variable, system-ui, sans-serif |
| Body, labels, UI | DM Sans Variable | DM Sans, system-ui, sans-serif |

Poppins is the official title face. Gilroy is the official body face but is proprietary, so DM Sans is the documented substitute: it is a self-hosted geometric sans with a close weight and rhythm match.

Headings: weight 500, tight negative tracking, line-height near 1. Body: 400, line-height 1.6. Paragraphs use `text-wrap: pretty`; headings use `text-wrap: balance`.

### Type styles

Defined as component classes in `src/styles/index.css`:

| Class | Size | Line height | Tracking | Typical use |
| --- | --- | --- | --- | --- |
| `display-hero` | `clamp(3.35rem, 11.2vw, 10.5rem)` | 0.86 | -0.055em | Reserved for the largest statement |
| `display-xl` | `clamp(2.6rem, 6.6vw, 5.75rem)` | 0.92 | -0.045em | Page and section headlines |
| `display-lg` | `clamp(2.1rem, 4.6vw, 3.9rem)` | 0.98 | -0.04em | Subsection headlines |
| `display-md` | `clamp(1.65rem, 3vw, 2.5rem)` | 1.04 | -0.035em | Card and feature titles |
| `lede` | `clamp(1.05rem, 1.6vw, 1.35rem)` | 1.5 | -0.015em | Introductory paragraph |
| `body-copy` | 0.95rem | 1.7 | normal | Standard prose |
| `eyebrow` | 0.6875rem | 1.2 | 0.18em, uppercase | Section labels with Steel Pink square marker |
| `field-label` | 0.75rem | — | 0.1em, uppercase | Form labels |

The root also defines `--text-xs` through `--text-5xl` for documentation and future use. Components mostly use Tailwind sizes plus the display classes.

### Editorial devices

- `eyebrow` includes a small Steel Pink square via `::before`; `eyebrow--bordered` swaps it for a 1.6rem rule.
- `vertical-label` runs a small label vertically for marginal notes.
- Chapter numbers use Poppins, tabular numerals, low opacity.
- Kinetic headlines split into masked lines (`mask-line` + `[data-kinetic-line]`).

## 4. Layout and spacing

| Token | Value |
| --- | --- |
| `.container-editorial` max width | 92rem (`1472px`) |
| `.container-editorial` padding | `clamp(1.25rem, 4vw, 4.5rem)` |
| `.container-narrow` max width | 58rem |
| `.section` padding block | `clamp(5rem, 11vw, 10.5rem)` |
| `.section-tight` padding block | `clamp(3.5rem, 7vw, 6rem)` |
| Header height | `4.75rem` |
| Scroll padding top | header + 1.5rem |
| Base grid | 12 columns at `lg` (1024px) |
| Tailwind breakpoints | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 |

Spacing uses Tailwind's 4px base scale plus `gutter` and `section` custom values. Common patterns:

- Section heading in an 8/4 split at `lg`.
- Content in 7/5 or 8/4 splits; sidebars are sticky at `lg:top-28`.
- Cards use `gap-4`; large editorial blocks use `gap-8` to `gap-10`.
- Related cards may be offset vertically (`lg:mt-8`, `lg:mt-16`) to break the grid without breaking reading order.

Radii:

| Token | Value | Use |
| --- | --- | --- |
| `rounded-card` | 1.25rem (20px) | Cards and panels |
| `rounded-pill` | 999px | Buttons, chips, badges |
| `rounded-2xl` | 1rem (16px) | Larger panels and photo frames |

Surfaces are border-led, not shadow-led:

- Default card: `paper` background, `1px solid forest/12`, radius 20px (`.card-surface`).
- Dark card: `ivory/4` background with `ivory/16` border.
- Hover: border strengthens, optional `0 18px 40px -30px rgba(13,6,36,0.55)`.
- Hairlines: `forest/15` on light, `ivory/18` on dark.

## 5. Components

### Buttons

`Button` and `ButtonLink` share the same base: pill shape, `min-height: 3rem` (48px), 1.5rem horizontal padding, 14px medium text, 300ms editorial transition, optional arrow that translates on hover.

| Variant | Light surfaces | Notes |
| --- | --- | --- |
| `primary` | Dark Purple background, ivory text, hover ink | Default CTA |
| `lime` | Blush background with Steel Pink border, Dark Purple text, hover ivory | High-emphasis accent, especially on dark |
| `outline` | Forest border and text, fills forest on hover | Secondary CTA |
| `light` | Ivory border/text on dark, inverts on hover | Dark sections |
| `ghost` | Text only, faint forest wash on hover | Tertiary actions |

Disabled state: 55% opacity, no pointer events. Active state: 1px downward shift.

### Badges

Pill, 10px semibold uppercase, 0.14em tracking. Variants: `lime`, `outline`, `dark`, `soft`. The `lime` badge uses a blush fill with a Steel Pink border and Dark Purple text. Use badges for live status only — open calls, active editions, current category — never as decoration.

### Cards

`.card-surface` plus internal flex column: label row, number or icon, display title, body copy, divider, action. Card titles use `display-md`; body copy is 14px at forest/65.

### Link treatments

- `link-underline`: animated 1px underline scaling from right to left on hover/focus.
- Inline arrows (Lucide `ArrowUpRight`) move 2px up/right on group hover.
- External links must include `rel="noopener noreferrer"`.

### Forms

- `field-input`: minimum 48px height, paper background, forest/24 border, 0.65rem radius.
- Focus: Dark Purple border plus 3px Steel Pink ring.
- Invalid: `#A33A2A` border and 12% red ring, paired with text error and `aria-invalid`.
- Labels always visible; placeholders are never the only label.
- Required fields marked with a Duke Blue asterisk and `required` semantics.
- Success panels use `role="status"` and `aria-live="polite"`.

### Navigation

- Header is sticky, ivory with a hairline border.
- Desktop links expose a hover/focus state and current-route indication.
- Mobile navigation is a full-screen panel with focus trap, Escape to close, and focus returned to the trigger.
- Skip link is visually hidden until focused.

### Accordion

Native button plus controlled panel. Each trigger exposes `aria-expanded` and `aria-controls`; panels are labelled by their trigger. Chevron rotation is the only animation.

### Photography

`PhotoPlate` frames images with editorial captions, index labels and a subtle grain or duotone treatment. Alt text is always specific. Brand-guidelines photography is credited in the interface where used.

### Graphics

- `OrbitalAtlas` is an original SVG composition: five practice orbits around a central loop, with labels positioned at percentage coordinates.
- `editorial-grid` adds vertical column rules behind sections.
- `grain` adds a low-opacity SVG noise layer; it is decorative and `aria-hidden`.

## 6. Motion

Motion is implemented with GSAP + ScrollTrigger for scroll entrances and Framer Motion for route transitions. There is no scroll hijacking, no pinned scrollytelling and no animation that blocks reading.

### Tokens

| Token | Value |
| --- | --- |
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur-fast` | 180ms |
| `--dur-mid` | 320ms |
| `--dur-slow` | 640ms |

### Patterns

| Pattern | Specification |
| --- | --- |
| `Reveal` | opacity 0→1, y 26→0, 0.9s, `power3.out`, trigger at `top 88%`, once |
| `KineticHeading` | yPercent 115→0, rotate 1.5→0, 1.05s, `power4.out`, 85ms stagger, masked lines |
| Route transition | opacity 0.35→1, 0.35s ease-out |
| Ticker | 34s linear infinite marquee, duplicated content, pauses under reduced motion |
| Pulse ring | 3.2s, scale 0.9→1.4 with fading opacity |
| Ambient drift | 9s ease-in-out vertical translation |
| Hover transitions | 200–300ms, editorial easing |

### Reduced motion

`prefers-reduced-motion: reduce`:

- disables smooth scrolling;
- collapses all animation and transition durations to 0.001ms;
- stops the marquee;
- prevents GSAP timelines from starting;
- removes the custom cursor.

Content is visible by default in the DOM and only hidden by GSAP after hydration, so no-JS and reduced-motion users never see blank sections.

### Cursor

The custom cursor appears only when `(pointer: fine)` and motion is allowed. It keeps a precise Steel Pink dot and adds a trailing ring that grows over interactive elements. The native cursor is hidden only under the same conditions. Touch and reduced-motion users get the normal cursor.

## 7. Accessibility standards

- WCAG 2.2 AA is the target.
- One `h1` per page; heading order is not skipped.
- Landmarks: header, nav, main, footer; skip link targets `#main`.
- Focus ring: 2px solid, 3px offset, Dark Purple on light and light pink `#E879F9` on dark.
- Interactive targets: buttons 48px high; chips at least 36px; inline links have generous padding where possible.
- Images have descriptive alt text; decorative SVG and grain are hidden from assistive technology.
- Status messages use live regions.
- Errors are text, not colour alone, and focus moves to the first invalid field.
- Mobile menu handles focus trap, Escape and focus return.
- Motion respects the OS setting.
- Content remains available with JavaScript disabled (a `<noscript>` message is provided).

## 8. Content design

- Use sentence case for headings; uppercase only for eyebrows, labels and small metadata.
- Numbers appear as two-digit archival indices (`01`, `02`).
- Prefer specific nouns and active verbs over institutional abstraction.
- State limits explicitly: “published on completion”, “available on request”, “current openings”.
- Never invent a name, date, figure, partner or credential to fill a layout.
- A designed empty state is better than fabricated content.

## 9. Do and do not

**Do**

- Use the established tokens and component classes.
- Keep one clear primary action per section.
- Pair every statistic with a source and date before publishing it.
- Test at 360, 390, 768, 1024, 1440 and 1920px.
- Preserve visible focus and reading order when adding motion.

**Do not**

- Add raw hex colours or new grey scales to components.
- Put Steel Pink text on ivory or paper.
- Use gradients, glass effects or floating dashboard cards.
- Animate layout properties or hijack scroll.
- Claim a result, partnership or credential that has not been verified.
- Add a new font family or icon style.

## 11. Official brand alignment

The site is built on the official AfriYouth identity from the brand guidelines and the organisational profile. The palette, typography and figure mark are applied across every page and the Figma builder.

| Element | Applied implementation |
| --- | --- |
| Primary ink and dark surfaces | Dark Purple `#0D0624` |
| Accent | Steel Pink `#C723DF` |
| Secondary accent | Duke Blue `#0301FF` |
| Deep supporting blue | Blue `#0200A7` |
| Page and card surfaces | Ivory `#F7F5FB`, White `#FFFFFF` |
| Headings | Poppins |
| Body | DM Sans Variable — documented substitute for Gilroy |
| Logo | The raised-hands figure mark extracted from the brand guidelines, paired with the typographic wordmark |
| `theme-color` | `#0D0624` |
| Social card | `public/og-image.png`, 1200×630, built on the official palette |

Two accommodations keep the identity accessible without changing it:

- **Filled pink surfaces use blush.** Steel Pink with white or dark text cannot reach AA at text sizes, so filled buttons, badges and highlights use the `#FAE8FD` blush tint with Dark Purple text, while Steel Pink carries the border and marker.
- **Pink text on dark resolves to `#E879F9`.** Inside `.on-dark`, the accent token is lightened so pink labels and focus rings clear contrast on Dark Purple. Official Steel Pink is still the visible accent on light surfaces.

The official tagline, "Fueling Innovators for Sustainable Development", appears in the footer and metadata; the six official brand keywords are carried as `site.brandPillars`; and the wordmark is set in Poppins, not redrawn.

When changing brand colour, edit the RGB channel values in `src/styles/index.css` and the matching tokens in `figma-plugin/src/00-core.js`. Because component classes use semantic slot names, no component needs editing.

## 12. Where the system lives

| Concern | File |
| --- | --- |
| Colour, type, spacing, focus, motion tokens | `src/styles/index.css` |
| Tailwind token mapping | `tailwind.config.js` |
| Buttons | `src/components/ui/Button.tsx` |
| Badges | `src/components/ui/Badge.tsx` |
| Section headings | `src/components/ui/SectionHeading.tsx` |
| Page heroes | `src/components/ui/PageHero.tsx` |
| Motion primitives | `src/components/motion/` |
| Cursor | `src/components/ui/CursorFollower.tsx` |
| GSAP registration | `src/lib/gsap.ts` |
