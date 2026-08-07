import { Metadata } from "next";
import { HeroV2 } from "@/components/sections/v2/HeroV2";
import { ProofStripV2 } from "@/components/sections/v2/ProofStripV2";
import { DienstenV2 } from "@/components/sections/v2/DienstenV2";
import { WerkwijzeV2 } from "@/components/sections/v2/WerkwijzeV2";
import { CasesV2 } from "@/components/sections/v2/CasesV2";
import { FounderV2 } from "@/components/sections/v2/FounderV2";
import { PackagesShowcaseV2 } from "@/components/sections/v2/PackagesShowcaseV2";
import { ClosingCTAV2 } from "@/components/sections/v2/ClosingCTAV2";

export const metadata: Metadata = {
  title: { absolute: "Arka | Jouw digitale afdeling, zonder de overhead." },
  description:
    "Arka is jouw digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder een dak.",
  alternates: {
    canonical: "https://arkadigital.nl",
  },
  openGraph: {
    title: "Arka | Jouw digitale afdeling, zonder de overhead.",
    description:
      "Arka is jouw digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder een dak.",
    url: "https://arkadigital.nl",
  },
  twitter: {
    title: "Arka | Jouw digitale afdeling, zonder de overhead.",
    description: "Jouw digitale partner in Dordrecht.",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroV2 />
      <ProofStripV2 />
      <DienstenV2 />
      <WerkwijzeV2 />
      <CasesV2 />
      <FounderV2 />
      <PackagesShowcaseV2 />
      <ClosingCTAV2 />
    </>
  );
}
