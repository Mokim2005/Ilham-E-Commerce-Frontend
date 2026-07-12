"use client";

import { useWishlistStore } from "@/lib/store/wishlist-store";
import { ProductCard } from "@/components/shared/product-card";
import { EmptyWishlist } from "./empty-wishlist";

export function WishlistGrid() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
