#!/usr/bin/env node
// ── Local Lead Qualifier Backfill ───────────────────────────────────────────
// Standalone backfill that runs entirely locally using HUBSPOT_ACCESS_TOKEN
// from .env.local. Does not require CRON_SECRET or a running dev server.
// Reuses the same tech-detection + scoring logic as lib/lead-qualifier/.
//
// Usage:
//   node scripts/backfill-lead-scores-local.mjs
//   DRY_RUN=1 node scripts/backfill-lead-scores-local.mjs

import fs from "node:fs";
import path from "node:path";

// ── Load .env.local manually (no dotenv dependency) ─────────────────────────
const envPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
if (!HUBSPOT_TOKEN) {
  console.error("Missing HUBSPOT_ACCESS_TOKEN in .env.local");
  process.exit(1);
}

const DRY_RUN = process.env.DRY_RUN === "1";
const BATCH = parseInt(process.env.BATCH ?? "100", 10);
const MAX_CONTACTS = parseInt(process.env.MAX_CONTACTS ?? "2000", 10);
const HS = "https://api.hubapi.com";

if (DRY_RUN) console.log("DRY_RUN mode: no HubSpot writes will happen.");

// ── Tech detection patterns (mirrors lib/lead-qualifier/website-analyzer) ──
const TECH_PATTERNS = [
  { name: "WordPress", patterns: [/wp-content/i, /wp-includes/i, /wordpress/i] },
  { name: "Joomla", patterns: [/\/media\/jui/i, /joomla/i] },
  { name: "Drupal", patterns: [/sites\/default\/files/i, /drupal/i] },
  { name: "Wix", patterns: [/wix\.com/i, /wixsite\.com/i, /_wix_/i] },
  { name: "Squarespace", patterns: [/squarespace\.com/i, /sqsp\.com/i] },
  { name: "Weebly", patterns: [/weebly\.com/i] },
  { name: "Shopify", patterns: [/cdn\.shopify\.com/i, /shopify/i] },
  { name: "Webflow", patterns: [/webflow\.com/i, /website\.webflow/i] },
  { name: "React", patterns: [/__next/i, /_next\/static/i, /react/i, /reactDOM/i] },
  { name: "Next.js", patterns: [/_next\//i, /__next/i] },
  { name: "Vue", patterns: [/vue\.js/i, /vuejs/i, /nuxt/i] },
  { name: "Nuxt", patterns: [/_nuxt\//i, /nuxt\.js/i] },
  { name: "Angular", patterns: [/ng-version/i, /angular/i] },
  { name: "Tailwind", patterns: [/tailwindcss/i] },
  { name: "Bootstrap", patterns: [/bootstrap\.min/i, /bootstrap\.css/i] },
  { name: "jQuery", patterns: [/jquery\.min\.js/i, /jquery\//i] },
  { name: "Elementor", patterns: [/elementor/i] },
  { name: "Divi", patterns: [/divi/i, /et-boc/i] },
  { name: "Vercel", patterns: [/vercel\.app/i, /vercel/i] },
  { name: "Netlify", patterns: [/netlify/i] },
  { name: "PHP", patterns: [/\.php/i, /x-powered-by.*php/i] },
  { name: "Framer", patterns: [/framer\.com/i, /framerusercontent/i] },
];

async function analyzeWebsite(url) {
  let fullUrl = url.trim();
  if (!fullUrl.startsWith("http")) fullUrl = `https://${fullUrl}`;

  const result = { url: fullUrl, reachable: false, technologies: [] };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(fullUrl, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ArkaBot/1.0)", Accept: "text/html" },
      redirect: "follow",
    });
    clearTimeout(timeout);
    result.reachable = res.ok;

    const poweredBy = res.headers.get("x-powered-by");
    if (poweredBy && /php/i.test(poweredBy)) result.technologies.push("PHP");

    const html = (await res.text()).slice(0, 100_000);

    const genMatch = html.match(
      /<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i
    );
    if (genMatch) {
      const g = genMatch[1].toLowerCase();
      if (g.includes("wordpress")) result.technologies.push("WordPress");
      if (g.includes("joomla")) result.technologies.push("Joomla");
      if (g.includes("drupal")) result.technologies.push("Drupal");
      if (g.includes("wix")) result.technologies.push("Wix");
    }

    for (const tech of TECH_PATTERNS) {
      if (result.technologies.includes(tech.name)) continue;
      for (const p of tech.patterns) {
        if (p.test(html)) {
          result.technologies.push(tech.name);
          break;
        }
      }
    }

    result.technologies = Array.from(new Set(result.technologies));
  } catch {
    // unreachable / timeout
  }

  return result;
}

// ── Scoring (mirrors lib/lead-qualifier/scorer) ─────────────────────────────
const DRECHTSTEDEN = ["dordrecht", "zwijndrecht", "papendrecht", "sliedrecht", "hendrik-ido-ambacht", "alblasserdam"];
const RANDSTAD = ["rotterdam", "den haag", "amsterdam", "utrecht", "leiden", "delft", "breda", "tilburg", "eindhoven", "arnhem", "barendrecht", "ridderkerk", "capelle aan den ijssel", "spijkenisse", "schiedam", "vlaardingen", "zoetermeer", "gouda"];
const OUTDATED_TECH = ["wordpress", "joomla", "drupal", "wix", "squarespace", "weebly", "jimdo", "divi", "elementor", "php", "jquery", "bootstrap 3"];
const MODERN_TECH = ["react", "next.js", "vue", "nuxt", "svelte", "tailwind", "vercel", "netlify", "shopify", "webflow", "framer", "astro"];

function scoreWebsiteQuality(company) {
  if (!company) return 20;
  const techs = company.technologies.map((t) => t.toLowerCase());
  if (techs.length === 0) return company.website ? 20 : 28;
  const outdated = techs.filter((t) => OUTDATED_TECH.some((ot) => t.includes(ot))).length;
  const modern = techs.filter((t) => MODERN_TECH.some((mt) => t.includes(mt))).length;
  if (modern >= 2) return 5;
  if (modern === 1 && outdated === 0) return 10;
  if (outdated >= 2) return 28;
  if (outdated === 1) return 22;
  return 15;
}

function scoreHasWebsite(company) {
  if (!company) return 10;
  const has = !!company.website || !!company.domain;
  if (!has) return 15;
  const techs = company.technologies.map((t) => t.toLowerCase());
  const outdated = techs.filter((t) => OUTDATED_TECH.some((ot) => t.includes(ot))).length;
  if (outdated >= 1) return 12;
  if (techs.length === 0) return 10;
  return 3;
}

function scoreLocation(contactCity) {
  const city = (contactCity ?? "").toLowerCase();
  if (!city) return 5;
  if (DRECHTSTEDEN.some((c) => city.includes(c))) return 10;
  if (RANDSTAD.some((c) => city.includes(c))) return 7;
  if (city.includes("nederland") || city.includes("netherlands")) return 5;
  return 2;
}

function calculateLeadScore({ company, contactCity }) {
  const websiteQuality = scoreWebsiteQuality(company);
  const companySize = 10; // unknown, no enrichment source
  const budgetIndication = 8; // unknown
  const hasWebsite = scoreHasWebsite(company);
  const location = scoreLocation(contactCity);
  const total = websiteQuality + companySize + budgetIndication + hasWebsite + location;
  const tier = total >= 70 ? "hot" : total >= 45 ? "warm" : "cold";
  return { total, breakdown: { websiteQuality, companySize, budgetIndication, hasWebsite, location }, tier };
}

// ── HubSpot helpers ─────────────────────────────────────────────────────────
async function hs(path, method = "GET", body) {
  const res = await fetch(`${HS}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`HubSpot ${res.status} ${method} ${path}: ${txt.slice(0, 200)}`);
  }
  return res.json();
}

async function searchUnscored(after) {
  return hs("/crm/v3/objects/contacts/search", "POST", {
    filterGroups: [{ filters: [{ propertyName: "lead_score", operator: "NOT_HAS_PROPERTY" }] }],
    properties: ["email", "company", "city", "website", "lead_score"],
    sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
    limit: BATCH,
    ...(after ? { after } : {}),
  });
}

async function patchContact(id, score, tier) {
  if (DRY_RUN) return;
  await hs(`/crm/v3/objects/contacts/${id}`, "PATCH", {
    properties: {
      lead_score: String(score),
      hs_lead_status: tier === "hot" ? "OPEN_DEAL" : tier === "warm" ? "IN_PROGRESS" : "NEW",
    },
  });
}

async function promoteDeals(contactId) {
  if (DRY_RUN) return;
  try {
    const assoc = await hs(`/crm/v3/objects/contacts/${contactId}/associations/deals`);
    for (const d of assoc.results ?? []) {
      await hs(`/crm/v3/objects/deals/${d.id}`, "PATCH", {
        properties: { dealstage: "qualifiedtobuy" },
      });
    }
  } catch (err) {
    console.warn(`  warn: deal promote failed for ${contactId}: ${err.message}`);
  }
}

// ── Main loop ───────────────────────────────────────────────────────────────
const totals = { processed: 0, hot: 0, warm: 0, cold: 0, failed: 0, batches: 0 };
const hotLeads = [];
let after;

console.log(`Starting local backfill (batch=${BATCH}, max=${MAX_CONTACTS})`);
const startedAll = Date.now();

outer: while (totals.processed < MAX_CONTACTS) {
  let searchResult;
  try {
    searchResult = await searchUnscored(after);
  } catch (err) {
    console.error(`Search failed: ${err.message}`);
    break;
  }

  const contacts = searchResult.results ?? [];
  if (contacts.length === 0) {
    console.log("No more contacts. Queue empty.");
    break;
  }

  totals.batches++;
  const batchStarted = Date.now();
  console.log(`\n[batch ${totals.batches}] ${contacts.length} contacts (queue total: ${searchResult.total})`);

  // Process sequentially; website fetches have 8s timeout each.
  for (const c of contacts) {
    if (totals.processed >= MAX_CONTACTS) break outer;
    const p = c.properties;
    const label = `${(p.company || p.email || c.id).slice(0, 40)}`.padEnd(40);
    try {
      let company = null;
      if (p.website) {
        const analysis = await analyzeWebsite(p.website);
        company = {
          domain: analysis.url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0],
          technologies: analysis.technologies,
          website: analysis.url,
        };
      }
      const score = calculateLeadScore({ company, contactCity: p.city });
      await patchContact(c.id, score.total, score.tier);
      if (score.tier === "hot") {
        await promoteDeals(c.id);
        hotLeads.push({ id: c.id, company: p.company, email: p.email, score: score.total });
      }
      totals[score.tier]++;
      totals.processed++;
      process.stdout.write(`  ${label} ${String(score.total).padStart(3)}/100 ${score.tier}\n`);
    } catch (err) {
      totals.failed++;
      console.error(`  ${label} FAILED: ${err.message}`);
    }
  }

  const elapsed = ((Date.now() - batchStarted) / 1000).toFixed(1);
  console.log(`[batch ${totals.batches}] done in ${elapsed}s — processed=${totals.processed} hot=${totals.hot} warm=${totals.warm} cold=${totals.cold} failed=${totals.failed}`);

  const nextAfter = searchResult.paging?.next?.after;
  if (!nextAfter) {
    console.log("No pagination cursor, queue complete.");
    break;
  }
  after = nextAfter;
}

const totalElapsed = ((Date.now() - startedAll) / 1000).toFixed(0);
console.log("\n=== Backfill complete ===");
console.log(`Duration: ${totalElapsed}s`);
console.log(`Batches:  ${totals.batches}`);
console.log(`Processed: ${totals.processed}`);
console.log(`  hot:    ${totals.hot}`);
console.log(`  warm:   ${totals.warm}`);
console.log(`  cold:   ${totals.cold}`);
console.log(`  failed: ${totals.failed}`);

if (hotLeads.length > 0) {
  console.log(`\nHot leads (${hotLeads.length}):`);
  for (const h of hotLeads) {
    console.log(`  ${h.score}/100 — ${h.company ?? "?"} (${h.email ?? "?"})`);
  }
}
