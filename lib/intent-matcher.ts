/**
 * Intent Matcher — Tier 1 chatbot routing (nul API-tokens)
 *
 * Werkwijze:
 *   1. Score elk geregistreerd intent op basis van keyword-matches in de gebruikersvraag
 *   2. Retourneer het best scorende intent boven de drempelwaarde
 *   3. Als geen enkel intent matcht → null (val terug op Claude API)
 *
 * Nieuwe intents toevoegen:
 *   Voeg een object toe aan INTENTS met `keywords` (Nederlandse termen) en `response`.
 *   Hoe meer specifieke keywords, hoe betrouwbaarder de match.
 */

export interface MatchedIntent {
  id: string;
  response: string;
  /** Optionele vervolgactie om aan de response toe te voegen */
  cta?: string;
}

interface IntentDefinition {
  id: string;
  /** Kernwoorden — minimaal één moet matchen voor een score; meer matches = hogere score */
  keywords: string[];
  /** Aanvullende woorden die de score verhogen maar niet verplicht zijn */
  boostKeywords?: string[];
  response: string;
  cta?: string;
}

// ─── Intent-definities ───────────────────────────────────────────────────────

const INTENTS: IntentDefinition[] = [
  // ── Prijs / investering ───────────────────────────────────────────────────
  {
    id: "pricing",
    keywords: [
      "prijs", "kosten", "kost", "investering", "budget", "betalen", "tarief",
      "bedrag", "duur", "goedkoop", "maandelijks", "per maand",
      "hoeveel", "pricing", "price",
    ],
    boostKeywords: ["package", "pakket", "abonnement"],
    response:
      "Arka werkt met een **eenmalige setup** + **maandelijkse retainer**:\n\n" +
      "\u2022 **Starter** \u2014 vanaf \u20AC2.000 setup + \u20AC325\u2013\u20AC550/mnd _(Websites + SEO)_\n" +
      "\u2022 **Professional** \u2014 vanaf \u20AC5.000 setup + \u20AC1.350\u2013\u20AC2.050/mnd _(+ AI Chatbots + Branding)_ Meest gekozen\n" +
      "\u2022 **Enterprise** \u2014 vanaf \u20AC11.500 setup + \u20AC3.000\u2013\u20AC4.750/mnd _(alle 6 diensten)_\n\n" +
      "De setup-investering dekt het ontwikkelwerk, de retainer is voor doorlopende diensten.\n\n" +
      "Wil je weten welk pakket het beste bij jouw situatie past?",
    cta: "Vraag een vrijblijvende offerte aan via [/offerte](/offerte) of plan een kennismakingsgesprek.",
  },

  // ── Overzicht diensten ────────────────────────────────────────────────────
  {
    id: "services-overview",
    keywords: [
      "diensten", "service", "services", "wat doen jullie", "wat doe je",
      "aanbod", "aanbieden", "helpen", "hulp", "werkzaamheden",
    ],
    boostKeywords: ["overzicht", "alle", "welke"],
    response:
      "Arka biedt **6 digitale diensten** aan:\n\n" +
      "1. **Websites & Webshops** \u2014 professionele websites die snel laden en converteren\n" +
      "2. **SEO & Content** \u2014 beter gevonden worden op Google en LinkedIn\n" +
      "3. **AI Chatbots & Automatisering** \u2014 slimmer werken met AI\n" +
      "4. **Dashboards & Data** \u2014 grip op je bedrijfsprestaties\n" +
      "5. **Lead Generation** \u2014 structureel meer kwalitatieve leads\n" +
      "6. **Branding & Design** \u2014 een merk dat blijft hangen\n\n" +
      "We bundelen deze diensten in **packages** (Starter, Professional, Enterprise). Welke uitdaging is voor jou het meest urgent?",
  },

  // ── Websites & Webshops ─────────────────────────────────────────────────
  {
    id: "service-websites",
    keywords: [
      "website", "webshop", "site", "online", "homepage",
      "webdesign", "web design", "wordpress", "shopify",
      "nieuwe website", "website laten maken",
    ],
    response:
      "**Websites & Webshops** \u2014 jouw professionele online aanwezigheid.\n\n" +
      "Arka ontwerpt en bouwt websites die er niet alleen mooi uitzien, maar ook snel laden en converteren:\n" +
      "\u2022 Responsive design voor alle apparaten\n" +
      "\u2022 CMS-integratie zodat je zelf content kunt beheren\n" +
      "\u2022 Hosting & doorlopend onderhoud\n" +
      "\u2022 Performance optimalisatie & beveiliging\n\n" +
      "Ideaal voor MKB en ZZP'ers die een professionele eerste indruk willen maken.",
    cta: "Benieuwd wat een nieuwe website voor jou kan betekenen? Plan een gratis kennismaking.",
  },

  // ── SEO & Content ───────────────────────────────────────────────────────
  {
    id: "service-seo",
    keywords: [
      "seo", "zoekmachine", "google", "gevonden worden", "zoekresultaten",
      "content", "blog", "blogartikelen", "linkedin", "vindbaarheid",
      "organisch verkeer", "keyword",
    ],
    response:
      "**SEO & Content** \u2014 word gevonden door de juiste mensen.\n\n" +
      "Arka zorgt ervoor dat jouw bedrijf online beter gevonden wordt:\n" +
      "\u2022 Technische SEO audit\n" +
      "\u2022 Keyword research\n" +
      "\u2022 Maandelijkse blogartikelen\n" +
      "\u2022 LinkedIn posts\n" +
      "\u2022 Content strategie\n\n" +
      "Resultaat: hogere Google rankings, meer organisch verkeer en thought leadership.",
  },

  // ── AI Chatbots & Automatisering ────────────────────────────────────────
  {
    id: "service-ai",
    keywords: [
      "chatbot", "ai", "automatisering", "automatiseren", "workflow",
      "crm", "handmatig", "processen", "intake", "opvolging",
      "make", "zapier", "n8n", "repetitief werk",
    ],
    response:
      "**AI Chatbots & Automatisering** \u2014 slimmer werken met AI.\n\n" +
      "Arka bouwt slimme chatbots en automatiseringen die jouw processen versnellen:\n" +
      "\u2022 Custom AI chatbot voor je website\n" +
      "\u2022 Proces automatisering\n" +
      "\u2022 CRM-koppelingen\n" +
      "\u2022 Automatische lead kwalificatie\n\n" +
      "Resultaat: 24/7 beschikbaarheid, minder handmatig werk, snellere responstijden.",
  },

  // ── Dashboards & Data ───────────────────────────────────────────────────
  {
    id: "service-dashboards",
    keywords: [
      "dashboard", "data", "rapportage", "kpi", "metrics",
      "inzicht", "analytics", "api", "integratie",
    ],
    response:
      "**Dashboards & Data** \u2014 grip op jouw bedrijfsprestaties.\n\n" +
      "Arka bouwt dashboards die je real-time inzicht geven:\n" +
      "\u2022 Custom dashboard development\n" +
      "\u2022 Data pipeline setup\n" +
      "\u2022 Real-time rapportage\n" +
      "\u2022 API-integraties\n\n" +
      "Resultaat: datagedreven beslissingen en minder tijd aan handmatige rapportages.",
  },

  // ── Lead Generation ─────────────────────────────────────────────────────
  {
    id: "service-leads",
    keywords: [
      "leads", "leadgeneratie", "lead generatie", "outbound",
      "acquisitie", "prospects", "cold email", "linkedin outreach",
      "nieuwe klanten vinden",
    ],
    response:
      "**Lead Generation** \u2014 structureel meer kwalitatieve leads.\n\n" +
      "Arka bouwt een systeem dat voorspelbaar nieuwe leads genereert:\n" +
      "\u2022 Lead funnel opzet\n" +
      "\u2022 Outbound email campagnes\n" +
      "\u2022 LinkedIn outreach\n" +
      "\u2022 CRM setup & optimalisatie\n\n" +
      "Ideaal voor B2B-bedrijven die hun acquisitie willen professionaliseren.",
  },

  // ── Branding & Design ──────────────────────────────────────────────────
  {
    id: "service-branding",
    keywords: [
      "branding", "design", "logo", "huisstijl", "visuele identiteit",
      "ui", "ux", "merk", "brand", "merkidentiteit",
    ],
    response:
      "**Branding & Design** \u2014 een merk dat blijft hangen.\n\n" +
      "Arka zorgt voor een professionele en consistente uitstraling:\n" +
      "\u2022 Logo & huisstijl\n" +
      "\u2022 Brand guidelines\n" +
      "\u2022 UI/UX design\n" +
      "\u2022 Social media templates\n\n" +
      "Resultaat: hogere merkherkenning en een professioneel imago.",
  },

  // ── Starter pakket ──────────────────────────────────────────────────────
  {
    id: "package-starter",
    keywords: ["starter", "basis pakket", "beginnen", "klein pakket", "goedkoopste"],
    boostKeywords: ["pakket", "package", "prijs"],
    response:
      "**Starter** is ons instappakket:\n\n" +
      "**Setup:** \u20AC2.000\u2013\u20AC3.000 (eenmalig)\n" +
      "**Maandelijks:** \u20AC325\u2013\u20AC550/mnd\n\n" +
      "Diensten: Websites & Webshops + SEO & Content\n" +
      "Voor wie: ZZP'ers en kleine MKB-bedrijven die hun digitale basis willen neerzetten.\n\n" +
      "Inbegrepen:\n" +
      "\u2022 Professionele website (design + development)\n" +
      "\u2022 Basis SEO-optimalisatie & keyword research\n" +
      "\u2022 Hosting & maandelijks onderhoud\n" +
      "\u2022 Maandelijkse content updates en rapportage\n\n" +
      "Minimale looptijd: 3 maanden, daarna maandelijks opzegbaar.",
    cta: "Interesse? Vraag een offerte aan via [/offerte](/offerte).",
  },

  // ── Professional pakket ─────────────────────────────────────────────────
  {
    id: "package-professional",
    keywords: ["professional", "professioneel", "meest gekozen", "populair"],
    boostKeywords: ["pakket", "package"],
    response:
      "**Professional** is ons meest gekozen pakket:\n\n" +
      "**Setup:** \u20AC5.000\u2013\u20AC7.500 (eenmalig)\n" +
      "**Maandelijks:** \u20AC1.350\u2013\u20AC2.050/mnd\n\n" +
      "Diensten: Websites & Webshops + SEO & Content + AI Chatbots & Automatisering + Branding & Design\n" +
      "Voor wie: Groeiende MKB-bedrijven.\n\n" +
      "Inbegrepen:\n" +
      "\u2022 Custom website met chatbot & animaties\n" +
      "\u2022 Brand identity & huisstijl\n" +
      "\u2022 AI-gestuurde chatbot\n" +
      "\u2022 8 LinkedIn posts + 2 blogartikelen per maand\n" +
      "\u2022 Maandelijkse strategie sessie\n\n" +
      "Minimale looptijd: 3 maanden, daarna maandelijks opzegbaar.",
    cta: "Interesse? Vraag een offerte aan via [/offerte](/offerte).",
  },

  // ── Enterprise pakket ───────────────────────────────────────────────────
  {
    id: "package-enterprise",
    keywords: ["enterprise", "groot pakket", "volledig pakket", "alles", "compleet"],
    boostKeywords: ["pakket", "package", "automatisering"],
    response:
      "**Enterprise** is ons meest complete pakket:\n\n" +
      "**Setup:** \u20AC11.500\u2013\u20AC17.000 (eenmalig)\n" +
      "**Maandelijks:** \u20AC3.000\u2013\u20AC4.750/mnd\n\n" +
      "Diensten: Alle 6 diensten\n" +
      "Voor wie: Gevestigde MKB-bedrijven en scale-ups die alles uit handen willen geven.\n\n" +
      "Extra t.o.v. Professional:\n" +
      "\u2022 Custom KPI-dashboards & rapportage\n" +
      "\u2022 Lead generation campagnes\n" +
      "\u2022 Proces automatisering & CRM-integratie\n" +
      "\u2022 Prioriteitsupport (< 4 uur reactietijd)\n\n" +
      "Minimale looptijd: 6 maanden, daarna per kwartaal opzegbaar.",
    cta: "Wil je bespreken of Enterprise de juiste fit is? Plan een kennismakingsgesprek.",
  },

  // ── Garantie / resultaten ─────────────────────────────────────────────────
  {
    id: "guarantee",
    keywords: [
      "garantie", "garanderen", "gegarandeerd", "resultaat garant", "zeker",
      "verzekerd", "wat als het niet werkt", "risico",
    ],
    response:
      "Eerlijk antwoord: **nee, ik geef geen resultaatgaranties** \u2014 en pas op voor partijen die dat wel doen.\n\n" +
      "Wat ik wel garandeer:\n" +
      "\u2022 Volledige transparantie over elke actie\n" +
      "\u2022 Regelmatige rapportages met harde data\n" +
      "\u2022 Dooroptimaliseren totdat het werkt\n" +
      "\u2022 Als het na 3 maanden echt niet de fit is \u2014 eerlijk gesprek en alles overdragen\n\n" +
      "Mijn belang is dat jij resultaten ziet. Daar werk ik het hardst voor.",
  },

  // ── Opzegtermijn / contract ───────────────────────────────────────────────
  {
    id: "contract",
    keywords: [
      "contract", "opzeggen", "opzegtermijn", "stoppen", "looptijd",
      "minimaal", "vastzitten", "jaarcontract", "maandelijks opzegbaar",
      "contractduur", "verbintenis",
    ],
    response:
      "Arka werkt met maandelijkse facturen \u2014 **geen jaarcontract, geen verborgen kosten**.\n\n" +
      "Minimale looptijden:\n" +
      "\u2022 **Starter & Professional:** 3 maanden \u2192 daarna maandelijks opzegbaar\n" +
      "\u2022 **Enterprise:** 6 maanden \u2192 daarna per kwartaal opzegbaar\n\n" +
      "De minimale periode is er zodat ik resultaten kan opbouwen \u2014 niet om je vast te houden.",
  },

  // ── Hoe snel resultaten ───────────────────────────────────────────────────
  {
    id: "timeline",
    keywords: [
      "hoe snel", "wanneer", "resultaten verwachten", "eerste resultaten",
      "tijdlijn", "doorlooptijd", "hoelang duurt", "hoe lang",
    ],
    response:
      "Realistische verwachting per dienst:\n\n" +
      "\u2022 **Website/design:** 2\u20134 weken\n" +
      "\u2022 **AI chatbot/automatisering:** 1\u20132 weken\n" +
      "\u2022 **SEO-resultaten:** 2\u20133 maanden opbouw\n" +
      "\u2022 **Dashboards:** 2\u20133 weken\n\n" +
      "Ik ben hier eerlijk over \u2014 snelle beloftes zijn onrealistisch.",
  },

  // ── Eigendom content / systemen ───────────────────────────────────────────
  {
    id: "ownership",
    keywords: [
      "eigenaar", "eigendom", "van wie", "mijn", "afhankelijk",
      "overzetten", "overdragen", "stoppen wat dan",
    ],
    response:
      "**Alles is van jou.** Zonder uitzondering.\n\n" +
      "Bij be\u00EBindiging van de samenwerking ontvang je:\n" +
      "\u2022 Alle websites, code en designs\n" +
      "\u2022 Toegang tot alle accounts en tools\n" +
      "\u2022 Alle content en data\n" +
      "\u2022 Alle gebouwde automatiseringen\n\n" +
      "Ik bouw bewust niets waar je daarna afhankelijk van mij bent.",
  },

  // ── Onboarding / starten ──────────────────────────────────────────────────
  {
    id: "onboarding",
    keywords: [
      "onboarding", "starten", "beginnen", "hoe werkt het", "eerste stap",
      "opstarten", "setup", "wanneer kunnen we beginnen",
    ],
    response:
      "Het onboardingproces verloopt soepel:\n\n" +
      "**Week 1** \u2014 Kennismakingsgesprek + strategiesessie\n" +
      "**Week 2\u20133** \u2014 Opzet en eerste oplevering\n" +
      "**Week 4** \u2014 Review, feedback en bijsturing\n\n" +
      "Jouw tijdsinvestering: **< 1 uur per week** voor feedback en goedkeuringen.",
    cta: "Klaar om te starten? Plan een kennismakingsgesprek.",
  },

  // ── Contact ───────────────────────────────────────────────────────────────
  {
    id: "contact",
    keywords: [
      "contact", "bereiken", "bellen", "mailen", "e-mail", "telefoon",
      "adres", "dordrecht", "kantoor", "bereikbaar", "spreken",
    ],
    response:
      "Je kunt Arka op de volgende manieren bereiken:\n\n" +
      "**E-mail:** arkaecom@proton.me\n" +
      "**Telefoon:** +31 6 46410986\n" +
      "**Locatie:** Dordrecht, Nederland\n\n" +
      "Of direct een afspraak inplannen:",
    cta: "[Kennismakingsgesprek plannen](https://calendly.com/arkaecom-proton/30min) \u2014 kies zelf een moment",
  },

  // ── Kennismaking ────────────────────────────────────────────────────────
  {
    id: "kennismaking",
    keywords: [
      "kennismaking", "gratis gesprek", "afspraak", "gesprek", "kennismaken",
      "calendly", "plannen", "inplannen", "demo", "call", "meeting", "bellen",
    ],
    boostKeywords: ["gratis", "vrijblijvend"],
    response:
      "Een kennismakingsgesprek duurt **30 minuten** en is volledig vrijblijvend.\n\n" +
      "In dit gesprek bespreken we:\n" +
      "\u2022 Jouw huidige situatie en grootste uitdaging\n" +
      "\u2022 Welke aanpak het meest logisch is\n" +
      "\u2022 Of er een match is \u2014 als niet, zeg ik dat eerlijk\n\n" +
      "Kies zelf een moment:",
    cta: "[Kennismakingsgesprek plannen](https://calendly.com/arkaecom-proton/30min)",
  },

  // ── Cases / klantresultaten ───────────────────────────────────────────────
  {
    id: "cases",
    keywords: [
      "case", "cases", "klanten", "resultaten", "voorbeelden", "bewijs",
      "succesverhalen", "testimonial", "referentie", "ervaring", "track record",
    ],
    response:
      "Enkele recente klantresultaten:\n\n" +
      "**Brasserie De Haven (Horeca)** \u2014 Starter pakket\n" +
      "\u2192 +285% organisch verkeer, +160% online reserveringen, top 3 Google\n\n" +
      "**Visser & Partners (Consultancy)** \u2014 Professional pakket\n" +
      "\u2192 Responstijd 24u \u2192 2 min, +75% meer leads, 15 uur/week bespaard\n\n" +
      "**MaasLogistics (Logistiek)** \u2014 Enterprise pakket\n" +
      "\u2192 +\u20AC1,8M omzetpijplijn, offertetijd 3 dgn \u2192 3 uur, real-time dashboards\n\n" +
      "Bekijk de volledige cases op [/cases](/cases).",
  },

  // ── AI & technologie ──────────────────────────────────────────────────────
  {
    id: "ai-tech",
    keywords: [
      "kunstmatige intelligentie",
      "chatgpt", "openai", "machine learning", "tooling", "technologie",
      "hoe gebruik je ai", "ai tools",
    ],
    response:
      "Arka gebruikt AI als **werktool** \u2014 niet als vervanging van strategie of menselijk oordeel.\n\n" +
      "Concreet: AI helpt bij development, content creatie, data-analyse en automatisering. " +
      "Alles wordt persoonlijk gereviewed en goedgekeurd.\n\n" +
      "De strategie, het oordeel en de klantrelatie zijn altijd menselijk.",
  },
];

// ─── Scoring engine ──────────────────────────────────────────────────────────

const MATCH_THRESHOLD = 1; // minimaal 1 keyword-match vereist

/**
 * Analyseer een gebruikersbericht en retourneer het best passende intent,
 * of null als er geen redelijke match gevonden wordt.
 */
export function matchIntent(userMessage: string): MatchedIntent | null {
  const normalized = userMessage.toLowerCase().trim();

  let bestScore = 0;
  let bestIntent: IntentDefinition | null = null;

  for (const intent of INTENTS) {
    let score = 0;

    for (const kw of intent.keywords) {
      if (normalized.includes(kw)) score += 2;
    }

    for (const kw of intent.boostKeywords ?? []) {
      if (normalized.includes(kw)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  if (bestScore < MATCH_THRESHOLD || !bestIntent) return null;

  return {
    id: bestIntent.id,
    response: bestIntent.response,
    cta: bestIntent.cta,
  };
}

/**
 * Combineer de response en CTA van een gematchet intent tot een
 * volledig antwoord klaar voor verzending.
 */
export function buildIntentResponse(intent: MatchedIntent): string {
  if (intent.cta) {
    return `${intent.response}\n\n${intent.cta}`;
  }
  return intent.response;
}
