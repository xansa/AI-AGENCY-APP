#!/usr/bin/env node
// ── Lead Qualifier Backfill Driver ──────────────────────────────────────────
// Loops the /api/lead-qualifier endpoint in backfill mode until all contacts
// without a lead_score are processed.
//
// Usage:
//   CRON_SECRET=xxx node scripts/backfill-lead-scores.mjs
//   CRON_SECRET=xxx BASE_URL=https://arkadigital.nl node scripts/backfill-lead-scores.mjs
//   CRON_SECRET=xxx BATCH=25 MAX_BATCHES=50 node scripts/backfill-lead-scores.mjs

const BASE_URL = process.env.BASE_URL ?? "https://arkadigital.nl";
const CRON_SECRET = process.env.CRON_SECRET;
const BATCH = parseInt(process.env.BATCH ?? "25", 10);
const MAX_BATCHES = parseInt(process.env.MAX_BATCHES ?? "100", 10);

if (!CRON_SECRET) {
  console.error("Missing CRON_SECRET env var");
  process.exit(1);
}

const url = (after) => {
  const u = new URL("/api/lead-qualifier", BASE_URL);
  u.searchParams.set("mode", "backfill");
  u.searchParams.set("limit", String(BATCH));
  if (after) u.searchParams.set("after", after);
  return u.toString();
};

const totals = { processed: 0, hot: 0, warm: 0, cold: 0, batches: 0 };
let after;

console.log(`Starting backfill against ${BASE_URL} (batch=${BATCH})`);

for (let i = 0; i < MAX_BATCHES; i++) {
  const target = url(after);
  const started = Date.now();
  const res = await fetch(target, {
    headers: { Authorization: `Bearer ${CRON_SECRET}` },
  });

  if (!res.ok) {
    console.error(`Batch ${i + 1} failed: ${res.status} ${await res.text()}`);
    process.exit(1);
  }

  const data = await res.json();
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);

  totals.processed += data.processed ?? 0;
  totals.hot += data.hot ?? 0;
  totals.warm += data.warm ?? 0;
  totals.cold += data.cold ?? 0;
  totals.batches += 1;

  console.log(
    `Batch ${i + 1}: processed ${data.processed} (hot=${data.hot} warm=${data.warm} cold=${data.cold}) in ${elapsed}s, total queue=${data.total}`
  );

  if (!data.nextAfter || data.processed === 0) {
    console.log("Done, no more contacts to process.");
    break;
  }
  after = data.nextAfter;
}

console.log("\n=== Backfill complete ===");
console.log(`Batches: ${totals.batches}`);
console.log(`Processed: ${totals.processed}`);
console.log(`  hot:  ${totals.hot}`);
console.log(`  warm: ${totals.warm}`);
console.log(`  cold: ${totals.cold}`);
