import { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroCardsSection } from "@/components/sections/IntroCardsSection";
import { WerkwijzeSection } from "@/components/sections/WerkwijzeSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ResultsSection } from "@/components/sections/ResultsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { PackagesPreviewSection } from "@/components/sections/PackagesPreviewSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { LeadMagnetSection } from "@/components/sections/LeadMagnetSection";

export const metadata: Metadata = {
  title: { absolute: "Arka | Jouw digitale afdeling, zonder de overhead." },
  description:
    "Arka digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder één dak.",
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
      <IntroCardsSection />
      <WerkwijzeSection />
      <ServicesSection />
      <ResultsSection />
      <ComparisonSection />
      <PackagesPreviewSection />
      <TestimonialSection />
      <FAQSection />
      <LeadMagnetSection />
    </>
  );
}
