// Hero Section — main hero with notebook-line texture, headline, CTA. Used on homepage.
import { Button } from "@/components/ui/button";
import { heroBanner } from "@/lib/mock-data/banners";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Notebook line texture background */}
      <div className="notebook-lines absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex min-h-[500px] max-w-7xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[600px] lg:flex-row lg:text-left">
        {/* Text content */}
        <div className="relative z-10 max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
          <span className="mb-4 inline-block rounded-full border border-teal/20 bg-teal/5 px-4 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-teal">
            New Collection 2026
          </span>
          <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {heroBanner.title.split(" ").map((word, i) => (
              <span key={i}>
                {i === 1 ? (
                  <span className="text-teal">{word} </span>
                ) : (
                  <>{word} </>
                )}
              </span>
            ))}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {heroBanner.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button
              size="lg"
              className="highlighter-swipe rounded-full px-8 font-medium"
            >
              {heroBanner.ctaText}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-rule px-8 font-medium text-ink"
            >
              View Catalog
            </Button>
          </div>
        </div>

        {/* Decorative stationery illustration area */}
        <div className="relative mt-10 hidden h-[400px] w-[400px] lg:ml-12 lg:mt-0 lg:block xl:h-[480px] xl:w-[480px]">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal/5 to-rose/5" />
          <div className="absolute left-8 top-8 h-32 w-24 rotate-6 rounded-lg border-2 border-dashed border-rule" />
          <div className="absolute bottom-12 right-8 h-24 w-24 -rotate-3 rounded-full border-2 border-dashed border-teal/30" />
          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center">
            <span className="font-serif text-6xl font-bold text-ink/10">
              ✦
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Crafted with ink & intention
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
