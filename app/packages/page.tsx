import { Metadata } from "next";
import { PackagesPageContent } from "./PackagesPageContent";

export const metadata: Metadata = {
  title: "Pakketten",
  description:
    "Bekijk onze 3 combipackages: Starter, Professional en Enterprise. Eenmalig of maandelijks, transparante investering.",
  alternates: { canonical: "https://arkadigital.nl/packages" },
  openGraph: {
    title: "Pakketten | Arka",
    description: "Bekijk onze 3 combipackages: Starter, Professional en Enterprise. Eenmalig of maandelijks, transparante investering.",
    url: "https://arkadigital.nl/packages",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Pakketten", item: "https://arkadigital.nl/packages" },
  ],
};

export default function PackagesPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PackagesPageContent />
    </div>
  );
}
