export interface NavLink {
  label: string;
  href: string;
}

export const quickLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Sale", href: "/sale" },
  { label: "Gift Cards", href: "/gift-cards" },
];

export const categoryLinks: NavLink[] = [
  { label: "Notebooks", href: "/category/notebooks" },
  { label: "Pens & Pencils", href: "/category/pens" },
  { label: "Paper", href: "/category/paper" },
  { label: "Art Supplies", href: "/category/art-supplies" },
  { label: "Office Supplies", href: "/category/office-supplies" },
  { label: "School Essentials", href: "/category/school-essentials" },
];

export const supportLinks: NavLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Shipping & Delivery", href: "/shipping" },
  { label: "Returns & Exchanges", href: "/returns" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

export interface SocialLink {
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Twitter", href: "#" },
];

export const paymentMethods = ["bKash", "Nagad", "VISA"] as const;
