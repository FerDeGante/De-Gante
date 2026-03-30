export type ProductRevealVisualVariant =
  | "editorial"
  | "message"
  | "compare"
  | "bridge"
  | "signal";

export type ProductRevealMediaLayout = "hero" | "collage" | "compare";

export type ProductRevealMedia = {
  alt: string;
  src: string;
};

export type ProductRevealTheme = {
  accent: string;
  accentSoft: string;
  accentStrong: string;
};

export type ProductRevealVisual = {
  chips: [string, string, string];
  headline: string;
  label: string;
  metric?: string;
  media?: ProductRevealMedia[];
  mediaLayout?: ProductRevealMediaLayout;
  support: string;
  variant: ProductRevealVisualVariant;
};

export type ProductRevealCard = {
  benefit: string;
  description: string;
  label: string;
  title: string;
  visual: ProductRevealVisual;
};

export type ProductRevealSectionContent = {
  cards: ProductRevealCard[];
  context: string;
  eyebrow: string;
  headlineLines: [string, string];
  id: string;
  intro: string;
  exploreHint: string;
  visitHref?: string;
  visitLabel?: string;
  theme: ProductRevealTheme;
};

export const relativumCommerceEngine = {
  cards: [
    {
      benefit: "Resultado: la compra avanza en vez de quedarse en vitrina.",
      description:
        "No está pensada solo para mostrar productos. Está pensada para ayudar a que la compra avance.",
      label: "01 / 05",
      title: "Una tienda que no se queda en catálogo",
      visual: {
        chips: ["Compra", "Guía", "Claridad"],
        headline: "La compra avanza",
        label: "Presentación",
        metric: "Más intención",
        support: "La intención no se enfría en el camino.",
        variant: "editorial",
      },
    },
    {
      benefit: "Resultado: menos oportunidades que se enfrían por falta de seguimiento.",
      description:
        "Cuando alguien muestra interés, el sistema ayuda a que esa intención no se pierda en el camino.",
      label: "02 / 05",
      title: "Menos oportunidades perdidas",
      visual: {
        chips: ["Responder", "Seguir", "Cerrar"],
        headline: "No se enfría",
        label: "Seguimiento",
        metric: "Más continuidad",
        support: "El interés encuentra continuidad.",
        variant: "message",
      },
    },
    {
      benefit: "Resultado: decisiones más claras sobre qué sí está funcionando.",
      description:
        "No se trata de tener más datos por tenerlos. Se trata de entender mejor qué sí está funcionando.",
      label: "03 / 05",
      title: "Más claridad para decidir",
      visual: {
        chips: ["Entrada", "Cierre", "Repetición"],
        headline: "Ver mejor",
        label: "Claridad",
        metric: "Lectura útil",
        support: "Lo que funciona se nota más rápido.",
        variant: "compare",
      },
    },
    {
      benefit: "Resultado: venta y operación dejan de ir cada una por su lado.",
      description:
        "Lo comercial no debería vivir separado de lo operativo. Cuando ambas partes se entienden, el negocio responde mejor.",
      label: "04 / 05",
      title: "Venta y operación más conectadas",
      visual: {
        chips: ["Venta", "Operación", "Control"],
        headline: "Una sola línea",
        label: "Conexión",
        metric: "Menos fricción",
        support: "Lo que se vende y lo que se entrega conversan mejor.",
        variant: "bridge",
      },
    },
    {
      benefit: "Resultado: crecer deja de sentirse como apagar fuegos todo el tiempo.",
      description:
        "El objetivo no es solo vender más. Es crecer sin que cada nuevo pedido agregue más desorden.",
      label: "05 / 05",
      title: "Pensado para crecer sin tanto caos",
      visual: {
        chips: ["Orden", "Ritmo", "Control"],
        headline: "Sube con orden",
        label: "Crecimiento",
        metric: "Más escala",
        support: "El negocio crece sin romperse por dentro.",
        variant: "signal",
      },
    },
  ],
  context:
    "Una tienda común muestra productos y recibe pedidos. Este motor ayuda a que la venta siga el hilo completo sin dejar oportunidades en el camino.",
  eyebrow: "COMMERCE ENGINE",
  headlineLines: ["No es solo vender en línea.", "Es vender con más claridad."],
  id: "mis-proyectos",
  intro:
    "Relativum Commerce Engine convierte una tienda en una forma más útil de atraer, convertir, dar seguimiento y operar con menos fricción.",
  exploreHint: "Desliza para explorar cómo se siente vender con más claridad.",
  theme: {
    accent: "#10a2c7",
    accentSoft: "rgba(16, 162, 199, 0.12)",
    accentStrong: "#097693",
  },
} as const satisfies ProductRevealSectionContent;

export const joyaStudioReveal = {
  cards: [
    {
      benefit: "Fotografía editorial instantánea.",
      description: "Transforma fotos casuales en imágenes de alta joyería listas para vender.",
      label: "01 PHOTOGRAPHY",
      title: "Luz profesional, sin el estudio.",
      visual: {
        chips: ["Metal Polish", "Gems Clarity", "4K Render"],
        headline: "Perfección Óptica",
        label: "AI ENGINE",
        metric: "Pro Quality",
        mediaLayout: "hero",
        media: [
          {
            alt: "Joya Studio UI rendering results",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774835644/Captura_de_pantalla_2026-03-29_a_la_s_7.44.58_p.m._hrnig3.png",
          },
        ],
        support: "Optimización automática de reflejos y texturas.",
        variant: "editorial",
      },
    },
    {
      benefit: "Casting digital coste cero.",
      description: "Tus piezas sobre modelos hiper-realistas generadas por IA.",
      label: "02 MODELING",
      title: "Modelos reales. Hechas de código.",
      visual: {
        chips: ["Skin Texture", "Natural Fit", "Soft Light"],
        headline: "Anatomía Neural",
        label: "GENERATIVE",
        metric: "Ultra Real",
        mediaLayout: "collage",
        media: [
          {
            alt: "Model Variation 1",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836031/earring-1_1_3_g8ufuv.png",
          },
          {
            alt: "Model Variation 2",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836024/earring-1_1_2_jl2wkb.png",
          },
          {
            alt: "Model Variation 3",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836058/earring-2_2_2_kbbp31.png",
          },
          {
            alt: "Model Variation 4",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836051/earring-1_1_sdc1ly.png",
          },
          {
            alt: "Joya Studio UI Setup",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774835643/Captura_de_pantalla_2026-03-29_a_la_s_7.49.43_p.m._umxmrw.png",
          },
        ],
        support: "Ajuste orgánico perfecto sobre la piel.",
        variant: "message",
      },
    },
    {
      benefit: "Catálogos completos hoy.",
      description: "Genera colecciones enteras con estética unificada en minutos.",
      label: "03 AUTOMATION",
      title: "Escala tu marca a la velocidad de la IA.",
      visual: {
        chips: ["Batch Render", "Style Consistency", "E-com Ready"],
        headline: "Flujo Infinito",
        label: "EFFICIENCY",
        metric: "⚡ Instant",
        mediaLayout: "compare",
        media: [
          {
            alt: "Original Phone Photo",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836299/PHOTO-2026-02-05-18-04-39_frckrk_1_ra3hij.jpg",
          },
          {
            alt: "AI Rendered Result",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836289/earring-1_1_5_uqziy8.png",
          },
          {
            alt: "Batch item 1",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836193/bracelet-3_3_mu35kw.png",
          },
          {
            alt: "Batch item 2",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836200/necklace-1_3_1_ccqn78.png",
          },
          {
            alt: "Batch item 3",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836268/earring-4_3_2_pfi30h.png",
          },
          {
            alt: "Batch item 4",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836208/necklace-1_3_jememk.png",
          },
          {
            alt: "Batch item 5",
            src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774836273/earring-4_4_4_hrorhq.png",
          },
        ],
        support: "Sincroniza el look de 50 piezas simultáneamente.",
        variant: "compare",
      },
    },
  ],
  context: "Tecnología de renderizado neuronal diseñada exclusivamente para la alta joyería.",
  eyebrow: "JOYA STUDIO AI",
  headlineLines: ["De una foto casual,", "a una joya de campaña."],
  id: "joyastudio",
  intro: "Resultados de estudio profesional en segundos. Sin cámaras, sin logística, sin límites.",
  exploreHint: "Desliza para explorar el resultado final.",
  visitHref: "https://www.joyastudio.com.mx/",
  visitLabel: "Comenzar a crear ahora",
  theme: {
    accent: "#b67e4e",
    accentSoft: "rgba(182, 126, 78, 0.12)",
    accentStrong: "#7a502e",
  },
} as const satisfies ProductRevealSectionContent;

export const pawfectReveal = {
  cards: [
    {
      benefit: "Resultado: menos fricción desde el primer contacto.",
      description:
        "Cuando agendar es más claro, la atención empieza mejor desde antes de la visita.",
      label: "01 / 05",
      title: "Reservar ya no se siente complicado",
      visual: {
        chips: ["Cita", "Horario", "Recepción"],
        headline: "Reservar claro",
        label: "Agenda",
        metric: "Menos fricción",
        support: "La cita se entiende en segundos.",
        variant: "editorial",
      },
    },
    {
      benefit: "Resultado: el equipo deja de improvisar tanto.",
      description:
        "La operación deja de vivir entre mensajes, notas sueltas y recordatorios dispersos.",
      label: "02 / 05",
      title: "Menos mensajes sueltos",
      visual: {
        chips: ["Mensajes", "Notas", "Seguimiento"],
        headline: "Todo sigue",
        label: "Orden",
        metric: "Más orden",
        support: "Los pendientes encuentran lugar y continuidad.",
        variant: "message",
      },
    },
    {
      benefit: "Resultado: más coordinación, menos vueltas.",
      description:
        "Una clínica funciona mejor cuando todos entienden qué sigue y dónde está cada cosa.",
      label: "03 / 05",
      title: "Más control para el equipo",
      visual: {
        chips: ["Recepción", "Equipo", "Atención"],
        headline: "Saber qué sigue",
        label: "Equipo",
        metric: "Más control",
        support: "Cada persona ve mejor su siguiente paso.",
        variant: "compare",
      },
    },
    {
      benefit: "Resultado: el servicio se siente más profesional.",
      description:
        "La confianza también se construye con orden, claridad y seguimiento.",
      label: "04 / 05",
      title: "Más tranquilidad para cliente y paciente",
      visual: {
        chips: ["Paciente", "Dueño", "Seguimiento"],
        headline: "Más confianza",
        label: "Cliente",
        metric: "Mejor experiencia",
        support: "La experiencia se siente clara antes, durante y después.",
        variant: "bridge",
      },
    },
    {
      benefit: "Resultado: la clínica puede crecer sin desordenar todo.",
      description:
        "Más pacientes no debería significar más caos. Debería significar mejor sistema.",
      label: "05 / 05",
      title: "Crecer sin perder control",
      visual: {
        chips: ["Más citas", "Más orden", "Más claridad"],
        headline: "Escala con orden",
        label: "Crecimiento",
        metric: "Menos caos",
        support: "El día a día no se rompe cuando la clínica crece.",
        variant: "signal",
      },
    },
  ],
  context:
    "Cuando la clínica ordena su día, el equipo responde mejor y el cliente siente más confianza desde el primer contacto.",
  eyebrow: "PRODUCTO / CLINIC OPERATIONS",
  headlineLines: ["Pawfect.", "Orden para atender mejor."],
  id: "pawfect",
  intro:
    "Una forma más clara de gestionar citas, atención y operación sin depender del caos diario.",
  exploreHint: "Desliza para ver cómo la clínica trabaja con más orden.",
  visitHref: "https://www.pawfect.com.mx/",
  visitLabel: "Visitar Pawfect",
  theme: {
    accent: "#5c9c95",
    accentSoft: "rgba(92, 156, 149, 0.14)",
    accentStrong: "#346964",
  },
} as const satisfies ProductRevealSectionContent;
