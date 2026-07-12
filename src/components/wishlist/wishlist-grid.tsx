"use client";

import { useWishlistStore } from "@/lib/store/wishlist-store";
import { WishlistItem } from "./wishlist-item";
import { EmptyWishlist } from "./empty-wishlist";

export function WishlistGrid() {
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="space-y-3">
      {items.map((product) => (
        <WishlistItem key={product.id} product={product} />
      ))}
    </div>
  );
}
