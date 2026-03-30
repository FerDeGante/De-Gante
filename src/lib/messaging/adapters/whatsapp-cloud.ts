import type { MessagingAdapter, OutboundMessage, SendResult, InboundMessage, StatusUpdate } from "../types";

export function createWhatsAppCloudAdapter(): MessagingAdapter {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION ?? "v21.0";

  return {
    async send(message: OutboundMessage): Promise<SendResult> {
      if (!token || !phoneNumberId) {
        console.warn("[whatsapp] WHATSAPP_TOKEN or WHATSAPP_PHONE_NUMBER_ID not configured — skipping");
        return { providerMessageId: "", success: false };
      }

      const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: normalizePhone(message.to),
          type: "text",
          text: { body: message.body },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("[whatsapp] Send failed:", response.status, errorBody);
        return { providerMessageId: "", success: false };
      }

      const data = (await response.json()) as { messages?: { id: string }[] };
      const messageId = data.messages?.[0]?.id ?? "";

      console.log(`[whatsapp] Sent to ${message.to}: ${message.body.slice(0, 60)}...`);
      return { providerMessageId: messageId, success: true };
    },

    parseInbound(payload: unknown): InboundMessage | null {
      const entry = (payload as Record<string, unknown[]>)?.entry;
      if (!Array.isArray(entry) || entry.length === 0) return null;

      const changes = (entry[0] as Record<string, unknown[]>)?.changes;
      if (!Array.isArray(changes) || changes.length === 0) return null;

      const value = (changes[0] as Record<string, unknown>)?.value as Record<string, unknown> | undefined;
      const messages = (value?.messages ?? []) as Record<string, unknown>[];
      if (messages.length === 0) return null;

      const msg = messages[0];
      const text = (msg.text as Record<string, string>)?.body;
      if (!text) return null;

      return {
        from: String(msg.from ?? ""),
        body: text,
        providerMessageId: String(msg.id ?? ""),
        timestamp: String(msg.timestamp ?? ""),
      };
    },

    parseStatus(payload: unknown): StatusUpdate | null {
      const entry = (payload as Record<string, unknown[]>)?.entry;
      if (!Array.isArray(entry) || entry.length === 0) return null;

      const changes = (entry[0] as Record<string, unknown[]>)?.changes;
      if (!Array.isArray(changes) || changes.length === 0) return null;

      const value = (changes[0] as Record<string, unknown>)?.value as Record<string, unknown> | undefined;
      const statuses = (value?.statuses ?? []) as Record<string, unknown>[];
      if (statuses.length === 0) return null;

      const s = statuses[0];
      const statusStr = String(s.status ?? "");
      const validStatuses = ["sent", "delivered", "read", "failed"] as const;
      if (!validStatuses.includes(statusStr as typeof validStatuses[number])) return null;

      return {
        providerMessageId: String(s.id ?? ""),
        status: statusStr as "sent" | "delivered" | "read" | "failed",
        timestamp: String(s.timestamp ?? ""),
      };
    },
  };
}

function normalizePhone(phone: string): string {
  return phone.replace(/[^0-9+]/g, "").replace(/^\+/, "");
}
