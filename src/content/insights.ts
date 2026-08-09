export type Article = {
  slug: string;
  title: string;
  category: string;
  description: string;
  readingTime: string;
  author: string;
  date: string;
  body: { heading?: string; paragraphs: string[]; list?: string[] }[];
};

export const insightCategories = [
  "Digital Marketing",
  "SEO",
  "Performance Marketing",
  "Branding",
  "Marcomm",
  "Technology",
  "AI",
  "Business Growth",
  "Entrepreneurship",
  "Web & Product",
  "Guides",
  "Glossary",
];

export const articles: Article[] = [
  {
    slug: "what-seo-actually-means",
    title: "What SEO actually means for a business",
    category: "SEO",
    description:
      "A plain explanation of search visibility: what it is, what it isn't, and when it's worth investing in.",
    readingTime: "7 min read",
    author: "MACROW Editorial",
    date: "2026-02-11",
    body: [
      {
        paragraphs: [
          "Search engine optimisation is the work of making your business the most useful answer to a question someone is already asking. That's the whole idea. Everything technical follows from it.",
          "The reason SEO matters commercially is intent. Someone searching for a solution has already decided they have a problem. You are not persuading them to care — you are showing up at the moment they do.",
        ],
      },
      {
        heading: "The three parts of SEO",
        paragraphs: [
          "Almost every SEO programme divides into three areas. Understanding them helps you judge whether a proposal is serious.",
        ],
        list: [
          "Technical: can search engines reach, read and render your pages quickly?",
          "Content: does each page answer one clear question better than the alternatives?",
          "Authority: do credible sources reference you as a legitimate answer?",
        ],
      },
      {
        heading: "When SEO is the wrong first move",
        paragraphs: [
          "If nobody is searching for what you sell yet, or your offer is still changing weekly, SEO is premature. Demand creation and direct conversation come first.",
          "SEO compounds, which also means it is slow. Businesses that need revenue within eight weeks should pair it with paid acquisition rather than depend on it.",
        ],
      },
    ],
  },
  {
    slug: "performance-marketing-explained",
    title: "Performance marketing, explained without jargon",
    category: "Performance Marketing",
    description:
      "What paid acquisition really does, which numbers matter, and how to avoid paying for the wrong outcome.",
    readingTime: "8 min read",
    author: "MACROW Editorial",
    date: "2026-01-28",
    body: [
      {
        paragraphs: [
          "Performance marketing is buying attention with a measurable outcome attached. You spend money, something happens, and you can trace the relationship between the two.",
          "The discipline is less about platforms than about deciding what outcome you are buying. Buying clicks is easy. Buying qualified pipeline is a different job.",
        ],
      },
      {
        heading: "The numbers that matter",
        paragraphs: ["Ignore most dashboard metrics. These four decide whether the programme works."],
        list: [
          "Cost per qualified lead — not cost per lead",
          "Conversion rate from lead to customer",
          "Customer acquisition cost against gross margin",
          "Payback period in months",
        ],
      },
      {
        heading: "Why creative is now the main lever",
        paragraphs: [
          "Targeting is largely automated. What still differs between advertisers is the quality and volume of creative and the clarity of the offer. That is where Marcomm and Digital meet.",
        ],
      },
    ],
  },
  {
    slug: "when-a-business-needs-a-website-rebuild",
    title: "When a business actually needs a website rebuild",
    category: "Web & Product",
    description:
      "Five honest signals that a rebuild is justified — and three cases where it isn't.",
    readingTime: "6 min read",
    author: "MACROW Editorial",
    date: "2026-01-14",
    body: [
      {
        paragraphs: [
          "Most websites are replaced because someone is bored of them. That's an expensive reason. A rebuild is justified when the current site blocks a business outcome.",
        ],
      },
      {
        heading: "Signals a rebuild is justified",
        paragraphs: [],
        list: [
          "The positioning has changed and the site describes an older business",
          "You cannot publish or edit anything without a developer",
          "Load performance is losing measurable traffic and conversions",
          "Search cannot index key pages correctly",
          "The site cannot support the markets or languages you now sell into",
        ],
      },
      {
        heading: "When to fix instead",
        paragraphs: [
          "If the issue is one funnel, one page or one tracking gap, fix that. Conversion work on an existing site is usually cheaper and faster than a rebuild, and it tells you what the rebuild should contain later.",
        ],
      },
    ],
  },
  {
    slug: "crm-and-automation-basics",
    title: "CRM and automation: what they are for",
    category: "Business Growth",
    description:
      "How a CRM changes a growing business, and the automations worth setting up first.",
    readingTime: "6 min read",
    author: "MACROW Editorial",
    date: "2025-12-19",
    body: [
      {
        paragraphs: [
          "A CRM is a shared memory. Before one exists, knowledge about customers lives in individual inboxes and heads. After it exists, the business can see its own pipeline.",
        ],
      },
      {
        heading: "The first automations to build",
        paragraphs: [],
        list: [
          "Lead capture from every source into one place",
          "Automatic assignment and response acknowledgement",
          "Follow-up reminders tied to stage, not to memory",
          "Reporting that reconciles marketing spend with closed revenue",
        ],
      },
    ],
  },
  {
    slug: "ai-for-business-where-it-helps",
    title: "AI for business: where it genuinely helps",
    category: "AI",
    description: "A practical filter for deciding which AI projects are worth funding.",
    readingTime: "7 min read",
    author: "MACROW Editorial",
    date: "2025-12-02",
    body: [
      {
        paragraphs: [
          "AI is most useful where a task is repetitive, language-heavy or judgement-light, and where being approximately right is acceptable with a human reviewing the output.",
        ],
      },
      {
        heading: "A simple filter",
        paragraphs: ["Before funding an AI project, answer these."],
        list: [
          "What specific work disappears if this succeeds?",
          "What does that work cost today, in hours or money?",
          "What happens when the output is wrong?",
          "Who reviews it, and how often?",
        ],
      },
    ],
  },
  {
    slug: "why-branding-affects-conversion",
    title: "Why branding affects conversion",
    category: "Branding",
    description:
      "Brand isn't decoration. It's the reason a stranger is willing to take the next step.",
    readingTime: "5 min read",
    author: "MACROW Editorial",
    date: "2025-11-20",
    body: [
      {
        paragraphs: [
          "Every conversion asks someone to accept risk: their money, their data, their time. Brand is the accumulated evidence that the risk is reasonable.",
          "That's why the same traffic converts differently for two businesses selling the same thing. One has been understood before; the other is being met for the first time.",
        ],
      },
      {
        heading: "What to fix first",
        paragraphs: [
          "Clarity before aesthetics. If a visitor cannot state what you do in one sentence after ten seconds, no visual system will rescue the page.",
        ],
      },
    ],
  },
  {
    slug: "digital-transformation-in-plain-language",
    title: "Digital transformation in plain language",
    category: "Technology",
    description:
      "What the phrase means when you remove the consulting vocabulary, and how programmes actually get sequenced.",
    readingTime: "9 min read",
    author: "MACROW Editorial",
    date: "2025-11-06",
    body: [
      {
        paragraphs: [
          "Digital transformation means changing how the business runs, using software as the mechanism. It is an operations project with a technology component, not the reverse.",
        ],
      },
      {
        heading: "A workable sequence",
        paragraphs: [],
        list: [
          "Map the processes that actually generate revenue",
          "Fix the data those processes depend on",
          "Replace or integrate systems one workflow at a time",
          "Automate only after the workflow is stable",
          "Measure adoption, not deployment",
        ],
      },
    ],
  },
  {
    slug: "marketing-glossary",
    title: "Marketing and technology glossary",
    category: "Glossary",
    description:
      "Short, honest definitions of the terms that appear in most proposals you'll receive.",
    readingTime: "10 min read",
    author: "MACROW Editorial",
    date: "2025-10-22",
    body: [
      {
        heading: "Marketing",
        paragraphs: [],
        list: [
          "CAC — the total cost of acquiring one paying customer",
          "LTV — the total gross profit one customer produces over time",
          "CRO — improving the percentage of visitors who take the intended action",
          "Attribution — the method used to credit revenue to channels",
        ],
      },
      {
        heading: "Technology",
        paragraphs: [],
        list: [
          "MVP — the smallest build that tests the core assumption",
          "API — a defined way for two systems to exchange data",
          "CRM — the system of record for customers and pipeline",
          "ERP — the system of record for operations and finance",
        ],
      },
    ],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  service: string;
  stage: string;
  objective: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string;
  technology: string;
  results: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "d2c-acquisition-reset",
    title: "D2C brand rebuilds acquisition around contribution margin",
    industry: "D2C",
    service: "Performance Marketing",
    stage: "Growing business",
    objective: "Increase sales",
    summary:
      "Demo case study — structure only. Replace narrative and metrics with approved client detail.",
    challenge:
      "Spend was growing faster than gross profit. Reporting measured platform ROAS, which hid discounting and shipping cost.",
    strategy:
      "Rebuild the measurement model around contribution margin per order, then rebuild the creative and offer around the products that could carry paid acquisition.",
    execution:
      "Consolidated the account structure, rebuilt creative in themed batches, and rewrote the landing experience for the top three product families.",
    technology:
      "Server-side event tracking, order-level margin reporting, and automated daily reconciliation into a single dashboard.",
    results: [
      "Placeholder result — replace with verified figure",
      "Placeholder result — replace with verified figure",
      "Placeholder result — replace with verified figure",
    ],
  },
  {
    slug: "manufacturer-export-visibility",
    title: "Manufacturer builds export visibility across three regions",
    industry: "Manufacturing",
    service: "International SEO",
    stage: "Scaling internationally",
    objective: "Enter new markets",
    summary:
      "Demo case study — structure only. Replace narrative and metrics with approved client detail.",
    challenge:
      "Technical buyers in export markets could not find product documentation, and enquiries arrived without specification detail.",
    strategy:
      "Treat documentation as the primary demand asset. Build a market-by-market content architecture with clear specification pages.",
    execution:
      "Restructured the site into product and application hierarchies, localised key pages, and connected enquiries to a qualification workflow.",
    technology:
      "Headless content structure, hreflang architecture, CRM integration with specification capture.",
    results: [
      "Placeholder result — replace with verified figure",
      "Placeholder result — replace with verified figure",
    ],
  },
  {
    slug: "saas-onboarding-redesign",
    title: "SaaS platform reduces friction from signup to first value",
    industry: "SaaS & Technology",
    service: "Product Design",
    stage: "Startup",
    objective: "Improve customer experience",
    summary:
      "Demo case study — structure only. Replace narrative and metrics with approved client detail.",
    challenge:
      "Trials started but rarely reached the moment the product proves useful.",
    strategy:
      "Define the single activation event, then remove every step that does not lead to it.",
    execution:
      "Redesigned onboarding as a guided path, rewrote in-product copy, and added lifecycle messaging tied to actual product events.",
    technology:
      "Event instrumentation, feature flags for staged rollout, automated lifecycle email triggers.",
    results: [
      "Placeholder result — replace with verified figure",
      "Placeholder result — replace with verified figure",
    ],
  },
  {
    slug: "education-admissions-pipeline",
    title: "Institution builds an accountable admissions pipeline",
    industry: "Education",
    service: "CRM & Automation",
    stage: "Established enterprise",
    objective: "Generate leads",
    summary:
      "Demo case study — structure only. Replace narrative and metrics with approved client detail.",
    challenge:
      "Enquiries arrived across six channels with no shared record, so follow-up depended on individuals.",
    strategy:
      "Centralise capture first, then automate follow-up by programme and stage.",
    execution:
      "Unified forms and call tracking, defined stage ownership, and built counsellor dashboards with daily priorities.",
    technology: "CRM implementation, automation workflows, consolidated reporting.",
    results: [
      "Placeholder result — replace with verified figure",
      "Placeholder result — replace with verified figure",
    ],
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);