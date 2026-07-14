// Product Finder Quiz Section — interactive quiz that recommends products.
import { SectionHeading } from "@/components/shared/section-heading";
import { MotionSection } from "@/components/shared/motion-wrapper";
import { ProductQuiz } from "@/components/home/product-quiz";

export function ProductQuizSection() {
  return (
    <section className="relative overflow-hidden bg-card py-16 sm:py-20">
      {/* Subtle notebook lines in background */}
      <div className="notebook-lines absolute inset-0 opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <MotionSection>
          <SectionHeading
            eyebrow="Find Your Match"
            title="Not Sure What You Need?"
            description="Take a quick 3-question quiz and we'll recommend the perfect stationery for you."
          />
        </MotionSection>

        <MotionSection delay={0.1}>
          <ProductQuiz />
        </MotionSection>
      </div>
    </section>
  );
}
