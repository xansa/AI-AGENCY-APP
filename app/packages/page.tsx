import { Metadata } from "next";
import { packages } from "@/content/packages";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Check, Calendar, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Packages",
  description: "Bekijk onze 3 combipackages: Foundation, Growth en Scale. Vaste scope, transparante investering.",
};

export default function PackagesPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            Combipackages
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Transparante pakketten.<br />Duidelijke afspraken.
          </h1>
          <p className="text-dark-400 max-w-xl mx-auto leading-relaxed">
            Vaste scope, eerlijke investering en meetbare KPI&apos;s. Geen verborgen kosten, geen ellenlange offertetrajecten.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                id={pkg.id}
                className={`rounded-2xl border p-8 flex flex-col relative ${
                  pkg.highlighted
                    ? "border-brand-500 shadow-xl shadow-brand-100"
                    : "border-dark-200"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge variant="brand">Meest gekozen</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-dark-900">{pkg.name}</h2>
                  <p className="text-dark-500 text-sm mt-1">{pkg.tagline}</p>
                  <div className="mt-4 text-xl font-bold text-brand-600">{pkg.investment}</div>
                </div>

                {/* For who */}
                <div className="p-4 bg-dark-50 rounded-xl mb-6">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-1">Voor wie</p>
                  <p className="text-dark-700 text-sm">{pkg.forWho}</p>
                </div>

                {/* Deliverables */}
                <div className="mb-6 flex-1">
                  <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">Deliverables</p>
                  <ul className="space-y-2">
                    {pkg.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-dark-700">
                        <Check className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* KPIs */}
                <div className="p-4 bg-brand-50 rounded-xl mb-6">
                  <p className="text-xs font-semibold text-brand-700 uppercase tracking-wider mb-2">KPI&apos;s die wij rapporteren</p>
                  <ul className="space-y-1">
                    {pkg.kpis.map((kpi, i) => (
                      <li key={i} className="text-sm text-brand-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        {kpi}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration */}
                <p className="text-xs text-dark-400 mb-6">{pkg.duration}</p>

                {/* CTAs */}
                <div className="space-y-3">
                  <Button
                    href="/offerte"
                    size="md"
                    variant={pkg.highlighted ? "primary" : "outline"}
                    className="w-full"
                  >
                    <FileText className="w-4 h-4" />
                    Offerte aanvragen
                  </Button>
                  <Button
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arka/intake"}
                    external
                    size="md"
                    variant="ghost"
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4" />
                    Plan intake gesprek
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
