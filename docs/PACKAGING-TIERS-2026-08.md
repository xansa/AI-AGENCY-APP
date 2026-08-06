# Arka — Pijlers, Pakketten & Prijzen (voorstel, 2026-08)

> Lost de knoop "ik verkoop én diensten én packages" op via 3 lagen: pijlers ordenen,
> diensten = losse bouwstenen (SEO/vindbaarheid), pakketten = de bundel die je pusht.
> Gebaseerd op de deep-research (focus loont, Good-Better-Best, outcome-naming, NL-MKB-ankers)
> + Kaan's inzicht dat de AI-assistent op zichzelf al €3-4k/mnd waard is.

## Laag 1 — 3 outcome-pijlers (ordening/positionering)

| Pijler | Uitkomst (pitch) | Diensten erin |
|---|---|---|
| **Website & Merk** | Een professionele online basis die vertrouwen wekt | Websites & Webshops · Branding & Design |
| **Vindbaar & Leads** | Gevonden worden + een voorspelbare klantstroom | SEO & Content · Lead Generation (cold outreach/Smartlead) · social posts |
| **AI & Data** | Slimmer werken: het werk van meerdere mensen, voor 1 salaris | AI Assistent (vlaggendrager) · AI Chatbots & Automatisering · Dashboards & Data · AI-video (HeyGen) |

HeyGen-video en de AI-assistent = capabilities binnen **AI & Data**, geen eigen pijler.

## Laag 2 — 3 koop-tiers (Good-Better-Best, dit push je)

Elke tier bundelt dwars door de pijlers. Middelste tier = het meest gekozen (compromise-effect).

### Tier 1 — "Online Basis" (Starter)
- **Voor wie:** eerste professionele site nodig, net begonnen.
- **Uitkomst:** een site die er professioneel uitziet, snel laadt en vertrouwen wekt.
- **Bevat:** maatwerk website (tot ~5 pagina's), basis-branding (logo/kleuren/fonts indien nodig),
  on-page SEO-basis, hosting + onderhoud, contactformulier, mobiel + snel.
- **Prijs:** **€2.000 eenmalig** óf **€750/mnd** (incl. hosting/onderhoud/kleine updates).
- **Praktijk (solo levering):** Next.js + Vercel, repo-per-klant, oplevering + licht maandelijks onderhoud.

### Tier 2 — "Groei & Leads" (Professional) — *meest gekozen*
- **Voor wie:** heeft een site, wil meer gevonden worden en klanten binnenhalen.
- **Uitkomst:** hoger in Google + een voorspelbare stroom leads elke maand.
- **Bevat:** alles uit Online Basis **+** doorlopende SEO & content (2-4 blogs/mnd),
  lead generation (Smartlead cold-outreach campagne óf Google/social ads), een AI-chatbot op de site,
  maandelijkse rapportage/dashboard.
- **Prijs:** **€1.750/mnd** (band €1.500-1.950), eventueel + eenmalige setup als er nog geen site staat.
- **Praktijk:** maandelijkse content/SEO (zoals de 48 blogs), Smartlead-campagne, chatbot (Claude + KB),
  maand-dashboard met de cijfers.

### Tier 3 — "AI-afdeling" (Enterprise) — *premium, vlaggendrager = de AI-assistent*
- **Voor wie:** wil een complete digitale afdeling + AI die het werk doet.
- **Uitkomst:** *"Een AI-medewerker (of team) die 24/7 draait en het werk van meerdere mensen doet,
  voor de prijs van één maandsalaris."*
- **Bevat:** alles uit Groei & Leads **+** de **AI-assistent (Jarvis-achtig)** (agenda, mail, research,
  klantcontact 24/7), AI-automatisering (workflows), uitgebreide dashboards & data-integraties,
  maandelijkse AI-video's (HeyGen).
- **Prijs:** **€3.500/mnd** + eenmalige setup **€1.500-2.500** (assistent + automatiseringen inrichten).
  **Anker:** de AI-assistent alleen al is €3-4k/mnd waard; de website, SEO, leads, chatbot en dashboards
  krijg je er in feite bij. Dat maakt €3.500 een koopje-framing i.p.v. duur.
- **Praktijk:** AI-assistent opzetten (Claude-based + integraties uit de transcript-setup),
  automatisering via n8n/Zapier/Make, data-dashboards, maandelijkse AI-video content.

## Laag 3 — Losse diensten (à la carte, blijven bestaan)
Elke dienst houdt z'n eigen `/diensten/[slug]`-pagina (SEO + scope-detail) met een CTA naar het
passende pakket. De **AI Assistent** blijft ook los verkoopbaar (`/ai-assistent`, huidige €1.500 setup)
voor wie alleen dát wil.

## De ladder in één oogopslag
`€750/mnd` (Online Basis) → `€1.750/mnd` (Groei & Leads) → `€3.500/mnd` (AI-afdeling)
Eenmalig-only kan ook (project i.p.v. retainer), maar de pakketten = maandelijks = voorspelbare omzet.

## Waarom dit werkt (research)
- Focus + max ~3 keuzes reduceert beslisverlamming; 3 pakketten → ~30% hogere orderwaarde.
- Outcome-koppen + concrete deliverables + prijstransparantie (hybride) converteert het best.
- NL-MKB-precedent: WeDoItMarketing giet hun MKB-aanbod in exact 3 outcome-tiers (Basis/Groei/Opschalen).
- NL-prijsband ZZP/MKB: €500-1.500 (instap) tot €1.500-5.000 (groei), dus €750→€3.500 zit goed.

## Alternatieve naamsets (kort)
- A: Online Basis · Groei & Leads · AI-afdeling
- B: Basis · Groei · Opschalen (à la WeDoItMarketing)
- C: Start · Scale · Autopilot (Engels-tintje, "Autopilot" = AI-afdeling)

## Implementatie op de site (na akkoord)
1. `/diensten` + homepage → 3 pijlers met diensten eronder.
2. `/packages` → 3 tiers met deliverables + prijs; AI-afdeling-tier leidt met de AI-assistent-pitch.
3. `/diensten/[slug]` → detail + CTA naar passend pakket.
4. `content/packages.ts` + knowledge-base + intent-matcher bijwerken op de nieuwe prijzen/tiers.
