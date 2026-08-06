# Arka Design-Refresh 2026-08 — Volledig logboek

> Alles-op-één-plek referentie van de arkadigital.nl re-do: living gradient, film grain,
> cursor-reactieve hero, en het complete chalky-illustratiesysteem (Ideogram 4.0 lokaal).
> Elk detail, techniek, kleur, tool en beslissing. Bijgewerkt 2026-08-06.

---

## 0. Context & doel

Doel van de refresh: de site "levendig maar kalm en professioneel" maken (moodboard-taal),
met een eigen, gratis, on-brand illustratiestijl en een hero die de pitch draagt. Referenties:
**steep.app** (gradient + grain + verspreide widgets = "kalme maar levendige hero") en
**jasper.ai** (grote mens-centered visual = eye-catcher, hover-element, cijfers, CTA's boven).
Moodboard-bord: `moodboard/Moodboard1.png` (met Kaan's eigen gele notities) + 24 losse webp-refs.

Kernprincipe dat door alles heen loopt: **illustraties spaarzaam als persoonlijkheids-accent**
(hero, blogheaders, af en toe één), **mockups/abstracte-UI waar je capaciteit bewijst**
(diensten, dashboards, cases). Niet elke pagina volgooien = blijft simpel en professioneel.

---

## 1. Branch & workflow

- Werkbranch: **`feature/living-gradient`** (afgetakt van `main`, dat de eerdere homepage- +
  subpagina-refresh al bevat).
- Preview (Vercel, auto-deploy per push): `https://arka-git-feature-living-gradient-xansas-projects.vercel.app`
- Vercel project `arka`, team `xansas-projects` (`prj_ccxihCDpXuEqZhGs7lvWcQLYx9Ll` /
  `team_QFAV8dVeLl0DxKxOuKZXfoGl`). Preview-URL is de **branch-alias**, blijft gelijk per push.
- Elke iteratie: edit → `next build` (typecheck) → `next dev` + Playwright-screenshot ter
  verificatie → commit → push → keuren op preview. Nog NIET gemerged naar `main`.
- Windows/dev: `node node_modules/next/dist/bin/next dev -p <poort>` (npm niet spawnbaar).

---

## 2. Design tokens / kleuren (Tailwind, `tailwind.config.ts`)

| Rol | Token | Hex |
|---|---|---|
| Ink/navy (anchor) | `ink` / `navy` / `slate-ink` | `#0B1220` |
| Ink varianten | `ink.soft` / `ink.mid` | `#152238` / `#1E3A5F` |
| Merk-blauw (accent) | `arka` / `accent` | `#2563EB` |
| Blauw hover | `arka.hover` | `#1D4ED8` |
| Blauw glow | `arka.glow` | `#3B82F6` |
| Cyaan | `cyan` / `cyan.light` | `#06B6D4` / `#22D3EE` |
| Cream (basis) | `cream` / `cream.deep` / `cream.edge` | `#FAF7F2` / `#F3EFE7` / `#E8E3D8` |
| Tekst muted/meta | `slate-muted` / `slate-meta` | `#475569` / `#94A3B8` |

**Extra tinten gebruikt in de mesh** (rechtstreeks als rgba in classes): violet-brug
`rgba(147,170,255,…)` (≈`#93AAFF`), warme perzik-whisper `rgba(246,224,206,…)` (≈`#F6E0CE`).

Let op-divergentie: `app/globals.css` CSS-vars gebruiken een ander blauw (`--arka #2F6BFF`) dan
Tailwind (`#2563EB`). Voor alle nieuwe mesh/hero-werk zijn de **Tailwind-tokens** de bron.

Fonts: **Cormorant Garamond** (serif, koppen) + **Instrument Sans** (body). `arka-wordmark` =
Inter Bold. TTF's voor scripts in `scripts/fonts/`.

---

## 3. Living aurora-gradient

### 3.1 `components/ui/AuroraGradient.tsx` (nieuw)
Multi-hue mesh die (a) per blob op eigen fase shimmert en (b) met **diepte-parallax** naar de
cursor beweegt (blobs vooraan bewegen ~3× meer dan achteraan → zichtbare relatieve beweging
i.p.v. één plat vlak). Alleen `transform` wordt geanimeerd (GPU-goedkoop, blur wordt nooit
herschilderd). `prefers-reduced-motion` → statisch.

- Props: `blobs: AuroraBlob[]`, `className`, `parallax` (basis-px).
- `AuroraBlob`: `className` (positioneel radial-gradient div + blur), `amplitude`, `duration`,
  `delay`, `dir`, `depth` (0 ver / 1 mid / 2 nabij).
- Mechaniek: pointer op `ref.current.parentElement` (de sectie, moet `relative` zijn) →
  genormaliseerd `-0.5..0.5` → `useSpring({stiffness:90,damping:16,mass:0.5})` → drie vaste
  diepte-transforms `useTransform(v => v*parallax*[0.55|1.0|1.65])`.
- Per blob: buiten = parallax-laag (style x/y), binnen = ambient-drift `motion.div`
  (`animate:{x:[…],y:[…],scale:[1,1.06,0.97,1]}`, `duration` per blob, `repeat:Infinity`).
  De `-translate`-centrering van de bulb zit op een aparte inner-div zodat die niet botst met
  de geanimeerde transform.

### 3.2 Homepage-hero mesh (`HeroV2.tsx`), `parallax={110}`, 5 blobs
1. indigo core `rgba(37,99,235,0.22)→0.06@45%→transparent` blur-3xl, depth 1
2. helder blauw `rgba(59,130,246,0.18)` blur-3xl, depth 2
3. cyaan `rgba(6,182,212,0.13)` blur-3xl, depth 2
4. violet-brug `rgba(147,170,255,0.17)` blur-3xl, depth 0
5. warme perzik-whisper `rgba(246,224,206,0.6)` blur-2xl, depth 0

### 3.3 Subpagina-preset `components/ui/HeroAura.tsx` (nieuw)
Zelfde mesh + grain als homepage maar centraal in één component (in één plek te tunen). Na
Kaan's feedback "te subtiel" opgevoerd naar **homepage-niveau**: `parallax={110}`, 4 blobs
(indigo 0.18, cyaan 0.13, violet 0.15, warme whisper 0.52), grain `opacity-[0.4]`.
Uitgerold op alle subpagina-hero's, zie §7.

> `components/ui/LivingGradient.tsx` was de eerste (single-layer) versie; vervangen door
> `AuroraGradient` op de homepage. Nog aanwezig, niet meer in gebruik.

---

## 4. Film grain

Sluit aan bij de grainy/risograph-textuur van de chalk-illustraties → zelfde korrel over
gradient, blog én carousels.

- Utility `.grain` in `app/globals.css`:
  `feTurbulence type=fractalNoise baseFrequency=0.72 numOctaves=3 stitchTiles=stitch` +
  `feColorMatrix type=saturate values=0` (grijswaarden), 200×200 tegel, als SVG-data-URI.
- Toegepast als laag boven de gradient, onder de content:
  `absolute inset-0 grain opacity-[0.4] mix-blend-multiply`.
- **Belangrijke bugfix**: de eerste `.grain`-SVG miste de `</filter>` (rect zat ín de filter),
  waardoor de ruis nauwelijks renderde. Na fixen + opacity 0.22→0.4 werd de grain Steep-niveau
  zichtbaar. `.paper-noise` (baseFrequency 0.85, opacity 0.035) blijft als subtiele papier-textuur.

---

## 5. Hero-herontwerp (`components/sections/v2/HeroV2.tsx`)

Moodboard-conclusie: geen categorie-overline (kop = de pitch/eye-catcher), grote mens-centered
visual + verspreide proof-widgets + cijfers.

- **Overline "Digital Studio, Dordrecht" verwijderd.**
- **Hybride centerpiece**: één grote **HD chalky illustratie** (`/illustrations/hero.png`) +
  twee proof-widgets (organisch verkeer `+212%` kaart, "Nieuwe aanvraag" donkere toast).
- **Cursor-reactief** (Jasper-stijl, duidelijk zichtbaar): pointer op de sectie →
  `useSpring({stiffness:70,damping:18,mass:0.5})`. Illustratie = anker (`x:v*20,y:v*16`),
  widgets poppen + kantelen sterker en tegengesteld (`w1:x*46,y*34,rot*3.5`;
  `w2:x*-40,y*30,rot*-3`). De mesh houdt z'n eigen shimmer + grain.
- **Maatvoering/balans** (na Kaan's feedback): content-schaal ongemoeid, verticale padding
  teruggebracht (`pt-28 pb-16 md:pt-32 md:pb-20 lg:pt-36 lg:pb-20`) zodat de proof-strip
  (24u/0/100%) boven de vouw piept; rechterkolom `lg:-mt-28 xl:-mt-32` omhoog zodat de
  illustratie naast de kop komt (vult leegte rechtsboven, balanceert onderin). Widgets naar de
  hoeken (`-top-3 -right-2` / `-bottom-2 -left-3`) zodat ze de figuur omlijsten i.p.v. bedekken;
  illustratie `object-[42%_center]`.

**HD-les**: een figuur uitsnijden uit een breed 1536-canvas geeft onscherpe upscaling. De hero
is daarom apart gegenereerd op **portret 1088×1280** met de figuur die het frame vult → scherp.

---

## 6. Illustratie-systeem (Ideogram 4.0 lokaal)

### 6.1 Pipeline & modellen
- **ComfyUI** op `127.0.0.1:8188`, RTX 5080 (16GB, Blackwell, native FP4).
- Ideogram 4.0 als **NVFP4** modellen; headless via de `/prompt` JSON-RPC graph (flat, geen UI):
  - `UNETLoader` ×2: `ideogram4_nvfp4_mixed.safetensors` + `…_unconditional_nvfp4_mixed`
  - `CLIPLoader` `qwen3vl_8b_nvfp4.safetensors` type `ideogram4`
  - `CLIPTextEncode` → `DualModelGuider (cfg 5.0)` → `Ideogram4Scheduler (steps 20-22, std 1.75)`
    → `KSamplerSelect euler` → `RandomNoise` → `EmptyFlux2LatentImage` → `SamplerCustomAdvanced`
    → `VAELoader flux2-vae.safetensors` → `VAEDecode` → `SaveImage`.
- **Prompt = JSON** met `high_level_description`, `style_description` (aesthetics/medium/lighting/
  color_palette) en `compositional_deconstruction` (background + elements met bbox).

### 6.2 Stijl-anker & chalky-recept
Referentie: **`arka_3`** ("Recraft-meisje": donker haar, blauw shirt, jongleert data-iconen) in
`docs/design-refresh/ill-samples/handdrawn/`. Bold chalky/krijt-outline, mensen erin, blauw +
cream, korrelige risograph-textuur.

Chalky-aesthetic string: *"loose hand-drawn illustration with a soft chalky oil-pastel and crayon
texture, subtle grainy risograph print grain, rough textured uneven strokes, bold even black ink
outline, flat, matte, minimal, plenty of white space"*. Palet `["#0B1220","#2563EB","#F3EFE7","#FFFFFF"]`.

### 6.3 Geleerde lessen (composities)
1. Meervoud "people" + brede bbox → **menigte kleine figuurtjes**. Fix = single-subject.
2. Multi-object "links…midden…rechts" → **gestapelde vignetten / twee grondlijnen**. Fix = één
   samenhangende beschrijving óf één centraal subject.
3. Tekst-gevoelige objecten (prijskaartjes, schermen, bubbles) → **faux-tekst ("ARKA")**. Fix =
   "absolutely no text, no letters, no numbers, no words, no writing anywhere" + blanco vlakken.
4. Winnende recept (batch v3): **één grote gecentreerde figuur + één duidelijk object**, ruime
   witruimte, bbox gecentreerd `[430,70,1106,590]` op 1536×620.

### 6.4 Scripts (in `C:/Users/kaan9/arka-lora/`)
- `blog_batch.py` — 48 blog-scènes (slug→single-subject prompt), 1536×620, idempotent.
- `hero_gen.py` — HD hero, portret 1088×1280, figuur vult frame, solo (bbox `[130,40,958,1250]`).
- `process_batch.py` — hoek-floodfill bg-removal (tol 42) + autocrop → transparant PNG.
- `contactsheet.py` — review-contactsheets (`sheet_a/b.png`).
- `ideo_library.py` / `run_library.sh` — de eerdere 40-concept × 2-stijl library (marker/chalky).
- `blog_illustrations.py` — (verouderd) thematische hergebruik-mapping; vervangen door unieke gen.
- Backups: `blog_batch_out_v1` (menigte), `_v2` (deels), `blog_batch_out` (v3 = live set).

### 6.5 Bg-removal & verwerking (PIL)
Corner-floodfill vanaf de 4 hoeken met kleur-tolerantie (42-48) → egale lichte achtergrond
transparant; daarna autocrop op bbox met kleine padding (2-4%). Output naar
`public/illustrations/…`.

---

## 7. Blog-illustraties (48 posts)

- Datamodel: `illustration?: string` op `BlogPost` (`content/blog.ts`), taalneutraal. Conventie-
  fallback: `illustration = post.illustration ?? /illustrations/blog/<slug>.png`.
- **Elke post uniek** (geen hergebruik — harde regel van Kaan, "hergebruik oogt goedkoop").
- Rendering (`app/blog/[slug]/page.tsx`): **compact, no-box, gecentreerd** boven het artikel —
  `relative mx-auto w-[72%] max-w-[25rem] aspect-square` + `next/image fill object-contain`.
  Géén cream-kader (die kleurwissel brak de immersie). Strakke spacing (`pt-4 md:pt-6`).
- SEO: JSON-LD `image` + `openGraph.images` gebruiken nu de post-illustratie i.p.v. de generieke
  cover.
- Inline full-width mogelijk via marker `[[illustratie: <naam>]]` in de body (nieuwe block-case
  in `renderContent`), breekt uit de tekstkolom. Optioneel per post.
- 48 v3-illustraties gegenereerd, verwerkt en live op de preview.

---

## 8. Subpagina-uitrol (A2) + diensten-mockups

- `HeroAura` (§3.3) uitgerold op 10 subpagina-hero's: FAQ, Offerte, Packages, Blog-overzicht,
  Landing, Contact, Diensten, Diensten-detail, Cases, Over-ons (elk: bulb-div vervangen door
  `<HeroAura />`, één import). Ink-closings/v2-interne secties nog met statische glow (open, §10).
- **Diensten-overzicht houdt de mockups** (abstracte UI-skeletten per dienst), bewust GEEN
  illustraties → simpel/professioneel, geen overload. Dienst-detailpagina's houden hun ene
  illustratie per pagina.

---

## 9. Beslissingen & feedback (chronologisch, kern)

- Grain moet **duidelijk zichtbaar** (Steep-niveau), niet subtiel → SVG-fix + 0.4.
- Hover-parallax op de blurred wash blijft subtiel → zichtbare hover op **concrete elementen**
  (widgets/illustratie reageren op cursor), niet de mesh grover maken.
- Gradient-kleur: **blauw-dominant + warme whisper** (perzik/crème + vleug violet), blauw leidt.
- Illustraties: **uniek per item**, **no-box**, **editorial/gevarieerd**, arka_3-krijtstijl.
- Blog-illu: compact (~80% tekstbreedte bij brede scène / ~25rem bij single-subject), strakke
  spacing, één per post.
- Hero: **hybride** (illustratie + 2 widgets), cursor-reactief, overline weg, HD, compacter,
  omhoog naast de kop.
- **Diensten-mockups behouden** (geen illustraties overal).

---

## 10. Openstaand (Track C + polish)

- **LinkedIn-carousels (Track C)**: unieke chalky-illustratie op cover + kern-slides embedden in
  `scripts/generate-linkedin-carousels.mjs` via base64 `<image href="data:image/png;base64,…">`
  (readFileSync aanwezig; resvg ondersteunt data-URI). Grain-filter (`#grain`, feTurbulence
  baseFrequency 0.9) zit er al. 10 carousels regenereren + inbakken. NIET hergebruiken.
- Blog **plaatsing-variatie** (editorial: sommige mid-post divider / zij-figuur i.p.v. altijd
  boven) — nog uniform boven.
- A2 afmaken op **ink-closings + v2-interne secties** (grain + living glow).
- Merge `feature/living-gradient` → `main` na Kaan's finale akkoord (via preview).
- Werkboom: losse pre-existing WIP (ContactForm, HeroSection, blog.ts eerdere edits, mailer,
  CLAUDE.md) bewust ongemoeid gelaten bij commits.

---

## 11. Bestandsindex

- Gradient/hero: `components/ui/AuroraGradient.tsx`, `HeroAura.tsx`, `LivingGradient.tsx`,
  `components/sections/v2/HeroV2.tsx`, `app/globals.css` (`.grain`, `.paper-noise`, `.canvas-grid`).
- Blog: `content/blog.ts`, `app/blog/[slug]/page.tsx`, `app/blog/page.tsx`,
  `public/illustrations/blog/*.png` (48), `public/illustrations/hero.png`.
- Subpagina-hero's: `app/faq|offerte|packages|contact|over-ons|cases|diensten/**`,
  `app/[landing]/LandingPageContent.tsx`.
- Illustratie-generatie: `C:/Users/kaan9/arka-lora/*.py`, `*.sh`; ComfyUI `C:/Users/kaan9/ComfyUI`.
