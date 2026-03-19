import { Resend } from "resend";

// Lazy singleton — only created when RESEND_API_KEY is present.
// Prevents a hard crash at module-load time when the key is not configured.
let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "noreply@arka.nl";
const TO = process.env.RESEND_TO_EMAIL ?? "arkaecom@proton.me";

export interface ContactFormData {
  naam: string;
  email: string;
  bedrijf: string;
  telefoon?: string;
  bericht: string;
}

export interface OfferteFormData {
  naam: string;
  bedrijf: string;
  rol: string;
  email: string;
  telefoon: string;
  website?: string;
  branche: string;
  huidige_situatie: string;
  doel: string;
  doel_toelichting?: string;
  budget: string;
  tijdlijn: string;
  extra?: string;
}

export async function sendContactEmail(data: ContactFormData) {
  const resend = getResend();
  if (!resend) return; // Resend not configured — skip silently

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Nieuw contactbericht van ${data.naam} — ${data.bedrijf}`,
    html: `
      <h2>Nieuw contactbericht</h2>
      <table cellpadding="8" style="border-collapse:collapse; width:100%">
        <tr><td><strong>Naam</strong></td><td>${data.naam}</td></tr>
        <tr><td><strong>E-mail</strong></td><td>${data.email}</td></tr>
        <tr><td><strong>Bedrijf</strong></td><td>${data.bedrijf}</td></tr>
        ${data.telefoon ? `<tr><td><strong>Telefoon</strong></td><td>${data.telefoon}</td></tr>` : ""}
        <tr><td><strong>Bericht</strong></td><td>${data.bericht.replace(/\n/g, "<br>")}</td></tr>
      </table>
    `,
  });

  if (error) throw new Error(error.message);
}

export async function sendOfferteEmail(data: OfferteFormData) {
  const resend = getResend();
  if (!resend) return; // Resend not configured — skip silently

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `Nieuwe offerteaanvraag van ${data.naam} — ${data.bedrijf}`,
    html: `
      <h2>Nieuwe offerteaanvraag</h2>
      <table cellpadding="8" style="border-collapse:collapse; width:100%; font-family:sans-serif">
        <tr style="background:#f1f5f9"><td><strong>Naam</strong></td><td>${data.naam}</td></tr>
        <tr><td><strong>Bedrijf</strong></td><td>${data.bedrijf}</td></tr>
        <tr style="background:#f1f5f9"><td><strong>Rol</strong></td><td>${data.rol}</td></tr>
        <tr><td><strong>E-mail</strong></td><td>${data.email}</td></tr>
        <tr style="background:#f1f5f9"><td><strong>Telefoon</strong></td><td>${data.telefoon}</td></tr>
        ${data.website ? `<tr><td><strong>Website</strong></td><td>${data.website}</td></tr>` : ""}
        <tr style="background:#f1f5f9"><td><strong>Branche</strong></td><td>${data.branche}</td></tr>
        <tr><td><strong>Huidige situatie</strong></td><td>${data.huidige_situatie}</td></tr>
        <tr style="background:#f1f5f9"><td><strong>Doel</strong></td><td>${data.doel}</td></tr>
        ${data.doel_toelichting ? `<tr><td><strong>Toelichting doel</strong></td><td>${data.doel_toelichting}</td></tr>` : ""}
        <tr style="background:#f1f5f9"><td><strong>Budget</strong></td><td>${data.budget}</td></tr>
        <tr><td><strong>Tijdlijn</strong></td><td>${data.tijdlijn}</td></tr>
        ${data.extra ? `<tr style="background:#f1f5f9"><td><strong>Extra</strong></td><td>${data.extra.replace(/\n/g, "<br>")}</td></tr>` : ""}
      </table>
    `,
  });

  if (error) throw new Error(error.message);
}

export async function sendConfirmationEmail(email: string, naam: string) {
  const resend = getResend();
  if (!resend) return; // Resend not configured — skip silently

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "We hebben je aanvraag ontvangen — Arka",
    html: `
      <div style="font-family:sans-serif; max-width:600px; margin:0 auto">
        <h2 style="color:#4338ca">Bedankt, ${naam}!</h2>
        <p>We hebben je aanvraag ontvangen en nemen binnen <strong>1 werkdag</strong> contact met je op.</p>
        <p>In de tussentijd kun je alvast een <a href="https://calendly.com/arka/intake" style="color:#6366f1">kennismakingsgesprek inplannen</a> als je snel wilt schakelen.</p>
        <br>
        <p>Met vriendelijke groet,<br><strong>Arka</strong></p>
      </div>
    `,
  });
}
