import { HeroBackgroundSlider } from "@/components/home/hero-background-slider";
import { HeroContent } from "@/components/home/hero-content";
import { HeroVisual } from "@/components/home/hero-visual";

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden bg-ink sm:min-h-[600px]">
      <HeroBackgroundSlider />

      <div className="relative mx-auto grid min-h-[500px] max-w-7xl items-center px-4 py-16 sm:min-h-[600px] sm:py-20 lg:grid-cols-2 lg:gap-12">
        <HeroContent />

        <div className="relative z-10 mt-10 hidden lg:mt-0 lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
