import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { BestSellingSection } from "@/components/home/best-selling-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { ProductQuizSection } from "@/components/home/product-quiz-section";
import { DiscountBannerSection } from "@/components/home/discount-banner-section";
import { ValuePropsSection } from "@/components/home/value-props-section";
import { FaqSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { getFeaturedProducts } from "@/lib/data/products.data";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(6);

  return (

    <div className="bg-gradient-to-b from-paper via-muted to-paper paper-texture min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection products={featuredProducts} />
      <BestSellingSection />
      <NewArrivalsSection />
      <ProductQuizSection />
      <DiscountBannerSection />
      <ValuePropsSection />
      <FaqSection />
      <NewsletterSection />
    </div>
  );
}