# Arka Client Template

Starter template voor Arka klantprojecten. Gebruik dit als basis voor elke nieuwe website.

## Quick Start

```bash
# 1. Kopieer template naar nieuw project
cp -r arka-template/ ../klant-naam/
cd ../klant-naam/

# 2. Initialiseer git
git init

# 3. Update project naam in package.json
# Vervang "arka-template" met de klantnaam

# 4. Installeer dependencies
npm install

# 5. Kopieer .env.example naar .env.local en vul in
cp .env.example .env.local

# 6. Start development
npm run dev
```

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- react-hook-form + Zod
- Resend (email)
- Vercel Analytics

## Structuur

```
app/                  # Pages (App Router)
components/
  layout/             # Navbar, Footer
  ui/                 # Button, FormField, Badge, Card, Accordion
  sections/           # Homepage sections
content/              # Typed content data (services, etc.)
lib/                  # Utilities, validators, mailer
public/               # Static assets
```

## Aanpassen per klant

1. `content/site.ts` — Bedrijfsnaam, kleuren, contactinfo
2. `tailwind.config.ts` — Brand colors aanpassen
3. `app/layout.tsx` — Metadata, fonts
4. `content/services.ts` — Diensten van de klant
5. `components/layout/` — Navbar/Footer met klant branding

## Deployment

```bash
# Via Vercel CLI
npx vercel

# Of via GitHub integratie
git push origin main  # Auto-deploy via Vercel
```

## Overdracht (eenmalig project)

1. `vercel project transfer` naar klant account
2. GitHub repo transfer naar klant
3. Documentatie meegeven
