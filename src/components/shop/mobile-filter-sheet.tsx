// Mobile Filter Sheet — wraps FilterSidebar in a shadcn Sheet for mobile. Client component.
"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterSidebar } from "./filter-sidebar";
import type { Category } from "@/lib/types/category";

interface MobileFilterSheetProps {
  categories: Category[];
  activeCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  priceRange: [number, number];
}

export function MobileFilterSheet({
  categories,
  activeCategory,
  minPrice,
  maxPrice,
  inStock,
  priceRange,
}: MobileFilterSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-paper p-0">
        <SheetHeader className="border-b border-rule px-6 py-4">
          <SheetTitle className="text-left text-base font-semibold text-ink">
            Filters
          </SheetTitle>
        </SheetHeader>
        <div className="px-6 py-5">
          <FilterSidebar
            categories={categories}
            activeCategory={activeCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            inStock={inStock}
            priceRange={priceRange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
