import type { LucideIcon } from "lucide-react";
import { BadgeCheck, Truck, RotateCcw } from "lucide-react";

export interface HeroFeature {
  icon: LucideIcon;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export const heroFeatures: HeroFeature[] = [
  { icon: BadgeCheck, label: "Genuine Products" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: RotateCcw, label: "Easy Returns" },
];

export const heroStats: HeroStat[] = [
  { value: "4.9★", label: "Customer Rating" },
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Products" },
];
