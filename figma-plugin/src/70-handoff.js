/* ============================================================================
   70-handoff.js : handover board
   ========================================================================= */

function handBlock(parent, title, note) {
  const block = frame(parent, { name: "Block / " + title, gap: 14, pt: 28, pb: 28 });
  divider(block, COLORS.forest, 0.16);
  eyebrow(block, title);
  if (note) bodyText(block, note, 1440, { size: 13, opacity: 0.55, lh: 1.65 });
  return block;
}

function handRow(parent, cells, widths, dark) {
  const r = frame(parent, { name: "Row", dir: "row", gap: 16, align: "MIN", pt: 12, pb: 12 });
  cells.forEach((cell, index) => {
    const c = frame(r, { name: "Cell", w: widths[index] });
    c.layoutSizingHorizontal = "FIXED";
    bodyText(c, cell, 1440, {
      size: 12.5,
      opacity: index === 0 ? 0.8 : 0.58,
      lh: 1.5,
      weight: index === 0 ? "medium" : undefined,
    });
  });
  divider(parent, dark ? COLORS.ivory : COLORS.forest, dark ? 0.16 : 0.1);
  return r;
}

function buildHandover() {
  const page = getOrCreatePage("14 · Handover", ["Handover", "99 · Handover"]);
  figma.currentPage = page;
  const base = canvasBase(page);
  const board = frame(null, { name: "Handover / Read me", w: 1440, gap: 0, p: 58, bg: COLORS.ivory });
  board.setPluginData(MARK, BUILD);

  const head = frame(board, { name: "Header", gap: 18, pb: 36 });
  eyebrow(head, "Handover · 13 November 2026");
  heading(head, "AfriYouth website design system.", 1440, { size: 66, lh: 0.96 });
  text(
    head,
    "A complete Figma rendering of the live AfriYouth site: 11 routes at 1440, 768 and 390 with independently adapted layouts, a reusable component library, foundations, wired interaction flows and this handover record. Content follows the official organisational profile and the implemented site copy; nothing has been invented to fill a gap.",
    { size: 16, color: COLORS.forest, opacity: 0.62, lh: 1.65, w: 1120 },
  );

  const contents = handBlock(board, "What is in this file");
  [
    ["01 · Foundations", "Implemented palette, official brand swatches, type scale, spacing, radius, elevation, variables and text styles."],
    ["02 · Components", "Buttons (5 styles × 3 states), badges, filter chips, fields, cards, header and footer references."],
    ["03–12 · Routes", "Home, About, What We Do, Programs, Insights, Insight Article, Impact, Get Involved, Partner With Us, Contact and 404."],
    ["13 · Interaction flows", "Interaction flows: mobile menu overlays and enquiry success states; links are wired across every route."],
    ["14 · Handover", "This page: route matrix, content rules, brand note, re-run instructions and known limitations."],
  ].forEach(([title, bodyLabel]) => handRow(contents, [title, bodyLabel], [300, 920]));

  const matrix = handBlock(board, "Route matrix");
  bodyText(matrix, "Every route is built three times. 1440 uses full navigation and multi-column layouts; 768 uses two columns, a compact header and a menu button; 390 uses single-column composition and a mobile menu. Layouts are adapted, not scaled copies.", 1440, { size: 13, opacity: 0.55, lh: 1.65 });
  handRow(matrix, ["Route", "Frames in file", "Status"], [300, 620, 300]);
  [
    ["Home", "Home / 1440 · 768 · 390", "Complete"],
    ["About", "About / 1440 · 768 · 390", "Complete"],
    ["What We Do", "What We Do / 1440 · 768 · 390", "Complete"],
    ["Programs", "Programs / 1440 · 768 · 390", "Complete · empty state"],
    ["Insights", "Insights / 1440 · 768 · 390", "Complete"],
    ["Insight Article", "Insight Article / 1440 · 768 · 390", "Complete · AfriYouth perspective"],
    ["Impact", "Impact / 1440 · 768 · 390", "Complete · measurement framework"],
    ["Get Involved", "Get Involved / 1440 · 768 · 390", "Complete · enquiry form"],
    ["Partner With Us", "Partner With Us / 1440 · 768 · 390", "Complete · enquiry form"],
    ["Contact", "Contact / 1440 · 768 · 390", "Complete · enquiry form"],
    ["404", "404 / 1440 · 768 · 390", "Complete · route list"],
  ].forEach((row) => handRow(matrix, row, [300, 620, 300]));

  const wiring = handBlock(board, "Interaction wiring", "Navigation, cards, CTAs, form submission, the mobile menu and the 404 route list all navigate between frames at the same width. Form submits resolve to the email-draft success state. Transitions are a 0.25s dissolve.");
  [
    ["Header", "Brand → Home · links → five primary routes · CTA → Partner With Us · menu → Mobile Menu (below 1024)."],
    ["Forms", "Get Involved, Partner With Us and Contact submit → Form Success. Success actions return to a route, not a dead end."],
    ["Cards", "Pathway cards → Programs / What We Do / Partner With Us. Insight cards → the first essay or the Insights index."],
    ["404", "Eight route rows navigate to their destination frames at the same width."],
  ].forEach((row) => handRow(wiring, row, [200, 1020]));

  const rules = handBlock(board, "Content rules applied", SITE.accountability);
  [
    ["Mission, vision, positioning", "Quoted from the official organisational profile."],
    ["Divisions and practices", "Five divisions, eight practices, ten-stage Evidence-to-Impact Accelerator as supplied."],
    ["Programmes and calls", "Calls are published with eligibility, deadline, format and a direct application route."],
    ["Impact", "The measurement framework and public reporting categories are shown. Figures are published only when verified."],
    ["People, partners, contact", "Details are published on appointment, with permission, or as direct channels are confirmed."],
    ["Insights", "Six AfriYouth perspectives on method and practice, labelled by editorial series."],
  ].forEach((row) => handRow(rules, row, [320, 900]));

  const brand = handBlock(
    board,
    "Brand note",
    "The official identity is applied across these frames: Dark Purple #0D0624 for primary ink and dark surfaces, Steel Pink #C723DF for accent and focus, Duke Blue #0301FF and Blue #0200A7 for supporting graphic marks, and Poppins for display and headings. Filled pink surfaces use the blush tint #FAE8FD so text keeps accessible contrast. DM Sans substitutes for the proprietary Gilroy body face. The official raised-hands figure mark is used with the typographic wordmark.",
  );
  bodyText(brand, "Fonts fall back to Inter if Poppins or DM Sans are unavailable in the Figma file. The fallback is automatic and recorded in the plugin output.", 1440, { size: 12, opacity: 0.45, lh: 1.6 });

  const rerun = handBlock(board, "Re-running the build");
  [
    ["1", "Figma → Plugins → Development → Import plugin from manifest…"],
    ["2", "Select figma-plugin/manifest.json from the project."],
    ["3", "Run “AfriYouth Design System Builder”."],
    ["4", "The plugin rebuilds only nodes marked as generated. Existing frames, components and styles you have added are left untouched."],
    ["5", "Photos are fetched from the live site. Without network access, image fills fall back to a quiet sage plate."],
  ].forEach((row) => handRow(rerun, row, [40, 1180]));

  const limits = handBlock(board, "Known limitations");
  [
    ["Forms", "Figma shows validation and success frames. On the site, a valid submission opens a pre-addressed email draft; no form data is stored."],
    ["Photography", "Five images from the AfriYouth brand guidelines. They are not photographs of AfriYouth staff, partners or participants."],
    ["Content", "Programme calls, impact data, people, partnerships and direct contact details are published as they are confirmed."],
    ["Interaction depth", "Key journeys are wired. Field-level validation, hover states and the newsletter pattern are documented in Components, not animated on the flow page."],
    ["Backend features", "The planned Impact Dashboard and application system are not represented as working products."],
  ].forEach((row) => handRow(limits, row, [240, 980]));

  const end = frame(board, { name: "End", gap: 10, pt: 32 });
  divider(end, COLORS.forest, 0.16);
  bodyText(end, "Prepared for design handover. No deployment, repository change or production configuration is part of this Figma file.", 1440, { size: 11.5, opacity: 0.45, lh: 1.6 });

  board.x = 0;
  board.y = base;
  board.primaryAxisSizingMode = "AUTO";
  return page;
}
