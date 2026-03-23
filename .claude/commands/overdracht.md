# Project Overdracht (Eenmalig)

Draag een eenmalig klantproject over naar de klant.

## Vereiste info

Vraag om (als niet gegeven):
1. **Klantnaam** — welk project wordt overgedragen
2. **Klant email** — voor Vercel en GitHub uitnodiging
3. **Klant GitHub username** — voor repo transfer

## Stappen

### 1. Laatste checks
- Draai `npm run build` om te bevestigen dat alles werkt
- Loop `checklist.md` door — alles moet afgevinkt zijn

### 2. GitHub repo transfer
```bash
# Transfer repo naar klant (vereist dat klant de invite accepteert)
gh repo transfer arka/{repo-naam} {klant-github-username}
```

### 3. Vercel project transfer
```bash
source ../"AI AGENCY APP"/.env.local
# Lijst huidige projecten
curl -s "https://api.vercel.com/v9/projects?teamId=team_QFAV8dVeLl0DxKxOuKZXfoGl" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | jq '.projects[] | {name, id}'
```

Vercel project transfer moet via het Vercel dashboard (Settings → Transfer).
Geef de klant instructies hiervoor.

### 4. Domein overdracht
- Als domein bij TransIP: klant moet zelf DNS beheren
- Verwijder het domein uit jouw Vercel team
- Klant koppelt domein aan eigen Vercel project

### 5. Documentatie meegeven
Genereer een kort document voor de klant:
- Hoe in te loggen bij Vercel
- Hoe de site te updaten (als ze dat zelf willen)
- Contactgegevens voor support (optioneel, tegen meerprijs)

### 6. Opschonen
- Verwijder het project uit jouw Vercel team
- Archiveer de lokale projectmap

**BELANGRIJK:** Toon NOOIT de waarde van VERCEL_TOKEN.
