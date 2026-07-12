// Sort Dropdown — changes the sort URL param. Client component.
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SortOption } from "@/lib/types/product";

const sortOptions: SortOption[] = [
  { label: "Latest", value: "latest" },
  { label: "Best Selling", value: "bestselling" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
];

interface SortDropdownProps {
  currentSort?: string;
}

export function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "latest") {
        params.delete("sort");
      } else {
        params.set("sort", value);
      }
      params.delete("page");
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams],
  );

  return (
    <Select value={currentSort ?? "latest"} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px] text-sm">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value ?? "latest"}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
