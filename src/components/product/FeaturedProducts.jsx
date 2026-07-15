
import Link from "next/link";
import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";

const FEATURED_COUNT = 4;

export default async function FeaturedProducts() {
  const products = await getAllProducts();
  const featured = products.slice(0, FEATURED_COUNT);

  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="flex items-end justify-between mb-6 md:mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[#8C8478]">
            Handpicked
          </p>
          <h2
            className="mt-1 text-2xl md:text-3xl text-[#1C1917]"
            style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
          >
            Featured Products
          </h2>
        </div>

        <Link
          href="/products"
          className="hidden sm:inline-block text-sm font-medium bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-transparent bg-clip-text hover:opacity-80 transition"
        >
          View All →
        </Link>
      </div>

      <ProductGrid products={featured} />

      <div className="sm:hidden mt-6 text-center">
        <Link
          href="/products"
          className="inline-block text-sm font-medium bg-gradient-to-r from-[#f4af10] to-[#d6440a] text-transparent bg-clip-text"
        >
          View All →
        </Link>
      </div>
    </section>
  );
}