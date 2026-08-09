export type Pillar = {
  slug: "digital" | "marcomm" | "technology";
  name: string;
  tagline: string;
  positioning: string;
  summary: string;
  cta: string;
  capabilities: Capability[];
};

export type Capability = {
  name: string;
  description: string;
  services: string[];
};

export const pillars: Pillar[] = [
  {
    slug: "digital",
    name: "Digital",
    tagline: "360° Digital Growth",
    positioning:
      "Demand, distribution and measurement built as one system instead of disconnected campaigns.",
    summary:
      "Digital works when strategy, channels, content and data operate on the same plan. We build the plan first, then run the channels that fit your stage.",
    cta: "Talk to a Digital Growth Specialist",
    capabilities: [
      {
        name: "Strategy & Planning",
        description:
          "The market, the audience, the offer and the channel mix — decided before spend starts.",
        services: [
          "Digital Strategy",
          "Brand Strategy",
          "Website Strategy",
          "Growth Marketing",
        ],
      },
      {
        name: "Performance Marketing",
        description: "Paid acquisition managed against pipeline and revenue, not impressions.",
        services: [
          "Google Ads",
          "Meta Ads",
          "Lead Generation",
          "Conversion Rate Optimization",
        ],
      },
      {
        name: "Search",
        description: "Compounding organic visibility across markets and languages.",
        services: [
          "Search Engine Optimization",
          "Local SEO",
          "International SEO",
          "Content Marketing",
        ],
      },
      {
        name: "Audience & Community",
        description: "Presence that builds recall between buying cycles.",
        services: [
          "Social Media Marketing",
          "Influencer Marketing",
          "Reputation Management",
          "Email Marketing",
        ],
      },
      {
        name: "Lifecycle & Data",
        description: "What happens after the click decides what the click was worth.",
        services: [
          "Marketing Automation",
          "Analytics & Reporting",
          "CRM Journeys",
          "Attribution Setup",
        ],
      },
    ],
  },
  {
    slug: "marcomm",
    name: "Marcomm",
    tagline: "360° Marketing Communication",
    positioning:
      "One clear story, expressed consistently across every audience, format and market.",
    summary:
      "Marcomm is how your business is understood. We define the positioning, the identity and the creative system that carries it — then produce the work.",
    cta: "Build Your Brand",
    capabilities: [
      {
        name: "Brand",
        description: "Positioning, naming logic, identity and the rules that keep it coherent.",
        services: [
          "Brand Strategy",
          "Brand Identity",
          "Corporate Branding",
          "Employer Branding",
          "Personal Branding",
        ],
      },
      {
        name: "Creative",
        description: "Ideas built to work in market, not only in a presentation.",
        services: [
          "Creative Strategy",
          "Creative Design",
          "Campaign Development",
          "Advertising",
        ],
      },
      {
        name: "Content & Copy",
        description: "Language that explains a complex business simply.",
        services: [
          "Content Strategy",
          "Copywriting",
          "Visual Communication",
          "Presentation Design",
        ],
      },
      {
        name: "Production",
        description: "Film, motion and design output at the volume modern channels demand.",
        services: [
          "Video Production",
          "Motion Graphics",
          "Social Media Creative",
          "Packaging",
        ],
      },
      {
        name: "Corporate Communication",
        description: "Internal, product and stakeholder communication with one voice.",
        services: [
          "Corporate Communication",
          "Product Communication",
          "Influencer & Creator Campaigns",
        ],
      },
    ],
  },
  {
    slug: "technology",
    name: "Technology",
    tagline: "360° Technology Solutions",
    positioning:
      "Products, platforms and automation that hold up as the business grows.",
    summary:
      "Technology decisions are business decisions. We design and build the systems your marketing, operations and customers depend on.",
    cta: "Discuss Your Product",
    capabilities: [
      {
        name: "Product & Experience",
        description: "Interfaces designed around the decision a user is trying to make.",
        services: ["UI/UX Design", "Product Design", "MVP Development", "Design Systems"],
      },
      {
        name: "Web & Applications",
        description: "Fast, accessible, search-ready builds — from marketing sites to SaaS.",
        services: [
          "Website Development",
          "Web Applications",
          "SaaS Development",
          "Mobile Applications",
        ],
      },
      {
        name: "Business Systems",
        description: "The operational backbone: who owns what, and what runs automatically.",
        services: [
          "CRM Development",
          "ERP Solutions",
          "HRMS Solutions",
          "Business Automation",
          "Custom Software",
        ],
      },
      {
        name: "AI",
        description: "Applied where it removes real work — not as a label.",
        services: ["AI Solutions", "AI Integration", "AI Agents", "Data & Analytics"],
      },
      {
        name: "Platform & Assurance",
        description: "Infrastructure, security and support that keep it all running.",
        services: [
          "Cloud Solutions",
          "DevOps",
          "Cybersecurity",
          "API Development",
          "Technology Consulting",
          "Digital Transformation",
          "Maintenance & Support",
        ],
      },
    ],
  },
];

export const pillarBySlug = (slug: string) => pillars.find((p) => p.slug === slug);

export type Stage = {
  id: string;
  label: string;
  headline: string;
  context: string;
  recommended: string[];
};

export const stages: Stage[] = [
  {
    id: "zero",
    label: "I'm starting from zero",
    headline: "Get the foundation right once.",
    context:
      "At this stage the risk is spending before there is anything to spend on. First: a clear offer, a place to send people, and one channel that works.",
    recommended: [
      "Brand Foundation",
      "Website",
      "Digital Strategy",
      "Social Media",
      "Lead Generation",
      "Technology Setup",
    ],
  },
  {
    id: "startup",
    label: "I'm building a startup",
    headline: "Prove demand, then build depth.",
    context:
      "Speed matters more than completeness. Ship something real, put it in front of the right audience, and read the signal honestly.",
    recommended: [
      "Brand Strategy",
      "Product Design",
      "Website / MVP",
      "Performance Marketing",
      "Growth Strategy",
      "Automation",
    ],
  },
  {
    id: "growing",
    label: "I'm growing my business",
    headline: "Turn effort into a repeatable system.",
    context:
      "Growth stalls where processes are manual and attribution is unclear. The fix is usually operational, not creative.",
    recommended: [
      "Performance Marketing",
      "SEO",
      "CRM",
      "Automation",
      "Brand Growth",
      "Technology",
    ],
  },
  {
    id: "international",
    label: "I'm scaling internationally",
    headline: "One brand, many markets.",
    context:
      "New markets need localisation and infrastructure, not a translated version of the same campaign.",
    recommended: [
      "International SEO",
      "Global Branding",
      "Performance Marketing",
      "Localization",
      "Technology Infrastructure",
      "Analytics",
    ],
  },
  {
    id: "enterprise",
    label: "I'm an established enterprise",
    headline: "Modernise without breaking what works.",
    context:
      "Scale brings complexity: legacy systems, many stakeholders, fragmented data. Sequencing matters more than ambition.",
    recommended: [
      "Digital Transformation",
      "Enterprise Technology",
      "Marketing Transformation",
      "AI",
      "Automation",
      "Data & Analytics",
      "Enterprise Branding",
    ],
  },
];

export type Objective = {
  slug: string;
  label: string;
  description: string;
  services: string[];
  pillars: string[];
};

export const objectives: Objective[] = [
  {
    slug: "build-a-brand",
    label: "Build a brand",
    description: "Define what you stand for and make it recognisable everywhere.",
    services: ["Brand Strategy", "Brand Identity", "Creative Design", "Content Strategy"],
    pillars: ["Marcomm"],
  },
  {
    slug: "launch-a-business",
    label: "Launch a business",
    description: "Go from idea to something customers can actually buy.",
    services: ["Brand Foundation", "Website Development", "Digital Strategy", "Lead Generation"],
    pillars: ["Marcomm", "Technology", "Digital"],
  },
  {
    slug: "build-a-website",
    label: "Build a website",
    description: "A site built for search, speed and conversion — not just looks.",
    services: ["Website Strategy", "UI/UX Design", "Website Development", "Analytics & Reporting"],
    pillars: ["Technology", "Digital"],
  },
  {
    slug: "build-a-product",
    label: "Build a product",
    description: "Design and ship a product people can use and you can maintain.",
    services: ["Product Design", "MVP Development", "Web Applications", "SaaS Development"],
    pillars: ["Technology"],
  },
  {
    slug: "generate-leads",
    label: "Generate leads",
    description: "Predictable enquiry flow with the tracking to prove it.",
    services: ["Performance Marketing", "Conversion Rate Optimization", "SEO", "CRM Development"],
    pillars: ["Digital", "Technology"],
  },
  {
    slug: "increase-sales",
    label: "Increase sales",
    description: "Fewer leaks between interest and purchase.",
    services: ["Conversion Rate Optimization", "Marketing Automation", "Email Marketing", "Analytics & Reporting"],
    pillars: ["Digital"],
  },
  {
    slug: "improve-visibility",
    label: "Improve visibility",
    description: "Be found when your category is being searched.",
    services: ["Search Engine Optimization", "Local SEO", "Content Marketing", "Reputation Management"],
    pillars: ["Digital"],
  },
  {
    slug: "scale-marketing",
    label: "Scale marketing",
    description: "Add channels and volume without losing coherence.",
    services: ["Growth Marketing", "Creative Strategy", "Campaign Development", "Marketing Automation"],
    pillars: ["Digital", "Marcomm"],
  },
  {
    slug: "automate-my-business",
    label: "Automate my business",
    description: "Remove the manual steps that slow every team down.",
    services: ["Business Automation", "CRM Development", "Custom Software", "API Development"],
    pillars: ["Technology"],
  },
  {
    slug: "build-ai-solutions",
    label: "Build AI solutions",
    description: "Apply AI to specific, measurable work.",
    services: ["AI Solutions", "AI Integration", "AI Agents", "Data & Analytics"],
    pillars: ["Technology"],
  },
  {
    slug: "transform-digitally",
    label: "Transform digitally",
    description: "Modernise systems, data and ways of working in sequence.",
    services: ["Digital Transformation", "Technology Consulting", "Cloud Solutions", "Data & Analytics"],
    pillars: ["Technology", "Digital"],
  },
  {
    slug: "enter-new-markets",
    label: "Enter new markets",
    description: "Enter with the right positioning and the right infrastructure.",
    services: ["International SEO", "Global Branding", "Localization", "Performance Marketing"],
    pillars: ["Digital", "Marcomm"],
  },
  {
    slug: "improve-customer-experience",
    label: "Improve customer experience",
    description: "Make every touchpoint feel like the same company.",
    services: ["UI/UX Design", "Product Communication", "Marketing Automation", "Maintenance & Support"],
    pillars: ["Technology", "Marcomm"],
  },
];

export type Industry = {
  slug: string;
  name: string;
  focus: string;
  priorities: string[];
};

export const industries: Industry[] = [
  {
    slug: "saas-technology",
    name: "SaaS & Technology",
    focus: "Product-led growth, technical content and clear pricing communication.",
    priorities: ["Product Design", "SEO", "Performance Marketing", "Lifecycle Automation"],
  },
  {
    slug: "startups",
    name: "Startups",
    focus: "Fast validation with a foundation you won't have to rebuild.",
    priorities: ["Brand Foundation", "MVP Development", "Growth Strategy"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    focus: "Trust, clarity and compliant communication.",
    priorities: ["Local SEO", "Reputation Management", "Website Development"],
  },
  {
    slug: "education",
    name: "Education",
    focus: "Admissions pipelines and credible academic storytelling.",
    priorities: ["Lead Generation", "Content Marketing", "CRM Development"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    focus: "Long buying cycles, technical audiences, export markets.",
    priorities: ["International SEO", "Corporate Branding", "Business Automation"],
  },
  {
    slug: "retail",
    name: "Retail",
    focus: "Footfall, local visibility and omnichannel consistency.",
    priorities: ["Local SEO", "Social Media Marketing", "Creative Design"],
  },
  {
    slug: "d2c",
    name: "D2C",
    focus: "Contribution-margin-aware acquisition and retention.",
    priorities: ["Performance Marketing", "Conversion Rate Optimization", "Email Marketing"],
  },
  {
    slug: "finance",
    name: "Finance",
    focus: "Regulated communication with high-intent demand capture.",
    priorities: ["Brand Strategy", "SEO", "Cybersecurity"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    focus: "Project launches, enquiry quality and sales-team enablement.",
    priorities: ["Campaign Development", "Lead Generation", "CRM Development"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    focus: "Expertise made visible and easy to evaluate.",
    priorities: ["Personal Branding", "Content Strategy", "Website Development"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    focus: "Direct bookings and a brand people remember.",
    priorities: ["Social Media Creative", "Local SEO", "Website Development"],
  },
  {
    slug: "media-entertainment",
    name: "Media & Entertainment",
    focus: "Audience growth and production at channel speed.",
    priorities: ["Video Production", "Influencer Campaigns", "Analytics & Reporting"],
  },
  {
    slug: "non-profit",
    name: "Non-Profit",
    focus: "Clear cause communication and efficient donor acquisition.",
    priorities: ["Content Strategy", "Digital Strategy", "Website Development"],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    focus: "Transformation programmes across many stakeholders.",
    priorities: ["Digital Transformation", "Enterprise Technology", "Data & Analytics"],
  },
];

export const growthLoop = [
  { step: "01", name: "Understand", detail: "Business model, market, constraints, current data." },
  { step: "02", name: "Strategize", detail: "Decide the sequence and what success looks like." },
  { step: "03", name: "Build", detail: "Platforms, product, systems and creative assets." },
  { step: "04", name: "Communicate", detail: "Positioning and messaging built for the audience." },
  { step: "05", name: "Launch", detail: "Go live with tracking in place from day one." },
  { step: "06", name: "Measure", detail: "Read outcomes, not vanity metrics." },
  { step: "07", name: "Optimize", detail: "Improve what works, retire what doesn't." },
  { step: "08", name: "Scale", detail: "Add channels, markets and capacity deliberately." },
];

export const differentiators = [
  {
    title: "Integrated Thinking",
    body: "Marketing, communication and technology under one ecosystem, planned together.",
  },
  {
    title: "Business First",
    body: "We report against business outcomes rather than vanity metrics.",
  },
  {
    title: "Built for Every Stage",
    body: "From zero-stage founders to enterprise organisations, with the same standard of work.",
  },
  {
    title: "Strategy Before Execution",
    body: "We understand the problem before recommending a solution.",
  },
  {
    title: "Technology + Creativity",
    body: "Engineering discipline blended with communication and creative thinking.",
  },
  {
    title: "Global Perspective",
    body: "Based in Ahmedabad, India. Built to work with businesses across markets.",
  },
];

export const regions = [
  "India",
  "Middle East",
  "Southeast Asia",
  "Europe",
  "North America",
  "Australia",
];

export const navigation = {
  primary: [
    { label: "Digital", to: "/digital" },
    { label: "Marcomm", to: "/marcomm" },
    { label: "Technology", to: "/technology" },
    { label: "Solutions", to: "/solutions" },
    { label: "Industries", to: "/industries" },
    { label: "Insights", to: "/insights" },
    { label: "About", to: "/about" },
  ],
};