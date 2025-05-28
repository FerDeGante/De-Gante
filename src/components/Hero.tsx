"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-logo-block">
  <Image src="/images/imagotipo_dg.png" alt="Imagotipo DG" width={200} height={200} />
  <div className="hero-name-group">
  </div>
</div>
        <h2 className="hero-title">
          Soy leader y desarrollador de software para <span className="text-accent">Transformación digital</span><br /> en <span className="text-accent">Empresas y Govtech</span>
        </h2>
        <p className="hero-description">
          Transformando empresas y gobiernos con tecnología de vanguardia, conoce mi experiencia y mi vision para el futuro de la tecnología. <br />
        </p>
      </div>
      <div className="hero-right">
        <Image src="/images/fer_hero.jpeg" alt="Fernando De Gante" width={800} height={800} className="hero-photo" />
      </div>
    </section>
  );
}
