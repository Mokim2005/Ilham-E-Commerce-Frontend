// About Hero — full-width hero section with headline and mission statement.
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Text */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal-light">
              About Inkwell
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Where Every Page
              <br />
              Tells a Story
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              We believe the right pen, the right notebook, the right tool can
              change the way you think, create, and communicate. Inkwell exists
              to make those tools accessible to everyone in Bangladesh.
            </p>
          </div>

          {/* Image */}
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
            <Image
              src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=800&h=600&fit=crop"
              alt="Stack of Inkwell notebooks and pens on a wooden desk"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Decorative bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-paper deckle-edge" />
    </section>
  );
}
