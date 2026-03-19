export interface Service {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  deliverables: string[];
  results: string[];
  forWho: string;
}

export const services: Service[] = [
  {
    slug: "websites-webshops",
    title: "Websites & Webshops",
    tagline: "Jouw professionele online aanwezigheid",
    description:
      "Custom design, development en hosting van websites en webshops die er niet alleen mooi uitzien, maar ook snel laden en converteren.",
    icon: "Globe",
    deliverables: [
      "Responsive design",
      "CMS-integratie",
      "Hosting & onderhoud",
      "Performance optimalisatie",
      "SSL & beveiliging",
    ],
    results: [
      "Professionele online aanwezigheid",
      "Snelle laadtijden",
      "Mobiel-vriendelijk",
    ],
    forWho:
      "MKB en ZZP'ers die een professionele website nodig hebben.",
  },
  {
    slug: "seo-content",
    title: "SEO & Content",
    tagline: "Word gevonden door de juiste mensen",
    description:
      "Zoekmachine optimalisatie, blogartikelen en LinkedIn content die ervoor zorgen dat jouw bedrijf online beter gevonden wordt.",
    icon: "Search",
    deliverables: [
      "Technische SEO audit",
      "Keyword research",
      "Maandelijkse blogartikelen",
      "LinkedIn posts",
      "Content strategie",
    ],
    results: [
      "Hogere Google rankings",
      "Meer organisch verkeer",
      "Thought leadership",
    ],
    forWho:
      "Bedrijven die online beter gevonden willen worden.",
  },
  {
    slug: "ai-chatbots-automatisering",
    title: "AI Chatbots & Automatisering",
    tagline: "Slimmer werken met AI",
    description:
      "Slimme chatbots, workflow automatisering en AI-integraties die jouw processen versnellen en je klanten 24/7 helpen.",
    icon: "Bot",
    deliverables: [
      "Custom AI chatbot",
      "Proces automatisering",
      "CRM-koppelingen",
      "Lead kwalificatie",
    ],
    results: [
      "24/7 beschikbaarheid",
      "Minder handmatig werk",
      "Snellere responstijden",
    ],
    forWho:
      "Bedrijven die klantenservice en processen willen automatiseren.",
  },
  {
    slug: "dashboards-data",
    title: "Dashboards & Data",
    tagline: "Grip op jouw bedrijfsprestaties",
    description:
      "KPI-dashboards, rapportage en data-integraties die je inzicht geven in wat er echt speelt in je bedrijf.",
    icon: "BarChart3",
    deliverables: [
      "Custom dashboard development",
      "Data pipeline setup",
      "Real-time rapportage",
      "API-integraties",
    ],
    results: [
      "Inzicht in bedrijfsprestaties",
      "Datagedreven beslissingen",
      "Tijdsbesparing",
    ],
    forWho:
      "Bedrijven die grip willen op hun data en KPI's.",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    tagline: "Structureel meer kwalitatieve leads",
    description:
      "Outbound campagnes, funnels en CRM-optimalisatie die zorgen voor een voorspelbare stroom aan nieuwe leads.",
    icon: "Target",
    deliverables: [
      "Lead funnel opzet",
      "Outbound email campagnes",
      "LinkedIn outreach",
      "CRM setup & optimalisatie",
    ],
    results: [
      "Meer kwalitatieve leads",
      "Hogere conversie",
      "Voorspelbare pipeline",
    ],
    forWho:
      "B2B-bedrijven die structureel meer leads willen genereren.",
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    tagline: "Een merk dat blijft hangen",
    description:
      "Visuele identiteit, UI/UX design en brand guidelines die ervoor zorgen dat jouw merk professioneel en consistent overkomt.",
    icon: "Palette",
    deliverables: [
      "Logo & huisstijl",
      "Brand guidelines",
      "UI/UX design",
      "Social media templates",
    ],
    results: [
      "Professionele en consistente uitstraling",
      "Hogere merkherkenning",
    ],
    forWho:
      "Bedrijven die hun merk professioneel willen neerzetten.",
  },
];
