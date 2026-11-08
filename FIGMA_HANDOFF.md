# Figma Handoff

## Status

**No Figma file exists yet.** The challenge requires editable Figma designs at 1440, 768 and 390px, and this document does not substitute for that deliverable. It is a build-ready specification so a designer can produce the file without re-deciding the system.

The implemented site is the source of truth for content, tokens and interaction. If the Figma file and the site disagree, either update the Figma file or update the code deliberately — do not let them drift.

Required deadline from the challenge brief: **21 November 2026**. Create and share the file before submission, then add the real link to `README.md` and to the submission pack.

## 1. File setup

Create a Figma file named:

```
AfriYouth Innovation Labs — Website Design System & Prototype
```

Suggested pages:

| Page | Contents |
| --- | --- |
| `00 Cover` | Project name, challenge, date, status, contents |
| `01 Foundations` | Variables, colour, type, spacing, grids, effects |
| `02 Components` | Component library with variants and states |
| `03 Desktop` | 1440px frames |
| `04 Tablet` | 768px frames |
| `05 Mobile` | 390px frames |
| `06 Prototype` | Flows and annotations |
| `07 Handoff` | Content status, pending data, motion, accessibility notes |

Set the file to **anyone with the link can view** for judging, and keep edit access with the project team.

## 2. Variables

Create one variable collection called `AfriYouth / Core`.

### Colour

| Variable | Hex | Usage |
| --- | --- | --- |
| `color/forest` | `#153D32` | Primary text, dark surfaces, primary button |
| `color/ink` | `#171B18` | Hover/darkest text |
| `color/lime` | `#C9F36A` | Accent, active states, dark-section CTA |
| `color/ivory` | `#F5F3EB` | Page background |
| `color/sage` | `#DCE6DB` | Quiet panels |
| `color/paper` | `#FFFFFF` | Cards, fields |
| `color/clay` | `#C4734C` | Secondary marker, required asterisk |
| `color/error` | `#A33A2A` | Invalid field border |
| `color/error-text` | `#8F2F20` | Error copy |

Create opacity-based text styles rather than new grey variables: forest at 35%, 45%, 55%, 65%, 70%, 75%.

### Spacing, radius and motion

| Variable | Value |
| --- | --- |
| `space/1` … `space/24` | 4px base scale (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96…) |
| `radius/card` | 20px |
| `radius/panel` | 16px |
| `radius/pill` | 999px |
| `motion/fast` | 180ms |
| `motion/mid` | 320ms |
| `motion/slow` | 640ms |
| `motion/ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` |

## 3. Text styles

| Style | Family | Size at 1440 | Size at 768 | Size at 390 | Line height | Tracking |
| --- | --- | --- | --- | --- | --- | --- |
| `display/hero` | Space Grotesk 500 | ~112px | ~60px | ~50px | 0.87 | -6% |
| `display/xl` | Space Grotesk 500 | ~92px | ~51px | ~42px | 0.92 | -4.5% |
| `display/lg` | Space Grotesk 500 | ~62px | ~35px | ~34px | 0.98 | -4% |
| `display/md` | Space Grotesk 500 | 40px | 23px | 26px | 1.04 | -3.5% |
| `body/lede` | DM Sans 400 | ~19–22px | ~18px | ~17px | 1.5 | -1.5% |
| `body/base` | DM Sans 400 | 16px | 16px | 16px | 1.6 | 0 |
| `body/small` | DM Sans 400 | 14px | 14px | 14px | 1.7 | 0 |
| `label/eyebrow` | DM Sans 600 | 11px | 11px | 11px | 1.2 | +18%, uppercase |
| `label/field` | DM Sans 600 | 12px | 12px | 12px | 1.2 | +10%, uppercase |
| `label/meta` | DM Sans 500 | 10px | 10px | 10px | 1.2 | +14–18%, uppercase |
| `number/index` | Space Grotesk 500 | 12–40px | scaled | scaled | 1 | +12–14%, tabular |

Headline weights are 500, not bold. Negative tracking is essential to the identity.

## 4. Grid and responsive frames

### Desktop — 1440

- Frame width 1440, content max 1472.
- Horizontal page padding ~58px (4vw at 1440, capped at 72).
- 12 columns, 32px gutter.
- Section vertical padding ~158px (11vw at 1440, capped at 168).
- Header height 76px.
- Card gaps 16px; editorial split gaps 32px.

### Tablet — 768

- Frame width 768.
- Horizontal padding ~31px (4vw).
- 8 columns, 24–32px gutter.
- Section vertical padding ~85px (11vw).
- Main editorial headlines reduce to the `display/xl` / `display/lg` tablet sizes.
- Two-column card grids become two columns where space allows; forms remain two columns only above `sm` (640px).

### Mobile — 390

- Frame width 390.
- Horizontal padding 20px.
- Single column. Card grids stack with 16px gaps.
- Section vertical padding 80px.
- Header 76px; mobile menu is a full-screen overlay.
- Body copy stays 16px for readability.

Also include one 1920-wide homepage frame as a wide-screen reference, even though the specified design frames are 1440/768/390.

## 5. Page frames

Design every route at all three widths. Add state frames where the interaction changes the layout.

### Home — 1440 / 768 / 390

The 15 required homepage elements map to these bands:

1. **Header** — wordmark, five nav links, CTA, mobile trigger.
2. **Hero** — seven-area eyebrow, “Evidence. Innovation. African futures.”, intro, two CTAs, metadata row, orbital atlas.
3. **Ticker** — six practice phrases in a marquee rule.
4. **Introduction** — editorial 5/6 split, purpose statement, photo plate, lime loop note, four relationship rows.
5. **Mission & vision** — forest band, verified mission as the main statement, vision and link, six brand pillars.
6. **Approach** — orbital map with five nodes, practice labels and outputs.
7. **Areas of work** — heading plus seven cards: research, policy, innovation, entrepreneurship, professional development, foresight, impact measurement.
8. **Programs** — verified board preview / empty state.
9. **Insights** — three-card editorial preview with photo.
10. **Impact** — four measurement dimensions and one honest statement.
11. **Pathways** — three audience cards: young people, organizations, institutions.
12. **Closing CTA** — partnership and get-involved actions plus contact link.
13. **Footer** — three link groups, wordmark, provisional notice.

Frame states: default; mobile menu open; reduced-motion note (annotation only).

### About — 1440 / 768 / 390

- Page hero: chapter 01, “A research and innovation institution for African futures.”
- Sticky chapter index and purpose narrative.
- Placeholder photo plate.
- Mission / vision cards (brief-verified).
- Six brand pillars.
- Five principles.
- People and governance pending state.
- Partnership and accountability statements.
- Closing CTA.

### What We Do — 1440 / 768 / 390

- Page hero: chapter 02, all seven areas named.
- Sticky area index.
- Seven long-form practice sections, each with number, icon, title, tagline, summary, two paragraphs, capabilities, question and formats.
- Process strip with five steps.
- Commission CTA.

### Programs — 1440 / 768 / 390

- Page hero: chapter 03, board status metadata.
- Board toolbar: search, status chips, category chips, result count, reset.
- **Empty state** (current): “No opportunities are published yet.”
- Filtered-empty state.
- Populated listing card: category, status, title, summary, deadline, format, eligibility, application action.
- “How listings work” field explanations.
- Register-interest CTA.

### Insights — 1440 / 768 / 390

- Page hero: chapter 04, provisional editorial notice.
- Search, category filters, result count.
- Featured article with photo plate.
- Article grid.
- Filtered-empty state.
- Contribute CTA.

### Insight detail — 1440 / 768 / 390

- Breadcrumb, category and provisional badges.
- Display headline, excerpt, kind, reading time, edition.
- Photo plate and article body.
- Pull quote.
- Related articles.
- CTA.

### Impact — 1440 / 768 / 390

- Page hero: chapter 05, no figures shown.
- Four dimensions.
- Five-stage measurement loop.
- Public ledger with “Not yet published” rows.
- Five commitments.
- FAQ accordion.
- Accountability CTA.

### Get Involved — 1440 / 768 / 390

- Page hero: chapter 06.
- Three ways in.
- Interest form: fields, notice, validation errors, success state.
- For-institutions panel.

### Partner With Us — 1440 / 768 / 390

- Page hero: chapter 07.
- Five collaboration models.
- Five partner audiences.
- Five-step process.
- Scoping questions.
- Partner form and FAQ.
- CTA.

### Contact — 1440 / 768 / 390

- Page hero: chapter 08.
- Three pending channels: email, telephone, office.
- Contact status and social panels.
- Contact form and FAQ.
- Partnership enquiry CTA.

### 404 — 1440 / 768 / 390

- Chapter marker, clear message, routes back to home, work and contact.

## 6. Component library

Build each as a Figma component with variants and states. Use auto layout and variable bindings throughout.

| Component | Variants / states |
| --- | --- |
| `Button` | primary, lime, outline, light, ghost; default, hover, focus, disabled; arrow on/off |
| `Badge` | lime, outline, dark, soft, provisional; with/without dot |
| `Header` | desktop, mobile; default, menu open, scrolled |
| `Footer` | desktop, tablet, mobile |
| `Page hero` | light, dark |
| `Section heading` | with/without intro, with/without action, light/dark |
| `Area card` | default, hover |
| `Insight card` | default, hover; with/without image |
| `Program card` | open, upcoming, closed |
| `Pathway card` | lime, paper, offset |
| `Pending panel` | default |
| `Form field` | text, email, select, textarea, checkbox; default, focus, error, filled |
| `Filter chip` | default, selected |
| `Accordion item` | closed, open, focus |
| `Photo plate` | three crop/treatment variants |
| `Orbital atlas` | static graphic with labelled nodes |
| `Ticker` | static frame and motion note |
| `CTA panel` | lime, forest, light |
| `Empty state` | program, filtered, editorial |
| `Breadcrumb` | page, article |
| `Skip link` | hidden, focused |
| `Cursor accent` | dot, hover ring (annotation only) |

Naming convention:

```
Component / Variant / State
Page / Section / Width
```

Examples: `Button / Primary / Hover`, `Home / Hero / Desktop`.

## 7. Prototype flows

Connect these flows in the `06 Prototype` page:

1. Home → Explore our work → What We Do.
2. Home → Find opportunities → Programs.
3. Header/footer navigation across all nine pages.
4. Area card → What We Do anchor.
5. Program filters → empty/filtered states.
6. Insight card → article detail → related article.
7. Home pathways → Programs / Get Involved / Partner With Us.
8. Closing CTA → Partner With Us and Get Involved.
9. Contact link → Contact.
10. Mobile menu → open, navigate, close.
11. Form submit → validation error state → success state.
12. Invalid route → 404.

Use Smart Animate only where it approximates the code:

- masked headline reveal: 1050ms, editorial easing, 85ms stagger;
- content reveal: 900ms, 26px rise;
- route fade: 350ms;
- menu open/close: 250–300ms;
- hover states: 200–300ms.

Do not prototype scroll hijacking or long introductory animation. The first screen must be immediately readable.

## 8. Content annotations

Every provisional or pending element in Figma must carry an annotation matching the site:

- “Brief-verified” — mission, vision, positioning, six pillars, seven areas.
- “Provisional editorial” — essays, service descriptions, process copy, FAQs.
- “Pending verification” — contact details, social accounts, people, partners, programmes, impact figures.
- “Prototype behaviour” — forms that validate locally and send nothing.

Do not add lorem ipsum as a final state, and do not invent names, logos, figures, deadlines or testimonials to make a frame look fuller. Use the real pending states from the site.

## 9. Accessibility annotations

Add notes for each page:

- reading order and heading level;
- alt text for every image;
- focus order and visible focus ring;
- keyboard behaviour for menu, accordion, filters and forms;
- target sizes (buttons 48px high, chips at least 36px);
- contrast pairs (forest on ivory, ivory on forest, forest on lime);
- reduced-motion behaviour;
- error text and focus management on submit.

Use the Figma “Stark” or built-in contrast tools to verify key pairs, but also confirm against the implemented CSS.

## 10. Remaining manual steps

1. Create the Figma file and the seven pages above.
2. Add the Core variable collection and text styles.
3. Build the component library with variants.
4. Lay out all nine pages plus article detail and 404 at 1440, 768 and 390.
5. Add empty, error, success and mobile-menu state frames.
6. Connect the prototype flows.
7. Add content and accessibility annotations.
8. Review at 100% zoom for type overflow and at each width for reflow.
9. Share the file with view access and copy the URL.
10. Replace the “No Figma file exists yet” status in this document and `README.md` with the verified link and date.

Until step 10 is complete, do not describe the Figma deliverable as finished.

## 11. Frame checklist

- [ ] Cover and contents.
- [ ] Foundations page with variables and type styles.
- [ ] Component library with all variants.
- [ ] Home at 1440, 768, 390.
- [ ] About at 1440, 768, 390.
- [ ] What We Do at 1440, 768, 390.
- [ ] Programs at 1440, 768, 390, including empty state.
- [ ] Insights at 1440, 768, 390, including filtered empty.
- [ ] Insight detail at 1440, 768, 390.
- [ ] Impact at 1440, 768, 390.
- [ ] Get Involved at 1440, 768, 390, including form states.
- [ ] Partner With Us at 1440, 768, 390.
- [ ] Contact at 1440, 768, 390.
- [ ] 404 at 1440, 768, 390.
- [ ] Mobile menu open state.
- [ ] Prototype flows connected.
- [ ] Pending/provisional annotations present.
- [ ] Accessibility annotations present.
- [ ] Real share link added to this file and `README.md`.
