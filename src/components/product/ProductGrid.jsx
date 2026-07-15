import ProductCard from "@/components/product/ProductCard";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#D8CFB9] bg-[#FBF9F4] px-6 py-24 text-center">
    <span className="text-4xl">🧵</span>
    <h3 className="text-lg font-medium text-[#1C1917]">No products found</h3>
    <p className="max-w-xs text-sm text-[#8C8478]">
      Try a different category or check back soon — new pieces are added regularly.
    </p>
  </div>
);

const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;