// Mock category data for the stationery store homepage.

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  image: string;
}

export const categories: Category[] = [
  {
    id: "cat-001",
    name: "Notebooks",
    slug: "notebooks",
    icon: "BookOpen",
    productCount: 124,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&h=400&fit=crop",
  },
  {
    id: "cat-002",
    name: "Pens",
    slug: "pens",
    icon: "Pen",
    productCount: 89,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=600&h=400&fit=crop",
  },
  {
    id: "cat-003",
    name: "Paper",
    slug: "paper",
    icon: "FileText",
    productCount: 67,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&h=400&fit=crop",
  },
  {
    id: "cat-004",
    name: "Office Supplies",
    slug: "office-supplies",
    icon: "Printer",
    productCount: 156,
    image: "https://images.unsplash.com/photo-1589582754973-0d6a8d4ab790?w=600&h=400&fit=crop",
  },
  {
    id: "cat-005",
    name: "Art Supplies",
    slug: "art-supplies",
    icon: "Palette",
    productCount: 98,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
  },
  {
    id: "cat-006",
    name: "School Essentials",
    slug: "school-essentials",
    icon: "GraduationCap",
    productCount: 143,
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&h=400&fit=crop",
  },
];
