import { SectionHeading } from "@/components/shared/section-heading";
import { AnimatedSection } from "@/components/shared/animated-section";
import { CategoryScrollGallery } from "@/components/home/category-scroll-gallery";

export function CategorySection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            eyebrow="Browse"
            title="Shop by Category"
            description="From everyday essentials to specialty art supplies — find exactly what you need."
          />
        </AnimatedSection>
      </div>

      <CategoryScrollGallery />
    </section>
  );
}
