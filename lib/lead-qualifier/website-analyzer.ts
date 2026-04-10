// ── Website Analyzer ─────────────────────────────────────────────────────────
// Zero-cost alternative to AI Ark for Arka lead qualification.
// Fetches the website, detects technology, checks response time and status.

import { EnrichedCompany } from "./types";

// ── Tech detection patterns ─────────────────────────────────────────────────

const TECH_PATTERNS: { name: string; patterns: RegExp[] }[] = [
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
  { name: "Google Analytics", patterns: [/google-analytics\.com/i, /gtag\/js/i, /googletagmanager/i] },
  { name: "Vercel", patterns: [/vercel\.app/i, /vercel/i] },
  { name: "Netlify", patterns: [/netlify/i] },
  { name: "PHP", patterns: [/\.php/i, /x-powered-by.*php/i] },
  { name: "Framer", patterns: [/framer\.com/i, /framerusercontent/i] },
];

// ── Analyze a website ───────────────────────────────────────────────────────

interface WebsiteAnalysis {
  url: string;
  reachable: boolean;
  statusCode: number | null;
  responseTimeMs: number | null;
  technologies: string[];
  generator: string | null;
  poweredBy: string | null;
  hasSSL: boolean;
  title: string | null;
}

export async function analyzeWebsite(url: string): Promise<WebsiteAnalysis> {
  // Normalize URL
  let fullUrl = url.trim();
  if (!fullUrl.startsWith("http")) {
    fullUrl = `https://${fullUrl}`;
  }

  const result: WebsiteAnalysis = {
    url: fullUrl,
    reachable: false,
    statusCode: null,
    responseTimeMs: null,
    technologies: [],
    generator: null,
    poweredBy: null,
    hasSSL: fullUrl.startsWith("https"),
    title: null,
  };

  try {
    const start = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(fullUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ArkaBot/1.0)",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);
    result.responseTimeMs = Date.now() - start;
    result.statusCode = res.status;
    result.reachable = res.ok;

    // Check headers
    const poweredBy = res.headers.get("x-powered-by");
    if (poweredBy) {
      result.poweredBy = poweredBy;
      if (/php/i.test(poweredBy)) result.technologies.push("PHP");
    }

    const server = res.headers.get("server");
    if (server) {
      if (/nginx/i.test(server)) result.technologies.push("Nginx");
      if (/apache/i.test(server)) result.technologies.push("Apache");
    }

    // Read first 100KB of HTML for tech detection
    const html = await res.text().then((t) => t.slice(0, 100_000));

    // Extract <title>
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) result.title = titleMatch[1].trim();

    // Extract <meta name="generator">
    const genMatch = html.match(
      /<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i
    );
    if (genMatch) {
      result.generator = genMatch[1].trim();
      // Add generator as technology
      const genLower = genMatch[1].toLowerCase();
      if (genLower.includes("wordpress")) result.technologies.push("WordPress");
      if (genLower.includes("joomla")) result.technologies.push("Joomla");
      if (genLower.includes("drupal")) result.technologies.push("Drupal");
      if (genLower.includes("wix")) result.technologies.push("Wix");
    }

    // Match tech patterns against HTML
    for (const tech of TECH_PATTERNS) {
      if (result.technologies.includes(tech.name)) continue;
      for (const pattern of tech.patterns) {
        if (pattern.test(html)) {
          result.technologies.push(tech.name);
          break;
        }
      }
    }

    // Deduplicate
    result.technologies = Array.from(new Set(result.technologies));
  } catch (err) {
    // Website unreachable or timed out
    result.reachable = false;
  }

  return result;
}

// ── Convert analysis to EnrichedCompany ─────────────────────────────────────

export function analysisToCompany(
  analysis: WebsiteAnalysis,
  companyName: string | null
): EnrichedCompany {
  return {
    name: companyName,
    domain: analysis.url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0],
    description: null,
    industry: null,
    employeeCount: null,
    employeeRange: null,
    foundedYear: null,
    type: null,
    location: null,
    technologies: analysis.technologies,
    linkedin: null,
    website: analysis.url,
  };
}
