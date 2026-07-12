// Shared product type definitions used across data layer and components.

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images?: string[];
  description?: string;
  badge?: "new" | "sale" | "bestseller";
  rating: number;
  reviewCount: number;
  inStock: boolean;
  brand?: string;
  sku?: string;
  unit?: string;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "latest" | "price-asc" | "price-desc" | "bestselling" | "rating";
}

export type SortOption = {
  label: string;
  value: ProductFilters["sortBy"];
};
