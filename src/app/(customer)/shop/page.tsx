// Shop listing page — reads searchParams, fetches filtered products. Server Component.
import { Suspense } from "react";
import { getAllProducts } from "@/lib/data/products.data";
import { getAllCategories } from "@/lib/data/categories.data";
import { ProductGrid } from "@/components/shop/product-grid";
import { SortDropdown } from "@/components/shop/sort-dropdown";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { MobileFilterSheet } from "@/components/shop/mobile-filter-sheet";
import { Pagination } from "@/components/shop/pagination";
import type { ProductFilters } from "@/lib/types/product";

const ITEMS_PER_PAGE = 12;

export const metadata = {
  title: "Shop — Ilham",
  description:
    "Browse our full collection of stationery, notebooks, pens, art supplies, and more.",
};

interface ShopPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category =
    typeof params.category === "string" ? params.category : undefined;
  const sort =
    typeof params.sort === "string"
      ? (params.sort as ProductFilters["sortBy"])
      : undefined;
  const minPrice =
    typeof params.min === "string" ? Number(params.min) : undefined;
  const maxPrice =
    typeof params.max === "string" ? Number(params.max) : undefined;
  const inStock =
    typeof params.instock === "string" ? params.instock === "true" : undefined;
  const page =
    typeof params.page === "string" ? Math.max(1, Number(params.page)) : 1;

  const filters: ProductFilters = {
    category,
    minPrice,
    maxPrice,
    inStock,
    sortBy: sort,
  };

  const [allProducts, categories] = await Promise.all([
    getAllProducts(filters),
    getAllCategories(),
  ]);

  // Calculate price range for the slider
  const priceBounds: [number, number] = [0, 5000];

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = allProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            Shop
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            All Products
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {allProducts.length} product{allProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Toolbar: mobile filter button + sort */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Suspense>
            <MobileFilterSheet
              categories={categories}
              activeCategory={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
              inStock={inStock}
              priceRange={priceBounds}
            />
          </Suspense>

          <div className="ml-auto">
            <Suspense>
              <SortDropdown currentSort={sort} />
            </Suspense>
          </div>
        </div>

        {/* Main layout: sidebar + grid */}
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Suspense>
                <FilterSidebar
                  categories={categories}
                  activeCategory={category}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  inStock={inStock}
                  priceRange={priceBounds}
                />
              </Suspense>
            </div>
          </aside>

          {/* Product grid + pagination */}
          <div>
            <ProductGrid products={paginatedProducts} />
            <Suspense>
              <Pagination totalPages={totalPages} currentPage={page} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
