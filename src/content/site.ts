import type { NavItem, Pathway } from "./types";

/**
 * ORGANIZATIONAL CONTENT
 * ----------------------
 * All copy below is provisional and derived only from the challenge brief.
 * Replace these values with official AfriYouth material when supplied.
 * Nothing in this file should be treated as a verified public claim.
 */

export const site = {
  name: "AfriYouth Innovation Labs",
  shortName: "AfriYouth",
  wordmark: { primary: "AFRIYOUTH", secondary: "INNOVATION LABS" },
  tagline: "Evidence. Innovation. African futures.",
  description:
    "A research and innovation institution working where evidence, human-centered design, enterprise and policy meet — expanding what young Africans can build and shape.",
  mission:
    "To generate rigorous evidence and build human-centered innovations that expand opportunity for young Africans — and shift the systems around them.",
  vision:
    "African futures shaped by the people who will live them.",
  provisionalNotice:
    "Prototype site. Organizational content is provisional and will be replaced with official AfriYouth materials. No impact figures, partnerships, named programmes, staff or contact details are published until verified.",
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    note: "Official contact channels will be published here once confirmed. This prototype does not invent an email address, phone number or office location.",
  },
  socials: [] as { label: string; href: string }[],
  socialNote:
    "Verified social channels will be listed here. No unverified links are shown.",
  formNotice:
    "Prototype form. Your input is validated in the browser and is not sent or stored anywhere.",
  copyrightYear: 2026,
};

export const purpose = {
  heading: "A lab for the questions that shape African futures.",
  paragraphs: [
    "AfriYouth Innovation Labs exists to close the distance between knowledge and change. We bring research and evidence generation into the same room as human-centered design, entrepreneurship, policy engagement, professional development and strategic foresight.",
    "That proximity matters. Evidence without design rarely travels. Enterprise without policy hits ceilings. Policy without lived experience misses the point. We work across these boundaries so that ideas are tested, decisions are informed, and young people are not consulted at the end but involved from the start.",
  ],
  relationship: [
    {
      label: "Evidence",
      text: "Research that earns its place in decisions.",
    },
    {
      label: "Design",
      text: "Solutions built with the people who use them.",
    },
    {
      label: "Enterprise",
      text: "Ventures with ownership, not just participation.",
    },
    {
      label: "Policy",
      text: "Rules, budgets and institutions that hold change in place.",
    },
  ],
  loop: "A continuous loop — each engagement returns knowledge to the next.",
};

export const principles = [
  {
    number: "01",
    title: "Evidence before assumption",
    text: "We start with the question, not the answer. Rigour is a form of respect for the people and problems involved.",
  },
  {
    number: "02",
    title: "Design with, not for",
    text: "Young people are collaborators in framing the problem, shaping the solution and judging what counts as progress.",
  },
  {
    number: "03",
    title: "Build for ownership",
    text: "We favour capability that stays in place: local teams, transferable skills, durable institutions and enterprises that can hold their own.",
  },
  {
    number: "04",
    title: "Work across systems",
    text: "A single programme rarely changes a system. We connect the evidence, enterprise and policy conditions that make change last.",
  },
  {
    number: "05",
    title: "Measure honestly",
    text: "We publish what we can verify, explain what we cannot, and treat learning as a result in its own right.",
  },
];

export const primaryNav: NavItem[] = [
  { label: "About", to: "/about" },
  { label: "What We Do", to: "/what-we-do" },
  { label: "Programs", to: "/programs" },
  { label: "Insights", to: "/insights" },
  { label: "Impact", to: "/impact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Institution",
    items: [
      { label: "About", to: "/about" },
      { label: "What We Do", to: "/what-we-do" },
      { label: "Impact", to: "/impact" },
      { label: "Insights", to: "/insights" },
    ],
  },
  {
    title: "Opportunities",
    items: [
      { label: "Programs", to: "/programs" },
      { label: "Get Involved", to: "/get-involved" },
      { label: "Professional development", to: "/what-we-do#professional-development" },
      { label: "Enterprise support", to: "/what-we-do#entrepreneurship" },
    ],
  },
  {
    title: "Work with us",
    items: [
      { label: "Partner With Us", to: "/partner-with-us" },
      { label: "Contact", to: "/contact" },
      { label: "Research & evidence", to: "/what-we-do#research" },
      { label: "Policy engagement", to: "/what-we-do#policy" },
    ],
  },
];

export const pathways: Pathway[] = [
  {
    audience: "For young people",
    number: "01",
    title: "Explore opportunities",
    description:
      "Find fellowships, research calls, learning experiences and enterprise support as they open. The board will publish eligibility and deadlines only when confirmed.",
    to: "/programs",
    cta: "Visit the opportunity board",
    note: "No calls are published yet",
  },
  {
    audience: "For organizations",
    number: "02",
    title: "Discover our services",
    description:
      "Commission research, evaluation, co-design, policy analysis, foresight or professional learning from one connected team.",
    to: "/what-we-do",
    cta: "Explore areas of work",
    note: "Six connected practices",
  },
  {
    audience: "For institutions",
    number: "03",
    title: "Build a partnership",
    description:
      "Explore research consortiums, co-design partnerships, policy collaborations and long-term learning relationships.",
    to: "/partner-with-us",
    cta: "Start a partnership",
    note: "Collaboration models",
  },
];

export const tickerItems = [
  "Research with rigour",
  "Design with people",
  "Policy with evidence",
  "Enterprise with ownership",
  "Futures with intent",
  "Impact measured honestly",
];

export const homeStats = [] as { value: number; label: string; source: string }[];
