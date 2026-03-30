import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: site.siteUrl,
  },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.siteUrl,
    siteName: site.name,
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: site.hero.visual.src,
        width: 1200,
        height: 1500,
        alt: site.hero.visual.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: [site.hero.visual.src],
  },
  icons: {
    icon: site.brandMark.src,
    shortcut: site.brandMark.src,
    apple: site.brandMark.src,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es-MX" className={`${inter.variable} ${interTight.variable}`}>
      <body className="bg-[color:var(--background)] text-[color:var(--text)] antialiased">
        <SiteHeader />
        <main id="contenido" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
