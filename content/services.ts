export interface Service {
  slug: string;
  title: string;
  title_en: string;
  tagline: string;
  tagline_en: string;
  description: string;
  description_en: string;
  longDescription: string;
  longDescription_en: string;
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
    longDescription: `Een website is meer dan een digitaal visitekaartje. Het is je hardst werkende medewerker: 24 uur per dag beschikbaar, altijd consistent in de boodschap, en schaalbaar zonder extra personeel. Toch functioneren de meeste bedrijfswebsites als een statische brochure die niemand vindt en niemand overtuigt.

Wij bouwen websites en webshops met Next.js, het framework dat door bedrijven als Nike, Netflix en Notion wordt gebruikt. Het resultaat: pagina's die in minder dan 1 seconde laden, automatisch geoptimaliseerd zijn voor mobiel, en structureel hoger scoren in Google dan traditionele WordPress-sites.

**Hoe we te werk gaan**

Elk project begint met strategie, niet met design. We brengen in kaart wie je klant is, wat die zoekt, en welke actie je wilt dat die onderneemt. Van daaruit ontwerpen we een site die is gebouwd rondom conversie: duidelijke proposities, sterke call-to-actions, en een gebruikerservaring die bezoekers moeiteloos naar het contactformulier leidt.

Na oplevering ben je niet op jezelf aangewezen. Bij een maandelijks pakket is hosting, onderhoud, updates en doorontwikkeling inbegrepen. We monitoren performance, lossen problemen proactief op, en bouwen je website mee met je bedrijf.

**Waarom geen WordPress?**

WordPress draait op 40% van het internet, maar dat komt met een prijs: trage laadtijden door tientallen plugins, een groot aanvalsoppervlak voor hackers, en doorlopende onderhoudslast. Onze maatwerk aanpak elimineert deze problemen. Geen plugins, geen beveiligingslekken, geen verrassingen. Alleen schone code die precies doet wat jouw bedrijf nodig heeft.

**Eigenaarschap en onafhankelijkheid**

De broncode is altijd van jou. Geen lock-in, geen hostageware, geen maandelijkse kosten die exploderen als je wilt wisselen. Je kunt op elk moment overstappen naar een andere partij, inclusief volledige overdracht van code, domein en hosting.`,
    longDescription_en: `A website is more than a digital business card. It's your hardest-working employee: available 24 hours a day, always consistent in messaging, and scalable without additional staff. Yet most business websites function as static brochures that nobody finds and nobody is convinced by.

We build websites and webshops with Next.js, the framework used by companies like Nike, Netflix, and Notion. The result: pages that load in under 1 second, automatically optimized for mobile, and consistently ranking higher in Google than traditional WordPress sites.

**How we work**

Every project starts with strategy, not design. We map out who your customer is, what they're looking for, and what action you want them to take. From there, we design a site built around conversion: clear propositions, strong call-to-actions, and a user experience that effortlessly guides visitors to the contact form.

After delivery, you're not on your own. With a monthly package, hosting, maintenance, updates, and continued development are included. We monitor performance, proactively solve issues, and evolve your website alongside your business.

**Why not WordPress?**

WordPress powers 40% of the internet, but that comes at a cost: slow loading times from dozens of plugins, a large attack surface for hackers, and ongoing maintenance overhead. Our custom approach eliminates these problems. No plugins, no security vulnerabilities, no surprises. Just clean code that does exactly what your business needs.

**Ownership and independence**

The source code is always yours. No lock-in, no hostageware, no monthly costs that explode when you want to switch. You can transfer to another party at any time, including full handover of code, domain, and hosting.`,
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
    longDescription: `Elke dag zoeken duizenden potentiele klanten op Google naar precies wat jij aanbiedt. De vraag is: vinden ze jou of je concurrent? SEO zorgt ervoor dat jouw website bovenaan staat wanneer het ertoe doet.

Maar SEO in 2026 is niet meer wat het was. Google beloont niet langer trucjes en keyword-stuffing, maar expertise, autoriteit en betrouwbaarheid (E-E-A-T). AI-zoekmachines als Google AI Overviews, ChatGPT en Perplexity citeren alleen bronnen die gestructureerd, betrouwbaar en inhoudelijk sterk zijn. Onze SEO-aanpak is hierop gebouwd.

**Technische SEO: de fundering**

Alles begint met een gezonde technische basis. We auditen je website op laadsnelheid, mobielvriendelijkheid, indexeerbaarheid, gestructureerde data en Core Web Vitals. Dit zijn de factoren die Google gebruikt om te bepalen of je website het verdient om getoond te worden. Zonder een solide technische basis heeft content-optimalisatie weinig zin.

**Content die rankt en converteert**

We schrijven geen content om het schrijven. Elk artikel, elke pagina begint met zoekwoordenonderzoek: wat zoeken je klanten, hoeveel zoekvolume zit erop, en hoe sterk is de concurrentie? Van daaruit creeren we content die de zoekvraag beter beantwoordt dan alles wat er al staat.

Onze content is geschreven voor mensen, geoptimaliseerd voor zoekmachines, en gestructureerd voor AI-citatie. Dat betekent: duidelijke koppen, directe antwoorden, bronvermeldingen, en gestructureerde data die Google en AI-modellen kunnen lezen.

**LinkedIn en thought leadership**

Voor B2B-bedrijven is LinkedIn een van de krachtigste kanalen om zichtbaarheid op te bouwen. We helpen met contentstrategie, het schrijven van posts, en het opbouwen van een consistente aanwezigheid die je positioneert als expert in je vakgebied.

**Meetbaar resultaat**

SEO is geen zwarte doos. We rapporteren maandelijks over rankings, organisch verkeer, conversies en de ROI van je investering. Geen vage verhalen, maar concrete cijfers die je kunt controleren in Google Search Console en Analytics.

De eerste resultaten zijn doorgaans zichtbaar na 3 tot 6 maanden. Dat klinkt lang, maar het effect is cumulatief: elke maand bouwen we verder op het fundament, waardoor je positie steeds sterker wordt.`,
    longDescription_en: `Every day, thousands of potential customers search Google for exactly what you offer. The question is: do they find you or your competitor? SEO ensures your website appears at the top when it matters.

But SEO in 2026 is not what it used to be. Google no longer rewards tricks and keyword stuffing, but expertise, authority, and trustworthiness (E-E-A-T). AI search engines like Google AI Overviews, ChatGPT, and Perplexity only cite sources that are structured, reliable, and substantive. Our SEO approach is built on this foundation.

**Technical SEO: the foundation**

Everything starts with a healthy technical base. We audit your website for loading speed, mobile-friendliness, indexability, structured data, and Core Web Vitals. These are the factors Google uses to determine whether your website deserves to be shown. Without a solid technical foundation, content optimization has little effect.

**Content that ranks and converts**

We don't write content for the sake of it. Every article, every page starts with keyword research: what are your customers searching for, how much search volume is there, and how strong is the competition? From there, we create content that answers the search query better than anything already out there.

Our content is written for people, optimized for search engines, and structured for AI citation. That means: clear headings, direct answers, source references, and structured data that Google and AI models can read.

**LinkedIn and thought leadership**

For B2B companies, LinkedIn is one of the most powerful channels for building visibility. We help with content strategy, writing posts, and building a consistent presence that positions you as an expert in your field.

**Measurable results**

SEO is not a black box. We report monthly on rankings, organic traffic, conversions, and the ROI of your investment. No vague stories, but concrete numbers you can verify in Google Search Console and Analytics.

Initial results are typically visible after 3 to 6 months. That sounds long, but the effect is cumulative: each month we build further on the foundation, making your position increasingly stronger.`,
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
    longDescription: `De meeste bedrijven besteden uren per week aan taken die een AI in seconden kan doen: veelgestelde vragen beantwoorden, leads kwalificeren, offertes opstellen, data invoeren. Niet omdat ze het leuk vinden, maar omdat er geen alternatief leek te zijn. Dat is veranderd.

**AI-chatbots die je bedrijf kennen**

Onze chatbots zijn geen generieke FAQ-bots met voorgeprogrammeerde antwoorden. Ze zijn getraind op jouw specifieke bedrijfsinformatie: diensten, prijzen, werkwijze, openingstijden, veelgestelde vragen. Ze voeren natuurlijke gesprekken in het Nederlands, op een toon die bij je merk past.

Het resultaat: 70 tot 80% van de veelgestelde vragen wordt automatisch beantwoord, je responstijd daalt van uren naar seconden, en je team heeft meer tijd voor de gesprekken die er echt toe doen. De chatbot draait 24/7, ook 's avonds, in het weekend en op feestdagen.

**Slim afgestemd op kosten**

We bouwen chatbots met een tweelaagsysteem. Eenvoudige, veelgestelde vragen worden beantwoord zonder AI-kosten (via intent matching). Alleen complexere vragen gaan naar het AI-model. Dit betekent dat 70% van de gesprekken je nul extra kost, terwijl de kwaliteit voor alle vragen hoog blijft.

**Workflow automatisering**

Naast chatbots automatiseren we bedrijfsprocessen die veel tijd kosten maar weinig denkkracht vereisen:

- Inkomende formulieren automatisch verwerken naar je CRM
- Leads scoren en prioriteren op basis van gedrag en bedrijfsgegevens
- Automatische opvolg-emails na een contactmoment
- Rapporten en overzichten genereren uit je data
- Factuurverwerking en administratieve taken stroomlijnen

Elke automatisering begint met een analyse van je huidige werkproces. We identificeren de bottlenecks, bouwen de automatisering, en meten het resultaat. Geen overbodige complexiteit, alleen oplossingen die aantoonbaar tijd en geld besparen.

**Integraties met je bestaande tools**

AI werkt het best als het naadloos integreert met je bestaande systemen. We koppelen met CRM-systemen (HubSpot, Pipedrive, Salesforce), e-mailplatforms (Mailchimp, Resend), boekhoudsoftware, en vrijwel elk systeem met een API. Je hoeft niet alles om te gooien om te profiteren van AI.`,
    longDescription_en: `Most businesses spend hours every week on tasks an AI can handle in seconds: answering frequently asked questions, qualifying leads, drafting quotes, entering data. Not because they enjoy it, but because there seemed to be no alternative. That has changed.

**AI chatbots that know your business**

Our chatbots are not generic FAQ bots with pre-programmed answers. They are trained on your specific business information: services, pricing, methods, opening hours, frequently asked questions. They conduct natural conversations in Dutch, in a tone that matches your brand.

The result: 70 to 80% of frequently asked questions are answered automatically, your response time drops from hours to seconds, and your team has more time for the conversations that truly matter. The chatbot runs 24/7, including evenings, weekends, and holidays.

**Smart cost optimization**

We build chatbots with a two-tier system. Simple, frequently asked questions are answered without AI costs (via intent matching). Only more complex questions go to the AI model. This means 70% of conversations cost you nothing extra, while quality remains high for all questions.

**Workflow automation**

Beyond chatbots, we automate business processes that consume time but require little thinking:

- Automatically process incoming forms to your CRM
- Score and prioritize leads based on behavior and company data
- Automatic follow-up emails after a contact moment
- Generate reports and overviews from your data
- Streamline invoice processing and administrative tasks

Every automation starts with an analysis of your current workflow. We identify bottlenecks, build the automation, and measure the result. No unnecessary complexity, only solutions that demonstrably save time and money.

**Integrations with your existing tools**

AI works best when it seamlessly integrates with your existing systems. We connect with CRM systems (HubSpot, Pipedrive, Salesforce), email platforms (Mailchimp, Resend), accounting software, and virtually any system with an API. You don't need to overhaul everything to benefit from AI.`,
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
    longDescription: `De meeste MKB-bedrijven nemen beslissingen op basis van onderbuikgevoel. Niet omdat ze dat willen, maar omdat hun data verspreid zit over tien verschillende systemen: een CRM hier, een boekhoudpakket daar, Google Analytics ergens anders. Het bij elkaar brengen kost uren, dus gebeurt het niet.

Een dashboard verandert dat. In een oogopslag zie je hoe je bedrijf presteert: omzet, leads, conversie, klanttevredenheid, kosten. Geen spreadsheets openen, geen rapporten genereren, geen data overtypen. Alles up-to-date, op een plek.

**Wat we bouwen**

We ontwerpen dashboards die precies de vragen beantwoorden die jij dagelijks stelt:

- Hoeveel leads zijn er deze maand binnengekomen en uit welk kanaal?
- Wat is de conversieratio van lead naar klant?
- Hoe presteert de omzet ten opzichte van vorige maand en vorig jaar?
- Welke diensten of producten leveren de hoogste marge op?
- Waar zitten de bottlenecks in het verkoopproces?

Elk dashboard wordt gebouwd op basis van jouw specifieke KPI's en databronnen. Geen standaard template dat half aansluit, maar een instrument dat precies laat zien wat jij nodig hebt.

**Data-integraties**

De waarde van een dashboard staat of valt met de data die erin stroomt. We bouwen koppelingen met vrijwel elk systeem:

- CRM-systemen (HubSpot, Pipedrive, Salesforce)
- Boekhoudsoftware (Exact, Moneybird, Xero)
- Google Analytics en Search Console
- Social media platformen
- E-commerce platformen (Shopify, WooCommerce)
- Custom databases en interne systemen

De data stroomt automatisch. Geen handmatige exports, geen copy-paste, geen verouderde cijfers.

**Real-time rapportage**

Traditionele rapportages zijn per definitie verouderd: tegen de tijd dat het rapport af is, is de situatie veranderd. Onze dashboards tonen real-time data. Je kunt op elk moment van de dag zien hoe je bedrijf ervoor staat, en direct handelen als iets afwijkt.

Voor teams bieden we gedeelde dashboards met rolgebaseerde toegang. De directeur ziet het strategische overzicht, de salesmanager ziet de pipeline-details, de marketeer ziet de campagneresultaten. Dezelfde data, verschillende perspectieven.

**Van data naar actie**

Een dashboard is pas waardevol als het tot actie leidt. Daarom bouwen we niet alleen visualisaties, maar ook alerts en notificaties. Als een KPI onder een drempelwaarde zakt, krijg je direct een melding. Zo reageer je proactief in plaats van reactief.`,
    longDescription_en: `Most SMBs make decisions based on gut feeling. Not because they want to, but because their data is scattered across ten different systems: a CRM here, accounting software there, Google Analytics somewhere else. Bringing it all together takes hours, so it doesn't happen.

A dashboard changes that. At a glance, you see how your business performs: revenue, leads, conversion, customer satisfaction, costs. No opening spreadsheets, no generating reports, no retyping data. Everything up-to-date, in one place.

**What we build**

We design dashboards that answer exactly the questions you ask daily:

- How many leads came in this month and from which channel?
- What is the conversion rate from lead to customer?
- How does revenue compare to last month and last year?
- Which services or products deliver the highest margin?
- Where are the bottlenecks in the sales process?

Every dashboard is built based on your specific KPIs and data sources. Not a standard template that half fits, but an instrument that shows exactly what you need.

**Data integrations**

The value of a dashboard depends on the data flowing into it. We build connections with virtually any system:

- CRM systems (HubSpot, Pipedrive, Salesforce)
- Accounting software (Exact, Moneybird, Xero)
- Google Analytics and Search Console
- Social media platforms
- E-commerce platforms (Shopify, WooCommerce)
- Custom databases and internal systems

Data flows automatically. No manual exports, no copy-paste, no outdated figures.

**Real-time reporting**

Traditional reports are outdated by definition: by the time the report is finished, the situation has changed. Our dashboards show real-time data. You can see how your business is doing at any moment of the day, and act immediately when something deviates.

For teams, we offer shared dashboards with role-based access. The director sees the strategic overview, the sales manager sees pipeline details, the marketer sees campaign results. Same data, different perspectives.

**From data to action**

A dashboard is only valuable when it leads to action. That's why we don't just build visualizations, but also alerts and notifications. When a KPI drops below a threshold, you get an immediate notification. This way you react proactively instead of reactively.`,
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
    longDescription: `De meeste bedrijven zijn afhankelijk van mond-tot-mondreclame en toevallige aanvragen. Dat werkt, tot het stopt. Een maand vol met werk, de volgende maand niets. Geen voorspelbaarheid, geen controle, geen groeifundament.

Lead generation maakt je acquisitie voorspelbaar. In plaats van wachten op aanvragen, ga je proactief op zoek naar bedrijven die passen bij je ideale klantprofiel. Gestructureerd, meetbaar en schaalbaar.

**Outbound: proactief de juiste bedrijven bereiken**

We bouwen outbound campagnes die de juiste beslissers bereiken via het juiste kanaal:

- E-mail outreach: gepersonaliseerde, meertalige email sequences naar zorgvuldig geselecteerde prospects. Geen spam, maar relevante berichten die aansluiten bij de situatie van de ontvanger
- LinkedIn outreach: connectieverzoeken en berichten naar beslissers in je doelgroepsector
- Multichannel: de combinatie van email, LinkedIn en telefoon voor maximaal bereik

Elke campagne begint met het samenstellen van een doelgroeplijst. We identificeren bedrijven op basis van branche, omvang, locatie, en signalen die wijzen op behoefte aan jouw dienst (verouderde website, geen online aanwezigheid, groeiende omzet).

**Inbound: bezoekers omzetten in leads**

Outbound brengt prospects naar je website. Inbound zorgt dat ze converteren:

- Landingspagina's geoptimaliseerd voor specifieke doelgroepen en campagnes
- Lead magnets (gratis scans, whitepapers, checklists) die bezoekers een reden geven om hun gegevens achter te laten
- Chatbot-kwalificatie die bezoekers direct helpt en de juiste vragen stelt
- Formulieren die de drempel verlagen door alleen het noodzakelijke te vragen

**CRM: geen lead laten vallen**

Een lead die niet wordt opgevolgen is een gemiste kans. We richten je CRM (HubSpot, Pipedrive of anders) zo in dat elke lead wordt gevolgd, gescoord en op het juiste moment wordt benaderd:

- Automatische lead scoring op basis van gedrag en bedrijfsgegevens
- Pipeline-stages die aansluiten bij jouw verkoopproces
- Automatische herinneringen en follow-up triggers
- Rapportages die laten zien waar leads vandaan komen en welke het meest waardevol zijn

**Meetbaar en transparant**

Elke euro die je investeert in lead generation moet meetbaar rendement opleveren. We rapporteren over het aantal gegenereerde leads, de kosten per lead, de conversieratio, en de uiteindelijke omzet. Zo weet je precies wat werkt en waar je moet bijsturen.`,
    longDescription_en: `Most businesses depend on word-of-mouth and random inquiries. That works, until it stops. One month full of work, the next month nothing. No predictability, no control, no growth foundation.

Lead generation makes your acquisition predictable. Instead of waiting for inquiries, you proactively seek out companies that match your ideal customer profile. Structured, measurable, and scalable.

**Outbound: proactively reaching the right companies**

We build outbound campaigns that reach the right decision-makers through the right channel:

- Email outreach: personalized, multi-step email sequences to carefully selected prospects. Not spam, but relevant messages that align with the recipient's situation
- LinkedIn outreach: connection requests and messages to decision-makers in your target sector
- Multichannel: the combination of email, LinkedIn, and phone for maximum reach

Every campaign starts with building a target list. We identify companies based on industry, size, location, and signals indicating a need for your service (outdated website, no online presence, growing revenue).

**Inbound: converting visitors into leads**

Outbound brings prospects to your website. Inbound ensures they convert:

- Landing pages optimized for specific audiences and campaigns
- Lead magnets (free scans, whitepapers, checklists) that give visitors a reason to leave their details
- Chatbot qualification that helps visitors directly and asks the right questions
- Forms that lower the barrier by only asking what's necessary

**CRM: never drop a lead**

A lead that isn't followed up is a missed opportunity. We set up your CRM (HubSpot, Pipedrive, or other) so every lead is tracked, scored, and approached at the right moment:

- Automatic lead scoring based on behavior and company data
- Pipeline stages that match your sales process
- Automatic reminders and follow-up triggers
- Reports showing where leads come from and which are most valuable

**Measurable and transparent**

Every euro invested in lead generation must deliver measurable returns. We report on the number of generated leads, cost per lead, conversion rate, and ultimate revenue. This way you know exactly what works and where to adjust.`,
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
    longDescription: `Je merk is meer dan een logo. Het is het gevoel dat mensen krijgen als ze aan je bedrijf denken. Het is de reden waarom iemand voor jou kiest en niet voor de concurrent die precies hetzelfde aanbiedt. Sterke branding maakt dat verschil.

Toch onderschatten veel MKB-bedrijven de kracht van een consistente visuele identiteit. Ze hebben een logo dat een neef heeft gemaakt, een website in willekeurige kleuren, visitekaartjes die niet matchen met hun LinkedIn, en social media posts die er elke keer anders uitzien. Het gevolg: een onprofessionele indruk die onbewust vertrouwen ondermijnt.

**Wat wij bouwen**

We ontwikkelen complete visuele identiteiten die je merk herkenbaar, professioneel en consistent maken, overal:

- **Logo en beeldmerk**: een uniek logo dat werkt op groot en klein formaat, in kleur en zwart-wit, op digitaal en print. Inclusief variaties voor verschillende toepassingen (horizontaal, gestapeld, icoon)
- **Kleurenpalet**: een doordacht systeem van primaire en secundaire kleuren dat werkt op je website, social media, drukwerk en presentaties
- **Typografie**: lettertypes die passen bij de persoonlijkheid van je merk en leesbaar zijn op elk scherm
- **Brand guidelines**: een document dat vastlegt hoe je merk er overal uitziet. Zodat iedereen die namens je bedrijf communiceert (medewerkers, freelancers, bureaus) hetzelfde verhaal vertelt

**UI/UX design**

Een mooie website die niemand kan gebruiken is waardeloos. Onze designs zijn gebouwd rondom gebruikerservaring: hoe navigeert iemand door je site? Waar kijkt iemand als eerste? Hoe verlaag je de drempel om contact op te nemen?

We ontwerpen met conversie als doel. Elke pagina, elk element, elke interactie is bewust gekozen om bezoekers naar de gewenste actie te leiden. Dat combineert esthetiek met functionaliteit: het ziet er goed uit en het werkt.

**Social media templates**

Consistentie op social media is lastig als je elke post vanaf nul moet ontwerpen. Daarom leveren we templates: voorontworpen formats voor Instagram-posts, LinkedIn-visuals, story-templates en highlight-covers. In je eigen stijl, klaar om te vullen met je content.

**Waarom branding geen luxe is**

Onderzoek toont consistent aan dat merkconsistentie het vertrouwen vergroot en de herkenbaarheid verhoogt. Bedrijven met een consistente visuele identiteit worden als professioneler en betrouwbaarder ervaren. In een markt waar je concurrent een klik verwijderd is, maakt die eerste indruk het verschil.`,
    longDescription_en: `Your brand is more than a logo. It's the feeling people get when they think of your company. It's the reason someone chooses you over the competitor offering the exact same thing. Strong branding makes that difference.

Yet many SMBs underestimate the power of a consistent visual identity. They have a logo a cousin made, a website in random colors, business cards that don't match their LinkedIn, and social media posts that look different every time. The result: an unprofessional impression that unconsciously undermines trust.

**What we build**

We develop complete visual identities that make your brand recognizable, professional, and consistent, everywhere:

- **Logo and brand mark**: a unique logo that works at large and small sizes, in color and black-and-white, on digital and print. Including variations for different applications (horizontal, stacked, icon)
- **Color palette**: a thoughtful system of primary and secondary colors that works on your website, social media, print materials, and presentations
- **Typography**: fonts that match your brand's personality and are readable on every screen
- **Brand guidelines**: a document that defines how your brand looks everywhere. So everyone communicating on behalf of your company (employees, freelancers, agencies) tells the same story

**UI/UX design**

A beautiful website that nobody can use is worthless. Our designs are built around user experience: how does someone navigate your site? Where do they look first? How do you lower the barrier to make contact?

We design with conversion as the goal. Every page, every element, every interaction is deliberately chosen to guide visitors toward the desired action. This combines aesthetics with functionality: it looks good and it works.

**Social media templates**

Consistency on social media is difficult when you have to design every post from scratch. That's why we deliver templates: pre-designed formats for Instagram posts, LinkedIn visuals, story templates, and highlight covers. In your own style, ready to fill with your content.

**Why branding is not a luxury**

Research consistently shows that brand consistency increases trust and improves recognition. Companies with a consistent visual identity are perceived as more professional and trustworthy. In a market where your competitor is one click away, that first impression makes the difference.`,
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
