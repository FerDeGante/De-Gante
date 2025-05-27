"use client";
import Image from "next/image";

const platforms = [
  {
    title: "Visor Urbano",
    image: "/images/vu_img_site.jpeg",
    glow: "glow-cyan",
  },
  {
    title: "Decidim",
    image: "/images/decidim_img_site.jpeg",
    glow: "glow-purple",
  },
];

export default function OpenSourcePlatforms() {
  return (
    <section className="opensource-section">
      <h2 className="opensource-title">Adaptación de plataformas de código abierto</h2>
      <div className="opensource-grid">
        {platforms.map((item, index) => (
          <div key={index} className={`opensource-card ${item.glow}`}>
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={300}
              className="opensource-img"
            />
            <h3 className="opensource-label">{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
