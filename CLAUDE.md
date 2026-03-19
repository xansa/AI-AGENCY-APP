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

Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · react-hook-form + Zod · Resend · Supabase · Anthropic SDK. All UI copy is in **Dutch**.

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

### 4. Lazy singletons for optional services

Both Resend (`lib/mailer.ts`) and Supabase (`lib/supabase.ts`) are initialized only when their env vars are present. This allows `npm run build` and local dev to succeed without any keys configured. The pattern:

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

### 5. AI provider interface

`lib/ai.ts` exports an `AIProvider` interface with a single `chat()` method. `ClaudeProvider` implements it. To swap to a different LLM, implement the interface and change the factory:

```typescript
export function createAIProvider(): AIProvider {
  return new ClaudeProvider(); // swap here
}
```

### 6. FormField component

`components/ui/FormField.tsx` renders an `<input>`, `<textarea>`, or `<select>` depending on which props are provided (`inputProps` / `textareaProps` / `selectProps`). The `selectProps` type extends `React.SelectHTMLAttributes` with an extra `placeholder?: string` and `options: {value, label}[]` — `placeholder` is not a native HTML select attribute, it renders as the first disabled option.

### 7. Button type safety

`components/ui/Button.tsx` uses `Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">` to strip the four event handlers that Framer Motion redefines with incompatible types, allowing `{...props}` to spread into `motion.button` without a cast.

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
| `NEXT_PUBLIC_SITE_URL` | No | Canonical URL for OG tags |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Calendly intake link |

---

## Company info

- **Name:** Arka
- **Tagline:** "Jouw digitale afdeling, zonder de overhead."
- **Location:** Dordrecht, Nederland
- **Email:** arkaecom@proton.me
- **Phone:** +31 6 46410986
- **Structure:** Solo operation
- **Services:** Websites & Webshops, SEO & Content, AI Chatbots & Automatisering, Dashboards & Data, Lead Generation, Branding & Design
- **Packages:** Starter (€800–€1.500), Professional (€2.500–€3.500), Enterprise (€4.500–€8.000)

---

## Known constraints

- `next.config.mjs` — Next.js 14.2.5 does not support `next.config.ts`; keep it as `.mjs` with JSDoc types
- No test framework is configured
