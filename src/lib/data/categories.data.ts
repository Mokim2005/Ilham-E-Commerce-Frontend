// Data-access layer for categories. Pages import from here, not from mock-data directly.

import type { Category } from "@/lib/types/category";
import { categories } from "@/lib/mock-data/categories";

export async function getAllCategories(): Promise<Category[]> {
  return categories;
}

export async function createCategory(data: Omit<Category, "id">): Promise<Category> {
  const newCategory: Category = { ...data, id: `cat-${Date.now()}` };
  categories.push(newCategory);
  return newCategory;
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<Category | null> {
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...data, id: categories[index].id };
  return categories[index];
}

export async function deleteCategory(id: string): Promise<boolean> {
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return false;
  categories.splice(index, 1);
  return true;
}
