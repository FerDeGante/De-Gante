import { NextResponse } from "next/server";
import { listLeads } from "@/lib/crm/leads";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.ADMIN_API_TOKEN;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as Parameters<typeof listLeads>[0] extends { status?: infer S } ? S : never;
    const limit = Number(searchParams.get("limit") ?? 50);
    const offset = Number(searchParams.get("offset") ?? 0);

    const leads = await listLeads({ status: status ?? undefined, limit, offset });

    return NextResponse.json({ ok: true, leads, count: leads.length });
  } catch (error) {
    console.error("[admin/leads]", error);
    return NextResponse.json({ ok: false, error: "Error al obtener leads" }, { status: 500 });
  }
}
