// Featured Products Section — shadcn Carousel of ProductCards. Used on homepage.
"use client";

import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shared/product-card";
import { getFeaturedProducts } from "@/lib/data/products.data";
import type { Product } from "@/lib/types/product";

export function FeaturedProductsSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then(setProducts);
  }, []);

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionHeading
              eyebrow="Our Picks"
              title="Featured Products"
              description="Handpicked favorites from our collection — quality you can feel."
            />

            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="mt-2 w-full"
            >
              <CarouselContent>
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-6 flex items-center justify-center gap-3">
                <CarouselPrevious className="relative inset-auto translate-y-0" />
                <CarouselNext className="relative inset-auto translate-y-0" />
              </div>
            </Carousel>
          </m.div>
        </LazyMotion>
      </div>
    </section>
  );
}
