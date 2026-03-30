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
  id: "sistema",
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
      benefit: "Resultado: la primera impresión trabaja a favor del valor percibido.",
      description:
        "No se trata solo de subir una foto. Se trata de hacer que la pieza se sienta protagonista desde el primer vistazo.",
      label: "01 / 05",
      title: "La pieza se presenta como merece",
      visual: {
        chips: ["Curaduría", "Detalle", "Valor"],
        headline: "Pieza protagonista",
        label: "Presentación",
        metric: "Más deseo",
        support: "La pieza entra con más presencia y más intención.",
        variant: "editorial",
      },
    },
    {
      benefit: "Resultado: el interés deja de sentirse frío.",
      description:
        "Una experiencia cuidada reduce la sensación de catálogo genérico y hace que la pieza conecte mejor.",
      label: "02 / 05",
      title: "Más deseo, menos frialdad",
      visual: {
        chips: ["Explorar", "Silencio", "Antojo"],
        headline: "Con más intención",
        label: "Deseo",
        metric: "Más conexión",
        support: "La experiencia se siente más cercana, más editorial y más especial.",
        variant: "message",
      },
    },
    {
      benefit: "Resultado: explorar se convierte en parte del antojo.",
      description:
        "Cuando descubrir una joya se siente elegante, la marca eleva su percepción completa.",
      label: "03 / 05",
      title: "Explorar también eleva la pieza",
      visual: {
        chips: ["Colección", "Piezas", "Historia"],
        headline: "Descubrir con calma",
        label: "Explorar",
        metric: "Más valor",
        support: "Descubrir también construye deseo y valor.",
        variant: "compare",
      },
    },
    {
      benefit: "Resultado: la marca sostiene mejor el precio que pide.",
      description:
        "Las piezas premium necesitan una presencia digital que no les reste valor.",
      label: "04 / 05",
      title: "La marca se ve al nivel de su joyería",
      visual: {
        chips: ["Prestigio", "Presencia", "Nivel"],
        headline: "A la altura",
        label: "Marca",
        metric: "Más credibilidad",
        support: "La presencia digital acompaña el nivel de la pieza.",
        variant: "bridge",
      },
    },
    {
      benefit: "Resultado: más intención, menos indecisión.",
      description:
        "Una mejor presentación no solo se ve bien: ayuda a que la decisión avance.",
      label: "05 / 05",
      title: "Del interés a la intención",
      visual: {
        chips: ["Interés", "Deseo", "Decisión"],
        headline: "Avanza",
        label: "Decisión",
        metric: "Más intención",
        support: "El interés encuentra un siguiente paso natural.",
        variant: "signal",
      },
    },
  ],
  context:
    "Una joya bien presentada no solo se ve mejor: hace que la marca se sienta más cuidada y más aspiracional desde el inicio.",
  eyebrow: "PRODUCTO / LUXURY EXPERIENCE",
  headlineLines: ["JoyaStudio.", "Una experiencia editorial para cada pieza."],
  id: "joyastudio",
  intro:
    "Una experiencia digital pensada para que cada pieza se perciba con más deseo, más valor y más intención de compra.",
  exploreHint: "Desliza para ver cómo una joya se presenta con más presencia.",
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
  theme: {
    accent: "#5c9c95",
    accentSoft: "rgba(92, 156, 149, 0.14)",
    accentStrong: "#346964",
  },
} as const satisfies ProductRevealSectionContent;
