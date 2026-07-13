"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion";
import { CategoryCard } from "@/components/home/category-card";
import { categories } from "@/lib/mock-data/categories";

const DESKTOP_CARD_WIDTH = 340;
const DESKTOP_GAP = 24;
const MOBILE_CARD_WIDTH = 300;
const MOBILE_GAP = 16;

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

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

export function CategoryScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();

  const visibleCategories = useMemo(
    () => categories.filter((c) => c.isVisible !== false),
    [],
  );

  const cardWidth = mobile ? MOBILE_CARD_WIDTH : DESKTOP_CARD_WIDTH;
  const gap = mobile ? MOBILE_GAP : DESKTOP_GAP;

  const totalDistance = useMemo(
    () => (visibleCategories.length - 1) * (cardWidth + gap),
    [visibleCategories.length, cardWidth, gap],
  );

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  if (reduced) {
    return (
      <div className="overflow-x-auto pb-4 pt-2">
        <div className="flex gap-4 px-4" style={{ width: "max-content" }}>
          {visibleCategories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        style={{ height: `calc(100vh + ${totalDistance}px)` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <m.div
            style={{ x, gap: `${gap}px` }}
            className="flex items-center"
          >
            {visibleCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} />
            ))}
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
