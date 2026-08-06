/**
 * Content voor de standalone landingspagina /ai-assistent ("AI Assistent Setup").
 *
 * Bespoke pagina buiten de services.ts-laag. Content is tweetalig (nl/en) en wordt
 * geselecteerd op locale in AiAssistentContent.tsx: `aiAssistent[locale]`.
 * Iconnamen verwijzen naar lucide-react componenten (gemapt in de client-component).
 */

export interface AiAssistentStep {
  n: string;
  title: string;
  desc: string;
}

export interface AiAssistentTier {
  name: string;
  price: string;
  priceNote: string;
  badge?: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export interface AiAssistentStat {
  value: string;
  label: string;
}

export interface AiAssistentIntegration {
  name: string;
  icon: string;
}

export interface AiAssistentCopy {
  hero: {
    overline: string;
    titleLead: string;
    titleEm: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    briefLabel: string;
    briefGreeting: string;
    briefItems: string[];
  };
  wat: {
    kicker: string;
    overline: string;
    titleLead: string;
    titleEm: string;
    body: string;
  };
  hoe: {
    kicker: string;
    overline: string;
    titleLead: string;
    titleEm: string;
    steps: AiAssistentStep[];
  };
  pricing: {
    kicker: string;
    overline: string;
    titleLead: string;
    titleEm: string;
    tiers: AiAssistentTier[];
    footnote: string;
  };
  roi: {
    kicker: string;
    overline: string;
    titleLead: string;
    titleEm: string;
    titleTail: string;
    body: string;
    stats: AiAssistentStat[];
  };
  integraties: {
    kicker: string;
    overline: string;
    titleLead: string;
    titleEm: string;
    items: AiAssistentIntegration[];
    zapier: string;
  };
  cta: {
    titleLead: string;
    titleEm: string;
    titleTail: string;
    body: string;
    button: string;
  };
}

const INTEGRATIONS: AiAssistentIntegration[] = [
  { name: "E-mail", icon: "Mail" },
  { name: "Agenda", icon: "Calendar" },
  { name: "Cloud-opslag", icon: "HardDrive" },
  { name: "CRM", icon: "Users" },
  { name: "Team-chat", icon: "MessagesSquare" },
  { name: "Projectmanagement", icon: "ListChecks" },
  { name: "Documenten", icon: "FileText" },
  { name: "Boekhouding", icon: "Calculator" },
];

const INTEGRATIONS_EN: AiAssistentIntegration[] = [
  { name: "Email", icon: "Mail" },
  { name: "Calendar", icon: "Calendar" },
  { name: "Cloud storage", icon: "HardDrive" },
  { name: "CRM", icon: "Users" },
  { name: "Team chat", icon: "MessagesSquare" },
  { name: "Project management", icon: "ListChecks" },
  { name: "Documents", icon: "FileText" },
  { name: "Accounting", icon: "Calculator" },
];

const nl: AiAssistentCopy = {
  hero: {
    overline: "AI Assistent Setup",
    titleLead: "Jouw eigen digitale assistent. Klaar",
    titleEm: "in een week",
    subtitle:
      "Wij bouwen met AI als hulpmiddel een assistent die op je bestaande tools aansluit en elke ochtend je inbox sorteert, je agenda reviewt en je dag voorbereidt. Jij houdt de controle, de assistent doet het werk.",
    primaryCta: "Plan kennismaking",
    secondaryCta: "Bekijk hoe het werkt",
    briefLabel: "Morning Brief",
    briefGreeting: "Goedemorgen. Dit staat er vandaag voor je klaar.",
    briefItems: [
      "3 mails vragen aandacht",
      "2 afspraken vandaag",
      "1 deadline deze week",
    ],
  },
  wat: {
    kicker: "01",
    overline: "Wat het is",
    titleLead: "Geen chatbot. Een",
    titleEm: "medewerker",
    body:
      "Arka bouwt met AI als hulpmiddel een digitale assistent die aansluit op de tools die je al gebruikt en dagelijks taken uitvoert: je inbox sorteren, concept-antwoorden schrijven in jouw schrijfstijl, je agenda reviewen, taken prioriteren en een morning brief genereren. Niets wordt verstuurd zonder jouw goedkeuring.",
  },
  hoe: {
    kicker: "02",
    overline: "Hoe het werkt",
    titleLead: "Van losse tools naar een werkende assistent in",
    titleEm: "vijf stappen",
    steps: [
      {
        n: "01",
        title: "Tools koppelen",
        desc: "We sluiten aan op je e-mail, agenda, CRM, boekhouding en projectmanagement.",
      },
      {
        n: "02",
        title: "Morning brief op maat",
        desc: "Een dagelijks overzicht dat data uit al je tools samenbrengt.",
      },
      {
        n: "03",
        title: "Inbox-automatisering",
        desc: "Concept-antwoorden in jouw stijl. Niets verstuurd zonder goedkeuring.",
      },
      {
        n: "04",
        title: "Schema instellen",
        desc: "Draait elke ochtend in de cloud. Je computer hoeft niet aan te staan.",
      },
      {
        n: "05",
        title: "Overdracht en training",
        desc: "Jij wordt eigenaar. Wij trainen je in het gebruik.",
      },
    ],
  },
  pricing: {
    kicker: "03",
    overline: "Investering",
    titleLead: "Eenmalig opgezet. Daarna",
    titleEm: "van jou",
    tiers: [
      {
        name: "Instap",
        price: "€1.500",
        priceNote: "eenmalig",
        features: [
          "Tot 5 tools gekoppeld",
          "Morning brief",
          "Inbox: concept-antwoorden",
          "Overdracht 30 minuten",
        ],
        cta: "Kies Instap",
        highlighted: false,
      },
      {
        name: "Professional",
        price: "€2.500",
        priceNote: "eenmalig",
        badge: "Aanbevolen",
        features: [
          "Onbeperkt tools",
          "Morning brief + taakprioritering",
          "Inbox: concepten + agenda-automatisering",
          "Custom skills (weekrapport, klantoverzicht)",
          "Overdracht 60 minuten + documentatie",
          "Optioneel: retainer €250 per maand",
        ],
        cta: "Kies Professional",
        highlighted: true,
      },
    ],
    footnote:
      "De assistent draait op je eigen account tegen lage maandkosten. Arka host niets, jij blijft eigenaar.",
  },
  roi: {
    kicker: "04",
    overline: "De rekensom",
    titleLead: "30 minuten per dag. Binnen",
    titleEm: "twee maanden",
    titleTail: "terugverdiend",
    body:
      "Een assistent die elke ochtend een half uur werk uit handen neemt, wint meer dan tien uur per maand terug. Bij een uurtarief van 75 euro is dat 825 euro aan teruggewonnen tijd, elke maand.",
    stats: [
      { value: "10+ uur", label: "per maand bespaard" },
      { value: "€825", label: "teruggewonnen per maand" },
      { value: "< 2 mnd", label: "terugverdientijd" },
    ],
  },
  integraties: {
    kicker: "05",
    overline: "Koppelingen",
    titleLead: "Werkt met de tools die je",
    titleEm: "al gebruikt",
    items: INTEGRATIONS,
    zapier: "En nog 8.000+ extra koppelingen met de tools die je al gebruikt.",
  },
  cta: {
    titleLead: "Klaar voor een assistent die met je",
    titleEm: "meewerkt",
    titleTail: "?",
    body:
      "In een gesprek van 30 minuten laten we zien wat er mogelijk is met jouw tools.",
    button: "Plan kennismaking",
  },
};

const en: AiAssistentCopy = {
  hero: {
    overline: "AI Assistant Setup",
    titleLead: "Your own digital assistant. Ready",
    titleEm: "in a week",
    subtitle:
      "Using AI as a tool, we build an assistant that plugs into your existing tools and sorts your inbox every morning, reviews your calendar and prepares your day. You stay in control, the assistant does the work.",
    primaryCta: "Book a call",
    secondaryCta: "See how it works",
    briefLabel: "Morning Brief",
    briefGreeting: "Good morning. Here is what is waiting for you today.",
    briefItems: [
      "3 emails need attention",
      "2 meetings today",
      "1 deadline this week",
    ],
  },
  wat: {
    kicker: "01",
    overline: "What it is",
    titleLead: "Not a chatbot. An",
    titleEm: "employee",
    body:
      "Using AI as a tool, Arka builds a digital assistant that plugs into the tools you already use and handles daily tasks: sorting your inbox, drafting replies in your writing style, reviewing your calendar, prioritising tasks and generating a morning brief. Nothing is sent without your approval.",
  },
  hoe: {
    kicker: "02",
    overline: "How it works",
    titleLead: "From scattered tools to a working assistant in",
    titleEm: "five steps",
    steps: [
      {
        n: "01",
        title: "Connect tools",
        desc: "We plug into your email, calendar, CRM, accounting and project management.",
      },
      {
        n: "02",
        title: "Tailored morning brief",
        desc: "A daily overview that brings together data from all your tools.",
      },
      {
        n: "03",
        title: "Inbox automation",
        desc: "Draft replies in your style. Nothing sent without approval.",
      },
      {
        n: "04",
        title: "Set the schedule",
        desc: "Runs every morning in the cloud. Your computer stays off.",
      },
      {
        n: "05",
        title: "Handover and training",
        desc: "You become the owner. We train you to use it.",
      },
    ],
  },
  pricing: {
    kicker: "03",
    overline: "Investment",
    titleLead: "Set up once. After that,",
    titleEm: "it is yours",
    tiers: [
      {
        name: "Starter",
        price: "€1,500",
        priceNote: "one-time",
        features: [
          "Up to 5 tools connected",
          "Morning brief",
          "Inbox: draft replies",
          "Handover 30 minutes",
        ],
        cta: "Choose Starter",
        highlighted: false,
      },
      {
        name: "Professional",
        price: "€2,500",
        priceNote: "one-time",
        badge: "Recommended",
        features: [
          "Unlimited tools",
          "Morning brief + task prioritisation",
          "Inbox: drafts + calendar automation",
          "Custom skills (weekly report, client overview)",
          "Handover 60 minutes + documentation",
          "Optional: retainer €250 per month",
        ],
        cta: "Choose Professional",
        highlighted: true,
      },
    ],
    footnote:
      "The assistant runs on your own account at low monthly cost. Arka hosts nothing, you stay the owner.",
  },
  roi: {
    kicker: "04",
    overline: "The math",
    titleLead: "30 minutes a day. Paid back within",
    titleEm: "two months",
    titleTail: "",
    body:
      "An assistant that takes half an hour of work off your hands every morning wins back more than ten hours a month. At an hourly rate of 75 euro that is 825 euro in reclaimed time, every month.",
    stats: [
      { value: "10+ hrs", label: "saved per month" },
      { value: "€825", label: "reclaimed per month" },
      { value: "< 2 mo", label: "payback time" },
    ],
  },
  integraties: {
    kicker: "05",
    overline: "Integrations",
    titleLead: "Works with the tools you",
    titleEm: "already use",
    items: INTEGRATIONS_EN,
    zapier: "And 8,000+ more integrations with the tools you already use.",
  },
  cta: {
    titleLead: "Ready for an assistant that works",
    titleEm: "alongside you",
    titleTail: "?",
    body:
      "In a 30-minute call we show what is possible with your tools.",
    button: "Book a call",
  },
};

export const aiAssistent: { nl: AiAssistentCopy; en: AiAssistentCopy } = { nl, en };
