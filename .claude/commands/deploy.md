# Deploy naar Vercel

Deploy het huidige project naar Vercel.

## Stappen

1. **Build check** — Draai eerst `npm run build` om te controleren dat alles compileert.

2. **Deploy** — Als de build slaagt:
   ```bash
   source .env.local 2>/dev/null || source ../"AI AGENCY APP"/.env.local 2>/dev/null
   npx vercel --prod --token $VERCEL_TOKEN
   ```

3. **Resultaat** — Toon de deployment URL en status.

**BELANGRIJK:** Toon NOOIT de waarde van VERCEL_TOKEN. Gebruik altijd de variabele referentie `$VERCEL_TOKEN`.

## Bij fouten

- Build faalt? Fix de TypeScript errors eerst.
- Deploy faalt? Check of het project gekoppeld is aan Vercel (`npx vercel link`).
- Domein problemen? Gebruik de Vercel MCP tools om de domein status te checken.
