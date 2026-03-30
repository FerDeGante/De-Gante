export type OutboundMessage = {
  to: string;
  body: string;
  templateKey?: string;
};

export type InboundMessage = {
  from: string;
  body: string;
  providerMessageId: string;
  timestamp: string;
};

export type StatusUpdate = {
  providerMessageId: string;
  status: "sent" | "delivered" | "read" | "failed";
  timestamp: string;
};

export type SendResult = {
  providerMessageId: string;
  success: boolean;
};

export type MessagingAdapter = {
  send: (message: OutboundMessage) => Promise<SendResult>;
  parseInbound: (payload: unknown) => InboundMessage | null;
  parseStatus: (payload: unknown) => StatusUpdate | null;
};
