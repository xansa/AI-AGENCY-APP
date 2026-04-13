import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { LanguageProvider } from "@/lib/i18n";
import { CookieBanner } from "@/components/ui/CookieBanner";

// Editorial serif headlines
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// UI and body sans
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Inter kept for logo wordmark and fallback only
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://arkadigital.nl"),
  title: {
    default: "Arka | Jouw digitale afdeling, zonder de overhead.",
    template: "%s | Arka",
  },
  description:
    "Arka is jouw digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder één dak.",
  keywords: [
    "digitaal bureau",
    "websites",
    "webshops",
    "SEO",
    "AI chatbots",
    "automatisering",
    "dashboards",
    "lead generation",
    "branding",
    "Dordrecht",
  ],
  authors: [{ name: "Arka" }],
  creator: "Arka",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Arka",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://arkadigital.nl/#website",
  name: "Arka",
  url: "https://arkadigital.nl",
  inLanguage: "nl",
  publisher: { "@id": "https://arkadigital.nl/#organization" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://arkadigital.nl/#organization",
  name: "Arka",
  description:
    "Digitaal bureau in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder een dak.",
  url: "https://arkadigital.nl",
  image: "https://arkadigital.nl/brand/cover-dark.png",
  logo: {
    "@type": "ImageObject",
    url: "https://arkadigital.nl/brand/logo-icon-dark.png",
  },
  telephone: "+31646140986",
  email: "info@arkadigital.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dordrecht",
    addressRegion: "Zuid-Holland",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.81330,
    longitude: 4.69010,
  },
  areaServed: [
    { "@type": "City", name: "Dordrecht" },
    { "@type": "City", name: "Zwijndrecht" },
    { "@type": "City", name: "Papendrecht" },
    { "@type": "AdministrativeArea", name: "Drechtsteden" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  founder: {
    "@type": "Person",
    name: "Kaan Arslan",
    url: "https://arkadigital.nl/over-ons",
    sameAs: "https://www.linkedin.com/in/kaanarslan",
  },
  sameAs: [
    "https://www.linkedin.com/company/arka-nl",
  ],
  priceRange: "$$",
  serviceType: [
    "Webdesign",
    "Webdevelopment",
    "SEO",
    "AI Chatbots",
    "Automatisering",
    "Dashboards",
    "Lead Generation",
    "Branding",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning className={`${cormorant.variable} ${instrumentSans.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0E1116",
              color: "#FAFAF7",
              borderRadius: "12px",
              fontSize: "14px",
              border: "1px solid rgba(255,255,255,0.08)",
            },
            success: {
              iconTheme: { primary: "#2F6BFF", secondary: "#fff" },
            },
          }}
        />
        <CookieBanner />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
