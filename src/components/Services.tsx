"use client";
import Image from "next/image";

const services = [
  {
    title: "E-commerce",
    image: "/images/e-commerce_con_padding.png",
  },
  {
    title: "POS",
    image: "/images/pos.png",
  },
  {
    title: "Landing Pages",
    image: "/images/landing_pages.png",
  },
  {
    title: "Reservaciones y más",
    image: "/images/reservaciones_y_mas.png",
  },
];

export default function Services() {
  return (
    <section className="services-section">
        <div className="container">
      <h2 className="services-title">¿Qué puedo crear?</h2>
      <div className="services-grid">
        {services.map((item, i) => (
          <div className="service-card" key={i}>
            <Image
              src={item.image}
              alt={item.title}
              width={300}
              height={300}
              className="service-img"
            />
            <h3 className="service-label">{item.title}</h3>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
