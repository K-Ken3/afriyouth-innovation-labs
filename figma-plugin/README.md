# AfriYouth Figma builder

A local Figma **development plugin** that builds the AfriYouth website design system into the Figma file you already have open. It needs no access token, OAuth app or paid seat: you import the manifest once and press Run.

Target file:

<https://www.figma.com/design/5YQSVaTK1ssRXYhUaQCRbQ/AfriYouth-Innovation-Labs---Website-Design-System---Prototype>

## Run it

1. Open the target file in Figma desktop or the browser and make sure you have **edit access**.
2. Go to **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json` from this repository.
4. Run **AfriYouth Design System Builder** from the same menu.
5. Wait for the toast: `AfriYouth: 38 frames built · … interaction links wired`.

If the plugin fails, the toast reports the error. Nothing is deployed and no repository file is changed by running it.

## What it creates

| Figma page | Contents |
| --- | --- |
| `01 · Foundations` | Official palette with blush tint, applied type scale, spacing, radius, elevation, variables, paint/text/effect styles |
| `02 · Components` | Button variants (5 styles × default/hover/disabled), badges, filter chips, field states, area/insight/profile cards, desktop + mobile header, footer |
| `03 · Home` … `12 · 404` | Every route at 1440 / 768 / 390, laid out independently per width |
| `07 · Insights` | Also holds the Insight Article detail at all three widths |
| `13 · Interaction flows` | Mobile menu overlays at 390 and 768, enquiry success states at all three widths |
| `14 · Handover` | Route matrix, interaction wiring, content rules, brand note, re-run notes, limitations |

Routes: Home, About, What We Do, Programs, Insights, Insight Article, Impact, Get Involved, Partner With Us, Contact, 404.

## Behaviour

- **Idempotent.** Every generated node carries the plugin data key `afriyouth.generated`. Re-running removes only those nodes and rebuilds them. Frames, components and styles you add yourself are not deleted or renamed.
- **No overlap.** New content is placed below anything already on the page, so existing work is not covered.
- **Fonts.** Poppins provides display and headings, DM Sans provides body text, and both fall back to Inter if unavailable. Figma must have at least one usable family.
- **Images.** The five brand-guidelines photos are fetched from `https://afriyouth-innovation-labs.vercel.app/photos/`, which is the only domain in `manifest.json`. Offline, rectangles fall back to a sage plate and the layout still builds.
- **Interaction links.** Navigation, cards, CTAs, menu, form submits and the 404 route list navigate between frames at the same width. Transitions are a 0.25s dissolve. A link is skipped if its destination frame is missing.
- **No invented content.** No programmes, impact figures, people, partnerships or social accounts are invented. The Programs board shows its real empty state until calls are published, and impact figures appear only when verified.

## Build

The plugin source is split into ordered modules in `src/`; Figma loads one file, so concatenate them:

```bash
cd figma-plugin
node build.js      # writes code.js
node --check code.js
```

`code.js` is generated. Edit `src/*.js`, not `code.js`.

## Validation performed

- `node build.js` → 9 modules, `code.js` generated.
- `node --check code.js` → parses.
- Executed against a mock Figma API with strict auto-layout sizing checks: 38 frames, all 11 routes × 3 widths, 826 interaction links, 22 flow starting points, 0 unresolved targets, 0 runtime errors.
- Run twice against the same mock document: identical page, frame and link counts, no duplicate nodes and no stale flow starting points.
- The brand lockup uses the official figure-mark geometry (extracted from the brand guidelines) as a vector, with the typographic wordmark.

Not performed from this environment: the plugin has **not** been executed inside Figma itself. Opening the file and pressing Run is the remaining step, and it requires your Figma session. If the file denies plugin execution or edit access, Figma will say so — that limitation cannot be bypassed from here.

## Brand position

The official identity is applied across the Foundations page and every page frame: Dark Purple `#0D0624` for ink and dark surfaces, Steel Pink `#C723DF` for accent and focus, Duke Blue `#0301FF` and Blue `#0200A7` for supporting marks, and the blush tint `#FAE8FD` behind filled pink surfaces so text keeps accessible contrast. Poppins sets display and headings; DM Sans substitutes for the proprietary Gilroy body face. The official raised-hands figure mark is paired with the typographic wordmark. Inside dark frames, pink text resolves to `#E879F9` for contrast.
