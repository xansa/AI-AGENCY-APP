/**
 * Arka — Hidden kennisbank
 *
 * Dit bestand is de enige bron van waarheid voor de chatbot.
 * Wijzig hier content om de chatbot bij te werken — geen API-aanpassingen nodig.
 *
 * Structuur:
 *   KB_SECTIONS   — individuele secties (kunnen ook los gebruikt worden)
 *   KNOWLEDGE_BASE — volledige tekst die in het systeemprompt wordt geïnjecteerd
 */

// ─── Bedrijfsinformatie ──────────────────────────────────────────────────────

export const KB_COMPANY = `
## Over Arka

Arka is een digitaal bureau gevestigd in Dordrecht, Nederland. Opgericht en gerund door
één persoon die alles zelf doet — van websites en branding tot AI-chatbots en dashboards.

**Tagline:** Jouw digitale afdeling, zonder de overhead.

**Wat Arka doet:**
- Websites & Webshops — custom design, development, hosting
- SEO & Content — zoekmachine optimalisatie, blogartikelen, LinkedIn content
- AI Chatbots & Automatisering — slimme chatbots, workflow automatisering
- Dashboards & Data — KPI-dashboards, rapportage, data-integraties
- Lead Generation — outbound campagnes, funnels, CRM-optimalisatie
- Branding & Design — visuele identiteit, UI/UX design, brand guidelines

**Voor wie:**
- MKB-bedrijven en ZZP'ers die hun digitale aanwezigheid willen professionaliseren
- Groeiende bedrijven die een complete digitale afdeling willen zonder personeel aan te nemen
- B2B-bedrijven die structureel meer leads willen genereren
- Lokale ondernemers in de regio Dordrecht en daarbuiten

**Contactgegevens:**
- E-mail: arkaecom@proton.me
- Telefoon: +31 6 46410986
- Locatie: Dordrecht, Nederland
- Offerte aanvragen: /offerte

**Wat maakt Arka anders?**
1. Je werkt direct met de persoon die het werk doet — geen tussenlagen of juniors
2. De breedte van een compleet digitaal team — zonder de overhead
3. Alles is meetbaar — elke actie is gekoppeld aan een concreet resultaat
`;

// ─── Diensten ────────────────────────────────────────────────────────────────

export const KB_SERVICES = `
## Diensten

### 1. Websites & Webshops — Jouw professionele online aanwezigheid
Custom design, development en hosting van websites en webshops die er niet alleen
mooi uitzien, maar ook snel laden en converteren.

Wat je krijgt:
- Responsive design
- CMS-integratie
- Hosting & onderhoud
- Performance optimalisatie
- SSL & beveiliging

Resultaten: professionele online aanwezigheid, snelle laadtijden, mobiel-vriendelijk.
Ideaal voor: MKB en ZZP'ers die een professionele website nodig hebben.

---

### 2. SEO & Content — Word gevonden door de juiste mensen
Zoekmachine optimalisatie, blogartikelen en LinkedIn content die ervoor zorgen
dat jouw bedrijf online beter gevonden wordt.

Wat je krijgt:
- Technische SEO audit
- Keyword research
- Maandelijkse blogartikelen
- LinkedIn posts
- Content strategie

Resultaten: hogere Google rankings, meer organisch verkeer, thought leadership.
Ideaal voor: Bedrijven die online beter gevonden willen worden.

---

### 3. AI Chatbots & Automatisering — Slimmer werken met AI
Slimme chatbots, workflow automatisering en AI-integraties die jouw processen
versnellen en je klanten 24/7 helpen.

Wat je krijgt:
- Custom AI chatbot
- Proces automatisering
- CRM-koppelingen
- Lead kwalificatie

Resultaten: 24/7 beschikbaarheid, minder handmatig werk, snellere responstijden.
Ideaal voor: Bedrijven die klantenservice en processen willen automatiseren.

---

### 4. Dashboards & Data — Grip op jouw bedrijfsprestaties
KPI-dashboards, rapportage en data-integraties die je inzicht geven in wat er
echt speelt in je bedrijf.

Wat je krijgt:
- Custom dashboard development
- Data pipeline setup
- Real-time rapportage
- API-integraties

Resultaten: inzicht in bedrijfsprestaties, datagedreven beslissingen, tijdsbesparing.
Ideaal voor: Bedrijven die grip willen op hun data en KPI's.

---

### 5. Lead Generation — Structureel meer kwalitatieve leads
Outbound campagnes, funnels en CRM-optimalisatie die zorgen voor een
voorspelbare stroom aan nieuwe leads.

Wat je krijgt:
- Lead funnel opzet
- Outbound email campagnes
- LinkedIn outreach
- CRM setup & optimalisatie

Resultaten: meer kwalitatieve leads, hogere conversie, voorspelbare pipeline.
Ideaal voor: B2B-bedrijven die structureel meer leads willen genereren.

---

### 6. Branding & Design — Een merk dat blijft hangen
Visuele identiteit, UI/UX design en brand guidelines die ervoor zorgen dat
jouw merk professioneel en consistent overkomt.

Wat je krijgt:
- Logo & huisstijl
- Brand guidelines
- UI/UX design
- Social media templates

Resultaten: professionele en consistente uitstraling, hogere merkherkenning.
Ideaal voor: Bedrijven die hun merk professioneel willen neerzetten.
`;

// ─── Packages ────────────────────────────────────────────────────────────────

export const KB_PACKAGES = `
## Packages

### Starter — €800 – €1.500 / maand
Diensten: Websites & Webshops + SEO & Content
Voor wie: ZZP'ers en kleine MKB-bedrijven
Deliverables:
- Professionele website (design + development)
- Hosting & maandelijks onderhoud
- Basis SEO-optimalisatie
- Maandelijkse performance rapportage
- Content updates (tot 4 per maand)
- SSL-certificaat & beveiliging
Looptijd: Minimaal 3 maanden, daarna maandelijks opzegbaar
KPI's: website verkeer, Google rankings, laadsnelheid, organisch bereik

---

### Professional — €2.500 – €3.500 / maand ⭐ Meest gekozen
Diensten: Websites & Webshops + SEO & Content + AI Chatbots & Automatisering + Branding & Design
Voor wie: Groeiende MKB-bedrijven die meer uit hun online aanwezigheid willen halen
Deliverables:
- Custom website met chatbot & animaties
- AI-gestuurde chatbot voor lead kwalificatie
- 8 LinkedIn posts + 2 blogartikelen per maand
- UI/UX design & brand identity
- Maandelijkse strategie sessie
- CRO-audit & optimalisatie
Looptijd: Minimaal 3 maanden, daarna maandelijks opzegbaar
KPI's: conversieratio, aantal leads, engagement rate, merkconsistentie

---

### Enterprise — €4.500 – €8.000 / maand
Diensten: Alle 6 diensten (Websites & Webshops, SEO & Content, AI Chatbots & Automatisering, Dashboards & Data, Lead Generation, Branding & Design)
Voor wie: Gevestigde MKB-bedrijven en scale-ups die alles uit handen willen geven
Deliverables:
- Alles uit Professional
- Custom KPI-dashboards & rapportage
- Lead generation campagnes (email + LinkedIn)
- Proces automatisering & CRM-integratie
- Data pipeline & API-koppelingen
- Dedicated accountmanager
- Prioriteit support (< 4 uur reactie)
- Maandelijkse executive rapportage
Looptijd: Minimaal 6 maanden, daarna per kwartaal opzegbaar
KPI's: omzetgroei, tijdsbesparing, pipeline waarde, marketing ROI, klanttevredenheid
`;

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const KB_FAQ = `
## Veelgestelde vragen

**Wat kost het?**
Starter: €800–€1.500/mnd | Professional: €2.500–€3.500/mnd | Enterprise: €4.500–€8.000/mnd
Vergelijk dat met een fulltime medewerker: die kost al snel €3.000–€5.000/mnd all-in.

**Kan ik stoppen wanneer ik wil?**
Starter en Professional: minimaal 3 maanden, daarna maandelijks opzegbaar.
Enterprise: minimaal 6 maanden, daarna per kwartaal opzegbaar.
Geen verborgen kosten of opzegboetes.

**Garanderen jullie resultaten?**
Nee — en pas op voor partijen die dat wel doen. Resultaten hangen af van jouw markt,
product en timing. Wel gegarandeerd: volledige transparantie, maandelijkse rapportages,
en dooroptimaliseren totdat het werkt.

**Hoe snel zie ik resultaten?**
- Website: 2–4 weken
- SEO-resultaten: 2–3 maanden
- Chatbot: 1–2 weken
- Dashboards en automatisering: 2–3 weken

**Wie is eigenaar van alles?**
Jij. Alle websites, content, designs, systemen en automatiseringen zijn van jou.
Bij beëindiging lever ik alles netjes over.

**Hoeveel tijd kost het mij?**
Onboarding: 1–2 uur. Daarna: < 1 uur per week voor feedback en goedkeuringen.

**Voor welk type bedrijven werkt Arka?**
MKB-bedrijven, ZZP'ers en scale-ups die hun digitale aanwezigheid willen professionaliseren.
Van lokale ondernemers in de regio Dordrecht tot B2B-bedrijven die landelijk opereren.

**Hoe ziet het onboardingproces eruit?**
Week 1: intakegesprek + strategiesessie
Week 2–3: opzet en eerste oplevering
Week 4: review, feedback en bijsturing
Daarna: maandelijks ritme met vaste check-ins

**Wat maakt Arka anders?**
1. Je werkt direct met de persoon die het werk doet — geen tussenlagen
2. De breedte van een compleet digitaal team — zonder de overhead
3. Alles is meetbaar — elke actie is gekoppeld aan een concreet resultaat

**Kan ik eerst iets kleins proberen?**
Ja, neem contact op voor een gratis kennismakingsgesprek. Geen verplichting.
Mail: arkaecom@proton.me | Bel: +31 6 46410986

**Hoe bereikbaar is Arka?**
Direct via e-mail, telefoon of een gezamenlijk communicatiekanaal.
Enterprise-klanten: prioriteit support, reactietijd < 4 uur op werkdagen.

**Gebruikt Arka AI?**
Ja, als werktool voor development, automatisering en content creatie.
Alles wordt persoonlijk gereviewed en goedgekeurd. De strategie en het oordeel
zijn altijd menselijk.

**Wat als het niet werkt?**
Data analyseren → aanpak aanpassen → nieuwe oplossingen testen.
Na 3 maanden zonder fit: samenwerking beëindigen in goed overleg, alles overdragen.
`;

// ─── Klantcases ──────────────────────────────────────────────────────────────

export const KB_CASES = `
## Klantresultaten & Cases

### Brasserie De Haven — Horeca — Starter pakket (3 maanden)
Uitdaging: Verouderde website, nauwelijks vindbaar op Google, reserveringen liepen mis.
Aanpak: Nieuwe website met online reserveringssysteem, lokale SEO-optimalisatie,
maandelijkse blogartikelen over lokale evenementen en seizoensmenu's.
Resultaten:
- +285% organisch websiteverkeer na 3 maanden
- +160% meer online reserveringen
- Top 3 Google positie voor 'restaurant Dordrecht'
"Onze nieuwe website ziet er fantastisch uit en we merken direct het verschil."
— Lisa Jansen, Eigenaar Brasserie De Haven

### Visser & Partners Consultancy — Zakelijke dienstverlening — Professional pakket (4 maanden)
Uitdaging: Te veel tijd aan repetitieve vragen, handmatig intake-proces, leads vielen weg.
Aanpak: AI-chatbot voor veelgestelde vragen en lead kwalificatie, CRM-automatisering,
vernieuwde website met professionele branding.
Resultaten:
- Responstijd: 24 uur → 2 minuten
- +75% meer gekwalificeerde leads
- 15 uur/week tijdsbesparing
"De chatbot voelt alsof we er een extra medewerker bij hebben."
— Robert Visser, Managing Partner Visser & Partners Consultancy

### MaasLogistics B.V. — Logistiek & Transport — Enterprise pakket (6 maanden)
Uitdaging: Geen inzicht in bedrijfsprestaties, verouderde website, geen structurele acquisitie.
Aanpak: Nieuwe website, KPI-dashboards, lead generation campagnes via email en LinkedIn,
proces automatisering voor offertes en klantcommunicatie.
Resultaten:
- +€1,8M nieuwe omzetpijplijn in eerste half jaar
- Offertetijd: 3 dagen → 3 uur
- Van maandelijkse Excel-rapportages naar real-time KPI-dashboards
"Arka heeft ons bedrijf naar een ander niveau getild. We hebben eindelijk grip op
onze cijfers." — Dennis van der Maas, Directeur MaasLogistics B.V.
`;

// ─── Volledige kennisbank (voor systeemprompt) ───────────────────────────────

export const KNOWLEDGE_BASE = [
  KB_COMPANY,
  KB_SERVICES,
  KB_PACKAGES,
  KB_FAQ,
  KB_CASES,
].join("\n\n---\n\n");
