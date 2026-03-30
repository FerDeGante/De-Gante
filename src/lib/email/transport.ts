type SendInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

type EmailTransport = {
  send: (input: SendInput) => Promise<void>;
};

function createResendTransport(): EmailTransport {
  return {
    async send(input) {
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) {
        console.warn("[email] RESEND_API_KEY not configured — skipping email send");
        return;
      }

      const fromAddress = process.env.EMAIL_FROM ?? "Fernando De Gante <noreply@de-gante.com>";

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: input.to,
          subject: input.subject,
          html: input.html,
          text: input.text,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("[email] Resend API error:", response.status, errorBody);
        throw new Error(`Email send failed: ${response.status}`);
      }

      console.log(`[email] Sent to ${input.to}: "${input.subject}"`);
    },
  };
}

function createConsoleTransport(): EmailTransport {
  return {
    async send(input) {
      console.log(`[email][dev] To: ${input.to} | Subject: ${input.subject}`);
      console.log(`[email][dev] Text preview: ${input.text.slice(0, 120)}...`);
    },
  };
}

export const transport: EmailTransport =
  process.env.RESEND_API_KEY
    ? createResendTransport()
    : createConsoleTransport();
