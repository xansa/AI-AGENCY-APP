/**
 * LinkedIn Carousel Generator v2
 *
 * Generates branded PNG slides + PDF per post.
 * Uses SVG templates + @resvg/resvg-js for rendering,
 * then pdf-lib to bundle each post's slides into a PDF (LinkedIn requires PDF upload).
 *
 * Design principles applied:
 * - Content vertically centered (no giant empty halves)
 * - Consistent footer strip per slide (mark + URL + pagination)
 * - Opacity hierarchy: 100% / 70% / 50%
 * - Visual rhyming: Arrow-A triangle motif as accent across slides
 * - Subtle depth via radial gradient glow
 * - Alternating dark / cream backgrounds per post for rhythm
 * - Brand fonts: Cormorant Garamond (headings) + Instrument Sans (body)
 *
 * Usage: node scripts/generate-linkedin-carousels.mjs
 */

import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Canvas constants ────────────────────────────────────────────────────────

const W = 1080;
const H = 1080;
const PAD = 80;
const FOOTER_H = 90;

// ─── Brand palette ───────────────────────────────────────────────────────────

const C = {
  // Dark theme
  bg: "#0B1220",
  bgDeep: "#070B14",
  bgMed: "#151F33",
  blue: "#3B82F6",
  blueDeep: "#1D4ED8",
  cyan: "#06B6D4",
  white: "#F8FAFC",
  // Light theme (alternate)
  cream: "#F4EFE6",
  creamDeep: "#EAE3D4",
  navy: "#0B1220",
  // Neutrals
  muted: "#94A3B8",
};

// ─── Font loading ────────────────────────────────────────────────────────────

const FONT_DIR = join(__dirname, "fonts");
const FONT_FILES = [
  join(FONT_DIR, "CormorantGaramond-Regular.ttf"),
  join(FONT_DIR, "CormorantGaramond-SemiBold.ttf"),
  join(FONT_DIR, "CormorantGaramond-Bold.ttf"),
  join(FONT_DIR, "InstrumentSans-Regular.ttf"),
];

const F_SERIF = "Cormorant Garamond";
const F_SANS = "Instrument Sans";

// ─── SVG primitives ──────────────────────────────────────────────────────────

const xmlEscape = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function svgOpen() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`;
}

function defs(theme) {
  const isDark = theme === "dark";
  return `<defs>
    <radialGradient id="glow" cx="50%" cy="0%" r="80%">
      <stop offset="0%" stop-color="${isDark ? C.blue : C.creamDeep}" stop-opacity="${isDark ? 0.18 : 0.6}"/>
      <stop offset="100%" stop-color="${isDark ? C.bgDeep : C.cream}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${C.blue}"/>
      <stop offset="100%" stop-color="${C.cyan}"/>
    </linearGradient>
    <filter id="grain" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.04 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>`;
}

function background(theme) {
  const isDark = theme === "dark";
  const base = isDark ? C.bg : C.cream;
  return `
    <rect width="${W}" height="${H}" fill="${base}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.5"/>
  `;
}

// Arrow-A logomark (used as brand mark in footer + subtle rhyming shape)
function arkaMark(x, y, size, fill) {
  // Logo is 512-unit source; scale to requested size
  const s = size / 512;
  return `<g transform="translate(${x}, ${y}) scale(${s})">
    <path d="M256 80 L390 400 H310 L256 240 L202 400 H122 Z" fill="${fill}"/>
    <path d="M256 300 L214 400 H298 Z" fill="${fill === C.blue ? C.bg : C.cream}"/>
  </g>`;
}

// Small triangle accent (visual rhyming motif from logo)
function triangleAccent(cx, cy, size, fill, opacity = 1) {
  const h = size * 0.87;
  return `<path d="M ${cx} ${cy - h / 2} L ${cx + size / 2} ${cy + h / 2} L ${cx - size / 2} ${cy + h / 2} Z" fill="${fill}" opacity="${opacity}"/>`;
}

function accentBar(x, y, width = 72, height = 3, gradient = true) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${height / 2}" fill="${gradient ? "url(#accent)" : C.blue}"/>`;
}

function textEl(x, y, text, opts = {}) {
  const {
    size = 24,
    weight = 400,
    fill = C.white,
    family = F_SANS,
    anchor = "start",
    spacing = "0",
    opacity = 1,
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}" opacity="${opacity}">${xmlEscape(text)}</text>`;
}

function multiText(x, startY, lines, opts = {}) {
  const { size = 24, lineHeight = 1.35 } = opts;
  const gap = size * lineHeight;
  return lines
    .map((line, i) => textEl(x, startY + i * gap, line, opts))
    .join("\n");
}

// ─── Footer strip ────────────────────────────────────────────────────────────

function footer(theme, slideIndex, totalSlides, tag) {
  const isDark = theme === "dark";
  const fg = isDark ? C.white : C.navy;
  const muted = isDark ? C.muted : "#5B6474";
  const dividerY = H - FOOTER_H;
  const centerY = H - FOOTER_H / 2 + 8;

  const current = String(slideIndex + 1).padStart(2, "0");
  const total = String(totalSlides).padStart(2, "0");

  return [
    // Thin divider
    `<rect x="${PAD}" y="${dividerY}" width="${W - PAD * 2}" height="1" fill="${fg}" opacity="0.12"/>`,
    // Left: logomark + wordmark
    arkaMark(PAD, H - FOOTER_H / 2 - 18, 40, C.blue),
    textEl(PAD + 52, centerY, "arkadigital.nl", {
      size: 22,
      weight: 500,
      fill: fg,
      opacity: 0.7,
    }),
    // Right: slide tag (optional) + pagination
    tag
      ? textEl(W - PAD, centerY - 25, tag.toUpperCase(), {
          size: 14,
          weight: 500,
          fill: muted,
          anchor: "end",
          spacing: "0.12em",
          opacity: 0.6,
        })
      : "",
    textEl(W - PAD, centerY + (tag ? 2 : 0), `${current} / ${total}`, {
      size: 22,
      weight: 500,
      fill: fg,
      anchor: "end",
      opacity: 0.7,
    }),
  ].join("\n");
}

// ─── Cover slide ─────────────────────────────────────────────────────────────

function coverSlide({ title, subtitle, totalSlides, theme = "dark", tag = "nieuwe post" }) {
  const isDark = theme === "dark";
  const fg = isDark ? C.white : C.navy;
  const subFg = isDark ? C.muted : "#5B6474";

  const titleLines = Array.isArray(title) ? title : [title];
  const titleSize = 82;
  const titleLH = 1.08;
  const titleHeight = titleLines.length * titleSize * titleLH;
  const subtitleSize = 30;
  const subtitleGap = subtitle ? subtitleSize * 2.2 : 0;
  const accentGap = 28;

  // Block: top triangle + title + accent + subtitle
  const triSize = 28;
  const blockH = triSize * 0.87 + 50 + titleHeight + accentGap + subtitleGap;
  const contentCenterY = (H - FOOTER_H) / 2;
  const blockStart = contentCenterY - blockH / 2;

  const triY = blockStart + triSize * 0.43;
  const titleY = blockStart + triSize * 0.87 + 50 + titleSize * 0.85;
  const accentY = titleY + (titleLines.length - 1) * titleSize * titleLH + 30;
  const subtitleY = accentY + subtitleSize * 1.5;

  return [
    svgOpen(),
    defs(theme),
    background(theme),
    // Motif triangle at top
    triangleAccent(W / 2, triY, triSize, C.blue, 0.9),
    // Title lines
    multiText(W / 2, titleY, titleLines, {
      size: titleSize,
      weight: 600,
      family: F_SERIF,
      fill: fg,
      anchor: "middle",
      lineHeight: titleLH,
      spacing: "-0.015em",
    }),
    // Accent bar
    `<rect x="${W / 2 - 40}" y="${accentY}" width="80" height="3" rx="1.5" fill="url(#accent)"/>`,
    // Subtitle
    subtitle
      ? textEl(W / 2, subtitleY, subtitle, {
          size: subtitleSize,
          family: F_SANS,
          fill: subFg,
          anchor: "middle",
          opacity: 0.85,
          weight: 400,
        })
      : "",
    footer(theme, 0, totalSlides, tag),
    `</svg>`,
  ].join("\n");
}

// ─── Content slide ───────────────────────────────────────────────────────────

function contentSlide({
  number,
  heading,
  body,
  slideIndex,
  totalSlides,
  theme = "dark",
  tag,
}) {
  const isDark = theme === "dark";
  const fg = isDark ? C.white : C.navy;
  const bodyFg = isDark ? "#CBD5E1" : "#3B4453";
  const mutedFg = isDark ? C.muted : "#5B6474";

  const headingLines = Array.isArray(heading) ? heading : [heading];
  const bodyLines = Array.isArray(body) ? body : [body];

  const numSize = 20;
  const headingSize = 54;
  const headingLH = 1.15;
  const bodySize = 26;
  const bodyLH = 1.55;
  const accentGap = 36;

  const numH = numSize + 18; // number + spacing to accent
  const headingH = headingLines.length * headingSize * headingLH;
  const bodyH = bodyLines.length * bodySize * bodyLH;
  const blockH = numH + headingH + accentGap + bodyH;

  const contentCenterY = (H - FOOTER_H) / 2;
  const blockStart = contentCenterY - blockH / 2;

  const numY = blockStart + numSize;
  const headingStartY = numY + 44;
  const accentY = headingStartY + (headingLines.length - 1) * headingSize * headingLH + 22;
  const bodyStartY = accentY + 30;

  const numStr = String(number).padStart(2, "0");

  return [
    svgOpen(),
    defs(theme),
    background(theme),
    // Small number marker
    textEl(PAD, numY, numStr, {
      size: numSize,
      family: F_SANS,
      weight: 600,
      fill: C.blue,
      spacing: "0.15em",
      opacity: 1,
    }),
    // Thin line next to number
    `<rect x="${PAD + 36}" y="${numY - 8}" width="36" height="2" fill="${C.blue}" opacity="0.6"/>`,
    // Heading in serif
    multiText(PAD, headingStartY, headingLines, {
      size: headingSize,
      weight: 600,
      family: F_SERIF,
      fill: fg,
      lineHeight: headingLH,
      spacing: "-0.012em",
    }),
    // Accent bar
    accentBar(PAD, accentY, 64, 3),
    // Body
    multiText(PAD, bodyStartY + bodySize * 0.8, bodyLines, {
      size: bodySize,
      family: F_SANS,
      fill: bodyFg,
      lineHeight: bodyLH,
      opacity: 0.85,
      weight: 400,
    }),
    footer(theme, slideIndex, totalSlides, tag),
    `</svg>`,
  ].join("\n");
}

// ─── Stat slide ──────────────────────────────────────────────────────────────

function statSlide({
  stat,
  label,
  sublabel,
  slideIndex,
  totalSlides,
  theme = "dark",
  tag,
}) {
  const isDark = theme === "dark";
  const fg = isDark ? C.white : C.navy;
  const bodyFg = isDark ? "#CBD5E1" : "#3B4453";
  const mutedFg = isDark ? C.muted : "#5B6474";

  const labelLines = Array.isArray(label) ? label : [label];
  const statSize = 200;
  const labelSize = 34;
  const labelLH = 1.3;
  const sublabelSize = 22;

  const statH = statSize * 0.78;
  const labelH = labelLines.length * labelSize * labelLH;
  const sublabelH = sublabel ? sublabelSize * 2 : 0;
  const accentGap = 40;
  const blockH = statH + accentGap + labelH + sublabelH;

  const contentCenterY = (H - FOOTER_H) / 2;
  const blockStart = contentCenterY - blockH / 2;
  const statY = blockStart + statSize * 0.78;
  const accentY = statY + 30;
  const labelStartY = accentY + 44;
  const sublabelY = labelStartY + (labelLines.length - 1) * labelSize * labelLH + 50;

  return [
    svgOpen(),
    defs(theme),
    background(theme),
    // Huge stat number, brand blue
    textEl(W / 2, statY, stat, {
      size: statSize,
      weight: 700,
      family: F_SERIF,
      fill: C.blue,
      anchor: "middle",
      spacing: "-0.04em",
    }),
    // Accent bar centered
    `<rect x="${W / 2 - 40}" y="${accentY}" width="80" height="3" rx="1.5" fill="url(#accent)"/>`,
    // Label
    multiText(W / 2, labelStartY, labelLines, {
      size: labelSize,
      weight: 500,
      family: F_SANS,
      fill: fg,
      anchor: "middle",
      lineHeight: labelLH,
    }),
    // Sublabel
    sublabel
      ? textEl(W / 2, sublabelY, sublabel, {
          size: sublabelSize,
          family: F_SANS,
          fill: bodyFg,
          anchor: "middle",
          opacity: 0.7,
        })
      : "",
    footer(theme, slideIndex, totalSlides, tag),
    `</svg>`,
  ].join("\n");
}

// ─── Closing slide ───────────────────────────────────────────────────────────

function closingSlide({
  cta,
  subcta,
  totalSlides,
  theme = "dark",
  tag = "tot slot",
}) {
  const isDark = theme === "dark";
  const fg = isDark ? C.white : C.navy;
  const bodyFg = isDark ? "#CBD5E1" : "#3B4453";

  const ctaLines = Array.isArray(cta) ? cta : [cta];
  const ctaSize = 46;
  const ctaLH = 1.2;
  const ctaH = ctaLines.length * ctaSize * ctaLH;
  const urlSize = 28;
  const subSize = 22;
  const accentGap = 36;
  const blockH =
    60 + // top triangle
    ctaH +
    accentGap +
    urlSize +
    (subcta ? subSize * 2.2 + 30 : 0) +
    80; // logo space

  const contentCenterY = (H - FOOTER_H) / 2;
  const blockStart = contentCenterY - blockH / 2;
  const triY = blockStart + 20;
  const ctaStartY = triY + 40 + ctaSize * 0.8;
  const accentY = ctaStartY + (ctaLines.length - 1) * ctaSize * ctaLH + 30;
  const urlY = accentY + 44;
  const subY = urlY + 44;
  const logoY = (subcta ? subY : urlY) + 40;

  return [
    svgOpen(),
    defs(theme),
    background(theme),
    triangleAccent(W / 2, triY, 28, C.blue, 0.9),
    multiText(W / 2, ctaStartY, ctaLines, {
      size: ctaSize,
      weight: 600,
      family: F_SERIF,
      fill: fg,
      anchor: "middle",
      lineHeight: ctaLH,
      spacing: "-0.012em",
    }),
    `<rect x="${W / 2 - 40}" y="${accentY}" width="80" height="3" rx="1.5" fill="url(#accent)"/>`,
    textEl(W / 2, urlY, "arkadigital.nl", {
      size: urlSize,
      family: F_SANS,
      weight: 500,
      fill: C.blue,
      anchor: "middle",
    }),
    subcta
      ? textEl(W / 2, subY, subcta, {
          size: subSize,
          family: F_SANS,
          fill: bodyFg,
          anchor: "middle",
          opacity: 0.75,
        })
      : "",
    footer(theme, totalSlides - 1, totalSlides, tag),
    `</svg>`,
  ].join("\n");
}

// ─── Carousel data per post ──────────────────────────────────────────────────
// Each post can specify a theme: "dark" (default), "light", or "alternate"
// (alternate = cover+closing dark, content slides cream, stat dark).

const carousels = {
  // post-01-introductie: text-only, already posted. No carousel generated.
  "post-02-solo-founder": {
    theme: "alternate",
    tag: "solo agency",
    slides: [
      { type: "cover", title: ["Ik run een digitaal", "bureau alleen."], subtitle: "Dit is waarom dat beter werkt." },
      { type: "content", number: 1, heading: "Het traditionele bureau", body: ["Accountmanager, projectmanager, developer.", "Stille telefoon. Intern overleg.", "Facturen voor overleguren."] },
      { type: "content", number: 2, heading: "Hoe het bij Arka werkt", body: ["Je praat met mij. Ik maak de strategie.", "Ik bouw het. Ik lever het op.", "Geen tussenlagen."] },
      { type: "content", number: 3, heading: "Het resultaat", body: ["Snellere doorlooptijd.", "Lagere kosten, geen overhead.", "Betere kwaliteit: een persoon, het hele plaatje."] },
      { type: "closing", cta: ["Direct contact, meetbare resultaten,", "geen overhead."], subcta: "DM me. Ik reageer binnen 24 uur." },
    ],
  },
  "post-03-website-tekenen": {
    theme: "alternate",
    tag: "website audit",
    slides: [
      { type: "cover", title: ["5 tekenen dat je website", "je geld kost."], subtitle: "In plaats van oplevert." },
      { type: "content", number: 1, heading: "Geen aanvragen via je site", body: ["Geen duidelijke route naar actie.", "Geen contactformulier boven de vouw."] },
      { type: "content", number: 2, heading: "Niet op pagina 1 van Google", body: ["80% van de klikken gaat naar", "de eerste 3 resultaten.", "Pagina 2 is onzichtbaar."] },
      { type: "content", number: 3, heading: "Site is ouder dan 3 jaar", body: ["Webstandaarden veranderen snel.", "Een site van 2022 voelt in 2026 gedateerd."] },
      { type: "content", number: 4, heading: "Mobiel werkt niet lekker", body: ["60% van je bezoekers zit op telefoon.", "Slechte mobiele ervaring, verloren klanten."] },
      { type: "content", number: 5, heading: ["Geen idee hoeveel", "bezoekers je krijgt"], body: ["Zonder data vlieg je blind.", "Google Analytics kost niks."] },
      { type: "closing", cta: ["Herken je 2 of meer punten?", "Stuur me je URL."], subcta: "Gratis analyse binnen 24 uur. Zonder verplichtingen." },
    ],
  },
  "post-04-seo": {
    theme: "dark",
    tag: "seo 2026",
    slides: [
      { type: "cover", title: ["SEO is niet dood."], subtitle: "Maar de manier waarop je het deed in 2020 wel." },
      { type: "content", number: 1, heading: "Expertise", body: ["Google wil zien dat je weet waar je", "over schrijft. Diepgaande content die", "echte vragen beantwoordt."] },
      { type: "content", number: 2, heading: "Technische basis", body: ["Snel, mobiel, correct geindexeerd.", "Zonder dat fundament heeft", "content weinig kans."] },
      { type: "content", number: 3, heading: "Consistentie", body: ["Een blog per kwartaal redt het niet.", "Regelmatig publiceren bouwt autoriteit.", "Google beloont actieve websites."] },
      { type: "stat", stat: "+285%", label: "organisch verkeer", sublabel: "in 3 maanden, puur organische groei" },
      { type: "closing", cta: ["Wat is jouw grootste uitdaging", "met vindbaar worden?"] },
    ],
  },
  "post-05-mkb-websites": {
    theme: "alternate",
    tag: "mkb website",
    slides: [
      { type: "cover", title: ["De meeste MKB websites", "zijn digitale visitekaartjes."], subtitle: "Dat is een gemiste kans." },
      { type: "content", number: 1, heading: "Geen duidelijke call to action", body: ["Bezoekers weten niet wat ze moeten doen.", "Geen route naar contact, offerte of aankoop."] },
      { type: "content", number: 2, heading: "Laadtijd van 5+ seconden", body: ["53% verlaat je site na 3 seconden.", "Langzaam betekent onzichtbaar voor Google."] },
      { type: "content", number: 3, heading: ["Niet geoptimaliseerd", "voor mobiel"], body: ["60% van je bezoekers zit op telefoon.", "Slechte mobiele ervaring kost je klanten."] },
      { type: "stat", stat: "+160%", label: "meer reserveringen", sublabel: "na herontwerp met focus op conversie" },
      { type: "closing", cta: ["Wanneer heb jij voor het laatst", "kritisch naar je website gekeken?"] },
    ],
  },
  "post-06-offertes": {
    theme: "alternate",
    tag: "proces automatisering",
    slides: [
      { type: "cover", title: ["Van 3 dagen", "naar 3 uur."], subtitle: "Zo versnelde dit bedrijf z'n offertes." },
      { type: "content", number: 1, heading: "Het probleem", body: ["Handmatig gegevens verzamelen.", "Excel, heen en weer mailen.", "Gemiddeld 3 werkdagen per offerte."] },
      { type: "content", number: 2, heading: "De oplossing", body: ["Een dashboard dat alle data samenbrengt.", "Klantgegevens, prijzen, beschikbaarheid.", "Alles op een plek."] },
      { type: "stat", stat: "3u", label: ["in plaats van 3 dagen"], sublabel: "Pipeline gegroeid naar meer dan EUR 1,8M" },
      { type: "closing", cta: ["Welk proces kost jou", "onnodig veel tijd?"] },
    ],
  },
  "post-07-website-snelheid": {
    theme: "dark",
    tag: "website snelheid",
    slides: [
      { type: "cover", title: ["Je website laadt traag?", "Dit fix je vandaag nog."] },
      { type: "content", number: 1, heading: "Afbeeldingen comprimeren", body: ["Gebruik WebP formaat.", "Scheelt 70 tot 80% aan bestandsgrootte.", "Grootste quick win voor de meeste sites."] },
      { type: "content", number: 2, heading: "Onnodige plugins verwijderen", body: ["Elke plugin voegt JavaScript toe.", "Gebruik je een plugin niet actief?", "Weg ermee."] },
      { type: "content", number: 3, heading: "Lazy loading aanzetten", body: ["Laad afbeeldingen pas als ze in beeld komen.", "Je bezoeker merkt niks.", "Maar je laadtijd daalt flink."] },
      { type: "closing", cta: ["Test je site: Google PageSpeed Insights.", "Alles onder de 90 is verbeterpunt."], subcta: "Stuur me je URL, ik check het gratis." },
    ],
  },
  "post-08-systeem": {
    theme: "alternate",
    tag: "marketing systeem",
    slides: [
      { type: "cover", title: ["Geen marketing", "afdeling nodig."], subtitle: "Je hebt een systeem nodig." },
      { type: "content", number: 1, heading: "Website die converteert", body: ["Duidelijke CTA's, snelle laadtijd,", "vertrouwenssignalen.", "Niet mooi als doel, maar effectief."] },
      { type: "content", number: 2, heading: "Vindbaar worden", body: ["SEO zodat je gevonden wordt door", "mensen die actief zoeken naar", "wat jij aanbiedt."] },
      { type: "content", number: 3, heading: "Leads vangen en opvolgen", body: ["Formulieren, chatbot, CRM.", "Elke lead wordt vastgelegd en opgevolgd.", "Niks valt tussen wal en schip."] },
      { type: "content", number: 4, heading: "Meten en bijsturen", body: ["Dashboard met je belangrijkste cijfers.", "Wat werkt, schaal je op.", "Wat niet werkt, stop je."] },
      { type: "closing", cta: ["Van 0 naar 75 gekwalificeerde", "leads per maand."], subcta: "Wat zou een voorspelbare stroom leads betekenen?" },
    ],
  },
  "post-09-werkdag": {
    theme: "dark",
    tag: "behind the scenes",
    slides: [
      { type: "cover", title: ["Een dag in het leven", "van een solo agency."], subtitle: "Van koffie tot klaar. Zo werkt het." },
    ],
  },
  "post-10-leads-case": {
    theme: "alternate",
    tag: "case study",
    slides: [
      { type: "cover", title: ["+75% meer leads.", "15 uur per week terug."], subtitle: "Zonder extra personeel." },
      { type: "content", number: 1, heading: "De situatie", body: ["Website was 4 jaar oud. Geen SEO.", "Geen CRM. Leads via losse emails", "die soms dagen bleven liggen."] },
      { type: "content", number: 2, heading: "Wat we bouwden", body: ["Nieuwe website, geoptimaliseerd voor conversie.", "SEO strategie voor 5 kerndiensten.", "AI chatbot en CRM voor opvolging."] },
      { type: "stat", stat: "+75%", label: "meer inkomende leads" },
      { type: "stat", stat: "15u", label: "per week bespaard", sublabel: "Responstijd van dagen naar minuten" },
      { type: "closing", cta: ["Welk proces zou jij", "het liefst automatiseren?"] },
    ],
  },
  "post-11-chatbot": {
    theme: "dark",
    tag: "ai chatbot",
    slides: [
      { type: "cover", title: ["Een AI chatbot", "is geen gadget."], subtitle: "Het is je beste medewerker." },
      { type: "content", number: 1, heading: "Het probleem", body: ["Klant bezoekt je site om 22:00.", "Heeft een vraag over je prijzen.", "Geen antwoord. Vertrekt naar je concurrent."] },
      { type: "content", number: 2, heading: "Wat een chatbot doet", body: ["70 tot 80% van vragen automatisch.", "24/7 beschikbaar, ook in het weekend.", "Kwalificeert leads en stuurt ze door."] },
      { type: "content", number: 3, heading: "De investering", body: ["Minder dan 1 uur medewerker per dag.", "De opbrengst: leads die anders", "waren weggelopen."] },
      { type: "closing", cta: ["Check de chatbot op arkadigital.nl.", "Dezelfde technologie."] },
    ],
  },
};

// ─── Theme resolution ────────────────────────────────────────────────────────

function resolveTheme(postTheme, slideType) {
  if (postTheme === "dark") return "dark";
  if (postTheme === "light") return "light";
  // alternate: cover/closing/stat dark, content cream
  if (postTheme === "alternate") {
    if (slideType === "content") return "light";
    return "dark";
  }
  return "dark";
}

// ─── Generation ──────────────────────────────────────────────────────────────

function generateSvg(slide, slideIndex, totalSlides, theme, tag) {
  switch (slide.type) {
    case "cover":
      return coverSlide({ ...slide, totalSlides, theme, tag });
    case "content":
      return contentSlide({ ...slide, slideIndex, totalSlides, theme, tag });
    case "stat":
      return statSlide({ ...slide, slideIndex, totalSlides, theme, tag });
    case "closing":
      return closingSlide({ ...slide, totalSlides, theme, tag });
    default:
      throw new Error(`Unknown slide type: ${slide.type}`);
  }
}

function svgToPng(svg) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "original" },
    font: {
      loadSystemFonts: false,
      fontFiles: FONT_FILES,
      defaultFontFamily: F_SANS,
    },
  });
  return resvg.render().asPng();
}

// ─── PDF bundling ────────────────────────────────────────────────────────────

async function bundlePdf(pngBuffers, outPath) {
  const pdf = await PDFDocument.create();
  for (const buf of pngBuffers) {
    const img = await pdf.embedPng(buf);
    // LinkedIn recommends square (1:1) carousels. Use 1080x1080 pt.
    const page = pdf.addPage([W, H]);
    page.drawImage(img, { x: 0, y: 0, width: W, height: H });
  }
  const bytes = await pdf.save();
  writeFileSync(outPath, bytes);
}

// ─── Main ────────────────────────────────────────────────────────────────────

const contentDir = join(process.cwd(), "content", "linkedin");
let totalGenerated = 0;

for (const [postId, config] of Object.entries(carousels)) {
  const { theme: postTheme, tag, slides } = config;
  const outDir = join(contentDir, postId, "carousel");
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  const pngBuffers = [];
  for (let i = 0; i < slides.length; i++) {
    const theme = resolveTheme(postTheme, slides[i].type);
    const svg = generateSvg(slides[i], i, slides.length, theme, tag);
    const png = svgToPng(svg);
    const filename = `slide-${String(i + 1).padStart(2, "0")}.png`;
    writeFileSync(join(outDir, filename), png);
    pngBuffers.push(png);
    totalGenerated++;
  }

  const pdfPath = join(contentDir, postId, `${postId}.pdf`);
  await bundlePdf(pngBuffers, pdfPath);

  console.log(`${postId}: ${slides.length} slides + PDF`);
}

console.log(`\nKlaar. ${totalGenerated} slides + ${Object.keys(carousels).length} PDFs gegenereerd.`);
