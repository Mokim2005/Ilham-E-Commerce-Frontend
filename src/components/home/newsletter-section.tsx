// Newsletter / Store Info Section — email signup + short brand blurb. Used on homepage.
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-rule bg-card p-8 sm:p-12">
          {/* Subtle notebook lines in background */}
          <div className="notebook-lines absolute inset-0 opacity-20" />

          <div className="relative z-10 mx-auto max-w-xl text-center">
            <span className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-teal">
              Stay Connected
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Join the Inkwell Circle
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Get first dibs on new arrivals, exclusive discounts, and
              stationery inspiration delivered to your inbox.
            </p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-12 flex-1 rounded-full border-rule bg-background px-5 text-sm"
                aria-label="Email address"
              />
              <Button
                type="submit"
                size="lg"
                className="highlighter-swipe h-12 rounded-full px-8 font-medium"
              >
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
