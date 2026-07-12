// StoreHydrator — rehydrates all Zustand persist stores on client mount.
// Place this in the root layout so stores are hydrated once, early.
"use client";

import { useEffect } from "react";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";

export function StoreHydrator() {
  useEffect(() => {
    useWishlistStore.persist.rehydrate();
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
