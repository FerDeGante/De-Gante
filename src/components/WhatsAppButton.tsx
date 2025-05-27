"use client";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/527774937660?text=Hola%2C%20Fernando.%20Vi%20tu%20portafolio%20y%20me%20interesa%20agendar%20una%20cita."
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbeme por WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
}
