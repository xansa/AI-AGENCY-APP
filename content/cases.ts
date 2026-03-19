export interface Case {
  slug: string;
  client: string;
  industry: string;
  package: string;
  challenge: string;
  approach: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  duration: string;
}

export const cases: Case[] = [
  {
    slug: "horeca-website-seo",
    client: "Brasserie De Haven",
    industry: "Horeca",
    package: "Starter",
    challenge:
      "Brasserie De Haven had een verouderde website die niet mobiel-vriendelijk was, nauwelijks vindbaar op Google en reserveringen liepen vaak mis door gebrek aan een online systeem.",
    approach:
      "Nieuwe professionele website met online reserveringssysteem, lokale SEO-optimalisatie voor Dordrecht en omgeving, maandelijkse blogartikelen over seizoensmenu's en lokale evenementen.",
    results: [
      {
        metric: "Organisch verkeer",
        value: "+285%",
        description: "Stijging in organisch websiteverkeer na 3 maanden",
      },
      {
        metric: "Reserveringen",
        value: "+160%",
        description: "Meer online reserveringen via de nieuwe website",
      },
      {
        metric: "Google positie",
        value: "Top 3",
        description: "Voor 'restaurant Dordrecht' en gerelateerde zoektermen",
      },
    ],
    testimonial: {
      quote:
        "Onze nieuwe website ziet er fantastisch uit en we merken direct het verschil. Gasten vinden ons nu makkelijk online en reserveren direct.",
      author: "Lisa Jansen",
      role: "Eigenaar, Brasserie De Haven",
    },
    duration: "3 maanden",
  },
  {
    slug: "consultancy-chatbot-automatisering",
    client: "Visser & Partners Consultancy",
    industry: "Zakelijke dienstverlening",
    package: "Professional",
    challenge:
      "Visser & Partners besteedde te veel tijd aan het beantwoorden van repetitieve vragen. Het intake-proces was volledig handmatig en leads vielen weg door trage opvolging.",
    approach:
      "AI-chatbot voor veelgestelde vragen en automatische lead kwalificatie, CRM-automatisering voor intake en opvolging, vernieuwde website met professionele branding en UI/UX design.",
    results: [
      {
        metric: "Responstijd",
        value: "24u \u2192 2 min",
        description: "Van gemiddeld een dag naar directe chatbot-respons",
      },
      {
        metric: "Leads",
        value: "+75%",
        description: "Meer gekwalificeerde leads door chatbot en betere website",
      },
      {
        metric: "Tijdsbesparing",
        value: "15 uur/week",
        description: "Minder tijd aan repetitieve vragen en handmatige intake",
      },
    ],
    testimonial: {
      quote:
        "De chatbot voelt alsof we er een extra medewerker bij hebben. En de nieuwe website geeft precies de professionele uitstraling die bij ons past.",
      author: "Robert Visser",
      role: "Managing Partner, Visser & Partners Consultancy",
    },
    duration: "4 maanden",
  },
  {
    slug: "logistiek-enterprise-digitalisering",
    client: "MaasLogistics B.V.",
    industry: "Logistiek & Transport",
    package: "Enterprise",
    challenge:
      "MaasLogistics had geen inzicht in bedrijfsprestaties, een verouderde website, geen structurele acquisitie en offertes duurden dagen door handmatige processen.",
    approach:
      "Nieuwe website met moderne uitstraling, KPI-dashboards voor real-time inzicht, lead generation campagnes via email en LinkedIn, proces automatisering voor offertes en klantcommunicatie.",
    results: [
      {
        metric: "Omzetpijplijn",
        value: "+\u20AC1,8M",
        description: "Nieuwe omzetpijplijn in het eerste half jaar",
      },
      {
        metric: "Offertetijd",
        value: "3 dgn \u2192 3 uur",
        description: "Doorlooptijd van aanvraag tot offerte verzonden",
      },
      {
        metric: "Rapportage",
        value: "Real-time",
        description: "Van maandelijkse Excel naar live KPI-dashboards",
      },
    ],
    testimonial: {
      quote:
        "Arka heeft ons bedrijf naar een ander niveau getild. We hebben eindelijk grip op onze cijfers en onze acquisitie loopt als een geoliede machine.",
      author: "Dennis van der Maas",
      role: "Directeur, MaasLogistics B.V.",
    },
    duration: "6 maanden",
  },
];
