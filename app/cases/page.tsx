import { Metadata } from "next";
import { CasesContent } from "./CasesContent";

export const metadata: Metadata = {
  title: "Cases",
  description: "Concrete, meetbare resultaten uit onze eigen ventures: zelf gebouwd en in de praktijk bewezen.",
  alternates: { canonical: "https://arkadigital.nl/cases" },
  openGraph: {
    title: "Cases | Arka",
    description: "Concrete, meetbare resultaten uit onze eigen ventures: zelf gebouwd en in de praktijk bewezen.",
    url: "https://arkadigital.nl/cases",
  },
  twitter: {
    title: "Cases | Arka",
    description: "Concrete, meetbare resultaten uit onze eigen ventures: zelf gebouwd en in de praktijk bewezen.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CasesContent />
    </>
  );
}
