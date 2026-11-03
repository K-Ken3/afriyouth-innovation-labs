export type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export const pageMeta = {
  home: {
    title: "Evidence. Innovation. African futures.",
    description:
      "AfriYouth Innovation Labs connects research, human-centered design, policy, entrepreneurship and foresight to expand what young Africans can build and shape.",
    path: "/",
  },
  about: {
    title: "About the Lab",
    description:
      "The purpose, mission, vision and working principles of AfriYouth Innovation Labs — a research and innovation institution for African futures.",
    path: "/about",
  },
  whatWeDo: {
    title: "What We Do",
    description:
      "Research and evidence, policy engagement, human-centered design, entrepreneurship, professional development, strategic foresight and impact measurement.",
    path: "/what-we-do",
  },
  programs: {
    title: "Programs & Opportunities",
    description:
      "The AfriYouth opportunity board for fellowships, research calls, innovation challenges, training and enterprise support. Listings appear only when verified.",
    path: "/programs",
  },
  insights: {
    title: "Insights",
    description:
      "Provisional essays and future publications on evidence, design, policy, enterprise, foresight and honest impact measurement.",
    path: "/insights",
  },
  impact: {
    title: "Impact & Accountability",
    description:
      "How AfriYouth measures reach, depth, durability and systems change — and why no impact figures are published until they are verified.",
    path: "/impact",
  },
  getInvolved: {
    title: "Get Involved",
    description:
      "Register interest in AfriYouth programmes, learning experiences and opportunities for young people. Official calls are published only when confirmed.",
    path: "/get-involved",
  },
  partner: {
    title: "Partner With Us",
    description:
      "Collaborate with AfriYouth Innovation Labs on research, co-design, policy, enterprise, learning and foresight partnerships.",
    path: "/partner-with-us",
  },
  contact: {
    title: "Contact",
    description:
      "Contact routes for AfriYouth Innovation Labs. Official channels are pending; prototype forms validate locally and do not transmit data.",
    path: "/contact",
  },
} satisfies Record<string, PageMeta>;

export const notFoundMeta: PageMeta = {
  title: "Page not found",
  description: "The page you are looking for could not be found.",
  path: "/404",
};
