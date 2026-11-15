/* ============================================================================
   AfriYouth Innovation Labs — Figma build plugin
   00-core.js : tokens, fonts, text, layout and asset helpers
   ========================================================================= */

const MARK = "afriyouth.generated";
const BUILD = "1.0.0";

const COLORS = {
  forest: "#0D0624",
  ink: "#070314",
  lime: "#C723DF",
  ivory: "#F7F5FB",
  sage: "#E9E5F7",
  paper: "#FFFFFF",
  clay: "#0301FF",
  blush: "#FAE8FD",
  blue: "#0200A7",
  error: "#A33A2A",
  errorText: "#8F2F20",
  officialBlue: "#0301FF",
  officialPink: "#C723DF",
  officialDuke: "#0200A7",
  officialPurple: "#0D0624",
};

function rgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

function paint(hex, opacity = 1) {
  return { type: "SOLID", color: rgb(hex), opacity };
}

function shadow() {
  return {
    type: "DROP_SHADOW",
    color: { r: 13 / 255, g: 6 / 255, b: 36 / 255, a: 0.12 },
    offset: { x: 0, y: 18 },
    radius: 40,
    spread: -30,
    visible: true,
    blendMode: "NORMAL",
  };
}

const F = {
  h: { family: "Poppins", regular: "Regular", medium: "Medium", semibold: "SemiBold", bold: "Bold" },
  b: { family: "DM Sans", regular: "Regular", medium: "Medium", semibold: "SemiBold", bold: "Bold" },
};

function normStyle(s) {
  return String(s).toLowerCase().replace(/\s+/g, "");
}

async function initFonts() {
  let families = {};
  try {
    const all = await figma.listAvailableFontsAsync();
    all.forEach((entry) => {
      const fam = entry.fontName.family;
      if (!families[fam]) families[fam] = [];
      families[fam].push(entry.fontName.style);
    });
  } catch (error) {
    families = {};
  }

  const chooseFamily = (candidates) => candidates.find((name) => families[name] && families[name].length) || "Inter";
  const pickStyle = (family, wanted) => {
    const styles = families[family] || [];
    const exact = styles.find((style) => normStyle(style) === normStyle(wanted));
    if (exact) return exact;
    if (/medium/i.test(wanted)) {
      const medium = styles.find((style) => /medium|semibold|semi bold/i.test(style));
      if (medium) return medium;
    }
    if (/semi/i.test(wanted)) {
      const semi = styles.find((style) => /semibold|semi bold|bold/i.test(style));
      if (semi) return semi;
    }
    if (/bold/i.test(wanted)) {
      const bold = styles.find((style) => /bold/i.test(style));
      if (bold) return bold;
    }
    return styles.find((style) => /regular/i.test(style)) || styles[0] || "Regular";
  };
  const make = (family) => ({
    family,
    regular: pickStyle(family, "Regular"),
    medium: pickStyle(family, "Medium"),
    semibold: pickStyle(family, "SemiBold"),
    bold: pickStyle(family, "Bold"),
  });

  const headingFamily = chooseFamily(["Poppins", "Inter"]);
  const bodyFamily = chooseFamily(["DM Sans", "Inter"]);
  F.h = make(headingFamily);
  F.b = make(bodyFamily);

  const unique = new Set();
  [F.h, F.b].forEach((group) => {
    ["regular", "medium", "semibold", "bold"].forEach((key) => {
      unique.add(JSON.stringify(group[key]));
    });
  });
  for (const serialized of unique) {
    try {
      await figma.loadFontAsync(JSON.parse(serialized));
    } catch (error) {
      /* a missing style falls back below */
    }
  }

  try {
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  } catch (error) {
    /* Inter is not guaranteed either */
  }
}

function fontFor(kind, weight) {
  const group = kind === "heading" ? F.h : F.b;
  return { family: group.family, style: group[weight || "regular"] };
}

function dims(w) {
  if (w >= 1200) {
    return { w, pad: 58, content: 1324, sectionPad: 112, gap: 24, cols: 3, type: 1 };
  }
  if (w >= 700) {
    return { w, pad: 31, content: 706, sectionPad: 80, gap: 20, cols: 2, type: 0.62 };
  }
  return { w, pad: 20, content: 350, sectionPad: 64, gap: 16, cols: 1, type: 0.46 };
}

function tscale(w) {
  if (w >= 1200) {
    return { hero: 104, xl: 90, lg: 60, md: 38, lede: 20, body: 15, small: 13, micro: 11 };
  }
  if (w >= 700) {
    return { hero: 58, xl: 50, lg: 36, md: 27, lede: 18, body: 15, small: 13, micro: 11 };
  }
  return { hero: 45, xl: 39, lg: 30, md: 25, lede: 17, body: 15, small: 13, micro: 10.5 };
}

/* ---- frames -------------------------------------------------------------- */

function frame(parent, options) {
  const opt = options || {};
  const f = figma.createFrame();
  f.name = opt.name || "Frame";
  f.layoutMode = opt.dir === "row" ? "HORIZONTAL" : "VERTICAL";
  f.itemSpacing = opt.gap === undefined ? 0 : opt.gap;
  f.paddingTop = opt.pt !== undefined ? opt.pt : opt.p || 0;
  f.paddingBottom = opt.pb !== undefined ? opt.pb : opt.p || 0;
  f.paddingLeft = opt.pl !== undefined ? opt.pl : opt.p || 0;
  f.paddingRight = opt.pr !== undefined ? opt.pr : opt.p || 0;
  f.fills = opt.bg ? [paint(opt.bg, opt.bgOpacity === undefined ? 1 : opt.bgOpacity)] : [];
  f.strokes = opt.border ? [paint(opt.border)] : [];
  if (opt.border) {
    f.strokeWeight = opt.borderWidth === undefined ? 1 : opt.borderWidth;
    f.strokeAlign = "INSIDE";
  }
  if (opt.radius !== undefined) f.cornerRadius = opt.radius;
  if (opt.shadow) f.effects = [shadow()];
  if (opt.clip) f.clipsContent = true;
  if (opt.align) f.counterAxisAlignItems = opt.align;
  if (opt.mainAlign) f.primaryAxisAlignItems = opt.mainAlign;
  f.resize(opt.w || 100, opt.h || 100);
  f.primaryAxisSizingMode = opt.h === undefined ? "AUTO" : "FIXED";
  f.counterAxisSizingMode = opt.w === undefined ? "AUTO" : "FIXED";
  if (parent) parent.appendChild(f);

  if (parent && parent.layoutMode) {
    if (opt.w !== undefined) f.layoutSizingHorizontal = "FIXED";
    else if (opt.hug) f.layoutSizingHorizontal = "HUG";
    else f.layoutSizingHorizontal = "FILL";
    f.layoutSizingVertical = opt.h === undefined ? "HUG" : "FIXED";
    if (opt.grow) f.layoutGrow = 1;
  }
  if (opt.wrap && f.layoutMode === "HORIZONTAL") {
    try {
      f.layoutWrap = "WRAP";
    } catch (error) {
      /* wrapping requires a fixed width; the row still lays out single-line */
    }
  }
  return f;
}

function row(parent, opt) {
  return frame(parent, Object.assign({ dir: "row", align: "CENTER" }, opt));
}

function divider(parent, color, opacity) {
  const line = figma.createRectangle();
  line.name = "Divider";
  line.resize(10, 1);
  line.fills = [paint(color || COLORS.forest, opacity === undefined ? 0.15 : opacity)];
  parent.appendChild(line);
  if (parent.layoutMode) {
    line.layoutSizingHorizontal = "FILL";
    line.layoutSizingVertical = "FIXED";
  }
  return line;
}

function spacer(parent, height) {
  return frame(parent, { name: "Spacer", h: height, w: 1, bg: undefined });
}

/* ---- text --------------------------------------------------------------- */

function txt(chars, options) {
  const opt = options || {};
  const size = opt.size || 15;
  const t = figma.createText();
  t.fontName = opt.font || fontFor("body", opt.weight || "regular");
  t.characters = String(chars);
  t.fontSize = size;
  t.lineHeight = { unit: "PIXELS", value: Math.round((opt.lh || 1.5) * size) };
  t.letterSpacing = { unit: "PIXELS", value: (opt.track || 0) * size };
  t.fills = [paint(opt.color || COLORS.forest, opt.opacity === undefined ? 1 : opt.opacity)];
  if (opt.align) t.textAlignHorizontal = opt.align;
  t.name = opt.name || String(chars).slice(0, 24) || "Text";
  if (opt.w) {
    t.resize(opt.w, 10);
    t.textAutoResize = "HEIGHT";
  } else {
    t.textAutoResize = "WIDTH_AND_HEIGHT";
  }
  return t;
}

function text(parent, chars, options) {
  const opt = options || {};
  const t = txt(chars, opt);
  parent.appendChild(t);
  if (parent.layoutMode) {
    if (opt.w !== undefined) t.layoutSizingHorizontal = "FIXED";
    else t.layoutSizingHorizontal = "FILL";
    t.textAutoResize = "HEIGHT";
  }
  return t;
}

function eyebrow(parent, label, options) {
  const opt = options || {};
  const size = (opt.size || tscale(opt.w || 1440).micro);
  const wrap = row(parent, { name: "Eyebrow", gap: 8, align: "CENTER" });
  const dot = figma.createRectangle();
  dot.name = "Marker";
  dot.resize(size * 0.5, size * 0.5);
  dot.fills = [paint(opt.dot || COLORS.lime)];
  wrap.appendChild(dot);
  const labelNode = txt(String(label).toUpperCase(), {
    font: fontFor("body", "semibold"),
    size,
    color: opt.color || COLORS.forest,
    opacity: opt.opacity === undefined ? 0.55 : opt.opacity,
    track: 0.18,
    lh: 1.2,
  });
  wrap.appendChild(labelNode);
  wrap.layoutSizingVertical = "HUG";
  wrap.layoutSizingHorizontal = "HUG";
  return wrap;
}

function heading(parent, chars, w, options) {
  const opt = options || {};
  const t = tscale(w);
  return text(parent, chars, {
    font: fontFor("heading", opt.weight || "medium"),
    size: opt.size || t.xl,
    color: opt.color || COLORS.forest,
    opacity: opt.opacity,
    lh: opt.lh || 0.95,
    track: opt.track === undefined ? -0.045 : opt.track,
    align: opt.align,
    name: opt.name,
  });
}

function bodyText(parent, chars, w, options) {
  const opt = options || {};
  const t = tscale(w);
  return text(parent, chars, {
    font: fontFor("body", "regular"),
    size: opt.size || t.body,
    color: opt.color || COLORS.forest,
    opacity: opt.opacity === undefined ? 0.66 : opt.opacity,
    lh: opt.lh || 1.65,
    weight: opt.weight,
    name: opt.name,
  });
}

/* ---- page frames -------------------------------------------------------- */

function newPageFrame(page, name, w) {
  figma.currentPage = page;
  const f = figma.createFrame();
  f.name = name;
  f.resize(w, 100);
  f.layoutMode = "VERTICAL";
  f.itemSpacing = 0;
  f.fills = [paint(COLORS.ivory)];
  f.clipsContent = true;
  f.primaryAxisSizingMode = "AUTO";
  f.counterAxisSizingMode = "FIXED";
  f.setPluginData(MARK, BUILD);
  return f;
}

function mark(node) {
  try {
    node.setPluginData(MARK, BUILD);
  } catch (error) {
    /* some node types are not writable */
  }
  return node;
}

function section(parent, w, options) {
  const opt = options || {};
  const d = dims(w);
  const s = frame(parent, {
    name: opt.name || "Section",
    bg: opt.bg,
    gap: opt.gap === undefined ? 0 : opt.gap,
    pt: opt.py === undefined ? d.sectionPad : opt.py,
    pb: opt.py === undefined ? d.sectionPad : opt.py,
    pl: d.pad,
    pr: d.pad,
    clip: true,
  });
  s.setPluginData("afriyouth.section", opt.name || "Section");
  return s;
}

/* ---- components used on pages ------------------------------------------ */

function pill(parent, label, options) {
  const opt = options || {};
  const p = frame(parent, {
    name: "Badge / " + label,
    dir: "row",
    gap: 6,
    p: opt.p === undefined ? 8 : opt.p,
    pl: opt.px || 12,
    pr: opt.px || 12,
    pt: 6,
    pb: 6,
    radius: 999,
    bg: opt.bg || COLORS.sage,
    border: opt.border,
    hug: true,
  });
  const size = opt.size || 10;
  if (opt.dot) {
    const d = figma.createRectangle();
    d.name = "Dot";
    d.resize(6, 6);
    d.fills = [paint(opt.dot)];
    p.appendChild(d);
    d.layoutSizingHorizontal = "FIXED";
    d.layoutSizingVertical = "FIXED";
  }
  const t = txt(String(label).toUpperCase(), {
    font: fontFor("body", "semibold"),
    size,
    color: opt.color || COLORS.forest,
    opacity: opt.opacity === undefined ? 1 : opt.opacity,
    track: 0.14,
    lh: 1.2,
  });
  p.appendChild(t);
  p.layoutSizingHorizontal = "HUG";
  p.layoutSizingVertical = "HUG";
  return p;
}

function dotMark(parent, size, color) {
  const d = figma.createRectangle();
  d.name = "Dot";
  d.resize(size, size);
  d.cornerRadius = 999;
  d.fills = [paint(color || COLORS.lime)];
  parent.appendChild(d);
  return d;
}

function photo(parent, key, options) {
  const opt = options || {};
  const r = figma.createRectangle();
  r.name = opt.name || "Photo / " + key;
  r.resize(opt.w || 600, opt.h || 400);
  if (IMAGES[key]) {
    r.fills = [{ type: "IMAGE", imageHash: IMAGES[key].hash, scaleMode: "FILL" }];
  } else {
    r.fills = [paint(COLORS.sage)];
  }
  r.cornerRadius = opt.radius === undefined ? 16 : opt.radius;
  parent.appendChild(r);
  if (parent.layoutMode) {
    r.layoutSizingHorizontal = opt.w ? "FIXED" : "FILL";
    r.layoutSizingVertical = "FIXED";
  }
  return r;
}

function caption(parent, textLabel, w) {
  return text(parent, textLabel, {
    size: tscale(w).micro,
    color: COLORS.forest,
    opacity: 0.4,
    lh: 1.4,
    name: "Caption",
  });
}

/* ---- interaction links -------------------------------------------------- */

const LINK_QUEUE = [];

function queueLink(node, targetName, width) {
  LINK_QUEUE.push({ node, targetName, width });
}

function applyReactions(pageNames) {
  let applied = 0;
  LINK_QUEUE.forEach((item) => {
    const target = pageNames[item.targetName + "|" + item.width];
    if (!target || !item.node || item.node.removed) return;
    try {
      item.node.reactions = [
        {
          trigger: { type: "ON_CLICK" },
          actions: [
            {
              type: "NODE",
              destinationId: target.id,
              navigation: "NAVIGATE",
              transition: { type: "DISSOLVE", easing: { type: "EASE_OUT" }, duration: 0.25 },
              preserveScrollPosition: false,
            },
          ],
        },
      ];
      applied += 1;
    } catch (error) {
      /* reaction API differences are non-fatal */
    }
  });
  return applied;
}

/* ---- page registry ------------------------------------------------------ */

function canvasBase(page) {
  let bottom = 0;
  page.children.forEach((node) => {
    if (node.getPluginData(MARK)) return;
    if (typeof node.y === "number" && typeof node.height === "number" && node.height > 0) {
      bottom = Math.max(bottom, node.y + node.height);
    }
  });
  return bottom > 0 ? bottom + 120 : 0;
}

function getOrCreatePage(name, aliases) {  const candidates = [name].concat(aliases || []);
  for (const candidate of candidates) {
    const found = figma.root.children.find(
      (node) => node.type === "PAGE" && node.name.toLowerCase() === candidate.toLowerCase(),
    );
    if (found) return found;
  }
  const created = figma.createPage();
  created.name = name;
  return created;
}

function cleanupGenerated() {
  const pages = figma.root.children.filter((node) => node.type === "PAGE");
  const generatedOn = (page) =>
    page.children.filter((child) => child.getPluginData(MARK));

  // Frames first: a component cannot be removed while an instance survives on
  // another page, so instances are deleted before the library is rebuilt.
  pages.forEach((page) => {
    figma.currentPage = page;
    generatedOn(page)
      .filter((node) => node.type !== "COMPONENT" && node.type !== "COMPONENT_SET")
      .forEach((node) => {
        try {
          node.remove();
        } catch (error) {
          /* locked or already removed */
        }
      });
  });

  pages.forEach((page) => {
    figma.currentPage = page;
    generatedOn(page)
      .filter((node) => node.type === "COMPONENT" || node.type === "COMPONENT_SET")
      .forEach((node) => {
        try {
          node.remove();
        } catch (error) {
          /* an instance still references this component */
        }
      });
  });
}
