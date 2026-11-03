import type { Program, ProgramCategory } from "./types";

/**
 * OPPORTUNITY DATA
 * ----------------
 * Deliberately empty. No named programmes, deadlines or application links
 * have been invented. When official calls are confirmed, add objects matching
 * the `Program` type; the board UI, filters and empty states will respond.
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
    label: "Fellowships & cohorts",
    description:
      "Structured learning and practice cohorts for young researchers, designers and builders.",
  },
  {
    id: "research",
    label: "Research calls",
    description:
      "Opportunities to contribute to studies, evaluations and evidence reviews.",
  },
  {
    id: "innovation",
    label: "Innovation challenges",
    description:
      "Time-bound calls to prototype solutions to defined problems.",
  },
  {
    id: "learning",
    label: "Training & clinics",
    description:
      "Short-form professional development and applied skills sessions.",
  },
  {
    id: "enterprise",
    label: "Enterprise support",
    description:
      "Incubation, acceleration and venture-readiness opportunities.",
  },
];

export const programListingFields = [
  {
    label: "Eligibility",
    text: "Who the opportunity is for, including any location or experience requirements.",
  },
  {
    label: "Deadline",
    text: "The official closing date and time zone, published only when confirmed.",
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
  title: "No opportunities are published yet.",
  body: "The opportunity board is being prepared. When calls are confirmed, each listing will show eligibility, deadline, format and a direct application route. Nothing is displayed here until that information is verified.",
  primary: { label: "Register your interest", to: "/get-involved" },
  secondary: { label: "How listings work", to: "/programs#how-it-works" },
};

export const opportunityStatusLabels: Record<Program["status"], string> = {
  open: "Open now",
  upcoming: "Opening soon",
  closed: "Closed",
};
