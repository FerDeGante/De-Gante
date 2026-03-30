import type { MessagingAdapter, OutboundMessage, SendResult, InboundMessage, StatusUpdate } from "../types";

export function createConsoleAdapter(): MessagingAdapter {
  return {
    async send(message: OutboundMessage): Promise<SendResult> {
      const id = `dev-${Date.now()}`;
      console.log(`[whatsapp][dev] To: ${message.to} | Body: ${message.body.slice(0, 120)}`);
      return { providerMessageId: id, success: true };
    },

    parseInbound(_payload: unknown): InboundMessage | null {
      console.log("[whatsapp][dev] parseInbound called with:", JSON.stringify(_payload).slice(0, 200));
      return null;
    },

    parseStatus(_payload: unknown): StatusUpdate | null {
      console.log("[whatsapp][dev] parseStatus called with:", JSON.stringify(_payload).slice(0, 200));
      return null;
    },
  };
}
