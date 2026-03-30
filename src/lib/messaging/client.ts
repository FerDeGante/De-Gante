import type { MessagingAdapter } from "./types";
import { createWhatsAppCloudAdapter } from "./adapters/whatsapp-cloud";
import { createConsoleAdapter } from "./adapters/console";

let _adapter: MessagingAdapter | null = null;

export function getMessagingAdapter(): MessagingAdapter {
  if (_adapter) return _adapter;

  _adapter = process.env.WHATSAPP_TOKEN
    ? createWhatsAppCloudAdapter()
    : createConsoleAdapter();

  return _adapter;
}
