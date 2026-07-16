import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import { getAllProducts } from "@/lib/products";

export default async function ProductsPage({ searchParams }) {
  const products = await getAllProducts();
  const resolvedSearchParams = await searchParams;

  const activeCategory = resolvedSearchParams?.category;
  const query = resolvedSearchParams?.q?.toLowerCase().trim() || "";
  const sort = resolvedSearchParams?.sort || "";

  const categories = [...new Set(products.map((p) => p.category))];

  let filteredProducts = activeCategory
    ? products.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : products;

 
  if (query) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

 
  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sort === "rating-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => (b.rating || 0) - (a.rating || 0)
    );
  }

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

      <ProductFilters categories={categories} />

      <ProductGrid products={filteredProducts} />
    </section>
  );
}