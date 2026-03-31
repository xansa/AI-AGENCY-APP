import type { Metadata } from "next";
import { OffertePageContent } from "./OffertePageContent";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag een vrijblijvende offerte aan bij Arka. Binnen 24 uur ontvang je een persoonlijk voorstel op maat.",
  alternates: { canonical: "https://arkadigital.nl/offerte" },
};

export default function OffertePage() {
  return (
    <div className="pt-24">
      <OffertePageContent />
    </div>
  );
}
