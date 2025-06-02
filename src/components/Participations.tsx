"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const participations = [
  {
    title: "Lanzamiento de Visor Urbano Cuernavaca",
    description: "Lideré y gestioné la adaptación de la plataforma de gestión territorial Visor Urbano Cuernavaca, facilitando trámites en línea y acceso a información geoespacial, en colaboración con el Gobierno del estado de Jalisco.",
    images: ["/images/launch_visor.jpeg", "/images/launch_visor_2.jpeg", "/images/launch_visor_3.jpeg", "/images/launch_visor_4.jpeg"],
    glow: "glow-purple",
  },
  {
    title: "Panelista en el Foro Desarrollo Digital desde lo local en el IFT",
    description: "Participé como panelista en el Foro Desarrollo Digital desde lo local, organizado por el Instituto Federal de Telecomunicaciones (IFT), donde discutí sobre la importancia de la digitalización en los gobiernos locales.",
    images: ["/images/ponente_ift.jpeg", "/images/ponente_ift_2.jpeg",],
    glow: "glow-cyan",
  },
  {
    title: "Galardón Aliado para el despliegue de infraestructura de telecomunicaciones",
    description: "Recibí el galardón Aliado para el despliegue de infraestructura de telecomunicaciones por parte del Instituto Federal de Telecomunicaciones (IFT), reconociendo mi contribución al desarrollo digital en México.",
    images: ["/images/galardon_ift.jpeg", "/images/galardon_2.jpeg", "/images/galardon_3.jpeg"],
    glow: "glow-blue",
  },
  {
    title: "Bloomberg Philanthropies",
    description: "Participé en el seminario Prevent Corruption by Digitalizing Permits and Business Licensing organizado por Bloomberg Philanthropies, donde compartí experiencias sobre la digitalización de trámites y licencias empresariales para prevenir la corrupción.",
    images: ["/images/bloomberg.jpeg"],
    glow: "glow-pink",
  },
  {
    title: "Boletín Metropolitano de la SEDATU",
    description: "En la edición del tercer trimestre del boletín Metropolitano de la SEDATU, planteé que el Visor Urbano Cuernavaca se convirtió en un observatorio metropolitano.",
    href: "https://www.gob.mx/cms/uploads/attachment/file/944341/Boleti_n_metropolitano._Tercer_trimestre_2024.pdf",
    images: ["/images/boletin_sedatu.png"],
    glow: "glow-purple",
  },
  {
    title: "Medalla al Mérito en el Congreso del Estado de Morelos",
    description: "Recibí la Medalla Antonio Díaz Soto y Gama al Mérito en el Congreso del Estado de Morelos, por el ejercicio del Derecho en el Municipio de Cuernavaca.",
    images: ["/images/medalla_congreso.jpeg"],
    glow: "glow-teal",
  },
  {
    title: "Certificaciones por simplificación administrativa",
    description: "Obtuve certificaciones por mi labor en la simplificación administrativa, destacando mi compromiso con la mejora de los procesos gubernamentales y la eficiencia en la atención ciudadana.",
    images: ["/images/certificaciones.jpeg", "/images/certificaciones_2.jpeg"],
    glow: "glow-blue",
  },
  {
    title: "Ponencia en el centro cultural Los Pinos",
    description: "Fui ponente en el centro cultural Los Pinos, donde compartí mis experiencias y conocimientos sobre la digitalización de trámites y la importancia de la transparencia en la administración pública.",
    images: ["/images/los_pinos_2.jpeg", "/images/los_pinos_3.jpeg", "/images/los_pinos.jpeg"],
    glow: "glow-orange",
  },
];

export default function Participations() {
  return (
    <section className="participations-section">
      <div className="container">
      <h2 className="participations-title">Mis participaciones más destacadas</h2>
      <div className="participations-grid">
        {participations.map((item, i) => (
          <div key={i} className={`participation-card ${item.glow}`}>
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop
            >
              {item.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={img}
                    alt={`${item.title} - ${index}`}
                    width={400}
                    height={300}
                    className="participation-img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <h3 className="participation-title">{item.title}</h3>
            <p className="participation-description">{item.description}</p>
          </div>


        ))}
      </div>
      </div>
    </section>
  );
}
