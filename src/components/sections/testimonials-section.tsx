"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

const HEADLINE_GRADIENT =
  "linear-gradient(92deg, #e6fbff 0%, #02abf3 26%, #10a2c7 52%, #097693 76%, #dff9ff 100%)";

type Testimonial = {
  quote: string;
  highlight: string;
  name: string;
  role: string;
  company: string;
  url?: string;
  logo?: { src: string; width: number; height: number };
  type: "testimonial" | "recognition";
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Antes vendía por Instagram sin ningún orden. Ahora tengo un ecommerce que trabaja de noche, califica interesados y me deja ",
    highlight: "enfocarme en el producto, no en apagar fuegos.",
    name: "Itza",
    role: "Fundadora",
    company: "Mundo Chic",
    url: "https://www.mundochic.mx/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645306/logo-mundo-chic_nldcss.png",
      width: 280,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "La landing nueva hizo algo que yo no esperaba: los clientes llegan sabiendo exactamente qué ofrecemos, sin que yo tenga que explicar lo mismo cada vez. ",
    highlight: "El tiempo de venta se redujo a la mitad.",
    name: "Raúl",
    role: "Director",
    company: "Auto Express MM",
    url: "https://www.autoexpressmm.com/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645301/logo_final_auto_express_fondo_blanco__v3f5bs.png",
      width: 300,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "Pasamos de vender solo presencial a tener un ecommerce que recibe pedidos de todo México. Lo que parecía complejo quedó ",
    highlight: "funcionando en semanas, no en meses.",
    name: "Omar",
    role: "Fundador",
    company: "Super Novedades",
    url: "https://supernovedadesmexico.com.mx/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645300/logo_snmx_fondo_blanco_1_huyvlv.jpg",
      width: 300,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "El reto se llenó en menos de 72 horas desde que lanzamos. La landing no solo se veía bien: ",
    highlight: "estaba diseñada para convertir desde la primera línea.",
    name: "Ilse",
    role: "Fundadora",
    company: "Reto Reprogámate",
    url: "https://retoreprogramate.com/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645302/logo_oscuro_rt_uxs9zf.png",
      width: 280,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "Esta herramienta digital impulsa el desarrollo económico de Cuernavaca. Hoy abrimos empresas en uno a tres días, eliminando regulación administrativa innecesaria. ",
    highlight: "Un cambio que beneficia a la ciudadanía y a los servidores públicos.",
    name: "José Luis Urióstegui",
    role: "Presidente Municipal",
    company: "Ayuntamiento de Cuernavaca",
    url: "https://visorurbano.cuernavaca.gob.mx/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645301/logo_VU_Cuernavaca_bgtqig.svg",
      width: 320,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "Mis piezas artesanales viajan de Oaxaca a todo el mundo. Ahora tienen una presencia digital que ",
    highlight: "comunica su valor real sin restarle ni un gramo de identidad.",
    name: "Janet",
    role: "Fundadora",
    company: "Garolve",
    url: "https://www.garolve.com/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645384/garolve_t0yhbx.jpg",
      width: 280,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "Conectar múltiples restaurantes en un solo sistema sin que nada se rompa era el reto. ",
    highlight: "Lo que construyeron es exactamente lo que necesitábamos y nada que no lo sea.",
    name: "Yuli",
    role: "Directora",
    company: "La Mítica",
    url: "https://www.lamitica.com.mx/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645721/la-mitica_tpylfv.png",
      width: 280,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "Antes perdía prospectos porque no tenía cómo capturarlos a tiempo. Ahora la landing trabaja como un embudo automático: califica, filtra y me entrega clientes listos para comprar. ",
    highlight: "Mi tasa de conversión se duplicó en el primer mes.",
    name: "Ezequiel",
    role: "Asesor financiero y de seguros",
    company: "One Asesor",
    url: "https://one-asesor.com/",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774843276/one_va8roi.jpg",
      width: 300,
      height: 96,
    },
    type: "testimonial",
  },
  {
    quote:
      "Mejores prácticas para la implementación de un marco regulatorio favorable al despliegue de infraestructura en telecomunicaciones.",
    highlight: "",
    name: "IFT",
    role: "Ponente invitado",
    company: "Instituto Federal de Telecomunicaciones",
    url: "https://www.youtube.com/watch?v=P3U5MoL8QGQ",
    logo: {
      src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774810918/Logo_del_IFT.svg_qoibsz.png",
      width: 300,
      height: 96,
    },
    type: "recognition",
  },
];

function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="5 estrellas">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-[18px] text-[color:var(--accent)]"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ClientLogo({ logo, name }: { logo: Testimonial["logo"]; name: string }) {
  if (logo) {
    return (
      <div className="flex h-12 w-32 items-center">
        <Image
          src={logo.src}
          alt={name}
          width={logo.width}
          height={logo.height}
          unoptimized
          className="h-auto max-h-11 w-auto max-w-32 object-contain grayscale opacity-70"
        />
      </div>
    );
  }

  return (
    <div className="flex size-10 items-center justify-center rounded-full bg-[color:var(--accent)]/10 text-sm font-semibold text-[color:var(--accent-strong)]">
      {name[0]}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.type === "recognition") {
    return (
      <div className="flex flex-col justify-between rounded-[2rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(251,248,242,0.96)_100%)] p-7 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
        <div className="flex items-start justify-between gap-4">
          <span className="inline-flex items-center rounded-full border border-[color:var(--accent)]/30 bg-[color:var(--accent)]/8 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
            Ponencia
          </span>
          {testimonial.url && (
            <a
              href={testimonial.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 text-[12px] text-[color:var(--muted)] transition hover:text-[color:var(--accent)]"
            >
              Ver ponencia
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>

        <blockquote className="font-display mt-6 text-[clamp(1.15rem,2.2vw,1.5rem)] font-semibold leading-[1.3] tracking-[-0.035em] text-[color:var(--text)]">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <div className="mt-7 flex items-center gap-4 border-t border-[color:var(--line)]/50 pt-6">
          <ClientLogo logo={testimonial.logo} name={testimonial.name} />
          <div>
            <p className="text-sm font-medium text-[color:var(--text)]">{testimonial.name}</p>
            <p className="mt-0.5 text-[13px] text-[color:var(--muted)]">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between rounded-[2rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(251,248,242,0.96)_100%)] p-7 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
      <div>
        <div className="flex items-start justify-between gap-4">
          <Stars />
          {testimonial.url && (
            <a
              href={testimonial.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-[color:var(--muted)] transition hover:text-[color:var(--accent)]"
            >
              Ver proyecto
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
        </div>
        <blockquote className="font-display mt-6 text-[clamp(1.2rem,2.4vw,1.65rem)] font-semibold leading-[1.28] tracking-[-0.04em] text-[color:var(--text)]">
          &ldquo;{testimonial.quote}
          {testimonial.highlight && (
            <span className="text-[color:var(--accent)]">{testimonial.highlight}</span>
          )}
          &rdquo;
        </blockquote>
      </div>

      <div className="mt-8 flex items-center gap-4 border-t border-[color:var(--line)]/50 pt-6">
        <ClientLogo logo={testimonial.logo} name={testimonial.name} />
        <div>
          <p className="text-sm font-medium text-[color:var(--text)]">{testimonial.name}</p>
          <p className="mt-0.5 text-[13px] text-[color:var(--muted)]">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}

function StickyPanel({ titleFillStyle }: { titleFillStyle: CSSProperties }) {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
          Resultados reales
        </p>
        <h2
          className="font-display mt-4 max-w-lg text-balance text-[clamp(2.15rem,4.2vw,3.8rem)] font-semibold leading-[0.93] tracking-[-0.06em]"
          style={titleFillStyle}
        >
          La infraestructura habla por los resultados.
        </h2>
        <p className="mt-5 text-pretty text-[15px] leading-7 text-[color:var(--muted)] sm:text-base sm:leading-8">
          Negocios de distintos sectores. Misma exigencia: sistemas que se notan en la
          operación y en los números.
        </p>
      </div>

      <div className="mt-8 rounded-[2rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(251,248,242,0.96)_100%)] p-6 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
        <h3 className="font-display text-[1.2rem] font-semibold tracking-[-0.04em] text-[color:var(--text)]">
          Hablemos directo
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-[color:var(--muted)]">
          Puro soporte humano para entender tu situación antes de proponer nada.
        </p>

        <a
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
          className="mt-5 flex items-center gap-3 rounded-[1.2rem] border border-[color:var(--line)]/60 bg-white/80 px-4 py-3.5 transition hover:border-[color:var(--accent)]/40"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]/10">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-[color:var(--accent)]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--muted)]">WhatsApp directo</p>
            <p className="mt-0.5 text-sm font-medium text-[color:var(--text)]">
              {site.contact.whatsappDisplay}
            </p>
          </div>
        </a>

        <div className="mt-5 space-y-2 border-t border-[color:var(--line)]/50 pt-5">
          {["México · Atención remota", "Sin compromiso hasta que tenga sentido"].map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="block size-1.5 shrink-0 rounded-full bg-[color:var(--accent)]" />
              <p className="text-[13px] leading-5 text-[color:var(--muted)]">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Button href={site.actions.primary.href} variant="primary" className="w-full">
            Agendar consultoría
          </Button>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileWrapperRef = useRef<HTMLDivElement | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement | null>(null);
  const [titleActivated, setTitleActivated] = useState(false);
  const [mobileDotIndex, setMobileDotIndex] = useState(0);

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

  // Mobile: set wrapper height so the sticky child has scroll room
  useEffect(() => {
    const wrapper = mobileWrapperRef.current;
    if (!wrapper) return;
    const setHeight = () => {
      if (window.innerWidth >= 1024) {
        wrapper.style.height = "";
        return;
      }
      wrapper.style.height = `${window.innerHeight + (testimonials.length - 1) * window.innerHeight * 0.7}px`;
    };
    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, []);

  // Mobile: translate testimonial track based on vertical scroll progress
  useEffect(() => {
    if (typeof window === "undefined") return;
    let frame = 0;
    const update = () => {
      if (window.innerWidth >= 1024) return;
      const wrapper = mobileWrapperRef.current;
      const track = mobileTrackRef.current;
      if (!wrapper || !track) return;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const scrollable = wrapper.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const scrolled = Math.max(0, window.scrollY - wrapperTop);
      const progress = Math.min(1, scrolled / scrollable);
      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translateX(-${progress * Math.max(0, maxTranslate)}px)`;
      setMobileDotIndex(Math.round(progress * (testimonials.length - 1)));
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
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

  return (
    <>
    {/* overflow-hidden MUST NOT be on the section — it breaks position:sticky on the left panel */}
    <section
      id="testimonios"
      ref={sectionRef}
      className="relative isolate scroll-mt-28 py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_14%,rgba(16,162,199,0.08),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(9,118,147,0.06),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(19,59,75,0.04),transparent_28%)]" />

      <Container>
        {/* Mobile-only header */}
        <div className="mb-10 lg:hidden">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent-strong)]">
            Resultados reales
          </p>
          <h2
            className="font-display mt-4 text-balance text-[clamp(2.15rem,4.9vw,5.1rem)] font-semibold leading-[0.92] tracking-[-0.06em]"
            style={titleFillStyle}
          >
            La infraestructura habla por los resultados.
          </h2>
          <p className="mt-5 text-pretty text-base leading-7 text-[color:var(--muted)]">
            Negocios de distintos sectores. Misma exigencia: sistemas que se notan en
            la operación y en los números.
          </p>
        </div>

        {/* Two-column layout: sticky left + scrolling right */}
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1fr] lg:gap-14 xl:gap-20">
          {/* Left — hidden mobile, sticky desktop */}
          <div className="hidden lg:block">
            <StickyPanel titleFillStyle={titleFillStyle} />
          </div>

          {/* Right — vertical stack on desktop only (mobile handled by sticky wrapper below) */}
          <div className="hidden lg:block lg:space-y-5">
            {testimonials.map((t) => (
              <div key={`${t.name}-${t.company}`}>
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile CTA — moved outside section, after sticky cards wrapper */}
        <div className="hidden">
          <div className="rounded-[2rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(251,248,242,0.96)_100%)] p-6 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
            <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
              Hablemos directo
            </h3>
            <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
              Puro soporte humano para entender tu situación antes de proponer nada.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={site.actions.primary.href} variant="primary">
                Agendar consultoría
              </Button>
              <a
                href={site.contact.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
              >
                {site.contact.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>

    {/* Mobile: scroll-driven horizontal sticky testimonials */}
    <div
      ref={mobileWrapperRef}
      className="relative lg:hidden"
    >
      <div className="sticky top-0 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_18%_14%,rgba(16,162,199,0.08),transparent_28%),radial-gradient(circle_at_84%_22%,rgba(9,118,147,0.06),transparent_24%),radial-gradient(circle_at_50%_88%,rgba(19,59,75,0.04),transparent_28%)]">
        {/* Horizontally translating track */}
        <div
          ref={mobileTrackRef}
          className="flex flex-row items-start gap-4 pl-5 pt-8 pb-2"
          style={{ willChange: "transform" }}
        >
          {testimonials.map((t) => (
            <div key={`${t.name}-${t.company}`} className="min-w-[88vw] w-[88vw] shrink-0 overflow-y-auto">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="shrink-0 px-6 pb-5 pt-3">
          <div className="flex items-center gap-3">
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-[color:var(--line)]/40">
              <div
                className="h-full rounded-full bg-[color:var(--accent)] transition-[width] duration-150 ease-linear"
                style={{ width: `${((mobileDotIndex + 1) / testimonials.length) * 100}%` }}
              />
            </div>
            <span className="shrink-0 text-[10px] font-medium tabular-nums text-[color:var(--muted)]">
              {String(mobileDotIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile CTA — after testimonials */}
    <div className="px-4 pb-16 pt-6 lg:hidden">
      <Container>
        <div className="rounded-[2rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(251,248,242,0.96)_100%)] p-6 shadow-[0_20px_56px_rgba(15,23,42,0.06)]">
          <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-[color:var(--text)]">
            Hablemos directo
          </h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">
            Puro soporte humano para entender tu situación antes de proponer nada.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={site.actions.primary.href} variant="primary">
              Agendar consultoría
            </Button>
            <a
              href={site.contact.whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-[color:var(--muted)] transition hover:text-[color:var(--text)]"
            >
              {site.contact.whatsappDisplay}
            </a>
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}
