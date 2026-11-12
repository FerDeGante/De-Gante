import { site } from "@/content/site";

type MethodStep = {
  letter: string;
  title: string;
  description: string;
  received: string;
};

type StackItem = {
  title: string;
  description: string;
  avoids: string;
  bonus?: boolean;
};

type Question = { question: string; answer: string };

export type ActaContent = {
  published: boolean;
  actaPreviaPrice: number | null;
  guardiaMeses: number | null;
  casoResultado: string | null;
  cedula: string | null;
  cobertura: string | null;
  factura: string | null;
  metadata: { title: string };
  brand: { name: string; method: string; edition: string };
  cta: { label: string; href: string };
  floatingCta: { label: string; accessibleLabel: string };
  navigation: {
    label: string;
    items: {
      label: string;
      href: string;
      icon: "home" | "globe" | "shield" | "question";
    }[];
  };
  labels: {
    skip: string;
    receives: string;
    avoids: string;
    bonus: string;
    illustration: string;
    matrix: string;
    matrixColumns: [string, string, string, string];
    before: string;
    after: string;
    priceFrom: string;
    currency: string;
  };
  urgency: string;
  hero: {
    eyebrow: string;
    headline: string;
    highlights: [string, string];
    subtitle: string;
    secondary: string;
    proof: string[];
    media: string;
  };
  audience: { yesTitle: string; yes: string[]; noTitle: string; no: string[] };
  cost: {
    title: string;
    accent: string;
    rangeFrom: string;
    rangeTo: string;
    minimum: number;
    maximum: number;
    explanation: string;
    lead: string;
    items: string[];
    closing: string;
  };
  comparison: {
    title: string;
    rows: { before: string; after: string }[];
    closing: string;
  };
  case: { title: string; measures: number; paragraphs: string[] };
  method: {
    id: string;
    title: string;
    steps: MethodStep[];
    matrixRow: [string, string, string, string];
  };
  timing: {
    title: string;
    items: { when: string; title: string; description: string }[];
    note: string;
  };
  tangible: {
    title: string;
    items: { title: string; description: string }[];
    note: string;
  };
  bio: { title: string; paragraphs: string[]; media: string };
  offer: {
    title: string;
    days: number;
    subtitle: string;
    items: StackItem[];
    guardTitle: string;
    guardYearTitle: string;
    guardDescription: string;
    guardAvoids: string;
  };
  guarantee: { title: string; months: string; year: string; closing: string };
  investment: {
    title: string;
    anchor: string;
    product: string;
    price: number;
    explanation: string;
    diagnostic: string;
    defense: string;
  };
  capacity: {
    title: string;
    description: string;
    closing: string;
    accent: string;
  };
  faq: {
    title: string;
    items: Question[];
    coverageQuestion: string;
    invoiceQuestion: string;
  };
  closing: { title: string; steps: string[]; note: string };
  legal: {
    name: string;
    role: string;
    location: string;
    disclaimer: string;
    privacy: string;
    privacyText: string;
  };
};

const whatsappNumber =
  site.contact.whatsappHref.match(/wa\.me\/(\d+)/)?.[1] ?? "527774937660";

export const acta: ActaContent = {
  published: false,
  actaPreviaPrice: null,
  guardiaMeses: null,
  casoResultado: null,
  cedula: null,
  cobertura: null,
  factura: null,
  metadata: { title: "Método ACTA · Fer De Gante" },
  brand: {
    name: "Fer De Gante",
    method: "Método ACTA",
    edition: "Morelos · 2026 / 2027",
  },
  cta: {
    label: "Escríbeme ACTA",
    href: `https://wa.me/${whatsappNumber}?text=ACTA`,
  },
  floatingCta: {
    label: "ACTA",
    accessibleLabel: "Escríbeme ACTA por WhatsApp",
  },
  navigation: {
    label: "Navegación del Método ACTA",
    items: [
      { label: "Inicio", href: "#acta-contenido", icon: "home" },
      { label: "Método", href: "#metodo", icon: "globe" },
      { label: "Blindaje", href: "#acta-blindaje", icon: "shield" },
      { label: "Preguntas", href: "#acta-preguntas", icon: "question" },
    ],
  },
  labels: {
    skip: "Ir al contenido",
    receives: "Recibes:",
    avoids: "Te evita:",
    bonus: "Bono",
    illustration: "Ejemplo ilustrativo",
    matrix: "Matriz de obligaciones",
    matrixColumns: ["Obligación", "Documento", "Responsable", "Fecha"],
    before: "Hoy",
    after: "Con el Método ACTA",
    priceFrom: "desde",
    currency: "MXN",
  },
  urgency:
    "¿Ya te dejaron un acta, te llegó una multa o te congelaron la cuenta? El plazo ya está corriendo.",
  hero: {
    eyebrow: "Abogado de empresas · STPS · IMSS · Infonavit",
    headline: "Que la autoridad no se lleve el dinero de tu empresa en multas.",
    highlights: ["no se lleve el dinero", "en multas"],
    subtitle:
      "Con el Método ACTA, cada obligación que te puede revisar la autoridad tiene su documento, con fecha real y con responsable. Antes de la inspección, para evitar la multa. Después, para reducirla o anularla.",
    secondary: "Ver cómo funciona ↓",
    proof: [
      "Litigo ante el Tribunal Federal de Justicia Administrativa",
      "Trabajo en tu planta, no desde un machote",
      "Lo laboral, con AEA Jurídico",
    ],
    media: "Video Fer 60–90 s",
  },
  audience: {
    yesTitle: "Esto es para ti si:",
    yes: [
      "Eres dueño o diriges una empresa de 20 a 150 trabajadores en Morelos.",
      "Ya te visitó la autoridad, te llegó una multa, o a un conocido le congelaron la cuenta y te dio el susto.",
      "Le pagas a tu gente lo que le toca, pero no tienes los papeles que lo prueban.",
    ],
    noTitle: "No es para ti si:",
    no: [
      "Buscas plantillas baratas para llenarlas tú.",
      'Quieres "arreglarte" con el inspector.',
      "Necesitas documentos con fecha hacia atrás. No los hago.",
    ],
  },
  cost: {
    title:
      "Una inspección no cuesta una multa. Cuesta todo lo que viene detrás.",
    accent: "detrás",
    rangeFrom: "De",
    rangeTo: "a",
    minimum: 29327,
    maximum: 586550,
    explanation:
      "por cada incumplimiento de seguridad e higiene (250 a 5,000 UMA, artículo 994 de la Ley Federal del Trabajo).",
    lead: "Y eso es solo el principio:",
    items: [
      "Una cuenta congelada que deja sin salir la nómina del viernes.",
      "Un accidente con un trabajador sin alta, y el IMSS te cobra lo que cuesta atenderlo.",
      "La segunda visita, que llega antes de que cierres la primera.",
    ],
    closing:
      'Casi siempre empieza con la misma frase: "A mí no me van a visitar".',
  },
  comparison: {
    title: "La diferencia no es cuánto pagas. Es cuándo te enteras.",
    rows: [
      {
        before: "Te enteras de lo que te falta el día que llega el inspector",
        after: "Sabes qué te observaría el inspector antes que él",
      },
      {
        before:
          "Tu contador lleva el IMSS y el SAT; las NOM se quedan sin dueño",
        after: "Cada NOM que te aplica tiene responsable y fecha",
      },
      {
        before:
          "Los formatos genéricos no traen tu giro, tus puestos ni tus fechas",
        after:
          "Cada documento se hace con tu planta, tus puestos y tus riesgos",
      },
      {
        before: "Buscas abogado cuando ya llegó la multa",
        after:
          "Si llega la multa, el expediente para defenderla ya está armado",
      },
    ],
    closing: "La mejor acta es la que levantas tú, antes que el inspector.",
  },
  case: {
    title: "61 medidas en una sola acta.",
    measures: 61,
    paragraphs: [
      'Una empresa de distribución en Morelos recibió una inspección de la Secretaría del Trabajo. El acta traía 61 medidas. En la visita, alguien firmó con la frase de siempre: "presentaremos la información".',
      "No les faltaba voluntad. Les faltaba un sistema.",
      "Convertimos el acta en una matriz: una fila por medida, con su documento, su responsable y su fecha. Pedimos una prórroga fundada y obtuvimos 25 días hábiles para construir lo que faltaba. Construí los 61 documentos, uno por medida.",
    ],
  },
  method: {
    id: "metodo",
    title: "El Método ACTA. Cuatro pasos, y el orden importa.",
    steps: [
      {
        letter: "A",
        title: "Auditar",
        description:
          "Recorro tu planta con tus jefes y operadores. Reviso tu empresa contra cada NOM y cada artículo de la Ley Federal del Trabajo que te aplica, no solo contra lo que dice un acta.",
        received:
          "la lista de lo que hoy te observaría el inspector, punto por punto.",
      },
      {
        letter: "C",
        title: "Construir",
        description:
          "Un documento por cada obligación, alineado a la NOM o al artículo que lo exige: diagnóstico de seguridad, análisis de riesgos, programas de mantenimiento, comisión de seguridad e higiene y sus recorridos, DC-3, contratos, reglamento.",
        received:
          "documentos hechos con tu planta, no copiados de otra empresa.",
      },
      {
        letter: "T",
        title: "Trazar",
        description:
          "Cada documento es una fila en una matriz: obligación, documento, responsable y fecha.",
        received: "sabes en todo momento qué tienes y qué falta.",
      },
      {
        letter: "A",
        title: "Acreditar",
        description:
          "Armo el expediente como lo pide la autoridad. Nada fechado hacia atrás.",
        received:
          "una carpeta que se le entrega al inspector y que aguanta hasta el Tribunal.",
      },
    ],
    matrixRow: [
      "NOM-017",
      "Análisis de riesgos por puesto",
      "Jefe de almacén",
      "15 ene 2027",
    ],
  },
  timing: {
    title: "El mismo método, en el momento en que estés.",
    items: [
      {
        when: "Antes",
        title: "No te ha llegado nada",
        description:
          "Levanto en tu planta el acta que levantaría el inspector, y construimos lo que falta. Es el Blindaje ACTA 30.",
      },
      {
        when: "Durante",
        title: "Ya te dejaron un acta",
        description:
          "Tienes cinco días hábiles. Contestamos punto por punto, con un documento por cada medida. Si los documentos dependen de un tercero, se puede pedir prórroga.",
      },
      {
        when: "Después",
        title: "Ya te multaron",
        description:
          "Reviso la resolución. Si está mal fundada, la impugno ante el Tribunal Federal de Justicia Administrativa. Si te congelaron la cuenta, empezamos por ahí.",
      },
    ],
    note: "La defensa ante STPS, IMSS, Infonavit o SAT se cotiza por caso. Estés donde estés, escríbeme ACTA y te digo por dónde empezar.",
  },
  tangible: {
    title: "Lo que recibes se puede tocar",
    items: [
      {
        title: "Matriz de obligaciones.",
        description:
          "Fila de ejemplo: NOM-017 · Análisis de riesgos por puesto · Jefe de almacén · 15 ene 2027.",
      },
      {
        title: "Análisis de riesgos.",
        description:
          "Por puesto: el riesgo que tiene y el equipo de protección asignado.",
      },
      {
        title: "Expediente ACTA.",
        description: "Ordenado como lo pide el acta, listo para entregar.",
      },
    ],
    note: "Ejemplos ilustrativos. Nunca uso datos de un cliente.",
  },
  bio: {
    title: "Soy Fer De Gante.",
    paragraphs: [
      "Soy abogado. Llevo los asuntos administrativos y fiscales de empresas ante la STPS, el IMSS, el Infonavit y el SAT, y litigo ante el Tribunal Federal de Justicia Administrativa.",
      "Hago el trabajo en tu planta, no desde un escritorio. Por eso sé qué te van a pedir antes de que te lo pidan.",
      "Lo laboral, la defensa del patrón frente a sus trabajadores, lo lleva mi aliado AEA Jurídico. Entre los dos, tu empresa queda cubierta.",
    ],
    media: "Foto en planta",
  },
  offer: {
    title: "Blindaje ACTA 30",
    days: 30,
    subtitle:
      "En 30 días, tu empresa tiene un documento para cada obligación que le revisa la autoridad. Tú firmas y asignas responsables. Lo demás lo hago yo.",
    items: [
      {
        title: "Acta Previa en tu planta.",
        description:
          "Levanto el acta que levantaría el inspector, en seguridad e higiene y en condiciones generales.",
        avoids: "enterarte de lo que te falta el día que llega el inspector.",
      },
      {
        title: "Expediente ACTA completo.",
        description:
          "Todos los documentos que te aplican, construidos y firmados.",
        avoids: "multas de hasta $586,550 por cada incumplimiento.",
      },
      {
        title: "Matriz de obligaciones.",
        description: "Cada obligación con su responsable y su fecha.",
        avoids:
          "que se te pase un recorrido, un simulacro o una constancia de capacitación.",
      },
      {
        title: "Protocolo del día de la visita.",
        description:
          "Una guía de una página para quien recibe al inspector: qué hacer, qué firmar y qué no decir. Y mi teléfono directo ese día.",
        avoids: "que alguien firme o declare algo que no debía.",
        bonus: true,
      },
      {
        title: "Calendario 2027 de obligaciones.",
        description:
          "Recorridos, simulacros, capacitaciones, PTU en mayo y aguinaldo en diciembre, cada fecha con su documento.",
        avoids: "multas por fechas que se pasaron.",
        bonus: true,
      },
    ],
    guardTitle: "Guardia de {guardiaMeses} meses.",
    guardYearTitle: "Guardia durante el año siguiente.",
    guardDescription:
      "Si llega una inspección, contesto el acta dentro de los cinco días hábiles sin costo adicional.",
    guardAvoids: "pagar aparte la contestación.",
  },
  guarantee: {
    title: "Garantía de punto cubierto",
    months:
      "Si en los {guardiaMeses} meses siguientes la autoridad te observa un punto que estaba dentro de tu Blindaje, corrijo el documento y contesto el acta sin costo.",
    year: "Si durante el año siguiente la autoridad te observa un punto que estaba dentro de tu Blindaje, corrijo el documento y contesto el acta sin costo.",
    closing:
      "No te prometo que la autoridad no te visite. Eso no lo decide nadie más que ella. Te garantizo lo que sí depende de mí: mi trabajo.",
  },
  investment: {
    title: "Lo que inviertes",
    anchor: "Una sola multa de seguridad e higiene puede pasar de $500,000.",
    product: "Blindaje ACTA 30,",
    price: 65000,
    explanation:
      "El precio final depende del número de trabajadores y del giro, y lo sabes antes de firmar.",
    diagnostic:
      "¿Prefieres empezar por el diagnóstico? La Acta Previa cuesta {actaPreviaPrice} y se acredita completa si firmas el Blindaje en los siguientes 15 días.",
    defense: "Defensa: ante STPS, IMSS, Infonavit o SAT, se cotiza por caso.",
  },
  capacity: {
    title: "Tomo 4 empresas al mes.",
    description:
      "Cada Blindaje empieza con una visita a tu planta, y esa visita la hago yo. Por eso no son más.",
    closing:
      "Cierra 2026 sin pendientes con la autoridad. Los lugares de diciembre son para empezar 2027 blindado.",
    accent: "blindado",
  },
  faq: {
    title: "Preguntas",
    items: [
      {
        question: "¿Esto no lo ve mi contador?",
        answer:
          "Tu contador lleva el IMSS y el SAT, y está bien que así sea. Las NOM de seguridad e higiene y las obligaciones de la Ley Federal del Trabajo son otro terreno. Trabajo con él, no en su lugar.",
      },
      {
        question: "¿Y si a mí nunca me visitan?",
        answer:
          "Entonces tendrás tu empresa en orden y una carpeta que no usaste. La visita puede llegar por programa, por la queja de un trabajador o por un accidente, y ninguna avisa.",
      },
      {
        question: "Ya me multaron. ¿Todavía se puede hacer algo?",
        answer:
          "Depende de la fecha en que te notificaron. Para demandar la nulidad ante el Tribunal hay un plazo general de 30 días hábiles. Escríbeme con esa fecha.",
      },
      {
        question: "¿Me puedes hacer los documentos con fecha anterior?",
        answer:
          "No. Un documento con fecha hacia atrás se cae ante el inspector y ante el Tribunal, y te deja peor que sin documento. Todo se fecha el día que se hace.",
      },
      {
        question: "Ya tengo algunos documentos. ¿Se pierden?",
        answer:
          "No. Se revisan en la auditoría: lo que sirve se queda y lo que no cumple se corrige.",
      },
      {
        question: "¿Cuánto tiempo me toma a mí?",
        answer:
          "El recorrido por la planta con tus jefes de área y la firma de los documentos. Necesito a una persona que asigne responsables.",
      },
    ],
    coverageQuestion: "¿Trabajas fuera de Morelos?",
    invoiceQuestion: "¿Facturas?",
  },
  closing: {
    title: "Así empezamos.",
    steps: [
      "Me escribes ACTA por WhatsApp.",
      "Hablamos 20 minutos: cuántos trabajadores tienes, qué te revisarían y qué arriesgas.",
      "Levanto la Acta Previa en tu planta.",
      "Firmamos tu Blindaje ACTA 30.",
    ],
    note: "Si ya tienes un acta o una multa, dímelo en el primer mensaje y empezamos por ahí.",
  },
  legal: {
    name: "Fernando De Gante",
    role: "Abogado",
    location: "Cuernavaca, Morelos",
    disclaimer:
      "Los resultados dependen de cada caso y de la resolución de la autoridad. Los casos mostrados son reales y no garantizan un resultado igual.",
    privacy: "Aviso de privacidad",
    privacyText:
      "El contacto de esta página se realiza por WhatsApp. La información que compartas con Fernando De Gante se utiliza para atender tu consulta. Puedes solicitar información sobre el tratamiento de tus datos por ese mismo medio.",
  },
};

export const formatMxn = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export function guardiaCopy(template: string): string {
  return template.replace("{guardiaMeses}", String(acta.guardiaMeses));
}

export function getActaStack(): StackItem[] {
  return [
    ...acta.offer.items,
    {
      title:
        acta.guardiaMeses === null
          ? acta.offer.guardYearTitle
          : guardiaCopy(acta.offer.guardTitle),
      description: acta.offer.guardDescription,
      avoids: acta.offer.guardAvoids,
      bonus: true,
    },
  ];
}

export function getActaQuestions(): Question[] {
  return [
    ...acta.faq.items,
    ...(acta.cobertura === null
      ? []
      : [{ question: acta.faq.coverageQuestion, answer: acta.cobertura }]),
    ...(acta.factura === null
      ? []
      : [{ question: acta.faq.invoiceQuestion, answer: acta.factura }]),
  ];
}
