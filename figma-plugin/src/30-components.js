/* ============================================================================
   30-components.js : component library
   ========================================================================= */

const BUTTON_VARIANTS = {};

const BUTTON_STYLES = {
  Primary: { bg: COLORS.forest, text: COLORS.ivory, border: null },
  Lime: { bg: COLORS.lime, text: COLORS.forest, border: null },
  Outline: { bg: null, text: COLORS.forest, border: COLORS.forest },
  Light: { bg: null, text: COLORS.ivory, border: "rgba-ivory" },
  Ghost: { bg: null, text: COLORS.forest, border: null },
};

function styleButton(component, styleName, stateName) {
  const spec = BUTTON_STYLES[styleName];
  component.name = "Style=" + styleName + ", State=" + stateName;
  component.layoutMode = "HORIZONTAL";
  component.primaryAxisSizingMode = "AUTO";
  component.counterAxisSizingMode = "AUTO";
  component.counterAxisAlignItems = "CENTER";
  component.primaryAxisAlignItems = "CENTER";
  component.itemSpacing = 8;
  component.paddingTop = 13;
  component.paddingBottom = 13;
  component.paddingLeft = 22;
  component.paddingRight = 22;
  component.cornerRadius = 999;

  const isDark = styleName === "Light";
  let bg = spec.bg;
  let textColor = spec.text;
  let borderColor = spec.border === "rgba-ivory" ? COLORS.ivory : spec.border;

  if (stateName === "Hover") {
    if (styleName === "Primary") bg = COLORS.ink;
    if (styleName === "Lime") bg = COLORS.ivory;
    if (styleName === "Outline") bg = COLORS.forest;
    if (styleName === "Ghost") bg = COLORS.sage;
    if (styleName === "Outline") textColor = COLORS.ivory;
  }
  component.fills = bg ? [paint(bg)] : [];
  component.strokes = borderColor ? [paint(borderColor, styleName === "Light" ? 0.35 : 1)] : [];
  if (borderColor) {
    component.strokeWeight = 1;
    component.strokeAlign = "INSIDE";
  }
  if (stateName === "Disabled") component.opacity = 0.55;

  const label = txt("Button", {
    font: fontFor("body", "medium"),
    size: 14,
    color: textColor,
    opacity: styleName === "Ghost" ? 0.75 : 1,
    lh: 1.2,
    name: "Label",
  });
  component.appendChild(label);

  const arrow = txt("→", {
    font: fontFor("body", "medium"),
    size: 15,
    color: textColor,
    opacity: styleName === "Ghost" ? 0.7 : 0.9,
    lh: 1.1,
    name: "Arrow",
  });
  component.appendChild(arrow);
  if (isDark && styleName !== "Light") arrow.fills = [paint(COLORS.ivory)];
  return component;
}

function makeComponent(container, name, w, h) {
  const c = figma.createComponent();
  c.name = name;
  c.resize(w || 320, h || 48);
  container.appendChild(c);
  return c;
}

function buildButtonSet(parent) {
  const wrap = frame(parent, { name: "Button set", dir: "row", gap: 20, wrap: true, align: "MIN" });
  const components = [];
  Object.keys(BUTTON_STYLES).forEach((styleName) => {
    ["Default", "Hover", "Disabled"].forEach((stateName) => {
      const c = makeComponent(wrap, "Style=" + styleName + ", State=" + stateName);
      styleButton(c, styleName, stateName);
      components.push(c);
      BUTTON_VARIANTS[styleName + "|" + stateName] = c;
    });
  });
  try {
    const set = figma.combineAsVariants(components, wrap);
    set.name = "Button";
  } catch (error) {
    /* variants remain separate components if combine is unavailable */
  }
  return wrap;
}

function buildBadgeSet(parent) {
  const wrap = frame(parent, { name: "Badge set", dir: "row", gap: 14, wrap: true });
  const variants = [
    ["Lime", COLORS.lime, COLORS.forest, null],
    ["Outline", null, COLORS.forest, COLORS.forest],
    ["Dark", COLORS.forest, COLORS.ivory, null],
    ["Soft", COLORS.sage, COLORS.forest, null],
    ["Current", COLORS.sage, COLORS.forest, null],
  ];
  const components = variants.map(([name, bg, color, border]) => {
    const c = makeComponent(wrap, "Style=" + name, 120, 28);
    c.layoutMode = "HORIZONTAL";
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = "CENTER";
    c.paddingLeft = 12;
    c.paddingRight = 12;
    c.paddingTop = 6;
    c.paddingBottom = 6;
    c.cornerRadius = 999;
    c.itemSpacing = 6;
    c.fills = bg ? [paint(bg)] : [];
    c.strokes = border ? [paint(border, 0.25)] : [];
    if (border) {
      c.strokeWeight = 1;
      c.strokeAlign = "INSIDE";
    }
    if (name === "Current") {
      const dot = figma.createRectangle();
      dot.name = "Dot";
      dot.resize(6, 6);
      dot.cornerRadius = 999;
      dot.fills = [paint(COLORS.clay)];
      c.appendChild(dot);
    }
    const label = txt(name, {
      font: fontFor("body", "semibold"),
      size: 10,
      color,
      track: 0.14,
      lh: 1.2,
      name: "Label",
    });
    label.characters = name.toUpperCase();
    c.appendChild(label);
    return c;
  });
  try {
    const set = figma.combineAsVariants(components, wrap);
    set.name = "Badge";
  } catch (error) {
    /* non-fatal */
  }
  return wrap;
}

function buildChipSet(parent) {
  const wrap = frame(parent, { name: "Filter chip set", dir: "row", gap: 14 });
  const components = ["Default", "Selected"].map((state) => {
    const selected = state === "Selected";
    const c = makeComponent(wrap, "State=" + state, 160, 38);
    c.layoutMode = "HORIZONTAL";
    c.counterAxisAlignItems = "CENTER";
    c.primaryAxisAlignItems = "CENTER";
    c.paddingLeft = 16;
    c.paddingRight = 16;
    c.paddingTop = 9;
    c.paddingBottom = 9;
    c.cornerRadius = 999;
    c.fills = selected ? [paint(COLORS.forest)] : [paint(COLORS.paper)];
    c.strokes = selected ? [] : [paint(COLORS.forest, 0.18)];
    if (!selected) {
      c.strokeWeight = 1;
      c.strokeAlign = "INSIDE";
    }
    c.appendChild(
      txt("All opportunities", {
        font: fontFor("body", "medium"),
        size: 12,
        color: selected ? COLORS.ivory : COLORS.forest,
        opacity: selected ? 1 : 0.7,
        lh: 1.2,
        name: "Label",
      }),
    );
    return c;
  });
  try {
    const set = figma.combineAsVariants(components, wrap);
    set.name = "Filter chip";
  } catch (error) {
    /* non-fatal */
  }
  return wrap;
}

function buildFieldSet(parent) {
  const wrap = frame(parent, { name: "Field set", dir: "row", gap: 20, wrap: true });
  const components = ["Default", "Focus", "Error"].map((state) => {
    const c = makeComponent(wrap, "State=" + state, 320, 86);
    c.layoutMode = "VERTICAL";
    c.itemSpacing = 8;
    c.fills = [];
    const label = txt("Email address", {
      font: fontFor("body", "semibold"),
      size: 11,
      color: COLORS.forest,
      track: 0.1,
      lh: 1.2,
      name: "Label",
    });
    label.characters = "EMAIL ADDRESS";
    c.appendChild(label);
    const box = frame(c, {
      name: "Input",
      h: 48,
      p: 14,
      bg: COLORS.paper,
      border: state === "Error" ? COLORS.error : state === "Focus" ? COLORS.forest : COLORS.forest,
      borderWidth: state === "Error" ? 2 : 1,
      radius: 10,
      align: "CENTER",
    });
    box.layoutSizingHorizontal = "FILL";
    box.appendChild(
      txt(state === "Error" ? "not-an-email" : "you@example.org", {
        size: 14,
        color: COLORS.forest,
        opacity: 0.45,
        lh: 1.2,
        name: "Placeholder",
      }),
    );
    if (state === "Error") {
      c.appendChild(
        txt("Enter a valid email address.", {
          size: 11,
          color: COLORS.errorText,
          lh: 1.3,
          name: "Error",
        }),
      );
    }
    return c;
  });
  try {
    const set = figma.combineAsVariants(components, wrap);
    set.name = "Form field";
  } catch (error) {
    /* non-fatal */
  }
  return wrap;
}

function buildCardComponents(parent) {
  const wrap = frame(parent, { name: "Card set", dir: "row", gap: 20, wrap: true, align: "MIN" });
  const card = makeComponent(wrap, "Card / Area / Default", 400, 320);
  card.layoutMode = "VERTICAL";
  card.itemSpacing = 14;
  card.paddingTop = 24;
  card.paddingBottom = 24;
  card.paddingLeft = 24;
  card.paddingRight = 24;
  card.fills = [paint(COLORS.paper)];
  card.strokes = [paint(COLORS.forest, 0.12)];
  card.strokeWeight = 1;
  card.strokeAlign = "INSIDE";
  card.cornerRadius = 20;
  card.appendChild(
    txt("01 / Research", {
      font: fontFor("body", "semibold"),
      size: 10,
      color: COLORS.forest,
      opacity: 0.45,
      track: 0.14,
      lh: 1.2,
    }),
  );
  card.appendChild(
    txt("Research & Evidence Lab", {
      font: fontFor("heading", "medium"),
      size: 26,
      color: COLORS.forest,
      track: -0.035,
      lh: 1.05,
    }),
  );
  card.appendChild(
    txt("Applied evidence for real decisions.", {
      size: 13,
      color: COLORS.forest,
      opacity: 0.72,
      lh: 1.5,
    }),
  );
  card.appendChild(
    txt("Applied policy and socio-economic research on youth, institutions and markets.", {
      size: 13,
      color: COLORS.forest,
      opacity: 0.55,
      lh: 1.6,
    }),
  );

  const insight = makeComponent(wrap, "Card / Insight / Default", 400, 400);
  insight.layoutMode = "VERTICAL";
  insight.itemSpacing = 0;
  insight.fills = [paint(COLORS.paper)];
  insight.strokes = [paint(COLORS.forest, 0.12)];
  insight.strokeWeight = 1;
  insight.strokeAlign = "INSIDE";
  insight.cornerRadius = 20;
  insight.clipsContent = true;
  const photoBox = frame(insight, { name: "Image", h: 190, bg: COLORS.sage });
  photoBox.layoutSizingHorizontal = "FILL";
  photoBox.layoutSizingVertical = "FIXED";
  const content = frame(insight, { name: "Content", gap: 10, p: 20 });
  content.appendChild(
    txt("RESEARCH & EVIDENCE · ESSAY", {
      font: fontFor("body", "semibold"),
      size: 9.5,
      color: COLORS.forest,
      opacity: 0.45,
      track: 0.14,
      lh: 1.2,
    }),
  );
  content.appendChild(
    txt("Evidence is not the opposite of imagination", {
      font: fontFor("heading", "medium"),
      size: 22,
      color: COLORS.forest,
      track: -0.035,
      lh: 1.1,
    }),
  );
  content.appendChild(
    txt("Rigour and creativity are often treated as rivals.", {
      size: 13,
      color: COLORS.forest,
      opacity: 0.55,
      lh: 1.55,
    }),
  );

  const pending = makeComponent(wrap, "Panel / Profile", 520, 260);
  pending.layoutMode = "VERTICAL";
  pending.itemSpacing = 14;
  pending.paddingTop = 28;
  pending.paddingBottom = 28;
  pending.paddingLeft = 28;
  pending.paddingRight = 28;
  pending.fills = [paint(COLORS.paper)];
  pending.strokes = [paint(COLORS.forest, 0.14)];
  pending.strokeWeight = 1;
  pending.strokeAlign = "INSIDE";
  pending.cornerRadius = 20;
  pending.appendChild(
    txt("TEAM & PARTNERS", {
      font: fontFor("body", "semibold"),
      size: 10,
      color: COLORS.forest,
      opacity: 0.45,
      track: 0.16,
      lh: 1.2,
    }),
  );
  pending.appendChild(
    txt("One connected practice", {
      font: fontFor("heading", "medium"),
      size: 30,
      color: COLORS.forest,
      track: -0.035,
      lh: 1.05,
    }),
  );
  pending.appendChild(
    txt("Research, policy, human-centered design, entrepreneurship, foresight and professional development sit within one practice, assembled around the decision at hand.", {
      size: 13.5,
      color: COLORS.forest,
      opacity: 0.6,
      lh: 1.6,
    }),
  );
  return wrap;
}

function buildHeaderFooterComponents(parent) {
  const wrap = frame(parent, { name: "Header & footer set", gap: 24 });
  const desktopHeader = makeComponent(wrap, "Header / Desktop / Default", 1440, 76);
  desktopHeader.layoutMode = "VERTICAL";
  desktopHeader.fills = [paint(COLORS.paper)];
  headerInto(desktopHeader, 1440, null, { library: true });
  desktopHeader.layoutSizingVertical = "HUG";

  const mobileHeader = makeComponent(wrap, "Header / Mobile / Default", 390, 76);
  mobileHeader.layoutMode = "VERTICAL";
  mobileHeader.fills = [paint(COLORS.paper)];
  headerInto(mobileHeader, 390, null, { library: true });
  mobileHeader.layoutSizingVertical = "HUG";

  const footer = makeComponent(wrap, "Footer / Desktop / Default", 1440, 320);
  footer.layoutMode = "VERTICAL";
  footer.fills = [paint(COLORS.forest)];
  footerInto(footer, 1440, { library: true });
  footer.layoutSizingVertical = "HUG";
  return wrap;
}

function buildComponents(page) {
  figma.currentPage = page;
  const lib = frame(null, { name: "AfriYouth / Component Library", w: 1440, p: 58, gap: 52, bg: COLORS.ivory });
  lib.setPluginData(MARK, BUILD);
  lib.x = 0;
  lib.y = canvasBase(page);

  const head = frame(lib, { name: "Header", gap: 14 });
  eyebrow(head, "Components · 02");
  heading(head, "A reusable system, not a redraw.", 1440, { size: 58, lh: 0.98 });
  text(head, "Buttons, badges, chips, fields, cards and navigation references. Page frames use these visual rules and link to this page for handover.", { size: 16, color: COLORS.forest, opacity: 0.6, lh: 1.6, w: 900 });

  const label = (name, note) => {
    const block = frame(lib, { name: "Group / " + name, gap: 8 });
    text(block, name, { size: 18, weight: "medium", color: COLORS.forest, lh: 1.3 });
    text(block, note, { size: 12, color: COLORS.forest, opacity: 0.5, lh: 1.5 });
    return block;
  };

  buildButtonSet(label("Buttons", "Five styles across default, hover and disabled states."));
  buildBadgeSet(label("Badges", "Status and category labels, including the provisional state."));
  buildChipSet(label("Filter chips", "Default and selected states for the Programs and Insights filters."));
  buildFieldSet(label("Form fields", "Default, focus and error states with visible labels."));
  buildCardComponents(label("Cards", "Area, insight and pending-panel references."));
  buildHeaderFooterComponents(label("Navigation", "Desktop and mobile header plus the footer."));
  return lib;
}
