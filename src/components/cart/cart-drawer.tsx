"use client";

import { useRouter } from "next/navigation";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { useUiStore } from "@/lib/store/ui-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";
import { EmptyCart } from "./empty-cart";

export function CartDrawer() {
  const router = useRouter();
  const isOpen = useUiStore((s) => s.isCartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleBrowseProducts = () => {
    closeCart();
    router.push("/shop");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-sm">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between border-b border-rule px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-serif text-lg font-bold text-ink">
            <ShoppingBag className="h-5 w-5 text-teal" />
            Your Cart
            {totalItems > 0 && (
              <span className="ml-1 rounded-full bg-teal/10 px-2 py-0.5 text-xs font-medium text-teal">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Scrollable item list */}
        {items.length === 0 ? (
          <div className="flex-1 overflow-y-auto">
            <EmptyCart onNavigate={handleBrowseProducts} />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            <LazyMotion features={domAnimation}>
              <div className="divide-y divide-rule">
                {items.map((item) => (
                  <m.div
                    key={item.product.slug}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4"
                  >
                    <CartItemRow item={item} />
                  </m.div>
                ))}
              </div>
            </LazyMotion>
          </div>
        )}

        {/* Fixed footer: summary + checkout */}
        {items.length > 0 && (
          <div className="border-t border-rule p-4">
            <CartSummary onCheckout={handleCheckout} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
