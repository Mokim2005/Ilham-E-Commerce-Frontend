// Filter Sidebar — category checkboxes, price range, availability toggle. Client component.
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils/format-price";
import type { Category } from "@/lib/types/category";

interface FilterSidebarProps {
  categories: Category[];
  activeCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  priceRange: [number, number];
}

export function FilterSidebar({
  categories,
  activeCategory,
  minPrice,
  maxPrice,
  inStock,
  priceRange,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local drag state — updates instantly, no URL push until release
  const [localMin, setLocalMin] = useState(minPrice ?? priceRange[0]);
  const [localMax, setLocalMax] = useState(maxPrice ?? priceRange[1]);

  // Sync local state when URL params change externally
  useEffect(() => {
    setLocalMin(minPrice ?? priceRange[0]);
    setLocalMax(maxPrice ?? priceRange[1]);
  }, [minPrice, maxPrice, priceRange]);

  const pushPriceToUrl = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (min > priceRange[0]) {
        params.set("min", String(min));
      } else {
        params.delete("min");
      }
      if (max < priceRange[1]) {
        params.set("max", String(max));
      } else {
        params.delete("max");
      }
      params.delete("page");
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams, priceRange],
  );

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("page");
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink">Categories</h3>
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <Checkbox
                checked={activeCategory === cat.slug}
                onCheckedChange={(checked) => {
                  updateParam("category", checked ? cat.slug : null);
                }}
              />
              <span className="text-sm text-ink/80">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range — local state during drag, URL update on commit */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink">
          Price Range
        </h3>
        <div className="px-1">
          <Slider
            min={priceRange[0]}
            max={priceRange[1]}
            step={50}
            value={[localMin, localMax]}
            onValueChange={([min, max]) => {
              // Continuous updates — visual only, no URL push
              setLocalMin(min);
              setLocalMax(max);
            }}
            onValueCommit={([min, max]) => {
              // Fired once on release — now push to URL
              pushPriceToUrl(min, max);
            }}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatPrice(localMin)}</span>
            <span>{formatPrice(localMax)}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink">Availability</h3>
        <label className="flex items-center gap-3 cursor-pointer">
          <Switch
            checked={inStock === true}
            onCheckedChange={(checked) => {
              updateParam("instock", checked ? "true" : null);
            }}
          />
          <span className="text-sm text-ink/80">In Stock Only</span>
        </label>
      </div>
    </div>
  );
}
