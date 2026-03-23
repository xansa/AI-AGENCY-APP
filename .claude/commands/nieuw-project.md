# Nieuw Klantproject Opzetten

Je bent een assistent die Kaan helpt bij het opzetten van een nieuw klantproject voor Arka.

## Stap 1: Klantinformatie verzamelen

Vraag de gebruiker om de volgende informatie (als die niet al gegeven is):

1. **Klantnaam** (bedrijfsnaam)
2. **Type project**: Eenmalig of Maandelijks
3. **Pakket**: Starter, Professional, of Enterprise
4. **Branche** van de klant
5. **Contactpersoon** (naam + email)
6. **Domein** (bijv. klantnaam.nl) — als al bekend

## Stap 2: Project aanmaken

1. Kopieer de `arka-template/` directory naar een nieuwe map **naast** het huidige project:
   ```
   cp -r arka-template/ "../{klantnaam}/"
   ```

2. Initialiseer git in het nieuwe project:
   ```
   cd "../{klantnaam}" && git init
   ```

3. Werk `content/site.ts` bij met de klantgegevens:
   - name, tagline, description
   - email, phone, location
   - url (domein)
   - colors (vraag of de klant brandkleuren heeft, anders kies passende kleuren bij de branche)

4. Werk `package.json` bij:
   - Verander `"name"` naar de klantnaam (lowercase, geen spaties)

5. Werk `.env.example` bij met het domein van de klant

6. Draai `npm install`

## Stap 3: Vercel project aanmaken

Gebruik de Vercel token uit `.env.local` (NOOIT in plain text tonen!):

```bash
# Lees token uit .env.local
source ../"AI AGENCY APP"/.env.local

# Maak project aan op Vercel
curl -s -X POST "https://api.vercel.com/v10/projects?teamId=team_QFAV8dVeLl0DxKxOuKZXfoGl" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\": \"{klantnaam}\", \"framework\": \"nextjs\"}"
```

**BELANGRIJK:** Toon NOOIT de waarde van VERCEL_TOKEN. Gebruik altijd `$VERCEL_TOKEN` als variabele referentie.

## Stap 4: Checklist tonen

Toon de checklist uit `checklist.md` en markeer wat al gedaan is.

## Stap 5: Samenvatting

Geef een samenvatting:
- Projectnaam en locatie
- Type (eenmalig/maandelijks)
- Pakket
- Volgende stappen voor development

## Vercel Referentie

- **Team ID:** `team_QFAV8dVeLl0DxKxOuKZXfoGl`
- **Team:** xansas-projects
- Token zit in: `../"AI AGENCY APP"/.env.local` als `VERCEL_TOKEN`
- NOOIT de token in output, logs, of code zetten
