import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/products";
 
import { Truck, ShieldCheck, RotateCcw, CircleAlert } from "lucide-react";
import AddToCartButton from "../AddToCartButton";

// Pre-builds a static page per product id at build time.
export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const { name, category, price, image, description, inStock } = product;

  return (
    <section className="container mx-auto grid grid-cols-1 gap-10 px-4 py-10 md:grid-cols-2 md:gap-12 md:py-16">
      {/* Image */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-[#EFE9DC] shadow-sm">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover ${!inStock ? "opacity-50 grayscale-[0.3]" : ""}`}
          priority
        />

        {!inStock && (
          <span className="absolute top-4 left-4 badge border-none bg-[#1C1917]/90 text-[#F7F3EC] gap-1.5 px-3 py-3 backdrop-blur-sm">
            <CircleAlert className="w-3.5 h-3.5" />
            Out of stock
          </span>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-5">
        <span className="w-fit rounded-full bg-gradient-to-r from-[#f4af10] to-[#d6440a] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#F7F3EC]">
          {category}
        </span>

        <h1
          className="text-3xl md:text-4xl text-[#1C1917] leading-tight"
          style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
        >
          {name}
        </h1>

        <p className="text-2xl font-semibold text-[#1C1917]">
          ৳{price.toLocaleString("en-BD")}
        </p>

        <div className="divider before:bg-[#E7E1D4] after:bg-[#E7E1D4] my-0"></div>

        <p className="text-sm leading-relaxed text-[#5C564C]">{description}</p>

        <div className="mt-1">
          <AddToCartButton product={product} />
        </div>

        <div className="divider before:bg-[#E7E1D4] after:bg-[#E7E1D4] my-1"></div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2.5 rounded-xl border border-[#E7E1D4] bg-[#FBF9F4] px-3 py-3">
            <Truck className="w-4.5 h-4.5 text-[#d6440a] shrink-0" strokeWidth={1.75} />
            <span className="text-xs text-[#5C564C]">Fast delivery</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#E7E1D4] bg-[#FBF9F4] px-3 py-3">
            <RotateCcw className="w-4.5 h-4.5 text-[#d6440a] shrink-0" strokeWidth={1.75} />
            <span className="text-xs text-[#5C564C]">Easy returns</span>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl border border-[#E7E1D4] bg-[#FBF9F4] px-3 py-3">
            <ShieldCheck className="w-4.5 h-4.5 text-[#d6440a] shrink-0" strokeWidth={1.75} />
            <span className="text-xs text-[#5C564C]">Authentic product</span>
          </div>
        </div>
      </div>
    </section>
  );
}