import { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { FAQContent } from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Antwoorden op veelgestelde vragen over onze diensten, contracten en resultaten.",
  alternates: { canonical: "https://arkadigital.nl/faq" },
  openGraph: {
    title: "FAQ | Arka",
    description: "Antwoorden op veelgestelde vragen over onze diensten, contracten en resultaten.",
    url: "https://arkadigital.nl/faq",
  },
  twitter: {
    title: "FAQ | Arka",
    description: "Antwoorden op veelgestelde vragen over onze diensten, contracten en resultaten.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://arkadigital.nl" },
    { "@type": "ListItem", position: 2, name: "FAQ", item: "https://arkadigital.nl/faq" },
  ],
};

export default function FAQPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FAQContent />
    </div>
  );
}
