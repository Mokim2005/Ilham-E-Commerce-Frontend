"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils/format-price";
import { useCartStore } from "@/lib/store/cart-store";

export function CartSummary() {
  const subtotal = useCartStore((s) =>
    s.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    ),
  );

  const deliveryCharge = 0; // placeholder
  const total = subtotal + deliveryCharge;

  return (
    <div className="rounded-xl border border-rule bg-card p-5">
      <h2 className="mb-4 font-serif text-lg font-bold text-ink">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium text-ink">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-muted-foreground">
            {deliveryCharge === 0 ? "Free" : formatPrice(deliveryCharge)}
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between text-base">
        <span className="font-semibold text-ink">Total</span>
        <span className="font-bold text-ink">{formatPrice(total)}</span>
      </div>

      <Button
        size="lg"
        className="mt-5 w-full bg-teal text-white hover:bg-teal-light"
        disabled={subtotal === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
}
