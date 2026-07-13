"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getDiscountPercent } from "@/lib/utils/format-price";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  badge?: "new" | "sale" | "bestseller";
  originalPrice?: number;
  price: number;
  inStock: boolean;
}

export function ProductGallery({
  images,
  productName,
  badge,
  originalPrice,
  price,
  inStock,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasDiscount =
    !!originalPrice && originalPrice > price;
  const discountPct = hasDiscount
    ? getDiscountPercent(originalPrice!, price)
    : 0;

  return (
    <div className="flex flex-col-reverse gap-3">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-20 sm:w-20",
                i === activeIndex
                  ? "border-teal"
                  : "border-rule hover:border-ink/30",
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image with hover zoom */}
      <div className="group relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <Image
          src={images[activeIndex] ?? images[0]}
          alt={productName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {/* Badge overlay */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {!inStock && (
            <Badge variant="secondary" className="bg-ink/80 text-white backdrop-blur-sm">
              Out of Stock
            </Badge>
          )}
          {badge === "new" && (
            <Badge className="bg-teal text-white">New</Badge>
          )}
          {badge === "bestseller" && (
            <Badge className="bg-ink text-white">Best Seller</Badge>
          )}
          {badge === "sale" && (
            <Badge className="bg-rose text-white">Sale</Badge>
          )}
          {discountPct > 0 && (
            <Badge className="bg-rose text-white">-{discountPct}%</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
