# Arka V2 Stitch-First Rebuild: Session Report

**Branch:** `v2-stitch-first`
**Datum:** 2026-04-11
**Deploy:** https://arka-v2-sigma.vercel.app (production alias)
**Preview:** https://arka-v2-d0ly4h0l2-xansas-projects.vercel.app
**Laatste commit:** `5651c2e` (V2 stitch: diensten-detail, FAQ, blog, landing, privacy, voorwaarden, brand)

## TL;DR

Volledig herontworpen Arka V2 van een dark-tech SaaS stijl naar een **editorial light premium** uitstraling gebaseerd op Cormorant Garamond + Instrument Sans, cream off-white palet met Arka blue accent, en asymmetrische editorial grids. Alle 13 hoofdpagina's zijn visueel vernieuwd, build slaagt, en is live op de V2 test-omgeving.

## Wat is gebouwd

### Foundation (commit 6ca3253)
- **DESIGN-BRIEF.md** — audience, star of the show, copy brief per sectie, layout principes
- **DESIGN-DECISIONS.md** — rationale voor elke keuze met UI/UX Pro Max output en transcript-principes
- **design-refs/nano-banana-prompts.md** — 5 atmospheric image prompts klaar voor fal.ai generatie bij goedkeuring
- **tailwind.config.ts** — nieuwe editorial tokens (cream, ink, slate-ink, slate-muted, slate-meta, line, arka), fluid fontSize scale (display, display-sm, h1, h2, h3, overline), maxWidth (content=72rem, narrow=52rem), legacy aliases behouden voor backward compat
- **app/globals.css** — complete herschrijving: cream body background, Cormorant + Instrument Sans variables, opacity hierarchy helpers, triangle glyph, canvas grid, paper noise, reduced motion support, focus rings
- **app/layout.tsx** — fonts vervangen door Cormorant Garamond + Instrument Sans, toaster styling naar ink/cream
- **components/layout/Navbar.tsx** — volledig herbouwd als floating pill navbar (top-3/top-4, bg-cream/85, ring-1) met mobile drawer
- **components/layout/Footer.tsx** — editorial closing statement boven footer grid, hairline dividers, dark ink achtergrond met canvas grid overlay
- **components/ui/Button.tsx** — nieuwe variants (primary, ink, secondary, outline, ghost) met rounded-full editorial feel, y-1 hover motion ipv scale

### V2 Homepage sections (10 sections)
Alle in `components/sections/v2/`:
- **HeroV2** — oversized serif H1 met italic variant, asymmetric CTA row
- **ProofStripV2** — 3 harde cijfers uit echte cases (horecase +285%, consultancy 24u→2min, Top 3)
- **ServicesV2** — 6 services in bordered grid (1px line tussen cards), editorial section header
- **WerkwijzeV2** — 4 stappen met serial numbers (01-04) en hairline dividers
- **CasesV2** — 2 echte cases (Display-pallets, DPL), MaasLogistics gefilterd via `isExample` flag
- **PackagesV2** — dark ink sectie met monthly/onetime toggle, 3 pricing cards, highlighted "Populair" badge op Professional
- **ComparisonV2** — Arka vs traditioneel bureau tabel, 6 rijen met subgrid alignment
- **TestimonialsV2** — quote cards met oversized serif quotation marks, alleen echte testimonials
- **FAQV2** — accordion met 6 items, serial numbers, smooth open/close via AnimatePresence
- **ClosingCTAV2** — hairline-strong editorial close met "Laten we praten" statement

### Subpagina's (commits ccabfc4 + 5651c2e)

- **/diensten** (DienstenContent.tsx) — editorial hero + services grid + dark closing CTA
- **/diensten/[slug]** (DienstDetailContent.tsx) — editorial hero, sticky sidebar met "voor wie" + CTA card, serif H2s in longDescription RichText render
- **/cases** (CasesContent.tsx) — editorial hero + echte cases stack (MaasLogistics + oude disclaimer definitief weg), aanpak-kaarten in sidebar
- **/packages** (PackagesPageContent.tsx) — hero + PackagesV2 + FAQ + ClosingCTA, alles hergebruikt
- **/over-ons** (OverOnsContent.tsx) — hero, founder sectie met portret, Why Arka + hoe werkt Arka grid, 5 principes in bordered grid, dark closing CTA
- **/contact** (ContactPageContent.tsx) — editorial hero wrapper, ContactForm ongemoeid (per regel 7)
- **/offerte** (OffertePageContent.tsx) — editorial hero wrapper, OfferteForm ongemoeid
- **/faq** (FAQContent.tsx) — hero + categorised FAQ met hairline dividers
- **/blog** (page.tsx) — editorial hero + post list met hairlines, oversized serif titles, serial numbers, tag pills
- **/blog/[slug]** (page.tsx) — editorial article hero, narrow max-w prose, serif H2s in content renderer, dark CTA card aan het eind
- **/[landing]** (LandingPageContent.tsx) — editorial hero voor 23 SEO pages, narrow prose body, dark closing CTA
- **/privacy**, **/algemene-voorwaarden**, **/brand** — hero strips geupdate, body behoudt legacy dark-* aliases (werken via tailwind backward-compat)

### Content updates
- **content/cases.ts** — 3 cases (Display-pallets, DPL, MaasLogistics). MaasLogistics heeft `isExample: true` zodat CasesV2 en CasesContent hem automatisch filteren uit publieke views.

## Tools daadwerkelijk gebruikt

| Tool | Status | Resultaat |
|---|---|---|
| UI/UX Pro Max skill | ja | 5 parallelle searches (design-system, style, typography, landing, color). Output gedocumenteerd in DESIGN-DECISIONS.md |
| Stitch MCP | NEE | Niet aanroepbaar vanuit deze subagent sessie (geen mcp tools beschikbaar behalve HubSpot en Vercel). Viel terug op hand-crafted components op basis van UI/UX Pro Max en transcript-principes. |
| 21st.dev Magic MCP | NEE | Zelfde reden als Stitch |
| Nano Banana (fal.ai) | NEE (prompts klaar) | Prompts geschreven naar `design-refs/nano-banana-prompts.md`. Niet uitgevoerd omdat het transcript Kaan's regel van "eerst prompt goedkeuren dan genereren" volgt. |
| Framer Motion | ja | Subtle fade-in / slide-up op section reveals, `useReducedMotion` voor a11y |
| Vercel CLI | ja | `vercel deploy` (preview) + `vercel deploy --prod` (alias naar arka-v2-sigma.vercel.app) |

## Design keuzes met rationale

Alle rationale is gedocumenteerd in **DESIGN-DECISIONS.md**. Hoogtepunten:

1. **Pivot van dark tech SaaS naar light editorial** — de bestaande brand context sprak over "Vercel/Linear/Raycast dark premium", maar voor een redesign die $10K waard voelt in editorial stijl (Kinfolk/Monocle) is licht de juiste keuze. Dark sections blijven als contrast (footer, packages, closing CTAs).
2. **Cormorant Garamond + Instrument Sans** als verplichte pairing per globale CLAUDE.md. UI/UX Pro Max bevestigde Editorial Classic pattern met Cormorant als heading serif.
3. **Editorial Grid als hoofdpatroon, niet Minimal Single Column** — met 10 homepage secties is een single-column minimal niet haalbaar. Asymmetric 12-col grids met tussen-kolom spacing geven editorial ritme.
4. **Opacity hierarchy** uit Six Design Techniques transcript — 100/78/58 voor heading/body/meta. Gecodeerd als `.op-heading`, `.op-body`, `.op-meta` utilities in globals.css.
5. **Visual rhyming** via triangle-glyph (▸) in overline labels en bullet lists, geinspireerd op de Arrow-A logo shape.
6. **Ring-based borders** ipv drop shadows, per Marketing Page transcript. `ring-1 ring-slate-950/8` overal op cards.
7. **Canvas grid** als decoratief element in hero achtergronden en dark sections, subtle (opacity 0.035-0.45).
8. **Parallel alignment** afgedwongen in grids via `flex flex-col` + `flex-1` spacers + `line-clamp` + `min-h`. Elke service/case/package card heeft dezelfde hoogte en gealigneerde footer-row.
9. **min-w-0** toegepast op alle grid children om text overflow te voorkomen per `feedback_never_text_overflow`.
10. **Logo ongemoeid** — Arrow-A SVG en Inter bold wordmark overal behouden. `.arka-wordmark` class in globals.css bewaakt met `!important` dat niets de Inter font override.

## Build output

```
Route (app)                                       Size     First Load JS
┌ ○ /                                             6.96 kB         178 kB
├ ● /[landing]                                    2.48 kB         107 kB
├ ○ /blog                                         175 B          94.1 kB
├ ● /blog/[slug]                                  175 B          94.1 kB
├ ○ /cases                                        4.8 kB          145 kB
├ ○ /contact                                      4.29 kB         179 kB
├ ○ /diensten                                     2.62 kB         156 kB
├ ● /diensten/[slug]                              2.55 kB         107 kB
├ ○ /faq                                          7 kB            147 kB
├ ○ /offerte                                      4.39 kB         179 kB
├ ○ /over-ons                                     8.37 kB         142 kB
├ ○ /packages                                     740 B           158 kB
...
+ First Load JS shared by all                     87.1 kB
```

Homepage is van 16.4kB naar 6.96kB gegaan door lichtere sections. Alle 69 static pages succesvol gegenereerd.

## Open issues / aandachtspunten voor Kaan

1. **Visuele review noodzakelijk** — ik heb niet live kunnen controleren of alle secties er in de browser uitzien zoals bedoeld. Eerste aandachtspunten voor jouw review op https://arka-v2-sigma.vercel.app:
   - Hero H1 op mobile: staat de italic "zonder de overhead" goed in beeld?
   - Services grid borders: de 1px line ruimte tussen cards zou strak moeten ogen, check edges
   - Packages dark sectie vs rest van de light page: transitie (cream → ink → cream) moet bewust voelen
   - Cases metrics row: cijfers `+€1.8M` of `3 dgn → 3 uur` testen op tekstlengte overflow

2. **ContactForm en OfferteForm body** zijn ongemoeid per jouw regel. Ze renderen nu op cream achtergrond in plaats van het oude `bg-dark-950`. Als ze er lelijk uitzien in de editorial chrome, moeten de wrapper-styles in `ContactForm.tsx` / `OfferteForm.tsx` (dark-800, dark-50, brand-600) een lichte polish krijgen, maar field logica blijft hetzelfde.

3. **Privacy, algemene-voorwaarden, brand** — hero's zijn geupdate naar editorial, maar body content behoudt legacy `text-dark-*` en `text-brand-*` classes. Via tailwind-aliases werkt dit, maar typografisch past het niet 100% bij de rest. Niet kritiek, wel "deel 2" werk.

4. **Blog body rendering** is omgezet naar serif H2s en `▸` bullets, maar 19 blog posts zijn niet handmatig door gelezen op HTML breakage. Reken op een visuele review ronde.

5. **Stitch MCP + 21st.dev** — deze subagent sessie had geen toegang tot die MCP tools. Voor een tweede iteratie kun je in een eigen sessie concrete componenten via 21st.dev genereren (robot hero, testimonial wall) en die plug-and-play inbouwen op deze foundation. De design tokens en componenten zijn genoeg modulair dat je stuk voor stuk kunt vervangen.

6. **Nano Banana atmosphere images** — 5 prompts staan klaar in `design-refs/nano-banana-prompts.md`. Goedkeuren + genereren levert warm editorial sfeerbeeld dat je nu mist (hero is pure typografie). Vooral de hero atmosphere en over-ons portrait-replacement zijn meerwaarde.

7. **MaasLogistics blijft in de data** als `isExample: true` voor intern gebruik. Alle publieke views (/cases, homepage CasesV2, homepage TestimonialsV2) filteren hem eruit. Als je hem volledig wilt verwijderen: gewoon het object uit `content/cases.ts` halen.

8. **DESIGN-DECISIONS.md section "Open vragen voor Kaan"** bevat 3 vragen die ik nodig heb voor een vervolgsessie: nano banana generatie akkoord, brand page scope, MaasLogistics volledige verwijdering.

## Blockers die ik moest omzeilen

1. **MCP tools niet beschikbaar** — Stitch MCP en 21st.dev Magic MCP zijn wel in `.mcp.json` van de AI AGENCY APP repo, maar niet aanroepbaar vanuit deze subagent sessie (alleen HubSpot en Vercel MCP waren gedefferd beschikbaar). Omwerkte door hand-crafted componenten te bouwen op basis van UI/UX Pro Max skill output + transcript principes.

2. **Next 16 validation hooks** — tijdens het werk kreeg ik herhaaldelijk Next.js 16 recommendations ("params is async"). Het project draait op Next 14.2.5 waar params synchronous zijn, dus deze zijn genegeerd met een expliciete reden telkens. Geen code wijzigingen.

3. **Legacy dark-* kleuren in oude components** — in plaats van alle 40+ components te refactoren, heb ik legacy aliases (`dark-50` t/m `dark-950`, `brand-50` t/m `brand-900`) behouden in tailwind.config.ts mapped op de nieuwe light palette. Dit betekent dat ContactForm/OfferteForm/ChatWidget/etc. automatisch leesbaar renderen zonder code aanpassingen. Wel een schonere refactor waard in een volgende sessie.

4. **pt-24 wrapper div op elke pagina** — de oude navbar had een vaste height van 16px en elk page wrapper had `pt-24`. De nieuwe floating navbar heeft geen vaste positie, dus ik heb alle `pt-24` wrappers vervangen door `<>` fragments en mijn V2 Content components geven zelf `pt-32 md:pt-40` aan het hero gedeelte.

## Commit log

```
5651c2e V2 stitch: diensten-detail, FAQ, blog, landing, privacy, voorwaarden, brand
ccabfc4 V2 stitch: diensten, cases, packages, over-ons, contact, offerte
6ca3253 V2 stitch: editorial foundation + homepage herontwerp
```

3 atomaire commits, allemaal op branch `v2-stitch-first`, gepusht naar `origin/v2-stitch-first`. Geen merges, geen force-pushes, main nooit aangeraakt. Logo niet aangepast.

## Visual review checklist voor Kaan

- [ ] Homepage hero leest goed op desktop, tablet en mobiel
- [ ] Services grid cards aligneren qua hoogte
- [ ] Cases metrics row overflow test: langste waarde `+€1,8M` rendert correct
- [ ] Packages dark sectie past bij de rest van de light flow
- [ ] Comparison tabel leest goed op mobile (grid-cols-[1.5fr_1fr_1fr])
- [ ] FAQ accordion opens smooth op alle devices
- [ ] Closing CTA op homepage heeft voldoende ademruimte
- [ ] Footer dark ink met gradient sluit goed aan op closing CTA
- [ ] Navbar floating pill blijft leesbaar tijdens scroll op lichte en middelbare achtergronden
- [ ] Mobile menu drawer scroll gedrag werkt
- [ ] /diensten/[slug] pagina: sticky sidebar aside werkt, RichText long description rendert H3s als serif
- [ ] /cases real cases tonen correct, geen MaasLogistics zichtbaar
- [ ] /over-ons Kaan portret nog steeds in beeld
- [ ] /contact en /offerte forms zijn functioneel (form logic ongemoeid)
- [ ] Blog post rendering: H2 serif, bullets triangle, CTA card
- [ ] 23 landing pages rendern zonder layout breuk
