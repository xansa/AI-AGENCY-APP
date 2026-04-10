/**
 * LinkedIn Carousel Generator
 *
 * Generates branded PNG slides for all LinkedIn posts.
 * Uses SVG templates + @resvg/resvg-js for rendering.
 *
 * Usage: node scripts/generate-linkedin-carousels.mjs
 */

import { Resvg } from "@resvg/resvg-js";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// ─── Brand constants ─────────────────────────────────────────────────────────

const W = 1080;
const H = 1080;
const PAD = 80;
const FONT = "Inter, system-ui, sans-serif";

const C = {
  bg: "#0F172A",
  bgMed: "#1E293B",
  bgLight: "#334155",
  blue: "#3B82F6",
  blueLight: "#60A5FA",
  cyan: "#06B6D4",
  white: "#F8FAFC",
  muted: "#94A3B8",
  dark: "#64748B",
};

// ─── SVG primitives ──────────────────────────────────────────────────────────

function svgOpen() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
}

function svgClose() {
  return `</svg>`;
}

function bg() {
  return `<rect width="${W}" height="${H}" fill="${C.bg}"/>`;
}

function glow(cx = 540, cy = 0, rx = 500, ry = 300, color = C.blue, opacity = 0.06) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" opacity="${opacity}"/>`;
}

function accentLine(x, y, width = 100, height = 4) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" fill="url(#grad)"/>`;
}

function gradient() {
  return `<defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="${C.blue}"/><stop offset="100%" stop-color="${C.cyan}"/></linearGradient></defs>`;
}

function logo(x, y, scale = 0.08) {
  // Arka Arrow-A logo, scaled and positioned
  return `<g transform="translate(${x}, ${y}) scale(${scale})">
    <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="${C.blue}"/>
    <path d="M256 300 L214 400 H298 Z" fill="${C.bg}"/>
  </g>`;
}

function logoWithText(x, y, logoScale = 0.07) {
  const logoW = 512 * logoScale;
  const textX = x + logoW + 10;
  const textY = y + 512 * logoScale * 0.65;
  return `${logo(x, y, logoScale)}
    <text x="${textX}" y="${textY}" font-family="${FONT}" font-size="28" font-weight="600" fill="${C.white}" letter-spacing="0.05em">Arka</text>`;
}

function textLine(x, y, text, { size = 24, weight = 400, fill = C.white, anchor = "start", spacing = "0", opacity = 1 } = {}) {
  const escaped = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}" opacity="${opacity}">${escaped}</text>`;
}

function multiLine(x, startY, lines, { size = 24, weight = 400, fill = C.white, lineHeight = 1.4, anchor = "start" } = {}) {
  const gap = size * lineHeight;
  return lines.map((line, i) =>
    textLine(x, startY + i * gap, line, { size, weight, fill, anchor })
  ).join("\n");
}

function dots(current, total, y = H - 60) {
  const dotR = 5;
  const gap = 20;
  const totalW = (total - 1) * gap;
  const startX = W / 2 - totalW / 2;
  return Array.from({ length: total }, (_, i) => {
    const cx = startX + i * gap;
    const isCurrent = i === current;
    return `<circle cx="${cx}" cy="${y}" r="${isCurrent ? dotR + 1 : dotR}" fill="${isCurrent ? C.blue : C.bgLight}" opacity="${isCurrent ? 1 : 0.5}"/>`;
  }).join("\n");
}

// ─── Slide templates ─────────────────────────────────────────────────────────

function coverSlide({ title, subtitle, totalSlides }) {
  // Calculate vertical center for title
  const titleLines = Array.isArray(title) ? title : [title];
  const titleSize = 56;
  const titleGap = titleSize * 1.2;
  const subtitleSize = 28;
  const blockHeight = titleLines.length * titleGap + (subtitle ? subtitleSize + 30 : 0);
  const startY = (H - blockHeight) / 2 + titleSize;

  return [
    svgOpen(), gradient(), bg(),
    accentLine(W / 2 - 50, startY - titleGap - 30, 100),
    multiLine(W / 2, startY, titleLines, { size: titleSize, weight: 700, anchor: "middle", lineHeight: 1.2 }),
    subtitle ? textLine(W / 2, startY + titleLines.length * titleGap * 1.0 + 20, subtitle, { size: subtitleSize, fill: C.muted, anchor: "middle" }) : "",
    logoWithText(PAD, H - PAD - 35, 0.07),
    totalSlides ? dots(0, totalSlides) : "",
    svgClose(),
  ].join("\n");
}

function contentSlide({ number, heading, body, slideIndex, totalSlides }) {
  const bodyLines = Array.isArray(body) ? body : [body];
  const numStr = String(number).padStart(2, "0");
  const headingSize = 44;
  const bodySize = 28;
  const headingGap = headingSize * 1.3;
  const headingEndY = Array.isArray(heading) ? 400 + heading.length * headingGap : 400;
  const lineY = headingEndY + 20;
  const bodyStartY = lineY + 45;

  return [
    svgOpen(), gradient(), bg(),
    // Large watermark number
    textLine(PAD, 280, numStr, { size: 180, weight: 800, fill: C.blue, opacity: 0.1 }),
    // Heading
    ...(Array.isArray(heading)
      ? [multiLine(PAD, 400, heading, { size: headingSize, weight: 700, lineHeight: 1.3 })]
      : [textLine(PAD, 400, heading, { size: headingSize, weight: 700 })]
    ),
    // Accent line
    accentLine(PAD, lineY, 80, 3),
    // Body text
    multiLine(PAD, bodyStartY, bodyLines, { size: bodySize, fill: C.muted, lineHeight: 1.6 }),
    // Dots
    dots(slideIndex, totalSlides),
    svgClose(),
  ].join("\n");
}

function statSlide({ stat, label, sublabel, slideIndex, totalSlides }) {
  const labelLines = Array.isArray(label) ? label : [label];
  return [
    svgOpen(), gradient(), bg(),
    // Stat
    textLine(540, 490, stat, { size: 120, weight: 800, fill: C.blue, anchor: "middle", spacing: "-0.02em" }),
    // Accent line
    accentLine(540 - 40, 520, 80, 3),
    // Label
    multiLine(540, 580, labelLines, { size: 30, weight: 500, anchor: "middle", lineHeight: 1.4 }),
    // Sublabel
    sublabel ? textLine(540, 580 + labelLines.length * 42 + 15, sublabel, { size: 22, fill: C.muted, anchor: "middle" }) : "",
    dots(slideIndex, totalSlides),
    svgClose(),
  ].join("\n");
}

function closingSlide({ cta, subcta, totalSlides }) {
  const ctaLines = Array.isArray(cta) ? cta : [cta];
  const ctaSize = 36;
  const blockH = ctaLines.length * ctaSize * 1.3 + 120;
  const startY = (H - blockH) / 2 + ctaSize;

  return [
    svgOpen(), gradient(), bg(),
    // CTA text
    multiLine(540, startY, ctaLines, { size: ctaSize, weight: 600, anchor: "middle", lineHeight: 1.3 }),
    // Website
    textLine(540, startY + ctaLines.length * ctaSize * 1.3 + 30, "arkadigital.nl", { size: 26, fill: C.blue, anchor: "middle", weight: 500 }),
    // Accent line
    accentLine(540 - 40, startY + ctaLines.length * ctaSize * 1.3 + 55, 80, 3),
    // Logo centered
    logo(540 - 512 * 0.05, startY + ctaLines.length * ctaSize * 1.3 + 80, 0.1),
    // Subcta
    subcta ? textLine(540, startY + ctaLines.length * ctaSize * 1.3 + 170, subcta, { size: 20, fill: C.muted, anchor: "middle" }) : "",
    dots(totalSlides - 1, totalSlides),
    svgClose(),
  ].join("\n");
}

// ─── Carousel data per post ──────────────────────────────────────────────────

const carousels = {
  "post-01-mkb-websites": [
    { type: "cover", title: ["De meeste MKB-websites", "zijn digitale visitekaartjes."], subtitle: "Dat is een gemiste kans." },
    { type: "content", number: 1, heading: "Geen duidelijke call-to-action", body: ["Bezoekers weten niet wat ze moeten doen.", "Geen route naar contact, offerte of aankoop."] },
    { type: "content", number: 2, heading: "Laadtijd van 5+ seconden", body: ["53% verlaat je site na 3 seconden.", "Langzaam = onzichtbaar voor Google."] },
    { type: "content", number: 3, heading: ["Niet geoptimaliseerd", "voor mobiel"], body: ["60% van je bezoekers zit op telefoon.", "Slechte mobiele ervaring kost je klanten."] },
    { type: "stat", stat: "+160%", label: "meer reserveringen", sublabel: "na herontwerp met focus op conversie" },
    { type: "closing", cta: ["Wanneer heb jij voor het laatst", "kritisch naar je website gekeken?"] },
  ],
  "post-02-offertes": [
    { type: "cover", title: ["Van 3 dagen offertes", "naar 3 uur."], subtitle: "Dit is wat er gebeurde." },
    { type: "content", number: 1, heading: "Het probleem", body: ["Handmatig gegevens verzamelen.", "Excel, heen en weer mailen.", "Gemiddeld 3 werkdagen per offerte."] },
    { type: "content", number: 2, heading: "De oplossing", body: ["Een dashboard dat alle data samenbrengt.", "Klantgegevens, prijzen, beschikbaarheid.", "Alles op een plek."] },
    { type: "stat", stat: "3u", label: ["in plaats van 3 dagen"], sublabel: "Pipeline gegroeid naar +EUR 1,8M" },
    { type: "closing", cta: ["Welk proces kost jou", "onnodig veel tijd?"] },
  ],
  "post-03-website-snelheid": [
    { type: "cover", title: ["Je website laadt langzaam?", "Dit kun je vandaag nog fixen."] },
    { type: "content", number: 1, heading: "Afbeeldingen comprimeren", body: ["Gebruik WebP formaat.", "Scheelt 70-80% aan bestandsgrootte.", "Grootste quick win voor de meeste sites."] },
    { type: "content", number: 2, heading: "Onnodige plugins verwijderen", body: ["Elke plugin voegt JavaScript toe.", "Gebruik je een plugin niet actief?", "Weg ermee."] },
    { type: "content", number: 3, heading: "Lazy loading aanzetten", body: ["Laad afbeeldingen pas als ze in beeld komen.", "Je bezoeker merkt niks.", "Maar je laadtijd daalt flink."] },
    { type: "closing", cta: ["Test je site: Google PageSpeed Insights.", "Alles onder de 90 is verbeterpunt."], subcta: "Stuur me je URL, ik check het gratis." },
  ],
  "post-04-solo-founder": [
    { type: "cover", title: ["Ik run een digitaal", "bureau alleen."], subtitle: "Dit is waarom dat beter werkt." },
    { type: "content", number: 1, heading: "Het traditionele bureau", body: ["Accountmanager > projectmanager > developer.", "Stille telefoon. Intern overleg.", "Facturen voor overleguren."] },
    { type: "content", number: 2, heading: "Hoe het bij Arka werkt", body: ["Je praat met mij. Ik maak de strategie.", "Ik bouw het. Ik lever het op.", "Geen tussenlagen."] },
    { type: "content", number: 3, heading: "Het resultaat", body: ["Snellere doorlooptijd.", "Lagere kosten, geen overhead.", "Betere kwaliteit: een persoon, het hele plaatje."] },
    { type: "closing", cta: ["Direct contact, meetbare resultaten,", "geen overhead. Dat is Arka."], subcta: "DM me. Ik reageer binnen 24 uur." },
  ],
  "post-05-seo": [
    { type: "cover", title: ["SEO is niet dood."], subtitle: "Maar de manier waarop je het deed in 2020 wel." },
    { type: "content", number: 1, heading: "Expertise", body: ["Google wil zien dat je weet waar je", "over schrijft. Diepgaande content die", "echte vragen beantwoordt."] },
    { type: "content", number: 2, heading: "Technische basis", body: ["Snel, mobiel, correct geindexeerd.", "Zonder dat fundament heeft", "content weinig kans."] },
    { type: "content", number: 3, heading: "Consistentie", body: ["Een blog per kwartaal gaat het niet redden.", "Regelmatig publiceren bouwt autoriteit.", "Google beloont actieve websites."] },
    { type: "stat", stat: "+285%", label: "organisch verkeer", sublabel: "in 3 maanden, puur organische groei" },
    { type: "closing", cta: ["Wat is jouw grootste uitdaging", "met vindbaar worden op Google?"] },
  ],
  "post-06-systeem": [
    { type: "cover", title: ["Je hebt geen marketing-", "afdeling nodig."], subtitle: "Je hebt een systeem nodig." },
    { type: "content", number: 1, heading: "Website die converteert", body: ["Duidelijke CTA's, snelle laadtijd,", "vertrouwenssignalen.", "Niet mooi als doel, maar effectief."] },
    { type: "content", number: 2, heading: "Vindbaar worden", body: ["SEO zodat je gevonden wordt door mensen", "die actief zoeken naar wat jij aanbiedt."] },
    { type: "content", number: 3, heading: "Leads vangen en opvolgen", body: ["Formulieren, chatbot, CRM.", "Elke lead wordt vastgelegd en opgevolgd.", "Niks valt tussen wal en schip."] },
    { type: "content", number: 4, heading: "Meten en bijsturen", body: ["Dashboard met je belangrijkste cijfers.", "Wat werkt, schaal je op.", "Wat niet werkt, stop je."] },
    { type: "closing", cta: ["Van 0 naar 75 gekwalificeerde", "leads per maand."], subcta: "Wat zou een voorspelbare stroom leads betekenen?" },
  ],
  "post-07-werkdag": [
    { type: "cover", title: ["Een dag uit het leven", "van een solo digital agency."], subtitle: "Van koffie tot klaar. Zo werkt het." },
  ],
  "post-08-leads-case": [
    { type: "cover", title: ["+75% meer leads.", "15 uur per week bespaard."], subtitle: "Zonder extra personeel." },
    { type: "content", number: 1, heading: "De situatie", body: ["Website was 4 jaar oud. Geen SEO.", "Geen CRM. Leads via losse e-mails", "die soms dagen bleven liggen."] },
    { type: "content", number: 2, heading: "Wat we bouwden", body: ["Nieuwe website, geoptimaliseerd voor conversie.", "SEO-strategie voor 5 kerndiensten.", "AI-chatbot + CRM voor opvolging."] },
    { type: "stat", stat: "+75%", label: "meer inkomende leads" },
    { type: "stat", stat: "15 uur", label: "per week bespaard", sublabel: "Responstijd van dagen naar minuten" },
    { type: "closing", cta: ["Welk proces zou jij", "het liefst automatiseren?"] },
  ],
  "post-09-chatbot": [
    { type: "cover", title: ["Een AI-chatbot op je website", "is geen gadget."], subtitle: "Het is je beste medewerker." },
    { type: "content", number: 1, heading: "Het probleem", body: ["Klant bezoekt je site om 22:00.", "Heeft een vraag over je prijzen.", "Geen antwoord. Vertrekt naar je concurrent."] },
    { type: "content", number: 2, heading: "Wat een chatbot doet", body: ["70-80% van vragen automatisch beantwoord.", "24/7 beschikbaar, ook in het weekend.", "Kwalificeert leads en stuurt ze door."] },
    { type: "content", number: 3, heading: "De investering", body: ["Minder dan 1 uur medewerker per dag.", "De opbrengst: leads die anders", "waren weggelopen."] },
    { type: "closing", cta: ["Check de chatbot op arkadigital.nl.", "Die draait op dezelfde technologie."] },
  ],
  "post-10-website-tekenen": [
    { type: "cover", title: ["5 tekenen dat je website", "je geld kost."], subtitle: "In plaats van oplevert." },
    { type: "content", number: 1, heading: "Geen aanvragen via je site", body: ["Geen duidelijke route naar actie.", "Geen contactformulier boven de vouw."] },
    { type: "content", number: 2, heading: "Niet op pagina 1 van Google", body: ["80% van de klikken gaat naar", "de eerste 3 resultaten.", "Pagina 2 = onzichtbaar."] },
    { type: "content", number: 3, heading: "Site is ouder dan 3 jaar", body: ["Webstandaarden veranderen snel.", "Een site van 2022 voelt in 2026 gedateerd."] },
    { type: "content", number: 4, heading: "Mobiel werkt niet lekker", body: ["60% van je bezoekers zit op telefoon.", "Slechte mobiele ervaring = verloren klanten."] },
    { type: "content", number: 5, heading: ["Geen idee hoeveel", "bezoekers je krijgt"], body: ["Zonder data vlieg je blind.", "Google Analytics kost niks."] },
    { type: "closing", cta: ["Herken je 2 of meer punten?", "Stuur me je URL."], subcta: "Gratis analyse binnen 24 uur. Zonder verplichtingen." },
  ],
};

// ─── Generation ──────────────────────────────────────────────────────────────

function generateSvg(slide, slideIndex, totalSlides) {
  switch (slide.type) {
    case "cover":
      return coverSlide({ ...slide, totalSlides });
    case "content":
      return contentSlide({ ...slide, slideIndex, totalSlides });
    case "stat":
      return statSlide({ ...slide, slideIndex, totalSlides });
    case "closing":
      return closingSlide({ ...slide, totalSlides });
    default:
      throw new Error(`Unknown slide type: ${slide.type}`);
  }
}

function svgToPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: { loadSystemFonts: true },
  });
  const pngData = resvg.render();
  return pngData.asPng();
}

const contentDir = join(process.cwd(), "content", "linkedin");
let totalGenerated = 0;

for (const [postId, slides] of Object.entries(carousels)) {
  const outDir = join(contentDir, postId, "carousel");
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  for (let i = 0; i < slides.length; i++) {
    const svg = generateSvg(slides[i], i, slides.length);
    const png = svgToPng(svg);
    const filename = `slide-${String(i + 1).padStart(2, "0")}.png`;
    writeFileSync(join(outDir, filename), png);
    totalGenerated++;
  }

  console.log(`${postId}: ${slides.length} slides gegenereerd`);
}

console.log(`\nKlaar! ${totalGenerated} slides gegenereerd in ${Object.keys(carousels).length} carousels.`);
