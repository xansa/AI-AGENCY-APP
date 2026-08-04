import { Metadata } from "next";
import { AiAssistentContent } from "./AiAssistentContent";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl";

const description =
  "Arka koppelt Claude AI aan je bestaande tools en bouwt een digitale assistent die je inbox sorteert, je agenda reviewt en elke ochtend een morning brief maakt. Eenmalig opgezet vanaf €1.500, daarna van jou.";

export const metadata: Metadata = {
  title: "AI Assistent Setup",
  description,
  alternates: {
    canonical: `${baseUrl}/ai-assistent`,
  },
  openGraph: {
    title: "AI Assistent Setup | Arka",
    description,
    url: `${baseUrl}/ai-assistent`,
  },
};

export default function AiAssistentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Assistent Setup",
    description,
    serviceType: "AI Assistent Setup",
    provider: {
      "@type": "ProfessionalService",
      "@id": "https://arkadigital.nl/#organization",
      name: "Arka",
      url: baseUrl,
    },
    url: `${baseUrl}/ai-assistent`,
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "1500",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "EUR",
        price: "1500",
        unitText: "eenmalig",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Assistent Setup",
        item: `${baseUrl}/ai-assistent`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AiAssistentContent />
    </>
  );
}
