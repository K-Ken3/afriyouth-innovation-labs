import type { NavItem, Pathway } from "./types";

/**
 * ORGANIZATIONAL CONTENT
 * ----------------------
 * Mission, vision, positioning, divisions and service descriptions follow the
 * official AfriYouth organisational profile (September 2026). Brand pillars
 * follow the official logo and brand guidelines. Figures, partners and people
 * are published only when they can be sourced and attributed.
 */

export const site = {
  name: "AfriYouth Innovation Labs",
  shortName: "AfriYouth",
  wordmark: { primary: "AFRIYOUTH", secondary: "INNOVATION LABS" },
  tagline: "Fueling Innovators for Sustainable Development",
  description:
    "A research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals.",
  mission:
    "To empower Africa's youth to generate evidence, shape policy, and develop innovative solutions to Africa's most pressing socio-economic challenges through research, human-centered design, and entrepreneurship.",
  vision:
    "To build an Africa where empowered young people use evidence, innovation, and entrepreneurship to solve complex challenges, shape policies and drive inclusive and sustainable socio-economic transformation by 2050.",
  positioning:
    "AfriYouth is a research, innovation and policy consulting firm. We connect research, policy, human-centered design, entrepreneurship and foresight to identify, nurture and advance promising ideas from Africa's young innovators — transforming community-driven ideas into practical, scalable solutions.",
  advantage: [
    "Research",
    "Policy",
    "Human-centered design",
    "Entrepreneurship",
    "Foresight",
  ],
  philosophy: ["Think", "Research", "Design", "Build", "Influence", "Scale"],
  brandPillars: [
    "Innovation",
    "Youth empowerment",
    "Sustainability",
    "Global impact",
    "Human-centered design",
    "Leadership development",
  ],
  accountability:
    "We publish what we can stand behind: figures with their source, date and method; partnerships with permission; and programme calls with eligibility, deadlines and a direct application route.",
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    note: "For enquiries, use the form on this page. Direct email, telephone and office details are published as they are confirmed.",
  },
  socials: [] as { label: string; href: string }[],
  socialNote:
    "AfriYouth's official social channels are published here when they go live.",
  copyrightYear: 2026,
};

export const purpose = {
  heading: "A consulting firm for African ideas that deserve to travel.",
  paragraphs: [
    "AfriYouth Innovation Labs is a research, innovation and policy consulting firm. We identify, nurture and advance promising ideas from Africa's young innovators to address the Sustainable Development Goals — transforming community-driven ideas into practical, scalable solutions.",
    "One connected practice brings research, policy, human-centered design, entrepreneurship, foresight and professional development together around a question. We connect youth organisations, incubators, think tanks and consulting firms rather than working as any one of them alone.",
  ],
  relationship: [
    {
      label: "Research & Evidence",
      text: "Applied research, surveys, evaluations and evidence that decisions can use.",
    },
    {
      label: "Policy & Governance",
      text: "Policy analysis, regulatory review and governance support that hold change in place.",
    },
    {
      label: "Innovation & Entrepreneurship",
      text: "Human-centered design and venture support from idea to investable enterprise.",
    },
    {
      label: "Foresight & Futures",
      text: "Scenarios and horizon scanning that widen the choices available today.",
    },
    {
      label: "Leadership & Capacity",
      text: "Employability, professional skills and learning systems that stay in place.",
    },
  ],
  loop: "A continuous loop — each engagement returns knowledge to the next.",
};

export const principles = [
  {
    number: "01",
    title: "Think",
    text: "Clarify the decision, the people affected and the assumptions before choosing a method.",
  },
  {
    number: "02",
    title: "Research",
    text: "Generate applied evidence with the people closest to the problem.",
  },
  {
    number: "03",
    title: "Design",
    text: "Co-design solutions using human-centered design and test them in context.",
  },
  {
    number: "04",
    title: "Build",
    text: "Prototype, strengthen and prepare ideas for real-world use.",
  },
  {
    number: "05",
    title: "Influence",
    text: "Translate evidence into policy options, dialogue and institutional uptake.",
  },
  {
    number: "06",
    title: "Scale",
    text: "Support finance, implementation and ownership so that change can last.",
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
      { label: "Career & professional development", to: "/what-we-do#professional-development" },
      { label: "Innovation & venture lab", to: "/what-we-do#entrepreneurship" },
    ],
  },
  {
    title: "Work with us",
    items: [
      { label: "Partner With Us", to: "/partner-with-us" },
      { label: "Contact", to: "/contact" },
      { label: "Research & evidence", to: "/what-we-do#research" },
      { label: "Policy & governance", to: "/what-we-do#policy" },
    ],
  },
];

export const pathways: Pathway[] = [
  {
    audience: "For young people",
    number: "01",
    title: "Explore opportunities",
    description:
      "Find accelerator cohorts, research calls, policy challenges, learning experiences and venture support as they open. Each listing publishes its eligibility, deadline and application route.",
    to: "/programs",
    cta: "Visit the opportunity board",
    note: "Calls announced as cohorts open",
  },
  {
    audience: "For organizations",
    number: "02",
    title: "Commission the work",
    description:
      "Commission applied research, policy analysis, human-centered design, foresight, professional learning or impact and learning services from one connected team.",
    to: "/what-we-do",
    cta: "Explore the divisions",
    note: "Five divisions · eight practices",
  },
  {
    audience: "For institutions",
    number: "03",
    title: "Build a partnership",
    description:
      "Explore research consortia, policy collaborations, innovation programmes, funding readiness and long-term learning relationships.",
    to: "/partner-with-us",
    cta: "Start a partnership",
    note: "Five collaboration models",
  },
];

export const tickerItems = [
  "Research with rigour",
  "Policy with evidence",
  "Design with people",
  "Enterprise with ownership",
  "Foresight with intent",
  "Impact measured honestly",
];

export const homeStats = [] as { value: number; label: string; source: string }[];
