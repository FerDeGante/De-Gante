import { NextResponse } from "next/server";
import { requestAppointment } from "@/lib/crm/appointments";
import { sendAppointmentConfirmation, notifyNewLead } from "@/lib/email/sender";
import { sendPostAppointmentMessage } from "@/lib/messaging/dispatcher";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, company, preferredDate, preferredTime, notes, source } = body as {
      fullName?: string;
      email?: string;
      phone?: string;
      company?: string;
      preferredDate?: string;
      preferredTime?: string;
      notes?: string;
      source?: string;
    };

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios: fullName, email, phone" },
        { status: 400 },
      );
    }

    const { leadId, appointmentId } = await requestAppointment({
      fullName,
      email,
      phone,
      company,
      preferredDate,
      preferredTime,
      notes,
      source,
    });

    void sendAppointmentConfirmation({ to: email, leadName: fullName, preferredDate, preferredTime }).catch(() => {});
    void notifyNewLead({ leadName: fullName, email, source: "appointment_form", resultKey: undefined }).catch(() => {});
    void sendPostAppointmentMessage({ phone, leadName: fullName }).catch(() => {});

    return NextResponse.json({
      ok: true,
      leadId,
      appointmentId,
      message: "Solicitud de cita registrada correctamente",
    });
  } catch (error) {
    console.error("[appointments/request]", error);
    return NextResponse.json(
      { ok: false, error: "Error interno al registrar la solicitud de cita" },
      { status: 500 },
    );
  }
}
