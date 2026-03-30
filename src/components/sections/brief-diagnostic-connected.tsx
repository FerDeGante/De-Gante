"use client";

import { BriefDiagnostic, buildDiagnosticWhatsAppLink } from "./brief-diagnostic";

export function BriefDiagnosticConnected() {
  return (
    <BriefDiagnostic
      onSubmit={async (payload) => {
        const whatsappLink = buildDiagnosticWhatsAppLink(payload);

        if (typeof window === "undefined") {
          return;
        }

        const popup = window.open(whatsappLink, "_blank", "noopener,noreferrer");

        if (!popup) {
          window.location.href = whatsappLink;
        }
      }}
    />
  );
}
