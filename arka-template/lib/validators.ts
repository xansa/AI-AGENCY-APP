import { z } from "zod";

export const contactSchema = z.object({
  naam: z.string().min(2, "Naam moet minimaal 2 tekens zijn"),
  email: z.string().email("Voer een geldig e-mailadres in"),
  bedrijf: z.string().min(2, "Bedrijfsnaam moet minimaal 2 tekens zijn"),
  telefoon: z.string().optional(),
  bericht: z.string().min(10, "Bericht moet minimaal 10 tekens zijn"),
  // Honeypot
  website_url: z.string().max(0).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
