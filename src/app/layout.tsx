import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERVE — Experiences That Move Brands",
  description:
    "VERVE is a premium experiential marketing and event company with 40+ years of combined experience and 300+ events delivered. We create extraordinary brand experiences that move audiences.",
  keywords: [
    "experiential marketing",
    "event management",
    "brand experiences",
    "product launches",
    "corporate events",
    "marketing strategy",
  ],
  openGraph: {
    title: "VERVE — Experiences That Move Brands",
    description:
      "Premium experiential marketing and event company creating extraordinary brand experiences.",
    type: "website",
    locale: "en_US",
    siteName: "VERVE",
  },
  twitter: {
    card: "summary_large_image",
    title: "VERVE — Experiences That Move Brands",
    description:
      "Premium experiential marketing and event company creating extraordinary brand experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VERVE",
              description:
                "Premium experiential marketing and event company",
              url: "https://verve.agency",
              foundingDate: "2020",
              numberOfEmployees: "50+",
              knowsAbout: [
                "Experiential Marketing",
                "Event Management",
                "Brand Experiences",
                "Product Launches",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-background text-primary font-body min-h-screen overflow-x-hidden">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
