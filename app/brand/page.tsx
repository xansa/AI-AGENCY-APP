import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Assets",
  description: "Arka brand assets: logo, kleuren, en richtlijnen.",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "Brand Blue", hex: "#2563EB", css: "brand-600", usage: "Primaire kleur, CTA's, accenten" },
  { name: "Brand Blue Light", hex: "#3B82F6", css: "brand-500", usage: "Hover states, secundaire accenten" },
  { name: "Dark Navy", hex: "#0F172A", css: "dark-900", usage: "Achtergronden, tekst op licht" },
  { name: "Surface", hex: "#1E293B", css: "dark-800", usage: "Kaarten, secties op donker" },
  { name: "Text Muted", hex: "#94A3B8", css: "dark-400", usage: "Subtekst, labels" },
  { name: "White", hex: "#F8FAFC", css: "dark-50", usage: "Tekst op donker, lichte achtergrond" },
];

const assets = [
  { name: "Logo Icon (donker)", file: "/brand/logo-icon-dark.svg", desc: "Blauw icoon op transparant - voor donkere achtergronden" },
  { name: "Logo Icon (licht)", file: "/brand/logo-icon-light.svg", desc: "Blauw icoon op navy - voor lichte achtergronden" },
  { name: "Logo Icon (wit)", file: "/brand/logo-icon-white.svg", desc: "Blauw icoon op wit - voor profielfoto's" },
  { name: "Logo Volledig (donker)", file: "/brand/logo-full-dark.svg", desc: "Icoon + tekst - voor donkere achtergronden" },
  { name: "Logo Volledig (licht)", file: "/brand/logo-full-light.svg", desc: "Icoon + tekst - voor lichte achtergronden" },
  { name: "Profielfoto (vierkant)", file: "/brand/profile-square.svg", desc: "Vierkant logo - voor Calendly, HubSpot, social media" },
  { name: "Cover / Banner", file: "/brand/cover-dark.svg", desc: "Breed banner formaat - voor LinkedIn, email headers" },
];

export default function BrandPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-4">Brand Assets</h1>
          <p className="text-dark-400">Arka huisstijl, logo&apos;s en kleurenpalet. Klik op een asset om te downloaden.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-dark-900 mb-8">Kleuren</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {colors.map((c) => (
              <div key={c.hex} className="rounded-xl border border-dark-100 overflow-hidden">
                <div className="h-20" style={{ backgroundColor: c.hex }} />
                <div className="p-4">
                  <p className="font-bold text-dark-900 text-sm">{c.name}</p>
                  <p className="text-dark-500 text-xs font-mono">{c.hex}</p>
                  <p className="text-dark-400 text-xs mt-1">{c.usage}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-dark-900 mb-8">Logo&apos;s &amp; Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assets.map((a) => {
              const pngFile = a.file.replace(".svg", ".png");
              return (
                <div
                  key={a.file}
                  className="rounded-xl border border-dark-100 overflow-hidden"
                >
                  <div className="h-40 bg-dark-950 flex items-center justify-center p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.file} alt={a.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-dark-900 text-sm">{a.name}</p>
                    <p className="text-dark-400 text-xs mb-3">{a.desc}</p>
                    <div className="flex gap-2">
                      <a href={a.file} download className="px-3 py-1 text-xs font-medium bg-dark-100 text-dark-700 rounded-lg hover:bg-dark-200 transition-colors">SVG</a>
                      <a href={pngFile} download className="px-3 py-1 text-xs font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">PNG</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 p-8 bg-dark-50 rounded-2xl">
            <h2 className="text-xl font-bold text-dark-900 mb-4">Richtlijnen</h2>
            <div className="space-y-3 text-dark-600 text-sm">
              <p><strong>Typografie:</strong> Inter (Google Fonts) - body en headings</p>
              <p><strong>Iconen:</strong> Lucide React - consistent lijngewicht, 24px standaard</p>
              <p><strong>Afronding:</strong> Knoppen en kaarten gebruiken rounded-xl (12px) of rounded-2xl (16px)</p>
              <p><strong>Toon:</strong> Professioneel maar toegankelijk. Geen jargon, wel helder.</p>
              <p><strong>Taal:</strong> Alle UI-tekst in het Nederlands</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
