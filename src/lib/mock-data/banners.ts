// Mock banner and promotional data for the stationery store homepage.

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  bgColor: string;
  accentColor: string;
  discount?: number;
}

export const heroBanner: Banner = {
  id: "hero-001",
  title: "Write Your Story",
  subtitle:
    "Premium stationery crafted for thinkers, dreamers, and doers. From fountain pens to handmade notebooks — find the tools that inspire.",
  ctaText: "Shop the Collection",
  ctaLink: "/shop",
  bgColor: "#FAF8F3",
  accentColor: "#2F6F62",
};

export const promoBanner: Banner = {
  id: "promo-001",
  title: "Mid-Year Clearance",
  subtitle: "Up to 40% off on selected notebooks, pens & art supplies. Limited time only.",
  ctaText: "Grab the Deal",
  ctaLink: "/sale",
  bgColor: "#21232B",
  accentColor: "#C9707A",
  discount: 40,
};
