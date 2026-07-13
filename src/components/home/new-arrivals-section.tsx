// New Arrivals Section — grid of ProductCards with "New" badge. Used on homepage.
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { StaggerGrid } from "@/components/shared/stagger-grid";
import { ProductCard } from "@/components/shared/product-card";
import { newArrivals } from "@/lib/mock-data/products";

export function NewArrivalsSection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Just In"
            title="New Arrivals"
            description="Fresh from the workshop — the latest additions to our shelves."
          />
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
