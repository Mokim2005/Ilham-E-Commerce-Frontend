// Values / Why Us — 4 value cards with specific, varied copy.
import { Handshake, Lightbulb, Truck, Wallet } from "lucide-react";

const values = [
  {
    icon: Handshake,
    title: "Hand-Tested Promise",
    description:
      "Every product is tried by our team before it reaches the catalog. If it doesn't meet our standard, it doesn't ship — no exceptions.",
  },
  {
    icon: Lightbulb,
    title: "Curated, Not Cluttered",
    description:
      "We don't stock everything. We stock the right things. Our 500+ products are selected from thousands of options so you don't have to wade through junk.",
  },
  {
    icon: Truck,
    title: "Same-Day Dispatch",
    description:
      "Order before 3 PM and we ship it the same day. Dhaka in 1–2 days, anywhere in Bangladesh in 3–5 — and free delivery on orders over ৳2,000.",
  },
  {
    icon: Wallet,
    title: "Pay Your Way",
    description:
      "bKash, Nagad, bank transfer, or cash on delivery — whatever's convenient for you. No hidden charges, no surprise fees at checkout.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 max-w-2xl text-center mx-auto">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal-light">
            Why Shop With Us
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            The Ilham Difference
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-teal/20 text-teal-light">
                <value.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-white">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
