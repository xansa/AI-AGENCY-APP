import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe Arka omgaat met jouw persoonsgegevens conform de AVG/GDPR.",
  alternates: { canonical: "https://arkadigital.nl/privacy" },
  openGraph: {
    title: "Privacybeleid | Arka",
    description: "Hoe Arka omgaat met jouw persoonsgegevens conform de AVG/GDPR.",
    url: "https://arkadigital.nl/privacy",
  },
  twitter: {
    title: "Privacybeleid | Arka",
    description: "Hoe Arka omgaat met jouw persoonsgegevens conform de AVG/GDPR.",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-cream pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="absolute inset-x-0 top-0 h-80 canvas-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-content mx-auto px-6 sm:px-8 lg:px-10">
          <p className="text-overline uppercase text-slate-meta font-semibold mb-8">
            <span className="inline-block w-6 border-t border-slate-meta/60 mr-3 align-middle" />
            Juridisch
          </p>
          <h1 className="font-serif font-medium text-display-sm text-slate-ink tracking-tight leading-[1.05] text-balance">
            Privacybeleid
          </h1>
          <p className="mt-6 text-[14px] text-slate-meta">
            Laatst bijgewerkt: maart 2026
          </p>
        </div>
      </section>

      <section className="relative bg-cream py-16 md:py-20">
        <div className="max-w-narrow mx-auto px-6 sm:px-8 lg:px-10">
          <div className="space-y-10 text-slate-muted leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                1. Wie zijn wij?
              </h2>
              <p className="text-sm">
                Arka is een eenmanszaak gevestigd in Dordrecht, Nederland.
                <br />
                E-mail: info@arkadigital.nl
                <br />
                Telefoon: +31 6 46140986
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                2. Welke gegevens verzamelen wij?
              </h2>
              <p className="text-sm mb-3">
                Wij verzamelen persoonsgegevens wanneer je:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>Contactformulier invult:</strong> naam, e-mailadres,
                  bedrijfsnaam, telefoonnummer (optioneel), bericht
                </li>
                <li>
                  <strong>Offerte aanvraagt:</strong> naam, bedrijfsnaam, rol,
                  e-mailadres, telefoonnummer, website (optioneel), branche,
                  situatie, doel, budget, tijdlijn
                </li>
                <li>
                  <strong>Chatbot gebruikt:</strong> de berichten die je stuurt
                  in de chat, en een sessie-ID
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                3. Waarvoor gebruiken wij jouw gegevens?
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  Om contact met je op te nemen naar aanleiding van je aanvraag
                </li>
                <li>Om een passende offerte op te stellen</li>
                <li>
                  Om de chatbot te laten functioneren en antwoorden te verbeteren
                </li>
                <li>Om onze dienstverlening te verbeteren</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                4. Verwerkers en derde partijen
              </h2>
              <p className="text-sm mb-3">
                Wij maken gebruik van de volgende diensten voor de verwerking van
                gegevens:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>Supabase</strong> (database): opslag van
                  contactformulier-inzendingen en chatgesprekken
                </li>
                <li>
                  <strong>Resend</strong> (e-mail): verzending van
                  bevestigingsmails en notificaties
                </li>
                <li>
                  <strong>Anthropic (Claude AI)</strong>: verwerking van
                  chatberichten voor het genereren van antwoorden. Berichten
                  worden niet opgeslagen door Anthropic voor trainingsdoeleinden.
                </li>
                <li>
                  <strong>Vercel</strong> (hosting): hosting van de website en
                  verwerking van serververzoeken
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                5. Bewaartermijn
              </h2>
              <p className="text-sm">
                Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor
                het doel waarvoor ze zijn verzameld. Contactgegevens en
                offerteaanvragen worden maximaal 12 maanden bewaard.
                Chatgesprekken worden maximaal 6 maanden bewaard.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                6. Jouw rechten
              </h2>
              <p className="text-sm mb-3">
                Op grond van de AVG heb je de volgende rechten:
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>Recht op inzage</strong>: je mag opvragen welke
                  gegevens wij van je hebben
                </li>
                <li>
                  <strong>Recht op correctie</strong>: je mag onjuiste gegevens
                  laten aanpassen
                </li>
                <li>
                  <strong>Recht op verwijdering</strong>: je mag vragen om
                  verwijdering van je gegevens
                </li>
                <li>
                  <strong>Recht op beperking</strong>: je mag vragen de
                  verwerking te beperken
                </li>
                <li>
                  <strong>Recht op overdraagbaarheid</strong>: je mag je
                  gegevens in een leesbaar formaat opvragen
                </li>
              </ul>
              <p className="text-sm mt-3">
                Voor het uitoefenen van deze rechten kun je contact opnemen via{" "}
                <a
                  href="mailto:info@arkadigital.nl"
                  className="text-brand-600 hover:underline"
                >
                  info@arkadigital.nl
                </a>
                . We reageren binnen 30 dagen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                7. Cookies
              </h2>
              <p className="text-sm">
                Deze website maakt gebruik van functionele cookies die
                noodzakelijk zijn voor de werking van de site. We gebruiken
                Vercel Analytics voor anonieme bezoekstatistieken. Dit plaatst
                geen tracking cookies en verzamelt geen persoonsgegevens.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                8. Beveiliging
              </h2>
              <p className="text-sm">
                Wij nemen passende technische en organisatorische maatregelen om
                jouw gegevens te beschermen tegen ongeoorloofde toegang, verlies
                of misbruik. De website maakt gebruik van SSL-encryptie en alle
                data wordt veilig opgeslagen bij onze verwerkers.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                9. Klachten
              </h2>
              <p className="text-sm">
                Heb je een klacht over de verwerking van jouw persoonsgegevens?
                Neem dan contact met ons op. Je hebt ook het recht om een klacht
                in te dienen bij de Autoriteit Persoonsgegevens
                (autoriteitpersoonsgegevens.nl).
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
