import { upsertContact, createDeal } from "@/lib/hubspot";
import { sendConfirmationEmail, sendOfferteEmail } from "@/lib/mailer";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { saveLead } from "@/lib/supabase";
import { offerteSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Ongeldig verzoek." },
        { status: 415 }
      );
    }

    const ip = getClientIp(req);
    const { success: allowed } = rateLimit(ip, { windowMs: 60_000, max: 5 });
    if (!allowed) {
      return NextResponse.json(
        { error: "Te veel verzoeken. Probeer het over een minuut opnieuw." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = offerteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ongeldige gegevens. Controleer je invoer en probeer opnieuw." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot check
    if (data._hp) {
      return NextResponse.json({ success: true });
    }

    // Fire-and-forget: push to HubSpot CRM (contact + deal)
    (async () => {
      const contactId = await upsertContact({
        email: data.email,
        naam: data.naam,
        bedrijf: data.bedrijf,
        telefoon: data.telefoon,
        bron: "offerte",
      });
      await createDeal({
        naam: data.naam,
        bedrijf: data.bedrijf,
        pakket: data.budget,
        contactId,
      });
    })().catch(console.error);

    await Promise.all([
      sendOfferteEmail(data),
      sendConfirmationEmail(data.email, data.naam),
      saveLead({ type: "offerte", data: data as Record<string, unknown> }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Offerte form error:", err);
    return NextResponse.json(
      { error: "Er is een fout opgetreden bij het verzenden." },
      { status: 500 }
    );
  }
}
