"use client";

import { faqItems } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useTranslation, l } from "@/lib/i18n";

export function FAQContent() {
  const { t, locale } = useTranslation();

  const localizedItems = faqItems.map((item) => ({
    question: l(item, "question", locale),
    answer: l(item, "answer", locale),
    category: l(item, "category", locale),
  }));

  const categories = Array.from(new Set(localizedItems.map((f) => f.category).filter(Boolean)));

  return (
    <>
      <section className="bg-dark-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            {t("faq.label")}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("faq.heading")}
          </h1>
          <p className="text-dark-400 leading-relaxed">
            {t("faqPage.description")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.map((cat) => {
            const items = localizedItems.filter((f) => f.category === cat);
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
          <h2 className="text-2xl font-bold text-dark-900 mb-4">{t("faqPage.ctaHeading")}</h2>
          <p className="text-dark-500 mb-8">{t("faqPage.ctaDescription")}</p>
          <Button href="/contact" size="lg">{t("faqPage.ctaButton")}</Button>
        </div>
      </section>
    </>
  );
}
