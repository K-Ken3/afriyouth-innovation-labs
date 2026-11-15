# Content Integration Guide

All public copy, programme data, people-facing forms and metadata live in `src/content/`. Components read from those typed modules, so most updates are content edits rather than layout work.

## 1. The content rule

This site separates three kinds of copy:

| Type | Meaning | Where it appears |
| --- | --- | --- |
| **Supplied** | Taken from the official AfriYouth organisational profile, or the brand guidelines where the profile is silent | Mission, vision, positioning, tagline, five divisions, products and services, philosophy, brand pillars, eight practice cards |
| **Editorial** | Written by the practice to explain method, standards and ways of working | Essays, process framing, FAQ answers, service descriptions |
| **Published when verified** | Organizational facts that need a source, permission or confirmed channel | Programme calls, named partners, people, impact figures, direct contact details |

The organisational profile is authoritative for mission, vision, divisions and services. The brand guidelines are authoritative for identity. Where older brand-guideline mission or vision wording conflicts with the newer profile, use the profile and do not merge the two.

Never add any of the following unless an official, citable source has been supplied:

- founder, leadership or staff names, titles or biographies;
- office address, phone number, email address or social accounts;
- named partners, clients, funders or endorsements;
- programme names, dates, deadlines or application links;
- impact statistics, participant counts, revenue figures or awards;
- testimonials, quotes or case studies attributed to real people;
- publication titles, authors, dates or research findings.

When in doubt, state the current position plainly. An honest gap is part of the design.

## 2. Replacement map

| File | Controls | Main surfaces |
| --- | --- | --- |
| `src/content/site.ts` | Name, tagline, description, positioning, mission, vision, philosophy, five divisions, brand pillars, accountability, contact, navigation, pathways, ticker | Header, footer, hero, homepage, about, contact |
| `src/content/areas.ts` | Eight practice cards (five divisions plus the Policy Innovation Challenge, Impact & Learning and Funding & Investment Readiness), capabilities, questions, accents, approach nodes | Homepage areas, What We Do, footer anchors |
| `src/content/about.ts` | Purpose narrative, commitments, team and partnership statements, chapter navigation | About |
| `src/content/programs.ts` | Opportunity listings, categories, empty state, listing fields | Programs, homepage preview |
| `src/content/insights.ts` | Essays, categories, detail bodies, pull quotes | Insights, article detail, homepage preview |
| `src/content/impact.ts` | Measurement dimensions, stages, commitments, ledger states, FAQs | Impact, homepage preview |
| `src/content/partners.ts` | Collaboration models, audiences, process, questions, FAQs | Partner With Us |
| `src/content/pages.ts` | Shared process copy, FAQ sets, audience options, enquiry form copy | Multiple pages |
| `src/content/photos.ts` | Photo paths, alt text, credits, intrinsic dimensions | About, insights, homepage |
| `src/content/seo.ts` | Per-page title, description and canonical path | Every route |
| `src/content/types.ts` | Shapes for all of the above | Type checking |

## 3. Organization details

Edit `src/content/site.ts`.

The mission, vision, positioning and brand pillars currently mirror the official organisational profile. If approved wording supersedes the profile, replace them there; every surface reads from this object. `site.philosophy` holds the six-step Think → Research → Design → Build → Influence → Scale model and `site.purpose.relationship` holds the five divisions.

### Contact channels

The three enquiry forms open a pre-addressed email draft in the visitor's mail client. Set `email` in `site.contact` to the official address; when it is `null`, the forms show a "channel being configured" message instead of opening a draft:

```ts
contact: {
  email: "hello@afriyouth.org", // replace with the official address
  phone: null,                  // set when a monitored line is confirmed
  address: null,                // set when an office is confirmed for publication
  note: "For enquiries, use the form on this page. Direct email, telephone and office details are published as they are confirmed.",
},
```

The Contact page reads these values directly. Setting `email` immediately enables all three forms; telephone and office values replace the "Available on request" states.

### Social accounts

`site.socials` is defined but **not currently rendered anywhere**. Adding entries alone will not publish them. To display verified accounts:

1. Add `{ label, href }` entries to `site.socials`.
2. Render the list in `src/components/layout/Footer.tsx` and/or the social panel in `src/pages/ContactPage.tsx`.
3. Add `rel="noopener noreferrer"` and `target="_blank"` to external links.
4. Update `site.socialNote`.

Use full `https://` URLs. Do not add handles that have not been verified as official.

## 4. Practice cards and divisions

Edit `src/content/areas.ts`.

The interface keeps eight cards for layout reasons. They represent the five official divisions plus the Policy Innovation Challenge, Impact & Learning Services and Funding & Investment Readiness:

| Card `id` | Position |
| --- | --- |
| `research` | Research & Evidence Lab (division) |
| `policy` | Policy & Governance Lab (division) |
| `innovation` | Policy Innovation Challenge |
| `entrepreneurship` | Innovation & Venture Lab (division) |
| `professional-development` | Career & Professional Development Academy (division) |
| `foresight` | Strategic Foresight & Futures Lab (division) |
| `impact-measurement` | Impact & Learning Services (cross-cutting) |
| `funding` | Funding & Investment Readiness (cross-cutting) |

Each area has an `id`, a `number`, a short and long title, an icon key, a tagline, summary, description paragraphs, capabilities, a framing question, output formats and an accent.

Two dependencies matter:

- **Anchor links use `id`.** The footer links to `/what-we-do#professional-development` and `/what-we-do#entrepreneurship`; the homepage area cards link to `/what-we-do#<id>`. If you rename an `id`, update those links.
- **`approachNodes[].areaId` must match an existing area `id`.** The connected-approach graphic uses this relationship. Node `x` and `y` values are percentages (0–100) in the atlas composition, not pixels.

Area icons are mapped in `src/components/ui/AreaIcon.tsx` and typed by `AreaIconName` in `src/content/types.ts`. Reuse an existing key or add a matching Lucide icon to both.

## 5. Programmes and opportunities

`src/content/programs.ts` intentionally exports an empty array. Add listings that match the `Program` type:

```ts
export const programs: Program[] = [
  {
    id: "2027-research-fellowship",
    title: "Research Fellowship 2027",
    category: "fellowships", // must match a programCategories id
    summary: "A short, factual description of the opportunity.",
    eligibility: "Who can apply, including location and experience requirements.",
    deadline: "21 March 2027, 23:59 EAT",
    format: "Hybrid · 12 weeks · part-time",
    status: "open", // "open" | "upcoming" | "closed"
    applicationUrl: "https://verified-application-url.example",
  },
];
```

Valid category ids are `fellowships`, `research`, `innovation`, `learning` and `enterprise`. The filter chips, counts, status controls and empty states rebuild automatically from this array. Their display labels are "Accelerators & cohorts", "Research calls", "Innovation challenges", "Academies & training" and "Venture & funding support" — edit `programCategories` if approved terminology changes.

Before publishing a listing, confirm:

- the deadline includes a date and time zone;
- the application URL is the official destination and opens correctly;
- eligibility is complete enough for someone to decide whether to apply;
- status matches the real application window;
- the listing will be maintained when the deadline passes.

`applicationUrl` is rendered as an external link. Use `https://` only.

## 6. Insights and publications

Add an `Insight` object to `src/content/insights.ts`:

```ts
{
  slug: "stable-url-slug",
  title: "Article title",
  category: "Research & evidence", // see InsightCategory in types.ts
  kind: "Essay", // "Essay" | "Report" | "Field note"
  edition: "Official edition",
  readingTime: 6,
  excerpt: "One or two sentences used on cards and in metadata.",
  pullQuote: "Optional pull quote.",
  body: ["First paragraph.", "Second paragraph."],
}
```

The detail route `/insights/:slug` and related-article logic are generated from the array. Keep `slug` stable once published, and add the new URL to `public/sitemap.xml`.

The current essays are editorial perspectives on method and practice. They carry the edition label “AfriYouth perspective” and make no research claims. When a research output is supplied, add it with its real kind, edition and author information; do not attribute essays to people who did not write them. Author metadata requires a type and template change.

## 7. Impact content

Impact figures are deliberately absent until engagements close. `src/content/impact.ts` describes the measurement framework only, and `src/content/site.ts` exports an empty `homeStats` array that is not rendered.

Do not place a statistic into a narrative field as a substitute for a supported data component. When verified figures arrive:

1. Record the source, collection date, method, sample and limitations.
2. Add a typed data module with those fields.
3. Build a dedicated figure component that displays the source and date beside the number.
4. Replace the `impactLedger` status “Published on completion” with a link to the actual report.
5. Keep the measurement framework visible alongside the figures.

The five `measurementCommitments` are organizational promises. Confirm them with AfriYouth before presenting them as policy.

## 8. Partner content

`src/content/partners.ts` describes collaboration models and audiences. No partners or clients are named. Adding a partner directory requires:

- written permission from each organization;
- a logo asset with appropriate rights;
- a link to the partner's own confirmation or the AfriYouth announcement;
- a layout decision on whether partners are implied endorsements.

Until permission exists, describe how AfriYouth collaborates rather than who it has worked with.

## 9. Photography

`src/content/photos.ts` is the single source for photo paths, alt text, credit and intrinsic dimensions. Images live in `public/photos/`. The current five images come from page 5 (Image & Photography) of the supplied brand guidelines.

When replacing an image:

1. Export a web-optimised JPEG or WebP at native resolution. The current set is 1333–2000px on the long edge and about 1 MB in total; do not upscale a smaller source.
2. Save it in `public/photos/` with a descriptive filename.
3. Update `src`, `alt`, `credit`, `width` and `height`.
4. Keep alt text descriptive of the image, not promotional.
5. Confirm the organisation holds publication consent for the people shown before using it as official programme photography.
6. Update `ASSET_CREDITS.md` if the licence or source changes.

## 10. SEO metadata and the sitemap

`src/content/seo.ts` holds each page's title, description and path. `usePageMeta` writes the title, description, canonical URL and Open Graph/Twitter fields at runtime.

After launch:

1. Replace the host in `public/sitemap.xml` and `public/robots.txt`.
2. Add any new article or page URLs to the sitemap.
3. The social card lives at `public/og-image.png` (1200×630) and is referenced from `index.html` with Open Graph and Twitter metadata. Regenerate it if the palette, wordmark or tagline changes.

## 11. Enquiry forms and the mailto workflow

The three forms (`ContactForm`, `InterestForm`, `PartnerForm`) use `src/hooks/useEnquiryForm.ts`. It validates in the browser, focuses the first invalid field, shows a brief submitting state and then opens a pre-addressed email draft in the visitor's mail client. **The site itself stores and transmits nothing.**

### Enabling delivery

All three forms read the recipient from `site.contact.email` in `src/content/site.ts`:

```ts
contact: {
  email: "hello@afriyouth.org", // set this to the monitored official address
  phone: null,
  address: null,
  note: "For enquiries, use the form on this page. Direct email, telephone and office details are published as they are confirmed.",
},
```

While `email` is `null`, a valid submission shows the `enquiryFormCopy.unavailable` notice instead of opening a draft. The notice lives in `src/content/pages.ts` together with the success copy:

```ts
export const enquiryFormCopy = {
  body: "We use your details only to respond to your enquiry and never share them.",
  successTitle: "Your email draft is ready.",
  successBody:
    "Your mail client should have opened with the message addressed to AfriYouth. Review it and send when you are ready.",
  resetLabel: "Write another",
  unavailable:
    "The direct email channel is being configured. Please check back shortly.",
};
```

Do not remove the `unavailable` copy while the address is unset; it is the honest fallback.

### Moving to a hosted form endpoint

The mailto flow has known limits: it depends on a configured mail client, gives no delivery confirmation and cannot feed a CRM. A server integration needs:

1. A server endpoint (Vercel Function, form provider or CRM API).
2. Server-side validation, spam protection and rate limiting.
3. A privacy notice and lawful basis for collecting the data.
4. A `submitError` state in the hook, rendered in each form with `role="alert"`.
5. Success copy that describes what happens next, replacing the draft wording.

Do not put API keys or service tokens in the frontend. Vite exposes every `VITE_*` variable to the browser bundle. Server secrets belong in the hosting provider's server-side environment settings, never in source control.

Sketch of the submission branch:

```ts
const response = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});

if (!response.ok) {
  setSubmitError("Your message could not be sent. Please try again.");
  setIsSubmitting(false);
  return;
}

setSubmitted(true);
setIsSubmitting(false);
```

Keep the existing focus management and `aria-invalid` behaviour. If a third-party form service is used, place only its public form identifier in the frontend and verify its privacy and data-residency terms.

## 12. Content states before publication

The interface is designed to read as complete while some information is still unpublished. Search for these markers when auditing a release:

```bash
rg -n -i "provisional|pending|placeholder|not yet|unverified" src public index.html
```

Locations that intentionally describe an unpublished state:

- `site.contact.email`, `site.contact.phone`, `site.contact.address` — `null` until confirmed;
- `site.contact.note`, `site.socialNote`, `site.formNotice`;
- `enquiryFormCopy.unavailable` in `pages.ts`;
- the impact ledger statuses `Published on completion`;
- the empty programmes array and its empty state;
- `public/sitemap.xml` and `public/robots.txt` host names.

Replace each state only when the underlying detail has been confirmed. A `null` contact field or an empty programme list is accurate; a plausible-looking placeholder is not.

## 13. Content sign-off checklist

- [ ] Mission, vision, positioning and pillars match the approved source.
- [ ] Every named person has approved their name, title and biography.
- [ ] Every partner has approved being named.
- [ ] Every programme has a confirmed deadline, time zone and application URL.
- [ ] Every statistic has a source, date, method and limitation.
- [ ] Every quote or testimonial has documented consent.
- [ ] `site.contact.email` is set to a monitored address and the forms have been tested end to end.
- [ ] Contact channels are monitored by someone responsible for replies.
- [ ] Social accounts are verified as official before being rendered.
- [ ] Images have consent and correct credits.
- [ ] `sitemap.xml` and `robots.txt` use the production host.
- [ ] The release has been reviewed and approved with a date and approver.
