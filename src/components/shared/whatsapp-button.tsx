// Floating WhatsApp Button — fixed-position CTA with pulse animation. Site-wide.
"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";

// Bangladesh number 01717664436 in wa.me international format (no leading 0, prefixed with 880)
const WHATSAPP_NUMBER = "8801717664436";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Ilham Stationery! I have a question.")}`;

const pulseAnimation = {
  scale: [1, 1.08, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <LazyMotion features={domAnimation}>
        <m.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-shadow hover:shadow-xl"
          animate={shouldReduceMotion ? undefined : pulseAnimation}
        >
          {/* WhatsApp SVG icon */}
          <svg
            viewBox="0 0 32 32"
            fill="white"
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.132 6.744 3.054 9.374L1.054 31.25l6.116-1.98C9.726 30.958 12.768 32 16.004 32 24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.374 22.594c-.39 1.1-1.93 2.014-3.146 2.28-.834.18-1.922.322-5.588-1.2-4.694-1.92-7.71-6.71-7.94-7.02-.224-.31-1.836-2.444-1.836-4.664 0-2.216 1.164-3.306 1.578-3.764.39-.434.944-.574 1.256-.574.152 0 .296.008.424.014.412.018.618.042.89.67.344.784 1.174 2.858 1.276 3.064.102.206.204.484-.04.834-.2.344-.4.55-.74.854-.34.3-.65.674-.286 1.24.354.544 1.57 2.58 3.37 4.184 2.314 2.062 4.24 2.702 4.85 2.996.61.294.966.246 1.32-.148.354-.394 1.512-1.76 1.916-2.37.4-.61.804-.506 1.356-.304.556.204 3.516 1.66 4.12 1.96.604.3.996.454 1.142.708.144.254.144 1.464-.246 2.564z" />
          </svg>

          {/* Tooltip on hover */}
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            Chat with us on WhatsApp
          </span>
        </m.a>
      </LazyMotion>
    </div>
  );
}