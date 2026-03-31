import type { Metadata } from "next";
import { OffertePageContent } from "./OffertePageContent";

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag een vrijblijvende offerte aan bij Arka. Binnen 24 uur ontvang je een persoonlijk voorstel op maat.",
  alternates: { canonical: "https://arkadigital.nl/offerte" },
  openGraph: {
    title: "Offerte aanvragen | Arka",
    description: "Vraag een vrijblijvende offerte aan bij Arka. Binnen 24 uur ontvang je een persoonlijk voorstel op maat.",
    url: "https://arkadigital.nl/offerte",
  },
  twitter: {
    title: "Offerte aanvragen | Arka",
    description: "Vraag een vrijblijvende offerte aan bij Arka. Binnen 24 uur ontvang je een persoonlijk voorstel op maat.",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Offerte", item: "https://arkadigital.nl/offerte" },
  ],
};

export default function OffertePage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <OffertePageContent />
    </div>
  );
}
