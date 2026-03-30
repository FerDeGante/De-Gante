import Image from "next/image";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type TrustedLogo = {
  alt: string;
  imageClassName?: string;
  shellClassName: string;
  src: string;
  width: number;
  height: number;
};

const trustedLogos: TrustedLogo[] = [
  {
    alt: "Bloomberg",
    shellClassName: "w-[11rem] sm:w-[12.5rem] lg:w-[13.5rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774810917/bloomberg-png_ffqzba.png",
    width: 320,
    height: 96,
  },
  {
    alt: "CONAMER",
    shellClassName: "w-[10.5rem] sm:w-[11.75rem] lg:w-[12.75rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774810917/conamer-logo_cwtz8u.png",
    width: 300,
    height: 96,
  },
  {
    alt: "Ayuntamiento de Veracruz",
    imageClassName: "h-12 sm:h-14",
    shellClassName: "w-[11.5rem] sm:w-[12.75rem] lg:w-[13.5rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774810918/ayuntamiento-veracruz-logo_romwlz.png",
    width: 320,
    height: 100,
  },
  {
    alt: "Instituto Federal de Telecomunicaciones",
    shellClassName: "w-[10.5rem] sm:w-[11.75rem] lg:w-[12.75rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774810918/Logo_del_IFT.svg_qoibsz.png",
    width: 300,
    height: 96,
  },
  {
    alt: "Universidad del Valle de Cuernavaca",
    shellClassName: "w-[11rem] sm:w-[12.25rem] lg:w-[13rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645301/logo_VU_Cuernavaca_bgtqig.svg",
    width: 320,
    height: 96,
  },
  {
    alt: "Mundo Chic",
    shellClassName: "w-[10rem] sm:w-[11.25rem] lg:w-[12rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645306/logo-mundo-chic_nldcss.png",
    width: 280,
    height: 96,
  },
  {
    alt: "Auto Express",
    shellClassName: "w-[10.75rem] sm:w-[12rem] lg:w-[12.75rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645301/logo_final_auto_express_fondo_blanco__v3f5bs.png",
    width: 300,
    height: 96,
  },
  {
    alt: "Punto Encuentro",
    shellClassName: "w-[10rem] sm:w-[11.25rem] lg:w-[12rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645721/punto-encuentro_e69ivq.png",
    width: 280,
    height: 96,
  },
  {
    alt: "La Mítica",
    shellClassName: "w-[9.9rem] sm:w-[11rem] lg:w-[11.75rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645721/la-mitica_tpylfv.png",
    width: 280,
    height: 96,
  },
  {
    alt: "Garolve",
    shellClassName: "w-[10rem] sm:w-[11.1rem] lg:w-[11.9rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645384/garolve_t0yhbx.jpg",
    width: 280,
    height: 96,
  },
  {
    alt: "SNMX",
    shellClassName: "w-[10.15rem] sm:w-[11.35rem] lg:w-[12rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645300/logo_snmx_fondo_blanco_1_huyvlv.jpg",
    width: 300,
    height: 96,
  },
  {
    alt: "Relación con RT",
    shellClassName: "w-[10rem] sm:w-[11.1rem] lg:w-[11.9rem]",
    src: "https://res.cloudinary.com/ddax9tdki/image/upload/v1774645302/logo_oscuro_rt_uxs9zf.png",
    width: 280,
    height: 96,
  },
];

function TrustedLogoChip({ logo }: { logo: TrustedLogo }) {
  return (
    <div
      className={cn(
        "flex h-20 shrink-0 items-center justify-center rounded-[1.5rem] border border-[color:var(--line)]/70 bg-white px-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:h-24 sm:px-7",
        logo.shellClassName,
      )}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        unoptimized
        className={cn(
          "w-auto object-contain",
          logo.imageClassName ?? "h-12 sm:h-14 lg:h-16",
        )}
      />
    </div>
  );
}

export function TrustedByStrip() {
  return (
    <section
      aria-label="Proyectos y marcas que validan el trabajo"
      className="relative z-10 -mt-4 overflow-hidden py-4 sm:-mt-6 sm:py-5 lg:-mt-8"
    >
      <Container>
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/80 bg-[color:var(--surface)]/96 px-4 py-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:px-6 sm:py-5 lg:px-8">
          <div className="mb-3 flex justify-center">
            <p className="max-w-3xl text-center text-[10px] font-medium uppercase tracking-[0.36em] text-[color:var(--muted)] sm:text-[11px]">
              Han confiado en mi criterio y ejecución
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[color:var(--surface)] to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[color:var(--surface)] to-transparent"
            />

            <div className="flex w-max items-center gap-3 animate-[trusted-strip-marquee_34s_linear_infinite] motion-reduce:animate-none">
              <div className="flex items-center gap-3">
                {trustedLogos.map((logo) => (
                  <TrustedLogoChip key={`lead-${logo.alt}`} logo={logo} />
                ))}
              </div>
              <div aria-hidden="true" className="flex items-center gap-3">
                {trustedLogos.map((logo) => (
                  <TrustedLogoChip key={`duplicate-${logo.alt}`} logo={logo} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
