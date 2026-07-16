// src/components/home/CategoryShowcase.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Panjabi",
    slug: "Panjabi",
    image:
      "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=1200&auto=format&fit=crop",
    className: "md:col-start-1 md:col-span-7 md:row-start-1 md:row-span-2",
    height: "h-72 md:h-full",
  },
  {
    name: "Shirt",
    slug: "Shirt",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
    className: "md:col-start-8 md:col-span-5 md:row-start-1 md:row-span-1",
    height: "h-56 md:h-full",
  },
  {
    name: "T-Shirt",
    slug: "T-Shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    className: "md:col-start-8 md:col-span-5 md:row-start-2 md:row-span-1",
    height: "h-56 md:h-full",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CategoryShowcase() {
  return (
    <section className="container mx-auto px-4 py-10 md:py-16">
      <div className="mb-6 md:mb-8">
        <p className="text-xs uppercase tracking-[0.14em] text-[#8C8478]">
          Explore
        </p>
        <h2
          className="mt-1 text-2xl md:text-3xl text-[#1C1917]"
          style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
        >
          Shop by Category
        </h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 md:h-[560px]"
      >
        {categories.map((cat) => (
          <motion.div key={cat.slug} variants={itemVariants} className={`${cat.height} ${cat.className}`}>
            <Link
              href={`/products?category=${encodeURIComponent(cat.slug)}`}
              className="group relative block h-full w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5 flex items-center justify-between">
                <h3
                  className="text-white text-xl md:text-2xl font-medium"
                  style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
                >
                  {cat.name}
                </h3>
                <span className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-[#1C1917] group-hover:bg-gradient-to-r group-hover:from-[#f4af10] group-hover:to-[#d6440a] group-hover:text-white transition-all duration-300">
                  →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}