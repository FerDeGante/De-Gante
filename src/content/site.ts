export const site = {
  name: "Fernando De Gante",
  role: "Infraestructura digital y sistemas de escalamiento",
  description:
    "Infraestructura digital, automatización comercial y sistemas de escalamiento para negocios que ya venden y necesitan operar mejor.",
  siteUrl: "https://de-gante.com",
  contact: {
    whatsappDisplay: "+52 777 493 7660",
    whatsappHref: "https://wa.me/527774937660",
  },
  brandMark: {
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645219/monograma_dg_jmk34k.jpg",
    alt: "Monograma DG de Fernando De Gante",
  },
  navigation: [
    { label: "Mis proyectos", href: "#mis-proyectos" },
    { label: "Testimonios", href: "#testimonios" },
  ],
  actions: {
    header: {
      label: "Escala tu negocio",
      href: "https://calendly.com/ferdegante-22/30min",
    },
    primary: {
      label: "Agendar Consultoría Estratégica",
      href: "https://calendly.com/ferdegante-22/30min",
    },
    secondary: {
      label: "Hacer diagnóstico primero →",
      href: "#diagnostico",
    },
  },
  hero: {
    eyebrow: "INFRAESTRUCTURA DIGITAL · SISTEMAS DE ESCALAMIENTO",
    headlineLines: [
      "¿Cuál es el principal cuello de botella",
      "que frena tu facturación hoy?",
    ],
    subheadline:
      "Descúbrelo con sólo 3 preguntas con este breve diagnóstico.",
    proof: [
      "+8 sistemas en producción",
      "3× reconocimientos institucionales",
      "GovTech, SaaS y automatización comercial",
    ],
    visual: {
      backgroundSrc:
        "https://res.cloudinary.com/ddax9tdki/image/upload/v1774672152/foro-auditorio_xqbrjf.png",
      backgroundAlt: "Auditorio lleno durante un evento en vivo",
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774646464/fer-de-gante-lanzamiento-visor_ieh5yr.png",
      alt: "Fernando De Gante durante el lanzamiento de Visor Urbano",
    },
  },
} as const;
