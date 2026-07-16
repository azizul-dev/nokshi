"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

const SORT_OPTIONS = [
  { value: "", label: "Sort by" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

const ProductFilters = ({ categories = [] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeCategory = searchParams.get("category") || "All";
  const activeSort = searchParams.get("sort") || "";
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "All") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== (searchParams.get("q") || "")) {
        updateParams({ q: searchInput });
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const allCategories = ["All", ...categories];

  return (
    <div className="mb-6 flex flex-col gap-4 md:mb-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8478]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
            />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-[#E7E1D4] bg-[#FBF9F4] py-2 pl-9 pr-4 text-sm text-[#1C1917] placeholder:text-[#8C8478] focus:border-[#B8935F] focus:outline-none"
          />
        </div>

        <select
          value={activeSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="w-full rounded-full border border-[#E7E1D4] bg-[#FBF9F4] px-4 py-2 text-sm text-[#1C1917] focus:border-[#B8935F] focus:outline-none sm:w-auto"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {allCategories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => updateParams({ category: cat })}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
                isActive
                  ? "border-[#B8935F] bg-[#1C1917] text-[#F7F3EC]"
                  : "border-[#E7E1D4] bg-transparent text-[#4A453D] hover:border-[#B8935F] hover:text-[#1C1917]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {isPending && (
        <p className="text-xs text-[#8C8478]">Updating results…</p>
      )}
    </div>
  );
};

export default ProductFilters;