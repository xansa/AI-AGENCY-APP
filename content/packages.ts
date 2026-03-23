export interface Package {
  id: string;
  name: string;
  tagline: string;
  forWho: string;
  services: string[];
  highlighted?: boolean;

  // ── Maandelijks (retainer) model ──
  deliverables: string[];
  duration: string;
  setupInvestment: string;
  monthlyInvestment: string;
  investment: string;
  kpis: string[];

  // ── Eenmalig (project) model ──
  onetimePrice: string;
  onetimeDeliverables: string[];
  onetimeNote: string;
}

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "De basis voor jouw digitale aanwezigheid",
    forWho: "ZZP'ers en kleine MKB-bedrijven",
    services: ["Websites & Webshops", "SEO & Content"],
    highlighted: false,

    // Maandelijks
    deliverables: [
      "Professionele website (design + development)",
      "Basis SEO-optimalisatie & keyword research",
      "SSL-certificaat & beveiliging",
      "Hosting & maandelijks onderhoud",
      "Maandelijkse content updates (tot 4 per maand)",
      "Maandelijkse performance rapportage",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    setupInvestment: "\u20AC2.000 \u2013 \u20AC3.000",
    monthlyInvestment: "\u20AC325 \u2013 \u20AC550 / maand",
    investment: "Vanaf \u20AC2.000 eenmalig + \u20AC325/mnd",
    kpis: [
      "Website verkeer",
      "Google rankings",
      "Laadsnelheid",
      "Organisch bereik",
    ],

    // Eenmalig
    onetimePrice: "\u20AC1.800 \u2013 \u20AC3.500",
    onetimeDeliverables: [
      "Professionele website (5\u201310 pagina\u2019s)",
      "Responsive design (mobiel + desktop)",
      "Basis SEO-optimalisatie & metadata",
      "SSL-certificaat & beveiliging",
      "3 social media templates",
      "Overdracht & documentatie",
    ],
    onetimeNote:
      "Eenmalige oplevering in 2\u20134 weken. Hosting en onderhoud kun je optioneel bijboeken.",
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Een complete digitale ervaring die converteert",
    forWho:
      "Groeiende MKB-bedrijven die meer uit hun online aanwezigheid willen halen",
    services: [
      "Websites & Webshops",
      "SEO & Content",
      "AI Chatbots & Automatisering",
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
      "CRO-audit & optimalisatie",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    setupInvestment: "\u20AC5.000 \u2013 \u20AC7.500",
    monthlyInvestment: "\u20AC1.350 \u2013 \u20AC2.050 / maand",
    investment: "Vanaf \u20AC5.000 eenmalig + \u20AC1.350/mnd",
    kpis: [
      "Conversieratio",
      "Aantal leads",
      "Engagement rate",
      "Merkconsistentie",
    ],

    // Eenmalig
    onetimePrice: "\u20AC5.500 \u2013 \u20AC9.000",
    onetimeDeliverables: [
      "Custom website met animaties (10\u201320 pagina\u2019s)",
      "AI-chatbot ge\u00EFntegreerd op website",
      "Brand identity (logo, kleuren, typografie)",
      "5 social media templates",
      "Basis CRO-audit met aanbevelingen",
      "Overdracht & documentatie",
    ],
    onetimeNote:
      "Eenmalige oplevering in 4\u20136 weken. Content en strategie kun je optioneel bijboeken.",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Jouw volledige digitale afdeling, uitbesteed",
    forWho:
      "Gevestigde MKB-bedrijven en scale-ups die alles uit handen willen geven",
    services: [
      "Websites & Webshops",
      "SEO & Content",
      "AI Chatbots & Automatisering",
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
    ],
    duration: "Minimaal 6 maanden, daarna per kwartaal opzegbaar",
    setupInvestment: "\u20AC11.500 \u2013 \u20AC17.000",
    monthlyInvestment: "\u20AC3.000 \u2013 \u20AC4.750 / maand",
    investment: "Vanaf \u20AC11.500 eenmalig + \u20AC3.000/mnd",
    kpis: [
      "Omzetgroei",
      "Tijdsbesparing",
      "Pipeline waarde",
      "Marketing ROI",
      "Klanttevredenheid",
    ],

    // Eenmalig
    onetimePrice: "\u20AC14.000 \u2013 \u20AC25.000",
    onetimeDeliverables: [
      "Alles uit Professional eenmalig",
      "Custom KPI-dashboard (tot 3 views)",
      "CRM-integratie & basis automatisering",
      "Lead generation funnel opzet",
      "Data pipeline & API-koppelingen",
      "Training & documentatie (2 sessies)",
    ],
    onetimeNote:
      "Eenmalige oplevering in 6\u201310 weken. Ongoing support en optimalisatie apart beschikbaar.",
  },
];
