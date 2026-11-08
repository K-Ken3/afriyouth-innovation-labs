export type Theme = "light" | "dark";

export type NavItem = {
  label: string;
  to: string;
  description?: string;
};

export type AreaIconName =
  | "research"
  | "policy"
  | "innovation"
  | "entrepreneurship"
  | "professional"
  | "foresight"
  | "impact";

export type Area = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: AreaIconName;
  tagline: string;
  summary: string;
  description: string[];
  capabilities: string[];
  question: string;
  formats: string[];
  accent: "lime" | "sage" | "ivory" | "clay";
};

export type ApproachNode = {
  id: string;
  number: string;
  label: string;
  shortLabel: string;
  description: string;
  output: string;
  areaId: string;
  x: number;
  y: number;
};

export type ProgramCategory = {
  id: string;
  label: string;
  description: string;
};

export type Program = {
  id: string;
  title: string;
  category: string;
  summary: string;
  eligibility: string;
  deadline: string;
  format: string;
  status: "open" | "upcoming" | "closed";
  applicationUrl: string;
};

export type InsightCategory =
  | "Research & evidence"
  | "Design"
  | "Policy"
  | "Enterprise"
  | "Futures"
  | "Measurement";

export type Insight = {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  kind: "Essay" | "Report" | "Field note";
  edition: string;
  readingTime: number;
  body: string[];
  pullQuote?: string;
  provisional: boolean;
};

export type Pathway = {
  audience: string;
  number: string;
  title: string;
  description: string;
  to: string;
  cta: string;
  note: string;
};

export type ImpactDimension = {
  id: string;
  number: string;
  title: string;
  description: string;
  question: string;
};

export type PartnerModel = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export type Faq = {
  question: string;
  answer: string;
};
