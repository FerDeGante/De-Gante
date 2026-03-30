import { prisma } from "@/lib/db";
import { findOrCreateLead, updateLeadStatus } from "./leads";
import { logContactEvent } from "./events";

type RequestAppointmentInput = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  source?: string;
};

export async function requestAppointment(input: RequestAppointmentInput) {
  const lead = await findOrCreateLead({
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    company: input.company,
    source: "appointment_form",
  });

  const appointment = await prisma.appointmentRequest.create({
    data: {
      leadId: lead.id,
      preferredDate: input.preferredDate ?? null,
      preferredTime: input.preferredTime ?? null,
      notes: input.notes ?? null,
      status: "pending",
    },
  });

  await updateLeadStatus(lead.id, "appointment_requested");

  await logContactEvent({
    leadId: lead.id,
    type: "appointment_requested",
    channel: "web",
    payload: {
      appointmentId: appointment.id,
      preferredDate: input.preferredDate,
      preferredTime: input.preferredTime,
      source: input.source,
    },
  });

  return { leadId: lead.id, appointmentId: appointment.id };
}
