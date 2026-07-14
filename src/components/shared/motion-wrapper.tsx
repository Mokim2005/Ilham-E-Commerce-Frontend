"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import type { ReactNode } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function MotionSection({
  children,
  className,
  delay = 0,
  stagger = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  as?: "div" | "section";
}) {
  const Tag = as === "section" ? m.section : m.div;

  if (stagger) {
    return (
      <LazyMotion features={domAnimation}>
        <Tag
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={className}
        >
          {children}
        </Tag>
      </LazyMotion>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <Tag
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay }}
        className={className}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div variants={staggerItem} className={className}>
      {children}
    </m.div>
  );
}
