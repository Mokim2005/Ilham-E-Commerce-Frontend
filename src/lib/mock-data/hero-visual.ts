import type { LucideIcon } from "lucide-react";
import { Star, Tag } from "lucide-react";

export interface HeroBadge {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const heroVisual = {
  mainImage:
    "https://images.unsplash.com/photo-1544816155-12df9643f363?w=720&h=900&fit=crop&q=80",
  mainAlt: "Elegant stationery flat-lay with notebook, pen, and coffee",
  badges: [
    { icon: Star, label: "Rating", value: "4.9" },
    { icon: Tag, label: "Discount", value: "Up to 30% Off" },
  ] satisfies HeroBadge[],
};
