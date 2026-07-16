"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const SWATCH_HEX = {
  white: "#FFFFFF",
  navy: "#1B2A4A",
  maroon: "#7A2530",
  black: "#111111",
  beige: "#D8C9AE",
  charcoal: "#36393B",
  olive: "#6B6B47",
  sand: "#D9C9A9",
  "sky blue": "#87B4D8",
  grey: "#9CA3AF",
  tan: "#C8A165",
  rust: "#B5502A",
  teal: "#2F6B66",
  indigo: "#3B3F8C",
  wine: "#5C1F2E",
  cream: "#F1E9D8",
};

const Star = ({ filled }) => (
  <svg
    viewBox="0 0 20 20"
    className={`h-3.5 w-3.5 ${filled ? "fill-[#B8935F]" : "fill-transparent stroke-[#B8935F]/50"}`}
    strokeWidth="1"
  >
    <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.6l5.79-.84L10 1.5z" />
  </svg>
);

const ProductCard = ({ product }) => {
  const {
    id,
    name,
    category,
    price,
    image,
    hoverImage,
    rating = 0,
    colors = [],
    sizes = [],
    inStock,
  } = product;

  const [isHovered, setIsHovered] = useState(false);
  const fullStars = Math.round(rating);

  // hoverImage আছে কিনা চেক করা হচ্ছে — না থাকলে (null/undefined) ছবি বদলাবে না
  const hasHoverImage = Boolean(hoverImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link
        href={`/products/${id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7E1D4] bg-[#FBF9F4] transition-colors duration-300 hover:border-[#B8935F]"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE9DC]">
          {/* মূল ছবি */}
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-all duration-700 ease-out ${
              !inStock ? "opacity-50 grayscale-[0.3]" : ""
            } ${
              hasHoverImage
                ? isHovered
                  ? "opacity-0 scale-105"
                  : "opacity-100 scale-100"
                : "group-hover:scale-[1.06]"
            }`}
          />

          {/* hoverImage থাকলে সেটা উপরে cross-fade হয়ে বসবে */}
          {hasHoverImage && (
            <Image
              src={hoverImage}
              alt={`${name} alternate view`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
              }`}
            />
          )}

          <span className="absolute left-3 top-3 rounded-full bg-[#1C1917]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#F7F3EC] backdrop-blur-sm">
            {category}
          </span>
          {!inStock && (
            <span className="absolute bottom-3 left-3 rounded-md bg-[#7A2530] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#F7F3EC]">
              Out of stock
            </span>
          )}

          <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#B8935F] transition-all duration-500 ease-out group-hover:w-full" />
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-3">
          <h3
            className="truncate text-[17px] leading-tight text-[#1C1917]"
            style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
          >
            {name}
          </h3>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < fullStars} />
            ))}
            <span className="ml-1 text-xs text-[#8C8478]">{rating.toFixed(1)}</span>
          </div>

          {colors.length > 0 && (
            <div className="flex items-center gap-1.5">
              {colors.slice(0, 4).map((color) => (
                <span
                  key={color}
                  title={color}
                  className="h-3.5 w-3.5 rounded-full border border-black/10"
                  style={{ backgroundColor: SWATCH_HEX[color.toLowerCase()] || "#CCCCCC" }}
                />
              ))}
              {sizes.length > 0 && (
                <span className="ml-1 text-[11px] text-[#8C8478]">
                  {sizes.length} sizes
                </span>
              )}
            </div>
          )}

          <div className="mt-auto flex items-baseline justify-between pt-1">
            <span className="text-base font-semibold text-[#1C1917]">
              &#2547;{price.toLocaleString("en-BD")}
            </span>
            {!inStock && (
              <span className="text-[11px] font-medium text-[#7A2530]">Unavailable</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;