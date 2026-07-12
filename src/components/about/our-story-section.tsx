// Our Story — two-column section with a believable narrative arc.
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
              alt="A workspace filled with quality stationery"
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
              Born from a Frustration — Built on a Promise
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink/70">
              <p>
                In early 2019, our founder was a university student in Dhaka,
                tired of choosing between cheap notebooks that fell apart by
                mid-semester and overpriced imports that ate through a student
                budget. The local stationery market was flooded with
                counterfeits, and the few genuine products were buried in
                shops that didn&apos;t care enough to curate them.
              </p>
              <p>
                So we started Ilham Stationery with 40 products, a small room,
                and a hand-tested guarantee: if we wouldn&apos;t use it in our
                own lectures, sketchbooks, or desk setups, it doesn&apos;t make
                the cut. That filtering principle — quality over volume — is
                still how every product enters our catalog today.
              </p>
              <p>
                Five years later, we stock over 500 products across notebooks,
                pens, art supplies, desk accessories, and paper goods. We&apos;ve
                served more than 10,000 orders to students, architects, writers,
                and designers in every division of Bangladesh. The room became a
                warehouse. The 40 products became a curated collection. But the
                promise stayed the same.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
