import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import bgrelatedhero from "@/assets/brandrelativebg.jpg"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CtaBand,
  SectionHeading,
} from "@/components/site/Primitives";
import { pillars, objectives, type Pillar } from "@/content/site";
import { slugify } from "@/lib/utils";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import subheroImg from "@/assets/subhero.jpg";
import subherorightImg from "@/assets/subheroright.jpg";
import subrelatedImg from "@/assets/subgrelated.jpg";

const faqCopy: Record<Pillar["slug"], { q: string; a: string }[]> = {
  digital: [
    {
      q: "Where should a business with no digital presence start?",
      a: "With the offer and the destination. A clear proposition and a site that converts, before any spend on channels.",
    },
    {
      q: "How long before performance marketing works?",
      a: "Expect four to eight weeks to reach reliable data, longer for considered purchases. SEO compounds over quarters, not weeks.",
    },
    {
      q: "Do you report on platform metrics?",
      a: "We report on qualified pipeline, acquisition cost and payback. Platform metrics are diagnostics, not outcomes.",
    },
  ],
  marcomm: [
    {
      q: "Is this only for large brands?",
      a: "No. A first-time founder needs positioning as much as an enterprise does — the deliverables are simply smaller.",
    },
    {
      q: "Do you work with our existing identity?",
      a: "Often yes. Many businesses need clarity and a usable system rather than a full redesign.",
    },
    {
      q: "How do brand and performance work together?",
      a: "Brand decides what the market believes. Performance decides how often they hear it. Both are planned together here.",
    },
  ],
  technology: [
    {
      q: "Can you work with our existing stack?",
      a: "Yes. Most engagements involve integrating with systems already in use rather than replacing them.",
    },
    {
      q: "How do you scope an MVP?",
      a: "By identifying the single assumption that must be proven, then building only what tests it.",
    },
    {
      q: "Where does AI actually fit?",
      a: "Where repetitive, language-heavy work exists and a human can review output. We scope it against hours saved.",
    },
  ],
};

const engagementCopy: Record<Pillar["slug"], { subtext?: string; cards: { t: string; b: string }[] }> = {
  digital: {
    subtext: "A startup finding its market and an enterprise modernising at scale need opposite advice. Pick your stage.",
    cards: [
      { t: "What it is", b: "{serviceName} work at MACROW is a planned system, not a list of tasks. The plan defines sequence, ownership and measurement." },
      { t: "Who needs it", b: "Businesses where growth depends on being found, understood or operationally faster — at any stage." },
      { t: "What we do", b: "Diagnose, prioritise, build, launch and measure. Then improve based on what the data actually shows." },
      { t: "Expected outcomes", b: "Clearer positioning, lower acquisition cost, faster delivery, and decisions supported by evidence." },
    ]
  },
  marcomm: {
    cards: [
      { t: "What it is", b: "{serviceName} work at MACROW is a planned system, not a list of tasks. The plan defines sequence, ownership and measurement." },
      { t: "Who needs it", b: "Businesses where growth depends on being found, understood or operationally faster — at any stage." },
      { t: "What we do", b: "Diagnose, prioritise, build, launch and measure. Then improve based on what the data actually shows." },
      { t: "Expected outcomes", b: "Clearer positioning, lower acquisition cost, faster delivery, and decisions supported by evidence." },
    ]
  },
  technology: {
    cards: [
      { t: "What it is", b: "{serviceName} work at MACROW focuses on building products, platforms, and automation that hold up as you grow." },
      { t: "Who needs it", b: "Businesses where operational speed, digital products, or automated systems are the primary drivers of scale." },
      { t: "What we do", b: "Diagnose bottlenecks, scope the MVP or system architecture, build it, and provide ongoing assurance." },
      { t: "Expected outcomes", b: "Faster operational delivery, robust digital products, and systems that seamlessly integrate with your workflows." },
    ]
  },
};

const serviceHeroData: Record<string, { subtitle: string; cardTitle: string; cardBody: string }> = {
  "website-strategy": {
    subtitle: "Demand.\nDistribution.\nMeasurement.",
    cardTitle: "One Connected Growth System.",
    cardBody: "A high-performing website brings demand, distribution, and measurement together in one connected system—turning the right audience, offer, and channel mix into measurable business growth."
  },
  "brand-strategy": {
    subtitle: "Clear.\nConsistent.\nCoherent.",
    cardTitle: "One Clear Story, Everywhere.",
    cardBody: "A strong brand goes beyond a logo or a campaign. We shape one clear story and express it consistently across every audience, format, and market—creating a brand that feels connected, recognisable, and purposeful."
  },
  "digital-strategy": {
    subtitle: "Unified.\nStrategic.\nMeasurable.",
    cardTitle: "One System. Smarter Growth.",
    cardBody: "Growth is no longer about managing disconnected campaigns. It's about bringing strategy, communication, and technology together through one connected system—built to create clarity, consistency, and measurable growth."
  },
  "growth-marketing": {
    subtitle: "Focus.\nMomentum.\nResults.",
    cardTitle: "Growth That Moves As One",
    cardBody: "Growth strategy works best when every effort moves in the same direction. We connect audiences, channels, content, and technology into one focused system that turns attention into action and action into measurable business growth."
  },
  "social-media-marketing": {
    subtitle: "Engage.\nAmplify.\nConvert.",
    cardTitle: "Social Growth, Built to Perform",
    cardBody: "Social media marketing works best as one connected system—not a series of disconnected posts. We unite audience demand, content distribution, and performance measurement to turn attention into engagement, engagement into action, and action into measurable growth."
  },
  "influencer-marketing": {
    subtitle: "Connect.\nInfluence.\nConvert.",
    cardTitle: "Influence That Travels Further",
    cardBody: "Influencer marketing is more than one-off creator collaborations. We connect the right voices, audiences, and platforms into one measurable system—turning trusted influence into meaningful conversations, wider reach, and real business growth."
  },
  "reputation-management": {
    subtitle: "Listen.\nProtect.\nStrengthen.",
    cardTitle: "Reputation Built Beyond Every Interaction",
    cardBody: "Reputation management is more than reacting to reviews or isolated conversations. We bring listening, response, content, and measurement into one connected system—protecting trust, shaping perception, and strengthening your brand where it matters most."
  },
  "email-marketing": {
    subtitle: "Nurture.\nPersonalise.\nConvert.",
    cardTitle: "Emails That Build Lasting Momentum",
    cardBody: "Email marketing is more than sending campaigns. We connect audience insight, personalised content, smart automation, and performance tracking into one focused system—turning inbox attention into stronger relationships, repeat engagement, and measurable growth."
  },
  "google-ads": {
    subtitle: "Capture.\nOptimise.\nScale.",
    cardTitle: "Search Intent Turned Into Growth",
    cardBody: "Google Ads is more than bidding for clicks. We unite search intent, high-performing creative, targeted distribution, and continuous optimisation into one system—turning active demand into qualified leads, conversions, and measurable growth."
  },
  "meta-ads": {
    subtitle: "Target.\nEngage.\nScale.",
    cardTitle: "Attention Turned Into Action",
    cardBody: "Meta Ads is more than boosting posts or chasing impressions. We combine precise targeting, compelling creative, strategic distribution, and real-time optimisation into one performance system—turning scrolls into clicks, clicks into conversions, and conversions into measurable growth."
  },
  "lead-generation": {
    subtitle: "Attract.\nQualify.\nConvert.",
    cardTitle: "Leads Built For Real Growth",
    cardBody: "Lead generation is more than collecting contacts. We connect targeted demand, high-converting campaigns, smart qualification, and performance tracking into one focused system—turning interest into qualified conversations, stronger pipelines, and measurable revenue."
  },
  "conversion-rate-optimization": {
    subtitle: "Analyse.\nRefine.\nConvert.",
    cardTitle: "Every Click Earns Its Place",
    cardBody: "Conversion rate optimisation is more than small website tweaks. We combine user insight, testing, experience design, and performance data into one focused system—turning more visits into meaningful actions, qualified leads, and measurable growth."
  },
  "marketing-automation": {
    subtitle: "Trigger.\nNurture.\nAccelerate.",
    cardTitle: "Smarter Journeys, Stronger Customer Momentum",
    cardBody: "Marketing automation is more than scheduling emails or setting triggers. We connect customer data, timely messaging, lead journeys, and performance insight into one intelligent system—turning every interaction into a more relevant experience and every prospect into a stronger opportunity."
  },
  "analytics-reporting": {
    subtitle: "Track.\nInterpret.\nImprove.",
    cardTitle: "Insights That Move Growth Forward",
    cardBody: "Analytics and reporting are more than dashboards and data points. We connect campaign performance, customer behaviour, and business outcomes into one clear view—turning complex data into decisions that sharpen strategy, improve performance, and accelerate growth."
  },
  "crm-journeys": {
    subtitle: "Connect.\nNurture.\nRetain.",
    cardTitle: "Relationships That Grow With Purpose",
    cardBody: "CRM journeys are more than automated follow-ups. We connect customer data, timely communication, and meaningful touchpoints into one intelligent system—turning every interaction into stronger relationships, greater loyalty, and long-term growth."
  },
  "attribution-setup": {
    subtitle: "Trace.\nCredit.\nOptimise.",
    cardTitle: "See What Truly Drives Growth",
    cardBody: "Attribution setup is more than tracking the last click. We connect every channel, campaign, and customer touchpoint into one clear view—revealing what drives conversions, where budget performs best, and how to optimise growth with confidence."
  },
  "search-engine-optimization": {
    subtitle: "Discover.\nRank.\nGrow.",
    cardTitle: "Visibility That Compounds Over Time",
    cardBody: "Search engine optimisation is more than ranking for keywords. We connect search intent, content strategy, technical performance, and ongoing measurement into one system—helping the right audiences find you, trust you, and choose you."
  },
  "local-seo": {
    subtitle: "Found.\nTrusted.\nChosen.",
    cardTitle: "Be Found Where It Matters",
    cardBody: "Local SEO is more than appearing on a map. We connect local search intent, business listings, location-focused content, and performance tracking into one system—helping nearby customers find you, trust you, and choose you first."
  },
  "international-seo": {
    subtitle: "Localise.\nExpand.\nPerform.",
    cardTitle: "Global Visibility, Built With Precision",
    cardBody: "International SEO is more than translating pages for new markets. We connect regional search intent, localised content, technical structure, and performance tracking into one system—helping your brand get found, understood, and chosen across borders."
  },
  "content-marketing": {
    subtitle: "Create.\nConnect.\nConvert.",
    cardTitle: "Content That Drives Real Growth",
    cardBody: "Content marketing that unites audience demand, strategic distribution, and performance measurement into one system—so every piece you publish works harder, reaches further, and delivers measurable results."
  }
};

export const Route = createFileRoute("/services/$serviceSlug")({
  head: ({ params }) => {
    const slug = params.serviceSlug;
    let name = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    for (const pillar of pillars) {
      for (const cap of pillar.capabilities) {
        for (const s of cap.services) {
          if (slugify(s) === slug) {
            name = s;
          }
        }
      }
    }

    return {
      meta: [
        { title: `${name} | MACROW` },
        { name: "description", content: `Expert solutions and consulting for ${name}.` },
      ],
    };
  },
  component: ServiceRoute,
});

function ServiceRoute() {
  const { serviceSlug } = Route.useParams();

  let serviceName = serviceSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  let parentPillar = pillars[0];
  let parentCapability = pillars[0].capabilities[0];

  for (const pillar of pillars) {
    for (const cap of pillar.capabilities) {
      for (const s of cap.services) {
        if (slugify(s) === serviceSlug) {
          serviceName = s;
          parentCapability = cap;
          parentPillar = pillar;
        }
      }
    }
  }

  const related = objectives.filter((o) => o.pillars.includes(parentPillar.name)).slice(0, 6);
  const faqs = faqCopy[parentPillar.slug as Pillar["slug"]];
  const engagementContent = engagementCopy[parentPillar.slug as Pillar["slug"]];
  const engagementData = engagementContent.cards.map((item) => ({
    ...item,
    b: item.b.replace("{serviceName}", serviceName),
  }));

  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    setActiveServiceIndex(0);
  }, [parentCapability.name]);

  useEffect(() => {
    if (!parentCapability.services || parentCapability.services.length === 0) return;
    const timer = setInterval(() => {
      setActiveServiceIndex((prev) => (prev + 1) % parentCapability.services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [parentCapability.services]);

  const heroCopy = serviceHeroData[serviceSlug];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0c0c0c] text-white min-h-[80vh] flex flex-col">
        {/* Background image without overlay */}
        <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${subheroImg})` }} aria-hidden />

        <div className="container-macrow relative z-10 py-16 lg:py-32 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 w-full">
            <div className="max-w-xl animate-rise">
              <p className="text-[12px] font-bold tracking-[0.15em] text-accent uppercase mb-8">
                {serviceName}
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] leading-[1.05] font-serif">
                {heroCopy ? (
                  <div className="flex flex-col">
                    {heroCopy.subtitle.split('\n').map((line, i, arr) => (
                      <span key={i} className={i === arr.length - 1 ? "block text-accent italic mt-2" : "block text-white"}>
                        {line.trim()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <>
                    <span className="block text-white">{parentPillar.name}.</span>
                    <span className="block text-accent italic mt-2">{serviceName}.</span>
                  </>
                )}
              </h1>
            </div>

            <div className="hidden lg:block relative animate-rise" style={{ animationDelay: '100ms' }}>
              <div className="bg-white text-slate-900 shadow-2xl w-[400px] absolute right-0 top-1/2 -translate-y-1/2">
                <img
                  src={subherorightImg}
                  alt="Team collaboration"
                  className="w-full h-56 object-cover"
                />
                <div className="p-8 lg:p-10">
                  <h3 className="font-serif text-[1.35rem] font-bold mb-4">
                    {heroCopy ? heroCopy.cardTitle : (serviceName.toLowerCase() === "brand strategy" ? "One Clear Story, Everywhere." : `${parentCapability.name} System.`)}
                  </h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed">
                    {heroCopy ? heroCopy.cardBody : (serviceName.toLowerCase() === "brand strategy"
                      ? "A strong brand goes beyond a logo or a campaign. We shape one clear story and express it consistently across every audience, format, and market—creating a brand that feels connected, recognisable, and purposeful."
                      : parentCapability.description)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED SERVICES SECTION */}
      <section className="py-10 lg:py-20 bg-[#d11900] text-white overflow-hidden">
        <div className="container-macrow">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            {/* Left Column */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/90 uppercase mb-4">
                Related Services
              </p>
              <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-serif leading-[1.1] mb-6">
                More in <br /> {parentCapability.name}
              </h2>
              <p className="text-white/80 max-w-sm text-sm leading-relaxed mb-12">
                Services are grouped by the job they do, so you can see how work connects instead of scrolling a flat list.
              </p>

              <div className="bg-white text-slate-900 p-10 max-w-md relative shadow-xl min-h-[300px] flex flex-col justify-center transition-all duration-500">
                <p className="text-[10px] font-bold tracking-[0.15em] text-accent uppercase mb-6">
                  {parentCapability.name}
                </p>
                <h3 className="text-3xl font-serif text-accent mb-4 font-bold">
                  {String(activeServiceIndex + 1).padStart(2, "0")}. {parentCapability.services[activeServiceIndex]}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {parentCapability.description}
                </p>
                {/* <Link to="/contact" className="mt-8 inline-flex items-center text-sm font-bold text-slate-900 hover:text-accent transition-colors group w-fit">
                  Discuss this <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link> */}
              </div>
            </div>

            {/* Right Column Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {parentCapability.services.map((s, idx) => (
                <button
                  key={s}
                  onClick={() => setActiveServiceIndex(idx)}
                  className={`border p-8 flex flex-col justify-center text-left min-h-[160px] cursor-pointer transition-all duration-300 ${activeServiceIndex === idx
                    ? "bg-white border-white scale-[1.02] shadow-xl"
                    : "border-white/30 hover:bg-white/10"
                    }`}
                >
                  <span className={`font-bold text-lg mb-2 transition-colors ${activeServiceIndex === idx ? "text-accent" : "text-white"}`}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-bold text-lg leading-tight transition-colors ${activeServiceIndex === idx ? "text-slate-900" : "text-white"}`}>
                    {s}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW AN ENGAGEMENT RUNS SECTION */}
      <section className="bg-[#990a00] py-20 lg:py-32 text-white">
        <div className="container-macrow">
          <div className="max-w-3xl mb-16">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/80 uppercase mb-4">
              How an engagement runs
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif leading-[1.1]">
              What it is, who needs it,<br />and what changes.
            </h2>
            {engagementContent.subtext && (
              <p className="mt-4 text-white/80 text-sm leading-relaxed max-w-2xl">
                {engagementContent.subtext}
              </p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {engagementData.map((item) => (
              <div key={item.t} className="border border-[#e5a07c]/40 p-8 lg:p-10 flex flex-col">
                <h4 className="font-bold text-[16px] mb-6">{item.t}</h4>
                <p className="text-[14px] text-white/80 leading-relaxed">
                  {item.b}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED OBJECTIVES SECTION */}
      <section className="relative py-20 lg:py-32 ">

        <div className="absolute inset-0 w-full bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${bgrelatedhero})` }} />

        <div className="container-macrow relative z-10">
          <div className="max-w-2xl mb-16">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-4">
              Related objectives
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif text-slate-900 leading-[1.1]">
              Start from what you<br />want to achieve
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((o, idx) => (
              <Link
                key={o.slug}
                to="/solutions/$objective"
                params={{ objective: o.slug }}
                className="bg-white border border-accent p-8 hover:shadow-xl transition-all block group"
              >
                <div className="text-[4rem] leading-none font-serif text-accent mb-6">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                  I want to {o.label.toLowerCase()}
                </h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">
                  {o.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="bg-white py-20 lg:py-32">
        <div className="container-macrow">
          <div className="max-w-4xl">
            <p className="text-[10px] font-bold tracking-[0.15em] text-slate-500 uppercase mb-4">
              Common questions about {serviceName}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif text-slate-900 mb-16">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {faqs?.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-b border-accent py-4">
                  <AccordionTrigger className="text-left text-2xl lg:text-3xl font-serif text-accent hover:no-underline [&>svg]:text-accent [&>svg]:w-6 [&>svg]:h-6 flex-row-reverse justify-end gap-6 py-4 [&>svg]:-rotate-90 data-[state=open]:[&>svg]:rotate-0">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 text-lg ml-12 pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* FREE 30-MINUTE SESSION CTA */}
      <section className="bg-[#0c0c0c] py-24">
        <div className="container-macrow flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold tracking-[0.15em] text-white/60 uppercase mb-4">
              FREE 30-MINUTE SESSION
            </p>
            <h2 className="text-4xl leading-[1.1] sm:text-5xl lg:text-[3.5rem] font-serif text-white mb-6">
              Let's build what's<br />next.
            </h2>
            <p className="text-[14px] leading-relaxed text-white/60 max-w-sm">
              Tell us where you are and what you're trying to reach. We'll tell you what we'd do first.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-accent text-white px-8 py-4 text-[14px] font-medium hover:bg-accent/90 transition-colors"
            >
              Start a conversation <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      {/* <TestimonialCarousel /> */}
    </>
  );
}

