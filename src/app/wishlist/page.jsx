"use client";

import { useCart } from "@/context/ProductContext";
import ProductGrid from "@/components/product/ProductGrid";

export default function WishlistPage() {
  const { wishlist, hydrated } = useCart();

  if (!hydrated) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-[#d6440a]" />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-8 text-[#2B2420]">My Wishlist</h1>
      <ProductGrid products={wishlist} />
    </div>
  );
}