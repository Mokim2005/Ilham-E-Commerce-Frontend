// Filter Sidebar — category checkboxes, price range, availability toggle. Client component.
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      // Reset to page 1 when filters change
      params.delete("page");
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams],
  );

  const currentMin = minPrice ?? priceRange[0];
  const currentMax = maxPrice ?? priceRange[1];

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

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-ink">
          Price Range
        </h3>
        <div className="px-1">
          <Slider
            min={priceRange[0]}
            max={priceRange[1]}
            step={50}
            value={[currentMin, currentMax]}
            onValueChange={([min, max]) => {
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
            }}
          />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>&#x09F3;{currentMin.toLocaleString("en-IN")}</span>
            <span>&#x09F3;{currentMax.toLocaleString("en-IN")}</span>
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
