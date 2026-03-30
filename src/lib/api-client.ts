type DiagnosticPayload = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  answers: {
    bottleneck: string;
    structure: string;
    dependency: string;
  };
};

type DiagnosticResponse = {
  ok: boolean;
  leadId?: string;
  result?: {
    key: string;
    title: string;
    summary: string;
    nextStep: string;
  };
  error?: string;
};

type AppointmentPayload = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  source?: string;
};

type AppointmentResponse = {
  ok: boolean;
  leadId?: string;
  appointmentId?: string;
  message?: string;
  error?: string;
};

type ContactPayload = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
};

type ContactResponse = {
  ok: boolean;
  leadId?: string;
  message?: string;
  error?: string;
};

async function post<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await response.json()) as T;
  return data;
}

export const api = {
  diagnostic: {
    submit: (payload: DiagnosticPayload) =>
      post<DiagnosticResponse>("/api/diagnostic/submit", payload),
  },

  appointments: {
    request: (payload: AppointmentPayload) =>
      post<AppointmentResponse>("/api/appointments/request", payload),
  },

  contact: {
    submit: (payload: ContactPayload) =>
      post<ContactResponse>("/api/contact/submit", payload),
  },
};
