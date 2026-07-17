// New Arrivals Section — Smooth Lenis Scroll and Stacking Cards effect.
"use client";

import { useRef } from "react";
import { ReactLenis } from "lenis/react";
import { useScroll } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { NewArrivalCard } from "@/components/home/new-arrival-card";
import { newArrivals } from "@/lib/mock-data/products";

export function NewArrivalsSection() {
  const containerRef = useRef<HTMLDivElement>(null);


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const total = newArrivals?.length ?? 0;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <section ref={containerRef} className="relative w-full">
        
        {/* Normal Scrolling Section Title Header — Removes sticky lock to scroll naturally */}
        <div className="w-full py-16 sm:py-20 flex justify-center items-center">
          <div className="mx-auto max-w-7xl px-4 lg:px-8 text-center">
            <SectionHeading
              eyebrow="Just In"
              title="New Arrivals"
              description="Fresh from the workshop — the latest additions to our shelves. Scroll down to stack! 👇"
            />
          </div>
        </div>

        {/* Stacking Products list wrapper — Tall enough for the sticky cards to layer */}
        <div className="relative z-10 mx-auto max-w-5xl px-4 lg:px-8 pb-32">
          {total > 0 &&
            newArrivals.map((product, i) => {
            
              const targetScale = 1 - (total - 1 - i) * 0.05;
            
              const startRange = i * (1 / total);

              return (
                <NewArrivalCard
                  key={product.id}
                  i={i}
                  product={product}
                  progress={scrollYProgress}
                  range={[startRange, 1]}
                  targetScale={targetScale}
                />
              );
            })}
        </div>
      </section>
    </ReactLenis>
  );
}