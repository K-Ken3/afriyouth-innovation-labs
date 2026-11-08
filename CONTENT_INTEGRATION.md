# Content Integration Guide

All public copy, programme data, people-facing forms and metadata live in `src/content/`. Components read from those typed modules, so most updates are content edits rather than layout work.

## 1. The content rule

This prototype separates two kinds of copy:

| Status | Meaning | Where it appears |
| --- | --- | --- |
| **Brief-verified** | Supplied verbatim by the AfriYouth challenge brief | Mission, vision, positioning, brand pillars, seven areas of work |
| **Provisional** | Written to demonstrate structure and interaction; not an organizational claim | Programme descriptions, essays, process steps, FAQ answers, service framing |

Provisional copy is labelled in the interface where it could be mistaken for a verified claim. Do not remove those labels until the corresponding content has been approved by AfriYouth.

Never add any of the following unless an official, citable source has been supplied:

- founder, leadership or staff names, titles or biographies;
- office address, phone number, email address or social accounts;
- named partners, clients, funders or endorsements;
- programme names, dates, deadlines or application links;
- impact statistics, participant counts, revenue figures or awards;
- testimonials, quotes or case studies attributed to real people;
- publication titles, authors, dates or research findings.

When in doubt, publish the pending state. An honest gap is part of the design.

## 2. Replacement map

| File | Controls | Main surfaces |
| --- | --- | --- |
| `src/content/site.ts` | Name, tagline, description, mission, vision, positioning, brand pillars, notice, contact, navigation, pathways, ticker | Header, footer, hero, homepage, about, contact |
| `src/content/areas.ts` | Seven areas of work, capabilities, questions, accents, approach nodes | Homepage areas, What We Do, footer anchors |
| `src/content/about.ts` | Purpose narrative, commitments, team and partnership statements, chapter navigation | About |
| `src/content/programs.ts` | Opportunity listings, categories, empty state, listing fields | Programs, homepage preview |
| `src/content/insights.ts` | Essays, categories, detail bodies, pull quotes | Insights, article detail, homepage preview |
| `src/content/impact.ts` | Measurement dimensions, stages, commitments, ledger states, FAQs | Impact, homepage preview |
| `src/content/partners.ts` | Collaboration models, audiences, process, questions, FAQs | Partner With Us |
| `src/content/pages.ts` | Shared process copy, FAQ sets, audience options, prototype form notices | Multiple pages |
| `src/content/photos.ts` | Photo paths, alt text, credits, intrinsic dimensions | About, insights, homepage |
| `src/content/seo.ts` | Per-page title, description and canonical path | Every route |
| `src/content/types.ts` | Shapes for all of the above | Type checking |

## 3. Organization details

Edit `src/content/site.ts`.

The mission, vision, positioning and six brand pillars currently mirror the challenge brief. If official wording supersedes the brief, replace them there; every surface reads from this object.

### Contact channels

`site.contact` uses `null` for unpublished values, and the Contact page renders “Pending verification” instead:

```ts
contact: {
  email: "hello@example.org",   // only after official confirmation
  phone: "+000 000 0000",
  address: "Street, City, Country",
  note: "Official contact channels are published here.",
},
```

Update the surrounding `meta` values on the Contact page if the channel status changes from pending. Search for `Pending` in `src/pages/ContactPage.tsx`.

### Social accounts

`site.socials` is defined but **not currently rendered anywhere**. Adding entries alone will not publish them. To display verified accounts:

1. Add `{ label, href }` entries to `site.socials`.
2. Render the list in `src/components/layout/Footer.tsx` and/or the social panel in `src/pages/ContactPage.tsx`.
3. Add `rel="noopener noreferrer"` and `target="_blank"` to external links.
4. Update `site.socialNote`.

Use full `https://` URLs. Do not add handles that have not been verified as official.

## 4. Seven areas of work

Edit `src/content/areas.ts`.

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

Valid category ids are `fellowships`, `research`, `innovation`, `learning` and `enterprise`. The filter chips, counts, status controls and empty states rebuild automatically from this array.

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
  provisional: false,
}
```

The detail route `/insights/:slug` and related-article logic are generated from the array. Keep `slug` stable once published, and add the new URL to `public/sitemap.xml`.

For official research, replace the provisional essays rather than appending to them. Do not invent authors, dates or findings. If an author is supplied, the detail page currently prints “No author attribution supplied”; adding author metadata requires a type and template change.

## 7. Impact content

Impact figures are deliberately absent. `src/content/impact.ts` describes the measurement framework only, and `src/content/site.ts` exports an empty `homeStats` array that is not rendered.

Do not place a statistic into a narrative field as a substitute for a supported data component. When verified figures arrive:

1. Record the source, collection date, method, sample and limitations.
2. Add a typed data module with those fields.
3. Build a dedicated figure component that displays the source and date beside the number.
4. Update the ledger entries in `impactLedger` with links to the actual reports.
5. Only then remove the “Not yet published” states.

The five `measurementCommitments` are organizational promises. Confirm them with AfriYouth before presenting them as policy.

## 8. Partner content

`src/content/partners.ts` describes collaboration models and audiences. No partners or clients are named. An official partner directory needs:

- written permission from each organization;
- a logo asset with appropriate rights;
- a link to the partner's own confirmation or the AfriYouth announcement;
- a layout decision on whether partners are implied endorsements.

Until then, keep the pending statement.

## 9. Photography

`src/content/photos.ts` is the single source for photo paths, alt text, credit and intrinsic dimensions. Images live in `public/photos/`.

When replacing an image:

1. Export a web-optimised JPEG or WebP. The current placeholders are 3840px wide; that is larger than necessary for most placements.
2. Save it in `public/photos/` with a descriptive filename.
3. Update `src`, `alt`, `credit`, `width` and `height`.
4. Keep alt text descriptive of the image, not promotional.
5. Ensure people shown have consented to publication if the image is official AfriYouth photography.
6. Update `ASSET_CREDITS.md` if the licence changes.

## 10. SEO metadata and the sitemap

`src/content/seo.ts` holds each page's title, description and path. `usePageMeta` writes the title, description, canonical URL and Open Graph/Twitter fields at runtime.

After launch:

1. Replace the host in `public/sitemap.xml` and `public/robots.txt`.
2. Add any new article or page URLs to the sitemap.
3. Consider adding a static Open Graph image and referencing it from `index.html` and `usePageMeta`. One is not included because no official brand asset has been supplied.

## 11. Connecting forms to a real endpoint

The three forms (`ContactForm`, `InterestForm`, `PartnerForm`) use `src/hooks/usePrototypeForm.ts`. It validates in the browser, focuses the first invalid field and then waits 480ms before showing a success message. **No network request is made.**

The success copy in `src/content/pages.ts` states that nothing was sent. That copy must change in the same release that connects an endpoint.

A real integration needs:

1. A server endpoint (Vercel Function, form provider or CRM API).
2. Server-side validation, spam protection and rate limiting.
3. A privacy notice and lawful basis for collecting the data.
4. An error state in the form hook. The current hook has no failure path.
5. Updated success copy that describes what happens next.

Do not put API keys or service tokens in the frontend. Vite exposes every `VITE_*` variable to the browser bundle. Server secrets belong in the hosting provider's server-side environment settings, never in source control.

Sketch of the hook change:

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

Add a `submitError` value to the hook's return object and render it in each form with `role="alert"`. Keep the existing focus management and `aria-invalid` behaviour.

If a third-party form service is used, place only its public form identifier in the frontend and verify its privacy and data-residency terms.

## 12. Removing the prototype state

Before the official launch, search the repository for these markers and resolve each one:

```bash
rg -n -i "prototype|provisional|pending|placeholder|not yet|unverified" src public index.html
```

The main locations are:

- `site.provisionalNotice`, `site.contact.note`, `site.socialNote`, `site.formNotice`;
- the badges and panels on About, Programs, Insights, Impact, Get Involved, Partner With Us and Contact;
- `prototypeFormCopy` in `pages.ts`;
- header/footer prototype labels;
- photo credit lines;
- the `provisional: true` flags in `insights.ts`;
- `public/sitemap.xml` and `public/robots.txt` host names.

Do not remove a pending state until the replacement information has been verified. The interface is designed to look intentional while information is missing.

## 13. Content sign-off checklist

- [ ] Mission, vision, positioning and pillars match the approved source.
- [ ] Every named person has approved their name, title and biography.
- [ ] Every partner has approved being named.
- [ ] Every programme has a confirmed deadline, time zone and application URL.
- [ ] Every statistic has a source, date, method and limitation.
- [ ] Every quote or testimonial has documented consent.
- [ ] Contact details are monitored by someone responsible for replies.
- [ ] Social accounts are verified as official.
- [ ] Images have consent and correct credits.
- [ ] Provisional labels have been removed only where verification is complete.
- [ ] `sitemap.xml` and `robots.txt` use the production host.
- [ ] The all-clear has been recorded with a date and approver.
