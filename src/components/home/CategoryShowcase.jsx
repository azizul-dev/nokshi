import ProductGrid from "@/components/product/ProductGrid";
import CategoryFilter from "@/components/product/CategoryFilter";
import { getAllProducts } from "@/lib/products";

export default async function ProductsPage({ searchParams }) {
  const products = await getAllProducts();

 
  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category;

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = activeCategory
    ? products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : products;

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

      <CategoryFilter categories={categories} />

      <ProductGrid products={filteredProducts} />
    </section>
  );
}