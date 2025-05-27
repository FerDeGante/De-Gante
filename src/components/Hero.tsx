"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-logo-block">
  <Image src="/images/logo_dg.PNG" alt="Logo DG" width={300} height={300} />
  <div className="hero-name-group">
    <h1 className="hero-name">FERNANDO <span>DE GANTE</span></h1>
    <p className="hero-slogan">pon tu nombre en alto <sup>®</sup></p>
  </div>
</div>
        <h2 className="hero-title">
          Chief leader y desarrollador de software para <span className="text-accent">Transformación digital</span><br /> en <span className="text-accent">Empresas y Govtech</span>
        </h2>
        <p className="hero-description">
          Transformando empresas y gobiernos con tecnología de vanguardia, conoce mi experiencia y mi vision para el futuro de la tecnología. <br />
        </p>
        <a href="#participaciones" className="hero-cta">Participaciones destacadas</a>
      </div>
      <div className="hero-right">
        <Image src="/images/fer_hero.jpeg" alt="Fernando De Gante" width={800} height={800} className="hero-photo" />
      </div>
    </section>
  );
}
