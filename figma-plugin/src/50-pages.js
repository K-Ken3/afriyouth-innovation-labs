/* ============================================================================
   50-pages.js : every route at 1440 / 768 / 390
   Each width is laid out independently — not a resized copy.
   ========================================================================= */

const PAGE_LABEL = {
  home: "Home",
  about: "About",
  what: "What We Do",
  programs: "Programs",
  insights: "Insights",
  article: "Insight Article",
  impact: "Impact",
  involved: "Get Involved",
  partner: "Partner With Us",
  contact: "Contact",
  notfound: "404",
  menu: "Mobile Menu",
  success: "Form Success",
};

const XPOS = [0, 1520, 2368];

const INSIGHT_CATS = ["All insights"].concat(
  INSIGHTS.map((item) => item.category).filter((value, index, all) => all.indexOf(value) === index),
);

/* ---- layout helpers ------------------------------------------------------ */

function twoCol(parent, leftW, rightW, gap) {
  const r = frame(parent, { name: "Two column", dir: "row", gap: gap || 48, align: "MIN" });
  const l = frame(r, { name: "Left", gap: 22, w: leftW });
  l.layoutSizingHorizontal = "FIXED";
  const rr = frame(r, { name: "Right", gap: 22, w: rightW });
  rr.layoutSizingHorizontal = "FIXED";
  return [l, rr];
}

function darkHeading(parent, w, eyebrowLabel, title, intro) {
  eyebrow(parent, eyebrowLabel, { color: COLORS.ivory, dot: COLORS.lime, opacity: 0.75 });
  heading(parent, title, w, { color: COLORS.ivory, size: tscale(w).xl, lh: 0.96 });
  if (intro) bodyText(parent, intro, w, { color: COLORS.ivory, opacity: 0.6, size: 15, lh: 1.65 });
}

function capList(parent, w, items, color) {
  const list = frame(parent, { name: "Capabilities", gap: 8 });
  items.forEach((item) => {
    const r = frame(list, { name: "Capability", dir: "row", gap: 10, align: "MIN" });
    const dot = figma.createRectangle();
    dot.name = "Bullet";
    dot.resize(4, 4);
    dot.cornerRadius = 999;
    dot.fills = [paint(color || COLORS.forest, color ? 0.7 : 0.5)];
    r.appendChild(dot);
    dot.layoutSizingHorizontal = "FIXED";
    dot.layoutSizingVertical = "FIXED";
    bodyText(r, item, w, { size: 12.5, opacity: color ? 0.65 : 0.62, lh: 1.5 });
  });
  return list;
}

function bulletRows(parent, w, items, dark) {
  const list = frame(parent, { name: "List", gap: 0 });
  items.forEach((item, index) => {
    const r = frame(list, { name: "Row " + (index + 1), dir: w >= 700 ? "row" : "column", gap: w >= 700 ? 24 : 6, align: "MIN", pt: 16, pb: 16 });
    if (w >= 700) {
      const n = frame(r, { name: "Number", w: 44 });
      n.layoutSizingHorizontal = "FIXED";
      hugText(n, item.number, {
        font: fontFor("heading", "regular"),
        size: 20,
        color: dark ? COLORS.ivory : COLORS.forest,
        opacity: dark ? 0.3 : 0.22,
        lh: 1.1,
      });
      const title = frame(r, { name: "Title", w: w >= 1200 ? 300 : 200 });
      title.layoutSizingHorizontal = "FIXED";
      hugText(title, item.title, {
        font: fontFor("heading", "medium"),
        size: w >= 1200 ? 26 : 21,
        color: dark ? COLORS.ivory : COLORS.forest,
        track: -0.035,
        lh: 1.05,
      });
      bodyText(r, item.text, w, {
        size: 13,
        color: dark ? COLORS.ivory : COLORS.forest,
        opacity: dark ? 0.6 : 0.6,
        lh: 1.6,
      });
    } else {
      hugText(r, item.number, {
        font: fontFor("body", "semibold"),
        size: 10,
        color: COLORS.forest,
        opacity: 0.4,
        track: 0.14,
        lh: 1.2,
      });
      hugText(r, item.title, {
        font: fontFor("heading", "medium"),
        size: 23,
        color: COLORS.forest,
        track: -0.035,
        lh: 1.05,
      });
      bodyText(r, item.text, w, { size: 13, opacity: 0.6, lh: 1.6 });
    }
    divider(list, dark ? COLORS.ivory : COLORS.forest, dark ? 0.16 : 0.14);
  });
  return list;
}

function stepGrid(parent, w, items, cols, dark) {
  const d = dims(w);
  const cw = Math.floor((d.content - d.gap * (cols - 1)) / cols);
  const grid = frame(parent, { name: "Steps", dir: "row", gap: d.gap, wrap: true, align: "MIN" });
  items.forEach((item, index) => {
    const c = frame(grid, { name: item.number + " " + item.title, gap: 8, w: cw, pt: 14 });
    c.layoutSizingHorizontal = "FIXED";
    const rule = figma.createRectangle();
    rule.name = "Step rule";
    rule.resize(cw, 1);
    rule.fills = [paint(dark ? COLORS.ivory : COLORS.forest, dark ? 0.22 : 0.18)];
    c.appendChild(rule);
    rule.layoutSizingHorizontal = "FILL";
    rule.layoutSizingVertical = "FIXED";
    const dot = figma.createRectangle();
    dot.name = "Step dot";
    dot.resize(5, 5);
    dot.cornerRadius = 999;
    dot.fills = [paint(dark ? COLORS.lime : COLORS.clay)];
    c.appendChild(dot);
    dot.layoutSizingHorizontal = "FIXED";
    dot.layoutSizingVertical = "FIXED";
    hugText(c, item.number, {
      font: fontFor("heading", "regular"),
      size: 22,
      color: dark ? COLORS.ivory : COLORS.forest,
      opacity: dark ? 0.3 : 0.24,
      lh: 1.05,
    });
    hugText(c, item.title, {
      font: fontFor("heading", "medium"),
      size: 18,
      color: dark ? COLORS.ivory : COLORS.forest,
      track: -0.025,
      lh: 1.1,
    });
    bodyText(c, item.text, w, {
      size: 12,
      color: dark ? COLORS.ivory : COLORS.forest,
      opacity: dark ? 0.55 : 0.58,
      lh: 1.55,
    });
    c.setPluginData("step", String(index));
  });
  return grid;
}

function tagRow(parent, w, tags, dark) {
  const r = frame(parent, { name: "Tags", dir: "row", gap: 8, wrap: true });
  tags.forEach((tag) => {
    pill(r, tag, {
      bg: dark ? COLORS.ivory : COLORS.sage,
      color: COLORS.forest,
      size: 9,
    });
  });
  return r;
}

function statStrip(parent, containerWidth, items) {
  const strip = frame(parent, { name: "Facts", gap: 12 });
  const r = frame(strip, { name: "Facts row", dir: "row", gap: 0, wrap: true });
  const cw = Math.floor(containerWidth / items.length);
  items.forEach((item, index) => {
    const cell = frame(r, { name: "Fact / " + item[0], gap: 6, w: cw, pt: index === 0 ? 0 : 0 });
    cell.layoutSizingHorizontal = "FIXED";
    hugText(cell, item[0].toUpperCase(), {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.4,
      track: 0.14,
      lh: 1.2,
    });
    hugText(cell, item[1], {
      font: fontFor("body", "medium"),
      size: 12,
      color: COLORS.forest,
      opacity: 0.75,
      lh: 1.4,
    });
  });
  return strip;
}

function pageLink(parent, w, label, key) {
  const link = frame(parent, { name: "Link / " + label, dir: "row", gap: 8, align: "CENTER", hug: true });
  hugText(link, label, {
    font: fontFor("body", "medium"),
    size: 12.5,
    color: COLORS.forest,
    lh: 1.2,
  });
  hugText(link, "→", { size: 13, color: COLORS.forest, opacity: 0.6, lh: 1.1 });
  queueLink(link, key, w);
  return link;
}

function actionRow(parent, w, items) {
  const actions = frame(parent, { name: "Actions", dir: "row", gap: 12, wrap: true });
  items.forEach((item) => {
    const b = buttonNode(actions, item.label, item.style || "Primary", { arrow: item.arrow });
    if (item.key) queueLink(b, item.key, w);
  });
  return actions;
}

/* ---- HOME ---------------------------------------------------------------- */

function homePage(f, w) {
  headerInto(f, w, null);

  const hero = section(f, w, { name: "Hero", py: w >= 700 ? 72 : 44 });
  const top = row(hero, { name: "Edition", mainAlign: "SPACE_BETWEEN" });
  eyebrow(top, "Research · Policy · Design · Enterprise · Foresight · Leadership");
  hugText(top, "AFRIYOUTH INNOVATION LABS · 2026", {
    font: fontFor("body", "semibold"),
    size: 9.5,
    color: COLORS.forest,
    opacity: 0.42,
    track: 0.16,
    lh: 1.2,
  });
  divider(hero, COLORS.forest, 0.15);

  if (w >= 1024) {
    const [copy, visual] = twoCol(hero, dims(w).content - 478, 430, 48);
    heading(copy, "Evidence. Innovation.\nAfrican futures.", w, { size: w >= 1200 ? 88 : 68, lh: 0.9 });
    bodyText(
      copy,
      "A research, innovation and policy consulting firm advancing promising ideas from Africa's young innovators — connecting evidence, design, enterprise and policy.",
      w,
      { size: 19, opacity: 0.7, lh: 1.55 },
    );
    actionRow(copy, w, [
      { label: "Explore our work", style: "Primary", key: "what" },
      { label: "Find opportunities", style: "Outline", key: "programs", arrow: false },
    ]);
    statStrip(copy, dims(w).content - 478, [
      ["Focus", "Young people and the systems around them"],
      ["Practice", "Five divisions, eight practices"],
      ["Model", "Ten-stage Evidence-to-Impact Accelerator"],
    ]);
    photoPlate(visual, w, "electronicsLab", "AfriYouth brand guidelines — Image & Photography.", 400);
    hugText(visual, "Not a pipeline. A practice that moves evidence into enterprise, enterprise into policy, and policy into lasting change.", {
      font: fontFor("body", "regular"),
      size: 11.5,
      color: COLORS.forest,
      opacity: 0.55,
      lh: 1.6,
    });
  } else {
    heading(hero, "Evidence. Innovation.\nAfrican futures.", w, { size: tscale(w).hero, lh: 0.92 });
    bodyText(
      hero,
      "A research, innovation and policy consulting firm advancing promising ideas from Africa's young innovators — connecting evidence, design, enterprise and policy.",
      w,
      { size: tscale(w).lede, opacity: 0.7, lh: 1.55 },
    );
    actionRow(hero, w, [
      { label: "Explore our work", style: "Primary", key: "what" },
      { label: "Find opportunities", style: "Outline", key: "programs", arrow: false },
    ]);
    photoPlate(hero, w, "electronicsLab", "AfriYouth brand guidelines — Image & Photography.", w >= 700 ? 300 : 220);
    statStrip(hero, dims(w).content, [
      ["Focus", "Young people and the systems around them"],
      ["Practice", "Five divisions, eight practices"],
    ]);
  }

  tickerBand(f, w);

  const intro = section(f, w, { name: "Introduction", bg: COLORS.ivory });
  if (w >= 1024) {
    const [left, right] = twoCol(intro, 540, 720, 64);
    eyebrow(left, "Who we are");
    heading(left, PURPOSE.heading, w, { size: 58, lh: 0.98 });
    const marker = row(left, { name: "Marker", gap: 14, align: "CENTER" });
    divider(marker, COLORS.forest, 0.35);
    marker.children[0].layoutSizingHorizontal = "FIXED";
    marker.children[0].resize(56, 1);
    hugText(marker, "ONE CONNECTED PRACTICE", {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.5,
      track: 0.16,
      lh: 1.2,
    });
    bodyText(right, PURPOSE.paragraphs[0], w, { size: 18, opacity: 0.8, lh: 1.6 });
    bodyText(right, PURPOSE.paragraphs[1], w, { size: 14, opacity: 0.6, lh: 1.7 });
    pageLink(right, w, "Read our purpose", "about");
  } else {
    eyebrow(intro, "Who we are");
    heading(intro, PURPOSE.heading, w, { size: tscale(w).lg, lh: 1 });
    bodyText(intro, PURPOSE.paragraphs[0], w, { size: 16, opacity: 0.8, lh: 1.6 });
    bodyText(intro, PURPOSE.paragraphs[1], w, { size: 13.5, opacity: 0.6, lh: 1.7 });
    pageLink(intro, w, "Read our purpose", "about");
  }

  const media = section(f, w, { name: "Connected practice", bg: COLORS.ivory, py: w >= 700 ? 24 : 12 });
  if (w >= 1024) {
    const [left, right] = twoCol(media, 740, 540, 44);
    photo(left, "solarFieldTeam", { h: 420, radius: 16 });
    const quote = frame(left, { name: "Loop quote", bg: COLORS.lime, p: 22, radius: 0 });
    hugText(quote, PURPOSE.loop, {
      font: fontFor("heading", "medium"),
      size: 19,
      color: COLORS.forest,
      track: -0.02,
      lh: 1.3,
    });
    DIVISIONS.forEach((division, index) => {
      const r = frame(right, { name: "Division / " + division.label, dir: "row", gap: 16, align: "MIN", pt: 12, pb: 12 });
      hugText(r, String(index + 1).padStart(2, "0"), {
        font: fontFor("body", "semibold"),
        size: 10,
        color: COLORS.forest,
        opacity: 0.35,
        track: 0.1,
        lh: 1.2,
      });
      const col = frame(r, { name: "Division copy", gap: 4 });
      col.layoutSizingHorizontal = "FILL";
      hugText(col, division.label, {
        font: fontFor("heading", "medium"),
        size: 20,
        color: COLORS.forest,
        track: -0.03,
        lh: 1.1,
      });
      bodyText(col, division.text, w, { size: 12, opacity: 0.55, lh: 1.5 });
      divider(right, COLORS.forest, 0.12);
    });
    bodyText(right, PURPOSE.note, w, { size: 11.5, opacity: 0.45, lh: 1.6 });
  } else {
    photo(media, "solarFieldTeam", { h: w >= 700 ? 300 : 210, radius: 16 });
    const quote = frame(media, { name: "Loop quote", bg: COLORS.lime, p: 20, radius: 0 });
    hugText(quote, PURPOSE.loop, {
      font: fontFor("heading", "medium"),
      size: 17,
      color: COLORS.forest,
      track: -0.02,
      lh: 1.3,
    });
    DIVISIONS.forEach((division, index) => {
      const r = frame(media, { name: "Division / " + division.label, gap: 5, pt: 12, pb: 12 });
      hugText(r, String(index + 1).padStart(2, "0") + " · " + division.label.toUpperCase(), {
        font: fontFor("body", "semibold"),
        size: 9,
        color: COLORS.forest,
        opacity: 0.45,
        track: 0.12,
        lh: 1.2,
      });
      bodyText(r, division.text, w, { size: 12.5, opacity: 0.6, lh: 1.5 });
      divider(media, COLORS.forest, 0.12);
    });
  }

  const mv = section(f, w, { name: "Mission & vision", bg: COLORS.sage });
  sectionHead(
    mv,
    w,
    "Mission & vision",
    "What we are here to do.",
    "Quoted from the official organisational profile. These are statements of intent, not claims about a track record.",
  );
  const mvRow = frame(mv, { name: "Mission and vision", dir: w >= 1024 ? "row" : "column", gap: dims(w).gap, align: "MIN" });
  [
    ["Mission", SITE.mission],
    ["Vision", SITE.vision],
  ].forEach(([label, statement]) => {
    const card = frame(mvRow, { name: label, gap: 16, p: w >= 700 ? 32 : 24, bg: COLORS.paper, radius: 20, border: COLORS.forest });
    card.layoutSizingHorizontal = w >= 1024 ? "FIXED" : "FILL";
    if (w >= 1024) card.resize(Math.floor((dims(w).content - dims(w).gap) / 2), card.height);
    hugText(card, label.toUpperCase(), {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.45,
      track: 0.16,
      lh: 1.2,
    });
    hugText(card, statement, {
      font: fontFor("heading", "regular"),
      size: w >= 700 ? 23 : 20,
      color: COLORS.forest,
      track: -0.02,
      lh: 1.42,
    });
  });

  const approach = section(f, w, { name: "Approach", bg: COLORS.ivory });
  sectionHead(
    approach,
    w,
    "How we work",
    "Think. Research. Design. Build. Influence. Scale.",
    "The official six-step philosophy describes how an idea moves from question to durable change.",
  );
  bulletRows(approach, w, PHILOSOPHY, false);

  const areas = section(f, w, { name: "Practices", bg: COLORS.ivory, py: w >= 700 ? 96 : 56 });
  sectionHead(
    areas,
    w,
    "The practice",
    "Five divisions. Eight practices. One agenda.",
    "Every engagement begins with the decision, not the deliverable. The mix of divisions follows from what the question actually needs.",
  );
  const grid = cardRow(areas, w, AREAS.length);
  AREAS.forEach((area) => areaCardNode(grid.grid, w, area, grid.width));
  actionRow(areas, w, [{ label: "Explore all eight practices", style: "Outline", key: "what", arrow: true }]);

  const programs = section(f, w, { name: "Programs preview", bg: COLORS.paper });
  if (w >= 1024) {
    const [left, right] = twoCol(programs, 620, 640, 64);
    eyebrow(left, "Programs & opportunities");
    heading(left, "The opportunity board.", w, { size: 54, lh: 0.98 });
    bodyText(
      left,
      "Accelerator cohorts, Policy Innovation Challenges, research calls, academies and venture support are published with eligibility, deadlines, format and a direct application route.",
      w,
      { size: 14, opacity: 0.6, lh: 1.65 },
    );
    actionRow(left, w, [
      { label: "Visit the board", style: "Primary", key: "programs" },
      { label: "Register interest", style: "Ghost", key: "involved", arrow: false },
    ]);
    pendingPanel(
      right,
      w,
      "There are no open calls at present.",
      "Cohorts and calls are announced here as they open. Each listing shows eligibility, deadline, format and a direct application route.",
      "Current openings",
    );
  } else {
    eyebrow(programs, "Programs & opportunities");
    heading(programs, "The opportunity board.", w, { size: tscale(w).lg, lh: 1 });
    bodyText(
      programs,
      "Accelerator cohorts, Policy Innovation Challenges, research calls, academies and venture support are published with eligibility, deadlines, format and a direct application route.",
      w,
      { size: 13.5, opacity: 0.6, lh: 1.65 },
    );
    pendingPanel(programs, w, "There are no open calls at present.", "Cohorts and calls are announced here as they open.", "Current openings");
    actionRow(programs, w, [
      { label: "Visit the board", style: "Primary", key: "programs" },
      { label: "Register interest", style: "Ghost", key: "involved", arrow: false },
    ]);
  }

  const insightBand = section(f, w, { name: "Insights preview", bg: COLORS.ivory });
  sectionHead(
    insightBand,
    w,
    "Insights",
    "Thinking in public.",
    "Essays on evidence, design, policy, enterprise, foresight and impact. Official series are published here as they are released.",
  );
  const iGrid = cardRow(insightBand, w, 3);
  INSIGHTS.slice(0, 3).forEach((insight, index) => {
    insightCardNode(iGrid.grid, w, insight, iGrid.width, ["researcherVr", "youngInnovatorVr", "circuitWork"][index]);
  });
  actionRow(insightBand, w, [{ label: "Read all insights", style: "Outline", key: "insights" }]);

  const impact = section(f, w, { name: "Impact preview", bg: COLORS.sage });
  sectionHead(
    impact,
    w,
    "Impact & accountability",
    "We will publish what changes. Not just what we did.",
    IMPACT.statement,
  );
  const dimRow = frame(impact, { name: "Dimensions", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const dimW = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 3 : 1)) / (w >= 1024 ? 4 : w >= 700 ? 2 : 1));
  IMPACT.dimensions.forEach((dimension) => dimensionCard(dimRow, w, dimension, dimW));
  actionRow(impact, w, [{ label: "Read the measurement framework", style: "Primary", key: "impact" }]);

  const paths = section(f, w, { name: "Pathways", bg: COLORS.ivory });
  sectionHead(paths, w, "Ways in", "Three routes, one practice.", "Whether you are looking for an opportunity, commissioning work or building an institutional partnership, start where your question is.");
  const pGrid = cardRow(paths, w, 3);
  PATHWAYS.forEach((path, index) => pathCardNode(pGrid.grid, w, path, pGrid.width, index));

  ctaBand(
    f,
    w,
    "Bring a question worth taking seriously.",
    { label: "Partner with us", key: "partner" },
    { label: "Get involved", key: "involved" },
    false,
  );

  footerInto(f, w);
}

/* ---- ABOUT --------------------------------------------------------------- */

function aboutPage(f, w) {
  headerInto(f, w, "About");
  pageHero(f, w, PAGE_META.about);

  const why = section(f, w, { name: "Why now", bg: COLORS.ivory });
  sectionHead(
    why,
    w,
    "Why now",
    ABOUT.whyHeading,
    "The gap between a good idea and durable change is rarely a shortage of insight. It is the architecture around it.",
  );
  if (w >= 1024) {
    const [left, right] = twoCol(why, 700, 540, 64);
    ABOUT.why.forEach((paragraph, index) => {
      bodyText(left, paragraph, w, { size: index === 0 ? 17 : 14, opacity: index === 0 ? 0.8 : 0.62, lh: 1.7 });
    });
    photoPlate(right, w, "solarFieldTeam", "AfriYouth brand guidelines — Image & Photography.", 360);
  } else {
    ABOUT.why.forEach((paragraph, index) => {
      bodyText(why, paragraph, w, { size: index === 0 ? 16 : 13.5, opacity: index === 0 ? 0.8 : 0.62, lh: 1.7 });
    });
    photoPlate(why, w, "solarFieldTeam", "AfriYouth brand guidelines — Image & Photography.", w >= 700 ? 300 : 220);
  }

  const pillars = section(f, w, { name: "Brand pillars", bg: COLORS.sage });
  sectionHead(
    pillars,
    w,
    "Brand pillars",
    "What the identity stands for.",
    "Six pillars from the official brand guidelines. They describe the organisation's commitments, not a set of claims about results.",
  );
  const pillarGrid = frame(pillars, { name: "Pillar grid", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const pw = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 2 : 1)) / (w >= 1024 ? 3 : w >= 700 ? 2 : 1));
  PILLARS.forEach((pillar, index) => {
    const card = frame(pillarGrid, { name: "Pillar / " + pillar, gap: 10, p: 24, w: pw, bg: COLORS.paper, border: COLORS.forest, radius: 16 });
    card.layoutSizingHorizontal = "FIXED";
    hugText(card, "0" + (index + 1), {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.35,
      track: 0.14,
      lh: 1.2,
    });
    hugText(card, pillar, {
      font: fontFor("heading", "medium"),
      size: 24,
      color: COLORS.forest,
      track: -0.035,
      lh: 1.1,
    });
  });

  const approach = section(f, w, { name: "Philosophy", bg: COLORS.ivory });
  sectionHead(
    approach,
    w,
    "How we work",
    "Think. Research. Design. Build. Influence. Scale.",
    "The official philosophy runs from thinking to scale. It describes how the firm intends to move an idea from question to durable change.",
  );
  bulletRows(approach, w, PHILOSOPHY, false);
  const commitRow = frame(approach, { name: "Commitments", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const cw2 = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 3 : 1)) / (w >= 1024 ? 4 : w >= 700 ? 2 : 1));
  ABOUT.commitments.forEach((commitment, index) => {
    const card = cardBase(commitRow, w, cw2, { name: "Commitment / " + commitment.title, bg: COLORS.paper, gap: 8 });
    hugText(card, "COMMITMENT 0" + (index + 1), {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.35,
      track: 0.14,
      lh: 1.2,
    });
    hugText(card, commitment.title, {
      font: fontFor("heading", "medium"),
      size: 19,
      color: COLORS.forest,
      track: -0.03,
      lh: 1.15,
    });
    bodyText(card, commitment.text, w, { size: 12, opacity: 0.58, lh: 1.55 });
  });

  const people = section(f, w, { name: "People & governance", bg: COLORS.ivory });
  sectionHead(
    people,
    w,
    "People & governance",
    "Team and partners",
    "Work is assembled around the decision at hand, drawing on the disciplines and institutional relationships it requires.",
  );
  const peopleRow = frame(people, { name: "Profile cards", dir: w >= 1024 ? "row" : "column", gap: dims(w).gap, align: "MIN" });
  [ABOUT.team, ABOUT.partnership].forEach((statement) => {
    const panel = pendingPanel(peopleRow, w, statement.heading, statement.body, statement.note);
    panel.layoutSizingHorizontal = w >= 1024 ? "FIXED" : "FILL";
    if (w >= 1024) panel.resize(Math.floor((dims(w).content - dims(w).gap) / 2), panel.height);
  });

  const account = section(f, w, { name: "Accountability", bg: COLORS.forest });
  if (w >= 1024) {
    const [left, right] = twoCol(account, 720, 540, 64);
    eyebrow(left, "Accountability", { color: COLORS.lime, dot: COLORS.lime, opacity: 0.8 });
    heading(left, "What we will not pretend to know.", w, { size: 62, lh: 0.98, color: COLORS.ivory });
    bodyText(left, SITE.accountability, w, { size: 13.5, color: COLORS.ivory, opacity: 0.62, lh: 1.7 });
    const link = frame(left, { name: "Impact link", dir: "row", gap: 8, align: "CENTER", hug: true });
    hugText(link, "Read the measurement commitments", {
      font: fontFor("body", "medium"),
      size: 13,
      color: COLORS.lime,
      lh: 1.2,
    });
    hugText(link, "→", { size: 14, color: COLORS.lime, lh: 1.1 });
    queueLink(link, "impact", w);
    const list = frame(right, { name: "Verification standard", gap: 14, p: 26, border: COLORS.ivory, borderWidth: 1, radius: 16 });
    list.layoutSizingHorizontal = "FIXED";
    list.resize(540, list.height);
    hugText(list, "VERIFICATION STANDARD", {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.ivory,
      opacity: 0.45,
      track: 0.16,
      lh: 1.2,
    });
    capList(list, w, ABOUT.verification, COLORS.ivory);
  } else {
    eyebrow(account, "Accountability", { color: COLORS.lime, dot: COLORS.lime, opacity: 0.8 });
    heading(account, "What we will not pretend to know.", w, { size: tscale(w).lg, lh: 1, color: COLORS.ivory });
    bodyText(account, SITE.accountability, w, { size: 13, color: COLORS.ivory, opacity: 0.62, lh: 1.7 });
    const list = frame(account, { name: "Verification standard", gap: 14, p: 22, border: COLORS.ivory, borderWidth: 1, radius: 16 });
    hugText(list, "VERIFICATION STANDARD", {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.ivory,
      opacity: 0.45,
      track: 0.16,
      lh: 1.2,
    });
    capList(list, w, ABOUT.verification, COLORS.ivory);
  }

  ctaBand(
    f,
    w,
    "Bring a question worth taking seriously.",
    { label: "Partner with us", key: "partner" },
    { label: "Explore the practice", key: "what" },
    false,
  );
  footerInto(f, w);
}

/* ---- WHAT WE DO ---------------------------------------------------------- */

const AREA_PHOTOS = ["researcherVr", "solarFieldTeam", "electronicsLab", "circuitWork", "youngInnovatorVr", "researcherVr", "solarFieldTeam"];

function whatPage(f, w) {
  headerInto(f, w, "What We Do");
  pageHero(f, w, PAGE_META.what);

  const indexBand = section(f, w, { name: "Practice index", bg: COLORS.ivory, py: 40 });
  sectionHead(
    indexBand,
    w,
    "The practice",
    "Five divisions. Eight practices. One agenda.",
    "Every engagement begins with the decision, not the deliverable. The mix of divisions follows from what the question actually needs.",
  );
  const chips = frame(indexBand, { name: "Practice index chips", dir: "row", gap: 8, wrap: true });
  AREAS.forEach((area) => {
    pill(chips, area.number + "  " + area.title, { bg: COLORS.sage, color: COLORS.forest, size: 9 });
  });

  AREAS.forEach((area, index) => {
    const band = section(f, w, {
      name: "Practice / " + area.title,
      bg: index % 2 === 0 ? COLORS.paper : COLORS.ivory,
    });
    if (w >= 1024) {
      const [copy, aside] = twoCol(band, 760, 516, 48);
      eyebrow(copy, "Practice " + area.number + " · " + (area.id === "innovation" ? "Challenge" : "Division"));
      heading(copy, area.title, w, { size: 54, lh: 0.98 });
      bodyText(copy, area.tagline, w, { size: 18, opacity: 0.75, lh: 1.45 });
      area.body.forEach((paragraph) => {
        bodyText(copy, paragraph, w, { size: 13.5, opacity: 0.62, lh: 1.7 });
      });
      hugText(copy, "CAPABILITIES", {
        font: fontFor("body", "semibold"),
        size: 9,
        color: COLORS.forest,
        opacity: 0.4,
        track: 0.16,
        lh: 1.2,
      });
      capList(copy, w, area.capabilities, COLORS.forest);
      const question = frame(copy, { name: "Practice question", bg: COLORS.lime, p: 20, radius: 0 });
      hugText(question, area.question, {
        font: fontFor("heading", "medium"),
        size: 20,
        color: COLORS.forest,
        track: -0.02,
        lh: 1.3,
      });
      photo(aside, AREA_PHOTOS[index], { h: 300, radius: 16 });
      const formats = frame(aside, { name: "Formats", gap: 10, p: 22, bg: COLORS.sage, radius: 16 });
      hugText(formats, "PUBLISHED AS", {
        font: fontFor("body", "semibold"),
        size: 9,
        color: COLORS.forest,
        opacity: 0.45,
        track: 0.16,
        lh: 1.2,
      });
      area.formats.forEach((format) => {
        hugText(formats, format, {
          font: fontFor("body", "medium"),
          size: 14,
          color: COLORS.forest,
          lh: 1.45,
        });
      });
    } else {
      eyebrow(band, "Practice " + area.number + " · " + (area.id === "innovation" ? "Challenge" : "Division"));
      heading(band, area.title, w, { size: tscale(w).lg, lh: 1 });
      bodyText(band, area.tagline, w, { size: 16, opacity: 0.75, lh: 1.45 });
      photo(band, AREA_PHOTOS[index], { h: w >= 700 ? 280 : 200, radius: 16 });
      area.body.forEach((paragraph) => {
        bodyText(band, paragraph, w, { size: 13, opacity: 0.62, lh: 1.7 });
      });
      const question = frame(band, { name: "Practice question", bg: COLORS.lime, p: 18, radius: 0 });
      hugText(question, area.question, {
        font: fontFor("heading", "medium"),
        size: 17,
        color: COLORS.forest,
        track: -0.02,
        lh: 1.3,
      });
      hugText(band, "CAPABILITIES", {
        font: fontFor("body", "semibold"),
        size: 9,
        color: COLORS.forest,
        opacity: 0.4,
        track: 0.16,
        lh: 1.2,
      });
      capList(band, w, area.capabilities, COLORS.forest);
      hugText(band, "PUBLISHED AS · " + area.formats.join(" · "), {
        font: fontFor("body", "semibold"),
        size: 9,
        color: COLORS.forest,
        opacity: 0.45,
        track: 0.1,
        lh: 1.4,
      });
    }
  });

  const process = section(f, w, { name: "Evidence-to-Impact Accelerator", bg: COLORS.forest });
  darkHeading(
    process,
    w,
    "Flagship model · ten stages",
    "From evidence to impact.",
    "Our flagship model moves an idea through ten connected stages — discovery, diagnosis, research, design, prototype, policy, finance, implementation, measurement and scale.",
  );
  stepGrid(process, w, PROCESS, w >= 1200 ? 5 : w >= 700 ? 3 : 1, true);

  const commission = section(f, w, { name: "Commission", bg: COLORS.sage });
  sectionHead(
    commission,
    w,
    "Commission the work",
    "One team around the whole question.",
    "Research, policy, design, enterprise, foresight, learning and measurement can be commissioned together or in the combination the decision needs.",
  );
  actionRow(commission, w, [
    { label: "Partner with us", style: "Primary", key: "partner" },
    { label: "Read our insights", style: "Outline", key: "insights" },
  ]);

  footerInto(f, w);
}

/* ---- PROGRAMS ------------------------------------------------------------ */

function programsPage(f, w) {
  headerInto(f, w, "Programs");
  pageHero(f, w, PAGE_META.programs);

  const board = section(f, w, { name: "Opportunity board", bg: COLORS.ivory });
  const filter = frame(board, { name: "Filters", dir: "row", gap: 8, wrap: true });
  PROGRAM_CATEGORIES.forEach((category, index) => {
    const chip = pill(filter, category, {
      bg: index === 0 ? COLORS.forest : COLORS.paper,
      color: index === 0 ? COLORS.ivory : COLORS.forest,
      border: COLORS.forest,
      size: 9.5,
    });
    chip.strokeWeight = 1;
  });
  hintRow(board, w);

  const empty = frame(board, { name: "Empty state", gap: 18, p: w >= 700 ? 36 : 24, bg: COLORS.paper, border: COLORS.forest, radius: 20 });
  eyebrow(empty, "Current openings · 00");
  heading(empty, "There are no open calls at present.", w, { size: w >= 700 ? 40 : 28, lh: 1.02 });
  bodyText(
    empty,
    "Cohorts and calls for the Innovation Accelerator, Policy Innovation Challenge, research programme and academies are announced here as they open. Each listing shows eligibility, deadline, format and a direct application route.",
    w,
    { size: 14, opacity: 0.62, lh: 1.7 },
  );
  actionRow(empty, w, [
    { label: "Register your interest", style: "Primary", key: "involved" },
    { label: "How listings work", style: "Outline", key: "programs", arrow: false },
  ]);

  const how = section(f, w, { name: "How listings work", bg: COLORS.sage });
  sectionHead(
    how,
    w,
    "How listings work",
    "What every verified call will show.",
    "A listing appears only when all four fields can be sourced and dated. This is the publication standard, not a description of current availability.",
  );
  const fGrid = frame(how, { name: "Listing fields", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const fw = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 3 : w >= 700 ? 1 : 0)) / (w >= 1024 ? 4 : w >= 700 ? 2 : 1));
  LISTING_FIELDS.forEach((field, index) => {
    const card = cardBase(fGrid, w, fw, { name: "Field / " + field.label, bg: COLORS.paper, gap: 8 });
    hugText(card, "0" + (index + 1), {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.35,
      track: 0.14,
      lh: 1.2,
    });
    hugText(card, field.label, {
      font: fontFor("heading", "medium"),
      size: 22,
      color: COLORS.forest,
      track: -0.03,
      lh: 1.1,
    });
    bodyText(card, field.text, w, { size: 12, opacity: 0.58, lh: 1.55 });
  });

  ctaBand(
    f,
    w,
    "Be first to hear when a call is verified.",
    { label: "Register interest", key: "involved" },
    { label: "Partner with us", key: "partner" },
    true,
  );
  footerInto(f, w);
}

function hintRow(parent, w) {
  return bodyText(parent, "Filters are shown in their default state. Listings appear here as calls open.", w, {
    size: 11,
    opacity: 0.4,
    lh: 1.5,
  });
}

/* ---- INSIGHTS ------------------------------------------------------------ */

function insightsPage(f, w) {
  headerInto(f, w, "Insights");
  pageHero(f, w, PAGE_META.insights);

  const featured = section(f, w, { name: "Featured essay", bg: COLORS.ivory });
  const first = INSIGHTS[0];
  if (w >= 1024) {
    const [text, visual] = twoCol(featured, 700, 560, 56);
    eyebrow(text, "Featured · " + first.category);
    heading(text, first.title, w, { size: 60, lh: 0.98 });
    bodyText(text, first.excerpt, w, { size: 17, opacity: 0.68, lh: 1.6 });
    hugText(text, first.kind.toUpperCase() + " · " + first.reading.toUpperCase() + " · AFRIYOUTH PERSPECTIVE", {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.42,
      track: 0.14,
      lh: 1.2,
    });
    const b = buttonNode(text, "Read the essay", "Primary");
    queueLink(b, "article", w);
    photoPlate(visual, w, "researcherVr", "AfriYouth brand guidelines — Image & Photography.", 380);
  } else {
    eyebrow(featured, "Featured · " + first.category);
    heading(featured, first.title, w, { size: tscale(w).lg, lh: 1 });
    bodyText(featured, first.excerpt, w, { size: 16, opacity: 0.68, lh: 1.6 });
    photo(featured, "researcherVr", { h: w >= 700 ? 280 : 200, radius: 16 });
    const b = buttonNode(featured, "Read the essay", "Primary");
    queueLink(b, "article", w);
  }

  const all = section(f, w, { name: "All insights", bg: COLORS.ivory });
  const filter = frame(all, { name: "Filters", dir: "row", gap: 8, wrap: true });
  INSIGHT_CATS.forEach((category, index) => {
    const chip = pill(filter, category, {
      bg: index === 0 ? COLORS.forest : COLORS.paper,
      color: index === 0 ? COLORS.ivory : COLORS.forest,
      border: COLORS.forest,
      size: 9,
    });
    chip.strokeWeight = 1;
  });
  hintRow(all, w);
  const grid = cardRow(all, w, 3);
  const PHOTO_CYCLE = ["electronicsLab", "researcherVr", "solarFieldTeam", "youngInnovatorVr", "circuitWork"];
  INSIGHTS.slice(1).forEach((insight, index) => {
    insightCardNode(grid.grid, w, insight, grid.width, PHOTO_CYCLE[index]);
  });

  ctaBand(
    f,
    w,
    "Have a question worth researching in public?",
    { label: "Partner with us", key: "partner" },
    { label: "Get involved", key: "involved" },
    false,
  );
  footerInto(f, w);
}

function articlePage(f, w) {
  headerInto(f, w, "Insights");
  const top = section(f, w, { name: "Article header", bg: COLORS.ivory, py: w >= 700 ? 64 : 40 });
  const back = frame(top, { name: "Back link", dir: "row", gap: 8, align: "CENTER", hug: true });
  hugText(back, "←  All insights", {
    font: fontFor("body", "medium"),
    size: 12,
    color: COLORS.forest,
    opacity: 0.7,
    lh: 1.2,
  });
  queueLink(back, "insights", w);
  eyebrow(top, ARTICLE.category + " · " + ARTICLE.kind + " · " + ARTICLE.reading, { opacity: 0.6 });
  heading(top, ARTICLE.title, w, { size: w >= 1200 ? 78 : tscale(w).xl, lh: 0.94 });
  bodyText(top, ARTICLE.excerpt, w, { size: w >= 700 ? 19 : 17, opacity: 0.68, lh: 1.55 });
  const meta = w >= 1024
    ? metaPanel(top, w, [["Edition", "AfriYouth perspective"], ["Author", "AfriYouth Innovation Labs"], ["Series", "Editorial"]], false)
    : metaPanel(top, w, [["Edition", "AfriYouth perspective"], ["Author", "AfriYouth Innovation Labs"], ["Series", "Editorial"]], true);
  if (w >= 1024) meta.layoutSizingHorizontal = "FILL";

  const media = readingSection(f, w, 1000, { name: "Article image", pt: 0, pb: w >= 700 ? 56 : 24 });
  photo(media, "circuitWork", { h: w >= 1200 ? 480 : w >= 700 ? 340 : 210, radius: 16 });
  caption(media, "AfriYouth brand guidelines — Image & Photography.", w);

  const body = readingSection(f, w, 760, { name: "Article body", pt: 0, gap: 24 });
  bodyText(body, ARTICLE.body[0], w, { size: 19, opacity: 0.85, lh: 1.72 });
  const quote = frame(body, { name: "Pull quote", gap: 16, pt: 8, pb: 8 });
  frame(quote, { name: "Quote accent", w: 56, h: 3, bg: COLORS.lime });
  hugText(quote, ARTICLE.quote, {
    font: fontFor("heading", "medium"),
    size: w >= 700 ? 26 : 21,
    color: COLORS.forest,
    track: -0.03,
    lh: 1.32,
  });
  ARTICLE.body.slice(1).forEach((paragraph) => {
    bodyText(body, paragraph, w, { size: 16, opacity: 0.75, lh: 1.75 });
  });
  divider(body, COLORS.forest, 0.14);
  bodyText(
    body,
    "An editorial perspective from the AfriYouth practice. It discusses method and practice rather than reporting research findings.",
    w,
    { size: 11.5, opacity: 0.45, lh: 1.6 },
  );

  const related = section(f, w, { name: "Related", bg: COLORS.ivory });
  sectionHead(related, w, "Continue reading", "More AfriYouth perspectives.", "Essays on evidence, design, policy, enterprise, foresight and impact.");
  const relGrid = cardRow(related, w, 3);
  INSIGHTS.slice(1, 4).forEach((insight, index) => {
    insightCardNode(relGrid.grid, w, insight, relGrid.width, ["youngInnovatorVr", "electronicsLab", "solarFieldTeam"][index]);
  });

  ctaBand(
    f,
    w,
    "Put an idea under better evidence.",
    { label: "Partner with us", key: "partner" },
    { label: "Visit the board", key: "programs" },
    false,
  );
  footerInto(f, w);
}

/* ---- IMPACT -------------------------------------------------------------- */

function impactPage(f, w) {
  headerInto(f, w, "Impact");
  pageHero(f, w, PAGE_META.impact);

  const statement = section(f, w, { name: "Statement", bg: COLORS.forest });
  eyebrow(statement, "Editorial rule", { color: COLORS.lime, dot: COLORS.lime, opacity: 0.8 });
  heading(statement, IMPACT.statement, w, { size: w >= 1200 ? 68 : tscale(w).lg, lh: 1, color: COLORS.ivory });
  bodyText(
    statement,
    "Figures are published as verified engagements conclude, with their source, date, method and stated limitations.",
    w,
    { size: 14, color: COLORS.ivory, opacity: 0.6, lh: 1.65 },
  );

  const dimsSection = section(f, w, { name: "Dimensions", bg: COLORS.ivory });
  sectionHead(
    dimsSection,
    w,
    "What we measure",
    "Four dimensions of change.",
    "Participation is not a substitute for change. Each dimension has a question that keeps the measurement honest.",
  );
  const dGrid = frame(dimsSection, { name: "Dimensions", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const dw = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 1 : w >= 700 ? 1 : 0)) / (w >= 1024 ? 2 : w >= 700 ? 2 : 1));
  IMPACT.dimensions.forEach((dimension) => dimensionCard(dGrid, w, dimension, dw));

  const stages = section(f, w, { name: "Measurement stages", bg: COLORS.sage });
  sectionHead(
    stages,
    w,
    "Measurement process",
    "Five stages, one standard.",
    "The framework is published so the reporting architecture can be reviewed before data arrives.",
  );
  stepGrid(stages, w, IMPACT.stages, w >= 1024 ? 5 : w >= 700 ? 2 : 1, false);

  const ledger = section(f, w, { name: "Impact ledger", bg: COLORS.ivory });
  sectionHead(
    ledger,
    w,
    "Public ledger",
    "What gets published here.",
    "Each entry carries a source, date, method and stated limitations. Entries are released as engagements close and reports are cleared for publication.",
  );
  const rows = frame(ledger, { name: "Ledger rows", gap: 0 });
  IMPACT.ledger.forEach((entry) => {
    const r = frame(rows, { name: "Ledger / " + entry.label, dir: w >= 700 ? "row" : "column", gap: w >= 700 ? 24 : 8, align: "MIN", pt: 18, pb: 18 });
    const left = frame(r, { name: "Entry", gap: 6, w: w >= 700 ? 420 : undefined });
    if (w >= 700) left.layoutSizingHorizontal = "FIXED";
    hugText(left, entry.label, {
      font: fontFor("heading", "medium"),
      size: 20,
      color: COLORS.forest,
      track: -0.03,
      lh: 1.15,
    });
    bodyText(left, entry.text, w, { size: 12, opacity: 0.58, lh: 1.55 });
    pill(r, "Published on completion", { bg: COLORS.sage, color: COLORS.forest, size: 8.5, dot: COLORS.clay });
    divider(rows, COLORS.forest, 0.14);
  });

  const commitments = section(f, w, { name: "Commitments", bg: COLORS.paper });
  if (w >= 1024) {
    const [left, right] = twoCol(commitments, 520, 740, 64);
    eyebrow(left, "Measurement commitments");
    heading(left, "Five rules for an honest ledger.", w, { size: 54, lh: 0.98 });
    const list = frame(right, { name: "Commitment list", gap: 0 });
    IMPACT.commitments.forEach((commitment, index) => {
      const r = frame(list, { name: "Commitment " + (index + 1), dir: "row", gap: 16, align: "MIN", pt: 16, pb: 16 });
      hugText(r, String(index + 1).padStart(2, "0"), {
        font: fontFor("body", "semibold"),
        size: 10,
        color: COLORS.forest,
        opacity: 0.4,
        track: 0.1,
        lh: 1.3,
      });
      bodyText(r, commitment, w, { size: 14, opacity: 0.72, lh: 1.6 });
      divider(list, COLORS.forest, 0.14);
    });
  } else {
    eyebrow(commitments, "Measurement commitments");
    heading(commitments, "Five rules for an honest ledger.", w, { size: tscale(w).lg, lh: 1 });
    IMPACT.commitments.forEach((commitment, index) => {
      const r = frame(commitments, { name: "Commitment " + (index + 1), gap: 6, pt: 12, pb: 12 });
      hugText(r, String(index + 1).padStart(2, "0"), {
        font: fontFor("body", "semibold"),
        size: 9.5,
        color: COLORS.forest,
        opacity: 0.4,
        track: 0.12,
        lh: 1.2,
      });
      bodyText(r, commitment, w, { size: 13.5, opacity: 0.7, lh: 1.6 });
      divider(commitments, COLORS.forest, 0.14);
    });
  }

  const faqs = section(f, w, { name: "Impact FAQ", bg: COLORS.ivory });
  sectionHead(faqs, w, "Questions", "About the numbers that are not here.", "The absence of figures is an editorial decision, not an oversight.");
  faqList(faqs, w, IMPACT.faqs);

  ctaBand(
    f,
    w,
    "Commission measurement that improves the next decision.",
    { label: "Partner with us", key: "partner" },
    { label: "Explore the practice", key: "what" },
    true,
  );
  footerInto(f, w);
}

/* ---- GET INVOLVED -------------------------------------------------------- */

function involvedPage(f, w) {
  headerInto(f, w, "Get Involved");
  pageHero(f, w, PAGE_META.involved);

  const routes = section(f, w, { name: "Routes in", bg: COLORS.ivory });
  sectionHead(
    routes,
    w,
    "Routes in",
    "Three ways to start.",
    "No call is open yet. These routes show how to explore, register interest or bring a question as a partner.",
  );
  const rGrid = frame(routes, { name: "Route cards", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const rw = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 2 : w >= 700 ? 1 : 0)) / (w >= 1024 ? 3 : w >= 700 ? 2 : 1));
  GET_INVOLVED_ROUTES.forEach((route, index) => {
    const c = cardBase(rGrid, w, rw, { name: "Route / " + route.title, bg: index === 0 ? COLORS.lime : COLORS.paper, gap: 12 });
    hugText(c, route.number + " · ROUTE " + (index + 1), {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.45,
      track: 0.14,
      lh: 1.2,
    });
    hugText(c, route.title, {
      font: fontFor("heading", "medium"),
      size: w >= 700 ? 25 : 23,
      color: COLORS.forest,
      track: -0.035,
      lh: 1.08,
    });
    bodyText(c, route.text, w, { size: 12.5, opacity: 0.62, lh: 1.6 });
    const grow = frame(c, { name: "Grow", h: 1, w: 1 });
    grow.layoutGrow = 1;
    pageLink(c, w, route.cta, route.key);
  });

  const formBand = section(f, w, { name: "Interest form", bg: COLORS.sage });
  if (w >= 1024) {
    const [left, right] = twoCol(formBand, 470, 790, 64);
    eyebrow(left, "Register future interest");
    heading(left, "Tell us where your interest sits.", w, { size: 50, lh: 0.98 });
    bodyText(
      left,
      "Registering interest helps us send relevant opportunities. It is not an application.",
      w,
      { size: 13.5, opacity: 0.62, lh: 1.65 },
    );
    hugText(left, "AREAS OF INTEREST", {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.42,
      track: 0.16,
      lh: 1.2,
    });
    capList(left, w, INTEREST_OPTIONS, COLORS.forest);
    formPanel(right, w, {
      eyebrow: "Enquiry form · interest",
      title: "Register interest.",
      intro: "Complete the fields and the form opens a pre-addressed email draft in your mail client.",
      submit: "Open email draft",
      fields: [
        { label: "Full name", placeholder: "Your name", required: true },
        { label: "Email", placeholder: "you@example.org", required: true },
        { label: "Organisation", placeholder: "Optional", full: true },
        { label: "Area of interest", placeholder: "Choose an interest", full: true },
        { label: "Message", placeholder: "What would you like to hear about?", area: true, full: true },
      ],
    });
  } else {
    eyebrow(formBand, "Register future interest");
    heading(formBand, "Tell us where your interest sits.", w, { size: tscale(w).lg, lh: 1 });
    bodyText(
      formBand,
      "Registering interest helps us send relevant opportunities. It is not an application.",
      w,
      { size: 13, opacity: 0.62, lh: 1.65 },
    );
    formPanel(formBand, w, {
      eyebrow: "Enquiry form · interest",
      title: "Register interest.",
      intro: "Complete the fields and the form opens a pre-addressed email draft in your mail client.",
      submit: "Open email draft",
      fields: [
        { label: "Full name", placeholder: "Your name", required: true },
        { label: "Email", placeholder: "you@example.org", required: true },
        { label: "Organisation", placeholder: "Optional", full: true },
        { label: "Area of interest", placeholder: "Choose an interest", full: true },
        { label: "Message", placeholder: "What would you like to hear about?", area: true, full: true },
      ],
    });
  }

  const faqs = section(f, w, { name: "Get involved FAQ", bg: COLORS.ivory });
  sectionHead(faqs, w, "Questions", "Before you submit anything.", "These answers explain what the form does and what happens after you send it.");
  faqList(faqs, w, GET_INVOLVED_FAQS);

  ctaBand(
    f,
    w,
    "Bring a question as a partner.",
    { label: "Partner with us", key: "partner" },
    { label: "Visit the board", key: "programs" },
    true,
  );
  footerInto(f, w);
}

/* ---- PARTNER WITH US ----------------------------------------------------- */

function partnerPage(f, w) {
  headerInto(f, w, "Partner With Us");
  pageHero(f, w, PAGE_META.partner);

  const models = section(f, w, { name: "Collaboration models", bg: COLORS.ivory });
  sectionHead(
    models,
    w,
    "Collaboration models",
    "Five ways to work together.",
    "Commission one service or the combination the question needs. Each model is a route into the same connected practice.",
  );
  PARTNERS.models.forEach((model, index) => {
    const r = frame(models, { name: "Model / " + model.title, dir: w >= 1024 ? "row" : "column", gap: w >= 1024 ? 40 : 10, align: "MIN", pt: 24, pb: 24 });
    const left = frame(r, { name: "Model label", gap: 8, w: w >= 1024 ? 420 : undefined });
    if (w >= 1024) left.layoutSizingHorizontal = "FIXED";
    hugText(left, "MODEL " + model.number, {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.4,
      track: 0.16,
      lh: 1.2,
    });
    hugText(left, model.title, {
      font: fontFor("heading", "medium"),
      size: w >= 1024 ? 30 : 24,
      color: COLORS.forest,
      track: -0.035,
      lh: 1.08,
    });
    const right = frame(r, { name: "Model detail", gap: 12 });
    right.layoutSizingHorizontal = "FILL";
    bodyText(right, model.text, w, { size: 13.5, opacity: 0.62, lh: 1.65 });
    tagRow(right, w, model.tags, false);
    divider(models, COLORS.forest, 0.14);
  });

  const audiences = section(f, w, { name: "Who we work with", bg: COLORS.sage });
  if (w >= 1024) {
    const [left, right] = twoCol(audiences, 520, 740, 64);
    eyebrow(left, "Who we work with");
    heading(left, "Institutions with a question worth taking seriously.", w, { size: 46, lh: 1 });
    const list = frame(right, { name: "Audience list", gap: 0 });
    PARTNERS.audiences.forEach((audience, index) => {
      const row = frame(list, { name: "Audience " + (index + 1), dir: "row", gap: 16, align: "MIN", pt: 14, pb: 14 });
      hugText(row, String(index + 1).padStart(2, "0"), {
        font: fontFor("body", "semibold"),
        size: 10,
        color: COLORS.forest,
        opacity: 0.35,
        track: 0.1,
        lh: 1.3,
      });
      bodyText(row, audience, w, { size: 15, opacity: 0.72, lh: 1.5 });
      divider(list, COLORS.forest, 0.14);
    });
    bodyText(right, "Partnerships are published with permission. Where a relationship is confidential, it is not named.", w, { size: 11, opacity: 0.45, lh: 1.6 });
  } else {
    eyebrow(audiences, "Who we work with");
    heading(audiences, "Institutions with a question worth taking seriously.", w, { size: tscale(w).lg, lh: 1 });
    PARTNERS.audiences.forEach((audience, index) => {
      const row = frame(audiences, { name: "Audience " + (index + 1), gap: 5, pt: 11, pb: 11 });
      hugText(row, "0" + (index + 1), {
        font: fontFor("body", "semibold"),
        size: 9,
        color: COLORS.forest,
        opacity: 0.35,
        track: 0.12,
        lh: 1.2,
      });
      bodyText(row, audience, w, { size: 13.5, opacity: 0.72, lh: 1.5 });
      divider(audiences, COLORS.forest, 0.14);
    });
  }

  const process = section(f, w, { name: "Partner process", bg: COLORS.ivory });
  sectionHead(
    process,
    w,
    "How it starts",
    "A scoping conversation, not a pitch.",
    "Five steps from first conversation to uptake and learning. Assumptions are stated in writing before delivery.",
  );
  stepGrid(process, w, PARTNERS.process, w >= 1024 ? 5 : w >= 700 ? 2 : 1, false);

  const questions = section(f, w, { name: "Scoping questions", bg: COLORS.forest });
  darkHeading(
    questions,
    w,
    "First conversation",
    "Five questions we start with.",
    "A scoping conversation begins with the decision you need to inform. These questions are published so nothing about the process is hidden.",
  );
  const qList = frame(questions, { name: "Questions", gap: 0 });
  PARTNERS.questions.forEach((question, index) => {
    const r = frame(qList, { name: "Question " + (index + 1), dir: "row", gap: 20, align: "MIN", pt: 16, pb: 16 });
    hugText(r, "0" + (index + 1), {
      font: fontFor("body", "semibold"),
      size: 10,
      color: COLORS.lime,
      opacity: 0.7,
      track: 0.12,
      lh: 1.3,
    });
    hugText(r, question, {
      font: fontFor("heading", "medium"),
      size: w >= 700 ? 24 : 20,
      color: COLORS.ivory,
      track: -0.03,
      lh: 1.25,
    });
    divider(qList, COLORS.ivory, 0.15);
  });

  const formBand = section(f, w, { name: "Partner form", bg: COLORS.sage });
  if (w >= 1024) {
    const [left, right] = twoCol(formBand, 470, 790, 64);
    eyebrow(left, "Start a conversation");
    heading(left, "Describe the question, not the brief.", w, { size: 50, lh: 0.98 });
    bodyText(
      left,
      "A fully formed brief is not required. Tell us what decision you need to inform and what constraints you are working within.",
      w,
      { size: 13.5, opacity: 0.62, lh: 1.65 },
    );
    capList(left, w, PARTNERS.questions.slice(0, 3), COLORS.forest);
    formPanel(right, w, {
      eyebrow: "Enquiry form · partnership",
      title: "Start a partnership.",
      intro: "Tell us what decision you need to inform. A valid submission opens a pre-addressed email draft.",
      submit: "Open email draft",
      fields: [
        { label: "Organisation", placeholder: "Institution or enterprise", required: true },
        { label: "Contact name", placeholder: "Your name", required: true },
        { label: "Email", placeholder: "you@organisation.org", required: true, full: true },
        { label: "Collaboration option", placeholder: "Choose a model", full: true },
        { label: "What decision are you informing?", placeholder: "Brief description", area: true, full: true },
      ],
    });
  } else {
    eyebrow(formBand, "Start a conversation");
    heading(formBand, "Describe the question, not the brief.", w, { size: tscale(w).lg, lh: 1 });
    bodyText(
      formBand,
      "A fully formed brief is not required. Tell us what decision you need to inform and what constraints you are working within.",
      w,
      { size: 13, opacity: 0.62, lh: 1.65 },
    );
    formPanel(formBand, w, {
      eyebrow: "Enquiry form · partnership",
      title: "Start a partnership.",
      intro: "Tell us what decision you need to inform. A valid submission opens a pre-addressed email draft.",
      submit: "Open email draft",
      fields: [
        { label: "Organisation", placeholder: "Institution or enterprise", required: true },
        { label: "Contact name", placeholder: "Your name", required: true },
        { label: "Email", placeholder: "you@organisation.org", required: true, full: true },
        { label: "Collaboration option", placeholder: "Choose a model", full: true },
        { label: "What decision are you informing?", placeholder: "Brief description", area: true, full: true },
      ],
    });
  }

  const faqs = section(f, w, { name: "Partner FAQ", bg: COLORS.ivory });
  sectionHead(faqs, w, "Questions", "About working together.", "Each collaboration is scoped around a shared decision, with roles, ethics and success measures agreed before delivery.");
  faqList(faqs, w, PARTNERS.faqs);

  footerInto(f, w);
}

/* ---- CONTACT ------------------------------------------------------------- */

function contactPage(f, w) {
  headerInto(f, w, "Contact");
  pageHero(f, w, PAGE_META.contact);

  const channels = section(f, w, { name: "Contact channels", bg: COLORS.ivory });
  sectionHead(
    channels,
    w,
    "Channels",
    "Direct enquiries.",
    "The form is the fastest route to the team. Telephone and office details are shared with confirmed engagements.",
  );
  const cGrid = frame(channels, { name: "Channel cards", dir: "row", gap: dims(w).gap, wrap: true, align: "MIN" });
  const cw3 = Math.floor((dims(w).content - dims(w).gap * (w >= 1024 ? 2 : w >= 700 ? 1 : 0)) / (w >= 1024 ? 3 : w >= 700 ? 2 : 1));
  CONTACT_CHANNELS.forEach((channel) => {
    const card = cardBase(cGrid, w, cw3, { name: "Channel / " + channel.label, bg: COLORS.paper, gap: 10 });
    const topRow = frame(card, { name: "Channel status", dir: "row", gap: 8, align: "CENTER", mainAlign: "SPACE_BETWEEN" });
    hugText(topRow, channel.label.toUpperCase(), {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.42,
      track: 0.16,
      lh: 1.2,
    });
    pill(topRow, channel.status, { bg: COLORS.sage, color: COLORS.forest, size: 8.5 });
    bodyText(card, channel.text, w, { size: 12.5, opacity: 0.6, lh: 1.6 });
    const grow = frame(card, { name: "Grow", h: 1, w: 1 });
    grow.layoutGrow = 1;
    hugText(card, "Direct email, telephone and office details are shared on request.", {
      font: fontFor("body", "regular"),
      size: 10,
      color: COLORS.forest,
      opacity: 0.4,
      lh: 1.4,
    });
  });
  bodyText(channels, "AfriYouth's official social channels are published here when they go live.", w, { size: 11, opacity: 0.45, lh: 1.5 });

  const formBand = section(f, w, { name: "Contact form", bg: COLORS.sage });
  if (w >= 1024) {
    const [left, right] = twoCol(formBand, 450, 810, 64);
    eyebrow(left, "Contact form");
    heading(left, "Start with your question.", w, { size: 50, lh: 0.98 });
    bodyText(
      left,
      "The form checks your details and opens a pre-addressed email draft. Nothing is stored on this site, and nothing is sent until you send it.",
      w,
      { size: 13.5, opacity: 0.62, lh: 1.65 },
    );
    const note = frame(left, { name: "Accessibility note", gap: 8, p: 18, bg: COLORS.paper, radius: 16 });
    hugText(note, "ACCESSIBILITY", {
      font: fontFor("body", "semibold"),
      size: 9,
      color: COLORS.forest,
      opacity: 0.45,
      track: 0.16,
      lh: 1.2,
    });
    bodyText(note, "The site is built with keyboard navigation, reduced-motion support and visible focus states. Report an accessibility issue through the form.", w, { size: 11.5, opacity: 0.6, lh: 1.55 });
    formPanel(right, w, {
      eyebrow: "Enquiry form · contact",
      title: "Write a message.",
      intro: "A valid submission opens a pre-addressed email draft. Review it before sending.",
      submit: "Open email draft",
      fields: [
        { label: "Name", placeholder: "Your name", required: true },
        { label: "Email", placeholder: "you@example.org", required: true },
        { label: "Subject", placeholder: "What is this about?", full: true },
        { label: "Message", placeholder: "Your message", area: true, full: true },
      ],
    });
  } else {
    eyebrow(formBand, "Contact form");
    heading(formBand, "Start with your question.", w, { size: tscale(w).lg, lh: 1 });
    bodyText(
      formBand,
      "The form checks your details and opens a pre-addressed email draft. Nothing is stored on this site, and nothing is sent until you send it.",
      w,
      { size: 13, opacity: 0.62, lh: 1.65 },
    );
    formPanel(formBand, w, {
      eyebrow: "Enquiry form · contact",
      title: "Write a message.",
      intro: "A valid submission opens a pre-addressed email draft. Review it before sending.",
      submit: "Open email draft",
      fields: [
        { label: "Name", placeholder: "Your name", required: true },
        { label: "Email", placeholder: "you@example.org", required: true },
        { label: "Subject", placeholder: "What is this about?", full: true },
        { label: "Message", placeholder: "Your message", area: true, full: true },
      ],
    });
  }

  const faqs = section(f, w, { name: "Contact FAQ", bg: COLORS.ivory });
  sectionHead(faqs, w, "Questions", "About contacting AfriYouth.", "Direct email, telephone and office details are published as they are confirmed.");
  faqList(faqs, w, CONTACT_FAQS);

  ctaBand(
    f,
    w,
    "Prefer to start with the work itself?",
    { label: "Partner with us", key: "partner" },
    { label: "Explore the practice", key: "what" },
    true,
  );
  footerInto(f, w);
}

/* ---- 404 ----------------------------------------------------------------- */

function notFoundPage(f, w) {
  headerInto(f, w, null);
  const band = section(f, w, { name: "404", py: w >= 700 ? 120 : 64 });
  const big = frame(band, { name: "404 display", dir: "row", gap: 18, align: "END", hug: true });
  hugText(big, "404", {
    font: fontFor("heading", "medium"),
    size: w >= 1200 ? 200 : w >= 700 ? 150 : 110,
    color: COLORS.forest,
    track: -0.07,
    lh: 0.8,
  });
  const dot = figma.createRectangle();
  dot.name = "404 dot";
  dot.resize(w >= 700 ? 22 : 16, w >= 700 ? 22 : 16);
  dot.cornerRadius = 999;
  dot.fills = [paint(COLORS.lime)];
  big.appendChild(dot);
  dot.layoutSizingHorizontal = "FIXED";
  dot.layoutSizingVertical = "FIXED";
  eyebrow(band, "Error 404 · Route not found");
  heading(band, "This page is off the map.", w, { size: w >= 1200 ? 68 : tscale(w).lg, lh: 0.98 });
  bodyText(band, "The route may have changed, or the page may have moved. The links below lead back to the work.", w, { size: 16, opacity: 0.62, lh: 1.65 });
  actionRow(band, w, [
    { label: "Back to home", style: "Primary", key: "home" },
    { label: "What we do", style: "Outline", key: "what" },
    { label: "Opportunity board", style: "Ghost", key: "programs", arrow: false },
  ]);

  const routes = section(f, w, { name: "Route list", bg: COLORS.sage });
  sectionHead(routes, w, "All routes", "The site map.", "Every public route in this build, at three widths.");
  const list = frame(routes, { name: "Route rows", gap: 0 });
  [
    ["About", "about"],
    ["What We Do", "what"],
    ["Programs", "programs"],
    ["Insights", "insights"],
    ["Impact", "impact"],
    ["Get Involved", "involved"],
    ["Partner With Us", "partner"],
    ["Contact", "contact"],
  ].forEach(([label, key]) => {
    const r = frame(list, { name: "Route / " + label, dir: "row", gap: 16, align: "CENTER", mainAlign: "SPACE_BETWEEN", pt: 14, pb: 14 });
    hugText(r, label, {
      font: fontFor("heading", "medium"),
      size: 22,
      color: COLORS.forest,
      track: -0.03,
      lh: 1.1,
    });
    hugText(r, "→", { size: 18, color: COLORS.forest, opacity: 0.45, lh: 1 });
    queueLink(r, key, w);
    divider(list, COLORS.forest, 0.14);
  });

  footerInto(f, w);
}

/* ---- route assembly ------------------------------------------------------ */

function readingSection(parent, w, contentWidth, options) {
  const opt = options || {};
  const d = dims(w);
  const side = Math.max(d.pad, Math.floor((w - contentWidth) / 2));
  const s = frame(parent, {
    name: opt.name || "Reading",
    gap: opt.gap === undefined ? 18 : opt.gap,
    pt: opt.pt === undefined ? d.sectionPad : opt.pt,
    pb: opt.pb === undefined ? d.sectionPad : opt.pb,
    pl: side,
    pr: side,
  });
  return s;
}

async function buildRouteFrames(page, key, builder, y) {
  const widths = [1440, 768, 390];
  const frames = [];
  for (const [index, w] of widths.entries()) {
    const f = await newPageFrame(page, PAGE_LABEL[key] + " / " + w, w);
    f.x = XPOS[index];
    f.y = y + 52;
    const label = txt(PAGE_LABEL[key] + " · " + w + " px", {
      font: fontFor("body", "semibold"),
      size: 15,
      color: COLORS.forest,
      opacity: 0.55,
      track: 0.04,
      lh: 1.2,
    });
    label.x = XPOS[index];
    label.y = y + 18;
    label.setPluginData(MARK, BUILD);
    builder(f, w);
    FRAMES[key + "|" + w] = f;
    frames.push(f);
    if (w === 1440 || w === 390) {
      try {
        const live = (page.flowStartingPoints || []).filter((point) => {
          const node = figma.getNodeById(point.nodeId);
          return node && !node.removed;
        });
        page.flowStartingPoints = live.concat([
          { nodeId: f.id, name: PAGE_LABEL[key] + " / " + w },
        ]);
      } catch (error) {
        /* flows are optional; frames still open individually */
      }
    }
  }
  return frames;
}

const ROUTE_SETS = [
  { key: "home", name: "03 · Home", aliases: ["Home"], build: homePage },
  { key: "about", name: "04 · About", aliases: ["About"], build: aboutPage },
  { key: "what", name: "05 · What We Do", aliases: ["What We Do", "What we do"], build: whatPage },
  { key: "programs", name: "06 · Programs", aliases: ["Programs"], build: programsPage },
];

async function buildAllPages() {
  const heights = {};

  for (const set of ROUTE_SETS) {
    const page = getOrCreatePage(set.name, set.aliases);
    const frames = await buildRouteFrames(page, set.key, set.build, canvasBase(page));
    heights[set.key] = Math.max.apply(null, frames.map((frameNode) => frameNode.height));
  }

  const insightsPageNode = getOrCreatePage("07 · Insights", ["Insights"]);
  const insightsBase = canvasBase(insightsPageNode);
  const insightFrames = await buildRouteFrames(insightsPageNode, "insights", insightsPage, insightsBase);
  const articleY = insightsBase + Math.max.apply(null, insightFrames.map((frameNode) => frameNode.height)) + 140;
  const articleFrames = await buildRouteFrames(insightsPageNode, "article", articlePage, articleY);
  heights.insights = articleY + Math.max.apply(null, articleFrames.map((frameNode) => frameNode.height));

  const rest = [
    { key: "impact", name: "08 · Impact", aliases: ["Impact"], build: impactPage },
    { key: "involved", name: "09 · Get Involved", aliases: ["Get Involved", "Get involved"], build: involvedPage },
    { key: "partner", name: "10 · Partner With Us", aliases: ["Partner With Us", "Partner with us"], build: partnerPage },
    { key: "contact", name: "11 · Contact", aliases: ["Contact"], build: contactPage },
    { key: "notfound", name: "12 · 404", aliases: ["404", "Not Found"], build: notFoundPage },
  ];
  for (const set of rest) {
    const page = getOrCreatePage(set.name, set.aliases);
    const frames = await buildRouteFrames(page, set.key, set.build, canvasBase(page));
    heights[set.key] = Math.max.apply(null, frames.map((frameNode) => frameNode.height));
  }

  return heights;
}
