"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils/format-price";
import { useCartStore } from "@/lib/store/cart-store";
import type { CartItem } from "@/lib/store/cart-store";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product, quantity } = item;
  const stock = product.stock ?? (product.inStock ? 99 : 0);
  const lineTotal = product.price * quantity;

  return (
    <div className="flex gap-4">
      {/* Product image */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-rule bg-muted sm:h-28 sm:w-28"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      {/* Details + controls */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <Link
            href={`/shop/${product.slug}`}
            className="text-sm font-semibold text-ink line-clamp-1 hover:text-teal transition-colors"
          >
            {product.name}
          </Link>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatPrice(product.price)} per {product.unit ?? "piece"}
          </p>
        </div>

        {/* Quantity stepper + line total */}
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="flex items-center rounded-lg border border-rule">
            <button
              type="button"
              onClick={() => updateQuantity(product.slug, quantity - 1)}
              disabled={quantity <= 1}
              className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:bg-accent disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="flex h-8 w-9 items-center justify-center border-x border-rule text-sm font-medium text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.slug, quantity + 1)}
              disabled={quantity >= stock}
              className="flex h-8 w-8 items-center justify-center text-ink/60 transition-colors hover:bg-accent disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-ink">
              {formatPrice(lineTotal)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-rose"
              onClick={() => removeItem(product.slug)}
              aria-label={`Remove ${product.name} from cart`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
