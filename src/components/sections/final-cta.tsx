"use client";

import type { CSSProperties, FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { api } from "@/lib/api-client";

const HEADLINE_GRADIENT =
  "linear-gradient(92deg, #e6fbff 0%, #02abf3 26%, #10a2c7 52%, #097693 76%, #dff9ff 100%)";

type FormState = "idle" | "loading" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-[1rem] border border-[color:var(--line)] bg-white/80 px-4 text-sm text-[color:var(--text)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/15";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [titleActivated, setTitleActivated] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const revealOffset = window.innerWidth >= 1024 ? 168 : 112;

      setTitleActivated(window.scrollY >= sectionTop - revealOffset);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const titleFillStyle = useMemo<CSSProperties>(
    () => ({
      backgroundImage: `${HEADLINE_GRADIENT}, linear-gradient(90deg, #17212b, #17212b)`,
      backgroundPosition: "0% 50%, 0% 50%",
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundSize: titleActivated ? "100% 100%, 100% 100%" : "0% 100%, 100% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      transition:
        "background-size 700ms cubic-bezier(0.22, 1, 0.36, 1), background-position 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "background-size, background-position",
    }),
    [titleActivated],
  );

  function handleField(field: keyof typeof formData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Completa nombre, correo y mensaje.");
      return;
    }

    if (!formData.email.includes("@")) {
      setErrorMessage("Verifica que tu correo sea válido.");
      return;
    }

    setFormState("loading");

    try {
      const result = await api.contact.submit({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        company: formData.company.trim() || undefined,
        message: formData.message.trim(),
        source: "final_cta",
      });

      if (result.ok) {
        setFormState("success");
      } else {
        setErrorMessage(result.error ?? "Ocurrió un error. Intenta de nuevo.");
        setFormState("error");
      }
    } catch {
      setErrorMessage("Error de conexión. Verifica tu red e intenta de nuevo.");
      setFormState("error");
    }
  }

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative isolate scroll-mt-28 overflow-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(16,162,199,0.10),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(9,118,147,0.06),transparent_26%)]" />

      <Container>
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[clamp(2.2rem,4.8vw,3.8rem)] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,247,241,0.95)_100%)] shadow-[0_28px_90px_rgba(15,23,42,0.08)]">
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(16,162,199,0.42),transparent)]" />

            <div className="grid gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16 lg:px-14 lg:py-16">
              <div className="max-w-xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
                  Siguiente paso
                </p>
                <h2
                  className="font-display mt-4 max-w-md text-balance text-[clamp(2.15rem,4.9vw,4.2rem)] font-semibold leading-[0.93] tracking-[-0.06em] sm:text-[clamp(2.55rem,4.5vw,4.6rem)]"
                  style={titleFillStyle}
                >
                  Veamos si tiene sentido trabajar juntos.
                </h2>
                <p className="mt-6 max-w-md text-pretty text-base leading-7 text-[color:var(--muted)] sm:text-lg sm:leading-8">
                  No todos los negocios necesitan lo mismo. Cuéntame tu situación y te digo con
                  honestidad si puedo aportar algo concreto.
                </p>

                <div className="mt-8 space-y-4 border-t border-[color:var(--line)]/50 pt-8">
                  {[
                    "Sin compromiso hasta que haya una propuesta clara",
                    "Respuesta personal, no automatizada",
                    "Si no soy el perfil correcto, te lo digo",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-2 block size-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
                      <p className="text-[15px] leading-7 text-[color:var(--muted)]">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href={site.actions.primary.href} variant="primary">
                    {site.actions.primary.label}
                  </Button>
                </div>
              </div>

              <div>
                {formState === "success" ? (
                  <div className="flex min-h-[24rem] flex-col items-center justify-center rounded-[2rem] border border-[color:var(--accent)]/20 bg-[linear-gradient(180deg,rgba(16,162,199,0.06),rgba(255,255,255,0.96))] p-8 text-center">
                    <div className="flex size-16 items-center justify-center rounded-full bg-[color:var(--accent)]/10">
                      <svg viewBox="0 0 24 24" fill="none" className="size-8 text-[color:var(--accent)]">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <h3 className="font-display mt-5 text-xl font-semibold tracking-[-0.03em] text-[color:var(--text)]">
                      Mensaje recibido
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-[color:var(--muted)]">
                      Te respondo personalmente en menos de 24 horas. Si es urgente, escríbeme
                      directo por WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
                      Cuéntame tu caso
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                        <span>Nombre</span>
                        <input
                          autoComplete="given-name"
                          className={fieldClass}
                          placeholder="Tu nombre"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleField("fullName", e.target.value)}
                        />
                      </label>
                      <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                        <span>Correo</span>
                        <input
                          autoComplete="email"
                          className={fieldClass}
                          placeholder="nombre@empresa.com"
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleField("email", e.target.value)}
                        />
                      </label>
                      <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                        <span>
                          Teléfono{" "}
                          <span className="font-normal text-[color:var(--muted)]">(opcional)</span>
                        </span>
                        <input
                          autoComplete="tel"
                          className={fieldClass}
                          placeholder="+52 55 0000 0000"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleField("phone", e.target.value)}
                        />
                      </label>
                      <label className="space-y-2 text-sm font-medium text-[color:var(--text)]">
                        <span>
                          Empresa{" "}
                          <span className="font-normal text-[color:var(--muted)]">(opcional)</span>
                        </span>
                        <input
                          autoComplete="organization"
                          className={fieldClass}
                          placeholder="Nombre de tu empresa"
                          value={formData.company}
                          onChange={(e) => handleField("company", e.target.value)}
                        />
                      </label>
                    </div>

                    <label className="block space-y-2 text-sm font-medium text-[color:var(--text)]">
                      <span>Cuéntame brevemente tu situación</span>
                      <textarea
                        className="min-h-[7rem] w-full resize-y rounded-[1rem] border border-[color:var(--line)] bg-white/80 px-4 py-3 text-sm text-[color:var(--text)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/15"
                        placeholder="¿Qué te gustaría resolver o mejorar?"
                        required
                        value={formData.message}
                        onChange={(e) => handleField("message", e.target.value)}
                      />
                    </label>

                    <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
                      <Button type="submit" variant="secondary" disabled={formState === "loading"}>
                        {formState === "loading" ? "Enviando..." : "Enviar mensaje"}
                      </Button>
                    </div>

                    {(formState === "error" || errorMessage) && (
                      <p className="text-sm leading-6 text-red-600">{errorMessage}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
