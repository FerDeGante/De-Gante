import { prisma } from "@/lib/db";
import { site } from "@/content/site";
import { getMessagingAdapter } from "./client";
import type { DeliveryStatus } from "../../../generated/prisma/client";

type PostDiagnosticInput = {
  phone: string;
  leadName: string;
  resultTitle: string;
};

type PostAppointmentInput = {
  phone: string;
  leadName: string;
};

type ContactAlertInput = {
  company?: string;
  email: string;
  leadName: string;
  message: string;
  phone?: string;
  source?: string;
};

async function sendAndLog(
  phone: string,
  body: string,
  templateKey: string,
  leadEmail?: string,
  leadPhone?: string,
) {
  const adapter = getMessagingAdapter();
  const result = await adapter.send({ to: phone, body, templateKey });

  const lead =
    (leadEmail ? await prisma.lead.findUnique({ where: { email: leadEmail } }) : null) ??
    (leadPhone
      ? await prisma.lead.findFirst({
          where: { phone: { contains: leadPhone.replace(/[^0-9]/g, "").slice(-10) } },
        })
      : null);

  if (lead) {
    await prisma.messageLog.create({
      data: {
        leadId: lead.id,
        channel: "whatsapp",
        direction: "outbound",
        templateKey,
        contentPreview: body.slice(0, 200),
        providerMessageId: result.providerMessageId || null,
        deliveryStatus: result.success ? "sent" : "failed",
      },
    });
  }

  return result;
}

function buildContactAlertBody(input: ContactAlertInput) {
  const lines = [
    "Nuevo contacto desde el formulario de de-gante.com",
    "",
    `Nombre: ${input.leadName}`,
    `Correo: ${input.email}`,
    `Teléfono: ${input.phone || "No proporcionado"}`,
    `Empresa: ${input.company || "No proporcionada"}`,
    `Fuente: ${input.source || "contact_form"}`,
    "",
    "Mensaje:",
    input.message,
  ];

  return lines.join("\n");
}

export async function sendPostDiagnosticMessage(input: PostDiagnosticInput) {
  if (!input.phone) return;

  const body = [
    `Hola ${input.leadName}, soy Fernando De Gante.`,
    ``,
    `Tu diagnóstico quedó listo: ${input.resultTitle}.`,
    ``,
    `Si quieres que lo revisemos juntos, puedes agendar directamente aquí:`,
    `https://calendly.com/ferdegante-22/30min`,
  ].join("\n");

  return sendAndLog(input.phone, body, "post_diagnostic");
}

export async function sendPostAppointmentMessage(input: PostAppointmentInput) {
  if (!input.phone) return;

  const body = [
    `Hola ${input.leadName}, soy Fernando De Gante.`,
    ``,
    `Tu solicitud de consultoría quedó registrada. Te confirmo los detalles a la brevedad.`,
  ].join("\n");

  return sendAndLog(input.phone, body, "post_appointment");
}

export async function sendContactWhatsAppAlert(input: ContactAlertInput) {
  const body = buildContactAlertBody(input);

  return sendAndLog(
    site.contact.whatsappE164,
    body,
    "contact_alert",
    input.email,
    input.phone,
  );
}

export async function handleInboundWebhook(payload: unknown) {
  const adapter = getMessagingAdapter();

  const inbound = adapter.parseInbound(payload);
  if (inbound) {
    const lead = await prisma.lead.findFirst({
      where: { phone: { contains: inbound.from.slice(-10) } },
    });

    if (lead) {
      await prisma.messageLog.create({
        data: {
          leadId: lead.id,
          channel: "whatsapp",
          direction: "inbound",
          contentPreview: inbound.body.slice(0, 200),
          providerMessageId: inbound.providerMessageId,
          deliveryStatus: "delivered",
        },
      });

      await prisma.contactEvent.create({
        data: {
          leadId: lead.id,
          type: "whatsapp_received",
          channel: "whatsapp",
          payloadJson: { body: inbound.body, providerMessageId: inbound.providerMessageId },
        },
      });
    }

    return { handled: true, type: "inbound" as const };
  }

  const status = adapter.parseStatus(payload);
  if (status) {
    await prisma.messageLog.updateMany({
      where: { providerMessageId: status.providerMessageId },
      data: { deliveryStatus: status.status as DeliveryStatus },
    });

    return { handled: true, type: "status" as const };
  }

  return { handled: false, type: null };
}
