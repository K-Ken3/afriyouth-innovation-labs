# AfriYouth Innovation Labs — Digital Experience

A production-oriented marketing and institutional website prototype for **AfriYouth Innovation Labs**, built for the AfriYouth website design and development challenge.

The site presents the organization as a connected research and innovation practice across seven areas: research, policy, human-centered design, entrepreneurship, professional development, strategic foresight and impact measurement.

## Current status

- Functional single-page application with nine public pages plus article detail and 404 routes.
- Mission, vision, positioning, brand pillars and areas of work follow the challenge brief.
- Official programmes, partnerships, impact figures, staff, social accounts and contact details have **not** been supplied, so those areas show explicit pending or empty states.
- Forms validate in the browser and deliberately do **not** transmit data.
- Photography is licensed placeholder imagery, clearly credited in the interface.
- An actual Figma document has not been created yet; the design specification is provided in [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md).
- A public production URL has not been verified yet. See [DEPLOYMENT.md](DEPLOYMENT.md).

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
| Fonts | Space Grotesk Variable, DM Sans Variable (self-hosted via Fontsource) |
| Hosting target | Vercel static deployment with SPA rewrites |

There is no backend, database, authentication layer or third-party API integration in this prototype.

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
| `/what-we-do` | Seven areas of work |
| `/programs` | Opportunity board with search, status and category filters |
| `/insights` | Provisional essays and publication structure |
| `/insights/:slug` | Article detail |
| `/impact` | Measurement approach and public ledger states |
| `/get-involved` | Audience pathways and interest form |
| `/partner-with-us` | Collaboration models and partner form |
| `/contact` | Contact architecture and prototype form |
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
  photos/         Licensed placeholder photography
  robots.txt
  sitemap.xml
```

## Content and data

All organizational content is centralized in `src/content/`. See [CONTENT_INTEGRATION.md](CONTENT_INTEGRATION.md) for the replacement guide.

Key files:

- `site.ts` — name, mission, vision, positioning, brand pillars, navigation, contact placeholders.
- `areas.ts` — seven areas of work and the connected-approach nodes.
- `programs.ts` — opportunity listings (intentionally empty).
- `insights.ts` — provisional essays.
- `impact.ts` — measurement framework and ledger states.
- `partners.ts` — collaboration models (no named partners).
- `photos.ts` — photo sources, alt text, credits and dimensions.
- `seo.ts` — per-page titles and descriptions.

## Forms

The three forms use `src/hooks/usePrototypeForm.ts`. They validate input, show accessible errors, focus the first invalid field, expose a submitting state and then display an explicit success message stating that nothing was sent. No network request is made.

Connecting a real endpoint requires changes documented in [CONTENT_INTEGRATION.md](CONTENT_INTEGRATION.md#connecting-forms-to-a-real-endpoint).

## Accessibility and motion

- Semantic landmarks, one `h1` per page, skip link and visible focus indicators.
- Mobile navigation traps focus, closes on Escape and returns focus to the trigger.
- `prefers-reduced-motion` is respected throughout; content remains available without animation.
- The custom cursor is limited to fine pointers and motion-safe users.
- Images include descriptive alt text; decorative graphics are hidden from assistive technology.

## Documentation

- [INSTALLATION.md](INSTALLATION.md) — local setup and commands.
- [DEPLOYMENT.md](DEPLOYMENT.md) — Vercel deployment and post-deploy checklist.
- [CONTENT_INTEGRATION.md](CONTENT_INTEGRATION.md) — replacing provisional content.
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — tokens, typography, components and motion rules.
- [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md) — Figma-ready specification and remaining manual steps.
- [ASSET_CREDITS.md](ASSET_CREDITS.md) — photography, font and library licensing.

## Known limitations

- No official organizational content package has been supplied; several pages intentionally show pending states.
- Forms are client-only prototype demonstrations.
- Photography is licensed placeholder imagery, not AfriYouth staff, partners or participants.
- No editable Figma file exists yet; use [FIGMA_HANDOFF.md](FIGMA_HANDOFF.md) to produce it.
- No production URL has been verified.
- `public/sitemap.xml` and `public/robots.txt` use the intended Vercel host and must be updated after the real deployment URL is confirmed.

## Credits

Photography is sourced from Pexels under the Pexels License. Fonts are licensed under the SIL Open Font License. See [ASSET_CREDITS.md](ASSET_CREDITS.md).
