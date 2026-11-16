/* ============================================================================
   60-interactions.js : mobile menu overlays and form success frames
   Links are queued from every page and resolved here in one second pass.
   ========================================================================= */

function closeGlyph(parent) {
  const box = frame(parent, {
    name: "Close",
    w: 44,
    h: 44,
    radius: 999,
    border: COLORS.ivory,
    borderWidth: 1,
    align: "CENTER",
    mainAlign: "CENTER",
  });
  hugText(box, "×", {
    font: fontFor("body", "regular"),
    size: 24,
    color: COLORS.ivory,
    lh: 1,
  });
  return box;
}

async function menuFrame(page, w) {
  const d = dims(w);
  const f = await newPageFrame(page, PAGE_LABEL.menu + " / " + w, w);
  f.primaryAxisSizingMode = "FIXED";
  f.resize(w, w >= 700 ? 1024 : 844);
  f.fills = [paint(COLORS.forest)];
  mark(f);

  const top = row(f, { name: "Menu top", h: 76, pl: d.pad, pr: d.pad, mainAlign: "SPACE_BETWEEN" });
  top.layoutSizingHorizontal = "FILL";
  top.layoutSizingVertical = "FIXED";
  const brand = brandBlock(top, true, 1);
  queueLink(brand, "home", w);
  const close = closeGlyph(top);
  queueLink(close, "home", w);

  const nav = frame(f, { name: "Menu navigation", gap: 0, pl: d.pad, pr: d.pad, pt: 24, pb: 24 });
  nav.layoutSizingHorizontal = "FILL";
  NAV_LINKS.concat(["Get Involved", "Partner With Us", "Contact"]).forEach((label, index) => {
    if (index === NAV_LINKS.length) {
      divider(nav, COLORS.ivory, 0.18);
      const gap = frame(nav, { name: "Nav gap", h: 14, w: 1 });
      gap.layoutSizingHorizontal = "FILL";
      gap.layoutSizingVertical = "FIXED";
    }
    const r = frame(nav, { name: "Menu / " + label, dir: "row", gap: 14, align: "CENTER", pt: 12, pb: 12 });
    hugText(r, String(index + 1).padStart(2, "0"), {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.lime,
      opacity: 0.65,
      track: 0.12,
      lh: 1.2,
    });
    hugText(r, label, {
      font: fontFor("heading", "medium"),
      size: w >= 700 ? 40 : 30,
      color: COLORS.ivory,
      track: -0.04,
      lh: 1.05,
    });
    divider(nav, COLORS.ivory, 0.14);
    queueLink(r, navKey(label), w);
  });

  const grow = frame(f, { name: "Menu spacer", w: 1, h: 1 });
  grow.layoutGrow = 1;

  const bottom = frame(f, { name: "Menu footer", gap: 8, pl: d.pad, pr: d.pad, pt: 20, pb: 28 });
  bottom.layoutSizingHorizontal = "FILL";
  hugText(bottom, SITE.tagline, {
    font: fontFor("body", "semibold"),
    size: 9.5,
    color: COLORS.lime,
    track: 0.16,
    lh: 1.4,
  });
  hugText(bottom, "AfriYouth Innovation Labs · 2026", {
    font: fontFor("body", "regular"),
    size: 10.5,
    color: COLORS.ivory,
    opacity: 0.4,
    lh: 1.4,
  });

  FRAMES["menu|" + w] = f;
  return f;
}

async function successFrame(page, w, x, y) {
  const f = await newPageFrame(page, PAGE_LABEL.success + " / " + w, w);
  f.x = x;
  f.y = y;
  const label = txt("Form success · " + w + " px", {
    font: fontFor("body", "semibold"),
    size: 15,
    color: COLORS.forest,
    opacity: 0.55,
    track: 0.04,
    lh: 1.2,
  });
  label.x = x;
  label.y = y - 34;
  label.setPluginData(MARK, BUILD);

  headerInto(f, w, null);
  const band = section(f, w, { name: "Success", py: w >= 700 ? 96 : 56 });
  band.counterAxisAlignItems = "CENTER";
  const panel = frame(band, {
    name: "Success panel",
    gap: 18,
    p: w >= 700 ? 36 : 24,
    bg: COLORS.paper,
    border: COLORS.forest,
    borderWidth: 1,
    radius: 20,
    w: w >= 1200 ? 640 : w >= 700 ? 560 : 350,
  });
  panel.counterAxisAlignItems = "CENTER";
  const badge = frame(panel, { name: "Check", w: 56, h: 56, radius: 999, bg: COLORS.lime, align: "CENTER", mainAlign: "CENTER" });
  hugText(badge, "✓", {
    font: fontFor("body", "semibold"),
    size: 24,
    color: COLORS.forest,
    lh: 1,
  });
  eyebrow(panel, "Email draft ready");
  heading(panel, FORM_COPY.successTitle, w, { size: w >= 700 ? 42 : 28, lh: 1.02, align: "CENTER" });
  bodyText(panel, FORM_COPY.successBody, w, { size: 13.5, opacity: 0.62, lh: 1.7, align: "CENTER" });
  const actions = frame(panel, { name: "Success actions", dir: "row", gap: 10, wrap: true, align: "CENTER", mainAlign: "CENTER" });
  const backToForm = buttonNode(actions, "Get involved", "Primary", { arrow: false });
  queueLink(backToForm, "involved", w);
  const partner = buttonNode(actions, "Partner with us", "Outline", { arrow: false });
  queueLink(partner, "partner", w);
  const contact = buttonNode(actions, "Contact", "Ghost", { arrow: false });
  queueLink(contact, "contact", w);

  footerInto(f, w);
  FRAMES["success|" + w] = f;
  return f;
}

async function buildInteractionFlows() {
  const page = getOrCreatePage("13 · Interaction flows", ["Interaction Flows"]);
  await figma.setCurrentPageAsync(page);
  const base = canvasBase(page);

  const board = frame(null, { name: "Interaction notes", w: 1440, p: 58, gap: 20, bg: COLORS.ivory });
  board.setPluginData(MARK, BUILD);
  board.x = 0;
  board.y = base;
  eyebrow(board, "Interaction · handover");
  heading(board, "Wired journeys, not decorative links.", 1440, { size: 58, lh: 0.98 });
  text(board, "Navigation, pathway cards, insight cards, calls to action, form submissions, the mobile menu and the 404 route list link to their destination frames at the same width. Transitions use a 0.25s dissolve. Forms resolve to the email-draft success state.", { size: 15, color: COLORS.forest, opacity: 0.6, lh: 1.65, w: 1100 });

  const flows = [
    "Header brand and menu close → Home",
    "Header navigation → About / What We Do / Programs / Insights / Impact",
    "Header CTA → Partner With Us · secondary link → Get Involved",
    "Home pathway cards → Programs / What We Do / Partner With Us",
    "Insight cards → Insight Article (first essay) or Insights",
    "Every form submit → Form Success · success buttons → Get Involved / Partner / Contact",
    "404 route list → all eight public routes",
  ];
  const list = frame(board, { name: "Flow list", gap: 0 });
  flows.forEach((item, index) => {
    const r = frame(list, { name: "Flow " + (index + 1), dir: "row", gap: 16, align: "MIN", pt: 12, pb: 12 });
    hugText(r, String(index + 1).padStart(2, "0"), {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.4,
      track: 0.12,
      lh: 1.3,
    });
    bodyText(r, item, 1440, { size: 13.5, opacity: 0.7, lh: 1.5 });
    divider(list, COLORS.forest, 0.14);
  });

  board.primaryAxisSizingMode = "AUTO";
  const boardHeight = board.height;
  board.x = XPOS[1];
  board.y = 0;

  const menu390 = await menuFrame(page, 390);
  menu390.x = 0;
  menu390.y = base + boardHeight + 140;

  const menu768 = await menuFrame(page, 768);
  menu768.x = 470;
  menu768.y = base + boardHeight + 140;

  const success1440 = await successFrame(page, 1440, 1520, base + boardHeight + 140);
  await successFrame(page, 768, 1520, base + boardHeight + 140 + success1440.height + 120);
  await successFrame(page, 390, 2350, base + boardHeight + 140 + success1440.height + 120);
  return page;
}
