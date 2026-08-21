import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow, buildUrlList } from "@/lib/indexnow";

/**
 * Handmatige/losse IndexNow-trigger. Meldt alle publieke URLs aan.
 * Optioneel beveiligd met CRON_SECRET (Authorization: Bearer ...) wanneer gezet.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }
  const result = await pingIndexNow();
  return NextResponse.json({
    submitted: result.count,
    ok: result.ok,
    status: result.status ?? null,
    sample: buildUrlList().slice(0, 5),
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
