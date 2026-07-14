// Featured Products Section — responsive grid with staggered reveal. Used on homepage.
"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types/product";

interface FeaturedProductsSectionProps {
  products: Product[];
}

const headingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <LazyMotion features={domAnimation}>
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
          >
            <m.div variants={headingVariants}>
              <SectionHeading
                eyebrow="Our Picks"
                title="Featured Products"
                description="Handpicked favorites from our collection — quality you can feel."
              />
            </m.div>

            <m.div
              variants={gridVariants}
              className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {products.map((product) => (
                <m.div key={product.id} variants={cardVariants}>
                  <ProductCard product={product} />
                </m.div>
              ))}
            </m.div>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
