import type { Program, ProgramCategory } from "./types";

/**
 * OPPORTUNITY DATA
 * ----------------
 * Empty until a live call is approved for publication. When a call opens, add
 * objects matching the `Program` type; the board UI, filters and states respond.
 */
export const programs: Program[] = [];

export const programCategories: ProgramCategory[] = [
  {
    id: "all",
    label: "All opportunities",
    description: "Every open and upcoming call on the board.",
  },
  {
    id: "fellowships",
    label: "Accelerators & cohorts",
    description:
      "AfriYouth Innovation Accelerator cohorts, incubation and structured practice.",
  },
  {
    id: "research",
    label: "Research calls",
    description:
      "Opportunities to contribute to applied research, evaluations and AfriYouth Evidence Reports.",
  },
  {
    id: "innovation",
    label: "Innovation challenges",
    description:
      "Policy Innovation Challenge rounds and time-bound calls to prototype solutions.",
  },
  {
    id: "learning",
    label: "Academies & training",
    description:
      "Employability Bootcamp, University Employability Programme and professional development.",
  },
  {
    id: "enterprise",
    label: "Venture & funding support",
    description:
      "Incubation, acceleration, investor readiness and funding support.",
  },
];

export const programListingFields = [
  {
    label: "Eligibility",
    text: "Who the opportunity is for, including any location or experience requirements.",
  },
  {
    label: "Deadline",
    text: "The official closing date and time zone.",
  },
  {
    label: "Format",
    text: "Whether the opportunity is in person, remote or hybrid, and the expected commitment.",
  },
  {
    label: "Application route",
    text: "A direct link to the verified application page or instructions.",
  },
];

export const programEmpty = {
  title: "There are no open calls at present.",
  body: "Cohorts and calls for the Innovation Accelerator, Policy Innovation Challenge, research programme and academies are announced here as they open. Each listing shows eligibility, deadline, format and a direct application route.",
  primary: { label: "Register your interest", to: "/get-involved" },
  secondary: { label: "How listings work", to: "/programs#how-it-works" },
};

export const opportunityStatusLabels: Record<Program["status"], string> = {
  open: "Open now",
  upcoming: "Opening soon",
  closed: "Closed",
};
