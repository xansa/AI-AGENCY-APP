import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export interface ChatLog {
  id?: string;
  session_id: string;
  messages: { role: string; content: string }[];
  created_at?: string;
  updated_at?: string;
}

export interface LeadLog {
  id?: string;
  type: "contact" | "offerte" | "chat_email";
  data: Record<string, unknown>;
  created_at?: string;
}

// Lazy singleton — only created when env vars are present.
// This prevents a hard crash at module-load time in local dev
// where SUPABASE_* vars may not be configured yet.
let _adminClient: SupabaseClient | null = null;

function getAdminClient(): SupabaseClient | null {
  if (_adminClient) return _adminClient;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  _adminClient = createClient(url, key, {
    auth: { persistSession: false },
  });
  return _adminClient;
}

export async function saveChatLog(log: ChatLog): Promise<void> {
  const client = getAdminClient();
  if (!client) return; // Supabase not configured — skip silently

  const { error } = await client.from("chat_logs").upsert(
    {
      session_id: log.session_id,
      messages: log.messages,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "session_id" }
  );

  if (error) console.error("Failed to save chat log:", error.message);
}

export async function saveLead(lead: LeadLog): Promise<void> {
  const client = getAdminClient();
  if (!client) return; // Supabase not configured — skip silently

  const { error } = await client.from("leads").insert({
    type: lead.type,
    data: lead.data,
    created_at: new Date().toISOString(),
  });

  if (error) console.error("Failed to save lead:", error.message);
}
