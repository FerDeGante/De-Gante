import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Poppins, Yellowtail } from "next/font/google";
import { acta } from "@/content/acta";
import { site } from "@/content/site";
import { FloatingWhatsApp } from "@/components/acta/acta-ui";
import { ActaNavigation } from "@/components/acta/acta-navigation";
import styles from "./acta.module.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--acta-font-body",
  display: "swap",
});
const poppins = Poppins({
  weight: "800",
  subsets: ["latin"],
  variable: "--acta-font-heading",
  display: "swap",
});
const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--acta-font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: { absolute: acta.metadata.title },
  description: acta.hero.subtitle,
  alternates: { canonical: `${site.siteUrl}/acta` },
  robots: {
    index: acta.published,
    follow: acta.published,
    googleBot: { index: acta.published, follow: acta.published },
  },
  openGraph: {
    title: acta.metadata.title,
    description: acta.hero.subtitle,
    url: `${site.siteUrl}/acta`,
    images: [],
  },
  twitter: {
    card: "summary",
    title: acta.metadata.title,
    description: acta.hero.subtitle,
    images: [],
  },
};

export default function ActaLayout({ children }: { children: ReactNode }) {
  const legalIdentity = [
    acta.legal.name,
    acta.legal.role,
    acta.cedula,
    acta.legal.location,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className={`${styles.root} ${inter.variable} ${poppins.variable} ${yellowtail.variable}`}
    >
      <a href="#acta-contenido" className={styles.skipLink}>
        {acta.labels.skip}
      </a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="/acta" className={styles.wordmark}>
            {acta.brand.name}
            <span>{acta.brand.method}</span>
          </a>
          <ActaNavigation navigation={acta.navigation} />
        </div>
      </header>
      <main id="acta-contenido">{children}</main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p className={styles.legalIdentity}>{legalIdentity}</p>
          <div className={styles.footerGrid}>
            <p>{acta.legal.disclaimer}</p>
            <details id="aviso-de-privacidad" className={styles.privacy}>
              <summary>{acta.legal.privacy}</summary>
              <p>{acta.legal.privacyText}</p>
            </details>
          </div>
        </div>
      </footer>
      <FloatingWhatsApp />
    </div>
  );
}
