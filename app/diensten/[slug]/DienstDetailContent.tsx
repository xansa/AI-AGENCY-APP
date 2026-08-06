"use client";

import type { Service } from "@/content/services";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslation, l, la } from "@/lib/i18n";
import { HeroAura } from "@/components/ui/HeroAura";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arka-/30min";

function RichText({ text }: { text: string }) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-slate-ink font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const CITY_LINKS: Record<string, { label: string; slug: string }[]> = {
  "websites-webshops": [
    { label: "Dordrecht", slug: "website-laten-maken-dordrecht" },
    { label: "Rotterdam", slug: "website-laten-maken-rotterdam" },
    { label: "Amsterdam", slug: "website-laten-maken-amsterdam" },
    { label: "Utrecht", slug: "website-laten-maken-utrecht" },
    { label: "Den Haag", slug: "website-laten-maken-den-haag" },
    { label: "Eindhoven", slug: "website-laten-maken-eindhoven" },
  ],
  "seo-content": [
    { label: "Dordrecht", slug: "seo-bureau-dordrecht" },
    { label: "Rotterdam", slug: "seo-rotterdam" },
    { label: "Amsterdam", slug: "seo-amsterdam" },
    { label: "Utrecht", slug: "seo-utrecht" },
    { label: "Den Haag", slug: "seo-den-haag" },
    { label: "Eindhoven", slug: "seo-eindhoven" },
  ],
  "ai-chatbots-automatisering": [
    { label: "Dordrecht", slug: "website-laten-maken-dordrecht" },
    { label: "Rotterdam", slug: "website-laten-maken-rotterdam" },
    { label: "Amsterdam", slug: "website-laten-maken-amsterdam" },
    { label: "Dordrecht SEO", slug: "seo-bureau-dordrecht" },
    { label: "Rotterdam SEO", slug: "seo-rotterdam" },
    { label: "Amsterdam SEO", slug: "seo-amsterdam" },
  ],
  "dashboards-data": [
    { label: "Dordrecht", slug: "website-laten-maken-dordrecht" },
    { label: "Rotterdam", slug: "website-laten-maken-rotterdam" },
    { label: "Amsterdam", slug: "website-laten-maken-amsterdam" },
    { label: "Dordrecht SEO", slug: "seo-bureau-dordrecht" },
    { label: "Rotterdam SEO", slug: "seo-rotterdam" },
    { label: "Amsterdam SEO", slug: "seo-amsterdam" },
  ],
  "lead-generation": [
    { label: "Dordrecht", slug: "website-laten-maken-dordrecht" },
    { label: "Rotterdam", slug: "website-laten-maken-rotterdam" },
    { label: "Amsterdam", slug: "website-laten-maken-amsterdam" },
    { label: "Dordrecht SEO", slug: "seo-bureau-dordrecht" },
    { label: "Rotterdam SEO", slug: "seo-rotterdam" },
    { label: "Amsterdam SEO", slug: "seo-amsterdam" },
  ],
  "branding-design": [
    { label: "Dordrecht", slug: "website-laten-maken-dordrecht" },
    { label: "Rotterdam", slug: "website-laten-maken-rotterdam" },
    { label: "Amsterdam", slug: "website-laten-maken-amsterdam" },
    { label: "Dordrecht SEO", slug: "seo-bureau-dordrecht" },
    { label: "Rotterdam SEO", slug: "seo-rotterdam" },
    { label: "Amsterdam SEO", slug: "seo-amsterdam" },
  ],
};

export function DienstDetailContent({ service }: { service: Service }) {
  const { t, locale } = useTranslation();
  const cityLinks = CITY_LINKS[service.slug] ?? [];

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-16 md:pt-24 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <HeroAura />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-slate-muted hover:text-slate-ink text-[13px] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("dienstDetail.terug")}
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-7 min-w-0">
              <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
                <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                {l(service, "title", locale)}
              </p>
              <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] text-balance">
                {l(service, "tagline", locale)}
              </h1>
              <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-xl text-pretty">
                {l(service, "description", locale)}
              </p>
            </div>
            <div className="lg:col-span-5 relative order-first lg:order-last">
              <div className="relative mx-auto w-full max-w-[360px] lg:max-w-[420px] aspect-square">
                <Image
                  src={`/illustrations/${service.slug}.png`}
                  alt={l(service, "title", locale)}
                  fill
                  sizes="(max-width: 1024px) 360px, 420px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Long description + deliverables grid */}
      <section className="relative bg-cream py-16 md:py-20">
        <div className="max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 min-w-0">
              {service.longDescription && (
                <div className="mb-14 max-w-2xl prose-editorial">
                  {l(service, "longDescription", locale)
                    .split("\n\n")
                    .map((paragraph, i) => {
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return (
                          <h3
                            key={i}
                            className="font-serif text-[1.5rem] md:text-[1.75rem] leading-tight font-medium text-slate-ink mt-10 mb-4 tracking-tight"
                          >
                            {paragraph.replace(/\*\*/g, "")}
                          </h3>
                        );
                      }
                      if (paragraph.startsWith("- ")) {
                        return (
                          <ul key={i} className="space-y-2 my-5">
                            {paragraph.split("\n").map((line, j) => (
                              <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-slate-muted">
                                <span className="text-arka mt-2 text-[8px] flex-shrink-0">▸</span>
                                <RichText text={line.replace(/^- /, "")} />
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p
                          key={i}
                          className="text-[15.5px] leading-[1.75] text-slate-muted mb-5 text-pretty"
                        >
                          <RichText text={paragraph} />
                        </p>
                      );
                    })}
                </div>
              )}

              <div className="mb-14">
                <p className="text-overline uppercase text-slate-meta font-semibold mb-5">
                  <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                  {t("dienstDetail.watJeKrijgt")}
                </p>
                <ul className="space-y-3">
                  {la(service, "deliverables", locale).map((d, i) => (
                    <li key={i} className="flex items-start gap-3 min-w-0">
                      <Check
                        className="w-4 h-4 text-arka flex-shrink-0 mt-1"
                        strokeWidth={2.25}
                      />
                      <span className="text-[15px] leading-relaxed text-slate-ink/85 break-words">
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-overline uppercase text-slate-meta font-semibold mb-5">
                  <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                  {t("dienstDetail.watJeKuntVerwachten")}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {la(service, "results", locale).map((r, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl ring-1 ring-slate-950/8 bg-cream-deep min-w-0"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-[1.1rem] font-medium text-arka leading-none mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[14px] leading-snug text-slate-ink/85 break-words">
                          {r}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {cityLinks.length > 0 && (
                <div className="mt-14 pt-10 border-t border-slate-950/8">
                  <p className="text-overline uppercase text-slate-meta font-semibold mb-4">
                    <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
                    Beschikbaar in heel Nederland
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cityLinks.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/${city.slug}`}
                        className="inline-flex items-center px-3.5 py-1.5 rounded-full ring-1 ring-slate-950/12 bg-cream-deep text-[12.5px] text-slate-muted hover:text-slate-ink hover:ring-slate-950/20 transition-colors"
                      >
                        {city.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:col-span-4 min-w-0">
              <div className="lg:sticky lg:top-28 space-y-4">
                <div className="p-7 rounded-2xl ring-1 ring-slate-950/8 bg-cream-deep">
                  <p className="text-overline uppercase text-slate-meta font-semibold mb-4">
                    {t("dienstDetail.voorWie")}
                  </p>
                  <p className="text-[14px] leading-relaxed text-slate-muted text-pretty">
                    {l(service, "forWho", locale)}
                  </p>
                </div>

                <div className="p-7 rounded-2xl bg-ink text-cream">
                  <h3 className="font-serif text-[1.35rem] font-medium mb-3 tracking-tight">
                    {t("dienstDetail.interesse")}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-cream/65 mb-4 text-pretty">
                    {t("dienstDetail.interesseDesc")}
                  </p>
                  <p className="text-[12px] leading-relaxed text-cream/45 mb-6">
                    {t("dienstDetail.losOfPakket")}
                  </p>
                  <div className="space-y-2">
                    <Link
                      href="/offerte"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full bg-arka text-white text-[13px] font-semibold hover:bg-arka-hover transition-colors"
                    >
                      {t("packages.offerteAanvragen")}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-full bg-transparent text-cream ring-1 ring-cream/20 text-[13px] font-semibold hover:bg-cream/5 transition-colors"
                    >
                      {t("dienstDetail.planIntake")}
                    </a>
                  </div>
                </div>

                {service.slug === "ai-chatbots-automatisering" && (
                  <Link
                    href="/ai-assistent"
                    className="group block p-7 rounded-2xl ring-1 ring-arka/25 bg-arka/[0.06] hover:bg-arka/[0.1] transition-colors"
                  >
                    <p className="text-overline uppercase text-arka font-semibold mb-3">
                      {locale === "en" ? "Also from Arka" : "Ook van Arka"}
                    </p>
                    <h3 className="font-serif text-[1.35rem] font-medium text-slate-ink mb-2 tracking-tight">
                      AI Assistent Setup
                    </h3>
                    <p className="text-[13.5px] leading-relaxed text-slate-muted text-pretty mb-4">
                      {locale === "en"
                        ? "Your own digital assistant connected to your tools: morning brief, inbox drafts and calendar review. Set up once, then yours."
                        : "Je eigen digitale assistent gekoppeld aan je tools: morning brief, inbox-drafts en agenda-review. Eenmalig opgezet, daarna van jou."}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-arka">
                      {locale === "en" ? "Discover" : "Ontdek de dienst"}
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Link>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
