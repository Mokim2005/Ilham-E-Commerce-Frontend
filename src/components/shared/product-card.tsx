// ProductCard — displays a single product with image, badges, wishlist, quick-add, and hover lift.
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, getDiscountPercent } from "@/lib/utils/format-price";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useWishlistStore((s) => s.addItem);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const wishlisted = useWishlistStore((s) =>
    s.items.some((item) => item.slug === product.slug),
  );
  const addCartItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const outOfStock = !product.inStock;
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? getDiscountPercent(product.originalPrice!, product.price)
    : product.discount ?? 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addCartItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn(
        "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-xl",
        className,
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-rule bg-card transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg",
          outOfStock && "opacity-60 pointer-events-none",
        )}
      >
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges — top-left, stacked */}
          <div className="absolute left-2 top-2 flex flex-col gap-1.5">
            {product.badge === "new" && (
              <Badge className="bg-teal px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                New
              </Badge>
            )}
            {product.badge === "bestseller" && (
              <Badge className="bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                Best Seller
              </Badge>
            )}
            {hasDiscount && discountPct > 0 && (
              <Badge className="bg-rose px-2 py-0.5 text-[10px] font-semibold text-white">
                -{discountPct}%
              </Badge>
            )}
            {outOfStock && (
              <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist icon — top-right */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              if (wishlisted) {
                removeItem(product.slug);
              } else {
                addItem(product);
              }
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-ink/60 transition-all hover:bg-white hover:text-ink opacity-0 group-hover:opacity-100"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                wishlisted && "fill-rose text-rose",
              )}
            />
          </button>

          {/* Quick add-to-cart — bottom-center on image */}
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className={cn(
              "absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0",
              added
                ? "bg-teal"
                : "bg-ink hover:bg-teal",
            )}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                Quick Add
              </>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="p-3">
          <p className="mb-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold leading-snug text-ink line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="mt-1.5 flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-xs font-medium text-ink">
                {product.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price row — consistent pattern */}
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={cn(
                "text-base font-bold",
                hasDiscount ? "text-rose" : "text-ink",
              )}
            >
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>

          {/* Unit label */}
          {product.unit && (
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              per {product.unit}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
