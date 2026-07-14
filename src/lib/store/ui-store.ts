// Transient UI state — not persisted across refreshes.
import { create } from "zustand";

export const useUiStore = create<{
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}));
