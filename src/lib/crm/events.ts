import { prisma } from "@/lib/db";
import type { ContactChannel, ContactEventType } from "../../../generated/prisma/client";
import type { Prisma } from "../../../generated/prisma/client";

type LogEventInput = {
  leadId: string;
  type: ContactEventType;
  channel: ContactChannel;
  payload?: Record<string, unknown>;
};

export async function logContactEvent(input: LogEventInput) {
  return prisma.contactEvent.create({
    data: {
      leadId: input.leadId,
      type: input.type,
      channel: input.channel,
      payloadJson: (input.payload as Prisma.InputJsonValue) ?? undefined,
    },
  });
}
