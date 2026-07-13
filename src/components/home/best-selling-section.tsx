// Best-Selling Section — shadcn Tabs with "This Week" / "This Month" product grids. Used on homepage.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { StaggerGrid } from "@/components/shared/stagger-grid";
import { ProductCard } from "@/components/shared/product-card";
import {
  bestSellingWeekly,
  bestSellingMonthly,
} from "@/lib/mock-data/products";

export function BestSellingSection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Popular"
            title="Best Sellers"
            description="The products our customers can't stop ordering."
          />
        </AnimatedSection>

        <Tabs defaultValue="weekly" className="mt-2">
          <AnimatedSection>
            <TabsList className="mb-8 h-auto w-full justify-start gap-1 rounded-full border border-rule bg-transparent p-1 sm:w-auto">
              <TabsTrigger
                value="weekly"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
              >
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
              >
                This Month
              </TabsTrigger>
            </TabsList>
          </AnimatedSection>

          <TabsContent value="weekly">
            <StaggerGrid className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {bestSellingWeekly.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerGrid>
          </TabsContent>

          <TabsContent value="monthly">
            <StaggerGrid className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {bestSellingMonthly.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerGrid>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
