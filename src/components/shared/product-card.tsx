// ProductCard — premium card with card-lift hover, highlighter-swipe quick-add,
// and stationery-inspired badge styling. All colors use semantic tokens.
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
        "group block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl",
        className,
      )}
    >
      <Card
        className={cn(
          "card-lift overflow-hidden rounded-2xl border-border/60 bg-card",
          outOfStock && "opacity-60 pointer-events-none",
        )}
      >
        <CardContent className="p-0">
          {/* Image area */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Badges — top-left, stacked with refined styling */}
            <div className="absolute left-3 top-3 flex flex-col gap-1.5">
              {product.badge === "new" && (
                <Badge className="w-fit bg-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                  New
                </Badge>
              )}
              {product.badge === "bestseller" && (
                <Badge className="w-fit bg-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-background shadow-sm">
                  Best Seller
                </Badge>
              )}
              {hasDiscount && discountPct > 0 && (
                <Badge className="w-fit bg-secondary px-2.5 py-1 text-[10px] font-semibold text-secondary-foreground shadow-sm">
                  -{discountPct}%
                </Badge>
              )}
              {outOfStock && (
                <Badge variant="secondary" className="w-fit px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Wishlist heart — top-right, revealed on hover */}
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
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground shadow-sm ring-1 ring-border/50 transition-all duration-300 hover:bg-background hover:text-foreground hover:scale-105 opacity-0 group-hover:opacity-100"
            >
              <Heart
                className={cn(
                  "h-4 w-4 transition-colors",
                  wishlisted && "fill-secondary text-secondary",
                )}
              />
            </button>

            {/* Quick add-to-cart — slides up on hover with highlighter-swipe */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center px-4 opacity-0 translate-y-3 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                className={cn(
                  "highlighter-swipe flex w-full max-w-[200px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium text-white shadow-lg transition-colors",
                  added
                    ? "bg-emerald-500"
                    : "bg-primary hover:bg-primary/90",
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
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Body — generous padding, better typography */}
          <div className="p-4">
            <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
              {product.category}
            </p>
            <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {product.name}
            </h3>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="mt-2 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-secondary text-secondary" />
                <span className="text-xs font-medium text-foreground">
                  {product.rating}
                </span>
                <span className="text-xs text-muted-foreground/60">
                  ({product.reviewCount})
                </span>
              </div>
            )}

            {/* Price row */}
            <div className="mt-2.5 flex items-baseline gap-2">
              <span
                className={cn(
                  "text-base font-bold",
                  hasDiscount ? "text-secondary" : "text-foreground",
                )}
              >
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-muted-foreground/50 line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
            </div>

            {/* Unit label */}
            {product.unit && (
              <p className="mt-1 text-[11px] text-muted-foreground/60">
                per {product.unit}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
