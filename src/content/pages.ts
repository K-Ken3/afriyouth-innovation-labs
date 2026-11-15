export const getInvolvedFaqs = [
  {
    question: "Are applications open right now?",
    answer:
      "Calls open at different points in the year. When a call opens it appears on the Programs page with eligibility, deadline, format and a direct application route.",
  },
  {
    question: "What can I register interest in?",
    answer:
      "You can register interest in the Innovation & Venture Lab, Research & Evidence Lab, Policy & Governance Lab, Policy Innovation Challenge, Strategic Foresight & Futures Lab, Career & Professional Development Academy, Impact & Learning Services or funding and investment readiness. This helps us send relevant opportunities; it is not an application.",
  },
  {
    question: "Do you accept unsolicited research proposals?",
    answer:
      "Yes. Share the question, the context and the decision you want to inform through the contact or partnership route. We review proposals against the current programme and respond to the contact address you provide.",
  },
  {
    question: "Will I receive a response?",
    answer:
      "We review every enquiry and respond to the contact address you provide. If the work is not a fit for the current programme, we will say so directly.",
  },
];

export const contactFaqs = [
  {
    question: "How do I contact AfriYouth?",
    answer:
      "Use the contact form on this page. Direct email, telephone and office details are published as they are confirmed.",
  },
  {
    question: "What happens when I submit the form?",
    answer:
      "The form opens a pre-addressed email draft in your mail client. You can review the message and send it yourself; nothing leaves your device until you do.",
  },
  {
    question: "Where is the organization based?",
    answer:
      "AfriYouth works across Africa. Office and telephone details are published here once they are confirmed.",
  },
  {
    question: "How do I report an accessibility issue?",
    answer:
      "Use the contact form and select Accessibility feedback. We use those reports to correct the issue and improve the site.",
  },
];

export const interestOptions = [
  "Innovation & Venture Lab",
  "Research & Evidence Lab",
  "Policy & Governance Lab",
  "Policy Innovation Challenge",
  "Strategic Foresight & Futures Lab",
  "Career & Professional Development Academy",
  "Impact & Learning Services",
  "Funding & investment readiness",
  "Something else",
];

export const organisationTypes = [
  "University, think tank or research institute",
  "Public agency or government",
  "Funder or philanthropic organization",
  "Civil society or youth network",
  "Enterprise, hub or accelerator",
  "Other",
];

export const enquiryFormCopy = {
  body: "We use your details only to respond to your enquiry and never share them.",
  successTitle: "Your email draft is ready.",
  successBody:
    "Your mail client should have opened with the message addressed to AfriYouth. Review it and send when you are ready.",
  resetLabel: "Write another",
  unavailable:
    "The direct email channel is being configured. Please check back shortly.",
};

export const getInvolvedRoutes = [
  {
    number: "01",
    title: "Explore the opportunity board",
    text: "Accelerator cohorts, research calls, policy innovation challenges and learning opportunities are listed with eligibility, deadline and format.",
    to: "/programs",
    cta: "Visit the board",
  },
  {
    number: "02",
    title: "Register future interest",
    text: "Signal the divisions, programmes or services you want to hear about. This helps us send relevant opportunities; it is not an application.",
    to: "#interest-form",
    cta: "Go to the form",
  },
  {
    number: "03",
    title: "Bring a question as a partner",
    text: "If you represent an institution, enterprise or network, a scoping conversation can start with the decision you need to inform.",
    to: "/partner-with-us",
    cta: "Partner with us",
  },
];

/**
 * Flagship model: the Evidence-to-Impact Accelerator. Ten stages, published in
 * the official organisational profile.
 */
export const whatWeDoProcess = [
  {
    number: "01",
    title: "Discover",
    text: "Identify promising ideas, people and problems worth pursuing.",
  },
  {
    number: "02",
    title: "Diagnose",
    text: "Understand the system, the evidence gap and who is affected.",
  },
  {
    number: "03",
    title: "Research",
    text: "Generate applied evidence with the people closest to the problem.",
  },
  {
    number: "04",
    title: "Design",
    text: "Co-design solutions using human-centered design.",
  },
  {
    number: "05",
    title: "Prototype",
    text: "Build, test and iterate a working solution.",
  },
  {
    number: "06",
    title: "Policy",
    text: "Translate findings into policy options and institutional pathways.",
  },
  {
    number: "07",
    title: "Finance",
    text: "Prepare for funding, investment and resource mobilisation.",
  },
  {
    number: "08",
    title: "Implement",
    text: "Support delivery with partners and clear governance.",
  },
  {
    number: "09",
    title: "Measure",
    text: "Track outcomes, contribution and learning honestly.",
  },
  {
    number: "10",
    title: "Scale",
    text: "Support uptake, replication and durable ownership.",
  },
];
