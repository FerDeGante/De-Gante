"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type {
  ProductRevealSectionContent,
  ProductRevealTheme,
  ProductRevealVisual,
  ProductRevealVisualVariant,
} from "@/content/product-reveals";

const HEADLINE_GRADIENT =
  "linear-gradient(92deg, #e6fbff 0%, #02abf3 26%, #10a2c7 52%, #097693 76%, #dff9ff 100%)";

type RevealCSSVars = CSSProperties & Record<`--${string}`, string>;

function makeSectionBackground(theme: ProductRevealTheme) {
  return `radial-gradient(circle at 18% 16%, ${theme.accentSoft}, transparent 24%), radial-gradient(circle at 82% 18%, ${theme.accentSoft}, transparent 22%), radial-gradient(circle at 50% 92%, rgba(19,59,75,0.05), transparent 28%)`;
}

function makeSurfaceBackground(theme: ProductRevealTheme, variant: ProductRevealVisualVariant) {
  switch (variant) {
    case "message":
      return `radial-gradient(circle at 20% 18%, ${theme.accentSoft}, transparent 28%), radial-gradient(circle at 82% 26%, rgba(255,255,255,0.55), transparent 22%), linear-gradient(180deg, #fbfbfa 0%, #f6f2eb 100%)`;
    case "compare":
      return `radial-gradient(circle at 18% 20%, ${theme.accentSoft}, transparent 28%), linear-gradient(180deg, #fcfbf8 0%, #f6f4ef 100%)`;
    case "bridge":
      return `radial-gradient(circle at 22% 18%, ${theme.accentSoft}, transparent 26%), radial-gradient(circle at 78% 20%, ${theme.accentSoft}, transparent 24%), linear-gradient(180deg, #fbfbfa 0%, #f6f4ef 100%)`;
    case "signal":
      return `radial-gradient(circle at 18% 16%, ${theme.accentSoft}, transparent 26%), radial-gradient(circle at 82% 18%, ${theme.accentSoft}, transparent 24%), linear-gradient(180deg, #fbfeff 0%, #f5fbff 100%)`;
    case "editorial":
    default:
      return `radial-gradient(circle at 18% 18%, ${theme.accentSoft}, transparent 30%), radial-gradient(circle at 82% 20%, ${theme.accentSoft}, transparent 24%), linear-gradient(180deg, #fbfeff 0%, #f5f8fb 100%)`;
  }
}

function SurfacePill({
  accent,
  children,
  className,
}: {
  accent?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] shadow-[0_10px_22px_rgba(15,23,42,0.05)] backdrop-blur-sm",
        accent
          ? "border-[color:var(--reveal-accent)]/40 bg-[color:var(--reveal-accent)]/12 text-[color:var(--reveal-accent-strong)]"
          : "border-white/80 bg-white/90 text-[color:var(--muted)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

function SurfaceFrame({
  backgroundImage,
  children,
  className,
}: {
  backgroundImage: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ backgroundImage }}
    >
      {children}
    </div>
  );
}

function EditorialSurface({
  theme,
  visual,
}: {
  theme: ProductRevealTheme;
  visual: ProductRevealVisual;
}) {
  const topChips = visual.chips.slice(0, 2);
  const bottomChips = visual.chips.slice(2);

  return (
    <SurfaceFrame backgroundImage={makeSurfaceBackground(theme, visual.variant)}>
      <div className="absolute left-6 top-6 flex flex-wrap gap-2">
        <SurfacePill accent>{visual.label}</SurfacePill>
        {topChips.map((chip) => (
          <SurfacePill key={chip}>{chip}</SurfacePill>
        ))}
      </div>

      <div className="absolute inset-x-8 top-20 mx-auto max-w-[25rem] rounded-[2.2rem] border border-white/85 bg-white/92 p-5 shadow-[0_28px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="h-3 w-24 rounded-full bg-[color:var(--line)]/60" />
          {visual.metric ? <SurfacePill accent className="px-2.5 py-1 text-[9px]">{visual.metric}</SurfacePill> : null}
        </div>
        <h4 className="font-display mt-4 text-[clamp(1.7rem,3vw,2.55rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-[color:var(--text)]">
          {visual.headline}
        </h4>
        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{visual.support}</p>
      </div>

      <div className="absolute inset-x-8 bottom-8 flex flex-wrap items-center gap-2">
        {(bottomChips.length > 0 ? bottomChips : [visual.metric ?? visual.label]).map((chip) => (
          <SurfacePill key={chip} accent={chip === visual.metric}>
            {chip}
          </SurfacePill>
        ))}
      </div>
    </SurfaceFrame>
  );
}

function MessageSurface({
  theme,
  visual,
}: {
  theme: ProductRevealTheme;
  visual: ProductRevealVisual;
}) {
  return (
    <SurfaceFrame backgroundImage={makeSurfaceBackground(theme, visual.variant)}>
      <div className="absolute left-6 top-8 max-w-[17rem] rounded-[2rem] border border-white/86 bg-white/94 p-4 shadow-[0_24px_54px_rgba(15,23,42,0.08)] backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
            {visual.label}
          </p>
          <SurfacePill accent>{visual.metric ?? "Claro"}</SurfacePill>
        </div>
        <h4 className="font-display mt-3 text-[1.4rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[color:var(--text)]">
          {visual.headline}
        </h4>
        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{visual.support}</p>
      </div>

      <div className="absolute right-6 top-20 grid gap-3">
        {visual.chips.slice(0, 2).map((chip, index) => (
          <div
            key={chip}
            className="w-[11.5rem] rounded-[1.45rem] border border-white/84 bg-white/90 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-sm"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[color:var(--muted)]">
              0{index + 1}
            </p>
            <p className="mt-3 text-sm font-medium leading-6 text-[color:var(--text)]">{chip}</p>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-8 bottom-8 flex items-center gap-3">
        <div className="h-px flex-1 bg-[linear-gradient(90deg,transparent,var(--reveal-accent-soft),transparent)]" />
        <SurfacePill accent>{visual.chips[2]}</SurfacePill>
      </div>
    </SurfaceFrame>
  );
}

function CompareSurface({
  theme,
  visual,
}: {
  theme: ProductRevealTheme;
  visual: ProductRevealVisual;
}) {
  return (
    <SurfaceFrame backgroundImage={makeSurfaceBackground(theme, visual.variant)}>
      <div className="absolute left-6 top-6 flex flex-wrap gap-2">
        <SurfacePill accent>{visual.label}</SurfacePill>
        {visual.metric ? <SurfacePill>{visual.metric}</SurfacePill> : null}
      </div>

      <div className="absolute inset-x-8 top-20 grid grid-cols-3 gap-3">
        {visual.chips.map((chip, index) => (
          <div
            key={chip}
            className="rounded-[1.5rem] border border-white/86 bg-white/92 p-4 shadow-[0_18px_44px_rgba(15,23,42,0.06)] backdrop-blur-sm"
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-[color:var(--muted)]">
              0{index + 1}
            </p>
            <div
              className={cn(
                "mt-3 rounded-[1.1rem] border border-white/80",
                index === 0
                  ? "h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,247,251,0.96))]"
                  : index === 1
                    ? "h-36 bg-[linear-gradient(180deg,rgba(16,162,199,0.10),rgba(255,255,255,0.96))]"
                    : "h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,242,235,0.96))]",
              )}
            />
            <p className="mt-3 text-sm font-medium leading-6 text-[color:var(--text)]">{chip}</p>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-8 bottom-8 flex items-center justify-between gap-3">
        <p className="max-w-[18rem] text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--muted)]">
          {visual.support}
        </p>
        <SurfacePill accent>{visual.metric ?? visual.label}</SurfacePill>
      </div>
    </SurfaceFrame>
  );
}

function BridgeSurface({
  theme,
  visual,
}: {
  theme: ProductRevealTheme;
  visual: ProductRevealVisual;
}) {
  return (
    <SurfaceFrame backgroundImage={makeSurfaceBackground(theme, visual.variant)}>
      <div className="absolute left-6 top-8 w-[11.5rem] rounded-[1.7rem] border border-white/86 bg-white/92 p-4 shadow-[0_20px_44px_rgba(15,23,42,0.07)] backdrop-blur-sm">
        <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
          {visual.label}
        </p>
        <h4 className="font-display mt-3 text-[1.35rem] font-semibold leading-[0.98] tracking-[-0.05em] text-[color:var(--text)]">
          {visual.headline}
        </h4>
        <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{visual.support}</p>
      </div>

      <div className="absolute right-6 top-16 w-[11.5rem] rounded-[1.7rem] border border-white/86 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,242,235,0.96))] p-4 shadow-[0_20px_44px_rgba(15,23,42,0.07)] backdrop-blur-sm">
        <div className="h-3 w-[4.5rem] rounded-full bg-[color:var(--line)]/60" />
        <div className="mt-4 h-24 rounded-[1.2rem] border border-white/78 bg-white/90 shadow-[0_10px_24px_rgba(15,23,42,0.04)]" />
      </div>

      <div className="absolute inset-x-14 top-1/2 h-px bg-[linear-gradient(90deg,transparent,var(--reveal-accent-soft),transparent)]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/90 bg-white/92 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--muted)] shadow-[0_16px_32px_rgba(15,23,42,0.06)]">
        {visual.metric}
      </div>

      <div className="absolute inset-x-8 bottom-8 flex flex-wrap gap-2">
        {visual.chips.map((chip, index) => (
          <SurfacePill key={chip} accent={index === 0}>
            {chip}
          </SurfacePill>
        ))}
      </div>
    </SurfaceFrame>
  );
}

function SignalSurface({
  theme,
  visual,
}: {
  theme: ProductRevealTheme;
  visual: ProductRevealVisual;
}) {
  return (
    <SurfaceFrame backgroundImage={makeSurfaceBackground(theme, visual.variant)}>
      <div className="absolute inset-0 opacity-95">
        <svg
          aria-hidden="true"
          className="absolute inset-x-6 top-10 h-[18rem] w-[calc(100%-3rem)]"
          viewBox="0 0 480 320"
          fill="none"
        >
          <path
            d="M52 260C116 248 156 226 198 192C238 159 270 118 330 96C376 79 416 88 440 68"
            stroke="var(--reveal-accent)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M50 268C116 250 158 228 200 194C240 162 271 120 332 98C377 81 416 90 442 72"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="absolute left-6 top-6 flex flex-wrap gap-2">
        <SurfacePill accent>{visual.label}</SurfacePill>
        {visual.metric ? <SurfacePill>{visual.metric}</SurfacePill> : null}
      </div>

      <div className="absolute left-6 bottom-8 max-w-[15rem] rounded-[1.7rem] border border-white/86 bg-white/92 p-4 shadow-[0_20px_44px_rgba(15,23,42,0.07)] backdrop-blur-sm">
        <h4 className="font-display text-[1.6rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[color:var(--text)]">
          {visual.headline}
        </h4>
        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{visual.support}</p>
      </div>

      <div className="absolute right-6 bottom-8 grid gap-2">
        {visual.chips.map((chip, index) => (
          <SurfacePill key={chip} accent={index === 0}>
            {chip}
          </SurfacePill>
        ))}
      </div>

      <div className="absolute right-[-2rem] top-[-2rem] h-40 w-40 rounded-full bg-[color:var(--reveal-accent)]/8 blur-3xl" />
    </SurfaceFrame>
  );
}

function ProductSurface({
  theme,
  visual,
}: {
  theme: ProductRevealTheme;
  visual: ProductRevealVisual;
}) {
  switch (visual.variant) {
    case "message":
      return <MessageSurface theme={theme} visual={visual} />;
    case "compare":
      return <CompareSurface theme={theme} visual={visual} />;
    case "bridge":
      return <BridgeSurface theme={theme} visual={visual} />;
    case "signal":
      return <SignalSurface theme={theme} visual={visual} />;
    case "editorial":
    default:
      return <EditorialSurface theme={theme} visual={visual} />;
  }
}

function CardShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[2.4rem] border border-[color:var(--line)]/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.99)_0%,rgba(251,248,242,0.96)_100%)] p-4 shadow-[0_24px_70px_rgba(15,23,42,0.07)] transition duration-300 ease-out",
        className,
      )}
    >
      {children}
    </article>
  );
}

function CarouselButton({
  children,
  disabled,
  label,
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-full border transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
        disabled
          ? "cursor-not-allowed border-[color:var(--line)]/60 bg-white/60 text-[color:var(--muted)]"
          : "border-[color:var(--line)]/70 bg-white/95 text-[color:var(--text)] shadow-[0_12px_28px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-[color:var(--accent)]/50",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function RevealCardItem({
  card,
  index,
  isActive,
  setCardRef,
  theme,
}: {
  card: ProductRevealSectionContent["cards"][number];
  index: number;
  isActive: boolean;
  setCardRef: (element: HTMLDivElement | null) => void;
  theme: ProductRevealTheme;
}) {
  return (
    <div
      ref={setCardRef}
      data-index={index}
      className={cn(
        "shrink-0 snap-start transition duration-300 ease-out",
        isActive ? "opacity-100 scale-[1]" : "opacity-95 scale-[0.985]",
        "min-w-[92%] sm:min-w-[78%] md:min-w-[68%] lg:min-w-[62%] xl:min-w-[56%] 2xl:min-w-[50%]",
      )}
    >
      <CardShell className="h-full">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 shadow-[0_16px_46px_rgba(15,23,42,0.05)]">
          <div className="aspect-[16/11] min-h-[18rem]">
            <ProductSurface theme={theme} visual={card.visual} />
          </div>
        </div>

        <div className="flex flex-1 flex-col px-1 pb-1 pt-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
            {card.label}
          </p>
          <h3 className="font-display mt-3 max-w-[22ch] text-[clamp(1.55rem,2.8vw,2.25rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-[color:var(--text)]">
            {card.title}
          </h3>
          <p className="mt-4 max-w-[34ch] text-pretty text-[15px] leading-7 text-[color:var(--muted)] sm:text-base">
            {card.description}
          </p>
          <p className="mt-5 max-w-[34ch] text-[13px] font-medium leading-6 text-[color:var(--accent-strong)] sm:text-sm">
            {card.benefit}
          </p>
        </div>
      </CardShell>
    </div>
  );
}

export function ProductRevealSection({
  content,
}: {
  content: ProductRevealSectionContent;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const activeIndexRef = useRef(0);
  const [titleActivated, setTitleActivated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let frame = 0;

    const updateTitleState = () => {
      const section = sectionRef.current;

      if (!section) {
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const revealOffset = window.innerWidth >= 1024 ? 168 : 112;
      const revealPoint = sectionTop - revealOffset;

      setTitleActivated(window.scrollY >= revealPoint);
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateTitleState);
    };

    updateTitleState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const root = trackRef.current;

    if (!root) {
      return;
    }

    const visibleCards = new Map<number, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.index ?? "0");

          if (entry.isIntersecting) {
            visibleCards.set(index, entry.intersectionRatio);
          } else {
            visibleCards.delete(index);
          }
        });

        let bestIndex = activeIndexRef.current;
        let bestRatio = -1;

        visibleCards.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestIndex = index;
            bestRatio = ratio;
          }
        });

        setActiveIndex(bestIndex);
      },
      {
        root,
        threshold: [0.35, 0.5, 0.65, 0.8],
      },
    );

    cardRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const sectionStyle = useMemo<RevealCSSVars>(
    () =>
      ({
        "--reveal-accent": content.theme.accent,
        "--reveal-accent-soft": content.theme.accentSoft,
        "--reveal-accent-strong": content.theme.accentStrong,
      }) as RevealCSSVars,
    [content.theme],
  );

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

  const scrollToIndex = (nextIndex: number) => {
    const target = cardRefs.current[nextIndex];

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  };

  const prevDisabled = activeIndex <= 0;
  const nextDisabled = activeIndex >= content.cards.length - 1;

  return (
    <section
      id={content.id}
      ref={sectionRef}
      className="relative isolate scroll-mt-28 overflow-hidden py-20 sm:py-24 lg:py-28"
      style={sectionStyle}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: makeSectionBackground(content.theme) }}
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(252,251,248,0.92)_0%,rgba(255,255,255,1)_42%,rgba(246,243,236,0.86)_100%)]" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-start">
          <div className="max-w-2xl text-left">
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[color:var(--reveal-accent-strong)]">
              {content.eyebrow}
            </p>

            <div className="relative mt-4 max-w-5xl">
              <h2
                className="font-display relative z-10 max-w-5xl text-balance text-[clamp(2.3rem,5.7vw,5.6rem)] font-semibold leading-[0.93] tracking-[-0.06em] sm:text-[clamp(2.7rem,5vw,6.2rem)]"
                style={titleFillStyle}
              >
                <span className="block">{content.headlineLines[0]}</span>
                <span className="block">{content.headlineLines[1]}</span>
              </h2>
            </div>

            <p className="mt-6 max-w-3xl text-pretty text-base leading-7 text-[color:var(--muted)] sm:text-lg sm:leading-8">
              {content.intro}
            </p>

            <p className="mt-10 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {content.context}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {content.exploreHint}
            </p>
          </div>

          <div className="min-w-0">
            <div className="mb-4 hidden items-center justify-end gap-2 md:flex">
              <CarouselButton
                label="Ir a la tarjeta anterior"
                disabled={prevDisabled}
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              >
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-5">
                  <path
                    d="M14.5 6.5L9 12l5.5 5.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </CarouselButton>
              <CarouselButton
                label="Ir a la siguiente tarjeta"
                disabled={nextDisabled}
                onClick={() => scrollToIndex(Math.min(content.cards.length - 1, activeIndex + 1))}
              >
                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-5">
                  <path
                    d="M9.5 6.5L15 12l-5.5 5.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                  />
                </svg>
              </CarouselButton>
            </div>

            <div
              ref={trackRef}
              className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {content.cards.map((card, index) => (
                <RevealCardItem
                  key={card.title}
                  card={card}
                  index={index}
                  isActive={index === activeIndex}
                  setCardRef={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  theme={content.theme}
                />
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.34em] text-[color:var(--muted)]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(content.cards.length).padStart(2, "0")}
              </span>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--line)]/70 bg-white/90 px-4 py-3 shadow-[0_14px_32px_rgba(15,23,42,0.05)]">
                  {content.cards.map((card, index) => (
                    <button
                      key={card.title}
                      type="button"
                      aria-label={`Ir a la tarjeta ${index + 1}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      className={cn(
                        "rounded-full transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
                        index === activeIndex
                          ? "h-2.5 w-9 bg-[linear-gradient(90deg,var(--reveal-accent),var(--reveal-accent-strong))]"
                          : "h-2.5 w-2.5 bg-[color:var(--line)] hover:bg-[color:var(--reveal-accent)]/40",
                      )}
                      onClick={() => scrollToIndex(index)}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                  <CarouselButton
                    label="Ir a la tarjeta anterior"
                    disabled={prevDisabled}
                    onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                  >
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-5">
                      <path
                        d="M14.5 6.5L9 12l5.5 5.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </CarouselButton>
                  <CarouselButton
                    label="Ir a la siguiente tarjeta"
                    disabled={nextDisabled}
                    onClick={() => scrollToIndex(Math.min(content.cards.length - 1, activeIndex + 1))}
                  >
                    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-5">
                      <path
                        d="M9.5 6.5L15 12l-5.5 5.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </CarouselButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
