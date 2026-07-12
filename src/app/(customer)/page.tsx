import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { BestSellingSection } from "@/components/home/best-selling-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { DiscountBannerSection } from "@/components/home/discount-banner-section";
import { ValuePropsSection } from "@/components/home/value-props-section";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
      <BestSellingSection />
      <NewArrivalsSection />
      <DiscountBannerSection />
      <ValuePropsSection />
      <NewsletterSection />
    </>
  );
}
