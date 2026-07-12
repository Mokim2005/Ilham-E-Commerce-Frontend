// Add to Cart Box — quantity stepper + live price + Add to Cart button. Client component.
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice, getDiscountPercent } from "@/lib/utils/format-price";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product } from "@/lib/types/product";

interface AddToCartBoxProps {
  product: Product;
}

export function AddToCartBox({ product }: AddToCartBoxProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addCartItem = useCartStore((s) => s.addItem);

  const stock = product.stock ?? (product.inStock ? 99 : 0);
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock < 10;
  const unitPrice = product.price;
  const hasDiscount =
    !!product.originalPrice && product.originalPrice > product.price;
  const regularPrice = product.originalPrice ?? product.price;
  const totalPrice = unitPrice * quantity;
  const totalRegular = regularPrice * quantity;
  const totalSaved = hasDiscount ? (regularPrice - unitPrice) * quantity : 0;
  const discountPct = hasDiscount
    ? getDiscountPercent(regularPrice, unitPrice)
    : 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addCartItem(product, quantity);
    setAdded(true);
    toast.success(`Added ${quantity} to cart`, {
      description: `${product.name} — ${formatPrice(totalPrice)}`,
    });
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-4">
      {/* Quantity stepper */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink">Qty:</span>
        <div className="flex items-center rounded-lg border border-rule">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            className="flex h-9 w-9 items-center justify-center text-ink/60 transition-colors hover:bg-accent disabled:opacity-40"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="flex h-9 w-10 items-center justify-center border-x border-rule text-sm font-medium text-ink">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
            disabled={quantity >= stock || isOutOfStock}
            className="flex h-9 w-9 items-center justify-center text-ink/60 transition-colors hover:bg-accent disabled:opacity-40"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Live price display */}
      <div className="space-y-1.5">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-ink">
            {formatPrice(totalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(totalRegular)}
            </span>
          )}
          {hasDiscount && discountPct > 0 && (
            <span className="rounded bg-rose/10 px-1.5 py-0.5 text-xs font-semibold text-rose">
              -{discountPct}%
            </span>
          )}
        </div>
        {hasDiscount && totalSaved > 0 && (
          <p className="text-sm font-medium text-teal">
            You save {formatPrice(totalSaved)}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          {formatPrice(unitPrice)} per {product.unit ?? "piece"}
        </p>
      </div>

      {/* Add to Cart */}
      <Button
        size="lg"
        className={cn(
          "w-full text-sm font-semibold transition-colors",
          isOutOfStock && "opacity-50 cursor-not-allowed",
          added && "bg-teal text-white",
        )}
        disabled={isOutOfStock}
        onClick={handleAddToCart}
      >
        {added ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Added to Cart
          </>
        ) : (
          <>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {isOutOfStock
              ? "Out of Stock"
              : `Add ${quantity} to Cart \u2014 ${formatPrice(totalPrice)}`}
          </>
        )}
      </Button>
    </div>
  );
}
