// Shared category type definitions used across data layer and components.

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  image: string;
}
