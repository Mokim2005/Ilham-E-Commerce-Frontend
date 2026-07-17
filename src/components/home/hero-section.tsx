import { HeroBackgroundSlider } from "@/components/home/hero-background-slider";
import { HeroContent } from "@/components/home/hero-content";
import { HeroVisual } from "@/components/home/hero-visual";

export function HeroSection() {
  return (
    <section className="relative min-h-[540px] overflow-hidden bg-foreground sm:min-h-[640px]">
      <HeroBackgroundSlider />

      {/* Ink wash overlay for depth */}
      <div className="absolute inset-0 ink-wash" />

      <div className="relative mx-auto grid min-h-[540px] max-w-7xl items-center px-4 py-20 sm:min-h-[640px] sm:py-24 lg:grid-cols-2 lg:gap-12">
        <HeroContent />

        <div className="relative z-10 mt-10 hidden lg:mt-0 lg:block">
          <HeroVisual />
        </div>
      </div>

      {/* Deckle edge transition to next section */}
      <div className="deckle-edge absolute -bottom-1 left-0 right-0 h-4 bg-background" />
    </section>
  );
}
