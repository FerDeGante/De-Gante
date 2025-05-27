"use client";
import Image from "next/image";

const participations = [
  {
    title: "Lanzamiento de Visor Urbano Cuernavaca",
    description: "Lideré el lanzamiento de la plataforma de gestión territorial Visor Urbano Cuernavaca, facilitando trámites en línea y acceso a información geoespacial, en colaboración con el Gobierno del estado de Jalisco.",
    image: "/images/launch_visor.jpeg",
    glow: "glow-purple",
  },
  {
    title: "Panelista en el Foro Desarrollo Digital desde lo local en el IFT",
    description: "Participé como panelista en el Foro Desarrollo Digital desde lo local, organizado por el Instituto Federal de Telecomunicaciones (IFT), donde discutí sobre la importancia de la digitalización en los gobiernos locales.",
    image: "/images/ponente_ift.jpeg",
    glow: "glow-cyan",
  },
   {
    title: "Galardón Aliado para el despliegue de infraesctuctura de telecomunicaciones",
    description: "Recibí el galardón Aliado para el despliegue de infraestructura de telecomunicaciones por parte del Instituto Federal de Telecomunicaciones (IFT), reconociendo mi contribución al desarrollo digital en México.",
    image: "/images/galardon_ift.jpeg",
    glow: "glow-blue",
  },

  {
    title: "Bloomberg Philanthropies",
    description: "Participé en el seminario Prevent Corruption by Digitalizing Permits and Business Licensing organizado por Bloomberg Philanthropies, donde compartí experiencias sobre la digitalización de trámites y licencias empresariales para prevenir la corrupción.",
    image: "/images/bloomberg.jpeg",
    glow: "glow-pink",
  },
  {
    title: "Boletín Metropolitano de la SEDATU",
    description: "En la edición del tercer trimestre del boletín Metropolitano de la SEDATU, plantée que el Visor Urbano Cuernavaca se convirtió en un observatorio metropolitano.",
    href: "https://www.gob.mx/cms/uploads/attachment/file/944341/Boleti_n_metropolitano._Tercer_trimestre_2024.pdf",
    image: "/images/boletin_sedatu.png",
    glow: "glow-purple",
  },

  {
    title: "Medalla al Mérito en el Congreso del Estado de Morelos",
    description: "Recibí la Medalla Antonio Díaz Soto y Gama al Mérito en el Congreso del Estado de Morelos, por el ejercicio del Derecho en el Municipio de Cuernavaca.",
    image: "/images/medalla_congreso.jpeg",
    glow: "glow-teal",
  },
  {
    title: "Certificaciones por simplificación administrativa",
    description: "Obtuve certificaciones por mi labor en la simplificación administrativa, destacando mi compromiso con la mejora de los procesos gubernamentales y la eficiencia en la atención ciudadana.",
    image: "/images/certificaciones.jpeg",
    glow: "glow-blue",
  },
  {
    title: "Ponencia en el centro cultural Los Pinos",
    description: "Fui ponente en el centro cultural Los Pinos, donde compartí mis experiencias y conocimientos sobre la digitalización de trámites y la importancia de la transparencia en la administración pública.",
image: "/images/los_pinos_2.jpeg",
glow: "glow-orange",

  }

];

export default function Participations() {
  return (
    <section className="participations-section">
      <h2 className="participations-title">Mis participaciones más destacadas</h2>
      <div className="participations-grid">
        {participations.map((item, i) => (
          <div key={i} className={`participation-card ${item.glow}`}>
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="participation-img"
            />
            <h3 className="participation-title">{item.title}</h3>
            <p className="participation-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
