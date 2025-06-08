"use client";
import Image from "next/image";

const projects = [
  {
    title: "Visor Urbano Cuernavaca",
    url: "https://visorurbano.cuernavaca.gob.mx/",
    image: "/images/logo_VU_Cuernavaca.svg",
    glow: "glow-cyan",
  },
  {
    title: "Reto ReprogrÁMATE",
    url: "https://retoreprogramate.com/",
    image: "/images/logo_oscuro_rt.png",
    glow: "glow-teal",
  },
  {
    title: "One Asesor",
    url: "https://one-asesor.com/",
    image: "/images/one_logo.png",
    glow: "glow-purple",
  },
  {
    title: "Bloom Fisioterapia",
    url: "https://bloom-fisio.netlify.app/",
    image: "/images/logo_bloom_clean.png",
    glow: "glow-pink",
  },
  {
    title: "Pawfect (en desarrollo)",
    url: "#",
    image: "/images/pawfect_logo.png",
    glow: "glow-blue",
  },
];

export default function Projects() {
  return (
    <section className="projects-section">
      <h2 className="projects-title">Mi trabajo</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`project-card ${p.glow}`}
          >
            <Image
              src={p.image}
              alt={p.title}
              width={400}
              height={250}
              className="project-img"
            />
            <h3 className="project-label">{p.title}</h3>
          </a>
        ))}
      </div>
    </section>
  );
}
