type DiagnosticEmailInput = {
  leadName: string;
  result: { key: string; title: string; summary: string; nextStep: string };
};

type AppointmentEmailInput = {
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

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

export function buildDiagnosticEmail(input: DiagnosticEmailInput): EmailContent {
  const { leadName, result } = input;

  const subject = `${leadName}, tu diagnóstico está listo — ${result.title}`;

  const text = [
    `Hola ${leadName},`,
    "",
    `Tu diagnóstico quedó registrado.`,
    "",
    `Resultado: ${result.title}`,
    `Lectura: ${result.summary}`,
    `Siguiente paso recomendado: ${result.nextStep}`,
    "",
    "Si quieres profundizar, agenda una consultoría estratégica.",
    "",
    "— Fernando De Gante",
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <p style="margin: 0 0 16px;">Hola <strong>${escapeHtml(leadName)}</strong>,</p>
      <p style="margin: 0 0 16px;">Tu diagnóstico quedó registrado.</p>
      <div style="background: #f8f9fa; border-left: 4px solid #10a2c7; padding: 16px 20px; border-radius: 4px; margin: 24px 0;">
        <p style="margin: 0 0 8px; font-weight: 600;">${escapeHtml(result.title)}</p>
        <p style="margin: 0 0 8px; color: #555;">${escapeHtml(result.summary)}</p>
        <p style="margin: 0; color: #10a2c7; font-weight: 500;">→ ${escapeHtml(result.nextStep)}</p>
      </div>
      <p style="margin: 24px 0 0; color: #555;">Si quieres profundizar, agenda una consultoría estratégica.</p>
      <p style="margin: 24px 0 0; color: #999;">— Fernando De Gante</p>
    </div>
  `;

  return { subject, html, text };
}

export function buildAppointmentEmail(input: AppointmentEmailInput): EmailContent {
  const { leadName, preferredDate, preferredTime } = input;

  const dateInfo = preferredDate
    ? `Fecha preferida: ${preferredDate}${preferredTime ? ` a las ${preferredTime}` : ""}`
    : "Sin preferencia de fecha específica";

  const subject = `${leadName}, tu solicitud de cita fue recibida`;

  const text = [
    `Hola ${leadName},`,
    "",
    "Tu solicitud de consultoría fue registrada.",
    dateInfo,
    "",
    "Te confirmaré los detalles a la brevedad.",
    "",
    "— Fernando De Gante",
  ].join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1a1a1a;">
      <p style="margin: 0 0 16px;">Hola <strong>${escapeHtml(leadName)}</strong>,</p>
      <p style="margin: 0 0 16px;">Tu solicitud de consultoría fue registrada.</p>
      <p style="margin: 0 0 16px; color: #555;">${escapeHtml(dateInfo)}</p>
      <p style="margin: 0 0 0; color: #555;">Te confirmaré los detalles a la brevedad.</p>
      <p style="margin: 24px 0 0; color: #999;">— Fernando De Gante</p>
    </div>
  `;

  return { subject, html, text };
}

export function buildInternalLeadAlert(input: InternalAlertInput): EmailContent {
  const { leadName, email, source, resultKey } = input;

  const subject = `[CRM] Nuevo lead: ${leadName} (${source})`;

  const text = [
    `Nuevo lead registrado.`,
    `Nombre: ${leadName}`,
    `Email: ${email}`,
    `Fuente: ${source}`,
    resultKey ? `Diagnóstico: ${resultKey}` : "",
  ].filter(Boolean).join("\n");

  const html = `
    <div style="font-family: monospace; padding: 16px; color: #1a1a1a;">
      <p style="margin: 0 0 8px;"><strong>Nuevo lead:</strong> ${escapeHtml(leadName)}</p>
      <p style="margin: 0 0 8px;">Email: ${escapeHtml(email)}</p>
      <p style="margin: 0 0 8px;">Fuente: ${escapeHtml(source)}</p>
      ${resultKey ? `<p style="margin: 0;">Diagnóstico: ${escapeHtml(resultKey)}</p>` : ""}
    </div>
  `;

  return { subject, html, text };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
