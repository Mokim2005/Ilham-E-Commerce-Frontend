"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { BookOpen, Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const scribbleVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeInOut" as const },
  },
};

export function NotFoundContent() {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center text-center"
      >
        {/* Brand mark */}
        <m.div variants={childVariants} className="mb-6 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Ilham
          </span>
        </m.div>

        {/* Hand-drawn 404 SVG */}
        <m.div variants={childVariants} className="mb-6">
          <svg
            viewBox="0 0 260 110"
            className="h-24 w-56 sm:h-32 sm:w-72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* First digit: 4 */}
            <m.path
              d="M35 90 L35 30 L10 60 L10 70 L48 70"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            {/* Second digit: 0 */}
            <m.path
              d="M85 35 C110 35 130 55 130 70 C130 85 110 100 85 100 C60 100 42 85 42 70 C42 55 60 35 85 35"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Third digit: 4 */}
            <m.path
              d="M175 90 L175 30 L150 60 L150 70 L188 70"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
            />
            {/* Invisible circle for "O" to float around */}
            <circle cx="86" cy="68" r="2" fill="none" />
            {/* Ink spots */}
            <m.circle
              cx="106"
              cy="28"
              r="3"
              className="fill-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            />
            <m.circle
              cx="126"
              cy="101"
              r="2"
              className="fill-foreground/30"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.8 }}
            />
            <m.circle
              cx="218"
              cy="105"
              r="2"
              className="fill-primary/40"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 2.0 }}
            />
          </svg>
        </m.div>

        {/* Heading */}
        <m.h1
          variants={childVariants}
          className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          This page wandered off
        </m.h1>

        {/* Subtext */}
        <m.p
          variants={childVariants}
          className="mt-3 max-w-md text-base text-muted-foreground"
        >
          It seems this page got smudged or torn out. Let's get you back to the
          good pages.
        </m.p>

        {/* CTA buttons */}
        <m.div
          variants={childVariants}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild variant="default" size="lg">
            <Link href="/" aria-label="Go to homepage">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop" aria-label="Go to shop">
              <ShoppingBag className="h-4 w-4" />
              Browse Shop
            </Link>
          </Button>
        </m.div>
      </m.div>
    </LazyMotion>
  );
}
