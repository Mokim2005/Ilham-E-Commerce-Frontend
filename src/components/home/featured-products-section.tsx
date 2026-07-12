// Featured Products Section — shadcn Carousel of ProductCards. Used on homepage.
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProductCard } from "@/components/shared/product-card";
import { featuredProducts } from "@/lib/mock-data/products";

export function FeaturedProductsSection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
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
            {featuredProducts.map((product) => (
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
      </div>
    </section>
  );
}
