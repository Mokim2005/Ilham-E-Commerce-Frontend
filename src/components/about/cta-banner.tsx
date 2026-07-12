// CTA Banner — closing section inviting visitors to browse the shop.
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-teal-light">
          Ready to Start?
        </p>
        <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Find Your Next Favourite Pen
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70">
          Browse our full collection of notebooks, pens, art supplies, and desk
          essentials — hand-tested, fairly priced, and delivered to your door.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-teal text-white hover:bg-teal-light"
        >
          <Link href="/shop">Browse the Shop</Link>
        </Button>
      </div>
    </section>
  );
}
