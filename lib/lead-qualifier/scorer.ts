// ── Lead Scoring Engine ──────────────────────────────────────────────────────
// Weighted scoring: 0-100 total
// - Website quality:   max 30 pts
// - Company size:      max 20 pts
// - Budget indication: max 25 pts
// - Has website:       max 15 pts
// - Location:          max 10 pts

import { EnrichedCompany, LeadScore } from "./types";

// ── Drechtsteden / Randstad city lists ──────────────────────────────────────

const DRECHTSTEDEN = [
  "dordrecht",
  "zwijndrecht",
  "papendrecht",
  "sliedrecht",
  "hendrik-ido-ambacht",
  "alblasserdam",
];

const RANDSTAD = [
  "rotterdam",
  "den haag",
  "amsterdam",
  "utrecht",
  "leiden",
  "delft",
  "breda",
  "tilburg",
  "eindhoven",
  "arnhem",
  "barendrecht",
  "ridderkerk",
  "capelle aan den ijssel",
  "spijkenisse",
  "schiedam",
  "vlaardingen",
  "zoetermeer",
  "gouda",
];

// ── Outdated technology indicators ──────────────────────────────────────────

const OUTDATED_TECH = [
  "wordpress",
  "joomla",
  "drupal",
  "wix",
  "squarespace",
  "weebly",
  "jimdo",
  "divi",
  "elementor",
  "php",
  "jquery",
  "bootstrap 3",
  "font awesome",
  "google analytics ua",
];

const MODERN_TECH = [
  "react",
  "next.js",
  "vue",
  "nuxt",
  "svelte",
  "tailwind",
  "vercel",
  "netlify",
  "shopify",
  "webflow",
  "framer",
  "astro",
];

// ── Score: Website Quality (max 30) ─────────────────────────────────────────

function scoreWebsiteQuality(company: EnrichedCompany | null): number {
  if (!company) return 20; // no data = assume mediocre, still opportunity

  const techs = company.technologies.map((t) => t.toLowerCase());

  if (techs.length === 0) {
    // No tech detected, likely very basic or no website
    return company.website ? 20 : 28;
  }

  const outdatedCount = techs.filter((t) =>
    OUTDATED_TECH.some((ot) => t.includes(ot))
  ).length;

  const modernCount = techs.filter((t) =>
    MODERN_TECH.some((mt) => t.includes(mt))
  ).length;

  if (modernCount >= 2) return 5; // modern stack, less need
  if (modernCount === 1 && outdatedCount === 0) return 10;
  if (outdatedCount >= 2) return 28; // very outdated, high need
  if (outdatedCount === 1) return 22;
  return 15; // mixed or unknown
}

// ── Score: Company Size (max 20) ────────────────────────────────────────────

function scoreCompanySize(company: EnrichedCompany | null): number {
  if (!company) return 10; // unknown, assume mid

  const count =
    company.employeeCount ??
    (company.employeeRange
      ? Math.round(
          (company.employeeRange.start + company.employeeRange.end) / 2
        )
      : null);

  if (count === null) return 10;
  if (count <= 5) return 10; // very small, limited budget
  if (count <= 20) return 20; // sweet spot: big enough to pay, small enough to need help
  if (count <= 50) return 15; // good, may have some internal capacity
  return 10; // large, likely has agency or internal team
}

// ── Score: Budget Indication (max 25) ───────────────────────────────────────

export function scoreBudget(budget: string | null | undefined): number {
  if (!budget) return 8; // no info

  const b = budget.toLowerCase();

  // Match Arka packages
  if (b.includes("enterprise") || b.includes("5.500") || b.includes("5500"))
    return 25;
  if (
    b.includes("professional") ||
    b.includes("2.750") ||
    b.includes("2750")
  )
    return 20;
  if (b.includes("starter") || b.includes("1.000") || b.includes("1000"))
    return 15;

  // Generic budget ranges from offerte form
  if (b.includes("boven") || b.includes("above") || b.includes(">"))
    return 25;
  if (b.includes("50.000") || b.includes("50000")) return 22;
  if (b.includes("25.000") || b.includes("25000")) return 18;
  if (b.includes("10.000") || b.includes("10000")) return 14;
  if (b.includes("5.000") || b.includes("5000")) return 10;

  return 8;
}

// ── Score: Has Website (max 15) ─────────────────────────────────────────────

function scoreHasWebsite(company: EnrichedCompany | null): number {
  if (!company) return 10; // unknown

  const hasWebsite = !!company.website || !!company.domain;
  if (!hasWebsite) return 15; // no website at all = highest need

  // Has website but check if it's outdated
  const techs = company.technologies.map((t) => t.toLowerCase());
  const outdatedCount = techs.filter((t) =>
    OUTDATED_TECH.some((ot) => t.includes(ot))
  ).length;

  if (outdatedCount >= 1) return 12; // has website, but outdated
  if (techs.length === 0) return 10; // has website, unknown quality

  return 3; // has modern website, low need
}

// ── Score: Location (max 10) ────────────────────────────────────────────────

function scoreLocation(
  company: EnrichedCompany | null,
  contactCity?: string | null
): number {
  // Check contact city first (from HubSpot), then company data
  const city = (
    contactCity ??
    company?.location?.city ??
    ""
  ).toLowerCase();

  if (!city) return 5; // unknown

  if (DRECHTSTEDEN.some((c) => city.includes(c))) return 10;
  if (RANDSTAD.some((c) => city.includes(c))) return 7;
  if (city.includes("nederland") || city.includes("netherlands")) return 5;

  return 2; // international or far away
}

// ── Main Scorer ─────────────────────────────────────────────────────────────

interface ScoreInput {
  company: EnrichedCompany | null;
  budget?: string | null | undefined;
  contactCity?: string | null | undefined;
}

export function calculateLeadScore(input: ScoreInput): LeadScore {
  const websiteQuality = scoreWebsiteQuality(input.company);
  const companySize = scoreCompanySize(input.company);
  const budgetIndication = scoreBudget(input.budget);
  const hasWebsite = scoreHasWebsite(input.company);
  const location = scoreLocation(input.company, input.contactCity);

  const total =
    websiteQuality + companySize + budgetIndication + hasWebsite + location;

  let tier: LeadScore["tier"];
  if (total >= 70) tier = "hot";
  else if (total >= 45) tier = "warm";
  else tier = "cold";

  return {
    total,
    breakdown: {
      websiteQuality,
      companySize,
      budgetIndication,
      hasWebsite,
      location,
    },
    tier,
  };
}
