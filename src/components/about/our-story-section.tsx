// Our Story — two-column section with image and narrative text.
import Image from "next/image";

export function OurStorySection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop"
              alt="The original Inkwell stationery shop in Dhaka"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
              Our Story
            </p>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              From a Small Desk to Dhaka&apos;s Favorite Stationery Store
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/70">
              <p>
                Inkwell started in 2019 when our founder, frustrated by the
                lack of quality stationery options in local markets, decided to
                import a curated selection of notebooks, pens, and art supplies
                from Japan, South Korea, and Europe. What began as a small
                online store operating out of a spare bedroom quickly grew into
                something much bigger.
              </p>
              <p>
                Today we stock over 500 products across six categories, and
                we&apos;ve served more than 10,000 customers across Bangladesh.
                Every product in our collection is hand-tested by our team — if
                we wouldn&apos;t use it ourselves, we won&apos;t sell it. That
                simple rule has earned us the trust of students, artists,
                architects, and anyone who believes that good tools make a real
                difference.
              </p>
              <p>
                We&apos;re still growing, still curating, still obsessed with
                finding the next great pen or the perfect paper weight. Welcome
                to Inkwell — we&apos;re glad you&apos;re here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
