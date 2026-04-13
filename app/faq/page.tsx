import { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { FAQContent } from "./FAQContent";

export const metadata: Metadata = {
  title: "Veelgestelde vragen over websites, SEO en AI",
  description: "Antwoorden op veelgestelde vragen over websites laten maken, SEO, AI chatbots, prijzen en werkwijze. Alles wat je wilt weten over digitale diensten voor MKB.",
  alternates: { canonical: "https://arkadigital.nl/faq" },
  openGraph: {
    title: "Veelgestelde vragen | Arka",
    description: "Antwoorden op veelgestelde vragen over websites laten maken, SEO, AI chatbots, prijzen en werkwijze.",
    url: "https://arkadigital.nl/faq",
  },
  twitter: {
    title: "Veelgestelde vragen | Arka",
    description: "Antwoorden op veelgestelde vragen over websites, SEO en AI voor MKB.",
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <FAQContent />
    </>
  );
}
