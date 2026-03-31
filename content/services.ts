export interface Service {
  slug: string;
  title: string;
  title_en: string;
  tagline: string;
  tagline_en: string;
  description: string;
  description_en: string;
  icon: string;
  deliverables: string[];
  deliverables_en: string[];
  results: string[];
  results_en: string[];
  forWho: string;
  forWho_en: string;
}

export const services: Service[] = [
  {
    slug: "websites-webshops",
    title: "Websites & Webshops",
    title_en: "Websites & Webshops",
    tagline: "Jouw professionele online aanwezigheid",
    tagline_en: "Your professional online presence",
    description:
      "Custom design, development en hosting van websites en webshops die er niet alleen mooi uitzien, maar ook snel laden en converteren.",
    description_en:
      "Custom design, development and hosting of websites and webshops that not only look great, but also load fast and convert.",
    icon: "Globe",
    deliverables: [
      "Responsive design",
      "CMS-integratie",
      "Hosting & onderhoud",
      "Performance optimalisatie",
      "SSL & beveiliging",
    ],
    deliverables_en: [
      "Responsive design",
      "CMS integration",
      "Hosting & maintenance",
      "Performance optimization",
      "SSL & security",
    ],
    results: [
      "Professionele online aanwezigheid",
      "Snelle laadtijden",
      "Mobiel-vriendelijk",
    ],
    results_en: [
      "Professional online presence",
      "Fast loading times",
      "Mobile-friendly",
    ],
    forWho:
      "MKB en ZZP'ers die een professionele website nodig hebben.",
    forWho_en:
      "SMBs and freelancers who need a professional website.",
  },
  {
    slug: "seo-content",
    title: "SEO & Content",
    title_en: "SEO & Content",
    tagline: "Word gevonden door de juiste mensen",
    tagline_en: "Get found by the right people",
    description:
      "Zoekmachine optimalisatie, blogartikelen en LinkedIn content die ervoor zorgen dat jouw bedrijf online beter gevonden wordt.",
    description_en:
      "Search engine optimization, blog articles and LinkedIn content that help your business get found online.",
    icon: "Search",
    deliverables: [
      "Technische SEO audit",
      "Keyword research",
      "Maandelijkse blogartikelen",
      "LinkedIn posts",
      "Content strategie",
    ],
    deliverables_en: [
      "Technical SEO audit",
      "Keyword research",
      "Monthly blog articles",
      "LinkedIn posts",
      "Content strategy",
    ],
    results: [
      "Hogere Google rankings",
      "Meer organisch verkeer",
      "Thought leadership",
    ],
    results_en: [
      "Higher Google rankings",
      "More organic traffic",
      "Thought leadership",
    ],
    forWho:
      "Bedrijven die online beter gevonden willen worden.",
    forWho_en:
      "Businesses that want to be found more easily online.",
  },
  {
    slug: "ai-chatbots-automatisering",
    title: "AI Chatbots & Automatisering",
    title_en: "AI Chatbots & Automation",
    tagline: "Slimmer werken met AI",
    tagline_en: "Work smarter with AI",
    description:
      "Slimme chatbots, workflow automatisering en AI-integraties die jouw processen versnellen en je klanten 24/7 helpen.",
    description_en:
      "Smart chatbots, workflow automation and AI integrations that speed up your processes and help your customers 24/7.",
    icon: "Bot",
    deliverables: [
      "Custom AI chatbot",
      "Proces automatisering",
      "CRM-koppelingen",
      "Lead kwalificatie",
    ],
    deliverables_en: [
      "Custom AI chatbot",
      "Process automation",
      "CRM integrations",
      "Lead qualification",
    ],
    results: [
      "24/7 beschikbaarheid",
      "Minder handmatig werk",
      "Snellere responstijden",
    ],
    results_en: [
      "24/7 availability",
      "Less manual work",
      "Faster response times",
    ],
    forWho:
      "Bedrijven die klantenservice en processen willen automatiseren.",
    forWho_en:
      "Businesses looking to automate customer service and processes.",
  },
  {
    slug: "dashboards-data",
    title: "Dashboards & Data",
    title_en: "Dashboards & Data",
    tagline: "Grip op jouw bedrijfsprestaties",
    tagline_en: "Grip on your business performance",
    description:
      "KPI-dashboards, rapportage en data-integraties die je inzicht geven in wat er echt speelt in je bedrijf.",
    description_en:
      "KPI dashboards, reporting and data integrations that give you insight into what's really going on in your business.",
    icon: "BarChart3",
    deliverables: [
      "Custom dashboard development",
      "Data pipeline setup",
      "Real-time rapportage",
      "API-integraties",
    ],
    deliverables_en: [
      "Custom dashboard development",
      "Data pipeline setup",
      "Real-time reporting",
      "API integrations",
    ],
    results: [
      "Inzicht in bedrijfsprestaties",
      "Datagedreven beslissingen",
      "Tijdsbesparing",
    ],
    results_en: [
      "Insight into business performance",
      "Data-driven decisions",
      "Time savings",
    ],
    forWho:
      "Bedrijven die grip willen op hun data en KPI's.",
    forWho_en:
      "Businesses that want to get a grip on their data and KPIs.",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    title_en: "Lead Generation",
    tagline: "Structureel meer kwalitatieve leads",
    tagline_en: "Consistently more qualified leads",
    description:
      "Outbound campagnes, funnels en CRM-optimalisatie die zorgen voor een voorspelbare stroom aan nieuwe leads.",
    description_en:
      "Outbound campaigns, funnels and CRM optimization that ensure a predictable flow of new leads.",
    icon: "Target",
    deliverables: [
      "Lead funnel opzet",
      "Outbound email campagnes",
      "LinkedIn outreach",
      "CRM setup & optimalisatie",
    ],
    deliverables_en: [
      "Lead funnel setup",
      "Outbound email campaigns",
      "LinkedIn outreach",
      "CRM setup & optimization",
    ],
    results: [
      "Meer kwalitatieve leads",
      "Hogere conversie",
      "Voorspelbare pipeline",
    ],
    results_en: [
      "More qualified leads",
      "Higher conversion",
      "Predictable pipeline",
    ],
    forWho:
      "B2B-bedrijven die structureel meer leads willen genereren.",
    forWho_en:
      "B2B businesses looking to consistently generate more leads.",
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    title_en: "Branding & Design",
    tagline: "Een merk dat blijft hangen",
    tagline_en: "A brand that sticks",
    description:
      "Visuele identiteit, UI/UX design en brand guidelines die ervoor zorgen dat jouw merk professioneel en consistent overkomt.",
    description_en:
      "Visual identity, UI/UX design and brand guidelines that ensure your brand comes across as professional and consistent.",
    icon: "Palette",
    deliverables: [
      "Logo & huisstijl",
      "Brand guidelines",
      "UI/UX design",
      "Social media templates",
    ],
    deliverables_en: [
      "Logo & brand identity",
      "Brand guidelines",
      "UI/UX design",
      "Social media templates",
    ],
    results: [
      "Professionele en consistente uitstraling",
      "Hogere merkherkenning",
    ],
    results_en: [
      "Professional and consistent look",
      "Higher brand recognition",
    ],
    forWho:
      "Bedrijven die hun merk professioneel willen neerzetten.",
    forWho_en:
      "Businesses that want to establish a professional brand.",
  },
];
