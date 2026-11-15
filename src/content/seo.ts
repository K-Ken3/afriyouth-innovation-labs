export type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export const pageMeta = {
  home: {
    title: "Research, innovation & policy consulting",
    description:
      "AfriYouth Innovation Labs identifies, nurtures and advances promising ideas from Africa's young innovators — connecting research, policy, human-centered design, entrepreneurship and foresight.",
    path: "/",
  },
  about: {
    title: "About the Firm",
    description:
      "The purpose, mission, vision and five strategic divisions of AfriYouth Innovation Labs — a research, innovation and policy consulting firm for African futures.",
    path: "/about",
  },
  whatWeDo: {
    title: "What We Do",
    description:
      "Research & Evidence, Policy & Governance, Innovation & Entrepreneurship, Foresight & Futures and Leadership & Capacity Building — with impact and funding readiness services.",
    path: "/what-we-do",
  },
  programs: {
    title: "Programs & Opportunities",
    description:
      "AfriYouth Innovation Accelerator cohorts, Policy Innovation Challenges, research calls, employability academies and venture support. Each call lists eligibility, deadline and how to apply.",
    path: "/programs",
  },
  insights: {
    title: "Insights",
    description:
      "AfriYouth perspectives on evidence, policy, design, enterprise, foresight and honest impact measurement, alongside the firm's research and policy series.",
    path: "/insights",
  },
  impact: {
    title: "Impact & Learning",
    description:
      "How AfriYouth measures reach, depth, durability and systems change through theory of change, M&E and learning reports — with every figure sourced, dated and method-noted.",
    path: "/impact",
  },
  getInvolved: {
    title: "Get Involved",
    description:
      "Register interest in AfriYouth accelerators, policy challenges, research calls, professional development and venture support.",
    path: "/get-involved",
  },
  partner: {
    title: "Partner With Us",
    description:
      "Collaborate with AfriYouth on applied research, policy and governance, innovation and venture support, foresight, professional learning and funding readiness.",
    path: "/partner-with-us",
  },
  contact: {
    title: "Contact",
    description:
      "Contact AfriYouth Innovation Labs about research, policy, programmes, partnerships or accessibility.",
    path: "/contact",
  },
} satisfies Record<string, PageMeta>;

export const notFoundMeta: PageMeta = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  path: "/404",
};
