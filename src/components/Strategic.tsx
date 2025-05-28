"use client";
import Image from "next/image";

export default function Strategic() {
  return (
    <section className="strategic">
      <div className="strategic-left">
        <h2 className="strategic-label">IMPLEMENTACIÓN ESTRATÉGICA DE</h2>
        <h3 className="strategic-title">VISOR URBANO CUERNAVACA</h3>
        <p className="strategic-subtitle"> <b>Mi proyecto más destacado en mi vida profesional.</b>Iniciando con licencias de funcionamiento sin venta de alcohol, con capas de ortofotografía y vista de los predios, 
        por primera vez el Ayuntamiento de Cuernavaca cuenta con una plataforma de gestión de territorio y un trámite en línea de punta a punta.
        <b>¿Adaptamos la plataforma en tu ciudad?</b></p>
        <a href="https://visorurbano.cuernavaca.gob.mx/inicio" className="strategic-button">Conoce este proyecto</a>
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
