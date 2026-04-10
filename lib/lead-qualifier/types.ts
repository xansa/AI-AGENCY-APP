// ── Lead Qualifier Types ─────────────────────────────────────────────────────

export interface EnrichedCompany {
  name: string | null;
  domain: string | null;
  description: string | null;
  industry: string | null;
  employeeCount: number | null;
  employeeRange: { start: number; end: number } | null;
  foundedYear: number | null;
  type: string | null;
  location: {
    city: string | null;
    state: string | null;
    country: string | null;
  } | null;
  technologies: string[];
  linkedin: string | null;
  website: string | null;
}

export interface EnrichedPerson {
  name: string | null;
  title: string | null;
  linkedin: string | null;
  company: string | null;
}

export interface LeadEnrichment {
  company: EnrichedCompany | null;
  person: EnrichedPerson | null;
  enrichedAt: string;
}

export interface LeadScore {
  total: number; // 0-100
  breakdown: {
    websiteQuality: number;   // max 30
    companySize: number;       // max 20
    budgetIndication: number;  // max 25
    hasWebsite: number;        // max 15
    location: number;          // max 10
  };
  tier: "hot" | "warm" | "cold";
}

export interface QualifiedLead {
  contactId: string;
  email: string;
  company: string;
  enrichment: LeadEnrichment;
  score: LeadScore;
  dealId?: string;
}
