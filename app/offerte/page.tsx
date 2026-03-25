import { Badge } from "@/components/ui/Badge";
import type { Metadata } from "next";
import { OfferteForm } from "./OfferteForm";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag een vrijblijvende offerte aan bij Arka. Binnen 48 uur ontvang je een persoonlijk voorstel op maat.",
};

export default function OffertePage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            Offerte aanvragen
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Vertel ons over je situatie
          </h1>
          <p className="text-dark-400 max-w-xl leading-relaxed">
            Vul het formulier in. We sturen binnen 48 uur een persoonlijk
            voorstel op maat.
          </p>
        </div>
      </section>

      <section className="py-16 bg-dark-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfferteForm />
        </div>
      </section>
    </div>
  );
}
