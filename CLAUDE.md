# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **IMPORTANT:** Do not make any changes until you have 95% confidence in what you need to build. Ask follow-up questions until you reach that confidence.

## Arka V2 (testomgeving)

**Alle UI/design wijzigingen aan de Arka website gaan naar Arka V2**, niet naar main. De live site (arkadigital.nl) staat op LinkedIn en bij klanten, dus geen ongeteste wijzigingen pushen naar main/production.

- **V2 repo:** `xansa/arka-v2` op GitHub, apart Vercel project
- **Wanneer naar main:** pas na expliciete goedkeuring van Kaan, na visuele review op V2
- **Wat wel direct op main mag:** bugfixes, content updates (blog, FAQ, kennisbank), security patches, cron/API fixes

## Design workflow: Stitch-first

Voor nieuwe pagina's of redesigns (Arka of klantprojecten), start altijd met visuele richting voordat er code geschreven wordt:

1. **Verzamel referenties** (Dribbble, Pinterest, live sites) voor inspiratie
2. **Stitch 2.0** (Google): upload screenshots/referenties, genereer visuele variaties, combineer beste elementen (layout A + typografie B + kleuren C)
3. **Verfijn het design system** in Stitch: fonts, kleuren, spacing, button styles, card styles
4. **Export naar Claude Code** wanneer het ontwerp 80-90% staat
5. **Claude bouwt en polijst**: Framer Motion animaties, responsive, dark/light, component polish

Dit geldt voor /nieuw-klantsite, Arka V2 redesign, en individuele pagina-redesigns.

## Design tools (MCP + Skills)

- **21st.dev Magic MCP** — genereert moderne React/Tailwind componenten vanuit prompts. Config in `.mcp.json` (gitignored)
- **Stitch MCP** (`@_davideast/stitch-mcp`) — exporteert Google Stitch designs + `DESIGN.md` naar het project. Config in `.mcp.json`
- **UI/UX Pro Max Skill** — searchable design database: 161 kleurpaletten, 57 font pairings, 50+ UI styles, 99 UX guidelines. Locatie: `.claude/skills/ui-ux-pro-max/`
- **Recraft V4** — SVG + raster image generation (logo's, icons, foto's, mockups). Nog niet gekoppeld, wordt pas geactiveerd bij Arka V2 redesign of eerste klantproject
- **fal.ai (Nano Banana)** — AI image generation via API. Key beschikbaar als `process.env.FAL_KEY`. Gebruik via Python:

```python
import fal_client, os, urllib.request
result = fal_client.subscribe('fal-ai/nano-banana-2', arguments={
    'prompt': 'beschrijving hier',
    'image_size': 'landscape_16_9',  # of: square_hd, portrait_4_3, landscape_4_3, square
    'num_images': 1
})
url = result['images'][0]['url']
urllib.request.urlretrieve(url, 'output.png')
```

Beschikbare modellen:
- `fal-ai/nano-banana-2` — beste kwaliteit, tekst in beeld, character consistency
- `fal-ai/nano-banana` — sneller, goedkoper
- `fal-ai/nano-banana-pro` — premium variant
- `fal-ai/flux/schnell` — snelste optie, goed voor iteratie

Workflow: genereer EERST een prompt, laat Kaan goedkeuren, DAARNA pas genereren

## Commands

```bash
npm run dev        # start dev server (see Windows note below)
npm run build      # production build — always run to catch type errors before shipping
npm run lint       # ESLint
```

**Windows:** The `launch.json` dev config uses `node node_modules/next/dist/bin/next dev` directly because `npm` cannot be spawned on Windows from the preview tool. `autoPort: true` is set — the server auto-picks a free port when 3000 is in use.

There are no automated tests in this project.

---

## Stack

Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · react-hook-form + Zod · Resend · Supabase · Anthropic SDK · HubSpot CRM. All UI copy is **bilingual (NL/EN)** via client-side i18n.

---

## Critical architectural patterns

### 1. Server / client page split (metadata + interactivity)

Next.js 14 cannot export `metadata` from a `"use client"` file. Every interactive page uses a two-file pattern:

```
app/contact/page.tsx       ← server component: exports metadata, renders <ContactForm />
app/contact/ContactForm.tsx ← "use client": react-hook-form, state, API calls
```

Never add `"use client"` to a `page.tsx` that needs `metadata`.

### 2. Page title template

`app/layout.tsx` sets:
```typescript
title: { template: "%s | Arka", default: "Arka — Jouw digitale afdeling, zonder de overhead." }
```
- Sub-pages: `title: "Pagina naam"` → renders as `"Pagina naam | Arka"`
- Homepage: `title: { absolute: "Arka — Jouw digitale afdeling, zonder de overhead." }` to bypass the template

### 3. Chatbot — two-tier routing (`app/api/chat/route.ts`)

The chat API avoids Anthropic token usage for ~70% of messages:

```
User message
    │
    ▼
Tier 1 — Intent Matcher (lib/intent-matcher.ts)       ← zero tokens
    keyword scoring against ~20 Dutch intent definitions
    used only when conversation ≤ 4 messages
    │ no match
    ▼
Tier 2 — Claude API (lib/ai.ts)                       ← tokens used
    full knowledge base injected into system prompt
    model: claude-3-5-haiku-20241022 (override via CLAUDE_MODEL env var)
    max_tokens: 512
```

**Chatbot knowledge base** (`content/knowledge-base.ts`) is the single source of truth for all chatbot responses. It is injected into the Claude system prompt and also sourced by the intent matcher's static responses. When prices or services change, update both `content/knowledge-base.ts` **and** the relevant intent's `response` string in `lib/intent-matcher.ts`.

**Adding an intent:**
```typescript
// lib/intent-matcher.ts → INTENTS array
{
  id: "my-intent",
  keywords: ["dutch", "keyword", "list"],   // 2 pts each on match
  boostKeywords: ["optional", "extras"],    // 1 pt each
  response: "Static reply text (markdown supported)...",
  cta: "Optional call-to-action appended after response",
},
```

The `MarkdownText` component inside `ChatWidget.tsx` renders `**bold**`, `[link](url)`, and `\n`/`\n\n` for assistant messages.

### 4. Content data layer (`content/*.ts`)

All business data (services, packages, cases, FAQ, knowledge base, brand context, landing pages) lives in typed TypeScript files under `content/`. These are imported by both pages and the chatbot. `content/brand-context.ts` exports `BRAND_CONTEXT` with the complete brand identity: kleuren, typografie, voice & tone, doelgroep, en richtlijnen voor Instagram carousels en LinkedIn posts. Use this as the single source of truth for all social media and visual content generation. Dynamic routes like `app/diensten/[slug]/page.tsx` use `generateStaticParams()` driven by the content arrays -- adding a new service means adding an entry to `content/services.ts`, not creating a new page file.

Services have both a short `description` (used in metadata/cards) and a `longDescription` (600-800 words, rendered on detail pages via `RichText` component in `DienstDetailContent.tsx`). The `longDescription` supports `**bold**` and `- list` markdown syntax.

Content data files use `_en` suffix fields for English translations (e.g., `title` + `title_en`, `deliverables` + `deliverables_en`). The Dutch field is the default and used by server components for metadata/JSON-LD (SEO). The `_en` field is picked up by client components via the `l()` / `la()` helpers.

### 4b. i18n system (NL/EN)

Client-side i18n via React Context + localStorage. No URL-based routing (no `/en/` prefix).

**Core files:**
- `lib/i18n/LanguageContext.tsx` -- `Locale` type (`"nl" | "en"`), `LanguageProvider`, `useLanguage()` hook
- `lib/i18n/translations.ts` -- ~320 translation keys as `{ nl: string, en: string }` objects
- `lib/i18n/useTranslation.ts` -- `useTranslation()` returns `{ t, locale }`
- `lib/i18n/localize.ts` -- `l(item, field, locale)` for strings, `la(item, field, locale)` for arrays

**Pattern for content data localization:**
```typescript
import { useTranslation, l, la } from "@/lib/i18n";
const { t, locale } = useTranslation();
// UI text:  t("dienstenPage.heading")
// Content:  l(service, "title", locale)      -- picks title_en when locale is "en"
// Arrays:   la(pkg, "deliverables", locale)   -- picks deliverables_en when locale is "en"
```

**Subpage pattern:** Server `page.tsx` exports metadata (always Dutch for SEO) and renders a client `*Content.tsx` component that uses `useTranslation()` and `l()`/`la()` for all visible text. Examples: `DienstenContent.tsx`, `CasesContent.tsx`, `FAQContent.tsx`, `OverOnsContent.tsx`, `PackagesPageContent.tsx`, `ContactPageContent.tsx`, `OffertePageContent.tsx`.

**Adding a new translation:** Add key to `translations.ts`, use `t("key")` in client components.

### 4a. Blog auto-publish system

`content/blog.ts` contains 27 blog posts (1,200-1,500+ words each) with `publishedAt` date strings. The helper `getPublishedPosts()` filters posts where `publishedAt <= today` and sorts newest first. Blog pages use `revalidate = 3600` (ISR, hourly) so new posts appear automatically on their scheduled date without manual deploys. The `/init` skill checks the blog queue and warns when fewer than 3 posts remain unpublished.

### 4c. SEO landing pages (`content/landing-pages.ts`)

Data-driven local SEO landing pages. `content/landing-pages.ts` exports a `landingPages` array with 23 entries (3 Dordrecht/Drechtsteden + 20 for 10 Dutch cities). Each entry has `slug`, `h1`, `subtitle`, `body`, `cta`, `targetKeywords`, all with `_en` translations.

The `app/[landing]/page.tsx` dynamic route uses `generateStaticParams()` from the array. Each page renders `LandingPageContent.tsx` (client) with `ProfessionalService` + `BreadcrumbList` JSON-LD. Landing pages have priority 0.9 in the sitemap.

**Adding a new city:** Add an entry to `content/landing-pages.ts` with a unique slug. The page, sitemap entry, and JSON-LD are generated automatically.

### 5. Shared Zod validation (`lib/validators.ts`)

All form schemas (contact, offerte, chat) are defined once with Zod and shared between client-side `react-hook-form` validation (via `@hookform/resolvers`) and server-side API route validation. Keep schemas in sync, never duplicate validation logic.

### 6. Brand color palette (Tailwind)

`tailwind.config.ts` defines semantic color tokens: `primary`, `accent`, `cyan`, `background`, `surface`, `text`. Use these instead of raw Tailwind colors (e.g., `bg-primary` not `bg-blue-900`). The `brand` and `dark` scales exist for backward compatibility.

### 6b. Brand fonts

Brand pairing is **Cormorant Garamond** (serif headlines, anchor font) + **Instrument Sans** (body). TTF files voor offline rendering door scripts staan in `scripts/fonts/` (Regular, SemiBold, Bold). Web rendering loadt via Google Fonts / `next/font`. Inter blijft tertiaire fallback.

### 7. Lazy singletons for optional services

Resend (`lib/mailer.ts`), Supabase (`lib/supabase.ts`), and HubSpot (`lib/hubspot.ts`) are initialized only when their env vars are present. This allows `npm run build` and local dev to succeed without any keys configured. The pattern:

```typescript
let _client: Client | null = null;
function getClient() {
  if (_client) return _client;
  const key = process.env.API_KEY;
  if (!key) return null;          // silently skip
  return (_client = new Client(key));
}
```

All exported async functions call `getClient()` and return early if `null`.

### 8. AI provider interface

`lib/ai.ts` exports an `AIProvider` interface with a single `chat()` method. `ClaudeProvider` implements it. To swap to a different LLM, implement the interface and change the factory:

```typescript
export function createAIProvider(): AIProvider {
  return new ClaudeProvider(); // swap here
}
```

### 9. FormField component

`components/ui/FormField.tsx` renders an `<input>`, `<textarea>`, or `<select>` depending on which props are provided (`inputProps` / `textareaProps` / `selectProps`). The `selectProps` type extends `React.SelectHTMLAttributes` with an extra `placeholder?: string` and `options: {value, label}[]`. The `placeholder` is not a native HTML select attribute, it renders as the first disabled option.

### 10. Button type safety

`components/ui/Button.tsx` uses `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">` to strip the four event handlers that Framer Motion redefines with incompatible types. This allows `{...props}` to spread into `motion.button` without a cast.

### 11. Icons

`lucide-react` is the icon library. Service data in `content/services.ts` stores icon names as strings (e.g., `"Globe"`). Import the matching Lucide component by name.

### 12. Cookie banner

`components/ui/CookieBanner.tsx` shows a GDPR-style cookie consent banner on first visit. Uses `localStorage` key `arka-cookie-consent` (values: `"accepted"` or `"declined"`). Bilingual via `useTranslation()`. Links to `/privacy`. Loaded in `app/layout.tsx` inside `LanguageProvider`.

### 13. Email sequences

`content/email-sequences.md` contains 2 Smartlead cold outreach sequences (4 emails each, 12-day cadence). Uses Smartlead variables `{{voornaam}}`, `{{bedrijf}}`, `{{website}}`, `{{branche}}`, `{{stad}}`. Sent via arkagroup.nl / arkadigitaal.nl domains (never arkadigital.nl).

---

## Environment variables

Copy `.env.example` to `.env.local`. Only `ANTHROPIC_API_KEY` is required for the chatbot; everything else degrades gracefully.

| Variable | Required | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | For Tier 2 chat | Claude API |
| `CLAUDE_MODEL` | No | Override model (default: `claude-3-5-haiku-20241022`) |
| `RESEND_API_KEY` | No | Contact/offerte emails |
| `RESEND_FROM_EMAIL` | No | Sender address |
| `RESEND_TO_EMAIL` | No | Recipient address |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Lead/chat log storage |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Supabase public key |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Supabase admin key |
| `HUBSPOT_ACCESS_TOKEN` | No | HubSpot CRM (contacts + deals) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for OG tags |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Calendly intake link |
| `AI_ARK_API_KEY` | No | AI Ark B2B enrichment (lead qualifier) |
| `CRON_SECRET` | For crons | Secures cron API endpoints (social media + lead qualifier) |

---

## Company info

- **Name:** Arka
- **Tagline:** "Jouw digitale afdeling, zonder de overhead."
- **Location:** Dordrecht, Nederland
- **Email:** info@arkadigital.nl
- **Phone:** +31 6 46140986
- **LinkedIn:** linkedin.com/company/arka-nl
- **BTW:** NL005424960B92
- **KVK:** 42000761
- **Structure:** Solo operation
- **Services:** Websites & Webshops, SEO & Content, AI Chatbots & Automatisering, Dashboards & Data, Lead Generation, Branding & Design
- **Response time:** 24 uur (was 48u, geüpdatet 2026-03-25)
- **Packages:**
  - Starter: Maandelijks vanaf €1.000/mnd, Eenmalig vanaf €2.500
  - Professional: Maandelijks vanaf €2.750/mnd, Eenmalig vanaf €7.000
  - Enterprise: Maandelijks vanaf €5.500/mnd, Eenmalig vanaf €18.000

## Deployment

- **Hosting:** Vercel (project name: `arka`, team: `xansas-projects`)
- **Domain:** `arkadigital.nl` (live, DNS at TransIP, A records → `76.76.21.21`)
- **www redirect:** `www.arkadigital.nl` → 308 redirect to `arkadigital.nl`
- **Domain redirects:** `arkadigitaal.nl`, `arkadigitaal.online`, `arkagroup.nl` (+ www variants) → 308 redirect to `arkadigital.nl` via `middleware.ts`
- **Production URL:** `arka-tan.vercel.app` (Vercel default subdomain)
- `metadataBase` in `app/layout.tsx` uses `arkadigital.nl` via `NEXT_PUBLIC_SITE_URL`

## Brand assets

`/public/brand/` contains SVG and PNG logo variants, profile images, cover banners, and LinkedIn assets. The `/brand` page (noindex) provides a visual overview with download buttons. To regenerate PNGs from SVGs: `node scripts/svg-to-png.mjs` (requires `@resvg/resvg-js` devDependency).

`scripts/fonts/` bevat de TTF bestanden voor scripts die buiten de Next.js runtime renderen (carousel generator, PDF bundler): Cormorant Garamond Regular/SemiBold/Bold en Instrument Sans. Niet weghalen of verplaatsen, de scripts laden ze via absolute paden.

LinkedIn assets: `linkedin-profile.svg/.png` (400x400 profile), `linkedin-cover-personal.svg/.png` (1584x396 Kaan's cover), `linkedin-cover-company.svg/.png` (1128x191 company cover). Square logo variant: `logo-icon-dark-square.svg/.png` (no rounded corners).

## Structured data

`app/layout.tsx` includes a JSON-LD script with `LocalBusiness` + `ProfessionalService` schema (name, address, geo, services, contact info). Update the `jsonLd` object when company details change.

Additional JSON-LD structured data per pagina:
- `app/blog/[slug]/page.tsx` — `BlogPosting` schema (headline, author, datePublished, keywords)
- `app/diensten/[slug]/page.tsx` — `Service` schema (name, description, provider, areaServed)
- `app/faq/page.tsx` — `FAQPage` schema (all questions + answers for Google rich results)

## SEO

- All pages have `alternates.canonical` URLs pointing to `arkadigital.nl`
- Blog detail pages have OpenGraph `article` metadata (publishedTime, authors, tags)
- `app/sitemap.ts` uses `getPublishedPosts()` to only include published blog posts (not future-dated)

## Security headers

`next.config.mjs` sets security headers on all routes:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`

API routes validate `Content-Type: application/json` and do not expose Zod validation details to clients. `lib/mailer.ts` escapes all user input with `escapeHtml()` before injection into HTML email templates.

## Middleware

`middleware.ts` handles host-based domain redirects. Requests to `arkadigitaal.nl`, `arkadigitaal.online`, `arkagroup.nl` (and their www variants) are 308-redirected to `arkadigital.nl`. The matcher excludes static assets (`_next/static`, `_next/image`, `favicon.ico`, `icon.svg`, `brand/`).

## Known constraints

- `next.config.mjs`: Next.js 14.2.5 does not support `next.config.ts`, keep it as `.mjs` with JSDoc types
- No test framework is configured

## Social media agent

> **VERPLICHT bij ELKE social media taak**: lees eerst `C:/Users/kaan9/Documents/Obsidian Vault/Projecten/Social Media.md`. Dit is de SINGLE SOURCE OF TRUTH voor alle LinkedIn-content van Kaan's ventures (Kaan persoonlijk, DPL, Arka). Wanneer je een post aanmaakt, wijzigt, of Kaan meldt dat iets geplaatst is: werk dit Obsidian-bestand bij. Mapnummering `post-01` t/m `post-11` is PUBLICATIEVOLGORDE en mag nooit willekeurig hernoemd worden. Bij conflict wint het Obsidian-bestand.

`lib/social-media-agent.ts` generates LinkedIn posts via Claude and stores them in Supabase (`social_media_posts` table). Notifies via Resend email.

- **API route:** `app/api/social-media/generate/route.ts` (POST + GET, secured with `CRON_SECRET`)
- **Cron:** `vercel.json` schedules generation at `0 8 * * 1,3,5` (ma/wo/vr 08:00 UTC)
- **Fallback:** If no `ANTHROPIC_API_KEY`, picks a random pre-written post from `content/linkedin-posts.ts`
- **Supabase table:** `social_media_posts` (id, content, hashtags, category, hook, source, status, platform, published_at, created_at)
- **Pre-written posts:** 11 LinkedIn posts in `content/linkedin-posts.ts` (inclusief introductiepost). Categories: introductie, thought-leadership, case-study, praktische-tip, founder-perspectief, behind-the-scenes. IDs matchen de folder-nummering (post-01 t/m post-11 = publicatievolgorde).
- **LinkedIn post folders:** `content/linkedin/post-XX-slug/` met `tekst.md` (copy-paste ready), `carousel/` (1080x1080 PNG slides), en `{folder}.pdf` (bundled carousel voor LinkedIn document upload). Mapnummering is **publicatievolgorde, niet content-topic volgorde**. Totaal: 52 slides + 10 PDFs over 11 posts. `post-01-introductie` is tekst-only (geen carousel), `post-09-werkdag` heeft alleen een cover slide.
- **Carousel generator:** `node scripts/generate-linkedin-carousels.mjs` rendert SVG templates naar PNG via `@resvg/resvg-js` en bundelt daarna per post alle slides in een PDF via `pdf-lib`. Uses brand fonts Cormorant Garamond + Instrument Sans (TTFs uit `scripts/fonts/`). Design principes toegepast: content vertical centering, consistent footer strip (mark + URL + pagination), opacity hierarchie 100/70/50, alternerende dark/cream themes voor ritme, visual rhyming via triangle motief uit Arrow-A logo, subtle depth via radial gradient + noise filter. Vier slide types: cover, content, stat, closing.
- **Barrel export:** `content/linkedin/index.ts` re-exports from `linkedin-posts.ts` for backward compatibility

## Supabase tables

Three tables are configured (RLS enabled, service_role full access):
- `social_media_posts` — Generated/pre-written LinkedIn post drafts
- `chat_logs` — Chatbot conversation logs (upsert by session_id)
- `leads` — Contact/offerte form submissions

## Lead Qualifier Agent

Automated lead scoring via daily cron. Fetches new HubSpot contacts (25h window), analyzes their website, scores 0-100, updates HubSpot.

- **API route:** `app/api/lead-qualifier/route.ts` (GET + POST, secured with `CRON_SECRET`)
- **Cron:** `vercel.json` schedules at `0 7 * * *` (dagelijks 07:00 UTC, Hobby plan limiet)
- **Website analyzer:** `lib/lead-qualifier/website-analyzer.ts` (zero-cost: fetches website, detects tech stack via HTML patterns, checks response time)
- **AI Ark client:** `lib/lead-qualifier/ai-ark.ts` (NIET in gebruik voor Arka, bewaard voor DPL. Credits beter besteed aan De Palletleverancier)
- **Scoring engine:** `lib/lead-qualifier/scorer.ts` (weighted 0-100: website quality 30, company size 20, budget 25, has website 15, location 10)
- **Score tiers:** hot (70-100) / warm (45-69) / cold (0-44)
- **Hot lead actions:** deal promoted to "Offerte fase", email notification to kaan@arkadigital.nl
- **HubSpot property:** `lead_score` (number, custom property on contacts)
- **Backfill mode:** de route accepteert `?mode=backfill` (paginated, skipt date filter, geen email notifications tijdens backfill). Voor lokale runs bestaat `scripts/backfill-lead-scores-local.mjs` die direct HubSpot raakt zonder CRON_SECRET te vereisen, handig voor batch scoring van bestaande leads. Gebruikt dezelfde tech detection + scoring logic als de route.

## Comparison section

`components/sections/ComparisonSection.tsx` — "Arka vs. traditioneel bureau" table on homepage. 6 rows comparing direct contact, overhead, measurability, flexibility, pricing transparency, ownership. Translation keys: `comparison.*`
