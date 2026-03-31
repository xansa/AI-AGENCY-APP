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
    tagline: "De basis voor jouw digitale aanwezigheid",
    tagline_en: "The foundation for your digital presence",
    forWho: "ZZP'ers en kleine MKB-bedrijven",
    forWho_en: "Freelancers and small businesses",
    services: ["Websites & Webshops", "SEO & Content"],
    services_en: ["Websites & Webshops", "SEO & Content"],
    highlighted: false,

    // Maandelijks
    deliverables: [
      "Professionele website (design + development)",
      "Hosting & maandelijks onderhoud",
      "SEO-optimalisatie & keyword research",
      "Maandelijkse content updates (tot 4 per maand)",
      "Maandelijkse performance rapportage",
      "SSL-certificaat & beveiliging",
      "Prioriteit support (< 24 uur reactie)",
    ],
    deliverables_en: [
      "Professional website (design + development)",
      "Hosting & monthly maintenance",
      "SEO optimization & keyword research",
      "Monthly content updates (up to 4 per month)",
      "Monthly performance report",
      "SSL certificate & security",
      "Priority support (< 24h response)",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    duration_en: "Minimum 3 months, then monthly cancellable",
    monthlyInvestment: "Vanaf \u20AC1.000 / maand",
    investment: "Vanaf \u20AC1.000/mnd",
    investment_en: "From \u20AC1,000/mo",
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
    onetimePrice: "Vanaf \u20AC2.500",
    onetimeDeliverables: [
      "Professionele website (5\u201310 pagina\u2019s)",
      "Responsive design (mobiel + desktop)",
      "Basis SEO-optimalisatie & metadata",
      "SSL-certificaat & beveiliging",
      "3 social media templates",
      "Overdracht & documentatie",
    ],
    onetimeDeliverables_en: [
      "Professional website (5\u201310 pages)",
      "Responsive design (mobile + desktop)",
      "Basic SEO optimization & metadata",
      "SSL certificate & security",
      "3 social media templates",
      "Handover & documentation",
    ],
    onetimeNote:
      "Eenmalige oplevering in 2\u20134 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (\u20AC95/uur).",
    onetimeNote_en:
      "One-time delivery in 2\u20134 weeks. 30 days bug fixes included. Hourly rate after (\u20AC95/hr).",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Een complete digitale ervaring die converteert",
    tagline_en: "A complete digital experience that converts",
    forWho:
      "Groeiende MKB-bedrijven die meer uit hun online aanwezigheid willen halen",
    forWho_en:
      "Growing SMBs that want to get more from their online presence",
    services: [
      "Websites & Webshops",
      "SEO & Content",
      "AI Chatbots & Automatisering",
      "Branding & Design",
    ],
    services_en: [
      "Websites & Webshops",
      "SEO & Content",
      "AI Chatbots & Automation",
      "Branding & Design",
    ],
    highlighted: true,

    // Maandelijks
    deliverables: [
      "Custom website met chatbot & animaties",
      "Brand identity & huisstijl",
      "AI-gestuurde chatbot voor lead kwalificatie",
      "Maandelijks: 8 LinkedIn posts + 2 blogartikelen",
      "Maandelijkse strategie sessie",
      "CRO-audit & doorlopende optimalisatie",
      "Prioriteit support (< 12 uur reactie)",
      "Hosting & technisch beheer",
    ],
    deliverables_en: [
      "Custom website with chatbot & animations",
      "Brand identity & style guide",
      "AI-powered chatbot for lead qualification",
      "Monthly: 8 LinkedIn posts + 2 blog articles",
      "Monthly strategy session",
      "CRO audit & continuous optimization",
      "Priority support (< 12h response)",
      "Hosting & technical management",
    ],
    duration: "Minimaal 6 maanden, daarna maandelijks opzegbaar",
    duration_en: "Minimum 6 months, then monthly cancellable",
    monthlyInvestment: "Vanaf \u20AC2.750 / maand",
    investment: "Vanaf \u20AC2.750/mnd",
    investment_en: "From \u20AC2,750/mo",
    kpis: [
      "Conversieratio",
      "Aantal leads",
      "Engagement rate",
      "Merkconsistentie",
    ],
    kpis_en: [
      "Conversion rate",
      "Number of leads",
      "Engagement rate",
      "Brand consistency",
    ],

    // Eenmalig
    onetimePrice: "Vanaf \u20AC7.000",
    onetimeDeliverables: [
      "Custom website met animaties (10\u201320 pagina\u2019s)",
      "AI-chatbot ge\u00EFntegreerd op website",
      "Brand identity (logo, kleuren, typografie)",
      "5 social media templates",
      "Basis CRO-audit met aanbevelingen",
      "Overdracht & documentatie",
    ],
    onetimeDeliverables_en: [
      "Custom website with animations (10\u201320 pages)",
      "AI chatbot integrated on website",
      "Brand identity (logo, colors, typography)",
      "5 social media templates",
      "Basic CRO audit with recommendations",
      "Handover & documentation",
    ],
    onetimeNote:
      "Eenmalige oplevering in 4\u20136 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (\u20AC95/uur).",
    onetimeNote_en:
      "One-time delivery in 4\u20136 weeks. 30 days bug fixes included. Hourly rate after (\u20AC95/hr).",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Jouw volledige digitale afdeling, uitbesteed",
    tagline_en: "Your complete digital department, outsourced",
    forWho:
      "Gevestigde MKB-bedrijven en scale-ups die alles uit handen willen geven",
    forWho_en:
      "Established SMBs and scale-ups that want to outsource everything",
    services: [
      "Websites & Webshops",
      "SEO & Content",
      "AI Chatbots & Automatisering",
      "Dashboards & Data",
      "Lead Generation",
      "Branding & Design",
    ],
    services_en: [
      "Websites & Webshops",
      "SEO & Content",
      "AI Chatbots & Automation",
      "Dashboards & Data",
      "Lead Generation",
      "Branding & Design",
    ],
    highlighted: false,

    // Maandelijks
    deliverables: [
      "Alles uit Professional",
      "Custom KPI-dashboards & rapportage",
      "Lead generation campagnes (email + LinkedIn)",
      "Proces automatisering & CRM-integratie",
      "Data pipeline & API-koppelingen",
      "Dedicated accountmanager",
      "Prioriteit support (< 4 uur reactie)",
      "Maandelijkse executive rapportage",
      "Strategisch kwartaalgesprek",
    ],
    deliverables_en: [
      "Everything from Professional",
      "Custom KPI dashboards & reporting",
      "Lead generation campaigns (email + LinkedIn)",
      "Process automation & CRM integration",
      "Data pipeline & API integrations",
      "Dedicated account manager",
      "Priority support (< 4h response)",
      "Monthly executive report",
      "Quarterly strategy session",
    ],
    duration: "Minimaal 6 maanden, daarna per kwartaal opzegbaar",
    duration_en: "Minimum 6 months, then quarterly cancellable",
    monthlyInvestment: "Vanaf \u20AC5.500 / maand",
    investment: "Vanaf \u20AC5.500/mnd",
    investment_en: "From \u20AC5,500/mo",
    kpis: [
      "Omzetgroei",
      "Tijdsbesparing",
      "Pipeline waarde",
      "Marketing ROI",
      "Klanttevredenheid",
    ],
    kpis_en: [
      "Revenue growth",
      "Time savings",
      "Pipeline value",
      "Marketing ROI",
      "Customer satisfaction",
    ],

    // Eenmalig
    onetimePrice: "Vanaf \u20AC18.000",
    onetimeDeliverables: [
      "Alles uit Professional eenmalig",
      "Custom KPI-dashboard (tot 3 views)",
      "CRM-integratie & basis automatisering",
      "Lead generation funnel opzet",
      "Data pipeline & API-koppelingen",
      "Training & documentatie (2 sessies)",
    ],
    onetimeDeliverables_en: [
      "Everything from Professional one-time",
      "Custom KPI dashboard (up to 3 views)",
      "CRM integration & basic automation",
      "Lead generation funnel setup",
      "Data pipeline & API integrations",
      "Training & documentation (2 sessions)",
    ],
    onetimeNote:
      "Eenmalige oplevering in 6\u201310 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (\u20AC95/uur).",
    onetimeNote_en:
      "One-time delivery in 6\u201310 weeks. 30 days bug fixes included. Hourly rate after (\u20AC95/hr).",
  },
];
