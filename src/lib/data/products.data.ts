// Data-access layer for products. Pages import from here, not from mock-data directly.

import type { Product, ProductFilters } from "@/lib/types/product";
import { allProducts } from "@/lib/mock-data/products";
import { delay } from "@/lib/utils/delay";

export async function getAllProducts(
  filters?: ProductFilters,
): Promise<Product[]> {
  await delay(1000); // TODO: remove once real API is connected — simulates network latency

  let results = [...allProducts];

  if (filters?.category) {
    results = results.filter(
      (p) => p.categorySlug === filters.category,
    );
  }

  if (filters?.minPrice !== undefined) {
    results = results.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.inStock !== undefined) {
    results = results.filter((p) => p.inStock === filters.inStock);
  }

  switch (filters?.sortBy) {
    case "price-asc":
      results.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results.sort((a, b) => b.price - a.price);
      break;
    case "bestselling":
      results.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "rating":
      results.sort((a, b) => b.rating - a.rating);
      break;
    case "latest":
    default:
      results.sort((a, b) => {
        const order = { new: 0, bestseller: 1, sale: 2 };
        const aOrder = a.badge ? order[a.badge] ?? 3 : 3;
        const bOrder = b.badge ? order[b.badge] ?? 3 : 3;
        return aOrder - bOrder;
      });
      break;
  }

  return results;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  return allProducts.find((p) => p.slug === slug) ?? null;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return allProducts.filter((p) => p.badge === "bestseller" || p.id === "fp-001");
}

export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
): Promise<Product[]> {
  return allProducts
    .filter((p) => p.categorySlug === category && p.slug !== excludeSlug)
    .slice(0, 4);
}

export async function createProduct(data: Omit<Product, "id">): Promise<Product> {
  const newProduct: Product = { ...data, id: `prod-${Date.now()}` };
  allProducts.push(newProduct);
  return newProduct;
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  const index = allProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  allProducts[index] = { ...allProducts[index], ...data };
  return allProducts[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const index = allProducts.findIndex((p) => p.id === id);
  if (index === -1) return false;
  allProducts.splice(index, 1);
  return true;
}
