import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
    url: "https://arkadigital.nl",
    siteName: "Arka",
    title: "Arka | Jouw digitale afdeling, zonder de overhead.",
    description:
      "Arka is jouw digitale partner. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder één dak.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka | Jouw digitale afdeling, zonder de overhead.",
    description: "Jouw digitale partner in Dordrecht.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: "Arka",
  description:
    "Digitaal bureau in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding, alles onder één dak.",
  url: "https://arkadigital.nl",
  telephone: "+31646410986",
  email: "info@arkadigital.nl",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dordrecht",
    addressCountry: "NL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.8133,
    longitude: 4.6901,
  },
  areaServed: {
    "@type": "Country",
    name: "NL",
  },
  founder: {
    "@type": "Person",
    name: "Kaan",
  },
  sameAs: [],
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
    <html lang="nl" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#0f172a",
              color: "#f8fafc",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#6366f1", secondary: "#fff" },
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
