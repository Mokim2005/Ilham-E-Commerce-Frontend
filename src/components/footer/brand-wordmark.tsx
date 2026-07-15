"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";

const brandLetters = "ILHAM".split("");

const letterVariants = {
  hidden: { y: 200 },
  visible: (i: number) => ({
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
      duration: 0.4,
      delay: i * 0.05,
    },
  }),
};

export function BrandWordmark() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wordmarkRef, { once: true });

  return (
    <div className="border-y border-white/10 py-6 md:py-10" ref={wordmarkRef}>
      <LazyMotion features={domAnimation}>
        <m.div
          className="flex justify-center overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {brandLetters.map((letter, i) => (
            <m.span
              key={`${letter}-${i}`}
              custom={i}
              variants={letterVariants}
              className="font-serif text-[16vw] font-bold leading-none tracking-tight text-primary sm:text-[10rem] md:text-[12rem]"
            >
              {letter}
            </m.span>
          ))}
        </m.div>
      </LazyMotion>
    </div>
  );
}
