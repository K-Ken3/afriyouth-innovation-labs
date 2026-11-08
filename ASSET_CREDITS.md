# Asset Credits

All third-party assets used by the prototype are listed here with their licence and attribution. This file should be updated whenever an image, font, icon set or library is added or replaced.

## Photography

The four photographs in `public/photos/` are licensed placeholders from **Pexels**, used under the [Pexels License](https://www.pexels.com/license/). They illustrate working context only. **They do not show AfriYouth staff, partners, participants or projects, and must not be presented as documentary evidence of AfriYouth's work.**

| File | Dimensions | Photographer | Source | Used on |
| --- | --- | --- | --- | --- |
| `team-conversation.jpg` | 3840 × 2560 | Ninthgrid | Pexels | Homepage introduction |
| `design-workshop.jpg` | 3840 × 2160 | Vitaly Gariev | Pexels | About page |
| `team-laptop.jpg` | 3840 × 2560 | PICHA Stock | Pexels | Insights index and preview |
| `meeting-presentation.jpg` | 3840 × 2560 | PICHA Stock | Pexels | Insight detail |

Credits and alt text are stored in `src/content/photos.ts`. Placeholder credit lines are shown in the interface where the images appear.

### Pexels License summary

- Free to use for commercial and non-commercial purposes.
- Attribution is not required, but is provided here as good practice.
- Images may not be sold unaltered, and identifiable people may not be shown in a way that is offensive or implies endorsement.
- The licence does not grant rights to trademarks or to imply that Pexels or the photographer endorses this project.

This summary is not legal advice. Review the current Pexels licence before publication.

### Replacing with official photography

Official AfriYouth photography must carry:

- documented consent from identifiable people;
- a photographer or organizational credit;
- the intended licence or internal usage permission;
- accurate alt text and caption;
- an updated row in this file.

Prefer compressed JPEG or WebP at the largest size actually displayed. The current 3840px placeholders total roughly 3.2 MB; a final site should serve responsive sizes or smaller derivatives.

## Typography

Both font families are self-hosted through Fontsource packages, so the site makes no third-party font requests at runtime.

| Family | Package | Designer / source | Licence |
| --- | --- | --- | --- |
| Space Grotesk Variable | `@fontsource-variable/space-grotesk` | Florian Karsten | SIL Open Font License 1.1 |
| DM Sans Variable | `@fontsource-variable/dm-sans` | DM Sans Project Authors (Colophon Foundry / Google Fonts) | SIL Open Font License 1.1 |

The SIL OFL permits embedding, redistribution and commercial use, provided the fonts are not sold on their own and reserved font names are respected. Licence texts are included in the respective packages under `node_modules/`.

## Icons and graphics

| Asset | Source | Licence |
| --- | --- | --- |
| Interface icons | [Lucide](https://lucide.dev/) via `lucide-react` | ISC (portions derived from Feather, MIT) |
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

If the Figma file is produced later:

- install Space Grotesk and DM Sans from Google Fonts or Fontsource;
- import the same four photographs and record them in the Figma file's asset notes;
- keep the placeholder-photo disclaimer visible in any presentation of the design;
- do not add stock photos that imply AfriYouth staff, beneficiaries or partners without verification.

## Attribution in the interface

The prototype currently credits placeholder photography in page-level caption rows. If the official site keeps any third-party image, retain a visible or colophon-level credit according to its licence. Do not remove credits from assets that require attribution.

## Verification log

| Date | Change | Approved by |
| --- | --- | --- |
| 2026-11-08 | Initial asset inventory for the challenge prototype | Project team |

Add a row for every asset change, including replacements, new licences and removals.
