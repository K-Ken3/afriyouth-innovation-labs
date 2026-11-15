import type { ImpactDimension } from "./types";

/**
 * IMPACT CONTENT
 * --------------
 * No statistics, baselines, evaluations or achievements are listed because none
 * have been cleared for publication. The page sets out the measurement standard
 * and the public ledger through which verified results are released.
 */
export const impactIntro = {
  eyebrow: "Impact & accountability",
  heading: "We publish what changes. Not just what we did.",
  intro:
    "Impact & Learning Services is one of AfriYouth's cross-cutting services, spanning theory of change, M&E systems, baseline and outcome measurement, evaluation and learning reports. This page sets out how the firm measures and reports its work — and how verified results are released.",
  statement:
    "A number without a source is not evidence. It is decoration.",
};

export const impactDimensions: ImpactDimension[] = [
  {
    id: "reach",
    number: "01",
    title: "Reach",
    description:
      "Who is in the room, who is reached, and who is still missing. Participation is counted with care, not used as a substitute for change.",
    question: "Who was reached — and who was not?",
  },
  {
    id: "depth",
    number: "02",
    title: "Depth",
    description:
      "What shifts for people: knowledge, confidence, practice, income, agency or opportunity. Changes are described before they are reduced to a percentage.",
    question: "What changed for people, not just for the programme?",
  },
  {
    id: "durability",
    number: "03",
    title: "Durability",
    description:
      "Whether change holds after a cohort, project or funding cycle ends — and what local capability remains when external support withdraws.",
    question: "What remains when the project leaves?",
  },
  {
    id: "systems",
    number: "04",
    title: "Systems",
    description:
      "Whether rules, budgets, services or institutional behaviour change. System shifts are traced through decisions and implementation, not announcements.",
    question: "What now works differently because of this?",
  },
];

export const impactStages = [
  {
    number: "01",
    title: "Frame",
    text: "Define the question and agree whose experience defines success.",
  },
  {
    number: "02",
    title: "Baseline",
    text: "Establish where things stand, using methods appropriate to context.",
  },
  {
    number: "03",
    title: "Trace",
    text: "Follow change across people, enterprises and institutions over time.",
  },
  {
    number: "04",
    title: "Test",
    text: "Examine contribution, alternative explanations and unintended effects.",
  },
  {
    number: "05",
    title: "Publish",
    text: "Report verified findings, limitations and learning in public.",
  },
];

export const measurementCommitments = [
  "Publish only figures that are verified, sourced and dated.",
  "Distinguish clearly between outputs, outcomes and contribution.",
  "Report limitations, absences and unintended effects alongside results.",
  "Involve the people being counted in interpreting what the findings mean.",
  "Correct, update or retract when better evidence becomes available.",
];

export const impactLedger = [
  {
    label: "Baseline and endline studies",
    description: "Starting and closing conditions for each engagement, with methods and sample notes.",
    status: "Published on completion",
  },
  {
    label: "Impact assessments",
    description: "What changed, for whom, and what else may explain it.",
    status: "Published on completion",
  },
  {
    label: "Programme evaluations",
    description: "Independent and internal assessments, including negative findings.",
    status: "Published on completion",
  },
  {
    label: "Learning reports",
    description: "Practical lessons for programme teams, partners, funders and the Impact Dashboard.",
    status: "Published on completion",
  },
];

export const impactNote =
  "Verified results are published here with their source, date, method and stated limitations, and surfaced through the AfriYouth Impact Dashboard. Estimates are never presented as achievements.";

export const impactFaqs = [
  {
    question: "How are impact results published?",
    answer:
      "Impact figures are published as verified engagements conclude, with their source, date, method and stated limitations. Publishing estimates as achievements would misrepresent the work; the measurement framework is shown so the reporting standard is clear.",
  },
  {
    question: "What is the AfriYouth Impact Dashboard?",
    answer:
      "It is the product through which verified indicators, outcome measures and learning reports are surfaced. It carries only data that has passed the verification standard set for the engagement.",
  },
  {
    question: "Will you publish negative findings?",
    answer:
      "Yes. Our measurement commitments state that limitations and unintended effects are reported alongside results. A public impact ledger is only credible if it can contain findings that are inconvenient.",
  },
  {
    question: "Who verifies the data?",
    answer:
      "Verification arrangements are agreed with each partner before delivery and documented in the engagement protocol. The public ledger reports only data that meets that standard.",
  },
];
