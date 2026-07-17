import { SectionHeading } from "@/components/shared/section-heading";
import { MotionSection } from "@/components/shared/motion-wrapper";
import { CategoryScrollGallery } from "@/components/home/category-scroll-gallery";

export function CategorySection() {
  return (
    <section className=" py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <MotionSection>
          <SectionHeading
            eyebrow="Browse"
            title="Shop by Category"
            description="From everyday essentials to specialty art supplies — find exactly what you need."
          />
        </MotionSection>
      </div>

      <CategoryScrollGallery />
    </section>
  );
}
