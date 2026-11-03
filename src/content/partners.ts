import type { PartnerModel } from "./types";

export const partnerModels: PartnerModel[] = [
  {
    number: "01",
    title: "Research & evaluation",
    description:
      "Co-design a study, evaluation or evidence review with our team. We bring methodological rigour, participatory practice and a route to uptake.",
    tags: ["Mixed methods", "Evaluation", "Evidence synthesis"],
  },
  {
    number: "02",
    title: "Co-design & innovation",
    description:
      "Work with young people and practitioners to reframe a problem, prototype options and test what is adoptable in context.",
    tags: ["Co-design", "Prototyping", "Field testing"],
  },
  {
    number: "03",
    title: "Policy & systems",
    description:
      "Translate evidence into policy options, convene the right actors, and stay through implementation to learn what changes.",
    tags: ["Policy options", "Convening", "Implementation"],
  },
  {
    number: "04",
    title: "Enterprise & ecosystem",
    description:
      "Support ventures with market insight, business design and ecosystem navigation — or partner on enterprise programming.",
    tags: ["Venture support", "Market research", "Ecosystem"],
  },
  {
    number: "05",
    title: "Learning & foresight",
    description:
      "Build professional learning, scenario processes and measurement systems that strengthen capability beyond a single engagement.",
    tags: ["Professional learning", "Scenarios", "MEL design"],
  },
];

export const partnerAudiences = [
  "Universities and research institutes",
  "Public agencies and policymakers",
  "Funders and philanthropic organizations",
  "Civil society and youth networks",
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
      "The practice is designed for research institutions, public agencies, funders, civil society, youth networks and enterprises. Specific partnerships and references are not published on this prototype because none have been supplied for verification.",
  },
  {
    question: "Are any current partnerships listed?",
    answer:
      "No. This prototype does not name partners, clients or endorsements. A verified partner directory will be added when official information is available.",
  },
  {
    question: "How are ethics and data protection handled?",
    answer:
      "Governance, ethics and data protection arrangements are agreed before delivery and documented in the engagement protocol. The final policy language will be published with official institutional materials.",
  },
];

export const collaborationOptions = [
  "Research & evaluation partnership",
  "Co-design & innovation partnership",
  "Policy & systems partnership",
  "Enterprise & ecosystem partnership",
  "Learning & foresight partnership",
  "Not sure yet — let's discuss",
];
