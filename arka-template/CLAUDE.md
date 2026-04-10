# CLAUDE.md

> **IMPORTANT:** Do not make any changes until you have 95% confidence in what you need to build. Ask follow-up questions until you reach that confidence.

## Commands

```bash
npm run dev        # start dev server
npm run build      # production build
npm run lint       # ESLint
```

## Stack

Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · react-hook-form + Zod · Resend

## Klantinfo

Pas `content/site.ts` aan met de klantgegevens. Dit is de enige bron van waarheid voor bedrijfsnaam, contactinfo, kleuren, etc.

## Patterns

- Server/client split: `page.tsx` (metadata) + `ClientComponent.tsx` (interactie)
- Content in `content/*.ts` — typed TypeScript, geen CMS
- Validatie in `lib/validators.ts` — Zod, gedeeld tussen client en server
- Styling: gebruik semantic Tailwind tokens (`bg-primary`, niet `bg-blue-900`)
- Icons: lucide-react

## Deployment

Vercel. Push naar main = auto-deploy.
