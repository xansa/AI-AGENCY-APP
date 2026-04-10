import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { ProblemsSection } from "@/components/sections/ProblemsSection";
import { WhyItWorksSection } from "@/components/sections/WhyItWorksSection";
import { PackagesPreviewSection } from "@/components/sections/PackagesPreviewSection";
import { WerkwijzeSection } from "@/components/sections/WerkwijzeSection";
import { CasesPreviewSection } from "@/components/sections/CasesPreviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { LeadMagnetSection } from "@/components/sections/LeadMagnetSection";

export const metadata: Metadata = {
  title: { absolute: "Arka | Jouw digitale afdeling, zonder de overhead." },
  description:
    "Arka is jouw digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder één dak.",
  alternates: { canonical: "https://arkadigital.nl" },
  openGraph: {
    title: "Arka | Jouw digitale afdeling, zonder de overhead.",
    description:
      "Arka is jouw digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder één dak.",
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
      <HeroSection />
      <ProblemsSection />
      <SocialProofSection />
      <WhyItWorksSection />
      <ComparisonSection />
      <PackagesPreviewSection />
      <WerkwijzeSection />
      <CasesPreviewSection />
      <FAQSection />
      <LeadMagnetSection />
    </>
  );
}
