"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { Button } from "@/components/ui/button";
import { heroBanner } from "@/lib/mock-data/banners";
import { heroFeatures, heroStats } from "@/lib/mock-data/hero-highlights";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
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
        {/* Eyebrow pill */}
        <m.span
          variants={fadeUp}
          className="mb-5 inline-block rounded-full border border-white/15 bg-white/8 px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
        >
          New Collection 2026
        </m.span>

        {/* Heading — serif, generous leading */}
        <m.h1
          variants={fadeUp}
          className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
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

        {/* Subtitle */}
        <m.p
          variants={fadeUp}
          className="mt-6 max-w-md text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {heroBanner.subtitle}
        </m.p>

        {/* CTA buttons */}
        <m.div
          variants={fadeUp}
          className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
        >
          <Button
            size="lg"
            className="highlighter-swipe rounded-full px-8 py-3 font-medium shadow-lg shadow-primary/20"
          >
            {heroBanner.ctaText}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-white/20 px-8 py-3 font-medium text-white/80 hover:border-white/40 hover:bg-white/8 hover:text-white"
          >
            View Catalog
          </Button>
        </m.div>

        {/* Trust features strip */}
        <m.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 lg:justify-start"
        >
          {heroFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <div key={feat.label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-teal-light/80" />
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/50">
                  {feat.label}
                </span>
              </div>
            );
          })}
        </m.div>

        {/* Stats row */}
        <m.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-6 lg:justify-start"
        >
          {heroStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6">
              {i > 0 && (
                <div className="h-8 w-px bg-white/15" aria-hidden="true" />
              )}
              <div className="text-center lg:text-left">
                <p className="font-serif text-xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
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
