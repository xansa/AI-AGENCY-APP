import { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Antwoorden op veelgestelde vragen over onze diensten, contracten en resultaten.",
  alternates: { canonical: "https://arkadigital.nl/faq" },
};

const categories = Array.from(new Set(faqItems.map((f) => f.category).filter(Boolean)));

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
      <section className="bg-dark-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            FAQ
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Veelgestelde vragen
          </h1>
          <p className="text-dark-400 leading-relaxed">
            Transparantie is een kernwaarde. Hier beantwoorden we de vragen die we het vaakst horen, ook de lastige.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const items = faqItems.filter((f) => f.category === cat);
            return (
              <div key={cat} className="mb-12">
                <h2 className="text-lg font-bold text-dark-900 mb-4 pb-2 border-b border-dark-100">
                  {cat}
                </h2>
                <Accordion items={items} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-16 bg-dark-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Staat je vraag er niet bij?</h2>
          <p className="text-dark-500 mb-8">Neem direct contact op. We beantwoorden alle vragen eerlijk en snel.</p>
          <Button href="/contact" size="lg">Stel je vraag</Button>
        </div>
      </section>
    </div>
  );
}
