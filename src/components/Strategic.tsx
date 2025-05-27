"use client";
import Image from "next/image";

export default function Strategic() {
  return (
    <section className="strategic">
      <div className="strategic-left">
        <h2 className="strategic-label">IMPLEMENTACIÓN ESTRATÉGICA DE</h2>
        <h3 className="strategic-title">VISOR URBANO CUERNAVACA</h3>
        <p className="strategic-subtitle">Iniciando con licencias de funcionamiento sin venta de alcohol, con capas de ortofotografía y vista de los predios, 
        por primera vez el Ayuntamiento de Cuernavaca cuenta con una plataforma de gestión de territorio y un trámite en línea de punta a punta.</p>
        <a href="#participaciones" className="strategic-button">Conoce mis otros proyectos destacados</a>
      </div>
      <div className="strategic-right">
        <Image
          src="/images/mockup_con_fondo_exterior_eliminado.png"
          alt="Mockup Visor Urbano"
          width={700}
          height={400}
          className="strategic-mockup"
        />
      </div>
    </section>
  );
}
