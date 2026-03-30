"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

type Stage = 0 | 1 | 2 | "capture" | "result";

type OutcomeKey =
  | "Presencia sin sistema"
  | "Demanda sin estructura"
  | "Seguimiento con fricción"
  | "Operación dependiente del fundador"
  | "Base sólida, pero sin motor de escalamiento";

type DiagnosticAnswers = {
  bottleneck: string;
  dependency: string;
  structure: string;
};

type DiagnosticLead = {
  company: string;
  email: string;
  name: string;
  phone: string;
};

type DiagnosticOutcome = {
  category: OutcomeKey;
  nextStep: string;
  tension: string;
};

export type DiagnosticSubmission = {
  answers: DiagnosticAnswers;
  lead: DiagnosticLead;
  outcome: DiagnosticOutcome;
};

type BriefDiagnosticProps = {
  onSubmit?: (payload: DiagnosticSubmission) => void | Promise<void>;
};

type DiagnosticOption = {
  id: string;
  label: string;
  note: string;
};

type DiagnosticQuestion = {
  id: keyof DiagnosticAnswers;
  label: string;
  options: DiagnosticOption[];
  title: string;
};

const HEADLINE_GRADIENT =
  "linear-gradient(92deg, #e6fbff 0%, #02abf3 26%, #10a2c7 52%, #097693 76%, #dff9ff 100%)";

const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "bottleneck",
    label: "Lo que más te cuesta hoy",
    title: "¿Hoy qué es lo que más te cuesta sacar adelante en tu negocio?",
    options: [
      {
        id: "demand-consistency",
        label: "Conseguir clientes nuevos de forma constante",
        note: "Hay semanas buenas, pero no siento un flujo estable.",
      },
      {
        id: "conversion",
        label: "Dar seguimiento sin que se me vayan oportunidades",
        note: "Sí llegan interesados, pero se enfrían o se pierden.",
      },
      {
        id: "operations",
        label: "Tener orden entre mensajes, herramientas y procesos",
        note: "Hay movimiento, pero todo está medio regado.",
      },
      {
        id: "follow-up",
        label: "Dejar de estar yo encima de todo",
        note: "Si yo no empujo, las cosas no avanzan como deberían.",
      },
    ],
  },
  {
    id: "structure",
    label: "Cómo operas hoy",
    title: "Cuando alguien te escribe o te pide informes, ¿qué pasa normalmente?",
    options: [
      {
        id: "presence-only",
        label: "Contestamos, pero casi todo se lleva de forma manual",
        note: "WhatsApp, llamadas, notas y seguimiento dependen demasiado del momento.",
      },
      {
        id: "disconnected-tools",
        label: "Usamos varias herramientas, pero no trabajan juntas",
        note: "Hay piezas, pero no un sistema claro.",
      },
      {
        id: "partial-processes",
        label: "Sí tenemos proceso, pero cuesta ver qué está funcionando",
        note: "Hay esfuerzo, pero poca claridad para decidir.",
      },
      {
        id: "ready-to-scale",
        label: "Ya tenemos una base, pero queremos escalar mejor",
        note: "No estamos empezando: queremos más estructura y control.",
      },
    ],
  },
  {
    id: "dependency",
    label: "Qué tanto depende de ti",
    title: "Si te desconectaras unos días, ¿qué tanto se frenaría el negocio?",
    options: [
      {
        id: "high-dependency",
        label: "Muchísimo; casi todo pasa por mí",
        note: "La operación sigue muy pegada a mi presencia.",
      },
      {
        id: "team-but-dependent",
        label: "Mi equipo avanza, pero me siguen necesitando para destrabar",
        note: "No estoy en todo, pero sigo siendo cuello de botella.",
      },
      {
        id: "functional-but-not-systematic",
        label: "La operación sigue, pero el crecimiento no camina solo",
        note: "Se mantiene, pero no escala con consistencia.",
      },
      {
        id: "scale-with-control",
        label: "Opera bastante bien; ahora quiero crecer con más control",
        note: "Ya hay base, pero falta un sistema más serio.",
      },
    ],
  },
];

const outcomeCopy: Record<OutcomeKey, DiagnosticOutcome> = {
  "Presencia sin sistema": {
    category: "Presencia sin sistema",
    nextStep:
      "Convertir presencia digital en una arquitectura comercial mínima: captura, calificación y seguimiento.",
    tension:
      "Hoy hay visibilidad, pero todavía no hay una capa de sistema que la convierta en avance comercial medible.",
  },
  "Demanda sin estructura": {
    category: "Demanda sin estructura",
    nextStep:
      "Construir una entrada de demanda repetible con criterios, filtro y seguimiento disciplinado.",
    tension:
      "Tu reto principal no es generar más ruido; es volver predecible la entrada de oportunidades.",
  },
  "Seguimiento con fricción": {
    category: "Seguimiento con fricción",
    nextStep:
      "Ordenar el pipeline, los tiempos de respuesta y las automatizaciones críticas que sostienen el cierre.",
    tension:
      "La fuga está entre el interés y la decisión. Ahí se está perdiendo velocidad y energía comercial.",
  },
  "Operación dependiente del fundador": {
    category: "Operación dependiente del fundador",
    nextStep:
      "Reducir la dependencia operativa con procesos, roles y automatización mínima donde sí aporta.",
    tension:
      "La operación sigue demasiado centralizada en ti. Eso limita la escala y vuelve frágil el crecimiento.",
  },
  "Base sólida, pero sin motor de escalamiento": {
    category: "Base sólida, pero sin motor de escalamiento",
    nextStep:
      "Conectar datos, seguimiento y operación en un motor único con reglas claras y visibilidad ejecutiva.",
    tension:
      "Ya existe base. El siguiente salto no es más piezas sueltas; es una infraestructura más integrada.",
  },
};

const outcomePriority: OutcomeKey[] = [
  "Operación dependiente del fundador",
  "Seguimiento con fricción",
  "Demanda sin estructura",
  "Presencia sin sistema",
  "Base sólida, pero sin motor de escalamiento",
];

const scoring: Record<
  keyof DiagnosticAnswers,
  Record<string, Partial<Record<OutcomeKey, number>>>
> = {
  bottleneck: {
    "demand-consistency": {
      "Demanda sin estructura": 3,
      "Presencia sin sistema": 1,
    },
    conversion: {
      "Seguimiento con fricción": 3,
      "Base sólida, pero sin motor de escalamiento": 1,
    },
    "follow-up": {
      "Operación dependiente del fundador": 2,
      "Seguimiento con fricción": 2,
    },
    operations: {
      "Base sólida, pero sin motor de escalamiento": 3,
      "Presencia sin sistema": 1,
    },
  },
  structure: {
    "presence-only": {
      "Presencia sin sistema": 3,
    },
    "disconnected-tools": {
      "Seguimiento con fricción": 2,
      "Operación dependiente del fundador": 1,
    },
    "partial-processes": {
      "Base sólida, pero sin motor de escalamiento": 2,
      "Seguimiento con fricción": 1,
    },
    "ready-to-scale": {
      "Base sólida, pero sin motor de escalamiento": 3,
    },
  },
  dependency: {
    "high-dependency": {
      "Operación dependiente del fundador": 3,
    },
    "team-but-dependent": {
      "Operación dependiente del fundador": 2,
      "Seguimiento con fricción": 1,
    },
    "functional-but-not-systematic": {
      "Base sólida, pero sin motor de escalamiento": 3,
    },
    "scale-with-control": {
      "Base sólida, pero sin motor de escalamiento": 2,
      "Seguimiento con fricción": 1,
    },
  },
};

const emptyAnswers: DiagnosticAnswers = {
  bottleneck: "",
  dependency: "",
  structure: "",
};

const emptyLead: DiagnosticLead = {
  company: "",
  email: "",
  name: "",
  phone: "",
};

const fieldClass =
  "h-12 w-full rounded-[1rem] border border-[color:var(--line)] bg-white/80 px-4 text-sm text-[color:var(--text)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/15";

function calculateOutcome(answers: DiagnosticAnswers): DiagnosticOutcome {
  const scores: Record<OutcomeKey, number> = {
    "Base sólida, pero sin motor de escalamiento": 0,
    "Demanda sin estructura": 0,
    "Operación dependiente del fundador": 0,
    "Presencia sin sistema": 0,
    "Seguimiento con fricción": 0,
  };

  (Object.keys(answers) as Array<keyof DiagnosticAnswers>).forEach((questionId) => {
    const optionId = answers[questionId];
    const bucket = scoring[questionId][optionId];

    if (!bucket) {
      return;
    }

    Object.entries(bucket).forEach(([outcomeKey, points]) => {
      scores[outcomeKey as OutcomeKey] += points ?? 0;
    });
  });

  const category = outcomePriority.reduce((currentBest, outcomeKey) => {
    if (scores[outcomeKey] > scores[currentBest]) {
      return outcomeKey;
    }

    return currentBest;
  }, outcomePriority[0]);

  return outcomeCopy[category];
}

function formatAnswerLabel(questionId: keyof DiagnosticAnswers, optionId: string) {
  const question = diagnosticQuestions.find((item) => item.id === questionId);
  return question?.options.find((option) => option.id === optionId)?.label ?? "";
}

export function buildDiagnosticWhatsAppLink(payload: DiagnosticSubmission) {
  const answerLines = diagnosticQuestions
    .map((question) => {
      const value = formatAnswerLabel(question.id, payload.answers[question.id]);
      return value ? `${question.label}: ${value}` : null;
    })
    .filter((line): line is string => Boolean(line));

  const messageLines = [
    "Hola Fernando, te comparto mi diagnóstico:",
    "",
    `Nombre: ${payload.lead.name}`,
    `Correo: ${payload.lead.email}`,
    `WhatsApp: ${payload.lead.phone}`,
    `Empresa: ${payload.lead.company || "No proporcionada"}`,
    "",
    `Resultado: ${payload.outcome.category}`,
    `Lectura: ${payload.outcome.tension}`,
    `Siguiente paso: ${payload.outcome.nextStep}`,
    "",
    "Respuestas:",
    ...answerLines.map((line) => `- ${line}`),
  ];

  return `${site.contact.whatsappHref}?text=${encodeURIComponent(messageLines.join("\n"))}`;
}

function QuestionProgress({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--line)]/70 bg-white/85 px-4 py-3 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-2">
        {Array.from({ length: 4 }, (_, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;

          return (
            <span
              key={index}
              aria-hidden="true"
              className={cn(
                "block rounded-full transition-all duration-300 ease-out",
                isActive
                  ? "h-2.5 w-12 bg-[color:var(--text)]"
                  : isCompleted
                    ? "h-2.5 w-2.5 bg-[color:var(--text)]/55"
                    : "h-2.5 w-2.5 bg-[color:var(--line)]",
              )}
            />
          );
        })}
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[color:var(--muted)]">
        Paso {String(activeIndex + 1).padStart(2, "0")} / 04
      </span>
    </div>
  );
}

function ChoiceCard({
  active,
  description,
  index,
  onClick,
  title,
}: {
  active: boolean;
  description: string;
  index: number;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "group flex h-full min-h-[10rem] flex-col justify-between rounded-[1.75rem] border p-5 text-left transition duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
        active
          ? "border-[color:var(--accent)] bg-[linear-gradient(180deg,rgba(16,162,199,0.09),rgba(255,255,255,0.98))] shadow-[0_18px_40px_rgba(16,162,199,0.12)]"
          : "border-[color:var(--line)]/75 bg-white/80 hover:border-[color:var(--accent)]/45 hover:bg-white",
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[0.98rem] font-medium leading-6 text-[color:var(--text)]">
          {title}
        </span>
        <span
          className={cn(
            "mt-0.5 inline-flex size-7 items-center justify-center rounded-full border text-[10px] font-semibold transition",
            active
              ? "border-[color:var(--accent)] bg-[color:var(--accent)] text-white"
              : "border-[color:var(--line)]/80 bg-white text-[color:var(--muted)]",
          )}
        >
          {active ? "✓" : String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{description}</p>
    </button>
  );
}

function SummaryChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[color:var(--line)]/80 bg-white px-3 py-1.5 text-xs font-medium text-[color:var(--text)]">
      {label}: {value}
    </span>
  );
}

export function BriefDiagnostic({ onSubmit }: BriefDiagnosticProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [titleActivated, setTitleActivated] = useState(false);
  const [stage, setStage] = useState<Stage>(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>(emptyAnswers);
  const [lead, setLead] = useState<DiagnosticLead>(emptyLead);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const updateTitleState = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const revealOffset = window.innerWidth >= 1024 ? 168 : 112;
      const revealPoint = sectionTop - revealOffset;

      setTitleActivated(window.scrollY >= revealPoint);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateTitleState);
    };

    updateTitleState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const outcome = calculateOutcome(answers);
  const isQuestionStage = typeof stage === "number";
  const activeQuestionIndex = isQuestionStage ? stage : 2;
  const currentQuestion = isQuestionStage ? diagnosticQuestions[activeQuestionIndex] : null;
  const question = diagnosticQuestions[activeQuestionIndex];
  const activeMeterIndex = stage === "capture" || stage === "result" ? 3 : activeQuestionIndex;

  const selectedAnswers = useMemo(
    () =>
      diagnosticQuestions
        .map((question) => {
          const optionId = answers[question.id];

          if (!optionId) {
            return null;
          }

          return {
            label: question.label,
            value: formatAnswerLabel(question.id, optionId),
          };
        })
        .filter((entry): entry is { label: string; value: string } => Boolean(entry)),
    [answers],
  );

  const titleFillStyle = useMemo<CSSProperties>(
    () => ({
      backgroundImage: `${HEADLINE_GRADIENT}, linear-gradient(90deg, #17212b, #17212b)`,
      backgroundPosition: "0% 50%, 0% 50%",
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundSize: titleActivated ? "100% 100%, 100% 100%" : "0% 100%, 100% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      transition:
        "background-size 700ms cubic-bezier(0.22, 1, 0.36, 1), background-position 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "background-size, background-position",
    }),
    [titleActivated],
  );

  const bodyLabel =
    stage === "result"
      ? "Lectura ejecutiva"
      : stage === "capture"
        ? "Captura final"
        : currentQuestion?.label ?? "Diagnóstico breve";

  const bodyTitle =
    stage === "result"
      ? outcome.category
      : stage === "capture"
        ? "Desbloquea tu diagnóstico"
        : currentQuestion?.title ?? "";

  const bodyCopy =
    stage === "result"
      ? outcome.tension
      : stage === "capture"
        ? "Déjame tus datos y te muestro una lectura breve de lo que hoy más está frenando tu crecimiento."
        : isQuestionStage
          ? [
              "No buscamos una respuesta técnica. Solo entender qué parte del negocio te está costando más trabajo hoy.",
              "Queremos ver si hoy ya existe un proceso claro o si todo sigue dependiendo de herramientas sueltas.",
              "Aquí medimos qué tanto puede avanzar tu negocio sin que tú tengas que estar encima de todo.",
            ][activeQuestionIndex]
          : "";

  function handleAnswer(questionId: keyof DiagnosticAnswers, optionId: string) {
    setSubmitError(null);
    setAnswers((current) => ({
      ...current,
      [questionId]: optionId,
    }));

    setStage(activeQuestionIndex === 2 ? "capture" : ((activeQuestionIndex + 1) as 0 | 1 | 2));
  }

  function handleCaptureSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    if (
      !lead.name.trim() ||
      !lead.email.trim() ||
      !lead.phone.trim() ||
      !lead.email.includes("@")
    ) {
      setSubmitError("Completa nombre, correo y WhatsApp para desbloquear el diagnóstico.");
      return;
    }

    const payload: DiagnosticSubmission = {
      answers,
      lead: {
        company: lead.company.trim(),
        email: lead.email.trim(),
        name: lead.name.trim(),
        phone: lead.phone.trim(),
      },
      outcome,
    };

    setStage("result");

    if (onSubmit) {
      void Promise.resolve(onSubmit(payload)).catch(() => {
        setSubmitError(
          "El diagnóstico ya quedó calculado en pantalla, pero no se pudo enviar aún.",
        );
      });
    }
  }

  return (
    <section
      id="diagnostico"
      ref={sectionRef}
      className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(16,162,199,0.11),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(9,118,147,0.08),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(19,59,75,0.05),transparent_28%)]" />
      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[clamp(2.2rem,4.8vw,3.8rem)] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,241,0.95)_100%)] shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(16,162,199,0.42),transparent)]" />

            <div className="grid gap-6 px-6 py-7 sm:px-8 sm:py-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:px-10 lg:py-10">
              <div className="max-w-5xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
                  Diagnóstico breve
                </p>
                <div className="relative mt-3 max-w-5xl">
                  <h2
                    className="font-display max-w-5xl text-balance text-[clamp(2.15rem,4.9vw,5.1rem)] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[clamp(2.55rem,4.5vw,5.35rem)]"
                    style={titleFillStyle}
                  >
                    Antes de agendar, entendamos dónde está la fricción.
                  </h2>
                </div>
                <p className="mt-5 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted)] sm:text-lg sm:leading-8">
                  Un filtro corto para leer tu situación con criterio y devolverte una dirección
                  útil, no un formulario genérico.
                </p>
              </div>

              <div className="flex flex-col items-start lg:items-end lg:pt-1">
                <QuestionProgress activeIndex={activeMeterIndex} />
              </div>
            </div>

            <div className="border-t border-[color:var(--line)]/60 px-6 pb-6 pt-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                <div className="max-w-xl">
                  <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
                    {bodyLabel}
                  </p>
                  <h3 className="font-display mt-3 text-[clamp(1.9rem,3.6vw,3.15rem)] font-semibold tracking-[-0.06em] text-[color:var(--text)]">
                    {bodyTitle}
                  </h3>
                  <p className="mt-4 text-pretty text-base leading-7 text-[color:var(--muted)] sm:text-lg sm:leading-8">
                    {bodyCopy}
                  </p>

                  {stage === "capture" || stage === "result" ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {selectedAnswers.map((entry) => (
                        <SummaryChip key={entry.label} label={entry.label} value={entry.value} />
                      ))}
                    </div>
                  ) : null}

                  {stage === "result" ? (
                    <div className="mt-6 rounded-[1.5rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(16,162,199,0.06),rgba(255,255,255,0.96))] p-4">
                      <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
                        Categoría detectada
                      </p>
                      <p className="font-display mt-2 text-2xl font-semibold tracking-[-0.05em] text-[color:var(--text)]">
                        {outcome.category}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div>
                  {isQuestionStage ? (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {question.options.map((option, index) => (
                        <ChoiceCard
                          key={option.id}
                          active={answers[question.id] === option.id}
                          description={option.note}
                          index={index}
                          title={option.label}
                          onClick={() => handleAnswer(question.id, option.id)}
                        />
                      ))}
                    </div>
                  ) : stage === "capture" ? (
                    <form className="space-y-5" onSubmit={handleCaptureSubmit}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                          <span>Nombre</span>
                          <input
                            autoComplete="given-name"
                            className={fieldClass}
                            placeholder="Tu nombre"
                            required
                            value={lead.name}
                            onChange={(event) =>
                              setLead((current) => ({ ...current, name: event.target.value }))
                            }
                          />
                        </label>

                        <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                          <span>Correo</span>
                          <input
                            autoComplete="email"
                            className={fieldClass}
                            placeholder="nombre@empresa.com"
                            required
                            type="email"
                            value={lead.email}
                            onChange={(event) =>
                              setLead((current) => ({ ...current, email: event.target.value }))
                            }
                          />
                        </label>

                        <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                          <span>WhatsApp / teléfono</span>
                          <input
                            autoComplete="tel"
                            className={fieldClass}
                            placeholder="+52 55 0000 0000"
                            required
                            type="tel"
                            value={lead.phone}
                            onChange={(event) =>
                              setLead((current) => ({ ...current, phone: event.target.value }))
                            }
                          />
                        </label>

                        <label className="space-y-2 text-sm font-medium text-[color:var(--text)] sm:col-span-2">
                          <span>
                            Empresa{" "}
                            <span className="font-normal text-[color:var(--muted)]">(opcional)</span>
                          </span>
                          <input
                            autoComplete="organization"
                            className={fieldClass}
                            placeholder="Nombre de tu empresa"
                            value={lead.company}
                            onChange={(event) =>
                              setLead((current) => ({ ...current, company: event.target.value }))
                            }
                          />
                        </label>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button type="submit" variant="secondary">
                          Desbloquear mi diagnóstico
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => setStage(2)}>
                          Volver a respuestas
                        </Button>
                      </div>

                      {submitError ? (
                        <p className="text-sm leading-6 text-red-600">{submitError}</p>
                      ) : null}
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="rounded-[1.75rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(16,162,199,0.06),rgba(255,255,255,0.97))] p-5 sm:p-6">
                        <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
                          Siguiente paso recomendado
                        </p>
                        <p className="mt-3 text-base leading-7 text-[color:var(--text)]">
                          {outcome.nextStep}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Button href={site.actions.primary.href} variant="primary">
                          {site.actions.primary.label}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => setStage(2)}>
                          Editar respuestas
                        </Button>
                      </div>

                      {submitError ? (
                        <p className="text-sm leading-6 text-red-600">{submitError}</p>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
