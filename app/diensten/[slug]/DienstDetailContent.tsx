"use client";

import type { Service } from "@/content/services";
import Link from "next/link";
import { Check, ArrowLeft, ArrowUpRight } from "lucide-react";
import { useTranslation, l, la } from "@/lib/i18n";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min";

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

export function DienstDetailContent({ service }: { service: Service }) {
  const { t, locale } = useTranslation();

  return (
    <>
      {/* Editorial hero */}
      <section className="relative bg-cream pt-16 md:pt-24 pb-16 md:pb-20">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <Link
            href="/diensten"
            className="inline-flex items-center gap-2 text-slate-muted hover:text-slate-ink text-[13px] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("dienstDetail.terug")}
          </Link>
          <p className="text-overline uppercase text-slate-meta font-semibold mb-6">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            {l(service, "title", locale)}
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] max-w-4xl text-balance">
            {l(service, "tagline", locale)}
          </h1>
          <p className="mt-8 text-[17px] md:text-lg text-slate-muted leading-relaxed max-w-2xl text-pretty">
            {l(service, "description", locale)}
          </p>
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
                  <p className="text-[13.5px] leading-relaxed text-cream/65 mb-6 text-pretty">
                    {t("dienstDetail.interesseDesc")}
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
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
