// ── Lead Qualifier Cron ──────────────────────────────────────────────────────
// Runs daily at 07:00 UTC via Vercel Cron.
// 1. Fetches recently created HubSpot contacts (last 25 hours)
// 2. Analyzes their website (tech detection, response time, reachability)
// 3. Scores the lead (0-100)
// 4. Updates HubSpot: lead_score property + deal stage if hot
// Zero external API costs: uses direct website fetching instead of AI Ark.

import { NextRequest, NextResponse } from "next/server";
import { analyzeWebsite, analysisToCompany } from "@/lib/lead-qualifier/website-analyzer";
import { calculateLeadScore } from "@/lib/lead-qualifier/scorer";
import type { LeadEnrichment, QualifiedLead } from "@/lib/lead-qualifier/types";

export const maxDuration = 300;

// ── HubSpot helpers ─────────────────────────────────────────────────────────

const HS_API = "https://api.hubapi.com";

function getHubSpotToken(): string | null {
  return process.env.HUBSPOT_ACCESS_TOKEN ?? null;
}

async function hsFetch(
  path: string,
  method: "GET" | "POST" | "PATCH",
  body?: unknown
): Promise<unknown> {
  const token = getHubSpotToken();
  if (!token) return null;

  const res = await fetch(`${HS_API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[HubSpot] ${res.status} ${method} ${path}:`, text);
    return null;
  }

  return res.json();
}

// ── Types ───────────────────────────────────────────────────────────────────

interface HubSpotContact {
  id: string;
  properties: {
    email?: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    phone?: string;
    city?: string;
    website?: string;
    lead_score?: string;
    createdate?: string;
    hs_lead_status?: string;
  };
}

interface HubSpotSearchResult {
  total: number;
  results: HubSpotContact[];
  paging?: { next?: { after: string } };
}

// ── Update contact with score ───────────────────────────────────────────────

async function updateContactScore(
  contactId: string,
  score: number,
  tier: string,
  enrichmentNote: string
): Promise<void> {
  await hsFetch(`/crm/v3/objects/contacts/${contactId}`, "PATCH", {
    properties: {
      lead_score: score.toString(),
      hs_lead_status: tier === "hot" ? "OPEN_DEAL" : tier === "warm" ? "IN_PROGRESS" : "NEW",
    },
  });

  // Add note with enrichment details
  await hsFetch("/crm/v3/objects/notes", "POST", {
    properties: {
      hs_note_body: enrichmentNote,
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: { id: contactId },
        types: [
          { associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 },
        ],
      },
    ],
  });
}

// ── Update deal stage for hot leads ─────────────────────────────────────────

interface HubSpotAssociation {
  results: Array<{ id: string; type: string }>;
}

async function promoteDeals(contactId: string): Promise<void> {
  const assoc = (await hsFetch(
    `/crm/v3/objects/contacts/${contactId}/associations/deals`,
    "GET"
  )) as HubSpotAssociation | null;

  if (!assoc || assoc.results.length === 0) return;

  for (const deal of assoc.results) {
    await hsFetch(`/crm/v3/objects/deals/${deal.id}`, "PATCH", {
      properties: { dealstage: "qualifiedtobuy" },
    });
  }
}

// ── Email notification for hot leads ────────────────────────────────────────

async function notifyHotLead(lead: QualifiedLead): Promise<void> {
  const { Resend } = await import("resend");
  const key = process.env.RESEND_API_KEY;
  if (!key) return;

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM_EMAIL ?? "noreply@arkadigital.nl";
  const companyInfo = lead.enrichment.company;

  await resend.emails.send({
    from,
    to: "kaan@arkadigital.nl",
    subject: `Hot lead! ${lead.company} (score: ${lead.score.total})`,
    html: `
      <div style="font-family:sans-serif; max-width:600px; margin:0 auto">
        <h2 style="color:#4338ca">Nieuwe hot lead: ${escapeHtml(lead.company)}</h2>
        <table cellpadding="6" style="border-collapse:collapse; width:100%">
          <tr><td><strong>Email</strong></td><td>${escapeHtml(lead.email)}</td></tr>
          <tr><td><strong>Score</strong></td><td><strong>${lead.score.total}/100</strong> (${lead.score.tier})</td></tr>
          <tr><td><strong>Website</strong></td><td>${companyInfo?.website ? escapeHtml(companyInfo.website) : "Geen"}</td></tr>
          <tr><td><strong>Technologie</strong></td><td>${companyInfo?.technologies?.join(", ") || "Geen gedetecteerd"}</td></tr>
        </table>
        <h3>Score breakdown</h3>
        <ul>
          <li>Website kwaliteit: ${lead.score.breakdown.websiteQuality}/30</li>
          <li>Bedrijfsgrootte: ${lead.score.breakdown.companySize}/20</li>
          <li>Budget: ${lead.score.breakdown.budgetIndication}/25</li>
          <li>Heeft website: ${lead.score.breakdown.hasWebsite}/15</li>
          <li>Locatie: ${lead.score.breakdown.location}/10</li>
        </ul>
        <p><a href="https://app-eu1.hubspot.com/contacts/148097458/contact/${lead.contactId}" style="color:#6366f1">Bekijk in HubSpot</a></p>
      </div>
    `,
  });
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// ── Enrich a single contact ─────────────────────────────────────────────────

async function enrichContact(
  contact: HubSpotContact
): Promise<LeadEnrichment> {
  const website = contact.properties.website;
  const companyName = contact.properties.company ?? null;

  let company = null;
  if (website) {
    const analysis = await analyzeWebsite(website);
    company = analysisToCompany(analysis, companyName);
  }

  return {
    company,
    person: null, // No person enrichment without AI Ark
    enrichedAt: new Date().toISOString(),
  };
}

// ── Build enrichment note ───────────────────────────────────────────────────

function buildEnrichmentNote(
  enrichment: LeadEnrichment,
  score: QualifiedLead["score"]
): string {
  const lines: string[] = [
    `<strong>Lead Qualifier (auto)</strong>`,
    `Score: <strong>${score.total}/100</strong> (${score.tier})`,
    ``,
    `<em>Breakdown:</em>`,
    `- Website kwaliteit: ${score.breakdown.websiteQuality}/30`,
    `- Bedrijfsgrootte: ${score.breakdown.companySize}/20`,
    `- Budget: ${score.breakdown.budgetIndication}/25`,
    `- Heeft website: ${score.breakdown.hasWebsite}/15`,
    `- Locatie: ${score.breakdown.location}/10`,
  ];

  if (enrichment.company) {
    const c = enrichment.company;
    lines.push(
      ``,
      `<em>Website analyse:</em>`,
      `- URL: ${c.website ?? "Geen"}`,
      `- Tech stack: ${c.technologies.length > 0 ? c.technologies.join(", ") : "Niet gedetecteerd"}`
    );
  } else {
    lines.push(``, `<em>Geen website gevonden bij dit contact.</em>`);
  }

  lines.push(``, `Verrijkt op: ${enrichment.enrichedAt}`);
  return lines.join("<br>");
}

// ── Main handler ────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = getHubSpotToken();
  if (!token) {
    return NextResponse.json(
      { error: "HUBSPOT_ACCESS_TOKEN not configured" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const backfill = url.searchParams.get("mode") === "backfill";
  const batchSize = Math.min(
    parseInt(url.searchParams.get("limit") ?? "", 10) || (backfill ? 25 : 50),
    100
  );
  const after = url.searchParams.get("after") ?? undefined;

  try {
    // 1. Fetch contacts to qualify.
    // - Default mode: last 25 hours (daily cron)
    // - Backfill mode: all contacts without a lead_score, paginated via `after`
    const filters = backfill
      ? [{ propertyName: "lead_score", operator: "NOT_HAS_PROPERTY" }]
      : [
          {
            propertyName: "createdate",
            operator: "GTE",
            value: (Date.now() - 25 * 60 * 60 * 1000).toString(),
          },
        ];

    const searchResult = (await hsFetch(
      "/crm/v3/objects/contacts/search",
      "POST",
      {
        filterGroups: [{ filters }],
        properties: [
          "email", "firstname", "lastname", "company", "phone",
          "city", "website", "lead_score", "createdate", "hs_lead_status",
        ],
        sorts: [{ propertyName: "createdate", direction: "DESCENDING" }],
        limit: batchSize,
        ...(after ? { after } : {}),
      }
    )) as HubSpotSearchResult | null;

    const contacts = searchResult?.results ?? [];

    // Filter out contacts that already have a non-zero lead_score
    const unscored = contacts.filter(
      (c) => !c.properties.lead_score || c.properties.lead_score === "0"
    );

    if (unscored.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No contacts to qualify",
        processed: 0,
        nextAfter: searchResult?.paging?.next?.after ?? null,
        total: searchResult?.total ?? 0,
      });
    }

    const results: QualifiedLead[] = [];

    // 2. Process each contact
    for (const contact of unscored) {
      try {
        const email = contact.properties.email ?? "";
        const company = contact.properties.company ?? "Onbekend";

        // Analyze website (zero cost)
        const enrichment = await enrichContact(contact);

        // Score the lead
        const score = calculateLeadScore({
          company: enrichment.company,
          budget: null,
          contactCity: contact.properties.city,
        });

        const qualified: QualifiedLead = {
          contactId: contact.id,
          email,
          company,
          enrichment,
          score,
        };

        // 3. Update HubSpot
        const note = buildEnrichmentNote(enrichment, score);
        await updateContactScore(contact.id, score.total, score.tier, note);

        // 4. If hot, promote deals. Skip email notifications during backfill
        //    to avoid flooding the inbox with hundreds of messages.
        if (score.tier === "hot") {
          await promoteDeals(contact.id);
          if (!backfill) {
            await notifyHotLead(qualified).catch((err) =>
              console.error("[LeadQualifier] Email notification failed:", err)
            );
          }
        }

        results.push(qualified);
      } catch (err) {
        console.error(
          `[LeadQualifier] Failed to process contact ${contact.id}:`,
          err
        );
      }
    }

    return NextResponse.json({
      success: true,
      mode: backfill ? "backfill" : "cron",
      processed: results.length,
      total: searchResult?.total ?? 0,
      nextAfter: searchResult?.paging?.next?.after ?? null,
      hot: results.filter((r) => r.score.tier === "hot").length,
      warm: results.filter((r) => r.score.tier === "warm").length,
      cold: results.filter((r) => r.score.tier === "cold").length,
      results: results.map((r) => ({
        contactId: r.contactId,
        email: r.email,
        company: r.company,
        score: r.score.total,
        tier: r.score.tier,
      })),
    });
  } catch (err) {
    console.error("[LeadQualifier] Cron failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST handler for manual triggers (same logic)
export async function POST(request: NextRequest) {
  return GET(request);
}
