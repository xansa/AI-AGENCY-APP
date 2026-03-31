import { Metadata } from "next";
import { OverOnsContent } from "./OverOnsContent";

export const metadata: Metadata = {
  title: "Over ons",
  description: "Leer meer over Arka, jouw digitale afdeling in Dordrecht. Eén aanspreekpunt voor al je digitale behoeften.",
  alternates: { canonical: "https://arkadigital.nl/over-ons" },
};

export default function OverOnsPage() {
  return (
    <div className="pt-24">
      <OverOnsContent />
    </div>
  );
}
