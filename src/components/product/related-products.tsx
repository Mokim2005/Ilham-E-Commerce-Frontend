// Related Products — grid of related ProductCards. Server component.
import { getRelatedProducts } from "@/lib/data/products.data";
import { ProductCard } from "@/components/shared/product-card";

interface RelatedProductsProps {
  categorySlug: string;
  excludeSlug: string;
}

export async function RelatedProducts({
  categorySlug,
  excludeSlug,
}: RelatedProductsProps) {
  const related = await getRelatedProducts(categorySlug, excludeSlug);

  if (related.length === 0) return null;

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
          You May Also Like
        </p>
        <h2 className="mb-8 font-serif text-2xl font-bold tracking-tight text-ink">
          Related Products
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {related.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
