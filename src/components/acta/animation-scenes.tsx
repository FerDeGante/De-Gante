"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Registration lives in this client module; every scene owns its GSAP context.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const motionAllowed = "(prefers-reduced-motion: no-preference)";
const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

export function RevealLines({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motionAllowed, () => {
        const heading = scope.current?.querySelector<HTMLElement>("h1");
        if (!heading) return;

        const split = SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            const strike =
              heading.querySelector<SVGPathElement>("[data-strike]");
            const timeline = gsap.timeline();
            timeline.from(self.lines, {
              yPercent: 105,
              duration: 0.6,
              stagger: 0.045,
              ease: "power3.out",
            });
            if (strike) {
              timeline.fromTo(
                strike,
                { strokeDashoffset: 1 },
                {
                  strokeDashoffset: 0,
                  duration: 0.6,
                  ease: "power3.out",
                },
              );
            }
            return timeline;
          },
        });

        return () => split.revert();
      });
      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}

export function CountUp({ value }: { value: number }) {
  const scope = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motionAllowed, () => {
        const output =
          scope.current?.querySelector<HTMLElement>("[data-count]");
        if (!output) return;
        const counter = { value: 0 };
        const animation = gsap.to(counter, {
          value,
          paused: true,
          duration: 0.9,
          ease: "power3.out",
          onUpdate: () => {
            output.textContent = mxn.format(Math.round(counter.value));
          },
        });
        ScrollTrigger.create({
          trigger: scope.current,
          start: "top 90%",
          once: true,
          onEnter: () => {
            animation.play();
          },
        });
        return () => {
          output.textContent = mxn.format(value);
        };
      });
      return () => media.revert();
    },
    { scope, dependencies: [value], revertOnUpdate: true },
  );

  return (
    <span ref={scope} className="acta-count">
      <span className="acta-sr-only">{mxn.format(value)}</span>
      <span aria-hidden="true" data-count>
        {mxn.format(value)}
      </span>
    </span>
  );
}

export function Stagger({
  children,
  className = "",
  individual = false,
}: {
  children: ReactNode;
  className?: string;
  individual?: boolean;
}) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(motionAllowed, () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-stagger-item]",
          scope.current,
        );
        if (individual) {
          items.forEach((item) => {
            gsap.from(item, {
              x: 16,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: item, start: "top 92%", once: true },
            });
          });
        } else {
          gsap.from(items, {
            x: 20,
            opacity: 0,
            stagger: 0.16,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 85%",
              once: true,
            },
          });
        }
      });
      return () => media.revert();
    },
    { scope, dependencies: [individual], revertOnUpdate: true },
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}

export function MethodScene({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          motion: motionAllowed,
        },
        (context) => {
          if (!context.conditions?.motion) return;
          const root = scope.current;
          if (!root) return;
          const steps = gsap.utils.toArray<HTMLElement>(
            "[data-method-step]",
            root,
          );
          const letters = gsap.utils.toArray<HTMLElement>(
            "[data-method-letter]",
            root,
          );
          const cells = gsap.utils.toArray<HTMLElement>(
            "[data-method-cell]",
            root,
          );
          const stage = root.querySelector<HTMLElement>("[data-method-stage]");

          if (!context.conditions.desktop || !stage) {
            steps.forEach((step) => {
              gsap.from(step.querySelector("[data-step-rule]"), {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: { trigger: step, start: "top 85%", once: true },
              });
            });
            return;
          }

          // Keep the largest step's space reserved before layering the four panels.
          const height = Math.max(
            ...steps.map((step) => step.getBoundingClientRect().height),
          );
          gsap.set(stage, { height, position: "relative" });
          gsap.set(steps, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            autoAlpha: 0,
          });
          gsap.set(letters, { opacity: 0.15 });
          gsap.set(cells, { opacity: 0.15 });
          gsap.set(steps[0], { autoAlpha: 1 });
          gsap.set(letters[0], { opacity: 1 });
          gsap.set(cells[0], { opacity: 1 });

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "+=1800",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          steps.forEach((step, index) => {
            if (index === 0) return;
            const position = (index - 1) * 1.6 + 0.7;
            timeline.to(
              steps[index - 1],
              { autoAlpha: 0, duration: 0.6, ease: "power3.out" },
              position,
            );
            timeline.to(
              letters[index],
              { opacity: 1, duration: 0.7, ease: "power3.out" },
              position,
            );
            timeline.fromTo(
              step,
              { autoAlpha: 0, x: 18 },
              { autoAlpha: 1, x: 0, duration: 0.7, ease: "power3.out" },
              position + 0.6,
            );
            timeline.to(
              cells[index],
              { opacity: 1, duration: 0.7, ease: "power3.out" },
              position + 0.6,
            );
          });
          timeline.to({}, { duration: 0.7 });
        },
      );
      return () => media.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="acta-method-scene">
      {children}
    </div>
  );
}
