import type { ImpactDimension } from "./types";

/**
 * IMPACT CONTENT
 * --------------
 * No statistics, baselines, evaluations or achievements are included because
 * none have been supplied. The page explains the measurement architecture and
 * uses explicit "not yet published" states instead of fabricated numbers.
 */
export const impactIntro = {
  eyebrow: "Impact & accountability",
  heading: "We will publish what changes. Not just what we did.",
  intro:
    "Impact is a claim that requires evidence. This prototype shows how AfriYouth intends to measure and report its work — and deliberately displays no figures until they can be verified, sourced and dated.",
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
    label: "Baseline studies",
    description: "Starting conditions for each engagement, with methods and sample notes.",
    status: "Not yet published",
  },
  {
    label: "Outcome & contribution studies",
    description: "What changed, for whom, and what else may explain it.",
    status: "Not yet published",
  },
  {
    label: "Evaluation reports",
    description: "Independent and internal assessments, including negative findings.",
    status: "Not yet published",
  },
  {
    label: "Learning briefs",
    description: "Practical lessons for programme teams, partners and funders.",
    status: "Not yet published",
  },
];

export const impactNote =
  "No impact figures appear on this prototype. When verified results exist, they will be published here with their source, date, method and stated limitations. The absence of a number is intentional.";

export const impactFaqs = [
  {
    question: "Why are there no impact numbers on this page?",
    answer:
      "Because no verified impact data has been supplied for this prototype. Publishing estimates as achievements would misrepresent the organization. The measurement framework is shown so the reporting architecture can be reviewed before data arrives.",
  },
  {
    question: "Will you publish negative findings?",
    answer:
      "The measurement commitments state that limitations and unintended effects are reported alongside results. A public impact ledger is only credible if it can contain findings that are inconvenient.",
  },
  {
    question: "Who verifies the data?",
    answer:
      "Verification arrangements are not yet published. The final governance model, including any independent review, will be documented here when confirmed.",
  },
];
