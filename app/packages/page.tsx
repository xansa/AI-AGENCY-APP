import { Metadata } from "next";
import { PackagesPageContent } from "./PackagesPageContent";

export const metadata: Metadata = {
  title: "Pakketten",
  description:
    "Bekijk onze 3 combipackages: Starter, Professional en Enterprise. Eenmalig of maandelijks, transparante investering.",
  alternates: { canonical: "https://arkadigital.nl/packages" },
};

export default function PackagesPage() {
  return (
    <div className="pt-24">
      <PackagesPageContent />
    </div>
  );
}
