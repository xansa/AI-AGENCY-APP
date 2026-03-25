// Lazy HubSpot CRM integration — only active when HUBSPOT_ACCESS_TOKEN is set.
// Follows the same pattern as lib/mailer.ts and lib/supabase.ts.

let _token: string | null = null;

function getToken(): string | null {
  if (_token) return _token;
  const t = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!t) return null;
  _token = t;
  return _token;
}

const API = "https://api.hubapi.com";

async function hubspotFetch(path: string, body: unknown): Promise<unknown> {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HubSpot ${res.status}: ${text}`);
  }

  return res.json();
}

// ── Contact upsert (create or update by email) ─────────────────────────────

interface ContactData {
  email: string;
  naam: string;
  bedrijf: string;
  telefoon?: string;
  bron: "contact" | "offerte" | "chatbot";
}

export async function upsertContact(data: ContactData): Promise<string | null> {
  const token = getToken();
  if (!token) return null;

  // Split naam into first/last
  const parts = data.naam.trim().split(/\s+/);
  const firstname = parts[0] ?? "";
  const lastname = parts.slice(1).join(" ") || "";

  // Try to find existing contact by email
  const search = (await hubspotFetch("/crm/v3/objects/contacts/search", {
    filterGroups: [
      {
        filters: [
          { propertyName: "email", operator: "EQ", value: data.email },
        ],
      },
    ],
    properties: ["email", "firstname", "lastname"],
    limit: 1,
  })) as { total: number; results: { id: string }[] } | null;

  if (search && search.total > 0) {
    // Update existing contact
    const id = search.results[0].id;
    const res = await fetch(`${API}/crm/v3/objects/contacts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        properties: {
          firstname,
          lastname,
          company: data.bedrijf,
          phone: data.telefoon ?? "",
          hs_lead_status: "NEW",
        },
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HubSpot update ${res.status}: ${text}`);
    }
    return id;
  }

  // Create new contact
  const created = (await hubspotFetch("/crm/v3/objects/contacts", {
    properties: {
      email: data.email,
      firstname,
      lastname,
      company: data.bedrijf,
      phone: data.telefoon ?? "",
      hs_lead_status: "NEW",
      lifecyclestage: "lead",
    },
  })) as { id: string } | null;

  return created?.id ?? null;
}

// ── Deal creation (for offerte requests) ────────────────────────────────────

interface DealData {
  naam: string;
  bedrijf: string;
  pakket: string;
  contactId?: string | null;
}

export async function createDeal(data: DealData): Promise<string | null> {
  const token = getToken();
  if (!token) return null;

  const associations = data.contactId
    ? [
        {
          to: { id: data.contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 3, // deal-to-contact
            },
          ],
        },
      ]
    : [];

  const created = (await hubspotFetch("/crm/v3/objects/deals", {
    properties: {
      dealname: `Offerte | ${data.bedrijf} (${data.pakket})`,
      dealstage: "appointmentscheduled",
      pipeline: "default",
      description: `Offerte aanvraag via website van ${data.naam} (${data.bedrijf}). Pakket: ${data.pakket}.`,
    },
    associations,
  })) as { id: string } | null;

  return created?.id ?? null;
}

// ── Simple note (for contact form messages) ─────────────────────────────────

export async function createNote(
  body: string,
  contactId?: string | null
): Promise<void> {
  const token = getToken();
  if (!token) return;

  const associations = contactId
    ? [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 202, // note-to-contact
            },
          ],
        },
      ]
    : [];

  await hubspotFetch("/crm/v3/objects/notes", {
    properties: { hs_note_body: body, hs_timestamp: new Date().toISOString() },
    associations,
  });
}
