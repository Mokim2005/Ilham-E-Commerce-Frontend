"use client";

import { useCartStore } from "@/lib/store/cart-store";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";
import { EmptyCart } from "./empty-cart";

export function CartList() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Item list */}
      <div className="divide-y divide-rule rounded-xl border border-rule bg-card">
        {items.map((item) => (
          <div key={item.product.slug} className="p-4 sm:p-5">
            <CartItemRow item={item} />
          </div>
        ))}
      </div>

      {/* Summary sidebar */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <CartSummary />
      </div>
    </div>
  );
}
