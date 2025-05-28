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
  icons: [
    { rel: "icon", url: "/isotipo_dg.png", type: "image/png" },
    { rel: "shortcut icon", url: "/isotipo_dg.png", type: "image/png" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/isotipo_dg.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
