"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice, getDiscountPercent } from "@/lib/utils/format-price";
import { toast } from "sonner";
import type { Product } from "@/lib/types/product";

interface WishlistItemProps {
  product: Product;
}

export function WishlistItem({ product }: WishlistItemProps) {
  const removeItem = useWishlistStore((s) => s.removeItem);
  const addCartItem = useCartStore((s) => s.addItem);
  const [moved, setMoved] = useState(false);

  const hasDiscount =
    !!product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? getDiscountPercent(product.originalPrice!, product.price)
    : 0;

  function handleMoveToCart() {
    if (!product.inStock) {
      toast.error("This product is out of stock");
      return;
    }
    addCartItem(product, 1);
    removeItem(product.slug);
    setMoved(true);
    toast.success("Moved to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  }

  function handleRemove() {
    removeItem(product.slug);
    toast.success("Removed from wishlist");
  }

  return (
    <div className="group flex items-center gap-4 rounded-xl border border-rule bg-card p-4 transition-all hover:shadow-md">
      {/* Image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        {hasDiscount && discountPct > 0 && (
          <span className="absolute left-1 top-1 rounded bg-rose px-1 py-0.5 text-[9px] font-semibold text-white">
            -{discountPct}%
          </span>
        )}
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/shop/${product.slug}`}
          className="text-sm font-semibold text-ink hover:text-teal line-clamp-1"
        >
          {product.name}
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {product.category}
        </p>
        <div className="mt-1 flex items-baseline gap-2">
          <span
            className={
              hasDiscount ? "text-sm font-bold text-rose" : "text-sm font-bold text-ink"
            }
          >
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-end gap-2">
        <Button
          size="sm"
          className="bg-teal text-white hover:bg-teal-light"
          disabled={!product.inStock || moved}
          onClick={handleMoveToCart}
        >
          {moved ? (
            <>
              <Check className="mr-1 h-3.5 w-3.5" />
              In Cart
            </>
          ) : (
            <>
              <ShoppingBag className="mr-1 h-3.5 w-3.5" />
              Move to Cart
            </>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs text-muted-foreground hover:text-destructive"
          onClick={handleRemove}
        >
          <Trash2 className="mr-1 h-3 w-3" />
          Remove
        </Button>
      </div>
    </div>
  );
}
