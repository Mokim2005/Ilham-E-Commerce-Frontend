// Discount/Promo Banner Section — full-width sale banner. Used on homepage.
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { promoBanner } from "@/lib/mock-data/banners";

export function DiscountBannerSection() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-ink to-ink/80 p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-rose/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-teal/10 blur-3xl" />
            <div className="absolute right-8 top-8 font-serif text-[120px] font-bold leading-none text-white/[0.03]">
              {promoBanner.discount}%
            </div>

            <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex-1">
                <span className="mb-3 inline-block rounded-full bg-rose/20 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-rose">
                  Limited Time Offer
                </span>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {promoBanner.title}
                </h2>
                <p className="mt-3 max-w-md text-base text-white/60">
                  {promoBanner.subtitle}
                </p>
              </div>
              <Button
                size="lg"
                className="highlighter-swipe shrink-0 rounded-full bg-rose px-8 font-medium text-white hover:bg-rose/90"
              >
                {promoBanner.ctaText}
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
