# Smartlead Email Sequences

Twee cold outreach sequences (elk 4 emails, 12-daagse cadence) voor Smartlead.

**Afzender:** Kaan | Arka
**Verzenddomeinen:** arkagroup.nl, arkadigitaal.nl (NOOIT arkadigital.nl, dat is de productie-site)
**Tone:** direct, persoonlijk, behulpzaam. Geen corporate taal, geen em-dashes.

---

## Pre-flight checklist

### 1. CSV kolommen die je lead-lijst MOET hebben

Smartlead vult de `{{variabele}}` placeholders in vanuit de CSV. Zonder deze kolommen krijg je lege velden in de verstuurde emails.

| Variabele | Beschrijving | Voorbeeld |
|---|---|---|
| `voornaam` | Voornaam ontvanger | `Jan` |
| `bedrijf` | Bedrijfsnaam | `Horeca Dordrecht BV` |
| `website` | Website domein zonder https | `horecadordrecht.nl` |
| `branche` | Branche / dienst categorie | `restaurants` |
| `stad` | Stad | `Dordrecht` |

**Validatie tip:** voor je de campagne start, doe een test-send naar jezelf met 1 dummy rij. Kijk of alle 5 de variabelen correct worden ingevuld. Fallbacks zetten voor lege velden kan via Smartlead settings.

### 2. URLs die in de emails zitten

Al opgelost in onderstaande tekst, maar check of ze nog actief zijn voor je de campagne start:

- **Blog 1** (Sequence 1, Email 2): `https://arkadigital.nl/blog/waarom-website-niet-gevonden-op-google`
- **Blog 2** (Sequence 2, Email 2): `https://arkadigital.nl/blog/seo-voor-mkb-5-quick-wins`
- **Calendly** (Sequences 1 + 2, Emails 3 + 4): `https://calendly.com/arkaecom-proton/30min`

### 3. Subject line A/B testing

Elke email heeft 2 subject lines (A en B). Zet in Smartlead de A/B test aan op subject regel. Na de eerste 20-30 sends, pick de winner en gebruik die voor de rest.

### 4. Cadence

| Email | Dag | Conditie |
|---|---|---|
| 1 | 0 | Direct bij lead import |
| 2 | +3 | Alleen als geen reply |
| 3 | +4 (dag 7 totaal) | Alleen als geen reply |
| 4 | +5 (dag 12 totaal) | Alleen als geen reply |

---

## Sequence 1: Verouderde website

**Doelgroep:** leads met verouderde of trage websites (geen SSL, niet mobiel, langzaam).
**Filter vanuit lead qualifier:** `lead_score >= 45` EN `technologies` bevat WordPress/PHP/jQuery/Divi/Elementor.

### Email 1 — De observatie (dag 0)

**Subject A:**
```
{{voornaam}}, een snelle observatie over {{website}}
```

**Subject B:**
```
Vraagje over de website van {{bedrijf}}
```

**Body:**
```
Hoi {{voornaam}},

Ik keek net naar {{website}} en viel me iets op: de site laadt vrij langzaam en is op mobiel lastig te gebruiken.

Dat is relevant omdat Google sinds 2024 mobiele snelheid als topfactor gebruikt voor zoekresultaten. Praktisch betekent het: potentiele klanten zoeken naar {{branche}} in {{stad}}, maar vinden jullie niet.

Geen verwijt, gewoon iets wat me opviel. Is dit iets waar jullie mee bezig zijn?

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`, `website`, `branche`, `stad`

---

### Email 2 — De impact (dag 3)

**Subject A:**
```
Wat een trage website kost
```

**Subject B:**
```
Re: {{bedrijf}}
```

**Body:**
```
Hoi {{voornaam}},

Een kort feitje: 53% van de bezoekers haakt af als een website langer dan 3 seconden laadt (Google onderzoek). Voor een gemiddeld MKB-bedrijf betekent dat tientallen gemiste leads per maand.

Ik schreef er recent over: https://arkadigital.nl/blog/waarom-website-niet-gevonden-op-google

Mocht je benieuwd zijn wat er concreet aan te doen is, ik denk graag even mee. Kost niks.

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`, `bedrijf`

---

### Email 3 — Het bewijs (dag 7)

**Subject A:**
```
Van onvindbaar naar top 3 in Google
```

**Subject B:**
```
Hoe een horecazaak in Dordrecht het omdraaide
```

**Body:**
```
Hoi {{voornaam}},

Even een kort voorbeeld. Een horecazaak in Dordrecht had hetzelfde probleem: verouderde website, onvindbaar op Google, reserveringen via telefoon.

Na een nieuwe website en SEO-aanpak:
- +285% organisch verkeer in 3 maanden
- Top 3 op relevante zoektermen
- Online reserveringen verdubbeld

Het punt: dit hoeft niet maanden te duren of een vermogen te kosten. Een professionele website is er vanaf 2.500 euro.

Zou een kort gesprek van 15 minuten interessant zijn om te kijken wat er mogelijk is voor {{bedrijf}}?

Groet,
Kaan

P.S. Je kunt direct een moment kiezen: https://calendly.com/arkaecom-proton/30min
```

**Variabelen gebruikt:** `voornaam`, `bedrijf`

---

### Email 4 — De breakup (dag 12)

**Subject A:**
```
Laatste bericht van mij
```

**Subject B:**
```
Ik laat het hierbij, {{voornaam}}
```

**Body:**
```
Hoi {{voornaam}},

Ik snap dat dit nu misschien geen prioriteit is. Geen probleem.

Mocht het ooit wel spelen: ik help MKB-bedrijven in de regio met hun digitale aanwezigheid. Van websites en SEO tot automatisering. Een aanspreekpunt, geen groot bureau.

Hier kun je altijd een vrijblijvend gesprek plannen: https://calendly.com/arkaecom-proton/30min

Succes met {{bedrijf}}!

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`, `bedrijf`

---

## Sequence 2: Mist SEO / online zichtbaarheid

**Doelgroep:** leads die wel een website hebben maar niet vindbaar zijn op Google.
**Filter vanuit lead qualifier:** `lead_score >= 45` EN `technologies` bevat WEL moderne stack (niet puur WordPress/PHP).

### Email 1 — De zoektest (dag 0)

**Subject A:**
```
Ik zocht "{{branche}} {{stad}}" en vond {{bedrijf}} niet
```

**Subject B:**
```
{{voornaam}}, een test die ik deed
```

**Body:**
```
Hoi {{voornaam}},

Ik deed een simpele test: ik zocht op "{{branche}} in {{stad}}" op Google. {{bedrijf}} kwam niet in de eerste 3 pagina's voor.

Dat betekent dat klanten die actief zoeken naar wat jullie doen, jullie niet vinden. Ze gaan naar de concurrent die wel bovenaan staat.

Herkenbaar? Of hebben jullie al plannen om hier iets mee te doen?

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`, `bedrijf`, `branche`, `stad`

---

### Email 2 — Wat het kost om onzichtbaar te zijn (dag 3)

**Subject A:**
```
Elke dag dat je niet gevonden wordt
```

**Subject B:**
```
De kosten van onzichtbaarheid
```

**Body:**
```
Hoi {{voornaam}},

Even een rekensom. Als 10 mensen per dag zoeken naar "{{branche}} {{stad}}" en 30% klikt op het eerste resultaat, dan zijn dat ongeveer 90 potentiele klanten per maand die jou niet vinden.

SEO is geen magie, het is structureel werken aan je online vindbaarheid. Keyword research, technische optimalisatie, regelmatige content.

Ik schreef er een artikel over: https://arkadigital.nl/blog/seo-voor-mkb-5-quick-wins

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`, `branche`, `stad`

---

### Email 3 — Het bewijs (dag 7)

**Subject A:**
```
Van 0 naar 75% meer leads
```

**Subject B:**
```
Hoe een consultancybureau het aanpakte
```

**Body:**
```
Hoi {{voornaam}},

Een consultancybureau had een vergelijkbaar probleem. Mooie website, maar nauwelijks gevonden. Ze besteedden te veel tijd aan repetitieve klantvragen en leads vielen weg.

Wat we deden: SEO-optimalisatie, een AI-chatbot voor veelgestelde vragen, en geautomatiseerde lead opvolging.

Resultaat:
- 75% meer gekwalificeerde leads
- 15 uur per week bespaard
- Responstijd van een dag naar 2 minuten

Benieuwd wat dit voor {{bedrijf}} zou betekenen? 15 minuten van je tijd, ik bereid het gesprek voor: https://calendly.com/arkaecom-proton/30min

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`, `bedrijf`

---

### Email 4 — De breakup (dag 12)

**Subject A:**
```
Ik stop met mailen
```

**Subject B:**
```
Laatste bericht, {{voornaam}}
```

**Body:**
```
Hoi {{voornaam}},

Dit is mijn laatste bericht. Ik wil je inbox niet volspammen.

Kort samengevat: ik help MKB-bedrijven om online beter gevonden te worden en meer uit hun digitale aanwezigheid te halen. Alles onder een dak, zonder de overhead van een groot bureau.

Mocht het ooit relevant worden, hier kun je altijd terecht: https://calendly.com/arkaecom-proton/30min

Veel succes!

Groet,
Kaan
```

**Variabelen gebruikt:** `voornaam`

---

## Variabelen-overzicht per sequence

**Sequence 1** gebruikt: `voornaam`, `bedrijf`, `website`, `branche`, `stad` (alle 5)
**Sequence 2** gebruikt: `voornaam`, `bedrijf`, `branche`, `stad` (4 van 5, geen `website`)

Beide sequences eisen dus minimaal 4 kolommen ingevuld. Leads zonder `branche` of `stad` veroorzaken lege velden in Subject regels, dat is slecht voor deliverability. Filter die eruit voor import.

## Spam / deliverability tips

- Houd spam-triggers laag: geen woorden als "gratis", "garantie", "vandaag"
- Geen meer dan 2 links per email (deze sequences hebben er max 1)
- Geen afbeeldingen of HTML tabellen in cold emails, alleen plain text
- Smartlead warmup MOET lopen minstens 2 weken voor de eerste echte send
- Max 50 sends per mailbox per dag in de eerste maand
- Monitor bounce rate: boven 5% = mailbox pauzeren en fixen
