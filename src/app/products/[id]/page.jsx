import Image from "next/image";
import { notFound } from "next/navigation";
import { getAllProducts, getProductById } from "@/lib/products";

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

  const { name, category, price, image, description, colors, sizes, inStock } =
    product;

  return (
    <section className="container mx-auto grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#EFE9DC]">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`object-cover ${!inStock ? "opacity-50 grayscale-[0.3]" : ""}`}
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <span className="w-fit rounded-full bg-[#1C1917] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#F7F3EC]">
          {category}
        </span>

        <h1
          className="text-3xl text-[#1C1917]"
          style={{ fontFamily: "var(--font-display, 'Fraunces', serif)" }}
        >
          {name}
        </h1>

        <p className="text-xl font-semibold text-[#1C1917]">
          &#2547;{price.toLocaleString("en-BD")}
        </p>

        <p className="text-sm leading-relaxed text-[#5C564C]">{description}</p>

        {colors?.length > 0 && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-[#8C8478]">
              Colors
            </p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-[#E7E1D4] px-3 py-1 text-sm text-[#1C1917]"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {sizes?.length > 0 && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-[#8C8478]">
              Sizes
            </p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[#E7E1D4] px-3 py-1 text-sm text-[#1C1917]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          disabled={!inStock}
          className="mt-4 w-full rounded-lg bg-[#1C1917] py-3 text-sm font-medium uppercase tracking-wide text-[#F7F3EC] transition-opacity disabled:cursor-not-allowed disabled:opacity-40 md:w-fit md:px-8"
        >
          {inStock ? "Add to cart" : "Out of stock"}
        </button>
      </div>
    </section>
  );
}