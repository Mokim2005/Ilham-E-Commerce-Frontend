"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ShoppingBag className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="font-serif text-2xl font-bold text-ink">
        Your cart is empty
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Looks like you haven&apos;t added anything yet. Start shopping and fill your cart
        with stationery you&apos;ll love.
      </p>
      <Button asChild className="mt-6 bg-teal text-white hover:bg-teal-light">
        <Link href="/shop">Browse Products</Link>
      </Button>
    </div>
  );
}
