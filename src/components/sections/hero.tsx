"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";

const HEADLINE_GRADIENT =
  "linear-gradient(92deg, #e6fbff 0%, #02abf3 26%, #10a2c7 52%, #097693 76%, #dff9ff 100%)";

export function HeroSection() {
  const [headlineActivated, setHeadlineActivated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const threshold = 84;
    let frame = 0;

    const updateHeadlineState = () => {
      setHeadlineActivated(window.scrollY > threshold);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateHeadlineState);
    };

    updateHeadlineState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const headlineOverlayStyle = useMemo<CSSProperties>(
    () => ({
      backgroundImage: HEADLINE_GRADIENT,
      backgroundPosition: "0% 50%",
      backgroundSize: "100% 100%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "transparent",
      opacity: headlineActivated ? 1 : 0,
      transition: "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      willChange: "opacity",
    }),
    [headlineActivated],
  );

  return (
    <section
      id="tesis"
      className="relative isolate scroll-mt-28 overflow-hidden pb-8 pt-8 sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={site.hero.visual.backgroundSrc}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          aria-hidden="true"
          className="object-cover object-center opacity-55 saturate-[0.92] contrast-110"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,24,33,0.92)_0%,rgba(7,24,33,0.84)_28%,rgba(7,24,33,0.48)_56%,rgba(7,24,33,0.74)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_20%,rgba(2,171,243,0.28),transparent_30%),radial-gradient(circle_at_72%_34%,rgba(16,162,199,0.20),transparent_24%),radial-gradient(circle_at_52%_84%,rgba(19,59,75,0.24),transparent_34%)]" />
      </div>

      <Container>
        <div className="grid grid-cols-[minmax(0,1.16fr)_minmax(7.5rem,0.84fr)] items-center gap-5 sm:gap-8 md:grid-cols-[minmax(0,1.12fr)_minmax(10.5rem,0.88fr)] lg:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.94fr)] lg:items-start lg:gap-12 xl:gap-16">
          <div className="max-w-3xl pt-1 text-white lg:pt-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:var(--accent)]/95">
              {site.hero.eyebrow}
            </p>

            <div className="relative mt-4 max-w-4xl">
              <h1 className="font-display relative z-10 text-balance text-[clamp(2.1rem,7.9vw,4.9rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white drop-shadow-[0_16px_40px_rgba(7,24,33,0.4)] sm:text-[clamp(2.6rem,6.2vw,6.8rem)] lg:text-[clamp(3.4rem,6.2vw,6.8rem)]">
                {site.hero.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h1>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 font-display text-balance text-[clamp(2.1rem,7.9vw,4.9rem)] font-semibold leading-[0.92] tracking-[-0.06em] sm:text-[clamp(2.6rem,6.2vw,6.8rem)] lg:text-[clamp(3.4rem,6.2vw,6.8rem)]"
                style={headlineOverlayStyle}
              >
                {site.hero.headlineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/82 sm:text-xl">
              {site.hero.subheadline}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={site.actions.primary.href} variant="primary">
                {site.actions.primary.label}
              </Button>
            </div>
          </div>

          <div className="relative w-full max-w-[clamp(10rem,35vw,30rem)] justify-self-center">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]">
              <Image
                src={site.hero.visual.src}
                alt={site.hero.visual.alt}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 34rem, 40vw"
                className="object-cover object-[74%_10%] scale-[1.06] drop-shadow-[0_30px_60px_rgba(7,24,33,0.5)] sm:object-[74%_12%] lg:object-[74%_14%]"
              />
              <div className="absolute inset-x-0 bottom-0 h-[30%] bg-[linear-gradient(180deg,rgba(7,24,33,0)_0%,rgba(7,24,33,0.2)_34%,rgba(7,24,33,0.92)_100%)]" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
