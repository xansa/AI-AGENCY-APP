/**
 * Arka Brand Context
 *
 * Single source of truth voor alle brand-gerelateerde beslissingen:
 * social media posts, Instagram carousels, LinkedIn visuals, presentaties,
 * en alle andere visuele en tekstuele uitingen.
 *
 * Gebruik dit bestand als briefing voor elke content-creatie taak.
 */

// ─── Identiteit ───────────────────────────────────────────────────────────────

export const BRAND_IDENTITY = {
  name: "Arka",
  tagline: "Jouw digitale afdeling, zonder de overhead.",
  tagline_en: "Your digital department, without the overhead.",
  elevator: `Arka is een digitaal bureau in Dordrecht, gerund door een solo-founder.
We leveren wat normaal een heel team kost: websites, SEO, AI-chatbots, dashboards,
lead generation en branding. Alles onder een dak, direct contact, meetbare resultaten.`,
  elevator_en: `Arka is a digital agency in Dordrecht, run by a solo founder.
We deliver what normally takes a full team: websites, SEO, AI chatbots, dashboards,
lead generation and branding. Everything under one roof, direct contact, measurable results.`,
  founder: "Kaan Arslan",
  location: "Dordrecht, Nederland",
  email: "info@arkadigital.nl",
  phone: "+31 6 46140986",
  website: "https://arkadigital.nl",
  linkedin: "https://www.linkedin.com/company/arka-nl",
  kvk: "42000761",
  btw: "NL005424960B92",
} as const;

// ─── Missie & Visie ───────────────────────────────────────────────────────────

export const BRAND_MISSION = {
  missie: `MKB-bedrijven en ZZP'ers toegang geven tot enterprise-level digitale
oplossingen, zonder de overhead van een intern team of de onpersoonlijkheid
van een groot bureau.`,
  visie: `Een wereld waarin elk groeiend bedrijf een complete, professionele
digitale aanwezigheid heeft, ongeacht budget of teamgrootte.`,
  kernwaarden: [
    {
      waarde: "Directheid",
      betekenis: "Geen tussenlagen, geen account managers. Je praat met degene die het werk doet.",
    },
    {
      waarde: "Meetbaarheid",
      betekenis: "Elke actie is gekoppeld aan een concreet resultaat. Geen vage beloftes.",
    },
    {
      waarde: "Eigenaarschap",
      betekenis: "Alles wat we bouwen is van jou. Code, designs, content, data. Geen lock-in.",
    },
    {
      waarde: "Effici\u00ebntie",
      betekenis: "Slim werken met moderne tools. Meer output, minder overhead.",
    },
  ],
} as const;

// ─── Kleurenpalet ─────────────────────────────────────────────────────────────

export const BRAND_COLORS = {
  // Primaire kleuren
  primary: {
    navy: "#1E3A5F",          // Primaire merkkleur: betrouwbaar, professioneel
    navyLight: "#2A4D7A",     // Hover states, subtiele variatie
    navyDark: "#152C4A",      // Donkerdere variant voor diepte
  },
  accent: {
    blue: "#3B82F6",          // Call-to-actions, links, iconen, logo
    blueLight: "#60A5FA",     // Hover states, highlights
    blueDark: "#2563EB",      // Pressed states
  },
  cyan: {
    DEFAULT: "#06B6D4",       // Secundair accent: data, dashboards, tech-feel
    light: "#22D3EE",
    dark: "#0891B2",
  },

  // Achtergronden
  background: {
    dark: "#0F172A",          // Hoofdachtergrond (slate-900)
    medium: "#1E293B",        // Kaarten, secties (slate-800)
    light: "#334155",         // Verhoogde elementen (slate-700)
  },

  // Tekst
  text: {
    primary: "#F8FAFC",       // Hoofdtekst op donkere achtergrond
    muted: "#94A3B8",         // Subtekst, labels, meta
    dark: "#64748B",          // Minst prominente tekst
  },

  // Functioneel
  functional: {
    success: "#22C55E",       // Bevestigingen, groei-indicatoren
    warning: "#F59E0B",       // Waarschuwingen
    error: "#EF4444",         // Fouten
    info: "#3B82F6",          // Informatie (= accent blue)
  },

  // Gradient richtlijnen
  gradients: {
    heroBackground: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
    accentGlow: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
    cardBorder: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)",
    textHighlight: "linear-gradient(90deg, #3B82F6, #06B6D4)",
  },
} as const;

// ─── Kleurgebruik per context ─────────────────────────────────────────────────

export const COLOR_USAGE = {
  instagramCarousel: {
    achtergrond: BRAND_COLORS.background.dark,      // #0F172A
    slideAccent: BRAND_COLORS.accent.blue,           // #3B82F6
    heading: BRAND_COLORS.text.primary,              // #F8FAFC
    bodyText: BRAND_COLORS.text.muted,               // #94A3B8
    cijfers: BRAND_COLORS.accent.blue,               // #3B82F6 of #06B6D4 voor data
    cta: BRAND_COLORS.accent.blue,                   // #3B82F6 button
    ctaText: BRAND_COLORS.text.primary,              // #F8FAFC
    dividerLine: BRAND_COLORS.background.light,      // #334155
    tip: "Gebruik maximaal 3 kleuren per slide. Navy achtergrond + wit tekst + blauw accent.",
  },
  linkedIn: {
    achtergrond: BRAND_COLORS.background.dark,
    heading: BRAND_COLORS.text.primary,
    bodyText: BRAND_COLORS.text.muted,
    accent: BRAND_COLORS.accent.blue,
    tip: "LinkedIn comprimeert afbeeldingen. Gebruik hoog contrast en grote tekst.",
  },
  presentatie: {
    achtergrond: BRAND_COLORS.background.dark,
    heading: BRAND_COLORS.text.primary,
    bodyText: BRAND_COLORS.text.primary,
    accent: BRAND_COLORS.accent.blue,
    secondaryAccent: BRAND_COLORS.cyan.DEFAULT,
    tip: "Gebruik de gradient achtergrond voor title slides, solid dark voor content slides.",
  },
} as const;

// ─── Typografie ───────────────────────────────────────────────────────────────

export const BRAND_TYPOGRAPHY = {
  primaryFont: {
    name: "Inter",
    weights: [400, 500, 600, 700],
    usage: "Alle tekst: headings, body, UI-elementen",
    fallback: "system-ui, -apple-system, sans-serif",
  },
  // Typografische schaal voor social media
  socialMedia: {
    carouselTitle: {
      size: "48-64px",
      weight: 700,
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      maxChars: 30,
    },
    carouselSubtitle: {
      size: "24-32px",
      weight: 600,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      maxChars: 60,
    },
    carouselBody: {
      size: "18-22px",
      weight: 400,
      lineHeight: 1.5,
      maxChars: 120,
    },
    carouselStat: {
      size: "64-96px",
      weight: 700,
      lineHeight: 1.0,
      color: BRAND_COLORS.accent.blue,
    },
    carouselCaption: {
      size: "14-16px",
      weight: 500,
      lineHeight: 1.4,
      color: BRAND_COLORS.text.muted,
    },
  },
  // Hierarchie regels
  regels: [
    "Maximaal 2 font weights per slide (bijv. 700 voor heading, 400 voor body)",
    "Nooit meer dan 3 tekstniveaus per slide",
    "Minimaal 16px voor leesbare body tekst op mobile",
    "Headings altijd in #F8FAFC (wit), nooit in muted kleuren",
    "Cijfers en statistieken in accent blue (#3B82F6) of cyan (#06B6D4)",
  ],
} as const;

// ─── Logo ─────────────────────────────────────────────────────────────────────

export const BRAND_LOGO = {
  beschrijving: `Arrow-A: een gestileerde letter A die lijkt op een opwaartse pijl.
Blauw (#3B82F6) op donkere achtergrond (#0F172A) met rounded rect container.
De negatieve ruimte in de onderkant van de A creëert de pijlpunt-illusie.`,
  varianten: {
    iconDark: "/brand/logo-icon-dark.svg",       // Blauw icon op donker
    iconLight: "/brand/logo-icon-light.svg",      // Donker icon op licht
    iconWhite: "/brand/logo-icon-white.svg",      // Wit icon (voor op foto's)
    fullDark: "/brand/logo-full-dark.svg",        // Icon + "Arka" tekst op donker
    fullLight: "/brand/logo-full-light.svg",      // Icon + "Arka" tekst op licht
    coverDark: "/brand/cover-dark.svg",           // Banner/cover formaat
    profileSquare: "/brand/profile-square.svg",   // 1:1 profielfoto
  },
  gebruiksregels: [
    "Logo altijd in een hoek van social media posts, nooit gecentreerd over content",
    "Minimale grootte: 32px icon, 120px full logo",
    "Altijd voldoende witruimte rondom (minimaal 50% van logo-hoogte)",
    "Nooit het logo vervormen, roteren of de kleuren aanpassen",
    "Op foto-achtergronden: gebruik de witte variant met lichte schaduw",
    "Op carousels: rechtsonder of linksonder, consistent per serie",
  ],
} as const;

// ─── Brand Voice & Tone ───────────────────────────────────────────────────────

export const BRAND_VOICE = {
  // Kernpersoonlijkheid
  persoonlijkheid: [
    "Direct en eerlijk. Geen corporate-taal, geen buzzwords.",
    "Zelfverzekerd maar niet arrogant. We weten wat we doen.",
    "Resultaatgericht. Altijd concreet, nooit vaag.",
    "Toegankelijk. Complex werk, simpele communicatie.",
    "Persoonlijk. Solo-founder, dus altijd menselijk.",
  ],

  // Tone spectrum per kanaal
  tonePerKanaal: {
    website: "Professioneel, helder, overtuigend. Iets formeler dan social.",
    instagram: "Kort, punchy, visueel. Tips en resultaten. Licht informeel.",
    linkedin: "Thought leadership, inzichten delen, professioneel maar persoonlijk.",
    email: "Direct, persoonlijk, to-the-point. Alsof je een collega mailt.",
    chatbot: "Behulpzaam, conversationeel, efficient. Nederlands als default.",
  },

  // Schrijfstijl richtlijnen
  schrijfregels: [
    "Schrijf in actieve vorm: 'We bouwen jouw website' niet 'Jouw website wordt gebouwd'",
    "Gebruik 'je/jouw' (informeel), niet 'u/uw' (formeel)",
    "Korte zinnen. Max 20 woorden per zin voor social media.",
    "Concrete cijfers boven vage beschrijvingen: '+285% meer verkeer' niet 'veel meer verkeer'",
    "Geen em-dashes gebruiken (wordt als AI-taal gezien)",
    "Geen uitroeptekens stapelen. Max 1 per post.",
    "Vermijd: 'innovatief', 'cutting-edge', 'next-level', 'revolutionair', 'uniek'",
    "Gebruik: 'meetbaar', 'concreet', 'direct', 'persoonlijk', 'transparant'",
    "Geen emoji-overload. Max 2-3 per Instagram post, 0-1 per LinkedIn post.",
    "AI-vermeldingen minimaliseren. Focus op resultaat, niet op tools.",
  ],

  // Veelgebruikte zinstructuren
  templates: {
    hookVraag: "[Pijnpunt van doelgroep]? Dit is hoe je het oplost.",
    hookStelling: "De meeste [doelgroep] maken deze fout met hun [onderwerp].",
    hookCijfer: "[Percentage/getal] van [doelgroep] mist [kans]. Hier is waarom.",
    ctaZacht: "Wil je weten hoe dit voor jouw bedrijf werkt? Link in bio.",
    ctaDirect: "Plan een gratis kennismakingsgesprek via arkadigital.nl/contact",
    ctaEngagement: "Herken je dit? Laat het weten in de comments.",
  },
} as const;

// ─── Doelgroep ────────────────────────────────────────────────────────────────

export const BRAND_AUDIENCE = {
  primair: {
    wie: "MKB-eigenaren en directeuren (5-50 medewerkers)",
    leeftijd: "30-55 jaar",
    uitdaging: "Weten dat ze digitaal moeten groeien, maar hebben geen intern team of budget voor een groot bureau",
    motivatie: "Meetbare groei, professionele uitstraling, minder gedoe",
    taal: "Nederlands, zakelijk maar niet stijf",
  },
  secundair: {
    wie: "ZZP'ers en freelancers in scale-up fase",
    leeftijd: "25-45 jaar",
    uitdaging: "Doen alles zelf, website is verouderd, geen tijd voor marketing",
    motivatie: "Professioneel overkomen, meer klanten aantrekken",
    taal: "Nederlands, informeler, to-the-point",
  },
  regio: "Primair Dordrecht en Drechtsteden, secundair heel Nederland",
  sectoren: [
    "Zakelijke dienstverlening (consultancy, advies, coaching)",
    "Horeca (restaurants, cafes, hotels)",
    "Logistiek & transport",
    "Bouw & techniek",
    "Gezondheidszorg (praktijken, klinieken)",
    "Retail & e-commerce",
  ],
} as const;

// ─── Instagram Carousel Richtlijnen ───────────────────────────────────────────

export const INSTAGRAM_CAROUSEL = {
  formaat: {
    breedte: 1080,
    hoogte: 1350,
    ratio: "4:5",
    maxSlides: 10,
    aanbevolenSlides: "5-7",
    bestandsformaat: "PNG of JPG, max 30MB per slide",
  },

  slideStructuur: {
    cover: {
      doel: "Aandacht trekken, scroll stoppen",
      elementen: [
        "Pakkende headline (max 6 woorden)",
        "Optioneel: subtitel of context (1 zin)",
        "Logo rechtsonder, klein",
        "Geen CTA op de cover",
      ],
      voorbeeld: {
        headline: "5 SEO-fouten die je geld kosten",
        subtitel: "En hoe je ze vandaag nog fixt",
      },
    },
    content: {
      doel: "Waarde leveren, educeren",
      elementen: [
        "1 punt per slide",
        "Nummer of icoon linksboven",
        "Korte heading (max 8 woorden)",
        "Toelichting (max 2 zinnen)",
        "Visueel element (icoon, grafiek, screenshot)",
      ],
    },
    closing: {
      doel: "Actie uitlokken",
      elementen: [
        "Samenvatting of key takeaway",
        "CTA: 'Sla op voor later' of 'Link in bio'",
        "Logo + website URL",
        "Subtiele gradient of accent kleur",
      ],
    },
  },

  visueleRegels: [
    "Consistent: alle slides in een carousel hebben dezelfde stijl",
    "Dark mode: #0F172A achtergrond als basis",
    "Eén accent kleur per carousel (#3B82F6 of #06B6D4)",
    "Witruimte: minimaal 80px padding aan alle kanten",
    "Tekst nooit over de volle breedte, max 80% van de slide",
    "Nummering consistent: gebruik dezelfde stijl door de hele carousel",
    "Subtiele lijn of element als visuele scheiding tussen secties",
    "Geen drukke achtergronden of stock foto's",
    "Iconen in lijnstijl (Lucide-achtig), niet gevuld",
  ],

  contentPilaren: [
    {
      pilaar: "Educatief",
      frequentie: "2x per week",
      voorbeelden: [
        "5 tekenen dat je website je klanten kost",
        "Zo werkt SEO echt (geen mythes)",
        "Wat een AI-chatbot kan doen voor jouw bedrijf",
      ],
    },
    {
      pilaar: "Resultaten & Cases",
      frequentie: "1x per week",
      voorbeelden: [
        "+285% meer verkeer in 3 maanden (case study)",
        "Van 0 naar 75 leads per maand",
        "Before/after: website redesign",
      ],
    },
    {
      pilaar: "Behind the scenes",
      frequentie: "1x per week",
      voorbeelden: [
        "Een dag uit het leven van een solo digital agency",
        "Tools die ik dagelijks gebruik",
        "Hoe ik een project van A tot Z aanpak",
      ],
    },
    {
      pilaar: "Quick tips",
      frequentie: "1x per week",
      voorbeelden: [
        "1 simpele SEO-tip die je vandaag kan toepassen",
        "Check je website snelheid in 30 seconden",
        "3 gratis tools voor betere LinkedIn posts",
      ],
    },
  ],
} as const;

// ─── LinkedIn Richtlijnen ─────────────────────────────────────────────────────

export const LINKEDIN_GUIDELINES = {
  postStructuur: {
    hook: "Eerste 2 regels bepalen of mensen doorklikken. Start met een stelling, vraag of cijfer.",
    body: "Max 1300 tekens. Korte alinea's (2-3 zinnen). Witregels tussen alinea's.",
    cta: "Altijd eindigen met een vraag of zachte CTA.",
  },
  beeldFormaten: {
    enkeleAfbeelding: { breedte: 1200, hoogte: 627, ratio: "1.91:1" },
    carousel: { breedte: 1080, hoogte: 1080, ratio: "1:1", format: "PDF upload" },
    vierkant: { breedte: 1080, hoogte: 1080, ratio: "1:1" },
  },
  toon: [
    "Persoonlijker dan Instagram: deel je perspectief als founder",
    "Geen hashtag-spam, max 3-5 relevante hashtags",
    "Vermijd 'Ik ben zo trots' of humblebragging",
    "Deel concrete lessen, niet alleen successen",
  ],
} as const;

// ─── Visuele Stijl ────────────────────────────────────────────────────────────

export const BRAND_VISUAL_STYLE = {
  algemeen: {
    stijl: "Dark premium tech",
    sfeer: "Professioneel, modern, schoon. Denk: SaaS dashboard aesthetic.",
    inspiratie: "Vercel, Linear, Raycast - clean dark interfaces met subtiele accenten",
  },
  fotografie: {
    stijl: "Minimaal gebruik. Voorkeur voor illustraties, iconen en data-visualisaties.",
    wanneerFoto: "Alleen voor persoonlijke content (founder foto, behind the scenes)",
    behandeling: "Donker overlay met brand kleuren, nooit onbewerkte stock foto's",
  },
  iconen: {
    bibliotheek: "Lucide React (lijnstijl)",
    grootte: "24px standaard, 32-48px voor social media",
    kleur: "Accent blue (#3B82F6) of wit (#F8FAFC), nooit in muted kleuren",
    stijl: "Lijnstijl (stroke), niet gevuld. Stroke width: 1.5-2px",
  },
  vormgeving: {
    hoeken: "Rounded: 12px voor kaarten, 8px voor buttons, 112px voor logo container",
    schaduwen: "Minimaal. Subtiele glow in accent kleur voor hover states.",
    borders: "1px solid #334155 (slate-700) voor scheiding, accent gradient voor emphasis",
    animatie: "Subtiel: fade-in, slide-up. Geen flashy animaties.",
  },
} as const;

// ─── Verboden & Do's ──────────────────────────────────────────────────────────

export const BRAND_DONTS = [
  "Geen em-dashes gebruiken (wordt als AI-gegenereerd gezien)",
  "Geen lichte/witte achtergronden voor primaire content",
  "Geen stock foto's als hoofdelement",
  "Geen emoji-overload (max 2-3 per Instagram, 0-1 per LinkedIn)",
  "Geen corporate jargon: 'synergie', 'leverage', 'paradigm shift'",
  "Geen onrealistische beloftes: 'gegarandeerd #1 op Google'",
  "Geen kleurvariaties buiten het palet zonder goedkeuring",
  "Geen tekst kleiner dan 16px op social media afbeeldingen",
  "Geen logo op iedere slide; alleen cover en closing slide",
  "Nooit het woord 'uniek' gebruiken",
  "Geen AI of tools noemen als selling point; focus op resultaat",
] as const;

export const BRAND_DOS = [
  "Altijd concrete cijfers en resultaten noemen waar mogelijk",
  "Altijd de dark mode aesthetic aanhouden",
  "Consistent Inter font gebruiken",
  "Logo subtiel plaatsen, niet dominant",
  "Witruimte respecteren; liever te weinig content dan te veel",
  "Elke post moet standalone waarde bieden (ook zonder de CTA)",
  "Nederlands als primaire taal, Engels alleen voor internationale content",
  "Elke carousel begint met een scroll-stopper headline",
  "Test leesbaarheid: als je het niet in 3 seconden snapt, vereenvoudig",
  "Houd een consistente posting cadans aan (liever 3x goed dan 7x matig)",
] as const;

// ─── Exporteer alles als één object ───────────────────────────────────────────

export const BRAND_CONTEXT = {
  identity: BRAND_IDENTITY,
  mission: BRAND_MISSION,
  colors: BRAND_COLORS,
  colorUsage: COLOR_USAGE,
  typography: BRAND_TYPOGRAPHY,
  logo: BRAND_LOGO,
  voice: BRAND_VOICE,
  audience: BRAND_AUDIENCE,
  instagram: INSTAGRAM_CAROUSEL,
  linkedin: LINKEDIN_GUIDELINES,
  visualStyle: BRAND_VISUAL_STYLE,
  dos: BRAND_DOS,
  donts: BRAND_DONTS,
} as const;
