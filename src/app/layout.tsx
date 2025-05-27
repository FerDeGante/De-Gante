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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
