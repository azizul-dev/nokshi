import Hero from '@/components/Hero';
import FeaturedProducts from "@/components/product/FeaturedProducts";

export default function Home() {
    return (
        <main className="px-4 md:px-8 py-6">
            <Hero />

            <FeaturedProducts/>
        </main>
    );
}