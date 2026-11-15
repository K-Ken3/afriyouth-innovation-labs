import type { PartnerModel } from "./types";

export const partnerModels: PartnerModel[] = [
  {
    number: "01",
    title: "Research & evidence",
    description:
      "Commission applied policy or socio-economic research, baseline and endline studies, impact assessments, programme evaluations or evidence synthesis, published as AfriYouth Evidence Reports.",
    tags: ["Applied research", "Evaluations", "Evidence synthesis"],
  },
  {
    number: "02",
    title: "Policy & governance",
    description:
      "Work with us on policy analysis and design, regulatory review, governance diagnostics, stakeholder mapping, policy dialogue and implementation support.",
    tags: ["Policy analysis", "Governance", "Policy dialogue"],
  },
  {
    number: "03",
    title: "Innovation & venture support",
    description:
      "Support young innovators through human-centered design, prototyping, market validation, incubation, acceleration and investor readiness — including the AfriYouth Innovation Accelerator.",
    tags: ["Human-centered design", "Incubation", "Investor readiness"],
  },
  {
    number: "04",
    title: "Foresight & futures",
    description:
      "Commission scenario planning, horizon scanning, future-of-work studies or 2030–2050 scenarios for strategy, policy or programme design.",
    tags: ["Scenarios", "Horizon scanning", "Africa 2050"],
  },
  {
    number: "05",
    title: "Leadership, learning & funding readiness",
    description:
      "Build employability programmes, professional competency frameworks and learning systems — or prepare a funding strategy, proposal, business case or due-diligence pack.",
    tags: ["Employability", "Professional learning", "Funding readiness"],
  },
];

export const partnerAudiences = [
  "Universities, think tanks and research institutes",
  "Public agencies and policymakers",
  "Funders and philanthropic organizations",
  "Civil society, youth networks and youth-led ventures",
  "Enterprises, incubators and innovation hubs",
];

export const partnerProcess = [
  {
    number: "01",
    title: "Conversation",
    text: "A structured discussion about the question, context and decision you need to inform.",
  },
  {
    number: "02",
    title: "Scope",
    text: "A written outline of approach, team, timeline and what success would look like — with assumptions stated.",
  },
  {
    number: "03",
    title: "Team & protocol",
    text: "Agreement on governance, ethics, data protection and the roles each partner will hold.",
  },
  {
    number: "04",
    title: "Delivery",
    text: "Collaborative work with regular check-ins, visible decisions and no surprise outputs.",
  },
  {
    number: "05",
    title: "Uptake & learning",
    text: "A deliberate plan for how findings travel, who acts on them, and what is learned together.",
  },
];

export const partnerQuestions = [
  "What decision are we trying to inform?",
  "Who needs to own the result for it to last?",
  "Whose experience is missing from the current framing?",
  "What would success look like from the outside?",
  "What are we choosing not to measure, and why?",
];

export const partnerFaqs = [
  {
    question: "What happens in a first conversation?",
    answer:
      "A structured discussion about the decision you need to inform, the people affected and the constraints you are working within. It is a scoping conversation, not a pitch, and no engagement is assumed.",
  },
  {
    question: "Do we need a fully formed brief?",
    answer:
      "No. Most useful work begins before the brief exists. We can help frame the question, identify what evidence is needed and agree what would count as progress before committing to a method.",
  },
  {
    question: "Can you work with funders and public agencies?",
    answer:
      "Yes. The practice is built for research institutes, public agencies, funders, civil society, youth networks, youth-led ventures and enterprises. Engagements are scoped around the decision, the evidence required and the people who must act on the result.",
  },
  {
    question: "Are any current partnerships listed?",
    answer:
      "Partnerships are published only with the partner's permission. Where a collaboration can be named, it appears with a short description of the work and the partner's role.",
  },
  {
    question: "How are ethics and data protection handled?",
    answer:
      "Governance, ethics and data protection are agreed before delivery and documented in the engagement protocol, including consent, data handling and publication rights.",
  },
];

export const collaborationOptions = [
  "Research & evidence partnership",
  "Policy & governance partnership",
  "Innovation & venture support partnership",
  "Foresight & futures partnership",
  "Leadership, learning & funding readiness",
  "Not sure yet — let's discuss",
];
