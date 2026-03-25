import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { PackagesContent } from "./PackagesContent";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Bekijk onze 3 combipackages: Starter, Professional en Enterprise. Eenmalig of maandelijks, transparante investering.",
};

export default function PackagesPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            Combipackages
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Transparante pakketten.
            <br />
            Duidelijke afspraken.
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto leading-relaxed">
            Kies voor een eenmalig project of een doorlopende samenwerking.
            Geen verborgen kosten, geen ellenlange offertetrajecten.
          </p>
        </div>
      </section>

      <PackagesContent />
    </div>
  );
}
