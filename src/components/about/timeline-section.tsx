// Timeline / Milestones — horizontal key moments in the brand's history.

const milestones = [
  {
    year: "2019",
    title: "The Beginning",
    description:
      "Ilham Stationery launches online with 40 hand-tested products and a mission to make quality stationery accessible in Bangladesh.",
  },
  {
    year: "2020",
    title: "First 1,000 Orders",
    description:
      "Crossed 1,000 orders within the first year. Expanded the catalog to 150+ products across notebooks and pens.",
  },
  {
    year: "2022",
    title: "500+ Products",
    description:
      "Grew the collection to over 500 products in six categories — including art supplies, desk accessories, and premium paper goods.",
  },
  {
    year: "2023",
    title: "10,000 Customers",
    description:
      "Served our 10,000th customer. Launched same-day dispatch for Dhaka and expanded delivery to all eight divisions.",
  },
  {
    year: "2025",
    title: "Own Brand Line",
    description:
      "Introduced the Ilham Original collection — our in-house notebooks and paper products designed from scratch for the local market.",
  },
];

export function TimelineSection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 max-w-2xl text-center mx-auto">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            Our Journey
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Milestones That Shaped Us
          </h2>
        </div>

        {/* Vertical timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-rule sm:left-1/2 sm:-translate-x-px" />

          <div className="space-y-10">
            {milestones.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className="relative flex flex-col sm:flex-row sm:items-center"
                >
                  {/* Desktop: alternating sides */}
                  <div
                    className={`hidden sm:block sm:w-1/2 ${
                      isLeft ? "pr-12 text-right" : "order-2 pl-12 text-left"
                    }`}
                  >
                    <span className="inline-block rounded-full bg-teal/10 px-3 py-1 font-mono text-xs font-semibold text-teal">
                      {m.year}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-bold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">
                      {m.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-4 -translate-x-1/2 sm:left-1/2 z-10 flex h-3 w-3 items-center justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-teal bg-paper" />
                  </div>

                  {/* Spacer for the other side on desktop */}
                  <div
                    className={`hidden sm:block sm:w-1/2 ${
                      isLeft ? "order-2" : "pr-12"
                    }`}
                  />

                  {/* Mobile: always left-aligned */}
                  <div className="ml-10 sm:hidden">
                    <span className="inline-block rounded-full bg-teal/10 px-3 py-1 font-mono text-xs font-semibold text-teal">
                      {m.year}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-bold text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/60">
                      {m.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
