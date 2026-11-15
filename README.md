# AfriYouth Innovation Labs — Digital Experience

A production-oriented marketing and institutional website for **AfriYouth Innovation Labs**.

The site positions AfriYouth as a research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals. Content follows the official organisational profile across five strategic divisions and eight practices, with the Evidence-to-Impact Accelerator presented as the flagship model.

## Current status

- Functional single-page application with nine public pages plus article detail and 404 routes.
- Mission, vision, positioning, divisions, services, philosophy and brand pillars follow the official organisational profile. Language not supported by that profile has been removed rather than combined with it.
- Official programme calls appear on the opportunity board as they open. Direct contact channels, named partnerships and impact figures are published only when they are confirmed and attributable.
- Forms validate in the browser and open a pre-addressed email draft in the visitor's mail client. The site does not store or transmit form data itself.
- Photography is the brand-guidelines image set, credited in the interface.
- The Figma file at <https://www.figma.com/design/5YQSVaTK1ssRXYhUaQCRbQ/AfriYouth-Innovation-Labs---Website-Design-System---Prototype> is built by the runnable local plugin in [`figma-plugin/`](figma-plugin/README.md). It has not yet been executed inside Figma from this environment, so the file still needs one run and a visual review; see [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md).
- The official brand system is applied: Dark Purple `#0D0624`, Steel Pink `#C723DF`, Duke Blue `#0301FF`, Blue `#0200A7`, Poppins headings, DM Sans body (documented substitute for proprietary Gilroy) and the raised-hands figure mark extracted from the brand guidelines.
- A public production URL has not been verified yet. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Official source documents

Content is aligned to two supplied documents:

| Document | Governs |
| --- | --- |
| AfriYouth Innovation Labs organisational profile | Mission, vision, positioning, five strategic divisions, products and services, philosophy, competitive advantage |
| AfriYouth Innovation Lab brand guidelines | Logo usage, official colours, typography, photography direction, tone of voice |

Where the older brand-guideline mission and vision wording conflicts with the newer organisational profile, the profile is authoritative and the conflicting text is not reused.

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | React 18.3 |
| Language | TypeScript 5.6 |
| Build tool | Vite 6 |
| Routing | React Router 6 (lazy routes) |
| Styling | Tailwind CSS 3.4 with CSS-variable design tokens |
| Motion | GSAP 3.12 + ScrollTrigger, Framer Motion 11 |
| Icons | Lucide React |
| Fonts | Poppins (headings), DM Sans Variable (body, Gilroy substitute), self-hosted via Fontsource |
| Hosting target | Vercel static deployment with SPA rewrites |

The site is a static front end. There is no backend, database, authentication layer or third-party API integration; enquiry forms hand off to the visitor's mail client.

## Quick start

Requirements: Node.js 20 or newer, npm 10 or newer.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

```bash
npm run typecheck   # TypeScript, no emit
npm run build       # typecheck + production bundle in dist/
npm run preview     # serve the production bundle locally
```

No environment variables are required.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/about` | About and brand pillars |
| `/what-we-do` | Five divisions, eight practices and the Evidence-to-Impact Accelerator |
| `/programs` | Opportunity board with search, status and category filters |
| `/insights` | AfriYouth perspectives and publication structure |
| `/insights/:slug` | Article detail |
| `/impact` | Measurement approach and public reporting categories |
| `/get-involved` | Audience pathways and interest form |
| `/partner-with-us` | Collaboration models and partner form |
| `/contact` | Contact channels and enquiry form |
| any other path | Accessible 404 page |

## Project structure

```text
src/
  components/
    forms/        Contact, interest and partner forms
    graphics/     Orbital atlas, photo plates, portrait plates
    layout/       Site layout and footer
    motion/       Reveal, KineticHeading, MaskReveal
    navigation/   Header, mobile navigation, brand
    sections/     Homepage and shared page sections
    ui/           Buttons, badges, fields, filters, empty states
  content/        Centralized typed content and SEO metadata
  hooks/          Page metadata, reduced motion, media queries, forms
  lib/            Class-name helper and GSAP setup
  pages/          Route-level page components
  styles/         Design tokens and global CSS
public/
  photos/         Brand-guidelines photography
  robots.txt
  sitemap.xml
```

## Content and data

All organizational content is centralized in `src/content/`. See [CONTENT_INTEGRATION.md](CONTENT_INTEGRATION.md) for the replacement guide.

Key files:

- `site.ts` — name, tagline, positioning, mission, vision, philosophy, divisions, brand pillars, navigation, contact configuration.
- `areas.ts` — the eight practice cards (five divisions plus the Policy Innovation Challenge, Impact & Learning and Funding & Investment Readiness) and the connected-approach nodes.
- `programs.ts` — opportunity listings (empty until a call opens).
- `insights.ts` — AfriYouth perspectives.
- `impact.ts` — measurement framework and reporting categories.
- `partners.ts` — collaboration models (no named partners).
- `photos.ts` — photo sources, alt text, credits and dimensions.
- `seo.ts` — per-page titles and descriptions.

## Forms

The three forms use `src/hooks/useEnquiryForm.ts`. They validate input, show accessible errors, focus the first invalid field, expose a submitting state and then open a pre-addressed email draft in the visitor's mail client. No form data is stored or transmitted by the site.

Set `site.contact.email` in `src/content/site.ts` to the official address. If it is `null`, the forms show an honest "channel being configured" state instead of opening a draft.

## Accessibility and motion

- Semantic landmarks, one `h1` per page, skip link and visible focus indicators.
- Mobile navigation traps focus, closes on Escape and returns focus to the trigger.
- `prefers-reduced-motion` is respected throughout; content remains available without animation.
- The custom cursor is limited to fine pointers and motion-safe users.
- Images include descriptive alt text; decorative graphics are hidden from assistive technology.

## Documentation

- [INSTALLATION.md](INSTALLATION.md) — local setup and commands.
- [DEPLOYMENT.md](DEPLOYMENT.md) — Vercel deployment and post-deploy checklist.
- [CONTENT_INTEGRATION.md](CONTENT_INTEGRATION.md) — updating content and contact details.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — tokens, typography, components and motion rules.
- [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md) — Figma builder, page map, design specification and remaining steps.
- [ASSET_CREDITS.md](ASSET_CREDITS.md) — photography, font and library licensing.

## Known limitations

- The official organisational profile supplies mission, vision, positioning, divisions, services and philosophy. Programme calls, people, named partnerships, impact figures and direct contact details are published as they are confirmed.
- Forms hand off to the visitor's mail client and require `site.contact.email` to be set to the official address.
- Photography is brand-guidelines imagery, not photographs of AfriYouth staff, partners or participants.
- The editable Figma deliverable is generated by the local builder plugin in `figma-plugin/`; it needs one in-Figma run plus a visual review. See [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md).
- The official brand system is applied across the site and the Figma builder: brand colours, Poppins/DM Sans typography and the supplied raised-hands figure mark. Gilroy is proprietary, so DM Sans is the documented substitute. See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md#11-official-brand-alignment).
- No production URL has been verified.
- `public/sitemap.xml` and `public/robots.txt` use the intended Vercel host and must be updated after the real deployment URL is confirmed.

## Credits

Photography is supplied in the AfriYouth brand guidelines. Fonts are licensed under the SIL Open Font License. See [ASSET_CREDITS.md](ASSET_CREDITS.md).
