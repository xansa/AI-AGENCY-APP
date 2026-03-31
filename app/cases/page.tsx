import { Metadata } from "next";
import { CasesContent } from "./CasesContent";

export const metadata: Metadata = {
  title: "Cases",
  description: "Bekijk onze case studies: concrete resultaten voor onze klanten.",
  alternates: { canonical: "https://arkadigital.nl/cases" },
  openGraph: {
    title: "Cases | Arka",
    description: "Bekijk onze case studies: concrete resultaten voor onze klanten.",
    url: "https://arkadigital.nl/cases",
  },
  twitter: {
    title: "Cases | Arka",
    description: "Bekijk onze case studies: concrete resultaten voor onze klanten.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Cases", item: "https://arkadigital.nl/cases" },
  ],
};

export default function CasesPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CasesContent />
    </div>
  );
}
