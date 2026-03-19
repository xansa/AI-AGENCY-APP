export interface Package {
  id: string;
  name: string;
  tagline: string;
  forWho: string;
  services: string[];
  deliverables: string[];
  duration: string;
  investment: string;
  kpis: string[];
  highlighted?: boolean;
}

export const packages: Package[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "De basis voor jouw digitale aanwezigheid",
    forWho:
      "ZZP'ers en kleine MKB-bedrijven",
    services: ["Websites & Webshops", "SEO & Content"],
    deliverables: [
      "Professionele website (design + development)",
      "Hosting & maandelijks onderhoud",
      "Basis SEO-optimalisatie",
      "Maandelijkse performance rapportage",
      "Content updates (tot 4 per maand)",
      "SSL-certificaat & beveiliging",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    investment: "€800 – €1.500 / maand",
    kpis: [
      "Website verkeer",
      "Google rankings",
      "Laadsnelheid",
      "Organisch bereik",
    ],
    highlighted: false,
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
    deliverables: [
      "Custom website met chatbot & animaties",
      "AI-gestuurde chatbot voor lead kwalificatie",
      "8 LinkedIn posts + 2 blogartikelen per maand",
      "UI/UX design & brand identity",
      "Maandelijkse strategie sessie",
      "CRO-audit & optimalisatie",
    ],
    duration: "Minimaal 3 maanden, daarna maandelijks opzegbaar",
    investment: "€2.500 – €3.500 / maand",
    kpis: [
      "Conversieratio",
      "Aantal leads",
      "Engagement rate",
      "Merkconsistentie",
    ],
    highlighted: true,
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
    investment: "€4.500 – €8.000 / maand",
    kpis: [
      "Omzetgroei",
      "Tijdsbesparing",
      "Pipeline waarde",
      "Marketing ROI",
      "Klanttevredenheid",
    ],
    highlighted: false,
  },
];
