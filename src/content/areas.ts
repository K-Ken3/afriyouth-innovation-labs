import type { Area, ApproachNode } from "./types";

/**
 * EIGHT PRACTICES, FIVE DIVISIONS
 * -------------------------------
 * Cards describe the official product and service architecture: five strategic
 * divisions plus the Policy Innovation Challenge, Impact & Learning Services and
 * Funding & Investment Readiness. Ids are stable anchors used by navigation and
 * deep links.
 */
export const areas: Area[] = [
  {
    id: "research",
    number: "01",
    title: "Research & Evidence Lab",
    shortTitle: "Research & evidence",
    icon: "research",
    tagline: "Applied evidence for real decisions.",
    summary:
      "Applied policy and socio-economic research on youth, institutions and markets — delivered as evidence reports, evaluations and policy briefs built for use.",
    description: [
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
    accent: "lime",
  },
  {
    id: "policy",
    number: "02",
    title: "Policy & Governance Lab",
    shortTitle: "Policy & governance",
    icon: "policy",
    tagline: "Evidence translated into public choices.",
    summary:
      "Policy analysis, design and governance support that turn evidence into options institutions can act on — and stay through implementation.",
    description: [
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
    accent: "sage",
  },
  {
    id: "innovation",
    number: "03",
    title: "Policy Innovation Challenge",
    shortTitle: "Policy challenge",
    icon: "innovation",
    tagline: "The problem is the brief.",
    summary:
      "A challenge process that asks young innovators: what is one of Africa's most pressing problems, and what evidence-based solution can you design?",
    description: [
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
    question:
      "What is one of Africa's most pressing problems — and what evidence-based solution can you design?",
    formats: ["Policy Innovation Challenge", "Policy Innovation Demo Day", "Themed tracks"],
    accent: "ivory",
  },
  {
    id: "entrepreneurship",
    number: "04",
    title: "Innovation & Venture Lab",
    shortTitle: "Venture lab",
    icon: "entrepreneurship",
    tagline: "From promising idea to investable venture.",
    summary:
      "Idea discovery, human-centered design and venture building — through incubation, acceleration and demo day, with funding readiness built in.",
    description: [
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
    accent: "clay",
  },
  {
    id: "professional-development",
    number: "05",
    title: "Career & Professional Development Academy",
    shortTitle: "Career & professional",
    icon: "professional",
    tagline: "From education to employment — and beyond.",
    summary:
      "Employability and professional development for students and graduates, built around practice, feedback and a portfolio employers can see.",
    description: [
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
    formats: [
      "Employability Bootcamp",
      "University Employability Programme",
      "Professional portfolio",
    ],
    accent: "sage",
  },
  {
    id: "foresight",
    number: "06",
    title: "Strategic Foresight & Futures Lab",
    shortTitle: "Foresight & futures",
    icon: "foresight",
    tagline: "Decide today against futures that differ.",
    summary:
      "Scenario planning, horizon scanning and futures studies that help institutions prepare for uncertainty and choose with intent.",
    description: [
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
    accent: "lime",
  },
  {
    id: "impact-measurement",
    number: "07",
    title: "Impact & Learning Services",
    shortTitle: "Impact & learning",
    icon: "impact",
    tagline: "Measurement that improves the next decision.",
    summary:
      "Theory of change, monitoring and evaluation, and learning systems that track outcomes honestly and return learning to the work.",
    description: [
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
    accent: "sage",
  },
  {
    id: "funding",
    number: "08",
    title: "Funding & Investment Readiness",
    shortTitle: "Funding readiness",
    icon: "funding",
    tagline: "From a credible case to capital.",
    summary:
      "Resource mobilisation and investment readiness — grant intelligence, proposal development, donor mapping, financial modelling and due diligence — connecting strong ideas to the finance they need.",
    description: [
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
    accent: "clay",
  },
];

export const approachNodes: ApproachNode[] = [
  {
    id: "evidence",
    number: "01",
    label: "Research & Evidence",
    shortLabel: "Evidence",
    description:
      "Generates applied evidence on youth, institutions and markets, framed around the decision that needs it.",
    output: "AfriYouth Evidence Reports",
    areaId: "research",
    x: 14,
    y: 18,
  },
  {
    id: "design",
    number: "02",
    label: "Human-Centered Design",
    shortLabel: "Design",
    description: "Co-frames and tests solutions with the people who must live with them.",
    output: "Adoptable prototypes",
    areaId: "entrepreneurship",
    x: 86,
    y: 14,
  },
  {
    id: "enterprise",
    number: "03",
    label: "Innovation & Entrepreneurship",
    shortLabel: "Enterprise",
    description: "Builds ventures through incubation, acceleration and funding readiness.",
    output: "Investable ventures",
    areaId: "entrepreneurship",
    x: 92,
    y: 56,
  },
  {
    id: "policy",
    number: "04",
    label: "Policy & Governance",
    shortLabel: "Policy",
    description: "Translates evidence into policy options, dialogue and implementation support.",
    output: "AfriYouth Policy Solutions Series",
    areaId: "policy",
    x: 56,
    y: 86,
  },
  {
    id: "foresight",
    number: "05",
    label: "Strategic Foresight",
    shortLabel: "Foresight",
    description: "Anticipates shifts and tests strategic choices against plausible futures.",
    output: "Africa 2050 Futures Series",
    areaId: "foresight",
    x: 12,
    y: 64,
  },
];
