import { findOrCreateLead, updateLeadStatus } from "./leads";
import { logContactEvent } from "./events";

type SubmitContactInput = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
};

export async function submitContact(input: SubmitContactInput) {
  const lead = await findOrCreateLead({
    fullName: input.fullName,
    email: input.email,
    phone: input.phone ?? "",
    company: input.company,
    source: "contact_form",
  });

  if (lead.status === "new") {
    await updateLeadStatus(lead.id, "contacted");
  }

  await logContactEvent({
    leadId: lead.id,
    type: "contact_form_submitted",
    channel: "web",
    payload: {
      message: input.message,
      source: input.source,
    },
  });

  return { leadId: lead.id };
}
