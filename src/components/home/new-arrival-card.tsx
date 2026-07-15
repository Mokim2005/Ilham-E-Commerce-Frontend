// NewArrivalCard — Isolated, premium horizontal card built exclusively for the
// NewArrivalsSection stacking scroll effect (Olivier Larose style).
// Intentionally does NOT import the global shared ProductCard.
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import {
  motion,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice, getDiscountPercent } from "@/lib/utils/format-price";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product } from "@/lib/types/product";

interface NewArrivalCardProps {
  i: number;
  product: Product;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export function NewArrivalCard({
  i,
  product,
  progress,
  range,
  targetScale,
}: NewArrivalCardProps) {
  const addItem = useWishlistStore((s) => s.addItem);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const wishlisted = useWishlistStore((s) =>
    s.items.some((item) => item.slug === product.slug),
  );
  const addCartItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const outOfStock = !product.inStock;
  const hasDiscount =
    !!product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? getDiscountPercent(product.originalPrice!, product.price)
    : product.discount ?? 0;

  // --- Runtime safety for useTransform (hydration / undefined guards) ---
  const fallback = useMotionValue(0);
  const safeRange: [number, number] =
    Array.isArray(range) && range.length === 2
      ? [range[0] ?? 0, range[1] ?? 1]
      : [0, 1];
  const safeTarget =
    typeof targetScale === "number" && Number.isFinite(targetScale)
      ? targetScale
      : 1;
  const safeProgress =
    progress && typeof progress.get === "function" ? progress : fallback;

  const scale = useTransform(safeProgress, safeRange, [1, safeTarget]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addCartItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (wishlisted) {
      removeItem(product.slug);
    } else {
      addItem(product);
    }
  };

  return (
    <motion.div
      style={{ scale, zIndex: i + 1 }}
      className={cn(
        "sticky top-0 flex justify-center pb-6",
        outOfStock && "opacity-60",
      )}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block w-full max-w-[600px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl"
      >
        <div
          className={cn(
            "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300",
            "md:flex-row md:items-stretch",
            "group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10",
            outOfStock && "pointer-events-none",
          )}
        >
          {/* Left — image */}
          <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-muted md:aspect-auto md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Stacked badges — top-left */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badge === "new" && (
                <Badge className="w-fit bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  New
                </Badge>
              )}
              {product.badge === "bestseller" && (
                <Badge className="w-fit bg-foreground px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-background">
                  Best Seller
                </Badge>
              )}
              {hasDiscount && discountPct > 0 && (
                <Badge className="w-fit bg-secondary px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">
                  -{discountPct}%
                </Badge>
              )}
              {outOfStock && (
                <Badge
                  variant="secondary"
                  className="w-fit px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                >
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Wishlist heart — top-right (always visible on this premium card) */}
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-foreground"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  wishlisted && "fill-secondary text-secondary",
                )}
              />
            </button>
          </div>

          {/* Right — details */}
          <div className="flex w-full flex-col justify-between gap-4 p-5 md:w-1/2">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {product.category}
              </p>
              <h3 className="text-base font-semibold leading-snug text-foreground line-clamp-2">
                {product.name}
              </h3>

              {product.reviewCount > 0 && (
                <div className="mt-2 flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                  <span className="text-xs font-medium text-foreground">
                    {product.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>
              )}

              {product.description && (
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-lg font-bold",
                    hasDiscount ? "text-secondary" : "text-foreground",
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

              {product.unit && (
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  per {product.unit}
                </p>
              )}

              {/* Quick add-to-cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                disabled={outOfStock}
                className={cn(
                  "mt-4 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-white shadow-lg transition-colors",
                  outOfStock
                    ? "cursor-not-allowed bg-muted-foreground/40"
                    : added
                      ? "bg-emerald-500"
                      : "bg-primary hover:bg-primary/90",
                )}
              >
                {outOfStock ? (
                  "Out of Stock"
                ) : added ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
