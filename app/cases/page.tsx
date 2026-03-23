import { Metadata } from "next";
import { cases } from "@/content/cases";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cases",
  description: "Bekijk onze case studies: concrete resultaten voor onze klanten.",
};

export default function CasesPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            Cases
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 max-w-2xl">
            Resultaten die we samen bereikten
          </h1>
          <p className="text-dark-400 max-w-xl leading-relaxed">
            Geen verzonnen succesverhalen. Realistische metrics, eerlijke context, en wat we ervan geleerd hebben.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <p className="text-sm text-dark-400 italic text-center -mt-2 mb-4">
            De onderstaande cases zijn representatieve voorbeelden die onze aanpak en mogelijke resultaten illustreren.
          </p>
          {cases.map((c) => (
            <div key={c.slug} className="rounded-2xl border border-dark-100 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="default">{c.industry}</Badge>
                    <Badge variant="brand">{c.package}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold text-dark-900 mb-2">{c.client}</h2>
                  <p className="text-dark-500 text-sm mb-6 leading-relaxed">{c.challenge}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {c.results.map((r, i) => (
                      <div key={i} className="text-center p-4 bg-brand-50 rounded-xl">
                        <div className="text-2xl font-bold text-brand-600">{r.value}</div>
                        <div className="text-xs text-dark-600 font-medium mt-0.5">{r.metric}</div>
                        <div className="text-xs text-dark-400 mt-1">{r.description}</div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="border-l-2 border-brand-300 pl-4 italic text-dark-600">
                    &ldquo;{c.testimonial.quote}&rdquo;
                    <footer className="text-sm text-dark-400 mt-2 not-italic">
                      — {c.testimonial.author}, {c.testimonial.role}
                    </footer>
                  </blockquote>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-dark-50 rounded-xl">
                    <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-2">Aanpak</p>
                    <p className="text-dark-700 text-sm leading-relaxed">{c.approach}</p>
                  </div>
                  <div className="p-4 bg-dark-50 rounded-xl flex justify-between">
                    <div>
                      <p className="text-xs text-dark-500">Looptijd</p>
                      <p className="font-semibold text-dark-900 text-sm">{c.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dark-500">Package</p>
                      <p className="font-semibold text-dark-900 text-sm">{c.package}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-dark-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Wil je ook zulke resultaten?</h2>
          <p className="text-dark-500 mb-8">Plan een gratis intake gesprek en ontdek wat mogelijk is voor jouw bedrijf.</p>
          <Button href="/offerte" size="lg">Offerte aanvragen <ArrowRight className="w-4 h-4" /></Button>
        </div>
      </section>
    </div>
  );
}
