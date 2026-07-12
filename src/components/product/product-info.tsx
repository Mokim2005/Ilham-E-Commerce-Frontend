// Product Info — name, brand, SKU, category, price, stock, description. Server component.
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPrice, getDiscountPercent } from "@/lib/utils/format-price";
import type { Product } from "@/lib/types/product";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount =
    !!product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? getDiscountPercent(product.originalPrice!, product.price)
    : product.discount ?? 0;

  const stock = product.stock ?? (product.inStock ? 99 : 0);
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock < 10;

  return (
    <div className="space-y-5">
      {/* Breadcrumb-style category — linked back to shop */}
      <Link
        href={`/shop?category=${product.categorySlug}`}
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-teal"
      >
        {product.category}
      </Link>

      {/* Name + badges */}
      <div>
        <h1 className="font-serif text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {product.name}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {product.badge === "new" && (
            <Badge className="bg-teal text-white">New</Badge>
          )}
          {product.badge === "bestseller" && (
            <Badge className="bg-ink text-white">Best Seller</Badge>
          )}
          {product.badge === "sale" && (
            <Badge className="bg-rose text-white">Sale</Badge>
          )}
        </div>
      </div>

      {/* Rating */}
      {product.reviewCount > 0 && (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-ink">
            {product.rating}
          </span>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>
      )}

      <Separator />

      {/* Price — consistent discount pattern */}
      <div className="flex items-baseline gap-3">
        <span
          className={`text-3xl font-bold ${hasDiscount ? "text-rose" : "text-ink"}`}
        >
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
            {discountPct > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discountPct}%
              </Badge>
            )}
          </>
        )}
      </div>

      {/* Unit */}
      {product.unit && (
        <p className="text-sm text-muted-foreground">
          Sold per {product.unit}
        </p>
      )}

      <Separator />

      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {product.brand && (
          <div>
            <span className="text-muted-foreground">Brand: </span>
            <span className="font-medium text-ink">{product.brand}</span>
          </div>
        )}
        {product.sku && (
          <div>
            <span className="text-muted-foreground">SKU: </span>
            <span className="font-medium text-ink">{product.sku}</span>
          </div>
        )}
        <div>
          <span className="text-muted-foreground">Category: </span>
          <Link
            href={`/shop?category=${product.categorySlug}`}
            className="font-medium text-teal transition-colors hover:text-teal-light"
          >
            {product.category}
          </Link>
        </div>
        {product.unit && (
          <div>
            <span className="text-muted-foreground">Unit: </span>
            <span className="font-medium text-ink">{product.unit}</span>
          </div>
        )}
      </div>

      {/* Stock status */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Availability: </span>
        {isOutOfStock ? (
          <span className="font-semibold text-rose">Out of Stock</span>
        ) : isLowStock ? (
          <span className="font-semibold text-rose">Only {stock} left!</span>
        ) : (
          <span className="font-medium text-teal">In Stock ({stock} available)</span>
        )}
      </div>

      <Separator />

      {/* Description */}
      {product.description && (
        <p className="text-sm leading-relaxed text-ink/70">
          {product.description}
        </p>
      )}
    </div>
  );
}
