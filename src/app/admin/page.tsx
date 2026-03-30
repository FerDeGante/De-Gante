import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type LeadWithRelations = Awaited<ReturnType<typeof getLeads>>[number];

async function getLeads() {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      diagnosticSubmissions: { orderBy: { createdAt: "desc" }, take: 1 },
      appointmentRequests: { orderBy: { createdAt: "desc" }, take: 1 },
      contactEvents: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
}

async function getStats() {
  const [totalLeads, diagnosed, appointmentRequested, thisWeek] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "diagnosed" } }),
    prisma.lead.count({ where: { status: "appointment_requested" } }),
    prisma.lead.count({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
    }),
  ]);
  return { totalLeads, diagnosed, appointmentRequested, thisWeek };
}

const statusColors: Record<string, string> = {
  new: "#6b7280",
  diagnosed: "#3b82f6",
  qualified: "#8b5cf6",
  appointment_requested: "#f59e0b",
  contacted: "#10b981",
  nurturing: "#06b6d4",
  won: "#22c55e",
  lost: "#ef4444",
};

function StatusBadge({ status }: { status: string }) {
  const color = statusColors[status] ?? "#6b7280";
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 600,
        color: "#fff",
        backgroundColor: color,
      }}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        padding: "20px 24px",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{label}</p>
      <p style={{ margin: "4px 0 0", fontSize: "28px", fontWeight: 700, color: "#111" }}>
        {value}
      </p>
    </div>
  );
}

function LeadRow({ lead }: { lead: LeadWithRelations }) {
  const lastEvent = lead.contactEvents[0];
  const diagnostic = lead.diagnosticSubmissions[0];
  const appointment = lead.appointmentRequests[0];

  return (
    <tr style={{ borderBottom: "1px solid #f3f4f6" }}>
      <td style={{ padding: "12px 16px", fontSize: "14px", fontWeight: 500 }}>
        {lead.fullName}
        <br />
        <span style={{ color: "#9ca3af", fontSize: "12px" }}>{lead.email}</span>
      </td>
      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>{lead.phone}</td>
      <td style={{ padding: "12px 16px" }}>
        <StatusBadge status={lead.status} />
      </td>
      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>
        {diagnostic?.resultKey ?? "—"}
      </td>
      <td style={{ padding: "12px 16px", fontSize: "13px", color: "#6b7280" }}>
        {appointment ? appointment.status.replace(/_/g, " ") : "—"}
      </td>
      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#9ca3af" }}>
        {lastEvent
          ? `${lastEvent.type.replace(/_/g, " ")} · ${lastEvent.createdAt.toLocaleDateString("es-MX")}`
          : "—"}
      </td>
      <td style={{ padding: "12px 16px", fontSize: "12px", color: "#9ca3af" }}>
        {lead.createdAt.toLocaleDateString("es-MX")}
      </td>
    </tr>
  );
}

export default async function AdminPage() {
  const [leads, stats] = await Promise.all([getLeads(), getStats()]);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 24px",
        color: "#111",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px" }}>
        CRM — Panel Interno
      </h1>
      <p style={{ margin: "0 0 32px", color: "#6b7280", fontSize: "14px" }}>
        Leads, diagnósticos y solicitudes de cita
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        <StatCard label="Total leads" value={stats.totalLeads} />
        <StatCard label="Diagnosticados" value={stats.diagnosed} />
        <StatCard label="Citas solicitadas" value={stats.appointmentRequested} />
        <StatCard label="Últimos 7 días" value={stats.thisWeek} />
      </div>

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "auto",
          backgroundColor: "#fff",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Lead</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Teléfono</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Status</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Diagnóstico</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Cita</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Última interacción</th>
              <th style={{ padding: "12px 16px", fontSize: "12px", color: "#6b7280", fontWeight: 600 }}>Creado</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: "40px 16px", textAlign: "center", color: "#9ca3af" }}>
                  No hay leads registrados aún.
                </td>
              </tr>
            ) : (
              leads.map((lead) => <LeadRow key={lead.id} lead={lead} />)
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
