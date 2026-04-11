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
    slug: "display-pallets-niche-seo",
    client: "Display-pallets.nl",
    industry: "Pallethandel",
    industry_en: "Pallet trade",
    package: "Starter",
    challenge:
      "Display-pallets.nl wilde zich als nichespeler onderscheiden in een markt die gedomineerd wordt door grote, generieke palletleveranciers. Er was geen online zichtbaarheid en outreach naar potentiele klanten gebeurde volledig handmatig.",
    challenge_en:
      "Display-pallets.nl wanted to stand out as a niche player in a market dominated by large, generic pallet suppliers. There was no online visibility and outreach to potential clients was entirely manual.",
    approach:
      "Niche-website gebouwd rondom display pallets met gerichte SEO-content, geautomatiseerde outreach-campagnes naar relevante sectoren zoals retail en fulfillment, technische SEO en blogcontent voor long-tail zoekwoorden.",
    approach_en:
      "Niche website built around display pallets with targeted SEO content, automated outreach campaigns to relevant sectors like retail and fulfillment, technical SEO and blog content for long-tail keywords.",
    results: [
      {
        metric: "Vindbaarheid",
        metric_en: "Visibility",
        value: "Pagina 1",
        description: "Voor niche-zoektermen zoals 'display pallet kopen'",
        description_en: "For niche search terms like 'display pallet kopen'",
      },
      {
        metric: "Outreach",
        metric_en: "Outreach",
        value: "Geautomatiseerd",
        description: "Van handmatig bellen naar geautomatiseerde e-mailcampagnes",
        description_en: "From manual calling to automated email campaigns",
      },
      {
        metric: "Aanvragen",
        metric_en: "Inquiries",
        value: "+200%",
        description: "Meer gerichte aanvragen via de nichewebsite",
        description_en: "More targeted inquiries through the niche website",
      },
    ],
    testimonial: {
      quote:
        "We waren onzichtbaar in een niche waar niemand specifiek op adverteert. Arka heeft ons een website en geautomatiseerde outreach gegeven waarmee we nu de eerste zijn die gevonden wordt voor display pallets.",
      quote_en:
        "We were invisible in a niche where nobody specifically advertises. Arka gave us a website and automated outreach that now makes us the first to be found for display pallets.",
      author: "Marta Nowak",
      role: "Display-pallets.nl",
      role_en: "Display-pallets.nl",
    },
    duration: "1 maand",
    duration_en: "1 month",
  },
  {
    slug: "palletleverancier-digitalisering",
    client: "De Palletleverancier BV",
    industry: "Pallethandel",
    industry_en: "Pallet trade",
    package: "Professional",
    challenge:
      "De Palletleverancier draaide volledig op handmatige processen: telefonische acquisitie, offertes via e-mail heen en weer, geen online aanwezigheid en nul vindbaarheid op Google.",
    challenge_en:
      "De Palletleverancier ran entirely on manual processes: phone-based acquisition, back-and-forth email quotes, no online presence and zero Google visibility.",
    approach:
      "Volledige digitalisering: professionele website met SEO-optimalisatie, geautomatiseerde lead generation en outreach via e-mail, procesautomatisering voor offertes en klantopvolging, LinkedIn-strategie voor zichtbaarheid in de sector.",
    approach_en:
      "Full digitalization: professional website with SEO optimization, automated lead generation and email outreach, process automation for quotes and client follow-up, LinkedIn strategy for industry visibility.",
    results: [
      {
        metric: "Nieuwe klanten",
        metric_en: "New clients",
        value: "3",
        description: "Nieuwe klanten binnen de eerste weken na livegang",
        description_en: "New clients within the first weeks after launch",
      },
      {
        metric: "SEO",
        metric_en: "SEO",
        value: "Top 5",
        description: "Voor 'palletleverancier' en gerelateerde zoektermen",
        description_en: "For 'palletleverancier' and related search terms",
      },
      {
        metric: "Processnelheid",
        metric_en: "Process speed",
        value: "3x sneller",
        description: "Offertes en klantopvolging volledig geautomatiseerd",
        description_en: "Quotes and client follow-up fully automated",
      },
    ],
    testimonial: {
      quote:
        "Voorheen deden we alles handmatig, van acquisitie tot offertes. Arka heeft ons bedrijf volledig gedigitaliseerd. Binnen een paar weken hadden we al 3 nieuwe klanten via de website en geautomatiseerde outreach.",
      quote_en:
        "We used to do everything manually, from acquisition to quotes. Arka fully digitalized our business. Within a few weeks we already had 3 new clients through the website and automated outreach.",
      author: "Damian Stal",
      role: "De Palletleverancier BV",
      role_en: "De Palletleverancier BV",
    },
    duration: "1 maand",
    duration_en: "1 month",
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
      author: "Justyna Kowalska",
      role: "MaasLogistics B.V.",
      role_en: "MaasLogistics B.V.",
    },
    duration: "6 maanden",
    duration_en: "6 months",
    isExample: true,
  },
];
