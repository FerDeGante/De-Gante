"use client";

import { BriefDiagnostic } from "./brief-diagnostic";
import { api } from "@/lib/api-client";

export function BriefDiagnosticConnected() {
  return (
    <BriefDiagnostic
      onSubmit={async (payload) => {
        const result = await api.diagnostic.submit({
          fullName: payload.lead.name,
          email: payload.lead.email,
          phone: payload.lead.phone,
          company: payload.lead.company || undefined,
          answers: payload.answers,
        });

        if (!result.ok) {
          throw new Error(result.error ?? "Error al enviar diagnóstico");
        }
      }}
    />
  );
}
