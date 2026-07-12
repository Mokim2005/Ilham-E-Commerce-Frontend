// Product Grid — maps products to ProductCards in a responsive grid. Server component.
import { ProductCard } from "@/components/shared/product-card";
import type { Product } from "@/lib/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="font-serif text-2xl font-bold text-ink">
          No products found
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
