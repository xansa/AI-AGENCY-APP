import { Metadata } from "next";
import { services } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { notFound } from "next/navigation";
import { Check, ArrowLeft } from "lucide-react";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default function DienstDetailPage({ params }: Props) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/diensten" className="inline-flex items-center gap-2 text-dark-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Terug naar diensten
          </a>
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4 mt-4">
            {service.title}
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            {service.tagline}
          </h1>
          <p className="text-dark-400 max-w-2xl leading-relaxed">{service.description}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-dark-900 mb-6">Wat je krijgt</h2>
                <ul className="space-y-3">
                  {service.deliverables.map((d, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span className="text-dark-700">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-dark-900 mb-6">Wat je kunt verwachten</h2>
                <ul className="space-y-3">
                  {service.results.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-brand-50 rounded-xl">
                      <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 flex-shrink-0" />
                      <span className="text-dark-700">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-dark-100 bg-dark-50">
                <h3 className="font-bold text-dark-900 mb-3">Voor wie?</h3>
                <p className="text-dark-600 text-sm leading-relaxed">{service.forWho}</p>
              </div>

              <div className="p-6 rounded-2xl bg-brand-600 text-white">
                <h3 className="font-bold mb-3">Interesse?</h3>
                <p className="text-brand-200 text-sm mb-6">Vraag een offerte aan of plan een intake gesprek.</p>
                <div className="space-y-3">
                  <Button href="/offerte" size="sm" className="w-full bg-white text-brand-700 hover:bg-brand-50 border-white">
                    Offerte aanvragen
                  </Button>
                  <Button
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min"}
                    external
                    size="sm"
                    variant="outline"
                    className="w-full border-white/40 text-white hover:bg-white/10"
                  >
                    Plan intake
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
