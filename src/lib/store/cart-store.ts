// Global cart store — persisted to localStorage via Zustand persist middleware.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.slug === product.slug,
          );
          if (existing) {
            const maxStock = product.stock ?? 99;
            return {
              items: state.items.map((item) =>
                item.product.slug === product.slug
                  ? {
                      ...item,
                      quantity: Math.min(
                        maxStock,
                        item.quantity + quantity,
                      ),
                    }
                  : item,
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity }],
          };
        }),

      removeItem: (slug) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.slug !== slug),
        })),

      updateQuantity: (slug, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.slug === slug
              ? {
                  ...item,
                  quantity: Math.max(
                    1,
                    Math.min(quantity, item.product.stock ?? 99),
                  ),
                }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "ilham-cart",
      skipHydration: true,
    },
  ),
);

// Derived selectors
export const cartTotalItems = () =>
  useCartStore.getState().items.reduce((sum, item) => sum + item.quantity, 0);

export const cartSubtotal = () =>
  useCartStore
    .getState()
    .items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
