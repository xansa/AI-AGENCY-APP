import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description:
    "Hoe Arka omgaat met jouw persoonsgegevens conform de AVG/GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24">
      <section className="bg-dark-950 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge
            variant="brand"
            className="bg-brand-900/50 text-brand-300 border-brand-700 mb-4"
          >
            Juridisch
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Privacybeleid
          </h1>
          <p className="text-dark-400 leading-relaxed">
            Laatst bijgewerkt: maart 2026
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 text-dark-700 leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                1. Wie zijn wij?
              </h2>
              <p className="text-sm">
                Arka is een eenmanszaak gevestigd in Dordrecht, Nederland.
                <br />
                E-mail: info@arkadigital.nl
                <br />
                Telefoon: +31 6 46410986
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
    </div>
  );
}
