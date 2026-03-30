import { prisma } from "@/lib/db";
import { findOrCreateLead, updateLeadStatus } from "./leads";
import { logContactEvent } from "./events";

type DiagnosticAnswers = {
  bottleneck: string;
  structure: string;
  dependency: string;
};

type OutcomeKey =
  | "Presencia sin sistema"
  | "Demanda sin estructura"
  | "Seguimiento con fricción"
  | "Operación dependiente del fundador"
  | "Base sólida, pero sin motor de escalamiento";

type DiagnosticResult = {
  key: string;
  title: string;
  summary: string;
  nextStep: string;
};

const outcomeCopy: Record<OutcomeKey, { title: string; summary: string; nextStep: string }> = {
  "Presencia sin sistema": {
    title: "Presencia sin sistema",
    summary:
      "Hoy hay visibilidad, pero todavía no hay una capa de sistema que la convierta en avance comercial medible.",
    nextStep:
      "Convertir presencia digital en una arquitectura comercial mínima: captura, calificación y seguimiento.",
  },
  "Demanda sin estructura": {
    title: "Demanda sin estructura",
    summary:
      "Tu reto principal no es generar más ruido; es volver predecible la entrada de oportunidades.",
    nextStep:
      "Construir una entrada de demanda repetible con criterios, filtro y seguimiento disciplinado.",
  },
  "Seguimiento con fricción": {
    title: "Seguimiento con fricción",
    summary:
      "La fuga está entre el interés y la decisión. Ahí se está perdiendo velocidad y energía comercial.",
    nextStep:
      "Ordenar el pipeline, los tiempos de respuesta y las automatizaciones críticas que sostienen el cierre.",
  },
  "Operación dependiente del fundador": {
    title: "Operación dependiente del fundador",
    summary:
      "La operación sigue demasiado centralizada en ti. Eso limita la escala y vuelve frágil el crecimiento.",
    nextStep:
      "Reducir la dependencia operativa con procesos, roles y automatización mínima donde sí aporta.",
  },
  "Base sólida, pero sin motor de escalamiento": {
    title: "Base sólida, pero sin motor de escalamiento",
    summary:
      "Ya existe base. El siguiente salto no es más piezas sueltas; es una infraestructura más integrada.",
    nextStep:
      "Conectar datos, seguimiento y operación en un motor único con reglas claras y visibilidad ejecutiva.",
  },
};

const outcomePriority: OutcomeKey[] = [
  "Operación dependiente del fundador",
  "Seguimiento con fricción",
  "Demanda sin estructura",
  "Presencia sin sistema",
  "Base sólida, pero sin motor de escalamiento",
];

const scoring: Record<string, Record<string, Partial<Record<OutcomeKey, number>>>> = {
  bottleneck: {
    "demand-consistency": { "Demanda sin estructura": 3, "Presencia sin sistema": 1 },
    conversion: { "Seguimiento con fricción": 3, "Base sólida, pero sin motor de escalamiento": 1 },
    "follow-up": { "Operación dependiente del fundador": 2, "Seguimiento con fricción": 2 },
    operations: { "Base sólida, pero sin motor de escalamiento": 3, "Presencia sin sistema": 1 },
  },
  structure: {
    "presence-only": { "Presencia sin sistema": 3 },
    "disconnected-tools": { "Seguimiento con fricción": 2, "Operación dependiente del fundador": 1 },
    "partial-processes": { "Base sólida, pero sin motor de escalamiento": 2, "Seguimiento con fricción": 1 },
    "ready-to-scale": { "Base sólida, pero sin motor de escalamiento": 3 },
  },
  dependency: {
    "high-dependency": { "Operación dependiente del fundador": 3 },
    "team-but-dependent": { "Operación dependiente del fundador": 2, "Seguimiento con fricción": 1 },
    "functional-but-not-systematic": { "Base sólida, pero sin motor de escalamiento": 3 },
    "scale-with-control": { "Base sólida, pero sin motor de escalamiento": 2, "Seguimiento con fricción": 1 },
  },
};

export function calculateDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult {
  const scores: Record<OutcomeKey, number> = {
    "Base sólida, pero sin motor de escalamiento": 0,
    "Demanda sin estructura": 0,
    "Operación dependiente del fundador": 0,
    "Presencia sin sistema": 0,
    "Seguimiento con fricción": 0,
  };

  for (const [questionId, optionId] of Object.entries(answers)) {
    const bucket = scoring[questionId]?.[optionId];
    if (!bucket) continue;
    for (const [outcomeKey, points] of Object.entries(bucket)) {
      scores[outcomeKey as OutcomeKey] += points ?? 0;
    }
  }

  const winner = outcomePriority.reduce((best, key) =>
    scores[key] > scores[best] ? key : best,
    outcomePriority[0],
  );

  const copy = outcomeCopy[winner];
  return {
    key: winner,
    title: copy.title,
    summary: copy.summary,
    nextStep: copy.nextStep,
  };
}

function qualificationFromResult(resultKey: string): number {
  const levels: Record<string, number> = {
    "Base sólida, pero sin motor de escalamiento": 5,
    "Seguimiento con fricción": 4,
    "Operación dependiente del fundador": 3,
    "Demanda sin estructura": 2,
    "Presencia sin sistema": 1,
  };
  return levels[resultKey] ?? 0;
}

type SubmitDiagnosticInput = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  answers: DiagnosticAnswers;
};

export async function submitDiagnostic(input: SubmitDiagnosticInput) {
  const result = calculateDiagnosticResult(input.answers);

  const lead = await findOrCreateLead({
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    company: input.company,
    source: "diagnostic",
  });

  const submission = await prisma.diagnosticSubmission.create({
    data: {
      leadId: lead.id,
      answersJson: input.answers,
      resultKey: result.key,
      resultTitle: result.title,
      summary: result.summary,
      recommendedNextStep: result.nextStep,
    },
  });

  await updateLeadStatus(lead.id, "diagnosed");

  await prisma.lead.update({
    where: { id: lead.id },
    data: { qualificationLevel: qualificationFromResult(result.key) },
  });

  await logContactEvent({
    leadId: lead.id,
    type: "diagnostic_submitted",
    channel: "web",
    payload: { submissionId: submission.id, resultKey: result.key },
  });

  await prisma.followUpTask.create({
    data: {
      leadId: lead.id,
      title: `Revisar diagnóstico: ${result.title}`,
      description: `Lead ${lead.fullName} completó el diagnóstico. Resultado: ${result.key}. Siguiente paso sugerido: ${result.nextStep}`,
      dueAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "pending",
    },
  });

  return { leadId: lead.id, result };
}
