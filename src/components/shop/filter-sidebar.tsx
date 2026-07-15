// Filter Sidebar — category checkboxes, dual-range price slider, availability toggle. Client component.
"use client";

import { useState, useEffect, useCallback, useRef, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/slider";
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
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPending, startTransition] = useTransition();

  const [values, setValues] = useState<number[]>([
    minPrice ?? priceRange[0],
    maxPrice ?? priceRange[1],
  ]);

  useEffect(() => {
    setValues([minPrice ?? priceRange[0], maxPrice ?? priceRange[1]]);
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
      startTransition(() => {
        router.push(`/shop?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams, priceRange, startTransition],
  );

  const debouncedPushPrice = useCallback(
    (min: number, max: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        pushPriceToUrl(min, max);
      }, 300);
    },
    [pushPriceToUrl],
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
      startTransition(() => {
        router.push(`/shop?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams, startTransition],
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

      {/* Price Range — DualRangeSlider with floating labels */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink">Price Range</h3>
        <div className="px-1 pt-6">
          <DualRangeSlider
            label
            labelContentPos="top"
            value={values}
            onValueChange={(newValues) => {
              setValues(newValues);
              debouncedPushPrice(newValues[0], newValues[1]);
            }}
            min={priceRange[0]}
            max={priceRange[1]}
            step={10}
            formatLabel={formatPrice}
          />
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
