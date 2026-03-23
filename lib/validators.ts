import { z } from "zod";

export const contactSchema = z.object({
  naam: z.string().min(2, "Naam moet minimaal 2 tekens zijn"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  bedrijf: z.string().min(2, "Bedrijfsnaam moet minimaal 2 tekens zijn"),
  telefoon: z.string().optional(),
  bericht: z.string().min(10, "Bericht moet minimaal 10 tekens zijn"),
  website_url: z.string().max(0).optional(),
});

export const offerteSchema = z.object({
  naam: z.string().min(2, "Naam is verplicht"),
  bedrijf: z.string().min(2, "Bedrijfsnaam is verplicht"),
  rol: z.string().min(2, "Rol is verplicht"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  telefoon: z.string().min(10, "Telefoonnummer is verplicht"),
  website: z.string().url("Voer een geldige URL in").optional().or(z.literal("")),
  branche: z.string().min(1, "Selecteer een branche"),
  huidige_situatie: z.string().min(1, "Selecteer je huidige situatie"),
  doel: z.string().min(1, "Selecteer je doel"),
  doel_toelichting: z.string().optional(),
  budget: z.string().min(1, "Selecteer een budgetrange"),
  tijdlijn: z.string().min(1, "Selecteer een tijdlijn"),
  extra: z.string().optional(),
  _hp: z.string().max(0).optional(),
});

export const chatMessageSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string().max(2000, "Bericht te lang"),
  })).max(50, "Te veel berichten"),
  sessionId: z.string().min(1),
});

export const emailCaptureSchema = z.object({
  email: z.string().email("Voer een geldig e-mailadres in"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type OfferteFormValues = z.infer<typeof offerteSchema>;
export type ChatMessageValues = z.infer<typeof chatMessageSchema>;
