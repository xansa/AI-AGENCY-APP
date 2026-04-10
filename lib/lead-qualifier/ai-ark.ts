// ── AI Ark API Client ────────────────────────────────────────────────────────
// Docs: https://docs.ai-ark.com/
// Auth: X-TOKEN header
// Rate limit: 5/sec, 300/min, 18000/hr

import { EnrichedCompany, EnrichedPerson } from "./types";

const BASE_URL = "https://api.ai-ark.com/api/developer-portal";

function getToken(): string | null {
  return process.env.AI_ARK_API_KEY ?? null;
}

async function arkFetch<T>(path: string, body: unknown): Promise<T | null> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-TOKEN": token,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error(`[AI Ark] ${res.status} on ${path}:`, await res.text());
    return null;
  }

  return res.json() as Promise<T>;
}

async function arkGet<T>(path: string): Promise<T | null> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: { "X-TOKEN": token },
  });

  if (!res.ok) {
    console.error(`[AI Ark] ${res.status} on ${path}:`, await res.text());
    return null;
  }

  return res.json() as Promise<T>;
}

// ── Company Search ──────────────────────────────────────────────────────────

interface ArkCompanyResult {
  content: Array<{
    id: string;
    summary: {
      name?: string;
      description?: string;
      industry?: string;
      founded_year?: number;
      type?: string;
      staff?: {
        total?: number;
        range?: { start: number; end: number };
      };
      link?: {
        website?: string;
        domain?: string;
        linkedin?: string;
      };
      location?: {
        headquarter?: {
          city?: string;
          state?: string;
          raw_address?: string;
        };
      };
      technologies?: Array<{ name: string; category?: string }>;
    };
  }>;
  totalElements: number;
}

export async function searchCompanyByDomain(
  domain: string
): Promise<EnrichedCompany | null> {
  const result = await arkFetch<ArkCompanyResult>("/v1/companies", {
    page: 0,
    size: 1,
    account: {
      domain: {
        any: { include: [domain] },
      },
    },
  });

  if (!result || result.totalElements === 0 || !result.content[0]) return null;

  const s = result.content[0].summary;
  return {
    name: s.name ?? null,
    domain: s.link?.domain ?? domain,
    description: s.description ?? null,
    industry: s.industry ?? null,
    employeeCount: s.staff?.total ?? null,
    employeeRange: s.staff?.range ?? null,
    foundedYear: s.founded_year ?? null,
    type: s.type ?? null,
    location: s.location?.headquarter
      ? {
          city: s.location.headquarter.city ?? null,
          state: s.location.headquarter.state ?? null,
          country: null, // API does not always return country
        }
      : null,
    technologies: (s.technologies ?? []).map((t) => t.name),
    linkedin: s.link?.linkedin ?? null,
    website: s.link?.website ?? s.link?.domain ?? null,
  };
}

export async function searchCompanyByName(
  name: string
): Promise<EnrichedCompany | null> {
  const result = await arkFetch<ArkCompanyResult>("/v1/companies", {
    page: 0,
    size: 1,
    account: {
      name: {
        any: {
          include: [name],
          matchMode: "SMART",
        },
      },
    },
  });

  if (!result || result.totalElements === 0 || !result.content[0]) return null;

  const s = result.content[0].summary;
  return {
    name: s.name ?? null,
    domain: s.link?.domain ?? null,
    description: s.description ?? null,
    industry: s.industry ?? null,
    employeeCount: s.staff?.total ?? null,
    employeeRange: s.staff?.range ?? null,
    foundedYear: s.founded_year ?? null,
    type: s.type ?? null,
    location: s.location?.headquarter
      ? {
          city: s.location.headquarter.city ?? null,
          state: s.location.headquarter.state ?? null,
          country: null,
        }
      : null,
    technologies: (s.technologies ?? []).map((t) => t.name),
    linkedin: s.link?.linkedin ?? null,
    website: s.link?.website ?? s.link?.domain ?? null,
  };
}

// ── Person Reverse Lookup ───────────────────────────────────────────────────

interface ArkPersonResult {
  name?: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  headline?: string;
  linkedin?: string;
  company?: {
    name?: string;
    domain?: string;
  };
}

export async function lookupPersonByEmail(
  email: string
): Promise<EnrichedPerson | null> {
  const result = await arkFetch<ArkPersonResult>(
    "/v1/people/reverse-lookup",
    { kind: "CONTACT", search: email }
  );

  if (!result) return null;

  const fullName =
    result.name ??
    ([result.first_name, result.last_name].filter(Boolean).join(" ") ||
    null);

  return {
    name: fullName,
    title: result.title ?? result.headline ?? null,
    linkedin: result.linkedin ?? null,
    company: result.company?.name ?? null,
  };
}

// ── People Search (by company) ──────────────────────────────────────────────

interface ArkPeopleSearchResult {
  content: Array<{
    id: string;
    summary?: {
      name?: string;
      first_name?: string;
      last_name?: string;
      title?: string;
      headline?: string;
      linkedin?: string;
    };
  }>;
  totalElements: number;
}

export async function searchPeopleByCompanyDomain(
  domain: string,
  size: number = 3
): Promise<EnrichedPerson[]> {
  const result = await arkFetch<ArkPeopleSearchResult>("/v1/people", {
    page: 0,
    size,
    account: {
      domain: {
        any: { include: [domain] },
      },
    },
  });

  if (!result || result.totalElements === 0) return [];

  const people: EnrichedPerson[] = [];
  for (const p of result.content) {
    const s = p.summary;
    if (!s) continue;
    const fullName =
      s.name ??
      ([s.first_name, s.last_name].filter(Boolean).join(" ") || null);
    people.push({
      name: fullName,
      title: s.title ?? s.headline ?? null,
      linkedin: s.linkedin ?? null,
      company: null,
    });
  }
  return people;
}

// ── Credit Check ────────────────────────────────────────────────────────────

interface ArkCreditResult {
  credit?: number;
  remaining?: number;
}

export async function getCredits(): Promise<number | null> {
  const result = await arkGet<ArkCreditResult>("/v1/credit");
  if (!result) return null;
  return result.remaining ?? result.credit ?? null;
}
