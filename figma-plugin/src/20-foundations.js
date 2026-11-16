/* ============================================================================
   20-foundations.js : images, paint styles, text styles, variables, board
   ========================================================================= */

async function initImages() {
  const keys = Object.keys(PHOTO_URLS);
  for (const key of keys) {
    try {
      const response = await fetch(PHOTO_URLS[key]);
      if (!response.ok) continue;
      const buffer = await response.arrayBuffer();
      IMAGES[key] = figma.createImage(new Uint8Array(buffer));
    } catch (error) {
      /* offline or blocked domain: frames fall back to a solid plate */
    }
  }
}

function ensurePaintStyle(name, hex, opacity) {
  const existing = figma.getLocalPaintStyles().find((style) => style.name === name);
  if (existing) return existing;
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [paint(hex, opacity === undefined ? 1 : opacity)];
  return style;
}

function ensureTextStyle(name, options) {
  const existing = figma.getLocalTextStyles().find((style) => style.name === name);
  if (existing) return existing;
  const style = figma.createTextStyle();
  style.name = name;
  style.fontName = options.fontName;
  style.fontSize = options.fontSize;
  style.lineHeight = { unit: "PIXELS", value: Math.round(options.lineHeight * options.fontSize) };
  style.letterSpacing = { unit: "PIXELS", value: (options.tracking || 0) * options.fontSize };
  return style;
}

function ensureEffectStyle(name) {
  try {
    const existing = figma.getLocalEffectStyles().find((style) => style.name === name);
    if (existing) return existing;
    const style = figma.createEffectStyle();
    style.name = name;
    style.effects = [shadow()];
    return style;
  } catch (error) {
    return null;
  }
}

function ensureColorVariable(collection, name, hex, modeId) {
  try {
    const existing = collection.variableIds
      .map((id) => figma.variables.getVariableById(id))
      .find((variable) => variable && variable.name === name);
    if (existing) return existing;
  } catch (error) {
    /* fall through and try to create */
  }
  try {
    const variable = figma.variables.createVariable(name, collection, "COLOR");
    variable.setValueForMode(modeId, { r: rgb(hex).r, g: rgb(hex).g, b: rgb(hex).b, a: 1 });
    return variable;
  } catch (error) {
    return null;
  }
}

function buildVariables() {
  try {
    const collections = figma.variables.getLocalVariableCollections();
    let collection = collections.find((item) => item.name === "AfriYouth / Core");
    if (!collection) collection = figma.variables.createVariableCollection("AfriYouth / Core");
    const modeId = collection.modes[0].modeId;
    const colors = [
      ["color/forest", COLORS.forest],
      ["color/ink", COLORS.ink],
      ["color/lime", COLORS.lime],
      ["color/ivory", COLORS.ivory],
      ["color/sage", COLORS.sage],
      ["color/paper", COLORS.paper],
      ["color/clay", COLORS.clay],
      ["color/error", COLORS.error],
      ["brand/blue", COLORS.officialBlue],
      ["brand/steel-pink", COLORS.officialPink],
      ["brand/duke-blue", COLORS.officialDuke],
      ["brand/dark-purple", COLORS.officialPurple],
    ];
    colors.forEach(([name, hex]) => ensureColorVariable(collection, name, hex, modeId));
  } catch (error) {
    /* variables API unavailable: paint styles still document the palette */
  }
}

function buildStyles() {
  const paints = [
    ["color/forest", COLORS.forest],
    ["color/ink", COLORS.ink],
    ["color/lime", COLORS.lime],
    ["color/ivory", COLORS.ivory],
    ["color/sage", COLORS.sage],
    ["color/paper", COLORS.paper],
    ["color/clay", COLORS.clay],
    ["color/error", COLORS.error],
    ["brand/blue", COLORS.officialBlue],
    ["brand/steel-pink", COLORS.officialPink],
    ["brand/duke-blue", COLORS.officialDuke],
    ["brand/dark-purple", COLORS.officialPurple],
  ];
  paints.forEach(([name, hex]) => ensurePaintStyle(name, hex));

  const texts = [
    ["display/hero", { fontName: fontFor("heading", "medium"), fontSize: 104, lineHeight: 0.9, tracking: -0.055 }],
    ["display/xl", { fontName: fontFor("heading", "medium"), fontSize: 90, lineHeight: 0.96, tracking: -0.045 }],
    ["display/lg", { fontName: fontFor("heading", "medium"), fontSize: 60, lineHeight: 1, tracking: -0.04 }],
    ["display/md", { fontName: fontFor("heading", "medium"), fontSize: 38, lineHeight: 1.06, tracking: -0.035 }],
    ["body/lede", { fontName: fontFor("body", "regular"), fontSize: 20, lineHeight: 1.5, tracking: -0.015 }],
    ["body/base", { fontName: fontFor("body", "regular"), fontSize: 16, lineHeight: 1.6, tracking: 0 }],
    ["body/small", { fontName: fontFor("body", "regular"), fontSize: 14, lineHeight: 1.65, tracking: 0 }],
    ["label/eyebrow", { fontName: fontFor("body", "semibold"), fontSize: 11, lineHeight: 1.2, tracking: 0.18 }],
    ["label/field", { fontName: fontFor("body", "semibold"), fontSize: 12, lineHeight: 1.2, tracking: 0.1 }],
    ["label/meta", { fontName: fontFor("body", "medium"), fontSize: 10, lineHeight: 1.2, tracking: 0.14 }],
  ];
  texts.forEach(([name, options]) => ensureTextStyle(name, options));
  ensureEffectStyle("elevation/card");
}

function swatch(parent, name, hex, role, size) {
  const cell = frame(parent, { name: "Swatch / " + name, gap: 10, w: size || 176 });
  const block = figma.createRectangle();
  block.name = "Colour";
  block.resize(size || 176, 88);
  block.cornerRadius = 12;
  block.fills = [paint(hex)];
  block.strokes = [paint(COLORS.forest, 0.12)];
  block.strokeWeight = 1;
  cell.appendChild(block);
  block.layoutSizingHorizontal = "FILL";
  block.layoutSizingVertical = "FIXED";
  text(cell, name, { size: 12, weight: "semibold", color: COLORS.forest, lh: 1.3 });
  text(cell, hex + (role ? " · " + role : ""), { size: 10.5, color: COLORS.forest, opacity: 0.5, lh: 1.4 });
  return cell;
}

function typeSpecimen(parent, label, sample, size, family, tracking, lineHeight) {
  const rowNode = frame(parent, { name: "Type / " + label, dir: "row", gap: 24, align: "MIN", pt: 14, pb: 14 });
  const meta = frame(rowNode, { name: "Meta", w: 180, gap: 4 });
  text(meta, label, { size: 11, weight: "semibold", color: COLORS.forest, opacity: 0.55, lh: 1.3 });
  text(meta, family + " · " + Math.round(size) + "px", { size: 10.5, color: COLORS.forest, opacity: 0.4, lh: 1.3 });
  const sampleBox = frame(rowNode, { name: "Sample", gap: 0 });
  sampleBox.layoutSizingHorizontal = "FILL";
  text(sampleBox, sample, {
    font: fontFor("heading", "medium"),
    size,
    color: COLORS.forest,
    lh: lineHeight || 1,
    track: tracking === undefined ? -0.04 : tracking,
  });
  divider(parent, COLORS.forest, 0.1);
  return rowNode;
}

async function buildFoundations(page) {
  await figma.setCurrentPageAsync(page);
  const board = frame(null, { name: "Foundations / Brand, tokens & type", w: 1440, gap: 48, p: 58, bg: COLORS.ivory });
  board.setPluginData(MARK, BUILD);
  board.x = 0;
  board.y = canvasBase(page);

  const head = frame(board, { name: "Header", gap: 18 });
  eyebrow(head, "Foundations · 00");
  heading(head, "One system for evidence, design and policy.", 1440, { size: 64, lh: 0.98 });
  text(head, "Design tokens, type scale and identity references for the AfriYouth website. The official brand system — Dark Purple, Steel Pink, Duke Blue, Blue and Poppins — is applied across every page frame. DM Sans is the documented substitute for Gilroy.", { size: 16, color: COLORS.forest, opacity: 0.62, lh: 1.6, w: 900 });

  const paletteSection = frame(board, { name: "Brand palette", gap: 20 });
  eyebrow(paletteSection, "Brand palette");
  text(paletteSection, "Applied across every page frame", { size: 18, weight: "medium", color: COLORS.forest, lh: 1.3 });
  const paletteRow = frame(paletteSection, { name: "Palette", dir: "row", gap: 16, wrap: true });
  [
    ["brand/dark-purple", COLORS.officialPurple, "primary ink"],
    ["brand/steel-pink", COLORS.officialPink, "accent"],
    ["brand/duke-blue", COLORS.officialDuke, "secondary"],
    ["brand/blue", COLORS.officialBlue, "supporting"],
    ["color/ivory", COLORS.ivory, "page"],
    ["color/paper", COLORS.paper, "cards"],
    ["color/blush", COLORS.blush, "accent panel"],
    ["color/sage", COLORS.sage, "quiet panel"],
  ].forEach(([name, hex, role]) => swatch(paletteRow, name, hex, role));

  const brandSection = frame(board, { name: "Identity rules", gap: 14, p: 24, bg: COLORS.paper, radius: 20, border: COLORS.forest, borderWidth: 1 });
  eyebrow(brandSection, "Identity rules");
  text(brandSection, "How the official system is applied", { size: 18, weight: "medium", color: COLORS.forest, lh: 1.3 });
  text(brandSection, "Dark Purple #0D0624 carries primary ink, dark panels and the footer. Steel Pink #C723DF is the accent and focus colour; filled pink surfaces use the blush tint #FAE8FD so text keeps accessible contrast. Duke Blue #0301FF and Blue #0200A7 support data marks and graphic accents. The official raised-hands figure mark is used as supplied, with the typographic wordmark.", { size: 14, color: COLORS.forest, opacity: 0.62, lh: 1.6, w: 1180 });
  text(brandSection, "Typography uses Poppins for display and headings. Gilroy is the official body face but is proprietary, so DM Sans is the documented substitute across the site and these frames.", { size: 14, color: COLORS.forest, opacity: 0.62, lh: 1.6, w: 1180 });

  const typeSection = frame(board, { name: "Type scale", gap: 0 });
  eyebrow(typeSection, "Typography · " + F.h.family + " / " + F.b.family);
  text(typeSection, "Responsive display scale", { size: 18, weight: "medium", color: COLORS.forest, lh: 1.3, pt: 10, pb: 10 });
  divider(typeSection, COLORS.forest, 0.12);
  typeSpecimen(typeSection, "display/hero", "Evidence. Innovation.", 72, F.h.family, -0.055, 0.9);
  typeSpecimen(typeSection, "display/xl", "Five divisions.", 56, F.h.family, -0.045, 0.96);
  typeSpecimen(typeSection, "display/lg", "One connected practice.", 40, F.h.family, -0.04, 1);
  typeSpecimen(typeSection, "display/md", "Research & Evidence Lab", 28, F.h.family, -0.035, 1.05);
  typeSpecimen(typeSection, "body/lede", "Applied evidence, policy and venture support built for the decision at hand.", 20, F.b.family, -0.015, 1.5);
  typeSpecimen(typeSection, "body/base", "Body copy is set in " + F.b.family + " at 15–16px with generous line height.", 16, F.b.family, 0, 1.6);

  const spacing = frame(board, { name: "Spacing & radius", gap: 18 });
  eyebrow(spacing, "Spacing · 4px base");
  const bars = frame(spacing, { name: "Spacing scale", dir: "row", gap: 12, align: "MAX" });
  [4, 8, 12, 16, 24, 32, 48, 64, 96].forEach((value) => {
    const cell = frame(bars, { name: "Space " + value, gap: 6, mainAlign: "MAX", w: 54 });
    const bar = figma.createRectangle();
    bar.name = "Bar";
    bar.resize(24, value);
    bar.cornerRadius = 4;
    bar.fills = [paint(COLORS.forest, 0.82)];
    cell.appendChild(bar);
    bar.layoutSizingHorizontal = "FIXED";
    bar.layoutSizingVertical = "FIXED";
    text(cell, String(value), { size: 10, color: COLORS.forest, opacity: 0.5, align: "CENTER" });
  });
  text(spacing, "Radius · card 20 · panel 16 · pill 999 · field 12", { size: 12, color: COLORS.forest, opacity: 0.55, lh: 1.5 });
  text(spacing, "Elevation · card drop shadow 0 / 18 / 40 / -30 at 12% forest", { size: 12, color: COLORS.forest, opacity: 0.55, lh: 1.5 });

  const note = frame(board, { name: "Notes", gap: 8, p: 20, bg: COLORS.sage, radius: 16 });
  text(note, "Handover note", { size: 12, weight: "semibold", color: COLORS.forest, lh: 1.3 });
  text(note, "Page frames are generated from the implemented site content. Re-running the plugin replaces only nodes marked as generated; existing work is never deleted. Fonts fall back to Inter if Poppins or DM Sans are unavailable in the file.", { size: 12, color: COLORS.forest, opacity: 0.62, lh: 1.55 });
  return board;
}
