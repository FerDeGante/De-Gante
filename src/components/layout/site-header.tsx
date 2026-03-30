import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)]/80 bg-[color:var(--background)]/96">
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#tesis" className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center overflow-hidden rounded-2xl border border-[color:var(--line)] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
            <Image
              src={site.brandMark.src}
              alt={site.brandMark.alt}
              width={44}
              height={44}
              priority
              className="h-full w-full object-cover"
            />
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-[color:var(--text)]">
              {site.name}
            </span>
            <span className="mt-1 text-[0.66rem] uppercase tracking-[0.28em] text-[color:var(--muted)]">
              {site.role}
            </span>
          </span>
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {site.navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button href={site.actions.header.href} variant="primary" size="sm">
          {site.actions.header.label}
        </Button>
      </Container>
    </header>
  );
}
