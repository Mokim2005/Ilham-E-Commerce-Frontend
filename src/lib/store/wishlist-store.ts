// Global wishlist store — persisted to localStorage via Zustand persist middleware.
// No "use client" — this is a plain module, not a React component.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types/product";

interface WishlistState {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          if (state.items.some((item) => item.slug === product.slug)) return state;
          return { items: [...state.items, product] };
        }),

      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((item) => item.slug !== slug),
        })),

      isInWishlist: (slug) => get().items.some((item) => item.slug === slug),
    }),
    {
      name: "ilham-wishlist",
      skipHydration: true,
    },
  ),
);

export const wishlistCount = () => useWishlistStore.getState().items.length;
