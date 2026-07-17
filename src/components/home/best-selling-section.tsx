// Best-Selling Section — shadcn Tabs with "This Week" / "This Month" product grids.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SectionHeading } from "@/components/shared/section-heading";
import { MotionSection, StaggerItem } from "@/components/shared/motion-wrapper";
import { ProductCard } from "@/components/shared/product-card";
import {
  bestSellingWeekly,
  bestSellingMonthly,
} from "@/lib/mock-data/products";

export function BestSellingSection() {
  return (
    <section className=" py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <MotionSection>
          <SectionHeading
            eyebrow="Popular"
            title="Best Sellers"
            description="The products our customers can't stop ordering."
          />
        </MotionSection>

        <Tabs defaultValue="weekly" className="mt-2">
          <MotionSection>
            <TabsList className="mb-8 h-auto w-full justify-start gap-1 rounded-full border border-border bg-transparent p-1 sm:w-auto">
              <TabsTrigger
                value="weekly"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                This Week
              </TabsTrigger>
              <TabsTrigger
                value="monthly"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                This Month
              </TabsTrigger>
            </TabsList>
          </MotionSection>

          <TabsContent value="weekly">
            <MotionSection stagger className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {bestSellingWeekly.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </MotionSection>
          </TabsContent>

          <TabsContent value="monthly">
            <MotionSection stagger className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {bestSellingMonthly.map((product) => (
                <StaggerItem key={product.id}>
                  <ProductCard product={product} />
                </StaggerItem>
              ))}
            </MotionSection>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
