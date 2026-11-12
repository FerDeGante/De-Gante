import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="contenido" className="relative">
        {children}
      </main>
      <Footer />
    </>
  );
}
