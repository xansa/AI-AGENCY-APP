import { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "De algemene voorwaarden van Arka voor onze digitale dienstverlening.",
};

export default function AlgemeneVoorwaardenPage() {
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
            Algemene Voorwaarden
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
                Artikel 1: Definities
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>Arka:</strong> de eenmanszaak Arka, gevestigd te
                  Dordrecht, Nederland.
                </li>
                <li>
                  <strong>Opdrachtgever:</strong> de natuurlijke of
                  rechtspersoon die een overeenkomst aangaat met Arka.
                </li>
                <li>
                  <strong>Diensten:</strong> alle werkzaamheden die Arka
                  verricht, waaronder maar niet beperkt tot webdesign,
                  development, SEO, content creatie, AI-integraties, dashboards,
                  lead generation en branding.
                </li>
                <li>
                  <strong>Overeenkomst:</strong> elke afspraak tussen Arka en
                  opdrachtgever tot het leveren van diensten.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 2: Toepasselijkheid
              </h2>
              <p className="text-sm">
                Deze voorwaarden zijn van toepassing op alle offertes,
                overeenkomsten en leveringen van Arka. Afwijkingen zijn alleen
                geldig indien schriftelijk overeengekomen. De toepasselijkheid
                van eventuele inkoop- of andere voorwaarden van de opdrachtgever
                wordt uitdrukkelijk van de hand gewezen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 3: Offertes en overeenkomsten
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  Alle offertes zijn vrijblijvend en 30 dagen geldig, tenzij
                  anders vermeld.
                </li>
                <li>
                  Een overeenkomst komt tot stand na schriftelijke (of digitale)
                  bevestiging door beide partijen.
                </li>
                <li>
                  Aanvullende afspraken of wijzigingen zijn alleen bindend indien
                  schriftelijk bevestigd.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 4: Prijzen en betaling
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  Alle genoemde prijzen zijn exclusief BTW, tenzij anders
                  vermeld.
                </li>
                <li>
                  Eenmalige kosten worden gefactureerd bij oplevering of volgens
                  de overeengekomen betalingsregeling (bijv. 50% bij start, 50%
                  bij oplevering).
                </li>
                <li>
                  Maandelijkse kosten worden vooraf gefactureerd per
                  kalendermaand.
                </li>
                <li>Betalingstermijn is 14 dagen na factuurdatum.</li>
                <li>
                  Bij niet-tijdige betaling behoudt Arka het recht om
                  werkzaamheden op te schorten en wettelijke rente in rekening te
                  brengen.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 5: Uitvoering van werkzaamheden
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  Arka voert werkzaamheden uit naar beste inzicht en vermogen,
                  conform de eisen van goed vakmanschap.
                </li>
                <li>
                  Genoemde termijnen zijn indicatief en geen fatale deadlines,
                  tenzij uitdrukkelijk anders overeengekomen.
                </li>
                <li>
                  De opdrachtgever zorgt ervoor dat alle benodigde informatie,
                  materialen en toegang tijdig beschikbaar zijn.
                </li>
                <li>
                  Arka mag derden inschakelen voor de uitvoering van
                  werkzaamheden.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 6: Intellectueel eigendom
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  Na volledige betaling worden alle rechten op de geleverde
                  producten (websites, designs, content, code) overgedragen aan
                  de opdrachtgever.
                </li>
                <li>
                  Arka behoudt het recht om het geleverde werk te gebruiken voor
                  eigen promotie en portfolio, tenzij anders overeengekomen.
                </li>
                <li>
                  Open source componenten en licenties van derden blijven
                  onderworpen aan hun respectievelijke licentievoorwaarden.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 7: Aansprakelijkheid
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  Arka is uitsluitend aansprakelijk voor directe schade die het
                  gevolg is van een aantoonbare tekortkoming.
                </li>
                <li>
                  De aansprakelijkheid is beperkt tot het bedrag dat in de 3
                  maanden voorafgaand aan de schade is gefactureerd.
                </li>
                <li>
                  Arka is niet aansprakelijk voor indirecte schade,
                  gevolgschade, gederfde winst of gemiste besparingen.
                </li>
                <li>
                  Arka is niet aansprakelijk voor schade veroorzaakt door
                  derden, waaronder hostingproviders, API-aanbieders of
                  softwareleveranciers.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 8: Opzegging
              </h2>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>
                  <strong>Starter &amp; Professional:</strong> minimale looptijd
                  van 3 maanden, daarna maandelijks opzegbaar met 1 maand
                  opzegtermijn.
                </li>
                <li>
                  <strong>Enterprise:</strong> minimale looptijd van 6 maanden,
                  daarna per kwartaal opzegbaar met 1 maand opzegtermijn.
                </li>
                <li>
                  Bij tussentijdse opzegging zijn de kosten tot het einde van de
                  minimale looptijd verschuldigd.
                </li>
                <li>
                  Na beëindiging worden alle materialen, toegangen en data
                  overgedragen aan de opdrachtgever.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 9: Overmacht
              </h2>
              <p className="text-sm">
                In geval van overmacht (waaronder storingen bij derden,
                internetuitval, ziekte of andere onvoorziene omstandigheden) is
                Arka niet gehouden tot nakoming van haar verplichtingen. Bij
                langdurige overmacht (langer dan 60 dagen) hebben beide partijen
                het recht de overeenkomst te ontbinden.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-dark-900 mb-3">
                Artikel 10: Toepasselijk recht
              </h2>
              <p className="text-sm">
                Op alle overeenkomsten tussen Arka en de opdrachtgever is
                Nederlands recht van toepassing. Geschillen worden voorgelegd aan
                de bevoegde rechter in het arrondissement Rotterdam.
              </p>
            </div>

            <div className="p-6 bg-dark-50 rounded-2xl">
              <p className="text-sm text-dark-500">
                Vragen over deze voorwaarden? Neem contact op via{" "}
                <a
                  href="mailto:info@arkadigital.nl"
                  className="text-brand-600 hover:underline"
                >
                  info@arkadigital.nl
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
