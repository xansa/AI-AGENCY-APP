import { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { FAQContent } from "./FAQContent";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Antwoorden op veelgestelde vragen over onze diensten, contracten en resultaten.",
  alternates: { canonical: "https://arkadigital.nl/faq" },
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

export default function FAQPage() {
  return (
    <div className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FAQContent />
    </div>
  );
}
