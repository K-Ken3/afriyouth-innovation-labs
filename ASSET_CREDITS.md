# Asset Credits

All third-party assets used by the site are listed here with their licence and attribution. This file should be updated whenever an image, font, icon set or library is added or replaced.

## Photography

The five photographs in `public/photos/` are the Image & Photography examples from the supplied AfriYouth brand guidelines PDF (*Afri Youth Innovation Lab Branding - Logo & Guidelines*, page 5). They establish the brand's photographic direction. **They do not identify AfriYouth staff, partners, participants or specific projects and must not be presented as documentary evidence of AfriYouth's work.**

| File | Dimensions | Source | Used on |
| --- | --- | --- | --- |
| `brand-electronics-lab.jpg` | 2000 × 1334 | Brand guidelines, p.5 | Homepage introduction |
| `brand-researcher-vr.jpg` | 1335 × 2000 | Brand guidelines, p.5 | Homepage insights preview |
| `brand-young-innovator-vr.jpg` | 1333 × 2000 | Brand guidelines, p.5 | Insights index |
| `brand-solar-field-team.jpg` | 1500 × 998 | Brand guidelines, p.5 | About page |
| `brand-circuit-work.jpg` | 2000 × 1143 | Brand guidelines, p.5 | Insight detail |

The images were exported from the PDF at native resolution and recompressed as progressive JPEG at quality 82. They were not upscaled, recoloured or cropped, and the set totals roughly 1 MB. Alt text and credits are stored in `src/content/photos.ts`.

### Usage terms

- The imagery is supplied by AfriYouth for brand communication; the organisation is responsible for confirming it holds the necessary model and property permissions for public use.
- Do not present these images as evidence of a specific programme, partnership, participant or result.
- If official programme photography replaces these images, record the photographer, consent status, licence and caption in this table.

## Typography

Both font families are self-hosted through Fontsource packages, so the site makes no third-party font requests at runtime. Only latin subsets are imported for Poppins.

| Family | Package | Designer / source | Licence |
| --- | --- | --- | --- |
| Poppins | `@fontsource/poppins` | Indian Type Foundry | SIL Open Font License 1.1 |
| DM Sans Variable | `@fontsource-variable/dm-sans` | DM Sans Project Authors (Colophon Foundry / Google Fonts) | SIL Open Font License 1.1 |

Poppins is the official title face in the AfriYouth brand guidelines. Gilroy, the official body face, is proprietary and is not redistributed; DM Sans is the documented substitute.

The SIL OFL permits embedding, redistribution and commercial use, provided the fonts are not sold on their own and reserved font names are respected. Licence texts are included in the respective packages under `node_modules/`.

## Icons and graphics

| Asset | Source | Licence |
| --- | --- | --- |
| Interface icons | [Lucide](https://lucide.dev/) via `lucide-react` | ISC (portions derived from Feather, MIT) |
| AfriYouth figure mark and wordmark | Official brand guidelines supplied by AfriYouth Innovation Labs; geometry extracted from the supplied PDF into `src/components/navigation/BrandMark.tsx` | © AfriYouth Innovation Labs |
| Social card `public/og-image.png` | Generated for this project from the official palette, mark and tagline | © AfriYouth Innovation Labs project |
| Orbital atlas, grids, ticker marks, photo plate treatments, favicon | Original to this project | © AfriYouth Innovation Labs project |

No third-party logo, partner mark, photograph or illustration is embedded without a credit above.

## Software dependencies

| Package | Licence |
| --- | --- |
| React, React DOM | MIT |
| React Router | MIT |
| Vite | MIT |
| TypeScript | Apache-2.0 |
| Tailwind CSS | MIT |
| PostCSS, Autoprefixer | MIT |
| Framer Motion | MIT |
| GSAP | GreenSock Standard “no charge” licence |
| clsx | MIT |
| Fontsource packages | MIT (font files under SIL OFL 1.1) |

GSAP's licence terms are available at <https://gsap.com/standard-license>. Review them if the project adds paid GSAP plugins or redistributes the library outside the site build.

## Fonts and images in the Figma handoff

The Figma builder imports the same fonts and the five brand-guideline photographs:

- install Poppins and DM Sans from Google Fonts or Fontsource;
- import the same photographs and record them in the Figma file's asset notes;
- keep the brand-imagery note visible in any presentation of the design;
- do not add stock photos that imply AfriYouth staff, beneficiaries or partners without verification.

## Attribution in the interface

Brand-guideline photography is credited in page-level caption rows. If AfriYouth supplies its own programme photography, retain a visible or colophon-level credit according to the licence. Do not remove credits from assets that require attribution.

## Verification log

| Date | Change | Approved by |
| --- | --- | --- |
| 2026-11-08 | Initial asset inventory | Project team |
| 2026-11-15 | Applied official brand palette, Poppins headings, official figure mark and generated social card; removed Space Grotesk | Project team |
| 2026-11-15 | Integrated the five brand-guideline photographs across homepage, About, Insights and article detail | Project team |

Add a row for every asset change, including replacements, new licences and removals.
