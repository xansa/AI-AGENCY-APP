export interface Package {
  id: string;
  name: string;
  tagline: string;
  tagline_en: string;
  forWho: string;
  forWho_en: string;
  services: string[];
  services_en: string[];
  highlighted?: boolean;

  // -- Maandelijks (retainer) model --
  deliverables: string[];
  deliverables_en: string[];
  duration: string;
  duration_en: string;
  monthlyInvestment: string;
  investment: string;
  investment_en: string;
  kpis: string[];
  kpis_en: string[];

  // -- Eenmalig (project) model --
  onetimePrice: string;
  onetimeDeliverables: string[];
  onetimeDeliverables_en: string[];
  onetimeNote: string;
  onetimeNote_en: string;
}

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Een professionele online basis die vertrouwen wekt",
    tagline_en: "A professional online foundation that builds trust",
    forWho: "ZZP'ers en starters die een professionele site nodig hebben",
    forWho_en: "Freelancers and starters who need a professional site",
    services: ["Websites & Webshops", "Branding & Design"],
    services_en: ["Websites & Webshops", "Branding & Design"],
    highlighted: false,

    // Maandelijks
    deliverables: [
      "Professionele maatwerk website (design + development)",
      "Basis-branding (logo, kleuren, typografie indien nodig)",
      "On-page SEO-basis & metadata",
      "Hosting, SSL & maandelijks onderhoud",
      "Kleine content-/pagina-updates",
      "Snelle, mobielvriendelijke site",
      "Support binnen 24 uur",
    ],
    deliverables_en: [
      "Professional custom website (design + development)",
      "Basic branding (logo, colors, typography if needed)",
      "On-page SEO basics & metadata",
      "Hosting, SSL & monthly maintenance",
      "Small content/page updates",
      "Fast, mobile-friendly site",
      "Support within 24 hours",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    duration_en: "Minimum 3 months, then monthly cancellable",
    monthlyInvestment: "Vanaf €750 / maand",
    investment: "Vanaf €750/mnd",
    investment_en: "From €750/mo",
    kpis: [
      "Website verkeer",
      "Google rankings",
      "Laadsnelheid",
      "Organisch bereik",
    ],
    kpis_en: [
      "Website traffic",
      "Google rankings",
      "Loading speed",
      "Organic reach",
    ],

    // Eenmalig
    onetimePrice: "Vanaf €2.000",
    onetimeDeliverables: [
      "Professionele website (5–10 pagina’s)",
      "Responsive design (mobiel + desktop)",
      "Basis SEO-optimalisatie & metadata",
      "SSL-certificaat & beveiliging",
      "Basis-branding indien nodig",
      "Overdracht & documentatie",
    ],
    onetimeDeliverables_en: [
      "Professional website (5–10 pages)",
      "Responsive design (mobile + desktop)",
      "Basic SEO optimization & metadata",
      "SSL certificate & security",
      "Basic branding if needed",
      "Handover & documentation",
    ],
    onetimeNote:
      "Eenmalige oplevering in 2–4 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (€95/uur).",
    onetimeNote_en:
      "One-time delivery in 2–4 weeks. 30 days bug fixes included. Hourly rate after (€95/hr).",
  },
  {
    id: "professional",
    name: "Ondernemer",
    tagline: "Gevonden worden én een voorspelbare stroom leads",
    tagline_en: "Get found and a predictable stream of leads",
    forWho:
      "Groeiende MKB-bedrijven die meer klanten uit hun online aanwezigheid willen halen",
    forWho_en:
      "Growing SMBs that want more customers from their online presence",
    services: [
      "SEO & Content",
      "Lead Generation",
      "AI Chatbots & Automatisering",
      "Websites & Webshops",
    ],
    services_en: [
      "SEO & Content",
      "Lead Generation",
      "AI Chatbots & Automation",
      "Websites & Webshops",
    ],
    highlighted: true,

    // Maandelijks
    deliverables: [
      "Alles uit Starter",
      "Doorlopende SEO & content (2–4 blogs per maand)",
      "Lead generation: cold outreach (Smartlead) of Google/social ads",
      "AI-chatbot op de site voor lead-kwalificatie",
      "Maandelijkse rapportage & KPI-dashboard",
      "Maandelijkse strategie-sessie",
      "Support binnen 12 uur",
    ],
    deliverables_en: [
      "Everything from Starter",
      "Ongoing SEO & content (2–4 blogs per month)",
      "Lead generation: cold outreach (Smartlead) or Google/social ads",
      "AI chatbot on the site for lead qualification",
      "Monthly reporting & KPI dashboard",
      "Monthly strategy session",
      "Support within 12 hours",
    ],
    duration: "Minimaal 6 maanden, daarna maandelijks opzegbaar",
    duration_en: "Minimum 6 months, then monthly cancellable",
    monthlyInvestment: "Vanaf €1.750 / maand",
    investment: "Vanaf €1.750/mnd",
    investment_en: "From €1,750/mo",
    kpis: [
      "Aantal leads",
      "Conversieratio",
      "Google rankings",
      "Kosten per lead",
    ],
    kpis_en: [
      "Number of leads",
      "Conversion rate",
      "Google rankings",
      "Cost per lead",
    ],

    // Eenmalig
    onetimePrice: "Vanaf €4.500",
    onetimeDeliverables: [
      "Custom website (10–20 pagina’s)",
      "AI-chatbot geïntegreerd op de website",
      "SEO-fundament & keyword-onderzoek",
      "Lead-funnel opzet (formulier + opvolging)",
      "Basis-branding & huisstijl",
      "Overdracht & documentatie",
    ],
    onetimeDeliverables_en: [
      "Custom website (10–20 pages)",
      "AI chatbot integrated on the website",
      "SEO foundation & keyword research",
      "Lead funnel setup (form + follow-up)",
      "Basic branding & style guide",
      "Handover & documentation",
    ],
    onetimeNote:
      "Eenmalige oplevering in 4–6 weken. 30 dagen bugfixes inbegrepen. Doorlopende leadgen werkt maandelijks.",
    onetimeNote_en:
      "One-time delivery in 4–6 weeks. 30 days bug fixes included. Ongoing lead gen runs monthly.",
  },
  {
    id: "enterprise",
    name: "Marktleider",
    tagline:
      "Het werk van meerdere mensen, voor de prijs van één maandsalaris",
    tagline_en: "The work of several people, for the price of one salary",
    forWho:
      "MKB dat een complete digitale afdeling wil, met AI die 24/7 het werk doet",
    forWho_en:
      "SMBs that want a full digital department, with AI doing the work 24/7",
    services: [
      "AI Assistent",
      "AI Chatbots & Automatisering",
      "Dashboards & Data",
      "AI-video (HeyGen)",
      "SEO & Content",
      "Lead Generation",
    ],
    services_en: [
      "AI Assistant",
      "AI Chatbots & Automation",
      "Dashboards & Data",
      "AI video (HeyGen)",
      "SEO & Content",
      "Lead Generation",
    ],
    highlighted: false,

    // Maandelijks
    deliverables: [
      "AI-assistent (Jarvis-achtig): agenda, mail, research & klantcontact 24/7",
      "Alles uit Ondernemer",
      "AI-automatisering van je bedrijfsprocessen (workflows)",
      "Uitgebreide KPI-dashboards & data-integraties",
      "Maandelijkse AI-video content (HeyGen)",
      "Vast aanspreekpunt met voorrangsservice",
      "Support binnen 4 uur",
      "Strategisch kwartaalgesprek",
    ],
    deliverables_en: [
      "AI assistant (Jarvis-like): calendar, email, research & customer contact 24/7",
      "Everything from Ondernemer",
      "AI automation of your business processes (workflows)",
      "Extensive KPI dashboards & data integrations",
      "Monthly AI video content (HeyGen)",
      "Fixed point of contact with priority service",
      "Support within 4 hours",
      "Quarterly strategy session",
    ],
    duration: "Minimaal 6 maanden, daarna per kwartaal opzegbaar",
    duration_en: "Minimum 6 months, then quarterly cancellable",
    monthlyInvestment: "Vanaf €3.500 / maand",
    investment: "Vanaf €3.500/mnd",
    investment_en: "From €3,500/mo",
    kpis: [
      "Tijdsbesparing",
      "Omzetgroei",
      "Pipeline waarde",
      "Marketing ROI",
      "Klanttevredenheid",
    ],
    kpis_en: [
      "Time savings",
      "Revenue growth",
      "Pipeline value",
      "Marketing ROI",
      "Customer satisfaction",
    ],

    // Eenmalig (setup)
    onetimePrice: "Setup vanaf €1.500",
    onetimeDeliverables: [
      "AI-assistent ingericht op jouw processen & integraties",
      "AI-automatiseringen (workflows) opgezet",
      "Custom KPI-dashboard (tot 3 views)",
      "CRM- & data-koppelingen",
      "Training & documentatie (2 sessies)",
    ],
    onetimeDeliverables_en: [
      "AI assistant configured for your processes & integrations",
      "AI automations (workflows) set up",
      "Custom KPI dashboard (up to 3 views)",
      "CRM & data integrations",
      "Training & documentation (2 sessions)",
    ],
    onetimeNote:
      "Dit is een maandelijks model: jouw complete AI-afdeling. De AI-assistent alleen al is €3–4k/mnd waard; de website, SEO, leads en dashboards krijg je erbij.",
    onetimeNote_en:
      "The AI department is a monthly model. The AI assistant alone is worth €3–4k/mo; the website, SEO, leads and dashboards come with it.",
  },
];
