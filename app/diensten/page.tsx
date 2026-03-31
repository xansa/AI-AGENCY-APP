import { Metadata } from "next";
import { DienstenContent } from "./DienstenContent";

export const metadata: Metadata = {
  title: "Diensten",
  description: "Ontdek onze digitale diensten: van websites en SEO tot AI chatbots, dashboards, lead generation en branding.",
  alternates: { canonical: "https://arkadigital.nl/diensten" },
  openGraph: {
    title: "Diensten | Arka",
    description: "Ontdek onze digitale diensten: van websites en SEO tot AI chatbots, dashboards, lead generation en branding.",
    url: "https://arkadigital.nl/diensten",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "Diensten", item: "https://arkadigital.nl/diensten" },
  ],
};

export default function DienstenPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <DienstenContent />
    </div>
  );
}
