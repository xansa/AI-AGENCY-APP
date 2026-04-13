# Arka V2 Design Decisions

Rationale voor elke significante designkeuze in de V2 Stitch-first redesign. Branch `v2-stitch-first`, datum 2026-04-11.

## Tools gebruikt

| Tool | Gebruikt | Opmerking |
|---|---|---|
| UI/UX Pro Max skill | ja | Design system query + 4 detail searches |
| Stitch MCP | nee | Niet beschikbaar in deze sessie, gedocumenteerd als blocker |
| 21st.dev Magic MCP | nee | Niet beschikbaar in deze sessie |
| Nano Banana (fal.ai) | voorgesteld | Prompts staan klaar in `design-refs/nano-banana-prompts.md`, genereren bij Kaan's goedkeuring |
| Framer Motion | ja | Al geinstalleerd, gebruikt voor subtle fade-in en reveal |

Omdat Stitch MCP en 21st.dev niet aangeroepen kunnen worden in deze autonome sessie (geen mcp tools zichtbaar), bouw ik hand-crafted componenten volgens de UI/UX Pro Max patterns en de principes uit de 5 design-transcripten.

## UI/UX Pro Max query outputs

### Query 1: design system

Query: `"solo digital agency trust professional editorial minimal premium" --design-system`

Output samenvatting:
- Pattern: Minimal Single Column
- Style: Trust & Authority
- Colors voorgesteld: Digital indigo + buy green
- Typography: Inter / Inter (skill kent geen Cormorant + Instrument pairing als beste match voor deze query)
- Avoid: AI purple/pink gradients, playful design, hidden credentials

Besluit: skill output is te minimaal voor een multi-page agency site met 10+ secties op de homepage. We nemen Trust & Authority mee als **overlay** op een Editorial Grid pattern uit query 2.

### Query 2: style

Query: `"editorial minimal serif dark premium" --domain style`

Uit de 5 resultaten gebruikt:
- **Editorial Grid / Magazine** (Result 5): asymmetric grid, pull quotes, drop caps, column layout, print-inspired typography, reveal on scroll. Dit is het hoofdpatroon.
- **Exaggerated Minimalism** (Result 3): `font-size: clamp(3rem, 10vw, 12rem)`, `font-weight: 900`, `letter-spacing: -0.05em`, extreme whitespace, single accent color. Toegepast op hero H1 en section headings.
- **Minimalism & Swiss Style** (Result 2): grid-based, WCAG AAA, `transition 200-250ms`. Basisregels voor hover states en contrast.

### Query 3: typography

Query: `"editorial serif elegant professional" --domain typography`

- Result 2: **Editorial Classic** pairing (Cormorant Garamond + Libre Baskerville). Cormorant Garamond wordt al verplicht door globale CLAUDE.md. We vervangen Libre Baskerville met **Instrument Sans** omdat dat de projectstandaard is en beter leest bij UI elementen.
- Result 1: Classic Elegant (Playfair + Inter) als referentie voor contrast regel.

Besluit: Cormorant Garamond voor alle H1/H2/H3, Instrument Sans voor body en UI, Inter alleen als system fallback. Het logo blijft Inter bold (regel uit `feedback_never_touch_logo.md`).

### Query 4: landing

Query: `"hero social-proof pricing case studies" --domain landing`

- Result 1: **Hero + Testimonials + CTA** pattern. Section order: Hero, Problem, Solution, Testimonials, CTA. CTA placement hero sticky + post-testimonials.

Aangepast voor Arka:
1. Hero
2. Proof strip (3 harde cijfers uit cases)
3. Services grid (6 disciplines)
4. Werkwijze (4 stappen)
5. Cases (2 echte)
6. Packages (3 tiers met toggle)
7. Comparison tabel (Arka vs bureau)
8. Testimonials (uit cases.ts)
9. FAQ
10. Closing CTA

### Query 5: color

Query: `"warm cream off-white sophisticated neutral" --domain color`

- Result 5: **Museum/Gallery** (#18181B primary, #FAFAFA bg, #09090B text). Dichtste match voor editorial premium.
- Result 3: Knowledge Base (#2563EB link blue) bevestigt blue als CTA kleur.

**Arka V2 palette (finaal):**

| Token | Hex | Gebruik |
|---|---|---|
| `--cream` | `#FAFAF7` | Page background, off-white warm |
| `--ink` | `#0E1116` | Dark sections, contrast blocks |
| `--slate-ink` | `#0F172A` | Primary text, near-black |
| `--slate-muted` | `#475569` | Body text muted |
| `--slate-meta` | `#94A3B8` | Meta, labels, captions |
| `--line` | `#E5E7EB` | Hairline borders, dividers |
| `--line-soft` | `#F1F5F9` | Subtle section separators |
| `--arka-blue` | `#2F6BFF` | Primary CTA, links, numeric highlights |
| `--arka-blue-hover` | `#1F4FD6` | CTA hover |

Dit vervangt de huidige dark tokens in `tailwind.config.ts`. Het bestaande `primary`, `accent`, `cyan`, `background`, `surface` blijft bestaan als alias zodat oudere componenten niet breken tijdens de migratie.

## Design principes uit transcripten

### Opacity hierarchy (Six Design Techniques)
- 100% = headings, H1-H3, stats
- 75% = body paragraphs
- 55% = meta, labels, captions, breadcrumbs

### Visual rhyming (Six Design Techniques)
- Logo = Arrow-A met ingesloten driehoek naar beneden-rechts
- Terugkerende motief: driehoekjes als list bullets, numeric corner markers op cards, small triangle glyph in section overline labels (`▸ Wat we doen`)
- Subtle, niet in your face

### Border/ring techniek (Marketing Page transcript)
- `ring-1 ring-slate-950/10` vervangt zware borders
- Cards hebben ring ipv border, geen drop shadow

### Canvas grid (Marketing Page transcript)
- Decoratieve grid overlay in hero en bepaalde accent secties
- Subtle, 1px dashed #E5E7EB, alleen in zones met veel witruimte

### Star of the show (Six Design Techniques)
- Hero H1 domineert volledig de fold, alles anders is secundair
- Op elke pagina moet ÉÉN element duidelijk de ster zijn

## Component / pattern keuzes

### Navbar
- Floating: `top-4 left-4 right-4`, `rounded-2xl`, `bg-white/80 backdrop-blur`, `ring-1 ring-slate-950/5`
- Logo links, nav rechts, CTA button uiterst rechts
- Mobile: drawer met slide-in

### Buttons
- Primary: `bg-ink text-cream` (donker op licht, hoog contrast)
- CTA accent: `bg-arka-blue text-white`
- Secondary: `ring-1 ring-slate-950/15 text-slate-ink bg-transparent hover:bg-slate-ink/5`
- Rounded: `rounded-full` voor editorial feel (in tegenstelling tot de oude rounded-lg)

### Cards (services, cases, packages)
- `rounded-xl`, `ring-1 ring-slate-950/8`, `bg-cream/60`, `p-8`
- Hover: `ring-slate-950/15`, lift via `translate-y-[-2px]`, 250ms
- Parallel alignment: `flex flex-col h-full` + `flex-1` spacer voor footer row alignment
- Body text: `line-clamp-3` met consistent `min-h`

### Section overline label
- Small uppercase label met triangle glyph, slate-meta kleur
- Voorbeeld: `▸ WAT WE DOEN`

### H1/H2 headings
- Cormorant Garamond, weight 500 (semi), niet 700. Serif headlines lezen eleganter op 500.
- `clamp(2.5rem, 6vw, 5.5rem)` voor H1 hero
- `clamp(2rem, 4vw, 3.5rem)` voor H2 section headings
- `letter-spacing: -0.02em`, line-height 1.05

## Anti-patterns expliciet vermeden

- Geen neon, geen glow effects, geen AI-look gradients
- Geen drop shadows onder cards (ring vervangt)
- Geen centered single-column hero (Exaggerated Minimalism pattern is asymmetric)
- Geen placeholder stock photos
- Geen em-dashes
- Geen "revolutionair", "next-level", "cutting edge", "innovatief" in copy (BRAND_DONTS)

## Accessibility checklist

- Contrast: body text #475569 op #FAFAF7 = 7.1:1, ruim boven WCAG AAA
- Focus rings op alle interactive elements: `focus-visible:ring-2 focus-visible:ring-arka-blue`
- Alle buttons en links `cursor-pointer`
- `prefers-reduced-motion` respecteren in Framer Motion via `useReducedMotion()`
- Min touch target 44px op mobile

## Scope voor deze sessie

Omdat een volledige 13-pagina redesign in een autonome sessie onrealistisch is, focus ik op:

**Must-have (deze sessie):**
1. Nieuwe design tokens in tailwind.config + globals.css
2. Nieuwe Navbar, Footer
3. Nieuwe homepage (Hero, ProofStrip, Services, Werkwijze, Cases, Packages, Comparison, Testimonials, FAQ, Closing)
4. Build passes, push naar `v2-stitch-first`, deploy

**Nice-to-have (als tijd het toelaat):**
5. `/diensten` overview + detail template
6. `/cases` overview met echte cases only (Display-pallets, DPL)
7. `/packages`
8. `/over-ons`
9. `/contact`, `/offerte` wrapper polish

**Out of scope:**
- Blog detail redesign
- 23 landing pages individueel tweaken (generieke template update is genoeg)
- Privacy, algemene-voorwaarden, brand pagina (behouden)
- Cases detail pagina (template blijft, content wel filteren op echte cases)

## Open vragen voor Kaan

1. Wil je de dark hero atmosphere images van Nano Banana laten genereren, of blijft de hero puur typografisch?
2. Moet de huidige `/brand` pagina ook een V2 refresh krijgen of blijft hij hetzelfde?
3. Mag ik MaasLogistics definitief uit `content/cases.ts` van arka-v2 verwijderen (het is een fake case)?
