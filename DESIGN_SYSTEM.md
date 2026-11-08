# Design System

The visual language is **contemporary African editorial practice crossed with an experimental innovation lab**: oversized type, visible grid lines, precise hairlines, generous negative space, archival numbering, one electric accent, and photography treated as documentary material rather than decoration.

The system avoids the generic nonprofit look (soft gradients, rounded cards everywhere, stock smiling children) and the generic AI-dashboard look (glassmorphism, neon purple, floating metric cards).

## 1. Principles

1. **Editorial before decorative.** Layout, hierarchy and typography carry the identity. Ornament is restrained.
2. **Evidence made visible.** Numbered chapters, captions, sources and status labels are part of the aesthetic.
3. **Honest states are designed states.** Empty, pending and prototype states get the same care as finished content.
4. **One accent, used with intent.** Lime marks attention, action and data. It is never a background wash for whole pages.
5. **Motion reveals structure.** Animation clarifies hierarchy and sequence. It never delays access to content or hijacks scrolling.
6. **Accessible by construction.** Contrast, focus, target size, semantics and reduced motion are system defaults, not patches.

## 2. Colour

Colour is defined once in `src/styles/index.css` as RGB channel variables, then exposed to Tailwind in `tailwind.config.js`. Components use token classes such as `bg-forest`, `text-lime/70`, `border-forest/15`. Do not introduce raw hex values in components.

| Token | Value | Hex | Role |
| --- | --- | --- | --- |
| `forest` | `21 61 50` | `#153D32` | Primary ink, dark sections, primary buttons |
| `ink` | `23 27 24` | `#171B18` | Hover/darkest text, near-black contrast |
| `lime` | `201 243 106` | `#C9F36A` | Accent, active states, data marks, CTA panel |
| `ivory` | `245 243 235` | `#F5F3EB` | Page background |
| `sage` | `220 230 219` | `#DCE6DB` | Quiet panels, supporting surfaces |
| `paper` | `255 255 255` | `#FFFFFF` | Cards and form fields |
| `clay` | `196 115 76` | `#C4734C` | Secondary marker, required-field asterisk, ticker dot |

Support colours:

- Error border `#A33A2A`, error text `#8F2F20`.
- Focus ring: `#153D32` on light surfaces, `#C9F36A` inside `.on-dark`.
- Text muting is achieved with forest/ivory plus opacity, typically `/35`, `/45`, `/55`, `/65`, `/70`, `/75`.

Rules:

- Default page background is ivory, not white.
- Dark sections use forest with ivory text and the `.on-dark` class so focus and hairline colours switch correctly.
- Lime is reserved for emphasis. A typical page has one lime moment, not five.
- Never place lime text on ivory. Lime text is only for dark backgrounds.
- Use opacity for secondary text rather than adding new grey tokens.

## 3. Typography

Self-hosted variable fonts via Fontsource. No external font requests.

| Use | Family | Fallback |
| --- | --- | --- |
| Display and headings | Space Grotesk Variable | Space Grotesk, system-ui, sans-serif |
| Body, labels, UI | DM Sans Variable | DM Sans, system-ui, sans-serif |

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
| `eyebrow` | 0.6875rem | 1.2 | 0.18em, uppercase | Section labels with lime square marker |
| `field-label` | 0.75rem | — | 0.1em, uppercase | Form labels |

The root also defines `--text-xs` through `--text-5xl` for documentation and future use. Components mostly use Tailwind sizes plus the display classes.

### Editorial devices

- `eyebrow` includes a small lime square via `::before`; `eyebrow--bordered` swaps it for a 1.6rem rule.
- `vertical-label` runs a small label vertically for marginal notes.
- Chapter numbers use Space Grotesk, tabular numerals, low opacity.
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
- Hover: border strengthens, optional `0 18px 40px -30px rgba(21,61,50,0.55)`.
- Hairlines: `forest/15` on light, `ivory/18` on dark.

## 5. Components

### Buttons

`Button` and `ButtonLink` share the same base: pill shape, `min-height: 3rem` (48px), 1.5rem horizontal padding, 14px medium text, 300ms editorial transition, optional arrow that translates on hover.

| Variant | Light surfaces | Notes |
| --- | --- | --- |
| `primary` | Forest background, ivory text, hover ink | Default CTA |
| `lime` | Lime background, forest text, hover ivory | High-emphasis on dark |
| `outline` | Forest border and text, fills forest on hover | Secondary CTA |
| `light` | Ivory border/text on dark, inverts on hover | Dark sections |
| `ghost` | Text only, faint forest wash on hover | Tertiary actions |

Disabled state: 55% opacity, no pointer events. Active state: 1px downward shift.

### Badges

Pill, 10px semibold uppercase, 0.14em tracking. Variants: `lime`, `outline`, `dark`, `soft`, `provisional`. The provisional variant uses a sage wash and a clay dot to signal unverified content. Use it consistently for pending states.

### Cards

`.card-surface` plus internal flex column: label row, number or icon, display title, body copy, divider, action. Card titles use `display-md`; body copy is 14px at forest/65.

### Link treatments

- `link-underline`: animated 1px underline scaling from right to left on hover/focus.
- Inline arrows (Lucide `ArrowUpRight`) move 2px up/right on group hover.
- External links must include `rel="noopener noreferrer"`.

### Forms

- `field-input`: minimum 48px height, paper background, forest/24 border, 0.65rem radius.
- Focus: forest border plus 3px lime ring.
- Invalid: `#A33A2A` border and 12% red ring, paired with text error and `aria-invalid`.
- Labels always visible; placeholders are never the only label.
- Required fields marked with a clay asterisk and `required` semantics.
- Success panels use `role="status"` and `aria-live="polite"`.

### Navigation

- Header is sticky, ivory with a hairline border.
- Desktop links expose a hover/focus state and current-route indication.
- Mobile navigation is a full-screen panel with focus trap, Escape to close, and focus returned to the trigger.
- Skip link is visually hidden until focused.

### Accordion

Native button plus controlled panel. Each trigger exposes `aria-expanded` and `aria-controls`; panels are labelled by their trigger. Chevron rotation is the only animation.

### Photography

`PhotoPlate` frames images with editorial captions, index labels and a subtle grain or duotone treatment. Alt text is always specific. Placeholder photos are credited in the interface where used.

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

The custom cursor appears only when `(pointer: fine)` and motion is allowed. It keeps a precise lime dot and adds a trailing ring that grows over interactive elements. The native cursor is hidden only under the same conditions. Touch and reduced-motion users get the normal cursor.

## 7. Accessibility standards

- WCAG 2.2 AA is the target.
- One `h1` per page; heading order is not skipped.
- Landmarks: header, nav, main, footer; skip link targets `#main`.
- Focus ring: 2px solid, 3px offset, lime on dark.
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
- State limits explicitly: “not yet published”, “prototype only”, “pending verification”.
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
- Put lime text on ivory or paper.
- Use gradients, glass effects or floating dashboard cards.
- Animate layout properties or hijack scroll.
- Claim an effect that is still a prototype state.
- Add a new font family or icon style.

## 10. Where the system lives

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
