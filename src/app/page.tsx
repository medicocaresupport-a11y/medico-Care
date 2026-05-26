import { Hero } from "@/components/Hero";
import { AboutIndustry } from "@/components/AboutIndustry";
import { CategoriesSection } from "@/components/CategoriesSection";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <AboutIndustry />
      <CategoriesSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
