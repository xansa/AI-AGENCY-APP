import { sendConfirmationEmail, sendContactEmail } from "@/lib/mailer";
import { saveLead } from "@/lib/supabase";
import { contactSchema } from "@/lib/validators";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ongeldige gegevens", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

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
