export type ProductRevealVisualVariant =
  | "editorial"
  | "message"
  | "compare"
  | "bridge"
  | "signal";

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
      benefit: "Cero logística. Resultados de estudio en segundos.",
      description:
        "Sube fotos ordinarias tomadas en tu mostrador o taller. Nuestra IA elimina el ruido, perfecciona el brillo y coloca tu pieza en un entorno de alta costura digital.",
      label: "TRANSFORMACIÓN",
      title: "Tu iPhone es ahora un estudio profesional.",
      visual: {
        chips: ["Foto original", "Deep Scan", "Render Final"],
        headline: "Claridad Diamante",
        label: "PROCESANDO",
        metric: "4K Export",
        support: "Optimización de reflejos y texturas en tiempo real.",
        variant: "editorial",
      },
    },
    {
      benefit: "Crea empatía y deseo de compra instantáneo.",
      description:
        "Posiciona tus joyas sobre modelos generadas por IA con una precisión anatómica perfecta. Transmite estilo, escala y elegancia sin necesidad de castings o sesiones de fotos.",
      label: "CONEXIÓN HUMANA",
      title: "Modelos hiper-realistas que no existen.",
      visual: {
        chips: ["Textura Piel", "Luz Natural", "Ajuste Pro"],
        headline: "Ajuste Orgánico",
        label: "AI MODELING",
        metric: "Perfect Fit",
        support: "La IA detecta puntos de presión para que la joya se pose naturalmente sobre la piel.",
        variant: "message",
      },
    },
    {
      benefit: "Lanza nuevas colecciones cada semana, no cada mes.",
      description:
        "Genera variaciones infinitas de fondo, iluminación y estilo para toda tu colección. Mantén una estética coherente en tu e-commerce y redes sociales con un solo clic.",
      label: "EFICIENCIA",
      title: "Catálogos completos en tiempo récord.",
      visual: {
        chips: ["Presets", "Auto-Crop", "E-com Ready"],
        headline: "Estética Unificada",
        label: "BATCH RENDER",
        metric: "⚡ Instant",
        support: "Sincroniza el look & feel de 50 piezas simultáneamente.",
        variant: "compare",
      },
    },
  ],
  context:
    "Nuestra tecnología analiza la luz, el metal y las piedras preciosas para crear composiciones orgánicas que antes requerían días de producción y presupuestos de miles de dólares.",
  eyebrow: "EL FUTURO DE TU CATÁLOGO",
  headlineLines: ["De una foto casual,", "a una campaña de lujo."],
  id: "joyastudio",
  intro:
    "Joya Studio no es solo una herramienta; es tu nuevo equipo creativo de guardia. Utilizamos inteligencia artificial generativa de vanguardia para transformar las fotos que tomas con tu celular en imágenes editoriales de alta gama, diseñadas para vender.",
  exploreHint: "Desliza para ver cómo la IA humaniza tu marca.",
  visitHref: "https://www.joyastudio.com.mx/",
  visitLabel: "Comienza a crear ahora",
  theme: {
    accent: "#aa7a48",
    accentSoft: "rgba(170, 122, 72, 0.14)",
    accentStrong: "#7b5330",
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
