// Cart page — shows cart items from the Zustand store with live totals.
import { CartList } from "@/components/cart/cart-list";

export const metadata = {
  title: "Cart — Ilham",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            Shopping Cart
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your Cart
          </h1>
        </div>

        <CartList />
      </div>
    </section>
  );
}
