/* AfriYouth Design System Builder — generated from src/. Do not edit by hand. */
/* ===== 00-core.js ===== */
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

async function newPageFrame(page, name, w) {
  await figma.setCurrentPageAsync(page);
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

async function cleanupGenerated() {
  const pages = figma.root.children.filter((node) => node.type === "PAGE");
  const generatedOn = (page) =>
    page.children.filter((child) => child.getPluginData(MARK));

  // Frames first: a component cannot be removed while an instance survives on
  // another page, so instances are deleted before the library is rebuilt.
  for (const page of pages) {
    await figma.setCurrentPageAsync(page);
    generatedOn(page)
      .filter((node) => node.type !== "COMPONENT" && node.type !== "COMPONENT_SET")
      .forEach((node) => {
        try {
          node.remove();
        } catch (error) {
          /* locked or already removed */
        }
      });
  }

  for (const page of pages) {
    await figma.setCurrentPageAsync(page);
    generatedOn(page)
      .filter((node) => node.type === "COMPONENT" || node.type === "COMPONENT_SET")
      .forEach((node) => {
        try {
          node.remove();
        } catch (error) {
          /* an instance still references this component */
        }
      });
  }
}

/* ===== 10-data.js ===== */
/* ============================================================================
   AfriYouth Innovation Labs — content used to build the Figma frames
   Official organisational profile + implemented site copy
   ========================================================================= */

const PHOTO_BASE = "https://afriyouth-innovation-labs.vercel.app/photos/";
const PHOTO_URLS = {
  electronicsLab: PHOTO_BASE + "brand-electronics-lab.jpg",
  researcherVr: PHOTO_BASE + "brand-researcher-vr.jpg",
  youngInnovatorVr: PHOTO_BASE + "brand-young-innovator-vr.jpg",
  solarFieldTeam: PHOTO_BASE + "brand-solar-field-team.jpg",
  circuitWork: PHOTO_BASE + "brand-circuit-work.jpg",
};
const IMAGES = {};

const SITE = {
  name: "AfriYouth Innovation Labs",
  wordmark: "AFRIYOUTH",
  wordmarkSub: "Innovation Labs",
  tagline: "Fueling Innovators for Sustainable Development",
  description:
    "A research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals.",
  mission:
    "To empower Africa's youth to generate evidence, shape policy, and develop innovative solutions to Africa's most pressing socio-economic challenges through research, human-centered design, and entrepreneurship.",
  vision:
    "To build an Africa where empowered young people use evidence, innovation, and entrepreneurship to solve complex challenges, shape policies and drive inclusive and sustainable socio-economic transformation by 2050.",
  positioning:
    "AfriYouth is a research, innovation and policy consulting firm. We connect research, policy, human-centered design, entrepreneurship and foresight to identify, nurture and advance promising ideas from Africa's young innovators — transforming community-driven ideas into practical, scalable solutions.",
  accountability:
    "We publish what we can stand behind: figures with their source, date and method; partnerships with permission; and programme calls with eligibility, deadlines and a direct application route.",
};

const PILLARS = [
  "Innovation",
  "Youth empowerment",
  "Sustainability",
  "Global impact",
  "Human-centered design",
  "Leadership development",
];

const PURPOSE = {
  heading: "A lab for the questions that shape African futures.",
  paragraphs: [
    "AfriYouth Innovation Labs is a research, innovation and policy consulting firm. We identify, nurture and advance promising ideas from Africa's young innovators to address the Sustainable Development Goals — transforming community-driven ideas into practical, scalable solutions.",
    "One connected practice brings research, policy, human-centered design, entrepreneurship, foresight and professional development together around a question. We connect youth organisations, incubators, think tanks and consulting firms rather than working as any one of them alone.",
  ],
  loop: "A continuous loop — each engagement returns knowledge to the next.",
  note: "Each part strengthens the others. The loop is the point — not a one-way route from research to a report.",
};

const PATHWAYS = [
  {
    audience: "For young people",
    number: "01",
    title: "Explore opportunities",
    text: "Find accelerator cohorts, research calls, policy challenges, learning experiences and venture support as they open. Each listing publishes its eligibility, deadline and application route.",
    key: "programs",
    cta: "Visit the opportunity board",
    note: "Calls announced as cohorts open",
  },
  {
    audience: "For organizations",
    number: "02",
    title: "Commission the work",
    text: "Commission applied research, policy analysis, human-centered design, foresight, professional learning or impact and learning services from one connected team.",
    key: "what",
    cta: "Explore the divisions",
    note: "Five divisions · eight practices",
  },
  {
    audience: "For institutions",
    number: "03",
    title: "Build a partnership",
    text: "Explore research consortia, policy collaborations, innovation programmes, funding readiness and long-term learning relationships.",
    key: "partner",
    cta: "Start a partnership",
    note: "Five collaboration models",
  },
];

const LISTING_FIELDS = [
  { label: "Eligibility", text: "Who the opportunity is for, including any location or experience requirements." },
  { label: "Deadline", text: "The official closing date and time zone." },
  { label: "Format", text: "Whether the opportunity is in person, remote or hybrid, and the expected commitment." },
  { label: "Application route", text: "A direct link to the verified application page or instructions." },
];

const ABOUT = {
  whyHeading: "The distance between insight and change is a design choice.",
  why: [
    "Africa's young innovators are generating ideas in response to problems they understand intimately. What is often missing is the architecture that turns those ideas into evidence, policy, finance and durable institutions.",
    "AfriYouth identifies, nurtures and advances promising ideas along that route. We connect youth organisations, incubators, think tanks and consulting firms rather than operating as only one of them — because community-driven solutions need research, design, enterprise and policy in the same room.",
    "Our five divisions — Research & Evidence, Policy & Governance, Innovation & Entrepreneurship, Foresight & Futures, and Leadership & Capacity Building — are brought together around a question, with resource mobilisation and impact measurement as cross-cutting services.",
  ],
  commitments: [
    { title: "Intellectual rigour", text: "We hold our methods to a high standard and state the limits of what we can claim." },
    { title: "Participatory practice", text: "The people closest to a problem help define it, shape the response and judge the result." },
    { title: "Institutional honesty", text: "We publish achievements, partnerships, staff and metrics only when they are verified and attributable." },
    { title: "Long-term capability", text: "We aim to leave local teams, enterprises and institutions stronger than we found them." },
  ],
  team: {
    heading: "One connected practice",
    body: "Research, policy, human-centered design, entrepreneurship, foresight and professional development sit within one practice. Work is assembled around the decision at hand, drawing on the disciplines it requires.",
    note: "Five divisions · one team",
  },
  partnership: {
    heading: "Institutional relationships",
    body: "AfriYouth works with research institutes, public institutions, funders, civil society, youth networks and enterprises. Each collaboration is scoped around a shared decision, with roles, ethics and success measures agreed before delivery.",
    note: "Partnerships by agreement.",
  },
  verification: [
    "Figures are published with their source, date and method.",
    "Partnerships are named with permission.",
    "Staff and governance details are published on appointment.",
    "Contact routes are published as they are confirmed.",
  ],
};

const FORM_COPY = {
  successTitle: "Your email draft is ready.",
  successBody: "Your mail client should have opened with the message addressed to AfriYouth. Review it and send when you are ready.",
};

const GET_INVOLVED_ROUTES = [
  {
    number: "01",
    title: "Explore the opportunity board",
    text: "Accelerator cohorts, research calls, policy innovation challenges and learning opportunities are listed with eligibility, deadline and format.",
    key: "programs",
    cta: "Visit the board",
  },
  {
    number: "02",
    title: "Register future interest",
    text: "Signal the divisions, programmes or services you want to hear about. This helps us send relevant opportunities; it is not an application.",
    key: "involved",
    cta: "Go to the form",
  },
  {
    number: "03",
    title: "Bring a question as a partner",
    text: "If you represent an institution, enterprise or network, a scoping conversation can start with the decision you need to inform.",
    key: "partner",
    cta: "Partner with us",
  },
];

const INTEREST_OPTIONS = [
  "Innovation & Venture Lab",
  "Research & Evidence Lab",
  "Policy & Governance Lab",
  "Policy Innovation Challenge",
  "Strategic Foresight & Futures Lab",
  "Career & Professional Development Academy",
  "Impact & Learning Services",
  "Funding & investment readiness",
  "Something else",
];

const CONTACT_CHANNELS = [
  { label: "Email", status: "Via form", text: "The contact form opens a pre-addressed email draft in your mail client." },
  { label: "Telephone", status: "On request", text: "Call details are shared with confirmed engagements and published here when finalised." },
  { label: "Office", status: "On request", text: "The team works across Africa. Office details are shared with confirmed engagements." },
];

const DIVISIONS = [
  { label: "Research & Evidence", text: "Applied research, surveys, evaluations and evidence that decisions can use." },
  { label: "Policy & Governance", text: "Policy analysis, regulatory review and governance support that hold change in place." },
  { label: "Innovation & Entrepreneurship", text: "Human-centered design and venture support from idea to investable enterprise." },
  { label: "Foresight & Futures", text: "Scenarios and horizon scanning that widen the choices available today." },
  { label: "Leadership & Capacity", text: "Employability, professional skills and learning systems that stay in place." },
];

const PHILOSOPHY = [
  { number: "01", title: "Think", text: "Clarify the decision, the people affected and the assumptions before choosing a method." },
  { number: "02", title: "Research", text: "Generate applied evidence with the people closest to the problem." },
  { number: "03", title: "Design", text: "Co-design solutions using human-centered design and test them in context." },
  { number: "04", title: "Build", text: "Prototype, strengthen and prepare ideas for real-world use." },
  { number: "05", title: "Influence", text: "Translate evidence into policy options, dialogue and institutional uptake." },
  { number: "06", title: "Scale", text: "Support finance, implementation and ownership so that change can last." },
];

const COMMITMENTS = [
  { title: "Intellectual rigour", text: "We hold our methods to a high standard and state the limits of what we can claim." },
  { title: "Participatory practice", text: "The people closest to a problem help define it, shape the response and judge the result." },
  { title: "Institutional honesty", text: "We publish achievements, partnerships, staff and metrics only when they are verified and attributable." },
  { title: "Long-term capability", text: "We aim to leave local teams, enterprises and institutions stronger than we found them." },
];

const AREAS = [
  {
    id: "research",
    number: "01",
    title: "Research & Evidence Lab",
    tagline: "Applied evidence for real decisions.",
    summary:
      "Applied policy and socio-economic research on youth, institutions and markets — delivered as evidence reports, evaluations and policy briefs built for use.",
    body: [
      "The lab designs and delivers applied policy research, socio-economic research, youth surveys, baseline and endline studies, impact assessments and programme evaluations.",
      "We also carry out institutional, stakeholder and political-economy analysis, and evidence synthesis. Findings are published as AfriYouth Evidence Reports — research reports and policy briefs written for the decision at hand.",
    ],
    capabilities: [
      "Applied policy and socio-economic research",
      "Youth surveys and baseline/endline studies",
      "Impact assessments and programme evaluations",
      "Institutional, stakeholder and political-economy analysis",
      "Evidence synthesis and policy briefs",
      "AfriYouth Evidence Reports",
    ],
    question: "What evidence would change the decision, and who needs to see it?",
    formats: ["AfriYouth Evidence Reports", "Research reports", "Policy briefs"],
  },
  {
    id: "policy",
    number: "02",
    title: "Policy & Governance Lab",
    tagline: "Evidence translated into public choices.",
    summary:
      "Policy analysis, design and governance support that turn evidence into options institutions can act on — and stay through implementation.",
    body: [
      "We analyse and design policy, review regulation and diagnose governance arrangements. Stakeholder mapping and political-economy analysis clarify who must own the result for it to hold.",
      "The lab facilitates policy dialogue, supports public-sector innovation and stays through implementation. Its signature publication is the AfriYouth Policy Solutions Series, alongside policy briefs and governance diagnostics.",
    ],
    capabilities: [
      "Policy analysis, design and review",
      "Regulatory and governance diagnostics",
      "Stakeholder mapping and policy dialogue",
      "Public-sector innovation support",
      "Implementation support and feedback loops",
      "AfriYouth Policy Solutions Series",
    ],
    question: "Which policy lever would actually shift conditions — and who must own it?",
    formats: ["AfriYouth Policy Solutions Series", "Policy briefs", "Governance diagnostics"],
  },
  {
    id: "innovation",
    number: "03",
    title: "Policy Innovation Challenge",
    tagline: "The problem is the brief.",
    summary:
      "A challenge process that asks young innovators: what is one of Africa's most pressing problems, and what evidence-based solution can you design?",
    body: [
      "Participants move through Research → Diagnosis → Policy Proposal → Prototype → Policy Pitch. The process combines evidence, human-centered design and policy thinking rather than treating them as separate competitions.",
      "Challenge themes include youth employment, education, digital transformation, AI, agriculture, climate, health, entrepreneurship, urban development and regional integration. Each round culminates in a Policy Innovation Demo Day.",
    ],
    capabilities: [
      "Challenge design and themed tracks",
      "Research-to-policy mentoring",
      "Prototype and policy proposal support",
      "Policy pitch coaching",
      "Policy Innovation Demo Day",
    ],
    question: "What is one of Africa's most pressing problems — and what evidence-based solution can you design?",
    formats: ["Policy Innovation Challenge", "Policy Innovation Demo Day", "Themed tracks"],
  },
  {
    id: "entrepreneurship",
    number: "04",
    title: "Innovation & Venture Lab",
    tagline: "From promising idea to investable venture.",
    summary:
      "Idea discovery, human-centered design and venture building — through incubation, acceleration and demo day, with funding readiness built in.",
    body: [
      "The lab supports idea discovery, design thinking, business-model development, prototype development, market validation, incubation and acceleration. Ventures are prepared for pitch, investment readiness and impact measurement.",
      "Its product is the AfriYouth Innovation Accelerator, which follows an Incubation → Acceleration → Demo Day model. Support extends to grant strategy, proposal development, donor mapping, financial modelling and due-diligence preparation.",
    ],
    capabilities: [
      "Idea discovery and human-centered design",
      "Business models, prototyping and market validation",
      "Incubation, acceleration and demo day",
      "Pitch preparation and investor readiness",
      "Grant strategy, donor mapping and financial modelling",
      "Partnership development and due diligence",
    ],
    question: "Which ideas can become practical, scalable ventures — and what do they need to get there?",
    formats: ["AfriYouth Innovation Accelerator", "Incubation → Acceleration → Demo Day", "Venture support"],
  },
  {
    id: "professional-development",
    number: "05",
    title: "Career & Professional Development Academy",
    tagline: "From education to employment — and beyond.",
    summary:
      "Employability and professional development for students and graduates, built around practice, feedback and a portfolio employers can see.",
    body: [
      "The academy supports the pathway from Education → Employability → Employment → Career progression. Its products are the Employability Bootcamp for graduates and the University Employability Programme for students.",
      "Services include CV customisation, cover letters, LinkedIn optimisation, portfolio development, job search, application support, applicant tracking systems, networking, interview readiness and professional etiquette. Learning follows Learn → Practice → Apply → Receive feedback → Improve → Demonstrate, including a ten-step employability simulation.",
    ],
    capabilities: [
      "Employability Bootcamp",
      "University Employability Programme",
      "CVs, portfolios, LinkedIn and applications",
      "Interview readiness and professional etiquette",
      "Leadership, critical thinking and digital/AI skills",
      "Professional competency assessment and portfolio",
    ],
    question: "Can this person demonstrate the capability, not just describe it?",
    formats: ["Employability Bootcamp", "University Employability Programme", "Professional portfolio"],
  },
  {
    id: "foresight",
    number: "06",
    title: "Strategic Foresight & Futures Lab",
    tagline: "Decide today against futures that differ.",
    summary:
      "Scenario planning, horizon scanning and futures studies that help institutions prepare for uncertainty and choose with intent.",
    body: [
      "We use scenario planning, horizon scanning, PESTLE and STEEPV analysis, future-of-work studies and emerging-technology analysis to structure uncertainty rather than predict it.",
      "The lab develops 2030, 2040 and 2050 scenarios. Its publication is the Africa 2050 Futures Series, including studies such as Africa's Youth Workforce in 2050: Four Possible Futures.",
    ],
    capabilities: [
      "Scenario planning and horizon scanning",
      "PESTLE and STEEPV analysis",
      "Future-of-work and technology studies",
      "2030, 2040 and 2050 scenarios",
      "Africa 2050 Futures Series",
    ],
    question: "Which choices remain robust across plausible futures?",
    formats: ["Africa 2050 Futures Series", "Scenario sets", "Foresight studies"],
  },
  {
    id: "impact-measurement",
    number: "07",
    title: "Impact & Learning Services",
    tagline: "Measurement that improves the next decision.",
    summary:
      "Theory of change, monitoring and evaluation, and learning systems that track outcomes honestly and return learning to the work.",
    body: [
      "We build theories of change, logical frameworks, M&E systems and KPIs, and carry out baseline studies, outcome measurement, impact measurement and evaluation.",
      "Findings are produced as learning reports and impact storytelling, with verified data surfaced through the AfriYouth Impact Dashboard. No figure is published without a source, date and stated limitations.",
    ],
    capabilities: [
      "Theory of change and logical frameworks",
      "M&E systems, KPIs and indicators",
      "Baseline and outcome measurement",
      "Impact measurement and evaluation",
      "Learning reports and impact storytelling",
      "AfriYouth Impact Dashboard",
    ],
    question: "What would we need to learn if we want this to last?",
    formats: ["AfriYouth Impact Dashboard", "M&E systems", "Learning reports"],
  },
  {
    id: "funding",
    number: "08",
    title: "Funding & Investment Readiness",
    tagline: "From a credible case to capital.",
    summary:
      "Resource mobilisation and investment readiness — grant intelligence, proposal development, donor mapping, financial modelling and due diligence — connecting strong ideas to the finance they need.",
    body: [
      "This is AfriYouth's fundraising and investment-readiness service. We build grant strategies, develop proposals, map donors and investors, prepare pitch decks and business cases, model finances and prepare teams for due diligence.",
      "It also covers partnership development. Resource Mobilization & Partnerships is a cross-cutting commercial service that connects the five divisions to funders, investors and delivery partners. The flagship route through this work is the Evidence-to-Impact Accelerator.",
    ],
    capabilities: [
      "Grant opportunity intelligence and grant strategy",
      "Proposal development and donor mapping",
      "Investor readiness and pitch deck development",
      "Business case development and financial modelling",
      "Partnership development",
      "Due-diligence preparation",
    ],
    question: "What would make this idea fundable — and what must be true before we ask?",
    formats: ["Evidence-to-Impact Accelerator", "Funding strategy", "Investment readiness"],
  },
];

const PROCESS = [
  { number: "01", title: "Discover", text: "Identify promising ideas, people and problems worth pursuing." },
  { number: "02", title: "Diagnose", text: "Understand the system, the evidence gap and who is affected." },
  { number: "03", title: "Research", text: "Generate applied evidence with the people closest to the problem." },
  { number: "04", title: "Design", text: "Co-design solutions using human-centered design." },
  { number: "05", title: "Prototype", text: "Build, test and iterate a working solution." },
  { number: "06", title: "Policy", text: "Translate findings into policy options and institutional pathways." },
  { number: "07", title: "Finance", text: "Prepare for funding, investment and resource mobilisation." },
  { number: "08", title: "Implement", text: "Support delivery with partners and clear governance." },
  { number: "09", title: "Measure", text: "Track outcomes, contribution and learning honestly." },
  { number: "10", title: "Scale", text: "Support uptake, replication and durable ownership." },
];

const INSIGHTS = [
  {
    slug: "evidence-is-not-the-opposite-of-imagination",
    title: "Evidence is not the opposite of imagination",
    category: "Research & evidence",
    kind: "Essay",
    reading: "4 min read",
    excerpt:
      "Rigour and creativity are often treated as rivals. The most useful research begins with the willingness to be surprised.",
    quote: "Imagination is what tells us which questions are worth being rigorous about.",
    body: [
      "There is a version of research that treats certainty as the product. The question is fixed in advance, the method is chosen to defend it, and the report arrives with every uncertainty sanded down. It looks rigorous. It rarely changes anything.",
      "Evidence works differently when it is built for a decision. The question is opened up before it is narrowed. Communities are involved in defining what counts as a meaningful answer. Findings are presented with their limits intact, because the people using them need to know where the ground is soft.",
      "This is not a rejection of method. It is a demand for better method: sampling that reflects who is missing, analysis that can hold contradiction, and synthesis that resists the temptation to over-claim. Rigour is how we earn the right to ask people to act.",
      "Imagination belongs in that process. It is what lets a team see a pattern before the data confirms it, design a study that can detect what nobody thought to ask, and translate a finding into an option an institution can use. The two are not rivals. They are a working pair.",
    ],
  },
  {
    slug: "designing-with-young-people-not-for-them",
    title: "Designing with young people, not for them",
    category: "Design & innovation",
    kind: "Essay",
    reading: "3 min read",
    excerpt:
      "Consultation is not the same as collaboration. The difference shows up in who defines the problem — and who owns the result.",
    quote: "A focus group at the end is not participation. It is a review.",
    body: [
      "Participation is often measured by presence: how many young people attended, how many voices were in the room, how many sticky notes covered the wall. Those things matter, but they do not tell us who held power over the question.",
      "Human-centered design begins earlier. Young people help frame the problem, not merely react to a solution. They sit with the contradictions that outsiders smooth over. They can say that the barrier is not information but transport, not motivation but trust, not technology but the cost of data.",
      "That kind of involvement changes the work. A prototype tested with the people who will use it surfaces failure faster and more cheaply. A service designed around real routines is more likely to survive contact with real life.",
    ],
  },
  {
    slug: "the-policy-pipeline-is-a-design-problem",
    title: "The policy pipeline is a design problem",
    category: "Policy & governance",
    kind: "Essay",
    reading: "4 min read",
    excerpt:
      "Good evidence does not walk itself into a ministry. The route from finding to implementation has to be designed, with the incentives of the people inside it.",
    quote: "A policy brief is not an outcome. It is an artefact in a longer process.",
    body: [
      "Researchers often describe policy influence as a pipeline: evidence goes in one end, decisions come out the other. When the decision does not change, the pipeline is blamed for being leaky, or the evidence for being ignored.",
      "In practice, policy is a design problem. Decisions are made by people with mandates, constraints, constituencies and calendars. Evidence enters through relationships and timing as much as through argument.",
      "Designing for uptake means mapping the decision before producing the output. Who has authority? What are they accountable for? What would make the current approach costly to defend?",
    ],
  },
  {
    slug: "what-enterprise-teaches-institutions-about-feedback",
    title: "What enterprise teaches institutions about feedback",
    category: "Enterprise & venture",
    kind: "Essay",
    reading: "3 min read",
    excerpt:
      "Founders learn from customers because the cost of not listening is immediate. Institutions can borrow that discipline without borrowing the ideology.",
    quote: "A venture that ignores its users runs out of money. An institution that ignores its users runs out of legitimacy.",
    body: [
      "Enterprise is often presented as a counterpoint to public systems: faster, closer to the customer, less tolerant of waste. The comparison can be lazy, but there is a useful lesson underneath it.",
      "Founders receive feedback whether they ask for it or not. Customers stop buying, staff leave, a partner withdraws. The signal is close to the consequence. Institutions often receive feedback later, through evaluations or complaints.",
      "The lesson is not to run public services like startups. It is to shorten the distance between a decision and its evidence.",
    ],
  },
  {
    slug: "foresight-belongs-in-the-room",
    title: "Foresight belongs in the room, not the appendix",
    category: "Futures",
    kind: "Essay",
    reading: "3 min read",
    excerpt:
      "Scenarios are not predictions. Their value is in widening the set of futures a team is prepared to take seriously before a decision is locked in.",
    quote: "The purpose of foresight is not to be right. It is to be less surprised.",
    body: [
      "Strategic foresight is frequently commissioned as a report: a horizon scan, a set of scenarios, a workshop, a document with a long shelf life and a short readership. The thinking is good. The timing is wrong.",
      "Foresight is most useful before a strategy hardens. It gives a team permission to consider futures that do not fit the current plan, and a vocabulary for the uncertainties that cannot be resolved by more data.",
      "The output should be a changed conversation, not just a changed document.",
    ],
  },
  {
    slug: "measuring-what-matters-honestly",
    title: "Measuring what matters, honestly",
    category: "Impact & learning",
    kind: "Essay",
    reading: "4 min read",
    excerpt:
      "Impact measurement is not a marketing function. Its first obligation is to improve decisions — including the decision to admit what did not work.",
    quote: "A number without a source is not evidence. It is decoration.",
    body: [
      "The pressure to demonstrate impact can produce a strange kind of accounting. Activities become outcomes. Contributions become attribution. Anecdotes become percentages.",
      "Honest measurement begins with a theory of change specific enough to be wrong. What are we doing, for whom, through what mechanism, and what would we expect to see if it worked?",
      "It then chooses indicators for usefulness, not availability. A small number of well-defined measures, collected ethically and reported with their limitations, is worth more than a dashboard of convenient numbers.",
    ],
  },
];

const IMPACT = {
  intro:
    "Impact & Learning Services is one of AfriYouth's cross-cutting services, spanning theory of change, M&E systems, baseline and outcome measurement, evaluation and learning reports. This page sets out how the firm measures and reports its work — and how verified results are released.",
  statement: "A number without a source is not evidence. It is decoration.",
  dimensions: [
    { number: "01", title: "Reach", text: "Who is in the room, who is reached, and who is still missing. Participation is counted with care, not used as a substitute for change.", question: "Who was reached — and who was not?" },
    { number: "02", title: "Depth", text: "What shifts for people: knowledge, confidence, practice, income, agency or opportunity. Changes are described before they are reduced to a percentage.", question: "What changed for people, not just for the programme?" },
    { number: "03", title: "Durability", text: "Whether change holds after a cohort, project or funding cycle ends — and what local capability remains when external support withdraws.", question: "What remains when the project leaves?" },
    { number: "04", title: "Systems", text: "Whether rules, budgets, services or institutional behaviour change. System shifts are traced through decisions and implementation, not announcements.", question: "What now works differently because of this?" },
  ],
  stages: [
    { number: "01", title: "Frame", text: "Define the question and agree whose experience defines success." },
    { number: "02", title: "Baseline", text: "Establish where things stand, using methods appropriate to context." },
    { number: "03", title: "Trace", text: "Follow change across people, enterprises and institutions over time." },
    { number: "04", title: "Test", text: "Examine contribution, alternative explanations and unintended effects." },
    { number: "05", title: "Publish", text: "Report verified findings, limitations and learning in public." },
  ],
  ledger: [
    { label: "Baseline and endline studies", text: "Starting and closing conditions for each engagement, with methods and sample notes." },
    { label: "Impact assessments", text: "What changed, for whom, and what else may explain it." },
    { label: "Programme evaluations", text: "Independent and internal assessments, including negative findings." },
    { label: "Learning reports", text: "Practical lessons for programme teams, partners, funders and the Impact Dashboard." },
  ],
  commitments: [
    "Publish only figures that are verified, sourced and dated.",
    "Distinguish clearly between outputs, outcomes and contribution.",
    "Report limitations, absences and unintended effects alongside results.",
    "Involve the people being counted in interpreting what the findings mean.",
    "Correct, update or retract when better evidence becomes available.",
  ],
  faqs: [
    { q: "How are impact results published?", a: "Impact figures are published as verified engagements conclude, with their source, date, method and stated limitations. Publishing estimates as achievements would misrepresent the work; the measurement framework is shown so the reporting standard is clear." },
    { q: "What is the AfriYouth Impact Dashboard?", a: "It is the product through which verified indicators, outcome measures and learning reports are surfaced. It carries only data that has passed the verification standard set for the engagement." },
    { q: "Will you publish negative findings?", a: "The measurement commitments state that limitations and unintended effects are reported alongside results. A public impact ledger is only credible if it can contain findings that are inconvenient." },
    { q: "Who verifies the data?", a: "Verification arrangements are agreed with each partner before delivery and documented in the engagement protocol. The public ledger reports only data that meets that standard." },
  ],
};

const PARTNERS = {
  models: [
    { number: "01", title: "Research & evidence", text: "Commission applied policy or socio-economic research, baseline and endline studies, impact assessments, programme evaluations or evidence synthesis, published as AfriYouth Evidence Reports.", tags: ["Applied research", "Evaluations", "Evidence synthesis"] },
    { number: "02", title: "Policy & governance", text: "Work with us on policy analysis and design, regulatory review, governance diagnostics, stakeholder mapping, policy dialogue and implementation support.", tags: ["Policy analysis", "Governance", "Policy dialogue"] },
    { number: "03", title: "Innovation & venture support", text: "Support young innovators through human-centered design, prototyping, market validation, incubation, acceleration and investor readiness — including the AfriYouth Innovation Accelerator.", tags: ["Human-centered design", "Incubation", "Investor readiness"] },
    { number: "04", title: "Foresight & futures", text: "Commission scenario planning, horizon scanning, future-of-work studies or 2030–2050 scenarios for strategy, policy or programme design.", tags: ["Scenarios", "Horizon scanning", "Africa 2050"] },
    { number: "05", title: "Leadership, learning & funding readiness", text: "Build employability programmes, professional competency frameworks and learning systems — or prepare a funding strategy, proposal, business case or due-diligence pack.", tags: ["Employability", "Professional learning", "Funding readiness"] },
  ],
  audiences: [
    "Universities, think tanks and research institutes",
    "Public agencies and policymakers",
    "Funders and philanthropic organizations",
    "Civil society, youth networks and youth-led ventures",
    "Enterprises, incubators and innovation hubs",
  ],
  process: [
    { number: "01", title: "Conversation", text: "A structured discussion about the question, context and decision you need to inform." },
    { number: "02", title: "Scope", text: "A written outline of approach, team, timeline and what success would look like — with assumptions stated." },
    { number: "03", title: "Team & protocol", text: "Agreement on governance, ethics, data protection and the roles each partner will hold." },
    { number: "04", title: "Delivery", text: "Collaborative work with regular check-ins, visible decisions and no surprise outputs." },
    { number: "05", title: "Uptake & learning", text: "A deliberate plan for how findings travel, who acts on them, and what is learned together." },
  ],
  questions: [
    "What decision are we trying to inform?",
    "Who needs to own the result for it to last?",
    "Whose experience is missing from the current framing?",
    "What would success look like from the outside?",
    "What are we choosing not to measure, and why?",
  ],
  faqs: [
    { q: "What happens in a first conversation?", a: "A structured discussion about the decision you need to inform, the people affected and the constraints you are working within. It is a scoping conversation, not a pitch, and no engagement is assumed." },
    { q: "Do we need a fully formed brief?", a: "No. Most useful work begins before the brief exists. We can help frame the question, identify what evidence is needed and agree what would count as progress before committing to a method." },
    { q: "Can you work with funders and public agencies?", a: "The practice is designed for research institutes, public agencies, funders, civil society, youth networks, youth-led ventures and enterprises. Partnerships are named with permission." },
    { q: "Are any current partnerships listed?", a: "Partnerships are published with permission. Where a relationship is confidential, it is not named." },
    { q: "How are ethics and data protection handled?", a: "Governance, ethics and data protection arrangements are agreed before delivery and documented in the engagement protocol." },
  ],
};

const PROGRAM_CATEGORIES = [
  "All opportunities",
  "Accelerators & cohorts",
  "Research calls",
  "Innovation challenges",
  "Academies & training",
  "Venture & funding support",
];

const FOOTER_GROUPS = [
  { title: "Institution", links: ["About", "What We Do", "Impact", "Insights"] },
  { title: "Opportunities", links: ["Programs", "Get Involved", "Career & professional development", "Innovation & venture lab"] },
  { title: "Work with us", links: ["Partner With Us", "Contact", "Research & evidence", "Policy & governance"] },
];

const NAV_LINKS = ["About", "What We Do", "Programs", "Insights", "Impact"];

const TICKER = [
  "Research with rigour",
  "Policy with evidence",
  "Design with people",
  "Enterprise with ownership",
  "Foresight with intent",
  "Impact measured honestly",
];

const GET_INVOLVED_FAQS = [
  { q: "Are applications open right now?", a: "Calls open at different points in the year. When a call opens it appears on the Programs page with eligibility, deadline, format and a direct application route." },
  { q: "What can I register interest in?", a: "You can register interest in the Innovation & Venture Lab, Research & Evidence Lab, Policy & Governance Lab, Policy Innovation Challenge, Strategic Foresight & Futures Lab, Career & Professional Development Academy, Impact & Learning Services or funding and investment readiness." },
  { q: "Do you accept unsolicited research proposals?", a: "Yes. Share the question, the context and the decision you want to inform through the contact or partnership route." },
  { q: "Will I receive a response?", a: "We review every enquiry and respond to the contact address you provide." },
];

const CONTACT_FAQS = [
  { q: "How do I contact AfriYouth?", a: "Use the contact form on this page. Direct email, telephone and office details are published as they are confirmed." },
  { q: "What happens when I submit the form?", a: "The form opens a pre-addressed email draft in your mail client. You can review the message and send it yourself; nothing leaves your device until you do." },
  { q: "Where is the organization based?", a: "AfriYouth works across Africa. Office and telephone details are published here once they are confirmed." },
  { q: "How do I report an accessibility issue?", a: "Use the contact form and select Accessibility feedback. We use those reports to correct the issue and improve the site." },
];

const PAGE_META = {
  home: { title: "Home", eyebrow: "Research · Policy · Design · Enterprise · Foresight · Leadership" },
  about: { chapter: "01", eyebrow: "About the firm", title: "A research, innovation and policy consulting firm.", intro: SITE.positioning, meta: [["Focus", "Research, innovation & policy"], ["Structure", "Five divisions"], ["Cross-cutting", "Impact & funding"]] },
  what: { chapter: "02", eyebrow: "What we do", title: "Five divisions. One connected practice.", intro: "AfriYouth is a research, innovation and policy consulting firm. Research & Evidence, Policy & Governance, Innovation & Entrepreneurship, Foresight & Futures and Leadership & Capacity Building are organised as five divisions, with impact and funding readiness as cross-cutting services.", meta: [["Divisions", "05"], ["Practices", "08"], ["Model", "Evidence-to-Impact"]] },
  programs: { chapter: "03", eyebrow: "Programs & opportunities", title: "The opportunity board.", intro: "Calls for the AfriYouth Innovation Accelerator, Policy Innovation Challenge, research programme, academies and venture support are published here with eligibility, deadline, format and a direct application route.", meta: [["Open calls", "00"], ["Calls open", "Throughout the year"], ["Listing basis", "Verified"]] },
  insights: { chapter: "04", eyebrow: "Insights", title: "Thinking in public.", intro: "Essays and field notes on evidence, policy, design, enterprise, foresight and the discipline of measuring what matters. Official series — AfriYouth Evidence Reports, the Policy Solutions Series, the Africa 2050 Futures Series and learning reports — are published here as they are released.", meta: [["Editorial", "06 essays"], ["Series", "Four"], ["Edition", "AfriYouth perspective"]] },
  impact: { chapter: "05", eyebrow: "Impact & accountability", title: "What changes, and how we would know.", intro: IMPACT.intro, meta: [["Dimensions", "04"], ["Baselines", "Per engagement"], ["Ledger", "Public"]] },
  involved: { chapter: "06", eyebrow: "Get involved", title: "Start where your curiosity is strongest.", intro: "AfriYouth works with young innovators, researchers, designers, policy thinkers and venture builders — and with the institutions that want to make their work possible. Calls open through the year; you can register your interest at any time.", meta: [["Open calls", "00"], ["Routes", "03"], ["Register interest", "Any time"]] },
  partner: { chapter: "07", eyebrow: "Partner with us", title: "A partner for the whole question.", intro: "Commission applied research, policy and governance work, innovation and venture support, foresight, professional learning, funding readiness or impact and learning services from one connected team — or start with the part that is most useful now.", meta: [["Models", "05"], ["Audiences", "05"], ["Process", "05 steps"]] },
  contact: { chapter: "08", eyebrow: "Contact", title: "Start a conversation.", intro: "Tell us what you are working on. Every enquiry reaches the team through a pre-addressed email draft, and partnership questions can start with the decision you need to inform.", meta: [["Email", "Enquiry form"], ["Telephone", "On request"], ["Office", "On request"]] },
  notfound: { eyebrow: "Error 404", title: "This page is off the map.", intro: "The route may have changed, or the page may have moved. The links below lead back to the work." },
};

const ARTICLE = INSIGHTS[0];

/* ===== 20-foundations.js ===== */
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

/* ===== 30-components.js ===== */
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

async function buildComponents(page) {
  await figma.setCurrentPageAsync(page);
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

/* ===== 40-shared.js ===== */
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

/* ===== 50-pages.js ===== */
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

/* ===== 60-interactions.js ===== */
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

/* ===== 70-handoff.js ===== */
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

async function buildHandover() {
  const page = getOrCreatePage("14 · Handover", ["Handover", "99 · Handover"]);
  await figma.setCurrentPageAsync(page);
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

/* ===== 90-main.js ===== */
/* ============================================================================
   90-main.js : run order
   ========================================================================= */

async function main() {
  await figma.loadAllPagesAsync();
  await initFonts();
  await initImages();

  await cleanupGenerated();
  buildStyles();
  buildVariables();

  const foundationsPage = getOrCreatePage("01 · Foundations", ["Foundations", "00 · Foundations"]);
  await buildFoundations(foundationsPage);

  const componentsPage = getOrCreatePage("02 · Components", ["Components", "Component Library"]);
  await buildComponents(componentsPage);

  await buildAllPages();
  await buildInteractionFlows();
  await buildHandover();

  const linked = applyReactions(FRAMES);
  const frames = Object.keys(FRAMES).length;
  figma.notify("AfriYouth: " + frames + " frames built · " + linked + " interaction links wired", { timeout: 9000 });
  figma.closePlugin();
}

main().catch((error) => {
  const message = error && error.message ? error.message : String(error);
  console.error(error);
  figma.notify("AfriYouth build stopped: " + message, { error: true, timeout: 20000 });
  figma.closePlugin();
});
