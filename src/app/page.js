import Hero from "@/components/Hero";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Newsletter from "@/components/home/Newsletter";
import WhyShopWithUs from "@/components/home/WhyShopWithUs";
import FeaturedProducts from "@/components/product/FeaturedProducts";

export default function Home() {
  return (
    <main className="px-4 md:px-8 py-6">
      <Hero />

      <CategoryShowcase />
      <FeaturedProducts />
      <WhyShopWithUs />
      <Newsletter />
    </main>
  );
}
