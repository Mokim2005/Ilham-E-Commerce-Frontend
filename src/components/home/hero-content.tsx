"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroBanner } from "@/lib/mock-data/banners";
import { heroFeatures, heroStats } from "@/lib/mock-data/hero-highlights";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function HeroContent() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-xl text-center lg:text-left"
      >
        <m.span
          variants={fadeUp}
          className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm"
        >
          New Collection 2026
        </m.span>

        <m.h1
          variants={fadeUp}
          className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {heroBanner.title.split(" ").map((word, i) => (
            <span key={i}>
              {i === 1 ? (
                <span className="text-teal-light">{word} </span>
              ) : (
                <>{word} </>
              )}
            </span>
          ))}
        </m.h1>

        <m.p
          variants={fadeUp}
          className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {heroBanner.subtitle}
        </m.p>

        <m.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <Button
            size="lg"
            className="highlighter-swipe rounded-full px-8 font-medium"
          >
            {heroBanner.ctaText}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/30 px-8 font-medium text-white hover:bg-white/10 hover:text-white"
          >
            View Catalog
          </Button>
        </m.div>

        {/* Trust features strip */}
        <m.div
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:justify-start"
        >
          {heroFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-teal-light" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/60">
                  {feat.label}
                </span>
              </div>
            );
          })}
        </m.div>

        {/* Stats row */}
        <m.div
          variants={fadeUp}
          className="mt-6 flex items-center justify-center gap-6 lg:justify-start"
        >
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && (
                <div className="h-8 w-px bg-white/20" aria-hidden="true" />
              )}
              <div className="text-center lg:text-left">
                <p className="font-serif text-xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/50">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
