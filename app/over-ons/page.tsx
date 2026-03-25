import { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Leer meer over Arka, jouw digitale afdeling in Dordrecht. Eén aanspreekpunt voor al je digitale behoeften.",
};

const principles = [
  { title: "Direct contact, geen tussenpersonen", description: "Je werkt altijd rechtstreeks met dezelfde persoon. Geen accountmanager die doorschakelt, gewoon korte lijnen." },
  { title: "Breed inzetbaar, scherp in uitvoering", description: "Van website tot AI chatbot, van SEO tot dashboard. Eén partner die alles overziet en niets laat vallen." },
  { title: "Resultaat boven activiteit", description: "We meten wat telt: verkeer, conversie, tijdsbesparing. Geen rapportages over ijdelheidsmetrics." },
  { title: "Jij bent eigenaar", description: "Alle content, code en systemen zijn van jou. Geen vendor lock-in, nooit." },
  { title: "Eerlijk en transparant", description: "Past iets niet? Dan zeggen we dat. Liever een eerlijk advies dan een factuur die niet klopt." },
];

export default function OverOnsPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="brand" className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4">
            Over Arka
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl">
            Jouw digitale afdeling, zonder de overhead
          </h1>
          <p className="text-dark-400 max-w-2xl leading-relaxed text-lg">
            Arka is een solo digitaal bureau uit Dordrecht. Geen groot kantoor, geen overhead, wel brede expertise en persoonlijke aandacht. Van website tot AI, van branding tot data: alles onder één dak.
          </p>
        </div>
      </section>

      <section className="py-16 bg-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative mx-auto w-72 h-72 lg:w-80 lg:h-80">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/founder.png"
                  alt="Kaan, oprichter van Arka"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 288px, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-950/40" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Hey, ik ben Kaan</h2>
              <div className="space-y-4 text-dark-400 leading-relaxed">
                <p>
                  Oprichter van Arka en jouw directe aanspreekpunt. Geen salesteam, geen projectmanagers, gewoon ik.
                </p>
                <p>
                  Ik combineer design, development, AI en marketing zodat jij niet met vijf verschillende bureaus hoeft te werken. Korte lijnen, snelle resultaten.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-dark-900 mb-4">Waarom Arka?</h2>
              <div className="space-y-4 text-dark-600 leading-relaxed">
                <p>
                  De meeste bedrijven hebben geen heel marketingteam nodig. Ze hebben iemand nodig die het hele plaatje overziet en het gewoon regelt. Dat is Arka. Eén persoon, breed inzetbaar, met de tools en kennis om snel te schakelen.
                </p>
                <p>
                  Of je nu een professionele website nodig hebt, beter gevonden wilt worden op Google, processen wilt automatiseren met AI, of grip wilt op je data: bij Arka heb je één aanspreekpunt voor alles.
                </p>
                <p>
                  Geen eindeloze vergaderingen, geen opgeblazen offertes. Gewoon helder advies, snelle uitvoering en eerlijke communicatie.
                </p>
              </div>
            </div>

            <div className="p-8 bg-dark-50 rounded-2xl">
              <h3 className="font-bold text-dark-900 mb-6">Hoe Arka werkt</h3>
              <div className="space-y-4 text-sm text-dark-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 font-bold text-xs">1</span>
                  </div>
                  <p><strong className="text-dark-900">Eén aanspreekpunt</strong> · Je werkt direct met mij. Geen tussenlagen, geen miscommunicatie.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 font-bold text-xs">2</span>
                  </div>
                  <p><strong className="text-dark-900">Brede expertise</strong> · Websites, SEO, AI, data, design: ik combineer disciplines waar andere bureaus aparte teams voor inzetten.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-brand-600 font-bold text-xs">3</span>
                  </div>
                  <p><strong className="text-dark-900">Slimme tooling</strong> · AI en automatisering zijn geen buzzwords, maar dagelijkse werktuigen die mij sneller en scherper maken.</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-dark-900 mb-8">Mijn principes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div key={i} className="p-6 rounded-2xl border border-dark-100">
                <Check className="w-5 h-5 text-brand-500 mb-3" />
                <h3 className="font-bold text-dark-900 mb-2">{p.title}</h3>
                <p className="text-dark-500 text-sm">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Klaar om kennis te maken?</h2>
          <p className="text-brand-200 mb-8">Plan een vrijblijvend kennismakingsgesprek van 30 minuten.</p>
          <Button
            href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/arkaecom-proton/30min"}
            external
            size="lg"
            className="bg-white text-brand-700 hover:bg-brand-50 border-white"
          >
            Gesprek plannen
          </Button>
        </div>
      </section>
    </div>
  );
}
