import Hero from "@/src/components/Hero";
import Projects from "@/src/components/Projects";
import ContactForm from "@/src/components/ContactForm";
import WhatsAppButton from "@/src/components/WhatsAppButton";
import Strategic from "@/src/components/Strategic";
import Participations from "@/src/components/Participations";
import Services from "@/src/components/Services";
import OpenSourcePlatforms from "@/src/components/OpenSourcePlatforms";

export default function Home() {
  return (
    <main>
      <Hero />
      <Strategic />
      <Participations />
      <Projects />
      <Services />
      <OpenSourcePlatforms />
      <section id="contacto">
        <ContactForm />
      </section>
      <WhatsAppButton />
    </main>
  );
}
