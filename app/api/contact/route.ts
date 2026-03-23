import { sendConfirmationEmail, sendContactEmail } from "@/lib/mailer";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { saveLead } from "@/lib/supabase";
import { contactSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { success: allowed } = rateLimit(ip, { windowMs: 60_000, max: 5 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Te veel verzoeken. Probeer het over een minuut opnieuw." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ongeldige gegevens", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot check — bots fill hidden fields, real users don't
    if (data.website_url) {
      return NextResponse.json({ success: true });
    }

    await Promise.all([
      sendContactEmail(data),
      sendConfirmationEmail(data.email, data.naam),
      saveLead({ type: "contact", data: data as Record<string, unknown> }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verzenden." },
      { status: 500 }
    );
  }
}
