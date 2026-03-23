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
  onboardingFee: string;
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
      "Hosting & maandelijks onderhoud",
      "SEO-optimalisatie & keyword research",
      "Maandelijkse content updates (tot 4 per maand)",
      "Maandelijkse performance rapportage",
      "SSL-certificaat & beveiliging",
      "Prioriteit support (< 24 uur reactie)",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    onboardingFee: "\u20AC500",
    monthlyInvestment: "\u20AC1.000 \u2013 \u20AC1.500 / maand",
    investment: "\u20AC500 onboarding + \u20AC1.000\u2013\u20AC1.500/mnd",
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
      "Eenmalige oplevering in 2\u20134 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (\u20AC95/uur).",
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
      "CRO-audit & doorlopende optimalisatie",
      "Prioriteit support (< 12 uur reactie)",
      "Hosting & technisch beheer",
    ],
    duration: "Minimaal 6 maanden, daarna maandelijks opzegbaar",
    onboardingFee: "\u20AC750",
    monthlyInvestment: "\u20AC2.750 \u2013 \u20AC3.500 / maand",
    investment: "\u20AC750 onboarding + \u20AC2.750\u2013\u20AC3.500/mnd",
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
      "Eenmalige oplevering in 4\u20136 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (\u20AC95/uur).",
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
      "Strategisch kwartaalgesprek",
    ],
    duration: "Minimaal 6 maanden, daarna per kwartaal opzegbaar",
    onboardingFee: "\u20AC1.000",
    monthlyInvestment: "\u20AC5.000 \u2013 \u20AC8.000 / maand",
    investment: "\u20AC1.000 onboarding + \u20AC5.000\u2013\u20AC8.000/mnd",
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
      "Eenmalige oplevering in 6\u201310 weken. 30 dagen bugfixes inbegrepen. Daarna op uurbasis (\u20AC95/uur).",
  },
];
