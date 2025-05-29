import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/src/components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fernando De Gante | Portafolio",
  description: "Consultor en tecnología, GovTech y transformación digital.",
  metadataBase: new URL("https://de-gante.com"),
  alternates: {
    canonical: "https://de-gante.com",
  },
  openGraph: {
    title: "Fernando De Gante | Portafolio",
    description: "Consultor en tecnología, GovTech y transformación digital.",
    url: "https://de-gante.com",
    siteName: "Fernando De Gante",
    images: [
      {
        url: "https://de-gante.com/images/imagotipo_slogan_sin_fondo.jpeg",
        width: 1200,
        height: 630,
        alt: "Fernando De Gante | Logo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/images/monograma_dg.jpeg",
    shortcut: "/images/imagotipo_dg.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://de-gante.com/images/imagotipo_slogan_sin_fondo.jpeg" />
        <link rel="icon" href="/images/monograma_dg.jpeg" type="image/jpeg" />
        <link rel="shortcut icon" href="/images/imagotipo_dg.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
