// Product Details page — full product view with gallery, info, tabs, and related products.
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data/products.data";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { AddToCartBox } from "@/components/product/add-to-cart-box";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Ilham" };
  return {
    title: `${product.name} — Ilham`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const displayImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <>
      {/* Product hero */}
      <section className="bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Gallery */}
            <ProductGallery
              images={displayImages}
              productName={product.name}
            />

            {/* Right: Info + Add to Cart */}
            <div className="flex flex-col gap-6">
              <ProductInfo product={product} />
              <AddToCartBox product={product} />
            </div>
          </div>
        </div>
      </section>

      {/* Tabs section */}
      <section className="border-t border-rule bg-paper py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <ProductTabs
            productId={product.id}
            productName={product.name}
            description={product.description}
            reviewCount={product.reviewCount}
            rating={product.rating}
          />
        </div>
      </section>

      {/* Related products */}
      <RelatedProducts
        categorySlug={product.categorySlug}
        excludeSlug={product.slug}
      />
    </>
  );
}
