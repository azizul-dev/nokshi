import ProductGrid from "@/components/product/ProductGrid";
import { getAllProducts } from "@/lib/products";

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[#8C8478]">
          Collection
        </p>
        <h1
          className="mt-1 text-2xl md:text-3xl text-[#1C1917]"
          style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
        >
          All Products
        </h1>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}