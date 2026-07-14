// New Arrivals Section — grid of ProductCards with "New" badge.
import { SectionHeading } from "@/components/shared/section-heading";
import { MotionSection, StaggerItem } from "@/components/shared/motion-wrapper";
import { ProductCard } from "@/components/shared/product-card";
import { newArrivals } from "@/lib/mock-data/products";

export function NewArrivalsSection() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <MotionSection>
          <SectionHeading
            eyebrow="Just In"
            title="New Arrivals"
            description="Fresh from the workshop — the latest additions to our shelves."
          />
        </MotionSection>

        <MotionSection stagger className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </MotionSection>
      </div>
    </section>
  );
}
