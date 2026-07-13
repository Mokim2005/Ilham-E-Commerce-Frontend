"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { heroSlides } from "@/lib/mock-data/hero-slides";

const SLIDE_INTERVAL = 5000;
const CROSSFADE_DURATION = 1.2;

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

export function HeroBackgroundSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  const total = heroSlides.length;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(advance, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [advance, reduced, paused]);

  const slideVariants = useMemo(
    () => ({
      enter: { opacity: 0 },
      center: { opacity: 1, zIndex: 1 },
      exit: { opacity: 0, zIndex: 0 },
    }),
    [],
  );

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="absolute inset-0 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence initial={false}>
          <m.div
            key={heroSlides[current].id}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: CROSSFADE_DURATION, ease: "easeInOut" as const },
              zIndex: { duration: 0 },
            }}
            className="absolute inset-0"
          >
            <m.div
              animate={
                reduced
                  ? { scale: 1 }
                  : { scale: [1, 1.06] }
              }
              transition={{
                duration: SLIDE_INTERVAL / 1000,
                ease: "easeInOut" as const,
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={heroSlides[current].imageUrl}
                alt={heroSlides[current].alt}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover scale-[1.08] blur-[4px] brightness-[0.55]"
              />
            </m.div>
          </m.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}
