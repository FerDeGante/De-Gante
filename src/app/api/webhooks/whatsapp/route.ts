import { NextResponse } from "next/server";
import { handleInboundWebhook } from "@/lib/messaging/dispatcher";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

  if (mode === "subscribe" && token === verifyToken) {
    return new Response(challenge ?? "", { status: 200 });
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await handleInboundWebhook(payload);
    console.log("[whatsapp-webhook]", result);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[whatsapp-webhook]", error);
    return NextResponse.json({ ok: true });
  }
}
