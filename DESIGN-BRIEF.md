# Arka V2 Design Brief

Onderdeel van de V2 Stitch-first redesign. Geschreven op 2026-04-11 op branch `v2-stitch-first`.

## 1. Target audience

**Primair:** MKB-eigenaren en directeuren (5-50 medewerkers), 30-55 jaar, primair in Dordrecht en Drechtsteden, secundair heel Nederland. Sectoren: zakelijke dienstverlening, horeca, logistiek, bouw, zorg, retail.

**Secundair:** ZZP'ers en scale-up founders (25-45), doen alles zelf, verouderde website, geen tijd voor marketing.

**Taal:** Nederlands, informeel maar zakelijk. Geen jij/jou versus u gedoe, altijd je. Tone: direct, eerlijk, zelfverzekerd zonder arrogantie. Geen corporate jargon.

## 2. Star of the show

Eén centrale boodschap die door de hele site klinkt:

> **Arka is wat je krijgt als je een compleet digitaal team huurt, zonder de overhead van een bureau.**

Wat de bezoeker moet voelen als ze op de homepage landen:

1. **Rust.** Geen drukke hero met 15 buttons en blinkende stats. Eén duidelijke focus per sectie, veel witruimte, editorial ritme.
2. **Vertrouwen.** Concrete cases met echte cijfers. Geen stockfoto's, geen fake testimonials.
3. **Directheid.** Solo founder, geen account managers. Dat moet voelbaar zijn in de copy en in het design (geen zichtbaar bureau-apparaat).
4. **Kwaliteit zonder poeha.** Het design zelf moet $10K waard voelen, niet omdat het druk is maar omdat de details kloppen. Typografie, spacing, ritme.

## 3. Brand anchors

- **Kleuren:** Editorial light als basis (cream/off-white #FAFAF7), slate navy voor tekst (#0F172A), arka blue accent (#2F6BFF), een ink-dark sectie kleur (#0E1116) voor contrast blokken. Accent gebruikt zuinig, alleen voor CTA's, links en numerieke highlights.
- **Typografie:** Cormorant Garamond (serif, headlines, oversized) + Instrument Sans (body, UI). Inter blijft fallback. Dit is vastgelegd in globale CLAUDE.md en wordt niet losgelaten.
- **Logo:** Arrow-A icon blijft zoals het is. "Arka" wordmark blijft Inter bold met blauwe punt. Niet aanraken.
- **Iconen:** Lucide, 1.5px stroke, subtiel gekleurd. Geen emoji.
- **Visueel motief:** driehoek uit het Arrow-A logo keert terug als subtiel ritme element (bullets, section dividers, list markers). Visual rhyming principe uit Six Design Techniques transcript.

## 4. Copy brief per sectie (homepage)

### Hero
- H1: "Jouw digitale afdeling, zonder de overhead."
- Sub: 1 zin. "Websites, SEO, chatbots, dashboards en lead generation. Alles onder een dak, geleverd door dezelfde persoon die je offerte schrijft."
- CTA primary: "Plan kennismaking" → /contact
- CTA secondary: "Bekijk werk" → /cases
- Meta onder CTA: "Reactie binnen 24 uur. Gevestigd in Dordrecht."

### Proof strip (onder hero)
- Drie harde cijfers uit echte cases, horizontaal. Geen carousel, geen slider.
- +285% verkeer, 24u -> 2 min respons, top 3 Google positie
- Klein label: "Resultaten van echte klanten"

### Wat we doen (Services)
- Oversized serif heading: "Zes disciplines, een aanspreekpunt."
- 6 service cards in 3-koloms grid, editorial stijl. Borders ipv schaduwen. Zelfde hoogte, line-clamp op body.
- Elke card: icon (lucide), naam, 2 regels uitleg, "Meer" link.

### Hoe wij werken (Werkwijze)
- 4 stappen horizontaal met serial numbers (01, 02, 03, 04) in serif.
- Kennismaking → Plan → Bouwen → Groeien.
- Subtiel divider lijn, geen kaarten.

### Cases
- 2 echte cases (Display-pallets en DPL), grote landscape afbeeldingen of number-only blocks als er geen beeld is.
- Elke case: metric-heavy, quote, link naar detail.

### Packages
- 3 tier cards: Starter, Professional, Enterprise.
- Maandelijks / eenmalig toggle.
- Prijzen uit content/packages.ts.
- "Populair" badge op Professional.

### Vergelijking (bestaat al, polish)
- "Arka vs. traditioneel bureau" tabel, 6 rijen. Editorial stijl met subgrid alignment.

### FAQ
- Accordion, 6 meest gestelde vragen.

### Closing CTA
- Groot serif statement. "Laten we praten."
- Contact info + Calendly link.

## 5. Globale layout principes

1. **Max-width:** `max-w-6xl` (72rem) voor content containers, `max-w-7xl` voor hero en proof strips die ademruimte nodig hebben. Consistent.
2. **Sectie padding:** `py-24 md:py-32` voor main sections, `py-16` voor secundaire.
3. **Grid gap:** `gap-8` standaard, `gap-12` voor oversized editorial.
4. **Radii:** `rounded-xl` (12px) voor cards, `rounded-lg` (8px) voor buttons. Geen zwaardere radii.
5. **Shadows:** geen drop shadows. Alleen `ring-1 ring-slate-950/8` als border-vervanger voor depth (technique uit Six Design Techniques transcript).
6. **Opacity hierarchy:** 100% voor headings, 75% voor body text, 55% voor meta/labels. Consistent toepassen.
7. **Geen drop shadows onder logos of icons.** Platte editorial look.

## 6. Pagina's in scope

- `/` homepage
- `/diensten` + `/diensten/[slug]`
- `/cases` + `/cases/[slug]` — echte cases gebruiken
- `/packages`
- `/over-ons`
- `/contact` — form-wrapper polish, field logic ongemoeid
- `/offerte` — form-wrapper polish, field logic ongemoeid
- `/faq`
- `/blog` + `/blog/[slug]`
- `/[landing]` — 23 SEO landing pages

## 7. Pagina's ongemoeid

- `/privacy`, `/algemene-voorwaarden`, `/brand` blijven zoals ze zijn tenzij ze er kapot uitzien in de nieuwe chrome (navbar/footer).

## 8. Non-goals

- Geen dark mode als default. Light editorial is de hoofdstijl. Wel dark sections als accent.
- Geen blinkende animaties of parallax. Subtle fade-in + opacity hierarchy is genoeg.
- Geen stock imagery. Alleen geometrische blokken of nano-banana generated atmosphere.
- Geen em-dashes.
