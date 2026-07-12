// Wishlist page — shows saved items from the Zustand store.
import { WishlistGrid } from "@/components/wishlist/wishlist-grid";

export const metadata = {
  title: "Wishlist — Ilham",
  description: "Your saved items and favourites.",
};

export default function WishlistPage() {
  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            Favourites
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your Wishlist
          </h1>
        </div>

        <WishlistGrid />
      </div>
    </section>
  );
}
