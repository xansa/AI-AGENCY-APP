import { Metadata } from "next";
import { HeroV2 } from "@/components/sections/v2/HeroV2";
import { ProofStripV2 } from "@/components/sections/v2/ProofStripV2";
import { ServicesV2 } from "@/components/sections/v2/ServicesV2";
import { WerkwijzeV2 } from "@/components/sections/v2/WerkwijzeV2";
import { CasesV2 } from "@/components/sections/v2/CasesV2";
import { PackagesV2 } from "@/components/sections/v2/PackagesV2";
import { ComparisonV2 } from "@/components/sections/v2/ComparisonV2";
import { TestimonialsV2 } from "@/components/sections/v2/TestimonialsV2";
import { FAQV2 } from "@/components/sections/v2/FAQV2";
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
      <ServicesV2 />
      <WerkwijzeV2 />
      <CasesV2 />
      <PackagesV2 />
      <ComparisonV2 />
      <TestimonialsV2 />
      <FAQV2 />
      <ClosingCTAV2 />
    </>
  );
}
