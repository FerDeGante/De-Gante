"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 20);
    };

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-transparent transition-colors duration-300"
    >
      <Container className="py-3 sm:py-4">
        <div
          className={cn(
            "flex h-20 items-center justify-between gap-4 rounded-[1.6rem] px-4 transition-all duration-300 ease-out sm:px-5",
            isScrolled
              ? "border border-[color:var(--line)]/70 bg-[color:var(--background)]/88 shadow-[0_14px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl"
              : "border border-[color:var(--line)]/50 bg-[color:var(--background)]/96 shadow-[0_1px_0_rgba(15,23,42,0.04)]",
          )}
        >
          <a href="#inicio" className="flex items-center gap-3">
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
            <span className="flex min-w-0 flex-col leading-none">
              <span className="text-[0.95rem] font-medium tracking-[-0.02em] text-[color:var(--text)] sm:text-[1rem]">
                {site.name}
              </span>
              <span className="mt-1 text-[0.62rem] uppercase tracking-[0.28em] text-[color:var(--muted)] sm:text-[0.66rem]">
                {site.role}
              </span>
            </span>
          </a>

          {!isScrolled ? (
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
          ) : (
            <div className="hidden md:flex-1 md:block" />
          )}

          <a
            href={site.actions.header.href}
            target="_blank"
            rel="noreferrer noopener"
            className="header-cta inline-flex h-10 shrink-0 items-center justify-center rounded-full px-4 text-[0.8125rem] font-medium tracking-[-0.01em]"
          >
            <span>{site.actions.header.label}</span>
          </a>
        </div>
      </Container>
    </header>
  );
}
