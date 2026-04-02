/**
 * One-time migration: create social_media_posts table in Supabase.
 * Run with: node scripts/create-social-media-table.mjs
 */
import { readFileSync } from "fs";

// Parse .env.local manually (no dotenv dependency)
const envFile = readFileSync(".env.local", "utf8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const sql = `
CREATE TABLE IF NOT EXISTS social_media_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  content text NOT NULL,
  hashtags text[] DEFAULT '{}',
  category text NOT NULL,
  hook text NOT NULL,
  source text NOT NULL DEFAULT 'generated',
  status text NOT NULL DEFAULT 'draft',
  platform text NOT NULL DEFAULT 'linkedin',
  published_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_social_media_posts_status ON social_media_posts(status);
CREATE INDEX IF NOT EXISTS idx_social_media_posts_created ON social_media_posts(created_at DESC);
`;

const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
  method: "POST",
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: sql }),
});

// The RPC approach may not work — fall back to the SQL endpoint
if (!res.ok) {
  console.log("RPC not available, trying SQL endpoint...");

  const sqlRes = await fetch(`${SUPABASE_URL}/pg`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!sqlRes.ok) {
    console.log("\nAutomated table creation not supported via REST API.");
    console.log("Please run this SQL in the Supabase Dashboard SQL Editor:\n");
    console.log(sql);
    process.exit(0);
  }

  console.log("Table created via SQL endpoint!");
  process.exit(0);
}

console.log("Table social_media_posts created successfully!");
