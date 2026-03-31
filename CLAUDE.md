# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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

All business data (services, packages, cases, FAQ, knowledge base) lives in typed TypeScript files under `content/`. These are imported by both pages and the chatbot. Dynamic routes like `app/diensten/[slug]/page.tsx` use `generateStaticParams()` driven by the content arrays -- adding a new service means adding an entry to `content/services.ts`, not creating a new page file.

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

`content/blog.ts` contains all blog posts with `publishedAt` date strings. The helper `getPublishedPosts()` filters posts where `publishedAt <= today` and sorts newest first. Blog pages use `revalidate = 3600` (ISR, hourly) so new posts appear automatically on their scheduled date without manual deploys. The `/init` skill checks the blog queue and warns when fewer than 3 posts remain unpublished.

### 5. Shared Zod validation (`lib/validators.ts`)

All form schemas (contact, offerte, chat) are defined once with Zod and shared between client-side `react-hook-form` validation (via `@hookform/resolvers`) and server-side API route validation. Keep schemas in sync — never duplicate validation logic.

### 6. Brand color palette (Tailwind)

`tailwind.config.ts` defines semantic color tokens: `primary`, `accent`, `cyan`, `background`, `surface`, `text`. Use these instead of raw Tailwind colors (e.g., `bg-primary` not `bg-blue-900`). The `brand` and `dark` scales exist for backward compatibility.

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

`components/ui/FormField.tsx` renders an `<input>`, `<textarea>`, or `<select>` depending on which props are provided (`inputProps` / `textareaProps` / `selectProps`). The `selectProps` type extends `React.SelectHTMLAttributes` with an extra `placeholder?: string` and `options: {value, label}[]` — `placeholder` is not a native HTML select attribute, it renders as the first disabled option.

### 10. Button type safety

`components/ui/Button.tsx` uses `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">` to strip the four event handlers that Framer Motion redefines with incompatible types, allowing `{...props}` to spread into `motion.button` without a cast.

### 11. Icons

`lucide-react` is the icon library. Service data in `content/services.ts` stores icon names as strings (e.g., `"Globe"`); import the matching Lucide component by name.

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

---

## Company info

- **Name:** Arka
- **Tagline:** "Jouw digitale afdeling, zonder de overhead."
- **Location:** Dordrecht, Nederland
- **Email:** info@arkadigital.nl
- **Phone:** +31 6 46140986
- **BTW:** NL005424960B92
- **KVK:** 42000761
- **Structure:** Solo operation
- **Services:** Websites & Webshops, SEO & Content, AI Chatbots & Automatisering, Dashboards & Data, Lead Generation, Branding & Design
- **Response time:** 24 uur (was 48u, geüpdatet 2026-03-25)
- **Packages:**
  - Starter: Maandelijks €1.000–€1.500/mnd (€500 onboarding), Eenmalig €1.800–€3.500
  - Professional: Maandelijks €2.750–€3.500/mnd (€750 onboarding), Eenmalig €5.500–€9.000
  - Enterprise: Maandelijks €5.000–€8.000/mnd (€1.000 onboarding), Eenmalig €14.000–€25.000

## Deployment

- **Hosting:** Vercel (project name: `arka`, team: `xansas-projects`)
- **Domain:** `arkadigital.nl` (live, DNS at TransIP, A records → `76.76.21.21`)
- **www redirect:** `www.arkadigital.nl` → 308 redirect to `arkadigital.nl`
- **Production URL:** `arka-tan.vercel.app` (Vercel default subdomain)
- `metadataBase` in `app/layout.tsx` uses `arkadigital.nl` via `NEXT_PUBLIC_SITE_URL`

## Brand assets

`/public/brand/` contains SVG and PNG logo variants, profile images, and cover banners. The `/brand` page (noindex) provides a visual overview with download buttons. To regenerate PNGs from SVGs: `node scripts/svg-to-png.mjs` (requires `@resvg/resvg-js` devDependency).

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

## Known constraints

- `next.config.mjs` — Next.js 14.2.5 does not support `next.config.ts`; keep it as `.mjs` with JSDoc types
- No test framework is configured
- `.env.example` is missing `CLAUDE_MODEL` — it still works (defaults to `claude-3-5-haiku-20241022`)
- `.env.example` may still reference `arka.nl` for `NEXT_PUBLIC_SITE_URL` — production and `app/layout.tsx` already use `arkadigital.nl`
