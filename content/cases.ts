export interface CaseResult {
  metric: string;
  metric_en: string;
  value: string;
  description: string;
  description_en: string;
}

export interface Case {
  slug: string;
  client: string;
  industry: string;
  industry_en: string;
  package: string;
  challenge: string;
  challenge_en: string;
  approach: string;
  approach_en: string;
  results: CaseResult[];
  testimonial: {
    quote: string;
    quote_en: string;
    author: string;
    role: string;
    role_en: string;
  };
  duration: string;       // "Resultaten na: X maanden"
  duration_en: string;
  isExample?: boolean;
}

export const cases: Case[] = [
  {
    slug: "horeca-website-seo",
    client: "Brasserie De Haven",
    industry: "Horeca",
    industry_en: "Hospitality",
    package: "Starter",
    challenge:
      "Brasserie De Haven had een verouderde website die niet mobiel-vriendelijk was, nauwelijks vindbaar op Google en reserveringen liepen vaak mis door gebrek aan een online systeem.",
    challenge_en:
      "Brasserie De Haven had an outdated website that wasn't mobile-friendly, was barely visible on Google, and reservations were often missed due to a lack of an online system.",
    approach:
      "Nieuwe professionele website met online reserveringssysteem, lokale SEO-optimalisatie voor Dordrecht en omgeving, maandelijkse blogartikelen over seizoensmenu's en lokale evenementen.",
    approach_en:
      "New professional website with online reservation system, local SEO optimization for Dordrecht and surrounding areas, monthly blog articles about seasonal menus and local events.",
    results: [
      {
        metric: "Organisch verkeer",
        metric_en: "Organic traffic",
        value: "+285%",
        description: "Stijging in organisch websiteverkeer na 3 maanden",
        description_en: "Increase in organic website traffic after 3 months",
      },
      {
        metric: "Reserveringen",
        metric_en: "Reservations",
        value: "+160%",
        description: "Meer online reserveringen via de nieuwe website",
        description_en: "More online reservations through the new website",
      },
      {
        metric: "Google positie",
        metric_en: "Google position",
        value: "Top 3",
        description: "Voor 'restaurant Dordrecht' en gerelateerde zoektermen",
        description_en: "For 'restaurant Dordrecht' and related search terms",
      },
    ],
    testimonial: {
      quote:
        "Onze nieuwe website ziet er fantastisch uit en we merken direct het verschil. Gasten vinden ons nu makkelijk online en reserveren direct.",
      quote_en:
        "Our new website looks fantastic and we immediately notice the difference. Guests now easily find us online and book directly.",
      author: "Lisa Jansen",
      role: "Eigenaar, Brasserie De Haven",
      role_en: "Owner, Brasserie De Haven",
    },
    duration: "3 maanden",
    duration_en: "3 months",
    isExample: true,
  },
  {
    slug: "consultancy-chatbot-automatisering",
    client: "Visser & Partners Consultancy",
    industry: "Zakelijke dienstverlening",
    industry_en: "Professional services",
    package: "Professional",
    challenge:
      "Visser & Partners besteedde te veel tijd aan het beantwoorden van repetitieve vragen. Het intake-proces was volledig handmatig en leads vielen weg door trage opvolging.",
    challenge_en:
      "Visser & Partners spent too much time answering repetitive questions. The intake process was fully manual and leads were lost due to slow follow-up.",
    approach:
      "AI-chatbot voor veelgestelde vragen en automatische lead kwalificatie, CRM-automatisering voor intake en opvolging, vernieuwde website met professionele branding en UI/UX design.",
    approach_en:
      "AI chatbot for frequently asked questions and automatic lead qualification, CRM automation for intake and follow-up, redesigned website with professional branding and UI/UX design.",
    results: [
      {
        metric: "Responstijd",
        metric_en: "Response time",
        value: "24u \u2192 2 min",
        description: "Van gemiddeld een dag naar directe chatbot-respons",
        description_en: "From an average of one day to instant chatbot response",
      },
      {
        metric: "Leads",
        metric_en: "Leads",
        value: "+75%",
        description: "Meer gekwalificeerde leads door chatbot en betere website",
        description_en: "More qualified leads through chatbot and improved website",
      },
      {
        metric: "Tijdsbesparing",
        metric_en: "Time saved",
        value: "15 uur/week",
        description: "Minder tijd aan repetitieve vragen en handmatige intake",
        description_en: "Less time on repetitive questions and manual intake",
      },
    ],
    testimonial: {
      quote:
        "De chatbot voelt alsof we er een extra medewerker bij hebben. En de nieuwe website geeft precies de professionele uitstraling die bij ons past.",
      quote_en:
        "The chatbot feels like having an extra employee. And the new website gives exactly the professional look that suits us.",
      author: "Robert Visser",
      role: "Managing Partner, Visser & Partners Consultancy",
      role_en: "Managing Partner, Visser & Partners Consultancy",
    },
    duration: "4 maanden",
    duration_en: "4 months",
    isExample: true,
  },
  {
    slug: "logistiek-enterprise-digitalisering",
    client: "MaasLogistics B.V.",
    industry: "Logistiek & Transport",
    industry_en: "Logistics & Transport",
    package: "Enterprise",
    challenge:
      "MaasLogistics had geen inzicht in bedrijfsprestaties, een verouderde website, geen structurele acquisitie en offertes duurden dagen door handmatige processen.",
    challenge_en:
      "MaasLogistics had no insight into business performance, an outdated website, no structural acquisition, and quotes took days due to manual processes.",
    approach:
      "Nieuwe website met moderne uitstraling, KPI-dashboards voor real-time inzicht, lead generation campagnes via email en LinkedIn, proces automatisering voor offertes en klantcommunicatie.",
    approach_en:
      "New website with a modern look, KPI dashboards for real-time insight, lead generation campaigns via email and LinkedIn, process automation for quotes and client communication.",
    results: [
      {
        metric: "Omzetpijplijn",
        metric_en: "Revenue pipeline",
        value: "+\u20AC1,8M",
        description: "Nieuwe omzetpijplijn in het eerste half jaar",
        description_en: "New revenue pipeline in the first six months",
      },
      {
        metric: "Offertetijd",
        metric_en: "Quote time",
        value: "3 dgn \u2192 3 uur",
        description: "Doorlooptijd van aanvraag tot offerte verzonden",
        description_en: "Lead time from request to quote sent",
      },
      {
        metric: "Rapportage",
        metric_en: "Reporting",
        value: "Real-time",
        description: "Van maandelijkse Excel naar live KPI-dashboards",
        description_en: "From monthly Excel to live KPI dashboards",
      },
    ],
    testimonial: {
      quote:
        "Arka heeft ons bedrijf naar een ander niveau getild. We hebben eindelijk grip op onze cijfers en onze acquisitie loopt als een geoliede machine.",
      quote_en:
        "Arka has taken our business to another level. We finally have a grip on our numbers and our acquisition runs like a well-oiled machine.",
      author: "Dennis van der Maas",
      role: "Directeur, MaasLogistics B.V.",
      role_en: "Director, MaasLogistics B.V.",
    },
    duration: "6 maanden",
    duration_en: "6 months",
    isExample: true,
  },
];
