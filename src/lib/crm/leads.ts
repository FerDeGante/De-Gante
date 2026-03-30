import { prisma } from "@/lib/db";
import type { Lead, LeadSource, LeadStatus } from "../../../generated/prisma/client";

type FindOrCreateInput = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  source: LeadSource;
};

export async function findOrCreateLead(input: FindOrCreateInput): Promise<Lead> {
  const existing = await prisma.lead.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    return prisma.lead.update({
      where: { id: existing.id },
      data: {
        fullName: input.fullName,
        phone: input.phone,
        ...(input.company ? { company: input.company } : {}),
      },
    });
  }

  return prisma.lead.create({
    data: {
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      company: input.company ?? null,
      source: input.source,
      status: "new",
    },
  });
}

export async function updateLeadStatus(leadId: string, status: LeadStatus): Promise<Lead> {
  return prisma.lead.update({
    where: { id: leadId },
    data: { status },
  });
}

export async function getLeadById(leadId: string): Promise<Lead | null> {
  return prisma.lead.findUnique({ where: { id: leadId } });
}

export async function listLeads(options?: {
  status?: LeadStatus;
  limit?: number;
  offset?: number;
}) {
  const { status, limit = 50, offset = 0 } = options ?? {};

  return prisma.lead.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      diagnosticSubmissions: { orderBy: { createdAt: "desc" }, take: 1 },
      appointmentRequests: { orderBy: { createdAt: "desc" }, take: 1 },
      contactEvents: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}
