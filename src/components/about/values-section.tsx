// Values/Why Us — 4 value cards with icons. Used on the About page.
import { ShieldCheck, Truck, CreditCard, BadgeCheck } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description:
      "Every item is sourced from authorized distributors. No knockoffs, no compromises — just the real thing.",
  },
  {
    icon: CreditCard,
    title: "Affordable Pricing",
    description:
      "We keep margins slim so you get premium stationery at prices that make sense for the Bangladeshi market.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Same-day dispatch for orders placed before 3 PM. Dhaka delivery in 1-2 days, nationwide in 3-5.",
  },
  {
    icon: BadgeCheck,
    title: "Easy Manual Payment",
    description:
      "Pay with bKash, Nagad, or bank transfer. Simple, secure, and no hidden fees.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10 max-w-2xl text-center mx-auto">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal-light">
            Why Inkwell
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Built on Trust, Delivered with Care
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
