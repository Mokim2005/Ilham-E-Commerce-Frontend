"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export function useHideOnScroll(threshold = 150) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (reduced) return;
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > threshold) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  if (reduced) return false;
  return hidden;
}
