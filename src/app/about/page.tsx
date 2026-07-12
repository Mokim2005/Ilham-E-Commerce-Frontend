// About page — composes About page sections. Server Component.
import { AboutHero } from "@/components/about/about-hero";
import { OurStorySection } from "@/components/about/our-story-section";
import { ValuesSection } from "@/components/about/values-section";
import { StatsStrip } from "@/components/about/stats-strip";

export const metadata = {
  title: "About — Inkwell",
  description:
    "Learn about Inkwell, Bangladesh's trusted online stationery store since 2019.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStorySection />
      <ValuesSection />
      <StatsStrip />
    </>
  );
}
