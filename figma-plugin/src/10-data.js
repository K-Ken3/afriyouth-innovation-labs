/* ============================================================================
   AfriYouth Innovation Labs — content used to build the Figma frames
   Official organisational profile + implemented site copy
   ========================================================================= */

const PHOTO_BASE = "https://afriyouth-innovation-labs.vercel.app/photos/";
const PHOTO_URLS = {
  electronicsLab: PHOTO_BASE + "brand-electronics-lab.jpg",
  researcherVr: PHOTO_BASE + "brand-researcher-vr.jpg",
  youngInnovatorVr: PHOTO_BASE + "brand-young-innovator-vr.jpg",
  solarFieldTeam: PHOTO_BASE + "brand-solar-field-team.jpg",
  circuitWork: PHOTO_BASE + "brand-circuit-work.jpg",
};
const IMAGES = {};

const SITE = {
  name: "AfriYouth Innovation Labs",
  wordmark: "AFRIYOUTH",
  wordmarkSub: "Innovation Labs",
  tagline: "Fueling Innovators for Sustainable Development",
  description:
    "A research, innovation and policy consulting firm that identifies, nurtures and advances promising ideas from Africa's young innovators to address the Sustainable Development Goals.",
  mission:
    "To empower Africa's youth to generate evidence, shape policy, and develop innovative solutions to Africa's most pressing socio-economic challenges through research, human-centered design, and entrepreneurship.",
  vision:
    "To build an Africa where empowered young people use evidence, innovation, and entrepreneurship to solve complex challenges, shape policies and drive inclusive and sustainable socio-economic transformation by 2050.",
  positioning:
    "AfriYouth is a research, innovation and policy consulting firm. We connect research, policy, human-centered design, entrepreneurship and foresight to identify, nurture and advance promising ideas from Africa's young innovators — transforming community-driven ideas into practical, scalable solutions.",
  accountability:
    "We publish what we can stand behind: figures with their source, date and method; partnerships with permission; and programme calls with eligibility, deadlines and a direct application route.",
};

const PILLARS = [
  "Innovation",
  "Youth empowerment",
  "Sustainability",
  "Global impact",
  "Human-centered design",
  "Leadership development",
];

const PURPOSE = {
  heading: "A lab for the questions that shape African futures.",
  paragraphs: [
    "AfriYouth Innovation Labs is a research, innovation and policy consulting firm. We identify, nurture and advance promising ideas from Africa's young innovators to address the Sustainable Development Goals — transforming community-driven ideas into practical, scalable solutions.",
    "One connected practice brings research, policy, human-centered design, entrepreneurship, foresight and professional development together around a question. We connect youth organisations, incubators, think tanks and consulting firms rather than working as any one of them alone.",
  ],
  loop: "A continuous loop — each engagement returns knowledge to the next.",
  note: "Each part strengthens the others. The loop is the point — not a one-way route from research to a report.",
};

const PATHWAYS = [
  {
    audience: "For young people",
    number: "01",
    title: "Explore opportunities",
    text: "Find accelerator cohorts, research calls, policy challenges, learning experiences and venture support as they open. Each listing publishes its eligibility, deadline and application route.",
    key: "programs",
    cta: "Visit the opportunity board",
    note: "Calls announced as cohorts open",
  },
  {
    audience: "For organizations",
    number: "02",
    title: "Commission the work",
    text: "Commission applied research, policy analysis, human-centered design, foresight, professional learning or impact and learning services from one connected team.",
    key: "what",
    cta: "Explore the divisions",
    note: "Five divisions · eight practices",
  },
  {
    audience: "For institutions",
    number: "03",
    title: "Build a partnership",
    text: "Explore research consortia, policy collaborations, innovation programmes, funding readiness and long-term learning relationships.",
    key: "partner",
    cta: "Start a partnership",
    note: "Five collaboration models",
  },
];

const LISTING_FIELDS = [
  { label: "Eligibility", text: "Who the opportunity is for, including any location or experience requirements." },
  { label: "Deadline", text: "The official closing date and time zone." },
  { label: "Format", text: "Whether the opportunity is in person, remote or hybrid, and the expected commitment." },
  { label: "Application route", text: "A direct link to the verified application page or instructions." },
];

const ABOUT = {
  whyHeading: "The distance between insight and change is a design choice.",
  why: [
    "Africa's young innovators are generating ideas in response to problems they understand intimately. What is often missing is the architecture that turns those ideas into evidence, policy, finance and durable institutions.",
    "AfriYouth identifies, nurtures and advances promising ideas along that route. We connect youth organisations, incubators, think tanks and consulting firms rather than operating as only one of them — because community-driven solutions need research, design, enterprise and policy in the same room.",
    "Our five divisions — Research & Evidence, Policy & Governance, Innovation & Entrepreneurship, Foresight & Futures, and Leadership & Capacity Building — are brought together around a question, with resource mobilisation and impact measurement as cross-cutting services.",
  ],
  commitments: [
    { title: "Intellectual rigour", text: "We hold our methods to a high standard and state the limits of what we can claim." },
    { title: "Participatory practice", text: "The people closest to a problem help define it, shape the response and judge the result." },
    { title: "Institutional honesty", text: "We publish achievements, partnerships, staff and metrics only when they are verified and attributable." },
    { title: "Long-term capability", text: "We aim to leave local teams, enterprises and institutions stronger than we found them." },
  ],
  team: {
    heading: "One connected practice",
    body: "Research, policy, human-centered design, entrepreneurship, foresight and professional development sit within one practice. Work is assembled around the decision at hand, drawing on the disciplines it requires.",
    note: "Five divisions · one team",
  },
  partnership: {
    heading: "Institutional relationships",
    body: "AfriYouth works with research institutes, public institutions, funders, civil society, youth networks and enterprises. Each collaboration is scoped around a shared decision, with roles, ethics and success measures agreed before delivery.",
    note: "Partnerships by agreement.",
  },
  verification: [
    "Figures are published with their source, date and method.",
    "Partnerships are named with permission.",
    "Staff and governance details are published on appointment.",
    "Contact routes are published as they are confirmed.",
  ],
};

const FORM_COPY = {
  successTitle: "Your email draft is ready.",
  successBody: "Your mail client should have opened with the message addressed to AfriYouth. Review it and send when you are ready.",
};

const GET_INVOLVED_ROUTES = [
  {
    number: "01",
    title: "Explore the opportunity board",
    text: "Accelerator cohorts, research calls, policy innovation challenges and learning opportunities are listed with eligibility, deadline and format.",
    key: "programs",
    cta: "Visit the board",
  },
  {
    number: "02",
    title: "Register future interest",
    text: "Signal the divisions, programmes or services you want to hear about. This helps us send relevant opportunities; it is not an application.",
    key: "involved",
    cta: "Go to the form",
  },
  {
    number: "03",
    title: "Bring a question as a partner",
    text: "If you represent an institution, enterprise or network, a scoping conversation can start with the decision you need to inform.",
    key: "partner",
    cta: "Partner with us",
  },
];

const INTEREST_OPTIONS = [
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

const CONTACT_CHANNELS = [
  { label: "Email", status: "Via form", text: "The contact form opens a pre-addressed email draft in your mail client." },
  { label: "Telephone", status: "On request", text: "Call details are shared with confirmed engagements and published here when finalised." },
  { label: "Office", status: "On request", text: "The team works across Africa. Office details are shared with confirmed engagements." },
];

const DIVISIONS = [
  { label: "Research & Evidence", text: "Applied research, surveys, evaluations and evidence that decisions can use." },
  { label: "Policy & Governance", text: "Policy analysis, regulatory review and governance support that hold change in place." },
  { label: "Innovation & Entrepreneurship", text: "Human-centered design and venture support from idea to investable enterprise." },
  { label: "Foresight & Futures", text: "Scenarios and horizon scanning that widen the choices available today." },
  { label: "Leadership & Capacity", text: "Employability, professional skills and learning systems that stay in place." },
];

const PHILOSOPHY = [
  { number: "01", title: "Think", text: "Clarify the decision, the people affected and the assumptions before choosing a method." },
  { number: "02", title: "Research", text: "Generate applied evidence with the people closest to the problem." },
  { number: "03", title: "Design", text: "Co-design solutions using human-centered design and test them in context." },
  { number: "04", title: "Build", text: "Prototype, strengthen and prepare ideas for real-world use." },
  { number: "05", title: "Influence", text: "Translate evidence into policy options, dialogue and institutional uptake." },
  { number: "06", title: "Scale", text: "Support finance, implementation and ownership so that change can last." },
];

const COMMITMENTS = [
  { title: "Intellectual rigour", text: "We hold our methods to a high standard and state the limits of what we can claim." },
  { title: "Participatory practice", text: "The people closest to a problem help define it, shape the response and judge the result." },
  { title: "Institutional honesty", text: "We publish achievements, partnerships, staff and metrics only when they are verified and attributable." },
  { title: "Long-term capability", text: "We aim to leave local teams, enterprises and institutions stronger than we found them." },
];

const AREAS = [
  {
    id: "research",
    number: "01",
    title: "Research & Evidence Lab",
    tagline: "Applied evidence for real decisions.",
    summary:
      "Applied policy and socio-economic research on youth, institutions and markets — delivered as evidence reports, evaluations and policy briefs built for use.",
    body: [
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
  },
  {
    id: "policy",
    number: "02",
    title: "Policy & Governance Lab",
    tagline: "Evidence translated into public choices.",
    summary:
      "Policy analysis, design and governance support that turn evidence into options institutions can act on — and stay through implementation.",
    body: [
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
  },
  {
    id: "innovation",
    number: "03",
    title: "Policy Innovation Challenge",
    tagline: "The problem is the brief.",
    summary:
      "A challenge process that asks young innovators: what is one of Africa's most pressing problems, and what evidence-based solution can you design?",
    body: [
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
    question: "What is one of Africa's most pressing problems — and what evidence-based solution can you design?",
    formats: ["Policy Innovation Challenge", "Policy Innovation Demo Day", "Themed tracks"],
  },
  {
    id: "entrepreneurship",
    number: "04",
    title: "Innovation & Venture Lab",
    tagline: "From promising idea to investable venture.",
    summary:
      "Idea discovery, human-centered design and venture building — through incubation, acceleration and demo day, with funding readiness built in.",
    body: [
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
  },
  {
    id: "professional-development",
    number: "05",
    title: "Career & Professional Development Academy",
    tagline: "From education to employment — and beyond.",
    summary:
      "Employability and professional development for students and graduates, built around practice, feedback and a portfolio employers can see.",
    body: [
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
    formats: ["Employability Bootcamp", "University Employability Programme", "Professional portfolio"],
  },
  {
    id: "foresight",
    number: "06",
    title: "Strategic Foresight & Futures Lab",
    tagline: "Decide today against futures that differ.",
    summary:
      "Scenario planning, horizon scanning and futures studies that help institutions prepare for uncertainty and choose with intent.",
    body: [
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
  },
  {
    id: "impact-measurement",
    number: "07",
    title: "Impact & Learning Services",
    tagline: "Measurement that improves the next decision.",
    summary:
      "Theory of change, monitoring and evaluation, and learning systems that track outcomes honestly and return learning to the work.",
    body: [
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
  },
  {
    id: "funding",
    number: "08",
    title: "Funding & Investment Readiness",
    tagline: "From a credible case to capital.",
    summary:
      "Resource mobilisation and investment readiness — grant intelligence, proposal development, donor mapping, financial modelling and due diligence — connecting strong ideas to the finance they need.",
    body: [
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
  },
];

const PROCESS = [
  { number: "01", title: "Discover", text: "Identify promising ideas, people and problems worth pursuing." },
  { number: "02", title: "Diagnose", text: "Understand the system, the evidence gap and who is affected." },
  { number: "03", title: "Research", text: "Generate applied evidence with the people closest to the problem." },
  { number: "04", title: "Design", text: "Co-design solutions using human-centered design." },
  { number: "05", title: "Prototype", text: "Build, test and iterate a working solution." },
  { number: "06", title: "Policy", text: "Translate findings into policy options and institutional pathways." },
  { number: "07", title: "Finance", text: "Prepare for funding, investment and resource mobilisation." },
  { number: "08", title: "Implement", text: "Support delivery with partners and clear governance." },
  { number: "09", title: "Measure", text: "Track outcomes, contribution and learning honestly." },
  { number: "10", title: "Scale", text: "Support uptake, replication and durable ownership." },
];

const INSIGHTS = [
  {
    slug: "evidence-is-not-the-opposite-of-imagination",
    title: "Evidence is not the opposite of imagination",
    category: "Research & evidence",
    kind: "Essay",
    reading: "4 min read",
    excerpt:
      "Rigour and creativity are often treated as rivals. The most useful research begins with the willingness to be surprised.",
    quote: "Imagination is what tells us which questions are worth being rigorous about.",
    body: [
      "There is a version of research that treats certainty as the product. The question is fixed in advance, the method is chosen to defend it, and the report arrives with every uncertainty sanded down. It looks rigorous. It rarely changes anything.",
      "Evidence works differently when it is built for a decision. The question is opened up before it is narrowed. Communities are involved in defining what counts as a meaningful answer. Findings are presented with their limits intact, because the people using them need to know where the ground is soft.",
      "This is not a rejection of method. It is a demand for better method: sampling that reflects who is missing, analysis that can hold contradiction, and synthesis that resists the temptation to over-claim. Rigour is how we earn the right to ask people to act.",
      "Imagination belongs in that process. It is what lets a team see a pattern before the data confirms it, design a study that can detect what nobody thought to ask, and translate a finding into an option an institution can use. The two are not rivals. They are a working pair.",
    ],
  },
  {
    slug: "designing-with-young-people-not-for-them",
    title: "Designing with young people, not for them",
    category: "Design & innovation",
    kind: "Essay",
    reading: "3 min read",
    excerpt:
      "Consultation is not the same as collaboration. The difference shows up in who defines the problem — and who owns the result.",
    quote: "A focus group at the end is not participation. It is a review.",
    body: [
      "Participation is often measured by presence: how many young people attended, how many voices were in the room, how many sticky notes covered the wall. Those things matter, but they do not tell us who held power over the question.",
      "Human-centered design begins earlier. Young people help frame the problem, not merely react to a solution. They sit with the contradictions that outsiders smooth over. They can say that the barrier is not information but transport, not motivation but trust, not technology but the cost of data.",
      "That kind of involvement changes the work. A prototype tested with the people who will use it surfaces failure faster and more cheaply. A service designed around real routines is more likely to survive contact with real life.",
    ],
  },
  {
    slug: "the-policy-pipeline-is-a-design-problem",
    title: "The policy pipeline is a design problem",
    category: "Policy & governance",
    kind: "Essay",
    reading: "4 min read",
    excerpt:
      "Good evidence does not walk itself into a ministry. The route from finding to implementation has to be designed, with the incentives of the people inside it.",
    quote: "A policy brief is not an outcome. It is an artefact in a longer process.",
    body: [
      "Researchers often describe policy influence as a pipeline: evidence goes in one end, decisions come out the other. When the decision does not change, the pipeline is blamed for being leaky, or the evidence for being ignored.",
      "In practice, policy is a design problem. Decisions are made by people with mandates, constraints, constituencies and calendars. Evidence enters through relationships and timing as much as through argument.",
      "Designing for uptake means mapping the decision before producing the output. Who has authority? What are they accountable for? What would make the current approach costly to defend?",
    ],
  },
  {
    slug: "what-enterprise-teaches-institutions-about-feedback",
    title: "What enterprise teaches institutions about feedback",
    category: "Enterprise & venture",
    kind: "Essay",
    reading: "3 min read",
    excerpt:
      "Founders learn from customers because the cost of not listening is immediate. Institutions can borrow that discipline without borrowing the ideology.",
    quote: "A venture that ignores its users runs out of money. An institution that ignores its users runs out of legitimacy.",
    body: [
      "Enterprise is often presented as a counterpoint to public systems: faster, closer to the customer, less tolerant of waste. The comparison can be lazy, but there is a useful lesson underneath it.",
      "Founders receive feedback whether they ask for it or not. Customers stop buying, staff leave, a partner withdraws. The signal is close to the consequence. Institutions often receive feedback later, through evaluations or complaints.",
      "The lesson is not to run public services like startups. It is to shorten the distance between a decision and its evidence.",
    ],
  },
  {
    slug: "foresight-belongs-in-the-room",
    title: "Foresight belongs in the room, not the appendix",
    category: "Futures",
    kind: "Essay",
    reading: "3 min read",
    excerpt:
      "Scenarios are not predictions. Their value is in widening the set of futures a team is prepared to take seriously before a decision is locked in.",
    quote: "The purpose of foresight is not to be right. It is to be less surprised.",
    body: [
      "Strategic foresight is frequently commissioned as a report: a horizon scan, a set of scenarios, a workshop, a document with a long shelf life and a short readership. The thinking is good. The timing is wrong.",
      "Foresight is most useful before a strategy hardens. It gives a team permission to consider futures that do not fit the current plan, and a vocabulary for the uncertainties that cannot be resolved by more data.",
      "The output should be a changed conversation, not just a changed document.",
    ],
  },
  {
    slug: "measuring-what-matters-honestly",
    title: "Measuring what matters, honestly",
    category: "Impact & learning",
    kind: "Essay",
    reading: "4 min read",
    excerpt:
      "Impact measurement is not a marketing function. Its first obligation is to improve decisions — including the decision to admit what did not work.",
    quote: "A number without a source is not evidence. It is decoration.",
    body: [
      "The pressure to demonstrate impact can produce a strange kind of accounting. Activities become outcomes. Contributions become attribution. Anecdotes become percentages.",
      "Honest measurement begins with a theory of change specific enough to be wrong. What are we doing, for whom, through what mechanism, and what would we expect to see if it worked?",
      "It then chooses indicators for usefulness, not availability. A small number of well-defined measures, collected ethically and reported with their limitations, is worth more than a dashboard of convenient numbers.",
    ],
  },
];

const IMPACT = {
  intro:
    "Impact & Learning Services is one of AfriYouth's cross-cutting services, spanning theory of change, M&E systems, baseline and outcome measurement, evaluation and learning reports. This page sets out how the firm measures and reports its work — and how verified results are released.",
  statement: "A number without a source is not evidence. It is decoration.",
  dimensions: [
    { number: "01", title: "Reach", text: "Who is in the room, who is reached, and who is still missing. Participation is counted with care, not used as a substitute for change.", question: "Who was reached — and who was not?" },
    { number: "02", title: "Depth", text: "What shifts for people: knowledge, confidence, practice, income, agency or opportunity. Changes are described before they are reduced to a percentage.", question: "What changed for people, not just for the programme?" },
    { number: "03", title: "Durability", text: "Whether change holds after a cohort, project or funding cycle ends — and what local capability remains when external support withdraws.", question: "What remains when the project leaves?" },
    { number: "04", title: "Systems", text: "Whether rules, budgets, services or institutional behaviour change. System shifts are traced through decisions and implementation, not announcements.", question: "What now works differently because of this?" },
  ],
  stages: [
    { number: "01", title: "Frame", text: "Define the question and agree whose experience defines success." },
    { number: "02", title: "Baseline", text: "Establish where things stand, using methods appropriate to context." },
    { number: "03", title: "Trace", text: "Follow change across people, enterprises and institutions over time." },
    { number: "04", title: "Test", text: "Examine contribution, alternative explanations and unintended effects." },
    { number: "05", title: "Publish", text: "Report verified findings, limitations and learning in public." },
  ],
  ledger: [
    { label: "Baseline and endline studies", text: "Starting and closing conditions for each engagement, with methods and sample notes." },
    { label: "Impact assessments", text: "What changed, for whom, and what else may explain it." },
    { label: "Programme evaluations", text: "Independent and internal assessments, including negative findings." },
    { label: "Learning reports", text: "Practical lessons for programme teams, partners, funders and the Impact Dashboard." },
  ],
  commitments: [
    "Publish only figures that are verified, sourced and dated.",
    "Distinguish clearly between outputs, outcomes and contribution.",
    "Report limitations, absences and unintended effects alongside results.",
    "Involve the people being counted in interpreting what the findings mean.",
    "Correct, update or retract when better evidence becomes available.",
  ],
  faqs: [
    { q: "How are impact results published?", a: "Impact figures are published as verified engagements conclude, with their source, date, method and stated limitations. Publishing estimates as achievements would misrepresent the work; the measurement framework is shown so the reporting standard is clear." },
    { q: "What is the AfriYouth Impact Dashboard?", a: "It is the product through which verified indicators, outcome measures and learning reports are surfaced. It carries only data that has passed the verification standard set for the engagement." },
    { q: "Will you publish negative findings?", a: "The measurement commitments state that limitations and unintended effects are reported alongside results. A public impact ledger is only credible if it can contain findings that are inconvenient." },
    { q: "Who verifies the data?", a: "Verification arrangements are agreed with each partner before delivery and documented in the engagement protocol. The public ledger reports only data that meets that standard." },
  ],
};

const PARTNERS = {
  models: [
    { number: "01", title: "Research & evidence", text: "Commission applied policy or socio-economic research, baseline and endline studies, impact assessments, programme evaluations or evidence synthesis, published as AfriYouth Evidence Reports.", tags: ["Applied research", "Evaluations", "Evidence synthesis"] },
    { number: "02", title: "Policy & governance", text: "Work with us on policy analysis and design, regulatory review, governance diagnostics, stakeholder mapping, policy dialogue and implementation support.", tags: ["Policy analysis", "Governance", "Policy dialogue"] },
    { number: "03", title: "Innovation & venture support", text: "Support young innovators through human-centered design, prototyping, market validation, incubation, acceleration and investor readiness — including the AfriYouth Innovation Accelerator.", tags: ["Human-centered design", "Incubation", "Investor readiness"] },
    { number: "04", title: "Foresight & futures", text: "Commission scenario planning, horizon scanning, future-of-work studies or 2030–2050 scenarios for strategy, policy or programme design.", tags: ["Scenarios", "Horizon scanning", "Africa 2050"] },
    { number: "05", title: "Leadership, learning & funding readiness", text: "Build employability programmes, professional competency frameworks and learning systems — or prepare a funding strategy, proposal, business case or due-diligence pack.", tags: ["Employability", "Professional learning", "Funding readiness"] },
  ],
  audiences: [
    "Universities, think tanks and research institutes",
    "Public agencies and policymakers",
    "Funders and philanthropic organizations",
    "Civil society, youth networks and youth-led ventures",
    "Enterprises, incubators and innovation hubs",
  ],
  process: [
    { number: "01", title: "Conversation", text: "A structured discussion about the question, context and decision you need to inform." },
    { number: "02", title: "Scope", text: "A written outline of approach, team, timeline and what success would look like — with assumptions stated." },
    { number: "03", title: "Team & protocol", text: "Agreement on governance, ethics, data protection and the roles each partner will hold." },
    { number: "04", title: "Delivery", text: "Collaborative work with regular check-ins, visible decisions and no surprise outputs." },
    { number: "05", title: "Uptake & learning", text: "A deliberate plan for how findings travel, who acts on them, and what is learned together." },
  ],
  questions: [
    "What decision are we trying to inform?",
    "Who needs to own the result for it to last?",
    "Whose experience is missing from the current framing?",
    "What would success look like from the outside?",
    "What are we choosing not to measure, and why?",
  ],
  faqs: [
    { q: "What happens in a first conversation?", a: "A structured discussion about the decision you need to inform, the people affected and the constraints you are working within. It is a scoping conversation, not a pitch, and no engagement is assumed." },
    { q: "Do we need a fully formed brief?", a: "No. Most useful work begins before the brief exists. We can help frame the question, identify what evidence is needed and agree what would count as progress before committing to a method." },
    { q: "Can you work with funders and public agencies?", a: "The practice is designed for research institutes, public agencies, funders, civil society, youth networks, youth-led ventures and enterprises. Partnerships are named with permission." },
    { q: "Are any current partnerships listed?", a: "Partnerships are published with permission. Where a relationship is confidential, it is not named." },
    { q: "How are ethics and data protection handled?", a: "Governance, ethics and data protection arrangements are agreed before delivery and documented in the engagement protocol." },
  ],
};

const PROGRAM_CATEGORIES = [
  "All opportunities",
  "Accelerators & cohorts",
  "Research calls",
  "Innovation challenges",
  "Academies & training",
  "Venture & funding support",
];

const FOOTER_GROUPS = [
  { title: "Institution", links: ["About", "What We Do", "Impact", "Insights"] },
  { title: "Opportunities", links: ["Programs", "Get Involved", "Career & professional development", "Innovation & venture lab"] },
  { title: "Work with us", links: ["Partner With Us", "Contact", "Research & evidence", "Policy & governance"] },
];

const NAV_LINKS = ["About", "What We Do", "Programs", "Insights", "Impact"];

const TICKER = [
  "Research with rigour",
  "Policy with evidence",
  "Design with people",
  "Enterprise with ownership",
  "Foresight with intent",
  "Impact measured honestly",
];

const GET_INVOLVED_FAQS = [
  { q: "Are applications open right now?", a: "Calls open at different points in the year. When a call opens it appears on the Programs page with eligibility, deadline, format and a direct application route." },
  { q: "What can I register interest in?", a: "You can register interest in the Innovation & Venture Lab, Research & Evidence Lab, Policy & Governance Lab, Policy Innovation Challenge, Strategic Foresight & Futures Lab, Career & Professional Development Academy, Impact & Learning Services or funding and investment readiness." },
  { q: "Do you accept unsolicited research proposals?", a: "Yes. Share the question, the context and the decision you want to inform through the contact or partnership route." },
  { q: "Will I receive a response?", a: "We review every enquiry and respond to the contact address you provide." },
];

const CONTACT_FAQS = [
  { q: "How do I contact AfriYouth?", a: "Use the contact form on this page. Direct email, telephone and office details are published as they are confirmed." },
  { q: "What happens when I submit the form?", a: "The form opens a pre-addressed email draft in your mail client. You can review the message and send it yourself; nothing leaves your device until you do." },
  { q: "Where is the organization based?", a: "AfriYouth works across Africa. Office and telephone details are published here once they are confirmed." },
  { q: "How do I report an accessibility issue?", a: "Use the contact form and select Accessibility feedback. We use those reports to correct the issue and improve the site." },
];

const PAGE_META = {
  home: { title: "Home", eyebrow: "Research · Policy · Design · Enterprise · Foresight · Leadership" },
  about: { chapter: "01", eyebrow: "About the firm", title: "A research, innovation and policy consulting firm.", intro: SITE.positioning, meta: [["Focus", "Research, innovation & policy"], ["Structure", "Five divisions"], ["Cross-cutting", "Impact & funding"]] },
  what: { chapter: "02", eyebrow: "What we do", title: "Five divisions. One connected practice.", intro: "AfriYouth is a research, innovation and policy consulting firm. Research & Evidence, Policy & Governance, Innovation & Entrepreneurship, Foresight & Futures and Leadership & Capacity Building are organised as five divisions, with impact and funding readiness as cross-cutting services.", meta: [["Divisions", "05"], ["Practices", "08"], ["Model", "Evidence-to-Impact"]] },
  programs: { chapter: "03", eyebrow: "Programs & opportunities", title: "The opportunity board.", intro: "Calls for the AfriYouth Innovation Accelerator, Policy Innovation Challenge, research programme, academies and venture support are published here with eligibility, deadline, format and a direct application route.", meta: [["Open calls", "00"], ["Calls open", "Throughout the year"], ["Listing basis", "Verified"]] },
  insights: { chapter: "04", eyebrow: "Insights", title: "Thinking in public.", intro: "Essays and field notes on evidence, policy, design, enterprise, foresight and the discipline of measuring what matters. Official series — AfriYouth Evidence Reports, the Policy Solutions Series, the Africa 2050 Futures Series and learning reports — are published here as they are released.", meta: [["Editorial", "06 essays"], ["Series", "Four"], ["Edition", "AfriYouth perspective"]] },
  impact: { chapter: "05", eyebrow: "Impact & accountability", title: "What changes, and how we would know.", intro: IMPACT.intro, meta: [["Dimensions", "04"], ["Baselines", "Per engagement"], ["Ledger", "Public"]] },
  involved: { chapter: "06", eyebrow: "Get involved", title: "Start where your curiosity is strongest.", intro: "AfriYouth works with young innovators, researchers, designers, policy thinkers and venture builders — and with the institutions that want to make their work possible. Calls open through the year; you can register your interest at any time.", meta: [["Open calls", "00"], ["Routes", "03"], ["Register interest", "Any time"]] },
  partner: { chapter: "07", eyebrow: "Partner with us", title: "A partner for the whole question.", intro: "Commission applied research, policy and governance work, innovation and venture support, foresight, professional learning, funding readiness or impact and learning services from one connected team — or start with the part that is most useful now.", meta: [["Models", "05"], ["Audiences", "05"], ["Process", "05 steps"]] },
  contact: { chapter: "08", eyebrow: "Contact", title: "Start a conversation.", intro: "Tell us what you are working on. Every enquiry reaches the team through a pre-addressed email draft, and partnership questions can start with the decision you need to inform.", meta: [["Email", "Enquiry form"], ["Telephone", "On request"], ["Office", "On request"]] },
  notfound: { eyebrow: "Error 404", title: "This page is off the map.", intro: "The route may have changed, or the page may have moved. The links below lead back to the work." },
};

const ARTICLE = INSIGHTS[0];
