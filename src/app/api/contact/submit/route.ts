import { NextResponse } from "next/server";
import { submitContact } from "@/lib/crm/contact";
import { notifyNewLead } from "@/lib/email/sender";
import { sendContactWhatsAppAlert } from "@/lib/messaging/dispatcher";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, company, message, source } = body as {
      fullName?: string;
      email?: string;
      phone?: string;
      company?: string;
      message?: string;
      source?: string;
    };

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios: fullName, email, message" },
        { status: 400 },
      );
    }

    const { leadId } = await submitContact({
      fullName,
      email,
      phone,
      company,
      message,
      source,
    });

    void notifyNewLead({ leadName: fullName, email, source: "contact_form", resultKey: undefined }).catch(() => {});
    void sendContactWhatsAppAlert({
      leadName: fullName,
      email,
      phone,
      company,
      message,
      source: source ?? "contact_form",
    }).catch(() => {});

    return NextResponse.json({
      ok: true,
      leadId,
      message: "Mensaje recibido correctamente",
    });
  } catch (error) {
    console.error("[contact/submit]", error);
    return NextResponse.json(
      { ok: false, error: "Error interno al procesar el mensaje" },
      { status: 500 },
    );
  }
}
