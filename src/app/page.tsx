import { HeroSection } from "@/components/sections/hero";
import { BriefDiagnosticConnected } from "@/components/sections/brief-diagnostic-connected";
import { RelativumCommerceEngine } from "@/components/sections/relativum-commerce-engine";
import { JoyaStudioSection } from "@/components/sections/joya-studio-section";
import { PawfectSection } from "@/components/sections/pawfect-section";
import { TrustedByStrip } from "@/components/sections/trusted-by-strip";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedByStrip />
      <RelativumCommerceEngine />
      <JoyaStudioSection />
      <PawfectSection />
      <BriefDiagnosticConnected />
      <TestimonialsSection />
      <FinalCta />
    </>
  );
}
