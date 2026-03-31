# Nieuw Klantsite Bouwen

Je bent een orchestrator die een complete klantwebsite bouwt voor Arka. Je coördineert 5 gespecialiseerde agents die samen een productie-klare Next.js site opleveren.

## Fase A: Intake

Vraag de gebruiker om de volgende informatie (sla over wat al gegeven is):

1. **Bedrijfsnaam** (bijv. "Van der Berg Advocaten")
2. **Branche** (bijv. horeca, advocatuur, bouw, retail, gezondheid, dienstverlening)
3. **Locatie** (stad + land)
4. **Diensten/producten** (3-6 items, korte beschrijving per stuk)
5. **Doelgroep** (wie zijn hun klanten?)
6. **Kleurvoorkeur** (hex codes, beschrijving zoals "donkerblauw met goud", of "geen voorkeur")
7. **Toon/stijl** (zakelijk, warm, modern, minimalistisch, luxe, etc.)
8. **Contactgegevens** (email, telefoon, adres)
9. **Website domein** (bijv. vanderbergadvocaten.nl)
10. **Tagline** (optioneel, wordt anders gegenereerd)
11. **KVK-nummer** (optioneel)
12. **BTW-nummer** (optioneel)
13. **Heeft de klant een logo?** (ja: pad naar bestand, nee: we genereren een simpel SVG logo)
14. **Heeft de klant foto's?** (ja: pad naar map, nee: we gebruiken placeholder secties)

Verzamel alles in een gestructureerde briefing die je doorgeeft aan elke agent.

## Fase B: Project Bootstrap

Voer deze stappen zelf uit (geen agent nodig):

1. Kopieer het Arka project als basis:
   ```bash
   cp -r "C:/Users/kaan9/Documents/Claude Code/AI AGENCY APP" "../{klantnaam}/"
   ```

2. Verwijder Arka-specifieke bestanden:
   ```bash
   cd "../{klantnaam}"
   rm -rf .git .claude/commands .claude/agents public/brand/concepts content/email-sequences.md content/blog.ts app/blog app/brand app/offerte FULL-AUDIT-REPORT.md hubspot_import.csv images/ public/llms.txt
   git init
   ```

3. Werk `package.json` bij:
   ```bash
   # Verander "name" naar klantnaam (lowercase, geen spaties)
   ```

4. Draai NIET `npm install` nu — dat doet Agent 5 na alle wijzigingen.

## Fase C: Agent Orchestratie

### C1: Parallel (geen afhankelijkheden)

Start deze twee agents TEGELIJK via de Agent tool:

**Agent: content-generator**
- Geef mee: volledige klantbriefing (naam, branche, diensten, doelgroep, toon, tagline, contactgegevens)
- Working directory: `../{klantnaam}/`
- Taak: schrijf alle content bestanden

**Agent: brand-designer**
- Geef mee: bedrijfsnaam, kleurvoorkeur, branche, toon/stijl
- Working directory: `../{klantnaam}/`
- Taak: genereer kleurenpalet, Tailwind config, favicon, logo

### C2: Sequentieel (wacht op C1)

**Agent: page-builder**
- Geef mee: volledige briefing + bevestiging dat content en brand klaar zijn
- Working directory: `../{klantnaam}/`
- Taak: bouw/herschrijf alle pagina's en componenten

### C3: Sequentieel (wacht op C2)

**Agent: seo-optimizer**
- Geef mee: bedrijfsnaam, domein, locatie, diensten
- Working directory: `../{klantnaam}/`
- Taak: metadata, structured data, sitemap, robots.txt, llms.txt, breadcrumbs

### C4: Sequentieel (wacht op C3)

**Agent: integration-polish**
- Geef mee: volledige briefing
- Working directory: `../{klantnaam}/`
- Taak: API routes, chatbot, formulieren, security, npm install, npm run build

## Fase D: Verificatie

Na Agent 5:

1. Controleer dat `npm run build` geslaagd is (Agent 5 doet dit al)
2. Toon een samenvatting:
   - Projectnaam en locatie op disk
   - Alle gegenereerde pagina's
   - Wat de klant nog moet aanleveren (logo, foto's, tekstaanpassingen)
   - Volgende stappen: `/deploy` om naar Vercel te pushen

## Fase E: Vercel Setup (optioneel, vraag de gebruiker)

Als de gebruiker wil deployen, gebruik de bestaande `/deploy` skill.

Voor Vercel project aanmaken:
```bash
source "C:/Users/kaan9/Documents/Claude Code/AI AGENCY APP/.env.local"
curl -s -X POST "https://api.vercel.com/v10/projects?teamId=team_QFAV8dVeLl0DxKxOuKZXfoGl" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"{klantnaam-slug}\", \"framework\": \"nextjs\"}"
```

**BELANGRIJK:** Toon NOOIT de waarde van VERCEL_TOKEN.

## Regels

- Alle teksten in het Nederlands (met _en velden voor Engels)
- Geen em-dashes in content
- Volg het server/client split pattern (page.tsx = server + metadata, *Content.tsx = "use client")
- Gebruik de bestaande Arka architectuur als gouden standaard
- Elke agent krijgt de klantbriefing + relevante context van vorige agents
