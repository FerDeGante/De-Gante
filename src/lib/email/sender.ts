import { prisma } from "@/lib/db";
import { buildDiagnosticEmail, buildAppointmentEmail, buildInternalLeadAlert } from "./templates";
import { transport } from "./transport";

type DiagnosticConfirmationInput = {
  to: string;
  leadName: string;
  result: { key: string; title: string; summary: string; nextStep: string };
};

type AppointmentConfirmationInput = {
  to: string;
  leadName: string;
  preferredDate?: string;
  preferredTime?: string;
};

type InternalAlertInput = {
  leadName: string;
  email: string;
  source: string;
  resultKey?: string;
};

async function logMessage(leadEmail: string, templateKey: string, contentPreview: string) {
  const lead = await prisma.lead.findUnique({ where: { email: leadEmail } });
  if (!lead) return;

  await prisma.messageLog.create({
    data: {
      leadId: lead.id,
      channel: "email",
      direction: "outbound",
      templateKey,
      contentPreview: contentPreview.slice(0, 200),
      deliveryStatus: "queued",
    },
  });
}

export async function sendDiagnosticConfirmation(input: DiagnosticConfirmationInput) {
  const { subject, html, text } = buildDiagnosticEmail(input);

  await logMessage(input.to, "diagnostic_confirmation", subject);

  await transport.send({
    to: input.to,
    subject,
    html,
    text,
  });
}

export async function sendAppointmentConfirmation(input: AppointmentConfirmationInput) {
  const { subject, html, text } = buildAppointmentEmail(input);

  await logMessage(input.to, "appointment_confirmation", subject);

  await transport.send({
    to: input.to,
    subject,
    html,
    text,
  });
}

export async function notifyNewLead(input: InternalAlertInput) {
  const internalEmail = process.env.INTERNAL_ALERT_EMAIL;
  if (!internalEmail) return;

  const { subject, html, text } = buildInternalLeadAlert(input);

  await transport.send({
    to: internalEmail,
    subject,
    html,
    text,
  });
}
