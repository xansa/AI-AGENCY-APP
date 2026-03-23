/**
 * Site configuratie — pas dit aan per klant
 *
 * Dit bestand bevat alle klant-specifieke informatie.
 * Wijzig dit als eerste bij een nieuw project.
 */

export const site = {
  // ── Bedrijfsinfo ──
  name: "Klantnaam",
  tagline: "Korte tagline van het bedrijf",
  description: "Langere beschrijving voor SEO en metadata.",

  // ── Contact ──
  email: "info@klantnaam.nl",
  phone: "+31 6 00000000",
  location: "Stad, Nederland",

  // ── URLs ──
  url: "https://klantnaam.nl",
  calendlyUrl: "https://calendly.com/klantnaam/intake",

  // ── Socials (optioneel) ──
  socials: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },

  // ── Branding ──
  colors: {
    primary: "#1E3A5F",    // Hoofdkleur
    accent: "#3B82F6",     // Accentkleur
    background: "#FFFFFF", // Achtergrond
    text: "#1E293B",       // Tekstkleur
  },

  // ── KVK / BTW ──
  kvk: "",
  btw: "",
} as const;

export type SiteConfig = typeof site;
