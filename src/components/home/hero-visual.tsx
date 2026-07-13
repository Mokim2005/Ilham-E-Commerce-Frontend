"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { heroVisual } from "@/lib/mock-data/hero-visual";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function HeroVisual() {
  const reduced = usePrefersReducedMotion();
  const [entered, setEntered] = useState(false);

  const mainFloat = useMemo(
    () =>
      entered && !reduced
        ? {
            animate: { y: [0, -12, 0] },
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut" as const,
            },
          }
        : {},
    [entered, reduced],
  );

  const badgeAnims = useMemo(
    () =>
      entered && !reduced
        ? [
            {
              animate: { y: [0, -8, 0] },
              transition: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            },
            {
              animate: { y: [0, -10, 0] },
              transition: {
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut" as const,
              },
            },
          ]
        : [{}, {}],
    [entered, reduced],
  );

  const badgePositions = ["-right-3 -top-3", "-left-3 -bottom-3"];

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative flex items-center justify-center">
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
          onAnimationComplete={() => setEntered(true)}
        >
          <m.div
            {...mainFloat}
            className="relative w-full max-w-[380px] rotate-2 will-change-transform"
          >
            <div className="relative overflow-hidden rounded-3xl bg-white/10 shadow-2xl backdrop-blur-sm">
              <Image
                src={heroVisual.mainImage}
                alt={heroVisual.mainAlt}
                width={720}
                height={900}
                sizes="(max-width: 1024px) 320px, 380px"
                className="h-auto w-full object-cover"
              />
            </div>

            {heroVisual.badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <m.div
                  key={badge.label}
                  {...badgeAnims[i]}
                  className={`absolute ${badgePositions[i]} z-10 flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm will-change-transform`}
                >
                  <Icon className="h-4 w-4 text-rose" />
                  <div>
                    <p className="font-serif text-sm font-bold leading-tight text-neutral-900">
                      {badge.value}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                      {badge.label}
                    </p>
                  </div>
                </m.div>
              );
            })}
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
