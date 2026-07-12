// Data-access layer for categories. Pages import from here, not from mock-data directly.

import type { Category } from "@/lib/types/category";
import { categories } from "@/lib/mock-data/categories";

export async function getAllCategories(): Promise<Category[]> {
  return categories;
}
