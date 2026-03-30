import { NextResponse } from "next/server";
import { submitDiagnostic } from "@/lib/crm/diagnostic";
import { sendDiagnosticConfirmation, notifyNewLead } from "@/lib/email/sender";
import { sendPostDiagnosticMessage } from "@/lib/messaging/dispatcher";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, email, phone, company, answers } = body as {
      fullName?: string;
      email?: string;
      phone?: string;
      company?: string;
      answers?: { bottleneck?: string; structure?: string; dependency?: string };
    };

    if (!fullName || !email || !phone || !answers?.bottleneck || !answers?.structure || !answers?.dependency) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos obligatorios: fullName, email, phone, answers (bottleneck, structure, dependency)" },
        { status: 400 },
      );
    }

    const { leadId, result } = await submitDiagnostic({
      fullName,
      email,
      phone,
      company,
      answers: {
        bottleneck: answers.bottleneck,
        structure: answers.structure,
        dependency: answers.dependency,
      },
    });

    // Fire-and-forget: email + WhatsApp (don't block response)
    void sendDiagnosticConfirmation({ to: email, leadName: fullName, result }).catch(() => {});
    void notifyNewLead({ leadName: fullName, email, source: "diagnostic", resultKey: result.key }).catch(() => {});
    void sendPostDiagnosticMessage({ phone, leadName: fullName, resultTitle: result.title }).catch(() => {});

    return NextResponse.json({
      ok: true,
      leadId,
      result: {
        key: result.key,
        title: result.title,
        summary: result.summary,
        nextStep: result.nextStep,
      },
    });
  } catch (error) {
    console.error("[diagnostic/submit]", error);
    return NextResponse.json(
      { ok: false, error: "Error interno al procesar el diagnóstico" },
      { status: 500 },
    );
  }
}
