import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://arka.nl"),
  title: {
    default: "Arka — Jouw digitale afdeling, zonder de overhead.",
    template: "%s | Arka",
  },
  description:
    "Arka is jouw digitale partner in Dordrecht. Websites, SEO, AI chatbots, dashboards, lead generation en branding — alles onder één dak.",
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
    url: "https://arka.nl",
    siteName: "Arka",
    title: "Arka — Jouw digitale afdeling, zonder de overhead.",
    description:
      "Arka is jouw digitale partner. Websites, SEO, AI chatbots, dashboards, lead generation en branding — alles onder één dak.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arka",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arka — Jouw digitale afdeling, zonder de overhead.",
    description: "Jouw digitale partner in Dordrecht.",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={inter.variable}>
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
      </body>
    </html>
  );
}
