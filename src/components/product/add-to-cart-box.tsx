// Add to Cart Box — quantity stepper + Add to Cart button (inert for now). Client component.
"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddToCartBoxProps {
  inStock: boolean;
}

export function AddToCartBox({ inStock }: AddToCartBoxProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      {/* Quantity stepper */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink">Qty:</span>
        <div className="flex items-center rounded-lg border border-rule">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
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
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-9 w-9 items-center justify-center text-ink/60 transition-colors hover:bg-accent"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Add to Cart */}
      <Button
        size="lg"
        className={cn(
          "w-full text-sm font-semibold",
          !inStock && "opacity-50 cursor-not-allowed",
        )}
        disabled={!inStock}
        onClick={() => {}}
      >
        <ShoppingBag className="mr-2 h-4 w-4" />
        {inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  );
}
