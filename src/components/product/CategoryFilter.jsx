"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CategoryFilter = ({ categories = [] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  const buildHref = (cat) => {
    if (cat === "All") return pathname;
    return `${pathname}?category=${encodeURIComponent(cat)}`;
  };

  const allOptions = ["All", ...categories];

  return (
    <div className="mb-6 flex flex-wrap gap-2 md:mb-8">
      {allOptions.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <Link
            key={cat}
            href={buildHref(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${
              isActive
                ? "border-[#B8935F] bg-[#1C1917] text-[#F7F3EC]"
                : "border-[#E7E1D4] bg-transparent text-[#4A453D] hover:border-[#B8935F] hover:text-[#1C1917]"
            }`}
          >
            {cat}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryFilter;