import Image from "next/image";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

const footerNav = [
  { label: "Inicio", href: "#tesis" },
  { label: "Sistema", href: "#sistema" },
  { label: "Casos", href: "#casos" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/fernandodegante/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/527774937660",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--line)]/70 bg-[color:var(--background)]">
      <Container>
        <div className="py-14 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto_auto] lg:gap-20">
            {/* Brand */}
            <div className="max-w-sm">
              <a href="#tesis" className="flex items-center gap-3">
                <span className="inline-flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                  <Image
                    src={site.brandMark.src}
                    alt={site.brandMark.alt}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="flex flex-col leading-none">
                  <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-[color:var(--text)]">
                    {site.name}
                  </span>
                  <span className="mt-1 text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    {site.role}
                  </span>
                </span>
              </a>
              <p className="mt-5 text-sm leading-7 text-[color:var(--muted)]">
                Infraestructura digital, automatización comercial y sistemas de escalamiento
                para negocios que ya venden y necesitan operar mejor.
              </p>
            </div>

            {/* Navigation */}
            <nav aria-label="Navegación footer" className="flex flex-col gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
                Navegación
              </p>
              {footerNav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
                Contacto
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={link.label}
                    className="flex size-10 items-center justify-center rounded-full border border-[color:var(--line)]/70 bg-white/80 text-[color:var(--muted)] transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]/50 hover:text-[color:var(--accent)]"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
              <a
                href="https://wa.me/527774937660"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-1 text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
              >
                +52 777 493 7660
              </a>
              <a
                href={site.actions.header.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-[color:var(--accent-strong)] transition hover:text-[color:var(--accent)]"
              >
                Agendar consultoría →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[color:var(--line)]/50 py-6">
          <p className="text-center text-xs text-[color:var(--muted)]">
            &copy; {year} Fernando De Gante. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
