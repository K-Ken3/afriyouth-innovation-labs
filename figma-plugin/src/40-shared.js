/* ============================================================================
   40-shared.js : navigation, heroes, cards, forms, bands used by every page
   ========================================================================= */

const FRAMES = {};
const ROUTE_KEYS = {
  Home: "home",
  About: "about",
  "What We Do": "what",
  Programs: "programs",
  Insights: "insights",
  Impact: "impact",
  "Get Involved": "involved",
  "Partner With Us": "partner",
  Contact: "contact",
};

function navKey(label) {
  if (ROUTE_KEYS[label]) return ROUTE_KEYS[label];
  if (label === "Career & professional development" || label === "Innovation & venture lab") return "what";
  if (label === "Research & evidence" || label === "Policy & governance") return "what";
  return "home";
}

function hugText(parent, chars, options) {
  const t = txt(chars, options);
  parent.appendChild(t);
  t.layoutSizingHorizontal = "HUG";
  t.layoutSizingVertical = "HUG";
  return t;
}

const FIGURE_PATH =
  "M3.92 49.65C1.46 52 0 54.68 2.73 57.09c13.12 9.59 26.8 18.2 30.11 35.33 1.81 11.23-1.13 31.14 4.05 30.24 43.46-7.57 52.11-84.51 34.02-80.09-7.35 1.8-18.11 10.76-25.03 11.23-26.23 1.79-24.83-18.49-38.66-7.59-1.25.99-2.17 2.36-3.3 3.44Z " +
  "M53.98 35.78c0 6.94-5.63 12.57-12.58 12.57-6.94 0-12.58-5.63-12.58-12.57 0-6.94 5.64-12.56 12.58-12.56 6.95 0 12.58 5.62 12.58 12.56Z " +
  "m9.35 13.6.36-.42a5.02 5.02 0 0 1 6.54-.54l5.07 4.28a5.02 5.02 0 0 1 .54 6.54l-.36.42a5.02 5.02 0 0 1-6.54.54L9.9 20.14a5.02 5.02 0 0 1-.55-6.54Z " +
  "m75.88 13.6-.36-.42a5.02 5.02 0 0 0-6.55-.54l-5.06 4.28a5.02 5.02 0 0 0-.55 6.54l.36.42a5.02 5.02 0 0 0 6.55.54l5.06-4.28a5.02 5.02 0 0 0 .55-6.54Z " +
  "M43.27 0h-.55a4.64 4.64 0 0 0-4.65 4.64v6.63a4.64 4.64 0 0 0 4.64 4.64h.56a4.64 4.64 0 0 0 4.64-4.64V4.64A4.64 4.64 0 0 0 43.27 0Z";

function figureMark(parent, dark, scale) {
  const s = scale || 1;
  const height = Math.round(32 * s);
  const width = Math.round((89 / 123.56) * height);
  const mark = figma.createVector();
  mark.name = "Figure mark";
  mark.vectorPaths = [{ windingRule: "NONZERO", data: FIGURE_PATH }];
  mark.resize(width, height);
  mark.fills = [paint(dark ? COLORS.ivory : COLORS.forest)];
  parent.appendChild(mark);
  return mark;
}

function brandBlock(parent, dark, scale) {
  const s = scale || 1;
  const brand = frame(parent, { name: "Brand", dir: "row", gap: 10, align: "CENTER", hug: true });
  figureMark(brand, dark, s);
  const text = frame(brand, { name: "Wordmark", gap: 2, hug: true });
  const top = frame(text, { name: "Name", dir: "row", gap: 4, align: "START", hug: true });
  hugText(top, SITE.wordmark, {
    font: fontFor("heading", "semibold"),
    size: Math.round(17 * s),
    color: dark ? COLORS.ivory : COLORS.forest,
    track: 0.06,
    lh: 1,
  });
  const dot = figma.createRectangle();
  dot.name = "Brand dot";
  dot.resize(Math.round(5 * s), Math.round(5 * s));
  dot.cornerRadius = 999;
  dot.fills = [paint(COLORS.lime)];
  top.appendChild(dot);
  top.layoutSizingVertical = "HUG";
  hugText(text, "INNOVATION LABS", {
    font: fontFor("body", "semibold"),
    size: Math.round(9.5 * s),
    color: dark ? COLORS.ivory : COLORS.forest,
    opacity: dark ? 0.6 : 0.55,
    track: 0.2,
    lh: 1.2,
  });
  return brand;
}

function menuButton(parent, width) {
  const b = figma.createFrame();
  b.name = "Menu button";
  b.resize(44, 44);
  b.cornerRadius = 999;
  b.fills = [];
  b.strokes = [paint(COLORS.forest, 0.2)];
  b.strokeWeight = 1;
  b.strokeAlign = "INSIDE";
  parent.appendChild(b);
  const l1 = figma.createRectangle();
  l1.resize(16, 1.5);
  l1.x = 14;
  l1.y = 18;
  l1.fills = [paint(COLORS.forest)];
  b.appendChild(l1);
  const l2 = figma.createRectangle();
  l2.resize(11, 1.5);
  l2.x = 14;
  l2.y = 24;
  l2.fills = [paint(COLORS.forest)];
  b.appendChild(l2);
  if (parent.layoutMode) {
    b.layoutSizingHorizontal = "FIXED";
    b.layoutSizingVertical = "FIXED";
  }
  if (width && width < 1024) queueLink(b, "menu", width);
  return b;
}

function headerInto(parent, w, currentKey, options) {
  const opt = options || {};
  const d = dims(w);
  const h = frame(parent, {
    name: "Header",
    dir: "row",
    h: 76,
    pl: d.pad,
    pr: d.pad,
    bg: COLORS.paper,
    align: "CENTER",
    mainAlign: "SPACE_BETWEEN",
  });
  h.layoutSizingHorizontal = "FILL";
  h.layoutSizingVertical = "FIXED";
  const brand = brandBlock(h, false, 1);
  if (!opt.library) queueLink(brand, "home", w);

  if (w >= 1024) {
    const nav = frame(h, { name: "Primary navigation", dir: "row", gap: 26, align: "CENTER", hug: true });
    NAV_LINKS.forEach((label) => {
      const link = hugText(nav, label, {
        font: fontFor("body", "medium"),
        size: 13,
        color: COLORS.forest,
        opacity: label === currentKey ? 1 : 0.62,
        lh: 1.2,
      });
      if (!opt.library) queueLink(link, navKey(label), w);
    });
  }

  const right = frame(h, { name: "Header actions", dir: "row", gap: 16, align: "CENTER", hug: true });
  if (w >= 1280) {
    const gi = hugText(right, "Get Involved", {
      font: fontFor("body", "medium"),
      size: 13,
      color: COLORS.forest,
      opacity: 0.7,
      lh: 1.2,
    });
    if (!opt.library) queueLink(gi, "involved", w);
  }
  if (w >= 768) {
    const cta = buttonNode(right, "Partner With Us", "Primary", { arrow: false });
    if (!opt.library) queueLink(cta, "partner", w);
  }
  if (w < 1024) menuButton(right, w);

  const line = figma.createRectangle();
  line.name = "Header rule";
  line.resize(10, 1);
  line.fills = [paint(COLORS.forest, 0.12)];
  parent.appendChild(line);
  if (parent.layoutMode) {
    line.layoutSizingHorizontal = "FILL";
    line.layoutSizingVertical = "FIXED";
  }
  return h;
}

function footerInto(parent, w, options) {
  const opt = options || {};
  const d = dims(w);
  let taglineText = null;
  const footer = frame(parent, {
    name: "Footer",
    bg: COLORS.forest,
    gap: 44,
    pt: w >= 700 ? 72 : 52,
    pb: w >= 700 ? 36 : 28,
    pl: d.pad,
    pr: d.pad,
  });
  footer.layoutSizingHorizontal = "FILL";

  const top = frame(footer, { name: "Footer top", dir: w >= 1024 ? "row" : "column", gap: w >= 1024 ? 60 : 36, align: "MIN" });
  const intro = frame(top, { name: "Footer intro", gap: 14, w: w >= 1024 ? 390 : undefined });
  if (w < 1024) intro.layoutSizingHorizontal = "FILL";
  const brand = brandBlock(intro, true, 1.05);
  const tag = hugText(intro, SITE.tagline, {
    font: fontFor("body", "semibold"),
    size: 10,
    color: COLORS.lime,
    track: 0.16,
    lh: 1.4,
  });
  hugText(intro, SITE.description, {
    font: fontFor("body", "regular"),
    size: 12.5,
    color: COLORS.ivory,
    opacity: 0.6,
    lh: 1.65,
  });
  taglineText = tag;

  const groups = frame(top, { name: "Footer links", dir: "row", gap: 32, wrap: true, align: "MIN" });
  groups.layoutSizingHorizontal = "FILL";
  FOOTER_GROUPS.forEach((group) => {
    const g = frame(groups, { name: "Footer / " + group.title, gap: 12, w: w >= 1024 ? 190 : w >= 700 ? 200 : 145 });
    g.layoutSizingHorizontal = "FIXED";
    hugText(g, group.title.toUpperCase(), {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.ivory,
      opacity: 0.45,
      track: 0.16,
      lh: 1.2,
    });
    group.links.forEach((label) => {
      const link = hugText(g, label, {
        font: fontFor("body", "regular"),
        size: 12.5,
        color: COLORS.ivory,
        opacity: 0.72,
        lh: 1.45,
      });
      if (!opt.library) queueLink(link, navKey(label), w);
    });
  });

  const rule = figma.createRectangle();
  rule.name = "Footer rule";
  rule.resize(10, 1);
  rule.fills = [paint(COLORS.ivory, 0.18)];
  footer.appendChild(rule);
  rule.layoutSizingHorizontal = "FILL";
  rule.layoutSizingVertical = "FIXED";

  const bottom = frame(footer, { name: "Footer bottom", dir: w >= 700 ? "row" : "column", gap: 12, align: "CENTER", mainAlign: "SPACE_BETWEEN" });
  hugText(bottom, "© 2026 AfriYouth Innovation Labs", {
    font: fontFor("body", "regular"),
    size: 10.5,
    color: COLORS.ivory,
    opacity: 0.4,
    lh: 1.4,
  });
  hugText(bottom, "Research · Policy · Design · Enterprise · Foresight · Leadership", {
    font: fontFor("body", "medium"),
    size: 9,
    color: COLORS.ivory,
    opacity: 0.35,
    track: 0.14,
    lh: 1.4,
  });
  return footer;
}

function buttonNode(parent, label, style, options) {
  const opt = options || {};
  const variant = BUTTON_VARIANTS[(style || "Primary") + "|" + (opt.state || "Default")];
  if (variant) {
    const inst = variant.createInstance();
    const t = inst.findOne((node) => node.name === "Label");
    if (t) t.characters = label;
    const arrow = inst.findOne((node) => node.name === "Arrow");
    if (arrow) arrow.visible = opt.arrow !== false;
    parent.appendChild(inst);
    inst.layoutSizingHorizontal = opt.w ? "FIXED" : opt.fill ? "FILL" : "HUG";
    inst.layoutSizingVertical = "HUG";
    if (opt.w) inst.resize(opt.w, inst.height);
    return inst;
  }
  const fallback = frame(parent, {
    name: "Button / " + label,
    dir: "row",
    gap: 8,
    p: 14,
    pl: 22,
    pr: 22,
    radius: 999,
    bg: COLORS.forest,
    hug: true,
  });
  hugText(fallback, label, {
    font: fontFor("body", "medium"),
    size: 14,
    color: COLORS.ivory,
    lh: 1.2,
  });
  return fallback;
}

function metaPanel(parent, w, items, vertical) {
  const panel = frame(parent, { name: "Metadata", dir: vertical ? "column" : "row", gap: vertical ? 0 : 20, wrap: !vertical });
  if (vertical) panel.layoutSizingHorizontal = "FILL";
  items.forEach(([label, value]) => {
    const cell = frame(panel, {
      name: "Meta / " + label,
      gap: 6,
      pt: 12,
      pb: 12,
      w: vertical ? undefined : w >= 700 ? 210 : 150,
    });
    if (vertical) {
      cell.layoutSizingHorizontal = "FILL";
    } else {
      cell.layoutSizingHorizontal = "FIXED";
    }
    const rule = figma.createRectangle();
    rule.name = "Meta rule";
    rule.resize(10, 1);
    rule.fills = [paint(COLORS.forest, 0.15)];
    cell.appendChild(rule);
    rule.layoutSizingHorizontal = "FILL";
    rule.layoutSizingVertical = "FIXED";
    hugText(cell, String(label).toUpperCase(), {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.42,
      track: 0.14,
      lh: 1.2,
    });
    bodyText(cell, value, w, {
      size: 13,
      opacity: 0.82,
      lh: 1.35,
      weight: "medium",
    });
  });
  return panel;
}

function pageHero(parent, w, meta, options) {
  const opt = options || {};
  const d = dims(w);
  const t = tscale(w);
  const hero = section(parent, w, { name: "Hero", py: w >= 700 ? 84 : 56, bg: opt.bg });
  const wrap = w >= 1024
    ? frame(hero, { name: "Hero layout", dir: "row", gap: 56, align: "MIN" })
    : frame(hero, { name: "Hero layout", gap: 28 });
  if (w >= 1024) {
    const left = frame(wrap, { name: "Hero copy", gap: 22 });
    left.layoutSizingHorizontal = "FILL";
    const right = frame(wrap, { name: "Hero meta", gap: 0, w: 300 });
    right.layoutSizingHorizontal = "FIXED";
    eyebrow(left, "Chapter " + meta.chapter + " · " + meta.eyebrow);
    heading(left, meta.title, w, { size: t.xl, lh: 0.94 });
    bodyText(left, meta.intro, w, { size: t.lede, opacity: 0.66, lh: 1.55 });
    metaPanel(right, w, meta.meta || [], true);
  } else {
    eyebrow(wrap, "Chapter " + meta.chapter + " · " + meta.eyebrow);
    heading(wrap, meta.title, w, { size: t.xl, lh: 0.96 });
    bodyText(wrap, meta.intro, w, { size: t.lede, opacity: 0.66, lh: 1.55 });
    if (meta.meta && meta.meta.length) metaPanel(wrap, w, meta.meta, false);
  }
  return hero;
}

function sectionHead(parent, w, eyebrowLabel, title, intro) {
  const head = w >= 1024
    ? frame(parent, { name: "Section heading", dir: "row", gap: 48, align: "MIN" })
    : frame(parent, { name: "Section heading", gap: 18 });
  if (w >= 1024) {
    const left = frame(head, { name: "Heading", gap: 16 });
    left.layoutSizingHorizontal = "FILL";
    eyebrow(left, eyebrowLabel);
    heading(left, title, w, { size: tscale(w).xl, lh: 0.96 });
    const right = frame(head, { name: "Intro", w: 360, gap: 10 });
    right.layoutSizingHorizontal = "FIXED";
    bodyText(right, intro, w, { size: 14, opacity: 0.62, lh: 1.6 });
    return head;
  }
  eyebrow(head, eyebrowLabel);
  heading(head, title, w, { size: tscale(w).lg, lh: 1 });
  bodyText(head, intro, w, { size: 14, opacity: 0.62, lh: 1.6 });
  return head;
}

function cardRow(parent, w, count) {
  const d = dims(w);
  const cols = Math.min(count, d.cols);
  const width = Math.floor((d.content - d.gap * (cols - 1)) / cols);
  const grid = frame(parent, { name: "Card grid", dir: "row", gap: d.gap, wrap: true, align: "MIN" });
  grid.setPluginData("cardWidth", String(width));
  return { grid, width };
}

function cardBase(parent, w, cw, options) {
  const opt = options || {};
  const c = frame(parent, {
    name: opt.name || "Card",
    gap: opt.gap === undefined ? 12 : opt.gap,
    p: opt.p || (w >= 700 ? 24 : 20),
    bg: opt.bg || COLORS.paper,
    border: opt.border === null ? null : opt.border || COLORS.forest,
    borderWidth: 1,
    radius: 20,
    w: cw,
    h: opt.h,
    clip: true,
  });
  c.layoutSizingHorizontal = "FIXED";
  return c;
}

function areaCardNode(parent, w, area, cw) {
  const c = cardBase(parent, w, cw, { name: "Area / " + area.title, h: w >= 1200 ? 340 : w >= 700 ? 330 : undefined });
  hugText(c, area.number + " · " + (area.id === "innovation" ? "CHALLENGE" : area.id === "impact-measurement" ? "CROSS-CUTTING" : "DIVISION"), {
    font: fontFor("body", "semibold"),
    size: 9.5,
    color: COLORS.forest,
    opacity: 0.45,
    track: 0.14,
    lh: 1.2,
  });
  heading(c, area.title, w, { size: w >= 1200 ? 25 : 23, lh: 1.06, track: -0.035 });
  bodyText(c, area.tagline, w, { size: 13, opacity: 0.75, lh: 1.5 });
  bodyText(c, area.summary, w, { size: 12.5, opacity: 0.55, lh: 1.6 });
  const grow = frame(c, { name: "Grow", h: 1, w: 1 });
  grow.layoutGrow = 1;
  divider(c, COLORS.forest, 0.14);
  const link = frame(c, { name: "Card action", dir: "row", gap: 8, align: "CENTER", hug: true });
  hugText(link, "View practice", {
    font: fontFor("body", "medium"),
    size: 12,
    color: COLORS.forest,
    lh: 1.2,
  });
  hugText(link, "→", { size: 13, color: COLORS.forest, opacity: 0.6, lh: 1.1 });
  queueLink(c, "what", w);
  return c;
}

function insightCardNode(parent, w, insight, cw, photoKey) {
  const c = cardBase(parent, w, cw, { name: "Insight / " + insight.title, h: w >= 1200 ? 420 : w >= 700 ? 400 : undefined, gap: 0, p: 0 });
  if (photoKey) {
    photo(c, photoKey, { w: cw, h: w >= 700 ? 186 : 170, radius: 0, name: "Insight photo" });
  } else {
    const plate = frame(c, { name: "Photo plate", h: w >= 700 ? 186 : 170, bg: COLORS.sage });
    plate.layoutSizingHorizontal = "FILL";
  }
  const inner = frame(c, { name: "Content", gap: 10, p: w >= 700 ? 20 : 18 });
  hugText(inner, insight.category.toUpperCase() + " · " + insight.kind.toUpperCase(), {
    font: fontFor("body", "semibold"),
    size: 9,
    color: COLORS.forest,
    opacity: 0.45,
    track: 0.14,
    lh: 1.2,
  });
  heading(inner, insight.title, w, { size: w >= 700 ? 21 : 19, lh: 1.12, track: -0.03 });
  bodyText(inner, insight.excerpt, w, { size: 12.5, opacity: 0.55, lh: 1.55 });
  const grow = frame(inner, { name: "Grow", h: 1, w: 1 });
  grow.layoutGrow = 1;
  hugText(inner, insight.reading, {
    font: fontFor("body", "medium"),
    size: 10,
    color: COLORS.forest,
    opacity: 0.4,
    lh: 1.2,
  });
  queueLink(c, insight.slug === ARTICLE.slug ? "article" : "insights", w);
  return c;
}

function pathCardNode(parent, w, item, cw, index) {
  const bg = index === 0 ? COLORS.lime : index === 1 ? COLORS.paper : COLORS.sage;
  const c = cardBase(parent, w, cw, { name: "Pathway / " + item.title, bg, border: index === 0 ? null : COLORS.forest, h: w >= 1200 ? 300 : undefined });
  hugText(c, item.number + " · " + item.audience.toUpperCase(), {
    font: fontFor("body", "semibold"),
    size: 9.5,
    color: COLORS.forest,
    opacity: 0.55,
    track: 0.14,
    lh: 1.2,
  });
  heading(c, item.title, w, { size: w >= 700 ? 27 : 24, lh: 1.05 });
  bodyText(c, item.text, w, { size: 13, opacity: 0.68, lh: 1.6 });
  const grow = frame(c, { name: "Grow", h: 1, w: 1 });
  grow.layoutGrow = 1;
  divider(c, COLORS.forest, 0.18);
  const link = frame(c, { name: "Pathway action", dir: "row", gap: 8, align: "CENTER", hug: true });
  hugText(link, item.cta, { font: fontFor("body", "medium"), size: 12, color: COLORS.forest, lh: 1.2 });
  hugText(link, "→", { size: 13, color: COLORS.forest, opacity: 0.6, lh: 1.1 });
  queueLink(c, item.key, w);
  return c;
}

function dimensionCard(parent, w, dimension, cw) {
  const c = cardBase(parent, w, cw, { name: "Dimension / " + dimension.title });
  hugText(c, dimension.number + " · " + dimension.title.toUpperCase(), {
    font: fontFor("body", "semibold"),
    size: 9.5,
    color: COLORS.forest,
    opacity: 0.45,
    track: 0.14,
    lh: 1.2,
  });
  heading(c, dimension.title, w, { size: 26, lh: 1.05 });
  bodyText(c, dimension.text, w, { size: 12.5, opacity: 0.6, lh: 1.6 });
  const grow = frame(c, { name: "Grow", h: 1, w: 1 });
  grow.layoutGrow = 1;
  divider(c, COLORS.forest, 0.14);
  bodyText(c, dimension.question, w, { size: 11.5, opacity: 0.48, lh: 1.45 });
  return c;
}

function fieldMock(parent, w, label, placeholder, options) {
  const opt = options || {};
  const field = frame(parent, { name: "Field / " + label, gap: 8 });
  field.layoutSizingHorizontal = "FILL";
  hugText(field, label.toUpperCase() + (opt.required ? " *" : ""), {
    font: fontFor("body", "semibold"),
    size: 9.5,
    color: COLORS.forest,
    opacity: 0.55,
    track: 0.12,
    lh: 1.2,
  });
  const box = frame(field, {
    name: "Input",
    h: opt.area ? 96 : 48,
    p: 14,
    bg: COLORS.paper,
    border: COLORS.forest,
    borderWidth: 1,
    radius: 10,
    align: opt.area ? "MIN" : "CENTER",
  });
  box.layoutSizingHorizontal = "FILL";
  box.layoutSizingVertical = "FIXED";
  hugText(box, placeholder, { size: 13, color: COLORS.forest, opacity: 0.35, lh: 1.4 });
  if (opt.hint) {
    hugText(field, opt.hint, { size: 10, color: COLORS.forest, opacity: 0.4, lh: 1.4 });
  }
  return field;
}

function formPanel(parent, w, options) {
  const opt = options || {};
  const panel = frame(parent, {
    name: "Form / " + (opt.title || "Enquiry"),
    gap: 18,
    p: w >= 700 ? 32 : 22,
    bg: COLORS.paper,
    border: COLORS.forest,
    borderWidth: 1,
    radius: 20,
  });
  eyebrow(panel, opt.eyebrow || "Enquiry form");
  heading(panel, opt.title || "Tell us what you are working on.", w, { size: w >= 700 ? 30 : 25, lh: 1.06 });
  if (opt.intro) bodyText(panel, opt.intro, w, { size: 13, opacity: 0.6, lh: 1.6 });
  const notice = frame(panel, { name: "Form notice", gap: 6, p: 14, bg: COLORS.sage, radius: 12 });
  hugText(notice, "NOTHING IS SENT", {
    font: fontFor("body", "semibold"),
    size: 9,
    color: COLORS.forest,
    opacity: 0.6,
    track: 0.14,
    lh: 1.2,
  });
  bodyText(notice, "This form validates input in the browser to demonstrate the experience. Nothing is sent, stored or shared, and no confirmation email will arrive.", w, { size: 11.5, opacity: 0.62, lh: 1.5 });

  const fields = frame(panel, { name: "Fields", dir: w >= 700 ? "row" : "column", gap: 16, wrap: true, align: "MIN" });
  const half = Math.floor((w >= 700 ? dims(w).content - 64 - (w >= 700 ? 16 : 0) : dims(w).content - 44) / 2);
  (opt.fields || []).forEach((field) => {
    const holder = frame(fields, { name: "Field holder", w: field.full || w < 700 ? undefined : half });
    if (!field.full && w >= 700) holder.layoutSizingHorizontal = "FIXED";
    else holder.layoutSizingHorizontal = "FILL";
    fieldMock(holder, w, field.label, field.placeholder, field);
  });
  const consent = frame(panel, { name: "Consent", dir: "row", gap: 10, align: "MIN" });
  const box = figma.createRectangle();
  box.name = "Checkbox";
  box.resize(18, 18);
  box.cornerRadius = 4;
  box.fills = [paint(COLORS.paper)];
  box.strokes = [paint(COLORS.forest, 0.35)];
  box.strokeWeight = 1;
  consent.appendChild(box);
  bodyText(consent, "I agree that AfriYouth may use these details to respond to my enquiry.", w, { size: 11, opacity: 0.55, lh: 1.5 });

  const actions = frame(panel, { name: "Form actions", dir: "row", gap: 14, align: "CENTER", mainAlign: "SPACE_BETWEEN" });
  hugText(actions, "Required fields are marked *", { size: 10, color: COLORS.forest, opacity: 0.4, lh: 1.3 });
  const submit = buttonNode(actions, opt.submit || "Submit", "Primary");
  queueLink(submit, "success", w);
  return panel;
}

function faqList(parent, w, faqs) {
  const list = frame(parent, { name: "FAQ", gap: 0 });
  faqs.forEach((faq) => {
    const item = frame(list, { name: "FAQ / " + faq.q, gap: 10, pt: 18, pb: 18 });
    const topRow = frame(item, { name: "Question", dir: "row", gap: 16, align: "MIN", mainAlign: "SPACE_BETWEEN" });
    bodyText(topRow, faq.q, w, { size: 14, opacity: 0.9, lh: 1.45, weight: "medium" });
    hugText(topRow, "−", { font: fontFor("heading", "medium"), size: 18, color: COLORS.forest, opacity: 0.5, lh: 1 });
    bodyText(item, faq.a, w, { size: 12.5, opacity: 0.55, lh: 1.65 });
    divider(list, COLORS.forest, 0.14);
  });
  return list;
}

function pendingPanel(parent, w, title, bodyLabel, note) {
  const panel = frame(parent, {
    name: "Profile / " + title,
    gap: 12,
    p: w >= 700 ? 28 : 20,
    bg: COLORS.paper,
    border: COLORS.forest,
    borderWidth: 1,
    radius: 20,
  });
  hugText(panel, "CURRENT STATUS", {
    font: fontFor("body", "semibold"),
    size: 9,
    color: COLORS.forest,
    opacity: 0.45,
    track: 0.16,
    lh: 1.2,
  });
  heading(panel, title, w, { size: w >= 700 ? 26 : 22, lh: 1.06 });
  bodyText(panel, bodyLabel, w, { size: 12.5, opacity: 0.58, lh: 1.6 });
  if (note) bodyText(panel, note, w, { size: 11, opacity: 0.42, lh: 1.5 });
  return panel;
}

function ctaBand(parent, w, title, primary, secondary, dark) {
  const band = section(parent, w, { name: "CTA", bg: dark ? COLORS.forest : COLORS.lime, py: w >= 700 ? 84 : 56 });
  const inner = w >= 1024 ? frame(band, { name: "CTA layout", dir: "row", gap: 48, align: "CENTER", mainAlign: "SPACE_BETWEEN" }) : frame(band, { name: "CTA layout", gap: 24 });
  if (w >= 1024) {
    heading(inner, title, w, { size: tscale(w).xl, lh: 0.96, color: dark ? COLORS.ivory : COLORS.forest });
    const actions = frame(inner, { name: "Actions", dir: "row", gap: 12, align: "CENTER", hug: true });
    const a = buttonNode(actions, primary.label, dark ? "Lime" : "Primary", { arrow: true });
    queueLink(a, primary.key, w);
    if (secondary) {
      const b = buttonNode(actions, secondary.label, dark ? "Light" : "Outline", { arrow: false });
      queueLink(b, secondary.key, w);
    }
  } else {
    heading(inner, title, w, { size: tscale(w).lg, lh: 1, color: dark ? COLORS.ivory : COLORS.forest });
    const actions = frame(inner, { name: "Actions", dir: "row", gap: 12, wrap: true });
    const a = buttonNode(actions, primary.label, dark ? "Lime" : "Primary", { arrow: true });
    queueLink(a, primary.key, w);
    if (secondary) {
      const b = buttonNode(actions, secondary.label, dark ? "Light" : "Outline", { arrow: false });
      queueLink(b, secondary.key, w);
    }
  }
  return band;
}

function photoPlate(parent, w, key, captionLabel, height) {
  const plate = frame(parent, { name: "Photo plate", gap: 10 });
  photo(plate, key, { h: height || (w >= 1200 ? 380 : w >= 700 ? 280 : 210), radius: 16 });
  caption(plate, captionLabel, w);
  return plate;
}

function tickerBand(parent, w) {
  const band = frame(parent, { name: "Ticker", dir: "row", gap: 18, wrap: true, p: 16, pl: dims(w).pad, pr: dims(w).pad, bg: COLORS.forest, align: "CENTER" });
  TICKER.forEach((item, index) => {
    if (index > 0) {
      const dot = figma.createRectangle();
      dot.name = "Ticker dot";
      dot.resize(4, 4);
      dot.cornerRadius = 999;
      dot.fills = [paint(COLORS.lime, 0.7)];
      band.appendChild(dot);
    }
    hugText(band, item, {
      font: fontFor("body", "medium"),
      size: 10.5,
      color: COLORS.ivory,
      opacity: 0.7,
      track: 0.08,
      lh: 1.2,
    });
  });
  return band;
}

function officialNote(parent, w) {
  return bodyText(parent, "Mission and vision are quoted from the official organisational profile. Programmes, partnerships, people, impact figures and contact details remain unpublished until verified.", w, {
    size: 11,
    opacity: 0.45,
    lh: 1.55,
  });
}
